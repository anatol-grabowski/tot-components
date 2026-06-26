const tabsStyle = `
  :host {
    display: inline-block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .tabs {
    color: var(--tot-input-color, #1e293b);
    display: flex;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    border-bottom: 0;
    gap: 2px;
    height: var(--tot-tabs-height, 2.25rem);
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
    align-items: center;
    background: var(--tot-color-neutral-50, #f8fafc);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px) var(--tot-border-radius-medium, 4px) 0 0;
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    font: inherit;
    height: 100%;
    justify-content: center;
    margin-bottom: -1px;
    max-width: 16rem;
    min-width: 0;
    padding: 0 var(--tot-spacing-medium, 1rem);
    position: relative;
    white-space: nowrap;
    z-index: 1;
  }

  button::after {
    content: attr(data-text);
    display: block;
    font-weight: var(--tot-font-weight-semibold, 600);
    height: 0;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
  }

  button:hover:not(:disabled) {
    background: var(--tot-color-neutral-100, #f1f5f9);
    color: var(--tot-input-color-hover, #0f172a);
  }

  button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: -1px;
    z-index: 2;
  }

  button[aria-selected='true'] {
    background: var(--tot-panel-background-color, #fff);
    border-bottom-color: var(--tot-panel-background-color, #fff);
    color: var(--tot-color-primary-700, #0369a1);
    font-weight: var(--tot-font-weight-semibold, 600);
    z-index: 2;
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
      btn.part = 'tab'
      btn.setAttribute('role', 'tab')
      btn.setAttribute('aria-selected', String(item.value === value))
      btn.disabled = disabled || item.disabled
      btn.dataset.value = item.value
      btn.dataset.text = item.label
      btn.textContent = item.label
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
    requestAnimationFrame(() => {
      holder.scrollLeft = previousScrollLeft
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
      })
    } else if (item && typeof item === 'object') {
      const optionValue = item.value ?? item.id ?? item.label ?? ''
      const optionLabel = item.label ?? item.value ?? item.id ?? ''
      options.push({
        value: String(optionValue),
        label: String(optionLabel),
        disabled: Boolean(item.disabled),
      })
    }
  }
  return options
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}
