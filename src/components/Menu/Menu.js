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

  .menu > tot-divider,
  ::slotted(tot-divider) {
    display: block;
    margin-block: var(--tot-menu-divider-spacing, .125rem);
    margin-inline: 0;
    width: 100%;
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
    grid-template-columns: minmax(0, 1fr) 1rem auto;
    line-height: var(--tot-line-height-normal, 1.4);
    min-height: var(--tot-menu-item-height, var(--tot-input-height-small, 1.75rem));
    outline: none;
    padding: var(--tot-menu-item-padding-block, .25rem) var(--tot-menu-item-padding-inline, .5rem);
    position: relative;
    text-align: left;
    user-select: none;
    width: 100%;
  }

  .item:hover:not(.item--disabled),
  .item:active:not(.item--disabled),
  .item:focus-visible:not(.item--disabled) {
    background: var(--tot-color-neutral-100, #f1f5f9);
    color: var(--tot-input-color-hover, #0f172a);
  }

  .item:focus:not(:focus-visible):not(.item--disabled) {
    background: transparent;
    color: var(--tot-input-color, #1e293b);
  }

  .item:focus-visible {
    box-shadow: var(--tot-focus-ring, 0 0 0 3px hsl(198.6 88.7% 48.4% / 40%));
  }

  .item--checked {
    color: var(--tot-color-primary-700, #0369a1);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .item--disabled {
    cursor: not-allowed;
    opacity: .55;
  }

  .item__state,
  .item__check,
  .item__loader,
  .item__submenu-caret {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    line-height: 1;
  }

  .item__state {
    color: var(--tot-color-primary-700, #0369a1);
    height: 1rem;
    width: 1rem;
  }

  .item__check,
  .item__loader,
  .item__submenu-caret {
    height: 1rem;
    width: 1rem;
  }

  .item__check svg,
  .item__loader svg,
  .item__submenu-caret svg {
    display: block;
    fill: none;
    height: 100%;
    stroke: currentColor;
    width: 100%;
  }

  .item:not(.item--checked) .item__check,
  .item__loader {
    display: none;
  }

  .item--loading .item__check {
    display: none;
  }

  .item--loading .item__loader {
    display: inline-flex;
  }

  .item__loader svg {
    animation: menu-item-spin .8s linear infinite;
  }

  @keyframes menu-item-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .item__label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item__submenu-caret {
    color: var(--tot-color-neutral-500, #64748b);
    display: none;
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

  :host(:hover) .submenu,
  :host(:focus-within) .submenu,
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
    this._typeToSelect = ''
    this._typeToSelectTimer = 0
  }

  get items() {
    if (this._items) {
      return cloneItems(this._items)
    }
    return parseItems(this.getAttribute('items'))
  }

  set items(value) {
    this._items = parseItems(value)
    this.render()
  }

  get dense() {
    return this.hasAttribute('dense')
  }

  set dense(value) {
    setBooleanAttribute(this, 'dense', value)
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name) {
    if (name === 'items') {
      this._items = null
    }
    this.render()
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const label = this.getAttribute('aria-label') || 'Menu'
    const hasDefaultSlotContent = this.hasDefaultSlotContent()

    root.innerHTML = `<style>${menuStyle}</style>
      <div class="menu" part="base" role="menu" aria-label="${escapeAttribute(label)}"></div>
    `

    const holder = root.querySelector('.menu')
    if (hasDefaultSlotContent) {
      const slot = document.createElement('slot')
      slot.addEventListener('slotchange', () => this.handleSlotChange())
      holder.append(slot)
    } else {
      this.renderItems(holder, this.items)
    }

    holder.addEventListener('click', (event) => this.handleClick(event))
    holder.addEventListener('keydown', (event) => this.handleKeyDown(event))
  }

  renderItems(holder, items) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      holder.append(this.createItemElement(item))
    }
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

    if (item.value) {
      element.setAttribute('value', item.value)
    }

    if (item.disabled) {
      element.setAttribute('disabled', '')
    }

    if (item.checked) {
      element.setAttribute('checked', '')
    }

    if (item.loading) {
      element.setAttribute('loading', '')
    }

    if (item.items.length > 0) {
      const submenu = document.createElement('tot-menu')
      submenu.slot = 'submenu'
      submenu.items = item.items
      element.append(submenu)
    }

    return element
  }

  handleSlotChange() {
    const hasDefaultSlotContent = this.hasDefaultSlotContent()
    if (!hasDefaultSlotContent) {
      this.render()
    }
  }

  handleClick(event) {
    const item = getMenuItemFromEvent(event)
    if (!item || getOwningMenuFromEvent(event) !== this) {
      return
    }

    if (item.disabled || item.loading) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (item.hasSubmenu) {
      item.open = !item.open
      return
    }

    emit(this, 'select', {
      item,
      value: item.value,
      label: item.label,
      checked: item.checked,
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
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (active) {
        active.click()
        event.preventDefault()
      }
      return
    } else if (event.key === 'Escape') {
      const activeElement = this.getDeepActiveElement()
      if (activeElement && activeElement.blur) {
        activeElement.blur()
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

  getMenuItems() {
    const root = this.shadowRoot
    if (!root) {
      return []
    }

    const slot = root.querySelector('slot:not([name])')
    const source = slot ? slot.assignedElements({ flatten: true }) : Array.from(root.querySelector('.menu').children)
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
      if (!items[i].disabled && !items[i].loading) {
        enabled.push(items[i])
      }
    }

    return enabled
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
    const nextIndex = (index + step + items.length) % items.length
    return items[nextIndex]
  }

  getTypeAheadItem(items, key) {
    window.clearTimeout(this._typeToSelectTimer)
    this._typeToSelect += key.toLocaleLowerCase()
    this._typeToSelectTimer = window.setTimeout(() => {
      this._typeToSelect = ''
    }, 700)

    for (let i = 0; i < items.length; i++) {
      const label = items[i].label.toLocaleLowerCase()
      if (label.startsWith(this._typeToSelect)) {
        return items[i]
      }
    }

    return null
  }

  getDeepActiveElement() {
    let active = document.activeElement
    while (active && active.shadowRoot && active.shadowRoot.activeElement) {
      active = active.shadowRoot.activeElement
    }
    return active
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

export class TotMenuItem extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'checked', 'loading', 'value', 'open']
  }

  constructor() {
    super()
    this._hasSubmenu = false
    this._positionFrame = 0
    this._visualViewport = null
    this._handleSubmenuOpen = () => this.scheduleSubmenuPosition()
    this._handleWindowChange = () => this.scheduleSubmenuPosition()
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  get checked() {
    return this.hasAttribute('checked')
  }

  set checked(value) {
    setBooleanAttribute(this, 'checked', value)
  }

  get loading() {
    return this.hasAttribute('loading')
  }

  set loading(value) {
    setBooleanAttribute(this, 'loading', value)
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
    this.render()
    this.addEventListener('pointerenter', this._handleSubmenuOpen)
    this.addEventListener('focusin', this._handleSubmenuOpen)
    window.addEventListener('resize', this._handleWindowChange)
    document.addEventListener('scroll', this._handleWindowChange, true)
    this._visualViewport = window.visualViewport || null
    if (this._visualViewport) {
      this._visualViewport.addEventListener('resize', this._handleWindowChange)
      this._visualViewport.addEventListener('scroll', this._handleWindowChange)
    }
  }

  disconnectedCallback() {
    this.removeEventListener('pointerenter', this._handleSubmenuOpen)
    this.removeEventListener('focusin', this._handleSubmenuOpen)
    window.removeEventListener('resize', this._handleWindowChange)
    document.removeEventListener('scroll', this._handleWindowChange, true)
    if (this._visualViewport) {
      this._visualViewport.removeEventListener('resize', this._handleWindowChange)
      this._visualViewport.removeEventListener('scroll', this._handleWindowChange)
      this._visualViewport = null
    }
    cancelAnimationFrame(this._positionFrame)
  }

  attributeChangedCallback() {
    this.render()
    this.scheduleSubmenuPosition()
  }

  click() {
    const base = this.getBase()
    if (base) {
      base.click()
    }
  }

  focus(options) {
    const base = this.getBase()
    if (base) {
      base.focus(options)
    }
  }

  blur() {
    const base = this.getBase()
    if (base) {
      base.blur()
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const disabled = this.disabled
    const checked = this.checked
    const loading = this.loading
    const hasSubmenu = this.hasSubmenuContent()
    this._hasSubmenu = hasSubmenu

    const classes = ['item']
    if (disabled || loading) {
      classes.push('item--disabled')
    }
    if (checked) {
      classes.push('item--checked')
    }
    if (loading) {
      classes.push('item--loading')
    }
    if (hasSubmenu) {
      classes.push('item--has-submenu')
    }

    root.innerHTML = `<style>${menuItemStyle}</style>
      <div
        class="${escapeAttribute(classes.join(' '))}"
        part="base"
        role="${checked ? 'menuitemcheckbox' : 'menuitem'}"
        tabindex="${disabled || loading ? '-1' : '0'}"
        aria-disabled="${disabled || loading ? 'true' : 'false'}"
        ${checked ? 'aria-checked="true"' : ''}
      >
        <span class="item__label"><slot></slot></span>
        <span class="item__state" aria-hidden="true">
          <span class="item__check">
            <svg viewBox="0 0 16 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">
              <path d="m3.5 8.2 2.8 2.8 6.2-6.2"></path>
            </svg>
          </span>
          <span class="item__loader">
            <svg viewBox="0 0 16 16" stroke-width="2" stroke-linecap="round" focusable="false">
              <circle cx="8" cy="8" r="5.5" opacity=".25"></circle>
              <path d="M8 2.5a5.5 5.5 0 0 1 5.5 5.5"></path>
            </svg>
          </span>
        </span>
        <span class="item__submenu-caret" aria-hidden="true">
          <svg viewBox="0 0 16 16" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false">
            <path d="m6 4 4 4-4 4"></path>
          </svg>
        </span>
      </div>
      <span class="submenu"><slot name="submenu"></slot></span>
    `

    const base = root.querySelector('.item')
    const submenuSlot = root.querySelector('slot[name="submenu"]')

    base.addEventListener('click', (event) => {
      if (disabled || loading) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      if (event.detail === 0) {
        base.focus()
      } else {
        requestAnimationFrame(() => base.blur())
      }
    })

    submenuSlot.addEventListener('slotchange', () => {
      const nextHasSubmenu = this.hasSubmenuContent()
      if (nextHasSubmenu !== this._hasSubmenu) {
        this.render()
        return
      }
      this.scheduleSubmenuPosition()
    })

    this.scheduleSubmenuPosition()
  }

  scheduleSubmenuPosition() {
    if (!this.hasSubmenuContent()) {
      return
    }

    cancelAnimationFrame(this._positionFrame)
    this._positionFrame = requestAnimationFrame(() => this.updateSubmenuPosition())
  }

  updateSubmenuPosition() {
    if (!this.hasSubmenuContent() || !this.shadowRoot) {
      return
    }

    const submenu = this.shadowRoot.querySelector('.submenu')
    if (!submenu) {
      return
    }

    const viewport = getViewportRect()
    const margin = 8
    const baseRect = this.getBoundingClientRect()
    const previousDisplay = submenu.style.display
    const previousVisibility = submenu.style.visibility
    const submenuSlot = this.shadowRoot.querySelector('slot[name="submenu"]')
    const submenuMenus = getSubmenuMenus(submenuSlot)

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
    submenu.style.maxWidth = `${Math.floor(Math.max(0, viewport.width - margin * 2))}px`

    for (let i = 0; i < submenuMenus.length; i++) {
      submenuMenus[i].style.setProperty('--tot-menu-max-height', `${Math.floor(maxHeight)}px`)
      submenuMenus[i].style.setProperty('--tot-menu-overflow', 'auto')
    }

    submenu.style.visibility = previousVisibility
    submenu.style.display = previousDisplay
  }

  getBase() {
    return this.shadowRoot?.querySelector('.item')
  }

  hasSubmenuContent() {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].slot === 'submenu') {
        return true
      }
    }
    return false
  }
}

export class TotMenuLabel extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${menuLabelStyle}</style><div class="label" part="base"><slot></slot></div>`
  }
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
