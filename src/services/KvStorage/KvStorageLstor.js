/**
 * Asynchronous key-value adapter backed by the browser's `localStorage`.
 *
 * Values are encoded with `JSON.stringify()` and decoded with `JSON.parse()`.
 * They must therefore be JSON-serializable: circular references and `BigInt`
 * values fail, and object identity/prototypes are not preserved. Calls expose
 * an asynchronous API, but the underlying Local Storage read/write still runs
 * synchronously on the main thread before the promise settles.
 *
 * The service assumes `globalThis.localStorage` is available. Browser privacy,
 * security, and quota errors are allowed to propagate to the caller.
 */
export class KvStorageLstor {
  /**
   * Serializes and stores one value under `key`, replacing an existing value.
   *
   * @template T
   * @param {string} key
   * @param {T} value
   * @returns {Promise<void>}
   */
  async setItem(key, value) {
    const raw = JSON.stringify(value)
    if (raw === undefined) {
      throw new TypeError('KvStorageLstor can only store JSON-serializable values.')
    }

    getLocalStorage().setItem(String(key), raw)
  }

  /**
   * Reads and parses one value.
   *
   * Returns `undefined` when no entry exists. Invalid stored JSON causes the
   * returned promise to reject with the native `JSON.parse()` error.
   *
   * @template T
   * @param {string} key
   * @returns {Promise<T | undefined>}
   */
  async getItem(key) {
    const raw = getLocalStorage().getItem(String(key))
    return raw === null ? undefined : JSON.parse(raw)
  }
}

/**
 * @returns {Storage}
 */
function getLocalStorage() {
  if (!globalThis.localStorage) {
    throw new Error('KvStorageLstor requires the browser localStorage API.')
  }

  return globalThis.localStorage
}
