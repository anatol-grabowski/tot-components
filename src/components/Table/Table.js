const tableStyle = `
  :host {
    display: block;
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }

  :host([hidden]) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .table-wrap {
    background: var(--tot-panel-background-color, #fff);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--tot-input-color, #1e293b);
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-small, .8125rem);
    line-height: var(--tot-line-height-normal, 1.3);
    max-height: var(--tot-table-max-height, 28rem);
    max-width: 100%;
    min-width: 0;
    overflow: auto;
    scrollbar-width: thin;
    width: 100%;
  }

  .table-wrap:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
    min-width: 100%;
    table-layout: auto;
    width: max-content;
  }

  tr {
    white-space: nowrap;
  }

  td,
  th {
    background: var(--tot-table-cell-background-color, var(--tot-panel-background-color, #fff));
    border: 0;
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-right: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    color: inherit;
    font: inherit;
    min-width: var(--tot-table-cell-min-width, 4.25rem);
    padding: var(--tot-table-cell-padding-y, .125rem) var(--tot-table-cell-padding-x, .375rem);
    text-align: left;
    vertical-align: middle;
  }

  tr:last-child > td,
  tr:last-child > th {
    border-bottom: 0;
  }

  td:last-child,
  th:last-child {
    border-right: 0;
  }

  th,
  .header,
  .group,
  .row-header,
  .total {
    background: var(--tot-table-header-background-color, var(--tot-color-neutral-100, #f1f5f9));
    color: var(--tot-table-header-color, var(--tot-input-color, #1e293b));
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .numeric {
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  .muted {
    color: var(--tot-color-neutral-600, #475569);
  }

  .positive {
    color: var(--tot-color-success-700, #15803d);
  }

  .negative {
    color: var(--tot-color-danger-700, #b91c1c);
  }

  .warning {
    color: var(--tot-color-warning-700, #a16207);
  }

  .cell--sticky {
    background: var(--tot-table-cell-background-color, var(--tot-panel-background-color, #fff));
    background-clip: border-box;
    position: sticky;
    z-index: 2;
  }

  .cell--sticky-left {
    left: var(--tot-table-sticky-left, auto);
  }

  .cell--sticky-right {
    right: var(--tot-table-sticky-right, auto);
  }

  .cell--sticky-top {
    top: var(--tot-table-sticky-top, auto);
    z-index: 3;
  }

  .cell--sticky-bottom {
    bottom: var(--tot-table-sticky-bottom, auto);
    z-index: 3;
  }

  .cell--corner {
    z-index: 4;
  }

  .cell--sticky::before,
  .cell--sticky::after {
    background: var(--tot-panel-border-color, #e2e8f0);
    content: '';
    display: none;
    pointer-events: none;
    position: absolute;
    z-index: 1;
  }

  .table-wrap.is-sticky-left-detached .cell--sticky-left-edge::before {
    bottom: 0;
    display: block;
    right: 0;
    top: 0;
    width: var(--tot-panel-border-width, 1px);
  }

  .table-wrap.is-sticky-right-detached .cell--sticky-right-edge::before {
    bottom: 0;
    display: block;
    left: 0;
    top: 0;
    width: var(--tot-panel-border-width, 1px);
  }

  .table-wrap.is-sticky-top-detached .cell--sticky-top-edge::after {
    bottom: 0;
    display: block;
    height: var(--tot-panel-border-width, 1px);
    left: 0;
    right: 0;
  }

  .table-wrap.is-sticky-bottom-detached .cell--sticky-bottom-edge::after {
    display: block;
    height: var(--tot-panel-border-width, 1px);
    left: 0;
    right: 0;
    top: 0;
  }

  th.cell--sticky,
  .cell--sticky.header,
  .cell--sticky.group,
  .cell--sticky.row-header,
  .cell--sticky.total,
  .cell--corner {
    background: var(--tot-table-header-background-color, var(--tot-color-neutral-100, #f1f5f9));
  }

  table[hidden],
  .empty[hidden] {
    display: none;
  }

  .empty {
    color: var(--tot-color-neutral-600, #64748b);
    padding: var(--tot-spacing-small, .75rem);
  }
`

export class TotTable extends HTMLElement {
  static get observedAttributes() {
    return ['table']
  }

  constructor() {
    super()
    this._contentObserver = null
    this._layoutFrame = 0
    this._renderQueued = false
    this._renderedCells = []
    this._resizeObserver = null
    this._scrollFrame = 0
    this._stickyCells = []
    this._table = undefined
    this._handleClick = (event) => this.handleCellClick(event)
    this._handleScroll = () => this.scheduleScrollState()
    this.initialize()
  }

  get table() {
    if (this._table !== undefined) {
      return this._table
    }
    this._table = parseTable(this.getAttribute('table'))
    return this._table
  }

  set table(value) {
    this._table = parseTable(value)
    if (this.isConnected) {
      this.render()
    }
  }

  connectedCallback() {
    this.observeContent()
    this.setupResizeObserver()
    this.render()
  }

  disconnectedCallback() {
    this.stopObservingContent()
    this.teardownResizeObserver()
    if (this._layoutFrame) {
      cancelAnimationFrame(this._layoutFrame)
      this._layoutFrame = 0
    }
    if (this._scrollFrame) {
      cancelAnimationFrame(this._scrollFrame)
      this._scrollFrame = 0
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== 'table' || oldValue === newValue) {
      return
    }

    this._table = undefined
    if (this.isConnected) {
      this.render()
    }
  }

  initialize() {
    if (this.shadowRoot) {
      return
    }

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `
      <style>${tableStyle}</style>
      <div class="table-wrap" part="base" tabindex="0">
        <div class="empty" part="empty" hidden><slot name="empty">No table data.</slot></div>
        <table part="table" hidden><tbody></tbody></table>
      </div>
    `

    this._wrap = root.querySelector('.table-wrap')
    this._empty = root.querySelector('.empty')
    this._tableElement = root.querySelector('table')
    this._tbody = root.querySelector('tbody')
    this._wrap.addEventListener('click', this._handleClick)
    this._wrap.addEventListener('scroll', this._handleScroll, { passive: true })
  }

  render() {
    this.initialize()
    const previousScrollLeft = this._wrap.scrollLeft
    const previousScrollTop = this._wrap.scrollTop
    const table = this.table
    const rows = table.cells
    const sticky = normalizeSticky(table.sticky)
    const templates = getTemplates(this)

    this._renderedCells = []
    this._stickyCells = []
    this._tbody.replaceChildren()
    this._empty.hidden = rows.length > 0
    this._tableElement.hidden = rows.length === 0

    if (rows.length > 0) {
      const rowCount = rows.length
      const colCount = getColumnCount(rows)
      const fragment = document.createDocumentFragment()

      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const rowElement = document.createElement('tr')
        rowElement.dataset.row = String(rowIndex)
        const row = rows[rowIndex]

        for (let colIndex = 0; colIndex < row.length; colIndex++) {
          const cell = normalizeCell(row[colIndex])
          if (!cell || shouldSkipCell(rows, rowIndex, colIndex)) {
            continue
          }

          const colspan = getCellColspan(rows, rowIndex, colIndex, cell)
          const rowspan = getCellRowspan(rows, rowIndex, colIndex, cell)
          const context = {
            row: rowIndex,
            col: colIndex,
            rowspan,
            colspan,
            rowCount,
            colCount,
          }
          const cellElement = renderCell(templates, cell, context)

          applyCellAttributes(cellElement, cell, context)
          applyStickyClasses(cellElement, sticky, context)

          cellElement._totCell = cell
          cellElement._totCellContext = context
          this._renderedCells.push(cellElement)
          if (cellElement.classList.contains('cell--sticky')) {
            this._stickyCells.push(cellElement)
          }
          rowElement.append(cellElement)
        }

        fragment.append(rowElement)
      }

      this._tbody.append(fragment)
    }

    this._wrap.scrollLeft = previousScrollLeft
    this._wrap.scrollTop = previousScrollTop
    this.updateScrollState()
    this.scheduleLayout()
  }

  scheduleRender() {
    if (!this.isConnected || this._renderQueued) {
      return
    }

    this._renderQueued = true
    queueMicrotask(() => {
      this._renderQueued = false
      if (this.isConnected) {
        this.render()
      }
    })
  }

  handleCellClick(event) {
    const cellElement = event.target?.closest?.('td, th')
    if (!cellElement || !this._wrap.contains(cellElement)) {
      return
    }

    const cell = cellElement._totCell
    const context = cellElement._totCellContext
    if (!cell || !context) {
      return
    }

    emit(this, 'cell-click', {
      cell,
      row: context.row,
      col: context.col,
      rowspan: context.rowspan,
      colspan: context.colspan,
    })
  }

  getScrollContainer() {
    return this._wrap
  }

  getTable() {
    return this._tableElement
  }

  getCellElements() {
    return this._renderedCells.slice()
  }

  observeContent() {
    if (this._contentObserver || typeof MutationObserver === 'undefined') {
      return
    }

    this._contentObserver = new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; i++) {
        if (mutations[i].type === 'attributes' && mutations[i].target === this) {
          continue
        }
        this.scheduleRender()
        return
      }
    })
    this._contentObserver.observe(this, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    })
  }

  stopObservingContent() {
    if (!this._contentObserver) {
      return
    }

    this._contentObserver.disconnect()
    this._contentObserver = null
  }

  setupResizeObserver() {
    if (this._resizeObserver || typeof ResizeObserver === 'undefined') {
      return
    }

    this._resizeObserver = new ResizeObserver(() => this.scheduleLayout())
    this._resizeObserver.observe(this._wrap)
    this._resizeObserver.observe(this._tableElement)
  }

  teardownResizeObserver() {
    if (!this._resizeObserver) {
      return
    }

    this._resizeObserver.disconnect()
    this._resizeObserver = null
  }

  scheduleLayout() {
    if (!this.isConnected || this._layoutFrame) {
      return
    }

    this._layoutFrame = requestAnimationFrame(() => {
      this._layoutFrame = 0
      syncStickyOffsets(this._tableElement, this._stickyCells)
      this.updateScrollState()
    })
  }

  scheduleScrollState() {
    if (!this.isConnected || this._scrollFrame) {
      return
    }

    this._scrollFrame = requestAnimationFrame(() => {
      this._scrollFrame = 0
      this.updateScrollState()
    })
  }

  updateScrollState(wrap = this._wrap) {
    if (!wrap) {
      return
    }

    const maxScrollLeft = Math.max(0, wrap.scrollWidth - wrap.clientWidth)
    const maxScrollTop = Math.max(0, wrap.scrollHeight - wrap.clientHeight)
    const scrollLeft = Math.max(0, Math.min(maxScrollLeft, wrap.scrollLeft))
    const scrollTop = Math.max(0, Math.min(maxScrollTop, wrap.scrollTop))
    const threshold = 0.5

    wrap.classList.toggle('is-sticky-left-detached', scrollLeft > threshold)
    wrap.classList.toggle('is-sticky-right-detached', scrollLeft < maxScrollLeft - threshold)
    wrap.classList.toggle('is-sticky-top-detached', scrollTop > threshold)
    wrap.classList.toggle('is-sticky-bottom-detached', scrollTop < maxScrollTop - threshold)
  }
}

// CSS handles sticky positioning; JavaScript only supplies cumulative offsets
// for multiple variably sized sticky rows or columns.
function syncStickyOffsets(table, cells) {
  if (!table || table.hidden || cells.length === 0) {
    return
  }

  // Sticky positioning can affect offsetLeft/offsetTop in Firefox. Measure every
  // cell in normal table flow first or repeated ResizeObserver passes compound
  // the offsets and visibly displace rows and columns.
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i]
    cell.style.removeProperty('--tot-table-sticky-left')
    cell.style.removeProperty('--tot-table-sticky-right')
    cell.style.removeProperty('--tot-table-sticky-top')
    cell.style.removeProperty('--tot-table-sticky-bottom')
    cell.style.position = 'static'
  }

  const tableWidth = table.offsetWidth
  const tableHeight = table.offsetHeight
  const measurements = []

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i]
    measurements.push({
      left: cell.offsetLeft,
      top: cell.offsetTop,
      width: cell.offsetWidth,
      height: cell.offsetHeight,
    })
  }

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i]
    const measurement = measurements[i]
    cell.style.position = ''

    if (cell.classList.contains('cell--sticky-left')) {
      cell.style.setProperty('--tot-table-sticky-left', `${measurement.left}px`)
    }

    if (cell.classList.contains('cell--sticky-right')) {
      const right = Math.max(0, tableWidth - measurement.left - measurement.width)
      cell.style.setProperty('--tot-table-sticky-right', `${right}px`)
    }

    if (cell.classList.contains('cell--sticky-top')) {
      cell.style.setProperty('--tot-table-sticky-top', `${measurement.top}px`)
    }

    if (cell.classList.contains('cell--sticky-bottom')) {
      const bottom = Math.max(0, tableHeight - measurement.top - measurement.height)
      cell.style.setProperty('--tot-table-sticky-bottom', `${bottom}px`)
    }
  }
}

function getTemplates(element) {
  const templates = new Map()
  const nodes = element.querySelectorAll('template[slot]')

  for (let i = 0; i < nodes.length; i++) {
    const name = nodes[i].getAttribute('slot') || ''
    if (name) {
      templates.set(name, nodes[i])
    }
  }

  return templates
}

function renderCell(templates, cell, context) {
  const template = templates.get(getTypeClass(cell.type))
  if (template) {
    const fragment = template.content.cloneNode(true)
    hydrateTemplate(fragment, cell, context)
    const cellElement = getTemplateCell(fragment)

    if (cellElement) {
      fragment.removeChild(cellElement)
      return normalizeRenderedCell(cellElement, fragment)
    }

    const wrapper = document.createElement('td')
    wrapper.append(fragment)
    return wrapper
  }

  const cellElement = document.createElement('td')
  cellElement.textContent = cell.content ?? ''
  return cellElement
}

function normalizeRenderedCell(element, remainingFragment) {
  if (element.localName === 'td' || element.localName === 'th') {
    if (remainingFragment && remainingFragment.childNodes.length > 0) {
      element.append(remainingFragment)
    }
    return element
  }

  const wrapper = document.createElement('td')
  wrapper.append(element)
  if (remainingFragment && remainingFragment.childNodes.length > 0) {
    wrapper.append(remainingFragment)
  }
  return wrapper
}

function getTemplateCell(fragment) {
  for (let i = 0; i < fragment.childNodes.length; i++) {
    const node = fragment.childNodes[i]
    if (node.nodeType !== Node.ELEMENT_NODE) {
      continue
    }

    if (node.localName === 'td' || node.localName === 'th') {
      return node
    }
  }

  return null
}

function hydrateTemplate(node, cell, context) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT)
  const values = {
    id: cell.id,
    type: cell.type,
    content: cell.content ?? '',
    row: context.row,
    col: context.col,
    rowspan: context.rowspan,
    colspan: context.colspan,
  }

  while (walker.nextNode()) {
    const current = walker.currentNode
    if (current.nodeType === Node.TEXT_NODE) {
      current.nodeValue = replaceTokens(current.nodeValue, values)
      continue
    }

    if (current.nodeType === Node.ELEMENT_NODE) {
      const attributes = Array.from(current.attributes)
      for (let i = 0; i < attributes.length; i++) {
        current.setAttribute(attributes[i].name, replaceTokens(attributes[i].value, values))
      }
      current.cell = cell
      current.cellContext = context
    }
  }
}

function replaceTokens(value, values) {
  return String(value).replace(/\{\{\s*([\w-]+)\s*\}\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      return values[key]
    }
    return match
  })
}

function applyCellAttributes(element, cell, context) {
  const typeClass = getTypeClass(cell.type)
  const cellClasses = getClassList(cell.class)
  element.dataset.id = String(cell.id ?? '')
  element.dataset.type = cell.type
  element.dataset.row = String(context.row)
  element.dataset.col = String(context.col)
  element.part = `cell ${typeClass}`

  if (context.colspan > 1) {
    element.colSpan = context.colspan
  }

  if (context.rowspan > 1) {
    element.rowSpan = context.rowspan
  }

  element.classList.add('cell', typeClass)
  for (let i = 0; i < cellClasses.length; i++) {
    element.classList.add(cellClasses[i])
  }
}

function applyStickyClasses(element, sticky, context) {
  const isLeft = sticky.left > 0 && context.col < sticky.left
  const isRight = sticky.right > 0 && context.col + context.colspan > context.colCount - sticky.right
  const isTop = sticky.top > 0 && context.row < sticky.top
  const isBottom = sticky.bottom > 0 && context.row + context.rowspan > context.rowCount - sticky.bottom

  if (!isLeft && !isRight && !isTop && !isBottom) {
    return
  }

  element.classList.add('cell--sticky')

  if (isLeft) {
    element.classList.add('cell--sticky-left')
  }

  if (isRight) {
    element.classList.add('cell--sticky-right')
  }

  if (isTop) {
    element.classList.add('cell--sticky-top')
  }

  if (isBottom) {
    element.classList.add('cell--sticky-bottom')
  }

  if ((isLeft || isRight) && (isTop || isBottom)) {
    element.classList.add('cell--corner')
  }

  if (isLeft && context.col + context.colspan >= sticky.left) {
    element.classList.add('cell--sticky-left-edge')
  }

  if (isRight && context.col <= context.colCount - sticky.right) {
    element.classList.add('cell--sticky-right-edge')
  }

  if (isTop && context.row + context.rowspan >= sticky.top) {
    element.classList.add('cell--sticky-top-edge')
  }

  if (isBottom && context.row <= context.rowCount - sticky.bottom) {
    element.classList.add('cell--sticky-bottom-edge')
  }
}

function normalizeCell(value) {
  if (!value || typeof value !== 'object') {
    return null
  }

  return {
    ...value,
    id: value.id ?? '',
    type: String(value.type ?? 'cell'),
    class: typeof value.class === 'string' ? value.class : '',
    colspan: normalizeSpan(value.colspan),
    rowspan: normalizeSpan(value.rowspan),
    content: value.content,
  }
}

function shouldSkipCell(rows, rowIndex, colIndex) {
  const cell = rows[rowIndex]?.[colIndex]
  if (!cell || !hasCellId(cell.id)) {
    return false
  }

  const id = String(cell.id)
  const leftCell = rows[rowIndex]?.[colIndex - 1]
  if (leftCell && hasCellId(leftCell.id) && String(leftCell.id) === id) {
    return true
  }

  const topCell = rows[rowIndex - 1]?.[colIndex]
  if (topCell && hasCellId(topCell.id) && String(topCell.id) === id) {
    return true
  }

  return false
}

function getCellColspan(rows, rowIndex, colIndex, cell) {
  if (cell.colspan > 0) {
    return cell.colspan
  }

  if (!hasCellId(cell.id)) {
    return 1
  }

  let colspan = 1
  const row = rows[rowIndex] || []
  for (let i = colIndex + 1; i < row.length; i++) {
    if (!row[i] || !hasCellId(row[i].id) || String(row[i].id) !== String(cell.id)) {
      break
    }
    colspan += 1
  }

  return colspan
}

function getCellRowspan(rows, rowIndex, colIndex, cell) {
  if (cell.rowspan > 0) {
    return cell.rowspan
  }

  if (!hasCellId(cell.id)) {
    return 1
  }

  let rowspan = 1
  for (let i = rowIndex + 1; i < rows.length; i++) {
    const rowCell = rows[i]?.[colIndex]
    if (!rowCell || !hasCellId(rowCell.id) || String(rowCell.id) !== String(cell.id)) {
      break
    }
    rowspan += 1
  }

  return rowspan
}

function hasCellId(value) {
  return value !== null && value !== undefined && String(value) !== ''
}

function getClassList(value) {
  if (typeof value !== 'string') {
    return []
  }

  const classes = value.trim().split(/\s+/)
  if (classes.length === 1 && !classes[0]) {
    return []
  }
  return classes
}

function parseTable(value) {
  if (value === null || value === undefined || value === '') {
    return {
      cells: [],
      sticky: {},
    }
  }

  let source = value
  if (typeof value === 'string') {
    source = parseJson(value, null)
  }

  if (!source || typeof source !== 'object' || !Array.isArray(source.cells)) {
    return {
      cells: [],
      sticky: {},
    }
  }

  const cells = []
  for (let i = 0; i < source.cells.length; i++) {
    if (Array.isArray(source.cells[i])) {
      cells.push(source.cells[i])
    }
  }

  return {
    cells,
    sticky: source.sticky || {},
  }
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function normalizeSticky(value) {
  return {
    left: normalizeCount(value?.left),
    right: normalizeCount(value?.right),
    top: normalizeCount(value?.top),
    bottom: normalizeCount(value?.bottom),
  }
}

function normalizeCount(value) {
  const number = Number(value)
  if (!Number.isFinite(number) || number < 0) {
    return 0
  }
  return Math.floor(number)
}

function normalizeSpan(value) {
  const number = Number(value)
  if (!Number.isFinite(number) || number <= 0) {
    return 0
  }
  return Math.floor(number)
}

function getColumnCount(rows) {
  let count = 0
  for (let i = 0; i < rows.length; i++) {
    count = Math.max(count, rows[i]?.length || 0)
  }
  return count
}

function getTypeClass(type) {
  return `type-${sanitizeToken(type)}`
}

function sanitizeToken(value) {
  return String(value || 'cell').trim().replace(/[^a-zA-Z0-9_-]+/g, '-') || 'cell'
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}
