const ratingStyle = `
  :host {
    --symbol-color: var(--tot-color-neutral-300, #cbd5e1);
    --symbol-color-active: var(--tot-color-amber-500, #f59e0b);
    --symbol-size: 1.25rem;
    --symbol-spacing: var(--tot-spacing-3x-small, .125rem);

    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .rating {
    align-items: center;
    color: var(--symbol-color);
    display: inline-flex;
    gap: var(--symbol-spacing);
    max-width: 100%;
    outline: none;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    user-select: none;
    -webkit-user-select: none;
  }

  .rating:focus-visible {
    border-radius: var(--tot-border-radius-medium, 4px);
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .rating.rating--pointer-focus:focus-visible {
    outline: none;
  }

  .rating--disabled {
    opacity: .55;
  }

  .rating--interactive {
    cursor: pointer;
  }

  .rating__symbol {
    align-items: center;
    display: inline-grid;
    flex: 0 0 auto;
    font-size: var(--symbol-size);
    height: 1em;
    justify-items: center;
    line-height: 1;
    overflow: hidden;
    position: relative;
    width: 1em;
  }

  .rating__symbol-inactive,
  .rating__symbol-active {
    grid-area: 1 / 1;
    line-height: 1;
  }

  .rating__symbol-inactive {
    color: var(--symbol-color);
  }

  .rating__symbol-active {
    color: var(--symbol-color-active);
    display: inline-block;
    inset-inline-start: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: var(--rating-symbol-percent, 0%);
  }

  .rating__symbol--empty .rating__symbol-active {
    visibility: hidden;
  }

  .rating__symbol--full .rating__symbol-inactive {
    visibility: hidden;
  }

  .rating__symbol--full .rating__symbol-active {
    overflow: visible;
    position: static;
    width: auto;
  }

  .rating--readonly,
  .rating--disabled {
    cursor: default;
  }
`

export class TotRating extends HTMLElement {
  static get observedAttributes() {
    return [
      'label',
      'value',
      'max',
      'precision',
      'readonly',
      'disabled',
    ]
  }

  constructor() {
    super()
    this._getSymbol = null
    this._hovering = false
    this._lastHoverValue = null
    this._isPointerDown = false
    this._activePointerId = null
    this._pointerDownClientX = 0
    this._pointerDownClientY = 0
    this._pendingMinimumToggle = false
    this._suppressAttributeRender = false
    this._boundWindowPointerMove = (event) => this.handlePointerMove(event)
    this._boundWindowPointerUp = (event) => this.handlePointerUp(event)
    this._boundWindowPointerCancel = (event) => this.handlePointerCancel(event)
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
    this.setAttribute('value', String(this.normalizeValue(value)))
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
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.removeDragListeners()
    this._isPointerDown = false
    this._activePointerId = null
    this._pendingMinimumToggle = false
    this._suppressAttributeRender = false
  }

  attributeChangedCallback() {
    if (this._suppressAttributeRender) {
      return
    }

    this.render()
  }

  focus(options) {
    const base = this.getBase()
    if (base) {
      base.focus(options)
    }
  }

  blur() {
    const base = this.getBase()
    if (base) {
      base.blur()
    }
  }

  render() {
    const disabled = this.disabled
    const readonly = this.readonly
    const value = this.value
    const max = this.max
    const classes = [
      'rating',
    ]

    if (!disabled && !readonly) {
      classes.push('rating--interactive')
    }

    if (readonly) {
      classes.push('rating--readonly')
    }

    if (disabled) {
      classes.push('rating--disabled')
    }

    const symbols = []
    for (let i = 1; i <= max; i++) {
      const percent = clamp(value - i + 1, 0, 1) * 100
      const symbol = this.getSymbolHtml(i)
      const symbolClasses = [
        'rating__symbol',
        this.getSymbolStateClass(percent),
      ]
      symbols.push(`<span class="${escapeAttribute(symbolClasses.join(' '))}" part="symbol" data-value="${i}" style="--rating-symbol-percent: ${percent}%">
        <span class="rating__symbol-inactive" aria-hidden="true">${symbol}</span>
        <span class="rating__symbol-active" aria-hidden="true">${symbol}</span>
      </span>`)
    }

    const root = this.getRoot()
    root.innerHTML = `<style>${ratingStyle}</style>
      <span
        class="${escapeAttribute(classes.join(' '))}"
        part="base"
        role="slider"
        aria-label="${escapeAttribute(this.label)}"
        aria-valuemin="0"
        aria-valuemax="${escapeAttribute(max)}"
        aria-valuenow="${escapeAttribute(value)}"
        aria-readonly="${readonly ? 'true' : 'false'}"
        aria-disabled="${disabled ? 'true' : 'false'}"
        tabindex="${disabled ? '-1' : '0'}"
      >${symbols.join('')}</span>
    `

    const base = this.getBase()
    base.addEventListener('pointerdown', (event) => this.handlePointerDown(event))
    base.addEventListener('pointermove', (event) => this.handlePointerMove(event))
    base.addEventListener('pointerup', (event) => this.handlePointerUp(event))
    base.addEventListener('pointercancel', (event) => this.handlePointerCancel(event))
    base.addEventListener('pointerleave', () => this.handlePointerLeave())
    base.addEventListener('blur', () => this.handleBlur())
    base.addEventListener('keydown', (event) => this.handleKeyDown(event))
  }

  handlePointerDown(event) {
    if (!this.isInteractive()) {
      return
    }

    event.preventDefault()
    event.currentTarget.classList.add('rating--pointer-focus')
    this._isPointerDown = true
    this._activePointerId = event.pointerId
    this._pointerDownClientX = event.clientX
    this._pointerDownClientY = event.clientY
    this.addDragListeners()

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    const nextValue = this.getValueFromPointer(event)
    this._pendingMinimumToggle = this.shouldToggleMinimumValue(nextValue)
    this.emitHover('start', nextValue)
    this.setValueFromInteraction(this._pendingMinimumToggle ? 0 : nextValue)
  }

  handlePointerMove(event) {
    if (this.disabled) {
      return
    }

    if (this._activePointerId !== null && event.pointerId !== this._activePointerId) {
      return
    }

    if (this._isPointerDown) {
      event.preventDefault()
    }

    const nextValue = this.getValueFromPointer(event)
    this.emitHover(this._hovering ? 'move' : 'start', nextValue)

    if (this._isPointerDown && this.isInteractive()) {
      if (this._pendingMinimumToggle && !this.hasPointerMoved(event)) {
        return
      }

      this._pendingMinimumToggle = false
      this.setValueFromInteraction(nextValue)
    }
  }

  handlePointerUp(event) {
    if (this._activePointerId !== null && event.pointerId !== this._activePointerId) {
      return
    }

    this.releasePointer()
    this.removeDragListeners()
    this._isPointerDown = false
    this._activePointerId = null
    this._pendingMinimumToggle = false
    this._suppressAttributeRender = false
  }

  handlePointerCancel(event) {
    this.handlePointerUp(event)
    this.emitHover('end', this.value)
  }

  handlePointerLeave() {
    if (!this._isPointerDown) {
      this.emitHover('end', this.value)
    }
  }

  handleBlur() {
    const base = this.getBase()
    if (base) {
      base.classList.remove('rating--pointer-focus')
    }
  }

  addDragListeners() {
    window.addEventListener('pointermove', this._boundWindowPointerMove, { passive: false })
    window.addEventListener('pointerup', this._boundWindowPointerUp, { passive: false })
    window.addEventListener('pointercancel', this._boundWindowPointerCancel, { passive: false })
  }

  removeDragListeners() {
    window.removeEventListener('pointermove', this._boundWindowPointerMove)
    window.removeEventListener('pointerup', this._boundWindowPointerUp)
    window.removeEventListener('pointercancel', this._boundWindowPointerCancel)
  }

  releasePointer() {
    const base = this.getBase()
    if (!base || !base.releasePointerCapture || this._activePointerId === null) {
      return
    }

    if (base.hasPointerCapture && !base.hasPointerCapture(this._activePointerId)) {
      return
    }

    base.releasePointerCapture(this._activePointerId)
  }

  handleKeyDown(event) {
    if (!this.isInteractive()) {
      return
    }

    const step = this.precision
    let nextValue = null

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      nextValue = this.value + step
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      nextValue = this.value - step
    } else if (event.key === 'Home') {
      nextValue = 0
    } else if (event.key === 'End') {
      nextValue = this.max
    }

    if (nextValue !== null) {
      event.preventDefault()
      this.setValueFromInteraction(nextValue)
    }
  }

  getValueFromPointer(event) {
    const base = this.getBase()
    if (!base) {
      return this.value
    }

    const rect = base.getBoundingClientRect()
    const ratio = rect.width > 0 ? (event.clientX - rect.left) / rect.width : 0
    return this.normalizeValue(clamp(ratio, 0, 1) * this.max, true)
  }

  normalizeValue(value, roundUp) {
    const precision = this.precision
    const parsed = parseNumber(value, 0)
    const rounded = roundUp
      ? Math.ceil(parsed / precision) * precision
      : Math.round(parsed / precision) * precision
    const decimals = getDecimalPlaces(precision)
    return Number(clamp(rounded, 0, this.max).toFixed(decimals))
  }

  shouldToggleMinimumValue(value) {
    const nextValue = this.normalizeValue(value)
    const minimumValue = this.getMinimumValue()
    return this.value === minimumValue && nextValue === minimumValue
  }

  hasPointerMoved(event) {
    const distanceX = Math.abs(event.clientX - this._pointerDownClientX)
    const distanceY = Math.abs(event.clientY - this._pointerDownClientY)
    return distanceX > 3 || distanceY > 3
  }

  getMinimumValue() {
    return this.normalizeValue(Math.min(this.precision, this.max))
  }

  setValueFromInteraction(value) {
    const nextValue = this.normalizeValue(value)
    if (nextValue === this.value) {
      return
    }

    this._suppressAttributeRender = true
    this.value = nextValue
    this._suppressAttributeRender = false
    this.syncValue()
    emit(this, 'input', this.getEventDetail())
    emit(this, 'change', this.getEventDetail())
  }

  emitHover(phase, value) {
    if (phase === 'end' && !this._hovering) {
      return
    }

    if (phase !== 'end' && this._lastHoverValue === value && this._hovering) {
      return
    }

    this._hovering = phase !== 'end'
    this._lastHoverValue = phase === 'end' ? null : value
    emit(this, 'hover', {
      phase,
      value,
    })
  }

  syncValue() {
    const value = this.value
    const base = this.getBase()
    if (!base) {
      return
    }

    base.setAttribute('aria-valuenow', String(value))
    const symbols = base.querySelectorAll('.rating__symbol')
    for (let i = 0; i < symbols.length; i++) {
      const percent = clamp(value - i, 0, 1) * 100
      symbols[i].style.setProperty('--rating-symbol-percent', `${percent}%`)
      symbols[i].classList.remove('rating__symbol--empty', 'rating__symbol--partial', 'rating__symbol--full')
      symbols[i].classList.add(this.getSymbolStateClass(percent))
    }
  }

  getSymbolStateClass(percent) {
    if (percent <= 0) {
      return 'rating__symbol--empty'
    }

    if (percent >= 100) {
      return 'rating__symbol--full'
    }

    return 'rating__symbol--partial'
  }

  getSymbolHtml(value) {
    if (this._getSymbol) {
      const symbol = this._getSymbol(value)
      return symbol === null || symbol === undefined ? '' : String(symbol)
    }

    return '★'
  }

  isInteractive() {
    return !this.disabled && !this.readonly
  }

  getEventDetail() {
    return {
      value: this.value,
      max: this.max,
      precision: this.precision,
    }
  }

  getBase() {
    return this.shadowRoot?.querySelector('.rating')
  }

  getRoot() {
    return this.shadowRoot || this.attachShadow({ mode: 'open' })
  }
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getDecimalPlaces(number) {
  const stringValue = String(number)
  const decimalIndex = stringValue.indexOf('.')
  return decimalIndex === -1 ? 0 : stringValue.length - decimalIndex - 1
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
