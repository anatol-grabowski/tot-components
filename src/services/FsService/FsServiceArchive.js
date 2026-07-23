const ZIP_LOCAL_SIGNATURE = 0x04034b50
const ZIP_CENTRAL_SIGNATURE = 0x02014b50
const ZIP_END_SIGNATURE = 0x06054b50

/**
 * Dependency-free writable file-system view initialized from archive bytes.
 *
 * The implementation supports ordinary ZIP archives (stored or DEFLATE
 * entries), uncompressed TAR archives, and gzip-compressed TAR archives. ZIP64,
 * encrypted ZIP entries, multi-volume archives, RAR, and 7-Zip are intentionally
 * not supported; those formats require a substantially larger archive runtime.
 *
 * ZIP and gzip inflation use the platform `DecompressionStream` API. No package
 * or CDN dependency is loaded at runtime. Archive metadata is indexed lazily on first
 * access, and individual file payloads are decompressed only when read.
 *
 * Writes update an in-memory file-system view. They do not rewrite the original
 * archive buffer and no archive serialization method is provided. Constructing
 * the service without bytes creates an empty writable file system.
 */
export class FsServiceArchive {
  /**
   * @param {ArrayBuffer=} archiveData Complete archive bytes. The buffer is kept
   * by reference and must not be mutated while the service is in use.
   */
  constructor(archiveData = new ArrayBuffer(0)) {
    if (!(archiveData instanceof ArrayBuffer)) {
      throw new TypeError('FsServiceArchive requires an ArrayBuffer.')
    }

    this._bytes = new Uint8Array(archiveData)
    this._entries = new Map()
    this._children = new Map()
    this._initialized = false
    /** @type {Promise<void> | null} */
    this._initPromise = null
  }

  /**
   * Parses archive metadata without extracting every file.
   *
   * Calling this method is optional because all public file operations initialize
   * lazily. Repeated calls share the same initialization promise.
   *
   * @returns {Promise<void>}
   */
  async init() {
    await this._ensureInitialized()
  }

  /**
   * Reads and, when necessary, decompresses one archive entry.
   *
   * @param {string} path
   * @param {{ encoding?: string | null } | null=} options
   * @returns {Promise<string | ArrayBuffer>}
   */
  async readFile(path, options) {
    await this._ensureInitialized()
    const normalized = normalizePath(path)
    const entry = this._entries.get(normalized)
    if (!entry) {
      throw createFsError('ENOENT', `No such archive entry: ${path}`)
    }
    if (entry.type === 'directory') {
      throw createFsError('EISDIR', `Cannot read an archive directory as a file: ${path}`)
    }

    const bytes = await entry.read()
    const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
    const encoding = options?.encoding ?? null
    return encoding === null ? buffer : new TextDecoder(encoding).decode(bytes)
  }

  /**
   * Lists direct child names in stable string-sort order.
   *
   * @param {string} path
   * @returns {Promise<string[]>}
   */
  async readdir(path) {
    await this._ensureInitialized()
    const normalized = normalizePath(path)
    const entry = this._entries.get(normalized)
    if (!entry) {
      throw createFsError('ENOENT', `No such archive entry: ${path}`)
    }
    if (entry.type !== 'directory') {
      throw createFsError('ENOTDIR', `Not an archive directory: ${path}`)
    }

    return Array.from(this._children.get(normalized) || []).sort()
  }

  /**
   * Returns archive metadata. Synthetic directories use the archive parse time.
   *
   * @param {string} path
   */
  async stat(path) {
    await this._ensureInitialized()
    const normalized = normalizePath(path)
    const entry = this._entries.get(normalized)
    if (!entry) {
      throw createFsError('ENOENT', `No such archive entry: ${path}`)
    }

    const isFile = entry.type === 'file'
    return {
      isFile: () => isFile,
      isDirectory: () => !isFile,
      isSymbolicLink: () => false,
      size: isFile ? entry.size : 0,
      mtime: new Date(entry.mtime),
      ctime: new Date(entry.mtime),
      birthtime: new Date(entry.mtime),
    }
  }

  /**
   * Replaces or creates a file in the in-memory archive view.
   *
   * String data is encoded as UTF-8. Other text encodings are rejected because
   * TextEncoder only defines UTF-8. Parent directories must already exist.
   *
   * @param {string} path
   * @param {string | ArrayBuffer} data
   * @param {{ encoding?: string | null }=} options
   * @returns {Promise<void>}
   */
  async writeFile(path, data, options) {
    await this._ensureInitialized()
    const normalized = normalizePath(path)
    if (normalized === '/') {
      throw createFsError('EISDIR', 'Cannot replace the archive root with a file.')
    }

    const existing = this._entries.get(normalized)
    if (existing?.type === 'directory') {
      throw createFsError('EISDIR', `Cannot replace a directory with a file: ${path}`)
    }

    this._requireParentDirectory(normalized)
    const bytes = encodeFileData(data, options)
    this._entries.set(normalized, createFileEntry(normalized, bytes, new Date()))
    this._rebuildChildren()
  }

  /**
   * Appends data to a file, creating the file when it does not exist.
   *
   * @param {string} path
   * @param {string | ArrayBuffer} data
   * @param {{ encoding?: string | null }=} options
   * @returns {Promise<void>}
   */
  async appendFile(path, data, options) {
    await this._ensureInitialized()
    const normalized = normalizePath(path)
    const existing = this._entries.get(normalized)
    if (!existing) {
      await this.writeFile(normalized, data, options)
      return
    }
    if (existing.type === 'directory') {
      throw createFsError('EISDIR', `Cannot append to a directory: ${path}`)
    }

    const current = await existing.read()
    const addition = encodeFileData(data, options)
    const combined = new Uint8Array(current.byteLength + addition.byteLength)
    combined.set(current, 0)
    combined.set(addition, current.byteLength)
    this._entries.set(normalized, createFileEntry(normalized, combined, new Date()))
  }

  /**
   * Creates a directory. With `recursive`, missing ancestors are created and an
   * already existing directory is accepted.
   *
   * @param {string} path
   * @param {{ recursive?: boolean }=} options
   * @returns {Promise<void>}
   */
  async mkdir(path, options) {
    await this._ensureInitialized()
    const normalized = normalizePath(path)
    const recursive = Boolean(options?.recursive)
    if (normalized === '/') {
      if (recursive) {
        return
      }
      throw createFsError('EEXIST', 'The archive root already exists.')
    }

    const existing = this._entries.get(normalized)
    if (existing) {
      if (recursive && existing.type === 'directory') {
        return
      }
      throw createFsError('EEXIST', `Path already exists: ${path}`)
    }

    const segments = splitPath(normalized)
    let current = '/'
    for (let i = 0; i < segments.length; i++) {
      const next = current === '/' ? `/${segments[i]}` : `${current}/${segments[i]}`
      const entry = this._entries.get(next)
      if (entry?.type === 'file') {
        throw createFsError('ENOTDIR', `A path segment is a file: ${next}`)
      }
      if (!entry) {
        if (!recursive && i !== segments.length - 1) {
          throw createFsError('ENOENT', `Parent directory does not exist: ${current}`)
        }
        this._entries.set(next, createDirectoryEntry(new Date(), next))
      }
      current = next
    }
    this._rebuildChildren()
  }

  /**
   * Renames or moves a file or directory inside the in-memory view.
   * Existing destinations are replaced recursively.
   *
   * @param {string} oldPath
   * @param {string} newPath
   * @returns {Promise<void>}
   */
  async rename(oldPath, newPath) {
    await this._ensureInitialized()
    const sourcePath = normalizePath(oldPath)
    const destinationPath = normalizePath(newPath)
    if (sourcePath === destinationPath) {
      return
    }
    if (sourcePath === '/' || destinationPath === '/') {
      throw createFsError('EBUSY', 'The archive root cannot be renamed or replaced.')
    }

    const source = this._entries.get(sourcePath)
    if (!source) {
      throw createFsError('ENOENT', `No such archive entry: ${oldPath}`)
    }
    if (
      (source.type === 'directory' && destinationPath.startsWith(`${sourcePath}/`))
      || sourcePath.startsWith(`${destinationPath}/`)
    ) {
      throw createFsError('EINVAL', 'A path cannot be moved into itself or one of its ancestors.')
    }

    this._requireParentDirectory(destinationPath)
    this._deleteSubtree(destinationPath)

    const moved = []
    for (const [path, entry] of this._entries) {
      if (path === sourcePath || path.startsWith(`${sourcePath}/`)) {
        moved.push([path, entry])
      }
    }
    for (let i = 0; i < moved.length; i++) {
      this._entries.delete(moved[i][0])
    }

    const now = new Date()
    for (let i = 0; i < moved.length; i++) {
      const [path, entry] = moved[i]
      const suffix = path.slice(sourcePath.length)
      const nextPath = `${destinationPath}${suffix}`
      this._entries.set(nextPath, entry.type === 'directory'
        ? createDirectoryEntry(now, nextPath)
        : { ...entry, path: nextPath, mtime: now })
    }
    this._rebuildChildren()
  }

  /**
   * Removes a file or directory from the in-memory view.
   *
   * Non-empty directories require `recursive`. `force` suppresses ENOENT for a
   * missing path. The archive root cannot be removed.
   *
   * @param {string} path
   * @param {{ recursive?: boolean, force?: boolean }=} options
   * @returns {Promise<void>}
   */
  async rm(path, options) {
    await this._ensureInitialized()
    const normalized = normalizePath(path)
    if (normalized === '/') {
      throw createFsError('EBUSY', 'The archive root cannot be removed.')
    }

    const entry = this._entries.get(normalized)
    if (!entry) {
      if (options?.force) {
        return
      }
      throw createFsError('ENOENT', `No such archive entry: ${path}`)
    }
    if (entry.type === 'directory' && !options?.recursive && (this._children.get(normalized)?.size || 0) > 0) {
      throw createFsError('ENOTEMPTY', `Directory is not empty: ${path}`)
    }

    this._deleteSubtree(normalized)
    this._rebuildChildren()
  }

  /** @param {string} path */
  _requireParentDirectory(path) {
    const parentPath = getParentPath(path)
    const parent = this._entries.get(parentPath)
    if (!parent) {
      throw createFsError('ENOENT', `Parent directory does not exist: ${parentPath}`)
    }
    if (parent.type !== 'directory') {
      throw createFsError('ENOTDIR', `Parent path is not a directory: ${parentPath}`)
    }
  }

  /** @param {string} path */
  _deleteSubtree(path) {
    for (const entryPath of Array.from(this._entries.keys())) {
      if (entryPath === path || entryPath.startsWith(`${path}/`)) {
        this._entries.delete(entryPath)
      }
    }
  }

  _rebuildChildren() {
    this._children.clear()
    for (const [path, entry] of this._entries) {
      if (entry.type === 'directory') {
        this._children.set(path, new Set())
      }
    }
    for (const path of this._entries.keys()) {
      if (path === '/') {
        continue
      }
      const parent = getParentPath(path)
      const children = this._children.get(parent)
      if (children) {
        children.add(getBaseName(path))
      }
    }
  }

  /** @returns {Promise<void>} */
  async _ensureInitialized() {
    if (this._initialized) {
      return
    }
    if (!this._initPromise) {
      this._initPromise = this._parse()
        .then(() => {
          this._initialized = true
        })
        .catch(error => {
          this._initPromise = null
          throw error
        })
    }
    await this._initPromise
  }

  /** @returns {Promise<void>} */
  async _parse() {
    this._entries.clear()
    this._children.clear()
    const now = new Date()
    this._entries.set('/', createDirectoryEntry(now, '/'))
    this._children.set('/', new Set())

    if (this._bytes.byteLength === 0) {
      return
    }

    if (isGzip(this._bytes)) {
      const decompressed = await decompressBytes(this._bytes, 'gzip')
      if (!looksLikeTar(decompressed)) {
        throw new Error('Gzip archive does not contain a supported TAR stream.')
      }
      parseTar(decompressed, entry => this._addEntry(entry))
      return
    }

    if (looksLikeZip(this._bytes)) {
      parseZip(this._bytes, entry => this._addEntry(entry))
      return
    }

    if (looksLikeTar(this._bytes)) {
      parseTar(this._bytes, entry => this._addEntry(entry))
      return
    }

    throw new Error('Unsupported archive format. Supported formats are ZIP, TAR, and TAR.GZ.')
  }

  /** @param {ArchiveEntry} entry */
  _addEntry(entry) {
    const path = normalizePath(entry.path)
    if (path === '/') {
      return
    }

    const segments = splitPath(path)
    let parent = '/'
    for (let i = 0; i < segments.length - 1; i++) {
      parent = this._ensureDirectory(parent, segments[i], entry.mtime)
    }

    const name = segments[segments.length - 1]
    this._children.get(parent).add(name)
    if (entry.type === 'directory') {
      this._ensureDirectory(parent, name, entry.mtime)
    } else {
      this._entries.set(path, { ...entry, path })
    }
  }

  /** @param {string} parent @param {string} name @param {Date} mtime */
  _ensureDirectory(parent, name, mtime) {
    const path = parent === '/' ? `/${name}` : `${parent}/${name}`
    if (!this._entries.has(path)) {
      this._entries.set(path, createDirectoryEntry(mtime, path))
      this._children.set(path, new Set())
    }
    this._children.get(parent).add(name)
    return path
  }
}

/**
 * @typedef {{
 *   path: string,
 *   type: 'file',
 *   size: number,
 *   mtime: Date,
 *   read(): Promise<Uint8Array>,
 * } | {
 *   path: string,
 *   type: 'directory',
 *   size: 0,
 *   mtime: Date,
 * }} ArchiveEntry
 */

/**
 * Creates an immutable in-memory file entry.
 *
 * @param {string} path
 * @param {Uint8Array} data
 * @param {Date} mtime
 */
function createFileEntry(path, data, mtime) {
  const bytes = data.slice()
  return {
    path,
    type: 'file',
    size: bytes.byteLength,
    mtime: new Date(mtime),
    read: async () => bytes.slice(),
  }
}

/**
 * @param {string | ArrayBuffer} data
 * @param {{ encoding?: string | null }=} options
 */
function encodeFileData(data, options) {
  if (data instanceof ArrayBuffer) {
    return new Uint8Array(data.slice(0))
  }
  if (typeof data !== 'string') {
    throw new TypeError('File data must be a string or ArrayBuffer.')
  }

  const encoding = String(options?.encoding || 'utf-8').toLowerCase().replace(/[_-]/g, '')
  if (encoding !== 'utf8') {
    throw new RangeError(`Unsupported write encoding: ${options?.encoding}`)
  }
  return new TextEncoder().encode(data)
}

/** @param {string} path */
function getParentPath(path) {
  const segments = splitPath(path)
  return segments.length <= 1 ? '/' : `/${segments.slice(0, -1).join('/')}`
}

/** @param {string} path */
function getBaseName(path) {
  const segments = splitPath(path)
  return segments[segments.length - 1] || ''
}

/** @param {Date} mtime */
function createDirectoryEntry(mtime, path = '/') {
  return {
    path,
    type: 'directory',
    size: 0,
    mtime: new Date(mtime),
  }
}

/** @param {Uint8Array} bytes */
function looksLikeZip(bytes) {
  return bytes.length >= 4 && new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0, true) === ZIP_LOCAL_SIGNATURE
}

/** @param {Uint8Array} bytes */
function isGzip(bytes) {
  return bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b
}

/** @param {Uint8Array} bytes */
function looksLikeTar(bytes) {
  if (bytes.length < 512) {
    return false
  }
  const signature = decodeAscii(bytes.subarray(257, 262))
  return signature === 'ustar' || hasValidTarChecksum(bytes.subarray(0, 512))
}

/**
 * @param {Uint8Array} bytes
 * @param {(entry: ArchiveEntry) => void} addEntry
 */
function parseZip(bytes, addEntry) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const endOffset = findZipEnd(view)
  const entryCount = view.getUint16(endOffset + 10, true)
  const centralSize = view.getUint32(endOffset + 12, true)
  const centralOffset = view.getUint32(endOffset + 16, true)
  if (entryCount === 0xffff || centralSize === 0xffffffff || centralOffset === 0xffffffff) {
    throw new Error('ZIP64 archives are not supported.')
  }

  let offset = centralOffset
  for (let index = 0; index < entryCount; index++) {
    if (view.getUint32(offset, true) !== ZIP_CENTRAL_SIGNATURE) {
      throw new Error('Invalid ZIP central directory.')
    }

    const flags = view.getUint16(offset + 8, true)
    const method = view.getUint16(offset + 10, true)
    const dosTime = view.getUint16(offset + 12, true)
    const dosDate = view.getUint16(offset + 14, true)
    const compressedSize = view.getUint32(offset + 20, true)
    const uncompressedSize = view.getUint32(offset + 24, true)
    const nameLength = view.getUint16(offset + 28, true)
    const extraLength = view.getUint16(offset + 30, true)
    const commentLength = view.getUint16(offset + 32, true)
    const localOffset = view.getUint32(offset + 42, true)
    const nameBytes = bytes.subarray(offset + 46, offset + 46 + nameLength)
    const name = decodeZipName(nameBytes, Boolean(flags & 0x800))
    const isDirectory = name.endsWith('/')

    if (flags & 0x1) {
      throw new Error(`Encrypted ZIP entry is not supported: ${name}`)
    }
    if (!isDirectory && method !== 0 && method !== 8) {
      throw new Error(`Unsupported ZIP compression method ${method} for ${name}`)
    }

    const mtime = dosDateTimeToDate(dosDate, dosTime)
    if (isDirectory) {
      addEntry({ path: name, type: 'directory', size: 0, mtime })
    } else {
      addEntry({
        path: name,
        type: 'file',
        size: uncompressedSize,
        mtime,
        read: async () => {
          if (view.getUint32(localOffset, true) !== ZIP_LOCAL_SIGNATURE) {
            throw new Error(`Invalid ZIP local header for ${name}`)
          }
          const localNameLength = view.getUint16(localOffset + 26, true)
          const localExtraLength = view.getUint16(localOffset + 28, true)
          const dataOffset = localOffset + 30 + localNameLength + localExtraLength
          const compressed = bytes.subarray(dataOffset, dataOffset + compressedSize)
          const output = method === 0 ? compressed.slice() : await decompressBytes(compressed, 'deflate-raw')
          if (output.byteLength !== uncompressedSize) {
            throw new Error(`Unexpected uncompressed size for ZIP entry ${name}`)
          }
          return output
        },
      })
    }

    offset += 46 + nameLength + extraLength + commentLength
  }
}

/** @param {DataView} view */
function findZipEnd(view) {
  const minimum = Math.max(0, view.byteLength - 0xffff - 22)
  for (let offset = view.byteLength - 22; offset >= minimum; offset--) {
    if (view.getUint32(offset, true) === ZIP_END_SIGNATURE) {
      return offset
    }
  }
  throw new Error('ZIP end-of-central-directory record was not found.')
}

/**
 * @param {Uint8Array} bytes
 * @param {(entry: ArchiveEntry) => void} addEntry
 */
function parseTar(bytes, addEntry) {
  let offset = 0
  while (offset + 512 <= bytes.length) {
    const header = bytes.subarray(offset, offset + 512)
    if (header.every(byte => byte === 0)) {
      break
    }
    if (!hasValidTarChecksum(header)) {
      throw new Error('Invalid TAR header checksum.')
    }

    const name = readTarString(header, 0, 100)
    const prefix = readTarString(header, 345, 155)
    const path = prefix ? `${prefix}/${name}` : name
    const size = readTarNumber(header, 124, 12)
    const mtimeSeconds = readTarNumber(header, 136, 12)
    const typeFlag = String.fromCharCode(header[156] || 0)
    const mtime = new Date((mtimeSeconds || 0) * 1000)
    const dataOffset = offset + 512
    const isDirectory = typeFlag === '5' || path.endsWith('/')

    if (isDirectory) {
      addEntry({ path, type: 'directory', size: 0, mtime })
    } else if (typeFlag === '0' || typeFlag === '\0' || typeFlag === '') {
      addEntry({
        path,
        type: 'file',
        size,
        mtime,
        read: async () => bytes.slice(dataOffset, dataOffset + size),
      })
    }

    offset = dataOffset + Math.ceil(size / 512) * 512
  }
}

/** @param {Uint8Array} header */
function hasValidTarChecksum(header) {
  if (header.length !== 512) {
    return false
  }
  const expected = readTarNumber(header, 148, 8)
  let actual = 0
  for (let i = 0; i < header.length; i++) {
    actual += i >= 148 && i < 156 ? 32 : header[i]
  }
  return expected === actual
}

/** @param {Uint8Array} header @param {number} offset @param {number} length */
function readTarString(header, offset, length) {
  const slice = header.subarray(offset, offset + length)
  const end = slice.indexOf(0)
  return decodeUtf8(end === -1 ? slice : slice.subarray(0, end)).trim()
}

/** @param {Uint8Array} header @param {number} offset @param {number} length */
function readTarNumber(header, offset, length) {
  const value = readTarString(header, offset, length).replace(/\0/g, '').trim()
  return value ? Number.parseInt(value, 8) : 0
}

/** @param {number} date @param {number} time */
function dosDateTimeToDate(date, time) {
  const year = 1980 + ((date >> 9) & 0x7f)
  const month = ((date >> 5) & 0x0f) - 1
  const day = date & 0x1f
  const hours = (time >> 11) & 0x1f
  const minutes = (time >> 5) & 0x3f
  const seconds = (time & 0x1f) * 2
  return new Date(year, Math.max(0, month), Math.max(1, day), hours, minutes, seconds)
}

/** @param {Uint8Array} bytes @param {boolean} utf8 */
function decodeZipName(bytes, utf8) {
  return utf8 ? decodeUtf8(bytes) : new TextDecoder('latin1').decode(bytes)
}

/** @param {Uint8Array} bytes */
function decodeUtf8(bytes) {
  return new TextDecoder('utf-8').decode(bytes)
}

/** @param {Uint8Array} bytes */
function decodeAscii(bytes) {
  let value = ''
  for (let i = 0; i < bytes.length; i++) {
    value += String.fromCharCode(bytes[i])
  }
  return value
}

/**
 * @param {Uint8Array} bytes
 * @param {'gzip' | 'deflate-raw'} format
 * @returns {Promise<Uint8Array>}
 */
async function decompressBytes(bytes, format) {
  if (typeof globalThis.DecompressionStream !== 'function') {
    throw new Error(`This runtime cannot decompress ${format} archive data.`)
  }

  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream(format))
  return new Uint8Array(await new Response(stream).arrayBuffer())
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
