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
    --tot-fields-font-size: var(--tot-input-font-size-small, .8125rem);
    --tot-fields-gap: var(--tot-spacing-2x-small, .25rem);
    --tot-fields-remove-size: 1.4rem;
    --tot-fields-tile-min-height: 1.4rem;
    --tot-fields-tile-padding-block: .0625rem;
    --tot-fields-tile-padding-inline: .4rem;

    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-fields-font-size);
    gap: var(--tot-fields-gap);
    line-height: var(--tot-line-height-dense, 1.35);
    max-width: 100%;
    min-width: 0;
  }

  .fields--medium {
    --tot-fields-font-size: var(--tot-input-font-size-medium, .875rem);
    --tot-fields-gap: var(--tot-spacing-x-small, .5rem);
    --tot-fields-remove-size: 1.75rem;
    --tot-fields-tile-min-height: 1.75rem;
    --tot-fields-tile-padding-block: .125rem;
    --tot-fields-tile-padding-inline: .55rem;
  }

  .fields--large {
    --tot-fields-font-size: var(--tot-input-font-size-large, 1rem);
    --tot-fields-gap: var(--tot-spacing-x-small, .5rem);
    --tot-fields-remove-size: 2rem;
    --tot-fields-tile-min-height: 2.1rem;
    --tot-fields-tile-padding-block: .1875rem;
    --tot-fields-tile-padding-inline: .7rem;
  }


  .fields__rows {
    display: contents;
  }

  .fields--readonly {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    gap: var(--tot-fields-gap);
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
    min-height: var(--tot-fields-tile-min-height);
    min-width: 0;
    overflow: hidden;
    padding: var(--tot-fields-tile-padding-block) var(--tot-fields-tile-padding-inline);
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
    gap: var(--tot-fields-gap);
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) var(--tot-fields-remove-size);
    max-width: 100%;
    min-width: 0;
  }

  .field-input {
    display: block;
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }

  .field-input::part(control) {
    border-radius: var(--tot-input-border-radius-small, var(--tot-border-radius-small, 3px));
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
    height: var(--tot-fields-remove-size);
    justify-content: center;
    line-height: 1;
    opacity: 0;
    padding: 0;
    pointer-events: none;
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) color,
      var(--tot-transition-fast, 150ms) opacity;
    width: var(--tot-fields-remove-size);
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

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${fieldsStyle}</style>
      <div class="fields fields--small" part="base" role="list">
        <div class="fields__rows"></div>
      </div>
    `

    this._baseElement = root.querySelector('.fields')
    this._rowsElement = root.querySelector('.fields__rows')

    this._baseElement.addEventListener('click', event => this._handleClick(event))
    this._baseElement.addEventListener('focusin', event => this._handleFocusIn(event))
    this._baseElement.addEventListener('focusout', event => this._handleFocusOut(event))
    this._baseElement.addEventListener('input', event => this._handleInput(event))
    this._baseElement.addEventListener('keydown', event => this._handleKeyDown(event))
    this._baseElement.addEventListener('change', event => this._handleNativeChange(event))
    this._baseElement.addEventListener('mousedown', event => this._handleMouseDown(event))
  }

  get fields() {
    return rowsToFields(this._getRows())
  }

  set fields(value) {
    this._rows = normalizeRows(fieldsToRows(value))
    this._activeRowIndex = -1
    this._renderRows()
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
    this._syncAll()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'fields') {
      this._rows = null
      this._activeRowIndex = -1
      this._renderRows()
      return
    }

    if (name === 'readonly') {
      this._activeRowIndex = -1
      this._syncClasses()
      this._renderRows()
      return
    }

    if (name === 'disabled') {
      this._activeRowIndex = -1
      this._syncClasses()
      this._syncDisabledState()
      this._updateActiveRow()
      return
    }

    if (name === 'key-placeholder' || name === 'value-placeholder') {
      this._syncPlaceholders()
      return
    }

    if (name === 'size') {
      this._syncClasses()
      this._syncInputSize()
    }
  }

  focus(options) {
    const input = this.getInput(0, 'key')
    if (input) {
      input.focus(options)
    }
  }

  removeRowAt(index) {
    if (this.disabled || this.readonly) {
      return false
    }

    const rows = this._getRows()
    if (!Number.isInteger(index) || index < 0 || index >= rows.length || isEmptyRow(rows[index])) {
      return false
    }

    const removedRow = rows.splice(index, 1)[0]
    this._rows = normalizeRows(rows)
    this._activeRowIndex = Math.min(index, this._rows.length - 1)
    this._renderRows()
    this._restoreFocus(this._activeRowIndex, 'key')

    emit(this, 'change', {
      action: 'remove',
      index,
      field: cloneRow(removedRow),
      fields: this.fields,
    })
    return true
  }

  getBase() {
    return this._baseElement
  }

  getInput(index, fieldName) {
    return this._getInputControl(index, fieldName)?.getInput() || null
  }

  _syncAll() {
    this._syncClasses()
    this._renderRows()
  }

  _syncClasses() {
    const size = this.size
    this._baseElement.classList.remove(
      'fields--small',
      'fields--medium',
      'fields--large',
    )
    this._baseElement.classList.add(`fields--${size}`)
    this._baseElement.classList.toggle('fields--disabled', this.disabled)
    this._baseElement.classList.toggle('fields--readonly', this.readonly)
  }

  _renderRows() {
    const rows = this._getRows()
    const fragment = document.createDocumentFragment()

    if (this.readonly) {
      const readonlyRows = getNonEmptyRows(rows)
      for (let i = 0; i < readonlyRows.length; i++) {
        fragment.append(this._createReadonlyRow(readonlyRows[i], i))
      }
    } else {
      for (let i = 0; i < rows.length; i++) {
        fragment.append(this._createEditableRow(rows[i], i))
      }
    }

    this._rowsElement.replaceChildren(fragment)
    this._syncPlaceholders()
    this._syncDisabledState()
    this._updateActiveRow()
  }

  _createReadonlyRow(row, index) {
    const element = document.createElement('span')
    element.className = 'field-tile'
    element.dataset.index = String(index)
    element.setAttribute('part', 'field')
    element.setAttribute('role', 'listitem')
    element.title = `${row.key}: ${row.value}`

    const text = document.createElement('span')
    text.className = 'field-tile__text'
    text.setAttribute('part', 'field-text')

    const key = document.createElement('span')
    key.className = 'field-tile__key'
    key.setAttribute('part', 'field-key')
    key.textContent = row.key

    text.append(key, document.createTextNode(`: ${row.value}`))
    element.append(text)
    return element
  }

  _createEditableRow(row, index) {
    const element = document.createElement('div')
    element.className = 'field-row'
    element.dataset.index = String(index)
    element.setAttribute('part', 'row')
    element.setAttribute('role', 'listitem')
    element.classList.toggle('field-row--empty', isEmptyRow(row))

    const keyInput = this._createInput('key', row.key)
    const valueInput = this._createInput('value', row.value)
    const remove = document.createElement('button')
    remove.className = 'field-remove'
    remove.type = 'button'
    remove.tabIndex = -1
    remove.setAttribute('part', 'remove')
    remove.setAttribute('aria-label', 'Remove field')
    remove.textContent = '×'

    element.append(keyInput, valueInput, remove)
    return element
  }

  _createInput(fieldName, value) {
    const input = document.createElement('tot-input')
    input.className = `field-input field-input--${fieldName}`
    input.dataset.field = fieldName
    input.setAttribute('part', `${fieldName}-input`)
    input.size = this.size
    input.type = 'text'
    input.value = value
    return input
  }

  _syncPlaceholders() {
    const keys = this._rowsElement.querySelectorAll('.field-input--key')
    const values = this._rowsElement.querySelectorAll('.field-input--value')
    for (let i = 0; i < keys.length; i++) {
      keys[i].placeholder = this.keyPlaceholder
    }
    for (let i = 0; i < values.length; i++) {
      values[i].placeholder = this.valuePlaceholder
    }
  }

  _syncInputSize() {
    const inputs = this._rowsElement.querySelectorAll('.field-input')
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].size = this.size
    }
  }

  _syncDisabledState() {
    const disabled = this.disabled
    const rows = this._rowsElement.querySelectorAll('.field-row')
    for (let i = 0; i < rows.length; i++) {
      const inputs = rows[i].querySelectorAll('.field-input')
      for (let j = 0; j < inputs.length; j++) {
        inputs[j].disabled = disabled
      }

      const remove = rows[i].querySelector('.field-remove')
      if (remove) {
        remove.disabled = disabled || rows[i].classList.contains('field-row--empty')
      }
    }
  }

  _handleInput(event) {
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
    const rows = this._getRows()
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
      this._renderRows()
      this._restoreFocus(focusedIndex, fieldName, selection)
    } else {
      rowElement.classList.toggle('field-row--empty', isEmptyRow(editedField))
      const remove = rowElement.querySelector('.field-remove')
      if (remove) {
        remove.disabled = this.disabled || isEmptyRow(editedField)
      }
      this._updateActiveRow()
    }

    emit(this, 'change', this._getEventDetail('edit', rowIndex, fieldName, editedField))
  }

  _handleNativeChange(event) {
    if (closestElement(event.target, '.field-input')) {
      event.stopPropagation()
    }
  }

  _handleFocusIn(event) {
    const input = closestElement(event.target, '.field-input')
    if (!input || this.disabled || this.readonly) {
      return
    }

    this._activeRowIndex = getElementIndex(closestElement(input, '.field-row'))
    this._updateActiveRow()
  }

  _handleFocusOut(event) {
    if (this.disabled || this.readonly) {
      return
    }

    const nextInput = closestElement(event.relatedTarget, '.field-input')
    if (nextInput && this.shadowRoot?.contains(nextInput)) {
      return
    }

    this._activeRowIndex = -1
    this._updateActiveRow()
  }

  _handleKeyDown(event) {
    if (event.key !== 'Enter') {
      return
    }

    const input = closestElement(event.target, '.field-input')
    if (!input || this.disabled || this.readonly) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const rowIndex = getElementIndex(closestElement(input, '.field-row'))
    const fieldName = input.dataset.field === 'value' ? 'value' : 'key'
    this._focusNextRow(rowIndex, fieldName)
  }

  _handleClick(event) {
    if (this.disabled || this.readonly) {
      return
    }

    const removeButton = closestElement(event.target, '.field-remove')
    if (removeButton) {
      event.preventDefault()
      event.stopPropagation()
      this.removeRowAt(getElementIndex(closestElement(removeButton, '.field-row')))
      return
    }

    const rowElement = closestElement(event.target, '.field-row')
    this._activeRowIndex = rowElement ? getElementIndex(rowElement) : -1
    this._updateActiveRow()
  }

  _handleMouseDown(event) {
    if (closestElement(event.target, '.field-remove')) {
      event.preventDefault()
    }
  }

  _focusNextRow(rowIndex, fieldName) {
    const rows = this._getRows()
    const nextIndex = rowIndex + 1
    if (nextIndex >= rows.length) {
      return false
    }

    const input = this._getInputControl(nextIndex, fieldName)
    if (!input) {
      return false
    }

    this._activeRowIndex = isEmptyRow(rows[nextIndex]) ? -1 : nextIndex
    this._updateActiveRow()
    input.focus()
    input.select()
    return true
  }

  _getRows() {
    if (!this._rows) {
      this._rows = normalizeRows(fieldsToRows(this.getAttribute('fields')))
    }
    return cloneRows(this._rows)
  }

  _restoreFocus(index, fieldName, selection) {
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
    } catch {
    }
  }

  _getInputControl(index, fieldName) {
    const normalizedField = fieldName === 'value' ? 'value' : 'key'
    return this._rowsElement.querySelector(`.field-row[data-index="${index}"] .field-input[data-field="${normalizedField}"]`)
  }

  _updateActiveRow() {
    const rows = this._rowsElement.querySelectorAll('.field-row')
    const activeAllowed = !this.disabled && !this.readonly
    for (let i = 0; i < rows.length; i++) {
      const empty = rows[i].classList.contains('field-row--empty')
      rows[i].classList.toggle('field-row--active', activeAllowed && !empty && i === this._activeRowIndex)
    }
  }

  _getEventDetail(action, index, fieldName, field) {
    const rows = this._getRows()
    const safeIndex = Math.max(0, Math.min(index, rows.length - 1))
    return {
      action,
      fieldName,
      index,
      field: cloneRow(field || rows[safeIndex] || createEmptyRow()),
      fields: rowsToFields(rows),
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
  const nativeInput = input?.getInput?.() || input
  try {
    return {
      start: nativeInput.selectionStart,
      end: nativeInput.selectionEnd,
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


