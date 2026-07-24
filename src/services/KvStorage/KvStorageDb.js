// @ts-check

/** @typedef {import('../DbService/DbService.js').DbRecord} DbRecord */
/** @typedef {import('../DbService/DbService.js').DbService} DbService */
/** @typedef {import('../DbService/DbService.js').DbValue} DbValue */

/**
 * @typedef {DbRecord & {
 *   key: string,
 *   defined: boolean,
 *   value: DbValue,
 * }} KvDbRecord
 */

/**
 * Asynchronous key-value storage persisted through a generic `DbService`.
 *
 * The caller provides both the database service and the table name. The table
 * is created lazily with `key` as its primary key. The database remains owned
 * by the caller and is never closed by this storage instance.
 *
 * Values may contain the portable data supported by `DbService`: null,
 * booleans, finite numbers, strings, arrays, plain objects, and `ArrayBuffer`.
 * `undefined` is represented explicitly so it can be stored without extending
 * the database record type. Unsupported values and circular structures reject
 * before a database write is attempted.
 */
export class KvStorageDb {
  /**
   * @param {DbService} dbService
   * @param {string} tableName
   */
  constructor(dbService, tableName) {
    assertDbService(dbService)
    if (typeof tableName !== 'string' || !tableName.trim()) {
      throw new TypeError('KvStorageDb requires a non-empty table name.')
    }

    /** @private @type {DbService} */
    this.db = dbService
    /** @private */
    this.tableName = tableName.trim()
    /** @private @type {Promise<void> | undefined} */
    this.initPromise = undefined
  }

  /**
   * Creates the backing table when it does not exist. Calling this explicitly
   * is optional because reads and writes initialize lazily.
   *
   * @returns {Promise<void>}
   */
  async init() {
    await this.ensureInitialized()
  }

  /**
   * Stores or replaces one value.
   *
   * @template T
   * @param {string} key
   * @param {T} value
   * @returns {Promise<void>}
   */
  async setItem(key, value) {
    assertKey(key)
    await this.ensureInitialized()

    const record = /** @type {KvDbRecord} */ ({
      key,
      defined: value !== undefined,
      value: value === undefined ? null : toDbValue(value),
    })
    await this.db.put(this.tableName, record)
  }

  /**
   * Reads one value, or `undefined` when the key is absent or explicitly stores
   * `undefined`.
   *
   * @template T
   * @param {string} key
   * @returns {Promise<T | undefined>}
   */
  async getItem(key) {
    assertKey(key)
    await this.ensureInitialized()

    const record = await this.db.get(this.tableName, key)
    if (!record) return undefined

    const stored = validateRecord(record)
    if (!stored.defined) return undefined
    return /** @type {T} */ (stored.value)
  }

  /** @private @returns {Promise<void>} */
  async ensureInitialized() {
    if (!this.initPromise) {
      this.initPromise = this.db.createTable(this.tableName, {
        primaryKey: 'key',
      }).catch(error => {
        this.initPromise = undefined
        throw error
      })
    }
    await this.initPromise
  }
}

/** @param {unknown} value */
function assertDbService(value) {
  if (!value || typeof value !== 'object') {
    throw new TypeError('KvStorageDb requires a DbService instance.')
  }

  const service = /** @type {Record<string, unknown>} */ (value)
  const methods = ['createTable', 'put', 'get']
  for (let i = 0; i < methods.length; i++) {
    if (typeof service[methods[i]] !== 'function') {
      throw new TypeError(`KvStorageDb requires a DbService with a ${methods[i]}() method.`)
    }
  }
}

/** @param {unknown} key */
function assertKey(key) {
  if (typeof key !== 'string') {
    throw new TypeError('KvStorageDb keys must be strings.')
  }
}

/**
 * Validates and returns one portable database value without changing its shape.
 *
 * @param {unknown} value
 * @returns {DbValue}
 */
function toDbValue(value) {
  const active = new Set()
  return visit(value)

  /**
   * @param {unknown} current
   * @returns {DbValue}
   */
  function visit(current) {
    if (
      current === null ||
      typeof current === 'string' ||
      typeof current === 'boolean'
    ) {
      return current
    }
    if (typeof current === 'number') {
      if (!Number.isFinite(current)) {
        throw new TypeError('KvStorageDb numbers must be finite.')
      }
      return current
    }
    if (current instanceof ArrayBuffer) {
      return current
    }
    if (!current || typeof current !== 'object') {
      throw new TypeError('KvStorageDb values must use portable DbService value types.')
    }
    if (active.has(current)) {
      throw new TypeError('KvStorageDb values cannot contain circular references.')
    }

    active.add(current)
    try {
      if (Array.isArray(current)) {
        const result = []
        for (let i = 0; i < current.length; i++) {
          result.push(visit(current[i]))
        }
        return result
      }

      const prototype = Object.getPrototypeOf(current)
      if (prototype !== Object.prototype && prototype !== null) {
        throw new TypeError('KvStorageDb objects must be plain objects.')
      }

      /** @type {{ [key: string]: DbValue }} */
      const result = {}
      const entries = Object.entries(current)
      for (let i = 0; i < entries.length; i++) {
        const [key, nestedValue] = entries[i]
        if (nestedValue === undefined) {
          throw new TypeError('KvStorageDb object fields cannot be undefined.')
        }
        result[key] = visit(nestedValue)
      }
      return result
    } finally {
      active.delete(current)
    }
  }
}

/**
 * @param {DbRecord} record
 * @returns {KvDbRecord}
 */
function validateRecord(record) {
  if (
    typeof record.key !== 'string' ||
    typeof record.defined !== 'boolean' ||
    !Object.prototype.hasOwnProperty.call(record, 'value')
  ) {
    throw new Error('KvStorageDb encountered an invalid backing record.')
  }
  return /** @type {KvDbRecord} */ (record)
}
