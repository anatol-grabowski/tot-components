const messageStyle = `
  :host {
    display: block;
    margin-inline-start: 1.125rem;
  }

  :host([no-symbol]),
  :host([nosymbol]) {
    margin-inline-start: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .message {
    --message-accent-color: var(--tot-message-info-accent-color, var(--tot-color-sky-600, #0284c7));
    --message-background-color: var(--tot-message-info-background-color, var(--tot-color-sky-50, #f0f9ff));
    --message-border-color: var(--tot-message-info-border-color, var(--tot-color-sky-200, #bae6fd));
    --message-color: var(--tot-message-info-color, var(--tot-color-sky-900, #0c4a6e));

    background: var(--message-background-color);
    border: var(--tot-panel-border-width, 1px) solid var(--message-border-color);
    border-inline-start: .25rem solid var(--message-accent-color);
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--message-color);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    line-height: var(--tot-line-height-dense, 1.45);
    min-width: 0;
    overflow: visible;
    padding-inline-start: var(--tot-spacing-medium, 1rem);
    padding-inline-end: var(--tot-spacing-medium, 1rem);
    padding-block-start: var(--tot-spacing-2x-small, .625rem);
    padding-block-end: var(--tot-spacing-2x-small, .625rem);
    // padding: 0 var(--tot-spacing-medium, 1rem) var(--tot-spacing-small, .625rem) calc(var(--tot-spacing-medium, 1rem) + 1.25rem);
    position: relative;
  }

  .message--success {
    --message-accent-color: var(--tot-message-success-accent-color, var(--tot-color-emerald-700, #047857));
    --message-background-color: var(--tot-message-success-background-color, var(--tot-color-emerald-50, #ecfdf5));
    --message-border-color: var(--tot-message-success-border-color, var(--tot-color-emerald-200, #a7f3d0));
    --message-color: var(--tot-message-success-color, var(--tot-color-emerald-900, #064e3b));
  }

  .message--info {
    --message-accent-color: var(--tot-message-info-accent-color, var(--tot-color-sky-600, #0284c7));
    --message-background-color: var(--tot-message-info-background-color, var(--tot-color-sky-50, #f0f9ff));
    --message-border-color: var(--tot-message-info-border-color, var(--tot-color-sky-200, #bae6fd));
    --message-color: var(--tot-message-info-color, var(--tot-color-sky-900, #0c4a6e));
  }

  .message--warning {
    --message-accent-color: var(--tot-message-warning-accent-color, var(--tot-color-amber-600, #d97706));
    --message-background-color: var(--tot-message-warning-background-color, var(--tot-color-amber-50, #fffbeb));
    --message-border-color: var(--tot-message-warning-border-color, var(--tot-color-amber-200, #fde68a));
    --message-color: var(--tot-message-warning-color, var(--tot-color-amber-950, #451a03));
  }

  .message--error {
    --message-accent-color: var(--tot-message-error-accent-color, var(--tot-color-red-600, #dc2626));
    --message-background-color: var(--tot-message-error-background-color, var(--tot-color-red-50, #fef2f2));
    --message-border-color: var(--tot-message-error-border-color, var(--tot-color-red-300, #fca5a5));
    --message-color: var(--tot-message-error-color, var(--tot-color-red-800, #991b1b));
  }

  .message__symbol {
    align-items: center;
    background: var(--message-accent-color);
    border-radius: var(--tot-border-radius-circle, 50%);
    color: var(--tot-color-neutral-0, #fff);
    display: inline-flex;
    font-size: .8125rem;
    font-weight: var(--tot-font-weight-bold, 700);
    height: 1.3rem;
    justify-content: center;
    left: 0;
    line-height: 1;
    position: absolute;
    top: 50%;
    transform: translate(calc(-50% - 0.125rem), -50%);
    width: 1.3rem;
  }

  .message__symbol[hidden] {
    display: none;
  }

  .message--no-symbol {
    padding-inline-start: var(--tot-spacing-x-small, 1rem);
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
    return ['type', 'content', 'text', 'symbol', 'no-symbol', 'nosymbol']
  }

  get type() {
    return getSupportedValue(this.getAttribute('type') || 'info', messageTypes, 'info')
  }

  set type(value) {
    setNullableAttribute(this, 'type', value)
  }

  get content() {
    return this.getAttribute('content') || this.getAttribute('text') || ''
  }

  set content(value) {
    setNullableAttribute(this, 'content', value)
  }

  get symbol() {
    return this.getAttribute('symbol') || messageSymbols[this.type] || messageSymbols.info
  }

  set symbol(value) {
    setNullableAttribute(this, 'symbol', value)
  }

  get noSymbol() {
    return this.hasAttribute('no-symbol') || this.hasAttribute('nosymbol')
  }

  set noSymbol(value) {
    setBooleanAttribute(this, 'no-symbol', value)
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const type = this.type
    const role = type === 'error' || type === 'warning' ? 'alert' : 'status'
    const classes = ['message', `message--${type}`]

    if (this.noSymbol) {
      classes.push('message--no-symbol')
    }

    root.innerHTML = `<style>${messageStyle}</style>
      <div class="${escapeAttribute(classes.join(' '))}" part="base" role="${role}">
        <span class="message__symbol" part="symbol" aria-hidden="true" ${this.noSymbol ? 'hidden' : ''}>${escapeHtml(this.symbol)}</span>
        <div class="message__content" part="content"><slot>${escapeHtml(this.content)}</slot></div>
      </div>
    `
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
