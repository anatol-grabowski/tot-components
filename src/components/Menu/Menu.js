const menuStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .menu {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
    border-radius: var(--tot-border-radius-medium, 4px);
    box-shadow: var(--tot-shadow-small, 0 1px 2px rgb(15 23 42 / 8%));
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    gap: 0;
    max-height: var(--tot-menu-max-height, none);
    max-width: 100%;
    min-width: var(--tot-menu-min-width, 13rem);
    overflow: var(--tot-menu-overflow, visible);
    padding: var(--tot-menu-padding, .25rem);
  }

  .generated-items {
    display: contents;
  }

  .generated-items[hidden] {
    display: none;
  }

  :host([dense]) {
    --tot-menu-item-gap: var(--tot-spacing-3x-small, .125rem);
    --tot-menu-item-height: 1.5rem;
    --tot-menu-item-padding-block: var(--tot-spacing-3x-small, .125rem);
  }

  :host([dense]) .menu {
    min-width: var(--tot-menu-dense-min-width, 11rem);
    padding: var(--tot-menu-dense-padding, .125rem);
  }

  :host([embedded]) .menu {
    border: 0;
    box-shadow: none;
    min-width: 0;
  }

  .generated-items > tot-divider,
  ::slotted(tot-divider) {
    --tot-divider-spacing: var(--tot-menu-divider-spacing, .125rem);
  }
`

const menuItemStyle = `
  :host {
    display: block;
    max-width: 100%;
    position: relative;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .item {
    align-items: center;
    appearance: none;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    gap: var(--tot-menu-item-gap, var(--tot-spacing-2x-small, .25rem));
    grid-template-columns: minmax(0, 1fr) auto auto;
    line-height: var(--tot-line-height-normal, 1.4);
    min-height: var(--tot-menu-item-height, var(--tot-input-height-small, 1.75rem));
    outline: none;
    padding: var(--tot-menu-item-padding-block, .25rem) var(--tot-menu-item-padding-inline, .5rem);
    position: relative;
    text-align: left;
    user-select: none;
    width: 100%;
  }

  @media (hover: hover) {
    .item:hover:not(:disabled) {
      background: var(--tot-color-neutral-100, #f1f5f9);
      color: var(--tot-input-color-hover, #0f172a);
    }
  }

  .item:active:not(:disabled),
  .item:focus-visible:not(:disabled) {
    background: var(--tot-color-neutral-100, #f1f5f9);
    color: var(--tot-input-color-hover, #0f172a);
  }

  .item:focus:not(:focus-visible):not(:disabled) {
    background: transparent;
    color: var(--tot-input-color, #1e293b);
  }

  .item:focus-visible {
    box-shadow: var(--tot-focus-ring, 0 0 0 3px hsl(198.6 88.7% 48.4% / 40%));
  }

  .item:disabled {
    cursor: not-allowed;
    opacity: .55;
  }

  .item__label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item__suffix,
  .item__submenu-caret {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    line-height: 1;
  }

  .item__suffix {
    color: var(--tot-color-neutral-600, #475569);
    min-width: 1rem;
    white-space: nowrap;
  }

  .item__suffix[hidden] {
    display: none;
  }

  .item__suffix ::slotted(*) {
    display: block;
    height: 1rem;
    width: 1rem;
  }

  .item__submenu-caret {
    color: var(--tot-color-neutral-500, #64748b);
    display: none;
    height: 1rem;
    width: 1rem;
  }

  .item__submenu-caret svg {
    display: block;
    fill: none;
    height: 100%;
    stroke: currentColor;
    width: 100%;
  }

  .item--has-submenu .item__submenu-caret {
    display: inline-flex;
  }

  .submenu {
    display: none;
    left: 0;
    max-width: calc(100vw - 1rem);
    min-width: var(--tot-menu-submenu-min-width, 12rem);
    position: fixed;
    top: 0;
    z-index: var(--tot-z-index-dropdown, 1000);
  }

  @media (hover: hover) {
    :host(:hover) .submenu {
      display: block;
    }
  }

  :host([open]) .submenu {
    display: block;
  }

  ::slotted(tot-menu) {
    --tot-menu-max-height: var(--tot-menu-submenu-max-height, none);
    --tot-menu-overflow: var(--tot-menu-submenu-overflow, auto);
    min-width: var(--tot-menu-submenu-min-width, 12rem);
  }
`

const menuLabelStyle = `
  :host {
    color: var(--tot-color-neutral-600, #475569);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-font-size-small, .8125rem);
    font-weight: var(--tot-font-weight-semibold, 600);
    line-height: 1.35;
    max-width: 100%;
    padding: var(--tot-menu-label-padding-block, .25rem) var(--tot-menu-item-padding-inline, .5rem) var(--tot-spacing-3x-small, .125rem);
    text-transform: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export class TotMenu extends HTMLElement {
  static get observedAttributes() {
    return ['items', 'aria-label']
  }

  constructor() {
    super()
    this._items = null
    this._usingSlot = false
    this._typeToSelect = ''
    this._typeToSelectTimer = 0

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${menuStyle}</style>
      <div class="menu" part="base" role="menu">
        <slot></slot>
        <div class="generated-items" part="generated-items"></div>
      </div>
    `

    this._base = root.querySelector('.menu')
    this._defaultSlot = root.querySelector('slot')
    this._generatedItems = root.querySelector('.generated-items')
    this._base.addEventListener('click', (event) => this.handleClick(event))
    this._base.addEventListener('keydown', (event) => this.handleKeyDown(event))
    this._defaultSlot.addEventListener('slotchange', () => this.syncContentMode())
  }

  get items() {
    if (this._items !== null) {
      return cloneItems(this._items)
    }
    return parseItems(this.getAttribute('items'))
  }

  set items(value) {
    this._items = parseItems(value)
    this.renderGeneratedItems()
  }

  get dense() {
    return this.hasAttribute('dense')
  }

  set dense(value) {
    setBooleanAttribute(this, 'dense', value)
  }

  get embedded() {
    return this.hasAttribute('embedded')
  }

  set embedded(value) {
    setBooleanAttribute(this, 'embedded', value)
  }

  connectedCallback() {
    this.syncLabel()
    this.syncContentMode()
  }

  disconnectedCallback() {
    window.clearTimeout(this._typeToSelectTimer)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'items') {
      this._items = null
      this.renderGeneratedItems()
    } else {
      this.syncLabel()
    }
  }

  focus(options) {
    this.focusFirstItem(options)
  }

  getBase() {
    return this._base
  }

  getMenuItems() {
    const source = this.getItemSource()
    const items = []

    for (let i = 0; i < source.length; i++) {
      if (source[i].localName === 'tot-menu-item') {
        items.push(source[i])
      }
    }

    return items
  }

  getEnabledMenuItems() {
    const items = this.getMenuItems()
    const enabled = []

    for (let i = 0; i < items.length; i++) {
      if (!items[i].disabled) {
        enabled.push(items[i])
      }
    }

    return enabled
  }

  focusFirstItem(options) {
    const items = this.getEnabledMenuItems()
    if (items.length > 0) {
      items[0].focus(options)
    }
  }

  renderGeneratedItems() {
    const fragment = document.createDocumentFragment()
    const items = this.items
    for (let i = 0; i < items.length; i++) {
      fragment.append(this.createItemElement(items[i]))
    }
    this._generatedItems.replaceChildren(fragment)
    this.syncContentMode()
  }

  createItemElement(item) {
    if (item.type === 'divider') {
      return document.createElement('tot-divider')
    }

    if (item.type === 'label') {
      const label = document.createElement('tot-menu-label')
      label.textContent = item.label
      return label
    }

    const element = document.createElement('tot-menu-item')
    element.textContent = item.label
    element.setAttribute('value', item.value)
    if (item.disabled) {
      element.setAttribute('disabled', '')
    }
    if (item.suffix) {
      element.setAttribute('suffix', item.suffix)
    }

    if (item.items?.length > 0) {
      const submenu = document.createElement('tot-menu')
      submenu.slot = 'submenu'
      submenu.items = item.items
      element.append(submenu)
    }

    return element
  }

  syncLabel() {
    const base = this.getBase()
    if (base) {
      base.setAttribute('aria-label', this.getAttribute('aria-label') || 'Menu')
    }
  }

  syncContentMode() {
    this._usingSlot = hasMeaningfulAssignedContent(this._defaultSlot)
    this._defaultSlot.hidden = !this._usingSlot
    this._generatedItems.hidden = this._usingSlot
  }

  getItemSource() {
    if (this._usingSlot) {
      return this._defaultSlot.assignedElements({ flatten: true })
    }

    return Array.from(this._generatedItems.children)
  }

  handleClick(event) {
    const item = getMenuItemFromEvent(event)
    if (!item || getOwningMenuFromEvent(event) !== this) {
      return
    }

    if (item.disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (item.hasSubmenu) {
      this.closeSubmenus(item)
      item.open = !item.open
      return
    }

    this.closeSubmenus()
    emit(this, 'select', {
      item,
      value: item.value,
      label: item.label,
    })
  }

  handleKeyDown(event) {
    if (getOwningMenuFromEvent(event) !== this) {
      return
    }

    const items = this.getEnabledMenuItems()
    if (items.length === 0) {
      return
    }

    const active = this.getActiveItem(items)
    let next = null

    if (event.key === 'ArrowDown') {
      next = this.getRelativeItem(items, active, 1)
    } else if (event.key === 'ArrowUp') {
      next = this.getRelativeItem(items, active, -1)
    } else if (event.key === 'Home') {
      next = items[0]
    } else if (event.key === 'End') {
      next = items[items.length - 1]
    } else if (event.key === 'ArrowRight' && active?.hasSubmenu) {
      this.closeSubmenus(active)
      active.open = true
      const submenu = active.getSubmenu()
      if (submenu && typeof submenu.focusFirstItem === 'function') {
        submenu.focusFirstItem()
      }
      event.preventDefault()
      return
    } else if (event.key === 'ArrowLeft' || event.key === 'Escape') {
      if (this.closeParentSubmenu()) {
        event.preventDefault()
        return
      }

      this.closeSubmenus()
      const activeElement = this.getDeepActiveElement()
      if (activeElement && typeof activeElement.blur === 'function') {
        activeElement.blur()
      }
      return
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (active) {
        active.click()
        event.preventDefault()
      }
      return
    } else if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      next = this.getTypeAheadItem(items, event.key)
    }

    if (next) {
      next.focus()
      event.preventDefault()
    }
  }

  closeSubmenus(except) {
    const items = this.getMenuItems()
    for (let i = 0; i < items.length; i++) {
      if (items[i] !== except && items[i].open) {
        items[i].open = false
      }
    }
  }

  closeParentSubmenu() {
    const parentItem = this.parentElement
    if (!parentItem || parentItem.localName !== 'tot-menu-item' || this.slot !== 'submenu') {
      return false
    }

    parentItem.open = false
    parentItem.focus()
    return true
  }

  getActiveItem(items) {
    const active = this.getDeepActiveElement()
    for (let i = 0; i < items.length; i++) {
      if (items[i] === active || items[i].shadowRoot?.activeElement === active) {
        return items[i]
      }
    }
    return null
  }

  getRelativeItem(items, active, step) {
    if (!active) {
      return step > 0 ? items[0] : items[items.length - 1]
    }

    const index = items.indexOf(active)
    return items[(index + step + items.length) % items.length]
  }

  getTypeAheadItem(items, key) {
    window.clearTimeout(this._typeToSelectTimer)
    this._typeToSelect += normalizeSearchText(key)
    this._typeToSelectTimer = window.setTimeout(() => {
      this._typeToSelect = ''
    }, 700)

    for (let i = 0; i < items.length; i++) {
      if (normalizeSearchText(items[i].label).startsWith(this._typeToSelect)) {
        return items[i]
      }
    }

    return null
  }

  getDeepActiveElement() {
    let active = document.activeElement
    while (active?.shadowRoot?.activeElement) {
      active = active.shadowRoot.activeElement
    }
    return active
  }
}

export class TotMenuItem extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'suffix', 'value', 'open']
  }

  constructor() {
    super()
    this._hasSubmenu = false
    this._listeningForViewportChanges = false
    this._positionFrame = 0
    this._visualViewport = null
    this._handleSubmenuOpen = () => this.handleSubmenuOpen()
    this._handleSubmenuLeave = () => this.handleSubmenuLeave()
    this._handleWindowChange = () => this.scheduleSubmenuPosition()

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${menuItemStyle}</style>
      <button class="item" part="base" type="button" role="menuitem">
        <span class="item__label" part="label"><slot></slot></span>
        <span class="item__suffix" part="suffix" hidden>
          <slot name="suffix"><span class="item__suffix-fallback"></span></slot>
        </span>
        <span class="item__submenu-caret" part="submenu-caret" aria-hidden="true">
          <svg viewBox="0 0 16 16" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false">
            <path d="m6 4 4 4-4 4"></path>
          </svg>
        </span>
      </button>
      <span class="submenu" part="submenu"><slot name="submenu"></slot></span>
    `

    this._control = root.querySelector('.item')
    this._suffixHolder = root.querySelector('.item__suffix')
    this._suffixFallback = root.querySelector('.item__suffix-fallback')
    this._suffixSlot = root.querySelector('slot[name="suffix"]')
    this._submenuHolder = root.querySelector('.submenu')
    this._submenuSlot = root.querySelector('slot[name="submenu"]')
    this._control.addEventListener('click', (event) => this.handleControlClick(event))
    this._suffixSlot.addEventListener('slotchange', () => this.syncSuffix())
    this._submenuSlot.addEventListener('slotchange', () => this.syncSubmenu())
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  get suffix() {
    return this.getAttribute('suffix') || ''
  }

  set suffix(value) {
    setStringAttribute(this, 'suffix', value)
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    setBooleanAttribute(this, 'open', value)
  }

  get value() {
    return this.getAttribute('value') || this.label
  }

  set value(value) {
    if (value === null || value === undefined) {
      this.removeAttribute('value')
    } else {
      this.setAttribute('value', String(value))
    }
  }

  get label() {
    const parts = []
    for (let i = 0; i < this.childNodes.length; i++) {
      const node = this.childNodes[i]
      if (node.nodeType === Node.TEXT_NODE) {
        parts.push(node.textContent)
      } else if (node.nodeType === Node.ELEMENT_NODE && !node.slot) {
        parts.push(node.textContent)
      }
    }
    return parts.join(' ').replace(/\s+/g, ' ').trim()
  }

  get hasSubmenu() {
    return this._hasSubmenu
  }

  connectedCallback() {
    this.addEventListener('pointerenter', this._handleSubmenuOpen)
    this.addEventListener('pointerleave', this._handleSubmenuLeave)
    this.addEventListener('focusin', this._handleSubmenuOpen)
    this.addEventListener('focusout', this._handleSubmenuLeave)
    this.syncSuffix()
    this.syncSubmenu()
    this.syncState()
  }

  disconnectedCallback() {
    this.removeEventListener('pointerenter', this._handleSubmenuOpen)
    this.removeEventListener('pointerleave', this._handleSubmenuLeave)
    this.removeEventListener('focusin', this._handleSubmenuOpen)
    this.removeEventListener('focusout', this._handleSubmenuLeave)
    this.stopViewportListeners()
    cancelAnimationFrame(this._positionFrame)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'suffix') {
      this.syncSuffix()
    } else {
      this.syncState()
    }

    if (name === 'open') {
      if (this.open) {
        this.handleSubmenuOpen()
      } else {
        this.handleSubmenuLeave()
      }
    }
  }

  click() {
    this.getControl()?.click()
  }

  focus(options) {
    this.getControl()?.focus(options)
  }

  blur() {
    this.getControl()?.blur()
  }

  getControl() {
    return this._control
  }

  getBase() {
    return this.getControl()
  }

  getSubmenu() {
    const assigned = this._submenuSlot.assignedElements({ flatten: true })
    for (let i = 0; i < assigned.length; i++) {
      if (assigned[i].localName === 'tot-menu') {
        return assigned[i]
      }
    }
    return null
  }

  handleControlClick(event) {
    if (this.disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (event.detail > 0) {
      requestAnimationFrame(() => this.getControl()?.blur())
    }
  }

  syncState() {
    const control = this.getControl()
    if (!control) {
      return
    }

    control.disabled = this.disabled
    control.classList.toggle('item--has-submenu', this.hasSubmenu)
    control.setAttribute('aria-disabled', this.disabled ? 'true' : 'false')

    if (this.hasSubmenu) {
      control.setAttribute('aria-haspopup', 'menu')
      control.setAttribute('aria-expanded', this.open ? 'true' : 'false')
    } else {
      control.removeAttribute('aria-haspopup')
      control.removeAttribute('aria-expanded')
    }
  }

  syncSuffix() {
    this._suffixFallback.textContent = this.suffix
    this._suffixHolder.hidden = !this.suffix && !hasMeaningfulAssignedContent(this._suffixSlot)
  }

  syncSubmenu() {
    this._hasSubmenu = Boolean(this.getSubmenu())
    this.syncState()

    if (!this._hasSubmenu) {
      this.open = false
      this.stopViewportListeners()
      return
    }

    if (this.open || this.matches(':hover') || this.matches(':focus-within')) {
      this.handleSubmenuOpen()
    }
  }

  handleSubmenuOpen() {
    if (!this.hasSubmenu) {
      return
    }

    this.startViewportListeners()
    this.scheduleSubmenuPosition()
  }

  handleSubmenuLeave() {
    requestAnimationFrame(() => {
      if (!this.open && !this.matches(':hover') && !this.matches(':focus-within')) {
        this.stopViewportListeners()
      }
    })
  }

  startViewportListeners() {
    if (this._listeningForViewportChanges || !this.isConnected) {
      return
    }

    this._listeningForViewportChanges = true
    window.addEventListener('resize', this._handleWindowChange)
    document.addEventListener('scroll', this._handleWindowChange, true)
    this._visualViewport = window.visualViewport || null
    if (this._visualViewport) {
      this._visualViewport.addEventListener('resize', this._handleWindowChange)
      this._visualViewport.addEventListener('scroll', this._handleWindowChange)
    }
  }

  stopViewportListeners() {
    if (!this._listeningForViewportChanges) {
      return
    }

    this._listeningForViewportChanges = false
    window.removeEventListener('resize', this._handleWindowChange)
    document.removeEventListener('scroll', this._handleWindowChange, true)
    if (this._visualViewport) {
      this._visualViewport.removeEventListener('resize', this._handleWindowChange)
      this._visualViewport.removeEventListener('scroll', this._handleWindowChange)
      this._visualViewport = null
    }
  }

  scheduleSubmenuPosition() {
    if (!this.hasSubmenu || !this.isConnected) {
      return
    }

    cancelAnimationFrame(this._positionFrame)
    this._positionFrame = requestAnimationFrame(() => this.updateSubmenuPosition())
  }

  updateSubmenuPosition() {
    if (!this.hasSubmenu) {
      return
    }

    const submenu = this._submenuHolder
    const control = this._control
    const viewport = getViewportRect()
    const margin = 8
    const baseRect = control.getBoundingClientRect()
    const previousDisplay = submenu.style.display
    const previousVisibility = submenu.style.visibility
    const submenuMenus = getSubmenuMenus(this._submenuSlot)

    for (let i = 0; i < submenuMenus.length; i++) {
      submenuMenus[i].style.setProperty('--tot-menu-max-height', 'none')
    }

    submenu.style.display = 'block'
    submenu.style.visibility = 'hidden'
    submenu.style.maxWidth = `${Math.floor(Math.max(0, viewport.width - margin * 2))}px`

    const submenuRect = submenu.getBoundingClientRect()
    const submenuWidth = Math.min(submenuRect.width, Math.max(0, viewport.width - margin * 2))
    const submenuHeight = submenuRect.height
    const rightSpace = viewport.right - baseRect.right - margin
    const leftSpace = baseRect.left - viewport.left - margin
    const maxHeight = Math.max(0, viewport.height - margin * 2)
    let left = baseRect.right
    let top = baseRect.top

    if (submenuWidth > rightSpace && leftSpace > rightSpace) {
      left = baseRect.left - submenuWidth
    }

    left = clamp(left, viewport.left + margin, viewport.right - submenuWidth - margin)
    top = clamp(top, viewport.top + margin, viewport.bottom - Math.min(submenuHeight, maxHeight) - margin)

    submenu.style.left = `${Math.round(left)}px`
    submenu.style.top = `${Math.round(top)}px`

    for (let i = 0; i < submenuMenus.length; i++) {
      submenuMenus[i].style.setProperty('--tot-menu-max-height', `${Math.floor(maxHeight)}px`)
      submenuMenus[i].style.setProperty('--tot-menu-overflow', 'auto')
    }

    submenu.style.visibility = previousVisibility
    submenu.style.display = previousDisplay
  }
}

export class TotMenuLabel extends HTMLElement {
  constructor() {
    super()
    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${menuLabelStyle}</style><div class="label" part="base"><slot></slot></div>`
  }

  getBase() {
    return this.shadowRoot?.querySelector('.label') || null
  }
}

function hasMeaningfulAssignedContent(slot) {
  const nodes = slot.assignedNodes({ flatten: true })
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].nodeType === Node.ELEMENT_NODE) {
      return true
    }

    if (nodes[i].nodeType === Node.TEXT_NODE && nodes[i].textContent.trim()) {
      return true
    }
  }
  return false
}

function getSubmenuMenus(submenuSlot) {
  const menus = []
  const assigned = submenuSlot ? submenuSlot.assignedElements({ flatten: true }) : []

  for (let i = 0; i < assigned.length; i++) {
    if (assigned[i].localName === 'tot-menu') {
      menus.push(assigned[i])
    }
  }

  return menus
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

function parseItems(value) {
  let source = value
  if (typeof source === 'string') {
    source = parseJson(source, [])
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
  if (!item || typeof item !== 'object') {
    return null
  }

  if (item.type === 'divider') {
    return { type: 'divider' }
  }

  if (item.type === 'label' && typeof item.label === 'string') {
    return {
      type: 'label',
      label: item.label,
    }
  }

  if (
    item.type !== 'item' ||
    typeof item.value !== 'string' ||
    typeof item.label !== 'string'
  ) {
    return null
  }

  const normalized = {
    type: 'item',
    value: item.value,
    label: item.label,
  }

  if (item.disabled) {
    normalized.disabled = true
  }
  if (typeof item.suffix === 'string' && item.suffix) {
    normalized.suffix = item.suffix
  }

  const children = parseItems(item.items)
  if (children.length > 0) {
    normalized.items = children
  }

  return normalized
}

function cloneItems(items) {
  return parseItems(items)
}

function getMenuItemFromEvent(event) {
  const path = event.composedPath()
  for (let i = 0; i < path.length; i++) {
    const node = path[i]
    if (node instanceof HTMLElement && node.localName === 'tot-menu-item') {
      return node
    }
  }
  return null
}

function getOwningMenuFromEvent(event) {
  const path = event.composedPath()
  for (let i = 0; i < path.length; i++) {
    const node = path[i]
    if (node instanceof HTMLElement && node.localName === 'tot-menu') {
      return node
    }
  }
  return null
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail,
  }))
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function setStringAttribute(element, name, value) {
  if (value === null || value === undefined || value === '') {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

function normalizeSearchText(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
}
