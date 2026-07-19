const horizontalSelectStyle = `
  :host {
    display: block;
    max-width: 100%;
    vertical-align: top;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .select {
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    gap: var(--tot-spacing-2x-small, .25rem);
    max-width: 100%;
    min-width: 0;
  }

  .label {
    color: var(--tot-input-label-color, inherit);
    font-size: var(--tot-input-label-font-size-medium, .875rem);
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .label[hidden],
  .help-text[hidden] {
    display: none;
  }

  .scroller {
    max-width: 100%;
    min-width: 0;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
  }

  .options {
    display: inline-flex;
    flex-wrap: nowrap;
    max-width: 100%;
    min-width: max-content;
    vertical-align: top;
  }

  .option {
    --option-height: var(--tot-input-height-medium, 2.25rem);
    --option-spacing: var(--tot-spacing-2x-small, .25rem);
    --option-edge-spacing: calc(var(--option-spacing) + var(--tot-spacing-3x-small, .125rem));
    --option-font-size: var(--tot-input-font-size-medium, .875rem);

    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: 0;
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: inline-flex;
    flex: 0 0 auto;
    font: inherit;
    font-size: var(--option-font-size);
    font-weight: var(--tot-input-font-weight, 400);
    height: var(--option-height);
    justify-content: center;
    letter-spacing: var(--tot-input-letter-spacing, normal);
    line-height: var(--tot-input-line-height, 1.25);
    min-width: var(--tot-horizontal-select-option-min-width, 0);
    padding-block: 0;
    padding-inline: var(--option-edge-spacing);
    position: relative;
    text-align: center;
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) color,
      var(--tot-transition-fast, 150ms) box-shadow;
    user-select: none;
    white-space: nowrap;
  }

  .option + .option {
    margin-inline-start: calc(-1 * var(--tot-input-border-width, 1px));
  }

  .option:first-child {
    border-bottom-left-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
    border-top-left-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
  }

  .option:last-child {
    border-bottom-right-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
    border-top-right-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
  }

  .select--small .option {
    --option-height: var(--tot-input-height-small, 1.75rem);
    --option-spacing: var(--tot-spacing-3x-small, .125rem);
    --option-font-size: var(--tot-input-font-size-small, .75rem);
  }

  .select--large .option {
    --option-height: var(--tot-input-height-large, 2.75rem);
    --option-spacing: var(--tot-spacing-x-small, .5rem);
    --option-font-size: var(--tot-input-font-size-large, 1rem);
  }

  .option:hover:not(:disabled):not(.option--selected) {
    background: var(--tot-input-background-color-hover, #f8fafc);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
    color: var(--tot-input-color-hover, #0f172a);
    z-index: 1;
  }

  .option:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: -1px;
    z-index: 2;
  }

  .option--selected {
    background: var(--tot-color-primary-600, #0284c7);
    border-color: var(--tot-color-primary-600, #0284c7);
    color: var(--tot-color-neutral-0, #fff);
    z-index: 1;
  }

  .select--multiple .option--selected + .option--selected {
    border-left-color: color-mix(in srgb, var(--tot-color-neutral-0, #fff) 72%, var(--tot-color-primary-600, #0284c7));
  }

  .option:disabled {
    cursor: not-allowed;
    opacity: .55;
  }

  .help-text {
    color: var(--tot-input-help-text-color, var(--tot-color-neutral-600, #475569));
    font-size: var(--tot-input-help-text-font-size-medium, .8125rem);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .select--small .label {
    font-size: var(--tot-input-label-font-size-small, .8125rem);
  }

  .select--small .help-text {
    font-size: var(--tot-input-help-text-font-size-small, .75rem);
  }

  .select--large .label {
    font-size: var(--tot-input-label-font-size-large, 1rem);
  }

  .select--large .help-text {
    font-size: var(--tot-input-help-text-font-size-large, .875rem);
  }
`

const sizes = ['small', 'medium', 'large']

export class TotHorizontalSelect extends HTMLElement {
  static get observedAttributes() {
    return [
      'items',
      'value',
      'values',
      'label',
      'help-text',
      'size',
      'multiple',
      'disabled',
    ]
  }

  constructor() {
    super()
    this._items = null
    this._selectedValues = null
  }

  get items() {
    if (this._items) {
      return cloneItems(this._items)
    }
    return parseItems(this.getAttribute('items'))
  }

  set items(value) {
    this._items = parseItems(value)
    this.requestRender()
  }

  get value() {
    const values = this.selectedValues
    return values.length > 0 ? values[0] : ''
  }

  set value(value) {
    this._selectedValues = value === null || value === undefined || value === '' ? [] : [String(value)]
    this.requestRender()
  }

  get values() {
    return this.selectedValues
  }

  set values(value) {
    this._selectedValues = parseValues(value)
    this.requestRender()
  }

  get selectedValues() {
    if (this._selectedValues) {
      return this._selectedValues.slice()
    }

    if (this.multiple) {
      const values = parseValues(this.getAttribute('values'))
      return values.length > 0 ? values : getSelectedValuesFromItems(this.items)
    }

    const value = this.getAttribute('value')
    if (value !== null) {
      return value === '' ? [] : [value]
    }

    return getSelectedValuesFromItems(this.items).slice(0, 1)
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  get helpText() {
    return this.getAttribute('help-text') || ''
  }

  set helpText(value) {
    setNullableAttribute(this, 'help-text', value)
  }

  get size() {
    return getSupportedValue(this.getAttribute('size'), sizes, 'medium')
  }

  set size(value) {
    this.setAttribute('size', getSupportedValue(value, sizes, 'medium'))
  }

  get multiple() {
    return this.hasAttribute('multiple')
  }

  set multiple(value) {
    setBooleanAttribute(this, 'multiple', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name) {
    if (name === 'items') {
      this._items = null
    }

    if (name === 'value' || name === 'values') {
      this._selectedValues = null
    }

    this.requestRender()
  }

  focus(options) {
    const buttons = this.getEnabledButtons()
    if (buttons.length === 0) {
      return
    }

    const selectedValue = this.value
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].dataset.value === selectedValue) {
        buttons[i].focus(options)
        return
      }
    }

    buttons[0].focus(options)
  }

  blur() {
    this.shadowRoot?.activeElement?.blur?.()
  }

  getButtons() {
    return this.shadowRoot ? Array.from(this.shadowRoot.querySelectorAll('.option')) : []
  }

  requestRender() {
    if (this.isConnected) {
      this.render()
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const previousScrollLeft = root.querySelector('.scroller')?.scrollLeft || 0
    const previousFocusedValue = root.activeElement?.dataset?.value || ''
    const size = this.size
    const multiple = this.multiple
    const disabled = this.disabled
    const items = this.items
    const selectedValues = this.selectedValues
    const focusableValue = getFocusableValue(items, selectedValues, disabled)
    const hasLabel = Boolean(this.label) || this.hasNamedSlotContent('label')
    const hasHelpText = Boolean(this.helpText) || this.hasNamedSlotContent('help-text')
    const classes = ['select', `select--${size}`]
    const buttons = []

    if (multiple) {
      classes.push('select--multiple')
    }

    if (disabled) {
      classes.push('select--disabled')
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const selected = selectedValues.includes(item.value)
      const itemDisabled = disabled || item.disabled
      const buttonClasses = ['option']

      if (selected) {
        buttonClasses.push('option--selected')
      }

      buttons.push(`<button
        class="${escapeAttribute(buttonClasses.join(' '))}"
        part="option"
        type="button"
        role="option"
        aria-selected="${selected ? 'true' : 'false'}"
        data-value="${escapeAttribute(item.value)}"
        tabindex="${!itemDisabled && item.value === focusableValue ? '0' : '-1'}"
        ${itemDisabled ? 'disabled' : ''}
      >${escapeHtml(item.label)}</button>`)
    }

    root.innerHTML = `<style>${horizontalSelectStyle}</style>
      <div class="${escapeAttribute(classes.join(' '))}" part="base">
        <span id="label" class="label" part="label" ${hasLabel ? '' : 'hidden'}><slot name="label">${escapeHtml(this.label)}</slot></span>
        <div class="scroller" part="scroller">
          <div
            class="options"
            part="options"
            role="listbox"
            aria-multiselectable="${multiple ? 'true' : 'false'}"
            aria-disabled="${disabled ? 'true' : 'false'}"
            ${hasLabel ? 'aria-labelledby="label"' : ''}
            ${hasHelpText ? 'aria-describedby="help-text"' : ''}
          >${buttons.join('')}</div>
        </div>
        <span id="help-text" class="help-text" part="help-text" ${hasHelpText ? '' : 'hidden'}><slot name="help-text">${escapeHtml(this.helpText)}</slot></span>
      </div>
    `

    const scroller = root.querySelector('.scroller')
    const options = root.querySelector('.options')
    const labelSlot = root.querySelector('slot[name="label"]')
    const helpTextSlot = root.querySelector('slot[name="help-text"]')

    scroller.scrollLeft = previousScrollLeft
    options.addEventListener('click', (event) => this.handleClick(event))
    options.addEventListener('keydown', (event) => this.handleKeyDown(event))
    labelSlot.addEventListener('slotchange', () => this.syncTextVisibility('label'))
    helpTextSlot.addEventListener('slotchange', () => this.syncTextVisibility('help-text'))

    requestAnimationFrame(() => {
      scroller.scrollLeft = previousScrollLeft
      if (previousFocusedValue) {
        this.focusButton(previousFocusedValue)
      }
    })
  }

  handleClick(event) {
    const button = event.target?.closest?.('.option')
    if (!button || button.disabled || this.disabled) {
      return
    }

    this.toggleValue(button.dataset.value)
  }

  handleKeyDown(event) {
    if (this.disabled) {
      return
    }

    const buttons = this.getEnabledButtons()
    if (buttons.length === 0) {
      return
    }

    const active = this.shadowRoot?.activeElement
    let next = null

    if (event.key === 'ArrowRight') {
      next = getRelativeButton(buttons, active, 1)
    } else if (event.key === 'ArrowLeft') {
      next = getRelativeButton(buttons, active, -1)
    } else if (event.key === 'Home') {
      next = buttons[0]
    } else if (event.key === 'End') {
      next = buttons[buttons.length - 1]
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (active && active.classList.contains('option')) {
        active.click()
        event.preventDefault()
      }
      return
    }

    if (next) {
      next.focus()
      event.preventDefault()
    }
  }

  toggleValue(value) {
    if (!value) {
      return
    }

    const item = this.getItemByValue(value)
    if (!item || item.disabled || this.disabled) {
      return
    }

    let nextValues = this.selectedValues

    if (this.multiple) {
      const index = nextValues.indexOf(value)
      if (index >= 0) {
        nextValues.splice(index, 1)
      } else {
        nextValues.push(value)
      }
    } else {
      if (nextValues[0] === value) {
        return
      }
      nextValues = [value]
    }

    this._selectedValues = nextValues
    this.render()
    dispatchComposedEvent(this, 'change')
  }

  getItemByValue(value) {
    const items = this.items
    for (let i = 0; i < items.length; i++) {
      if (items[i].value === value) {
        return items[i]
      }
    }
    return null
  }

  getEnabledButtons() {
    const buttons = this.getButtons()
    const enabled = []
    for (let i = 0; i < buttons.length; i++) {
      if (!buttons[i].disabled) {
        enabled.push(buttons[i])
      }
    }
    return enabled
  }

  focusButton(value) {
    const buttons = this.getButtons()
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].dataset.value === value && !buttons[i].disabled) {
        buttons[i].focus()
        return
      }
    }
  }

  syncTextVisibility(name) {
    const selector = name === 'label' ? '.label' : '.help-text'
    const element = this.shadowRoot?.querySelector(selector)
    const listbox = this.shadowRoot?.querySelector('.options')
    const hasContent = Boolean(this.getAttribute(name)) || this.hasNamedSlotContent(name)

    if (element) {
      element.hidden = !hasContent
    }

    if (listbox) {
      const ariaAttribute = name === 'label' ? 'aria-labelledby' : 'aria-describedby'
      if (hasContent) {
        listbox.setAttribute(ariaAttribute, name)
      } else {
        listbox.removeAttribute(ariaAttribute)
      }
    }
  }

  hasNamedSlotContent(name) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].slot === name) {
        return true
      }
    }
    return false
  }
}

function getFocusableValue(items, selectedValues, disabled) {
  if (disabled) {
    return ''
  }

  for (let i = 0; i < selectedValues.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (items[j].value === selectedValues[i] && !items[j].disabled) {
        return items[j].value
      }
    }
  }

  for (let i = 0; i < items.length; i++) {
    if (!items[i].disabled) {
      return items[i].value
    }
  }

  return ''
}

function getRelativeButton(buttons, active, step) {
  if (!active || !buttons.includes(active)) {
    return step > 0 ? buttons[0] : buttons[buttons.length - 1]
  }

  const index = buttons.indexOf(active)
  return buttons[(index + step + buttons.length) % buttons.length]
}

function parseItems(value) {
  if (value === null || value === undefined || value === '') {
    return []
  }

  let source = value
  if (typeof value === 'string') {
    source = parseJson(value, [])
  }

  if (!Array.isArray(source)) {
    return []
  }

  const items = []
  for (let i = 0; i < source.length; i++) {
    const item = normalizeItem(source[i])
    if (item) {
      items.push(item)
    }
  }
  return items
}

function normalizeItem(item) {
  if (typeof item === 'string') {
    return {
      value: item,
      label: item,
      disabled: false,
      selected: false,
    }
  }

  if (!item || typeof item !== 'object') {
    return null
  }

  const label = String(item.label ?? item.text ?? item.value ?? item.id ?? '')
  const value = String(item.value ?? item.id ?? label)
  if (!value && !label) {
    return null
  }

  return {
    value,
    label,
    disabled: Boolean(item.disabled),
    selected: Boolean(item.selected || item.checked),
  }
}

function cloneItems(items) {
  return parseItems(items)
}

function parseValues(value) {
  if (value === null || value === undefined || value === '') {
    return []
  }

  if (Array.isArray(value)) {
    const values = []
    for (let i = 0; i < value.length; i++) {
      values.push(String(value[i]))
    }
    return values
  }

  if (typeof value === 'string') {
    const parsed = parseJson(value, null)
    if (Array.isArray(parsed)) {
      return parseValues(parsed)
    }

    const values = []
    const parts = value.split(',')
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim()
      if (part) {
        values.push(part)
      }
    }
    return values
  }

  return [String(value)]
}

function getSelectedValuesFromItems(items) {
  const values = []
  for (let i = 0; i < items.length; i++) {
    if (items[i].selected) {
      values.push(items[i].value)
    }
  }
  return values
}

function dispatchComposedEvent(element, name) {
  element.dispatchEvent(new Event(name, {
    bubbles: true,
    composed: true,
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

function parseJson(value, fallback) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
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
