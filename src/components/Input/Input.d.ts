/**
 * `<tot-input>` - a single-line field based on a native `<input>`.
 */
export type TotInput = {
  props: {
    /** @default '' */
    value: string

    /** Fallback used when the `label` slot is empty. @default '' */
    label: string

    /** Fallback used when the `help-text` slot is empty. @default '' */
    helpText: string

    /** @default '' */
    placeholder: string

    /** @default 'text' */
    type: string

    /** @default 'medium' */
    size: 'small' | 'medium' | 'large'

    /** @default false */
    disabled: boolean

    /** Shows a clear button while the field has a value. @default false */
    clearable: boolean

    /** Shows a visibility toggle when `type` is `password`. @default false */
    passwordToggle: boolean
  }

  /** Methods forward to the native input. */
  methods: {
    click(): void
    focus(options?: FocusOptions): void
    blur(): void
    select(): void
    getInput(): HTMLInputElement | null
  }

  /**
   * `input` and `change` are standard events from the field. `clear` is emitted
   * after the clear button empties it. Read the current value from the component.
   */
  events: {
    input: Event
    change: Event
    clear: Event
  }

  slots: {
    label: undefined
    prefix: undefined
    suffix: undefined
    'help-text': undefined
  }

  /**
   * ```text
   * base — complete field wrapper
   * ├─ label
   * ├─ control — bordered input row
   * │  ├─ prefix
   * │  ├─ input — native input
   * │  ├─ suffix
   * │  └─ actions
   * │     ├─ clear-button
   * │     └─ password-button — password visibility toggle
   * └─ help-text
   * ```
   */
  parts:
    | 'base'
    | 'label'
    | 'control'
    | 'prefix'
    | 'input'
    | 'suffix'
    | 'actions'
    | 'clear-button'
    | 'password-button'
    | 'help-text'
}
