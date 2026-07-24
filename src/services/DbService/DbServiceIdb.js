// @ts-check

/** @typedef {import('./DbService.js').DbChanges} DbChanges */
/** @typedef {import('./DbService.js').DbComparisonOperator} DbComparisonOperator */
/** @typedef {import('./DbService.js').DbIndex} DbIndex */
/** @typedef {import('./DbService.js').DbKey} DbKey */
/** @typedef {import('./DbService.js').DbQuery} DbQuery */
/** @typedef {import('./DbService.js').DbRecord} DbRecord */
/** @typedef {import('./DbService.js').DbScalar} DbScalar */
/** @typedef {import('./DbService.js').DbTableOptions} DbTableOptions */
/** @typedef {import('./DbService.js').DbValue} DbValue */
/** @typedef {import('./DbService.js').DbWhere} DbWhere */
/** @typedef {{ field: string, value: DbScalar, operator?: DbComparisonOperator }} DbCondition */

/**
 * @typedef {object} DbServiceIdbOptions
 * @property {string} dbName
 */

/**
 * @typedef {object} TableSchema
 * @property {string} primaryKey
 * @property {boolean} autoIncrement
 * @property {string[][]} indexes
 */

/**
 * @typedef {object} NormalizedQuery
 * @property {DbWhere | undefined} where
 * @property {string | undefined} search
 * @property {string[] | undefined} searchFields
 * @property {string | undefined} orderBy
 * @property {'asc' | 'desc'} order
 * @property {number} offset
 * @property {number | undefined} limit
 */

/**
 * @typedef {object} IndexedDbSelection
 * @property {IDBObjectStore | IDBIndex} source
 * @property {IDBKeyRange | undefined} range
 */

/**
 * IndexedDB implementation of the generic database service.
 *
 * Connections are opened lazily. Schema changes are serialized and use native
 * version-change transactions. Renaming or dropping a field rebuilds the object
 * store atomically, preserving records and recreating affected indexes. Other
 * open tabs or workers can block a schema change until they close their older
 * connection. Records use structured cloning, including native `ArrayBuffer`
 * values. Query features unsupported by native indexes fall back to a scan.
 *
 * @template {DbRecord} [RecordType=DbRecord]
 */
export class DbServiceIdb {
  /** @param {DbServiceIdbOptions} options */
  constructor(options) {
    const dbName = String(options?.dbName || '').trim()
    if (!dbName) {
      throw new TypeError('DbServiceIdb requires a non-empty dbName.')
    }

    /** @private */
    this.dbName = dbName
    /** @private @type {IDBDatabase | undefined} */
    this.db = undefined
    /** @private @type {Promise<IDBDatabase> | undefined} */
    this.openPromise = undefined
    /** @private @type {Promise<void>} */
    this.schemaQueue = Promise.resolve()
  }

  /**
   * Creates an object store and adds missing single-field or compound indexes.
   * Existing primary-key settings must match.
   *
   * @param {string} name
   * @param {DbTableOptions} options
   * @returns {Promise<void>}
   */
  async createTable(name, options) {
    const tableName = normalizeName(name, 'Table name')
    const requested = normalizeTableOptions(options)

    await this.enqueueSchemaChange(async () => {
      const db = await this.openDatabase()
      if (!db.objectStoreNames.contains(tableName)) {
        await this.upgradeDatabase(db, upgradeDb => {
          const store = upgradeDb.createObjectStore(tableName, {
            keyPath: requested.primaryKey,
            autoIncrement: requested.autoIncrement,
          })
          createIndexes(store, requested.indexes)
        })
        return
      }

      const current = readStoreSchema(db, tableName)
      assertCompatibleSchema(tableName, current, requested)
      const missing = /** @type {string[][]} */ ([])
      for (let i = 0; i < requested.indexes.length; i++) {
        if (!hasIndex(current.indexes, requested.indexes[i])) {
          missing.push(requested.indexes[i])
        }
      }
      if (missing.length === 0) {
        return
      }

      await this.upgradeDatabase(db, (upgradeDb, transaction) => {
        createIndexes(transaction.objectStore(tableName), missing)
      })
    })
  }

  /** @returns {Promise<string[]>} */
  async listTables() {
    const db = await this.getDatabase()
    return Array.from(db.objectStoreNames).sort((left, right) => left.localeCompare(right))
  }

  /** @param {string} name @returns {Promise<boolean>} */
  async hasTable(name) {
    const tableName = normalizeName(name, 'Table name')
    const db = await this.getDatabase()
    return db.objectStoreNames.contains(tableName)
  }

  /** @param {string} name @returns {Promise<boolean>} */
  async dropTable(name) {
    const tableName = normalizeName(name, 'Table name')
    return await this.enqueueSchemaChange(async () => {
      const db = await this.openDatabase()
      if (!db.objectStoreNames.contains(tableName)) {
        return false
      }
      await this.upgradeDatabase(db, upgradeDb => {
        upgradeDb.deleteObjectStore(tableName)
      })
      return true
    })
  }

  /** @param {string} name @param {DbIndex} index @returns {Promise<void>} */
  async createIndex(name, index) {
    const tableName = normalizeName(name, 'Table name')
    const fields = normalizeIndex(index)
    await this.enqueueSchemaChange(async () => {
      const db = await this.openDatabase()
      const schema = readStoreSchema(db, tableName)
      if (fields.length === 1 && fields[0] === schema.primaryKey) {
        return
      }
      if (hasIndex(schema.indexes, fields)) {
        return
      }
      await this.upgradeDatabase(db, (upgradeDb, transaction) => {
        createIndexes(transaction.objectStore(tableName), [fields])
      })
    })
  }

  /** @param {string} name @param {DbIndex} index @returns {Promise<boolean>} */
  async dropIndex(name, index) {
    const tableName = normalizeName(name, 'Table name')
    const fields = normalizeIndex(index)
    return await this.enqueueSchemaChange(async () => {
      const db = await this.openDatabase()
      const schema = readStoreSchema(db, tableName)
      if (fields.length === 1 && fields[0] === schema.primaryKey) {
        return false
      }
      const indexName = findIndexName(db, tableName, fields)
      if (!indexName) {
        return false
      }
      await this.upgradeDatabase(db, (upgradeDb, transaction) => {
        transaction.objectStore(tableName).deleteIndex(indexName)
      })
      return true
    })
  }

  /**
   * @param {string} name
   * @param {DbIndex} index
   * @param {DbIndex} newIndex
   * @returns {Promise<boolean>}
   */
  async renameIndex(name, index, newIndex) {
    const tableName = normalizeName(name, 'Table name')
    const fields = normalizeIndex(index)
    const nextFields = normalizeIndex(newIndex)
    return await this.enqueueSchemaChange(async () => {
      const db = await this.openDatabase()
      const schema = readStoreSchema(db, tableName)
      if (fields.length === 1 && fields[0] === schema.primaryKey) {
        return false
      }
      const oldIndexName = findIndexName(db, tableName, fields)
      if (!oldIndexName) {
        return false
      }
      if (sameFields(fields, nextFields)) {
        return true
      }
      const targetIsPrimary = nextFields.length === 1 && nextFields[0] === schema.primaryKey
      const targetExists = targetIsPrimary || Boolean(findIndexName(db, tableName, nextFields))
      await this.upgradeDatabase(db, (upgradeDb, transaction) => {
        const store = transaction.objectStore(tableName)
        store.deleteIndex(oldIndexName)
        if (!targetExists) {
          createIndexes(store, [nextFields])
        }
      })
      return true
    })
  }

  /** @param {string} name @param {string} field @param {string} newField @returns {Promise<void>} */
  async renameField(name, field, newField) {
    const tableName = normalizeName(name, 'Table name')
    const oldName = normalizeFieldName(field, 'Field name')
    const nextName = normalizeFieldName(newField, 'New field name')
    if (oldName === nextName) {
      return
    }

    await this.enqueueSchemaChange(async () => {
      const db = await this.openDatabase()
      const schema = readStoreSchema(db, tableName)
      const nextSchema = {
        primaryKey: schema.primaryKey === oldName ? nextName : schema.primaryKey,
        autoIncrement: schema.autoIncrement,
        indexes: renameIndexedField(schema.indexes, oldName, nextName, schema.primaryKey, nextName),
      }

      await this.upgradeDatabase(db, (upgradeDb, transaction, fail) => {
        rebuildStore(
          upgradeDb,
          transaction,
          tableName,
          nextSchema,
          record => renameRecordField(record, oldName, nextName, schema.primaryKey),
          fail,
        )
      })
    })
  }

  /** @param {string} name @param {string} field @returns {Promise<void>} */
  async dropField(name, field) {
    const tableName = normalizeName(name, 'Table name')
    const fieldName = normalizeFieldName(field, 'Field name')

    await this.enqueueSchemaChange(async () => {
      const db = await this.openDatabase()
      const schema = readStoreSchema(db, tableName)
      if (fieldName === schema.primaryKey) {
        throw new TypeError(`Cannot drop primary-key field "${fieldName}".`)
      }
      const nextSchema = {
        primaryKey: schema.primaryKey,
        autoIncrement: schema.autoIncrement,
        indexes: schema.indexes.filter(fields => !fields.includes(fieldName)),
      }

      await this.upgradeDatabase(db, (upgradeDb, transaction, fail) => {
        rebuildStore(
          upgradeDb,
          transaction,
          tableName,
          nextSchema,
          record => dropRecordField(record, fieldName),
          fail,
        )
      })
    })
  }

  /** @param {string} name @param {RecordType} record @returns {Promise<DbKey>} */
  async put(name, record) {
    const keys = await this.putMany(name, [record])
    return keys[0]
  }

  /** @param {string} name @param {readonly RecordType[]} records @returns {Promise<DbKey[]>} */
  async putMany(name, records) {
    const tableName = normalizeName(name, 'Table name')
    if (!Array.isArray(records)) {
      throw new TypeError('Records must be an array.')
    }
    const db = await this.getDatabase()
    const schema = readStoreSchema(db, tableName)
    for (let i = 0; i < records.length; i++) {
      assertRecordForTable(records[i], schema)
    }
    if (records.length === 0) {
      return []
    }

    return await new Promise((resolve, reject) => {
      /** @type {IDBTransaction} */
      let transaction
      /** @type {DbKey[]} */
      const keys = new Array(records.length)
      try {
        transaction = db.transaction(tableName, 'readwrite')
        const store = transaction.objectStore(tableName)
        for (let i = 0; i < records.length; i++) {
          const request = store.put(records[i])
          request.addEventListener('success', () => {
            assertDbKey(request.result, 'Generated primary key')
            if (schema.autoIncrement) {
              assertAutoIncrementKey(request.result, 'Generated primary key')
            }
            keys[i] = request.result
          }, { once: true })
        }
      } catch (error) {
        reject(normalizeIndexedDbError(error, tableName))
        return
      }

      transaction.addEventListener('complete', () => resolve(keys), { once: true })
      transaction.addEventListener('abort', () => {
        reject(transaction.error || new Error(`IndexedDB write for "${tableName}" was aborted.`))
      }, { once: true })
      transaction.addEventListener('error', () => {
        reject(transaction.error || new Error(`IndexedDB write for "${tableName}" failed.`))
      }, { once: true })
    })
  }

  /** @param {string} name @param {DbKey} key @returns {Promise<RecordType | undefined>} */
  async get(name, key) {
    const tableName = normalizeName(name, 'Table name')
    assertDbKey(key, 'Primary key')
    const db = await this.getDatabase()
    return await runRequest(db, tableName, 'readonly', store => store.get(key))
  }

  /** @param {string} name @param {DbKey} key @returns {Promise<boolean>} */
  async delete(name, key) {
    const tableName = normalizeName(name, 'Table name')
    assertDbKey(key, 'Primary key')
    const db = await this.getDatabase()
    return await deleteOne(db, tableName, key)
  }

  /** @param {string} name @param {DbWhere} [where] @returns {Promise<number>} */
  async deleteMany(name, where) {
    const tableName = normalizeName(name, 'Table name')
    const normalizedWhere = normalizeWhere(where)
    const db = await this.getDatabase()
    readStoreSchema(db, tableName)
    return await mutateByCursor(db, tableName, normalizedWhere, undefined)
  }

  /** @param {string} name @returns {Promise<void>} */
  async clear(name) {
    const tableName = normalizeName(name, 'Table name')
    const db = await this.getDatabase()
    await runRequest(db, tableName, 'readwrite', store => store.clear())
  }

  /** @param {string} name @param {DbWhere} [where] @returns {Promise<number>} */
  async count(name, where) {
    const tableName = normalizeName(name, 'Table name')
    const normalizedWhere = normalizeWhere(where)
    const db = await this.getDatabase()
    if (!normalizedWhere) {
      return await runRequest(db, tableName, 'readonly', store => store.count())
    }
    const records = await readCandidates(db, tableName, normalizedWhere)
    let count = 0
    for (let i = 0; i < records.length; i++) {
      if (matchesWhere(records[i], normalizedWhere)) {
        count++
      }
    }
    return count
  }

  /** @param {string} name @param {DbQuery} [query] @returns {Promise<RecordType[]>} */
  async list(name, query = {}) {
    const tableName = normalizeName(name, 'Table name')
    const normalizedQuery = normalizeQuery(query)
    const db = await this.getDatabase()
    const schema = readStoreSchema(db, tableName)
    const records = normalizedQuery.where
      ? await readCandidates(db, tableName, normalizedQuery.where)
      : await runRequest(db, tableName, 'readonly', store => store.getAll())
    /** @type {RecordType[]} */
    const matching = []

    for (let i = 0; i < records.length; i++) {
      const record = records[i]
      if (
        (!normalizedQuery.where || matchesWhere(record, normalizedQuery.where))
        && matchesSearch(record, normalizedQuery.search, normalizedQuery.searchFields)
      ) {
        matching.push(/** @type {RecordType} */ (record))
      }
    }

    const orderBy = normalizedQuery.orderBy || schema.primaryKey
    matching.sort((left, right) => {
      const compared = compareDbValues(left[orderBy], right[orderBy])
      if (compared !== 0) {
        return normalizedQuery.order === 'desc' ? -compared : compared
      }
      return compareDbValues(left[schema.primaryKey], right[schema.primaryKey])
    })

    const end = normalizedQuery.limit === undefined
      ? undefined
      : normalizedQuery.offset + normalizedQuery.limit
    return matching.slice(normalizedQuery.offset, end)
  }

  /**
   * @param {string} name
   * @param {DbWhere | undefined} where
   * @param {DbChanges} changes
   * @returns {Promise<number>}
   */
  async updateMany(name, where, changes) {
    const tableName = normalizeName(name, 'Table name')
    const normalizedWhere = normalizeWhere(where)
    const normalizedChanges = normalizeChanges(changes)
    const db = await this.getDatabase()
    const schema = readStoreSchema(db, tableName)
    if (Object.prototype.hasOwnProperty.call(normalizedChanges, schema.primaryKey)) {
      throw new TypeError(`updateMany cannot change primary-key field "${schema.primaryKey}".`)
    }
    return await mutateByCursor(db, tableName, normalizedWhere, normalizedChanges)
  }

  /** @returns {Promise<void>} */
  async close() {
    await this.schemaQueue
    const db = this.db || (this.openPromise ? await this.openPromise : undefined)
    db?.close()
    this.db = undefined
    this.openPromise = undefined
  }

  /** @private @returns {Promise<IDBDatabase>} */
  async getDatabase() {
    await this.schemaQueue
    return await this.openDatabase()
  }

  /** @private @returns {Promise<IDBDatabase>} */
  async openDatabase() {
    if (this.db) {
      return this.db
    }
    if (!this.openPromise) {
      this.openPromise = requestDatabaseOpen(this.dbName)
        .then(db => this.trackDatabase(db))
        .catch(error => {
          this.openPromise = undefined
          throw error
        })
    }
    return await this.openPromise
  }

  /** @private @param {IDBDatabase} db @returns {IDBDatabase} */
  trackDatabase(db) {
    this.db = db
    this.openPromise = Promise.resolve(db)
    db.addEventListener('versionchange', () => {
      db.close()
      if (this.db === db) {
        this.db = undefined
        this.openPromise = undefined
      }
    })
    return db
  }

  /**
   * @private
   * @param {IDBDatabase} currentDb
   * @param {(db: IDBDatabase, transaction: IDBTransaction, fail: (error: unknown) => void) => void} upgrade
   * @returns {Promise<IDBDatabase>}
   */
  async upgradeDatabase(currentDb, upgrade) {
    const version = currentDb.version + 1
    currentDb.close()
    if (this.db === currentDb) {
      this.db = undefined
      this.openPromise = undefined
    }
    const db = await requestDatabaseOpen(this.dbName, version, upgrade)
    return this.trackDatabase(db)
  }

  /**
   * @private
   * @template Result
   * @param {() => Promise<Result>} change
   * @returns {Promise<Result>}
   */
  async enqueueSchemaChange(change) {
    const operation = this.schemaQueue.then(change)
    this.schemaQueue = operation.then(() => undefined, () => undefined)
    return await operation
  }
}

/** @param {DbTableOptions} options @returns {TableSchema} */
function normalizeTableOptions(options) {
  if (!options || typeof options !== 'object') {
    throw new TypeError('Table options are required.')
  }
  const primaryKey = normalizeFieldName(options.primaryKey, 'Primary-key field')
  if (options.autoIncrement !== undefined && typeof options.autoIncrement !== 'boolean') {
    throw new TypeError('Table autoIncrement must be a boolean.')
  }
  if (options.indexes !== undefined && !Array.isArray(options.indexes)) {
    throw new TypeError('Table indexes must be an array.')
  }

  const indexes = []
  const source = options.indexes || []
  for (let i = 0; i < source.length; i++) {
    const fields = normalizeIndex(source[i])
    if (fields.length === 1 && fields[0] === primaryKey) {
      continue
    }
    if (!hasIndex(indexes, fields)) {
      indexes.push(fields)
    }
  }
  return {
    primaryKey,
    autoIncrement: Boolean(options.autoIncrement),
    indexes,
  }
}

/** @param {DbIndex} index @returns {string[]} */
function normalizeIndex(index) {
  const source = typeof index === 'string' ? [index] : index
  if (!Array.isArray(source) || source.length === 0) {
    throw new TypeError('Index must be a field name or a non-empty field array.')
  }
  const fields = /** @type {string[]} */ ([])
  for (let i = 0; i < source.length; i++) {
    const field = normalizeFieldName(source[i], 'Index field')
    if (fields.includes(field)) {
      throw new TypeError(`Compound index contains duplicate field "${field}".`)
    }
    fields.push(field)
  }
  return fields
}

/** @param {DbQuery} query @returns {NormalizedQuery} */
function normalizeQuery(query) {
  if (!query || typeof query !== 'object' || Array.isArray(query)) {
    throw new TypeError('Query must be an object.')
  }
  const order = query.order || 'asc'
  if (order !== 'asc' && order !== 'desc') {
    throw new TypeError('Query order must be "asc" or "desc".')
  }
  const normalized = {
    where: normalizeWhere(query.where),
    search: normalizeSearch(query.search),
    searchFields: normalizeFieldList(query.searchFields, 'Search fields'),
    order,
    offset: normalizeNonNegativeInteger(query.offset, 'Query offset', 0),
    limit: query.limit === undefined
      ? undefined
      : normalizeNonNegativeInteger(query.limit, 'Query limit'),
    orderBy: query.orderBy === undefined
      ? undefined
      : normalizeFieldName(query.orderBy, 'Order field'),
  }
  return normalized
}

/** @param {DbWhere | undefined} where @returns {DbWhere | undefined} */
function normalizeWhere(where) {
  if (where === undefined) {
    return undefined
  }
  if (!where || typeof where !== 'object' || Array.isArray(where)) {
    throw new TypeError('Filter must be an object.')
  }

  const keys = Object.keys(where)
  if ('field' in where || 'value' in where || 'operator' in where) {
    if (keys.some(key => key !== 'field' && key !== 'value' && key !== 'operator')) {
      throw new TypeError('A field filter cannot contain logical filter properties.')
    }
    const condition = /** @type {DbCondition} */ (where)
    const field = normalizeFieldName(condition.field, 'Filter field')
    const operator = condition.operator === undefined ? 'eq' : normalizeOperator(condition.operator)
    assertDbScalar(condition.value, `Filter field "${field}"`)
    if (isRangeOperator(operator) && typeof condition.value !== 'string' && typeof condition.value !== 'number') {
      throw new TypeError(`Filter operator "${operator}" requires a string or number value.`)
    }
    return { field, value: condition.value, operator }
  }

  if ('and' in where) {
    if (keys.length !== 1 || !Array.isArray(where.and)) {
      throw new TypeError('An "and" filter must contain only an array of filters.')
    }
    return { and: where.and.map(normalizeRequiredWhere) }
  }
  if ('or' in where) {
    if (keys.length !== 1 || !Array.isArray(where.or)) {
      throw new TypeError('An "or" filter must contain only an array of filters.')
    }
    return { or: where.or.map(normalizeRequiredWhere) }
  }
  if ('not' in where) {
    if (keys.length !== 1) {
      throw new TypeError('A "not" filter must contain only one nested filter.')
    }
    return { not: normalizeRequiredWhere(where.not) }
  }
  throw new TypeError('Filter must contain field/value, and, or, or not.')
}

/** @param {DbWhere} where @returns {DbWhere} */
function normalizeRequiredWhere(where) {
  const normalized = normalizeWhere(where)
  if (!normalized) {
    throw new TypeError('Nested filter is required.')
  }
  return normalized
}

/** @param {unknown} operator @returns {DbComparisonOperator} */
function normalizeOperator(operator) {
  if (operator === 'eq' || operator === 'ne' || operator === 'lt' || operator === 'lte' || operator === 'gt' || operator === 'gte') {
    return operator
  }
  throw new TypeError('Filter operator must be eq, ne, lt, lte, gt, or gte.')
}

/** @param {DbChanges} changes @returns {Record<string, DbValue>} */
function normalizeChanges(changes) {
  if (!changes || typeof changes !== 'object' || Array.isArray(changes)) {
    throw new TypeError('Update changes must be an object.')
  }
  const fields = Object.keys(changes)
  if (fields.length === 0) {
    throw new TypeError('Update changes must contain at least one field.')
  }
  const normalized = /** @type {Record<string, DbValue>} */ ({})
  for (let i = 0; i < fields.length; i++) {
    const field = normalizeFieldName(fields[i], 'Update field')
    const value = changes[fields[i]]
    assertDbValue(value, `Update field "${field}"`, new WeakSet())
    normalized[field] = value
  }
  return normalized
}

/** @param {IDBDatabase} db @param {string} tableName @returns {TableSchema} */
function readStoreSchema(db, tableName) {
  if (!db.objectStoreNames.contains(tableName)) {
    throw new Error(`Table "${tableName}" does not exist.`)
  }
  const transaction = db.transaction(tableName, 'readonly')
  const store = transaction.objectStore(tableName)
  if (typeof store.keyPath !== 'string') {
    transaction.abort()
    throw new Error(`Table "${tableName}" has an unsupported primary key.`)
  }
  const indexes = []
  for (let i = 0; i < store.indexNames.length; i++) {
    const index = store.index(store.indexNames[i])
    if (index.unique || index.multiEntry) {
      transaction.abort()
      throw new Error(`Table "${tableName}" has an unsupported index definition.`)
    }
    indexes.push(normalizeExistingKeyPath(index.keyPath, `Index "${index.name}"`))
  }
  return {
    primaryKey: store.keyPath,
    autoIncrement: store.autoIncrement,
    indexes,
  }
}

/** @param {string} tableName @param {TableSchema} current @param {TableSchema} requested */
function assertCompatibleSchema(tableName, current, requested) {
  if (current.primaryKey !== requested.primaryKey || current.autoIncrement !== requested.autoIncrement) {
    throw new Error(`Table "${tableName}" has incompatible primary-key settings.`)
  }
}

/** @param {IDBDatabase} db @param {string} tableName @param {readonly string[]} fields @returns {string | undefined} */
function findIndexName(db, tableName, fields) {
  const transaction = db.transaction(tableName, 'readonly')
  const store = transaction.objectStore(tableName)
  for (let i = 0; i < store.indexNames.length; i++) {
    const name = store.indexNames[i]
    if (sameFields(normalizeExistingKeyPath(store.index(name).keyPath, `Index "${name}"`), fields)) {
      return name
    }
  }
  return undefined
}

/** @param {IDBObjectStore} store @param {readonly string[][]} indexes */
function createIndexes(store, indexes) {
  for (let i = 0; i < indexes.length; i++) {
    const fields = indexes[i]
    if (!findIndexInStore(store, fields)) {
      store.createIndex(createIndexName(store, fields), fields.length === 1 ? fields[0] : fields)
    }
  }
}

/** @param {IDBObjectStore} store @param {readonly string[]} fields @returns {IDBIndex | undefined} */
function findIndexInStore(store, fields) {
  for (let i = 0; i < store.indexNames.length; i++) {
    const index = store.index(store.indexNames[i])
    if (sameFields(normalizeExistingKeyPath(index.keyPath, `Index "${index.name}"`), fields)) {
      return index
    }
  }
  return undefined
}

/** @param {IDBObjectStore} store @param {readonly string[]} fields @returns {string} */
function createIndexName(store, fields) {
  const base = `idx:${fields.join('+')}`
  if (!store.indexNames.contains(base)) {
    return base
  }
  let suffix = 2
  while (store.indexNames.contains(`${base}:${suffix}`)) {
    suffix++
  }
  return `${base}:${suffix}`
}

/** @param {string | string[]} keyPath @param {string} label @returns {string[]} */
function normalizeExistingKeyPath(keyPath, label) {
  const source = typeof keyPath === 'string' ? [keyPath] : keyPath
  if (!Array.isArray(source) || source.length === 0 || source.some(field => typeof field !== 'string')) {
    throw new Error(`${label} has an unsupported key path.`)
  }
  return [...source]
}

/**
 * @param {IDBDatabase} db
 * @param {IDBTransaction} transaction
 * @param {string} tableName
 * @param {TableSchema} schema
 * @param {(record: DbRecord) => DbRecord} transform
 * @param {(error: unknown) => void} fail
 */
function rebuildStore(db, transaction, tableName, schema, transform, fail) {
  const request = transaction.objectStore(tableName).getAll()
  request.addEventListener('success', () => {
    try {
      const records = request.result
      const transformed = []
      for (let i = 0; i < records.length; i++) {
        const record = transform(records[i])
        assertRecordForTable(record, schema)
        transformed.push(record)
      }

      db.deleteObjectStore(tableName)
      const store = db.createObjectStore(tableName, {
        keyPath: schema.primaryKey,
        autoIncrement: schema.autoIncrement,
      })
      createIndexes(store, schema.indexes)
      for (let i = 0; i < transformed.length; i++) {
        store.put(transformed[i])
      }
    } catch (error) {
      fail(error)
    }
  }, { once: true })
  request.addEventListener('error', () => fail(request.error || new Error('IndexedDB schema read failed.')), { once: true })
}

/** @param {DbRecord} record @param {string} oldName @param {string} newName @param {string} primaryKey @returns {DbRecord} */
function renameRecordField(record, oldName, newName, primaryKey) {
  if (!Object.prototype.hasOwnProperty.call(record, oldName)) {
    if (oldName === primaryKey) {
      throw new Error(`Stored record is missing primary-key field "${oldName}".`)
    }
    return record
  }
  if (Object.prototype.hasOwnProperty.call(record, newName)) {
    throw new Error(`Cannot rename field "${oldName}" because "${newName}" already exists in a record.`)
  }
  const updated = { ...record, [newName]: record[oldName] }
  delete updated[oldName]
  return updated
}

/** @param {DbRecord} record @param {string} field @returns {DbRecord} */
function dropRecordField(record, field) {
  if (!Object.prototype.hasOwnProperty.call(record, field)) {
    return record
  }
  const updated = { ...record }
  delete updated[field]
  return updated
}

/**
 * @param {readonly string[][]} indexes
 * @param {string} oldName
 * @param {string} newName
 * @param {string} oldPrimaryKey
 * @param {string} newPrimaryKey
 * @returns {string[][]}
 */
function renameIndexedField(indexes, oldName, newName, oldPrimaryKey, newPrimaryKey) {
  const renamed = []
  for (let i = 0; i < indexes.length; i++) {
    const fields = indexes[i].map(field => field === oldName ? newName : field)
    if (fields.length === 1 && fields[0] === newPrimaryKey) {
      continue
    }
    if (!hasIndex(renamed, fields)) {
      renamed.push(fields)
    }
  }
  if (oldPrimaryKey === oldName && oldPrimaryKey !== newPrimaryKey) {
    return renamed
  }
  return renamed
}

/** @param {IDBDatabase} db @param {string} tableName @param {DbWhere} where @returns {Promise<DbRecord[]>} */
async function readCandidates(db, tableName, where) {
  return await runRequest(db, tableName, 'readonly', store => {
    const selection = selectIndexedDbSource(store, where)
    return selection.source.getAll(selection.range)
  })
}

/** @param {IDBObjectStore} store @param {DbWhere} where @returns {IndexedDbSelection} */
function selectIndexedDbSource(store, where) {
  const equality = collectAndEqualities(where)
  if (equality) {
    if (typeof store.keyPath === 'string' && Object.prototype.hasOwnProperty.call(equality, store.keyPath)) {
      const value = equality[store.keyPath]
      if (isIndexedDbKey(value)) {
        return { source: store, range: IDBKeyRange.only(value) }
      }
    }
    let best
    let bestLength = 0
    for (let i = 0; i < store.indexNames.length; i++) {
      const index = store.index(store.indexNames[i])
      const fields = normalizeExistingKeyPath(index.keyPath, `Index "${index.name}"`)
      const values = []
      let usable = true
      for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
        if (!Object.prototype.hasOwnProperty.call(equality, fields[fieldIndex])) {
          usable = false
          break
        }
        values.push(equality[fields[fieldIndex]])
      }
      const key = fields.length === 1 ? values[0] : values
      if (usable && fields.length > bestLength && isIndexedDbKey(key)) {
        best = { source: index, range: IDBKeyRange.only(key) }
        bestLength = fields.length
      }
    }
    if (best) {
      return best
    }
  }

  if ('field' in where && where.operator !== 'ne' && isIndexedDbKey(where.value)) {
    const source = typeof store.keyPath === 'string' && store.keyPath === where.field
      ? store
      : findIndexInStore(store, [where.field])
    if (source) {
      return {
        source,
        range: createKeyRange(where.operator || 'eq', /** @type {IDBValidKey} */ (where.value)),
      }
    }
  }
  return { source: store, range: undefined }
}

/** @param {DbWhere} where @returns {Record<string, DbScalar> | undefined} */
function collectAndEqualities(where) {
  const values = /** @type {Record<string, DbScalar>} */ ({})
  /** @param {DbWhere} filter @returns {boolean} */
  const visit = filter => {
    if ('field' in filter) {
      if ((filter.operator || 'eq') !== 'eq') {
        return false
      }
      values[filter.field] = filter.value
      return true
    }
    if ('and' in filter) {
      for (let i = 0; i < filter.and.length; i++) {
        if (!visit(filter.and[i])) {
          return false
        }
      }
      return true
    }
    return false
  }
  return visit(where) ? values : undefined
}

/** @param {DbComparisonOperator} operator @param {IDBValidKey} value @returns {IDBKeyRange} */
function createKeyRange(operator, value) {
  if (operator === 'eq') return IDBKeyRange.only(value)
  if (operator === 'lt') return IDBKeyRange.upperBound(value, true)
  if (operator === 'lte') return IDBKeyRange.upperBound(value)
  if (operator === 'gt') return IDBKeyRange.lowerBound(value, true)
  return IDBKeyRange.lowerBound(value)
}

/**
 * @param {IDBDatabase} db
 * @param {string} tableName
 * @param {DbWhere | undefined} where
 * @param {Record<string, DbValue> | undefined} changes
 * @returns {Promise<number>}
 */
function mutateByCursor(db, tableName, where, changes) {
  return new Promise((resolve, reject) => {
    /** @type {IDBTransaction} */
    let transaction
    let count = 0
    try {
      transaction = db.transaction(tableName, 'readwrite')
      const store = transaction.objectStore(tableName)
      const request = store.openCursor()
      request.addEventListener('success', () => {
        const cursor = request.result
        if (!cursor) {
          return
        }
        const record = cursor.value
        if (!where || matchesWhere(record, where)) {
          if (changes) {
            const updated = { ...record, ...changes }
            assertDbRecord(updated)
            cursor.update(updated)
          } else {
            cursor.delete()
          }
          count++
        }
        cursor.continue()
      })
    } catch (error) {
      reject(normalizeIndexedDbError(error, tableName))
      return
    }

    transaction.addEventListener('complete', () => resolve(count), { once: true })
    transaction.addEventListener('abort', () => {
      reject(transaction.error || new Error(`IndexedDB mutation for "${tableName}" was aborted.`))
    }, { once: true })
    transaction.addEventListener('error', () => {
      reject(transaction.error || new Error(`IndexedDB mutation for "${tableName}" failed.`))
    }, { once: true })
  })
}

/** @param {IDBDatabase} db @param {string} tableName @param {DbKey} key @returns {Promise<boolean>} */
function deleteOne(db, tableName, key) {
  return new Promise((resolve, reject) => {
    /** @type {IDBTransaction} */
    let transaction
    let existed = false
    try {
      transaction = db.transaction(tableName, 'readwrite')
      const store = transaction.objectStore(tableName)
      const request = store.getKey(key)
      request.addEventListener('success', () => {
        if (request.result !== undefined) {
          existed = true
          store.delete(key)
        }
      }, { once: true })
    } catch (error) {
      reject(normalizeIndexedDbError(error, tableName))
      return
    }
    transaction.addEventListener('complete', () => resolve(existed), { once: true })
    transaction.addEventListener('abort', () => reject(transaction.error || new Error('IndexedDB delete was aborted.')), { once: true })
    transaction.addEventListener('error', () => reject(transaction.error || new Error('IndexedDB delete failed.')), { once: true })
  })
}

/** @param {DbRecord} record @param {DbWhere} where @returns {boolean} */
function matchesWhere(record, where) {
  if ('field' in where) {
    return compareCondition(record[where.field], where.operator || 'eq', where.value)
  }
  if ('and' in where) {
    for (let i = 0; i < where.and.length; i++) {
      if (!matchesWhere(record, where.and[i])) return false
    }
    return true
  }
  if ('or' in where) {
    for (let i = 0; i < where.or.length; i++) {
      if (matchesWhere(record, where.or[i])) return true
    }
    return false
  }
  return !matchesWhere(record, where.not)
}

/** @param {DbValue | undefined} actual @param {DbComparisonOperator} operator @param {DbScalar} expected @returns {boolean} */
function compareCondition(actual, operator, expected) {
  if (operator === 'eq') return actual === expected
  if (operator === 'ne') return actual !== expected
  if (typeof actual !== typeof expected || (typeof actual !== 'string' && typeof actual !== 'number')) {
    return false
  }
  const left = /** @type {string | number} */ (actual)
  const right = /** @type {string | number} */ (expected)
  if (operator === 'lt') return left < right
  if (operator === 'lte') return left <= right
  if (operator === 'gt') return left > right
  return left >= right
}

/** @param {DbRecord} record @param {string | undefined} search @param {string[] | undefined} fields @returns {boolean} */
function matchesSearch(record, search, fields) {
  if (!search) {
    return true
  }
  const values = []
  const sourceFields = fields || Object.keys(record)
  for (let i = 0; i < sourceFields.length; i++) {
    const value = record[sourceFields[i]]
    if (typeof value === 'string') {
      values.push(value)
    }
  }
  const haystack = normalizeSearchText(values.join(' '))
  const terms = normalizeSearchText(search).split(/\s+/).filter(Boolean)
  for (let i = 0; i < terms.length; i++) {
    if (!haystack.includes(terms[i])) {
      return false
    }
  }
  return true
}

/** @param {DbValue | undefined} left @param {DbValue | undefined} right @returns {number} */
function compareDbValues(left, right) {
  const leftRank = dbValueRank(left)
  const rightRank = dbValueRank(right)
  if (leftRank !== rightRank) return leftRank - rightRank
  if (left === right) return 0
  if (typeof left === 'number' && typeof right === 'number') return left - right
  if (typeof left === 'boolean' && typeof right === 'boolean') return Number(left) - Number(right)
  if (typeof left === 'string' && typeof right === 'string') return left.localeCompare(right)
  return 0
}

/** @param {DbValue | undefined} value @returns {number} */
function dbValueRank(value) {
  if (value === undefined) return 0
  if (value === null) return 1
  if (typeof value === 'boolean') return 2
  if (typeof value === 'number') return 3
  if (typeof value === 'string') return 4
  if (value instanceof ArrayBuffer) return 5
  return 6
}

/** @param {DbRecord} record @param {TableSchema} schema */
function assertRecordForTable(record, schema) {
  assertDbRecord(record)
  const key = record[schema.primaryKey]
  if (key === undefined && !schema.autoIncrement) {
    throw new TypeError(`Record requires primary-key field "${schema.primaryKey}".`)
  }
  if (key !== undefined) {
    assertDbKey(key, `Primary-key field "${schema.primaryKey}"`)
    if (schema.autoIncrement) {
      assertAutoIncrementKey(key, `Primary-key field "${schema.primaryKey}"`)
    }
  }
}

/** @param {unknown} record @returns {asserts record is DbRecord} */
function assertDbRecord(record) {
  if (!record || typeof record !== 'object' || Array.isArray(record) || record instanceof ArrayBuffer) {
    throw new TypeError('Database record must be a plain object.')
  }
  assertDbValue(record, 'Record', new WeakSet())
}

/** @param {unknown} value @param {string} label @param {WeakSet<object>} seen @returns {asserts value is DbValue} */
function assertDbValue(value, label, seen) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean' || value instanceof ArrayBuffer) {
    return
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new TypeError(`${label} contains a non-finite number.`)
    return
  }
  if (!value || typeof value !== 'object') {
    throw new TypeError(`${label} contains an unsupported value.`)
  }
  if (seen.has(value)) {
    throw new TypeError(`${label} contains a circular reference.`)
  }
  const prototype = Object.getPrototypeOf(value)
  if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) {
    throw new TypeError(`${label} contains a non-plain object.`)
  }
  seen.add(value)
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      assertDbValue(value[i], label, seen)
    }
  } else {
    const objectValue = /** @type {Record<string, unknown>} */ (value)
    const fields = Object.keys(objectValue)
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].includes('\u0000')) {
        throw new TypeError(`${label} contains a field name with a null character.`)
      }
      assertDbValue(objectValue[fields[i]], label, seen)
    }
  }
  seen.delete(value)
}

/** @param {unknown} value @param {string} label @returns {asserts value is DbKey} */
function assertDbKey(value, label) {
  if (typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value))) {
    return
  }
  throw new TypeError(`${label} must be a string or finite number.`)
}

/** @param {unknown} value @param {string} label @returns {asserts value is number} */
function assertAutoIncrementKey(value, label) {
  if (typeof value !== 'number' || !Number.isSafeInteger(value)) {
    throw new TypeError(`${label} must be a safe integer in an auto-increment table.`)
  }
}

/** @param {unknown} value @param {string} label @returns {asserts value is DbScalar} */
function assertDbScalar(value, label) {
  if (value === null || typeof value === 'boolean' || typeof value === 'string') return
  if (typeof value === 'number' && Number.isFinite(value)) return
  throw new TypeError(`${label} must be a string, finite number, boolean, or null.`)
}

/** @param {unknown} value @param {string} label @returns {string} */
function normalizeName(value, label) {
  if (typeof value !== 'string') {
    throw new TypeError(`${label} must be a non-empty string.`)
  }
  const name = value.trim()
  if (!name || name.includes('\u0000')) {
    throw new TypeError(`${label} must be a non-empty string without null characters.`)
  }
  return name
}

/** @param {unknown} value @param {string} label @returns {string} */
function normalizeFieldName(value, label) {
  const name = normalizeName(value, label)
  if (name.includes('.')) {
    throw new TypeError(`${label} must be a top-level field name without dots.`)
  }
  return name
}

/** @param {readonly string[] | undefined} value @param {string} label @returns {string[] | undefined} */
function normalizeFieldList(value, label) {
  if (value === undefined) return undefined
  if (!Array.isArray(value)) throw new TypeError(`${label} must be an array.`)
  const fields = /** @type {string[]} */ ([])
  for (let i = 0; i < value.length; i++) {
    const field = normalizeFieldName(value[i], `${label} item`)
    if (!fields.includes(field)) fields.push(field)
  }
  return fields
}

/** @param {unknown} value @returns {string | undefined} */
function normalizeSearch(value) {
  if (value === undefined) return undefined
  if (typeof value !== 'string') throw new TypeError('Query search must be a string.')
  const search = value.trim()
  return search || undefined
}

/** @param {string} value @returns {string} */
function normalizeSearchText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ł/g, 'l')
    .replace(/ß/g, 'ss')
    .replace(/æ/g, 'ae')
}

/** @param {unknown} value @param {string} label @param {number} [fallback] @returns {number} */
function normalizeNonNegativeInteger(value, label, fallback) {
  if (value === undefined && fallback !== undefined) return fallback
  if (!Number.isInteger(value) || Number(value) < 0) {
    throw new TypeError(`${label} must be a non-negative integer.`)
  }
  return Number(value)
}

/** @param {DbComparisonOperator} operator @returns {boolean} */
function isRangeOperator(operator) {
  return operator === 'lt' || operator === 'lte' || operator === 'gt' || operator === 'gte'
}

/** @param {readonly string[][]} indexes @param {readonly string[]} fields @returns {boolean} */
function hasIndex(indexes, fields) {
  for (let i = 0; i < indexes.length; i++) {
    if (sameFields(indexes[i], fields)) return true
  }
  return false
}

/** @param {readonly string[]} left @param {readonly string[]} right @returns {boolean} */
function sameFields(left, right) {
  if (left.length !== right.length) return false
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) return false
  }
  return true
}

/** @param {unknown} value @returns {boolean} */
function isIndexedDbKey(value) {
  if (!globalThis.IDBKeyRange) return false
  try {
    globalThis.IDBKeyRange.only(/** @type {IDBValidKey} */ (value))
    return true
  } catch {
    return false
  }
}

/**
 * @template Result
 * @param {IDBDatabase} db
 * @param {string} tableName
 * @param {IDBTransactionMode} mode
 * @param {(store: IDBObjectStore) => IDBRequest<Result>} operation
 * @returns {Promise<Result>}
 */
function runRequest(db, tableName, mode, operation) {
  return new Promise((resolve, reject) => {
    /** @type {IDBTransaction} */
    let transaction
    /** @type {IDBRequest<Result>} */
    let request
    try {
      transaction = db.transaction(tableName, mode)
      request = operation(transaction.objectStore(tableName))
    } catch (error) {
      reject(normalizeIndexedDbError(error, tableName))
      return
    }
    request.addEventListener('success', () => resolve(request.result), { once: true })
    request.addEventListener('error', () => reject(request.error || new Error('IndexedDB request failed.')), { once: true })
    transaction.addEventListener('abort', () => reject(transaction.error || new Error('IndexedDB transaction was aborted.')), { once: true })
  })
}

/**
 * @param {string} dbName
 * @param {number} [version]
 * @param {(db: IDBDatabase, transaction: IDBTransaction, fail: (error: unknown) => void) => void} [upgrade]
 * @returns {Promise<IDBDatabase>}
 */
function requestDatabaseOpen(dbName, version, upgrade) {
  requireIndexedDb()
  return new Promise((resolve, reject) => {
    const request = version === undefined
      ? indexedDB.open(dbName)
      : indexedDB.open(dbName, version)
    let settled = false
    /** @type {Error | undefined} */
    let upgradeError

    /** @param {unknown} error */
    const fail = error => {
      upgradeError = error instanceof Error ? error : new Error(String(error))
      try {
        request.transaction?.abort()
      } catch {
        // The transaction may already be aborting.
      }
    }

    request.addEventListener('upgradeneeded', () => {
      if (!upgrade || !request.transaction) return
      try {
        upgrade(request.result, request.transaction, fail)
      } catch (error) {
        fail(error)
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
      if (settled) return
      settled = true
      reject(upgradeError || request.error || new Error(`Could not open IndexedDB database "${dbName}".`))
    }, { once: true })
    request.addEventListener('blocked', () => {
      if (settled) return
      settled = true
      reject(new Error(`IndexedDB upgrade for "${dbName}" is blocked by another open connection.`))
    }, { once: true })
  })
}

/** @param {unknown} error @param {string} tableName @returns {Error} */
function normalizeIndexedDbError(error, tableName) {
  if (typeof DOMException !== 'undefined' && error instanceof DOMException && error.name === 'NotFoundError') {
    return new Error(`Table "${tableName}" does not exist.`, { cause: error })
  }
  return error instanceof Error ? error : new Error(String(error))
}

function requireIndexedDb() {
  if (!globalThis.indexedDB || !globalThis.IDBKeyRange) {
    throw new Error('IndexedDB is not available in this environment.')
  }
}
