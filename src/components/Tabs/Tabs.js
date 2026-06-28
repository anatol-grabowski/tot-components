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

    background: var(--tot-panel-background-color, #fff);
    color: var(--tot-input-color, #1e293b);
    display: flex;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    gap: var(--tot-tabs-gap);
    height: var(--tot-tabs-height, 2.25rem);
    isolation: isolate;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    scrollbar-width: thin;
  }

  .tabs::after {
    background: var(--tot-panel-border-color, #e2e8f0);
    bottom: 0;
    content: '';
    height: var(--tot-panel-border-width, 1px);
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
    height: 100%;
    margin: 0 0 -1px;
    max-width: 16rem;
    min-width: 0;
    padding: 0;
    position: relative;
    white-space: nowrap;
    z-index: 1;
  }

  .tab-inner {
    align-items: center;
    background: var(--tot-color-neutral-50, #f8fafc);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px) var(--tot-border-radius-medium, 4px) 0 0;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    max-width: 100%;
    min-width: 0;
    padding: 0 var(--tot-spacing-medium, 1rem);
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

  button[data-sticky]::before {
    background: var(--tot-panel-background-color, #fff);
    bottom: 0;
    content: '';
    left: calc(-1 * var(--tot-tabs-gap));
    pointer-events: none;
    position: absolute;
    right: calc(-1 * var(--tot-tabs-gap));
    top: 0;
    z-index: 0;
  }

  button[data-sticky='start'] {
    left: var(--tot-tab-sticky-offset, 0px);
  }

  button[data-sticky='end'] {
    right: var(--tot-tab-sticky-offset, 0px);
  }

  button:hover:not(:disabled) .tab-inner {
    background: var(--tot-color-neutral-100, #f1f5f9);
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
    color: var(--tot-color-primary-700, #0369a1);
    font-weight: var(--tot-font-weight-semibold, 600);
    z-index: 2;
  }

  button[aria-selected='true'] .tab-inner {
    background: var(--tot-panel-background-color, #fff);
    border-bottom-color: var(--tot-panel-background-color, #fff);
  }

  button[data-sticky][aria-selected='true'] {
    z-index: 4;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
`

export class TotTabs extends HTMLElement {
  static get observedAttributes() {
    return ['tabs', 'options', 'value', 'disabled']
  }

  get tabs() {
    if (this._tabs) {
      return this._tabs.slice()
    }
    return parseOptions(this.getAttribute('tabs') || this.getAttribute('options'))
  }

  set tabs(value) {
    this._tabs = parseOptions(value)
    this.render()
  }

  get options() {
    return this.tabs
  }

  set options(value) {
    this.tabs = value
  }

  get value() {
    return this.getAttribute('value') || ''
  }

  set value(value) {
    if (value === null || value === undefined) {
      this.removeAttribute('value')
    } else {
      this.setAttribute('value', String(value))
    }
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

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.disconnectResizeObserver()
  }

  attributeChangedCallback(name) {
    if (name === 'tabs' || name === 'options') {
      this._tabs = null
    }
    this.render()
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const previousScrollLeft = root.querySelector('.tabs')?.scrollLeft || 0
    const tabs = this.tabs
    const value = this.getResolvedValue(tabs)
    const disabled = this.disabled

    root.innerHTML = `<style>${tabsStyle}</style><div class="tabs" part="base" role="tablist"></div>`

    const holder = root.querySelector('.tabs')

    for (let i = 0; i < tabs.length; i++) {
      const item = tabs[i]
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.part = item.sticky ? `tab sticky-${item.sticky}` : 'tab'
      btn.setAttribute('role', 'tab')
      btn.setAttribute('aria-selected', String(item.value === value))
      btn.disabled = disabled || item.disabled
      btn.dataset.value = item.value
      btn.dataset.text = item.label
      if (item.sticky) {
        btn.dataset.sticky = item.sticky
      }

      const inner = document.createElement('span')
      inner.className = 'tab-inner'
      inner.dataset.text = item.label

      const text = document.createElement('span')
      text.className = 'tab-text'
      text.textContent = item.label
      inner.append(text)
      btn.append(inner)

      btn.addEventListener('click', () => {
        if (btn.disabled) {
          return
        }

        this.value = item.value
        emit(this, 'change', { value: item.value, item })
      })
      holder.append(btn)
    }

    holder.scrollLeft = previousScrollLeft
    this.connectResizeObserver(holder)
    this.updateStickyOffsets(holder)
    requestAnimationFrame(() => {
      holder.scrollLeft = previousScrollLeft
      this.updateStickyOffsets(holder)
    })
  }

  getResolvedValue(tabs) {
    const value = this.getAttribute('value') || ''
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].value === value) {
        return value
      }
    }
    return tabs[0] ? tabs[0].value : ''
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
  }

  disconnectResizeObserver() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    }
  }

  updateStickyOffsets(holder = this.shadowRoot?.querySelector('.tabs')) {
    if (!holder) {
      return
    }

    const buttons = Array.from(holder.querySelectorAll('button[data-sticky]'))
    const gap = parsePixels(getComputedStyle(holder).columnGap || getComputedStyle(holder).gap)
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
    detail: detail || {},
  }))
}

function parseOptions(value) {
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

  const options = []
  for (let i = 0; i < source.length; i++) {
    const item = source[i]
    if (typeof item === 'string') {
      options.push({
        value: item,
        label: item,
        disabled: false,
        sticky: '',
      })
    } else if (item && typeof item === 'object') {
      const optionValue = item.value ?? item.id ?? item.label ?? ''
      const optionLabel = item.label ?? item.value ?? item.id ?? ''
      options.push({
        value: String(optionValue),
        label: String(optionLabel),
        disabled: Boolean(item.disabled),
        sticky: getStickyValue(item),
      })
    }
  }
  return options
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

function parsePixels(value) {
  const number = Number.parseFloat(value)
  if (Number.isFinite(number)) {
    return number
  }
  return 0
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}
