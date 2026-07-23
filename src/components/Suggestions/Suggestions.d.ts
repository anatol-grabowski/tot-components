/**
 * `<tot-suggestions>` - selectable suggestion tiles with optional grouping,
 * item limiting, and line-based collapsing.
 */
export type TotSuggestions = {
  props: {
    /**
     * A flat list creates one group; nested arrays create visually separated
     * groups. Values are converted to trimmed strings and empty values are
     * omitted. Reading returns the normalized grouped form. The `suggestions`
     * attribute accepts JSON or a comma-separated flat list. @default []
     */
    suggestions: string[] | string[][]

    /** Maximum collapsed item count; `0` disables this limit. @default 0 */
    limit: number

    /** Maximum collapsed visual line count; `0` disables this limit. @default 0 */
    lineLimit: number

    /** Shows every suggestion in a bounded scrolling surface. @default false */
    expanded: boolean

    /** @default 'small' */
    size: 'small' | 'medium' | 'large'
  }

  methods: {
    getBase(): HTMLElement | null
  }

  /** `select` bubbles and is composed. */
  events: {
    select: CustomEvent<{
      suggestion: string
      /** Compatibility value equal to `suggestion`. */
      value: string
      groupIndex: number
      index: number
      flatIndex: number
      /** Normalized grouped suggestion data. */
      suggestions: string[][]
    }>
  }

  slots: {}

  /**
   * ```text
   * base — wrapping or expanded scrolling surface
   * ├─ suggestion — repeated native button
   * │  └─ suggestion-text
   * ├─ separator — between rendered groups
   * └─ more | collapse — generated limit action
   * ```
   */
  parts:
    | 'base'
    | 'suggestion'
    | 'suggestion-text'
    | 'separator'
    | 'more'
    | 'collapse'
}
