/**
 * `<tot-modal>` - a large responsive modal surface. It is centered on wider
 * viewports and fills the viewport on narrow screens. Open modals and dialogs
 * share one translucent backdrop immediately below the topmost surface; only
 * that surface responds to overlay clicks, Escape, or browser Back.
 */
export type TotModal = {
  props: {
    /** Fallback used when the `header` slot is empty. @default '' */
    header: string

    /** Whether the modal is visible. @default false */
    open: boolean

    /**
     * Allows a pointer press and release directly on the topmost overlay to
     * close the modal. Dragging from the modal onto the overlay does not close
     * it. @default true
     */
    closeOnOverlay: boolean
  }

  methods: {
    show(): void
    hide(): void
    getOverlay(): HTMLElement | null
    getBase(): HTMLElement | null
    getHeader(): HTMLElement | null
    getTitle(): HTMLElement | null
    getBody(): HTMLElement | null
    getFooter(): HTMLElement | null
    getCloseButton(): HTMLButtonElement | null
  }

  /** Both events bubble, are composed, and carry no detail. */
  events: {
    show: Event
    hide: Event
  }

  /** Slotted nodes receive no added attributes or slot props. */
  slots: {
    /** Header content. Takes precedence over `header`. */
    header: undefined
    /** Default body content, used when the named `body` slot is empty. */
    default: undefined
    /** Named body content. Takes precedence over the default slot. */
    body: undefined
    /** Footer content. The footer is hidden while this slot is empty. */
    footer: undefined
  }

  /**
   * ```text
   * overlay — fixed viewport layer; only the top open layer draws the shared backdrop
   * └─ base — responsive modal surface
   *    ├─ header
   *    │  ├─ title
   *    │  └─ close-button — native button
   *    ├─ body
   *    └─ footer — hidden when its slot is empty
   * ```
   */
  parts:
    | 'overlay'
    | 'base'
    | 'header'
    | 'title'
    | 'close-button'
    | 'body'
    | 'footer'
}
