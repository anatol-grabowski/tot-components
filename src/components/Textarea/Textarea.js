const textareaStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .form-control {
    display: grid;
    gap: var(--tot-spacing-2x-small, .25rem);
    max-width: 100%;
    min-width: 0;
  }

  .label {
    color: var(--tot-input-label-color, inherit);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-label-font-size-medium, .875rem);
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .label:empty {
    display: none;
  }

  .textarea {
    --textarea-spacing: var(--tot-input-spacing-medium, .75rem);
    --textarea-font-size: var(--tot-input-font-size-medium, .875rem);

    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
    color: var(--tot-input-color, #1e293b);
    display: flex;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--textarea-font-size);
    font-weight: var(--tot-input-font-weight, 400);
    letter-spacing: var(--tot-input-letter-spacing, normal);
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    position: relative;
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) box-shadow,
      var(--tot-transition-fast, 150ms) color;
    width: 100%;
  }

  .textarea--small {
    --textarea-spacing: var(--tot-input-spacing-small, .5rem);
    --textarea-font-size: var(--tot-input-font-size-small, .75rem);
  }

  .textarea--large {
    --textarea-spacing: var(--tot-input-spacing-large, 1rem);
    --textarea-font-size: var(--tot-input-font-size-large, 1rem);
  }

  .textarea:hover:not(.textarea--disabled) {
    background: var(--tot-input-background-color-hover, #fff);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
    color: var(--tot-input-color-hover, #0f172a);
  }

  .textarea:focus-within:not(.textarea--disabled) {
    background: var(--tot-input-background-color-focus, #fff);
    border-color: var(--tot-input-border-color-focus, var(--tot-color-primary-600, #0284c7));
    box-shadow: 0 0 0 var(--tot-input-focus-ring-offset, 0) var(--tot-input-focus-ring-color, hsl(198.6 88.7% 48.4% / 40%));
    color: var(--tot-input-color-focus, #0f172a);
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: 0;
  }

  .textarea--disabled {
    background: var(--tot-input-background-color-disabled, #f1f5f9);
    border-color: var(--tot-input-border-color-disabled, #cbd5e1);
    color: var(--tot-input-color-disabled, #64748b);
    cursor: not-allowed;
    opacity: .75;
  }

  .textarea__control {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    border: 0;
    color: inherit;
    display: block;
    flex: 1 1 auto;
    font: inherit;
    line-height: var(--tot-line-height-dense, 1.4);
    min-height: var(--tot-input-height-large, 2.75rem);
    min-width: 0;
    outline: none;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--tot-spacing-x-small, .5rem) var(--textarea-spacing);
    resize: both;
    width: 100%;
  }

  .textarea--small .textarea__control {
    min-height: var(--tot-input-height-medium, 2.25rem);
    padding-block: var(--tot-spacing-2x-small, .25rem);
  }

  .textarea--large .textarea__control {
    min-height: 3.5rem;
    padding-block: var(--tot-spacing-small, .75rem);
  }

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-auto .textarea__control {
    field-sizing: content;
    resize: both;
  }

  .textarea__control::placeholder {
    color: var(--tot-input-placeholder-color, #64748b);
  }

  .textarea__control:disabled {
    color: var(--tot-input-color-disabled, #64748b);
    cursor: not-allowed;
    opacity: 1;
  }

  .textarea__control:disabled::placeholder {
    color: var(--tot-input-placeholder-color-disabled, #94a3b8);
  }

  .textarea__fullscreen-button,
  .fullscreen__button {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-icon-color, #64748b);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    height: 1.75rem;
    justify-content: center;
    line-height: 1;
    padding: 0 var(--tot-spacing-2x-small, .25rem);
  }

  .textarea__fullscreen-button {
    font-size: 1em;
    position: absolute;
    right: var(--tot-spacing-2x-small, .25rem);
    top: var(--tot-spacing-2x-small, .25rem);
    width: 1.75rem;
  }

  .textarea__fullscreen-button:hover:not(:disabled),
  .fullscreen__button:hover:not(:disabled) {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .textarea__fullscreen-button:focus-visible,
  .fullscreen__button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .textarea__fullscreen-button:disabled,
  .fullscreen__button:disabled {
    cursor: not-allowed;
    opacity: .5;
  }

  .fullscreen__button svg {
    display: block;
    fill: none;
    height: 1rem;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.75;
    width: 1rem;
  }

  .help-text {
    color: var(--tot-input-help-text-color, var(--tot-color-neutral-600, #475569));
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-help-text-font-size-medium, .8125rem);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .help-text:empty {
    display: none;
  }

  .form-control--small .label {
    font-size: var(--tot-input-label-font-size-small, .8125rem);
  }

  .form-control--small .help-text {
    font-size: var(--tot-input-help-text-font-size-small, .75rem);
  }

  .form-control--large .label {
    font-size: var(--tot-input-label-font-size-large, 1rem);
  }

  .form-control--large .help-text {
    font-size: var(--tot-input-help-text-font-size-large, .875rem);
  }

  .fullscreen {
    background: var(--tot-overlay-background-color, hsl(240 3.8% 46.1% / 16%));
    display: grid;
    inset: 0;
    overscroll-behavior: contain;
    padding: 0;
    position: fixed;
    z-index: var(--tot-z-index-dialog, 800);
  }

  .fullscreen[hidden] {
    display: none;
  }

  .fullscreen__panel {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    grid-template-rows: auto minmax(0, 1fr);
    height: 100dvh;
    min-height: 0;
    min-width: 0;
    width: 100vw;
  }

  .fullscreen__header {
    align-items: center;
    background: var(--tot-navbar-background-color, var(--tot-color-neutral-100, #f1f5f9));
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-navbar-border-color, var(--tot-panel-border-color, #e2e8f0));
    display: flex;
    gap: var(--tot-spacing-x-small, .5rem);
    justify-content: space-between;
    min-height: var(--tot-navbar-height, 2.75rem);
    padding: 0 var(--tot-spacing-small, .75rem);
  }

  .fullscreen__title {
    font-size: var(--tot-input-font-size-medium, .875rem);
    font-weight: var(--tot-font-weight-semibold, 500);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .fullscreen__actions {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    gap: var(--tot-spacing-small, .75rem);
  }

  .fullscreen__body {
    min-height: 0;
    padding: var(--tot-spacing-small, .75rem);
  }

  .fullscreen__control {
    -webkit-appearance: none;
    appearance: none;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
    color: var(--tot-input-color, #1e293b);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    font-weight: var(--tot-input-font-weight, 400);
    height: 100%;
    letter-spacing: var(--tot-input-letter-spacing, normal);
    line-height: var(--tot-line-height-dense, 1.4);
    min-height: 0;
    outline: none;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--tot-spacing-small, .75rem);
    resize: none;
    width: 100%;
  }

  .fullscreen__control:focus {
    border-color: var(--tot-input-border-color-focus, var(--tot-color-primary-600, #0284c7));
    box-shadow: 0 0 0 var(--tot-input-focus-ring-offset, 0) var(--tot-input-focus-ring-color, hsl(198.6 88.7% 48.4% / 40%));
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: 0;
  }
`

const sizes = ['small', 'medium', 'large']
const resizeModes = ['auto', 'none']

export class TotTextarea extends HTMLElement {
  static get observedAttributes() {
    return [
      'label',
      'help-text',
      'placeholder',
      'disabled',
      'size',
      'resize',
      'rows',
      'value',
    ]
  }

  constructor() {
    super()
    this._value = null
    this._fullscreen = false
    this._focusValue = ''
    this._hasFocus = false
  }

  get value() {
    const textarea = this.getInlineTextarea() || this.getFullscreenTextarea()
    if (textarea) {
      return textarea.value
    }

    if (this._value !== null) {
      return this._value
    }

    return this.getAttribute('value') || ''
  }

  set value(value) {
    this._value = value === null || value === undefined ? '' : String(value)
    this.updateTextareaValues()
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  get helpText() {
    return this.getAttribute('help-text') || ''
  }

  set helpText(value) {
    setNullableAttribute(this, 'help-text', value)
  }

  get placeholder() {
    return this.getAttribute('placeholder') || ''
  }

  set placeholder(value) {
    setNullableAttribute(this, 'placeholder', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  get size() {
    return getSupportedValue(this.getAttribute('size'), sizes, 'medium')
  }

  set size(value) {
    this.setAttribute('size', getSupportedValue(value, sizes, 'medium'))
  }

  get resize() {
    return getSupportedValue(this.getAttribute('resize'), resizeModes, 'auto')
  }

  set resize(value) {
    this.setAttribute('resize', getSupportedValue(value, resizeModes, 'auto'))
  }

  get rows() {
    const value = Number(this.getAttribute('rows'))
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 3
  }

  set rows(value) {
    if (value === null || value === undefined || value === '') {
      this.removeAttribute('rows')
    } else {
      this.setAttribute('rows', String(value))
    }
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    if (this._fullscreen) {
      unlockPageScroll()
      this._fullscreen = false
    }
  }

  attributeChangedCallback(name) {
    if (name === 'value') {
      this._value = null
    }
    this.render()
  }

  focus(options) {
    const textarea = this.getInlineTextarea()
    if (textarea) {
      textarea.focus(options)
    }
  }

  blur() {
    const textarea = this.getInlineTextarea()
    if (textarea) {
      textarea.blur()
    }
  }

  select() {
    const textarea = this.getInlineTextarea() || this.getFullscreenTextarea()
    if (textarea) {
      textarea.select()
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const size = this.size
    const disabled = this.disabled
    const resize = this.resize
    const formClasses = ['form-control', `form-control--${size}`]
    const textareaClasses = ['textarea', `textarea--${size}`, `textarea--resize-${resize}`]

    if (disabled) {
      textareaClasses.push('textarea--disabled')
    }

    root.innerHTML = `<style>${textareaStyle}</style>
      <label class="${escapeAttribute(formClasses.join(' '))}" part="form-control">
        <span class="label" part="form-control-label"><slot name="label">${escapeHtml(this.label)}</slot></span>
        <span class="${escapeAttribute(textareaClasses.join(' '))}" part="base">
          <textarea
            class="textarea__control"
            part="textarea"
            rows="${escapeAttribute(this.rows)}"
            placeholder="${escapeAttribute(this.placeholder)}"
            ${disabled ? 'disabled' : ''}
          >${escapeHtml(this.value)}</textarea>
          <button class="textarea__fullscreen-button" part="fullscreen-button" type="button" aria-label="Open fullscreen editor" ${disabled ? 'disabled' : ''}>⛶</button>
        </span>
        <span class="help-text" part="form-control-help-text"><slot name="help-text">${escapeHtml(this.helpText)}</slot></span>
      </label>
      <div class="fullscreen" part="fullscreen" ${this._fullscreen ? '' : 'hidden'}>
        <section class="fullscreen__panel" role="dialog" aria-modal="true" aria-label="Fullscreen textarea editor">
          <header class="fullscreen__header">
            <div class="fullscreen__title">${escapeHtml(this.label || 'Textarea')}</div>
            <div class="fullscreen__actions">
              <button class="fullscreen__button fullscreen__reset-button" part="reset-button" type="button">Reset</button>
              <button class="fullscreen__button fullscreen__close-button" part="close-fullscreen-button" type="button" aria-label="Exit fullscreen editor">
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                  <path d="M2.5 6h3.5v-3.5"></path>
                  <path d="M13.5 6h-3.5v-3.5"></path>
                  <path d="M2.5 10h3.5v3.5"></path>
                  <path d="M13.5 10h-3.5v3.5"></path>
                </svg>
              </button>
            </div>
          </header>
          <div class="fullscreen__body">
            <textarea class="fullscreen__control" part="fullscreen-textarea" placeholder="${escapeAttribute(this.placeholder)}">${escapeHtml(this.value)}</textarea>
          </div>
        </section>
      </div>
    `

    const inlineTextarea = this.getInlineTextarea()
    const fullscreenTextarea = this.getFullscreenTextarea()
    const fullscreenButton = root.querySelector('.textarea__fullscreen-button')
    const resetButton = root.querySelector('.fullscreen__reset-button')
    const closeButton = root.querySelector('.fullscreen__close-button')

    inlineTextarea.addEventListener('input', () => this.handleTextareaInput(inlineTextarea))
    inlineTextarea.addEventListener('change', () => this.handleTextareaChange(inlineTextarea))
    inlineTextarea.addEventListener('focus', () => this.handleTextareaFocus())
    inlineTextarea.addEventListener('blur', () => this.handleTextareaBlur())

    fullscreenTextarea.addEventListener('input', () => this.handleTextareaInput(fullscreenTextarea))
    fullscreenTextarea.addEventListener('change', () => this.handleTextareaChange(fullscreenTextarea))
    fullscreenTextarea.addEventListener('focus', () => this.handleTextareaFocus())
    fullscreenTextarea.addEventListener('blur', () => this.handleTextareaBlur())
    fullscreenTextarea.addEventListener('keydown', (event) => this.handleFullscreenKeyDown(event))

    fullscreenButton.addEventListener('mousedown', (event) => event.preventDefault())
    fullscreenButton.addEventListener('click', () => this.openFullscreen())
    resetButton.addEventListener('click', () => this.resetToFocusValue())
    closeButton.addEventListener('click', () => this.closeFullscreen())

    this.updateResetButton()

    if (this._fullscreen) {
      requestAnimationFrame(() => {
        const textarea = this.getFullscreenTextarea()
        if (textarea) {
          textarea.focus()
          textarea.selectionStart = textarea.value.length
          textarea.selectionEnd = textarea.value.length
        }
      })
    }
  }

  openFullscreen() {
    if (this.disabled || this._fullscreen) {
      return
    }

    if (!this._hasFocus) {
      this._focusValue = this.value
      this._hasFocus = true
    }

    this._fullscreen = true
    lockPageScroll()
    this.render()
    emit(this, 'fullscreen-change', this.getEventDetail())
  }

  closeFullscreen() {
    if (!this._fullscreen) {
      return
    }

    this._fullscreen = false
    unlockPageScroll()
    this.render()
    emit(this, 'fullscreen-change', this.getEventDetail())

    requestAnimationFrame(() => {
      const textarea = this.getInlineTextarea()
      if (textarea) {
        textarea.focus()
      }
    })
  }

  resetToFocusValue() {
    if (this.value === this._focusValue) {
      return
    }

    this._value = this._focusValue
    this.updateTextareaValues()
    this.updateResetButton()
    emit(this, 'input', this.getEventDetail())
    emit(this, 'change', this.getEventDetail())
    emit(this, 'reset', this.getEventDetail())
  }

  handleTextareaInput(textarea) {
    this._value = textarea.value
    this.updateTextareaValues(textarea)
    this.updateResetButton()
    emit(this, 'input', this.getEventDetail())
  }

  handleTextareaChange(textarea) {
    this._value = textarea.value
    this.updateTextareaValues(textarea)
    this.updateResetButton()
    emit(this, 'change', this.getEventDetail())
  }

  handleTextareaFocus() {
    if (this._hasFocus) {
      return
    }

    this._hasFocus = true
    this._focusValue = this.value
    this.updateResetButton()
  }

  handleTextareaBlur() {
    setTimeout(() => {
      const active = this.shadowRoot?.activeElement
      if (active !== this.getInlineTextarea() && active !== this.getFullscreenTextarea()) {
        this._hasFocus = false
      }
    }, 0)
  }

  handleFullscreenKeyDown(event) {
    if (event.key !== 'Escape') {
      return
    }

    event.preventDefault()
    this.closeFullscreen()
  }

  updateTextareaValues(source) {
    const textareas = [this.getInlineTextarea(), this.getFullscreenTextarea()]
    const value = this._value === null ? this.value : this._value
    for (let i = 0; i < textareas.length; i++) {
      if (textareas[i] && textareas[i] !== source) {
        textareas[i].value = value
      }
    }
  }

  updateResetButton() {
    const resetButton = this.shadowRoot?.querySelector('.fullscreen__reset-button')
    if (!resetButton) {
      return
    }

    resetButton.disabled = this.value === this._focusValue
  }

  getInlineTextarea() {
    return this.shadowRoot?.querySelector('.textarea__control')
  }

  getFullscreenTextarea() {
    return this.shadowRoot?.querySelector('.fullscreen__control')
  }

  getEventDetail() {
    return {
      fullscreen: this._fullscreen,
      resize: this.resize,
      rows: this.rows,
      size: this.size,
      value: this.value,
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

function getSupportedValue(value, supportedValues, fallback) {
  const normalizedValue = value || fallback
  for (let i = 0; i < supportedValues.length; i++) {
    if (supportedValues[i] === normalizedValue) {
      return normalizedValue
    }
  }
  return fallback
}

function lockPageScroll() {
  const state = getScrollLockState()
  if (state.count === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const bodyStyle = document.body.style
    const htmlStyle = document.documentElement.style

    state.bodyLeft = bodyStyle.left
    state.bodyOverflow = bodyStyle.overflow
    state.bodyPaddingRight = bodyStyle.paddingRight
    state.bodyPosition = bodyStyle.position
    state.bodyRight = bodyStyle.right
    state.bodyTop = bodyStyle.top
    state.bodyWidth = bodyStyle.width
    state.htmlOverflow = htmlStyle.overflow
    state.scrollX = window.scrollX || window.pageXOffset || 0
    state.scrollY = window.scrollY || window.pageYOffset || 0

    if (scrollbarWidth > 0) {
      const currentPadding = parseFloat(getComputedStyle(document.body).paddingRight) || 0
      bodyStyle.paddingRight = `${currentPadding + scrollbarWidth}px`
    }

    bodyStyle.left = `-${state.scrollX}px`
    bodyStyle.overflow = 'hidden'
    bodyStyle.position = 'fixed'
    bodyStyle.right = '0'
    bodyStyle.top = `-${state.scrollY}px`
    bodyStyle.width = '100%'
    htmlStyle.overflow = 'hidden'
  }
  state.count += 1
}

function unlockPageScroll() {
  const state = getScrollLockState()
  state.count = Math.max(0, state.count - 1)
  if (state.count === 0) {
    const bodyStyle = document.body.style
    const htmlStyle = document.documentElement.style
    const scrollX = state.scrollX || 0
    const scrollY = state.scrollY || 0

    bodyStyle.left = state.bodyLeft
    bodyStyle.overflow = state.bodyOverflow
    bodyStyle.paddingRight = state.bodyPaddingRight
    bodyStyle.position = state.bodyPosition
    bodyStyle.right = state.bodyRight
    bodyStyle.top = state.bodyTop
    bodyStyle.width = state.bodyWidth
    htmlStyle.overflow = state.htmlOverflow
    window.scrollTo(scrollX, scrollY)

    state.bodyLeft = ''
    state.bodyOverflow = ''
    state.bodyPaddingRight = ''
    state.bodyPosition = ''
    state.bodyRight = ''
    state.bodyTop = ''
    state.bodyWidth = ''
    state.htmlOverflow = ''
    state.scrollX = 0
    state.scrollY = 0
  }
}

function getScrollLockState() {
  if (!window.__totScrollLockState) {
    window.__totScrollLockState = {
      bodyLeft: '',
      bodyOverflow: '',
      bodyPaddingRight: '',
      bodyPosition: '',
      bodyRight: '',
      bodyTop: '',
      bodyWidth: '',
      count: 0,
      htmlOverflow: '',
      scrollX: 0,
      scrollY: 0,
    }
  }
  return window.__totScrollLockState
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (match) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
    }
    return replacements[match]
  })
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;')
}
