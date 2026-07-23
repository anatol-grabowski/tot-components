/**
 * Namespaced JSON cache layered over an asynchronous key-value store.
 *
 * Entries are invalidated when their hard TTL expires or when the current
 * `vary` value differs structurally from the stored one. Numbers are durations
 * in milliseconds; strings are ISO 8601 durations such as `P1D` or `PT30M`.
 * Values and vary data must be JSON-serializable, so prototypes and object
 * identity are not preserved. Invalid entries are ignored but not deleted.
 */
export class Cache {
  constructor(
    namespace: string,
    kvStorage: {
      setItem<T = unknown>(key: string, value: T): Promise<void>
      getItem<T = unknown>(key: string): Promise<T | undefined>
    },
  )

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
    ttl: number | string,
    softTtl?: number | string,
  ): Promise<[value: T, isFresh: boolean] | []>
}
