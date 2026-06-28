const toastStyle = `
  :host {
    bottom: calc(max(var(--tot-spacing-medium, 1rem), env(safe-area-inset-bottom)) + var(--tot-toast-stack-offset, 0px));
    display: block;
    left: 50%;
    max-width: calc(100vw - 2 * var(--tot-spacing-small, .75rem));
    pointer-events: none;
    position: fixed;
    transform: translateX(-50%);
    width: max-content;
    z-index: var(--tot-z-index-toast, 1400);
  }

  :host(:not([open])) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .toast {
    align-items: center;
    background: var(--tot-toast-background-color, rgb(17 24 39 / 92%));
    border: 0;
    border-radius: var(--tot-toast-border-radius, 999px);
    box-shadow: none;
    color: var(--tot-toast-color, var(--tot-color-neutral-0, #fff));
    display: flex;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    justify-content: center;
    line-height: var(--tot-line-height-dense, 1.4);
    max-width: min(var(--tot-toast-max-width, 34rem), calc(100vw - 2 * var(--tot-spacing-small, .75rem)));
    min-height: var(--tot-toast-min-height, 3rem);
    min-width: min(var(--tot-toast-min-width, 12rem), calc(100vw - 2 * var(--tot-spacing-small, .75rem)));
    overflow-wrap: anywhere;
    padding: var(--tot-spacing-small, .75rem) var(--tot-spacing-large, 1.25rem);
    text-align: center;
  }
`

export class TotToast extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'message', 'content', 'duration']
  }

  constructor() {
    super()
    this._hideTimer = 0
  }

  static show(options) {
    const toast = document.createElement('tot-toast')
    const config = normalizeShowOptions(options)

    toast.message = config.message
    toast.duration = config.duration
    toast.addEventListener('hide', () => {
      window.setTimeout(() => toast.remove(), 0)
    }, { once: true })

    document.body.append(toast)
    toast.show()
    return toast
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    setBooleanAttribute(this, 'open', value)
  }

  get message() {
    return this.getAttribute('message') || this.getAttribute('content') || this.textContent.trim()
  }

  set message(value) {
    setNullableAttribute(this, 'message', value)
  }

  get duration() {
    const value = Number.parseInt(this.getAttribute('duration') || '', 10)
    return Number.isFinite(value) ? value : 4000
  }

  set duration(value) {
    setNullableAttribute(this, 'duration', value)
  }

  connectedCallback() {
    this.render()
    this.syncTimer()
    scheduleToastStackUpdate()
  }

  disconnectedCallback() {
    clearTimeout(this._hideTimer)
    scheduleToastStackUpdate()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render()
    this.syncTimer()
    scheduleToastStackUpdate()

    if (name === 'open' && oldValue !== newValue) {
      emit(this, newValue === null ? 'hide' : 'show', this.getEventDetail())
    }
  }

  show() {
    this.open = true
  }

  hide() {
    this.open = false
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })

    root.innerHTML = `<style>${toastStyle}</style>
      <div class="toast" part="base" role="status" aria-live="polite">${escapeHtml(this.message)}</div>
    `
  }

  syncTimer() {
    clearTimeout(this._hideTimer)

    if (!this.open || this.duration <= 0) {
      return
    }

    this._hideTimer = window.setTimeout(() => {
      this.hide()
    }, this.duration)
  }

  getEventDetail() {
    return {
      open: this.open,
      message: this.message,
      duration: this.duration,
    }
  }
}

function scheduleToastStackUpdate() {
  cancelAnimationFrame(window.__totToastStackFrame || 0)
  window.__totToastStackFrame = requestAnimationFrame(() => updateToastStack())
}

function updateToastStack() {
  const toasts = document.querySelectorAll('tot-toast[open]')
  const gap = 8
  let offset = 0

  for (let i = 0; i < toasts.length; i++) {
    const toast = toasts[i]
    toast.style.setProperty('--tot-toast-stack-offset', `${offset}px`)
    const rect = toast.getBoundingClientRect()
    offset += rect.height + gap
  }
}

function normalizeShowOptions(options) {
  if (typeof options === 'string') {
    return {
      message: options,
      duration: 4000,
    }
  }

  const config = options && typeof options === 'object' ? options : {}
  return {
    message: String(config.message ?? config.content ?? ''),
    duration: Number.isFinite(Number(config.duration)) ? Number(config.duration) : 4000,
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
