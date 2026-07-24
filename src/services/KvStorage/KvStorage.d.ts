/**
 * Minimal asynchronous key-value storage contract.
 *
 * Current implementations:
 * - `KvStorageLstor.js` uses browser `localStorage`. Values are JSON serialized;
 *   calls are asynchronous but the underlying browser access is synchronous.
 * - `KvStorageIdb.js` uses IndexedDB structured cloning and lazily opens its
 *   database. It additionally accepts any `IDBValidKey`, while string keys form
 *   the portable contract shared by every implementation.
 * - `KvStorageFile.js` stores the complete key-value object as JSON through a
 *   compatible writable file-system service. It is intended for small data sets,
 *   loads lazily, serializes writes within one instance, and treats a missing or
 *   invalid file as empty storage.
 *
 * All implementations return `undefined` for a missing key. Serialization,
 * cloning, persistence, quota, permission, and backend failures reject the
 * returned promise. Constructors and backend-specific state are intentionally
 * outside this structural contract.
 */
export interface KvStorage<Key = string> {
  /** Stores or replaces one value. */
  setItem<T = unknown>(key: Key, value: T): Promise<void>

  /** Reads one value, or `undefined` when the key does not exist. */
  getItem<T = unknown>(key: Key): Promise<T | undefined>
}
