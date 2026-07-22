const toastStyle = `
  :host {
    bottom: max(var(--tot-spacing-medium, 1rem), env(safe-area-inset-bottom));
    display: block;
    left: 50%;
    max-width: calc(100vw - 2 * var(--tot-spacing-small, .75rem));
    pointer-events: none;
    position: fixed;
    transform: translateX(-50%);
    width: max-content;
    z-index: var(--tot-z-index-toast, 1400);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .base {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--tot-spacing-x-small, .5rem);
    max-width: 100%;
  }

  .base:empty {
    display: none;
  }

  .toast {
    align-items: center;
    background: var(--tot-toast-background-color, var(--tot-color-neutral-900, rgb(17 24 39 / 94%)));
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
    pointer-events: auto;
    text-align: center;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
  }
`

export class TotToast extends HTMLElement {
  constructor() {
    super()
    this._entries = new Set()

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${toastStyle}</style>
      <div class="base" part="base" role="status" aria-live="polite" aria-atomic="false"></div>
    `

    this._baseElement = root.querySelector('.base')
  }

  disconnectedCallback() {
    const entries = Array.from(this._entries)
    for (let i = 0; i < entries.length; i++) {
      this.removeEntry(entries[i])
    }
  }

  show(message, duration = 4000) {
    const text = String(message ?? '').trim()
    if (!text) {
      return
    }

    const entry = {
      element: document.createElement('div'),
      duration: normalizeDuration(duration),
      remaining: 0,
      startedAt: 0,
      timer: 0,
      pointerInside: false,
      pointerId: null,
    }

    entry.remaining = entry.duration
    entry.element.className = 'toast'
    entry.element.setAttribute('part', 'toast')
    entry.element.textContent = text
    entry.element.addEventListener('pointerenter', () => this.handlePointerEnter(entry))
    entry.element.addEventListener('pointerleave', () => this.handlePointerLeave(entry))
    entry.element.addEventListener('pointerdown', event => this.handlePointerDown(entry, event))
    entry.element.addEventListener('pointerup', event => this.handlePointerEnd(entry, event))
    entry.element.addEventListener('pointercancel', event => this.handlePointerEnd(entry, event))

    this._entries.add(entry)
    this._baseElement.append(entry.element)
    this.startTimer(entry)
  }

  getBase() {
    return this._baseElement
  }

  startTimer(entry) {
    clearTimeout(entry.timer)
    entry.startedAt = Date.now()
    entry.timer = window.setTimeout(() => {
      this.removeEntry(entry)
    }, entry.remaining)
  }

  pauseTimer(entry) {
    if (!this._entries.has(entry) || !entry.timer) {
      return
    }

    clearTimeout(entry.timer)
    entry.timer = 0
    entry.remaining = Math.max(0, entry.remaining - (Date.now() - entry.startedAt))
  }

  resumeTimer(entry) {
    if (!this._entries.has(entry) || entry.timer) {
      return
    }

    if (entry.remaining <= 0) {
      this.removeEntry(entry)
      return
    }

    this.startTimer(entry)
  }

  removeEntry(entry) {
    if (!this._entries.delete(entry)) {
      return
    }

    clearTimeout(entry.timer)
    entry.timer = 0
    entry.element.remove()
  }

  handlePointerEnter(entry) {
    entry.pointerInside = true
    this.pauseTimer(entry)
  }

  handlePointerLeave(entry) {
    entry.pointerInside = false
    if (entry.pointerId === null) {
      this.resumeTimer(entry)
    }
  }

  handlePointerDown(entry, event) {
    entry.pointerInside = true
    entry.pointerId = event.pointerId
    capturePointer(entry.element, event.pointerId)
    this.pauseTimer(entry)
  }

  handlePointerEnd(entry, event) {
    if (entry.pointerId !== event.pointerId) {
      return
    }

    entry.pointerId = null
    releasePointer(entry.element, event.pointerId)
    if (event.pointerType === 'touch') {
      entry.pointerInside = false
    }

    if (!entry.pointerInside) {
      this.resumeTimer(entry)
    }
  }
}

function normalizeDuration(value) {
  const duration = Number(value)
  return Number.isFinite(duration) && duration > 0 ? duration : 4000
}

function capturePointer(element, pointerId) {
  if (!element.setPointerCapture) {
    return
  }

  try {
    element.setPointerCapture(pointerId)
  } catch {
  }
}

function releasePointer(element, pointerId) {
  if (!element.releasePointerCapture) {
    return
  }

  try {
    element.releasePointerCapture(pointerId)
  } catch {
  }
}
