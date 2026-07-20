const tabsStyle = `
  :host {
    display: inline-block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .tabs {
    --tot-tabs-gap: 2px;
    --tot-tabs-active-lift: var(--tot-tabs-active-lift-default, .125rem);
    --tot-tabs-active-spill: var(--tot-tabs-active-spill-medium, .25rem);
    --tot-tabs-border-width: var(--tot-panel-border-width, 1px);
    --tot-tabs-current-height: var(
      --tot-tabs-height-medium,
      var(--tot-tabs-height, calc(var(--tot-input-height-medium, 2.25rem) - .125rem))
    );
    --tot-tabs-current-font-size: var(--tot-input-font-size-medium, .875rem);
    --tot-tabs-current-spacing: var(--tot-spacing-2x-small, .25rem);
    --tot-tabs-current-edge-spacing: calc(var(--tot-tabs-current-spacing) + var(--tot-spacing-3x-small, .125rem));
    --tot-tabs-tab-background: var(--tot-color-neutral-50, #f8fafc);

    background: var(--tot-panel-background-color, #fff);
    color: var(--tot-input-color, #1e293b);
    display: flex;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-tabs-current-font-size);
    gap: var(--tot-tabs-gap);
    height: var(--tot-tabs-current-height);
    isolation: isolate;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding-inline-start: var(--tot-tabs-current-edge-spacing);
    position: relative;
    scrollbar-width: thin;
  }

  .tabs--small {
    --tot-tabs-active-spill: var(--tot-tabs-active-spill-small, .1875rem);
    --tot-tabs-current-height: var(--tot-tabs-height-small, calc(var(--tot-input-height-small, 1.75rem) - .125rem));
    --tot-tabs-current-font-size: var(--tot-input-font-size-small, .75rem);
    --tot-tabs-current-spacing: var(--tot-spacing-3x-small, .125rem);
  }

  .tabs--large {
    --tot-tabs-active-spill: var(--tot-tabs-active-spill-large, .375rem);
    --tot-tabs-current-height: var(--tot-tabs-height-large, calc(var(--tot-input-height-large, 2.75rem) - .125rem));
    --tot-tabs-current-font-size: var(--tot-input-font-size-large, 1rem);
    --tot-tabs-current-spacing: var(--tot-spacing-x-small, .5rem);
  }

  .tabs::after {
    background: var(--tot-panel-border-color, #e2e8f0);
    bottom: 0;
    content: '';
    height: var(--tot-tabs-border-width);
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    z-index: 0;
  }

  button {
    appearance: none;
    align-items: stretch;
    background: transparent;
    border: 0;
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    font: inherit;
    height: calc(100% - var(--tot-tabs-active-lift));
    margin: var(--tot-tabs-active-lift) 0 0;
    max-width: 16rem;
    min-width: 0;
    padding: 0;
    position: relative;
    white-space: nowrap;
    z-index: 1;
  }

  .tab-inner {
    align-items: center;
    background: var(--tot-tabs-tab-background);
    border: var(--tot-tabs-border-width) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px) var(--tot-border-radius-medium, 4px) 0 0;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    max-width: 100%;
    min-width: 0;
    padding: 0 var(--tot-tabs-current-edge-spacing);
    position: relative;
    z-index: 1;
  }

  .tab-inner::after {
    content: attr(data-text);
    display: block;
    font-weight: var(--tot-font-weight-semibold, 600);
    height: 0;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
  }

  .tab-text {
    display: block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button[data-sticky] {
    background: var(--tot-panel-background-color, #fff);
    box-shadow:
      calc(-1 * var(--tot-tabs-gap)) 0 0 0 var(--tot-panel-background-color, #fff),
      var(--tot-tabs-gap) 0 0 0 var(--tot-panel-background-color, #fff);
    position: sticky;
    z-index: 3;
  }

  button[data-sticky='start'] {
    left: var(--tot-tab-sticky-offset, 0px);
  }

  button[data-sticky='end'] {
    right: var(--tot-tab-sticky-offset, 0px);
  }

  button:hover:not(:disabled) {
    --tot-tabs-tab-background: var(--tot-color-neutral-100, #f1f5f9);

    color: var(--tot-input-color-hover, #0f172a);
  }

  button:focus-visible {
    outline: none;
    z-index: 4;
  }

  button:focus-visible .tab-inner {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: -1px;
  }

  button[aria-selected='true'] {
    --tot-tabs-tab-background: var(--tot-panel-background-color, #fff);

    background: var(--tot-tabs-tab-background);
    color: var(--tot-color-primary-700, #0369a1);
    font-weight: var(--tot-font-weight-semibold, 600);
    height: 100%;
    margin: 0;
    z-index: 2;
  }

  button[aria-selected='true'] .tab-inner {
    border-bottom: 0;
    height: calc(100% - var(--tot-tabs-active-spill) + var(--tot-tabs-border-width));
  }

  button[aria-selected='true']::before,
  button[aria-selected='true']::after {
    background: radial-gradient(
      circle var(--tot-tabs-active-spill) at var(--tot-tabs-curve-origin-x) 0,
      transparent calc(var(--tot-tabs-active-spill) - var(--tot-tabs-border-width)),
      var(--tot-panel-border-color, #e2e8f0) calc(var(--tot-tabs-active-spill) - var(--tot-tabs-border-width)),
      var(--tot-panel-border-color, #e2e8f0) var(--tot-tabs-active-spill),
      var(--tot-tabs-tab-background) var(--tot-tabs-active-spill)
    );
    bottom: 0;
    content: '';
    height: var(--tot-tabs-active-spill);
    pointer-events: none;
    position: absolute;
    width: var(--tot-tabs-active-spill);
    z-index: 2;
  }

  button[aria-selected='true']::before {
    --tot-tabs-curve-origin-x: 0;

    left: calc(-1 * var(--tot-tabs-active-spill) + var(--tot-tabs-border-width));
  }

  button[aria-selected='true']::after {
    --tot-tabs-curve-origin-x: 100%;

    right: calc(-1 * var(--tot-tabs-active-spill) + var(--tot-tabs-border-width));
  }

  button[data-sticky][aria-selected='true'] {
    z-index: 4;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
`

const sizes = ['small', 'medium', 'large']

export class TotTabs extends HTMLElement {
  static get observedAttributes() {
    return ['items', 'value', 'size', 'disabled', 'aria-label']
  }

  constructor() {
    super()
    this._items = null
    this._resizeObserver = null
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
    return this.getAttribute('aria-label') || 'Tabs'
  }

  set ariaLabel(value) {
    setNullableAttribute(this, 'aria-label', value)
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.disconnectResizeObserver()
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
      this.scheduleStickyUpdate()
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
    return this.shadowRoot ? Array.from(this.shadowRoot.querySelectorAll('button')) : []
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    if (!root.querySelector('.tabs')) {
      root.innerHTML = `<style>${tabsStyle}</style><div class="tabs" part="base" role="tablist"></div>`
      const holder = root.querySelector('.tabs')
      holder.addEventListener('click', this._handleClick)
      holder.addEventListener('keydown', this._handleKeyDown)
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
      button.setAttribute('part', item.sticky ? `tab sticky-${item.sticky}` : 'tab')
      button.setAttribute('role', 'tab')
      button.dataset.index = String(i)
      button.dataset.value = item.value
      if (item.sticky) {
        button.dataset.sticky = item.sticky
      }

      const inner = document.createElement('span')
      inner.className = 'tab-inner'
      inner.setAttribute('part', 'tab-inner')
      inner.dataset.text = item.label

      const text = document.createElement('span')
      text.className = 'tab-text'
      text.setAttribute('part', 'tab-text')
      text.textContent = item.label
      inner.append(text)
      button.append(inner)
      fragment.append(button)
    }

    holder.replaceChildren(fragment)
    this.syncDisabled(items)
    holder.scrollLeft = previousScrollLeft
    this.connectResizeObserver(holder)
    this.updateStickyOffsets(holder)

    cancelAnimationFrame(this._scrollFrame)
    this._scrollFrame = requestAnimationFrame(() => {
      this._scrollFrame = 0
      holder.scrollLeft = previousScrollLeft
      this.updateStickyOffsets(holder)
      if (activeValue) {
        const button = findButtonByValue(holder, activeValue)
        button?.focus({ preventScroll: true })
      }
    })
  }

  syncSize() {
    const holder = this.shadowRoot?.querySelector('.tabs')
    if (holder) {
      holder.className = `tabs tabs--${this.size}`
    }
  }

  syncLabel() {
    this.shadowRoot?.querySelector('.tabs')?.setAttribute('aria-label', this.ariaLabel)
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

  handleClick(event) {
    const target = event.target instanceof Element ? event.target.closest('button') : null
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

    const current = event.target instanceof Element ? event.target.closest('button') : null
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

  connectResizeObserver(holder) {
    this.disconnectResizeObserver()
    if (typeof ResizeObserver !== 'function') {
      return
    }

    this._resizeObserver = new ResizeObserver(() => {
      this.updateStickyOffsets(holder)
    })
    this._resizeObserver.observe(holder)
    const buttons = holder.querySelectorAll('button')
    for (let i = 0; i < buttons.length; i++) {
      this._resizeObserver.observe(buttons[i])
    }
  }

  disconnectResizeObserver() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    }
  }

  scheduleStickyUpdate() {
    const holder = this.shadowRoot?.querySelector('.tabs')
    if (!holder) {
      return
    }

    cancelAnimationFrame(this._scrollFrame)
    this._scrollFrame = requestAnimationFrame(() => {
      this._scrollFrame = 0
      this.updateStickyOffsets(holder)
    })
  }


  updateStickyOffsets(holder = this.shadowRoot?.querySelector('.tabs')) {
    if (!holder) {
      return
    }

    const buttons = holder.querySelectorAll('button[data-sticky]')
    const style = getComputedStyle(holder)
    const gap = parsePixels(style.columnGap || style.gap)
    let startOffset = 0

    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].dataset.sticky !== 'start') {
        continue
      }

      buttons[i].style.setProperty('--tot-tab-sticky-offset', `${startOffset}px`)
      startOffset += buttons[i].offsetWidth + gap
    }

    let endOffset = 0
    for (let i = buttons.length - 1; i >= 0; i--) {
      if (buttons[i].dataset.sticky !== 'end') {
        continue
      }

      buttons[i].style.setProperty('--tot-tab-sticky-offset', `${endOffset}px`)
      endOffset += buttons[i].offsetWidth + gap
    }
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
        sticky: '',
      })
    } else if (item && typeof item === 'object') {
      const itemValue = item.value ?? item.id ?? item.label ?? ''
      const itemLabel = item.label ?? item.value ?? item.id ?? ''
      items.push({
        value: String(itemValue),
        label: String(itemLabel),
        disabled: Boolean(item.disabled),
        sticky: getStickyValue(item),
      })
    }
  }
  return items
}

function getStickyValue(item) {
  if (item.sticky === true || item.stickyStart === true || item.stickyLeft === true) {
    return 'start'
  }

  if (item.stickyEnd === true || item.stickyRight === true) {
    return 'end'
  }

  const sticky = String(item.sticky ?? '').toLowerCase()
  if (sticky === 'start' || sticky === 'left') {
    return 'start'
  }

  if (sticky === 'end' || sticky === 'right') {
    return 'end'
  }

  return ''
}

function cloneItems(items) {
  const result = []
  for (let i = 0; i < items.length; i++) {
    result.push({ ...items[i] })
  }
  return result
}

function findButtonByValue(holder, value) {
  const buttons = holder.querySelectorAll('button')
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

function parsePixels(value) {
  const number = Number.parseFloat(value)
  return Number.isFinite(number) ? number : 0
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}
