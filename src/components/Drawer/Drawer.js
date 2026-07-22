const drawerStyle = `
  :host {
    display: contents;
  }

  :host([contained]) {
    display: block;
    inset: 0;
    pointer-events: none;
    position: absolute;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .base {
    --tot-drawer-resolved-size: var(--tot-drawer-current-size, var(--tot-drawer-size, 25rem));
    --tot-drawer-min-size-resolved: var(--tot-drawer-min-size, 12rem);
    --tot-drawer-max-size-resolved: var(--tot-drawer-max-size, 100%);
    inset: 0;
    pointer-events: none;
    position: fixed;
    z-index: var(--tot-z-index-drawer, 900);
  }

  .base[hidden] {
    display: none;
  }

  .base--contained {
    contain: layout paint;
    height: 100%;
    inset: 0;
    overflow: hidden;
    position: absolute;
    width: 100%;
  }

  .overlay {
    background: var(--tot-drawer-overlay-background-color, var(--tot-overlay-background-color, hsl(240deg 4% 46% / 50%)));
    inset: 0;
    pointer-events: auto;
    position: absolute;
  }

  .base--contained .overlay {
    display: none;
  }

  .panel {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    box-shadow: var(--tot-shadow-x-large, 0 4px 16px rgb(15 23 42 / 12%));
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    grid-template-rows: auto minmax(0, 1fr) auto;
    max-height: 100%;
    max-width: 100%;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
    pointer-events: auto;
    position: absolute;
    transition:
      var(--tot-transition-medium, 250ms) transform,
      var(--tot-transition-medium, 250ms) opacity;
    will-change: transform;
  }

  .base--start .panel,
  .base--end .panel {
    bottom: 0;
    height: 100%;
    min-width: min(var(--tot-drawer-min-size-resolved), 100%);
    top: 0;
    width: clamp(var(--tot-drawer-min-size-resolved), var(--tot-drawer-resolved-size), var(--tot-drawer-max-size-resolved));
  }

  .base--start .panel {
    border-left: 0;
    left: 0;
    transform: translateX(-100%);
  }

  .base--end .panel {
    border-right: 0;
    right: 0;
    transform: translateX(100%);
  }

  .base--top .panel,
  .base--bottom .panel {
    left: 0;
    min-height: min(var(--tot-drawer-min-size-resolved), 100%);
    right: 0;
    width: 100%;
    height: clamp(var(--tot-drawer-min-size-resolved), var(--tot-drawer-resolved-size), var(--tot-drawer-max-size-resolved));
  }

  .base--top .panel {
    border-top: 0;
    top: 0;
    transform: translateY(-100%);
  }

  .base--bottom .panel {
    border-bottom: 0;
    bottom: 0;
    transform: translateY(100%);
  }

  .base--open .panel,
  .base--resizing .panel {
    transform: translate(0, 0);
  }

  .panel--denied {
    animation: tot-drawer-deny 180ms ease-out;
  }

  .header {
    align-items: center;
    background: var(--tot-navbar-background-color, var(--tot-color-neutral-100, #f1f5f9));
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: flex;
    gap: var(--tot-spacing-small, .75rem);
    justify-content: space-between;
    min-height: var(--tot-input-height-large, 2.75rem);
    padding: var(--tot-drawer-header-spacing, var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem));
  }

  .header[hidden] {
    display: none;
  }

  .title {
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-input-font-size-medium, .875rem);
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: var(--tot-line-height-dense, 1.4);
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .header-actions {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    gap: var(--tot-spacing-2x-small, .25rem);
  }

  .header-actions ::slotted(*) {
    margin: 0;
  }

  .close-button {
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

  .close-button:hover {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .close-button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .resize-handle:focus-visible {
    outline: none;
  }

  .body {
    line-height: var(--tot-line-height-dense, 1.4);
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--tot-drawer-body-spacing, var(--tot-spacing-small, .75rem));
  }

  .body ::slotted(*) {
    margin-top: 0;
  }

  .footer {
    align-items: center;
    border-top: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: flex;
    flex-wrap: wrap;
    gap: var(--tot-spacing-x-small, .5rem);
    justify-content: flex-end;
    padding: var(--tot-drawer-footer-spacing, var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem));
  }

  .footer[hidden] {
    display: none;
  }

  .footer ::slotted(*) {
    margin: 0;
  }

  .resize-handle {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    border: 0;
    display: none;
    margin: 0;
    padding: 0;
    position: absolute;
    touch-action: none;
    z-index: 2;
  }

  .base--resizable .resize-handle {
    display: block;
  }

  .resize-handle::before {
    background: var(--tot-focus-ring-color, hsl(198.6 88.7% 48.4% / 45%));
    content: '';
    opacity: 0;
    position: absolute;
    transition: opacity var(--tot-transition-fast, 120ms);
  }

  .base--resizable .resize-handle:hover::before,
  .base--resizable .resize-handle:focus-visible::before,
  .base--resizing .resize-handle::before {
    opacity: 1;
  }

  .base--start .resize-handle,
  .base--end .resize-handle {
    bottom: 0;
    cursor: ew-resize;
    top: 0;
    width: 12px;
  }

  .base--start .resize-handle {
    right: 0;
  }

  .base--end .resize-handle {
    left: 0;
  }

  .base--start .resize-handle::before,
  .base--end .resize-handle::before {
    bottom: 0;
    top: 0;
    width: 2px;
  }

  .base--start .resize-handle::before {
    right: 0;
    transform-origin: right center;
  }

  .base--end .resize-handle::before {
    left: 0;
    transform-origin: left center;
  }

  .base--top .resize-handle,
  .base--bottom .resize-handle {
    cursor: ns-resize;
    height: 12px;
    left: 0;
    right: 0;
  }

  .base--top .resize-handle {
    bottom: 0;
  }

  .base--bottom .resize-handle {
    top: 0;
  }

  .base--top .resize-handle::before,
  .base--bottom .resize-handle::before {
    height: 2px;
    left: 0;
    right: 0;
  }

  .base--top .resize-handle::before {
    bottom: 0;
    transform-origin: center bottom;
  }

  .base--bottom .resize-handle::before {
    top: 0;
    transform-origin: center top;
  }

  @media (pointer: coarse) {
    .base--start .resize-handle,
    .base--end .resize-handle {
      width: 28px;
    }

    .base--top .resize-handle,
    .base--bottom .resize-handle {
      height: 28px;
    }
  }

  @keyframes tot-drawer-deny {
    0%, 100% {
      transform: translate(0, 0);
    }

    35% {
      transform: translateX(var(--tot-drawer-deny-offset-x, 0)) translateY(var(--tot-drawer-deny-offset-y, 0));
    }

    70% {
      transform: translateX(calc(var(--tot-drawer-deny-offset-x, 0) * -.55)) translateY(calc(var(--tot-drawer-deny-offset-y, 0) * -.55));
    }
  }
`

const placements = ['top', 'end', 'bottom', 'start']

export class TotDrawer extends HTMLElement {
  static get observedAttributes() {
    return [
      'label',
      'open',
      'placement',
      'contained',
      'no-header',
      'noheader',
      'resizable',
      'min-size',
      'minsize',
      'max-size',
      'maxsize',
    ]
  }

  constructor() {
    super()
    this._wasOpen = false
    this._historyPushed = false
    this._historyToken = ''
    this._ignoreNextPopState = false
    this._skipHistoryOnDeactivate = false
    this._previouslyFocused = null
    this._sizePx = null
    this._activeResize = null
    this._touchStartY = 0
    this._focusFrame = 0
    this._hideTimer = 0
    this._handleKeyDown = event => this._onKeyDown(event)
    this._handlePopState = event => this._onPopState(event)
    this._handlePointerMove = event => this._onResizeMove(event)
    this._handlePointerUp = () => this._stopResize()

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${drawerStyle}</style>
      <div class="base base--end" part="base" hidden>
        <div class="overlay" part="overlay"></div>
        <section class="panel" part="panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" tabindex="-1">
          <header class="header" part="header">
            <div class="title" id="drawer-title" part="title"><slot name="label"></slot></div>
            <div class="header-actions" part="header-actions">
              <slot name="header-actions"></slot>
              <button class="close-button" part="close-button" type="button" aria-label="Close">×</button>
            </div>
          </header>
          <div class="body" part="body"><slot></slot></div>
          <footer class="footer" part="footer" hidden><slot name="footer"></slot></footer>
          <button class="resize-handle" part="resize-handle" type="button" aria-label="Resize drawer" tabindex="0"></button>
        </section>
      </div>
    `

    this._baseElement = root.querySelector('.base')
    this._overlayElement = root.querySelector('.overlay')
    this._panelElement = root.querySelector('.panel')
    this._headerElement = root.querySelector('.header')
    this._titleElement = root.querySelector('.title')
    this._labelSlot = root.querySelector('slot[name="label"]')
    this._bodyElement = root.querySelector('.body')
    this._footerElement = root.querySelector('.footer')
    this._footerSlot = root.querySelector('slot[name="footer"]')
    this._closeButton = root.querySelector('.close-button')
    this._resizeHandle = root.querySelector('.resize-handle')

    this._footerSlot.addEventListener('slotchange', () => this._syncFooter())
    this._overlayElement.addEventListener('click', () => this._requestClose('overlay'))
    this._baseElement.addEventListener('wheel', event => this._onOverlayWheel(event), { passive: false })
    this._baseElement.addEventListener('touchstart', event => this._onOverlayTouchStart(event), { passive: true })
    this._baseElement.addEventListener('touchmove', event => this._onOverlayTouchMove(event), { passive: false })
    this._closeButton.addEventListener('click', () => this._requestClose('close'))
    this._resizeHandle.addEventListener('pointerdown', event => this._onResizeStart(event))
    this._resizeHandle.addEventListener('keydown', event => this._onResizeKeyDown(event))
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    setBooleanAttribute(this, 'open', value)
  }

  get placement() {
    return getSupportedValue(this.getAttribute('placement'), placements, 'end')
  }

  set placement(value) {
    setNullableAttribute(this, 'placement', value)
  }

  get contained() {
    return this.hasAttribute('contained')
  }

  set contained(value) {
    setBooleanAttribute(this, 'contained', value)
  }

  get noHeader() {
    return this.hasAttribute('no-header') || this.hasAttribute('noheader')
  }

  set noHeader(value) {
    setBooleanAttribute(this, 'no-header', value)
  }

  get resizable() {
    return this.hasAttribute('resizable')
  }

  set resizable(value) {
    setBooleanAttribute(this, 'resizable', value)
  }

  get minSize() {
    return this.getAttribute('min-size') || this.getAttribute('minsize') || '12rem'
  }

  set minSize(value) {
    setNullableAttribute(this, 'min-size', value)
  }

  get maxSize() {
    return this.getAttribute('max-size') || this.getAttribute('maxsize') || '100%'
  }

  set maxSize(value) {
    setNullableAttribute(this, 'max-size', value)
  }

  connectedCallback() {
    this._syncAll()
    this._syncOpenState()
  }

  disconnectedCallback() {
    this._cancelScheduledWork()
    this._stopResize()
    if (this._wasOpen) {
      this._deactivateDrawer(true, true, false)
      this._cancelScheduledWork()
      this._baseElement.hidden = true
      this._wasOpen = false
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'placement') {
      this._sizePx = null
    }

    this._syncAll()
    if (name === 'open') {
      this._syncOpenState()
    } else if (name === 'contained' && this._wasOpen && this.isConnected) {
      this._syncContainmentMode(oldValue !== null)
    }
  }

  show() {
    this.open = true
  }

  hide() {
    this.open = false
  }

  focus(options) {
    this._panelElement.focus(options)
  }

  getBase() {
    return this._baseElement
  }

  getPanel() {
    return this._panelElement
  }

  getHeader() {
    return this._headerElement
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

  getResizeHandle() {
    return this._resizeHandle
  }

  _requestClose(reason) {
    if (this.contained && reason !== 'close') {
      return false
    }

    const event = emitCancelable(this, 'request-close', { reason })
    if (event.defaultPrevented) {
      this._denyClose()
      return false
    }

    this.hide()
    return true
  }

  _syncAll() {
    if (!this._baseElement) {
      return
    }

    for (let i = 0; i < placements.length; i++) {
      this._baseElement.classList.toggle(`base--${placements[i]}`, placements[i] === this.placement)
    }
    this._baseElement.classList.toggle('base--contained', this.contained)
    this._baseElement.classList.toggle('base--resizable', this.resizable)
    this._baseElement.style.setProperty('--tot-drawer-min-size', this.minSize)
    this._baseElement.style.setProperty('--tot-drawer-max-size', this.maxSize)
    if (this._sizePx === null) {
      this._baseElement.style.removeProperty('--tot-drawer-current-size')
    } else {
      this._baseElement.style.setProperty('--tot-drawer-current-size', `${Math.round(this._sizePx)}px`)
    }

    this._headerElement.hidden = this.noHeader
    this._labelSlot.textContent = this.label
    this._panelElement.setAttribute('aria-modal', String(!this.contained))
    if (this.noHeader) {
      this._panelElement.removeAttribute('aria-labelledby')
      this._panelElement.setAttribute('aria-label', this.label || 'Drawer')
    } else {
      this._panelElement.setAttribute('aria-labelledby', 'drawer-title')
      this._panelElement.removeAttribute('aria-label')
    }

    const vertical = this.placement === 'top' || this.placement === 'bottom'
    this._resizeHandle.setAttribute('aria-orientation', vertical ? 'horizontal' : 'vertical')
    this._syncFooter()
  }

  _syncFooter() {
    this._footerElement.hidden = !hasAssignedSlotContent(this._footerSlot)
  }

  _syncOpenState() {
    if (!this.isConnected || this.open === this._wasOpen) {
      return
    }

    if (this.open) {
      this._activateDrawer()
    } else {
      this._deactivateDrawer(this._skipHistoryOnDeactivate, false, true)
      this._skipHistoryOnDeactivate = false
    }

    this._wasOpen = this.open
  }

  _activateDrawer() {
    this._cancelScheduledWork()
    this._previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    this._baseElement.hidden = false
    void this._baseElement.offsetWidth
    this._baseElement.classList.add('base--open')

    if (!this.contained) {
      this._startModalBehavior()
    }

    emitEvent(this, 'show')
    this._focusFrame = requestAnimationFrame(() => {
      this._focusFrame = 0
      if (!this.open || !this.isConnected || (!this.contained && !isTopDrawer(this))) {
        return
      }

      const autofocus = this.querySelector('[autofocus]')
      const target = autofocus instanceof HTMLElement ? autofocus : this._panelElement
      target.focus()
    })
  }

  _deactivateDrawer(skipHistory, skipRestoreFocus, emitEvents) {
    this._cancelScheduledWork()
    this._baseElement.classList.remove('base--open')

    if (!this.contained) {
      this._stopModalBehavior(skipHistory)
    }

    this._stopResize()
    if (emitEvents) {
      emitEvent(this, 'hide')
    }

    if (!skipRestoreFocus && this._previouslyFocused && document.contains(this._previouslyFocused)) {
      this._previouslyFocused.focus()
    }
    this._previouslyFocused = null

    const duration = getTransitionDuration(this._panelElement)
    this._hideTimer = window.setTimeout(() => {
      this._hideTimer = 0
      if (!this.open) {
        this._baseElement.hidden = true
      }
    }, duration)
  }

  _cancelScheduledWork() {
    cancelAnimationFrame(this._focusFrame)
    this._focusFrame = 0
    window.clearTimeout(this._hideTimer)
    this._hideTimer = 0
  }

  _syncContainmentMode(wasContained) {
    if (wasContained === this.contained) {
      return
    }

    if (this.contained) {
      this._stopModalBehavior(false)
    } else {
      this._startModalBehavior()
    }
  }

  _startModalBehavior() {
    registerOpenDrawer(this)
    beginPageScrollContainment()
    document.addEventListener('keydown', this._handleKeyDown)
    window.addEventListener('popstate', this._handlePopState)
    this._pushHistoryState()
  }

  _stopModalBehavior(skipHistory) {
    unregisterOpenDrawer(this)
    document.removeEventListener('keydown', this._handleKeyDown)
    window.removeEventListener('popstate', this._handlePopState)
    endPageScrollContainment()

    if (skipHistory) {
      this._historyPushed = false
      this._historyToken = ''
    } else {
      this._removeHistoryState()
    }
  }

  _denyClose() {
    const offset = 8
    this._panelElement.classList.remove('panel--denied')
    this._panelElement.style.setProperty('--tot-drawer-deny-offset-x', this.placement === 'start' ? `${offset}px` : this.placement === 'end' ? `-${offset}px` : '0')
    this._panelElement.style.setProperty('--tot-drawer-deny-offset-y', this.placement === 'top' ? `${offset}px` : this.placement === 'bottom' ? `-${offset}px` : '0')
    void this._panelElement.offsetWidth
    this._panelElement.classList.add('panel--denied')
  }

  _onKeyDown(event) {
    if (event.key !== 'Escape' || event.defaultPrevented || !this.open || this.contained || !isTopDrawer(this) || hasActiveFullscreenLayer()) {
      return
    }

    event.preventDefault()
    this._requestClose('escape')
  }

  _onOverlayWheel(event) {
    if (this.open && !this.contained && !shouldAllowScroll(event, this._baseElement, event.deltaY)) {
      event.preventDefault()
    }
  }

  _onOverlayTouchStart(event) {
    if (this.open && !this.contained && event.touches.length === 1) {
      this._touchStartY = event.touches[0].clientY
    }
  }

  _onOverlayTouchMove(event) {
    if (!this.open || this.contained) {
      return
    }

    if (event.touches.length !== 1) {
      event.preventDefault()
      return
    }

    const currentY = event.touches[0].clientY
    const deltaY = this._touchStartY - currentY
    this._touchStartY = currentY
    if (!shouldAllowScroll(event, this._baseElement, deltaY)) {
      event.preventDefault()
    }
  }

  _onResizeStart(event) {
    if (!this.resizable || !this.open) {
      return
    }

    const rect = this._panelElement.getBoundingClientRect()
    const vertical = this.placement === 'top' || this.placement === 'bottom'
    this._activeResize = {
      placement: this.placement,
      startX: event.clientX,
      startY: event.clientY,
      startSize: vertical ? rect.height : rect.width,
      vertical,
    }
    this._baseElement.classList.add('base--resizing')
    event.currentTarget.setPointerCapture?.(event.pointerId)
    document.addEventListener('pointermove', this._handlePointerMove)
    document.addEventListener('pointerup', this._handlePointerUp)
    event.preventDefault()
  }

  _onResizeMove(event) {
    if (!this._activeResize) {
      return
    }

    let delta = this._activeResize.vertical
      ? event.clientY - this._activeResize.startY
      : event.clientX - this._activeResize.startX
    if (this._activeResize.placement === 'end' || this._activeResize.placement === 'bottom') {
      delta *= -1
    }

    this._setDrawerSize(this._activeResize.startSize + delta)
    event.preventDefault()
  }

  _onResizeKeyDown(event) {
    if (!this.resizable) {
      return
    }

    const vertical = this.placement === 'top' || this.placement === 'bottom'
    const rect = this._panelElement.getBoundingClientRect()
    const currentSize = vertical ? rect.height : rect.width
    const step = event.shiftKey ? 48 : 16
    let direction = 0

    if (event.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) {
      direction = -1
    } else if (event.key === (vertical ? 'ArrowDown' : 'ArrowRight')) {
      direction = 1
    } else if (event.key === 'Home') {
      this._setDrawerSize(resolveCssLength(this.minSize, this._getResizeLimitBase()) || 0)
      event.preventDefault()
      return
    } else if (event.key === 'End') {
      this._setDrawerSize(resolveCssLength(this.maxSize, this._getResizeLimitBase()) || this._getResizeLimitBase())
      event.preventDefault()
      return
    } else {
      return
    }

    if (this.placement === 'end' || this.placement === 'bottom') {
      direction *= -1
    }
    this._setDrawerSize(currentSize + direction * step)
    event.preventDefault()
  }

  _setDrawerSize(value) {
    const limit = this._getResizeLimitBase()
    const min = resolveCssLength(this.minSize, limit) || 0
    const max = resolveCssLength(this.maxSize, limit) || limit
    this._sizePx = clamp(value, min, Math.max(min, Math.min(max, limit)))
    this._baseElement.style.setProperty('--tot-drawer-current-size', `${Math.round(this._sizePx)}px`)
  }

  _getResizeLimitBase() {
    const rect = this.contained ? this.parentElement?.getBoundingClientRect() : null
    const vertical = this.placement === 'top' || this.placement === 'bottom'
    if (rect?.width && rect.height) {
      return vertical ? rect.height : rect.width
    }
    return vertical ? window.innerHeight : window.innerWidth
  }

  _stopResize() {
    this._baseElement.classList.remove('base--resizing')
    document.removeEventListener('pointermove', this._handlePointerMove)
    document.removeEventListener('pointerup', this._handlePointerUp)
    this._activeResize = null
  }

  _onPopState(event) {
    if (this._ignoreNextPopState) {
      this._ignoreNextPopState = false
      return
    }

    if (!this.open || !this._historyPushed || !isTopDrawer(this)) {
      return
    }

    if (event.state?.totDrawerToken === this._historyToken) {
      return
    }

    this._skipHistoryOnDeactivate = true
    if (!this._requestClose('back')) {
      this._skipHistoryOnDeactivate = false
      this._historyPushed = false
      this._historyToken = ''
      this._pushHistoryState()
    }
  }

  _pushHistoryState() {
    if (this._historyPushed || typeof history === 'undefined') {
      return
    }

    this._historyToken = `tot-drawer-${Date.now()}-${Math.random().toString(36).slice(2)}`
    try {
      const state = history.state && typeof history.state === 'object' ? history.state : {}
      history.pushState({ ...state, totDrawerToken: this._historyToken }, '')
      this._historyPushed = true
    } catch {
      this._historyPushed = false
      this._historyToken = ''
    }
  }

  _removeHistoryState() {
    if (!this._historyPushed || typeof history === 'undefined') {
      this._historyPushed = false
      this._historyToken = ''
      return
    }

    const isCurrent = history.state?.totDrawerToken === this._historyToken
    this._historyPushed = false
    this._historyToken = ''
    if (isCurrent) {
      this._ignoreNextPopState = true
      history.back()
    }
  }
}

const openDrawers = []

function registerOpenDrawer(drawer) {
  if (!contains(openDrawers, drawer)) {
    openDrawers.push(drawer)
  }
}

function unregisterOpenDrawer(drawer) {
  const index = openDrawers.indexOf(drawer)
  if (index !== -1) {
    openDrawers.splice(index, 1)
  }
}

function isTopDrawer(drawer) {
  return openDrawers[openDrawers.length - 1] === drawer
}

function emitEvent(element, name) {
  element.dispatchEvent(new Event(name, {
    bubbles: true,
    composed: true,
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
  return event
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

function getSupportedValue(value, supportedValues, fallback) {
  const normalized = value || fallback
  return contains(supportedValues, normalized) ? normalized : fallback
}

function contains(items, value) {
  for (let i = 0; i < items.length; i++) {
    if (items[i] === value) {
      return true
    }
  }
  return false
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function resolveCssLength(value, reference) {
  const raw = String(value || '').trim()
  const parsed = Number.parseFloat(raw)
  if (!raw || !Number.isFinite(parsed)) {
    return null
  }

  if (raw.endsWith('px') || /^-?\d+(\.\d+)?$/.test(raw)) {
    return parsed
  }
  if (raw.endsWith('%')) {
    return reference * parsed / 100
  }
  if (raw.endsWith('vw') || raw.endsWith('dvw')) {
    return window.innerWidth * parsed / 100
  }
  if (raw.endsWith('vh') || raw.endsWith('dvh')) {
    return window.innerHeight * parsed / 100
  }
  if (raw.endsWith('rem')) {
    return parsed * getFontSize(document.documentElement)
  }
  if (raw.endsWith('em')) {
    return parsed * getFontSize(document.body)
  }
  return null
}

function getFontSize(element) {
  const value = Number.parseFloat(element ? getComputedStyle(element).fontSize : '')
  return Number.isFinite(value) ? value : 16
}

function getTransitionDuration(element) {
  if (!element) {
    return 0
  }

  const durations = getComputedStyle(element).transitionDuration.split(',')
  let max = 0
  for (let i = 0; i < durations.length; i++) {
    max = Math.max(max, parseTime(durations[i]))
  }
  return max
}

function parseTime(value) {
  const trimmed = String(value || '').trim()
  if (trimmed.endsWith('ms')) {
    return Number.parseFloat(trimmed) || 0
  }
  if (trimmed.endsWith('s')) {
    return (Number.parseFloat(trimmed) || 0) * 1000
  }
  return 0
}

function hasActiveFullscreenLayer() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
    && ((window.__totFullscreenOpenCount || 0) > 0 || document.documentElement.hasAttribute('data-tot-fullscreen-open'))
}

function beginPageScrollContainment() {
  const state = getSharedScrollLockState()

  // Keep this aligned with Modal.js. Do not lock scrolling by fixing and
  // negatively offsetting <body>: Firefox can stop painting the page beneath a
  // fixed Shadow DOM overlay, making a translucent overlay appear opaque.
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
    if (!/(auto|scroll)/.test(style.overflowY) || node.scrollHeight <= node.clientHeight) {
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

function hasAssignedSlotContent(slot) {
  const nodes = slot.assignedNodes({ flatten: true })
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].nodeType === Node.ELEMENT_NODE || (nodes[i].nodeType === Node.TEXT_NODE && nodes[i].textContent.trim())) {
      return true
    }
  }
  return false
}
