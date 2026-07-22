const ratingStyle = `
  :host {
    --tot-rating-symbol-color: var(--tot-color-neutral-300, #cbd5e1);
    --tot-rating-symbol-color-active: var(--tot-color-amber-500, #f59e0b);
    --tot-rating-symbol-size: 1.25rem;
    --tot-rating-symbol-spacing: var(--tot-spacing-3x-small, .125rem);

    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .base {
    align-items: center;
    color: var(--tot-rating-symbol-color);
    display: inline-flex;
    gap: var(--tot-rating-symbol-spacing);
    max-width: 100%;
    outline: none;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    user-select: none;
    -webkit-user-select: none;
  }

  .base:focus-visible {
    border-radius: var(--tot-border-radius-medium, 4px);
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .base.pointer-focus:focus-visible {
    outline: none;
  }

  .base.interactive {
    cursor: pointer;
  }

  .base.readonly,
  .base.disabled {
    cursor: default;
  }

  .base.disabled {
    opacity: .55;
  }

  .symbol {
    align-items: center;
    display: inline-grid;
    flex: 0 0 auto;
    font-size: var(--tot-rating-symbol-size);
    height: 1em;
    justify-items: center;
    line-height: 1;
    overflow: hidden;
    position: relative;
    width: 1em;
  }

  .inactive-symbol,
  .active-symbol {
    grid-area: 1 / 1;
    line-height: 1;
  }

  .inactive-symbol {
    color: var(--tot-rating-symbol-color);
  }

  .active-symbol {
    color: var(--tot-rating-symbol-color-active);
    display: inline-block;
    inset-inline-start: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: var(--tot-rating-symbol-percent, 0%);
  }

  .symbol.empty .active-symbol {
    visibility: hidden;
  }

  .symbol.full .inactive-symbol {
    visibility: hidden;
  }

  .symbol.full .active-symbol {
    overflow: visible;
    position: static;
    width: auto;
  }
`

export class TotRating extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'value', 'max', 'precision', 'readonly', 'disabled']
  }

  constructor() {
    super()
    this._getSymbol = null
    this._symbols = []
    this._hovering = false
    this._lastHoverValue = null
    this._isPointerDown = false
    this._activePointerId = null
    this._pointerDownClientX = 0
    this._pointerDownClientY = 0
    this._pendingMinimumToggle = false
    this._suppressAttributeSync = false

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${ratingStyle}</style>
      <span class="base" part="base" role="slider"></span>
    `

    this._baseElement = root.querySelector('.base')
    this._baseElement.addEventListener('pointerdown', event => this._handlePointerDown(event))
    this._baseElement.addEventListener('pointermove', event => this._handlePointerMove(event))
    this._baseElement.addEventListener('pointerup', event => this._handlePointerUp(event))
    this._baseElement.addEventListener('pointercancel', event => this._handlePointerCancel(event))
    this._baseElement.addEventListener('pointerleave', () => this._handlePointerLeave())
    this._baseElement.addEventListener('blur', () => this._handleBlur())
    this._baseElement.addEventListener('keydown', event => this._handleKeyDown(event))
  }

  get label() {
    return this.getAttribute('label') || 'Rating'
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  get value() {
    return clamp(parseNumber(this.getAttribute('value'), 0), 0, this.max)
  }

  set value(value) {
    this.setAttribute('value', String(this._normalizeValue(value)))
  }

  get max() {
    return Math.max(1, Math.floor(parseNumber(this.getAttribute('max'), 5)))
  }

  set max(value) {
    this.setAttribute('max', String(Math.max(1, Math.floor(parseNumber(value, 5)))))
  }

  get precision() {
    return Math.max(.01, parseNumber(this.getAttribute('precision'), 1))
  }

  set precision(value) {
    this.setAttribute('precision', String(Math.max(.01, parseNumber(value, 1))))
  }

  get readonly() {
    return this.hasAttribute('readonly')
  }

  set readonly(value) {
    setBooleanAttribute(this, 'readonly', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  get getSymbol() {
    return this._getSymbol
  }

  set getSymbol(value) {
    this._getSymbol = typeof value === 'function' ? value : null
    this._rebuildSymbols()
    this._syncValue()
  }

  connectedCallback() {
    if (this._symbols.length !== this.max) {
      this._rebuildSymbols()
    }
    this._syncState()
    this._syncValue()
  }

  disconnectedCallback() {
    this._releasePointer()
    this._isPointerDown = false
    this._activePointerId = null
    this._pendingMinimumToggle = false
    this._suppressAttributeSync = false
  }

  attributeChangedCallback(name) {
    if (this._suppressAttributeSync) {
      return
    }

    if (name === 'max') {
      this._rebuildSymbols()
    }

    this._syncState()
    this._syncValue()
  }

  focus(options) {
    this._baseElement.focus(options)
  }

  blur() {
    this._baseElement.blur()
  }

  getBase() {
    return this._baseElement
  }

  getSymbols() {
    const result = []
    for (let i = 0; i < this._symbols.length; i++) {
      result.push(this._symbols[i].element)
    }
    return result
  }

  _rebuildSymbols() {
    if (!this._baseElement) {
      return
    }

    const fragment = document.createDocumentFragment()
    const symbols = []
    for (let i = 1; i <= this.max; i++) {
      const element = document.createElement('span')
      element.className = 'symbol empty'
      element.setAttribute('part', 'symbol')
      element.dataset.value = String(i)

      const inactive = document.createElement('span')
      inactive.className = 'inactive-symbol'
      inactive.setAttribute('part', 'inactive-symbol')
      inactive.setAttribute('aria-hidden', 'true')

      const active = document.createElement('span')
      active.className = 'active-symbol'
      active.setAttribute('part', 'active-symbol')
      active.setAttribute('aria-hidden', 'true')

      const symbol = this._getSymbol ? this._getSymbol(i) : '★'
      const text = symbol === null || symbol === undefined ? '' : String(symbol)
      inactive.textContent = text
      active.textContent = text
      element.append(inactive, active)
      fragment.appendChild(element)
      symbols.push({ element, inactive, active })
    }

    this._baseElement.replaceChildren(fragment)
    this._symbols = symbols
  }

  _syncState() {
    if (!this._baseElement) {
      return
    }

    const interactive = this._isInteractive()
    this._baseElement.classList.toggle('interactive', interactive)
    this._baseElement.classList.toggle('readonly', this.readonly)
    this._baseElement.classList.toggle('disabled', this.disabled)
    this._baseElement.setAttribute('aria-label', this.label)
    this._baseElement.setAttribute('aria-valuemin', '0')
    this._baseElement.setAttribute('aria-valuemax', String(this.max))
    this._baseElement.setAttribute('aria-readonly', String(this.readonly))
    this._baseElement.setAttribute('aria-disabled', String(this.disabled))
    this._baseElement.tabIndex = this.disabled ? -1 : 0
  }

  _syncValue() {
    if (!this._baseElement) {
      return
    }

    const value = this.value
    this._baseElement.setAttribute('aria-valuenow', String(value))
    for (let i = 0; i < this._symbols.length; i++) {
      const percent = clamp(value - i, 0, 1) * 100
      const element = this._symbols[i].element
      element.style.setProperty('--tot-rating-symbol-percent', `${percent}%`)
      element.classList.toggle('empty', percent <= 0)
      element.classList.toggle('partial', percent > 0 && percent < 100)
      element.classList.toggle('full', percent >= 100)
    }
  }

  _handlePointerDown(event) {
    if (!this._isInteractive()) {
      return
    }

    event.preventDefault()
    this._baseElement.classList.add('pointer-focus')
    this._baseElement.focus({ preventScroll: true })
    this._isPointerDown = true
    this._activePointerId = event.pointerId
    this._pointerDownClientX = event.clientX
    this._pointerDownClientY = event.clientY

    if (this._baseElement.setPointerCapture) {
      this._baseElement.setPointerCapture(event.pointerId)
    }

    const nextValue = this._getValueFromPointer(event)
    this._pendingMinimumToggle = this._shouldToggleMinimumValue(nextValue)
    this._emitHover('start', nextValue)
    this._setValueFromInteraction(this._pendingMinimumToggle ? 0 : nextValue)
  }

  _handlePointerMove(event) {
    if (this.disabled || (this._activePointerId !== null && event.pointerId !== this._activePointerId)) {
      return
    }

    if (this._isPointerDown) {
      event.preventDefault()
    }

    const nextValue = this._getValueFromPointer(event)
    this._emitHover(this._hovering ? 'move' : 'start', nextValue)

    if (!this._isPointerDown || !this._isInteractive()) {
      return
    }

    if (this._pendingMinimumToggle && !this._hasPointerMoved(event)) {
      return
    }

    this._pendingMinimumToggle = false
    this._setValueFromInteraction(nextValue)
  }

  _handlePointerUp(event) {
    if (this._activePointerId !== null && event.pointerId !== this._activePointerId) {
      return
    }

    this._releasePointer()
    this._isPointerDown = false
    this._activePointerId = null
    this._pendingMinimumToggle = false
  }

  _handlePointerCancel(event) {
    this._handlePointerUp(event)
    this._emitHover('end', this.value)
  }

  _handlePointerLeave() {
    if (!this._isPointerDown) {
      this._emitHover('end', this.value)
    }
  }

  _handleBlur() {
    this._baseElement.classList.remove('pointer-focus')
  }

  _releasePointer() {
    if (!this._baseElement.releasePointerCapture || this._activePointerId === null) {
      return
    }

    if (this._baseElement.hasPointerCapture && !this._baseElement.hasPointerCapture(this._activePointerId)) {
      return
    }

    this._baseElement.releasePointerCapture(this._activePointerId)
  }

  _handleKeyDown(event) {
    if (!this._isInteractive()) {
      return
    }

    let nextValue = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      nextValue = this.value + this.precision
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      nextValue = this.value - this.precision
    } else if (event.key === 'Home') {
      nextValue = 0
    } else if (event.key === 'End') {
      nextValue = this.max
    }

    if (nextValue === null) {
      return
    }

    event.preventDefault()
    this._setValueFromInteraction(nextValue)
  }

  _getValueFromPointer(event) {
    const rect = this._baseElement.getBoundingClientRect()
    let ratio = rect.width > 0 ? (event.clientX - rect.left) / rect.width : 0
    if (getComputedStyle(this._baseElement).direction === 'rtl') {
      ratio = 1 - ratio
    }
    return this._normalizeValue(clamp(ratio, 0, 1) * this.max, true)
  }

  _normalizeValue(value, roundUp = false) {
    const precision = this.precision
    const parsed = parseNumber(value, 0)
    const rounded = roundUp
      ? Math.ceil(parsed / precision) * precision
      : Math.round(parsed / precision) * precision
    return Number(clamp(rounded, 0, this.max).toFixed(getDecimalPlaces(precision)))
  }

  _shouldToggleMinimumValue(value) {
    const minimumValue = this._normalizeValue(Math.min(this.precision, this.max))
    return this.value === minimumValue && this._normalizeValue(value) === minimumValue
  }

  _hasPointerMoved(event) {
    return Math.abs(event.clientX - this._pointerDownClientX) > 3 || Math.abs(event.clientY - this._pointerDownClientY) > 3
  }

  _setValueFromInteraction(value) {
    const nextValue = this._normalizeValue(value)
    if (nextValue === this.value) {
      return
    }

    this._suppressAttributeSync = true
    this.value = nextValue
    this._suppressAttributeSync = false
    this._syncValue()
    const detail = {
      value: this.value,
      max: this.max,
      precision: this.precision,
    }
    emit(this, 'input', detail)
    emit(this, 'change', detail)
  }

  _emitHover(phase, value) {
    if (phase === 'end' && !this._hovering) {
      return
    }

    if (phase !== 'end' && this._hovering && this._lastHoverValue === value) {
      return
    }

    this._hovering = phase !== 'end'
    this._lastHoverValue = phase === 'end' ? null : value
    emit(this, 'hover', { phase, value })
  }

  _isInteractive() {
    return !this.disabled && !this.readonly
  }
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail,
  }))
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getDecimalPlaces(number) {
  const value = String(number)
  const decimalIndex = value.indexOf('.')
  return decimalIndex === -1 ? 0 : value.length - decimalIndex - 1
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
