/** Single-use iterator with a known result count. */
export class GeneratorWithSize<T> implements IterableIterator<T> {
  /** Number of values that the iterator can yield. */
  readonly size: number

  next(): IteratorResult<T, void>
  return(value?: void): IteratorResult<T, void>
  throw(error?: unknown): IteratorResult<T, void>
  [Symbol.iterator](): GeneratorWithSize<T>
}

/**
 * Prefix index for string keys.
 *
 * Results at the exact prefix are yielded first, followed by descendants in
 * JavaScript string sort order. Duplicate keys append values in insertion order.
 * Matching is case- and diacritics-sensitive.
 */
export class Trie<T> {
  /** Adds a value without replacing values already mapped to the same key. */
  map(key: string, value: T): void

  /** Returns all values mapped to keys beginning with `prefix`. */
  search(prefix: string): GeneratorWithSize<T>
}
