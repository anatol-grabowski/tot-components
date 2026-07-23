import * as fs from 'node:fs/promises'
/**
 * Node.js file-system implementation backed by `node:fs/promises`.
 *
 * Paths, permissions, symbolic links, replacement behavior, and errors follow
 * the host operating system and Node's file-system APIs. Text encodings use
 * Node's supported `BufferEncoding` names. Binary reads return an `ArrayBuffer`
 * containing exactly the bytes read, without exposing a larger pooled Buffer.
 *
 * Importing this module requires Node.js; browser code should not import it.
 */
export class FsServiceNode {
  /**
   * Reads a file as an exact `ArrayBuffer` or decoded text.
   *
   * @param {string} path
   * @param {{ encoding?: string | null } | null=} options
   * @returns {Promise<string | ArrayBuffer>}
   */
  async readFile(path, options) {
    const encoding = options?.encoding ?? null
    if (encoding !== null) {
      return await fs.readFile(path, { encoding: /** @type {BufferEncoding} */ (encoding) })
    }

    const buffer = await fs.readFile(path)
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
  }

  /**
   * Replaces or creates a file.
   *
   * @param {string} path
   * @param {string | ArrayBuffer} data
   * @param {{ encoding?: string | null }=} options
   * @returns {Promise<void>}
   */
  async writeFile(path, data, options) {
    if (data instanceof ArrayBuffer) {
      await fs.writeFile(path, Buffer.from(data))
      return
    }

    await fs.writeFile(path, data, {
      encoding: /** @type {BufferEncoding} */ (options?.encoding || 'utf8'),
    })
  }

  /**
   * Appends to a file, creating it when Node normally does so.
   *
   * @param {string} path
   * @param {string | ArrayBuffer} data
   * @param {{ encoding?: string | null }=} options
   * @returns {Promise<void>}
   */
  async appendFile(path, data, options) {
    if (data instanceof ArrayBuffer) {
      await fs.appendFile(path, Buffer.from(data))
      return
    }

    await fs.appendFile(path, data, {
      encoding: /** @type {BufferEncoding} */ (options?.encoding || 'utf8'),
    })
  }

  /** @param {string} path @param {{ recursive?: boolean }=} options */
  async mkdir(path, options) {
    await fs.mkdir(path, { recursive: options?.recursive || false })
  }

  /** @param {string} path @returns {Promise<string[]>} */
  async readdir(path) {
    return await fs.readdir(path)
  }

  /** @param {string} oldPath @param {string} newPath */
  async rename(oldPath, newPath) {
    await fs.rename(oldPath, newPath)
  }

  /** @param {string} path @param {{ recursive?: boolean, force?: boolean }=} options */
  async rm(path, options) {
    await fs.rm(path, {
      force: options?.force || false,
      recursive: options?.recursive || false,
    })
  }

  /**
   * Returns Node's real file metadata normalized to the generic shape.
   *
   * `fs.stat()` follows symbolic links, so `isSymbolicLink()` is normally false.
   * Use a backend-specific API when link metadata itself is required.
   *
   * @param {string} path
   */
  async stat(path) {
    const stats = await fs.stat(path)
    return {
      isFile: () => stats.isFile(),
      isDirectory: () => stats.isDirectory(),
      isSymbolicLink: () => stats.isSymbolicLink(),
      size: stats.size,
      mtime: stats.mtime,
      ctime: stats.ctime,
      birthtime: stats.birthtime,
    }
  }
}
