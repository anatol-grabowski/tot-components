const dropdownStyle = `
  :host {
    display: inline-block;
    max-width: 100%;
    position: relative;
    vertical-align: middle;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .dropdown {
    display: inline-block;
    max-width: 100%;
    position: relative;
  }

  .trigger {
    display: inline-block;
    max-width: 100%;
  }

  .trigger ::slotted(*) {
    max-width: 100%;
  }

  .panel {
    left: 0;
    max-width: min(var(--tot-dropdown-max-width, 28rem), calc(100vw - 1rem));
    min-width: var(--tot-dropdown-min-width, 12rem);
    position: absolute;
    top: calc(100% + var(--tot-dropdown-panel-gap, var(--tot-spacing-2x-small, .25rem)));
    z-index: var(--tot-z-index-dropdown, 1000);
  }

  .dropdown--hoist .panel {
    position: fixed;
    top: 0;
  }

  .panel[hidden],
  .panel slot[hidden],
  .panel tot-menu[hidden] {
    display: none;
  }

  .panel > tot-menu,
  ::slotted(tot-menu) {
    --tot-menu-max-height: var(--tot-dropdown-menu-max-height, min(20rem, 60vh));
    --tot-menu-overflow: auto;
    display: block;
    min-width: 0;
    width: 100%;
  }
`

export class TotDropdown extends HTMLElement {
  static get observedAttributes() {
    return [
      'label',
      'items',
      'open',
      'hoist',
      'stay-open-on-select',
      'stayopenonselect',
    ]
  }

  constructor() {
    super()
    this._items = undefined
    this._positionFrame = 0
    this._visualViewport = null
    this._listeningWhileOpen = false
    this._ariaTrigger = null
    this._triggerAriaFrame = 0
    this._handleDocumentPointerDown = event => this.handleDocumentPointerDown(event)
    this._handleWindowChange = () => this.schedulePanelPosition()

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${dropdownStyle}</style>
      <div class="dropdown" part="base">
        <span class="trigger" part="trigger">
          <slot name="trigger">
            <tot-button class="fallback-button" part="button" caret></tot-button>
          </slot>
        </span>
        <div class="panel" part="panel" hidden>
          <slot class="menu-slot"></slot>
          <tot-menu class="generated-menu" part="menu"></tot-menu>
        </div>
      </div>
    `

    this._baseElement = root.querySelector('.dropdown')
    this._triggerElement = root.querySelector('.trigger')
    this._triggerSlot = root.querySelector('slot[name="trigger"]')
    this._fallbackButton = root.querySelector('.fallback-button')
    this._panelElement = root.querySelector('.panel')
    this._menuSlot = root.querySelector('.menu-slot')
    this._generatedMenu = root.querySelector('.generated-menu')
    this._triggerElement.addEventListener('click', (event) => this.handleTriggerClick(event))
    this._triggerElement.addEventListener('keydown', (event) => this.handleTriggerKeyDown(event))
    this._triggerSlot.addEventListener('slotchange', () => this.handleTriggerSlotChange())
    this._menuSlot.addEventListener('slotchange', () => this.handleMenuSlotChange())
    this._panelElement.addEventListener('select', (event) => this.handlePanelSelect(event))
    this._panelElement.addEventListener('keydown', (event) => this.handlePanelKeyDown(event))
  }

  get label() {
    return this.getAttribute('label') || 'Dropdown'
  }

  set label(value) {
    setStringAttribute(this, 'label', value)
  }

  get items() {
    if ('items' in this._generatedMenu) {
      return this._generatedMenu.items
    }

    if (this._items !== undefined) {
      return cloneMenuItems(this._items)
    }

    return cloneMenuItems(parseJson(this.getAttribute('items'), []))
  }

  set items(value) {
    this._items = cloneMenuItems(value)
    this.syncGeneratedMenu()
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    setBooleanAttribute(this, 'open', value)
  }

  get hoist() {
    return this.hasAttribute('hoist')
  }

  set hoist(value) {
    setBooleanAttribute(this, 'hoist', value)
  }

  get stayOpenOnSelect() {
    return this.hasAttribute('stay-open-on-select') || this.hasAttribute('stayopenonselect')
  }

  set stayOpenOnSelect(value) {
    setBooleanAttribute(this, 'stay-open-on-select', value)
  }

  connectedCallback() {
    this.syncLabel()
    this.syncGeneratedMenu()
    this.syncMenuMode()
    this.syncOpenState()
  }

  disconnectedCallback() {
    this.stopOpenListeners()
    cancelAnimationFrame(this._positionFrame)
    cancelAnimationFrame(this._triggerAriaFrame)
    this.clearTriggerAria()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'label') {
      this.syncLabel()
    } else if (name === 'items') {
      this._items = undefined
      this.syncGeneratedMenu()
    } else if (name === 'open') {
      this.syncOpenState()
    } else if (name === 'hoist') {
      this.syncHoist()
      this.schedulePanelPosition()
    }
  }

  show() {
    this.open = true
  }

  hide() {
    this.open = false
  }

  toggle() {
    this.open = !this.open
  }

  focus(options) {
    const trigger = this.getTrigger()
    if (trigger && typeof trigger.focus === 'function') {
      trigger.focus(options)
    }
  }

  getTrigger() {
    const assigned = this._triggerSlot.assignedElements({ flatten: true })
    return assigned[0] || this._fallbackButton
  }

  getMenu() {
    return this.getSlottedMenu() || this._generatedMenu
  }

  handleTriggerClick(event) {
    event.preventDefault()
    this.toggle()
  }

  handleTriggerKeyDown(event) {
    if (event.key === 'ArrowDown') {
      this.show()
      requestAnimationFrame(() => this.getMenu()?.focusFirstItem?.())
      event.preventDefault()
      return
    }

    if (event.key === 'Escape' && this.open) {
      this.hide()
      event.preventDefault()
    }
  }

  handlePanelSelect(event) {
    event.stopPropagation()
    emit(this, 'select', {
      value: String(event.detail?.value ?? ''),
      label: String(event.detail?.label ?? ''),
    })

    if (!this.stayOpenOnSelect) {
      this.hide()
      requestAnimationFrame(() => this.focus())
    }
  }

  handlePanelKeyDown(event) {
    if (event.key !== 'Escape' || event.defaultPrevented) {
      return
    }

    this.hide()
    this.focus()
    event.preventDefault()
  }

  handleDocumentPointerDown(event) {
    const path = event.composedPath()
    for (let i = 0; i < path.length; i++) {
      if (path[i] === this) {
        return
      }
    }
    this.hide()
  }

  handleTriggerSlotChange() {
    this.syncTriggerAria()
    this.schedulePanelPosition()
  }

  handleMenuSlotChange() {
    this.syncMenuMode()
    this.schedulePanelPosition()
  }

  syncLabel() {
    this._fallbackButton.setAttribute('label', this.label)
    this._generatedMenu.setAttribute('aria-label', `${this.label} menu`)
  }

  syncGeneratedMenu() {
    const value = this._items !== undefined
      ? this._items
      : parseJson(this.getAttribute('items'), [])

    if ('items' in this._generatedMenu) {
      this._generatedMenu.items = value
      if (this._items !== undefined) {
        this._items = this._generatedMenu.items
      }
    } else {
      this._generatedMenu.setAttribute('items', JSON.stringify(Array.isArray(value) ? value : []))
    }
  }

  syncMenuMode() {
    const hasSlottedMenu = Boolean(this.getSlottedMenu())
    this._menuSlot.hidden = !hasSlottedMenu
    this._generatedMenu.hidden = hasSlottedMenu
  }

  getSlottedMenu() {
    const assigned = this._menuSlot.assignedElements({ flatten: true })
    for (let i = 0; i < assigned.length; i++) {
      if (assigned[i].localName === 'tot-menu') {
        return assigned[i]
      }
    }
    return null
  }

  syncOpenState() {
    this._panelElement.hidden = !this.open
    this.syncHoist()
    this.syncTriggerAria()

    if (this.open && this.isConnected) {
      this.startOpenListeners()
      this.schedulePanelPosition()
    } else {
      this.getMenu()?.closeSubmenus?.()
      this.stopOpenListeners()
      cancelAnimationFrame(this._positionFrame)
    }
  }

  syncHoist() {
    this._baseElement.classList.toggle('dropdown--hoist', this.hoist)
  }

  syncTriggerAria() {
    cancelAnimationFrame(this._triggerAriaFrame)
    this.clearTriggerAria()

    const trigger = this.getTrigger()
    if (!trigger) {
      return
    }

    const hasNestedControl = typeof trigger.getControl === 'function'
    const nestedControl = hasNestedControl ? trigger.getControl() : null
    this.applyTriggerAria(nestedControl || trigger)

    if (!nestedControl && hasNestedControl && this.isConnected) {
      this._triggerAriaFrame = requestAnimationFrame(() => {
        if (this.getTrigger() !== trigger) {
          return
        }

        const nextControl = trigger.getControl()
        if (nextControl) {
          this.clearTriggerAria()
          this.applyTriggerAria(nextControl)
        }
      })
    }
  }

  applyTriggerAria(control) {
    this._ariaTrigger = control
    control.setAttribute('aria-haspopup', 'menu')
    control.setAttribute('aria-expanded', this.open ? 'true' : 'false')
  }

  clearTriggerAria() {
    if (!this._ariaTrigger) {
      return
    }

    this._ariaTrigger.removeAttribute('aria-haspopup')
    this._ariaTrigger.removeAttribute('aria-expanded')
    this._ariaTrigger = null
  }

  startOpenListeners() {
    if (this._listeningWhileOpen) {
      return
    }

    this._listeningWhileOpen = true
    document.addEventListener('pointerdown', this._handleDocumentPointerDown, true)
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
    window.removeEventListener('resize', this._handleWindowChange)
    document.removeEventListener('scroll', this._handleWindowChange, true)
    if (this._visualViewport) {
      this._visualViewport.removeEventListener('resize', this._handleWindowChange)
      this._visualViewport.removeEventListener('scroll', this._handleWindowChange)
      this._visualViewport = null
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

    const trigger = this._triggerElement
    const panel = this._panelElement
    const menu = this.getMenu()
    if (!menu) {
      return
    }

    const triggerRect = trigger.getBoundingClientRect()
    if (!triggerRect.width && !triggerRect.height) {
      return
    }

    panel.style.minWidth = `max(${Math.ceil(triggerRect.width)}px, var(--tot-dropdown-min-width, 12rem))`

    if (!this.hoist) {
      panel.style.left = '0px'
      panel.style.top = 'calc(100% + var(--tot-dropdown-panel-gap, var(--tot-spacing-2x-small, .25rem)))'
      menu.style.removeProperty('--tot-menu-max-height')
      return
    }

    const viewport = getViewportRect()
    const margin = 8
    const gap = getCssLength(this, '--tot-dropdown-panel-gap', 4)
    const viewportWidth = Math.max(0, viewport.width - margin * 2)

    panel.style.maxWidth = `min(var(--tot-dropdown-max-width, 28rem), ${Math.floor(viewportWidth)}px)`
    menu.style.setProperty('--tot-menu-max-height', 'none')

    const panelRect = panel.getBoundingClientRect()
    const panelWidth = Math.min(panelRect.width, viewportWidth)
    const belowSpace = Math.max(0, viewport.bottom - triggerRect.bottom - gap - margin)
    const aboveSpace = Math.max(0, triggerRect.top - viewport.top - gap - margin)
    const placeAbove = panelRect.height > belowSpace && aboveSpace > belowSpace
    const availableHeight = Math.max(0, placeAbove ? aboveSpace : belowSpace)
    const panelHeight = Math.min(panelRect.height, availableHeight)
    let left = triggerRect.left
    let top = placeAbove ? triggerRect.top - panelHeight - gap : triggerRect.bottom + gap

    if (left + panelWidth > viewport.right - margin) {
      left = triggerRect.right - panelWidth
    }

    left = clamp(left, viewport.left + margin, viewport.right - panelWidth - margin)
    top = clamp(top, viewport.top + margin, viewport.bottom - panelHeight - margin)

    panel.style.left = `${Math.round(left)}px`
    panel.style.top = `${Math.round(top)}px`
    menu.style.setProperty('--tot-menu-max-height', `${Math.floor(availableHeight)}px`)
    menu.style.setProperty('--tot-menu-overflow', 'auto')
  }
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail,
  }))
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

function getCssLength(element, property, fallback) {
  const rawValue = getComputedStyle(element).getPropertyValue(property).trim()
  if (!rawValue) {
    return fallback
  }

  const numericValue = Number.parseFloat(rawValue)
  if (!Number.isFinite(numericValue)) {
    return fallback
  }

  if (rawValue.endsWith('rem')) {
    const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
    return Number.isFinite(rootFontSize) ? numericValue * rootFontSize : fallback
  }

  if (rawValue.endsWith('em')) {
    const fontSize = Number.parseFloat(getComputedStyle(element).fontSize)
    return Number.isFinite(fontSize) ? numericValue * fontSize : fallback
  }

  if (rawValue.endsWith('px')) {
    return numericValue
  }

  return fallback
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

function setStringAttribute(element, name, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}

function parseJson(value, fallback) {
  if (!value) {
    return fallback
  }

  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

function cloneMenuItems(value) {
  if (!Array.isArray(value)) {
    return []
  }

  try {
    return JSON.parse(JSON.stringify(value))
  } catch (error) {
    return []
  }
}
