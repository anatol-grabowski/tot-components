const modalStyle = `
  :host {
    display: contents;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .overlay {
    --tot-overlay-stack-index: 0;
    align-items: center;
    background: transparent;
    display: flex;
    inset: 0;
    justify-content: center;
    overscroll-behavior: contain;
    padding: var(--tot-spacing-medium, 1rem);
    pointer-events: none;
    position: fixed;
    z-index: calc(var(--tot-z-index-dialog, 1200) + var(--tot-overlay-stack-index));
  }

  .overlay[data-topmost] {
    background: var(--tot-overlay-background-color, hsl(240deg 4% 46% / 50%));
    pointer-events: auto;
  }

  .overlay:not([data-topmost]) .modal {
    pointer-events: none;
  }

  .overlay[hidden] {
    display: none;
  }

  .modal {
    background: var(--tot-modal-background-color, var(--tot-color-neutral-0, #fff));
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
    position: relative;
    width: var(--tot-modal-width, 34rem);
    z-index: 1;
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

const overlayStack = []
let overlayHistoryToken = ''
let overlayHistoryActive = false
let ignoreNextPopState = false
let historyResetTimer = 0

export class TotModal extends HTMLElement {
  static get observedAttributes() {
    return ['header', 'open', 'close-on-overlay', 'closeonoverlay']
  }

  constructor() {
    super()
    this._wasOpen = false
    this._previouslyFocused = null
    this._focusFrame = 0
    this._touchStartY = 0
    this._overlayPointerStarted = false
    this._pendingHideReason = 'programmatic'
    this._skipHistoryOnDeactivate = false

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${modalStyle}</style>
      <div class="overlay" part="overlay" hidden>
        <section class="modal" part="base" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
          <header class="modal__header" part="header">
            <div class="modal__title" id="modal-title" part="title"><slot name="header"></slot></div>
            <button class="modal__close" part="close-button" type="button" aria-label="Close">×</button>
          </header>
          <div class="modal__body" part="body"><slot name="body"><slot></slot></slot></div>
          <footer class="modal__footer" part="footer" hidden><slot name="footer"></slot></footer>
        </section>
      </div>
    `

    this._overlayElement = root.querySelector('.overlay')
    this._baseElement = root.querySelector('.modal')
    this._headerElement = root.querySelector('.modal__header')
    this._titleElement = root.querySelector('.modal__title')
    this._bodyElement = root.querySelector('.modal__body')
    this._footerElement = root.querySelector('.modal__footer')
    this._closeButton = root.querySelector('.modal__close')
    this._headerSlot = root.querySelector('slot[name="header"]')
    this._footerSlot = root.querySelector('slot[name="footer"]')

    this._footerSlot.addEventListener('slotchange', () => this._syncFooter())
    this._closeButton.addEventListener('click', () => this._requestClose('close'))
    this._overlayElement.addEventListener('pointerdown', event => this._handleOverlayPointerDown(event))
    this._overlayElement.addEventListener('pointercancel', () => this._handleOverlayPointerCancel())
    this._overlayElement.addEventListener('click', event => this._handleOverlayClick(event))
    this._overlayElement.addEventListener('wheel', event => this._handleOverlayWheel(event), { passive: false })
    this._overlayElement.addEventListener('touchstart', event => this._handleOverlayTouchStart(event), { passive: true })
    this._overlayElement.addEventListener('touchmove', event => this._handleOverlayTouchMove(event), { passive: false })
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
    if (!value) {
      this._pendingHideReason = 'programmatic'
    }
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
    this._syncAll()
    this._syncOpenState()
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._focusFrame)
    this._focusFrame = 0

    if (this._wasOpen) {
      this._deactivateOverlay(true, false)
      this._wasOpen = false
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'header') {
      this._syncHeader()
      return
    }

    if (name === 'open') {
      this._syncVisibility()
      this._syncOpenState()
    }
  }

  show() {
    this.open = true
  }

  hide() {
    this._hide('programmatic')
  }

  getOverlay() {
    return this._overlayElement
  }

  getBase() {
    return this._baseElement
  }

  getHeader() {
    return this._headerElement
  }

  getTitle() {
    return this._titleElement
  }

  getBody() {
    return this._bodyElement
  }

  getFooter() {
    return this._footerElement
  }

  getCloseButton() {
    return this._closeButton
  }

  _syncAll() {
    this._syncHeader()
    this._syncVisibility()
    this._syncFooter()
  }

  _syncHeader() {
    this._headerSlot.textContent = this.header
  }

  _syncVisibility() {
    this._overlayElement.hidden = !this.open
  }

  _syncFooter() {
    this._footerElement.hidden = !hasAssignedSlotContent(this._footerSlot)
  }

  _syncOpenState() {
    if (!this.isConnected) {
      return
    }

    const open = this.open
    if (open === this._wasOpen) {
      return
    }

    if (open) {
      this._activateOverlay()
    } else {
      this._deactivateOverlay(this._skipHistoryOnDeactivate, true)
      this._skipHistoryOnDeactivate = false
    }

    this._wasOpen = open
  }

  _activateOverlay() {
    this._previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    registerOverlay(this)
    this._emitShow()

    cancelAnimationFrame(this._focusFrame)
    this._focusFrame = requestAnimationFrame(() => {
      this._focusFrame = 0
      if (!this.open || !this.isConnected || !isTopOverlay(this)) {
        return
      }

      const target = this._getInitialFocusTarget() || this._baseElement
      target.focus()
    })
  }

  _deactivateOverlay(skipHistory, emitEvent) {
    cancelAnimationFrame(this._focusFrame)
    this._focusFrame = 0

    const reason = this._pendingHideReason || 'programmatic'
    const wasTop = unregisterOverlay(this, skipHistory)
    const previouslyFocused = this._previouslyFocused
    this._previouslyFocused = null
    this._pendingHideReason = 'programmatic'

    if (wasTop && previouslyFocused && document.contains(previouslyFocused)) {
      previouslyFocused.focus()
    }

    if (emitEvent) {
      this._emitHide(reason)
    }
  }

  _hide(reason) {
    if (!this.open) {
      return
    }

    this._pendingHideReason = String(reason || 'programmatic')
    this.removeAttribute('open')
  }

  _requestClose(reason) {
    this._hide(reason)
  }

  _getInitialFocusTarget() {
    return this._closeButton || this._baseElement
  }

  _emitShow() {
    emitEvent(this, 'show')
  }

  _emitHide() {
    emitEvent(this, 'hide')
  }

  _handleOverlayPointerDown(event) {
    this._overlayPointerStarted = isTopOverlay(this) && event.target === this._overlayElement
  }

  _handleOverlayPointerCancel() {
    this._overlayPointerStarted = false
  }

  _handleOverlayClick(event) {
    const shouldClose = this._overlayPointerStarted && isTopOverlay(this) && event.target === this._overlayElement
    this._overlayPointerStarted = false

    if (shouldClose && this.closeOnOverlay) {
      this._requestClose('overlay')
    }
  }

  _handleOverlayWheel(event) {
    if (!isTopOverlay(this) || !shouldAllowScroll(event, this._overlayElement, event.deltaY)) {
      event.preventDefault()
    }
  }

  _handleOverlayTouchStart(event) {
    if (event.touches.length === 1) {
      this._touchStartY = event.touches[0].clientY
    }
  }

  _handleOverlayTouchMove(event) {
    if (!isTopOverlay(this) || event.touches.length !== 1) {
      event.preventDefault()
      return
    }

    const currentY = event.touches[0].clientY
    const deltaY = this._touchStartY - currentY
    this._touchStartY = currentY

    if (!shouldAllowScroll(event, this._overlayElement, deltaY)) {
      event.preventDefault()
    }
  }
}

function registerOverlay(element) {
  if (overlayStack.indexOf(element) !== -1) {
    return
  }

  const wasEmpty = overlayStack.length === 0
  overlayStack.push(element)
  if (wasEmpty) {
    beginPageScrollContainment()
    document.addEventListener('keydown', handleOverlayKeyDown)
    window.addEventListener('popstate', handleOverlayPopState)
    pushOverlayHistoryState()
  }
  syncOverlayStack()
}

function unregisterOverlay(element, skipHistory) {
  const index = overlayStack.indexOf(element)
  if (index === -1) {
    return false
  }

  const wasTop = index === overlayStack.length - 1
  overlayStack.splice(index, 1)
  syncOverlayStack()

  if (overlayStack.length === 0) {
    document.removeEventListener('keydown', handleOverlayKeyDown)
    window.removeEventListener('popstate', handleOverlayPopState)
    endPageScrollContainment()
    removeOverlayHistoryState(skipHistory)
  }

  return wasTop
}

function syncOverlayStack() {
  const topIndex = overlayStack.length - 1
  for (let i = 0; i < overlayStack.length; i++) {
    const element = overlayStack[i]
    const overlay = element._overlayElement
    const base = element._baseElement
    const isTopmost = i === topIndex

    overlay.style.setProperty('--tot-overlay-stack-index', String(i))
    overlay.toggleAttribute('data-topmost', isTopmost)
    overlay.inert = !isTopmost
    if (isTopmost) {
      base.removeAttribute('aria-hidden')
    } else {
      base.setAttribute('aria-hidden', 'true')
    }
  }
}

function isTopOverlay(element) {
  return overlayStack[overlayStack.length - 1] === element
}

function handleOverlayKeyDown(event) {
  if (event.key !== 'Escape' || event.defaultPrevented || hasActiveFullscreenLayer()) {
    return
  }

  const top = overlayStack[overlayStack.length - 1]
  if (!top || !top.open) {
    return
  }

  event.preventDefault()
  top._requestClose('escape')
}

function handleOverlayPopState(event) {
  if (ignoreNextPopState) {
    ignoreNextPopState = false
    clearTimeout(historyResetTimer)
    historyResetTimer = 0
    return
  }

  const top = overlayStack[overlayStack.length - 1]
  if (!top || !overlayHistoryActive) {
    return
  }

  if (event.state && event.state.totOverlayToken === overlayHistoryToken) {
    return
  }

  overlayHistoryActive = false
  overlayHistoryToken = ''
  top._skipHistoryOnDeactivate = true
  top._requestClose('back')

  if (overlayStack.length > 0) {
    pushOverlayHistoryState()
  }
}

function pushOverlayHistoryState() {
  if (overlayHistoryActive || typeof history === 'undefined') {
    return
  }

  overlayHistoryToken = `tot-overlay-${Date.now()}-${Math.random().toString(36).slice(2)}`

  try {
    const currentState = history.state && typeof history.state === 'object' ? history.state : {}
    history.pushState({ ...currentState, totOverlayToken: overlayHistoryToken }, '')
    overlayHistoryActive = true
  } catch {
    overlayHistoryActive = false
    overlayHistoryToken = ''
  }
}

function removeOverlayHistoryState(skipHistory) {
  if (!overlayHistoryActive || typeof history === 'undefined') {
    overlayHistoryActive = false
    overlayHistoryToken = ''
    return
  }

  const token = overlayHistoryToken
  const state = history.state
  const isCurrentOverlayState = state && state.totOverlayToken === token
  overlayHistoryActive = false
  overlayHistoryToken = ''

  if (!isCurrentOverlayState) {
    return
  }

  if (skipHistory) {
    const nextState = { ...state }
    delete nextState.totOverlayToken
    history.replaceState(nextState, '')
    return
  }

  ignoreNextPopState = true
  clearTimeout(historyResetTimer)
  historyResetTimer = window.setTimeout(() => {
    ignoreNextPopState = false
    historyResetTimer = 0
  }, 1000)
  history.back()
}

function emitEvent(element, name) {
  element.dispatchEvent(new Event(name, {
    bubbles: true,
    composed: true,
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

function beginPageScrollContainment() {
  const state = getSharedScrollLockState()

  // Firefox compatibility: do not lock scrolling by fixing and negatively
  // offsetting <body>. With a fixed Shadow DOM overlay Firefox can stop painting
  // the page underneath, making a translucent backdrop appear opaque. The
  // overlay's wheel/touch handlers contain user scrolling; this shared counter
  // also prevents nested components from applying that unsafe body lock.
  state.count += 1
}

function endPageScrollContainment() {
  const state = getSharedScrollLockState()
  state.count = Math.max(0, state.count - 1)
}

function getSharedScrollLockState() {
  const state = window.__totScrollLockState && typeof window.__totScrollLockState === 'object'
    ? window.__totScrollLockState
    : {}

  if (!Number.isFinite(state.count)) {
    state.count = 0
  }

  window.__totScrollLockState = state
  return state
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

function hasActiveFullscreenLayer() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  return (window.__totFullscreenOpenCount || 0) > 0 || document.documentElement.hasAttribute('data-tot-fullscreen-open')
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
