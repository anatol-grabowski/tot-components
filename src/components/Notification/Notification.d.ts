/**
 * `<tot-notification>` - an inline or toast-positioned status surface that
 * combines Message-style semantic colors and icons with optional closing and
 * automatic hiding.
 */
export type TotNotification = {
  props: {
    /** Controls visibility. @default false */
    open: boolean

    /** Shows the close button at the far inline end. @default false */
    closable: boolean

    /**
     * Controls the semantic colors, built-in icon, and live-region role.
     * Warning and error notifications use an assertive alert role.
     * @default 'info'
     */
    type: 'success' | 'info' | 'warning' | 'error'

    /**
     * Auto-hide delay in milliseconds. Omit the attribute or assign
     * `Infinity` for a persistent notification. Finite notifications show one
     * progress bar that retracts from right to left. Hovering, focusing, or
     * holding a finger on the notification pauses at the current remaining
     * time and resumes from the same point. @default Infinity
     */
    duration: number

    /** Plain-text fallback used when the default slot is empty. @default '' */
    content: string

    /** Accessible label for the close button. @default 'Close' */
    closeLabel: string
  }

  methods: {
    /** Opens the notification; calling it while open restarts a finite duration. */
    show(): void
    hide(): void

    /**
     * Moves the notification into the shared top-right toast stack, opens it,
     * and resolves after it hides and is removed from the document. All timed
     * notification instances share one scheduler timeout; the visible progress
     * animation is handled by CSS.
     */
    toast(): Promise<void>

    focus(options?: FocusOptions): void
    blur(): void
    getBase(): HTMLElement | null
    getIcon(): HTMLElement | null
    getMessage(): HTMLElement | null
    getCloseButton(): HTMLButtonElement | null
    getCountdown(): HTMLElement | null
  }

  /** Detail-free visibility events that bubble and are composed. */
  events: {
    show: Event
    hide: Event
  }

  slots: {
    /** Rich notification content; takes precedence over `content`. */
    default: undefined
    /** Replaces the built-in circular icon for the current `type`. */
    icon: undefined
    /** Replaces the default × close glyph. */
    'close-icon': undefined
  }

  /**
   * ```text
   * base — complete semantic notification with a wide inline-start border
   * ├─ icon — built-in type icon or the `icon` slot
   * ├─ message — default slot or `content` fallback
   * ├─ close-button — optional native button at the far inline end
   * └─ countdown — CSS-animated bottom progress line for finite durations
   * ```
   */
  parts: 'base' | 'icon' | 'message' | 'close-button' | 'countdown'
}
