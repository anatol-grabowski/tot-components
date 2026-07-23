/**
 * `<tot-button>` - an action control based on a native `<button type="button">`.
 */
export type TotButton = {
  props: {
    /** Fallback used when the default slot is empty. @default '' */
    label: string

    /** @default 'default' */
    variant: 'default' | 'plain' | 'primary' | 'danger' | 'create'

    /** @default 'medium' */
    size: 'small' | 'medium' | 'large'

    /**
     * Uses outline styling for colored variants. The `default` variant is
     * already outline-based and `plain` is borderless, so this has no effect
     * on either one.
     * @default false
     */
    outline: boolean

    /** @default false */
    disabled: boolean

    /** Shows the loader without disabling the control. @default false */
    loading: boolean

    /** @default false */
    caret: boolean

    /** When set, renders a native `<a>` styled to look like a button. @default '' */
    href: string

    /** @default '' */
    target: string

    /** @default 'noreferrer noopener' */
    rel: string
  }

  /** Methods forward to the current native `<button>` or `<a>`. */
  methods: {
    click(): void
    focus(options?: FocusOptions): void
    blur(): void
    getControl(): HTMLButtonElement | HTMLAnchorElement | null
  }

  /** Native click event from the current native control. */
  events: {
    click: MouseEvent
  }

  /** The default slot provides button content and takes precedence over `label`. */
  slots: {
    default: undefined
  }

  /**
   * ```text
   * base — native `<button>` or button-styled `<a>`
   * ├─ content — main content row
   * │  ├─ label — slotted content or `label` fallback
   * │  └─ caret — optional caret
   * └─ loader — loading indicator over the control
   * ```
   */
  parts: 'base' | 'content' | 'label' | 'caret' | 'loader'
}
