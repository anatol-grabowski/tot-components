const notificationStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  :host(:not([open])) {
    display: none;
  }

  :host([toast]) {
    width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .notification {
    --notification-accent-color: var(--tot-notification-primary-accent-color, var(--tot-color-primary-600, #0284c7));
    --notification-background-color: var(--tot-notification-primary-background-color, var(--tot-color-primary-50, #f0f9ff));
    --notification-border-color: var(--tot-notification-primary-border-color, var(--tot-color-primary-200, #bae6fd));
    --notification-color: var(--tot-notification-primary-color, var(--tot-color-primary-900, #0c4a6e));

    background: var(--notification-background-color);
    border: var(--tot-panel-border-width, 1px) solid var(--notification-border-color);
    border-radius: var(--tot-border-radius-large, 8px);
    color: var(--notification-color);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    gap: var(--tot-spacing-small, .75rem);
    grid-template-columns: auto minmax(0, 1fr) auto;
    line-height: var(--tot-line-height-dense, 1.45);
    min-width: 0;
    overflow: hidden;
    padding: var(--tot-spacing-small, .75rem);
    position: relative;
    width: 100%;
  }

  .notification--success {
    --notification-accent-color: var(--tot-notification-success-accent-color, var(--tot-color-success-600, #16a34a));
    --notification-background-color: var(--tot-notification-success-background-color, var(--tot-color-success-50, #f0fdf4));
    --notification-border-color: var(--tot-notification-success-border-color, var(--tot-color-success-200, #bbf7d0));
    --notification-color: var(--tot-notification-success-color, var(--tot-color-success-900, #14532d));
  }

  .notification--neutral {
    --notification-accent-color: var(--tot-notification-neutral-accent-color, var(--tot-color-neutral-600, #475569));
    --notification-background-color: var(--tot-notification-neutral-background-color, var(--tot-color-neutral-50, #f8fafc));
    --notification-border-color: var(--tot-notification-neutral-border-color, var(--tot-color-neutral-200, #e2e8f0));
    --notification-color: var(--tot-notification-neutral-color, var(--tot-color-neutral-900, #0f172a));
  }

  .notification--warning {
    --notification-accent-color: var(--tot-notification-warning-accent-color, var(--tot-color-warning-600, #d97706));
    --notification-background-color: var(--tot-notification-warning-background-color, var(--tot-color-warning-50, #fffbeb));
    --notification-border-color: var(--tot-notification-warning-border-color, var(--tot-color-warning-200, #fde68a));
    --notification-color: var(--tot-notification-warning-color, var(--tot-color-warning-950, #451a03));
  }

  .notification--danger {
    --notification-accent-color: var(--tot-notification-danger-accent-color, var(--tot-color-danger-600, #dc2626));
    --notification-background-color: var(--tot-notification-danger-background-color, var(--tot-color-danger-50, #fef2f2));
    --notification-border-color: var(--tot-notification-danger-border-color, var(--tot-color-danger-200, #fecaca));
    --notification-color: var(--tot-notification-danger-color, var(--tot-color-danger-900, #7f1d1d));
  }

  .notification__icon {
    align-items: center;
    color: var(--notification-accent-color);
    display: inline-flex;
    font-size: 1.125rem;
    justify-content: center;
    line-height: 1;
    min-height: 1.25rem;
    min-width: 1.25rem;
  }

  .notification:not(.notification--has-icon) .notification__icon {
    display: none;
  }

  .notification__message {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .notification__message ::slotted(*) {
    margin-top: 0;
  }

  .notification__message ::slotted(:last-child) {
    margin-bottom: 0;
  }

  .notification__close {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-medium, 4px);
    color: currentColor;
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-size: 1.25rem;
    height: 1.625rem;
    justify-content: center;
    line-height: 1;
    margin: -.1875rem -.25rem -.1875rem 0;
    opacity: .72;
    padding: 0;
    width: 1.625rem;
  }

  .notification__close:hover {
    background: color-mix(in srgb, var(--notification-accent-color) 12%, transparent);
    opacity: 1;
  }

  .notification__close:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .notification:not(.notification--closable) .notification__close {
    display: none;
  }

  .notification__countdown {
    background: var(--notification-accent-color);
    bottom: 0;
    display: none;
    height: .1875rem;
    opacity: .55;
    position: absolute;
    width: var(--notification-countdown-percent, 100%);
  }

  .notification--countdown-ltr .notification__countdown {
    display: block;
    left: 0;
    right: auto;
  }

  .notification--countdown-rtl .notification__countdown {
    display: block;
    left: auto;
    right: 0;
  }
`

const toastStackStyle = `
  .tot-notification-toast-stack {
    display: grid;
    gap: var(--tot-spacing-x-small, .5rem);
    max-width: calc(100vw - 2 * var(--tot-spacing-small, .75rem));
    pointer-events: none;
    position: fixed;
    right: max(var(--tot-spacing-medium, 1rem), env(safe-area-inset-right));
    top: max(var(--tot-spacing-medium, 1rem), env(safe-area-inset-top));
    width: min(var(--tot-notification-toast-width, 26rem), calc(100vw - 2 * var(--tot-spacing-small, .75rem)));
    z-index: var(--tot-z-index-toast, 1400);
  }

  .tot-notification-toast-stack > tot-notification {
    pointer-events: auto;
  }

  @media (max-width: 520px) {
    .tot-notification-toast-stack {
      left: max(var(--tot-spacing-small, .75rem), env(safe-area-inset-left));
      right: max(var(--tot-spacing-small, .75rem), env(safe-area-inset-right));
      top: max(var(--tot-spacing-small, .75rem), env(safe-area-inset-top));
      width: auto;
    }
  }
`

const variants = ['primary', 'success', 'neutral', 'warning', 'danger']
const countdownDirections = ['ltr', 'rtl']

export class TotNotification extends HTMLElement {
  static get observedAttributes() {
    return [
      'open',
      'closable',
      'variant',
      'duration',
      'countdown',
      'content',
      'text',
      'close-label',
    ]
  }

  constructor() {
    super()
    this._hasIcon = false
    this._autoHideTimer = 0
    this._afterTimer = 0
    this._countdownFrame = 0
    this._countdownStartedAt = 0
    this._isInteracting = false
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    setBooleanAttribute(this, 'open', value)
  }

  get closable() {
    return this.hasAttribute('closable')
  }

  set closable(value) {
    setBooleanAttribute(this, 'closable', value)
  }

  get variant() {
    return getSupportedValue(this.getAttribute('variant') || 'primary', variants, 'primary')
  }

  set variant(value) {
    setNullableAttribute(this, 'variant', value)
  }

  get duration() {
    const rawValue = this.getAttribute('duration')
    if (rawValue === null || rawValue === '') {
      return Infinity
    }

    const value = Number(rawValue)
    return Number.isFinite(value) && value > 0 ? value : Infinity
  }

  set duration(value) {
    setNullableAttribute(this, 'duration', value)
  }

  get countdown() {
    if (!this.hasAttribute('countdown')) {
      return ''
    }

    const value = this.getAttribute('countdown') || 'ltr'
    return getSupportedValue(value, countdownDirections, 'ltr')
  }

  set countdown(value) {
    setNullableAttribute(this, 'countdown', value)
  }

  get content() {
    return this.getAttribute('content') || this.getAttribute('text') || ''
  }

  set content(value) {
    setNullableAttribute(this, 'content', value)
  }

  get closeLabel() {
    return this.getAttribute('close-label') || 'Close'
  }

  set closeLabel(value) {
    setNullableAttribute(this, 'close-label', value)
  }

  connectedCallback() {
    this.render()
    this.syncTimer()
  }

  disconnectedCallback() {
    this.clearAutoHideTimer()
    this.clearAfterTimer()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    this.render()
    this.syncTimer()

    if (name === 'open' && this.isConnected) {
      this.emitOpenEvents(newValue !== null)
    }
  }

  show() {
    this.open = true
  }

  hide() {
    this.open = false
  }

  toast() {
    const stack = getToastStack()
    this.setAttribute('toast', '')
    stack.append(this)
    this.show()
    this.syncTimer()

    return new Promise((resolve) => {
      this.addEventListener('after-hide', () => {
        this.removeAttribute('toast')
        this.remove()
        cleanupToastStack()
        resolve()
      }, { once: true })
    })
  }

  focus(options) {
    const base = this.getBase()
    if (base) {
      base.focus(options)
    }
  }

  blur() {
    const base = this.getBase()
    if (base) {
      base.blur()
    }
  }

  render() {
    const root = this.getRoot()
    const variant = this.variant
    const countdown = this.countdown
    const role = variant === 'danger' || variant === 'warning' ? 'alert' : 'status'
    const classes = [
      'notification',
      `notification--${variant}`,
    ]

    if (this.closable) {
      classes.push('notification--closable')
    }

    if (this._hasIcon) {
      classes.push('notification--has-icon')
    }

    if (countdown) {
      classes.push(`notification--countdown-${countdown}`)
    }

    root.innerHTML = `<style>${notificationStyle}</style>
      <div
        class="${escapeAttribute(classes.join(' '))}"
        part="base"
        role="${role}"
        aria-live="${role === 'alert' ? 'assertive' : 'polite'}"
        tabindex="-1"
      >
        <span class="notification__icon" part="icon" aria-hidden="true"><slot name="icon"></slot></span>
        <div class="notification__message" part="message"><slot>${escapeHtml(this.content)}</slot></div>
        <button class="notification__close" part="close-button" type="button" aria-label="${escapeAttribute(this.closeLabel)}">
          <slot name="close-icon">×</slot>
        </button>
        <div class="notification__countdown" part="countdown" aria-hidden="true"></div>
      </div>
    `

    const iconSlot = root.querySelector('slot[name="icon"]')
    const closeButton = root.querySelector('.notification__close')
    const base = this.getBase()

    iconSlot.addEventListener('slotchange', () => this.syncIconSlot())
    closeButton.addEventListener('click', () => this.hide())
    base.addEventListener('mouseenter', () => this.handleInteractionStart())
    base.addEventListener('mouseleave', () => this.handleInteractionEnd())
    base.addEventListener('focusin', () => this.handleInteractionStart())
    base.addEventListener('focusout', () => this.handleInteractionEnd())

    this.syncIconSlot()
    this.updateCountdown(1)
  }

  handleInteractionStart() {
    if (!this.open || !Number.isFinite(this.duration)) {
      return
    }

    this._isInteracting = true
    this.clearAutoHideTimer()
    this.updateCountdown(1)
  }

  handleInteractionEnd() {
    if (!this.open || !this._isInteracting) {
      return
    }

    this._isInteracting = false
    this.syncTimer()
  }

  syncIconSlot() {
    const iconSlot = this.shadowRoot?.querySelector('slot[name="icon"]')
    if (!iconSlot) {
      return
    }

    const assignedNodes = iconSlot.assignedNodes({ flatten: true })
    let hasIcon = false
    for (let i = 0; i < assignedNodes.length; i++) {
      const node = assignedNodes[i]
      if (node.nodeType === Node.ELEMENT_NODE || node.textContent.trim()) {
        hasIcon = true
        break
      }
    }

    if (hasIcon !== this._hasIcon) {
      this._hasIcon = hasIcon
      this.render()
    }
  }

  syncTimer() {
    this.clearAutoHideTimer()

    if (!this.open || !Number.isFinite(this.duration) || this._isInteracting) {
      this.updateCountdown(1)
      return
    }

    this._countdownStartedAt = performance.now()
    this._autoHideTimer = window.setTimeout(() => {
      this.hide()
    }, this.duration)

    this.scheduleCountdownUpdate()
  }

  scheduleCountdownUpdate() {
    if (!this.countdown || !Number.isFinite(this.duration) || !this.open) {
      return
    }

    this._countdownFrame = window.requestAnimationFrame(() => {
      const elapsed = performance.now() - this._countdownStartedAt
      const remainingRatio = clamp(1 - elapsed / this.duration, 0, 1)
      this.updateCountdown(remainingRatio)

      if (remainingRatio > 0 && this.open && !this._isInteracting) {
        this.scheduleCountdownUpdate()
      }
    })
  }

  updateCountdown(ratio) {
    const base = this.getBase()
    if (base) {
      base.style.setProperty('--notification-countdown-percent', `${Math.round(clamp(ratio, 0, 1) * 10000) / 100}%`)
    }
  }

  clearAutoHideTimer() {
    window.clearTimeout(this._autoHideTimer)
    window.cancelAnimationFrame(this._countdownFrame)
    this._autoHideTimer = 0
    this._countdownFrame = 0
  }

  clearAfterTimer() {
    window.clearTimeout(this._afterTimer)
    this._afterTimer = 0
  }

  emitOpenEvents(open) {
    const detail = this.getEventDetail()
    this.clearAfterTimer()
    emitLifecycle(this, open ? 'show' : 'hide', detail)
    this._afterTimer = window.setTimeout(() => {
      emitLifecycle(this, open ? 'after-show' : 'after-hide', this.getEventDetail())
      this._afterTimer = 0
    }, 150)
  }

  getEventDetail() {
    return {
      open: this.open,
      variant: this.variant,
      duration: this.duration,
      countdown: this.countdown,
      toast: this.hasAttribute('toast'),
    }
  }

  getBase() {
    return this.shadowRoot?.querySelector('.notification')
  }

  getRoot() {
    return this.shadowRoot || this.attachShadow({ mode: 'open' })
  }
}

function getToastStack() {
  ensureToastStackStyle()

  let stack = document.querySelector('.tot-notification-toast-stack')
  if (!stack) {
    stack = document.createElement('div')
    stack.className = 'tot-notification-toast-stack'
    document.body.append(stack)
  }

  return stack
}

function cleanupToastStack() {
  const stack = document.querySelector('.tot-notification-toast-stack')
  if (stack && stack.children.length === 0) {
    stack.remove()
  }
}

function ensureToastStackStyle() {
  if (document.getElementById('tot-notification-toast-stack-style')) {
    return
  }

  const style = document.createElement('style')
  style.id = 'tot-notification-toast-stack-style'
  style.textContent = toastStackStyle
  document.head.append(style)
}

function emitLifecycle(element, name, detail) {
  emit(element, name, detail)
  emit(element, `sl-${name}`, detail)
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

function getSupportedValue(value, supportedValues, fallback) {
  for (let i = 0; i < supportedValues.length; i++) {
    if (supportedValues[i] === value) {
      return value
    }
  }

  return fallback
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
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
