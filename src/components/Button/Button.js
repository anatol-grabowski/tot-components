const buttonStyle = `
  :host {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .button {
    --button-background-color: var(--tot-input-background-color, #fff);
    --button-background-color-hover: var(--tot-input-background-color-hover, #f8fafc);
    --button-background-color-active: var(--tot-color-neutral-100, #f1f5f9);
    --button-border-color: var(--tot-input-border-color, #cbd5e1);
    --button-border-color-hover: var(--tot-input-border-color-hover, #94a3b8);
    --button-color: var(--tot-input-color, #1e293b);
    --button-color-hover: var(--tot-input-color-hover, #0f172a);
    --button-outline-background-color-hover: color-mix(in srgb, var(--button-border-color) 10%, transparent);
    --button-outline-background-color-active: color-mix(in srgb, var(--button-border-color) 18%, transparent);
    --button-padding-inline: var(--tot-input-spacing-medium, .75rem);

    -webkit-appearance: none;
    appearance: none;
    border: var(--tot-input-border-width, 1px) solid var(--button-border-color);
    border-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
    background: var(--button-background-color);
    color: var(--button-color);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--tot-spacing-2x-small, .25rem);
    min-width: 0;
    width: 100%;
    min-height: var(--tot-input-height-medium, 2.25rem);
    padding: 0 var(--button-padding-inline);
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-button-font-size-medium, var(--tot-input-font-size-medium, .875rem));
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: 1.25;
    letter-spacing: var(--tot-input-letter-spacing, normal);
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) color,
      var(--tot-transition-fast, 150ms) box-shadow,
      var(--tot-transition-fast, 150ms) transform;
  }

  .button:hover:not(.button--disabled) {
    background: var(--button-background-color-hover);
    border-color: var(--button-border-color-hover);
    color: var(--button-color-hover);
  }

  .button:active:not(.button--disabled) {
    background: var(--button-background-color-active);
    transform: translateY(1px);
  }

  .button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .button--primary {
    --button-background-color: var(--tot-color-primary-600, #0284c7);
    --button-background-color-hover: var(--tot-color-primary-500, #0ea5e9);
    --button-background-color-active: var(--tot-color-primary-700, #0369a1);
    --button-border-color: var(--tot-color-primary-600, #0284c7);
    --button-border-color-hover: var(--tot-color-primary-500, #0ea5e9);
    --button-color: var(--tot-color-neutral-0, #fff);
    --button-color-hover: var(--tot-color-neutral-0, #fff);
  }

  .button--danger {
    --button-background-color: var(--tot-color-danger-600, #dc2626);
    --button-background-color-hover: var(--tot-color-danger-500, #ef4444);
    --button-background-color-active: var(--tot-color-danger-700, #b91c1c);
    --button-border-color: var(--tot-color-danger-600, #dc2626);
    --button-border-color-hover: var(--tot-color-danger-500, #ef4444);
    --button-color: var(--tot-color-neutral-0, #fff);
    --button-color-hover: var(--tot-color-neutral-0, #fff);
  }

  .button--create {
    --button-background-color: var(--tot-color-success-600, #16a34a);
    --button-background-color-hover: var(--tot-color-success-500, #22c55e);
    --button-background-color-active: var(--tot-color-success-700, #15803d);
    --button-border-color: var(--tot-color-success-600, #16a34a);
    --button-border-color-hover: var(--tot-color-success-500, #22c55e);
    --button-color: var(--tot-color-neutral-0, #fff);
    --button-color-hover: var(--tot-color-neutral-0, #fff);
  }


  .button--plain {
    --button-background-color: transparent;
    --button-background-color-hover: var(--tot-color-neutral-200, #e2e8f0);
    --button-background-color-active: var(--tot-color-neutral-300, #cbd5e1);
    --button-border-color: transparent;
    --button-border-color-hover: transparent;
  }

  .button--outline:not(.button--default):not(.button--plain) {
    background: transparent;
    color: var(--button-border-color);
  }

  .button--outline:not(.button--default):not(.button--plain):hover:not(.button--disabled) {
    background: var(--button-outline-background-color-hover);
    color: var(--button-border-color-hover);
  }

  .button--outline:not(.button--default):not(.button--plain):active:not(.button--disabled) {
    background: var(--button-outline-background-color-active);
  }

  .button--small {
    --button-padding-inline: var(--tot-input-spacing-small, .5rem);

    min-height: var(--tot-input-height-small, 1.75rem);
    font-size: var(--tot-button-font-size-small, var(--tot-input-font-size-small, .75rem));
  }

  .button--large {
    --button-padding-inline: var(--tot-input-spacing-large, 1rem);

    min-height: var(--tot-input-height-large, 2.75rem);
    font-size: var(--tot-button-font-size-large, var(--tot-input-font-size-large, 1rem));
  }

  .button--disabled {
    cursor: not-allowed;
    opacity: .55;
  }

  a.button--disabled {
    pointer-events: none;
  }

  .button__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--tot-spacing-2x-small, .25rem);
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.25;
  }

  .button--loading .button__content {
    visibility: hidden;
  }

  .button__slot,
  .button__fallback {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.25;
  }

  .button:not(.button--has-default-slot) .button__slot,
  .button--has-default-slot .button__fallback {
    display: none;
  }

  .button__caret {
    align-items: center;
    color: currentColor;
    display: none;
    height: 1em;
    justify-content: center;
    line-height: 1;
    margin-inline-start: 0;
    width: 1em;
  }

  .button__caret svg {
    display: block;
    fill: none;
    height: 100%;
    stroke: currentColor;
    width: 100%;
  }

  .button--caret {
    padding-inline-end: max(0px, calc(var(--button-padding-inline) - var(--tot-spacing-2x-small, .25rem)));
  }

  .button--caret .button__caret {
    display: inline-flex;
  }

  .button__loader {
    display: none;
    line-height: 1;
    position: absolute;
    inset: 0;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .button--loading .button__loader {
    display: inline-flex;
  }
`

const variants = ['default', 'plain', 'primary', 'danger', 'create']
const sizes = ['small', 'medium', 'large']

export class TotButton extends HTMLElement {
  static get observedAttributes() {
    return [
      'variant',
      'size',
      'outline',
      'disabled',
      'href',
      'loading',
      'caret',
      'label',
      'target',
      'rel',
    ]
  }

  get variant() {
    return this.getSupportedValue('variant', variants, 'default')
  }

  set variant(value) {
    this.setAttribute('variant', this.getSupportedValueFromValue(value, variants, 'default'))
  }

  get size() {
    return this.getSupportedValue('size', sizes, 'medium')
  }

  set size(value) {
    this.setAttribute('size', this.getSupportedValueFromValue(value, sizes, 'medium'))
  }

  get outline() {
    return this.hasAttribute('outline')
  }

  set outline(value) {
    this.toggleBooleanAttribute('outline', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    this.toggleBooleanAttribute('disabled', value)
  }

  get href() {
    return this.getAttribute('href') || ''
  }

  set href(value) {
    this.setStringAttribute('href', value)
  }

  get loading() {
    return this.hasAttribute('loading')
  }

  set loading(value) {
    this.toggleBooleanAttribute('loading', value)
  }

  get caret() {
    return this.hasAttribute('caret')
  }

  set caret(value) {
    this.toggleBooleanAttribute('caret', value)
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  set label(value) {
    this.setStringAttribute('label', value)
  }

  get target() {
    return this.getAttribute('target') || ''
  }

  set target(value) {
    this.setStringAttribute('target', value)
  }

  get rel() {
    return this.getAttribute('rel') || 'noreferrer noopener'
  }

  set rel(value) {
    this.setStringAttribute('rel', value)
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.render()
    }
  }

  click() {
    const control = this.getControl()
    if (control) {
      control.click()
    }
  }

  focus(options) {
    const control = this.getControl()
    if (control) {
      control.focus(options)
    }
  }

  blur() {
    const control = this.getControl()
    if (control) {
      control.blur()
    }
  }

  getControl() {
    return this.shadowRoot?.querySelector('.button') || null
  }

  render() {
    const variant = this.variant
    const size = this.size
    const disabled = this.disabled
    const loading = this.loading
    const outline = this.outline
    const caret = this.caret
    const href = this.href
    const label = this.label
    const tag = href ? 'a' : 'button'
    const classes = [
      'button',
      `button--${variant}`,
      `button--${size}`,
    ]

    if (outline) {
      classes.push('button--outline')
    }

    if (disabled) {
      classes.push('button--disabled')
    }

    if (loading) {
      classes.push('button--loading')
    }

    if (caret) {
      classes.push('button--caret')
    }

    const hasDefaultSlotContent = this.hasDefaultSlotContent()
    this._hasDefaultSlotContent = hasDefaultSlotContent

    if (hasDefaultSlotContent) {
      classes.push('button--has-default-slot')
    }

    const attributes = this.getControlAttributes(tag, href, disabled, loading, classes)
    const root = this.getRoot()
    root.innerHTML = `<style>${buttonStyle}</style>
      <${tag} ${attributes}>
        <span class="button__content" part="content">
          <span class="button__slot" part="label"><slot></slot></span>
          <span class="button__fallback" part="label">${escapeHtml(label)}</span>
          <span class="button__caret" part="caret" aria-hidden="true">
            <svg viewBox="0 0 16 16" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" focusable="false">
              <path d="m4.5 6.25 3.5 3.5 3.5-3.5"></path>
            </svg>
          </span>
        </span>
        <span class="button__loader" part="loader" aria-hidden="true">⏳</span>
      </${tag}>
    `

    const control = root.querySelector('.button')
    const slot = root.querySelector('slot')

    control.addEventListener('click', (event) => {
      if (disabled) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    })

    slot.addEventListener('slotchange', () => {
      const nextHasDefaultSlotContent = this.hasDefaultSlotContent()
      if (nextHasDefaultSlotContent !== this._hasDefaultSlotContent) {
        this.render()
      }
    })
  }

  getRoot() {
    return this.shadowRoot || this.attachShadow({ mode: 'open' })
  }

  hasDefaultSlotContent() {
    for (let i = 0; i < this.childNodes.length; i++) {
      const node = this.childNodes[i]
      if (node.nodeType === Node.ELEMENT_NODE) {
        return true
      }

      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        return true
      }
    }
    return false
  }

  getSupportedValue(attributeName, supportedValues, fallback) {
    return this.getSupportedValueFromValue(
      this.getAttribute(attributeName),
      supportedValues,
      fallback,
    )
  }

  getSupportedValueFromValue(value, supportedValues, fallback) {
    const normalizedValue = value || fallback
    for (let i = 0; i < supportedValues.length; i++) {
      if (supportedValues[i] === normalizedValue) {
        return normalizedValue
      }
    }
    return fallback
  }

  getControlAttributes(tag, href, disabled, loading, classes) {
    const attributes = [
      'part="base"',
      `class="${escapeAttribute(classes.join(' '))}"`,
      `aria-disabled="${disabled ? 'true' : 'false'}"`,
    ]

    if (loading) {
      attributes.push('aria-busy="true"')
    }

    if (tag === 'button') {
      attributes.push('type="button"')
      if (disabled) {
        attributes.push('disabled')
      }
    } else {
      attributes.push(`tabindex="${disabled ? '-1' : '0'}"`)
      if (!disabled) {
        attributes.push(`href="${escapeAttribute(href)}"`)
      }
      this.addOptionalAttribute(attributes, 'target')
      attributes.push(`rel="${escapeAttribute(this.rel)}"`)
    }

    return attributes.join(' ')
  }

  addOptionalAttribute(attributes, name) {
    if (this.hasAttribute(name)) {
      attributes.push(`${name}="${escapeAttribute(this.getAttribute(name) || '')}"`)
    }
  }

  toggleBooleanAttribute(name, value) {
    if (value) {
      this.setAttribute(name, '')
    } else {
      this.removeAttribute(name)
    }
  }

  setStringAttribute(name, value) {
    if (value === null || value === undefined) {
      this.removeAttribute(name)
    } else {
      this.setAttribute(name, String(value))
    }
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (match) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return replacements[match]
  })
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;')
}
