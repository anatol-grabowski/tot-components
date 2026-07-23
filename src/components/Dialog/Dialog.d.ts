/**
 * `<tot-dialog>` - a compact confirm/cancel dialog built on the same overlay
 * and stacking behavior as `<tot-modal>`. It keeps a bounded layout on narrow
 * screens and supplies default footer actions when the `footer` slot is empty.
 */
export type TotDialog = {
  props: {
    /** Fallback used when the `header` slot is empty. @default '' */
    header: string

    /**
     * Final body fallback, used only when both the named `body` slot and default
     * slot are empty. @default ''
     */
    content: string

    /** Whether the dialog is visible. @default false */
    open: boolean

    /** Label of the built-in confirm button. @default 'Confirm' */
    confirmLabel: string

    /** Label of the built-in cancel button. @default 'Cancel' */
    cancelLabel: string

    /** Variant of the built-in confirm button. @default 'primary' */
    confirmVariant: 'default' | 'primary' | 'danger' | 'create'

    /** Hides the built-in cancel button. @default false */
    hideCancel: boolean

    /** Hides the built-in confirm button. @default false */
    hideConfirm: boolean

    /** Hides the complete footer, including slotted footer content. @default false */
    hideFooter: boolean

    /** Hides only the header close button. Escape, Back, and overlay closing remain available. @default false */
    noClose: boolean

    /**
     * Allows a pointer press and release directly on the topmost overlay to
     * close the dialog with reason `overlay`. @default true
     */
    closeOnOverlay: boolean
  }

  methods: {
    show(): void
    /** Hides with reason `programmatic`. */
    hide(): void
    /** Hides with reason `confirm`. */
    confirm(): void
    /** Hides with the supplied reason, or `cancel` by default. */
    cancel(reason?: string): void
    getOverlay(): HTMLElement | null
    getBase(): HTMLElement | null
    getHeader(): HTMLElement | null
    getTitle(): HTMLElement | null
    getBody(): HTMLElement | null
    getFooter(): HTMLElement | null
    getCloseButton(): HTMLButtonElement | null
    getCancelButton(): HTMLElement | null
    getConfirmButton(): HTMLElement | null
  }

  /**
   * Both events bubble and are composed. `show` carries no detail. `hide`
   * carries only the close reason, such as `confirm`, `cancel`, `close`,
   * `overlay`, `escape`, `back`, `programmatic`, or a custom value supplied to
   * `cancel(reason)`.
   */
  events: {
    show: Event
    hide: CustomEvent<{ reason: string }>
  }

  /** Slotted nodes receive no added attributes or slot props. */
  slots: {
    /** Header content. Takes precedence over `header`. */
    header: undefined
    /** Body content, used when the named `body` slot is empty. */
    default: undefined
    /** Named body content. Takes precedence over the default slot and `content`. */
    body: undefined
    /** Replaces the built-in confirm/cancel actions. */
    footer: undefined
  }

  /**
   * ```text
   * overlay — fixed viewport layer; participates in the shared modal backdrop
   * └─ base — compact dialog surface
   *    ├─ header
   *    │  ├─ title
   *    │  └─ close-button — native button
   *    ├─ body
   *    └─ footer
   *       └─ actions — fallback action row when the footer slot is empty
   *          ├─ cancel-button — generated `<tot-button>`
   *          └─ confirm-button — generated `<tot-button>`
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
    | 'actions'
    | 'cancel-button'
    | 'confirm-button'
}
