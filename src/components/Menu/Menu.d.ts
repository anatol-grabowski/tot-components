/** A divider entry in `TotMenu.items` or `TotDropdown.menuItems`. */
export type TotMenuDividerConfig = {
  type: 'divider'
}

/** A non-interactive section-label entry in menu data. */
export type TotMenuLabelConfig = {
  type: 'label'
  label: string
}

/**
 * An action entry in menu data. This is the only accepted item shape: use
 * `items` for a submenu and `suffix` for a short text or emoji suffix.
 */
export type TotMenuActionConfig = {
  type: 'item'
  value: string
  label: string
  disabled?: boolean
  suffix?: string
  items?: TotMenuConfig[]
}

/**
 * The single canonical menu-data format accepted and returned by menus and
 * dropdowns. String shorthands and alternate field names are not accepted.
 */
export type TotMenuConfig =
  | TotMenuDividerConfig
  | TotMenuLabelConfig
  | TotMenuActionConfig

/**
 * `<tot-menu>` - a menu surface composed of `<tot-menu-item>`,
 * `<tot-menu-label>`, and `<tot-divider>` elements.
 */
export type TotMenu = {
  props: {
    /**
     * Menu entries in the canonical discriminated-object format. Reading
     * returns a cloned, normalized array using the same format. Default-slot
     * content takes precedence while present. @default []
     */
    items: TotMenuConfig[]

    /** Uses tighter item spacing. @default false */
    dense: boolean

    /** Removes the menu surface border and shadow for composition. @default false */
    embedded: boolean
  }

  methods: {
    /** Focuses the first enabled direct menu item. */
    focus(options?: FocusOptions): void
    focusFirstItem(options?: FocusOptions): void
    getBase(): HTMLElement | null
    getMenuItems(): HTMLElement[]
    getEnabledMenuItems(): HTMLElement[]
    /** Closes direct submenus, optionally leaving one item open. */
    closeSubmenus(except?: HTMLElement): void
  }

  /**
   * `select` is emitted for an enabled leaf item. Submenu triggers open their
   * submenu instead. The event bubbles and is composed.
   */
  events: {
    select: CustomEvent<{
      /** The selected `<tot-menu-item>` host. */
      item: HTMLElement
      value: string
      label: string
    }>
  }

  /**
   * Direct menu elements in the default slot take precedence over `items`.
   * Slotted nodes receive no added attributes or slot props.
   */
  slots: {
    default: undefined
  }

  /**
   * ```text
   * base — role="menu" surface
   * ├─ default slot — slotted menu elements, when present
   * └─ generated-items — elements generated from `items`
   * ```
   */
  parts: 'base' | 'generated-items'
}

/**
 * `<tot-menu-item>` - one action in a menu, based on a native `<button>`.
 */
export type TotMenuItem = {
  props: {
    /** Falls back to the visible label when omitted. */
    value: string

    /** Text derived from the default slot, excluding suffix and submenu content. */
    readonly label: string

    /** @default false */
    disabled: boolean

    /**
     * Short text or emoji shown after the label. The `suffix` slot takes
     * precedence when assigned. @default ''
     */
    suffix: string

    /** Keeps the submenu open independently of hover or focus. @default false */
    open: boolean

    /** Whether the `submenu` slot currently contains a `<tot-menu>`. */
    readonly hasSubmenu: boolean
  }

  /** Click, focus, and blur forward to the native button. */
  methods: {
    click(): void
    focus(options?: FocusOptions): void
    blur(): void
    getControl(): HTMLButtonElement | null
    /** Compatibility alias for `getControl()`. */
    getBase(): HTMLButtonElement | null
    getSubmenu(): HTMLElement | null
  }

  /** Native click from the internal button. Parent menus translate leaf clicks into `select`. */
  events: {
    click: MouseEvent
  }

  slots: {
    /** Visible item label/content. */
    default: undefined
    /** Custom suffix content, such as an icon; replaces the `suffix` text. */
    suffix: undefined
    /** A nested `<tot-menu>`. */
    submenu: undefined
  }

  /**
   * ```text
   * base — native action button
   * ├─ label
   * ├─ suffix — text fallback or custom suffix slot
   * └─ submenu-caret
   * submenu — positioned submenu slot
   * ```
   */
  parts:
    | 'base'
    | 'label'
    | 'suffix'
    | 'submenu-caret'
    | 'submenu'
}

/** `<tot-menu-label>` - a non-interactive section heading inside a menu. */
export type TotMenuLabel = {
  props: {}

  methods: {
    getBase(): HTMLElement | null
  }

  events: {}

  slots: {
    default: undefined
  }

  /** `base` is the complete section-label element. */
  parts: 'base'
}
