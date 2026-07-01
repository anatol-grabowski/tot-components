const copyButtonStyle = `
  :host {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .copy-button {
    position: relative;
    display: inline-block;
    max-width: 100%;
  }

  .copy-button__button {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
    color: var(--tot-input-icon-color, var(--tot-input-color, #1e293b));
    cursor: pointer;
    display: inline-flex;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    height: var(--tot-input-height-medium, 2.25rem);
    justify-content: center;
    line-height: 1;
    min-width: var(--tot-input-height-medium, 2.25rem);
    padding: 0 var(--tot-input-spacing-small, .5rem);
    position: relative;
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) color,
      var(--tot-transition-fast, 150ms) opacity;
  }

  .copy-button__button:hover:not(:disabled) {
    background: var(--tot-input-background-color-hover, #f8fafc);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
    color: var(--tot-input-icon-color-hover, var(--tot-input-color-hover, #0f172a));
  }

  .copy-button__button:active:not(:disabled) {
    background: var(--tot-color-neutral-100, #f1f5f9);
  }

  .copy-button__button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .copy-button__button:disabled {
    cursor: not-allowed;
    opacity: .55;
  }

  .copy-button__icon {
    align-items: center;
    display: none;
    font-size: 1rem;
    height: 1em;
    justify-content: center;
    line-height: 1;
    width: 1em;
  }

  .copy-button--copy .copy-button__icon--copy,
  .copy-button--success .copy-button__icon--success,
  .copy-button--error .copy-button__icon--error {
    display: inline-flex;
  }

  .copy-button--success .copy-button__button {
    color: var(--tot-color-success-600, #16a34a);
  }

  .copy-button--error .copy-button__button {
    color: var(--tot-color-danger-600, #dc2626);
  }

  .copy-button__feedback {
    background: var(--tot-color-neutral-900, #0f172a);
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--tot-color-neutral-0, #fff);
    font-size: var(--tot-font-size-x-small, .75rem);
    left: 50%;
    line-height: 1.25;
    max-width: 16rem;
    opacity: 0;
    overflow: hidden;
    padding: var(--tot-spacing-2x-small, .25rem) var(--tot-spacing-x-small, .5rem);
    pointer-events: none;
    position: absolute;
    text-overflow: ellipsis;
    top: calc(100% + var(--tot-spacing-2x-small, .25rem));
    transform: translateX(-50%) translateY(-2px);
    transition:
      var(--tot-transition-fast, 150ms) opacity,
      var(--tot-transition-fast, 150ms) transform;
    white-space: nowrap;
    z-index: var(--tot-z-index-tooltip, 1000);
  }

  .copy-button--success .copy-button__feedback,
  .copy-button--error .copy-button__feedback,
  .copy-button__button:hover + .copy-button__feedback,
  .copy-button__button:focus-visible + .copy-button__feedback {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`

export class TotCopyButton extends HTMLElement {
  static get observedAttributes() {
    return [
      'value',
      'from',
      'disabled',
      'copy-label',
      'success-label',
      'error-label',
      'feedback-duration',
    ]
  }

  constructor() {
    super()
    this._status = 'copy'
    this._feedbackTimer = null
  }

  get value() {
    return this.getAttribute('value') || ''
  }

  set value(value) {
    setNullableAttribute(this, 'value', value)
  }

  get from() {
    return this.getAttribute('from') || ''
  }

  set from(value) {
    setNullableAttribute(this, 'from', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  get feedbackDuration() {
    return Math.max(0, parseNumber(this.getAttribute('feedback-duration'), 1000))
  }

  set feedbackDuration(value) {
    setNullableAttribute(this, 'feedback-duration', value)
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.clearFeedbackTimer()
  }

  attributeChangedCallback() {
    this.render()
  }

  async copy() {
    await this.copyValue()
  }

  focus(options) {
    const button = this.getButton()
    if (button) {
      button.focus(options)
    }
  }

  blur() {
    const button = this.getButton()
    if (button) {
      button.blur()
    }
  }

  render() {
    const disabled = this.disabled
    const copyLabel = this.getAttribute('copy-label') || 'Copy'
    const successLabel = this.getAttribute('success-label') || 'Copied'
    const errorLabel = this.getAttribute('error-label') || 'Copy failed'
    const currentLabel = this._status === 'success'
      ? successLabel
      : this._status === 'error'
        ? errorLabel
        : copyLabel
    const root = this.getRoot()

    root.innerHTML = `<style>${copyButtonStyle}</style>
      <span class="copy-button copy-button--${escapeAttribute(this._status)}">
        <button
          class="copy-button__button"
          part="button"
          type="button"
          aria-label="${escapeAttribute(currentLabel)}"
          title="${escapeAttribute(currentLabel)}"
          ${disabled ? 'disabled' : ''}
        >
          <span class="copy-button__icon copy-button__icon--copy" part="copy-icon" aria-hidden="true">
            <slot name="copy-icon">⧉</slot>
          </span>
          <span class="copy-button__icon copy-button__icon--success" part="success-icon" aria-hidden="true">
            <slot name="success-icon">✓</slot>
          </span>
          <span class="copy-button__icon copy-button__icon--error" part="error-icon" aria-hidden="true">
            <slot name="error-icon">!</slot>
          </span>
        </button>
        <span class="copy-button__feedback" part="feedback" role="status">${escapeHtml(currentLabel)}</span>
      </span>
    `

    const button = this.getButton()
    button.addEventListener('click', (event) => {
      event.preventDefault()
      void this.copyValue()
    })
  }

  async copyValue() {
    if (this.disabled) {
      return
    }

    try {
      const value = this.getTextToCopy()
      if (!value) {
        throw new Error('No text to copy')
      }

      await writeClipboardText(value)
      this.setStatus('success')
      emit(this, 'copy', {
        value,
      })
    } catch (error) {
      this.setStatus('error')
      emit(this, 'error', {
        error,
        message: error instanceof Error ? error.message : String(error),
      })
    }
  }

  getTextToCopy() {
    const from = this.from.trim()
    if (!from) {
      return this.value
    }

    const source = this.getSourceFromReference(from)
    if (!source.element) {
      throw new Error(`Element not found: ${source.id}`)
    }

    if (source.attribute) {
      return source.element.getAttribute(source.attribute) || ''
    }

    if (source.property) {
      const value = source.element[source.property]
      return value === null || value === undefined ? '' : String(value)
    }

    return source.element.textContent || ''
  }

  getSourceFromReference(reference) {
    const attributeMatch = reference.match(/^(.+)\[([^\]]+)\]$/)
    if (attributeMatch) {
      const id = attributeMatch[1]
      return {
        id,
        attribute: attributeMatch[2],
        property: '',
        element: document.getElementById(id),
      }
    }

    const propertyMatch = reference.match(/^(.+)\.([^.]+)$/)
    if (propertyMatch) {
      const id = propertyMatch[1]
      return {
        id,
        attribute: '',
        property: propertyMatch[2],
        element: document.getElementById(id),
      }
    }

    return {
      id: reference,
      attribute: '',
      property: '',
      element: document.getElementById(reference),
    }
  }

  setStatus(status) {
    this._status = status
    this.clearFeedbackTimer()
    this.render()

    if (status !== 'copy') {
      this._feedbackTimer = window.setTimeout(() => {
        this._status = 'copy'
        this.render()
      }, this.feedbackDuration)
    }
  }

  clearFeedbackTimer() {
    if (this._feedbackTimer !== null) {
      window.clearTimeout(this._feedbackTimer)
      this._feedbackTimer = null
    }
  }

  getButton() {
    return this.shadowRoot?.querySelector('button')
  }

  getRoot() {
    return this.shadowRoot || this.attachShadow({ mode: 'open' })
  }
}

async function writeClipboardText(value) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.inset = '0 auto auto 0'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()

  try {
    const successful = document.execCommand('copy')
    if (!successful) {
      throw new Error('Clipboard copy was rejected')
    }
  } finally {
    textarea.remove()
  }
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

function parseNumber(value, fallback) {
  if (value === null || value === undefined || value === '') {
    return fallback
  }

  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
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
