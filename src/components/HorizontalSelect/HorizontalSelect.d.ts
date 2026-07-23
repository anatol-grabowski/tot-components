/**
 * `<tot-horizontal-select>` - a single- or multiple-selection row based on
 * native `<button type="button">` options in an ARIA listbox.
 */
export type TotHorizontalSelect = {
  props: {
    items: Array<
      | string
      | {
          value: string
          label?: string
          disabled?: boolean
          selected?: boolean
        }
    >

    /** The first selected value. @default '' */
    value: string

    /** Selected values used when `multiple` is enabled. @default [] */
    values: string[]

    /** Fallback used when the `label` slot is empty. @default '' */
    label: string

    /** Fallback used when the `help-text` slot is empty. @default '' */
    helpText: string

    /** @default 'medium' */
    size: 'small' | 'medium' | 'large'

    /** @default false */
    multiple: boolean

    /** @default false */
    disabled: boolean
  }

  /** Focus targets the selected option, or the first enabled option. */
  methods: {
    focus(options?: FocusOptions): void
    blur(): void
    getButtons(): HTMLButtonElement[]
  }

  /** Emitted after the user changes the selection. */
  events: {
    change: Event
  }

  slots: {
    label: undefined
    'help-text': undefined
  }

  /**
   * ```text
   * base — complete selection wrapper
   * ├─ label
   * ├─ scroller — horizontal overflow container
   * │  └─ options — listbox row
   * │     └─ option — repeated native button
   * └─ help-text
   * ```
   */
  parts: 'base' | 'label' | 'scroller' | 'options' | 'option' | 'help-text'
}
