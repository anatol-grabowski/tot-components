/**
 * @template T
 * @typedef {{
 *   size: number,
 *   values: T[],
 *   keys: string[],
 *   nodes: Map<string, TrieNode<T>>,
 * }} TrieNode
 */

/**
 * Iterator returned by `Trie.search()` with the number of matching values known
 * before iteration begins.
 *
 * The iterator is single-use and delegates `next()`, `return()`, and `throw()`
 * to the underlying generator.
 *
 * @template T
 * @implements {IterableIterator<T>}
 */
export class GeneratorWithSize {
  /**
   * @param {Generator<T, void, undefined>} generator
   * @param {number} size
   */
  constructor(generator, size) {
    this._generator = generator
    this.size = size
  }

  /** @returns {IteratorResult<T, void>} */
  next() {
    return this._generator.next()
  }

  /**
   * Stops iteration early.
   *
   * @param {void=} value
   * @returns {IteratorResult<T, void>}
   */
  return(value) {
    return this._generator.return(value)
  }

  /**
   * Throws into the underlying generator.
   *
   * @param {unknown=} error
   * @returns {IteratorResult<T, void>}
   */
  throw(error) {
    return this._generator.throw(error)
  }

  /** @returns {GeneratorWithSize<T>} */
  [Symbol.iterator]() {
    return this
  }
}

/**
 * Prefix index for retrieving values by string-key prefix.
 *
 * `map()` may add several values for the same key. `search()` returns values at
 * the exact prefix first, then descendant keys in JavaScript string sort order;
 * values mapped to the same key keep insertion order. Matching is case- and
 * diacritics-sensitive and no normalization is performed.
 *
 * The trie supports insertion and search only. Mapped values remain strongly
 * referenced until the Trie instance itself becomes unreachable.
 *
 * @template T
 */
export class Trie {
  constructor() {
    /** @type {TrieNode<T>} */
    this._root = createNode()
  }

  /**
   * Adds one value under `key`.
   *
   * Reusing a key appends another result rather than replacing the old value.
   * `search().size` counts values, not unique keys.
   *
   * @param {string} key
   * @param {T} value
   */
  map(key, value) {
    let node = this._root

    for (const character of String(key)) {
      node.size += 1
      let nextNode = node.nodes.get(character)
      if (!nextNode) {
        nextNode = createNode()
        node.nodes.set(character, nextNode)
        insertSorted(node.keys, character)
      }
      node = nextNode
    }

    node.size += 1
    node.values.push(value)
  }

  /**
   * Returns a single-use iterator over values whose keys start with `prefix`.
   *
   * The returned `size` is available without consuming the iterator. A missing
   * prefix returns an empty iterator with `size === 0`.
   *
   * @param {string} prefix
   * @returns {GeneratorWithSize<T>}
   */
  search(prefix) {
    const node = this._getNode(String(prefix))
    const generator = node ? this._generateItems(node) : emptyGenerator()
    return new GeneratorWithSize(generator, node ? node.size : 0)
  }

  /**
   * @param {string} prefix
   * @returns {TrieNode<T> | null}
   */
  _getNode(prefix) {
    let node = this._root

    for (const character of prefix) {
      const nextNode = node.nodes.get(character)
      if (!nextNode) {
        return null
      }
      node = nextNode
    }

    return node
  }

  /**
   * @param {TrieNode<T>} node
   * @returns {Generator<T, void, undefined>}
   */
  *_generateItems(node) {
    yield* node.values
    for (let i = 0; i < node.keys.length; i++) {
      const child = node.nodes.get(node.keys[i])
      if (child) {
        yield* this._generateItems(child)
      }
    }
  }
}

/**
 * @template T
 * @returns {TrieNode<T>}
 */
function createNode() {
  return {
    size: 0,
    values: [],
    keys: [],
    nodes: new Map(),
  }
}

/**
 * @param {string[]} values
 * @param {string} value
 */
function insertSorted(values, value) {
  let low = 0
  let high = values.length

  while (low < high) {
    const middle = (low + high) >> 1
    if (values[middle] < value) {
      low = middle + 1
    } else {
      high = middle
    }
  }

  values.splice(low, 0, value)
}

function* emptyGenerator() {}
