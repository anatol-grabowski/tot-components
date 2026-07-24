// @ts-check

import { DatabaseSync } from 'node:sqlite'

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
 * @typedef {object} DbServiceSqliteOptions
 * @property {string | URL} path
 * @property {number} [timeout]
 */

/**
 * @typedef {object} TableSchema
 * @property {string} name
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

const SCHEMA_TABLE = '__tot_db_schema'
const KEY_COLUMN = '__tot_db_key'
const RECORD_COLUMN = '__tot_db_record'
const BINARY_MARKER = '\u0000totDbBinary'

/**
 * Node SQLite implementation of the generic database service.
 *
 * Uses the built-in `node:sqlite` module and therefore needs no package
 * dependency. Managed tables contain a portable primary-key column and one JSON
 * record column. `ArrayBuffer` values are tagged and base64-encoded inside the
 * JSON record. Single-field and compound indexes use SQLite JSON expressions.
 * Bulk writes and schema migrations use immediate transactions. Public methods
 * remain asynchronous for API parity with IndexedDB even though SQLite work is
 * synchronous internally.
 *
 * @template {DbRecord} [RecordType=DbRecord]
 */
export class DbServiceSqlite {
  /** @param {DbServiceSqliteOptions} options */
  constructor(options) {
    const path = options?.path
    if (typeof path !== 'string' && !(path instanceof URL)) {
      throw new TypeError('DbServiceSqlite requires a string or URL path.')
    }
    if (typeof path === 'string' && !path.trim()) {
      throw new TypeError('DbServiceSqlite requires a non-empty path.')
    }
    if (options.timeout !== undefined && (!Number.isFinite(options.timeout) || options.timeout < 0)) {
      throw new TypeError('SQLite timeout must be a non-negative finite number.')
    }

    /** @private */
    this.path = path
    /** @private */
    this.timeout = options.timeout
    /** @private @type {DatabaseSync | undefined} */
    this.db = undefined
  }

  /** @param {string} name @param {DbTableOptions} options @returns {Promise<void>} */
  async createTable(name, options) {
    const tableName = normalizeName(name, 'Table name')
    const requested = normalizeTableOptions(tableName, options)
    const db = this.getDatabase()
    const current = this.readSchema(tableName)

    if (current) {
      if (current.primaryKey !== requested.primaryKey || current.autoIncrement !== requested.autoIncrement) {
        throw new Error(`Table "${tableName}" has incompatible primary-key settings.`)
      }
      const missing = /** @type {string[][]} */ ([])
      for (let i = 0; i < requested.indexes.length; i++) {
        if (!hasIndex(current.indexes, requested.indexes[i])) {
          missing.push(requested.indexes[i])
        }
      }
      if (missing.length === 0) return

      runTransaction(db, () => {
        const indexes = [...current.indexes]
        for (let i = 0; i < missing.length; i++) {
          createSqliteIndex(db, current, missing[i])
          indexes.push(missing[i])
        }
        writeSchema(db, { ...current, indexes })
      })
      return
    }

    const unmanaged = db.prepare(
      'SELECT 1 AS found FROM sqlite_master WHERE type = \'table\' AND name = ?',
    ).get(tableName)
    if (unmanaged) {
      throw new Error(`SQLite table "${tableName}" exists but is not managed by DbServiceSqlite.`)
    }

    runTransaction(db, () => {
      const keyDefinition = requested.autoIncrement
        ? 'INTEGER PRIMARY KEY AUTOINCREMENT'
        : 'ANY PRIMARY KEY'
      db.exec(`CREATE TABLE ${quoteIdentifier(tableName)} (
        ${quoteIdentifier(KEY_COLUMN)} ${keyDefinition},
        ${quoteIdentifier(RECORD_COLUMN)} TEXT NOT NULL
      ) STRICT`)
      for (let i = 0; i < requested.indexes.length; i++) {
        createSqliteIndex(db, requested, requested.indexes[i])
      }
      writeSchema(db, requested)
    })
  }

  /** @returns {Promise<string[]>} */
  async listTables() {
    const rows = this.getDatabase().prepare(`SELECT name
      FROM ${quoteIdentifier(SCHEMA_TABLE)}
      ORDER BY name`).all()
    return rows.map(row => String(row.name))
  }

  /** @param {string} name @returns {Promise<boolean>} */
  async hasTable(name) {
    return Boolean(this.readSchema(normalizeName(name, 'Table name')))
  }

  /** @param {string} name @returns {Promise<boolean>} */
  async dropTable(name) {
    const tableName = normalizeName(name, 'Table name')
    const db = this.getDatabase()
    if (!this.readSchema(tableName)) return false
    runTransaction(db, () => {
      db.exec(`DROP TABLE ${quoteIdentifier(tableName)}`)
      db.prepare(`DELETE FROM ${quoteIdentifier(SCHEMA_TABLE)} WHERE name = ?`).run(tableName)
    })
    return true
  }

  /** @param {string} name @param {DbIndex} index @returns {Promise<void>} */
  async createIndex(name, index) {
    const tableName = normalizeName(name, 'Table name')
    const fields = normalizeIndex(index)
    const db = this.getDatabase()
    const schema = this.requireSchema(tableName)
    if (fields.length === 1 && fields[0] === schema.primaryKey) return
    if (hasIndex(schema.indexes, fields)) return
    runTransaction(db, () => {
      createSqliteIndex(db, schema, fields)
      writeSchema(db, { ...schema, indexes: [...schema.indexes, fields] })
    })
  }

  /** @param {string} name @param {DbIndex} index @returns {Promise<boolean>} */
  async dropIndex(name, index) {
    const tableName = normalizeName(name, 'Table name')
    const fields = normalizeIndex(index)
    const db = this.getDatabase()
    const schema = this.requireSchema(tableName)
    if (fields.length === 1 && fields[0] === schema.primaryKey) return false
    const position = findIndexPosition(schema.indexes, fields)
    if (position < 0) return false

    runTransaction(db, () => {
      dropSqliteIndex(db, schema, fields)
      const indexes = schema.indexes.filter((_, indexPosition) => indexPosition !== position)
      writeSchema(db, { ...schema, indexes })
    })
    return true
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
    const db = this.getDatabase()
    const schema = this.requireSchema(tableName)
    if (fields.length === 1 && fields[0] === schema.primaryKey) return false
    const position = findIndexPosition(schema.indexes, fields)
    if (position < 0) return false
    if (sameFields(fields, nextFields)) return true

    const indexes = schema.indexes.filter((_, indexPosition) => indexPosition !== position)
    const targetIsPrimary = nextFields.length === 1 && nextFields[0] === schema.primaryKey
    if (!targetIsPrimary && !hasIndex(indexes, nextFields)) {
      indexes.push(nextFields)
    }
    runTransaction(db, () => {
      dropSqliteIndex(db, schema, fields)
      if (!targetIsPrimary && !hasIndex(schema.indexes, nextFields)) {
        createSqliteIndex(db, schema, nextFields)
      }
      writeSchema(db, { ...schema, indexes })
    })
    return true
  }

  /** @param {string} name @param {string} field @param {string} newField @returns {Promise<void>} */
  async renameField(name, field, newField) {
    const tableName = normalizeName(name, 'Table name')
    const oldName = normalizeFieldName(field, 'Field name')
    const nextName = normalizeFieldName(newField, 'New field name')
    if (oldName === nextName) return

    const db = this.getDatabase()
    const schema = this.requireSchema(tableName)
    const nextSchema = {
      ...schema,
      primaryKey: schema.primaryKey === oldName ? nextName : schema.primaryKey,
      indexes: renameIndexedField(schema.indexes, oldName, nextName, schema.primaryKey, nextName),
    }

    runTransaction(db, () => {
      rewriteRecords(db, schema, record => renameRecordField(record, oldName, nextName, schema.primaryKey))
      rebuildSqliteIndexes(db, schema, nextSchema)
      writeSchema(db, nextSchema)
    })
  }

  /** @param {string} name @param {string} field @returns {Promise<void>} */
  async dropField(name, field) {
    const tableName = normalizeName(name, 'Table name')
    const fieldName = normalizeFieldName(field, 'Field name')
    const db = this.getDatabase()
    const schema = this.requireSchema(tableName)
    if (fieldName === schema.primaryKey) {
      throw new TypeError(`Cannot drop primary-key field "${fieldName}".`)
    }
    const nextSchema = {
      ...schema,
      indexes: schema.indexes.filter(fields => !fields.includes(fieldName)),
    }

    runTransaction(db, () => {
      rewriteRecords(db, schema, record => dropRecordField(record, fieldName))
      rebuildSqliteIndexes(db, schema, nextSchema)
      writeSchema(db, nextSchema)
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
    const db = this.getDatabase()
    const schema = this.requireSchema(tableName)
    for (let i = 0; i < records.length; i++) {
      assertRecordForTable(records[i], schema)
    }
    if (records.length === 0) return []

    return runTransaction(db, () => {
      const keys = []
      for (let i = 0; i < records.length; i++) {
        keys.push(putRecord(db, schema, records[i]))
      }
      return keys
    })
  }

  /** @param {string} name @param {DbKey} key @returns {Promise<RecordType | undefined>} */
  async get(name, key) {
    const tableName = normalizeName(name, 'Table name')
    assertDbKey(key, 'Primary key')
    this.requireSchema(tableName)
    const row = this.getDatabase().prepare(`SELECT ${quoteIdentifier(RECORD_COLUMN)} AS record_json
      FROM ${quoteIdentifier(tableName)}
      WHERE ${quoteIdentifier(KEY_COLUMN)} = ?`).get(key)
    return row ? /** @type {RecordType} */ (parseRecord(String(row.record_json), tableName)) : undefined
  }

  /** @param {string} name @param {DbKey} key @returns {Promise<boolean>} */
  async delete(name, key) {
    const tableName = normalizeName(name, 'Table name')
    assertDbKey(key, 'Primary key')
    this.requireSchema(tableName)
    const result = this.getDatabase().prepare(`DELETE FROM ${quoteIdentifier(tableName)}
      WHERE ${quoteIdentifier(KEY_COLUMN)} = ?`).run(key)
    return normalizeCount(result.changes) > 0
  }

  /** @param {string} name @param {DbWhere} [where] @returns {Promise<number>} */
  async deleteMany(name, where) {
    const tableName = normalizeName(name, 'Table name')
    const normalizedWhere = normalizeWhere(where)
    const schema = this.requireSchema(tableName)
    const predicate = buildWhereClause(schema, normalizedWhere)
    const result = this.getDatabase().prepare(`DELETE FROM ${quoteIdentifier(tableName)}${predicate.sql}`)
      .run(...predicate.values)
    return normalizeCount(result.changes)
  }

  /** @param {string} name @returns {Promise<void>} */
  async clear(name) {
    const tableName = normalizeName(name, 'Table name')
    this.requireSchema(tableName)
    this.getDatabase().exec(`DELETE FROM ${quoteIdentifier(tableName)}`)
  }

  /** @param {string} name @param {DbWhere} [where] @returns {Promise<number>} */
  async count(name, where) {
    const tableName = normalizeName(name, 'Table name')
    const normalizedWhere = normalizeWhere(where)
    const schema = this.requireSchema(tableName)
    const predicate = buildWhereClause(schema, normalizedWhere)
    const row = this.getDatabase().prepare(`SELECT COUNT(*) AS count
      FROM ${quoteIdentifier(tableName)}${predicate.sql}`).get(...predicate.values)
    return normalizeCount(row.count)
  }

  /** @param {string} name @param {DbQuery} [query] @returns {Promise<RecordType[]>} */
  async list(name, query = {}) {
    const tableName = normalizeName(name, 'Table name')
    const normalizedQuery = normalizeQuery(query)
    const schema = this.requireSchema(tableName)
    const predicate = buildWhereClause(schema, normalizedQuery.where)
    const rows = this.getDatabase().prepare(`SELECT ${quoteIdentifier(RECORD_COLUMN)} AS record_json
      FROM ${quoteIdentifier(tableName)}${predicate.sql}`).all(...predicate.values)
    /** @type {RecordType[]} */
    const records = []
    for (let i = 0; i < rows.length; i++) {
      const record = /** @type {RecordType} */ (parseRecord(String(rows[i].record_json), tableName))
      if (matchesSearch(record, normalizedQuery.search, normalizedQuery.searchFields)) {
        records.push(record)
      }
    }

    const orderBy = normalizedQuery.orderBy || schema.primaryKey
    records.sort((left, right) => {
      const compared = compareDbValues(left[orderBy], right[orderBy])
      if (compared !== 0) {
        return normalizedQuery.order === 'desc' ? -compared : compared
      }
      return compareDbValues(left[schema.primaryKey], right[schema.primaryKey])
    })
    const end = normalizedQuery.limit === undefined
      ? undefined
      : normalizedQuery.offset + normalizedQuery.limit
    return records.slice(normalizedQuery.offset, end)
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
    const db = this.getDatabase()
    const schema = this.requireSchema(tableName)
    if (Object.prototype.hasOwnProperty.call(normalizedChanges, schema.primaryKey)) {
      throw new TypeError(`updateMany cannot change primary-key field "${schema.primaryKey}".`)
    }
    const predicate = buildWhereClause(schema, normalizedWhere)

    return runTransaction(db, () => {
      const rows = db.prepare(`SELECT ${quoteIdentifier(KEY_COLUMN)} AS record_key,
        ${quoteIdentifier(RECORD_COLUMN)} AS record_json
        FROM ${quoteIdentifier(tableName)}${predicate.sql}`).all(...predicate.values)
      const update = db.prepare(`UPDATE ${quoteIdentifier(tableName)}
        SET ${quoteIdentifier(RECORD_COLUMN)} = ?
        WHERE ${quoteIdentifier(KEY_COLUMN)} = ?`)
      for (let i = 0; i < rows.length; i++) {
        const record = parseRecord(String(rows[i].record_json), tableName)
        const updated = { ...record, ...normalizedChanges }
        assertDbRecord(updated)
        update.run(serializeRecord(updated), rows[i].record_key)
      }
      return rows.length
    })
  }

  /** @returns {Promise<void>} */
  async close() {
    this.db?.close()
    this.db = undefined
  }

  /** @private @returns {DatabaseSync} */
  getDatabase() {
    if (this.db) return this.db
    const db = this.timeout === undefined
      ? new DatabaseSync(this.path)
      : new DatabaseSync(this.path, { timeout: this.timeout })
    db.exec(`CREATE TABLE IF NOT EXISTS ${quoteIdentifier(SCHEMA_TABLE)} (
      name TEXT PRIMARY KEY,
      primary_key TEXT NOT NULL,
      auto_increment INTEGER NOT NULL,
      indexes_json TEXT NOT NULL
    ) STRICT`)
    this.db = db
    return db
  }

  /** @private @param {string} tableName @returns {TableSchema | undefined} */
  readSchema(tableName) {
    const row = this.getDatabase().prepare(`SELECT name, primary_key, auto_increment, indexes_json
      FROM ${quoteIdentifier(SCHEMA_TABLE)}
      WHERE name = ?`).get(tableName)
    if (!row) return undefined
    let indexes
    try {
      indexes = normalizeStoredIndexes(JSON.parse(String(row.indexes_json)), tableName)
    } catch (error) {
      throw new Error(`Table metadata for "${tableName}" is invalid.`, { cause: error })
    }
    return {
      name: String(row.name),
      primaryKey: String(row.primary_key),
      autoIncrement: Boolean(row.auto_increment),
      indexes,
    }
  }

  /** @private @param {string} tableName @returns {TableSchema} */
  requireSchema(tableName) {
    const schema = this.readSchema(tableName)
    if (!schema) throw new Error(`Table "${tableName}" does not exist.`)
    return schema
  }
}

/** @param {string} tableName @param {DbTableOptions} options @returns {TableSchema} */
function normalizeTableOptions(tableName, options) {
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
    if (fields.length === 1 && fields[0] === primaryKey) continue
    if (!hasIndex(indexes, fields)) indexes.push(fields)
  }
  return {
    name: tableName,
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

/** @param {unknown} value @param {string} tableName @returns {string[][]} */
function normalizeStoredIndexes(value, tableName) {
  if (!Array.isArray(value)) {
    throw new Error(`Table metadata for "${tableName}" is invalid.`)
  }
  const indexes = []
  for (let i = 0; i < value.length; i++) {
    const stored = value[i]
    const source = typeof stored === 'string' ? [stored] : stored
    if (!Array.isArray(source) || source.length === 0 || source.some(field => typeof field !== 'string' || !field)) {
      throw new Error(`Table metadata for "${tableName}" is invalid.`)
    }
    const fields = [...source]
    if (!hasIndex(indexes, fields)) indexes.push(fields)
  }
  return indexes
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
  return {
    where: normalizeWhere(query.where),
    search: normalizeSearch(query.search),
    searchFields: normalizeFieldList(query.searchFields, 'Search fields'),
    orderBy: query.orderBy === undefined
      ? undefined
      : normalizeFieldName(query.orderBy, 'Order field'),
    order,
    offset: normalizeNonNegativeInteger(query.offset, 'Query offset', 0),
    limit: query.limit === undefined
      ? undefined
      : normalizeNonNegativeInteger(query.limit, 'Query limit'),
  }
}

/** @param {DbWhere | undefined} where @returns {DbWhere | undefined} */
function normalizeWhere(where) {
  if (where === undefined) return undefined
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
  if (!normalized) throw new TypeError('Nested filter is required.')
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

/** @param {TableSchema} schema @param {DbWhere | undefined} where @returns {{ sql: string, values: (string | number | null)[] }} */
function buildWhereClause(schema, where) {
  if (!where) return { sql: '', values: [] }
  const predicate = buildWhereExpression(schema, where)
  return { sql: ` WHERE ${predicate.sql}`, values: predicate.values }
}

/** @param {TableSchema} schema @param {DbWhere} where @returns {{ sql: string, values: (string | number | null)[] }} */
function buildWhereExpression(schema, where) {
  if ('field' in where) {
    return buildConditionExpression(schema, where.field, where.operator || 'eq', where.value)
  }
  if ('and' in where || 'or' in where) {
    const filters = 'and' in where ? where.and : where.or
    if (filters.length === 0) {
      return { sql: 'and' in where ? '1' : '0', values: [] }
    }
    const operator = 'and' in where ? ' AND ' : ' OR '
    const sql = []
    const values = []
    for (let i = 0; i < filters.length; i++) {
      const nested = buildWhereExpression(schema, filters[i])
      sql.push(`(${nested.sql})`)
      values.push(...nested.values)
    }
    return { sql: sql.join(operator), values }
  }
  const nested = buildWhereExpression(schema, where.not)
  return { sql: `NOT (${nested.sql})`, values: nested.values }
}

/**
 * @param {TableSchema} schema
 * @param {string} field
 * @param {DbComparisonOperator} operator
 * @param {DbScalar} value
 * @returns {{ sql: string, values: (string | number | null)[] }}
 */
function buildConditionExpression(schema, field, operator, value) {
  if (operator === 'ne') {
    const equal = buildConditionExpression(schema, field, 'eq', value)
    return { sql: `NOT (${equal.sql})`, values: equal.values }
  }

  if (field === schema.primaryKey) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      return { sql: '0', values: [] }
    }
    return {
      sql: `${quoteIdentifier(KEY_COLUMN)} ${sqlOperator(operator)} ?`,
      values: [value],
    }
  }

  const path = sqlString(jsonPath(field))
  const typeExpression = `json_type(${quoteIdentifier(RECORD_COLUMN)}, ${path})`
  const valueExpression = `json_extract(${quoteIdentifier(RECORD_COLUMN)}, ${path})`
  if (operator === 'eq' && value === null) {
    return { sql: `COALESCE(${typeExpression} = 'null', 0)`, values: [] }
  }
  if (operator === 'eq' && typeof value === 'boolean') {
    return { sql: `COALESCE(${typeExpression} = '${value ? 'true' : 'false'}', 0)`, values: [] }
  }
  if (typeof value === 'number') {
    return {
      sql: `COALESCE((${typeExpression} IN ('integer', 'real') AND ${valueExpression} ${sqlOperator(operator)} ?), 0)`,
      values: [value],
    }
  }
  if (typeof value === 'string') {
    return {
      sql: `COALESCE((${typeExpression} = 'text' AND ${valueExpression} ${sqlOperator(operator)} ?), 0)`,
      values: [value],
    }
  }
  return { sql: '0', values: [] }
}

/** @param {DbComparisonOperator} operator @returns {string} */
function sqlOperator(operator) {
  if (operator === 'eq') return '='
  if (operator === 'lt') return '<'
  if (operator === 'lte') return '<='
  if (operator === 'gt') return '>'
  if (operator === 'gte') return '>='
  throw new TypeError(`Unsupported SQL comparison operator "${operator}".`)
}

/** @param {DatabaseSync} db @param {TableSchema} schema @param {DbRecord} record @returns {DbKey} */
function putRecord(db, schema, record) {
  const explicitKey = record[schema.primaryKey]
  if (explicitKey === undefined) {
    const result = db.prepare(`INSERT INTO ${quoteIdentifier(schema.name)} (
      ${quoteIdentifier(RECORD_COLUMN)}
    ) VALUES (?)`).run(serializeRecord(record))
    const key = normalizeGeneratedKey(result.lastInsertRowid)
    const stored = { ...record, [schema.primaryKey]: key }
    db.prepare(`UPDATE ${quoteIdentifier(schema.name)}
      SET ${quoteIdentifier(RECORD_COLUMN)} = ?
      WHERE ${quoteIdentifier(KEY_COLUMN)} = ?`).run(serializeRecord(stored), key)
    return key
  }

  db.prepare(`INSERT INTO ${quoteIdentifier(schema.name)} (
    ${quoteIdentifier(KEY_COLUMN)},
    ${quoteIdentifier(RECORD_COLUMN)}
  ) VALUES (?, ?)
  ON CONFLICT(${quoteIdentifier(KEY_COLUMN)}) DO UPDATE SET
    ${quoteIdentifier(RECORD_COLUMN)} = excluded.${quoteIdentifier(RECORD_COLUMN)}`)
    .run(explicitKey, serializeRecord(record))
  return /** @type {DbKey} */ (explicitKey)
}

/** @param {DatabaseSync} db @param {TableSchema} schema @param {(record: DbRecord) => DbRecord} transform */
function rewriteRecords(db, schema, transform) {
  const rows = db.prepare(`SELECT ${quoteIdentifier(KEY_COLUMN)} AS record_key,
    ${quoteIdentifier(RECORD_COLUMN)} AS record_json
    FROM ${quoteIdentifier(schema.name)}`).all()
  const update = db.prepare(`UPDATE ${quoteIdentifier(schema.name)}
    SET ${quoteIdentifier(RECORD_COLUMN)} = ?
    WHERE ${quoteIdentifier(KEY_COLUMN)} = ?`)
  for (let i = 0; i < rows.length; i++) {
    const record = transform(parseRecord(String(rows[i].record_json), schema.name))
    assertDbRecord(record)
    update.run(serializeRecord(record), rows[i].record_key)
  }
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
  if (!Object.prototype.hasOwnProperty.call(record, field)) return record
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
    if (fields.length === 1 && fields[0] === newPrimaryKey) continue
    if (!hasIndex(renamed, fields)) renamed.push(fields)
  }
  if (oldPrimaryKey === oldName && oldPrimaryKey !== newPrimaryKey) return renamed
  return renamed
}

/** @param {DatabaseSync} db @param {TableSchema} previous @param {TableSchema} next */
function rebuildSqliteIndexes(db, previous, next) {
  for (let i = 0; i < previous.indexes.length; i++) {
    dropSqliteIndex(db, previous, previous.indexes[i])
  }
  for (let i = 0; i < next.indexes.length; i++) {
    createSqliteIndex(db, next, next.indexes[i])
  }
}

/** @param {DatabaseSync} db @param {TableSchema} schema @param {readonly string[]} fields */
function createSqliteIndex(db, schema, fields) {
  const expressions = []
  for (let i = 0; i < fields.length; i++) {
    expressions.push(indexExpression(schema, fields[i]))
  }
  db.exec(`CREATE INDEX IF NOT EXISTS ${quoteIdentifier(indexName(schema.name, fields))}
    ON ${quoteIdentifier(schema.name)} (
      ${expressions.join(',\n      ')}
    )`)
}

/** @param {DatabaseSync} db @param {TableSchema} schema @param {readonly string[]} fields */
function dropSqliteIndex(db, schema, fields) {
  db.exec(`DROP INDEX IF EXISTS ${quoteIdentifier(indexName(schema.name, fields))}`)
}

/** @param {string} tableName @param {readonly string[]} fields @returns {string} */
function indexName(tableName, fields) {
  return `__tot_db_index_${JSON.stringify([tableName, fields])}`
}

/** @param {TableSchema} schema @param {string} field @returns {string} */
function indexExpression(schema, field) {
  return field === schema.primaryKey
    ? quoteIdentifier(KEY_COLUMN)
    : `json_extract(${quoteIdentifier(RECORD_COLUMN)}, ${sqlString(jsonPath(field))})`
}

/** @param {DatabaseSync} db @param {TableSchema} schema */
function writeSchema(db, schema) {
  db.prepare(`INSERT INTO ${quoteIdentifier(SCHEMA_TABLE)} (
    name, primary_key, auto_increment, indexes_json
  ) VALUES (?, ?, ?, ?)
  ON CONFLICT(name) DO UPDATE SET
    primary_key = excluded.primary_key,
    auto_increment = excluded.auto_increment,
    indexes_json = excluded.indexes_json`)
    .run(
      schema.name,
      schema.primaryKey,
      schema.autoIncrement ? 1 : 0,
      JSON.stringify(schema.indexes),
    )
}

/** @template Result @param {DatabaseSync} db @param {() => Result} operation @returns {Result} */
function runTransaction(db, operation) {
  db.exec('BEGIN IMMEDIATE')
  try {
    const result = operation()
    db.exec('COMMIT')
    return result
  } catch (error) {
    try {
      db.exec('ROLLBACK')
    } catch {
      // Preserve the original database error.
    }
    throw error
  }
}

/** @param {DbRecord} record @returns {string} */
function serializeRecord(record) {
  const encoded = encodeDbValue(record)
  const json = JSON.stringify(encoded)
  if (json === undefined) throw new TypeError('Database record is not serializable.')
  return json
}

/** @param {DbValue} value @returns {unknown} */
function encodeDbValue(value) {
  if (value instanceof ArrayBuffer) {
    return {
      [BINARY_MARKER]: {
        kind: 'arrayBuffer',
        data: bytesToBase64(new Uint8Array(value)),
      },
    }
  }
  if (Array.isArray(value)) {
    const encoded = []
    for (let i = 0; i < value.length; i++) encoded.push(encodeDbValue(value[i]))
    return encoded
  }
  if (value && typeof value === 'object') {
    const encoded = /** @type {Record<string, unknown>} */ ({})
    const fields = Object.keys(value)
    for (let i = 0; i < fields.length; i++) {
      encoded[fields[i]] = encodeDbValue(value[fields[i]])
    }
    return encoded
  }
  return value
}

/** @param {string} json @param {string} tableName @returns {DbRecord} */
function parseRecord(json, tableName) {
  try {
    const record = decodeDbValue(JSON.parse(json))
    assertDbRecord(record)
    return record
  } catch (error) {
    throw new Error(`Stored record in table "${tableName}" is invalid.`, { cause: error })
  }
}

/** @param {unknown} value @returns {DbValue} */
function decodeDbValue(value) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') {
    return /** @type {DbScalar} */ (value)
  }
  if (Array.isArray(value)) {
    return value.map(decodeDbValue)
  }
  if (!value || typeof value !== 'object') {
    throw new TypeError('Stored record contains an unsupported value.')
  }
  const objectValue = /** @type {Record<string, unknown>} */ (value)
  if (Object.prototype.hasOwnProperty.call(objectValue, BINARY_MARKER)) {
    const payload = objectValue[BINARY_MARKER]
    const binary = /** @type {{ data?: unknown } | undefined} */ (payload)
    if (!binary || typeof binary.data !== 'string') {
      throw new TypeError('Stored binary value is invalid.')
    }
    return base64ToBytes(binary.data).buffer
  }
  const decoded = /** @type {Record<string, DbValue>} */ ({})
  const fields = Object.keys(objectValue)
  for (let i = 0; i < fields.length; i++) {
    decoded[fields[i]] = decodeDbValue(objectValue[fields[i]])
  }
  return decoded
}


/** @param {Uint8Array} bytes @returns {string} */
function bytesToBase64(bytes) {
  let binary = ''
  const chunkSize = 0x8000
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length))
    binary += String.fromCharCode(...chunk)
  }
  return btoa(binary)
}

/** @param {string} value @returns {Uint8Array} */
function base64ToBytes(value) {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

/** @param {DbRecord} record @param {string | undefined} search @param {string[] | undefined} fields @returns {boolean} */
function matchesSearch(record, search, fields) {
  if (!search) return true
  const values = []
  const sourceFields = fields || Object.keys(record)
  for (let i = 0; i < sourceFields.length; i++) {
    const value = record[sourceFields[i]]
    if (typeof value === 'string') values.push(value)
  }
  const haystack = normalizeSearchText(values.join(' '))
  const terms = normalizeSearchText(search).split(/\s+/).filter(Boolean)
  for (let i = 0; i < terms.length; i++) {
    if (!haystack.includes(terms[i])) return false
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
  if (seen.has(value)) throw new TypeError(`${label} contains a circular reference.`)
  const prototype = Object.getPrototypeOf(value)
  if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) {
    throw new TypeError(`${label} contains a non-plain object.`)
  }
  seen.add(value)
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) assertDbValue(value[i], label, seen)
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
  if (typeof value === 'string' || (typeof value === 'number' && Number.isFinite(value))) return
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
  if (typeof value !== 'string') throw new TypeError(`${label} must be a non-empty string.`)
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
  return findIndexPosition(indexes, fields) >= 0
}

/** @param {readonly string[][]} indexes @param {readonly string[]} fields @returns {number} */
function findIndexPosition(indexes, fields) {
  for (let i = 0; i < indexes.length; i++) {
    if (sameFields(indexes[i], fields)) return i
  }
  return -1
}

/** @param {readonly string[]} left @param {readonly string[]} right @returns {boolean} */
function sameFields(left, right) {
  if (left.length !== right.length) return false
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) return false
  }
  return true
}

/** @param {number | bigint} value @returns {number} */
function normalizeGeneratedKey(value) {
  const key = Number(value)
  if (!Number.isSafeInteger(key)) {
    throw new RangeError('Generated SQLite key exceeds the safe integer range.')
  }
  return key
}

/** @param {number | bigint} value @returns {number} */
function normalizeCount(value) {
  const count = Number(value)
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new RangeError('SQLite returned an invalid row count.')
  }
  return count
}

/** @param {string} identifier @returns {string} */
function quoteIdentifier(identifier) {
  return `"${identifier.replace(/"/g, '""')}"`
}

/** @param {string} value @returns {string} */
function sqlString(value) {
  return `'${value.replace(/'/g, "''")}'`
}

/** @param {string} field @returns {string} */
function jsonPath(field) {
  return `$.${JSON.stringify(field)}`
}
