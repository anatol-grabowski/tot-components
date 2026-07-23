/**
 * `<tot-fields>` - an editable ordered set of string key/value pairs. An
 * editable instance always renders one trailing empty row for adding another
 * pair; that row is not included in `fields`.
 */
export type TotFields = {
  props: {
    /**
     * Key/value data. Values are converted to strings and empty keys are
     * omitted. The `fields` attribute accepts a JSON object. @default {}
     */
    fields: Record<string, string>

    /** @default 'Key' */
    keyPlaceholder: string

    /** @default 'Value' */
    valuePlaceholder: string

    /** Disables all editable controls. @default false */
    disabled: boolean

    /** Replaces editable rows with compact key/value tiles. @default false */
    readonly: boolean

    /** @default 'small' */
    size: 'small' | 'medium' | 'large'
  }

  methods: {
    /** Focuses the first key input when editable. */
    focus(options?: FocusOptions): void

    /** Removes a non-empty editable row by its displayed index. */
    removeRowAt(index: number): boolean

    getBase(): HTMLElement | null
    getInput(index: number, fieldName: 'key' | 'value'): HTMLInputElement | null
  }

  /**
   * `change` is emitted for each edit and explicit row removal. `fields` is
   * the current object view, where a later duplicate key replaces an earlier
   * one.
   */
  events: {
    change: CustomEvent<{
      action: 'edit' | 'remove'
      index: number
      fieldName?: 'key' | 'value'
      field: {
        key: string
        value: string
      }
      fields: Record<string, string>
    }>
  }

  slots: {}

  /**
   * ```text
   * base
   * ├─ row — repeated editable row
   * │  ├─ key-input — `<tot-input>`; `getInput()` exposes its native input
   * │  ├─ value-input — `<tot-input>`; `getInput()` exposes its native input
   * │  └─ remove
   * └─ field — repeated read-only tile instead of rows
   *    └─ field-text
   *       └─ field-key
   * ```
   */
  parts:
    | 'base'
    | 'row'
    | 'key-input'
    | 'value-input'
    | 'remove'
    | 'field'
    | 'field-text'
    | 'field-key'
}
