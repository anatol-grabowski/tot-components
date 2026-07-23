/**
 * Namespaced JSON cache layered over an asynchronous key-value store.
 *
 * Entries contain `value`, `vary`, and their storage timestamp. `vary` is
 * compared structurally on load so callers can invalidate a key when relevant
 * inputs change. Both `value` and `vary` must be JSON-serializable; serialization
 * intentionally clones them and discards prototypes/object identity.
 *
 * Numeric durations are milliseconds. String durations use ISO 8601 duration
 * syntax such as `P1D`, `PT30M`, or `P1Y2M3DT4H5M6S`. Years and months are
 * applied as calendar units in UTC; the other units are elapsed time.
 *
 * Expired or mismatched entries are ignored but not deleted because the shared
 * storage contract has no delete operation.
 */
export class Cache {
  /**
   * @param {string} namespace Prefix added to every storage key.
   * @param {{
   *   setItem<T = unknown>(key: string, value: T): Promise<void>,
   *   getItem<T = unknown>(key: string): Promise<T | undefined>
   * }} kvStorage Asynchronous key-value backend.
   */
  constructor(namespace, kvStorage) {
    if (!kvStorage || typeof kvStorage.setItem !== 'function' || typeof kvStorage.getItem !== 'function') {
      throw new TypeError('Cache requires a key-value storage backend.')
    }

    this.namespace = String(namespace)
    this.kvStorage = kvStorage
  }

  /**
   * Stores one cache entry.
   *
   * `vary` should contain every JSON-serializable input that affects `value`.
   * The write replaces a previous entry with the same namespace and key. Storage
   * and JSON serialization errors propagate to the caller.
   *
   * @template T
   * @template Vary
   * @param {string} key
   * @param {T} value
   * @param {Vary} vary
   * @returns {Promise<void>}
   */
  async store(key, value, vary) {
    const raw = JSON.stringify({
      value,
      vary,
      timestamp: Date.now(),
    })

    if (raw === undefined) {
      throw new TypeError('Cache values and vary data must be JSON-serializable.')
    }

    await this.kvStorage.setItem(this._getStorageKey(key), raw)
  }

  /**
   * Loads a valid entry.
   *
   * `ttl` is the hard lifetime. Once it expires, or when `vary` differs from the
   * stored value, an empty tuple is returned. `softTtl` controls freshness only:
   * after it expires but before `ttl`, the value is returned with `false`.
   * With the default `softTtl` of `0`, every valid value is immediately stale.
   *
   * @template T
   * @template Vary
   * @param {string} key
   * @param {Vary} vary
   * @param {number | string} ttl Milliseconds or an ISO 8601 duration.
   * @param {number | string} [softTtl=0] Milliseconds or an ISO 8601 duration.
   * @returns {Promise<[value: T, isFresh: boolean] | []>}
   */
  async load(key, vary, ttl, softTtl = 0) {
    const raw = await this.kvStorage.getItem(this._getStorageKey(key))
    if (raw === undefined) {
      return []
    }

    const item = JSON.parse(String(raw))
    if (!item || typeof item !== 'object' || !Number.isFinite(item.timestamp)) {
      return []
    }

    const now = Date.now()
    const expiresAt = addDuration(item.timestamp, ttl)
    if (expiresAt <= now || !deepEqual(vary, item.vary)) {
      return []
    }

    const staleAt = addDuration(item.timestamp, softTtl)
    return [item.value, staleAt > now]
  }

  /**
   * @param {string} key
   * @returns {string}
   */
  _getStorageKey(key) {
    return `${this.namespace}-${String(key)}`
  }
}

/**
 * @param {number} timestamp
 * @param {number | string} duration
 * @returns {number}
 */
function addDuration(timestamp, duration) {
  if (typeof duration === 'number') {
    if (!Number.isFinite(duration)) {
      throw new TypeError('Cache duration numbers must be finite milliseconds.')
    }
    return timestamp + duration
  }

  const parsed = parseIsoDuration(String(duration))
  const calendarMonths = parsed.years * 12 + parsed.months
  const date = new Date(timestamp)

  if (calendarMonths) {
    addUtcMonths(date, calendarMonths)
  }

  return date.getTime() + (
    parsed.weeks * 7 * 86400000 +
    parsed.days * 86400000 +
    parsed.hours * 3600000 +
    parsed.minutes * 60000 +
    parsed.seconds * 1000
  )
}

/**
 * @param {string} value
 */
function parseIsoDuration(value) {
  const match = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)W)?(?:(\d+(?:\.\d+)?)D)?(?:T(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?)?$/i.exec(value)
  if (!match || !match.slice(1).some(part => part !== undefined)) {
    throw new TypeError(`Invalid ISO 8601 cache duration: ${value}`)
  }

  return {
    years: Number(match[1] || 0),
    months: Number(match[2] || 0),
    weeks: Number(match[3] || 0),
    days: Number(match[4] || 0),
    hours: Number(match[5] || 0),
    minutes: Number(match[6] || 0),
    seconds: Number(match[7] || 0),
  }
}

/**
 * Adds calendar months while clamping end-of-month dates.
 *
 * @param {Date} date
 * @param {number} months
 */
function addUtcMonths(date, months) {
  const day = date.getUTCDate()
  date.setUTCDate(1)
  date.setUTCMonth(date.getUTCMonth() + months)
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate()
  date.setUTCDate(Math.min(day, lastDay))
}

/**
 * Structural equality for JSON-compatible values.
 *
 * @param {unknown} left
 * @param {unknown} right
 * @returns {boolean}
 */
function deepEqual(left, right) {
  if (Object.is(left, right)) {
    return true
  }

  if (!left || !right || typeof left !== 'object' || typeof right !== 'object') {
    return false
  }

  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
      return false
    }

    for (let i = 0; i < left.length; i++) {
      if (!deepEqual(left[i], right[i])) {
        return false
      }
    }
    return true
  }

  const leftObject = /** @type {Record<string, unknown>} */ (left)
  const rightObject = /** @type {Record<string, unknown>} */ (right)
  const leftKeys = Object.keys(leftObject)
  const rightKeys = Object.keys(rightObject)
  if (leftKeys.length !== rightKeys.length) {
    return false
  }

  for (let i = 0; i < leftKeys.length; i++) {
    const key = leftKeys[i]
    if (!Object.prototype.hasOwnProperty.call(rightObject, key) || !deepEqual(leftObject[key], rightObject[key])) {
      return false
    }
  }

  return true
}
