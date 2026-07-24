// @ts-check

/** @typedef {import('../DbService/DbService.js').DbRecord} DbRecord */
/** @typedef {import('../DbService/DbService.js').DbService} DbService */

/**
 * @typedef {DbRecord & {
 *   path: string,
 *   parent: string | null,
 *   name: string,
 *   kind: 'file' | 'directory',
 *   size: number,
 *   mtime: number,
 *   ctime: number,
 *   birthtime: number,
 *   data: ArrayBuffer | null,
 * }} FsDbEntry
 */

const ROOT_PATH = '/'
const UTF8_PATTERN = /^utf-?8$/i

/**
 * Writable virtual file system persisted through a generic `DbService`.
 *
 * Every file and directory is one record keyed by normalized absolute path.
 * Direct children are indexed by `parent`; file bytes are stored as one
 * `ArrayBuffer`. The database instance is injected and remains owned by the
 * caller, so this service never closes it.
 *
 * The table and root directory are created lazily on first use. Mutations are
 * serialized per `FsServiceDb` instance. The generic database contract has no
 * public transaction primitive, so multi-record operations such as recursive
 * removal and directory rename are not atomic across different service
 * instances or if the backend fails partway through an operation.
 *
 * Text writes support UTF-8 because the platform `TextEncoder` only defines
 * UTF-8. Text reads use `TextDecoder` and may request another supported decoder
 * encoding. Paths use POSIX separators; backslashes are normalized to slashes.
 */
export class FsServiceDb {
  /**
   * @param {DbService} dbService
   * @param {string} tableName
   */
  constructor(dbService, tableName) {
    assertDbService(dbService)
    if (typeof tableName !== 'string' || !tableName.trim()) {
      throw new TypeError('FsServiceDb requires a non-empty table name.')
    }

    /** @private @type {DbService} */
    this.db = dbService
    /** @private */
    this.tableName = tableName.trim()
    /** @private @type {Promise<void> | undefined} */
    this.initPromise = undefined
    /** @private @type {Promise<void>} */
    this.mutationQueue = Promise.resolve()
  }

  /**
   * Creates the backing table and root directory when they do not exist.
   * Calling this explicitly is optional because every filesystem operation
   * initializes lazily.
   *
   * @returns {Promise<void>}
   */
  async init() {
    await this.ensureInitialized()
  }

  /**
   * @param {string} path
   * @param {{ encoding?: string | null } | null=} options
   * @returns {Promise<string | ArrayBuffer>}
   */
  async readFile(path, options) {
    await this.ensureInitialized()
    const normalized = normalizePath(path)
    const entry = await this.getEntry(normalized)
    if (!entry) {
      throw createFsError('ENOENT', `No such file or directory: ${path}`)
    }
    if (entry.kind === 'directory') {
      throw createFsError('EISDIR', `Cannot read a directory as a file: ${path}`)
    }

    const data = getFileData(entry)
    const encoding = options?.encoding ?? null
    return encoding === null ? data.slice(0) : new TextDecoder(encoding).decode(data)
  }

  /**
   * Replaces or creates a file. Parent directories must already exist.
   *
   * @param {string} path
   * @param {string | ArrayBuffer} data
   * @param {{ encoding?: string | null }=} options
   * @returns {Promise<void>}
   */
  async writeFile(path, data, options) {
    await this.enqueueMutation(async () => {
      const normalized = normalizePath(path)
      if (normalized === ROOT_PATH) {
        throw createFsError('EISDIR', 'Cannot replace the root directory with a file.')
      }

      const existing = await this.getEntry(normalized)
      if (existing?.kind === 'directory') {
        throw createFsError('EISDIR', `Cannot replace a directory with a file: ${path}`)
      }
      await this.requireParentDirectory(normalized)

      const now = Date.now()
      const bytes = encodeFileData(data, options)
      await this.db.put(this.tableName, createFileEntry(
        normalized,
        bytes,
        now,
        existing?.birthtime ?? now,
      ))
    })
  }

  /**
   * Appends to a file, creating it when absent. Parent directories must exist.
   *
   * @param {string} path
   * @param {string | ArrayBuffer} data
   * @param {{ encoding?: string | null }=} options
   * @returns {Promise<void>}
   */
  async appendFile(path, data, options) {
    await this.enqueueMutation(async () => {
      const normalized = normalizePath(path)
      if (normalized === ROOT_PATH) {
        throw createFsError('EISDIR', 'Cannot append to the root directory.')
      }

      const existing = await this.getEntry(normalized)
      if (existing?.kind === 'directory') {
        throw createFsError('EISDIR', `Cannot append to a directory: ${path}`)
      }
      await this.requireParentDirectory(normalized)

      const addition = encodeFileData(data, options)
      const current = existing ? new Uint8Array(getFileData(existing)) : new Uint8Array(0)
      const combined = new Uint8Array(current.byteLength + addition.byteLength)
      combined.set(current, 0)
      combined.set(new Uint8Array(addition), current.byteLength)
      const now = Date.now()
      await this.db.put(this.tableName, createFileEntry(
        normalized,
        combined.buffer,
        now,
        existing?.birthtime ?? now,
      ))
    })
  }

  /**
   * Creates one directory. With `recursive`, missing ancestors are created and
   * an existing directory is accepted.
   *
   * @param {string} path
   * @param {{ recursive?: boolean }=} options
   * @returns {Promise<void>}
   */
  async mkdir(path, options) {
    await this.enqueueMutation(async () => {
      const normalized = normalizePath(path)
      const recursive = Boolean(options?.recursive)
      if (normalized === ROOT_PATH) {
        if (recursive) return
        throw createFsError('EEXIST', 'The root directory already exists.')
      }

      const existing = await this.getEntry(normalized)
      if (existing) {
        if (recursive && existing.kind === 'directory') return
        throw createFsError('EEXIST', `Path already exists: ${path}`)
      }

      const segments = splitPath(normalized)
      const pending = /** @type {FsDbEntry[]} */ ([])
      let current = ROOT_PATH
      for (let i = 0; i < segments.length; i++) {
        const next = joinPath(current, segments[i])
        const entry = await this.getEntry(next)
        if (entry?.kind === 'file') {
          throw createFsError('ENOTDIR', `A path segment is a file: ${next}`)
        }
        if (!entry) {
          if (!recursive && i !== segments.length - 1) {
            throw createFsError('ENOENT', `Parent directory does not exist: ${current}`)
          }
          const now = Date.now()
          pending.push(createDirectoryEntry(next, now))
        }
        current = next
      }

      if (pending.length > 0) {
        await this.db.putMany(this.tableName, pending)
      }
    })
  }

  /**
   * Lists direct child names in stable string-sort order.
   *
   * @param {string} path
   * @returns {Promise<string[]>}
   */
  async readdir(path) {
    await this.ensureInitialized()
    const normalized = normalizePath(path)
    const entry = await this.getEntry(normalized)
    if (!entry) {
      throw createFsError('ENOENT', `No such file or directory: ${path}`)
    }
    if (entry.kind !== 'directory') {
      throw createFsError('ENOTDIR', `Not a directory: ${path}`)
    }

    const children = await this.db.list(this.tableName, {
      where: { field: 'parent', value: normalized },
      orderBy: 'name',
    })
    const names = []
    for (let i = 0; i < children.length; i++) {
      names.push(validateEntry(/** @type {FsDbEntry} */ (children[i])).name)
    }
    return names.sort()
  }

  /**
   * Renames or moves a file or directory. Existing destinations are replaced,
   * including their descendants. The destination parent must already exist.
   *
   * @param {string} oldPath
   * @param {string} newPath
   * @returns {Promise<void>}
   */
  async rename(oldPath, newPath) {
    await this.enqueueMutation(async () => {
      const sourcePath = normalizePath(oldPath)
      const destinationPath = normalizePath(newPath)
      if (sourcePath === destinationPath) return
      if (sourcePath === ROOT_PATH || destinationPath === ROOT_PATH) {
        throw createFsError('EBUSY', 'The root directory cannot be renamed or replaced.')
      }

      const source = await this.getEntry(sourcePath)
      if (!source) {
        throw createFsError('ENOENT', `No such file or directory: ${oldPath}`)
      }
      if (
        (source.kind === 'directory' && destinationPath.startsWith(`${sourcePath}/`))
        || sourcePath.startsWith(`${destinationPath}/`)
      ) {
        throw createFsError('EINVAL', 'A path cannot be moved into itself or one of its ancestors.')
      }
      await this.requireParentDirectory(destinationPath)

      const records = await this.db.list(this.tableName)
      const entries = records.map(record => validateEntry(/** @type {FsDbEntry} */ (record)))
      const sourceEntries = entries.filter(entry => isPathInside(entry.path, sourcePath))
      const destinationEntries = entries.filter(entry => isPathInside(entry.path, destinationPath))
      const now = Date.now()
      const moved = sourceEntries.map(entry => {
        const nextPath = `${destinationPath}${entry.path.slice(sourcePath.length)}`
        return moveEntry(entry, nextPath, now)
      })

      const movedPaths = new Set(moved.map(entry => entry.path))
      const deletePaths = []
      for (let i = 0; i < sourceEntries.length; i++) {
        deletePaths.push(sourceEntries[i].path)
      }
      for (let i = 0; i < destinationEntries.length; i++) {
        if (!movedPaths.has(destinationEntries[i].path)) {
          deletePaths.push(destinationEntries[i].path)
        }
      }

      await this.db.putMany(this.tableName, moved)
      await deletePathsByKey(this.db, this.tableName, deletePaths)
    })
  }

  /**
   * Removes a file or directory. Non-empty directories require `recursive`;
   * `force` suppresses `ENOENT`. The root directory cannot be removed.
   *
   * @param {string} path
   * @param {{ recursive?: boolean, force?: boolean }=} options
   * @returns {Promise<void>}
   */
  async rm(path, options) {
    await this.enqueueMutation(async () => {
      const normalized = normalizePath(path)
      if (normalized === ROOT_PATH) {
        throw createFsError('EBUSY', 'The root directory cannot be removed.')
      }

      const entry = await this.getEntry(normalized)
      if (!entry) {
        if (options?.force) return
        throw createFsError('ENOENT', `No such file or directory: ${path}`)
      }

      if (entry.kind === 'file') {
        await this.db.delete(this.tableName, normalized)
        return
      }

      const records = await this.db.list(this.tableName)
      const paths = records
        .map(record => validateEntry(/** @type {FsDbEntry} */ (record)))
        .filter(record => isPathInside(record.path, normalized))
        .map(record => record.path)
      if (!options?.recursive && paths.length > 1) {
        throw createFsError('ENOTEMPTY', `Directory is not empty: ${path}`)
      }
      await deletePathsByKey(this.db, this.tableName, paths)
    })
  }

  /**
   * @param {string} path
   * @returns {Promise<{
   *   isFile: () => boolean,
   *   isDirectory: () => boolean,
   *   isSymbolicLink: () => boolean,
   *   size: number,
   *   mtime: Date,
   *   ctime: Date,
   *   birthtime: Date,
   * }>}
   */
  async stat(path) {
    await this.ensureInitialized()
    const normalized = normalizePath(path)
    const entry = await this.getEntry(normalized)
    if (!entry) {
      throw createFsError('ENOENT', `No such file or directory: ${path}`)
    }

    const isFile = entry.kind === 'file'
    return {
      isFile: () => isFile,
      isDirectory: () => !isFile,
      isSymbolicLink: () => false,
      size: isFile ? entry.size : 0,
      mtime: new Date(entry.mtime),
      ctime: new Date(entry.ctime),
      birthtime: new Date(entry.birthtime),
    }
  }

  /** @returns {Promise<void>} */
  async ensureInitialized() {
    if (!this.initPromise) {
      this.initPromise = this.initialize().catch(error => {
        this.initPromise = undefined
        throw error
      })
    }
    await this.initPromise
  }

  /** @returns {Promise<void>} */
  async initialize() {
    await this.db.createTable(this.tableName, {
      primaryKey: 'path',
      indexes: [
        'parent',
        'kind',
        ['parent', 'name'],
      ],
    })

    const root = await this.getEntry(ROOT_PATH)
    if (!root) {
      await this.db.put(this.tableName, createDirectoryEntry(ROOT_PATH, Date.now()))
      return
    }
    if (root.kind !== 'directory') {
      throw createFsError('EIO', 'The database filesystem root record is not a directory.')
    }
  }

  /**
   * @template Result
   * @param {() => Promise<Result>} operation
   * @returns {Promise<Result>}
   */
  async enqueueMutation(operation) {
    const run = this.mutationQueue.then(async () => {
      await this.ensureInitialized()
      return await operation()
    })
    this.mutationQueue = run.then(() => undefined, () => undefined)
    return await run
  }

  /** @param {string} path @returns {Promise<FsDbEntry | undefined>} */
  async getEntry(path) {
    const entry = await this.db.get(this.tableName, path)
    if (entry === undefined) return undefined
    return validateEntry(/** @type {FsDbEntry} */ (entry))
  }

  /** @param {string} path @returns {Promise<FsDbEntry>} */
  async requireParentDirectory(path) {
    const parentPath = getParentPath(path)
    const parent = await this.getEntry(parentPath)
    if (!parent) {
      throw createFsError('ENOENT', `Parent directory does not exist: ${parentPath}`)
    }
    if (parent.kind !== 'directory') {
      throw createFsError('ENOTDIR', `Parent path is not a directory: ${parentPath}`)
    }
    return parent
  }
}

/** @param {unknown} dbService */
function assertDbService(dbService) {
  const value = /** @type {Record<string, unknown> | null} */ (
    typeof dbService === 'object' && dbService !== null ? dbService : null
  )
  const methods = [
    'createTable',
    'put',
    'putMany',
    'get',
    'delete',
    'deleteMany',
    'list',
  ]
  for (let i = 0; i < methods.length; i++) {
    if (typeof value?.[methods[i]] !== 'function') {
      throw new TypeError(`FsServiceDb requires a DbService with a ${methods[i]}() method.`)
    }
  }
}

/** @param {string} path */
function normalizePath(path) {
  if (typeof path !== 'string' || path.includes('\0')) {
    throw createFsError('EINVAL', 'Path must be a string without null bytes.')
  }

  const segments = path.replace(/\\/g, '/').split('/')
  const normalized = []
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (!segment || segment === '.') continue
    if (segment === '..') {
      normalized.pop()
      continue
    }
    normalized.push(segment)
  }
  return normalized.length > 0 ? `/${normalized.join('/')}` : ROOT_PATH
}

/** @param {string} path */
function splitPath(path) {
  return path === ROOT_PATH ? [] : path.slice(1).split('/')
}

/** @param {string} parent @param {string} name */
function joinPath(parent, name) {
  return parent === ROOT_PATH ? `/${name}` : `${parent}/${name}`
}

/** @param {string} path */
function getParentPath(path) {
  if (path === ROOT_PATH) return ROOT_PATH
  const index = path.lastIndexOf('/')
  return index <= 0 ? ROOT_PATH : path.slice(0, index)
}

/** @param {string} path */
function getBaseName(path) {
  if (path === ROOT_PATH) return ''
  return path.slice(path.lastIndexOf('/') + 1)
}

/** @param {string} path @param {string} root */
function isPathInside(path, root) {
  return path === root || path.startsWith(`${root}/`)
}

/**
 * @param {string | ArrayBuffer} data
 * @param {{ encoding?: string | null } | undefined} options
 */
function encodeFileData(data, options) {
  if (data instanceof ArrayBuffer) return data.slice(0)
  if (typeof data !== 'string') {
    throw new TypeError('File data must be a string or ArrayBuffer.')
  }
  const encoding = options?.encoding ?? 'utf8'
  if (encoding !== null && !UTF8_PATTERN.test(encoding)) {
    throw new TypeError('FsServiceDb text writes support only UTF-8 encoding.')
  }
  return new TextEncoder().encode(data).buffer
}

/** @param {FsDbEntry} entry */
function getFileData(entry) {
  if (!(entry.data instanceof ArrayBuffer)) {
    throw createFsError('EIO', `File record has invalid binary data: ${entry.path}`)
  }
  return entry.data
}

/**
 * @param {string} path
 * @param {ArrayBuffer} data
 * @param {number} time
 * @param {number} birthtime
 * @returns {FsDbEntry}
 */
function createFileEntry(path, data, time, birthtime) {
  return {
    path,
    parent: getParentPath(path),
    name: getBaseName(path),
    kind: 'file',
    data: data.slice(0),
    size: data.byteLength,
    mtime: time,
    ctime: time,
    birthtime,
  }
}

/**
 * @param {string} path
 * @param {number} time
 * @returns {FsDbEntry}
 */
function createDirectoryEntry(path, time) {
  return {
    path,
    parent: path === ROOT_PATH ? null : getParentPath(path),
    name: getBaseName(path),
    kind: 'directory',
    data: null,
    size: 0,
    mtime: time,
    ctime: time,
    birthtime: time,
  }
}

/**
 * @param {FsDbEntry} entry
 * @param {string} path
 * @param {number} time
 * @returns {FsDbEntry}
 */
function moveEntry(entry, path, time) {
  const moved = {
    ...entry,
    path,
    parent: getParentPath(path),
    name: getBaseName(path),
    ctime: time,
  }
  moved.data = entry.data instanceof ArrayBuffer ? entry.data.slice(0) : null
  return moved
}

/** @param {FsDbEntry} entry */
function validateEntry(entry) {
  if (
    typeof entry.path !== 'string'
    || (entry.parent !== null && typeof entry.parent !== 'string')
    || typeof entry.name !== 'string'
    || (entry.kind !== 'file' && entry.kind !== 'directory')
    || !isTimestamp(entry.mtime)
    || !isTimestamp(entry.ctime)
    || !isTimestamp(entry.birthtime)
    || !Number.isSafeInteger(entry.size)
    || entry.size < 0
  ) {
    throw createFsError('EIO', 'The database contains an invalid filesystem record.')
  }

  const expectedParent = entry.path === ROOT_PATH ? null : getParentPath(entry.path)
  if (
    normalizePath(entry.path) !== entry.path
    || entry.parent !== expectedParent
    || entry.name !== getBaseName(entry.path)
    || (entry.path === ROOT_PATH && entry.kind !== 'directory')
  ) {
    throw createFsError('EIO', `The database contains inconsistent path metadata: ${entry.path}`)
  }
  if (entry.kind === 'file' && (!(entry.data instanceof ArrayBuffer) || entry.size !== entry.data.byteLength)) {
    throw createFsError('EIO', `The database contains invalid file data: ${entry.path}`)
  }
  if (entry.kind === 'directory' && (entry.data !== null || entry.size !== 0)) {
    throw createFsError('EIO', `The database contains invalid directory data: ${entry.path}`)
  }
  return entry
}

/** @param {unknown} value */
function isTimestamp(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

/**
 * @param {DbService} db
 * @param {string} tableName
 * @param {string[]} paths
 */
async function deletePathsByKey(db, tableName, paths) {
  const unique = Array.from(new Set(paths))
  const chunkSize = 100
  for (let offset = 0; offset < unique.length; offset += chunkSize) {
    const chunk = unique.slice(offset, offset + chunkSize)
    const filters = chunk.map(path => ({ field: 'path', value: path }))
    await db.deleteMany(tableName, filters.length === 1 ? filters[0] : { or: filters })
  }
}

/** @param {string} code @param {string} message */
function createFsError(code, message) {
  return Object.assign(new Error(`${code}: ${message}`), { code })
}
