/**
 * `<tot-loading-placeholder>` - a compact live-region placeholder used while
 * content or a result is being prepared.
 */
export type TotLoadingPlaceholder = {
  props: {
    /** Fallback used when the default slot is empty. @default 'Loading…' */
    label: string
  }

  methods: {
    getBase(): HTMLElement | null
    getIndicator(): HTMLElement | null
    getMessage(): HTMLElement | null
  }

  events: {}

  /** The default slot supplies the visible loading message. */
  slots: {
    default: undefined
  }

  /**
   * ```text
   * base — role="status" loading surface
   * ├─ indicator — animated three-dot indicator
   * └─ message — default slot or `label` fallback
   * ```
   */
  parts: 'base' | 'indicator' | 'message'
}
