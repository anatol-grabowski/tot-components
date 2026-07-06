const inputStyle = `
  :host {
    display: block;
    max-width: 100%;
    vertical-align: top;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .form-control {
    display: grid;
    gap: var(--tot-spacing-2x-small, .25rem);
    max-width: 100%;
    min-width: 0;
  }

  .label {
    color: var(--tot-input-label-color, inherit);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-label-font-size-medium, .875rem);
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .label:empty {
    display: none;
  }

  .input {
    --input-height: var(--tot-input-height-medium, 2.25rem);
    --input-spacing: var(--tot-input-spacing-medium, .75rem);
    --input-font-size: var(--tot-input-font-size-medium, .875rem);

    align-items: center;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
    color: var(--tot-input-color, #1e293b);
    display: flex;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--input-font-size);
    font-weight: var(--tot-input-font-weight, 400);
    gap: var(--tot-spacing-2x-small, .25rem);
    letter-spacing: var(--tot-input-letter-spacing, normal);
    height: var(--input-height);
    line-height: var(--tot-input-line-height, 1.25);
    min-height: var(--input-height);
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    padding: 0 var(--input-spacing);
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) box-shadow,
      var(--tot-transition-fast, 150ms) color;
    width: 100%;
  }

  .input--small {
    --input-height: var(--tot-input-height-small, 1.75rem);
    --input-spacing: var(--tot-input-spacing-small, .5rem);
    --input-font-size: var(--tot-input-font-size-small, .75rem);
  }

  .input--large {
    --input-height: var(--tot-input-height-large, 2.75rem);
    --input-spacing: var(--tot-input-spacing-large, 1rem);
    --input-font-size: var(--tot-input-font-size-large, 1rem);
  }

  .input:hover:not(.input--disabled) {
    background: var(--tot-input-background-color-hover, #fff);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
    color: var(--tot-input-color-hover, #0f172a);
  }

  .input:focus-within:not(.input--disabled) {
    background: var(--tot-input-background-color-focus, #fff);
    border-color: var(--tot-input-border-color-focus, var(--tot-color-primary-600, #0284c7));
    box-shadow: 0 0 0 var(--tot-input-focus-ring-offset, 0) var(--tot-input-focus-ring-color, hsl(198.6 88.7% 48.4% / 40%));
    color: var(--tot-input-color-focus, #0f172a);
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: 0;
  }

  .input--disabled {
    background: var(--tot-input-background-color-disabled, #f1f5f9);
    border-color: var(--tot-input-border-color-disabled, #cbd5e1);
    color: var(--tot-input-color-disabled, #64748b);
    cursor: not-allowed;
    opacity: .75;
  }

  .input__control {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    border: 0;
    color: inherit;
    flex: 1 1 auto;
    font: inherit;
    height: 100%;
    line-height: inherit;
    letter-spacing: inherit;
    min-width: 0;
    outline: none;
    padding: 0;
    width: 100%;
  }

  .input__control::placeholder {
    color: var(--tot-input-placeholder-color, #94a3b8);
    opacity: 1;
  }

  .input__control:disabled {
    color: var(--tot-input-color-disabled, #64748b);
    cursor: not-allowed;
    -webkit-text-fill-color: var(--tot-input-color-disabled, #64748b);
  }

  .input__control:disabled::placeholder {
    color: var(--tot-input-placeholder-color-disabled, #64748b);
  }

  .input__prefix,
  .input__suffix,
  .input__actions {
    align-items: center;
    color: var(--tot-input-icon-color, #64748b);
    display: inline-flex;
    flex: 0 0 auto;
    min-width: 0;
  }

  .input__prefix,
  .input__suffix {
    display: none;
  }

  .input--has-prefix .input__prefix,
  .input--has-suffix .input__suffix {
    display: inline-flex;
  }

  .input__actions {
    gap: var(--tot-spacing-3x-small, .125rem);
    margin-inline-end: 0;
  }

  .input__button {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-icon-color, #64748b);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    height: 1.5em;
    justify-content: center;
    line-height: 1;
    padding: 0;
    width: 1.5em;
  }

  .input__button:hover:not(:disabled) {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .input__button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .input__button:disabled {
    cursor: not-allowed;
    opacity: .5;
  }

  .input__button[hidden] {
    display: none;
  }

  .help-text {
    color: var(--tot-input-help-text-color, var(--tot-color-neutral-600, #475569));
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-help-text-font-size-medium, .8125rem);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .help-text:empty {
    display: none;
  }

  .form-control--small .label {
    font-size: var(--tot-input-label-font-size-small, .8125rem);
  }

  .form-control--small .help-text {
    font-size: var(--tot-input-help-text-font-size-small, .75rem);
  }

  .form-control--large .label {
    font-size: var(--tot-input-label-font-size-large, 1rem);
  }

  .form-control--large .help-text {
    font-size: var(--tot-input-help-text-font-size-large, .875rem);
  }
`

const sizes = ['small', 'medium', 'large']

export class TotInput extends HTMLElement {
  static get observedAttributes() {
    return [
      'label',
      'help-text',
      'placeholder',
      'clearable',
      'password-toggle',
      'disabled',
      'size',
      'type',
      'value',
    ]
  }

  constructor() {
    super()
    this._value = null
    this._passwordVisible = false
    this._hasPrefix = false
    this._hasSuffix = false
  }

  get value() {
    const input = this.getInput()
    if (input) {
      return input.value
    }

    if (this._value !== null) {
      return this._value
    }

    return this.getAttribute('value') || ''
  }

  set value(value) {
    this._value = value === null || value === undefined ? '' : String(value)
    this.updateInputValue()
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

  get placeholder() {
    return this.getAttribute('placeholder') || ''
  }

  set placeholder(value) {
    setNullableAttribute(this, 'placeholder', value)
  }

  get clearable() {
    return this.hasAttribute('clearable')
  }

  set clearable(value) {
    setBooleanAttribute(this, 'clearable', value)
  }

  get passwordToggle() {
    return this.hasAttribute('password-toggle')
  }

  set passwordToggle(value) {
    setBooleanAttribute(this, 'password-toggle', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  get size() {
    return getSupportedValue(this.getAttribute('size'), sizes, 'medium')
  }

  set size(value) {
    this.setAttribute('size', getSupportedValue(value, sizes, 'medium'))
  }

  get type() {
    return this.getAttribute('type') || 'text'
  }

  set type(value) {
    setNullableAttribute(this, 'type', value)
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name) {
    if (name === 'value') {
      this._value = null
    }

    if (name === 'type') {
      this._passwordVisible = false
    }

    this.render()
  }

  focus(options) {
    const input = this.getInput()
    if (input) {
      input.focus(options)
    }
  }

  blur() {
    const input = this.getInput()
    if (input) {
      input.blur()
    }
  }

  select() {
    const input = this.getInput()
    if (input) {
      input.select()
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const size = this.size
    const disabled = this.disabled
    const clearable = this.clearable
    const passwordToggle = this.passwordToggle && this.type === 'password'
    const hasPrefix = this.hasNamedSlotContent('prefix')
    const hasSuffix = this.hasNamedSlotContent('suffix')
    const inputType = passwordToggle && this._passwordVisible ? 'text' : this.type
    const formClasses = ['form-control', `form-control--${size}`]
    const inputClasses = ['input', `input--${size}`]

    this._hasPrefix = hasPrefix
    this._hasSuffix = hasSuffix

    if (disabled) {
      inputClasses.push('input--disabled')
    }

    if (hasPrefix) {
      inputClasses.push('input--has-prefix')
    }

    if (hasSuffix) {
      inputClasses.push('input--has-suffix')
    }

    root.innerHTML = `<style>${inputStyle}</style>
      <label class="${escapeAttribute(formClasses.join(' '))}" part="form-control">
        <span class="label" part="form-control-label"><slot name="label">${escapeHtml(this.label)}</slot></span>
        <span class="${escapeAttribute(inputClasses.join(' '))}" part="base">
          <span class="input__prefix" part="prefix"><slot name="prefix"></slot></span>
          <input
            class="input__control"
            part="input"
            type="${escapeAttribute(inputType)}"
            value="${escapeAttribute(this.value)}"
            placeholder="${escapeAttribute(this.placeholder)}"
            ${disabled ? 'disabled' : ''}
          >
          <span class="input__suffix" part="suffix"><slot name="suffix"></slot></span>
          <span class="input__actions" part="actions">
            <button class="input__button input__clear-button" type="button" aria-label="Clear input" ${clearable ? '' : 'hidden'} ${disabled ? 'disabled' : ''}>×</button>
            <button class="input__button input__password-button" type="button" aria-label="${this._passwordVisible ? 'Hide password' : 'Show password'}" ${passwordToggle ? '' : 'hidden'} ${disabled ? 'disabled' : ''}>${this._passwordVisible ? '🙈' : '👁'}</button>
          </span>
        </span>
        <span class="help-text" part="form-control-help-text"><slot name="help-text">${escapeHtml(this.helpText)}</slot></span>
      </label>
    `

    const input = root.querySelector('.input__control')
    const prefixSlot = root.querySelector('slot[name="prefix"]')
    const suffixSlot = root.querySelector('slot[name="suffix"]')
    const clearButton = root.querySelector('.input__clear-button')
    const passwordButton = root.querySelector('.input__password-button')

    input.addEventListener('input', () => {
      this._value = input.value
      this.updateClearButton()
      emit(this, 'input', this.getEventDetail())
    })

    input.addEventListener('change', () => {
      this._value = input.value
      emit(this, 'change', this.getEventDetail())
    })

    clearButton.addEventListener('mousedown', (event) => event.preventDefault())
    clearButton.addEventListener('click', () => this.handleClear())
    passwordButton.addEventListener('mousedown', (event) => event.preventDefault())
    passwordButton.addEventListener('click', () => this.handlePasswordToggle())
    prefixSlot.addEventListener('slotchange', () => this.handleSlotChange())
    suffixSlot.addEventListener('slotchange', () => this.handleSlotChange())
    this.updateClearButton()
  }

  handleClear() {
    if (this.disabled) {
      return
    }

    const input = this.getInput()
    if (!input) {
      return
    }

    input.value = ''
    this._value = ''
    this.updateClearButton()
    input.focus()
    emit(this, 'input', this.getEventDetail())
    emit(this, 'change', this.getEventDetail())
    emit(this, 'clear', this.getEventDetail())
  }

  handlePasswordToggle() {
    if (this.disabled || this.type !== 'password') {
      return
    }

    this._passwordVisible = !this._passwordVisible
    const input = this.getInput()
    const button = this.shadowRoot?.querySelector('.input__password-button')
    if (input) {
      input.type = this._passwordVisible ? 'text' : 'password'
      input.focus()
    }

    if (button) {
      button.setAttribute('aria-label', this._passwordVisible ? 'Hide password' : 'Show password')
      button.textContent = this._passwordVisible ? '🙈' : '👁'
    }
  }

  handleSlotChange() {
    const hasPrefix = this.hasNamedSlotContent('prefix')
    const hasSuffix = this.hasNamedSlotContent('suffix')
    if (hasPrefix !== this._hasPrefix || hasSuffix !== this._hasSuffix) {
      this.render()
    }
  }

  updateInputValue() {
    const input = this.getInput()
    if (input) {
      input.value = this._value === null ? this.value : this._value
      this.updateClearButton()
    }
  }

  updateClearButton() {
    const clearButton = this.shadowRoot?.querySelector('.input__clear-button')
    if (!clearButton) {
      return
    }

    clearButton.hidden = !this.clearable || this.disabled || this.value.length === 0
  }

  getInput() {
    return this.shadowRoot?.querySelector('.input__control')
  }

  getEventDetail() {
    return {
      value: this.value,
      size: this.size,
      type: this.type,
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
