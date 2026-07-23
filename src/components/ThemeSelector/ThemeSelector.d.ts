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
