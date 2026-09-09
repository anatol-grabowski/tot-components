export type TotTwoTowersPeriods = {
  /** Column label for the current value in the category details table. @default "Current" */
  current?: string
  /** Column label for the previous value in the category details table. @default "Previous" */
  previous?: string
}

export type TotTwoTowersSubcategory = {
  /** Stable key used for rendering. */
  key?: string
  /** Human-readable label used by native SVG titles and the legend subtitle. */
  label?: string
  /** Compact label drawn inside the category when space permits. */
  abbreviation?: string
  /** Current-period magnitude. Negative values are visualized by magnitude. @default 0 */
  value: number
  /** Optional previous-period magnitude used by comparison rendering. */
  previous?: number
}

export type TotTwoTowersCategory = {
  /**
   * Stable key shared by the category's SVG shapes and legend entry. Keys should
   * be unique across both towers.
   */
  key?: string
  /** Human-readable category label. */
  label?: string
  /** Compact label drawn inside the category and prefixed in the legend. */
  abbreviation?: string
  /**
   * Any valid CSS color. Theme variables such as `var(--tot-color-blue-400)`
   * are recommended. When omitted, the component uses its theme-aware series
   * palette.
   */
  color?: string
  /** Visually de-emphasizes the category without changing its geometry. @default false */
  dimmed?: boolean
  /**
   * Current-period category magnitude. When omitted and `subcategories` are
   * present, the category magnitude is derived from their current values.
   */
  value?: number
  /**
   * Previous-period category magnitude. When omitted and `subcategories` are
   * present, it is derived from their previous values.
   */
  previous?: number
  /**
   * Optional internal breakdown. Subcategory current values determine their
   * proportions inside the category. Each subcategory comparison is calculated
   * independently from its own current/previous pair.
   */
  subcategories?: TotTwoTowersSubcategory[]
}

export type TotTwoTowersTower = {
  /** Optional stable identifier for application code. */
  key?: string
  /** Short heading drawn next to the tower. */
  label?: string
  /** Ordered categories stacked along the main axis. */
  categories: TotTwoTowersCategory[]
}

export type TotTwoTowersConfig = {
  /** Accessible label applied to the SVG. @default "Two towers visualization" */
  label?: string
  /**
   * `vertical` places the towers side by side. `horizontal` places them above
   * and below a shared seam. @default "vertical"
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * Shows previous values inside current blocks and hatched protrusions when
   * previous values are larger. @default true
   */
  compare?: boolean
  /**
   * Previous/current ratio above which an oversized protrusion is compressed
   * and marked with a wavy tear. Must be greater than 1. @default 1.5
   */
  tearThreshold?: number
  /**
   * Labels used by the hover/tap details table. Use month or period names such
   * as `June 2026` and `June 2025`.
   */
  periods?: TotTwoTowersPeriods
  /** Exactly two towers. Extra towers are ignored. */
  towers: [TotTwoTowersTower, TotTwoTowersTower]
}

/**
 * `<tot-two-towers>` - a theme-aware two-stack financial-style visualization.
 *
 * Assign one configuration object to `config`. Current magnitudes define each
 * category's main-axis size. With comparison enabled, previous values are shown
 * across the cross-axis; a larger previous value protrudes outside the current
 * block and may receive a tear mark according to `tearThreshold`. Hovering a
 * category (or tapping it on touch devices) shows its subcategories followed by
 * the category total with current, previous, delta, and delta-percent columns.
 */
export type TotTwoTowers = {
  props: {
    /**
     * Visualization data and layout. Assign as a JavaScript property; there is
     * no JSON attribute format. Reassign after mutating nested data so the
     * component can render the new state.
     */
    config: TotTwoTowersConfig
  }

  methods: {
    getSvg(): SVGSVGElement | null
    getLegend(): HTMLElement | null
  }

  events: {}

  slots: {}

  /**
   * ```text
   * base — visualization plus legend
   * ├─ chart — SVG visualization surface
   * ├─ legend — category legend
   * │  ├─ legend-item
   * │  └─ legend-swatch
   * └─ tooltip — category comparison table shown on hover/tap
   * ```
   */
  parts: 'base' | 'chart' | 'legend' | 'legend-item' | 'legend-swatch' | 'tooltip'
}
