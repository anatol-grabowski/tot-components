/**
 * Minimal public surface of the bundled Chart.js instance. The complete
 * runtime object is the normal Chart.js 4.5.1 `Chart` instance.
 */
export type TotChartInstance = {
  update(mode?: unknown): void
  [key: string]: unknown
}

/**
 * `<tot-chart>` - a responsive canvas wrapper around bundled Chart.js 4.5.1.
 * Assign a regular Chart.js configuration object to `config`; chart type,
 * data, options, plugins, scales, animation, legends, and tooltips are all
 * configured inside that one object. The component only supplies theme-aware
 * defaults for fields the object leaves unspecified.
 */
export type TotChart = {
  props: {
    /**
     * A regular Chart.js 4.5.1 configuration object. Assign it as a JavaScript
     * property; there is no JSON attribute or light-DOM configuration format.
     * Assigning a new object queues rendering automatically. Mutating an
     * already assigned object cannot be observed, so reassign `config` after a
     * change. Set to `null` to clear the chart. Its Chart.js instance is destroyed
     * automatically when replaced, cleared, or disconnected. @default null
     */
    config: Record<string, unknown> | null

    /** Current Chart.js instance for advanced Chart.js operations such as `update()`. Do not destroy it manually. */
    readonly chart: TotChartInstance | null

    /** Resolves after the latest queued render finishes or fails. */
    readonly updateComplete: Promise<void>
  }

  methods: {
    getCanvas(): HTMLCanvasElement | null
    getStatus(): HTMLElement | null
  }

  /** `chart-render` and `chart-error` are local, non-bubbling custom events. */
  events: {
    'chart-render': CustomEvent<{
      type: string
      datasets: number
    }>
    'chart-error': CustomEvent<{
      message: string
    }>
  }

  slots: {}

  /**
   * ```text
   * base — complete responsive chart surface
   * ├─ canvas — native canvas used by Chart.js
   * └─ status — error overlay, visible only after a render failure
   * ```
   */
  parts: 'base' | 'canvas' | 'status'
}
