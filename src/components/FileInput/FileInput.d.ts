/**
 * `<tot-file-input>` - a file picker and dropzone based on a native
 * `<input type="file">`.
 */
export type TotFileInput = {
  props: {
    /** Selected files. */
    readonly files: File[]

    /** Selected files with paths retained for directory uploads and drops. */
    readonly entries: Array<{
      file: File
      path: string
    }>

    /** Fallback used when the `label` slot is empty. @default 'Files' */
    label: string

    /** Fallback used when the `help-text` slot is empty. @default '' */
    helpText: string

    /** @default 'Choose files' */
    buttonLabel: string

    /** @default false */
    disabled: boolean

    /** Passed to the native file picker. @default '' */
    accept: string

    /** @default false */
    multiple: boolean

    /** Enables directory picking and recursive folder drops when supported. @default false */
    directory: boolean
  }

  /**
   * `getInput()` exposes the native picker. Selected files remain available on
   * `files` and `entries` after its value is reset for repeat selections.
   */
  methods: {
    click(): void
    focus(options?: FocusOptions): void
    blur(): void
    getInput(): HTMLInputElement | null
    openPicker(): void
    clearFiles(): void
    setEntries(entries: Array<File | { file: File; path?: string }>): void
  }

  /**
   * `change` is emitted after picker, drop, programmatic, and clear updates;
   * `clear` is also emitted when the selection is cleared. Both are standard
   * events without custom detail; read `files` and `entries` from the component.
   */
  events: {
    change: Event
    clear: Event
  }

  slots: {
    label: undefined
    icon: undefined
    'help-text': undefined
  }

  /**
   * ```text
   * base — complete file field wrapper
   * ├─ label
   * ├─ dropzone — clickable file picker and drop target
   * │  ├─ input — native file input
   * │  ├─ icon
   * │  ├─ title
   * │  ├─ hint
   * │  └─ actions
   * │     ├─ browse-button
   * │     └─ clear-button
   * ├─ file-list
   * │  ├─ file-item — repeated selected-file row
   * │  │  ├─ file-name — file name or relative path
   * │  │  └─ file-meta — file size
   * │  └─ file-meta — overflow count when the list is truncated
   * └─ help-text
   * ```
   */
  parts:
    | 'base'
    | 'label'
    | 'dropzone'
    | 'input'
    | 'icon'
    | 'title'
    | 'hint'
    | 'actions'
    | 'browse-button'
    | 'clear-button'
    | 'file-list'
    | 'file-item'
    | 'file-name'
    | 'file-meta'
    | 'help-text'
}
