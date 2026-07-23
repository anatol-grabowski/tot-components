/**
 * `<tot-select>` - a popup single- or multiple-selection control implemented as
 * an ARIA combobox and listbox.
 */
export type TotSelect = {
  props: {
    /** String values become matching labels and values; `'divider'` inserts a divider. */
    items: Array<
      | string
      | {
          value: string
          label?: string
          disabled?: boolean
          selected?: boolean
        }
      | {
          type: 'divider'
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

    /** @default '' */
    placeholder: string

    /** @default 'medium' */
    size: 'small' | 'medium' | 'large'

    /** @default false */
    multiple: boolean

    /** Maximum selected-tag rows in the count preview. @default 3 */
    maxTagRows: 2 | 3

    /** Shows a clear button while a value is selected. @default false */
    clearable: boolean

    /** @default false */
    disabled: boolean

    /** Controls whether the listbox is visible. @default false */
    open: boolean

    /** Positions the open panel relative to the viewport. @default false */
    hoist: boolean
  }

  methods: {
    focus(options?: FocusOptions): void
    blur(): void
    getControl(): HTMLElement | null
    getOptionElements(): HTMLElement[]
  }

  /** Emitted after the user changes the selection. `clear` follows a clear-button action. */
  events: {
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
   * base — complete select wrapper
   * ├─ label
   * ├─ control — combobox trigger
   * │  ├─ prefix
   * │  ├─ display-value — selected value or natural-width tags; overflow previews from the count
   * │  │  └─ tag — repeated removable selected value in multiple mode
   * │  ├─ suffix
   * │  ├─ actions
   * │  │  ├─ selection-count — selected total and overflow-preview trigger
   * │  │  └─ clear-button
   * │  └─ caret
   * ├─ panel
   * │  └─ panel-surface
   * │     └─ listbox
   * │        ├─ option — repeated selectable row
   * │        │  ├─ option-check
   * │        │  └─ option-label
   * │        └─ divider
   * └─ help-text
   * ```
   */
  parts:
    | 'base'
    | 'label'
    | 'control'
    | 'prefix'
    | 'display-value'
    | 'tag'
    | 'suffix'
    | 'actions'
    | 'selection-count'
    | 'clear-button'
    | 'caret'
    | 'panel'
    | 'panel-surface'
    | 'listbox'
    | 'option'
    | 'option-check'
    | 'option-label'
    | 'divider'
    | 'help-text'
}
