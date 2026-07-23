/**
 * Read-only file-system view over browser-selected or dropped files.
 *
 * The service keeps `File` objects in memory and synthesizes directory entries
 * from their relative paths. It does not copy file bytes until `readFile()` is
 * called. Paths are normalized to forward-slash absolute paths.
 *
 * `fromDataTransferItems()` supports the modern File System Access handle API,
 * the older WebKit entry API, and plain file items, without an external drag-
 * and-drop dependency. Directory traversal may prompt or fail according to the
 * browser's drag-and-drop permissions.
 */
export class FsRoServiceFileInput {
  /**
   * Creates a view from files or explicit `{ file, path }` entries.
   *
   * Plain `File` values use `webkitRelativePath` when present, otherwise
   * `file.name`. Duplicate normalized paths are replaced by the last entry.
   *
   * @param {Iterable<File | { file: File, path: string }>} files
   */
  constructor(files) {
    this._entries = new Map()
    this._children = new Map()
    this._directoryTime = new Date()
    this._entries.set('/', { type: 'directory' })
    this._children.set('/', new Set())

    for (const source of files) {
      const file = source instanceof File ? source : source.file
      const explicitPath = source instanceof File ? '' : source.path
      if (!(file instanceof File)) {
        throw new TypeError('FsRoServiceFileInput entries must contain File objects.')
      }

      const path = normalizePath(explicitPath || file.webkitRelativePath || file.name)
      if (path === '/') {
        continue
      }
      this._addFile(path, file)
    }
  }

  /**
   * Creates a view from a file input's `FileList` or an array of files.
   *
   * Directory input paths are preserved through `webkitRelativePath` when the
   * browser supplies it.
   *
   * @param {FileList | File[]} files
   * @returns {FsRoServiceFileInput}
   */
  static fromFileList(files) {
    return new FsRoServiceFileInput(Array.from(files))
  }

  /**
   * Recursively reads dropped files and directories.
   *
   * Unsupported or non-file transfer items are ignored. An empty supported
   * selection produces a valid empty root file system.
   *
   * @param {DataTransferItemList | Iterable<DataTransferItem>} items
   * @returns {Promise<FsRoServiceFileInput>}
   */
  static async fromDataTransferItems(items) {
    /** @type {{ file: File, path: string }[]} */
    const files = []
    for (const item of Array.from(items)) {
      if (!item || item.kind !== 'file') {
        continue
      }

      const anyItem = /** @type {any} */ (item)
      if (typeof anyItem.getAsFileSystemHandle === 'function') {
        const handle = await anyItem.getAsFileSystemHandle()
        if (handle) {
          await collectFileSystemHandle(handle, '', files)
          continue
        }
      }

      const webkitEntry = typeof item.webkitGetAsEntry === 'function'
        ? item.webkitGetAsEntry()
        : null
      if (webkitEntry) {
        await collectWebkitEntry(webkitEntry, '', files)
        continue
      }

      const file = item.getAsFile()
      if (file) {
        files.push({ file, path: file.name })
      }
    }

    return new FsRoServiceFileInput(files)
  }

  /**
   * Reads a selected file. Directories reject with `EISDIR`.
   *
   * @param {string} path
   * @param {{ encoding?: string | null } | null=} options
   * @returns {Promise<string | ArrayBuffer>}
   */
  async readFile(path, options) {
    const normalized = normalizePath(path)
    const entry = this._entries.get(normalized)
    if (!entry) {
      throw createFsError('ENOENT', `No such file or directory: ${path}`)
    }
    if (entry.type === 'directory') {
      throw createFsError('EISDIR', `Cannot read a directory as a file: ${path}`)
    }

    const buffer = await entry.file.arrayBuffer()
    const encoding = options?.encoding ?? null
    return encoding === null ? buffer : new TextDecoder(encoding).decode(buffer)
  }

  /**
   * Lists direct child names in stable string-sort order.
   *
   * @param {string} path
   * @returns {Promise<string[]>}
   */
  async readdir(path) {
    const normalized = normalizePath(path)
    const entry = this._entries.get(normalized)
    if (!entry) {
      throw createFsError('ENOENT', `No such file or directory: ${path}`)
    }
    if (entry.type !== 'directory') {
      throw createFsError('ENOTDIR', `Not a directory: ${path}`)
    }

    return Array.from(this._children.get(normalized) || []).sort()
  }

  /**
   * Returns real file size/mtime and synthetic directory metadata.
   *
   * Browser-selected entries never report symbolic links.
   *
   * @param {string} path
   */
  async stat(path) {
    const normalized = normalizePath(path)
    const entry = this._entries.get(normalized)
    if (!entry) {
      throw createFsError('ENOENT', `No such file or directory: ${path}`)
    }

    const isFile = entry.type === 'file'
    const time = isFile
      ? new Date(entry.file.lastModified || this._directoryTime.getTime())
      : this._directoryTime
    return {
      isFile: () => isFile,
      isDirectory: () => !isFile,
      isSymbolicLink: () => false,
      size: isFile ? entry.file.size : 0,
      mtime: new Date(time),
      ctime: new Date(time),
      birthtime: new Date(time),
    }
  }

  /** @param {string} path @param {File} file */
  _addFile(path, file) {
    const segments = splitPath(path)
    let parent = '/'
    for (let i = 0; i < segments.length - 1; i++) {
      parent = this._ensureDirectory(parent, segments[i])
    }

    const name = segments[segments.length - 1]
    this._children.get(parent).add(name)
    this._entries.set(path, { type: 'file', file })
  }

  /** @param {string} parent @param {string} name */
  _ensureDirectory(parent, name) {
    const path = parent === '/' ? `/${name}` : `${parent}/${name}`
    if (!this._entries.has(path)) {
      this._entries.set(path, { type: 'directory' })
      this._children.set(path, new Set())
    }
    this._children.get(parent).add(name)
    return path
  }
}

/**
 * @param {unknown} handle
 * @param {string} parentPath
 * @param {{ file: File, path: string }[]} output
 */
async function collectFileSystemHandle(handle, parentPath, output) {
  const typedHandle = /** @type {any} */ (handle)
  const path = joinRelativePath(parentPath, typedHandle.name)
  if (typedHandle.kind === 'file') {
    output.push({ file: await typedHandle.getFile(), path })
    return
  }

  if (typedHandle.kind !== 'directory' || typeof typedHandle.values !== 'function') {
    return
  }

  for await (const child of typedHandle.values()) {
    await collectFileSystemHandle(child, path, output)
  }
}

/**
 * @param {any} entry
 * @param {string} parentPath
 * @param {{ file: File, path: string }[]} output
 */
async function collectWebkitEntry(entry, parentPath, output) {
  const path = joinRelativePath(parentPath, entry.name)
  if (entry.isFile) {
    const file = await new Promise((resolve, reject) => entry.file(resolve, reject))
    output.push({ file, path })
    return
  }

  if (!entry.isDirectory) {
    return
  }

  const reader = entry.createReader()
  while (true) {
    const entries = await new Promise((resolve, reject) => reader.readEntries(resolve, reject))
    if (!entries.length) {
      break
    }
    for (let i = 0; i < entries.length; i++) {
      await collectWebkitEntry(entries[i], path, output)
    }
  }
}

/** @param {string} parent @param {string} name */
function joinRelativePath(parent, name) {
  return parent ? `${parent}/${name}` : name
}

/** @param {string} path */
function normalizePath(path) {
  const segments = String(path || '')
    .replace(/\\/g, '/')
    .split('/')
  const normalized = []
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (!segment || segment === '.') {
      continue
    }
    if (segment === '..') {
      normalized.pop()
      continue
    }
    normalized.push(segment)
  }
  return normalized.length ? `/${normalized.join('/')}` : '/'
}

/** @param {string} path */
function splitPath(path) {
  const normalized = normalizePath(path)
  return normalized === '/' ? [] : normalized.slice(1).split('/')
}

/** @param {string} code @param {string} message */
function createFsError(code, message) {
  return Object.assign(new Error(`${code}: ${message}`), { code })
}
