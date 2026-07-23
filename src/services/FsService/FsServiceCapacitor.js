/** @type {any | null} */
let injectedPlugin = null

/**
 * Overrides the Capacitor `FileStorage` plugin used by FsServiceCapacitor.
 *
 * Pass `null` to return to automatic lookup at
 * `globalThis.Capacitor.Plugins.FileStorage`. Injection is useful for tests or
 * for hosts that expose the same bridge without the standard Capacitor global.
 * The object is resolved lazily and is not validated until a method is called.
 *
 * @param {any | null} plugin
 */
export function setFsServiceCapacitorPlugin(plugin) {
  injectedPlugin = plugin || null
}

/**
 * Returns the injected or globally registered Capacitor `FileStorage` plugin.
 *
 * Every bridge method may request operating-system permissions and may reject
 * with platform-specific errors. Binary payloads are represented as base64
 * strings across the JavaScript/native boundary.
 *
 * @returns {any}
 */
export function getFsServiceCapacitorPlugin() {
  const globalObject = /** @type {any} */ (globalThis)
  const plugin = injectedPlugin || globalObject.Capacitor?.Plugins?.FileStorage
  if (!plugin) {
    throw new Error(
      'FsServiceCapacitor requires a registered Capacitor FileStorage plugin or an injected compatible plugin.',
    )
  }
  return plugin
}

/**
 * Writable file-system service backed by a Capacitor `FileStorage` plugin.
 *
 * The native plugin is expected to provide `selectDirectory`,
 * `getSelectedDirectory`, `readFile`, `writeFile`, `appendFile`, `mkdir`,
 * `readdir`, `rename`, `rm`, and `stat` methods. Text crosses the bridge as a
 * JavaScript string. Binary `ArrayBuffer` values are base64 encoded and therefore
 * temporarily require additional memory proportional to the file size.
 *
 * Directory selection is an implementation-specific extension; ordinary file
 * operations follow the generic FsService contract.
 */
export class FsServiceCapacitor {
  /**
   * Opens the native directory picker and returns the selected URI or `null`.
   * The platform plugin controls whether the permission survives later sessions.
   *
   * @returns {Promise<string | null>}
   */
  async selectDirectory() {
    const result = await getFsServiceCapacitorPlugin().selectDirectory()
    return result.uri ?? null
  }

  /**
   * Returns the currently persisted native directory URI without opening a picker.
   *
   * @returns {Promise<string | null>}
   */
  async getSelectedDirectory() {
    const result = await getFsServiceCapacitorPlugin().getSelectedDirectory()
    return result.uri ?? null
  }

  /**
   * Reads text or binary data from the native plugin.
   *
   * @param {string} path
   * @param {{ encoding?: string | null } | null=} options
   * @returns {Promise<string | ArrayBuffer>}
   */
  async readFile(path, options) {
    const binary = (options?.encoding ?? null) === null
    const result = await getFsServiceCapacitorPlugin().readFile({ path, binary })
    return binary ? base64ToArrayBuffer(result.data) : result.data
  }

  /**
   * Replaces or creates a native file.
   *
   * @param {string} path
   * @param {string | ArrayBuffer} data
   * @returns {Promise<void>}
   */
  async writeFile(path, data) {
    const binary = data instanceof ArrayBuffer
    await getFsServiceCapacitorPlugin().writeFile({
      path,
      data: binary ? arrayBufferToBase64(data) : data,
      binary,
    })
  }

  /**
   * Appends text or binary data to a native file.
   *
   * @param {string} path
   * @param {string | ArrayBuffer} data
   * @returns {Promise<void>}
   */
  async appendFile(path, data) {
    const binary = data instanceof ArrayBuffer
    await getFsServiceCapacitorPlugin().appendFile({
      path,
      data: binary ? arrayBufferToBase64(data) : data,
      binary,
    })
  }

  /** @param {string} path @param {{ recursive?: boolean }=} options */
  async mkdir(path, options) {
    await getFsServiceCapacitorPlugin().mkdir({
      path,
      recursive: options?.recursive,
    })
  }

  /** @param {string} path @returns {Promise<string[]>} */
  async readdir(path) {
    const result = await getFsServiceCapacitorPlugin().readdir({ path })
    return result.files
  }

  /** @param {string} oldPath @param {string} newPath */
  async rename(oldPath, newPath) {
    await getFsServiceCapacitorPlugin().rename({ oldPath, newPath })
  }

  /** @param {string} path @param {{ recursive?: boolean, force?: boolean }=} options */
  async rm(path, options) {
    await getFsServiceCapacitorPlugin().rm({
      path,
      recursive: options?.recursive,
      force: options?.force,
    })
  }

  /**
   * Converts native type and millisecond timestamp metadata to generic Stats.
   *
   * @param {string} path
   */
  async stat(path) {
    const result = await getFsServiceCapacitorPlugin().stat({ path })
    return {
      isFile: () => result.type === 'file',
      isDirectory: () => result.type === 'directory',
      isSymbolicLink: () => result.type === 'symlink',
      size: result.size,
      mtime: new Date(result.mtime),
      ctime: new Date(result.ctime),
      birthtime: new Date(result.birthtime),
    }
  }
}

/** @param {ArrayBuffer} buffer */
function arrayBufferToBase64(buffer) {
  requireBase64Apis()
  const bytes = new Uint8Array(buffer)
  const chunkSize = 0x8000
  let binary = ''
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length))
    for (let i = 0; i < chunk.length; i++) {
      binary += String.fromCharCode(chunk[i])
    }
  }
  return globalThis.btoa(binary)
}

/** @param {string} value */
function base64ToArrayBuffer(value) {
  requireBase64Apis()
  const binary = globalThis.atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

function requireBase64Apis() {
  if (typeof globalThis.btoa !== 'function' || typeof globalThis.atob !== 'function') {
    throw new Error('FsServiceCapacitor requires browser btoa() and atob() APIs for binary data.')
  }
}
