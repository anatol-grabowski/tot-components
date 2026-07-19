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

  .details__header {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    display: flex;
    font: inherit;
    gap: var(--tot-spacing-x-small, .5rem);
    justify-content: space-between;
    line-height: 1.35;
    min-height: var(--tot-input-height-medium, 2.25rem);
    padding: var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem);
    text-align: start;
    width: 100%;
  }

  .details__header:hover:not(:disabled) {
    background: var(--tot-color-neutral-50, #f8fafc);
  }

  .details__header:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: calc(-1 * var(--tot-focus-ring-offset, 1px));
  }

  .details__header:disabled {
    cursor: not-allowed;
    opacity: .65;
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

  .details:not(.details--open) .details__expand-icon,
  .details--open .details__collapse-icon {
    display: inline-flex;
  }

  .details__content {
    border-top: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
    color: var(--tot-color-neutral-800, #1e293b);
    display: none;
    line-height: var(--tot-line-height-normal, 1.4);
    padding: var(--tot-spacing-small, .75rem);
  }

  .details--open .details__content {
    display: block;
  }
`

export class TotDetails extends HTMLElement {
  static get observedAttributes() {
    return [
      'open',
      'summary',
      'disabled',
    ]
  }

  constructor() {
    super()
    this._afterTimer = null
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    this.setOpen(value === true || value === '' || value === 'open', true)
  }

  get summary() {
    return this.getAttribute('summary') || ''
  }

  set summary(value) {
    setNullableAttribute(this, 'summary', value)
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

  disconnectedCallback() {
    this.clearAfterTimer()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    this.render()
  }

  show() {
    this.setOpen(true, true)
  }

  hide() {
    this.setOpen(false, true)
  }

  focus(options) {
    const button = this.getHeaderButton()
    if (button) {
      button.focus(options)
    }
  }

  blur() {
    const button = this.getHeaderButton()
    if (button) {
      button.blur()
    }
  }

  render() {
    const root = this.getRoot()
    const open = this.open
    const disabled = this.disabled
    const summary = this.summary
    const classes = [
      'details',
    ]

    if (open) {
      classes.push('details--open')
    }

    if (disabled) {
      classes.push('details--disabled')
    }

    root.innerHTML = `<style>${detailsStyle}</style>
      <div class="${escapeAttribute(classes.join(' '))}" part="base">
        <button
          class="details__header"
          part="header"
          type="button"
          aria-expanded="${open ? 'true' : 'false'}"
          ${disabled ? 'disabled' : ''}
        >
          <span class="details__summary" part="summary"><slot name="summary">${escapeHtml(summary)}</slot></span>
          <span class="details__summary-icon" part="summary-icon" aria-hidden="true">
            <span class="details__expand-icon">
              <slot name="expand-icon">
                <svg viewBox="0 0 16 16" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" focusable="false">
                  <path d="m6.25 4.5 3.5 3.5-3.5 3.5"></path>
                </svg>
              </slot>
            </span>
            <span class="details__collapse-icon">
              <slot name="collapse-icon">
                <svg viewBox="0 0 16 16" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" focusable="false">
                  <path d="m4.5 6.25 3.5 3.5 3.5-3.5"></path>
                </svg>
              </slot>
            </span>
          </span>
        </button>
        <div class="details__content" part="content" aria-hidden="${open ? 'false' : 'true'}">
          <slot></slot>
        </div>
      </div>
    `

    const button = this.getHeaderButton()
    button.addEventListener('click', () => {
      this.toggle()
    })
  }

  toggle() {
    if (this.disabled) {
      return
    }

    this.setOpen(!this.open, true)
  }

  setOpen(value, emitEvents) {
    const nextOpen = value === true || value === '' || value === 'open'
    if (nextOpen === this.open) {
      return
    }

    setBooleanAttribute(this, 'open', nextOpen)

    if (emitEvents) {
      this.emitOpenEvents(nextOpen)
    }
  }

  emitOpenEvents(open) {
    this.clearAfterTimer()
    emit(this, open ? 'show' : 'hide')
    this._afterTimer = window.setTimeout(() => {
      emit(this, open ? 'after-show' : 'after-hide')
      this._afterTimer = null
    }, 150)
  }

  clearAfterTimer() {
    if (this._afterTimer !== null) {
      window.clearTimeout(this._afterTimer)
      this._afterTimer = null
    }
  }

  getHeaderButton() {
    return this.shadowRoot?.querySelector('.details__header')
  }

  getRoot() {
    return this.shadowRoot || this.attachShadow({ mode: 'open' })
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
