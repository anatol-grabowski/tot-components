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

/**
 * Generic read-only asynchronous file-system API implemented by all read-only
 * and writable backends.
 *
 * Operations reject on failure. Implementations should expose Node-like error
 * codes such as `ENOENT`, `ENOTDIR`, and `EISDIR` when applicable.
 */
export abstract class FsRoService {
  /**
   * Reads text when `encoding` is a string, otherwise returns binary data.
   * Binary is the default when no encoding is supplied.
   */
  abstract readFile(
    path: string,
    options?: { encoding?: string | null } | null,
  ): Promise<string | ArrayBuffer>

  /** Lists direct child names, not full paths. */
  abstract readdir(path: string): Promise<string[]>

  /** Returns metadata or rejects with `ENOENT` when the path is absent. */
  abstract stat(path: string): Promise<Stats>
}

/** Generic writable asynchronous file-system API. */
export abstract class FsService extends FsRoService {
  /** Replaces or creates a text or binary file. */
  abstract writeFile(
    path: string,
    data: string | ArrayBuffer,
    options?: { encoding?: string | null },
  ): Promise<void>

  /** Appends text or binary data. */
  abstract appendFile(
    path: string,
    data: string | ArrayBuffer,
    options?: { encoding?: string | null },
  ): Promise<void>

  /** Creates one directory, optionally including missing parent directories. */
  abstract mkdir(path: string, options?: { recursive?: boolean }): Promise<void>

  /** Renames or moves a file or directory. */
  abstract rename(oldPath: string, newPath: string): Promise<void>

  /** Removes a file or directory. */
  abstract rm(path: string, options?: { recursive?: boolean, force?: boolean }): Promise<void>
}
