const modalStyle = `
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
    padding: var(--tot-spacing-medium, 1rem);
    position: fixed;
    z-index: var(--tot-z-index-dialog, 1200);
  }

  .overlay[hidden] {
    display: none;
  }

  .modal {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-large, 6px);
    box-shadow: var(--tot-shadow-x-large, 0 4px 16px rgb(15 23 42 / 12%));
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    grid-template-rows: auto minmax(0, 1fr) auto;
    max-height: var(--tot-modal-max-height, 90dvh);
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    width: var(--tot-modal-width, 34rem);
  }

  .modal__header {
    align-items: center;
    background: var(--tot-navbar-background-color, var(--tot-color-neutral-100, #f1f5f9));
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: flex;
    gap: var(--tot-spacing-small, .75rem);
    justify-content: space-between;
    min-height: var(--tot-input-height-large, 2.75rem);
    padding: var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem);
  }

  .modal__title {
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-input-font-size-medium, .875rem);
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: 1.35;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .modal__body {
    line-height: var(--tot-line-height-dense, 1.4);
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--tot-spacing-small, .75rem);
  }

  .modal__footer {
    align-items: center;
    border-top: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: flex;
    flex-wrap: wrap;
    gap: var(--tot-spacing-small, .75rem);
    padding: var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem);
  }

  .modal__footer[hidden] {
    display: none;
  }

  .modal__footer ::slotted(*) {
    margin: 0;
  }

  .modal__close {
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

  .modal__close:hover {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .modal__close:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  @media (max-width: 640px) {
    .overlay {
      align-items: stretch;
      justify-content: stretch;
      padding: 0;
    }

    .modal {
      border: 0;
      border-radius: 0;
      height: 100dvh;
      max-height: none;
      width: 100vw;
    }

    .modal__header {
      min-height: var(--tot-navbar-height, 2.75rem);
      padding: 0 var(--tot-spacing-small, .75rem);
    }
  }
`

export class TotModal extends HTMLElement {
  static get observedAttributes() {
    return ['header', 'open', 'close-on-overlay', 'closeonoverlay']
  }

  constructor() {
    super()
    this._wasOpen = false
    this._historyPushed = false
    this._historyToken = ''
    this._ignoreNextPopState = false
    this._skipHistoryOnDeactivate = false
    this._previouslyFocused = null
    this._handleKeyDown = event => this.handleKeyDown(event)
    this._handlePopState = event => this.handlePopState(event)
    this._touchStartY = 0
    this._overlayPointerStarted = false
  }

  get header() {
    return this.getAttribute('header') || ''
  }

  set header(value) {
    setNullableAttribute(this, 'header', value)
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    setBooleanAttribute(this, 'open', value)
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
      this.deactivateModal(true)
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

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const open = this.open

    root.innerHTML = `<style>${modalStyle}</style>
      <div class="overlay" part="overlay" ${open ? '' : 'hidden'}>
        <section class="modal" part="base" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
          <header class="modal__header" part="header">
            <div class="modal__title" id="modal-title" part="title"><slot name="header">${escapeHtml(this.header)}</slot></div>
            <button class="modal__close" part="close-button" type="button" aria-label="Close">×</button>
          </header>
          <div class="modal__body" part="body"><slot name="body"><slot></slot></slot></div>
          <footer class="modal__footer" part="footer"><slot name="footer"></slot></footer>
        </section>
      </div>
    `

    const overlay = root.querySelector('.overlay')
    const closeButton = root.querySelector('.modal__close')
    const footer = root.querySelector('.modal__footer')
    const footerSlot = root.querySelector('slot[name="footer"]')
    const syncFooter = () => {
      footer.hidden = !hasAssignedSlotContent(footerSlot)
    }

    syncFooter()
    footerSlot.addEventListener('slotchange', syncFooter)

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
        this.hide()
      }
    })
    overlay.addEventListener('wheel', (event) => this.handleOverlayWheel(event), { passive: false })
    overlay.addEventListener('touchstart', (event) => this.handleOverlayTouchStart(event), { passive: true })
    overlay.addEventListener('touchmove', (event) => this.handleOverlayTouchMove(event), { passive: false })
    closeButton.addEventListener('click', () => this.hide())
  }

  syncOpenState() {
    const open = this.open
    if (open === this._wasOpen) {
      return
    }

    if (open) {
      this.activateModal()
    } else {
      this.deactivateModal(this._skipHistoryOnDeactivate)
      this._skipHistoryOnDeactivate = false
    }

    this._wasOpen = open
  }

  activateModal() {
    this._previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    lockPageScroll()
    document.addEventListener('keydown', this._handleKeyDown)
    window.addEventListener('popstate', this._handlePopState)
    this.pushHistoryState()
    emit(this, 'show', this.getEventDetail())

    requestAnimationFrame(() => {
      const closeButton = this.shadowRoot?.querySelector('.modal__close')
      const modal = this.shadowRoot?.querySelector('.modal')
      const focusTarget = closeButton || modal
      if (focusTarget instanceof HTMLElement) {
        focusTarget.focus()
      }
    })
  }

  deactivateModal(skipHistory) {
    document.removeEventListener('keydown', this._handleKeyDown)
    window.removeEventListener('popstate', this._handlePopState)
    unlockPageScroll()

    if (!skipHistory) {
      this.removeHistoryState()
    } else {
      this._historyPushed = false
      this._historyToken = ''
    }

    const previouslyFocused = this._previouslyFocused
    this._previouslyFocused = null
    if (previouslyFocused && document.contains(previouslyFocused)) {
      previouslyFocused.focus()
    }

    emit(this, 'hide', this.getEventDetail())
  }

  handleKeyDown(event) {
    if (event.key !== 'Escape' || !this.open) {
      return
    }

    if (event.defaultPrevented || hasActiveFullscreenLayer()) {
      return
    }

    event.preventDefault()
    this.hide()
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

  handlePopState(event) {
    if (this._ignoreNextPopState) {
      this._ignoreNextPopState = false
      return
    }

    if (!this.open || !this._historyPushed) {
      return
    }

    const state = event && event.state
    if (state && state.totModalToken === this._historyToken) {
      return
    }

    this._skipHistoryOnDeactivate = true
    this.open = false
  }

  pushHistoryState() {
    if (this._historyPushed || typeof history === 'undefined') {
      return
    }

    this._historyToken = `tot-modal-${Date.now()}-${Math.random().toString(36).slice(2)}`

    try {
      const currentState = history.state && typeof history.state === 'object' ? history.state : {}
      history.pushState({ ...currentState, totModalToken: this._historyToken }, '')
      this._historyPushed = true
    } catch (error) {
      this._historyPushed = false
    }
  }

  removeHistoryState() {
    if (!this._historyPushed || typeof history === 'undefined') {
      this._historyPushed = false
      this._historyToken = ''
      return
    }

    const state = history.state
    const isCurrentModalState = state && state.totModalToken === this._historyToken
    this._historyPushed = false
    this._historyToken = ''

    if (!isCurrentModalState) {
      return
    }

    this._ignoreNextPopState = false
    markModalHistoryNavigation()
    history.back()
  }

  getEventDetail() {
    return {
      open: this.open,
      header: this.header,
    }
  }
}

function markModalHistoryNavigation() {
  if (typeof window === 'undefined') {
    return
  }

  const count = Number(window.__totModalHistoryNavigationCount) || 0
  window.__totModalHistoryNavigationCount = count + 1
}

function hasActiveFullscreenLayer() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  return (window.__totFullscreenOpenCount || 0) > 0 || document.documentElement.hasAttribute('data-tot-fullscreen-open')
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

function lockPageScroll() {
  const state = getScrollLockState()
  state.count += 1
}

function unlockPageScroll() {
  const state = getScrollLockState()
  state.count = Math.max(0, state.count - 1)
}

function getScrollLockState() {
  if (!window.__totScrollLockState) {
    window.__totScrollLockState = {
      count: 0,
    }
  }
  return window.__totScrollLockState
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

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (match) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
    }
    return replacements[match]
  })
}

function hasAssignedSlotContent(slot) {
  const nodes = slot.assignedNodes({ flatten: true })
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].nodeType === Node.ELEMENT_NODE) {
      return true
    }

    if (nodes[i].nodeType === Node.TEXT_NODE && nodes[i].textContent.trim() !== '') {
      return true
    }
  }
  return false
}
