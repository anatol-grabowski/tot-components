const tooltipStyle = `
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
    max-width: min(var(--tot-tooltip-panel-max-width, 24rem), calc(100vw - 1rem));
    min-width: var(--tot-tooltip-panel-min-width, 0);
    position: fixed;
    top: 0;
    z-index: var(--tot-z-index-tooltip, 1500);
  }

  .panel[hidden] {
    display: none;
  }

  .surface {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
    border-radius: var(--tot-border-radius-medium, 4px);
    box-shadow: var(--tot-shadow-large, 0 2px 8px rgb(15 23 42 / 12%));
    color: var(--tot-input-color, #1e293b);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    line-height: var(--tot-line-height-dense, 1.4);
    max-height: var(--tot-tooltip-panel-max-height, none);
    max-width: 100%;
    overflow: auto;
    padding: var(--tot-tooltip-panel-padding, var(--tot-spacing-small, .75rem));
  }

  .content {
    display: block;
    min-width: 0;
  }

  .content ::slotted(*) {
    margin-top: 0;
  }
`

const placements = [
  'bottom-start',
  'bottom-end',
  'bottom',
  'top-start',
  'top-end',
  'top',
  'right-start',
  'right-end',
  'right',
  'left-start',
  'left-end',
  'left',
]

export class TotTooltip extends HTMLElement {
  static get observedAttributes() {
    return ['content', 'open', 'activation', 'placement', 'offset']
  }

  constructor() {
    super()
    this._positionFrame = 0
    this._hideTimer = 0
    this._visualViewport = null
    this._listeningWhileOpen = false
    this._handleWindowChange = () => this.schedulePanelPosition()
    this._handleDocumentPointerDown = event => this.handleDocumentPointerDown(event)
    this._handleKeyDown = event => this.handleKeyDown(event)

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${tooltipStyle}</style>
      <span class="base" part="base">
        <span class="anchor" part="anchor"><slot></slot></span>
        <span class="panel" part="panel" role="tooltip" hidden>
          <span class="surface" part="surface">
            <span class="content" part="content"><slot name="content"></slot></span>
          </span>
        </span>
      </span>
    `

    this._baseElement = root.querySelector('.base')
    this._anchorElement = root.querySelector('.anchor')
    this._panelElement = root.querySelector('.panel')
    this._surfaceElement = root.querySelector('.surface')
    this._contentElement = root.querySelector('.content')
    this._contentSlot = root.querySelector('slot[name="content"]')

    this._anchorElement.addEventListener('pointerdown', event => this.handleAnchorPointerDown(event))
    this._anchorElement.addEventListener('pointerenter', () => this.handleAnchorEnter())
    this._anchorElement.addEventListener('pointerleave', event => this.handleAnchorLeave(event))
    this._anchorElement.addEventListener('click', event => this.handleAnchorClick(event))
    this._anchorElement.addEventListener('focusin', () => this.handleAnchorEnter())
    this._anchorElement.addEventListener('focusout', event => this.handleAnchorLeave(event))
    this._panelElement.addEventListener('pointerdown', () => this.handlePanelEnter())
    this._panelElement.addEventListener('pointerenter', () => this.handlePanelEnter())
    this._panelElement.addEventListener('pointerleave', event => this.handlePanelLeave(event))
    this._panelElement.addEventListener('focusin', () => this.handlePanelEnter())
    this._panelElement.addEventListener('focusout', event => this.handlePanelLeave(event))
    this._contentSlot.addEventListener('slotchange', () => this.schedulePanelPosition())
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

  get placement() {
    return normalizePlacement(this.getAttribute('placement'))
  }

  set placement(value) {
    setNullableAttribute(this, 'placement', value)
  }

  get offset() {
    const value = Number.parseFloat(this.getAttribute('offset') || '')
    return Number.isFinite(value) ? value : 4
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
    this.open = true
    this.schedulePanelPosition()
  }

  hide() {
    this.open = false
  }

  toggle() {
    this.open = !this.open
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
    this._contentSlot.textContent = this.content
  }

  syncOpenState() {
    this._panelElement.hidden = !this.open
    if (this.open && this.isConnected) {
      this.startOpenListeners()
      this.schedulePanelPosition()
      return
    }

    clearTimeout(this._hideTimer)
    cancelAnimationFrame(this._positionFrame)
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

    clearTimeout(this._hideTimer)
    this.open = true
  }

  handleAnchorEnter() {
    if (this.activation !== 'hover') {
      return
    }

    clearTimeout(this._hideTimer)
    this.open = true
  }

  handleAnchorLeave(event) {
    if (this.activation !== 'hover' || isTouchLikeEvent(event)) {
      return
    }

    this.scheduleHide()
  }

  handlePanelEnter() {
    if (this.activation === 'hover') {
      clearTimeout(this._hideTimer)
    }
  }

  handlePanelLeave(event) {
    if (this.activation !== 'hover' || isTouchLikeEvent(event)) {
      return
    }

    this.scheduleHide()
  }

  handleAnchorClick(event) {
    if (this.activation !== 'click') {
      return
    }

    event.preventDefault()
    this.toggle()
  }

  handleDocumentPointerDown(event) {
    if (!this.open) {
      return
    }

    if (this.activation !== 'click' && !(this.activation === 'hover' && isCoarsePointer())) {
      return
    }

    const path = event.composedPath()
    for (let i = 0; i < path.length; i++) {
      if (path[i] === this) {
        return
      }
    }

    this.open = false
  }

  handleKeyDown(event) {
    if (event.key === 'Escape' && this.open) {
      this.open = false
    }
  }

  scheduleHide() {
    clearTimeout(this._hideTimer)
    this._hideTimer = window.setTimeout(() => {
      if (this.matches(':focus-within')) {
        return
      }

      this.open = false
    }, 120)
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

    const anchorRect = this._anchorElement.getBoundingClientRect()
    if (!anchorRect.width && !anchorRect.height) {
      return
    }

    const viewport = getViewportRect()
    const margin = 8
    const gap = this.offset
    const viewportWidth = Math.max(0, viewport.width - margin * 2)

    this._panelElement.style.maxWidth = `min(var(--tot-tooltip-panel-max-width, 24rem), ${Math.floor(viewportWidth)}px)`
    this._panelElement.style.setProperty('--tot-tooltip-panel-max-height', 'none')

    const panelRect = this._panelElement.getBoundingClientRect()
    const panelWidth = Math.min(panelRect.width, viewportWidth)
    const panelHeight = panelRect.height
    const placement = choosePlacement(this.placement, anchorRect, panelWidth, panelHeight, viewport, gap, margin)
    const coords = getPlacementCoordinates(placement, anchorRect, panelWidth, panelHeight, viewport, gap, margin)
    const availableHeight = getAvailableHeight(placement, anchorRect, viewport, gap, margin)

    this._panelElement.style.left = `${Math.round(coords.left)}px`
    this._panelElement.style.top = `${Math.round(coords.top)}px`
    this._panelElement.style.setProperty('--tot-tooltip-panel-max-height', `${Math.floor(availableHeight)}px`)
  }
}

function normalizeActivation(value) {
  return value === 'click' || value === 'none' ? value : 'hover'
}

function isTouchLikeEvent(event) {
  if (!event || !('pointerType' in event)) {
    return false
  }

  return event.pointerType === 'touch' || event.pointerType === 'pen'
}

function isCoarsePointer() {
  return typeof matchMedia === 'function' && matchMedia('(hover: none), (pointer: coarse)').matches
}

function choosePlacement(preferredPlacement, anchorRect, panelWidth, panelHeight, viewport, gap, margin) {
  const candidates = getPlacementCandidates(preferredPlacement)

  for (let i = 0; i < candidates.length; i++) {
    const placement = candidates[i]
    const space = getPlacementSpace(placement, anchorRect, viewport, gap, margin)
    if (space.width >= panelWidth && space.height >= panelHeight) {
      return placement
    }
  }

  let best = candidates[0]
  let bestArea = -1
  for (let i = 0; i < candidates.length; i++) {
    const space = getPlacementSpace(candidates[i], anchorRect, viewport, gap, margin)
    const area = space.width * space.height
    if (area > bestArea) {
      best = candidates[i]
      bestArea = area
    }
  }

  return best
}

function getPlacementCandidates(placement) {
  const suffix = placement.includes('-') ? placement.slice(placement.indexOf('-')) : ''
  const base = placement.split('-')[0]

  if (base === 'top' || base === 'bottom') {
    return [placement, `${base === 'top' ? 'bottom' : 'top'}${suffix}`, 'right', 'left']
  }

  if (base === 'left' || base === 'right') {
    return [placement, `${base === 'left' ? 'right' : 'left'}${suffix}`, 'bottom-start', 'top-start']
  }

  return [placement]
}

function getPlacementSpace(placement, anchorRect, viewport, gap, margin) {
  const base = placement.split('-')[0]
  if (base === 'top') {
    return {
      width: viewport.width - margin * 2,
      height: Math.max(0, anchorRect.top - viewport.top - gap - margin),
    }
  }

  if (base === 'bottom') {
    return {
      width: viewport.width - margin * 2,
      height: Math.max(0, viewport.bottom - anchorRect.bottom - gap - margin),
    }
  }

  if (base === 'left') {
    return {
      width: Math.max(0, anchorRect.left - viewport.left - gap - margin),
      height: viewport.height - margin * 2,
    }
  }

  return {
    width: Math.max(0, viewport.right - anchorRect.right - gap - margin),
    height: viewport.height - margin * 2,
  }
}

function getPlacementCoordinates(placement, anchorRect, panelWidth, panelHeight, viewport, gap, margin) {
  const base = placement.split('-')[0]
  const align = placement.includes('-') ? placement.split('-')[1] : 'center'
  let left = anchorRect.left
  let top = anchorRect.bottom + gap

  if (base === 'top') {
    top = anchorRect.top - panelHeight - gap
  } else if (base === 'left') {
    left = anchorRect.left - panelWidth - gap
    top = alignCrossAxis(align, anchorRect.top, anchorRect.bottom, panelHeight)
  } else if (base === 'right') {
    left = anchorRect.right + gap
    top = alignCrossAxis(align, anchorRect.top, anchorRect.bottom, panelHeight)
  }

  if (base === 'top' || base === 'bottom') {
    left = alignCrossAxis(align, anchorRect.left, anchorRect.right, panelWidth)
  }

  left = clamp(left, viewport.left + margin, viewport.right - panelWidth - margin)
  top = clamp(top, viewport.top + margin, viewport.bottom - panelHeight - margin)

  return { left, top }
}

function alignCrossAxis(align, start, end, size) {
  if (align === 'end') {
    return end - size
  }

  if (align === 'start') {
    return start
  }

  return start + (end - start - size) / 2
}

function getAvailableHeight(placement, anchorRect, viewport, gap, margin) {
  const base = placement.split('-')[0]
  if (base === 'top') {
    return Math.max(0, anchorRect.top - viewport.top - gap - margin)
  }

  if (base === 'bottom') {
    return Math.max(0, viewport.bottom - anchorRect.bottom - gap - margin)
  }

  return Math.max(0, viewport.height - margin * 2)
}

function normalizePlacement(value) {
  const normalized = String(value || 'bottom-start').trim().toLowerCase()

  for (let i = 0; i < placements.length; i++) {
    if (placements[i] === normalized) {
      return normalized
    }
  }

  return 'bottom-start'
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
