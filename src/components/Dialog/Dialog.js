const dialogStyle = `
  :host {
    display: contents;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .overlay {
    align-items: center;
    background: var(--tot-overlay-background-color, hsl(240deg 4% 46% / 50%));
    display: flex;
    inset: 0;
    justify-content: center;
    overscroll-behavior: contain;
    padding: max(var(--tot-spacing-small, .75rem), env(safe-area-inset-top)) max(var(--tot-spacing-small, .75rem), env(safe-area-inset-right)) max(var(--tot-spacing-small, .75rem), env(safe-area-inset-bottom)) max(var(--tot-spacing-small, .75rem), env(safe-area-inset-left));
    position: fixed;
    z-index: var(--tot-z-index-dialog, 1200);
  }

  .overlay[hidden] {
    display: none;
  }

  .dialog {
    background: var(--tot-dialog-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-large, 8px);
    box-shadow: var(--tot-shadow-x-large, 0 4px 16px rgb(15 23 42 / 12%));
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    grid-template-rows: auto minmax(0, 1fr) auto;
    max-height: min(var(--tot-dialog-max-height, 90dvh), calc(100dvh - 2 * var(--tot-spacing-small, .75rem)));
    max-width: calc(100vw - 2 * var(--tot-spacing-small, .75rem));
    min-width: min(var(--tot-dialog-min-width, 18rem), calc(100vw - 2 * var(--tot-spacing-small, .75rem)));
    overflow: hidden;
    width: var(--tot-dialog-width, 28rem);
  }

  .dialog__header {
    align-items: center;
    background: var(--tot-navbar-background-color, var(--tot-color-neutral-100, #f1f5f9));
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: flex;
    gap: var(--tot-spacing-small, .75rem);
    justify-content: space-between;
    min-height: var(--tot-input-height-medium, 2.25rem);
    padding: var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem);
  }

  .dialog__title {
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-input-font-size-medium, .875rem);
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: var(--tot-line-height-dense, 1.4);
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .dialog__close {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-icon-color, #64748b);
    cursor: pointer;
    display: inline-flex;
    flex: 0 0 auto;
    font: inherit;
    font-size: 1.25em;
    height: 1.75rem;
    justify-content: center;
    line-height: 1;
    padding: 0;
    width: 1.75rem;
  }

  .dialog__close:hover {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .dialog__close:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .dialog__close[hidden] {
    display: none;
  }

  .dialog__body {
    line-height: var(--tot-line-height-dense, 1.4);
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--tot-spacing-small, .75rem);
  }

  .dialog__body ::slotted(*) {
    margin-top: 0;
  }

  .dialog__footer {
    align-items: center;
    border-top: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: flex;
    flex-wrap: wrap;
    gap: var(--tot-spacing-x-small, .5rem);
    justify-content: flex-end;
    padding: var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem);
  }

  .dialog__footer[hidden] {
    display: none;
  }

  .dialog__footer ::slotted(*) {
    margin: 0;
  }

  .dialog__fallback-actions {
    display: inline-flex;
    flex-wrap: wrap;
    gap: var(--tot-spacing-x-small, .5rem);
    justify-content: flex-end;
  }

  .dialog__fallback-actions tot-button[hidden] {
    display: none;
  }
`

export class TotDialog extends HTMLElement {
  static get observedAttributes() {
    return [
      'header',
      'content',
      'open',
      'confirm-label',
      'cancellabel',
      'cancel-label',
      'confirmlabel',
      'confirm-variant',
      'confirmvariant',
      'hide-cancel',
      'hide-confirm',
      'hide-footer',
      'no-close',
      'close-on-overlay',
      'closeonoverlay',
    ]
  }

  constructor() {
    super()
    this._wasOpen = false
    this._previouslyFocused = null
    this._handleKeyDown = event => this.handleKeyDown(event)
    this._touchStartY = 0
    this._overlayPointerStarted = false
  }

  get header() {
    return this.getAttribute('header') || ''
  }

  set header(value) {
    setNullableAttribute(this, 'header', value)
  }

  get content() {
    return this.getAttribute('content') || ''
  }

  set content(value) {
    setNullableAttribute(this, 'content', value)
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    setBooleanAttribute(this, 'open', value)
  }

  get confirmLabel() {
    return this.getAttribute('confirm-label') || this.getAttribute('confirmlabel') || 'Confirm'
  }

  set confirmLabel(value) {
    setNullableAttribute(this, 'confirm-label', value)
  }

  get cancelLabel() {
    return this.getAttribute('cancel-label') || this.getAttribute('cancellabel') || 'Cancel'
  }

  set cancelLabel(value) {
    setNullableAttribute(this, 'cancel-label', value)
  }

  get confirmVariant() {
    return this.getAttribute('confirm-variant') || this.getAttribute('confirmvariant') || 'primary'
  }

  set confirmVariant(value) {
    setNullableAttribute(this, 'confirm-variant', value)
  }

  get hideCancel() {
    return this.hasAttribute('hide-cancel')
  }

  set hideCancel(value) {
    setBooleanAttribute(this, 'hide-cancel', value)
  }

  get hideConfirm() {
    return this.hasAttribute('hide-confirm')
  }

  set hideConfirm(value) {
    setBooleanAttribute(this, 'hide-confirm', value)
  }

  get hideFooter() {
    return this.hasAttribute('hide-footer')
  }

  set hideFooter(value) {
    setBooleanAttribute(this, 'hide-footer', value)
  }

  get noClose() {
    return this.hasAttribute('no-close')
  }

  set noClose(value) {
    setBooleanAttribute(this, 'no-close', value)
  }

  get closeOnOverlay() {
    if (this.hasAttribute('close-on-overlay')) {
      return this.getAttribute('close-on-overlay') !== 'false'
    }

    if (this.hasAttribute('closeonoverlay')) {
      return this.getAttribute('closeonoverlay') !== 'false'
    }

    return true
  }

  set closeOnOverlay(value) {
    if (value === false || value === 'false') {
      this.setAttribute('close-on-overlay', 'false')
    } else {
      this.setAttribute('close-on-overlay', '')
    }
  }

  connectedCallback() {
    this.render()
    this.syncOpenState()
  }

  disconnectedCallback() {
    if (this._wasOpen) {
      this.deactivateDialog()
      this._wasOpen = false
    }
  }

  attributeChangedCallback() {
    this.render()
    this.syncOpenState()
  }

  show() {
    this.open = true
  }

  hide() {
    this.open = false
  }

  confirm() {
    const proceed = emitCancelable(this, 'confirm', this.getEventDetail('confirm'))
    if (proceed) {
      this.hide()
    }
    return proceed
  }

  cancel(reason = 'cancel') {
    const proceed = emitCancelable(this, 'cancel', this.getEventDetail(reason))
    if (proceed) {
      this.hide()
    }
    return proceed
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const open = this.open
    const confirmVariant = getSupportedValue(this.confirmVariant, ['default', 'primary', 'danger', 'create'], 'primary')

    root.innerHTML = `<style>${dialogStyle}</style>
      <div class="overlay" part="overlay" ${open ? '' : 'hidden'}>
        <section class="dialog" part="base" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1">
          <header class="dialog__header" part="header">
            <div class="dialog__title" id="dialog-title" part="title"><slot name="header">${escapeHtml(this.header)}</slot></div>
            <button class="dialog__close" part="close-button" type="button" aria-label="Close" ${this.noClose ? 'hidden' : ''}>×</button>
          </header>
          <div class="dialog__body" part="body"><slot name="body"><slot>${escapeHtml(this.content)}</slot></slot></div>
          <footer class="dialog__footer" part="footer" ${this.hideFooter ? 'hidden' : ''}>
            <slot name="footer">
              <span class="dialog__fallback-actions">
                <tot-button class="dialog__cancel" label="${escapeAttribute(this.cancelLabel)}" ${this.hideCancel ? 'hidden' : ''}></tot-button>
                <tot-button class="dialog__confirm" variant="${escapeAttribute(confirmVariant)}" label="${escapeAttribute(this.confirmLabel)}" ${this.hideConfirm ? 'hidden' : ''}></tot-button>
              </span>
            </slot>
          </footer>
        </section>
      </div>
    `

    const overlay = root.querySelector('.overlay')
    const closeButton = root.querySelector('.dialog__close')
    const cancelButton = root.querySelector('.dialog__cancel')
    const confirmButton = root.querySelector('.dialog__confirm')

    overlay.addEventListener('pointerdown', (event) => {
      this._overlayPointerStarted = event.target === overlay
    })
    overlay.addEventListener('pointercancel', () => {
      this._overlayPointerStarted = false
    })
    overlay.addEventListener('click', (event) => {
      const shouldClose = this._overlayPointerStarted && event.target === overlay
      this._overlayPointerStarted = false
      if (shouldClose && this.closeOnOverlay) {
        this.cancel('overlay')
      }
    })
    overlay.addEventListener('wheel', (event) => this.handleOverlayWheel(event), { passive: false })
    overlay.addEventListener('touchstart', (event) => this.handleOverlayTouchStart(event), { passive: true })
    overlay.addEventListener('touchmove', (event) => this.handleOverlayTouchMove(event), { passive: false })
    closeButton.addEventListener('click', () => this.cancel('close'))
    cancelButton.addEventListener('click', () => this.cancel('cancel'))
    confirmButton.addEventListener('click', () => this.confirm())
  }

  syncOpenState() {
    const open = this.open
    if (open === this._wasOpen) {
      return
    }

    if (open) {
      this.activateDialog()
    } else {
      this.deactivateDialog()
    }

    this._wasOpen = open
  }

  activateDialog() {
    this._previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.addEventListener('keydown', this._handleKeyDown)
    emit(this, 'show', this.getEventDetail('show'))

    requestAnimationFrame(() => {
      const dialog = this.shadowRoot?.querySelector('.dialog')
      const footerSlot = this.shadowRoot?.querySelector('slot[name="footer"]')
      const assignedFooter = footerSlot ? footerSlot.assignedElements({ flatten: true }) : []
      let focusTarget = findFocusable(assignedFooter)

      if (!focusTarget && !this.hideConfirm) {
        focusTarget = this.shadowRoot?.querySelector('.dialog__confirm')
      }

      if (!focusTarget) {
        focusTarget = dialog
      }

      if (focusTarget instanceof HTMLElement) {
        focusTarget.focus()
      }
    })
  }

  deactivateDialog() {
    document.removeEventListener('keydown', this._handleKeyDown)

    const previouslyFocused = this._previouslyFocused
    this._previouslyFocused = null
    if (previouslyFocused && document.contains(previouslyFocused)) {
      previouslyFocused.focus()
    }

    emit(this, 'hide', this.getEventDetail('hide'))
  }

  handleKeyDown(event) {
    if (!this.open || event.key !== 'Escape') {
      return
    }

    event.preventDefault()
    this.cancel('escape')
  }

  handleOverlayWheel(event) {
    if (!shouldAllowScroll(event, this.shadowRoot?.querySelector('.overlay'), event.deltaY)) {
      event.preventDefault()
    }
  }

  handleOverlayTouchStart(event) {
    if (event.touches.length !== 1) {
      return
    }

    this._touchStartY = event.touches[0].clientY
  }

  handleOverlayTouchMove(event) {
    if (event.touches.length !== 1) {
      event.preventDefault()
      return
    }

    const currentY = event.touches[0].clientY
    const deltaY = this._touchStartY - currentY
    this._touchStartY = currentY

    if (!shouldAllowScroll(event, this.shadowRoot?.querySelector('.overlay'), deltaY)) {
      event.preventDefault()
    }
  }

  getEventDetail(reason) {
    return {
      open: this.open,
      header: this.header,
      content: this.content,
      reason,
    }
  }
}


function findFocusable(elements) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    if (element instanceof HTMLElement && typeof element.focus === 'function') {
      return element
    }

    const focusable = element.querySelector?.('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), tot-button')
    if (focusable instanceof HTMLElement && typeof focusable.focus === 'function') {
      return focusable
    }
  }

  return null
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

function emitCancelable(element, name, detail) {
  const event = new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: detail || {},
  })
  element.dispatchEvent(event)
  return !event.defaultPrevented
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

function shouldAllowScroll(event, boundary, deltaY) {
  if (deltaY === 0) {
    return false
  }

  const path = typeof event.composedPath === 'function' ? event.composedPath() : []
  for (let i = 0; i < path.length; i++) {
    const node = path[i]
    if (node === boundary) {
      break
    }

    if (!(node instanceof HTMLElement)) {
      continue
    }

    const style = getComputedStyle(node)
    const canScrollY = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight
    if (!canScrollY) {
      continue
    }

    if (deltaY < 0 && node.scrollTop > 0) {
      return true
    }

    if (deltaY > 0 && Math.ceil(node.scrollTop + node.clientHeight) < node.scrollHeight) {
      return true
    }
  }

  return false
}

function getSupportedValue(value, supportedValues, fallback) {
  for (let i = 0; i < supportedValues.length; i++) {
    if (supportedValues[i] === value) {
      return value
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
