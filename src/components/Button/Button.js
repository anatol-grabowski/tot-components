import { shadow } from '../core.js'

const buttonStyle = `
  :host {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
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
    gap: var(--tot-spacing-x-small, .5rem);
    min-width: 0;
    width: 100%;
    min-height: var(--tot-input-height-medium, 2.5rem);
    padding: 0 var(--tot-input-spacing-medium, 1rem);
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-button-font-size-medium, var(--tot-font-size-small, .875rem));
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: 1;
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

  .button--outline {
    background: transparent;
    color: var(--button-border-color);
  }

  .button--outline:hover:not(.button--disabled) {
    background: var(--button-outline-background-color-hover);
    color: var(--button-border-color-hover);
  }

  .button--outline:active:not(.button--disabled) {
    background: var(--button-outline-background-color-active);
  }

  .button--small {
    min-height: var(--tot-input-height-small, 1.875rem);
    padding: 0 var(--tot-input-spacing-small, .75rem);
    font-size: var(--tot-button-font-size-small, var(--tot-font-size-x-small, .75rem));
  }

  .button--large {
    min-height: var(--tot-input-height-large, 3.125rem);
    padding: 0 var(--tot-input-spacing-large, 1.25rem);
    font-size: var(--tot-button-font-size-large, var(--tot-font-size-medium, 1rem));
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
    gap: var(--tot-spacing-x-small, .5rem);
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .button--loading .button__content {
    visibility: hidden;
  }

  .button__slot,
  .button__fallback {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .button:not(.button--has-default-slot) .button__slot,
  .button--has-default-slot .button__fallback {
    display: none;
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

const variants = ['default', 'primary', 'danger']
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
      'label',
      'target',
      'rel',
      'download',
    ]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  click() {
    const control = this.shadowRoot?.querySelector('.button')
    if (control) {
      control.click()
    }
  }

  focus(options) {
    const control = this.shadowRoot?.querySelector('.button')
    if (control) {
      control.focus(options)
    }
  }

  blur() {
    const control = this.shadowRoot?.querySelector('.button')
    if (control) {
      control.blur()
    }
  }

  render() {
    const variant = this.getSupportedValue('variant', variants, 'default')
    const size = this.getSupportedValue('size', sizes, 'medium')
    const disabled = this.hasAttribute('disabled')
    const loading = this.hasAttribute('loading')
    const outline = this.hasAttribute('outline')
    const href = this.getAttribute('href') || ''
    const label = this.getAttribute('label') || ''
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

    const hasDefaultSlotContent = this.hasDefaultSlotContent()
    this._hasDefaultSlotContent = hasDefaultSlotContent

    if (hasDefaultSlotContent) {
      classes.push('button--has-default-slot')
    }

    const attributes = this.getControlAttributes(tag, href, disabled, loading, classes)
    const root = shadow(this, buttonStyle, `
      <${tag} ${attributes}>
        <span class="button__content">
          <span class="button__slot"><slot></slot></span>
          <span class="button__fallback">${escapeHtml(label)}</span>
        </span>
        <span class="button__loader" aria-hidden="true">⌛</span>
      </${tag}>
    `)

    const control = root.querySelector('.button')
    const slot = root.querySelector('slot')

    control.addEventListener('click', (event) => {
      if (disabled) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    })

    slot.addEventListener('slotchange', () => {
      const hasDefaultSlotContent = this.hasDefaultSlotContent()
      if (hasDefaultSlotContent !== this._hasDefaultSlotContent) {
        this.render()
      }
    })
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
    const value = this.getAttribute(attributeName) || fallback
    for (let i = 0; i < supportedValues.length; i++) {
      if (supportedValues[i] === value) {
        return value
      }
    }
    return fallback
  }

  getControlAttributes(tag, href, disabled, loading, classes) {
    const attributes = [
      `part="base"`,
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
      this.addOptionalAttribute(attributes, 'download')
      if (this.hasAttribute('target')) {
        attributes.push(`rel="${escapeAttribute(this.getAttribute('rel') || 'noreferrer noopener')}"`)
      } else {
        this.addOptionalAttribute(attributes, 'rel')
      }
    }

    return attributes.join(' ')
  }

  addOptionalAttribute(attributes, name) {
    if (this.hasAttribute(name)) {
      attributes.push(`${name}="${escapeAttribute(this.getAttribute(name) || '')}"`)
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
