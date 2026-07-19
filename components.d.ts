/**
 * `<tot-button>` - an action control based on a native `<button type="button">`.
 */
export type TotButton = {
  props: {
    /** Fallback used when the default slot is empty. @default '' */
    label: string

    /** @default 'default' */
    variant: 'default' | 'primary' | 'danger' | 'create'

    /** @default 'medium' */
    size: 'small' | 'medium' | 'large'

    /**
     * Uses outline styling for colored variants. The `default` variant is
     * already outline-based, so this has no effect on it.
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
   * │  ├─ display-value
   * │  │  ├─ tag — repeated selected value in multiple mode
   * │  │  └─ tag-count — selected-value summary
   * │  ├─ suffix
   * │  ├─ actions
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
    | 'tag-count'
    | 'suffix'
    | 'actions'
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

/**
 * `<tot-theme-selector>` - a theme picker based on native `<button>` controls
 * in an ARIA listbox.
 */
export type TotThemeSelector = {
  props: {
    /** Light and dark themes automatically add a system option when it is omitted. */
    themes: Array<
      | string
      | {
          name: string
          label?: string
          href?: string
        }
    >

    /** Selected theme name. Defaults to the theme detected from the page. */
    value: string

    /** Optional text shown beside the current theme icon. @default '' */
    label: string

    /** @default 'medium' */
    size: 'small' | 'medium' | 'large'

    /** `plain` removes the persistent trigger surface so it blends into its surroundings. @default 'default' */
    variant: 'default' | 'plain'

    /** Directory used for themes without an explicit `href`. Defaults to the active theme stylesheet directory. */
    basePath: string

    /** ID of the stylesheet link updated by the selector. @default 'themeStylesheet' */
    linkId: string
  }

  /** Methods expose the native trigger and menu buttons. */
  methods: {
    focus(options?: FocusOptions): void
    blur(): void
    getTrigger(): HTMLButtonElement | null
    getItems(): HTMLButtonElement[]
  }

  /**
   * Emitted after a theme is applied. For system mode, `theme` remains
   * `system` while `effectiveTheme` reports the currently applied mode.
   */
  events: {
    'theme-change': CustomEvent<{
      theme: string
      label: string
      effectiveTheme: string
      effectiveLabel: string
      href: string
      source: HTMLElement
    }>
  }

  slots: {}

  /**
   * ```text
   * base — complete theme selector
   * ├─ trigger — native button opening the theme list
   * │  ├─ trigger-icon — selected mode; system includes its current light/dark mode
   * │  ├─ trigger-label
   * │  └─ caret
   * └─ panel
   *    └─ menu — theme listbox
   *       └─ item — repeated native option button
   *          ├─ item-icon
   *          ├─ item-label
   *          └─ item-check — selected-state mark
   * ```
   */
  parts:
    | 'base'
    | 'trigger'
    | 'trigger-icon'
    | 'trigger-label'
    | 'caret'
    | 'panel'
    | 'menu'
    | 'item'
    | 'item-icon'
    | 'item-label'
    | 'item-check'
}

/**
 * `<tot-avatar>` - an avatar based on a native `<img>` with initials and icon fallbacks.
 */
export type TotAvatar = {
  props: {
    /** Image URL. A failed image falls back to initials or the icon slot. @default '' */
    image: string

    /** Up to two visible fallback characters. @default '' */
    initials: string

    /** Accessible name. An avatar without one is treated as decorative. @default '' */
    label: string

    /** @default 'medium' */
    size: 'small' | 'medium' | 'large'

    /** @default 'circle' */
    shape: 'circle' | 'square' | 'rounded'

    /** Native image loading behavior. @default 'eager' */
    loading: 'eager' | 'lazy'
  }

  methods: {
    getImage(): HTMLImageElement
  }

  events: {}

  /** Replaces the final icon fallback. */
  slots: {
    icon: undefined
  }

  /**
   * ```text
   * base — avatar container
   * ├─ image — native image when it loads successfully
   * ├─ initials — fallback when initials are provided
   * └─ icon — final fallback and `icon` slot
   * ```
   */
  parts: 'base' | 'image' | 'initials' | 'icon'
}

/**
 * `<tot-navbar>` - a navigation bar with native button tabs and optional content
 * on either side.
 */
export type TotNavbar = {
  props: {
    /** Strings use the same text for their label and value. */
    items: Array<
      | string
      | {
          value: string
          label?: string
          disabled?: boolean
        }
    >

    /** Selected tab value. @default '' */
    value: string

    /** @default 'medium' */
    size: 'small' | 'medium' | 'large'

    /** Disables every tab. @default false */
    disabled: boolean

    /** Accessible label for the navigation landmark. @default 'Main navigation' */
    ariaLabel: string
  }

  /** Focus targets the selected tab, or the first enabled tab. */
  methods: {
    focus(options?: FocusOptions): void
    blur(): void
    getTabButtons(): HTMLButtonElement[]
  }

  /** Emitted after a user selects a tab. */
  events: {
    change: CustomEvent<{
      value: string
      item: {
        value: string
        label: string
        disabled: boolean
      }
    }>
  }

  slots: {
    prefix: undefined
    suffix: undefined
  }

  /**
   * ```text
   * base — navigation bar
   * ├─ prefix — content before the tablist
   * ├─ tabs — horizontally scrollable tablist
   * │  └─ tab — repeated native button
   * └─ suffix — content after the tablist
   * ```
   */
  parts: 'base' | 'prefix' | 'tabs' | 'tab' | 'suffix'
}

/**
 * `<tot-tabs>` - a horizontally scrollable tablist based on native buttons.
 */
export type TotTabs = {
  props: {
    /** `sticky` keeps an item visible at the start or end while the tablist scrolls. */
    items: Array<
      | string
      | {
          value: string
          label?: string
          disabled?: boolean
          sticky?: 'start' | 'end'
        }
    >

    /** Selected tab value. @default '' */
    value: string

    /** @default 'medium' */
    size: 'small' | 'medium' | 'large'

    /** Disables every tab. @default false */
    disabled: boolean

    /** Accessible label for the tablist. @default 'Tabs' */
    ariaLabel: string
  }

  /** Focus targets the selected tab, or the first enabled tab. */
  methods: {
    focus(options?: FocusOptions): void
    blur(): void
    getTabButtons(): HTMLButtonElement[]
  }

  /** Emitted after a user selects a tab. */
  events: {
    change: CustomEvent<{
      value: string
      item: {
        value: string
        label: string
        disabled: boolean
        sticky: '' | 'start' | 'end'
      }
    }>
  }

  slots: {}

  /**
   * ```text
   * base — horizontally scrollable tablist
   * └─ tab — repeated native button; may also expose sticky-start or sticky-end
   *    └─ tab-inner — bordered tab surface
   *       └─ tab-text
   * ```
   */
  parts:
    | 'base'
    | 'tab'
    | 'sticky-start'
    | 'sticky-end'
    | 'tab-inner'
    | 'tab-text'
}
