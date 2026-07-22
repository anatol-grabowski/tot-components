const messageStyle = `
  :host {
    display: block;
    margin-inline-start: 1.125rem;
  }

  :host([no-symbol]) {
    margin-inline-start: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .message {
    --tot-message-current-accent-color: var(--tot-message-info-accent-color, var(--tot-color-sky-600, #0284c7));
    --tot-message-current-background-color: var(--tot-message-info-background-color, var(--tot-color-sky-50, #f0f9ff));
    --tot-message-current-border-color: var(--tot-message-info-border-color, var(--tot-color-sky-200, #bae6fd));
    --tot-message-current-color: var(--tot-message-info-color, var(--tot-color-sky-900, #0c4a6e));

    background: var(--tot-message-current-background-color);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-message-current-border-color);
    border-inline-start: .25rem solid var(--tot-message-current-accent-color);
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--tot-message-current-color);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    line-height: var(--tot-line-height-dense, 1.45);
    min-width: 0;
    overflow: visible;
    padding: var(--tot-spacing-2x-small, .625rem) var(--tot-spacing-medium, 1rem);
    position: relative;
  }

  .message--success {
    --tot-message-current-accent-color: var(--tot-message-success-accent-color, var(--tot-color-emerald-700, #047857));
    --tot-message-current-background-color: var(--tot-message-success-background-color, var(--tot-color-emerald-50, #ecfdf5));
    --tot-message-current-border-color: var(--tot-message-success-border-color, var(--tot-color-emerald-200, #a7f3d0));
    --tot-message-current-color: var(--tot-message-success-color, var(--tot-color-emerald-900, #064e3b));
  }

  .message--warning {
    --tot-message-current-accent-color: var(--tot-message-warning-accent-color, var(--tot-color-amber-600, #d97706));
    --tot-message-current-background-color: var(--tot-message-warning-background-color, var(--tot-color-amber-50, #fffbeb));
    --tot-message-current-border-color: var(--tot-message-warning-border-color, var(--tot-color-amber-200, #fde68a));
    --tot-message-current-color: var(--tot-message-warning-color, var(--tot-color-amber-950, #451a03));
  }

  .message--error {
    --tot-message-current-accent-color: var(--tot-message-error-accent-color, var(--tot-color-red-600, #dc2626));
    --tot-message-current-background-color: var(--tot-message-error-background-color, var(--tot-color-red-50, #fef2f2));
    --tot-message-current-border-color: var(--tot-message-error-border-color, var(--tot-color-red-300, #fca5a5));
    --tot-message-current-color: var(--tot-message-error-color, var(--tot-color-red-800, #991b1b));
  }

  .message__symbol {
    align-items: center;
    background: var(--tot-message-current-accent-color);
    border-radius: var(--tot-border-radius-circle, 50%);
    color: var(--tot-color-neutral-0, #fff);
    display: inline-flex;
    font-size: .8125rem;
    font-weight: var(--tot-font-weight-bold, 700);
    height: 1.3rem;
    justify-content: center;
    inset-inline-start: 0;
    line-height: 1;
    position: absolute;
    top: 50%;
    transform: translate(calc(-50% - .125rem), -50%);
    width: 1.3rem;
  }

  :host(:dir(rtl)) .message__symbol {
    transform: translate(calc(50% + .125rem), -50%);
  }

  .message__symbol[hidden] {
    display: none;
  }

  .message__content {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .message__content ::slotted(*) {
    margin-top: 0;
  }

  .message__content ::slotted(:last-child) {
    margin-bottom: 0;
  }
`

const messageTypes = ['success', 'info', 'warning', 'error']
const messageSymbols = {
  success: '✓',
  info: 'i',
  warning: '!',
  error: '×',
}

export class TotMessage extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'content', 'symbol', 'no-symbol']
  }

  constructor() {
    super()

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${messageStyle}</style>
      <div class="message message--info" part="base" role="status">
        <span class="message__symbol" part="symbol" aria-hidden="true"></span>
        <div class="message__content" part="content"><slot></slot></div>
      </div>
    `

    this._baseElement = root.querySelector('.message')
    this._symbolElement = root.querySelector('.message__symbol')
    this._contentElement = root.querySelector('.message__content')
    this._contentSlot = root.querySelector('slot')
  }

  get type() {
    return getSupportedValue(this.getAttribute('type'), messageTypes, 'info')
  }

  set type(value) {
    setNullableAttribute(this, 'type', value)
  }

  get content() {
    return this.getAttribute('content') || ''
  }

  set content(value) {
    setNullableAttribute(this, 'content', value)
  }

  get symbol() {
    return this.getAttribute('symbol') || messageSymbols[this.type]
  }

  set symbol(value) {
    setNullableAttribute(this, 'symbol', value)
  }

  get noSymbol() {
    return this.hasAttribute('no-symbol')
  }

  set noSymbol(value) {
    setBooleanAttribute(this, 'no-symbol', value)
  }

  connectedCallback() {
    this._syncAll()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'type') {
      this._syncType()
      if (!this.hasAttribute('symbol')) {
        this._syncSymbol()
      }
    } else if (name === 'content') {
      this._syncContent()
    } else if (name === 'symbol') {
      this._syncSymbol()
    } else if (name === 'no-symbol') {
      this._syncSymbolVisibility()
    }
  }

  getBase() {
    return this._baseElement
  }

  getSymbol() {
    return this._symbolElement
  }

  getContent() {
    return this._contentElement
  }

  _syncAll() {
    this._syncType()
    this._syncContent()
    this._syncSymbol()
    this._syncSymbolVisibility()
  }

  _syncType() {
    const type = this.type
    for (let i = 0; i < messageTypes.length; i++) {
      this._baseElement.classList.toggle(`message--${messageTypes[i]}`, type === messageTypes[i])
    }

    this._baseElement.setAttribute('role', type === 'warning' || type === 'error' ? 'alert' : 'status')
  }

  _syncContent() {
    this._contentSlot.textContent = this.content
  }

  _syncSymbol() {
    this._symbolElement.textContent = this.symbol
  }

  _syncSymbolVisibility() {
    this._symbolElement.hidden = this.noSymbol
  }
}

function getSupportedValue(value, supportedValues, fallback) {
  for (let i = 0; i < supportedValues.length; i++) {
    if (supportedValues[i] === value) {
      return value
    }
  }

  return fallback
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
