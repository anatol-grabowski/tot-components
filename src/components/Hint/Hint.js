const hintStyle = `
  :host {
    display: inline-block;
    max-width: 100%;
    position: relative;
    vertical-align: middle;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .base,
  .anchor {
    display: inline-block;
    max-width: 100%;
  }

  .anchor ::slotted(*) {
    max-width: 100%;
  }

  .panel {
    display: block;
    left: 0;
    max-width: min(var(--tot-hint-max-width, 18rem), calc(100vw - 1rem));
    pointer-events: none;
    position: fixed;
    top: 0;
    z-index: var(--tot-z-index-tooltip, 1500);
  }

  .panel[hidden] {
    display: none;
  }

  .surface {
    background: var(--tot-tooltip-background-color, var(--tot-color-neutral-800, #1f2937));
    border-radius: var(--tot-tooltip-border-radius, var(--tot-border-radius-medium, 4px));
    box-shadow: var(--tot-shadow-medium, 0 2px 4px rgb(15 23 42 / 12%));
    color: var(--tot-tooltip-color, var(--tot-color-neutral-0, #fff));
    display: block;
    font-family: var(--tot-tooltip-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-tooltip-font-size, var(--tot-font-size-small, .875rem));
    font-weight: var(--tot-tooltip-font-weight, var(--tot-font-weight-normal, 400));
    line-height: var(--tot-tooltip-line-height, var(--tot-line-height-dense, 1.4));
    overflow-wrap: anywhere;
    padding: var(--tot-tooltip-padding, .25rem .5rem);
  }

  .content {
    display: block;
  }
`

export class TotHint extends HTMLElement {
  static get observedAttributes() {
    return ['content', 'open', 'activation', 'offset']
  }

  constructor() {
    super()
    this._point = null
    this._positionFrame = 0
    this._hideTimer = 0
    this._touchMode = false
    this._visualViewport = null
    this._listeningWhileOpen = false
    this._handleWindowChange = () => this.schedulePanelPosition()
    this._handleDocumentPointerDown = event => this.handleDocumentPointerDown(event)
    this._handleKeyDown = event => this.handleKeyDown(event)

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${hintStyle}</style>
      <span class="base" part="base">
        <span class="anchor" part="anchor"><slot></slot></span>
        <span class="panel" part="panel" role="tooltip" hidden>
          <span class="surface" part="surface">
            <span class="content" part="content"></span>
          </span>
        </span>
      </span>
    `

    this._baseElement = root.querySelector('.base')
    this._anchorElement = root.querySelector('.anchor')
    this._panelElement = root.querySelector('.panel')
    this._surfaceElement = root.querySelector('.surface')
    this._contentElement = root.querySelector('.content')

    this._anchorElement.addEventListener('pointerdown', event => this.handleAnchorPointerDown(event))
    this._anchorElement.addEventListener('pointerenter', event => this.handleAnchorPointerEnter(event))
    this._anchorElement.addEventListener('pointermove', event => this.handleAnchorPointerMove(event))
    this._anchorElement.addEventListener('pointerleave', event => this.handleAnchorPointerLeave(event))
    this._anchorElement.addEventListener('click', event => this.handleAnchorClick(event))
    this._anchorElement.addEventListener('focusin', () => this.handleAnchorFocusIn())
    this._anchorElement.addEventListener('focusout', () => this.handleAnchorFocusOut())
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

  get activation() {
    return normalizeActivation(this.getAttribute('activation'))
  }

  set activation(value) {
    setNullableAttribute(this, 'activation', value)
  }

  get offset() {
    const value = Number.parseFloat(this.getAttribute('offset') || '')
    return Number.isFinite(value) ? value : 12
  }

  set offset(value) {
    setNullableAttribute(this, 'offset', value)
  }

  connectedCallback() {
    this.syncContent()
    this.syncOpenState()
  }

  disconnectedCallback() {
    this.stopOpenListeners()
    cancelAnimationFrame(this._positionFrame)
    clearTimeout(this._hideTimer)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'content') {
      this.syncContent()
      this.schedulePanelPosition()
    } else if (name === 'open') {
      this.syncOpenState()
    } else if (this.open) {
      this.schedulePanelPosition()
    }
  }

  show() {
    this._touchMode = false
    clearTimeout(this._hideTimer)
    this._point = getAnchorPoint(this._anchorElement)
    this.open = true
    this.schedulePanelPosition()
  }

  showAt(clientX, clientY) {
    const x = Number(clientX)
    const y = Number(clientY)
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      this.show()
      return
    }

    this._touchMode = false
    clearTimeout(this._hideTimer)
    this._point = { x, y }
    this.open = true
    this.schedulePanelPosition()
  }

  hide() {
    this.open = false
  }

  getBase() {
    return this._baseElement
  }

  getAnchor() {
    return this._anchorElement
  }

  getPanel() {
    return this._panelElement
  }

  getSurface() {
    return this._surfaceElement
  }

  getContent() {
    return this._contentElement
  }

  render() {
    this.syncContent()
    this.syncOpenState()
  }

  syncContent() {
    this._contentElement.textContent = this.content
  }

  syncOpenState() {
    this._panelElement.hidden = !this.open
    if (this.open && this.isConnected) {
      this.startOpenListeners()
      this.schedulePanelPosition()
      return
    }

    cancelAnimationFrame(this._positionFrame)
    clearTimeout(this._hideTimer)
    this._touchMode = false
    this.stopOpenListeners()
  }

  startOpenListeners() {
    if (this._listeningWhileOpen) {
      return
    }

    this._listeningWhileOpen = true
    document.addEventListener('pointerdown', this._handleDocumentPointerDown, true)
    document.addEventListener('keydown', this._handleKeyDown)
    window.addEventListener('resize', this._handleWindowChange)
    document.addEventListener('scroll', this._handleWindowChange, true)
    this._visualViewport = window.visualViewport || null
    if (this._visualViewport) {
      this._visualViewport.addEventListener('resize', this._handleWindowChange)
      this._visualViewport.addEventListener('scroll', this._handleWindowChange)
    }
  }

  stopOpenListeners() {
    if (!this._listeningWhileOpen) {
      return
    }

    this._listeningWhileOpen = false
    document.removeEventListener('pointerdown', this._handleDocumentPointerDown, true)
    document.removeEventListener('keydown', this._handleKeyDown)
    window.removeEventListener('resize', this._handleWindowChange)
    document.removeEventListener('scroll', this._handleWindowChange, true)
    if (this._visualViewport) {
      this._visualViewport.removeEventListener('resize', this._handleWindowChange)
      this._visualViewport.removeEventListener('scroll', this._handleWindowChange)
      this._visualViewport = null
    }
  }

  handleAnchorPointerDown(event) {
    if (this.activation !== 'hover' || !isTouchLikeEvent(event)) {
      return
    }

    this.showForTouch()
  }

  handleAnchorPointerEnter(event) {
    if (this.activation !== 'hover') {
      return
    }

    if (isTouchLikeEvent(event)) {
      this.showForTouch()
      return
    }

    clearTimeout(this._hideTimer)
    this._touchMode = false
    this.rememberClientPoint(event)
    this.open = true
  }

  handleAnchorPointerMove(event) {
    if (this.activation !== 'hover' || this._touchMode || isTouchLikeEvent(event)) {
      return
    }

    this.rememberClientPoint(event)
    if (this.open) {
      this.schedulePanelPosition()
    }
  }

  handleAnchorPointerLeave(event) {
    if (this.activation !== 'hover') {
      return
    }

    if (this._touchMode || isTouchLikeEvent(event)) {
      this.scheduleTouchHide()
      return
    }

    if (!this.matches(':focus-within')) {
      this.open = false
    }
  }

  handleAnchorFocusIn() {
    if (this.activation !== 'hover') {
      return
    }

    clearTimeout(this._hideTimer)
    this._touchMode = false
    this._point = getAnchorPoint(this._anchorElement)
    this.open = true
  }

  handleAnchorFocusOut() {
    if (this.activation !== 'hover' || this._touchMode) {
      return
    }

    queueMicrotask(() => {
      if (!this.matches(':focus-within')) {
        this.open = false
      }
    })
  }

  handleAnchorClick(event) {
    if (this.activation !== 'click') {
      return
    }

    event.preventDefault()
    if (this.open) {
      this.hide()
      return
    }

    this._touchMode = false
    this._point = event.detail > 0 && Number.isFinite(event.clientX) && Number.isFinite(event.clientY)
      ? { x: event.clientX, y: event.clientY }
      : getAnchorPoint(this._anchorElement)
    this.open = true
  }

  showForTouch() {
    clearTimeout(this._hideTimer)
    this._touchMode = true
    this._point = getAnchorPoint(this._anchorElement)
    this.open = true
    this.scheduleTouchHide()
  }

  scheduleTouchHide() {
    clearTimeout(this._hideTimer)
    this._hideTimer = window.setTimeout(() => {
      this._touchMode = false
      this.open = false
    }, 2800)
  }

  handleDocumentPointerDown(event) {
    if (!this.open || (this.activation !== 'click' && !this._touchMode)) {
      return
    }

    const path = event.composedPath()
    for (let i = 0; i < path.length; i++) {
      if (path[i] === this) {
        return
      }
    }

    this.hide()
  }

  handleKeyDown(event) {
    if (event.key === 'Escape' && this.open) {
      this.hide()
    }
  }

  rememberClientPoint(event) {
    if (!Number.isFinite(event.clientX) || !Number.isFinite(event.clientY)) {
      return
    }

    this._point = {
      x: event.clientX,
      y: event.clientY,
    }
  }

  schedulePanelPosition() {
    if (!this.open || !this.isConnected) {
      return
    }

    cancelAnimationFrame(this._positionFrame)
    this._positionFrame = requestAnimationFrame(() => this.updatePanelPosition())
  }

  updatePanelPosition() {
    if (!this.open) {
      return
    }

    const point = this._point || getAnchorPoint(this._anchorElement)
    const viewport = getViewportRect()
    const margin = 8
    const offset = this.offset
    const viewportWidth = Math.max(0, viewport.width - margin * 2)

    this._panelElement.style.maxWidth = `min(var(--tot-hint-max-width, 18rem), ${Math.floor(viewportWidth)}px)`

    const panelRect = this._panelElement.getBoundingClientRect()
    const panelWidth = Math.min(panelRect.width, viewportWidth)
    const panelHeight = panelRect.height
    let left = 0
    let top = 0

    if (this._touchMode) {
      const coords = getTouchPlacementCoordinates(this._anchorElement, panelWidth, panelHeight, viewport, offset, margin)
      left = coords.left
      top = coords.top
    } else {
      const rightSpace = viewport.right - point.x - offset - margin
      const bottomSpace = viewport.bottom - point.y - offset - margin
      const placeLeft = panelWidth > rightSpace && point.x - viewport.left > rightSpace
      const placeAbove = panelHeight > bottomSpace && point.y - viewport.top > bottomSpace
      left = placeLeft ? point.x - panelWidth - offset : point.x + offset
      top = placeAbove ? point.y - panelHeight - offset : point.y + offset
    }

    left = clamp(left, viewport.left + margin, viewport.right - panelWidth - margin)
    top = clamp(top, viewport.top + margin, viewport.bottom - panelHeight - margin)

    this._panelElement.style.left = `${Math.round(left)}px`
    this._panelElement.style.top = `${Math.round(top)}px`
  }
}

function normalizeActivation(value) {
  return value === 'click' || value === 'none' ? value : 'hover'
}

function getAnchorPoint(element) {
  const rect = element.getBoundingClientRect()
  return {
    x: rect.right,
    y: rect.bottom,
  }
}

function getTouchPlacementCoordinates(element, panelWidth, panelHeight, viewport, offset, margin) {
  const rect = element.getBoundingClientRect()
  const topSpace = rect.top - viewport.top - offset - margin
  const bottomSpace = viewport.bottom - rect.bottom - offset - margin
  const placeAbove = topSpace >= panelHeight || topSpace > bottomSpace
  return {
    left: rect.left + (rect.width - panelWidth) / 2,
    top: placeAbove ? rect.top - panelHeight - offset : rect.bottom + offset,
  }
}

function isTouchLikeEvent(event) {
  if (!event || !('pointerType' in event)) {
    return false
  }

  return event.pointerType === 'touch' || event.pointerType === 'pen'
}

function getViewportRect() {
  const viewport = window.visualViewport
  if (!viewport) {
    return {
      left: 0,
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  return {
    left: viewport.offsetLeft,
    top: viewport.offsetTop,
    right: viewport.offsetLeft + viewport.width,
    bottom: viewport.offsetTop + viewport.height,
    width: viewport.width,
    height: viewport.height,
  }
}

function clamp(value, min, max) {
  if (max < min) {
    return min
  }

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
