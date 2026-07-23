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
