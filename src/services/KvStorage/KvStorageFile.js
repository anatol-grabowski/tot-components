/**
 * Key-value storage persisted as one JSON object through an `FsService`-shaped
 * backend.
 *
 * The file is loaded lazily on first use and then kept in memory. Each write
 * serializes the complete object, so this implementation is suited to small
 * settings/state collections rather than large or high-frequency data. Values
 * must be JSON-serializable; prototypes and object identity are not preserved.
 *
 * Missing or invalid JSON files are treated as empty storage, matching the
 * source service's recovery behavior. The next successful write replaces such
 * a file with valid JSON. Writes from one instance are serialized, but separate
 * instances or external writers are not coordinated and may overwrite each
 * other's changes.
 */
export class KvStorageFile {
  /**
   * @param {string} filepath JSON file used for persistence.
   * @param {{
   *   readFile(path: string, options: { encoding: string }): Promise<string>,
   *   writeFile(path: string, data: string, options?: { encoding?: string | null }): Promise<void>,
   * }} fs Writable file-system service.
   */
  constructor(filepath, fs) {
    if (!fs || typeof fs.readFile !== 'function' || typeof fs.writeFile !== 'function') {
      throw new TypeError('KvStorageFile requires a writable file-system service.')
    }

    this.filepath = String(filepath)
    this.fs = fs
    /** @type {Record<string, unknown>} */
    this._data = Object.create(null)
    /** @type {Promise<void> | null} */
    this._initPromise = null
    this._initialized = false
    this._writeQueue = Promise.resolve()
  }

  /**
   * Stores a value and persists the complete JSON object.
   *
   * Writes made through this instance complete in call order. Serialization or
   * file-system errors reject and leave the in-memory value changed; a later
   * successful write will persist the latest in-memory state.
   *
   * @template T
   * @param {string} key
   * @param {T} value
   * @returns {Promise<void>}
   */
  async setItem(key, value) {
    await this._initialize()
    this._data[String(key)] = value

    const save = async () => {
      const content = JSON.stringify(this._data, null, 2)
      if (content === undefined) {
        throw new TypeError('KvStorageFile can only persist JSON-serializable values.')
      }
      await this.fs.writeFile(this.filepath, content, { encoding: 'utf8' })
    }

    const operation = this._writeQueue.then(save, save)
    this._writeQueue = operation.catch(() => {})
    await operation
  }

  /**
   * Reads one value from the lazily loaded in-memory snapshot.
   *
   * Returns `undefined` when the key is absent. Returned objects are the same
   * in-memory references until the storage instance is recreated.
   *
   * @template T
   * @param {string} key
   * @returns {Promise<T | undefined>}
   */
  async getItem(key) {
    await this._initialize()
    return /** @type {T | undefined} */ (this._data[String(key)])
  }

  /** @returns {Promise<void>} */
  async _initialize() {
    if (this._initialized) {
      return
    }

    if (!this._initPromise) {
      this._initPromise = this._load()
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
  async _load() {
    try {
      const content = await this.fs.readFile(this.filepath, { encoding: 'utf8' })
      const parsed = JSON.parse(content)
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        this._data = Object.create(null)
        return
      }

      this._data = Object.assign(Object.create(null), parsed)
    } catch {
      this._data = Object.create(null)
    }
  }
}
