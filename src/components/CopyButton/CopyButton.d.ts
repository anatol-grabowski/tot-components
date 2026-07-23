/**
 * `<tot-copy-button>` - a compact native button that copies an explicit value
 * or text resolved from another element.
 */
export type TotCopyButton = {
  props: {
    /** Text copied when `from` is empty. @default '' */
    value: string

    /**
     * Reference to another element by ID. Use `elementId` for its text content,
     * `elementId.property` for a property, or `elementId[attribute]` for an
     * attribute. `from` takes precedence over `value`. @default ''
     */
    from: string

    /** @default false */
    disabled: boolean

    /** Accessible label and idle feedback text. @default 'Copy' */
    copyLabel: string

    /** Feedback shown after a successful copy. @default 'Copied' */
    successLabel: string

    /** Feedback shown after a failed copy. @default 'Copy failed' */
    errorLabel: string

    /** Milliseconds before success or error feedback returns to idle. @default 1000 */
    feedbackDuration: number
  }

  methods: {
    /** Attempts to copy the resolved text and emits either `copy` or `error`. */
    copy(): Promise<void>
    focus(options?: FocusOptions): void
    blur(): void
    getButton(): HTMLButtonElement | null
  }

  events: {
    copy: CustomEvent<{ value: string }>
    error: CustomEvent<{
      error: unknown
      message: string
    }>
  }

  slots: {
    'copy-icon': undefined
    'success-icon': undefined
    'error-icon': undefined
  }

  /**
   * ```text
   * base — status wrapper
   * ├─ button — native copy button
   * │  ├─ copy-icon
   * │  ├─ success-icon
   * │  └─ error-icon
   * └─ feedback — current accessible status label
   * ```
   */
  parts:
    | 'base'
    | 'button'
    | 'copy-icon'
    | 'success-icon'
    | 'error-icon'
    | 'feedback'
}
