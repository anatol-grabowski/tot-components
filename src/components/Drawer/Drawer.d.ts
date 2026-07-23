/**
 * `<tot-drawer>` - a viewport or container edge panel with optional resizing.
 */
export type TotDrawer = {
  props: {
    /** Fallback used when the `label` slot is empty. @default '' */
    label: string

    /** Whether the drawer is visible. @default false */
    open: boolean

    /** Edge from which the drawer opens. @default 'end' */
    placement: 'top' | 'end' | 'bottom' | 'start'

    /**
     * Positions the drawer inside its containing block, removes the overlay,
     * and disables Escape/Back dismissal. The parent must establish a
     * positioned containing block. @default false
     */
    contained: boolean

    /** Hides the complete header. @default false */
    noHeader: boolean

    /** Enables pointer and keyboard resizing from the panel edge. @default false */
    resizable: boolean

    /** Minimum resize extent as a CSS length. @default '12rem' */
    minSize: string

    /** Maximum resize extent as a CSS length. @default '100%' */
    maxSize: string
  }

  methods: {
    show(): void
    hide(): void
    focus(options?: FocusOptions): void
    getBase(): HTMLElement | null
    getPanel(): HTMLElement | null
    getHeader(): HTMLElement | null
    getBody(): HTMLElement | null
    getFooter(): HTMLElement | null
    getCloseButton(): HTMLButtonElement | null
    getResizeHandle(): HTMLButtonElement | null
  }

  /**
   * `show` and `hide` are detail-free lifecycle events. `request-close` is
   * emitted only for user dismissal attempts and can be canceled to keep the
   * drawer open.
   */
  events: {
    show: Event
    hide: Event
    'request-close': CustomEvent<{
      reason: 'overlay' | 'close' | 'escape' | 'back'
    }>
  }

  /** Slotted nodes receive no added attributes or slot props. */
  slots: {
    /** Main scrolling drawer content. */
    default: undefined
    /** Header title; takes precedence over `label`. */
    label: undefined
    /** Content before the built-in close button. */
    'header-actions': undefined
    /** Footer content; the footer is hidden while empty. */
    footer: undefined
  }

  /**
   * ```text
   * base — complete fixed or contained drawer layer
   * ├─ overlay — omitted visually in contained mode
   * └─ panel — dialog surface
   *    ├─ header
   *    │  ├─ title
   *    │  └─ header-actions
   *    │     └─ close-button — native button
   *    ├─ body
   *    ├─ footer — hidden while its slot is empty
   *    └─ resize-handle — native button, visible when resizable
   * ```
   */
  parts:
    | 'base'
    | 'overlay'
    | 'panel'
    | 'header'
    | 'title'
    | 'header-actions'
    | 'close-button'
    | 'body'
    | 'footer'
    | 'resize-handle'
}
