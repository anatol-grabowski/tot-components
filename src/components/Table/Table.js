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

  .empty {
    color: var(--tot-color-neutral-600, #64748b);
    padding: var(--tot-spacing-small, .75rem);
  }
`

export class TotTable extends HTMLElement {
  static get observedAttributes() {
    return ['table']
  }

  get table() {
    if (this._table) {
      return this._table
    }
    return parseTable(this.getAttribute('table'))
  }

  set table(value) {
    this._table = parseTable(value)
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.teardownResizeObserver()
  }

  attributeChangedCallback(name) {
    if (name === 'table') {
      this._table = null
    }
    this.render()
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const previousWrap = root.querySelector('.table-wrap')
    const previousScrollLeft = previousWrap?.scrollLeft || 0
    const previousScrollTop = previousWrap?.scrollTop || 0
    const table = this.table
    const rows = table.cells
    const sticky = normalizeSticky(table.sticky)
    const templates = getTemplates(this)

    this.teardownResizeObserver()

    root.innerHTML = `
      <style>${tableStyle}</style>
      <div class="table-wrap" part="base" tabindex="0">
        ${rows.length === 0 ? '<div class="empty"><slot name="empty">No table data.</slot></div>' : '<table part="table"><tbody></tbody></table>'}
      </div>
    `

    const wrap = root.querySelector('.table-wrap')
    const tbody = root.querySelector('tbody')
    this._renderedCells = []

    if (!tbody) {
      return
    }

    const rowCount = rows.length
    const colCount = getColumnCount(rows)

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
        const cellElement = renderCell(this, templates, cell, {
          row: rowIndex,
          col: colIndex,
          rowspan,
          colspan,
        })

        applyCellAttributes(cellElement, cell, {
          row: rowIndex,
          col: colIndex,
          rowspan,
          colspan,
        })

        applyStickyClasses(cellElement, sticky, {
          row: rowIndex,
          col: colIndex,
          rowspan,
          colspan,
          rowCount,
          colCount,
        })

        cellElement._totCell = cell
        cellElement._totCellContext = {
          row: rowIndex,
          col: colIndex,
          rowspan,
          colspan,
        }

        this._renderedCells.push(cellElement)
        rowElement.append(cellElement)
      }

      tbody.append(rowElement)
    }

    wrap.addEventListener('click', (event) => this.handleCellClick(event))
    wrap.addEventListener('scroll', () => this.updateScrollState(wrap), { passive: true })
    this.setupResizeObserver(wrap)
    this.updateStickyOffsets()
    wrap.scrollLeft = previousScrollLeft
    wrap.scrollTop = previousScrollTop
    this.updateScrollState(wrap)

    requestAnimationFrame(() => {
      if (!this.isConnected) {
        return
      }
      this.updateStickyOffsets()
      wrap.scrollLeft = previousScrollLeft
      wrap.scrollTop = previousScrollTop
      this.updateScrollState(wrap)
    })
  }

  handleCellClick(event) {
    const cellElement = event.target?.closest?.('td, th')
    const wrap = this.shadowRoot?.querySelector('.table-wrap')
    if (!cellElement || !wrap || !wrap.contains(cellElement)) {
      return
    }

    const context = cellElement._totCellContext || {}
    emit(this, 'cell-click', {
      cell: cellElement._totCell || null,
      row: context.row,
      col: context.col,
      rowspan: context.rowspan,
      colspan: context.colspan,
    })
  }

  setupResizeObserver(wrap) {
    if (typeof ResizeObserver === 'undefined') {
      return
    }

    this._resizeObserver = new ResizeObserver(() => {
      this.updateStickyOffsets()
      this.updateScrollState(wrap)
    })
    this._resizeObserver.observe(wrap)
    const table = wrap.querySelector('table')
    if (table) {
      this._resizeObserver.observe(table)
    }
  }

  teardownResizeObserver() {
    if (!this._resizeObserver) {
      return
    }

    this._resizeObserver.disconnect()
    this._resizeObserver = null
  }

  updateScrollState(wrap = this.shadowRoot?.querySelector('.table-wrap')) {
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

  updateStickyOffsets() {
    const root = this.shadowRoot
    const table = root?.querySelector('table')
    if (!table || !this._renderedCells) {
      return
    }

    for (let i = 0; i < this._renderedCells.length; i++) {
      const cell = this._renderedCells[i]
      cell.style.left = ''
      cell.style.right = ''
      cell.style.top = ''
      cell.style.bottom = ''
      cell.style.zIndex = ''
      cell.style.boxShadow = ''

      if (cell.classList.contains('cell--sticky')) {
        cell.style.position = 'static'
      }
    }

    const tableWidth = table.offsetWidth
    const tableHeight = table.offsetHeight
    const measurements = []

    for (let i = 0; i < this._renderedCells.length; i++) {
      const cell = this._renderedCells[i]
      measurements.push({
        left: cell.offsetLeft,
        top: cell.offsetTop,
        width: cell.offsetWidth,
        height: cell.offsetHeight,
      })
    }

    for (let i = 0; i < this._renderedCells.length; i++) {
      const cell = this._renderedCells[i]
      const measurement = measurements[i]
      cell.style.position = ''

      if (!cell.classList.contains('cell--sticky')) {
        continue
      }

      let zIndex = 2

      if (cell.classList.contains('cell--sticky-left')) {
        cell.style.left = `${measurement.left}px`
      }

      if (cell.classList.contains('cell--sticky-right')) {
        cell.style.right = `${Math.max(0, tableWidth - measurement.left - measurement.width)}px`
      }

      if (cell.classList.contains('cell--sticky-top')) {
        cell.style.top = `${measurement.top}px`
        zIndex = Math.max(zIndex, 3)
      }

      if (cell.classList.contains('cell--sticky-bottom')) {
        cell.style.bottom = `${Math.max(0, tableHeight - measurement.top - measurement.height)}px`
        zIndex = Math.max(zIndex, 3)
      }

      if (cell.classList.contains('cell--sticky-left') || cell.classList.contains('cell--sticky-right')) {
        zIndex = Math.max(zIndex, 2)
      }

      if (cell.classList.contains('cell--corner')) {
        zIndex = 4
      }

      cell.style.zIndex = String(zIndex)
    }
  }
}

function getTemplates(element) {
  const templates = new Map()
  const nodes = element.querySelectorAll('template[slot], template[data-slot]')

  for (let i = 0; i < nodes.length; i++) {
    const name = nodes[i].getAttribute('slot') || nodes[i].dataset.slot || ''
    if (name) {
      templates.set(name, nodes[i])
    }
  }

  return templates
}

function renderCell(host, templates, cell, context) {
  const renderer = host.renderers?.[cell.type] || host.cellRenderers?.[cell.type]
  if (typeof renderer === 'function') {
    const rendered = renderer(cell, context)
    if (rendered instanceof HTMLElement) {
      return normalizeRenderedCell(rendered, cell)
    }
  }

  const template = templates.get(cell.type)
  if (template) {
    const fragment = template.content.cloneNode(true)
    hydrateTemplate(fragment, cell, context)
    const cellElement = getTemplateCell(fragment)

    if (cellElement) {
      fragment.removeChild(cellElement)
      return normalizeRenderedCell(cellElement, cell, fragment)
    }

    const wrapper = document.createElement('td')
    wrapper.append(fragment)
    return wrapper
  }

  const cellElement = document.createElement('td')
  cellElement.textContent = cell.content ?? ''
  return cellElement
}

function normalizeRenderedCell(element, cell, remainingFragment) {
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
  element.dataset.id = cell.id
  element.dataset.type = cell.type
  element.dataset.row = String(context.row)
  element.dataset.col = String(context.col)
  element.part = getPartValue(cell)

  if (context.colspan > 1) {
    element.colSpan = context.colspan
  }

  if (context.rowspan > 1) {
    element.rowSpan = context.rowspan
  }

  const classes = ['cell', getTypeClass(cell.type)]
  const cellClasses = getClassList(cell.class)
  for (let i = 0; i < cellClasses.length; i++) {
    classes.push(cellClasses[i])
  }

  for (let i = 0; i < classes.length; i++) {
    element.classList.add(classes[i])
  }
}

function getPartValue(cell) {
  const parts = ['cell']
  if (cell.type) {
    parts.push(getTypeClass(cell.type))
  }

  const classes = getClassList(cell.class)
  for (let i = 0; i < classes.length; i++) {
    parts.push(`class-${sanitizeToken(classes[i])}`)
  }

  return parts.join(' ')
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
    id: String(value.id ?? ''),
    type: String(value.type ?? 'cell'),
    class: value.class || [],
    colspan: normalizeSpan(value.colspan),
    rowspan: normalizeSpan(value.rowspan),
    content: value.content,
  }
}

function shouldSkipCell(rows, rowIndex, colIndex) {
  const cell = rows[rowIndex]?.[colIndex]
  if (!cell || !cell.id) {
    return false
  }

  const leftCell = rows[rowIndex]?.[colIndex - 1]
  if (leftCell && String(leftCell.id ?? '') === String(cell.id ?? '')) {
    return true
  }

  const topCell = rows[rowIndex - 1]?.[colIndex]
  if (topCell && String(topCell.id ?? '') === String(cell.id ?? '')) {
    return true
  }

  return false
}

function getCellColspan(rows, rowIndex, colIndex, cell) {
  if (cell.colspan > 0) {
    return cell.colspan
  }

  let colspan = 1
  const row = rows[rowIndex] || []
  for (let i = colIndex + 1; i < row.length; i++) {
    if (!row[i] || String(row[i].id ?? '') !== cell.id) {
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

  let rowspan = 1
  for (let i = rowIndex + 1; i < rows.length; i++) {
    const rowCell = rows[i]?.[colIndex]
    if (!rowCell || String(rowCell.id ?? '') !== cell.id) {
      break
    }
    rowspan += 1
  }

  return rowspan
}

function getClassList(value) {
  const classes = []
  const source = Array.isArray(value) ? value : [value]

  for (let i = 0; i < source.length; i++) {
    const item = source[i]
    if (!item) {
      continue
    }

    if (typeof item === 'string') {
      const parts = item.split(/\s+/)
      for (let j = 0; j < parts.length; j++) {
        if (parts[j]) {
          classes.push(parts[j])
        }
      }
      continue
    }

    if (typeof item === 'object') {
      const keys = Object.keys(item)
      for (let j = 0; j < keys.length; j++) {
        if (item[keys[j]]) {
          const parts = String(keys[j]).split(/\s+/)
          for (let k = 0; k < parts.length; k++) {
            if (parts[k]) {
              classes.push(parts[k])
            }
          }
        }
      }
    }
  }

  return getUniqueValues(classes)
}

function getUniqueValues(values) {
  const unique = []
  for (let i = 0; i < values.length; i++) {
    if (!unique.includes(values[i])) {
      unique.push(values[i])
    }
  }
  return unique
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
  } catch (error) {
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
