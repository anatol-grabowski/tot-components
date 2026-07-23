/** Context attached to elements cloned from a `<tot-list>` item template. */
export type TotListItemContext<T = unknown> = {
  /** Zero-based index in the complete loaded item collection. */
  index: number
  /** One-based display position. */
  position: number
  item: T
}

/** Common loading-state detail emitted by `<tot-list>`. */
export type TotListLoadDetail = {
  count: number
  /** First rendered zero-based index, or `0` for an empty list. */
  first: number
  /** Last rendered zero-based index, or `-1` for an empty list. */
  last: number
  hasMore: boolean
  loading: boolean
}

export type TotListItemClickDetail<T = unknown> = TotListItemContext<T>

/**
 * `<tot-list>` - a vertically or horizontally virtualized list. Only the
 * visible range plus `bufferSize` is rendered.
 */
export type TotList<T = unknown> = {
  props: {
    /**
     * Array, iterator, or sync/async iterable used as the item source. The
     * `items` attribute accepts only a JSON array. Reading the property returns
     * a snapshot of the items loaded so far. @default []
     */
    items:
      | T[]
      | Iterator<T>
      | Iterable<T>
      | AsyncIterator<T>
      | AsyncIterable<T>

    /**
     * Optional argument-free loader used after the current `items` source.
     * It decides how many items one request returns and may keep any cursor or
     * offset in its own closure. The list calls it repeatedly until the
     * viewport plus buffer is filled, then calls it again near the end. Return
     * an empty array to mark the source as exhausted. A non-array result is
     * treated as a loading error. To restart, reset the loader's external state
     * and reassign this property. @default null
     */
    loadMore: (() => Promise<T[]> | T[]) | null

    /** Extra rendered distance before and after the viewport in CSS pixels. @default 600 */
    bufferSize: number

    /** Initial item-size estimate along the scrolling axis. @default 48 */
    estimatedItemSize: number

    /** Scrolls and virtualizes along the horizontal axis. @default false */
    horizontal: boolean

    /** Shows fading start/end shadows while more content exists in that direction. @default false */
    edgeShadows: boolean
  }

  methods: {
    /**
     * Scrolls to an item along the active axis. Iterator and loader sources are
     * advanced automatically when the requested index is not loaded yet.
     */
    scrollToIndex(
      index: number,
      options?: ScrollLogicalPosition | { align?: ScrollLogicalPosition },
    ): Promise<void>
    getBase(): HTMLElement | null
    /** Returns the native scrolling viewport. */
    getScroller(): HTMLElement | null
    getItemsContainer(): HTMLElement | null
    /** Returns only the currently rendered virtual-window item wrappers. */
    getRenderedItems(): HTMLElement[]
  }

  /** All custom events bubble and are composed. */
  events: {
    'item-click': CustomEvent<TotListItemClickDetail<T>>
    'load-start': CustomEvent<TotListLoadDetail>
    'load-end': CustomEvent<TotListLoadDetail & { added: number }>
    error: CustomEvent<TotListLoadDetail & { error: unknown }>
  }

  slots: {
    /**
     * A required `<template slot="item">` for custom item markup.
     * `{{index}}`, `{{position}}`, `{{value}}`, `{{json}}`, `{{item.path}}`,
     * and direct item-property tokens are replaced. Elements cloned from the
     * template receive `.item` and `.itemContext`. Without a template, each
     * item is rendered as compact plain text.
     */
    item: undefined
    loading: undefined
    empty: undefined
    end: undefined
    error: undefined
  }

  /**
   * ```text
   * base — bordered list wrapper and edge-shadow layer
   * ├─ viewport — native scrolling role="list" element
   * │  └─ content
   * │     ├─ start-spacer — virtual space before the rendered range
   * │     ├─ items
   * │     │  └─ item — repeated rendered role="listitem" wrapper
   * │     ├─ loading — placed before the trailing virtual spacer
   * │     ├─ error — placed before the trailing virtual spacer
   * │     ├─ end-spacer — virtual space after the rendered range
   * │     ├─ empty
   * │     └─ end
   * ├─ start-shadow — top or inline-start overflow shadow
   * └─ end-shadow — bottom or inline-end overflow shadow
   * ```
   */
  parts:
    | 'base'
    | 'viewport'
    | 'content'
    | 'start-spacer'
    | 'items'
    | 'item'
    | 'end-spacer'
    | 'loading'
    | 'empty'
    | 'end'
    | 'error'
    | 'start-shadow'
    | 'end-shadow'
}
