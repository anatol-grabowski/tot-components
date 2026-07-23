/**
 * `<tot-toast>` - a manager for multiple temporary bottom notifications. Keep
 * one instance in the document and call `show()` for each message; every toast
 * is removed automatically after its own delay.
 */
export type TotToast = {
  props: {}

  methods: {
    /** Displays a temporary message. @param duration Auto-hide delay in milliseconds. @default 4000 */
    show(message: string, duration?: number): void
    /** Returns the internal stack containing the active toast surfaces. */
    getBase(): HTMLElement | null
  }

  events: {}

  slots: {}

  /** `base` is the managed stack and `toast` is assigned to every temporary message. */
  parts: 'base' | 'toast'
}
