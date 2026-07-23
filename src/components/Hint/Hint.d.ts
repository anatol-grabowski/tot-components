/**
 * `<tot-hint>` - a compact text-only panel that follows the pointer or appears
 * near an explicit viewport coordinate. Unlike `<tot-tooltip>`, its panel does
 * not accept pointer interaction.
 */
export type TotHint = {
  props: {
    /** Visible hint text. @default '' */
    content: string

    /** Whether the panel is visible. @default false */
    open: boolean

    /**
     * How the anchor opens the panel. `none` disables automatic activation so
     * `show()`, `showAt()`, and `hide()` can control it directly. @default 'hover'
     */
    activation: 'hover' | 'click' | 'none'

    /** Pointer or anchor gap in CSS pixels. @default 12 */
    offset: number
  }

  methods: {
    /** Shows the panel beside the slotted anchor. */
    show(): void
    /**
     * Shows the panel near viewport coordinates using the same coordinate
     * system as `PointerEvent.clientX` and `PointerEvent.clientY`.
     */
    showAt(clientX: number, clientY: number): void
    hide(): void
    getBase(): HTMLElement | null
    getAnchor(): HTMLElement | null
    getPanel(): HTMLElement | null
    getSurface(): HTMLElement | null
    getContent(): HTMLElement | null
  }

  events: {}

  /** The default slot supplies the anchor and receives no added attributes. */
  slots: {
    default: undefined
  }

  /**
   * ```text
   * base — complete anchored wrapper
   * ├─ anchor — default anchor slot
   * └─ panel — fixed role="tooltip" panel
   *    └─ surface — text-only surface
   *       └─ content — hint text
   * ```
   */
  parts: 'base' | 'anchor' | 'panel' | 'surface' | 'content'
}
