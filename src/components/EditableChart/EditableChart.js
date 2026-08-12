import { TotChart } from '../Chart/Chart.js'

const editableChartStyle = `
  :host([editable]) canvas {
    cursor: crosshair;
    touch-action: none;
  }

  .editable-chart-value {
    background: var(--tot-panel-background-color, #fff);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--tot-input-color, #1e293b);
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-font-size-x-small, .75rem);
    font-weight: var(--tot-font-weight-medium, 500);
    left: 0;
    line-height: var(--tot-line-height-dense, 1.4);
    opacity: 0;
    padding: var(--tot-spacing-3x-small, .125rem) var(--tot-spacing-2x-small, .25rem);
    pointer-events: none;
    position: absolute;
    top: 0;
    transform: translate(-50%, calc(-100% - var(--tot-spacing-2x-small, .25rem)));
    transition: opacity 120ms ease;
    white-space: nowrap;
    z-index: 2;
  }

  .editable-chart-value.is-visible {
    opacity: 1;
  }
`

const supportedTypes = ['line', 'bar']
const valueHideDelay = 900

/**
 * Editable single-series chart that maps each predefined x label to one y value.
 * Dragging through the plot edits the nearest x zone and snaps values to `step`.
 */
export class TotEditableChart extends TotChart {
  static get observedAttributes() {
    return [...super.observedAttributes, 'editable', 'type', 'min', 'max', 'step']
  }

  constructor() {
    super()
    this._labels = []
    this._values = []
    this._type = 'line'
    this._min = 0
    this._max = 100
    this._step = 1
    this._editable = false
    this._valueElement = null
    this._valueHideTimer = 0
    this._activePointerId = null
    this._lastPointerPoint = null
    this._gestureIndices = new Set()
    this._gestureChanged = false
    this._lastChangedIndex = null
    this._listenersAttached = false
  }

  get data() {
    return {
      labels: this._labels.slice(),
      values: this._values.slice(),
    }
  }

  set data(value) {
    const labels = Array.isArray(value?.labels) ? value.labels : []
    const values = Array.isArray(value?.values) ? value.values : []
    this._labels = labels.map((label) => String(label))
    this._values = normalizeValues(values, this._labels.length, this._min, this._max, this._step)
    this._syncChartConfig()
  }

  get labels() {
    return this._labels.slice()
  }

  set labels(value) {
    this._labels = Array.isArray(value) ? value.map((label) => String(label)) : []
    this._values = normalizeValues(this._values, this._labels.length, this._min, this._max, this._step)
    this._syncChartConfig()
  }

  get values() {
    return this._values.slice()
  }

  set values(value) {
    this._values = normalizeValues(value, this._labels.length, this._min, this._max, this._step)
    this._syncChartConfig()
  }

  get type() {
    return this._type
  }

  set type(value) {
    const next = supportedTypes.includes(value) ? value : 'line'
    if (next === this._type) {
      return
    }

    this._type = next
    if (this.getAttribute('type') !== next) {
      this.setAttribute('type', next)
    }
    this._syncChartConfig()
  }

  get min() {
    return this._min
  }

  set min(value) {
    const next = toFiniteNumber(value, 0)
    if (next === this._min) {
      return
    }

    this._min = next
    if (this._max < next) {
      this._max = next
      this._reflectNumberAttribute('max', this._max)
    }
    this._values = normalizeValues(this._values, this._labels.length, this._min, this._max, this._step)
    this._reflectNumberAttribute('min', this._min)
    this._syncChartConfig()
  }

  get max() {
    return this._max
  }

  set max(value) {
    const next = toFiniteNumber(value, 100)
    if (next === this._max) {
      return
    }

    this._max = next
    if (this._min > next) {
      this._min = next
      this._reflectNumberAttribute('min', this._min)
    }
    this._values = normalizeValues(this._values, this._labels.length, this._min, this._max, this._step)
    this._reflectNumberAttribute('max', this._max)
    this._syncChartConfig()
  }

  get step() {
    return this._step
  }

  set step(value) {
    const next = toPositiveNumber(value, 1)
    if (next === this._step) {
      return
    }

    this._step = next
    this._values = normalizeValues(this._values, this._labels.length, this._min, this._max, this._step)
    this._reflectNumberAttribute('step', this._step)
    this._syncChartConfig()
  }

  get editable() {
    return this._editable
  }

  set editable(value) {
    const next = Boolean(value)
    if (next === this._editable) {
      return
    }

    this._editable = next
    this.toggleAttribute('editable', next)
    this._syncChartConfig()
    if (!next) {
      this._finishGesture()
      this._hideValue()
    }
  }

  connectedCallback() {
    this._initialize()
    this._syncChartConfig()
    super.connectedCallback()
  }

  disconnectedCallback() {
    this._clearValueTimer()
    this._finishGesture()
    super.disconnectedCallback()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'editable') {
      const next = newValue !== null
      if (next !== this._editable) {
        this._editable = next
        this._syncChartConfig()
        if (!next) {
          this._finishGesture()
          this._hideValue()
        }
      }
      return
    }

    if (name === 'type') {
      const next = supportedTypes.includes(newValue) ? newValue : 'line'
      if (next !== this._type) {
        this._type = next
        this._syncChartConfig()
      }
      return
    }

    if (name === 'min') {
      this._setNumberFromAttribute('min', newValue)
      return
    }

    if (name === 'max') {
      this._setNumberFromAttribute('max', newValue)
      return
    }

    if (name === 'step') {
      this._setNumberFromAttribute('step', newValue)
      return
    }

    super.attributeChangedCallback(name, oldValue, newValue)
  }

  enterEditMode() {
    this.editable = true
  }

  exitEditMode() {
    this.editable = false
  }

  _initialize() {
    super._initialize()
    if (!this.shadowRoot || this._listenersAttached) {
      return
    }

    const style = document.createElement('style')
    style.textContent = editableChartStyle
    this.shadowRoot.appendChild(style)

    const chartWrap = this.shadowRoot.querySelector('.chart-wrap')
    const valueElement = document.createElement('div')
    valueElement.className = 'editable-chart-value'
    valueElement.part = 'value'
    valueElement.setAttribute('aria-live', 'polite')
    chartWrap?.appendChild(valueElement)
    this._valueElement = valueElement

    const canvas = this.getCanvas()
    if (!canvas) {
      return
    }

    canvas.addEventListener('pointerdown', (event) => this._handlePointerDown(event))
    canvas.addEventListener('pointermove', (event) => this._handlePointerMove(event))
    canvas.addEventListener('pointerup', (event) => this._handlePointerEnd(event))
    canvas.addEventListener('pointercancel', (event) => this._handlePointerEnd(event))
    canvas.addEventListener('lostpointercapture', (event) => this._handlePointerEnd(event))
    this._listenersAttached = true
  }

  _setNumberFromAttribute(name, value) {
    if (name === 'step') {
      const next = value === null ? 1 : toPositiveNumber(value, 1)
      if (next === this._step) {
        return
      }
      this._step = next
    } else if (name === 'min') {
      const next = value === null ? 0 : toFiniteNumber(value, 0)
      if (next === this._min) {
        return
      }
      this._min = next
      if (this._max < next) {
        this._max = next
        this._reflectNumberAttribute('max', this._max)
      }
    } else {
      const next = value === null ? 100 : toFiniteNumber(value, 100)
      if (next === this._max) {
        return
      }
      this._max = next
      if (this._min > next) {
        this._min = next
        this._reflectNumberAttribute('min', this._min)
      }
    }

    this._values = normalizeValues(this._values, this._labels.length, this._min, this._max, this._step)
    this._syncChartConfig()
  }

  _reflectNumberAttribute(name, value) {
    const text = String(value)
    if (this.getAttribute(name) !== text) {
      this.setAttribute(name, text)
    }
  }

  _syncChartConfig() {
    const config = {
      type: this._type,
      data: {
        labels: this._labels.slice(),
        datasets: [
          {
            data: this._values.slice(),
            tension: this._type === 'line' ? .25 : undefined,
          },
        ],
      },
      options: {
        animation: false,
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: !this._editable,
          },
        },
        scales: {
          x: {
            offset: this._type === 'bar',
          },
          y: {
            min: this._min,
            max: this._max,
            ticks: {
              stepSize: this._step,
            },
          },
        },
      },
    }

    super.config = config
  }

  _handlePointerDown(event) {
    if (!this._editable || this._activePointerId !== null || !this._canEditChart()) {
      return
    }

    const point = this._getPointerPoint(event, false)
    if (!point) {
      return
    }

    event.preventDefault()
    this._activePointerId = event.pointerId
    this._lastPointerPoint = null
    this._gestureIndices.clear()
    this._gestureChanged = false
    this._lastChangedIndex = null
    this.getCanvas()?.setPointerCapture?.(event.pointerId)
    this._editPointerPoint(point)
  }

  _handlePointerMove(event) {
    if (event.pointerId !== this._activePointerId) {
      return
    }

    event.preventDefault()
    const point = this._getPointerPoint(event, true)
    if (point) {
      this._editPointerPoint(point)
    }
  }

  _handlePointerEnd(event) {
    if (event.pointerId !== this._activePointerId) {
      return
    }

    if (event.type === 'pointerup') {
      const point = this._getPointerPoint(event, true)
      if (point) {
        this._editPointerPoint(point)
      }
    }

    this._finishGesture()
  }

  _finishGesture() {
    if (this._activePointerId === null) {
      return
    }

    const pointerId = this._activePointerId
    const changed = this._gestureChanged
    const indices = Array.from(this._gestureIndices).sort((a, b) => a - b)
    const lastIndex = this._lastChangedIndex
    this._activePointerId = null
    this._lastPointerPoint = null
    this._gestureIndices.clear()
    this._gestureChanged = false
    this._lastChangedIndex = null

    const canvas = this.getCanvas()
    if (canvas?.hasPointerCapture?.(pointerId)) {
      canvas.releasePointerCapture(pointerId)
    }

    if (changed) {
      this._dispatchEditEvent('change', lastIndex, indices)
      this._scheduleValueHide()
    }
  }

  _canEditChart() {
    return Boolean(
      this.chart
      && this.chart.chartArea
      && this.chart.scales?.x
      && this.chart.scales?.y
      && this._labels.length > 0,
    )
  }

  _getPointerPoint(event, clampOutside) {
    const canvas = this.getCanvas()
    const chartArea = this.chart?.chartArea
    const xScale = this.chart?.scales?.x
    const yScale = this.chart?.scales?.y
    if (!canvas || !chartArea || !xScale || !yScale) {
      return null
    }

    const rect = canvas.getBoundingClientRect()
    if (!rect.width || !rect.height) {
      return null
    }

    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    if (!clampOutside) {
      if (x < chartArea.left || x > chartArea.right || y < chartArea.top || y > chartArea.bottom) {
        return null
      }
    } else {
      x = clamp(x, chartArea.left, chartArea.right)
      y = clamp(y, chartArea.top, chartArea.bottom)
    }

    return {
      index: getNearestIndex(xScale, this._labels.length, x),
      y,
    }
  }

  _editPointerPoint(point) {
    const previous = this._lastPointerPoint
    const changedIndices = []

    if (previous && previous.index !== point.index) {
      const direction = point.index > previous.index ? 1 : -1
      const distance = Math.abs(point.index - previous.index)
      for (let offset = 1; offset <= distance; offset++) {
        const index = previous.index + offset * direction
        const ratio = offset / distance
        const y = previous.y + (point.y - previous.y) * ratio
        if (this._setValueFromPixel(index, y)) {
          changedIndices.push(index)
        }
      }
    } else if (this._setValueFromPixel(point.index, point.y)) {
      changedIndices.push(point.index)
    }

    this._lastPointerPoint = point
    if (changedIndices.length === 0) {
      return
    }

    this._gestureChanged = true
    for (let i = 0; i < changedIndices.length; i++) {
      this._gestureIndices.add(changedIndices[i])
    }

    this._syncRuntimeData()
    const changedIndex = changedIndices[changedIndices.length - 1]
    this._lastChangedIndex = changedIndex
    this._showValue(changedIndex, this._values[changedIndex])
    this._dispatchEditEvent('input', changedIndex, changedIndices)
  }

  _setValueFromPixel(index, y) {
    const yScale = this.chart?.scales?.y
    if (!yScale || index < 0 || index >= this._values.length) {
      return false
    }

    const raw = yScale.getValueForPixel(y)
    const next = snapValue(raw, this._min, this._max, this._step)
    if (Object.is(next, this._values[index])) {
      return false
    }

    this._values[index] = next
    return true
  }

  _syncRuntimeData() {
    if (this._config?.data?.datasets?.[0]) {
      this._config.data.datasets[0].data = this._values.slice()
    }

    if (!this.chart?.data?.datasets?.[0]) {
      return
    }

    this.chart.data.datasets[0].data = this._values.slice()
    this.chart.update('none')
  }

  _showValue(index, value) {
    const valueElement = this._valueElement
    const xScale = this.chart?.scales?.x
    const yScale = this.chart?.scales?.y
    if (!valueElement || !xScale || !yScale) {
      return
    }

    this._clearValueTimer()
    valueElement.textContent = formatValue(value, this._step)
    valueElement.style.left = `${xScale.getPixelForValue(index)}px`
    valueElement.style.top = `${yScale.getPixelForValue(value)}px`
    valueElement.classList.add('is-visible')
  }

  _scheduleValueHide() {
    this._clearValueTimer()
    this._valueHideTimer = window.setTimeout(() => {
      this._valueHideTimer = 0
      this._hideValue()
    }, valueHideDelay)
  }

  _hideValue() {
    this._clearValueTimer()
    this._valueElement?.classList.remove('is-visible')
  }

  _clearValueTimer() {
    if (!this._valueHideTimer) {
      return
    }

    clearTimeout(this._valueHideTimer)
    this._valueHideTimer = 0
  }

  _dispatchEditEvent(name, index, indices) {
    const detail = {
      data: this.data,
      editable: this._editable,
      index,
      indices: indices.slice(),
      max: this._max,
      min: this._min,
      step: this._step,
      type: this._type,
      value: index === null ? null : this._values[index],
    }

    this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail,
    }))
  }
}

function normalizeValues(values, length, min, max, step) {
  const source = Array.isArray(values) ? values : []
  const normalized = []
  for (let i = 0; i < length; i++) {
    const value = i < source.length ? source[i] : min
    normalized.push(snapValue(toFiniteNumber(value, min), min, max, step))
  }
  return normalized
}

function snapValue(value, min, max, step) {
  const clamped = clamp(value, min, max)
  const snapped = min + Math.round((clamped - min) / step) * step
  const precision = Math.min(12, Math.max(decimalPlaces(step), decimalPlaces(min)))
  return clamp(Number(snapped.toFixed(precision)), min, max)
}

function getNearestIndex(scale, length, x) {
  let nearestIndex = 0
  let nearestDistance = Infinity
  for (let i = 0; i < length; i++) {
    const distance = Math.abs(scale.getPixelForValue(i) - x)
    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestIndex = i
    }
  }
  return nearestIndex
}

function formatValue(value, step) {
  return value.toFixed(Math.min(8, decimalPlaces(step)))
}

function decimalPlaces(value) {
  const text = String(value).toLowerCase()
  if (text.includes('e-')) {
    return Number(text.split('e-')[1]) || 0
  }
  const point = text.indexOf('.')
  return point === -1 ? 0 : text.length - point - 1
}

function toFiniteNumber(value, fallback) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function toPositiveNumber(value, fallback) {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? number : fallback
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}
