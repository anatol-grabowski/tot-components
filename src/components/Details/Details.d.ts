/**
 * `<tot-details>` - a compact disclosure widget based on native `<details>`
 * and `<summary>` elements.
 */
export type TotDetails = {
  props: {
    /** Whether the content is expanded. @default false */
    open: boolean

    /** Fallback used when the `summary` slot is empty. @default '' */
    summary: string

    /**
     * Prevents user interaction with the summary. The open state can still be
     * changed programmatically. @default false
     */
    disabled: boolean
  }

  methods: {
    show(): void
    hide(): void

    /** Toggles the disclosure unless it is disabled. */
    toggle(): void

    /** Focus and blur forward to the native `<summary>`. */
    focus(options?: FocusOptions): void
    blur(): void

    /** Returns the persistent native disclosure element. */
    getDetails(): HTMLDetailsElement

    /** Returns the persistent native summary element. */
    getSummary(): HTMLElement
  }

  /**
   * Native-style detail-free event emitted after the open state changes through
   * user interaction, the `open` property, or `show()`, `hide()`, and `toggle()`.
   * Read `open` from the component.
   */
  events: {
    toggle: Event
  }

  /** Slotted nodes receive no added attributes or slot props. */
  slots: {
    /** Disclosure content. */
    default: undefined

    /** Summary content; takes precedence over the `summary` fallback. */
    summary: undefined

    /** Replaces the collapsed-state chevron. */
    'expand-icon': undefined

    /** Replaces the expanded-state chevron. */
    'collapse-icon': undefined
  }

  /**
   * ```text
   * base — native `<details>`
   * ├─ header — native `<summary>`
   * │  ├─ summary — summary slot or `summary` fallback
   * │  └─ summary-icon
   * │     ├─ expand-icon — visible while collapsed
   * │     └─ collapse-icon — visible while expanded
   * └─ content — default slot
   * ```
   */
  parts:
    | 'base'
    | 'header'
    | 'summary'
    | 'summary-icon'
    | 'expand-icon'
    | 'collapse-icon'
    | 'content'
}
