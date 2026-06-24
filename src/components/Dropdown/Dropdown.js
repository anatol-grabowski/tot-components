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
    min-width: var(--tot-dropdown-min-width, 12rem);
    max-width: min(var(--tot-dropdown-max-width, 28rem), calc(100vw - 1rem));
    position: absolute;
    top: calc(100% + var(--tot-spacing-2x-small, .25rem));
    z-index: var(--tot-z-index-dropdown, 900);
  }

  .panel[hidden] {
    display: none;
  }

  .dropdown--hoist .panel {
    position: fixed;
  }

  .panel__surface {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
    border-radius: var(--tot-border-radius-medium, 4px);
    box-shadow: var(--tot-shadow-medium, var(--tot-shadow-small, 0 1px 2px rgb(15 23 42 / 8%)));
    color: var(--tot-input-color, #1e293b);
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    max-width: 100%;
    overflow: visible;
    padding: var(--tot-dropdown-padding, 0);
  }

  .panel__content {
    max-width: 100%;
    min-width: 0;
  }

  ::slotted(tot-menu),
  .panel__generated-menu {
    --tot-menu-min-width: 0;
    --tot-panel-border-width: 0;
    --tot-shadow-small: none;
    display: block;
    min-width: 0;
    width: 100%;
  }
`

export class TotDropdown extends HTMLElement {
  static get observedAttributes() {
    return [
      'label',
      'menu-items',
      'menuitems',
      'open',
      'hoist',
      'stay-open-on-select',
      'stayopenonselect',
    ]
  }

  constructor() {
    super()
    this._menuItems = null
    this._hasDefaultSlotContent = false
    this._positionFrame = 0
    this._handleDocumentPointerDown = event => this.handleDocumentPointerDown(event)
    this._handleWindowChange = () => this.schedulePanelPosition()
  }

  get label() {
    return this.getAttribute('label') || 'Dropdown'
  }

  set label(value) {
    if (value === null || value === undefined) {
      this.removeAttribute('label')
    } else {
      this.setAttribute('label', String(value))
    }
  }

  get menuItems() {
    if (this._menuItems) {
      return cloneItems(this._menuItems)
    }

    return parseItems(this.getAttribute('menu-items') || this.getAttribute('menuitems'))
  }

  set menuItems(value) {
    this._menuItems = parseItems(value)
    this.render()
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
    this.render()
    document.addEventListener('pointerdown', this._handleDocumentPointerDown, true)
    window.addEventListener('resize', this._handleWindowChange)
    document.addEventListener('scroll', this._handleWindowChange, true)
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this._handleDocumentPointerDown, true)
    window.removeEventListener('resize', this._handleWindowChange)
    document.removeEventListener('scroll', this._handleWindowChange, true)
    cancelAnimationFrame(this._positionFrame)
  }

  attributeChangedCallback(name) {
    if (name === 'menu-items' || name === 'menuitems') {
      this._menuItems = null
    }

    this.render()
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const open = this.open
    const hasDefaultSlotContent = this.hasDefaultSlotContent()
    this._hasDefaultSlotContent = hasDefaultSlotContent

    root.innerHTML = `<style>${dropdownStyle}</style>
      <div class="dropdown${this.hoist ? ' dropdown--hoist' : ''}" part="base">
        <span class="trigger" part="trigger">
          <slot name="trigger">
            <tot-button label="${escapeAttribute(this.label)}" caret></tot-button>
          </slot>
        </span>
        <div class="panel" part="panel" ${open ? '' : 'hidden'}>
          <div class="panel__surface">
            <div class="panel__content"></div>
          </div>
        </div>
      </div>
    `

    const content = root.querySelector('.panel__content')
    if (hasDefaultSlotContent) {
      const slot = document.createElement('slot')
      slot.addEventListener('slotchange', () => this.handleDefaultSlotChange())
      content.append(slot)
    } else {
      content.append(this.createMenu())
    }

    const triggerSlot = root.querySelector('slot[name="trigger"]')
    const trigger = root.querySelector('.trigger')
    const panel = root.querySelector('.panel')

    trigger.addEventListener('click', (event) => this.handleTriggerClick(event))
    trigger.addEventListener('keydown', (event) => this.handleTriggerKeyDown(event))
    triggerSlot.addEventListener('slotchange', () => this.schedulePanelPosition())
    panel.addEventListener('select', (event) => this.handlePanelSelect(event))
    panel.addEventListener('keydown', (event) => this.handlePanelKeyDown(event))

    if (open) {
      this.schedulePanelPosition()
    }
  }

  createMenu() {
    const menu = document.createElement('tot-menu')
    const items = this.menuItems
    menu.className = 'panel__generated-menu'
    menu.setAttribute('items', JSON.stringify(items))
    menu.items = items
    return menu
  }

  handleTriggerClick(event) {
    event.preventDefault()
    this.open = !this.open
  }

  handleTriggerKeyDown(event) {
    if (event.key === 'ArrowDown') {
      if (!this.open) {
        this.open = true
      }
      this.focusFirstMenuItem()
      event.preventDefault()
      return
    }

    if (event.key === 'Escape' && this.open) {
      this.open = false
      event.preventDefault()
    }
  }

  handlePanelSelect() {
    if (!this.stayOpenOnSelect) {
      this.open = false
    }
  }

  handlePanelKeyDown(event) {
    if (event.key !== 'Escape') {
      return
    }

    this.open = false
    this.focusTrigger()
    event.preventDefault()
  }

  handleDocumentPointerDown(event) {
    if (!this.open) {
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

  handleDefaultSlotChange() {
    const hasDefaultSlotContent = this.hasDefaultSlotContent()
    if (hasDefaultSlotContent !== this._hasDefaultSlotContent) {
      this.render()
    } else {
      this.schedulePanelPosition()
    }
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
    const panel = this.shadowRoot.querySelector('.panel')
    if (!trigger || !panel) {
      return
    }

    const triggerRect = trigger.getBoundingClientRect()
    if (!triggerRect.width && !triggerRect.height) {
      return
    }

    panel.style.minWidth = `${Math.ceil(triggerRect.width)}px`

    if (!this.hoist) {
      panel.style.left = '0px'
      panel.style.top = 'calc(100% + var(--tot-spacing-2x-small, .25rem))'
      return
    }

    const margin = 8
    const gap = 4
    const panelRect = panel.getBoundingClientRect()
    const maxLeft = Math.max(margin, window.innerWidth - panelRect.width - margin)
    let left = Math.min(Math.max(margin, triggerRect.left), maxLeft)
    let top = triggerRect.bottom + gap

    if (top + panelRect.height > window.innerHeight - margin && triggerRect.top - panelRect.height - gap >= margin) {
      top = triggerRect.top - panelRect.height - gap
    }

    left = Math.round(left)
    top = Math.round(Math.max(margin, Math.min(top, window.innerHeight - panelRect.height - margin)))
    panel.style.left = `${left}px`
    panel.style.top = `${top}px`
  }

  focusTrigger() {
    const trigger = this.shadowRoot?.querySelector('.trigger')
    const slot = this.shadowRoot?.querySelector('slot[name="trigger"]')
    const assigned = slot ? slot.assignedElements({ flatten: true }) : []

    if (assigned.length > 0 && typeof assigned[0].focus === 'function') {
      assigned[0].focus()
      return
    }

    const fallback = trigger?.querySelector('tot-button')
    if (fallback && typeof fallback.focus === 'function') {
      fallback.focus()
    }
  }

  focusFirstMenuItem() {
    requestAnimationFrame(() => {
      const menu = this.getPanelMenu()
      if (!menu) {
        return
      }

      const items = typeof menu.getEnabledMenuItems === 'function' ? menu.getEnabledMenuItems() : []
      if (items.length > 0) {
        items[0].focus()
      }
    })
  }

  getPanelMenu() {
    if (!this.shadowRoot) {
      return null
    }

    const generatedMenu = this.shadowRoot.querySelector('.panel__generated-menu')
    if (generatedMenu) {
      return generatedMenu
    }

    const slot = this.shadowRoot.querySelector('.panel slot:not([name])')
    const assigned = slot ? slot.assignedElements({ flatten: true }) : []
    for (let i = 0; i < assigned.length; i++) {
      if (assigned[i].localName === 'tot-menu') {
        return assigned[i]
      }
    }

    return null
  }

  hasDefaultSlotContent() {
    for (let i = 0; i < this.childNodes.length; i++) {
      const node = this.childNodes[i]
      if (node.nodeType === Node.ELEMENT_NODE && !node.slot) {
        return true
      }

      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        return true
      }
    }
    return false
  }
}

function parseItems(value) {
  if (value === null || value === undefined || value === '') {
    return []
  }

  let source = value
  if (typeof value === 'string') {
    source = parseJson(value, [])
  }

  if (!Array.isArray(source)) {
    return []
  }

  const items = []
  for (let i = 0; i < source.length; i++) {
    const normalized = normalizeItem(source[i])
    if (normalized) {
      items.push(normalized)
    }
  }
  return items
}

function normalizeItem(item) {
  if (item === 'divider') {
    return { type: 'divider' }
  }

  if (typeof item === 'string') {
    return {
      type: 'item',
      value: item,
      label: item,
      disabled: false,
      checked: false,
      loading: false,
      items: [],
    }
  }

  if (!item || typeof item !== 'object') {
    return null
  }

  if (item.type === 'divider' || item.kind === 'divider' || item.divider) {
    return { type: 'divider' }
  }

  if (item.type === 'label' || item.kind === 'label') {
    return {
      type: 'label',
      label: String(item.label ?? item.text ?? ''),
    }
  }

  const label = String(item.label ?? item.text ?? item.value ?? item.id ?? '')
  const value = String(item.value ?? item.id ?? label)
  const children = item.items ?? item.children ?? item.submenu ?? []

  return {
    type: 'item',
    value,
    label,
    disabled: Boolean(item.disabled),
    checked: Boolean(item.checked),
    loading: Boolean(item.loading),
    items: parseItems(children),
  }
}

function cloneItems(items) {
  return parseItems(items)
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

function escapeAttribute(value) {
  return String(value).replace(/[&<>"'`]/g, (match) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '`': '&#96;',
    }
    return replacements[match]
  })
}
