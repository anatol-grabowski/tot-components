const navbarStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  nav {
    align-items: center;
    background: var(--tot-navbar-background-color, var(--tot-color-neutral-100, #f1f5f9));
    border: 0;
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-navbar-border-color, var(--tot-panel-border-color, #e2e8f0));
    border-radius: 0;
    color: var(--tot-input-color, #1e293b);
    display: flex;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    gap: var(--tot-spacing-small, .5rem);
    min-height: var(--tot-navbar-height, 2.75rem);
    max-width: 100%;
    overflow: hidden;
    padding: 0 var(--tot-spacing-small, .5rem);
  }

  .tabs {
    align-items: stretch;
    display: flex;
    flex: 1 1 auto;
    gap: 0;
    height: var(--tot-navbar-height, 2.75rem);
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
    padding: 0 var(--tot-spacing-medium, 1rem);
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

  ::slotted(*) {
    flex: 0 0 auto;
  }
`

export class TotNavbar extends HTMLElement {
  static get observedAttributes() {
    return ['tabs', 'value', 'disabled', 'aria-label']
  }

  get tabs() {
    if (this._tabs) {
      return this._tabs.slice()
    }
    return parseOptions(this.getAttribute('tabs'))
  }

  set tabs(value) {
    this._tabs = parseOptions(value)
    this.render()
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
    if (name === 'tabs') {
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
    const label = this.getAttribute('aria-label') || 'Main navigation'

    root.innerHTML = `<style>${navbarStyle}</style>
      <nav aria-label="${escapeAttribute(label)}" part="base">
        <slot name="left"></slot>
        <div class="tabs" part="tabs" role="tablist"></div>
        <slot name="right"></slot>
      </nav>
    `

    const holder = root.querySelector('.tabs')

    for (let i = 0; i < tabs.length; i++) {
      const item = tabs[i]
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'tab'
      btn.part = 'tab'
      btn.setAttribute('role', 'tab')
      btn.setAttribute('aria-selected', String(item.value === value))
      btn.dataset.value = item.value
      btn.dataset.text = item.label
      btn.disabled = disabled || item.disabled
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
