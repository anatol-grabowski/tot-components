/** File or directory metadata returned by `stat()`. */
export interface Stats {
  isFile(): boolean
  isDirectory(): boolean
  isSymbolicLink(): boolean
  /** Size in bytes; directories commonly report `0`. */
  size: number
  /** Last modification time. */
  mtime: Date
  /** Metadata/status change time, when available. */
  ctime: Date
  /** Creation time, when available. */
  birthtime: Date
}

/** Options shared by text and binary file reads. */
export interface FsReadOptions {
  /** A string requests text; `null` or omission requests binary data. */
  encoding?: string | null
}

/** Options shared by text and binary file writes. */
export interface FsWriteOptions {
  /** Text encoding where supported; binary data ignores this option. */
  encoding?: string | null
}

/** Directory creation options. */
export interface FsMkdirOptions {
  recursive?: boolean
}

/** File or directory removal options. */
export interface FsRmOptions {
  recursive?: boolean
  force?: boolean
}

/**
 * Generic read-only asynchronous file-system contract.
 *
 * Current implementation:
 * - `FsRoServiceFileInput.js` exposes browser-selected or dropped `File`
 *   objects as an in-memory, read-only hierarchy. It normalizes paths, creates
 *   synthetic directories, and additionally provides factories for `FileList`
 *   and `DataTransferItem` input.
 *
 * Writable implementations also satisfy this contract. Operations reject on
 * failure and should expose Node-like error codes such as `ENOENT`, `ENOTDIR`,
 * and `EISDIR` when applicable. Constructors and implementation-specific
 * factories or permission methods are intentionally not part of the contract.
 */
export interface FsRoService {
  /**
   * Reads text when `encoding` is a string, otherwise returns binary data.
   * Binary is the default when no encoding is supplied.
   */
  readFile(path: string, options?: FsReadOptions | null): Promise<string | ArrayBuffer>

  /** Lists direct child names, not full paths. */
  readdir(path: string): Promise<string[]>

  /** Returns metadata or rejects with `ENOENT` when the path is absent. */
  stat(path: string): Promise<Stats>
}

/**
 * Generic writable asynchronous file-system contract.
 *
 * Current implementations:
 * - `FsServiceNode.js` delegates to `node:fs/promises`; paths, permissions,
 *   encodings, symbolic-link behavior, and errors follow Node and the host OS.
 * - `FsServiceCapacitor.js` delegates to an injected or globally registered
 *   Capacitor `FileStorage` plugin. Binary data crosses the bridge as base64 and
 *   directory selection is available as an implementation-specific extension.
 * - `FsServiceArchive.js` creates a dependency-free in-memory file system from
 *   ZIP, TAR, or gzip-compressed TAR bytes. Archive parsing is lazy, writes do
 *   not modify or serialize the original archive, and text writes support UTF-8.
 *
 * All writable implementations expose the methods below. Constructors,
 * initialization helpers, plugin injection, directory pickers, and other
 * implementation-specific extensions are intentionally outside the contract.
 */
export interface FsService extends FsRoService {
  /** Replaces or creates a text or binary file. */
  writeFile(path: string, data: string | ArrayBuffer, options?: FsWriteOptions): Promise<void>

  /** Appends text or binary data. */
  appendFile(path: string, data: string | ArrayBuffer, options?: FsWriteOptions): Promise<void>

  /** Creates one directory, optionally including missing parent directories. */
  mkdir(path: string, options?: FsMkdirOptions): Promise<void>

  /** Renames or moves a file or directory. */
  rename(oldPath: string, newPath: string): Promise<void>

  /** Removes a file or directory. */
  rm(path: string, options?: FsRmOptions): Promise<void>
}
