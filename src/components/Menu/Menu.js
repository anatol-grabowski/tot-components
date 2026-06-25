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
    min-width: var(--tot-menu-min-width, 12rem);
    overflow: var(--tot-menu-overflow, visible);
    padding: var(--tot-menu-padding, .125rem);
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
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    gap: var(--tot-menu-item-gap, .375rem);
    grid-template-columns: .875rem minmax(0, 1fr) auto;
    line-height: 1.25;
    min-height: var(--tot-menu-item-height, 1.625rem);
    outline: none;
    padding: var(--tot-menu-item-padding-block, .25rem) var(--tot-menu-item-padding-inline, .5rem);
    position: relative;
    text-align: left;
    user-select: none;
    width: 100%;
  }

  .item:hover:not(.item--disabled),
  .item:focus-visible:not(.item--disabled) {
    background: var(--tot-color-neutral-100, #f1f5f9);
    color: var(--tot-input-color-hover, #0f172a);
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

  .item__check,
  .item__loader,
  .item__submenu-caret {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    line-height: 1;
  }

  .item__check,
  .item__loader {
    color: var(--tot-color-primary-700, #0369a1);
    min-width: 1rem;
  }

  .item:not(.item--checked) .item__check {
    visibility: hidden;
  }

  .item__loader {
    display: none;
  }

  .item--loading .item__check {
    display: none;
  }

  .item--loading .item__loader {
    display: inline-flex;
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
    font-size: .85em;
  }

  .item--has-submenu .item__submenu-caret {
    display: inline-flex;
  }

  .submenu {
    display: none;
    left: 100%;
    min-width: 12rem;
    position: absolute;
    top: 0;
    z-index: var(--tot-z-index-dropdown, 1000);
  }

  :host(:hover) .submenu,
  :host(:focus-within) .submenu,
  :host([open]) .submenu {
    display: block;
  }

  ::slotted(tot-menu) {
    min-width: var(--tot-menu-submenu-min-width, 12rem);
  }

  @media (max-width: 640px) {
    .submenu {
      left: var(--tot-spacing-small, .75rem);
      max-width: 100vw;
      position: relative;
      top: auto;
    }
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
  }

  attributeChangedCallback() {
    this.render()
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
        <span class="item__check" aria-hidden="true">✓</span>
        <span class="item__loader" aria-hidden="true">⌛</span>
        <span class="item__label"><slot></slot></span>
        <span class="item__submenu-caret" aria-hidden="true">❯</span>
        <span class="submenu"><slot name="submenu"></slot></span>
      </div>
    `

    const base = root.querySelector('.item')
    const submenuSlot = root.querySelector('slot[name="submenu"]')

    base.addEventListener('click', (event) => {
      if (disabled || loading) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      base.focus()
    })

    submenuSlot.addEventListener('slotchange', () => {
      const nextHasSubmenu = this.hasSubmenuContent()
      if (nextHasSubmenu !== this._hasSubmenu) {
        this.render()
      }
    })
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
