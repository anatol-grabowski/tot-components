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

  .trigger {
    display: inline-block;
    max-width: 100%;
  }

  .trigger ::slotted(*) {
    max-width: 100%;
  }

  .tooltip {
    left: 0;
    max-width: min(var(--tot-tooltip-panel-max-width, 24rem), calc(100vw - 1rem));
    min-width: var(--tot-tooltip-panel-min-width, 0);
    position: fixed;
    top: 0;
    z-index: var(--tot-z-index-tooltip, 1500);
  }

  .tooltip[hidden] {
    display: none;
  }

  .tooltip__surface {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
    border-radius: var(--tot-border-radius-medium, 4px);
    box-shadow: var(--tot-shadow-large, 0 2px 8px rgb(15 23 42 / 12%));
    color: var(--tot-input-color, #1e293b);
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    line-height: var(--tot-line-height-dense, 1.4);
    max-height: var(--tot-tooltip-panel-max-height, none);
    max-width: 100%;
    overflow: auto;
    padding: var(--tot-tooltip-panel-padding, var(--tot-spacing-small, .75rem));
  }

  .tooltip__content {
    min-width: 0;
  }

  .tooltip__content ::slotted(*) {
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
    return ['content', 'text', 'open', 'trigger', 'placement', 'position', 'offset']
  }

  constructor() {
    super()
    this._positionFrame = 0
    this._hideTimer = 0
    this._visualViewport = null
    this._handleWindowChange = () => this.schedulePanelPosition()
    this._handleDocumentPointerDown = event => this.handleDocumentPointerDown(event)
    this._handleKeyDown = event => this.handleKeyDown(event)
  }

  get content() {
    return this.getAttribute('content') || this.getAttribute('text') || ''
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

  get trigger() {
    return this.getAttribute('trigger') || 'hover'
  }

  set trigger(value) {
    setNullableAttribute(this, 'trigger', value)
  }

  get placement() {
    return normalizePlacement(this.getAttribute('placement') || this.getAttribute('position') || 'bottom-start')
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
    this.render()
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

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this._handleDocumentPointerDown, true)
    document.removeEventListener('keydown', this._handleKeyDown)
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
    if (this.open) {
      this.schedulePanelPosition()
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const open = this.open

    root.innerHTML = `<style>${tooltipStyle}</style>
      <span class="trigger" part="trigger"><slot></slot></span>
      <div class="tooltip" part="panel" role="tooltip" ${open ? '' : 'hidden'}>
        <div class="tooltip__surface" part="surface">
          <div class="tooltip__content" part="content"><slot name="content">${escapeHtml(this.content)}</slot></div>
        </div>
      </div>
    `

    const trigger = root.querySelector('.trigger')
    const panel = root.querySelector('.tooltip')
    const contentSlot = root.querySelector('slot[name="content"]')

    trigger.addEventListener('pointerdown', (event) => this.handleTriggerPointerDown(event))
    trigger.addEventListener('pointerenter', (event) => this.handleTriggerEnter(event))
    trigger.addEventListener('pointerleave', (event) => this.handleTriggerLeave(event))
    trigger.addEventListener('click', (event) => this.handleTriggerClick(event))
    trigger.addEventListener('focusin', (event) => this.handleTriggerEnter(event))
    trigger.addEventListener('focusout', (event) => this.handleTriggerLeave(event))
    panel.addEventListener('pointerdown', () => this.handlePanelEnter())
    panel.addEventListener('pointerenter', (event) => this.handlePanelEnter(event))
    panel.addEventListener('pointerleave', (event) => this.handlePanelLeave(event))
    panel.addEventListener('focusin', (event) => this.handlePanelEnter(event))
    panel.addEventListener('focusout', (event) => this.handlePanelLeave(event))
    contentSlot.addEventListener('slotchange', () => this.schedulePanelPosition())

    if (open) {
      this.schedulePanelPosition()
    }
  }

  handleTriggerPointerDown(event) {
    if (this.trigger !== 'hover' || !isTouchLikeEvent(event)) {
      return
    }

    clearTimeout(this._hideTimer)
    this.open = true
    this.schedulePanelPosition()
  }

  handleTriggerEnter(event) {
    if (this.trigger !== 'hover') {
      return
    }

    clearTimeout(this._hideTimer)
    this.open = true
  }

  handleTriggerLeave(event) {
    if (this.trigger !== 'hover') {
      return
    }

    if (isTouchLikeEvent(event)) {
      return
    }

    this.scheduleHide()
  }

  handlePanelEnter() {
    if (this.trigger === 'hover') {
      clearTimeout(this._hideTimer)
    }
  }

  handlePanelLeave(event) {
    if (this.trigger !== 'hover') {
      return
    }

    if (isTouchLikeEvent(event)) {
      return
    }

    this.scheduleHide()
  }

  handleTriggerClick(event) {
    if (this.trigger !== 'click') {
      return
    }

    event.preventDefault()
    this.toggle()
  }

  handleDocumentPointerDown(event) {
    if (!this.open) {
      return
    }

    if (this.trigger !== 'click' && !(this.trigger === 'hover' && isCoarsePointer())) {
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
    cancelAnimationFrame(this._positionFrame)
    this._positionFrame = requestAnimationFrame(() => this.updatePanelPosition())
  }

  updatePanelPosition() {
    if (!this.open || !this.shadowRoot) {
      return
    }

    const trigger = this.shadowRoot.querySelector('.trigger')
    const panel = this.shadowRoot.querySelector('.tooltip')
    const surface = this.shadowRoot.querySelector('.tooltip__surface')
    if (!trigger || !panel || !surface) {
      return
    }

    const triggerRect = trigger.getBoundingClientRect()
    if (!triggerRect.width && !triggerRect.height) {
      return
    }

    const viewport = getViewportRect()
    const margin = 8
    const gap = this.offset
    const viewportWidth = Math.max(0, viewport.width - margin * 2)

    panel.style.maxWidth = `min(var(--tot-tooltip-panel-max-width, 24rem), ${Math.floor(viewportWidth)}px)`
    panel.style.setProperty('--tot-tooltip-panel-max-height', 'none')

    const panelRect = panel.getBoundingClientRect()
    const panelWidth = Math.min(panelRect.width, viewportWidth)
    const panelHeight = panelRect.height
    const placement = choosePlacement(this.placement, triggerRect, panelWidth, panelHeight, viewport, gap, margin)
    const coords = getPlacementCoordinates(placement, triggerRect, panelWidth, panelHeight, viewport, gap, margin)
    const availableHeight = getAvailableHeight(placement, triggerRect, viewport, gap, margin)

    panel.style.left = `${Math.round(coords.left)}px`
    panel.style.top = `${Math.round(coords.top)}px`
    panel.style.setProperty('--tot-tooltip-panel-max-height', `${Math.floor(availableHeight)}px`)
  }
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

function choosePlacement(preferredPlacement, triggerRect, panelWidth, panelHeight, viewport, gap, margin) {
  const base = preferredPlacement.split('-')[0]
  const candidates = getPlacementCandidates(preferredPlacement)

  for (let i = 0; i < candidates.length; i++) {
    const placement = candidates[i]
    const space = getPlacementSpace(placement, triggerRect, viewport, gap, margin)
    if (space.width >= panelWidth && space.height >= panelHeight) {
      return placement
    }
  }

  let best = candidates[0]
  let bestArea = -1
  for (let i = 0; i < candidates.length; i++) {
    const space = getPlacementSpace(candidates[i], triggerRect, viewport, gap, margin)
    const area = space.width * space.height
    if (area > bestArea) {
      best = candidates[i]
      bestArea = area
    }
  }

  if (base === 'bottom' || base === 'top' || base === 'left' || base === 'right') {
    return best
  }

  return preferredPlacement
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

function getPlacementSpace(placement, triggerRect, viewport, gap, margin) {
  const base = placement.split('-')[0]
  if (base === 'top') {
    return {
      width: viewport.width - margin * 2,
      height: Math.max(0, triggerRect.top - viewport.top - gap - margin),
    }
  }

  if (base === 'bottom') {
    return {
      width: viewport.width - margin * 2,
      height: Math.max(0, viewport.bottom - triggerRect.bottom - gap - margin),
    }
  }

  if (base === 'left') {
    return {
      width: Math.max(0, triggerRect.left - viewport.left - gap - margin),
      height: viewport.height - margin * 2,
    }
  }

  return {
    width: Math.max(0, viewport.right - triggerRect.right - gap - margin),
    height: viewport.height - margin * 2,
  }
}

function getPlacementCoordinates(placement, triggerRect, panelWidth, panelHeight, viewport, gap, margin) {
  const base = placement.split('-')[0]
  const align = placement.includes('-') ? placement.split('-')[1] : 'center'
  let left = triggerRect.left
  let top = triggerRect.bottom + gap

  if (base === 'top') {
    top = triggerRect.top - panelHeight - gap
  } else if (base === 'left') {
    left = triggerRect.left - panelWidth - gap
    top = alignCrossAxis(align, triggerRect.top, triggerRect.bottom, panelHeight)
  } else if (base === 'right') {
    left = triggerRect.right + gap
    top = alignCrossAxis(align, triggerRect.top, triggerRect.bottom, panelHeight)
  } else {
    top = triggerRect.bottom + gap
  }

  if (base === 'top' || base === 'bottom') {
    left = alignCrossAxis(align, triggerRect.left, triggerRect.right, panelWidth)
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

function getAvailableHeight(placement, triggerRect, viewport, gap, margin) {
  const base = placement.split('-')[0]
  if (base === 'top') {
    return Math.max(0, triggerRect.top - viewport.top - gap - margin)
  }

  if (base === 'bottom') {
    return Math.max(0, viewport.bottom - triggerRect.bottom - gap - margin)
  }

  return Math.max(0, viewport.height - margin * 2)
}

function normalizePlacement(value) {
  const normalized = String(value || 'bottom-start')
    .trim()
    .toLowerCase()
    .replace('bottom-right', 'bottom-start')
    .replace('bottom-left', 'bottom-end')
    .replace('top-right', 'top-start')
    .replace('top-left', 'top-end')

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
