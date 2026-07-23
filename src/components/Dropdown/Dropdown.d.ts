type TotDropdownMenuConfig =
  | { type: 'divider' }
  | { type: 'label'; label: string }
  | {
      type: 'item'
      value: string
      label: string
      disabled?: boolean
      suffix?: string
      items?: TotDropdownMenuConfig[]
    }

/**
 * `<tot-dropdown>` - a positioned `<tot-menu>` opened by a `<tot-button>`.
 * The built-in trigger and generated panel delegate their rendering and state to
 * those components rather than duplicating button or menu implementations.
 */
export type TotDropdown = {
  props: {
    /** Fallback trigger-button label. Ignored when the `trigger` slot is used. @default 'Dropdown' */
    label: string

    /**
     * Proxied to the generated `<tot-menu>` using the same canonical menu-data
     * format. A slotted menu takes visual precedence. @default []
     */
    items: TotDropdownMenuConfig[]

    /** Whether the panel is visible. @default false */
    open: boolean

    /**
     * Uses viewport-fixed positioning with automatic flipping to avoid clipping.
     * Without it, the panel is positioned below the trigger in local layout.
     * @default false
     */
    hoist: boolean

    /** Keeps the panel open after a leaf menu item is selected. @default false */
    stayOpenOnSelect: boolean
  }

  methods: {
    show(): void
    hide(): void
    toggle(): void
    focus(options?: FocusOptions): void
    getTrigger(): HTMLElement | null
    /** Returns the slotted menu when present, otherwise the generated menu. */
    getMenu(): HTMLElement | null
  }

  /** The active menu selection re-emitted without exposing the menu-item element. */
  events: {
    select: CustomEvent<{
      value: string
      label: string
    }>
  }

  slots: {
    /** A `<tot-menu>` that replaces the generated menu. Other elements are ignored. */
    default: undefined
    /** A custom trigger that replaces the generated `<tot-button>`. */
    trigger: undefined
  }

  /**
   * ```text
   * base — positioned dropdown wrapper
   * ├─ trigger
   * │  └─ button — generated `<tot-button>` when the trigger slot is empty
   * └─ panel
   *    └─ menu — generated `<tot-menu>` when the default slot has no menu
   * ```
   */
  parts: 'base' | 'trigger' | 'button' | 'panel' | 'menu'
}
