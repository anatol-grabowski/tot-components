/**
 * `<tot-labels>` - an editable set of unique text labels with a compact
 * `<tot-input>` entry field.
 */
export type TotLabels = {
  props: {
    /**
     * Unique labels in display order. Values are trimmed, internal whitespace
     * is collapsed, empty values are removed, and reading returns a copy.
     * The `labels` attribute accepts either a JSON string array or a
     * comma-separated list. @default []
     */
    labels: string[]

    /** Placeholder for the entry field. @default 'Add label' */
    placeholder: string

    /** Prevents editing while retaining the disabled entry field. @default false */
    disabled: boolean

    /** Hides the entry and removal controls. @default false */
    readonly: boolean

    /** @default 'small' */
    size: 'small' | 'medium' | 'large'
  }

  methods: {
    /** Focuses the entry field unless the component is read-only. */
    focus(options?: FocusOptions): void

    /** Adds a non-empty unique label and reports whether the set changed. */
    addLabel(label: string): boolean

    /** Removes the first exact normalized match. */
    removeLabel(label: string): boolean

    /** Removes a label by display index. */
    removeLabelAt(index: number): boolean

    getBase(): HTMLElement | null
    getInputComponent(): HTMLElement | null
  }

  /** Emitted after a label is added or removed. It bubbles and is composed. */
  events: {
    change: CustomEvent<{
      action: 'add' | 'remove'
      label: string
      labels: string[]
    }>
  }

  slots: {}

  /**
   * ```text
   * base — wrapping label list
   * ├─ label — repeated colored label
   * │  ├─ label-text
   * │  └─ label-remove — omitted when disabled or read-only
   * └─ entry — `<tot-input>`, hidden when read-only
   *    └─ add-button
   * ```
   */
  parts:
    | 'base'
    | 'label'
    | 'label-text'
    | 'label-remove'
    | 'entry'
    | 'add-button'
}
