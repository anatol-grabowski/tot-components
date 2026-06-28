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

  .trigger {
    display: inline-block;
    max-width: 100%;
  }

  .trigger ::slotted(*) {
    max-width: 100%;
  }

  .hint {
    left: 0;
    max-width: min(var(--tot-hint-max-width, 18rem), calc(100vw - 1rem));
    pointer-events: none;
    position: fixed;
    top: 0;
    z-index: var(--tot-z-index-tooltip, 1500);
  }

  .hint[hidden] {
    display: none;
  }

  .hint__surface {
    background: var(--tot-tooltip-background-color, var(--tot-color-neutral-800, #1f2937));
    border-radius: var(--tot-tooltip-border-radius, var(--tot-border-radius-medium, 4px));
    box-shadow: var(--tot-shadow-medium, 0 2px 4px rgb(15 23 42 / 12%));
    color: var(--tot-tooltip-color, var(--tot-color-neutral-0, #fff));
    font-family: var(--tot-tooltip-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-tooltip-font-size, var(--tot-font-size-small, .875rem));
    font-weight: var(--tot-tooltip-font-weight, var(--tot-font-weight-normal, 400));
    line-height: var(--tot-tooltip-line-height, var(--tot-line-height-dense, 1.4));
    overflow-wrap: anywhere;
    padding: var(--tot-tooltip-padding, .25rem .5rem);
  }
`

export class TotHint extends HTMLElement {
  static get observedAttributes() {
    return ['text', 'content', 'open', 'trigger', 'offset']
  }

  constructor() {
    super()
    this._lastPoint = null
    this._positionFrame = 0
    this._hideTimer = 0
    this._touchMode = false
    this._visualViewport = null
    this._handleWindowChange = () => this.schedulePosition()
  }

  get text() {
    return this.getAttribute('text') || this.getAttribute('content') || ''
  }

  set text(value) {
    setNullableAttribute(this, 'text', value)
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    setBooleanAttribute(this, 'open', value)
  }

  get trigger() {
    return this.getAttribute('trigger') || 'hover'
  }

  set trigger(value) {
    setNullableAttribute(this, 'trigger', value)
  }

  get offset() {
    const value = Number.parseFloat(this.getAttribute('offset') || '')
    return Number.isFinite(value) ? value : 12
  }

  set offset(value) {
    setNullableAttribute(this, 'offset', value)
  }

  connectedCallback() {
    this.render()
    window.addEventListener('resize', this._handleWindowChange)
    document.addEventListener('scroll', this._handleWindowChange, true)
    this._visualViewport = window.visualViewport || null
    if (this._visualViewport) {
      this._visualViewport.addEventListener('resize', this._handleWindowChange)
      this._visualViewport.addEventListener('scroll', this._handleWindowChange)
    }
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._handleWindowChange)
    document.removeEventListener('scroll', this._handleWindowChange, true)
    if (this._visualViewport) {
      this._visualViewport.removeEventListener('resize', this._handleWindowChange)
      this._visualViewport.removeEventListener('scroll', this._handleWindowChange)
      this._visualViewport = null
    }
    cancelAnimationFrame(this._positionFrame)
    clearTimeout(this._hideTimer)
  }

  attributeChangedCallback() {
    this.render()
    if (this.open) {
      this.schedulePosition()
    }
  }

  show(eventOrPoint) {
    this.rememberPoint(eventOrPoint)
    if (!this._lastPoint) {
      this._lastPoint = getHostPoint(this)
    }
    this.open = true
    this.schedulePosition()
  }

  showAt(x, y) {
    this._lastPoint = {
      x: Number(x),
      y: Number(y),
    }
    this.open = true
    this.schedulePosition()
  }

  hide() {
    this.open = false
  }

  toggle(eventOrPoint) {
    if (this.open) {
      this.hide()
    } else {
      this.show(eventOrPoint)
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const open = this.open

    root.innerHTML = `<style>${hintStyle}</style>
      <span class="trigger" part="trigger"><slot></slot></span>
      <div class="hint" part="popup" role="tooltip" ${open ? '' : 'hidden'}>
        <div class="hint__surface" part="surface">${escapeHtml(this.text)}</div>
      </div>
    `

    const trigger = root.querySelector('.trigger')
    trigger.addEventListener('pointerdown', (event) => this.handlePointerDown(event))
    trigger.addEventListener('pointerenter', (event) => this.handlePointerEnter(event))
    trigger.addEventListener('pointermove', (event) => this.handlePointerMove(event))
    trigger.addEventListener('pointerleave', (event) => this.handlePointerLeave(event))
    trigger.addEventListener('click', (event) => this.handleClick(event))

    if (open) {
      this.schedulePosition()
    }
  }

  handlePointerDown(event) {
    if (this.trigger !== 'hover' || !isTouchLikeEvent(event)) {
      return
    }

    this.showForTouch()
  }

  handlePointerEnter(event) {
    if (this.trigger !== 'hover') {
      return
    }

    if (isTouchLikeEvent(event)) {
      this.showForTouch()
      return
    }

    clearTimeout(this._hideTimer)
    this._touchMode = false
    this.rememberPoint(event)
    this.open = true
  }

  handlePointerMove(event) {
    if (this._touchMode || isTouchLikeEvent(event)) {
      return
    }

    this.rememberPoint(event)
    if (this.open) {
      this.schedulePosition()
    }
  }

  handlePointerLeave(event) {
    if (this.trigger !== 'hover') {
      return
    }

    if (this._touchMode || isTouchLikeEvent(event)) {
      this.scheduleTouchHide()
      return
    }

    this.open = false
  }

  showForTouch() {
    clearTimeout(this._hideTimer)
    this._touchMode = true
    this._lastPoint = getHostPoint(this)
    this.open = true
    this.schedulePosition()
    this.scheduleTouchHide()
  }

  scheduleTouchHide() {
    clearTimeout(this._hideTimer)
    this._hideTimer = window.setTimeout(() => {
      this._touchMode = false
      this.open = false
    }, 2800)
  }

  handleClick(event) {
    if (this.trigger !== 'click') {
      return
    }

    event.preventDefault()
    this.toggle(event)
  }

  rememberPoint(eventOrPoint) {
    if (!eventOrPoint) {
      return
    }

    if (Number.isFinite(eventOrPoint.clientX) && Number.isFinite(eventOrPoint.clientY)) {
      this._lastPoint = {
        x: eventOrPoint.clientX,
        y: eventOrPoint.clientY,
      }
      return
    }

    if (Number.isFinite(eventOrPoint.x) && Number.isFinite(eventOrPoint.y)) {
      this._lastPoint = {
        x: eventOrPoint.x,
        y: eventOrPoint.y,
      }
    }
  }

  schedulePosition() {
    cancelAnimationFrame(this._positionFrame)
    this._positionFrame = requestAnimationFrame(() => this.updatePosition())
  }

  updatePosition() {
    if (!this.open || !this.shadowRoot) {
      return
    }

    const panel = this.shadowRoot.querySelector('.hint')
    if (!panel) {
      return
    }

    const point = this._lastPoint || getHostPoint(this)
    const viewport = getViewportRect()
    const margin = 8
    const offset = this.offset
    const viewportWidth = Math.max(0, viewport.width - margin * 2)

    panel.style.maxWidth = `min(var(--tot-hint-max-width, 18rem), ${Math.floor(viewportWidth)}px)`

    const panelRect = panel.getBoundingClientRect()
    const panelWidth = Math.min(panelRect.width, viewportWidth)
    const panelHeight = panelRect.height
    let left = 0
    let top = 0

    if (this._touchMode) {
      const coords = getTouchPlacementCoordinates(this, panelWidth, panelHeight, viewport, offset, margin)
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

    panel.style.left = `${Math.round(left)}px`
    panel.style.top = `${Math.round(top)}px`
  }
}

function getHostPoint(element) {
  const rect = element.getBoundingClientRect()
  return {
    x: rect.left + rect.width,
    y: rect.top + rect.height,
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
