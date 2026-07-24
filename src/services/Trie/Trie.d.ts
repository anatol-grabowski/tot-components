/** Single-use iterator with a known result count. */
export interface GeneratorWithSize<T> extends IterableIterator<T> {
  /** Number of values that the iterator can yield. */
  readonly size: number
}

/**
 * Generic prefix-index contract for string keys.
 *
 * The current `Trie.js` implementation yields values at the exact prefix first,
 * followed by descendants in JavaScript string sort order. Duplicate keys append
 * values in insertion order. Matching is case- and diacritics-sensitive, and
 * mapped values remain referenced for the lifetime of the trie. Its exported
 * `GeneratorWithSize` class is represented here only by the iterator contract it
 * provides; constructor and internal node details are implementation-specific.
 */
export interface Trie<T> {
  /** Adds a value without replacing values already mapped to the same key. */
  map(key: string, value: T): void

  /** Returns all values mapped to keys beginning with `prefix`. */
  search(prefix: string): GeneratorWithSize<T>
}

/** Constructor exported by the current sized-iterator implementation. */
export const GeneratorWithSize: {
  new<T>(generator: Generator<T, void, undefined>, size: number): GeneratorWithSize<T>
  prototype: GeneratorWithSize<unknown>
}

