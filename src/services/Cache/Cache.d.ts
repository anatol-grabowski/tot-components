/** Numeric milliseconds or an ISO 8601 duration string. */
export type CacheDuration = number | string

/** Minimal storage dependency required by the cache implementation. */
export interface CacheStorage {
  setItem<T = unknown>(key: string, value: T): Promise<void>
  getItem<T = unknown>(key: string): Promise<T | undefined>
}

/**
 * Generic namespaced asynchronous cache contract.
 *
 * The current `Cache.js` implementation stores JSON entries through a compatible
 * key-value storage service. Entries are invalidated when their hard TTL expires
 * or when the current `vary` value differs structurally from the stored one.
 * Numeric durations are milliseconds; strings are ISO 8601 durations such as
 * `P1D` or `PT30M`. Values and vary data must be JSON-serializable, so prototypes
 * and object identity are not preserved. Invalid entries are ignored but not
 * deleted because the storage contract has no removal method.
 *
 * Namespace and storage constructor dependencies are implementation details and
 * are intentionally outside this structural contract.
 */
export interface Cache {
  /** Stores or replaces one value and its cache-invalidation inputs. */
  store<T = unknown, Vary = unknown>(key: string, value: T, vary: Vary): Promise<void>

  /**
   * Returns `[value, isFresh]` while the hard TTL is valid and `vary` matches,
   * otherwise `[]`. After `softTtl` expires, a valid value remains available but
   * `isFresh` is `false`. The default soft TTL of `0` is immediately stale.
   */
  load<T = unknown, Vary = unknown>(
    key: string,
    vary: Vary,
    ttl: CacheDuration,
    softTtl?: CacheDuration,
  ): Promise<[value: T, isFresh: boolean] | []>
}

