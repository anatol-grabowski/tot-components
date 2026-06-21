/**
 * Compact Components - Core utilities and styles
 * Shared resources used across all components
 */
export const componentsDocs = [
  ['compact-navbar', 'Tabs in a compact top bar. Attributes: tabs, value. Slots: left, right. Event: change.'],
  ['compact-tabs', 'Compact tab selector. Attributes: options, value, disabled. Event: change.'],
]

export const baseStyle = `
  :host {
    --cc-bg: #fff;
    --cc-soft-bg: #f5f5f5;
    --cc-softer-bg: #fafafa;
    --cc-border: #ccc;
    --cc-border-strong: #999;
    --cc-text: #222;
    --cc-muted: #666;
    --cc-blue: #0066cc;
    --cc-blue-soft: #e8f4ff;
    --cc-blue-selected: #cce5ff;
    --cc-green: #0b7a3b;
    --cc-green-soft: #e9f8ee;
    --cc-orange: #b35c00;
    --cc-orange-soft: #fff2df;
    --cc-red: #b00020;
    --cc-red-soft: #ffe8ec;
    --cc-focus: #1d70b8;
    --cc-radius: 4px;
    color: var(--cc-text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    font-size: 13px;
    line-height: 1.35;
    box-sizing: border-box;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  button, input, select, textarea {
    font: inherit;
  }
  button, select, input, textarea {
    color: var(--cc-text);
  }
  .sr-only {
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    position: absolute;
  }
  .focusable:focus-visible,
  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid var(--cc-focus);
    outline-offset: 1px;
  }
`

export function defineElement(name, klass) {
  if (!customElements.get(name)) {
    customElements.define(name, klass)
  }
}

export function shadow(element, styles, html) {
  const root = element.shadowRoot || element.attachShadow({ mode: 'open' })
  root.innerHTML = `<style>${baseStyle}${styles || ''}</style>${html || ''}`
  return root
}

export function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

export function parseJson(value, fallback) {
  if (value === null || value === undefined || value === '') {
    return fallback
  }

  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

export function parseOptions(value) {
  const parsed = parseJson(value, null)
  const source = parsed || String(value || '').split(',').map(item => item.trim()).filter(Boolean)
  const options = []

  for (let i = 0; i < source.length; i++) {
    const item = source[i]

    if (typeof item === 'string') {
      options.push({ value: item, label: item })
    } else if (item && typeof item === 'object') {
      options.push({
        value: String(item.value ?? item.id ?? item.label ?? ''),
        label: String(item.label ?? item.value ?? item.id ?? ''),
        disabled: Boolean(item.disabled),
      })
    }
  }

  return options
}

export function setText(node, value) {
  node.textContent = value === undefined || value === null ? '' : String(value)
}
