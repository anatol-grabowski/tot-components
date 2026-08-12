export type TotEditableChartData = {
  /** Predefined x-axis labels. */
  labels: string[]
  /** One editable y value per label. */
  values: number[]
}

export type TotEditableChartEventDetail = {
  /** Complete current chart data after the edit. */
  data: TotEditableChartData
  /** Whether pointer editing is currently enabled. */
  editable: boolean
  /** Last edited point index, or `null` when unavailable. */
  index: number | null
  /** Point indices changed by this edit or gesture. */
  indices: number[]
  /** Current upper y bound. */
  max: number
  /** Current lower y bound. */
  min: number
  /** Current value step. */
  step: number
  /** Current chart type. */
  type: 'line' | 'bar'
  /** Value of `index`, or `null` when unavailable. */
  value: number | null
}

/**
 * `<tot-editable-chart>` - a single-series line or bar chart whose predefined
 * x positions can be edited by clicking or dragging vertically through the
 * chart area. Pointer/touch input snaps y values to `step`.
 */
export type TotEditableChart = {
  props: {
    /** Complete editable data. Assigning it replaces both labels and values. */
    data: TotEditableChartData
    /** Predefined x-axis labels. Assigning resizes the values array to match. */
    labels: string[]
    /** Editable y values. Values are snapped, clamped, and resized to match `labels`. */
    values: number[]
    /** Chart rendering style. @default 'line' */
    type: 'line' | 'bar'
    /** Inclusive minimum y value. @default 0 */
    min: number
    /** Inclusive maximum y value. @default 100 */
    max: number
    /** Positive snapping increment used for every edit. @default 1 */
    step: number
    /** Enables pointer/touch editing. Reflected by the `editable` attribute. @default false */
    editable: boolean
    /** Current underlying Chart.js instance inherited from `<tot-chart>`. */
    readonly chart: unknown | null
    /** Resolves after the latest queued chart render finishes or fails. */
    readonly updateComplete: Promise<void>
  }

  methods: {
    /** Enables edit mode. */
    enterEditMode(): void
    /** Disables edit mode and ends any active pointer gesture. */
    exitEditMode(): void
    /** Returns the underlying chart canvas. */
    getCanvas(): HTMLCanvasElement | null
    /** Returns the inherited chart error/status element. */
    getStatus(): HTMLElement | null
  }

  /**
   * `input` fires after each effective pointer edit. `change` fires once after
   * the edited pointer/finger is released. Both bubble and cross the shadow boundary.
   */
  events: {
    input: CustomEvent<TotEditableChartEventDetail>
    change: CustomEvent<TotEditableChartEventDetail>
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
   * ├─ canvas — native canvas used by Chart.js and pointer editing
   * ├─ status — inherited render error overlay
   * └─ value — temporary exact y-value bubble shown while editing
   * ```
   */
  parts: 'base' | 'canvas' | 'status' | 'value'
}
