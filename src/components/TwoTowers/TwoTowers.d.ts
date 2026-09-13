export type TotTwoTowersPeriods = {
  /** Column label for current values in details tables. @default "Current" */
  current?: string
  /** Column label for previous values in details tables. @default "Previous" */
  previous?: string
}

export type TotTwoTowersFormulaItem = {
  /** Calculation weight relative to the parent item. @default '+' */
  sign?: '+' | '-'
  /** Human-readable XBRL concept name. */
  name: string
  /** XBRL concept/tag name. */
  tag: string
  /** Nested CAL formula children. */
  items?: TotTwoTowersFormulaItem[]
}

export type TotTwoTowersFormula = {
  /** Optional formula heading; ignored by TwoTowers but accepted for Formula.js compatibility. */
  title?: string
  /** CAL formula tree using the same item format as Formula.js. */
  items: TotTwoTowersFormulaItem[]
}

export type TotTwoTowersGroup = {
  /** Theme-aware CSS color used for the group. */
  color?: string
  /** Optional legend/tooltip name overriding the formula item's name. */
  name?: string
  /** Do not create a visual category for this formula tag. @default false */
  hidden?: boolean
  /**
   * Assign this tag to another configured group instead of creating its own
   * category. Useful when two formula tags should share one visual category.
   */
  group?: string
  /**
   * Optional tag whose raw fact is used for the category summary row instead
   * of the signed sum of the group's visible leaves. Useful for a group that
   * combines two instant facts such as beginning/end cash.
   */
  valueTag?: string
}

export type TotTwoTowersGroups = Record<string, string | TotTwoTowersGroup>

export type TotTwoTowersConfig = {
  /** Accessible label applied to the SVG. @default "Two towers visualization" */
  label?: string
  /**
   * `vertical` places positive and negative towers side by side. `horizontal`
   * places them above and below a shared seam. @default "vertical"
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * Draw each visual group as one solid color block with no subcategory splits,
   * labels, values, or comparison overlays. @default false
   */
  simple?: boolean
  /** Show the legend outside fullscreen. Fullscreen always shows it. @default false */
  legend?: boolean
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
  /** CAL formula definition using the same recursive item format as Formula.js. */
  formula: TotTwoTowersFormula
  /** Current-period numeric facts keyed by XBRL tag name. */
  values: Record<string, number>
  /** Compact labels keyed by XBRL tag name. */
  abbreviations?: Record<string, string>
  /** Optional previous-period numeric facts keyed by XBRL tag name. */
  previousValues?: Record<string, number>
  /**
   * Visual groups keyed by formula tag. A string value is shorthand for
   * `{ color: value }`.
   *
   * Leaves belong to the nearest configured ancestor group. Therefore a group
   * for `AssetsCurrent` automatically takes its descendants out of an `Assets`
   * group, while the remaining Assets descendants stay in `Assets`. Set
   * `{ hidden: true }` to explicitly suppress a group, or `{ group: 'OtherTag' }`
   * to assign a formula tag to another configured group. No tag name receives
   * special treatment.
   */
  groups: TotTwoTowersGroups
}

/**
 * `<tot-two-towers>` - a theme-aware two-stack visualization derived from an
 * XBRL CAL formula.
 *
 * TwoTowers multiplies each leaf fact by the + / - weights along its path from
 * the formula root. A positive effective contribution goes to the positive
 * tower and a negative contribution goes to the negative tower. The raw fact
 * itself is still shown in labels/details, so liabilities or ending cash can
 * display as positive statement values while their formula contribution is on
 * the negative side.
 *
 * `groups` controls visual aggregation only. Descendant leaves inherit the
 * nearest configured group, and a more-specific group automatically carves its
 * subtree out of a broader ancestor group. Intermediate formula totals do not
 * need separate groups when their descendants are fully covered.
 *
 * Compact labels are supplied separately through `abbreviations`, keyed by XBRL
 * tag. The same dictionary can be shared with Formula.js; formula items and
 * group definitions do not need embedded short-name fields.
 *
 * Previous-period rendering is evaluated per leaf contribution. Same-sign
 * changes use a lighter unhatched comparison region; sign changes use hatching.
 * Oversized previous protrusions use `tearThreshold` and a wavy tear mark.
 *
 * With `simple: true`, each side of a group is rendered as a single solid-color
 * block without leaf dividers, labels, values, or comparison overlays. The legend
 * is opt-in outside fullscreen and is always visible in fullscreen.
 *
 * Hovering any fragment highlights every fragment in the same group across both
 * towers. Touch users can tap to pin the details table. Hold a legend item on
 * touch, or right-click it with a mouse, to hide/show that group. In fullscreen,
 * the complete details table, the source Formula.js view, or a read-only
 * formula/group mapping view can be opened beside the visualization. Hovering a
 * formula item, or an item in the group/color mapping view, highlights its
 * corresponding visual leaf/subgroup and resolved legend group. The group view
 * colors each formula item by its resolved visual category and marks configured
 * hidden groups. The table can be resized by dragging its edge. On
 * narrow screens any open panel replaces the visualization.
 *
 * Group and leaf tags are attached to rendered pieces as CSS hooks. Tags without
 * whitespace become exact classes; CSS-safe tags are also exact shadow parts.
 * A `tag-<sanitized-tag>` class/part is always added.
 */
export type TotTwoTowers = {
  props: {
    /** Visualization formula, fact dictionaries, grouping and layout. */
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
   * ├─ legend — formula-group legend
   * │  ├─ legend-item
   * │  └─ legend-swatch
   * ├─ tooltip — group comparison table shown on hover/tap
   * ├─ details-table — resizable fullscreen table with every group/leaf
   * │  ├─ details-table-header
   * │  ├─ details-table-scroll
   * │  └─ details-resize-handle
   * ├─ formula-panel — fullscreen Formula.js view of the source CAL formula
   * │  ├─ formula-panel-header
   * │  ├─ formula-simplified
   * │  ├─ formula-panel-scroll
   * │  └─ formula-view
   * ├─ groups-panel — read-only hierarchical formula/group/color mapping
   * │  ├─ groups-panel-header
   * │  ├─ groups-panel-scroll
   * │  └─ groups-item
   * ├─ groups-button — opens/closes the fullscreen group/color view
   * ├─ formula-button — opens/closes the fullscreen formula view
   * ├─ details-button — opens/closes the fullscreen details table
   * └─ fullscreen-button — opens/closes the fixed fullscreen visualization
   * ```
   */
  parts: 'base' | 'chart' | 'legend' | 'legend-item' | 'legend-swatch' | 'tooltip' | 'details-table' | 'details-table-header' | 'details-table-scroll' | 'details-resize-handle' | 'formula-panel' | 'formula-panel-header' | 'formula-simplified' | 'formula-panel-scroll' | 'formula-view' | 'groups-panel' | 'groups-panel-header' | 'groups-panel-scroll' | 'groups-item' | 'groups-button' | 'formula-button' | 'details-button' | 'fullscreen-button' | `tag-${string}`
}
