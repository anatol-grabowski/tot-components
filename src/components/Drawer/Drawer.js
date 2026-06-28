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
    --tot-drawer-resolved-size: var(--tot-drawer-current-size, var(--size, var(--tot-drawer-size, 25rem)));
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
    background: var(--tot-drawer-overlay-background-color, var(--tot-overlay-background-color, hsl(240 3.8% 46.1% / 16%)));
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

  .close-button:focus-visible,
  .resize-handle:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
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
    transition:
      opacity var(--tot-transition-fast, 120ms),
      transform var(--tot-transition-fast, 120ms),
      width var(--tot-transition-fast, 120ms),
      height var(--tot-transition-fast, 120ms);
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
    width: 18px;
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
    width: 3px;
  }

  .base--start .resize-handle::before {
    right: 0;
    transform-origin: right center;
  }

  .base--end .resize-handle::before {
    left: 0;
    transform-origin: left center;
  }

  .base--start .resize-handle:hover::before,
  .base--start .resize-handle:focus-visible::before,
  .base--start.base--resizing .resize-handle::before,
  .base--end .resize-handle:hover::before,
  .base--end .resize-handle:focus-visible::before,
  .base--end.base--resizing .resize-handle::before {
    transform: scaleX(6);
  }

  .base--top .resize-handle,
  .base--bottom .resize-handle {
    cursor: ns-resize;
    height: 18px;
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
    height: 3px;
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

  .base--top .resize-handle:hover::before,
  .base--top .resize-handle:focus-visible::before,
  .base--top.base--resizing .resize-handle::before,
  .base--bottom .resize-handle:hover::before,
  .base--bottom .resize-handle:focus-visible::before,
  .base--bottom.base--resizing .resize-handle::before {
    transform: scaleY(6);
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
    this._footerSlotChange = null
    this._handleKeyDown = event => this.handleKeyDown(event)
    this._handlePopState = event => this.handlePopState(event)
    this._handlePointerMove = event => this.handleResizeMove(event)
    this._handlePointerUp = event => this.handleResizeEnd(event)
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
    this.render()
    this.syncOpenState()
  }

  disconnectedCallback() {
    this.stopResizeListeners()
    if (this._wasOpen) {
      this.deactivateDrawer(true, true)
      this._wasOpen = false
    }
  }

  attributeChangedCallback(name) {
    if (name === 'placement') {
      this._sizePx = null
    }

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
    const placement = this.placement
    const baseClasses = [
      'base',
      `base--${placement}`,
      open ? 'base--open' : '',
      this.contained ? 'base--contained' : '',
      this.resizable ? 'base--resizable' : '',
    ].filter(Boolean).join(' ')
    const labelledBy = this.noHeader ? '' : ' aria-labelledby="drawer-title"'
    const ariaLabel = this.noHeader ? ` aria-label="${escapeAttribute(this.label || 'Drawer')}"` : ''
    const currentSize = this._sizePx === null ? '' : ` --tot-drawer-current-size: ${Math.round(this._sizePx)}px;`

    root.innerHTML = `<style>${drawerStyle}</style>
      <div class="${baseClasses}" part="base" ${open ? '' : 'hidden'} style="--tot-drawer-min-size: ${escapeAttribute(this.minSize)}; --tot-drawer-max-size: ${escapeAttribute(this.maxSize)};${currentSize}">
        <div class="overlay" part="overlay"></div>
        <section class="panel" part="panel" role="dialog" aria-modal="${this.contained ? 'false' : 'true'}"${labelledBy}${ariaLabel} tabindex="-1">
          <header class="header" part="header" ${this.noHeader ? 'hidden' : ''}>
            <div class="title" id="drawer-title" part="title"><slot name="label">${escapeHtml(this.label)}</slot></div>
            <div class="header-actions" part="header-actions">
              <slot name="header-actions"></slot>
              <button class="close-button" part="close-button" type="button" aria-label="Close">×</button>
            </div>
          </header>
          <div class="body" part="body"><slot></slot></div>
          <footer class="footer" part="footer"><slot name="footer"></slot></footer>
          <button class="resize-handle" part="resize-handle" type="button" aria-label="Resize drawer" tabindex="0"></button>
        </section>
      </div>
    `

    const base = root.querySelector('.base')
    const overlay = root.querySelector('.overlay')
    const closeButton = root.querySelector('.close-button')
    const footer = root.querySelector('.footer')
    const footerSlot = root.querySelector('slot[name="footer"]')
    const resizeHandle = root.querySelector('.resize-handle')
    const syncFooter = () => {
      footer.hidden = !hasAssignedSlotContent(footerSlot)
    }

    this._footerSlotChange = syncFooter
    syncFooter()
    footerSlot.addEventListener('slotchange', syncFooter)

    overlay.addEventListener('click', () => this.requestClose('overlay'))
    base.addEventListener('wheel', (event) => this.handleOverlayWheel(event), { passive: false })
    base.addEventListener('touchstart', (event) => this.handleOverlayTouchStart(event), { passive: true })
    base.addEventListener('touchmove', (event) => this.handleOverlayTouchMove(event), { passive: false })
    closeButton.addEventListener('click', () => this.requestClose('close-button'))
    resizeHandle.addEventListener('pointerdown', (event) => this.handleResizeStart(event))
    resizeHandle.addEventListener('keydown', (event) => this.handleResizeKeyDown(event))
  }

  syncOpenState() {
    const open = this.open
    if (open === this._wasOpen) {
      return
    }

    if (open) {
      this.activateDrawer()
    } else {
      this.deactivateDrawer(this._skipHistoryOnDeactivate, false)
      this._skipHistoryOnDeactivate = false
    }

    this._wasOpen = open
  }

  activateDrawer() {
    this._previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null

    if (!this.contained) {
      lockPageScroll()
      document.addEventListener('keydown', this._handleKeyDown)
      window.addEventListener('popstate', this._handlePopState)
      this.pushHistoryState()
    }

    emitBoth(this, 'show', this.getEventDetail())

    requestAnimationFrame(() => {
      const focusEvent = new CustomEvent('sl-initial-focus', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {},
      })
      this.dispatchEvent(focusEvent)
      emit(this, 'initial-focus', {})

      if (focusEvent.defaultPrevented) {
        return
      }

      const panel = this.shadowRoot?.querySelector('.panel')
      const autofocus = this.querySelector('[autofocus]')
      const focusTarget = autofocus instanceof HTMLElement ? autofocus : panel

      if (focusTarget instanceof HTMLElement) {
        focusTarget.focus()
      }
    })

    window.setTimeout(() => {
      if (this.open) {
        emitBoth(this, 'after-show', this.getEventDetail())
      }
    }, getTransitionDuration(this.shadowRoot?.querySelector('.panel')))
  }

  deactivateDrawer(skipHistory, skipRestoreFocus) {
    if (!this.contained) {
      document.removeEventListener('keydown', this._handleKeyDown)
      window.removeEventListener('popstate', this._handlePopState)
      unlockPageScroll()

      if (!skipHistory) {
        this.removeHistoryState()
      } else {
        this._historyPushed = false
        this._historyToken = ''
      }
    }

    this.stopResizeListeners()
    emitBoth(this, 'hide', this.getEventDetail())

    if (!skipRestoreFocus) {
      const previouslyFocused = this._previouslyFocused
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus()
      }
    }

    this._previouslyFocused = null

    window.setTimeout(() => {
      if (!this.open) {
        emitBoth(this, 'after-hide', this.getEventDetail())
      }
    }, getTransitionDuration(this.shadowRoot?.querySelector('.panel')))
  }

  requestClose(source) {
    if (this.contained && source !== 'close-button') {
      return false
    }

    const event = new CustomEvent('sl-request-close', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: { source },
    })
    this.dispatchEvent(event)
    const localEvent = new CustomEvent('request-close', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: { source },
    })
    this.dispatchEvent(localEvent)

    if (event.defaultPrevented || localEvent.defaultPrevented) {
      this.denyClose()
      return false
    }

    this.hide()
    return true
  }

  denyClose() {
    const panel = this.shadowRoot?.querySelector('.panel')
    if (!panel) {
      return
    }

    const offset = 8
    const placement = this.placement
    panel.classList.remove('panel--denied')
    panel.style.setProperty('--tot-drawer-deny-offset-x', placement === 'start' ? `${offset}px` : placement === 'end' ? `-${offset}px` : '0')
    panel.style.setProperty('--tot-drawer-deny-offset-y', placement === 'top' ? `${offset}px` : placement === 'bottom' ? `-${offset}px` : '0')
    void panel.offsetWidth
    panel.classList.add('panel--denied')
  }

  handleKeyDown(event) {
    if (event.key !== 'Escape' || !this.open || this.contained) {
      return
    }

    if (event.defaultPrevented || hasActiveFullscreenLayer()) {
      return
    }

    event.preventDefault()
    this.requestClose('keyboard')
  }

  handleOverlayWheel(event) {
    if (!this.open || this.contained) {
      return
    }

    if (!shouldAllowScroll(event, this.shadowRoot?.querySelector('.base'), event.deltaY)) {
      event.preventDefault()
    }
  }

  handleOverlayTouchStart(event) {
    if (!this.open || this.contained || event.touches.length !== 1) {
      return
    }

    this._touchStartY = event.touches[0].clientY
  }

  handleOverlayTouchMove(event) {
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

    if (!shouldAllowScroll(event, this.shadowRoot?.querySelector('.base'), deltaY)) {
      event.preventDefault()
    }
  }

  handleResizeStart(event) {
    if (!this.resizable || !this.open) {
      return
    }

    const panel = this.shadowRoot?.querySelector('.panel')
    const base = this.shadowRoot?.querySelector('.base')
    if (!panel || !base) {
      return
    }

    const placement = this.placement
    const rect = panel.getBoundingClientRect()
    const isVertical = placement === 'top' || placement === 'bottom'
    const axisSize = isVertical ? rect.height : rect.width

    this._activeResize = {
      placement,
      startX: event.clientX,
      startY: event.clientY,
      startSize: axisSize,
      isVertical,
    }
    base.classList.add('base--resizing')
    event.currentTarget.setPointerCapture(event.pointerId)
    document.addEventListener('pointermove', this._handlePointerMove)
    document.addEventListener('pointerup', this._handlePointerUp)
    event.preventDefault()
  }

  handleResizeMove(event) {
    if (!this._activeResize) {
      return
    }

    const resize = this._activeResize
    let delta = resize.isVertical ? event.clientY - resize.startY : event.clientX - resize.startX

    if (resize.placement === 'end' || resize.placement === 'bottom') {
      delta *= -1
    }

    this.setDrawerSize(resize.startSize + delta)
    event.preventDefault()
  }

  handleResizeEnd() {
    this.stopResizeListeners()
  }

  handleResizeKeyDown(event) {
    if (!this.resizable) {
      return
    }

    const placement = this.placement
    const isVertical = placement === 'top' || placement === 'bottom'
    const decreaseKeys = isVertical ? ['ArrowUp'] : ['ArrowLeft']
    const increaseKeys = isVertical ? ['ArrowDown'] : ['ArrowRight']
    const step = event.shiftKey ? 48 : 16
    const panel = this.shadowRoot?.querySelector('.panel')
    if (!panel) {
      return
    }

    const rect = panel.getBoundingClientRect()
    const currentSize = isVertical ? rect.height : rect.width
    let direction = 0

    if (contains(decreaseKeys, event.key)) {
      direction = -1
    } else if (contains(increaseKeys, event.key)) {
      direction = 1
    } else if (event.key === 'Home') {
      this.setDrawerSize(resolveCssLength(this.minSize, this.getResizeLimitBase()) || 0)
      event.preventDefault()
      return
    } else if (event.key === 'End') {
      this.setDrawerSize(resolveCssLength(this.maxSize, this.getResizeLimitBase()) || this.getResizeLimitBase())
      event.preventDefault()
      return
    } else {
      return
    }

    if (placement === 'end' || placement === 'bottom') {
      direction *= -1
    }

    this.setDrawerSize(currentSize + direction * step)
    event.preventDefault()
  }

  setDrawerSize(value) {
    const limitBase = this.getResizeLimitBase()
    const minSize = resolveCssLength(this.minSize, limitBase) || 0
    const maxSize = resolveCssLength(this.maxSize, limitBase) || limitBase
    const maxAllowed = Math.max(minSize, Math.min(maxSize, limitBase))
    const size = clamp(value, minSize, maxAllowed)
    const base = this.shadowRoot?.querySelector('.base')

    this._sizePx = size
    if (base) {
      base.style.setProperty('--tot-drawer-current-size', `${Math.round(size)}px`)
    }
  }

  getResizeLimitBase() {
    const host = this.contained ? this.parentElement : null
    const rect = host ? host.getBoundingClientRect() : null
    const placement = this.placement
    const isVertical = placement === 'top' || placement === 'bottom'

    if (rect && rect.width && rect.height) {
      return isVertical ? rect.height : rect.width
    }

    return isVertical ? window.innerHeight : window.innerWidth
  }

  stopResizeListeners() {
    const base = this.shadowRoot?.querySelector('.base')
    if (base) {
      base.classList.remove('base--resizing')
    }

    document.removeEventListener('pointermove', this._handlePointerMove)
    document.removeEventListener('pointerup', this._handlePointerUp)
    this._activeResize = null
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
    if (state && state.totDrawerToken === this._historyToken) {
      return
    }

    this._skipHistoryOnDeactivate = true
    this.open = false
  }

  pushHistoryState() {
    if (this._historyPushed || typeof history === 'undefined') {
      return
    }

    this._historyToken = `tot-drawer-${Date.now()}-${Math.random().toString(36).slice(2)}`

    try {
      const currentState = history.state && typeof history.state === 'object' ? history.state : {}
      history.pushState({ ...currentState, totDrawerToken: this._historyToken }, '')
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
    const isCurrentDrawerState = state && state.totDrawerToken === this._historyToken
    this._historyPushed = false
    this._historyToken = ''

    if (!isCurrentDrawerState) {
      return
    }

    this._ignoreNextPopState = false
    history.back()
  }

  getEventDetail() {
    return {
      open: this.open,
      label: this.label,
      placement: this.placement,
      contained: this.contained,
      resizable: this.resizable,
    }
  }
}

function emitBoth(element, name, detail) {
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
  const normalizedValue = value || fallback
  for (let i = 0; i < supportedValues.length; i++) {
    if (supportedValues[i] === normalizedValue) {
      return normalizedValue
    }
  }
  return fallback
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
  if (!raw) {
    return null
  }

  const parsed = Number.parseFloat(raw)
  if (!Number.isFinite(parsed)) {
    return null
  }

  if (raw.endsWith('px')) {
    return parsed
  }

  if (raw.endsWith('%')) {
    return reference * parsed / 100
  }

  if (raw.endsWith('vw')) {
    return window.innerWidth * parsed / 100
  }

  if (raw.endsWith('vh')) {
    return window.innerHeight * parsed / 100
  }

  if (raw.endsWith('dvw')) {
    return window.innerWidth * parsed / 100
  }

  if (raw.endsWith('dvh')) {
    return window.innerHeight * parsed / 100
  }

  if (raw.endsWith('rem')) {
    return parsed * getRootFontSize()
  }

  if (raw.endsWith('em')) {
    return parsed * getElementFontSize(document.body)
  }

  if (/^-?\d+(\.\d+)?$/.test(raw)) {
    return parsed
  }

  return null
}

function getRootFontSize() {
  return getElementFontSize(document.documentElement) || 16
}

function getElementFontSize(element) {
  if (!element) {
    return 16
  }

  const value = Number.parseFloat(getComputedStyle(element).fontSize)
  return Number.isFinite(value) ? value : 16
}

function getTransitionDuration(element) {
  if (!element) {
    return 0
  }

  const style = getComputedStyle(element)
  const durations = style.transitionDuration.split(',')
  let maxDuration = 0
  for (let i = 0; i < durations.length; i++) {
    maxDuration = Math.max(maxDuration, parseTime(durations[i]))
  }
  return maxDuration
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
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  return (window.__totFullscreenOpenCount || 0) > 0 || document.documentElement.hasAttribute('data-tot-fullscreen-open')
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

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;')
}
