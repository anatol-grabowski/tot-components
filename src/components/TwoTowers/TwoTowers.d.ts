export type TotTwoTowersDisplayValue = number | string

export type TotTwoTowersDisplayValues = {
  /**
   * Presentation value for the current column. Numbers are formatted by the
   * component; strings are rendered verbatim. This never affects tower choice
   * or geometry.
   */
  current?: TotTwoTowersDisplayValue
  /**
   * Presentation value for the previous column. Numbers are formatted by the
   * component; strings are rendered verbatim. This never affects comparison
   * geometry.
   */
  previous?: TotTwoTowersDisplayValue
}

export type TotTwoTowersPeriods = {
  /** Column label for current values in details tables. @default "Current" */
  current?: string
  /** Column label for previous values in details tables. @default "Previous" */
  previous?: string
}

export type TotTwoTowersSubcategory = {
  /** Optional stable key. */
  key?: string
  /** Human-readable subcategory name. */
  name: string
  /** Compact label drawn in the block when there is enough space. */
  shortName?: string
  /**
   * Optional XBRL concept/tag name. Tags without whitespace become exact CSS
   * classes; CSS-safe tags are also exact shadow parts. Every tag is exposed as
   * `tag-<sanitized-tag>` too.
   */
  tag?: string
  /**
   * Current-period signed value. Positive values are drawn in the positive
   * tower and negative values in the negative tower.
   */
  current: number
  /** Optional signed previous-period value used by comparison rendering. */
  previous?: number
  /**
   * Optional values shown in the in-block amount label and details tables.
   * Use this when the signed routing value differs from the source statement,
   * for example a liability routed to the negative tower but displayed as a
   * positive balance. Values may also be arbitrary text.
   */
  display?: TotTwoTowersDisplayValues
}

export type TotTwoTowersCategory = {
  /** Optional stable key used for hover/highlight grouping. */
  key?: string
  /** Human-readable category name used in the legend and details tables. */
  name: string
  /** Compact category label used in the legend and, when space permits, the grid. */
  shortName?: string
  /**
   * Optional XBRL concept/tag name. The tag is attached as a CSS hook to the
   * category's legend entry, outlines, labels, details rows, and all of its
   * rendered subcategory fragments.
   */
  tag?: string
  /**
   * Any valid CSS color. Theme variables such as `var(--tot-color-blue-400)`
   * are recommended. When omitted, a theme-aware series color is assigned.
   */
  color?: string
  /**
   * Optional presentation-only summary values for the category row in details
   * tables. When omitted, the component sums subcategory presentation values
   * when they are numeric/parseable; arbitrary text makes the aggregate unavailable.
   */
  display?: TotTwoTowersDisplayValues
  /**
   * Signed values live only on subcategories. A category itself has no value
   * and no tower assignment; each subcategory chooses its tower from the sign
   * of `current`.
   */
  subcategories: TotTwoTowersSubcategory[]
}

export type TotTwoTowersConfig = {
  /** Accessible label applied to the SVG. @default "Two towers visualization" */
  label?: string
  /**
   * `vertical` places positive and negative towers side by side. `horizontal`
   * places them above and below a shared seam. @default "vertical"
   */
  orientation?: 'vertical' | 'horizontal'
  /** Show previous-value comparison inside each subcategory. @default true */
  compare?: boolean
  /**
   * Previous/current magnitude ratio above which an oversized protrusion is
   * compressed and marked with a wavy tear. Must be greater than 1. @default 1.5
   */
  tearThreshold?: number
  /** Heading drawn over the positive tower. @default "Positive" */
  positiveLabel?: string
  /** Heading drawn over the negative tower. @default "Negative" */
  negativeLabel?: string
  /** Labels used by hover/tap and fullscreen details tables. */
  periods?: TotTwoTowersPeriods
  /**
   * Ordered categories. Each category contains signed subcategories; positive
   * current values go to the positive tower and negative values to the negative
   * tower. Subcategories from one category may therefore appear on both sides
   * and at different positions while still sharing highlighting and details.
   */
  categories: TotTwoTowersCategory[]
}

/**
 * `<tot-two-towers>` - a theme-aware signed two-stack visualization.
 *
 * The data model is category-first: routing/comparison numbers live on
 * subcategories and the sign of each current value determines its tower
 * automatically. Optional `display` values are presentation-only, so source
 * statement signs or arbitrary text can differ from the routing numbers.
 *
 * Previous-period rendering is also evaluated per subcategory:
 * - same sign: the difference between current and previous magnitude is shown
 *   with a lighter version of the category color, without hatching;
 * - different signs: the previous-magnitude portion is hatched. When current is
 *   larger, the remaining current delta is light and unhatched; when previous
 *   is larger, the hatched previous extent protrudes beyond the current block;
 * - oversized protrusions use `tearThreshold` and a wavy tear mark.
 *
 * Hovering any fragment highlights every fragment in the category across both
 * towers. Touch users can tap to pin the same details table. Hold a legend item
 * on touch, or right-click it with a mouse, to hide/show that category while
 * keeping its legend entry available. In fullscreen, the complete details table
 * can be opened to the left and resized by dragging its edge.
 *
 * When `tag` is set, rendered pieces receive the exact tag as a class when it
 * has no whitespace, and as an exact part when CSS-safe. A
 * `tag-<sanitized-tag>` class/part is always added. This
 * allows selectors such as `tot-two-towers::part(AssetsCurrent)` or
 * `tot-two-towers::part(tag-us-gaap-AssetsCurrent)`.
 */
export type TotTwoTowers = {
  props: {
    /**
     * Visualization data and layout. Assign as a JavaScript property and
     * reassign after mutating nested data so the component rerenders.
     */
    config: TotTwoTowersConfig

    /** Whether the fullscreen visualization is currently open. */
    readonly fullscreen: boolean
  }

  methods: {
    getSvg(): SVGSVGElement | null
    getLegend(): HTMLElement | null
    openFullscreen(): void
    closeFullscreen(): void
  }

  events: {
    /** Carries no detail; read `fullscreen` from the component. */
    'fullscreen-change': Event
  }

  slots: {}

  /**
   * ```text
   * base — visualization plus legend
   * ├─ chart — SVG visualization surface
   * ├─ legend — category legend
   * │  ├─ legend-item
   * │  └─ legend-swatch
   * ├─ tooltip — category comparison table shown on hover/tap
   * ├─ details-table — resizable fullscreen table with every category/subcategory
   * │  ├─ details-table-header
   * │  ├─ details-table-scroll
   * │  └─ details-resize-handle
   * ├─ details-button — opens/closes the fullscreen details table
   * └─ fullscreen-button — opens/closes the fixed fullscreen visualization
   * ```
   */
  parts: 'base' | 'chart' | 'legend' | 'legend-item' | 'legend-swatch' | 'tooltip' | 'details-table' | 'details-table-header' | 'details-table-scroll' | 'details-resize-handle' | 'details-button' | 'fullscreen-button' | `tag-${string}`
}
