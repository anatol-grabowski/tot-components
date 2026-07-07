const odometerStyle = `
  :host {
    --_tot-odometer-columns: 4;
    --_tot-odometer-column-width: var(--tot-odometer-column-width, 2rem);
    --_tot-odometer-row-height: var(--tot-odometer-row-height, var(--tot-input-height-medium, 2.25rem));
    --_tot-odometer-visible-rows: 6;
    --_tot-odometer-marker-width: var(--tot-odometer-marker-width, .875rem);

    display: inline-block;
    height: var(--tot-odometer-height, calc(var(--_tot-odometer-row-height) * var(--_tot-odometer-visible-rows)));
    max-height: 100%;
    max-width: 100%;
    vertical-align: top;
  }

  :host([hidden]) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .odometer {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: 0;
    color: var(--tot-input-color, #1e293b);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    height: 100%;
    line-height: 1.25;
    max-height: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    padding-inline: var(--_tot-odometer-marker-width);
    position: relative;
    touch-action: none;
    width: max-content;
  }

  .table {
    display: grid;
    grid-template-columns: repeat(var(--_tot-odometer-columns), minmax(0, var(--_tot-odometer-column-width)));
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    min-width: 0;
    position: relative;
    z-index: 0;
  }

  .touch-row-highlight {
    background: var(--tot-odometer-touch-row-background-color, color-mix(in srgb, var(--tot-color-primary-500, #0ea5e9) 18%, transparent));
    border-block: var(--tot-panel-border-width, 1px) solid var(--tot-odometer-touch-row-border-color, color-mix(in srgb, var(--tot-color-primary-500, #0ea5e9) 32%, transparent));
    height: var(--_tot-odometer-row-height);
    inset-inline: var(--_tot-odometer-marker-width);
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transform: translateY(var(--_tot-odometer-touch-row-top, 0));
    transition: opacity var(--tot-transition-fast, 120ms ease);
    z-index: 1;
  }

  .odometer.is-touching .touch-row-highlight {
    opacity: 1;
  }

  .column {
    background: var(--tot-color-neutral-50, #f8fafc);
    border: 0;
    border-inline-start: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    color: inherit;
    display: block;
    font: inherit;
    font-variant-numeric: tabular-nums;
    font-weight: var(--tot-font-weight-normal, 400);
    height: 100%;
    margin: 0;
    max-width: 100%;
    min-width: 0;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0;
    position: relative;
    scrollbar-width: none;
    -ms-overflow-style: none;
    text-align: center;
    touch-action: none;
    width: var(--_tot-odometer-column-width);
  }

  .column:first-child {
    border-inline-start: 0;
  }

  .column::-webkit-scrollbar {
    height: 0;
    width: 0;
  }

  .column:hover {
    background: var(--tot-color-neutral-100, #f1f5f9);
  }

  .column:focus-visible {
    box-shadow: inset 0 0 0 2px var(--tot-color-primary-500, #0ea5e9);
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: calc(-1 * var(--tot-focus-ring-offset, 1px));
    z-index: 1;
  }

  .digit {
    align-items: center;
    border-block-end: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: flex;
    height: var(--_tot-odometer-row-height);
    justify-content: center;
    min-height: var(--_tot-odometer-row-height);
    padding: 0 var(--tot-spacing-2x-small, .25rem);
    user-select: none;
  }

  .digit.is-current {
    font-weight: var(--tot-font-weight-bold, 700);
  }

  .digit-label {
    display: inline-grid;
    line-height: 1;
    min-width: 1ch;
    place-items: center;
  }

  .digit-label::before,
  .digit-label > span {
    grid-area: 1 / 1;
  }

  .digit-label::before {
    content: attr(data-digit);
    font-weight: var(--tot-font-weight-bold, 700);
    visibility: hidden;
  }

  .marker {
    color: var(--tot-color-neutral-500, #64748b);
    height: .875rem;
    inset-block-start: 50%;
    pointer-events: none;
    position: absolute;
    transform: translateY(-50%);
    width: .5rem;
    z-index: 2;
  }

  .marker svg {
    display: block;
    height: 100%;
    overflow: visible;
    width: 100%;
  }

  .marker path {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }

  .marker--start {
    inset-inline-start: calc((var(--_tot-odometer-marker-width) - .5rem) / 2);
  }

  .marker--end {
    inset-inline-end: calc((var(--_tot-odometer-marker-width) - .5rem) / 2);
  }

  :host([size="small"]) {
    --_tot-odometer-column-width: var(--tot-odometer-column-width-small, 1.625rem);
    --_tot-odometer-row-height: var(--tot-odometer-row-height-small, var(--tot-input-height-small, 1.75rem));
  }

  :host([size="small"]) .odometer {
    font-size: var(--tot-input-font-size-small, .75rem);
  }

  :host([size="large"]) {
    --_tot-odometer-column-width: var(--tot-odometer-column-width-large, 2.375rem);
    --_tot-odometer-row-height: var(--tot-odometer-row-height-large, var(--tot-input-height-large, 2.75rem));
  }

  :host([size="large"]) .odometer {
    font-size: var(--tot-input-font-size-large, 1rem);
  }
`

const digitCycleCount = 121
const centerCycleIndex = Math.floor(digitCycleCount / 2)
const digitsPerCycle = 10
const maxColumns = 12
const commitDelay = 180

export class TotOdometer extends HTMLElement {
  static get observedAttributes() {
    return [
      'columns',
      'value',
      'size',
      'visible-rows',
    ]
  }

  constructor() {
    super()
    this._value = 0
    this._baseValue = 0
    this._rowHeight = 36
    this._rendered = false
    this._syncingColumns = false
    this._syncFrame = 0
    this._commitTimer = 0
    this._resizeObserver = null
    this._lastRows = []
    this._isReflectingValue = false
    this._syncOptions = null
    this._pointerState = null
    this._touchReach = 80
    this._handlePointerDown = event => this.handlePointerDown(event)
    this._handlePointerMove = event => this.handlePointerMove(event)
    this._handlePointerUp = event => this.handlePointerUp(event)
    this._handleScroll = event => this.handleColumnScroll(event)
    this._handleWheel = event => this.handleColumnWheel(event)
    this._handleKeyDown = event => this.handleColumnKeyDown(event)
    this._handleResize = () => this.handleResize()
  }

  get columns() {
    return normalizeColumns(this.getAttribute('columns'))
  }

  set columns(value) {
    const nextColumns = normalizeColumns(value)
    this.setAttribute('columns', String(nextColumns))
  }

  get value() {
    return formatValue(Math.round(this._value), this.columns)
  }

  set value(value) {
    this.setAttribute('value', normalizeValueString(value, this.columns))
  }

  get valueAsNumber() {
    return normalizeIntegerValue(Math.round(this._value), this.columns)
  }

  get visibleRows() {
    return normalizeVisibleRows(this.getAttribute('visible-rows'))
  }

  set visibleRows(value) {
    this.setAttribute('visible-rows', String(normalizeVisibleRows(value)))
  }

  set valueAsNumber(value) {
    this.value = String(Number.isFinite(Number(value)) ? Math.trunc(Number(value)) : 0)
  }

  connectedCallback() {
    this._baseValue = normalizeIntegerValue(parseValue(this.getAttribute('value')), this.columns)
    this._value = this._baseValue
    this.render()
    this.setupResizeObserver()
    requestAnimationFrame(() => {
      this.syncColumns({ center: true })
    })
  }

  disconnectedCallback() {
    this.teardownResizeObserver()
    this.cancelSyncFrame()
    this.cancelCommit()
    this.clearTouchRowHighlight()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'value' && !this._isReflectingValue) {
      this._baseValue = normalizeIntegerValue(parseValue(newValue), this.columns)
      this._value = this._baseValue
      this.syncColumns({ center: true })
      return
    }

    if (name === 'columns') {
      this._baseValue = normalizeIntegerValue(Math.round(this._value), this.columns)
      this._value = this._baseValue
      this.render()
      requestAnimationFrame(() => {
        this.syncColumns({ center: true })
      })
      return
    }

    if (name === 'size' || name === 'visible-rows') {
      this.scheduleSync({ center: true })
    }
  }

  increment(columnIndex = this.columns - 1, steps = 1) {
    this.applyColumnDelta(columnIndex, Math.abs(Number(steps) || 1), true)
  }

  decrement(columnIndex = this.columns - 1, steps = 1) {
    this.applyColumnDelta(columnIndex, -Math.abs(Number(steps) || 1), true)
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const columns = this.columns

    root.innerHTML = `<style>${odometerStyle}</style>
      <div class="odometer" part="base" role="group" aria-label="Odometer">
        <span class="marker marker--start" part="start-marker" aria-hidden="true">
          <svg viewBox="0 0 8 14" focusable="false">
            <path d="M1 1 L7 7 L1 13"></path>
          </svg>
        </span>
        <div class="table" part="table"></div>
        <span class="touch-row-highlight" part="touch-row-highlight" aria-hidden="true"></span>
        <span class="marker marker--end" part="end-marker" aria-hidden="true">
          <svg viewBox="0 0 8 14" focusable="false">
            <path d="M7 1 L1 7 L7 13"></path>
          </svg>
        </span>
      </div>
    `

    const base = root.querySelector('.odometer')
    base.addEventListener('pointerdown', this._handlePointerDown)
    base.addEventListener('pointermove', this._handlePointerMove)
    base.addEventListener('pointerup', this._handlePointerUp)
    base.addEventListener('pointercancel', this._handlePointerUp)
    base.addEventListener('lostpointercapture', this._handlePointerUp)

    this._rendered = true
    this.renderColumns(columns)
    this.updateColumnCountStyle()
    this.updateRowHeight()
  }

  renderColumns(columns) {
    const table = this.getTable()
    if (!table) {
      return
    }

    const fragment = document.createDocumentFragment()
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const column = document.createElement('div')
      column.className = 'column'
      column.part = 'column'
      column.dataset.index = String(columnIndex)
      column.tabIndex = 0
      column.setAttribute('role', 'spinbutton')
      column.setAttribute('aria-label', `Digit ${columnIndex + 1} of ${columns}`)
      column.setAttribute('aria-valuemin', '0')
      column.setAttribute('aria-valuemax', '9')
      column.addEventListener('scroll', this._handleScroll, { passive: true })
      column.addEventListener('wheel', this._handleWheel, { passive: false })
      column.addEventListener('keydown', this._handleKeyDown)

      for (let cycleIndex = 0; cycleIndex < digitCycleCount; cycleIndex++) {
        for (let digit = 0; digit < digitsPerCycle; digit++) {
          const digitElement = document.createElement('div')
          digitElement.className = 'digit'
          digitElement.part = 'digit'
          digitElement.dataset.digit = String(digit)
          digitElement.innerHTML = `<span class="digit-label" data-digit="${digit}"><span>${digit}</span></span>`
          column.appendChild(digitElement)
        }
      }

      fragment.appendChild(column)
    }

    table.replaceChildren(fragment)
    this._lastRows = new Array(columns).fill(0)
  }


  handlePointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    this.updateRowHeight()
    this.updateTouchReach()

    const isTouchLike = event.pointerType !== 'mouse'
    const columnIndex = isTouchLike
      ? this.getColumnIndexNear(event.clientX, this._touchReach)
      : this.getColumnIndexAt(event.clientX)

    if (columnIndex < 0) {
      return
    }

    this._pointerState = {
      id: event.pointerId,
      columnIndex,
      isTouchLike,
      lastY: event.clientY,
      clientY: event.clientY,
    }

    if (isTouchLike) {
      this.updateTouchRowHighlight(event.clientY)
    }

    event.currentTarget.setPointerCapture?.(event.pointerId)
    event.preventDefault()
  }

  handlePointerMove(event) {
    const state = this._pointerState
    if (!state || state.id !== event.pointerId) {
      return
    }

    const columnIndex = state.isTouchLike
      ? this.getColumnIndexNear(event.clientX, this._touchReach, state.columnIndex)
      : this.getColumnIndexAt(event.clientX)

    const deltaY = event.clientY - state.lastY
    state.clientY = event.clientY

    if (state.isTouchLike) {
      this.updateTouchRowHighlight(event.clientY)
    }

    if (columnIndex >= 0) {
      state.columnIndex = columnIndex
    }

    if (Math.abs(deltaY) < .5) {
      event.preventDefault()
      return
    }

    state.lastY = event.clientY

    if (state.columnIndex < 0) {
      event.preventDefault()
      return
    }

    const deltaRows = -deltaY / Math.max(1, this._rowHeight)

    this.applyColumnDelta(state.columnIndex, deltaRows, false)
    event.preventDefault()
  }

  handlePointerUp(event) {
    const state = this._pointerState
    if (!state || state.id !== event.pointerId) {
      return
    }

    this._pointerState = null
    this.clearTouchRowHighlight()
  }

  handleColumnWheel(event) {
    if (event.ctrlKey) {
      return
    }

    const column = event.currentTarget
    const columnIndex = getColumnIndex(column)
    const deltaRows = normalizeWheelRows(event, this._rowHeight || 1, column.clientHeight || this._rowHeight || 1)

    if (!Number.isFinite(deltaRows) || Math.abs(deltaRows) < .001) {
      return
    }

    event.preventDefault()
    this.applyColumnDelta(columnIndex, deltaRows, false)
  }

  handleColumnScroll(event) {
    if (this._syncingColumns) {
      return
    }

    const column = event.currentTarget
    const columnIndex = getColumnIndex(column)
    if (columnIndex < 0 || columnIndex >= this.columns) {
      return
    }

    this.updateRowHeight()

    const currentRow = getColumnRow(column, this._rowHeight)
    const previousRow = Number.isFinite(this._lastRows[columnIndex]) ? this._lastRows[columnIndex] : currentRow
    const deltaRows = currentRow - previousRow

    this._lastRows[columnIndex] = currentRow
    this.updateCurrentDigit(column)

    if (Math.abs(deltaRows) < .001) {
      return
    }

    this.applyColumnDelta(columnIndex, deltaRows, false)
  }

  handleColumnKeyDown(event) {
    const columnIndex = getColumnIndex(event.currentTarget)
    let deltaRows = 0
    let commit = false

    if (event.key === 'ArrowDown') {
      deltaRows = 1
    } else if (event.key === 'ArrowUp') {
      deltaRows = -1
    } else if (event.key === 'PageDown') {
      deltaRows = 5
    } else if (event.key === 'PageUp') {
      deltaRows = -5
    } else if (event.key === 'Home') {
      this.setColumnDigit(columnIndex, 0)
      event.preventDefault()
      return
    } else if (event.key === 'End') {
      this.setColumnDigit(columnIndex, 9)
      event.preventDefault()
      return
    } else if (event.key === 'Enter' || event.key === ' ') {
      commit = true
    } else {
      return
    }

    event.preventDefault()

    if (commit) {
      this.commitValue()
      return
    }

    this.applyColumnDelta(columnIndex, deltaRows, true)
  }

  setColumnDigit(columnIndex, digit) {
    const columns = this.columns
    const safeColumnIndex = clamp(Math.trunc(Number(columnIndex) || 0), 0, columns - 1)
    const currentPosition = getColumnPosition(safeColumnIndex, columns, this._value)
    const currentDigit = Math.floor(positiveModulo(currentPosition, 10))
    const targetDigit = clamp(Math.trunc(Number(digit) || 0), 0, 9)
    let deltaRows = targetDigit - currentDigit

    if (deltaRows > 5) {
      deltaRows -= 10
    } else if (deltaRows < -5) {
      deltaRows += 10
    }

    this.applyColumnDelta(safeColumnIndex, deltaRows, true)
  }

  applyColumnDelta(columnIndex, deltaRows, commit) {
    const columns = this.columns
    const safeColumnIndex = clamp(Math.trunc(Number(columnIndex) || 0), 0, columns - 1)
    const placeValue = getPlaceValue(safeColumnIndex, columns)

    this._value = normalizeContinuousValue(this._value + deltaRows * placeValue, columns)
    if (commit) {
      this.syncColumns()
    } else {
      this.scheduleSync()
    }
    this.emitInput()

    if (commit) {
      this.commitValue()
    } else {
      this.scheduleCommit()
    }
  }

  scheduleCommit() {
    this.cancelCommit()
    this._commitTimer = setTimeout(() => {
      this._commitTimer = 0
      this.commitValue()
    }, commitDelay)
  }

  cancelCommit() {
    if (!this._commitTimer) {
      return
    }

    clearTimeout(this._commitTimer)
    this._commitTimer = 0
  }

  commitValue() {
    this.cancelCommit()

    const previousValue = normalizeValueString(this.getAttribute('value'), this.columns)
    const roundedValue = normalizeIntegerValue(Math.round(this._value), this.columns)
    const nextValue = formatValue(roundedValue, this.columns)

    this.reflectValue(nextValue)
    this.updateColumnsFromScroll()

    if (previousValue !== nextValue) {
      emit(this, 'change', this.getEventDetail())
    }
  }

  emitInput() {
    emit(this, 'input', this.getEventDetail())
  }

  getEventDetail() {
    const number = normalizeIntegerValue(Math.round(this._value), this.columns)
    return {
      value: formatValue(number, this.columns),
      number,
      columns: this.columns,
    }
  }

  reflectValue(value) {
    this._isReflectingValue = true
    this.setAttribute('value', value)
    this._isReflectingValue = false
  }

  scheduleSync(options) {
    this._syncOptions = mergeSyncOptions(this._syncOptions, options)

    if (this._syncFrame) {
      return
    }

    this._syncFrame = requestAnimationFrame(() => {
      const syncOptions = this._syncOptions || {}
      this._syncFrame = 0
      this._syncOptions = null
      this.syncColumns(syncOptions)
    })
  }

  cancelSyncFrame() {
    if (!this._syncFrame) {
      return
    }

    cancelAnimationFrame(this._syncFrame)
    this._syncFrame = 0
    this._syncOptions = null
  }

  syncColumns(options = {}) {
    if (!this._rendered || !this.isConnected) {
      return
    }

    const columns = this.getColumns()
    if (!columns.length) {
      return
    }

    this.updateColumnCountStyle()
    this.updateRowHeight()

    const columnCount = this.columns
    const digitPositions = getColumnPositions(columnCount, this._value)
    this._syncingColumns = true

    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      const column = columns[columnIndex]
      const digitPosition = digitPositions[columnIndex] || 0
      const currentRow = options.center ? NaN : getColumnRow(column, this._rowHeight)
      const row = getNearestDigitRow(digitPosition, currentRow)
      const scrollTop = getScrollTopForRow(row, column, this._rowHeight)

      column.scrollTop = scrollTop
      this._lastRows[columnIndex] = row
      this.updateColumnAria(column, digitPosition)
      this.updateCurrentDigit(column)
    }

    if (this._pointerState?.isTouchLike) {
      this.updateTouchRowHighlight(this._pointerState.clientY)
    }

    requestAnimationFrame(() => {
      this._syncingColumns = false
    })
  }

  updateColumnAria(column, digitPosition) {
    const digit = Math.floor(positiveModulo(digitPosition + .5, 10)) % 10
    column.setAttribute('aria-valuenow', String(digit))
    column.setAttribute('aria-valuetext', String(digit))
  }

  updateColumnsFromScroll() {
    const columns = this.getColumns()
    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      const column = columns[columnIndex]
      const row = getColumnRow(column, this._rowHeight)
      const digit = Math.floor(positiveModulo(row + .5, 10)) % 10
      this._lastRows[columnIndex] = row
      column.setAttribute('aria-valuenow', String(digit))
      column.setAttribute('aria-valuetext', String(digit))
      this.updateCurrentDigit(column)
    }
  }

  updateCurrentDigit(column) {
    const rowHeight = Math.max(1, this._rowHeight)
    const centerLine = column.scrollTop + column.clientHeight / 2
    const row = Math.floor(centerLine / rowHeight)
    const currentDigit = column.querySelector('.digit.is-current')
    const nextDigit = column.children[row]

    if (currentDigit === nextDigit) {
      return
    }

    if (currentDigit) {
      currentDigit.classList.remove('is-current')
    }

    if (nextDigit?.classList?.contains('digit')) {
      nextDigit.classList.add('is-current')
    }
  }

  updateColumnCountStyle() {
    this.style.setProperty('--_tot-odometer-columns', String(this.columns))
    this.style.setProperty('--_tot-odometer-visible-rows', String(this.visibleRows))
  }

  updateRowHeight() {
    const digit = this.shadowRoot?.querySelector('.digit')
    const measuredHeight = digit?.getBoundingClientRect?.().height || 0

    if (measuredHeight > 0) {
      this._rowHeight = measuredHeight
      return
    }

    const computedStyle = getComputedStyle(this)
    const computedRowHeight = parseFloat(computedStyle.getPropertyValue('--_tot-odometer-row-height'))
    if (computedRowHeight > 0) {
      this._rowHeight = computedRowHeight
      return
    }

    const column = this.shadowRoot?.querySelector('.column')
    const computedHeight = column ? parseFloat(getComputedStyle(column).height) : 0
    if (computedHeight > 0) {
      this._rowHeight = computedHeight
    }
  }

  handleResize() {
    this.scheduleSync({ center: true })
  }

  setupResizeObserver() {
    this.teardownResizeObserver()

    if (typeof ResizeObserver !== 'function') {
      return
    }

    this._resizeObserver = new ResizeObserver(this._handleResize)
    this._resizeObserver.observe(this)
  }

  teardownResizeObserver() {
    if (!this._resizeObserver) {
      return
    }

    this._resizeObserver.disconnect()
    this._resizeObserver = null
  }


  updateTouchReach() {
    this._touchReach = getRemPixels(this, 5)
  }

  updateTouchRowHighlight(clientY) {
    const base = this.shadowRoot?.querySelector('.odometer')
    const highlight = this.shadowRoot?.querySelector('.touch-row-highlight')
    if (!base || !highlight) {
      return
    }

    const rect = base.getBoundingClientRect()
    const rowHeight = Math.max(1, this._rowHeight)
    const minY = 0
    const maxY = Math.max(0, rect.height - rowHeight)
    const localY = clamp(clientY - rect.top - rowHeight / 2, minY, maxY)

    highlight.style.setProperty('--_tot-odometer-touch-row-top', `${localY}px`)
    base.classList.add('is-touching')
  }

  clearTouchRowHighlight() {
    const base = this.shadowRoot?.querySelector('.odometer')
    if (base) {
      base.classList.remove('is-touching')
    }
  }

  getColumnIndexAt(clientX) {
    const columns = this.getColumns()
    for (let i = 0; i < columns.length; i++) {
      const rect = columns[i].getBoundingClientRect()
      if (clientX >= rect.left && clientX <= rect.right) {
        return i
      }
    }

    return -1
  }

  getColumnIndexNear(clientX, reach, previousIndex = -1) {
    const directIndex = this.getColumnIndexAt(clientX)
    if (directIndex >= 0) {
      return directIndex
    }

    const columns = this.getColumns()
    if (!columns.length) {
      return -1
    }

    const safeReach = Math.max(0, Number(reach) || 0)
    const hysteresis = Math.min(safeReach, getRemPixels(this, .65))
    const safePreviousIndex = Number.isFinite(previousIndex) ? Math.trunc(previousIndex) : -1

    if (safePreviousIndex >= 0 && safePreviousIndex < columns.length) {
      const previousRect = columns[safePreviousIndex].getBoundingClientRect()
      if (clientX >= previousRect.left - hysteresis && clientX <= previousRect.right + hysteresis) {
        return safePreviousIndex
      }
    }

    let nearestIndex = -1
    let nearestDistance = Infinity
    for (let i = 0; i < columns.length; i++) {
      const rect = columns[i].getBoundingClientRect()
      const distance = clientX < rect.left ? rect.left - clientX : clientX - rect.right
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = i
      }
    }

    if (nearestDistance <= safeReach) {
      return nearestIndex
    }

    return -1
  }

  getTable() {
    return this.shadowRoot?.querySelector('.table') || null
  }

  getColumns() {
    return Array.from(this.shadowRoot?.querySelectorAll('.column') || [])
  }
}

function mergeSyncOptions(currentOptions, nextOptions) {
  if (!nextOptions) {
    return currentOptions || {}
  }

  return {
    ...(currentOptions || {}),
    ...nextOptions,
  }
}

function normalizeColumns(value) {
  const columns = Math.trunc(Number(value))
  if (!Number.isFinite(columns)) {
    return 4
  }

  return clamp(columns, 1, maxColumns)
}

function parseValue(value) {
  const text = String(value ?? '').trim()
  if (!text) {
    return 0
  }

  const parsed = Number(text.replace(/[^0-9.-]/g, ''))
  if (!Number.isFinite(parsed)) {
    return 0
  }

  return Math.trunc(parsed)
}

function normalizeValueString(value, columns) {
  return formatValue(parseValue(value), columns)
}

function formatValue(value, columns) {
  const integer = normalizeIntegerValue(Math.round(Number(value) || 0), columns)
  return String(integer).padStart(columns, '0')
}

function normalizeIntegerValue(value, columns) {
  const parsedValue = Math.trunc(Number(value) || 0)
  const maxValue = 10 ** columns
  return positiveModulo(parsedValue, maxValue)
}

function getPlaceValue(columnIndex, columns) {
  return 10 ** (columns - columnIndex - 1)
}

function getColumnPositions(columns, value) {
  const positions = new Array(columns)
  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    positions[columnIndex] = getColumnPosition(columnIndex, columns, value)
  }

  return positions
}

function getColumnPosition(columnIndex, columns, value) {
  const visualUnits = getColumnVisualUnits(columnIndex, columns, value)
  return positiveModulo(visualUnits, 10)
}

function getColumnVisualUnits(columnIndex, columns, value) {
  const placeValue = getPlaceValue(columnIndex, columns)
  const normalizedValue = normalizeContinuousValue(value, columns)

  return normalizedValue / placeValue
}

function normalizeContinuousValue(value, columns) {
  const parsedValue = Number(value) || 0
  const maxValue = 10 ** columns
  return positiveModulo(parsedValue, maxValue)
}

function getNearestDigitRow(digitPosition, currentRow) {
  const normalizedPosition = positiveModulo(digitPosition, 10)
  let row = centerCycleIndex * digitsPerCycle + normalizedPosition

  if (Number.isFinite(currentRow)) {
    const cycleIndex = Math.round((currentRow - normalizedPosition) / digitsPerCycle)
    const candidateRow = cycleIndex * digitsPerCycle + normalizedPosition
    const minSafeRow = digitsPerCycle * 2
    const maxSafeRow = digitCycleCount * digitsPerCycle - minSafeRow

    if (candidateRow > minSafeRow && candidateRow < maxSafeRow) {
      row = candidateRow
    }
  }

  return row
}

function normalizeVisibleRows(value) {
  const rows = Number(value)
  if (!Number.isFinite(rows)) {
    return 6
  }

  return clamp(rows, 3, 12)
}

function getColumnCenterOffset(column, rowHeight) {
  const viewportHeight = column?.clientHeight || rowHeight
  return Math.max(0, (viewportHeight - rowHeight) / 2)
}

function getColumnRow(column, rowHeight) {
  const safeRowHeight = Math.max(1, rowHeight)
  return (column.scrollTop + getColumnCenterOffset(column, safeRowHeight)) / safeRowHeight
}

function getScrollTopForRow(row, column, rowHeight) {
  const safeRowHeight = Math.max(1, rowHeight)
  return row * safeRowHeight - getColumnCenterOffset(column, safeRowHeight)
}

function normalizeWheelRows(event, rowHeight, viewportHeight) {
  const dominantDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX

  if (event.deltaMode === 1) {
    return dominantDelta * .37
  }

  if (event.deltaMode === 2) {
    return dominantDelta * viewportHeight / rowHeight
  }

  return dominantDelta / rowHeight
}

function getColumnIndex(column) {
  return Math.trunc(Number(column?.dataset?.index))
}

function getRemPixels(element, rem) {
  const root = element?.ownerDocument?.documentElement || document.documentElement
  const fontSize = parseFloat(getComputedStyle(root).fontSize)
  const safeFontSize = Number.isFinite(fontSize) && fontSize > 0 ? fontSize : 16
  return safeFontSize * rem
}

function positiveModulo(value, divisor) {
  if (!divisor) {
    return 0
  }

  return ((value % divisor) + divisor) % divisor
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail,
  }))
}
