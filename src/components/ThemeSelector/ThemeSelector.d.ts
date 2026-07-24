/**
 * `<tot-theme-selector>` - a compact theme picker composed from
 * `<tot-dropdown>`, `<tot-button>`, `<tot-menu>`, and `<tot-menu-item>`.
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

    /** `plain` uses Button's borderless trigger variant. @default 'default' */
    variant: 'default' | 'plain'

    /** Directory used for themes without an explicit `href`. Defaults to the active theme stylesheet directory. */
    basePath: string

    /** ID of the stylesheet link updated by the selector. @default 'themeStylesheet' */
    linkId: string
  }

  /** Methods expose the native trigger and menu-item buttons. */
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
   * base — nested `<tot-dropdown>`
   * ├─ trigger — native button forwarded from `<tot-button>`
   * │  ├─ trigger-icon — current theme icon
   * │  ├─ trigger-label
   * │  └─ caret — forwarded Button caret
   * └─ panel — forwarded Dropdown panel
   *    └─ menu — forwarded Menu surface
   *       └─ item — repeated native MenuItem button
   *          ├─ item-icon
   *          ├─ item-label
   *          └─ item-check — selected-state mark
   * ```
   *
   * The system icon uses a monitor containing a sun or moon that reflects the
   * currently resolved operating-system preference. It updates when the system
   * color scheme changes while `theme` remains `system`.
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
