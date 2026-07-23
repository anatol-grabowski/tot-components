const detailsStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .details {
    background: var(--tot-panel-background-color, #fff);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
    border-radius: var(--tot-border-radius-large, 6px);
    color: var(--tot-color-neutral-900, #0f172a);
    display: block;
    font-family: var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif);
    max-width: 100%;
    overflow: hidden;
  }

  :host([flat]) .details {
    border: 0;
    border-radius: 0;
  }

  .details__header {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    color: inherit;
    cursor: pointer;
    display: flex;
    font: inherit;
    gap: var(--tot-spacing-x-small, .5rem);
    justify-content: space-between;
    line-height: 1.35;
    list-style: none;
    min-height: var(--tot-input-height-medium, 2.25rem);
    padding: var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem);
    text-align: start;
    width: 100%;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:hover {
    background: var(--tot-color-neutral-50, #f8fafc);
  }

  .details__header:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: calc(-1 * var(--tot-focus-ring-offset, 1px));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
    opacity: .65;
  }

  .details--disabled .details__header:hover {
    background: transparent;
  }

  .details__summary {
    flex: 1 1 auto;
    font-weight: var(--tot-font-weight-semibold, 600);
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .details__summary-icon {
    align-items: center;
    color: var(--tot-color-neutral-500, #64748b);
    display: inline-flex;
    flex: 0 0 auto;
    height: 1rem;
    justify-content: center;
    line-height: 1;
    width: 1rem;
  }

  .details__expand-icon,
  .details__collapse-icon {
    align-items: center;
    display: none;
    height: 100%;
    justify-content: center;
    width: 100%;
  }

  .details__summary-icon svg {
    display: block;
    fill: none;
    height: 100%;
    stroke: currentColor;
    width: 100%;
  }

  .details:not([open]) .details__expand-icon,
  .details[open] .details__collapse-icon {
    display: inline-flex;
  }

  .details__content {
    border-top: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
    color: var(--tot-color-neutral-800, #1e293b);
    line-height: var(--tot-line-height-normal, 1.4);
    padding: var(--tot-spacing-small, .75rem);
  }
`

export class TotDetails extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'summary', 'content', 'disabled']
  }

  constructor() {
    super()
    this._lastReportedOpen = false

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${detailsStyle}</style>
      <details class="details" part="base">
        <summary class="details__header" part="header">
          <span class="details__summary" part="summary"><slot name="summary"></slot></span>
          <span class="details__summary-icon" part="summary-icon" aria-hidden="true">
            <span class="details__expand-icon" part="expand-icon">
              <slot name="expand-icon">
                <svg viewBox="0 0 16 16" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">
                  <path d="m6.25 4.5 3.5 3.5-3.5 3.5"></path>
                </svg>
              </slot>
            </span>
            <span class="details__collapse-icon" part="collapse-icon">
              <slot name="collapse-icon">
                <svg viewBox="0 0 16 16" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">
                  <path d="m4.5 6.25 3.5 3.5 3.5-3.5"></path>
                </svg>
              </slot>
            </span>
          </span>
        </summary>
        <div class="details__content" part="content"><slot><span class="details__content-fallback"></span></slot></div>
      </details>
    `

    this._detailsElement = root.querySelector('.details')
    this._summaryElement = root.querySelector('.details__header')
    this._summarySlot = root.querySelector('slot[name="summary"]')
    this._contentFallback = root.querySelector('.details__content-fallback')

    this._detailsElement.addEventListener('toggle', () => this._handleToggle())
    this._summaryElement.addEventListener('click', event => this._handleSummaryClick(event))
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    setBooleanAttribute(this, 'open', value)
  }

  get summary() {
    return this.getAttribute('summary') || ''
  }

  set summary(value) {
    setNullableAttribute(this, 'summary', value)
  }

  get content() {
    return this.getAttribute('content') || ''
  }

  set content(value) {
    setNullableAttribute(this, 'content', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  get flat() {
    return this.hasAttribute('flat')
  }

  set flat(value) {
    setBooleanAttribute(this, 'flat', value)
  }

  connectedCallback() {
    this._syncAll()
    this._lastReportedOpen = this.open
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'open') {
      this._syncOpen()
    } else if (name === 'summary') {
      this._syncSummary()
    } else if (name === 'content') {
      this._syncContent()
    } else if (name === 'disabled') {
      this._syncDisabled()
    }
  }

  show() {
    this.open = true
  }

  hide() {
    this.open = false
  }

  toggle() {
    if (!this.disabled) {
      this.open = !this.open
    }
  }

  focus(options) {
    this._summaryElement.focus(options)
  }

  blur() {
    this._summaryElement.blur()
  }

  getDetails() {
    return this._detailsElement
  }

  getSummary() {
    return this._summaryElement
  }

  _syncAll() {
    this._syncOpen()
    this._syncSummary()
    this._syncContent()
    this._syncDisabled()
  }

  _syncOpen() {
    if (this._detailsElement.open !== this.open) {
      this._detailsElement.open = this.open
    }
  }

  _syncSummary() {
    this._summarySlot.textContent = this.summary
  }

  _syncContent() {
    this._contentFallback.textContent = this.content
  }

  _syncDisabled() {
    const disabled = this.disabled
    this._detailsElement.classList.toggle('details--disabled', disabled)
    this._summaryElement.setAttribute('aria-disabled', disabled ? 'true' : 'false')
    this._summaryElement.tabIndex = disabled ? -1 : 0
  }

  _handleToggle() {
    const open = this._detailsElement.open
    if (this.open !== open) {
      setBooleanAttribute(this, 'open', open)
    }

    if (open === this._lastReportedOpen) {
      return
    }

    this._lastReportedOpen = open
    this.dispatchEvent(new Event('toggle', {
      bubbles: true,
      composed: true,
    }))
  }

  _handleSummaryClick(event) {
    if (this.disabled) {
      event.preventDefault()
    }
  }
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
