const fieldsStyle = `
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

  .fields {
    --fields-font-size: var(--tot-input-font-size-small, .8125rem);
    --fields-gap: var(--tot-spacing-2x-small, .25rem);
    --fields-input-height: 1.65rem;
    --fields-input-padding-block: .0625rem;
    --fields-input-padding-inline: var(--tot-spacing-2x-small, .375rem);
    --fields-remove-size: 1.4rem;
    --fields-tile-min-height: 1.4rem;
    --fields-tile-padding-block: .0625rem;
    --fields-tile-padding-inline: .4rem;

    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--fields-font-size);
    gap: var(--fields-gap);
    line-height: var(--tot-line-height-dense, 1.35);
    max-width: 100%;
    min-width: 0;
  }

  .fields--medium {
    --fields-font-size: var(--tot-input-font-size-medium, .875rem);
    --fields-gap: var(--tot-spacing-x-small, .5rem);
    --fields-input-height: var(--tot-input-height-medium, 2.25rem);
    --fields-input-padding-block: .125rem;
    --fields-input-padding-inline: var(--tot-input-spacing-medium, .75rem);
    --fields-remove-size: 1.75rem;
    --fields-tile-min-height: 1.75rem;
    --fields-tile-padding-block: .125rem;
    --fields-tile-padding-inline: .55rem;
  }

  .fields--large {
    --fields-font-size: var(--tot-input-font-size-large, 1rem);
    --fields-gap: var(--tot-spacing-x-small, .5rem);
    --fields-input-height: var(--tot-input-height-large, 2.75rem);
    --fields-input-padding-block: .1875rem;
    --fields-input-padding-inline: var(--tot-input-spacing-large, 1rem);
    --fields-remove-size: 2rem;
    --fields-tile-min-height: 2.1rem;
    --fields-tile-padding-block: .1875rem;
    --fields-tile-padding-inline: .7rem;
  }


  .fields--readonly {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    gap: var(--fields-gap);
  }

  .field-tile {
    align-items: center;
    background: var(--tot-fields-readonly-background-color, var(--tot-color-sky-50, #f0f9ff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-fields-readonly-border-color, var(--tot-color-sky-200, #bae6fd));
    border-radius: var(--tot-border-radius-medium, 4px);
    box-shadow: inset 0 1px 0 hsl(0 0% 100% / 70%);
    color: var(--tot-fields-readonly-color, var(--tot-color-sky-950, #082f49));
    display: inline-flex;
    font-weight: var(--tot-font-weight-normal, 400);
    max-width: min(100%, 20rem);
    min-height: var(--fields-tile-min-height);
    min-width: 0;
    overflow: hidden;
    padding: var(--fields-tile-padding-block) var(--fields-tile-padding-inline);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .field-tile__text {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .field-tile__key {
    color: var(--tot-fields-readonly-key-color, var(--tot-color-sky-800, #075985));
    font-weight: var(--tot-font-weight-bold, 700);
  }

  .field-row {
    align-items: center;
    display: grid;
    gap: var(--fields-gap);
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) var(--fields-remove-size);
    max-width: 100%;
    min-width: 0;
  }

  .field-input {
    -webkit-appearance: none;
    appearance: none;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-input-border-radius-small, var(--tot-border-radius-small, 3px));
    color: var(--tot-input-color, #1e293b);
    font: inherit;
    height: var(--fields-input-height);
    letter-spacing: var(--tot-input-letter-spacing, normal);
    line-height: var(--tot-input-line-height, 1.25);
    max-width: 100%;
    min-height: var(--fields-input-height);
    min-width: 0;
    outline: none;
    padding: var(--fields-input-padding-block) var(--fields-input-padding-inline);
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) box-shadow,
      var(--tot-transition-fast, 150ms) color;
    width: 100%;
  }

  .field-input::placeholder {
    color: var(--tot-input-placeholder-color, #64748b);
    opacity: 1;
  }

  .field-input:hover:not(:disabled) {
    background: var(--tot-input-background-color-hover, #fff);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
    color: var(--tot-input-color-hover, #0f172a);
  }

  .field-input:focus:not(:disabled) {
    background: var(--tot-input-background-color-focus, #fff);
    border-color: var(--tot-input-border-color-focus, var(--tot-color-primary-600, #0284c7));
    box-shadow: 0 0 0 var(--tot-input-focus-ring-offset, 0) var(--tot-input-focus-ring-color, hsl(198.6 88.7% 48.4% / 40%));
    color: var(--tot-input-color-focus, #0f172a);
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: 0;
  }

  .field-input:disabled {
    background: var(--tot-input-background-color-disabled, #f1f5f9);
    border-color: var(--tot-input-border-color-disabled, #cbd5e1);
    color: var(--tot-input-color-disabled, #64748b);
    cursor: not-allowed;
    opacity: .75;
    -webkit-text-fill-color: var(--tot-input-color-disabled, #64748b);
  }

  .field-input:disabled::placeholder {
    color: var(--tot-input-placeholder-color-disabled, #94a3b8);
  }

  .field-remove {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-color-danger-700, #b91c1c);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-size: .95em;
    font-weight: var(--tot-font-weight-bold, 700);
    height: var(--fields-remove-size);
    justify-content: center;
    line-height: 1;
    opacity: 0;
    padding: 0;
    pointer-events: none;
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) color,
      var(--tot-transition-fast, 150ms) opacity;
    width: var(--fields-remove-size);
  }

  .field-remove:hover:not(:disabled) {
    background: var(--tot-color-danger-100, #fee2e2);
    color: var(--tot-color-danger-800, #991b1b);
  }

  .field-remove:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .field-row:focus-within:not(.field-row--empty) .field-remove,
  .field-row--active:not(.field-row--empty) .field-remove {
    opacity: 1;
    pointer-events: auto;
  }

  @media (hover: hover) and (pointer: fine) {
    .field-row:hover:not(.field-row--empty) .field-remove {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .fields--disabled .field-remove,
  .field-row--empty .field-remove {
    opacity: 0;
    pointer-events: none;
  }
`

const sizes = ['small', 'medium', 'large']

export class TotFields extends HTMLElement {
  static get observedAttributes() {
    return [
      'disabled',
      'fields',
      'key-placeholder',
      'readonly',
      'size',
      'value-placeholder',
    ]
  }

  constructor() {
    super()
    this._rows = null
    this._activeRowIndex = -1
    this._isRendering = false
    this._handleRootClick = (event) => this.handleClick(event)
    this._handleRootFocusIn = (event) => this.handleFocusIn(event)
    this._handleRootFocusOut = (event) => this.handleFocusOut(event)
    this._handleRootInput = (event) => this.handleInput(event)
    this._handleRootKeyDown = (event) => this.handleKeyDown(event)
    this._handleRootChange = (event) => this.handleNativeChange(event)
  }

  get fields() {
    return rowsToFields(this.getRows())
  }

  set fields(value) {
    this._rows = normalizeRows(fieldsToRows(value))
    this._activeRowIndex = -1
    this.render()
  }

  get keyPlaceholder() {
    return this.getAttribute('key-placeholder') || 'Key'
  }

  set keyPlaceholder(value) {
    setNullableAttribute(this, 'key-placeholder', value)
  }

  get valuePlaceholder() {
    return this.getAttribute('value-placeholder') || 'Value'
  }

  set valuePlaceholder(value) {
    setNullableAttribute(this, 'value-placeholder', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  get readonly() {
    return this.hasAttribute('readonly')
  }

  set readonly(value) {
    setBooleanAttribute(this, 'readonly', value)
  }

  get size() {
    return getSupportedValue(this.getAttribute('size'), sizes, 'small')
  }

  set size(value) {
    this.setAttribute('size', getSupportedValue(value, sizes, 'small'))
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (this._isRendering) {
      return
    }

    if (name === 'fields') {
      this._rows = null
      this._activeRowIndex = -1
    }

    if (name === 'disabled' || name === 'readonly') {
      this._activeRowIndex = -1
    }

    this.render()
  }

  focus(options) {
    const input = this.getInput(0, 'key')
    if (input) {
      input.focus(options)
    }
  }

  render() {
    if (!this.isConnected && !this.shadowRoot) {
      return
    }

    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const rows = this.getRows()
    const disabled = this.disabled
    const readonly = this.readonly
    const size = this.size
    const classes = ['fields', `fields--${size}`]
    const rowHtml = []

    if (disabled) {
      classes.push('fields--disabled')
    }

    if (readonly) {
      classes.push('fields--readonly')
    }

    if (readonly) {
      const readonlyRows = getNonEmptyRows(rows)
      for (let i = 0; i < readonlyRows.length; i++) {
        rowHtml.push(this.renderReadonlyRow(readonlyRows[i], i))
      }
    } else {
      for (let i = 0; i < rows.length; i++) {
        rowHtml.push(this.renderRow(rows[i], i, disabled))
      }
    }

    this._isRendering = true
    root.innerHTML = `<style>${fieldsStyle}</style>
      <div class="${escapeAttribute(classes.join(' '))}" part="base" role="list">
        ${rowHtml.join('')}
      </div>
    `
    this._isRendering = false

    root.removeEventListener('click', this._handleRootClick)
    root.removeEventListener('focusin', this._handleRootFocusIn)
    root.removeEventListener('focusout', this._handleRootFocusOut)
    root.removeEventListener('input', this._handleRootInput)
    root.removeEventListener('keydown', this._handleRootKeyDown)
    root.removeEventListener('change', this._handleRootChange)
    root.addEventListener('click', this._handleRootClick)
    root.addEventListener('focusin', this._handleRootFocusIn)
    root.addEventListener('focusout', this._handleRootFocusOut)
    root.addEventListener('input', this._handleRootInput)
    root.addEventListener('keydown', this._handleRootKeyDown)
    root.addEventListener('change', this._handleRootChange)

    const removeButtons = root.querySelectorAll('.field-remove')
    for (let i = 0; i < removeButtons.length; i++) {
      removeButtons[i].addEventListener('mousedown', (event) => event.preventDefault())
    }
  }

  renderReadonlyRow(row, index) {
    const label = `${row.key}: ${row.value}`
    return `<span class="field-tile" data-index="${index}" part="field" role="listitem" title="${escapeAttribute(label)}">
      <span class="field-tile__text" part="field-text"><span class="field-tile__key" part="field-key">${escapeHtml(row.key)}</span>: ${escapeHtml(row.value)}</span>
    </span>`
  }

  renderRow(row, index, disabled) {
    const empty = isEmptyRow(row)
    const classes = ['field-row']

    if (empty) {
      classes.push('field-row--empty')
    }

    if (!disabled && !empty && index === this._activeRowIndex) {
      classes.push('field-row--active')
    }

    return `<div class="${escapeAttribute(classes.join(' '))}" data-index="${index}" part="row" role="listitem">
      <input
        class="field-input field-input--key"
        data-field="key"
        part="key-input"
        type="text"
        value="${escapeAttribute(row.key)}"
        placeholder="${escapeAttribute(this.keyPlaceholder)}"
        autocomplete="off"
        ${disabled ? 'disabled' : ''}
      >
      <input
        class="field-input field-input--value"
        data-field="value"
        part="value-input"
        type="text"
        value="${escapeAttribute(row.value)}"
        placeholder="${escapeAttribute(this.valuePlaceholder)}"
        autocomplete="off"
        ${disabled ? 'disabled' : ''}
      >
      <button
        class="field-remove"
        type="button"
        part="remove"
        aria-label="Remove field"
        tabindex="-1"
        ${disabled || empty ? 'disabled' : ''}
      >×</button>
    </div>`
  }

  handleInput(event) {
    const input = closestElement(event.target, '.field-input')
    if (!input) {
      return
    }

    event.stopPropagation()

    if (this.disabled || this.readonly) {
      return
    }

    const rowElement = closestElement(input, '.field-row')
    const rowIndex = getElementIndex(rowElement)
    if (rowIndex < 0) {
      return
    }

    const fieldName = input.dataset.field === 'value' ? 'value' : 'key'
    const rows = this.getRows()
    const previousLength = rows.length
    const selection = getInputSelection(input)

    rows[rowIndex][fieldName] = input.value
    const editedField = cloneRow(rows[rowIndex])
    const normalizedRows = normalizeRows(rows)
    const focusedIndex = getNormalizedIndex(rows, rowIndex, normalizedRows)
    const shouldRender = normalizedRows.length !== previousLength

    this._rows = normalizedRows
    this._activeRowIndex = focusedIndex

    if (shouldRender) {
      this.render()
      this.restoreFocus(focusedIndex, fieldName, selection)
    } else {
      this.updateActiveRow()
    }

    emit(this, 'change', this.getEventDetail('edit', rowIndex, fieldName, editedField))
  }

  handleNativeChange(event) {
    if (closestElement(event.target, '.field-input')) {
      event.stopPropagation()
    }
  }

  handleFocusIn(event) {
    const input = closestElement(event.target, '.field-input')
    if (!input || this.disabled || this.readonly) {
      return
    }

    const rowElement = closestElement(input, '.field-row')
    this._activeRowIndex = getElementIndex(rowElement)
    this.updateActiveRow()
  }

  handleFocusOut(event) {
    if (this.disabled || this.readonly) {
      return
    }

    const nextInput = closestElement(event.relatedTarget, '.field-input')
    if (nextInput && this.shadowRoot?.contains(nextInput)) {
      return
    }

    this._activeRowIndex = -1
    this.updateActiveRow()
  }

  handleKeyDown(event) {
    if (event.key !== 'Enter') {
      return
    }

    const input = closestElement(event.target, '.field-input')
    if (!input || this.disabled || this.readonly) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const rowElement = closestElement(input, '.field-row')
    const rowIndex = getElementIndex(rowElement)
    const fieldName = input.dataset.field === 'value' ? 'value' : 'key'
    this.focusNextRow(rowIndex, fieldName)
  }

  handleClick(event) {
    if (this.disabled || this.readonly) {
      return
    }

    const removeButton = closestElement(event.target, '.field-remove')
    if (removeButton) {
      event.preventDefault()
      event.stopPropagation()
      const rowElement = closestElement(removeButton, '.field-row')
      this.removeRowAt(getElementIndex(rowElement))
      return
    }

    const rowElement = closestElement(event.target, '.field-row')
    if (!rowElement) {
      this._activeRowIndex = -1
      this.updateActiveRow()
      return
    }

    this._activeRowIndex = getElementIndex(rowElement)
    this.updateActiveRow()
  }

  focusNextRow(rowIndex, fieldName) {
    const rows = this.getRows()
    const nextIndex = rowIndex + 1
    if (nextIndex >= rows.length) {
      return false
    }

    const input = this.getInput(nextIndex, fieldName)
    if (!input) {
      return false
    }

    this._activeRowIndex = isEmptyRow(rows[nextIndex]) ? -1 : nextIndex
    this.updateActiveRow()
    input.focus()
    try {
      input.select()
    } catch (_error) {
      // Ignore input types that do not expose selections.
    }
    return true
  }

  removeRowAt(index) {
    if (this.disabled || this.readonly) {
      return false
    }

    const rows = this.getRows()
    if (index < 0 || index >= rows.length || isEmptyRow(rows[index])) {
      return false
    }

    const removedRow = rows.splice(index, 1)[0]
    this._rows = normalizeRows(rows)
    this._activeRowIndex = Math.min(index, this._rows.length - 1)
    this.render()
    this.restoreFocus(this._activeRowIndex, 'key')

    emit(this, 'change', {
      action: 'remove',
      index,
      field: cloneRow(removedRow),
      fields: this.fields,
      rows: getNonEmptyRows(this.getRows()),
    })
    return true
  }

  getRows() {
    if (this._rows) {
      return cloneRows(this._rows)
    }

    return normalizeRows(fieldsToRows(this.getAttribute('fields')))
  }

  getInput(index, fieldName) {
    return this.shadowRoot?.querySelector(`.field-row[data-index="${index}"] .field-input[data-field="${fieldName}"]`)
  }

  restoreFocus(index, fieldName, selection) {
    const input = this.getInput(index, fieldName)
    if (!input) {
      return
    }

    input.focus()

    if (!selection) {
      return
    }

    try {
      input.setSelectionRange(selection.start, selection.end)
    } catch (_error) {
      // Ignore input types that do not expose selections.
    }
  }

  updateActiveRow() {
    const rows = this.shadowRoot?.querySelectorAll('.field-row') || []
    const activeAllowed = !this.disabled
    for (let i = 0; i < rows.length; i++) {
      const empty = isEmptyDomRow(rows[i])
      rows[i].classList.toggle('field-row--active', activeAllowed && !empty && i === this._activeRowIndex)
    }
  }

  getEventDetail(action, index, fieldName, field) {
    const rows = this.getRows()
    const safeIndex = Math.max(0, Math.min(index, rows.length - 1))
    return {
      action,
      fieldName,
      index,
      field: cloneRow(field || rows[safeIndex] || createEmptyRow()),
      fields: rowsToFields(rows),
      rows: getNonEmptyRows(rows),
    }
  }
}

function fieldsToRows(value) {
  const fields = parseFields(value)
  const rows = []
  const keys = Object.keys(fields)

  for (let i = 0; i < keys.length; i++) {
    rows.push({
      key: String(keys[i]).trim(),
      value: normalizeValue(fields[keys[i]]),
    })
  }

  return rows
}

function parseFields(value) {
  if (!value) {
    return {}
  }

  let source = value
  if (typeof value === 'string') {
    try {
      source = JSON.parse(value)
    } catch (_error) {
      return {}
    }
  }

  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    return {}
  }

  const fields = {}
  const keys = Object.keys(source)
  for (let i = 0; i < keys.length; i++) {
    const key = String(keys[i]).trim()
    if (key) {
      fields[key] = normalizeValue(source[keys[i]])
    }
  }
  return fields
}

function rowsToFields(rows) {
  const fields = {}
  for (let i = 0; i < rows.length; i++) {
    const key = String(rows[i]?.key || '').trim()
    if (key) {
      fields[key] = normalizeValue(rows[i]?.value)
    }
  }
  return fields
}

function normalizeRows(rows) {
  const result = []

  if (Array.isArray(rows)) {
    for (let i = 0; i < rows.length; i++) {
      const row = normalizeRow(rows[i])
      if (!isEmptyRow(row)) {
        result.push(row)
      }
    }
  }

  result.push(createEmptyRow())
  return result
}

function normalizeRow(row) {
  if (!row || typeof row !== 'object') {
    return createEmptyRow()
  }

  return {
    key: normalizeValue(row.key),
    value: normalizeValue(row.value),
  }
}

function normalizeValue(value) {
  if (value === null || value === undefined) {
    return ''
  }
  return String(value)
}

function createEmptyRow() {
  return {
    key: '',
    value: '',
  }
}

function isEmptyRow(row) {
  return !String(row?.key || '').trim() && !String(row?.value || '').trim()
}

function isEmptyDomRow(rowElement) {
  return rowElement.classList.contains('field-row--empty')
}

function cloneRows(rows) {
  const result = []
  for (let i = 0; i < rows.length; i++) {
    result.push(cloneRow(rows[i]))
  }
  return result
}

function cloneRow(row) {
  return {
    key: normalizeValue(row?.key),
    value: normalizeValue(row?.value),
  }
}

function getNonEmptyRows(rows) {
  const result = []
  for (let i = 0; i < rows.length; i++) {
    if (!isEmptyRow(rows[i])) {
      result.push(cloneRow(rows[i]))
    }
  }
  return result
}

function getNormalizedIndex(rows, originalIndex, normalizedRows) {
  let nextIndex = 0
  for (let i = 0; i < originalIndex; i++) {
    if (!isEmptyRow(rows[i])) {
      nextIndex += 1
    }
  }

  if (!isEmptyRow(rows[originalIndex])) {
    return nextIndex
  }

  return Math.min(nextIndex, normalizedRows.length - 1)
}

function getSupportedValue(value, supportedValues, fallback) {
  const normalizedValue = value || fallback
  for (let i = 0; i < supportedValues.length; i++) {
    if (supportedValues[i] === normalizedValue) {
      return normalizedValue
    }
  }
  return fallback
}

function getInputSelection(input) {
  try {
    return {
      start: input.selectionStart,
      end: input.selectionEnd,
    }
  } catch (_error) {
    return null
  }
}

function closestElement(target, selector) {
  if (!(target instanceof Element)) {
    return null
  }

  return target.closest(selector)
}

function getElementIndex(element) {
  if (!element) {
    return -1
  }

  const index = Number(element.dataset.index)
  return Number.isFinite(index) ? index : -1
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (match) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return replacements[match]
  })
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;')
}
