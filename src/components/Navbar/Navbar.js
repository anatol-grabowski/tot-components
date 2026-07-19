const navbarStyle = `
  :host {
    display: block;
    max-width: 100%;
    overflow: visible;
    position: relative;
    z-index: var(--tot-z-index-navbar, 700);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .navbar {
    --tot-navbar-current-height: var(--tot-navbar-height-medium, var(--tot-navbar-height, 2.75rem));
    --tot-navbar-current-font-size: var(--tot-input-font-size-medium, .875rem);
    --tot-navbar-current-spacing: var(--tot-spacing-2x-small, .25rem);
    --tot-navbar-current-edge-spacing: calc(var(--tot-navbar-current-spacing) + var(--tot-spacing-3x-small, .125rem));
    --tot-navbar-current-tab-spacing: var(--tot-navbar-current-edge-spacing);

    align-items: center;
    background: var(--tot-navbar-background-color, var(--tot-color-neutral-100, #f1f5f9));
    border: 0;
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-navbar-border-color, var(--tot-panel-border-color, #e2e8f0));
    border-radius: 0;
    color: var(--tot-input-color, #1e293b);
    display: flex;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-navbar-current-font-size);
    gap: var(--tot-spacing-small, .5rem);
    min-height: var(--tot-navbar-current-height);
    max-width: 100%;
    overflow: visible;
    padding: 0 var(--tot-navbar-current-edge-spacing);
  }

  .navbar--small {
    --tot-navbar-current-height: var(--tot-navbar-height-small, 2.25rem);
    --tot-navbar-current-font-size: var(--tot-input-font-size-small, .75rem);
    --tot-navbar-current-spacing: var(--tot-spacing-3x-small, .125rem);
  }

  .navbar--large {
    --tot-navbar-current-height: var(--tot-navbar-height-large, 3.25rem);
    --tot-navbar-current-font-size: var(--tot-input-font-size-large, 1rem);
    --tot-navbar-current-spacing: var(--tot-spacing-x-small, .5rem);
  }

  .tabs {
    align-items: stretch;
    display: flex;
    flex: 1 1 auto;
    gap: 0;
    height: var(--tot-navbar-current-height);
    min-width: 0;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
  }

  button.tab {
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-bottom: 3px solid transparent;
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    font: inherit;
    height: 100%;
    justify-content: center;
    max-width: 16rem;
    min-width: 0;
    padding: 0 var(--tot-navbar-current-tab-spacing);
    position: relative;
    white-space: nowrap;
  }

  button.tab::after {
    content: attr(data-text);
    display: block;
    font-weight: var(--tot-font-weight-semibold, 600);
    height: 0;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
  }

  button.tab:hover:not(:disabled) {
    background: var(--tot-color-neutral-200, #e2e8f0);
    color: var(--tot-input-color-hover, #0f172a);
  }

  button.tab:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: -1px;
    z-index: 1;
  }

  button.tab[aria-selected='true'] {
    border-bottom-color: var(--tot-color-primary-600, #0284c7);
    color: var(--tot-color-primary-700, #0369a1);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  button.tab:disabled {
    cursor: not-allowed;
    opacity: .5;
  }

  .slot-group {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    gap: var(--tot-spacing-small, .5rem);
    min-width: 0;
  }

  .slot-group--suffix {
    justify-content: flex-end;
  }

  .slot-group[hidden] {
    display: none;
  }

  .slot-group slot {
    display: contents;
  }

  ::slotted(*) {
    align-self: center;
    flex: 0 0 auto;
    margin: 0;
  }
`

const sizes = ['small', 'medium', 'large']

export class TotNavbar extends HTMLElement {
  static get observedAttributes() {
    return ['items', 'value', 'size', 'disabled', 'aria-label']
  }

  constructor() {
    super()
    this._items = null
    this._scrollFrame = 0
    this._handleClick = event => this.handleClick(event)
    this._handleKeyDown = event => this.handleKeyDown(event)
  }

  get items() {
    if (this._items) {
      return cloneItems(this._items)
    }
    return parseItems(this.getAttribute('items'))
  }

  set items(value) {
    this._items = parseItems(value)
    if (this.isConnected) {
      this.renderItems()
    }
  }

  get value() {
    return this.getAttribute('value') || ''
  }

  set value(value) {
    setNullableAttribute(this, 'value', value)
  }

  get size() {
    return getSupportedValue(this.getAttribute('size'), sizes, 'medium')
  }

  set size(value) {
    this.setAttribute('size', getSupportedValue(value, sizes, 'medium'))
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    if (value === true || value === '' || value === 'disabled') {
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
  }

  get ariaLabel() {
    return this.getAttribute('aria-label') || 'Main navigation'
  }

  set ariaLabel(value) {
    setNullableAttribute(this, 'aria-label', value)
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._scrollFrame)
    this._scrollFrame = 0
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) {
      return
    }

    if (name === 'items') {
      this._items = null
      this.renderItems()
      return
    }

    if (name === 'value') {
      this.syncSelection()
      return
    }

    if (name === 'disabled') {
      this.syncDisabled()
      return
    }

    if (name === 'size') {
      this.syncSize()
      return
    }

    this.syncLabel()
  }

  focus(options) {
    const buttons = this.getTabButtons()
    let target = null
    for (let i = 0; i < buttons.length; i++) {
      if (!buttons[i].disabled && buttons[i].getAttribute('aria-selected') === 'true') {
        target = buttons[i]
        break
      }
    }

    if (!target) {
      target = getFirstEnabledButton(buttons)
    }
    target?.focus(options)
  }

  blur() {
    const activeElement = this.shadowRoot?.activeElement
    if (activeElement instanceof HTMLElement) {
      activeElement.blur()
    }
  }

  getTabButtons() {
    return this.shadowRoot ? Array.from(this.shadowRoot.querySelectorAll('button.tab')) : []
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    if (!root.querySelector('.navbar')) {
      root.innerHTML = `<style>${navbarStyle}</style>
        <nav class="navbar" part="base">
          <span class="slot-group slot-group--prefix" part="prefix"><slot name="prefix"></slot></span>
          <div class="tabs" part="tabs" role="tablist"></div>
          <span class="slot-group slot-group--suffix" part="suffix"><slot name="suffix"></slot></span>
        </nav>
      `

      const holder = root.querySelector('.tabs')
      holder.addEventListener('click', this._handleClick)
      holder.addEventListener('keydown', this._handleKeyDown)
      this.connectSlots()
    }

    this.syncSize()
    this.syncLabel()
    this.renderItems()
  }

  renderItems() {
    const holder = this.shadowRoot?.querySelector('.tabs')
    if (!holder) {
      return
    }

    const previousScrollLeft = holder.scrollLeft
    const activeValue = this.shadowRoot.activeElement?.dataset?.value || ''
    const items = this.items
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'tab'
      button.setAttribute('part', 'tab')
      button.setAttribute('role', 'tab')
      button.dataset.index = String(i)
      button.dataset.value = item.value
      button.dataset.text = item.label
      button.textContent = item.label
      fragment.append(button)
    }

    holder.replaceChildren(fragment)
    this.syncDisabled(items)
    holder.scrollLeft = previousScrollLeft

    cancelAnimationFrame(this._scrollFrame)
    this._scrollFrame = requestAnimationFrame(() => {
      this._scrollFrame = 0
      holder.scrollLeft = previousScrollLeft
      if (activeValue) {
        const button = findButtonByValue(holder, activeValue)
        button?.focus({ preventScroll: true })
      }
    })
  }

  syncSize() {
    const navbar = this.shadowRoot?.querySelector('.navbar')
    if (navbar) {
      navbar.className = `navbar navbar--${this.size}`
    }
  }

  syncLabel() {
    this.shadowRoot?.querySelector('.navbar')?.setAttribute('aria-label', this.ariaLabel)
  }

  syncDisabled(items = this.items) {
    const buttons = this.getTabButtons()
    for (let i = 0; i < buttons.length; i++) {
      const item = items[Number(buttons[i].dataset.index)]
      buttons[i].disabled = this.disabled || Boolean(item?.disabled)
    }
    this.syncSelection(items)
  }

  syncSelection(items = this.items) {
    const resolvedValue = this.getResolvedValue(items)
    const buttons = this.getTabButtons()
    for (let i = 0; i < buttons.length; i++) {
      const selected = buttons[i].dataset.value === resolvedValue
      buttons[i].setAttribute('aria-selected', String(selected))
      buttons[i].tabIndex = selected && !buttons[i].disabled ? 0 : -1
    }
  }

  connectSlots() {
    const slots = this.shadowRoot.querySelectorAll('.slot-group slot')
    for (let i = 0; i < slots.length; i++) {
      const group = slots[i].closest('.slot-group')
      const syncGroup = () => {
        const nodes = slots[i].assignedNodes({ flatten: true })
        let hasContent = false
        for (let n = 0; n < nodes.length; n++) {
          if (nodes[n].nodeType === Node.ELEMENT_NODE || String(nodes[n].textContent || '').trim()) {
            hasContent = true
            break
          }
        }
        group.hidden = !hasContent
      }
      syncGroup()
      slots[i].addEventListener('slotchange', syncGroup)
    }
  }

  handleClick(event) {
    const target = event.target instanceof Element ? event.target.closest('button.tab') : null
    if (!target || target.disabled) {
      return
    }

    const item = this.items[Number(target.dataset.index)]
    if (!item) {
      return
    }

    this.value = item.value
    emit(this, 'change', { value: item.value, item })
  }

  handleKeyDown(event) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return
    }

    const current = event.target instanceof Element ? event.target.closest('button.tab') : null
    if (!current) {
      return
    }

    const buttons = this.getTabButtons()
    const enabled = []
    for (let i = 0; i < buttons.length; i++) {
      if (!buttons[i].disabled) {
        enabled.push(buttons[i])
      }
    }
    if (enabled.length === 0) {
      return
    }

    const currentIndex = enabled.indexOf(current)
    let nextIndex = currentIndex
    if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = enabled.length - 1
    } else if (event.key === 'ArrowRight') {
      nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % enabled.length
    } else {
      nextIndex = currentIndex < 0 ? enabled.length - 1 : (currentIndex - 1 + enabled.length) % enabled.length
    }

    enabled[nextIndex].focus()
    event.preventDefault()
  }

  getResolvedValue(items) {
    const value = this.value
    for (let i = 0; i < items.length; i++) {
      if (items[i].value === value) {
        return value
      }
    }
    for (let i = 0; i < items.length; i++) {
      if (!items[i].disabled) {
        return items[i].value
      }
    }
    return items[0] ? items[0].value : ''
  }
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail,
  }))
}

function parseItems(value) {
  if (value === null || value === undefined || value === '') {
    return []
  }

  let source = value
  if (typeof value === 'string') {
    source = parseJson(value, null)
    if (!source) {
      source = []
      const parts = value.split(',')
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim()
        if (part) {
          source.push(part)
        }
      }
    }
  }

  if (!Array.isArray(source)) {
    return []
  }

  const items = []
  for (let i = 0; i < source.length; i++) {
    const item = source[i]
    if (typeof item === 'string') {
      items.push({
        value: item,
        label: item,
        disabled: false,
      })
    } else if (item && typeof item === 'object') {
      const itemValue = item.value ?? item.id ?? item.label ?? ''
      const itemLabel = item.label ?? item.value ?? item.id ?? ''
      items.push({
        value: String(itemValue),
        label: String(itemLabel),
        disabled: Boolean(item.disabled),
      })
    }
  }
  return items
}

function cloneItems(items) {
  const result = []
  for (let i = 0; i < items.length; i++) {
    result.push({ ...items[i] })
  }
  return result
}

function findButtonByValue(holder, value) {
  const buttons = holder.querySelectorAll('button.tab')
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].dataset.value === value) {
      return buttons[i]
    }
  }
  return null
}

function getFirstEnabledButton(buttons) {
  for (let i = 0; i < buttons.length; i++) {
    if (!buttons[i].disabled) {
      return buttons[i]
    }
  }
  return null
}

function getSupportedValue(value, supported, fallback) {
  const normalized = String(value || '').toLowerCase()
  return supported.includes(normalized) ? normalized : fallback
}

function setNullableAttribute(element, name, value) {
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
