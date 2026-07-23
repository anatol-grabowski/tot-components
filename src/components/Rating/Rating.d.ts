/**
 * `<tot-rating>` - a keyboard and pointer-controlled slider rendered as
 * partially filled symbols.
 */
export type TotRating = {
  props: {
    /** Accessible slider label. @default 'Rating' */
    label: string

    /** Current value, clamped to `0..max`. @default 0 */
    value: number

    /** Number of rendered symbols. @default 5 */
    max: number

    /** Smallest selectable increment. @default 1 */
    precision: number

    /** Keeps the value focusable but prevents editing. @default false */
    readonly: boolean

    /** Prevents editing and removes the slider from tab order. @default false */
    disabled: boolean

    /**
     * Optional symbol factory called with one-based symbol positions. Returned
     * values are rendered as text. `null` restores the default star.
     * @default null
     */
    getSymbol: ((position: number) => string | null | undefined) | null
  }

  methods: {
    focus(options?: FocusOptions): void
    blur(): void
    getBase(): HTMLElement | null
    getSymbols(): HTMLElement[]
  }

  /**
   * `input` and `change` report each user value update. `hover` reports pointer
   * preview phases without changing the value when not dragging.
   */
  events: {
    input: CustomEvent<{
      value: number
      max: number
      precision: number
    }>
    change: CustomEvent<{
      value: number
      max: number
      precision: number
    }>
    hover: CustomEvent<{
      phase: 'start' | 'move' | 'end'
      value: number
    }>
  }

  slots: {}

  /**
   * ```text
   * base — focusable slider
   * └─ symbol — repeated symbol position
   *    ├─ inactive-symbol — unfilled symbol text
   *    └─ active-symbol — clipped filled symbol text
   * ```
   */
  parts: 'base' | 'symbol' | 'inactive-symbol' | 'active-symbol'
}
