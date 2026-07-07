const stripeStatusStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .stripe {
    --stripe-accent-color: var(--tot-color-primary-600, #0284c7);
    --stripe-background-color: var(--tot-panel-background-color, #fff);
    --stripe-border-color: var(--tot-panel-border-color, #e2e8f0);
    --stripe-color: var(--tot-input-color, #1e293b);

    align-items: center;
    background: var(--stripe-background-color);
    border: var(--tot-panel-border-width, 1px) solid var(--stripe-border-color);
    border-radius: var(--tot-border-radius-large, 8px);
    color: var(--stripe-color);
    display: grid;
    font-family: var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif);
    gap: var(--tot-spacing-small, .75rem);
    grid-template-columns: auto minmax(0, 1fr);
    line-height: var(--tot-line-height-normal, 1.45);
    max-width: 100%;
    min-width: 0;
    padding: var(--tot-spacing-medium, 1rem);
  }

  .stripe--idle {
    --stripe-accent-color: var(--tot-color-neutral-600, #475569);
  }

  .stripe--processing {
    --stripe-accent-color: var(--tot-color-primary-600, #0284c7);
  }

  .stripe--success {
    --stripe-accent-color: var(--tot-color-success-600, #16a34a);
    --stripe-border-color: var(--tot-color-success-200, #bbf7d0);
  }

  .stripe--cancelled {
    --stripe-accent-color: var(--tot-color-warning-600, #d97706);
    --stripe-border-color: var(--tot-color-warning-200, #fde68a);
  }

  .stripe--error {
    --stripe-accent-color: var(--tot-color-danger-600, #dc2626);
    --stripe-border-color: var(--tot-color-danger-200, #fecaca);
  }

  .stripe__icon {
    align-items: center;
    background: color-mix(in srgb, var(--stripe-accent-color) 12%, transparent);
    border: var(--tot-panel-border-width, 1px) solid color-mix(in srgb, var(--stripe-accent-color) 35%, transparent);
    border-radius: var(--tot-border-radius-circle, 50%);
    color: var(--stripe-accent-color);
    display: inline-flex;
    font-size: 1.2rem;
    font-weight: var(--tot-font-weight-bold, 700);
    height: 2.35rem;
    justify-content: center;
    line-height: 1;
    width: 2.35rem;
  }

  .stripe__spinner {
    animation: stripe-spin 900ms linear infinite;
    border: .18rem solid color-mix(in srgb, var(--stripe-accent-color) 18%, transparent);
    border-top-color: var(--stripe-accent-color);
    border-radius: 50%;
    display: inline-flex;
    height: 1.25rem;
    width: 1.25rem;
  }

  @keyframes stripe-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .stripe__body {
    display: grid;
    gap: var(--tot-spacing-2x-small, .25rem);
    min-width: 0;
  }

  .stripe__title {
    font-size: var(--tot-font-size-medium, 1rem);
    font-weight: var(--tot-font-weight-semibold, 600);
    line-height: 1.25;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .stripe__message,
  .stripe__meta {
    color: var(--tot-input-help-text-color, #64748b);
    font-size: var(--tot-font-size-small, .875rem);
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .stripe__meta:empty,
  .stripe__message:empty {
    display: none;
  }

  .stripe__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--tot-spacing-x-small, .5rem);
    margin-top: var(--tot-spacing-x-small, .5rem);
  }

  .stripe__actions[hidden] {
    display: none;
  }

  .stripe__button {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-input-border-radius-medium, 4px);
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-weight: var(--tot-font-weight-semibold, 600);
    gap: var(--tot-spacing-2x-small, .25rem);
    justify-content: center;
    min-height: var(--tot-input-height-medium, 2.25rem);
    min-width: 0;
    padding: 0 var(--tot-input-spacing-medium, .75rem);
  }

  .stripe__button:hover {
    background: var(--tot-input-background-color-hover, #f8fafc);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
  }

  .stripe__button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .stripe__button--primary {
    background: var(--stripe-accent-color);
    border-color: var(--stripe-accent-color);
    color: var(--tot-color-neutral-0, #fff);
  }

  .stripe__button--primary:hover {
    background: color-mix(in srgb, var(--stripe-accent-color) 88%, #fff);
    border-color: color-mix(in srgb, var(--stripe-accent-color) 88%, #000);
    color: var(--tot-color-neutral-0, #fff);
  }

  slot[name="actions"]::slotted(*) {
    margin: 0;
  }
`

const statuses = ['idle', 'processing', 'success', 'cancelled', 'canceled', 'error']

const statusDefaults = {
  idle: {
    icon: '•',
    title: 'Payment status',
    message: 'No payment is being processed right now.',
  },
  processing: {
    icon: '',
    title: 'Processing payment',
    message: 'Please wait while the payment result is confirmed.',
  },
  success: {
    icon: '✓',
    title: 'Payment complete',
    message: 'Your payment was completed successfully.',
  },
  cancelled: {
    icon: '!',
    title: 'Payment cancelled',
    message: 'The checkout was cancelled before payment was completed.',
  },
  error: {
    icon: '×',
    title: 'Payment problem',
    message: 'Something went wrong while handling the payment.',
  },
}

export class TotStripe extends HTMLElement {
  static get observedAttributes() {
    return [
      'status',
      'session-id',
      'message',
      'detail',
      'action-label',
      'retry-label',
      'show-actions',
      'processing',
      'success',
      'cancelled',
      'canceled',
      'error',
      'from-url',
    ]
  }

  get status() {
    if (this.hasAttribute('processing')) {
      return 'processing'
    }

    if (this.hasAttribute('success')) {
      return 'success'
    }

    if (this.hasAttribute('cancelled') || this.hasAttribute('canceled')) {
      return 'cancelled'
    }

    if (this.hasAttribute('error')) {
      return 'error'
    }

    const value = getSupportedValue(this.getAttribute('status') || 'idle', statuses, 'idle')
    return value === 'canceled' ? 'cancelled' : value
  }

  set status(value) {
    setNullableAttribute(this, 'status', normalizeStatus(value))
  }

  get sessionId() {
    return this.getAttribute('session-id') || ''
  }

  set sessionId(value) {
    setNullableAttribute(this, 'session-id', value)
  }

  get message() {
    return this.getAttribute('message') || ''
  }

  set message(value) {
    setNullableAttribute(this, 'message', value)
  }

  get detail() {
    return this.getAttribute('detail') || ''
  }

  set detail(value) {
    setNullableAttribute(this, 'detail', value)
  }

  get actionLabel() {
    return this.getAttribute('action-label') || 'Continue'
  }

  set actionLabel(value) {
    setNullableAttribute(this, 'action-label', value)
  }

  get retryLabel() {
    return this.getAttribute('retry-label') || 'Try again'
  }

  set retryLabel(value) {
    setNullableAttribute(this, 'retry-label', value)
  }

  get showActions() {
    return this.hasAttribute('show-actions')
  }

  set showActions(value) {
    setBooleanAttribute(this, 'show-actions', value)
  }

  connectedCallback() {
    if (this.hasAttribute('from-url')) {
      applyUrlStatus(this)
    }

    this.render()
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render()
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const status = this.status
    const defaults = statusDefaults[status]
    const message = this.message || defaults.message
    const detail = this.detail || (this.sessionId ? `Session ${this.sessionId}` : '')
    const iconHtml = status === 'processing'
      ? '<span class="stripe__spinner" part="spinner" aria-hidden="true"></span>'
      : `<slot name="icon">${escapeHtml(defaults.icon)}</slot>`

    root.innerHTML = `<style>${stripeStatusStyle}</style>
      <section class="stripe stripe--${escapeAttribute(status)}" part="base" role="${status === 'error' ? 'alert' : 'status'}" aria-live="polite">
        <div class="stripe__icon" part="icon">${iconHtml}</div>
        <div class="stripe__body" part="body">
          <div class="stripe__title" part="title"><slot name="title">${escapeHtml(defaults.title)}</slot></div>
          <div class="stripe__message" part="message"><slot>${escapeHtml(message)}</slot></div>
          <div class="stripe__meta" part="meta"><slot name="detail">${escapeHtml(detail)}</slot></div>
          <div class="stripe__actions" part="actions" ${this.showActions ? '' : 'hidden'}>
            <slot name="actions">
              ${status === 'cancelled' || status === 'error' ? `<button class="stripe__button" part="retry-button" type="button" data-action="retry">${escapeHtml(this.retryLabel)}</button>` : ''}
              <button class="stripe__button stripe__button--primary" part="continue-button" type="button" data-action="continue">${escapeHtml(this.actionLabel)}</button>
            </slot>
          </div>
        </div>
      </section>
    `

    const buttons = root.querySelectorAll('[data-action]')
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', event => {
        const action = event.currentTarget.dataset.action
        this.dispatchEvent(new CustomEvent(action, {
          bubbles: true,
          composed: true,
          detail: {
            status,
            sessionId: this.sessionId,
          },
        }))
      })
    }
  }
}

function applyUrlStatus(element) {
  const params = new URLSearchParams(window.location.search)
  const status = getUrlStatus(params)
  const sessionId = params.get('session_id') || params.get('checkout_session_id') || ''
  const error = params.get('error_description') || params.get('error') || ''

  if (status !== 'idle' && !element.hasAttribute('status')) {
    element.status = status
  }

  if (sessionId && !element.hasAttribute('session-id')) {
    element.sessionId = sessionId
  }

  if (error && !element.hasAttribute('detail')) {
    element.detail = error
  }
}

function getUrlStatus(params) {
  const value = (
    params.get('stripe_status') ||
    params.get('payment_status') ||
    params.get('checkout_status') ||
    params.get('status') ||
    params.get('payment') ||
    params.get('checkout') ||
    ''
  ).toLowerCase()

  if (['success', 'succeeded', 'complete', 'completed', 'paid'].includes(value)) {
    return 'success'
  }

  if (['cancelled', 'canceled', 'cancel'].includes(value)) {
    return 'cancelled'
  }

  if (['processing', 'pending'].includes(value)) {
    return 'processing'
  }

  if (['error', 'failed', 'failure'].includes(value) || params.get('error')) {
    return 'error'
  }

  if (params.get('session_id') || params.get('checkout_session_id')) {
    return 'processing'
  }

  return 'idle'
}

function normalizeStatus(value) {
  const status = getSupportedValue(String(value || 'idle'), statuses, 'idle')
  return status === 'canceled' ? 'cancelled' : status
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
  if (value === null || value === undefined || value === '') {
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
