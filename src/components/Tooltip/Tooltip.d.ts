/**
 * `<tot-tooltip>` - an interactive popup anchored to its default slot. The
 * panel uses fixed viewport positioning and automatically flips when the
 * preferred side has insufficient space.
 */
export type TotTooltip = {
  props: {
    /** Text fallback for the `content` slot. @default '' */
    content: string

    /** Whether the panel is visible. @default false */
    open: boolean

    /**
     * How the anchor opens the panel. `none` disables automatic activation so
     * `show()`, `hide()`, or `toggle()` can control it directly. @default 'hover'
     */
    activation: 'hover' | 'click' | 'none'

    /** Preferred placement before automatic flipping. @default 'bottom-start' */
    placement:
      | 'bottom-start'
      | 'bottom-end'
      | 'bottom'
      | 'top-start'
      | 'top-end'
      | 'top'
      | 'right-start'
      | 'right-end'
      | 'right'
      | 'left-start'
      | 'left-end'
      | 'left'

    /** Gap between the anchor and panel in CSS pixels. @default 4 */
    offset: number
  }

  methods: {
    show(): void
    hide(): void
    toggle(): void
    getBase(): HTMLElement | null
    getAnchor(): HTMLElement | null
    getPanel(): HTMLElement | null
    getSurface(): HTMLElement | null
    getContent(): HTMLElement | null
  }

  events: {}

  /** Slotted nodes receive no added attributes or slot props. */
  slots: {
    /** Anchor content. */
    default: undefined
    /** Rich panel content; takes precedence over the `content` text fallback. */
    content: undefined
  }

  /**
   * ```text
   * base — complete anchored wrapper
   * ├─ anchor — default anchor slot
   * └─ panel — fixed role="tooltip" panel
   *    └─ surface — bordered, scrollable surface
   *       └─ content — named content slot or text fallback
   * ```
   */
  parts: 'base' | 'anchor' | 'panel' | 'surface' | 'content'
}
