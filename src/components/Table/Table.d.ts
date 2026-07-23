/** A cell accepted by `<tot-table>`. */
export type TotTableCell = {
  /**
   * Optional merge identifier. Adjacent cells with the same non-empty `id`
   * are combined automatically unless an explicit span is provided.
   */
  id?: string | number

  /**
   * Selects a matching `type-*` template slot and exposes the same sanitized
   * `type-*` CSS part. For example, `score` uses `type-score`. @default 'cell'
   */
  type?: string

  /**
   * Whitespace-separated class names applied directly to the rendered native
   * `<td>` or `<th>`. Names are preserved as classes and are not converted to
   * CSS parts. @default ''
   */
  class?: string

  colspan?: number
  rowspan?: number
  content?: unknown

  /** Additional application data remains available as `element.cell`. */
  [key: string]: unknown
}

export type TotTableData = {
  cells: TotTableCell[][]
  /**
   * Numbers of rows or columns pinned to each edge. CSS performs the sticky
   * positioning; the component internally measures cumulative offsets only
   * when multiple variably sized rows or columns must be pinned together.
   */
  sticky?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
}

/**
 * `<tot-table>` - a scrollable native table generated from a two-dimensional
 * cell array, with optional sticky edge rows/columns and per-type templates.
 */
export type TotTable = {
  props: {
    /**
     * Table data object or JSON string. Reading returns parsed table data.
     * Repeating the same non-empty cell `id` in adjacent positions merges those
     * positions automatically; explicit `colspan` and `rowspan` are also
     * supported. @default { cells: [], sticky: {} }
     */
    table: TotTableData | string
  }

  methods: {
    /** Rebuilds table rows while preserving the scroll position and component shell. */
    render(): void

    getScrollContainer(): HTMLElement | null
    getTable(): HTMLTableElement | null
    getCellElements(): HTMLTableCellElement[]
  }

  /** Emitted when any rendered `<td>` or `<th>` is clicked. The event bubbles and is composed. */
  events: {
    'cell-click': CustomEvent<{
      cell: TotTableCell
      row: number
      col: number
      rowspan: number
      colspan: number
    }>
  }

  /**
   * `empty` replaces the empty-state text.
   *
   * A named `<template slot="type-${type}">` renders cells with that `type`.
   * For example, `type: 'score'` uses `<template slot="type-score">`. This is
   * the only custom rendering API; JavaScript renderer maps are intentionally
   * not supported. Text and attributes support `{{id}}`, `{{type}}`,
   * `{{content}}`, `{{row}}`, `{{col}}`, `{{rowspan}}`, and `{{colspan}}`.
   * Every cloned element receives the normalized `cell` object and a
   * `cellContext` object with `row`, `col`, `rowspan`, `colspan`, `rowCount`, and
   * `colCount` properties.
   */
  slots: {
    empty: undefined
    [cellType: `type-${string}`]: undefined
  }

  /**
   * Cell classes remain ordinary native classes. Only the cell type creates a
   * dynamic part, for example type `score` exposes `type-score`.
   *
   * ```text
   * base — focusable scrolling container
   * ├─ empty — empty-state slot container
   * └─ table — native table
   *    └─ cell — repeated native td/th; also exposes a dynamic type-* part
   * ```
   */
  parts: 'base' | 'empty' | 'table' | 'cell' | `type-${string}`
}
