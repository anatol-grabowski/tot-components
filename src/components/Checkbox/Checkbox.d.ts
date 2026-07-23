/**
 * `<tot-checkbox>` - a checkbox control based on a native
 * `<input type="checkbox">`.
 */
export type TotCheckbox = {
  props: {
    /** @default false */
    checked: boolean

    /** User activation clears this state. @default false */
    indeterminate: boolean

    /** Fallback used when the default slot is empty. @default '' */
    label: string

    /** Fallback used when the `help-text` slot is empty. @default '' */
    helpText: string

    /** @default 'medium' */
    size: 'small' | 'medium' | 'large'

    /** @default false */
    disabled: boolean
  }

  /**
   * Methods forward to the native checkbox. `getInput()` exposes it for direct
   * integration when the host element itself is not sufficient.
   */
  methods: {
    click(): void
    focus(options?: FocusOptions): void
    blur(): void
    getInput(): HTMLInputElement | null
  }

  /**
   * Standard `input` and `change` events from the native checkbox. They have no
   * custom detail; read `checked` and `indeterminate` from the component.
   */
  events: {
    input: Event
    change: Event
  }

  /** The slots replace their corresponding `label` and `helpText` fallbacks. */
  slots: {
    default: undefined
    'help-text': undefined
  }

  /**
   * ```text
   * base — complete checkbox wrapper
   * ├─ clickable label wrapper
   * │  ├─ input — native checkbox
   * │  ├─ control — visible checkbox box
   * │  │  ├─ checked-icon — checked-state mark
   * │  │  └─ indeterminate-icon — indeterminate-state mark
   * │  └─ label — visible label text
   * └─ help-text — supporting text below the row
   * ```
   */
  parts:
    | 'base'
    | 'input'
    | 'control'
    | 'checked-icon'
    | 'indeterminate-icon'
    | 'label'
    | 'help-text'
}
