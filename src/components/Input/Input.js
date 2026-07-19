const inputStyle = `
  :host {
    display: block;
    max-width: 100%;
    vertical-align: top;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .input-wrap {
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

  .label[hidden],
  .help-text[hidden] {
    display: none;
  }

  .input {
    --input-height: var(--tot-input-height-medium, 2.25rem);
    --input-spacing: var(--tot-spacing-2x-small, .25rem);
    --input-edge-spacing: calc(var(--input-spacing) + var(--tot-spacing-3x-small, .125rem));
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
    padding-block: 0;
    padding-inline: var(--input-edge-spacing);
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) box-shadow,
      var(--tot-transition-fast, 150ms) color;
    width: 100%;
  }

  .input--small {
    --input-height: var(--tot-input-height-small, 1.75rem);
    --input-spacing: var(--tot-spacing-3x-small, .125rem);
    --input-font-size: var(--tot-input-font-size-small, .75rem);
  }

  .input--large {
    --input-height: var(--tot-input-height-large, 2.75rem);
    --input-spacing: var(--tot-spacing-x-small, .5rem);
    --input-font-size: var(--tot-input-font-size-large, 1rem);
  }

  .input--has-actions {
    padding-inline-end: var(--input-spacing);
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
  }

  .input__actions[hidden] {
    display: none;
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

  .input__button svg {
    display: block;
    height: 1.15em;
    pointer-events: none;
    stroke: currentColor;
    width: 1.15em;
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

  .input-wrap--small .label {
    font-size: var(--tot-input-label-font-size-small, .8125rem);
  }

  .input-wrap--small .help-text {
    font-size: var(--tot-input-help-text-font-size-small, .75rem);
  }

  .input-wrap--large .label {
    font-size: var(--tot-input-label-font-size-large, 1rem);
  }

  .input-wrap--large .help-text {
    font-size: var(--tot-input-help-text-font-size-large, .875rem);
  }
`

const showPasswordIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"></path>
    <circle cx="12" cy="12" r="2.75"></circle>
  </svg>
`

const hidePasswordIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 3l18 18"></path>
    <path d="M10.6 6.2A10.5 10.5 0 0 1 12 6c6 0 9.5 6 9.5 6a17.4 17.4 0 0 1-3.1 3.8"></path>
    <path d="M6.2 6.2C3.8 8 2.5 12 2.5 12s3.5 6 9.5 6c1.2 0 2.3-.2 3.3-.6"></path>
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"></path>
  </svg>
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
  }

  get value() {
    const input = this.getInput()
    if (input) {
      return input.value
    }

    return this._value ?? this.getAttribute('value') ?? ''
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

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'value') {
      this._value = null
    }

    if (name === 'type') {
      this._passwordVisible = false
    }

    if (!this.isConnected) {
      return
    }

    if (name === 'value') {
      this.updateInputValue()
    } else {
      this.render()
    }
  }

  click() {
    const input = this.getInput()
    if (input) {
      input.click()
    }
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

  getInput() {
    return this.shadowRoot?.querySelector('.input__control') || null
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const size = this.size
    const disabled = this.disabled
    const passwordToggle = this.passwordToggle && this.type === 'password'
    const inputType = passwordToggle && this._passwordVisible ? 'text' : this.type
    const wrapClasses = ['input-wrap', `input-wrap--${size}`]
    const inputClasses = ['input', `input--${size}`]
    const hasLabel = Boolean(this.label) || this.hasNamedSlotContent('label')
    const hasHelpText = Boolean(this.helpText) || this.hasNamedSlotContent('help-text')
    const showClearButton = this.clearable && !disabled && this.value.length > 0
    const hasActions = showClearButton || passwordToggle

    if (disabled) {
      inputClasses.push('input--disabled')
    }

    if (this.hasNamedSlotContent('prefix')) {
      inputClasses.push('input--has-prefix')
    }

    if (this.hasNamedSlotContent('suffix')) {
      inputClasses.push('input--has-suffix')
    }

    if (hasActions) {
      inputClasses.push('input--has-actions')
    }

    root.innerHTML = `<style>${inputStyle}</style>
      <div class="${escapeAttribute(wrapClasses.join(' '))}" part="base">
        <label class="label" part="label" for="control" ${hasLabel ? '' : 'hidden'}><slot name="label">${escapeHtml(this.label)}</slot></label>
        <span class="${escapeAttribute(inputClasses.join(' '))}" part="control">
          <span class="input__prefix" part="prefix"><slot name="prefix"></slot></span>
          <input
            id="control"
            class="input__control"
            part="input"
            type="${escapeAttribute(inputType)}"
            value="${escapeAttribute(this.value)}"
            placeholder="${escapeAttribute(this.placeholder)}"
            ${hasHelpText ? 'aria-describedby="help-text"' : ''}
            ${disabled ? 'disabled' : ''}
          >
          <span class="input__suffix" part="suffix"><slot name="suffix"></slot></span>
          <span class="input__actions" part="actions" ${hasActions ? '' : 'hidden'}>
            <button class="input__button input__clear-button" part="clear-button" type="button" aria-label="Clear input" ${showClearButton ? '' : 'hidden'} ${disabled ? 'disabled' : ''}>×</button>
            <button class="input__button input__password-button" part="password-button" type="button" aria-label="${this._passwordVisible ? 'Hide password' : 'Show password'}" aria-pressed="${String(this._passwordVisible)}" ${passwordToggle ? '' : 'hidden'} ${disabled ? 'disabled' : ''}>${getPasswordIcon(this._passwordVisible)}</button>
          </span>
        </span>
        <span id="help-text" class="help-text" part="help-text" ${hasHelpText ? '' : 'hidden'}><slot name="help-text">${escapeHtml(this.helpText)}</slot></span>
      </div>
    `

    const base = root.querySelector('.input')
    const input = this.getInput()
    const labelSlot = root.querySelector('slot[name="label"]')
    const prefixSlot = root.querySelector('slot[name="prefix"]')
    const suffixSlot = root.querySelector('slot[name="suffix"]')
    const helpTextSlot = root.querySelector('slot[name="help-text"]')
    const clearButton = root.querySelector('.input__clear-button')
    const passwordButton = root.querySelector('.input__password-button')

    base.addEventListener('click', (event) => {
      if (!event.target?.closest?.('button')) {
        input.focus()
      }
    })
    input.addEventListener('input', (event) => {
      this._value = input.value
      this.updateClearButton()
      this.forwardEventIfNeeded(event)
    })
    input.addEventListener('change', (event) => {
      this._value = input.value
      this.forwardEventIfNeeded(event)
    })
    clearButton.addEventListener('mousedown', (event) => event.preventDefault())
    clearButton.addEventListener('click', () => this.handleClear())
    passwordButton.addEventListener('mousedown', (event) => event.preventDefault())
    passwordButton.addEventListener('click', () => this.handlePasswordToggle())
    labelSlot.addEventListener('slotchange', () => this.syncTextVisibility('label'))
    prefixSlot.addEventListener('slotchange', () => this.syncSlotVisibility('prefix'))
    suffixSlot.addEventListener('slotchange', () => this.syncSlotVisibility('suffix'))
    helpTextSlot.addEventListener('slotchange', () => this.syncTextVisibility('help-text'))
    this.updateClearButton()
  }

  handleClear() {
    if (this.disabled) {
      return
    }

    const input = this.getInput()
    if (!input || input.value.length === 0) {
      return
    }

    input.value = ''
    this._value = ''
    this.updateClearButton()
    input.focus()
    dispatchComposedEvent(input, 'input')
    dispatchComposedEvent(input, 'change')
    dispatchComposedEvent(this, 'clear')
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
      button.setAttribute('aria-pressed', String(this._passwordVisible))
      button.innerHTML = getPasswordIcon(this._passwordVisible)
    }
  }

  syncSlotVisibility(name) {
    const base = this.shadowRoot?.querySelector('.input')
    if (base) {
      base.classList.toggle(`input--has-${name}`, this.hasNamedSlotContent(name))
    }
  }

  syncTextVisibility(name) {
    const selector = name === 'label' ? '.label' : '.help-text'
    const element = this.shadowRoot?.querySelector(selector)
    const hasContent = Boolean(this.getAttribute(name)) || this.hasNamedSlotContent(name)

    if (element) {
      element.hidden = !hasContent
    }

    if (name === 'help-text') {
      const input = this.getInput()
      if (input) {
        if (hasContent) {
          input.setAttribute('aria-describedby', 'help-text')
        } else {
          input.removeAttribute('aria-describedby')
        }
      }
    }
  }

  updateInputValue() {
    const input = this.getInput()
    if (input) {
      input.value = this._value ?? this.getAttribute('value') ?? ''
      this.updateClearButton()
    }
  }

  updateClearButton() {
    const input = this.getInput()
    const actions = this.shadowRoot?.querySelector('.input__actions')
    const clearButton = this.shadowRoot?.querySelector('.input__clear-button')
    const passwordButton = this.shadowRoot?.querySelector('.input__password-button')
    if (!input || !actions || !clearButton || !passwordButton) {
      return
    }

    clearButton.hidden = !this.clearable || this.disabled || input.value.length === 0
    actions.hidden = clearButton.hidden && passwordButton.hidden
    actions.closest('.input')?.classList.toggle('input--has-actions', !actions.hidden)
  }

  forwardEventIfNeeded(event) {
    if (!event.composed) {
      dispatchComposedEvent(this, event.type)
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

function getPasswordIcon(passwordVisible) {
  return passwordVisible ? hidePasswordIcon : showPasswordIcon
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
