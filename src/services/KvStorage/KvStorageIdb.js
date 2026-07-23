const OBJECT_STORE_NAME = 'kv-storage-idb'

/**
 * Asynchronous key-value storage backed by IndexedDB.
 *
 * The database connection is opened lazily on the first read or write. Values
 * are stored with IndexedDB structured cloning, so supported objects are cloned
 * rather than JSON-serialized. Functions, DOM nodes, and other non-cloneable
 * values reject with the browser's `DataCloneError`.
 *
 * Every instance uses one out-of-line-key object store named
 * `kv-storage-idb`. If the database already exists without that store, the
 * service upgrades it to the next database version. Other open tabs must allow
 * that version change to complete.
 */
export class KvStorageIdb {
  /**
   * @param {{ dbName: string }} options
   */
  constructor(options) {

    const dbName = String(options?.dbName || '').trim()
    if (!dbName) {
      throw new TypeError('KvStorageIdb requires a non-empty dbName.')
    }

    this.options = { dbName }
    /** @type {IDBDatabase | undefined} */
    this.db = undefined
    /** @type {Promise<IDBDatabase> | undefined} */
    this._openPromise = undefined
  }

  /**
   * Stores or replaces one structured-cloneable value.
   *
   * The promise resolves after the read/write transaction completes, not merely
   * after the request reports success.
   *
   * @template T
   * @param {IDBValidKey} key
   * @param {T} value
   * @returns {Promise<void>}
   */
  async setItem(key, value) {
    const db = await this._getDatabase()
    await runTransaction(db, OBJECT_STORE_NAME, 'readwrite', store => store.put(value, key))
  }

  /**
   * Reads one structured-cloned value.
   *
   * IndexedDB returns `undefined` when the key is absent.
   *
   * @template T
   * @param {IDBValidKey} key
   * @returns {Promise<T | undefined>}
   */
  async getItem(key) {
    const db = await this._getDatabase()
    return await runTransaction(db, OBJECT_STORE_NAME, 'readonly', store => store.get(key))
  }

  /**
   * @returns {Promise<IDBDatabase>}
   */
  async _getDatabase() {
    if (this.db) {
      return this.db
    }

    if (!this._openPromise) {
      this._openPromise = openDatabase(this.options.dbName, OBJECT_STORE_NAME)
        .then(db => {
          this.db = db
          db.addEventListener('versionchange', () => {
            db.close()
            if (this.db === db) {
              this.db = undefined
              this._openPromise = undefined
            }
          })
          return db
        })
        .catch(error => {
          this._openPromise = undefined
          throw error
        })
    }

    return await this._openPromise
  }
}

/**
 * Opens the database and adds the service's object store when necessary.
 *
 * @param {string} dbName
 * @param {string} objectStoreName
 * @returns {Promise<IDBDatabase>}
 */
async function openDatabase(dbName, objectStoreName) {
  requireIndexedDb()

  const db = await requestDatabaseOpen(dbName)
  if (db.objectStoreNames.contains(objectStoreName)) {
    return db
  }

  const nextVersion = db.version + 1
  db.close()
  return await requestDatabaseOpen(dbName, nextVersion, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains(objectStoreName)) {
      upgradeDb.createObjectStore(objectStoreName)
    }
  })
}

/**
 * @param {string} dbName
 * @param {number=} version
 * @param {(db: IDBDatabase) => void=} upgrade
 * @returns {Promise<IDBDatabase>}
 */
function requestDatabaseOpen(dbName, version, upgrade) {
  return new Promise((resolve, reject) => {
    const request = version === undefined
      ? globalThis.indexedDB.open(dbName)
      : globalThis.indexedDB.open(dbName, version)
    let settled = false

    request.addEventListener('upgradeneeded', () => {
      if (upgrade) {
        upgrade(request.result)
      }
    })
    request.addEventListener('success', () => {
      if (settled) {
        request.result.close()
        return
      }

      settled = true
      resolve(request.result)
    }, { once: true })
    request.addEventListener('error', () => {
      if (!settled) {
        settled = true
        reject(request.error || new Error(`Failed to open IndexedDB database "${dbName}".`))
      }
    }, { once: true })
    request.addEventListener('blocked', () => {
      if (!settled) {
        settled = true
        reject(new Error(`Opening IndexedDB database "${dbName}" was blocked by another connection.`))
      }
    }, { once: true })
  })
}

/**
 * @template T
 * @param {IDBDatabase} db
 * @param {string} objectStoreName
 * @param {IDBTransactionMode} mode
 * @param {(store: IDBObjectStore) => IDBRequest<T>} createRequest
 * @returns {Promise<T>}
 */
function runTransaction(db, objectStoreName, mode, createRequest) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(objectStoreName, mode)
    const request = createRequest(transaction.objectStore(objectStoreName))
    /** @type {T} */
    let result
    let settled = false

    request.addEventListener('success', () => {
      result = request.result
    }, { once: true })
    request.addEventListener('error', () => {
      rejectOnce(request.error || transaction.error || new Error('IndexedDB request failed.'))
    }, { once: true })
    transaction.addEventListener('complete', () => {
      if (!settled) {
        settled = true
        resolve(result)
      }
    }, { once: true })
    transaction.addEventListener('abort', () => {
      rejectOnce(transaction.error || new Error('IndexedDB transaction was aborted.'))
    }, { once: true })
    transaction.addEventListener('error', () => {
      rejectOnce(transaction.error || new Error('IndexedDB transaction failed.'))
    }, { once: true })

    /** @param {unknown} error */
    function rejectOnce(error) {
      if (!settled) {
        settled = true
        reject(error)
      }
    }
  })
}

function requireIndexedDb() {
  if (!globalThis.indexedDB) {
    throw new Error('KvStorageIdb requires the browser IndexedDB API.')
  }
}
