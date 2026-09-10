const formulaStyle = `
  :host {
    display: block;
    max-width: 100%;
    min-width: 0;
  }

  :host([hidden]) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .formula {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-large, 6px);
    color: var(--tot-input-color, #1e293b);
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-font-size-small, .8125rem);
    line-height: var(--tot-line-height-dense, 1.2);
    max-width: 100%;
    min-width: 0;
    overflow: visible;
    position: relative;
  }

  .formula__header {
    align-items: center;
    background: var(--tot-color-neutral-100, #f1f5f9);
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-large, 6px) var(--tot-border-radius-large, 6px) 0 0;
    color: var(--tot-input-color, #1e293b);
    display: flex;
    font-size: var(--tot-font-size-x-small, .75rem);
    font-weight: var(--tot-font-weight-semibold, 600);
    gap: var(--tot-spacing-3x-small, .125rem);
    min-height: 1.45rem;
    padding: .1rem var(--tot-spacing-x-small, .5rem);
  }

  .formula__header[hidden] {
    display: none;
  }

  .formula__title {
    flex: 1 1 auto;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .formula__validation {
    flex: 0 0 auto;
    position: relative;
  }

  .formula__validation-button {
    align-items: center;
    appearance: none;
    background: var(--tot-color-neutral-0, #fff);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: 50%;
    color: var(--tot-color-neutral-600, #475569);
    cursor: help;
    display: inline-flex;
    font: inherit;
    font-size: .7rem;
    font-weight: var(--tot-font-weight-bold, 700);
    height: 1.2rem;
    justify-content: center;
    line-height: 1;
    padding: 0;
    width: 1.2rem;
  }

  .formula__validation--valid .formula__validation-button {
    background: var(--tot-color-success-50, #ecfdf5);
    border-color: var(--tot-color-success-300, #6ee7b7);
    color: var(--tot-color-success-700, #047857);
  }

  .formula__validation--invalid .formula__validation-button {
    background: var(--tot-color-danger-50, #fef2f2);
    border-color: var(--tot-color-danger-300, #fca5a5);
    color: var(--tot-color-danger-700, #b91c1c);
  }

  .formula__validation--unknown .formula__validation-button {
    background: var(--tot-color-warning-50, #fffbeb);
    border-color: var(--tot-color-warning-300, #fcd34d);
    color: var(--tot-color-warning-700, #a16207);
  }

  .formula__validation-tooltip,
  .formula__item-tooltip {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    box-shadow: var(--tot-shadow-large, 0 2px 8px rgb(15 23 42 / 12%));
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-font-size-2x-small, .6875rem);
    font-weight: var(--tot-font-weight-normal, 400);
    line-height: var(--tot-line-height-dense, 1.3);
    z-index: var(--tot-z-index-tooltip, 1500);
  }

  .formula__validation-tooltip {
    display: none;
    max-height: min(22rem, 70vh);
    max-width: min(32rem, calc(100vw - 1rem));
    min-width: min(22rem, calc(100vw - 1rem));
    overflow: auto;
    padding: var(--tot-spacing-x-small, .5rem);
    position: absolute;
    right: 0;
    top: calc(100% + var(--tot-spacing-2x-small, .25rem));
  }

  .formula__validation:hover .formula__validation-tooltip,
  .formula__validation:focus-within .formula__validation-tooltip,
  .formula__validation--open .formula__validation-tooltip {
    display: block;
  }

  .formula__validation-summary {
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .formula__validation-table,
  .formula__item-tooltip-table {
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;
    width: 100%;
  }

  .formula__validation-table {
    margin-top: var(--tot-spacing-2x-small, .25rem);
  }

  .formula__validation-table th,
  .formula__validation-table td {
    border-top: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    padding: .2rem .25rem;
    text-align: right;
    vertical-align: top;
  }

  .formula__validation-table th:first-child,
  .formula__validation-table td:first-child {
    text-align: left;
  }

  .formula__validation-table th {
    color: var(--tot-color-neutral-500, #64748b);
    font-size: .625rem;
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .formula__validation-concept {
    max-width: 14rem;
    overflow-wrap: anywhere;
  }

  .formula__validation-tag {
    color: var(--tot-color-neutral-500, #64748b);
    display: block;
    font-family: var(--tot-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    font-size: .625rem;
    margin-top: .05rem;
  }

  .formula__validation-difference {
    color: var(--tot-color-danger-700, #b91c1c);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .formula__list,
  .formula__children {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .formula__list {
    padding: .1rem var(--tot-spacing-2x-small, .25rem) .2rem;
  }

  .formula__node {
    min-width: 0;
  }

  .formula__row {
    align-items: start;
    border-radius: var(--tot-border-radius-small, 3px);
    display: grid;
    gap: 0 .18rem;
    grid-template-columns: .95rem minmax(0, 1fr) minmax(0, max-content);
    min-width: 0;
    padding: .02rem .18rem;
    position: relative;
  }

  .formula__row:hover {
    background: var(--tot-color-neutral-50, #f8fafc);
  }

  .formula__row--collapsed .formula__content {
    opacity: .82;
  }

  .formula__sign {
    align-items: center;
    appearance: none;
    background: transparent;
    border: 0;
    color: inherit;
    display: inline-flex;
    font-family: var(--tot-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    font-size: .9em;
    font-weight: var(--tot-font-weight-bold, 700);
    gap: .02rem;
    height: 1rem;
    justify-content: flex-start;
    line-height: 1rem;
    margin: 0;
    min-width: 0;
    padding: 0;
    text-align: center;
  }

  button.formula__sign {
    cursor: pointer;
  }

  button.formula__sign[aria-expanded='false'] {
    background: var(--tot-color-neutral-100, #f1f5f9);
    border-radius: var(--tot-border-radius-small, 3px);
    box-shadow: inset 0 0 0 var(--tot-panel-border-width, 1px) var(--tot-panel-border-color, #e2e8f0);
  }

  .formula__sign--plus {
    color: var(--tot-color-success-600, var(--tot-color-emerald-600, #059669));
  }

  .formula__sign--minus {
    color: var(--tot-color-danger-600, var(--tot-color-red-600, #dc2626));
  }

  .formula__content {
    min-width: 0;
  }

  .formula__name,
  .formula__tag,
  .formula__short-name {
    display: block;
    max-width: 100%;
    overflow-wrap: anywhere;
    word-break: normal;
  }

  .formula__name,
  .formula__short-name {
    color: var(--tot-input-color, #1e293b);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .formula__short-name {
    font-family: var(--tot-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  }

  .formula__tag {
    color: var(--tot-color-neutral-500, #64748b);
    font-family: var(--tot-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    font-size: var(--tot-font-size-2x-small, .6875rem);
    line-height: 1.02;
  }

  .formula__value {
    color: var(--tot-input-color, #1e293b);
    font-family: var(--tot-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    font-size: var(--tot-font-size-x-small, .75rem);
    font-variant-numeric: tabular-nums;
    font-weight: var(--tot-font-weight-semibold, 600);
    line-height: 1rem;
    max-width: 10rem;
    min-width: 0;
    overflow-wrap: anywhere;
    text-align: right;
  }

  .formula__value[hidden] {
    display: none;
  }

  .formula__children {
    margin-left: .48rem;
    padding-left: .22rem;
    position: relative;
  }

  .formula__children::before {
    border-left: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    content: '';
    height: var(--formula-guide-height, 100%);
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
  }

  .formula__children--root::before {
    display: none;
  }

  .formula__children[hidden] {
    display: none;
  }

  .formula__item-tooltip {
    display: none;
    left: 0;
    max-width: min(30rem, calc(100vw - .75rem));
    min-width: min(18rem, calc(100vw - .75rem));
    padding: .28rem .35rem;
    pointer-events: none;
    position: fixed;
    top: 0;
  }

  .formula__item-tooltip--open {
    display: block;
  }

  .formula__item-tooltip-table th,
  .formula__item-tooltip-table td {
    padding: .08rem .18rem;
    text-align: left;
    vertical-align: top;
  }

  .formula__item-tooltip-table th {
    color: var(--tot-color-neutral-500, #64748b);
    font-size: .625rem;
    font-weight: var(--tot-font-weight-semibold, 600);
    white-space: nowrap;
    width: 4.2rem;
  }

  .formula__item-tooltip-table td {
    overflow-wrap: anywhere;
  }

  .formula__item-tooltip-tag {
    font-family: var(--tot-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    font-size: .625rem;
  }

  .formula__item-tooltip-value {
    font-family: var(--tot-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    font-variant-numeric: tabular-nums;
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  @media (max-width: 34rem) {
    .formula__row {
      grid-template-columns: .95rem minmax(0, 1fr) minmax(3.25rem, max-content);
    }

    .formula__value {
      max-width: 7rem;
    }
  }
`

function tagHookToken(tag) {
  const value = String(tag || '').trim()
  if (!value) {
    return ''
  }
  return `tag-${value.replace(/[^a-z0-9_-]/gi, '-')}`
}

function applyTagHook(element, tag, basePart = '') {
  const value = String(tag || '').trim()
  const token = tagHookToken(value)
  const rawClass = value && !/\s/.test(value) ? value : ''
  const rawPart = /^[a-z_][a-z0-9_-]*$/i.test(value) ? value : ''
  const parts = []

  if (basePart) {
    parts.push(basePart)
  }
  if (rawClass) {
    element.classList.add(rawClass)
  }
  if (rawPart) {
    parts.push(rawPart)
  }
  if (token && token !== rawClass) {
    element.classList.add(token)
  }
  if (token && token !== rawPart) {
    parts.push(token)
  }
  if (value) {
    element.dataset.tag = value
  }
  if (parts.length) {
    element.setAttribute('part', parts.join(' '))
  }
}

function formatValue(value) {
  if (value === undefined || value === null || value === '') {
    return ''
  }

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return String(value)
  }

  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 6,
  }).format(value)
}

function numericValue(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }
  return null
}

function valuesMatch(left, right) {
  const scale = Math.max(1, Math.abs(left), Math.abs(right))
  return Math.abs(left - right) <= scale * 1e-9
}

function valueFor(item, values) {
  if (!item.tag || !Object.prototype.hasOwnProperty.call(values, item.tag)) {
    return undefined
  }
  return values[item.tag]
}

function validateFormula(items, values) {
  const mismatches = []
  let checked = 0
  let incomplete = 0

  const visit = item => {
    if (item.items.length) {
      const parentValue = numericValue(valueFor(item, values))
      let calculated = 0
      let complete = parentValue !== null

      for (let i = 0; i < item.items.length; i++) {
        const child = item.items[i]
        const childValue = numericValue(valueFor(child, values))
        if (childValue === null) {
          complete = false
          continue
        }
        calculated += (child.sign === '-' ? -1 : 1) * childValue
      }

      if (complete) {
        checked += 1
        if (!valuesMatch(parentValue, calculated)) {
          mismatches.push({
            name: item.name,
            shortName: item.shortName,
            tag: item.tag,
            value: parentValue,
            calculated,
            difference: parentValue - calculated,
          })
        }
      } else {
        incomplete += 1
      }
    }

    for (let i = 0; i < item.items.length; i++) {
      visit(item.items[i])
    }
  }

  for (let i = 0; i < items.length; i++) {
    visit(items[i])
  }

  return {
    state: mismatches.length ? 'invalid' : incomplete ? 'unknown' : checked ? 'valid' : 'unknown',
    checked,
    incomplete,
    mismatches,
  }
}

function normalizeItem(item, path) {
  if (!item || typeof item !== 'object') {
    return null
  }

  const name = String(item.name || '').trim()
  const shortName = String(item.shortName || '').trim()
  const tag = String(item.tag || '').trim()
  if (!name && !shortName && !tag) {
    return null
  }

  const children = []
  if (Array.isArray(item.items)) {
    for (let i = 0; i < item.items.length; i++) {
      const child = normalizeItem(item.items[i], `${path}.${i}`)
      if (child) {
        children.push(child)
      }
    }
  }

  return {
    path,
    sign: item.sign === '-' ? '-' : '+',
    name,
    shortName: shortName || name || tag,
    tag,
    items: children,
  }
}

function normalizeValues(values) {
  const result = {}
  if (!values || typeof values !== 'object' || Array.isArray(values)) {
    return result
  }

  const entries = Object.entries(values)
  for (let i = 0; i < entries.length; i++) {
    const [tag, value] = entries[i]
    if (typeof value === 'number' && Number.isFinite(value)) {
      result[String(tag)] = value
    }
  }
  return result
}

function normalizeConfig(config) {
  const value = config && typeof config === 'object' ? config : {}
  const items = []

  if (Array.isArray(value.items)) {
    for (let i = 0; i < value.items.length; i++) {
      const item = normalizeItem(value.items[i], String(i))
      if (item) {
        items.push(item)
      }
    }
  }

  return {
    title: value.title == null ? '' : String(value.title),
    simplified: value.simplified === true,
    values: normalizeValues(value.values),
    items,
  }
}

export class TotFormula extends HTMLElement {
  static get observedAttributes() {
    return ['config']
  }

  constructor() {
    super()
    this._config = normalizeConfig(null)
    this._collapsedPaths = new Set()
    this._validationPinned = false
    this._itemTooltipPinned = false
    this._itemTooltipRow = null
    this._guideResizeObserver = typeof ResizeObserver === 'function'
      ? new ResizeObserver(() => this.syncGuideLines())
      : null
    this._handleDocumentPointerDown = event => {
      const path = event.composedPath()
      if (!path.includes(this._validationButton)) {
        this._validationPinned = false
        this.syncValidationOpenState()
      }
      if (!path.includes(this._itemTooltipRow)) {
        this.hideItemTooltip()
      }
    }

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `
      <style>${formulaStyle}</style>
      <section class="formula" part="base">
        <div class="formula__header" part="header" hidden>
          <span class="formula__title" part="title"></span>
          <span class="formula__validation" part="validation">
            <button class="formula__validation-button" part="validation-button" type="button"></button>
            <span class="formula__validation-tooltip" part="validation-tooltip" role="tooltip"></span>
          </span>
        </div>
        <ul class="formula__list" part="list"></ul>
        <div class="formula__item-tooltip" part="item-tooltip" role="tooltip"></div>
      </section>
    `

    this._header = root.querySelector('.formula__header')
    this._title = root.querySelector('.formula__title')
    this._validation = root.querySelector('.formula__validation')
    this._validationButton = root.querySelector('.formula__validation-button')
    this._validationTooltip = root.querySelector('.formula__validation-tooltip')
    this._list = root.querySelector('.formula__list')
    this._itemTooltip = root.querySelector('.formula__item-tooltip')

    this._validationButton.addEventListener('click', event => {
      event.stopPropagation()
      this._validationPinned = !this._validationPinned
      this.syncValidationOpenState()
    })
  }

  get config() {
    return this._config
  }

  set config(value) {
    this._config = normalizeConfig(value)
    if (this.isConnected) {
      this.render()
    }
  }

  get simplified() {
    return this._config.simplified
  }

  set simplified(value) {
    const next = value === true
    if (this._config.simplified === next) {
      return
    }
    this._config.simplified = next
    if (this.isConnected) {
      this.render()
    }
  }

  connectedCallback() {
    document.addEventListener('pointerdown', this._handleDocumentPointerDown)
    if (this._guideResizeObserver) {
      this._guideResizeObserver.observe(this._list)
    }
    this.render()
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this._handleDocumentPointerDown)
    if (this._guideResizeObserver) {
      this._guideResizeObserver.disconnect()
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== 'config' || oldValue === newValue) {
      return
    }

    if (!newValue) {
      this.config = null
      return
    }

    try {
      this.config = JSON.parse(newValue)
    } catch (error) {
      this.config = null
    }
  }

  getBase() {
    return this.shadowRoot.querySelector('.formula')
  }

  render() {
    this.hideItemTooltip()
    this._title.textContent = this._config.title
    this.renderValidation(validateFormula(this._config.items, this._config.values))
    this._header.hidden = !this._config.title && !this._config.items.length
    this._list.replaceChildren()

    for (let i = 0; i < this._config.items.length; i++) {
      this._list.append(this.createItem(this._config.items[i], 0))
    }

    this.syncGuideLines()
  }

  syncGuideLines() {
    if (!this._list) {
      return
    }

    const guides = this._list.querySelectorAll('.formula__children')
    for (let i = 0; i < guides.length; i++) {
      const guide = guides[i]
      if (guide.classList.contains('formula__children--root') || guide.hidden) {
        guide.style.removeProperty('--formula-guide-height')
        continue
      }

      const lastNode = guide.lastElementChild
      const lastRow = lastNode ? lastNode.firstElementChild : null
      if (!lastRow) {
        guide.style.removeProperty('--formula-guide-height')
        continue
      }

      const guideRect = guide.getBoundingClientRect()
      const rowRect = lastRow.getBoundingClientRect()
      const height = Math.max(0, Math.min(
        guideRect.height,
        rowRect.top - guideRect.top + rowRect.height / 2,
      ))
      guide.style.setProperty('--formula-guide-height', `${height}px`)
    }
  }

  syncValidationOpenState() {
    this._validation.classList.toggle('formula__validation--open', this._validationPinned)
    this._validationButton.setAttribute('aria-expanded', String(this._validationPinned))
  }

  renderValidation(validation) {
    this._validation.className = `formula__validation formula__validation--${validation.state}`
    this.syncValidationOpenState()
    this._validationButton.textContent = validation.state === 'valid' ? '✓' : validation.state === 'invalid' ? '!' : '?'
    this._validationButton.setAttribute(
      'aria-label',
      validation.state === 'valid'
        ? 'Formula values match'
        : validation.state === 'invalid'
          ? 'Formula values do not match'
          : 'Formula values could not be fully verified',
    )
    this._validationTooltip.replaceChildren()

    const summary = document.createElement('span')
    summary.className = 'formula__validation-summary'

    if (validation.state === 'valid') {
      summary.textContent = `${validation.checked} numeric calculation${validation.checked === 1 ? '' : 's'} verified.`
      this._validationTooltip.append(summary)
      return
    }

    if (validation.state === 'unknown') {
      if (!validation.checked && !validation.incomplete) {
        summary.textContent = 'No complete numeric parent/child calculation is available to verify.'
      } else {
        summary.textContent = `${validation.checked} calculation${validation.checked === 1 ? '' : 's'} verified; ${validation.incomplete} could not be checked because one or more values are missing.`
      }
      this._validationTooltip.append(summary)
      return
    }

    summary.textContent = `${validation.mismatches.length} calculation${validation.mismatches.length === 1 ? '' : 's'} do not match.`
    this._validationTooltip.append(summary)

    const table = document.createElement('table')
    table.className = 'formula__validation-table'
    table.innerHTML = '<thead><tr><th>Concept</th><th>Shown</th><th>Calculated</th><th>Difference</th></tr></thead>'
    const body = document.createElement('tbody')

    for (let i = 0; i < validation.mismatches.length; i++) {
      const mismatch = validation.mismatches[i]
      const row = document.createElement('tr')
      applyTagHook(row, mismatch.tag)
      const concept = document.createElement('td')
      concept.className = 'formula__validation-concept'
      concept.textContent = mismatch.name || mismatch.shortName || mismatch.tag
      if (mismatch.tag) {
        const tag = document.createElement('span')
        tag.className = 'formula__validation-tag'
        tag.textContent = mismatch.tag
        concept.append(tag)
      }

      const shown = document.createElement('td')
      shown.textContent = formatValue(mismatch.value)
      const calculated = document.createElement('td')
      calculated.textContent = formatValue(mismatch.calculated)
      const difference = document.createElement('td')
      difference.className = 'formula__validation-difference'
      difference.textContent = formatValue(mismatch.difference)
      row.append(concept, shown, calculated, difference)
      body.append(row)
    }

    table.append(body)
    this._validationTooltip.append(table)
  }

  createItem(item, depth) {
    const node = document.createElement('li')
    node.className = 'formula__node'
    applyTagHook(node, item.tag, 'item')

    const row = document.createElement('div')
    row.className = 'formula__row'
    applyTagHook(row, item.tag, 'row')

    const hasChildren = item.items.length > 0
    const collapsed = hasChildren && this._collapsedPaths.has(item.path)
    if (collapsed) {
      row.classList.add('formula__row--collapsed')
    }

    const sign = document.createElement(hasChildren ? 'button' : 'span')
    sign.className = `formula__sign formula__sign--${item.sign === '-' ? 'minus' : 'plus'}`
    applyTagHook(sign, item.tag, 'sign')
    sign.setAttribute('aria-label', hasChildren
      ? `${item.sign === '-' ? 'minus' : 'plus'}, ${collapsed ? 'expand' : 'collapse'} ${item.name || item.shortName || item.tag}`
      : item.sign === '-' ? 'minus' : 'plus')
    sign.textContent = item.sign

    if (hasChildren) {
      sign.type = 'button'
      sign.setAttribute('aria-expanded', String(!collapsed))
      sign.addEventListener('pointerdown', event => event.stopPropagation())
      sign.addEventListener('click', event => {
        event.stopPropagation()
        const itemValue = valueFor(item, this._config.values)
        this.emitItemEvent('item-click', item, itemValue)
        this.emitItemEvent('item-unhover', item, itemValue)
        if (this._collapsedPaths.has(item.path)) {
          this._collapsedPaths.delete(item.path)
        } else {
          this._collapsedPaths.add(item.path)
        }
        this.render()
      })
    }

    const content = document.createElement('span')
    content.className = 'formula__content'
    applyTagHook(content, item.tag, 'content')

    if (this._config.simplified) {
      const shortName = document.createElement('span')
      shortName.className = 'formula__short-name'
      applyTagHook(shortName, item.tag, 'short-name')
      shortName.textContent = item.shortName
      content.append(shortName)
    } else {
      const name = document.createElement('span')
      name.className = 'formula__name'
      applyTagHook(name, item.tag, 'name')
      name.textContent = item.name

      const tag = document.createElement('span')
      tag.className = 'formula__tag'
      applyTagHook(tag, item.tag, 'tag')
      tag.textContent = item.tag
      content.append(name, tag)
    }

    const rawValue = valueFor(item, this._config.values)
    const value = document.createElement('span')
    value.className = 'formula__value'
    applyTagHook(value, item.tag, 'value')
    value.textContent = formatValue(rawValue)
    value.hidden = rawValue === undefined

    row.append(sign, content, value)
    node.append(row)
    this.bindItemTooltip(row, item, rawValue)

    if (hasChildren) {
      const children = document.createElement('ul')
      children.className = `formula__children${depth === 0 ? ' formula__children--root' : ''}`
      applyTagHook(children, item.tag, 'children')
      children.hidden = collapsed
      for (let i = 0; i < item.items.length; i++) {
        children.append(this.createItem(item.items[i], depth + 1))
      }
      node.append(children)
    }

    return node
  }

  bindItemTooltip(row, item, value) {
    row.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') {
        return
      }
      this._itemTooltipPinned = false
      this.showItemTooltip(item, value, row)
      this.emitItemEvent('item-hover', item, value)
    })

    row.addEventListener('pointermove', event => {
      if (event.pointerType !== 'touch' && !this._itemTooltipPinned) {
        this.positionItemTooltip(row)
      }
    })

    row.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'touch' && !this._itemTooltipPinned) {
        this.hideItemTooltip()
        this.emitItemEvent('item-unhover', item, value)
      }
    })

    row.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') {
        return
      }
      event.stopPropagation()
      const wasSame = this._itemTooltipPinned && this._itemTooltipRow === row
      if (wasSame) {
        this.hideItemTooltip()
        return
      }
      this._itemTooltipPinned = true
      this.showItemTooltip(item, value, row)
    })

    row.addEventListener('click', event => {
      if (event.target instanceof Element && event.target.closest('.formula__sign')) {
        return
      }
      this.emitItemEvent('item-click', item, value)
    })
  }

  emitItemEvent(type, item, value) {
    this.dispatchEvent(new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail: {
        path: item.path,
        sign: item.sign,
        name: item.name,
        shortName: item.shortName,
        tag: item.tag,
        value,
      },
    }))
  }

  showItemTooltip(item, value, row) {
    const table = document.createElement('table')
    table.className = 'formula__item-tooltip-table'
    const body = document.createElement('tbody')
    const rows = [
      ['Name', item.name],
      ['Tag', item.tag],
      ['Short', item.shortName],
      ['Value', value === undefined ? '—' : formatValue(value)],
    ]

    for (let i = 0; i < rows.length; i++) {
      const tooltipRow = document.createElement('tr')
      const heading = document.createElement('th')
      heading.textContent = rows[i][0]
      const cell = document.createElement('td')
      cell.textContent = rows[i][1]
      if (rows[i][0] === 'Tag') {
        cell.className = 'formula__item-tooltip-tag'
      } else if (rows[i][0] === 'Value') {
        cell.className = 'formula__item-tooltip-value'
      }
      tooltipRow.append(heading, cell)
      body.append(tooltipRow)
    }

    table.append(body)
    this._itemTooltip.replaceChildren(table)
    this._itemTooltip.className = 'formula__item-tooltip'
    this._itemTooltip.removeAttribute('part')
    this._itemTooltip.removeAttribute('data-tag')
    applyTagHook(this._itemTooltip, item.tag, 'item-tooltip')
    this._itemTooltip.classList.add('formula__item-tooltip--open')
    this._itemTooltipRow = row
    this.positionItemTooltip(row)
  }

  positionItemTooltip(row) {
    if (!row || !this._itemTooltip.classList.contains('formula__item-tooltip--open')) {
      return
    }

    const gap = 6
    const pad = 6
    const rowRect = row.getBoundingClientRect()
    const tooltipRect = this._itemTooltip.getBoundingClientRect()
    let left = rowRect.left
    let top = rowRect.bottom + gap

    if (left + tooltipRect.width > window.innerWidth - pad) {
      left = window.innerWidth - tooltipRect.width - pad
    }
    if (top + tooltipRect.height > window.innerHeight - pad) {
      top = rowRect.top - tooltipRect.height - gap
    }

    this._itemTooltip.style.left = `${Math.max(pad, left)}px`
    this._itemTooltip.style.top = `${Math.max(pad, top)}px`
  }

  hideItemTooltip() {
    this._itemTooltipPinned = false
    this._itemTooltipRow = null
    if (!this._itemTooltip) {
      return
    }
    this._itemTooltip.classList.remove('formula__item-tooltip--open')
    this._itemTooltip.style.left = ''
    this._itemTooltip.style.top = ''
  }
}
