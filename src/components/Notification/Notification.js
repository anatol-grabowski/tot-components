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
    --tot-notification-current-accent-color: var(--tot-notification-info-accent-color, var(--tot-color-sky-600, #0284c7));
    --tot-notification-current-background-color: var(--tot-notification-info-background-color, var(--tot-color-sky-50, #f0f9ff));
    --tot-notification-current-border-color: var(--tot-notification-info-border-color, var(--tot-color-sky-200, #bae6fd));
    --tot-notification-current-color: var(--tot-notification-info-color, var(--tot-color-sky-900, #0c4a6e));
    --tot-notification-duration: 0ms;

    background: var(--tot-notification-current-background-color);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-notification-current-border-color);
    border-inline-start: .25rem solid var(--tot-notification-current-accent-color);
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--tot-notification-current-color);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    gap: var(--tot-spacing-small, .75rem);
    grid-template-columns: auto minmax(0, 1fr) auto;
    line-height: var(--tot-line-height-dense, 1.45);
    min-width: 0;
    overflow: hidden;
    padding: var(--tot-spacing-2x-small, .625rem) var(--tot-spacing-small, .75rem);
    position: relative;
    width: 100%;
  }

  .notification--success {
    --tot-notification-current-accent-color: var(--tot-notification-success-accent-color, var(--tot-color-emerald-700, #047857));
    --tot-notification-current-background-color: var(--tot-notification-success-background-color, var(--tot-color-emerald-50, #ecfdf5));
    --tot-notification-current-border-color: var(--tot-notification-success-border-color, var(--tot-color-emerald-200, #a7f3d0));
    --tot-notification-current-color: var(--tot-notification-success-color, var(--tot-color-emerald-900, #064e3b));
  }

  .notification--warning {
    --tot-notification-current-accent-color: var(--tot-notification-warning-accent-color, var(--tot-color-amber-600, #d97706));
    --tot-notification-current-background-color: var(--tot-notification-warning-background-color, var(--tot-color-amber-50, #fffbeb));
    --tot-notification-current-border-color: var(--tot-notification-warning-border-color, var(--tot-color-amber-200, #fde68a));
    --tot-notification-current-color: var(--tot-notification-warning-color, var(--tot-color-amber-950, #451a03));
  }

  .notification--error {
    --tot-notification-current-accent-color: var(--tot-notification-error-accent-color, var(--tot-color-red-600, #dc2626));
    --tot-notification-current-background-color: var(--tot-notification-error-background-color, var(--tot-color-red-50, #fef2f2));
    --tot-notification-current-border-color: var(--tot-notification-error-border-color, var(--tot-color-red-300, #fca5a5));
    --tot-notification-current-color: var(--tot-notification-error-color, var(--tot-color-red-800, #991b1b));
  }

  .notification__icon {
    align-items: center;
    align-self: start;
    background: var(--tot-notification-current-accent-color);
    border-radius: var(--tot-border-radius-circle, 50%);
    color: var(--tot-color-neutral-0, #fff);
    display: inline-flex;
    font-size: .8125rem;
    font-weight: var(--tot-font-weight-bold, 700);
    height: 1.3rem;
    justify-content: center;
    line-height: 1;
    margin-top: .025rem;
    width: 1.3rem;
  }

  .notification__default-icon {
    align-items: center;
    display: inline-flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  }

  .notification__default-icon svg {
    display: block;
    height: .9rem;
    overflow: visible;
    width: .9rem;
  }

  .notification__message {
    align-self: center;
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
    align-self: start;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: currentColor;
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-size: 1.25rem;
    height: 1.5rem;
    justify-content: center;
    line-height: 1;
    margin: -.1rem -.2rem -.1rem auto;
    opacity: .72;
    padding: 0;
    width: 1.5rem;
  }

  .notification__close:hover {
    background: color-mix(in srgb, var(--tot-notification-current-accent-color) 12%, transparent);
    opacity: 1;
  }

  .notification__close:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .notification__close[hidden] {
    display: none;
  }

  .notification__countdown {
    background: var(--tot-notification-current-accent-color);
    bottom: 0;
    display: none;
    height: .1875rem;
    inset-inline: 0;
    opacity: .6;
    position: absolute;
    transform: scaleX(1);
    transform-origin: left center;
  }

  .notification[data-timed] .notification__countdown {
    animation: tot-notification-countdown var(--tot-notification-duration) linear forwards;
    display: block;
  }

  .notification[data-paused] .notification__countdown {
    animation-play-state: paused;
  }

  @keyframes tot-notification-countdown {
    from {
      transform: scaleX(1);
    }

    to {
      transform: scaleX(0);
    }
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

const notificationTypes = ['success', 'info', 'warning', 'error']
const notificationSymbols = {
  success: '✓',
  info: `<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="8" cy="3.6" r="1.2" fill="currentColor" stroke="none" />
    <path d="M6.1 6.2h3.8M8 6.2v5.9M5.9 12.1h4.2" stroke-width="1.7" />
  </svg>`,
  warning: `<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round">
    <path d="M8 3.1v6.1" stroke-width="2.4" />
    <circle cx="8" cy="12.4" r="1.15" fill="currentColor" stroke="none" />
  </svg>`,
  error: `<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2.4">
    <path d="M4.4 4.4l7.2 7.2M11.6 4.4l-7.2 7.2" />
  </svg>`,
}
// All finite notifications share one timeout; CSS owns the visible countdown.
const timedNotifications = new Set()
let expiryTimer = 0

export class TotNotification extends HTMLElement {
  static get observedAttributes() {
    return [
      'open',
      'closable',
      'type',
      'duration',
      'content',
      'close-label',
    ]
  }

  constructor() {
    super()
    this._remainingDuration = Infinity
    this._expiresAt = 0
    this._pauseReasons = new Set()

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${notificationStyle}</style>
      <div class="notification notification--info" part="base" role="status" aria-live="polite" tabindex="-1">
        <span class="notification__icon" part="icon" aria-hidden="true">
          <slot name="icon"><span class="notification__default-icon"></span></slot>
        </span>
        <div class="notification__message" part="message"><slot></slot></div>
        <button class="notification__close" part="close-button" type="button">
          <slot name="close-icon">×</slot>
        </button>
        <div class="notification__countdown" part="countdown" aria-hidden="true"></div>
      </div>
    `

    this._baseElement = root.querySelector('.notification')
    this._iconElement = root.querySelector('.notification__icon')
    this._defaultIconElement = root.querySelector('.notification__default-icon')
    this._messageElement = root.querySelector('.notification__message')
    this._closeButton = root.querySelector('.notification__close')
    this._countdownElement = root.querySelector('.notification__countdown')
    this._messageSlot = root.querySelector('.notification__message slot')

    this._closeButton.addEventListener('click', () => this.hide())
    this._baseElement.addEventListener('pointerenter', event => this._handlePointerEnter(event))
    this._baseElement.addEventListener('pointerleave', event => this._handlePointerLeave(event))
    this._baseElement.addEventListener('pointerdown', event => this._handlePointerDown(event))
    this._baseElement.addEventListener('pointerup', event => this._handlePointerUp(event))
    this._baseElement.addEventListener('pointercancel', event => this._handlePointerUp(event))
    this._baseElement.addEventListener('lostpointercapture', event => this._handlePointerUp(event))
    this._baseElement.addEventListener('focusin', () => this._pause('focus'))
    this._baseElement.addEventListener('focusout', event => this._handleFocusOut(event))
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

  get type() {
    return getSupportedValue(this.getAttribute('type'), notificationTypes, 'info')
  }

  set type(value) {
    setNullableAttribute(this, 'type', value)
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

  get content() {
    return this.getAttribute('content') || ''
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
    this._syncAll()
    if (this.open) {
      this._restartTimedState()
    }
  }

  disconnectedCallback() {
    this._stopTimedState()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'open') {
      if (this.isConnected) {
        if (newValue === null) {
          this._stopTimedState()
          emitEvent(this, 'hide')
        } else {
          this._restartTimedState()
          emitEvent(this, 'show')
        }
      }
    } else if (name === 'closable') {
      this._syncClosable()
    } else if (name === 'type') {
      this._syncType()
    } else if (name === 'duration') {
      if (this.isConnected && this.open) {
        this._restartTimedState()
      }
    } else if (name === 'content') {
      this._syncContent()
    } else if (name === 'close-label') {
      this._syncCloseLabel()
    }
  }

  show() {
    if (this.open) {
      this._restartTimedState()
      return
    }

    this.open = true
  }

  hide() {
    this.open = false
  }

  toast() {
    const stack = getToastStack()
    this.setAttribute('toast', '')
    stack.append(this)

    const hidden = new Promise(resolve => {
      this.addEventListener('hide', () => {
        this.removeAttribute('toast')
        this.remove()
        cleanupToastStack()
        resolve()
      }, { once: true })
    })

    this.show()
    return hidden
  }

  focus(options) {
    this._baseElement.focus(options)
  }

  blur() {
    this._baseElement.blur()
  }

  getBase() {
    return this._baseElement
  }

  getIcon() {
    return this._iconElement
  }

  getMessage() {
    return this._messageElement
  }

  getCloseButton() {
    return this._closeButton
  }

  getCountdown() {
    return this._countdownElement
  }

  _syncAll() {
    this._syncType()
    this._syncClosable()
    this._syncContent()
    this._syncCloseLabel()
  }

  _syncType() {
    const type = this.type
    for (let i = 0; i < notificationTypes.length; i++) {
      this._baseElement.classList.toggle(`notification--${notificationTypes[i]}`, type === notificationTypes[i])
    }

    const role = type === 'warning' || type === 'error' ? 'alert' : 'status'
    this._baseElement.setAttribute('role', role)
    this._baseElement.setAttribute('aria-live', role === 'alert' ? 'assertive' : 'polite')
    if (type === 'success') {
      this._defaultIconElement.textContent = notificationSymbols.success
    } else {
      this._defaultIconElement.innerHTML = notificationSymbols[type]
    }
  }

  _syncClosable() {
    this._closeButton.hidden = !this.closable
  }

  _syncContent() {
    this._messageSlot.textContent = this.content
  }

  _syncCloseLabel() {
    this._closeButton.setAttribute('aria-label', this.closeLabel)
  }

  _handlePointerEnter(event) {
    if (event.pointerType !== 'touch') {
      this._pause('hover')
    }
  }

  _handlePointerLeave(event) {
    if (event.pointerType !== 'touch') {
      this._resume('hover')
    }
  }

  _handlePointerDown(event) {
    if (event.pointerType !== 'touch') {
      return
    }

    this._pause('press')
    try {
      this._baseElement.setPointerCapture(event.pointerId)
    } catch {
      // Pointer capture is optional; pointerup/pointercancel still resume the timer.
    }
  }

  _handlePointerUp(event) {
    if (event.pointerType === 'touch') {
      this._resume('press')
    }
  }

  _handleFocusOut(event) {
    if (event.relatedTarget && this._baseElement.contains(event.relatedTarget)) {
      return
    }

    this._resume('focus')
  }

  _pause(reason) {
    const wasPaused = this._pauseReasons.size > 0
    this._pauseReasons.add(reason)
    if (wasPaused || !this.open || !Number.isFinite(this.duration)) {
      return
    }

    this._remainingDuration = Math.max(0, this._expiresAt - performance.now())
    this._expiresAt = 0
    this._baseElement.setAttribute('data-paused', '')
    unregisterTimedNotification(this)
  }

  _resume(reason) {
    this._pauseReasons.delete(reason)
    if (this._pauseReasons.size > 0 || !this.open || !Number.isFinite(this.duration)) {
      return
    }

    this._baseElement.removeAttribute('data-paused')
    if (this._remainingDuration <= 0) {
      this.hide()
      return
    }

    this._expiresAt = performance.now() + this._remainingDuration
    registerTimedNotification(this)
  }

  _restartTimedState() {
    unregisterTimedNotification(this)
    this._remainingDuration = this.duration
    this._expiresAt = 0
    this._baseElement.removeAttribute('data-timed')
    this._baseElement.removeAttribute('data-paused')

    if (!Number.isFinite(this._remainingDuration)) {
      return
    }

    this._baseElement.style.setProperty('--tot-notification-duration', `${this._remainingDuration}ms`)
    this._baseElement.setAttribute('data-timed', '')
    this._restartCountdownAnimation()

    if (this._pauseReasons.size > 0) {
      this._baseElement.setAttribute('data-paused', '')
      return
    }

    this._expiresAt = performance.now() + this._remainingDuration
    registerTimedNotification(this)
  }

  _restartCountdownAnimation() {
    this._countdownElement.style.animation = 'none'
    void this._countdownElement.offsetWidth
    this._countdownElement.style.removeProperty('animation')
  }

  _stopTimedState() {
    unregisterTimedNotification(this)
    this._remainingDuration = Infinity
    this._expiresAt = 0
    this._pauseReasons.clear()
    this._baseElement.removeAttribute('data-timed')
    this._baseElement.removeAttribute('data-paused')
  }

  _expire() {
    if (this.open && this._pauseReasons.size === 0 && Number.isFinite(this.duration)) {
      this.hide()
    }
  }
}

function registerTimedNotification(notification) {
  timedNotifications.add(notification)
  scheduleNextExpiry()
}

function unregisterTimedNotification(notification) {
  if (timedNotifications.delete(notification)) {
    scheduleNextExpiry()
  }
}

function scheduleNextExpiry() {
  window.clearTimeout(expiryTimer)
  expiryTimer = 0

  let nearestExpiry = Infinity
  for (const notification of timedNotifications) {
    if (notification._expiresAt > 0 && notification._expiresAt < nearestExpiry) {
      nearestExpiry = notification._expiresAt
    }
  }

  if (!Number.isFinite(nearestExpiry)) {
    return
  }

  const delay = Math.max(0, Math.min(nearestExpiry - performance.now(), 2147483647))
  expiryTimer = window.setTimeout(processExpiredNotifications, delay)
}

function processExpiredNotifications() {
  expiryTimer = 0
  const now = performance.now()
  const expired = []

  for (const notification of timedNotifications) {
    if (notification._expiresAt > 0 && notification._expiresAt <= now + 1) {
      expired.push(notification)
    }
  }

  for (let i = 0; i < expired.length; i++) {
    timedNotifications.delete(expired[i])
    expired[i]._expire()
  }

  scheduleNextExpiry()
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

function emitEvent(element, name) {
  element.dispatchEvent(new Event(name, {
    bubbles: true,
    composed: true,
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
