/** Portable primary-key type shared by IndexedDB and SQLite. */
export type DbKey = string | number

/** Scalar value supported by filters, ordering, primary keys, and indexes. */
export type DbScalar = DbKey | boolean | null

/** The one portable binary type accepted in records. */
export type DbBinary = ArrayBuffer

/** Value supported by portable database records. */
export type DbValue = DbScalar | DbBinary | DbValue[] | { [key: string]: DbValue }

/** Generic portable database record. */
export type DbRecord = Record<string, DbValue>

/** One indexed field or a compound index ordered by multiple fields. */
export type DbIndex = string | readonly string[]

/** Definition used when creating a table or collection. */
export interface DbTableOptions {
  /** Record field used as the primary key. */
  primaryKey: string
  /** Generates numeric keys when omitted; explicit keys must be safe integers. */
  autoIncrement?: boolean
  /** Non-unique single-field or compound indexes. */
  indexes?: readonly DbIndex[]
}

/** Comparison operator used by a field condition. */
export type DbComparisonOperator = 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte'

/**
 * Portable recursive filter expression.
 *
 * A filter is exactly one of:
 * - `{ field, value, operator? }` for one comparison (`eq` by default)
 * - `{ and: [...] }` when every nested filter must match
 * - `{ or: [...] }` when at least one nested filter must match
 * - `{ not: ... }` to invert one nested filter
 */
export type DbWhere =
  | { field: string, value: DbScalar, operator?: DbComparisonOperator }
  | { and: readonly DbWhere[] }
  | { or: readonly DbWhere[] }
  | { not: DbWhere }

/** Shallow field replacements used by `updateMany()`. */
export type DbChanges = Readonly<Record<string, DbValue>>

/** Options for listing records. */
export interface DbQuery {
  /** Optional recursive filter expression. */
  where?: DbWhere
  /** Case- and diacritics-insensitive text; every whitespace-separated term must match. */
  search?: string
  /** Top-level string fields searched by `search`; all top-level string fields by default. */
  searchFields?: readonly string[]
  /** Scalar field used for ordering; defaults to the primary key. */
  orderBy?: string
  /** Sort direction; defaults to `asc`. */
  order?: 'asc' | 'desc'
  /** Number of matching records to skip. */
  offset?: number
  /** Maximum number of records to return. */
  limit?: number
}

/**
 * Generic asynchronous table/collection database contract.
 *
 * Current implementations:
 * - `DbServiceIdb.js` uses browser IndexedDB object stores, native single-field
 *   and compound indexes, structured cloning, and native `ArrayBuffer` storage.
 *   Schema changes increment the database version and may be blocked by other
 *   open tabs or workers.
 * - `DbServiceSqlite.js` uses Node's built-in `node:sqlite` module. Records are
 *   stored as JSON, `ArrayBuffer` values use tagged base64 encoding, and indexes
 *   use one or more SQLite JSON expressions. SQLite calls are synchronous
 *   internally but exposed as promises for consistency with IndexedDB.
 *
 * Indexes are identified by their ordered field list rather than a public
 * backend-specific name. `renameField()` recreates affected indexes with the
 * new field name. `dropField()` removes indexes that contain the removed field.
 * Primary-key fields can be renamed but cannot be dropped. Bulk writes are
 * atomic within one table. `undefined` filters match every record.
 *
 * Comparison filters use strict portable scalar semantics. `lt`, `lte`, `gt`,
 * and `gte` accept only strings or numbers. Text search is a small portable
 * full-text feature implemented consistently by both backends: it normalizes
 * case and diacritics and requires every search term to occur in the selected
 * top-level string fields. It does not provide stemming or ranking.
 *
 * Deliberately unimplemented features include unique and multi-entry indexes,
 * public multi-call or multi-table transactions, joins and relations,
 * projections and aggregates, partial updates with computed expressions,
 * configurable conflict policies, full schema version plans, ranked/stemmed
 * search, change streams, replication, conflict resolution, encryption, and
 * backend-specific raw queries.
 *
 * Methods reject for invalid arguments, missing tables, schema conflicts,
 * serialization failures, permissions, quota, locking, or backend errors.
 * Constructors and backend-specific connection settings are intentionally
 * outside this generic contract.
 */
export abstract class DbService<RecordType extends DbRecord = DbRecord> {
  /** Creates a table/collection and adds any missing requested indexes. */
  abstract createTable(name: string, options: DbTableOptions): Promise<void>

  /** Lists managed tables/collections in name order. */
  abstract listTables(): Promise<string[]>

  /** Returns whether a table/collection exists. */
  abstract hasTable(name: string): Promise<boolean>

  /** Drops a table/collection, returning whether it existed. */
  abstract dropTable(name: string): Promise<boolean>

  /** Adds one single-field or compound index when it is missing. */
  abstract createIndex(name: string, index: DbIndex): Promise<void>

  /** Drops one index identified by its ordered fields. */
  abstract dropIndex(name: string, index: DbIndex): Promise<boolean>

  /** Atomically replaces one index field definition, returning whether it existed. */
  abstract renameIndex(name: string, index: DbIndex, newIndex: DbIndex): Promise<boolean>

  /** Renames a top-level field in every record and in affected indexes. */
  abstract renameField(name: string, field: string, newField: string): Promise<void>

  /** Removes a non-primary top-level field and indexes that contain it. */
  abstract dropField(name: string, field: string): Promise<void>

  /** Inserts or replaces a record and returns its primary key. */
  abstract put(name: string, record: RecordType): Promise<DbKey>

  /** Atomically inserts or replaces records and returns keys in input order. */
  abstract putMany(name: string, records: readonly RecordType[]): Promise<DbKey[]>

  /** Reads one record by primary key, or `undefined` when absent. */
  abstract get(name: string, key: DbKey): Promise<RecordType | undefined>

  /** Deletes one record by primary key, returning whether it existed. */
  abstract delete(name: string, key: DbKey): Promise<boolean>

  /** Deletes matching records and returns the number removed. */
  abstract deleteMany(name: string, where?: DbWhere): Promise<number>

  /** Deletes every record while keeping the table and its indexes. */
  abstract clear(name: string): Promise<void>

  /** Counts records that match the optional filter. */
  abstract count(name: string, where?: DbWhere): Promise<number>

  /** Lists filtered/searched records with deterministic ordering and pagination. */
  abstract list(name: string, query?: DbQuery): Promise<RecordType[]>

  /** Shallowly updates matching records and returns the number changed. */
  abstract updateMany(name: string, where: DbWhere | undefined, changes: DbChanges): Promise<number>

  /** Releases the current database connection. */
  abstract close(): Promise<void>
}
