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
