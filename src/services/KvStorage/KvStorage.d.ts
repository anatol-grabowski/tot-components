/**
 * Minimal asynchronous key-value storage contract.
 *
 * Implementations use `undefined` for a missing key. Values may be cloned or
 * serialized by a backend, and storage/serialization failures reject the
 * returned promise.
 */
export class KvStorage {
  /** Stores or replaces one value. */
  setItem<T = unknown>(key: string, value: T): Promise<void>

  /** Reads one value, or `undefined` when the key does not exist. */
  getItem<T = unknown>(key: string): Promise<T | undefined>
}
