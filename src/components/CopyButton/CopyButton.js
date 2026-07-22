const copyButtonStyle = `
  :host {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .base {
    display: inline-block;
    max-width: 100%;
    position: relative;
  }

  .button {
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
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) color,
      var(--tot-transition-fast, 150ms) opacity;
  }

  .button:hover:not(:disabled) {
    background: var(--tot-input-background-color-hover, #f8fafc);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
    color: var(--tot-input-icon-color-hover, var(--tot-input-color-hover, #0f172a));
  }

  .button:active:not(:disabled) {
    background: var(--tot-color-neutral-100, #f1f5f9);
  }

  .button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .button:disabled {
    cursor: not-allowed;
    opacity: .55;
  }

  .icon {
    align-items: center;
    display: none;
    font-size: 1rem;
    height: 1em;
    justify-content: center;
    line-height: 1;
    width: 1em;
  }

  .base[data-status='copy'] .copy-icon,
  .base[data-status='success'] .success-icon,
  .base[data-status='error'] .error-icon {
    display: inline-flex;
  }

  .base[data-status='success'] .button {
    color: var(--tot-color-success-600, #16a34a);
  }

  .base[data-status='error'] .button {
    color: var(--tot-color-danger-600, #dc2626);
  }

  .feedback {
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

  .base[data-status='success'] .feedback,
  .base[data-status='error'] .feedback,
  .button:hover + .feedback,
  .button:focus-visible + .feedback {
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
    this._feedbackTimer = 0

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${copyButtonStyle}</style>
      <span class="base" part="base" data-status="copy">
        <button class="button" part="button" type="button">
          <span class="icon copy-icon" part="copy-icon" aria-hidden="true"><slot name="copy-icon">⧉</slot></span>
          <span class="icon success-icon" part="success-icon" aria-hidden="true"><slot name="success-icon">✓</slot></span>
          <span class="icon error-icon" part="error-icon" aria-hidden="true"><slot name="error-icon">!</slot></span>
        </button>
        <span class="feedback" part="feedback" role="status"></span>
      </span>
    `

    this._baseElement = root.querySelector('.base')
    this._buttonElement = root.querySelector('.button')
    this._feedbackElement = root.querySelector('.feedback')
    this._buttonElement.addEventListener('click', event => {
      event.preventDefault()
      void this.copy()
    })
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

  get copyLabel() {
    return this.getAttribute('copy-label') || 'Copy'
  }

  set copyLabel(value) {
    setNullableAttribute(this, 'copy-label', value)
  }

  get successLabel() {
    return this.getAttribute('success-label') || 'Copied'
  }

  set successLabel(value) {
    setNullableAttribute(this, 'success-label', value)
  }

  get errorLabel() {
    return this.getAttribute('error-label') || 'Copy failed'
  }

  set errorLabel(value) {
    setNullableAttribute(this, 'error-label', value)
  }

  get feedbackDuration() {
    return Math.max(0, parseNumber(this.getAttribute('feedback-duration'), 1000))
  }

  set feedbackDuration(value) {
    setNullableAttribute(this, 'feedback-duration', value)
  }

  connectedCallback() {
    this._sync()
  }

  disconnectedCallback() {
    this._clearFeedbackTimer()
  }

  attributeChangedCallback() {
    this._sync()
  }

  async copy() {
    if (this.disabled) {
      return
    }

    try {
      const value = this._getTextToCopy()
      if (!value) {
        throw new Error('No text to copy')
      }

      await writeClipboardText(value)
      this._setStatus('success')
      emit(this, 'copy', { value })
    } catch (error) {
      this._setStatus('error')
      emit(this, 'error', {
        error,
        message: error instanceof Error ? error.message : String(error),
      })
    }
  }

  focus(options) {
    this._buttonElement.focus(options)
  }

  blur() {
    this._buttonElement.blur()
  }

  getButton() {
    return this._buttonElement
  }

  _sync() {
    if (!this._buttonElement) {
      return
    }

    const label = this._getStatusLabel()
    this._baseElement.dataset.status = this._status
    this._buttonElement.disabled = this.disabled
    this._buttonElement.setAttribute('aria-label', label)
    this._buttonElement.title = label
    this._feedbackElement.textContent = label
  }

  _getStatusLabel() {
    if (this._status === 'success') {
      return this.successLabel
    }

    if (this._status === 'error') {
      return this.errorLabel
    }

    return this.copyLabel
  }

  _getTextToCopy() {
    const reference = this.from.trim()
    if (!reference) {
      return this.value
    }

    const source = resolveSourceReference(reference)
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

  _setStatus(status) {
    this._status = status
    this._clearFeedbackTimer()
    this._sync()

    if (status === 'copy') {
      return
    }

    this._feedbackTimer = window.setTimeout(() => {
      this._feedbackTimer = 0
      this._status = 'copy'
      this._sync()
    }, this.feedbackDuration)
  }

  _clearFeedbackTimer() {
    if (!this._feedbackTimer) {
      return
    }

    window.clearTimeout(this._feedbackTimer)
    this._feedbackTimer = 0
  }
}

function resolveSourceReference(reference) {
  const attributeMatch = reference.match(/^(.+)\[([^\]]+)]$/)
  if (attributeMatch) {
    return {
      id: attributeMatch[1],
      attribute: attributeMatch[2],
      property: '',
      element: document.getElementById(attributeMatch[1]),
    }
  }

  const propertyMatch = reference.match(/^(.+)\.([^.]+)$/)
  if (propertyMatch) {
    return {
      id: propertyMatch[1],
      attribute: '',
      property: propertyMatch[2],
      element: document.getElementById(propertyMatch[1]),
    }
  }

  return {
    id: reference,
    attribute: '',
    property: '',
    element: document.getElementById(reference),
  }
}

async function writeClipboardText(value) {
  if (navigator.clipboard?.writeText) {
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
    if (!document.execCommand('copy')) {
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
    detail,
  }))
}

function parseNumber(value, fallback) {
  const number = Number(value)
  return value !== null && value !== '' && Number.isFinite(number) ? number : fallback
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
