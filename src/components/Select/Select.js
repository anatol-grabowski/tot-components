const selectStyle = `
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
    position: relative;
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

  .select {
    max-width: 100%;
    min-width: 0;
    position: relative;
  }

  .control {
    --select-height: var(--tot-input-height-medium, 2.25rem);
    --select-spacing: var(--tot-input-spacing-medium, .75rem);
    --select-font-size: var(--tot-input-font-size-medium, .875rem);

    align-items: center;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: flex;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--select-font-size);
    font-weight: var(--tot-input-font-weight, 400);
    gap: var(--tot-spacing-2x-small, .25rem);
    letter-spacing: var(--tot-input-letter-spacing, normal);
    min-height: var(--select-height);
    max-width: 100%;
    min-width: 0;
    outline: none;
    padding: 0 var(--select-spacing);
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) box-shadow,
      var(--tot-transition-fast, 150ms) color;
    user-select: none;
    width: 100%;
  }

  .select--small .control {
    --select-height: var(--tot-input-height-small, 1.75rem);
    --select-spacing: var(--tot-input-spacing-small, .5rem);
    --select-font-size: var(--tot-input-font-size-small, .75rem);
  }

  .select--large .control {
    --select-height: var(--tot-input-height-large, 2.75rem);
    --select-spacing: var(--tot-input-spacing-large, 1rem);
    --select-font-size: var(--tot-input-font-size-large, 1rem);
  }

  .control:hover:not(.control--disabled) {
    background: var(--tot-input-background-color-hover, #fff);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
    color: var(--tot-input-color-hover, #0f172a);
  }

  .control:focus-visible:not(.control--disabled),
  .select--open .control:not(.control--disabled) {
    background: var(--tot-input-background-color-focus, #fff);
    border-color: var(--tot-input-border-color-focus, var(--tot-color-primary-600, #0284c7));
    box-shadow: 0 0 0 var(--tot-input-focus-ring-offset, 0) var(--tot-input-focus-ring-color, hsl(198.6 88.7% 48.4% / 40%));
    color: var(--tot-input-color-focus, #0f172a);
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: 0;
  }

  .control--disabled {
    background: var(--tot-input-background-color-disabled, #f1f5f9);
    border-color: var(--tot-input-border-color-disabled, #cbd5e1);
    color: var(--tot-input-color-disabled, #64748b);
    cursor: not-allowed;
    opacity: .75;
  }

  .select__prefix,
  .select__suffix,
  .select__actions,
  .select__caret {
    align-items: center;
    color: var(--tot-input-icon-color, #64748b);
    display: inline-flex;
    flex: 0 0 auto;
    min-width: 0;
  }

  .select__prefix,
  .select__suffix {
    display: none;
  }

  .select--has-prefix .select__prefix,
  .select--has-suffix .select__suffix {
    display: inline-flex;
  }

  .select__value {
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    gap: var(--tot-spacing-2x-small, .25rem);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select__value--placeholder {
    color: var(--tot-input-placeholder-color, #64748b);
  }

  .select__tag {
    align-items: center;
    background: var(--tot-color-neutral-50, #f8fafc);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-color, #1e293b);
    display: inline-flex;
    flex: 0 1 auto;
    line-height: 1.15;
    max-width: 9rem;
    min-width: 0;
    overflow: hidden;
    padding: var(--tot-spacing-3x-small, .125rem) var(--tot-spacing-2x-small, .25rem);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select__tag--count {
    color: var(--tot-color-neutral-700, #334155);
    flex: 0 0 auto;
  }

  .select__actions {
    gap: var(--tot-spacing-3x-small, .125rem);
  }

  .select__button {
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
    height: 1.5em;
    justify-content: center;
    line-height: 1;
    padding: 0;
    width: 1.5em;
  }

  .select__button:hover:not(:disabled) {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .select__button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .select__button:disabled {
    cursor: not-allowed;
    opacity: .5;
  }

  .select__button[hidden] {
    display: none;
  }

  .select__caret {
    font-size: .8em;
    transform: rotate(0deg);
    transition: var(--tot-transition-fast, 150ms) transform;
  }

  .select--open .select__caret {
    transform: rotate(180deg);
  }

  .panel {
    left: 0;
    margin-top: var(--tot-dropdown-panel-gap, var(--tot-spacing-2x-small, .25rem));
    min-width: 100%;
    position: absolute;
    top: 100%;
    z-index: var(--tot-z-index-dropdown, 900);
  }

  .panel[hidden] {
    display: none;
  }

  .select--hoist .panel {
    margin-top: 0;
    position: fixed;
  }

  .panel__surface {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
    border-radius: var(--tot-border-radius-medium, 4px);
    box-shadow: var(--tot-shadow-medium, var(--tot-shadow-small, 0 1px 2px rgb(15 23 42 / 8%)));
    color: var(--tot-input-color, #1e293b);
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    max-height: min(var(--tot-select-panel-max-height, 16rem), 60vh);
    max-width: min(var(--tot-dropdown-max-width, 28rem), 100vw);
    overflow: auto;
    padding: var(--tot-menu-padding, .125rem);
  }

  .option {
    align-items: center;
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: grid;
    font: inherit;
    gap: var(--tot-menu-item-gap, .375rem);
    grid-template-columns: 1rem minmax(0, 1fr);
    line-height: 1.25;
    min-height: var(--tot-menu-item-height, 1.625rem);
    outline: none;
    padding: var(--tot-menu-item-padding-block, .25rem) var(--tot-menu-item-padding-inline, .5rem);
    user-select: none;
  }

  .option:hover:not(.option--disabled),
  .option:focus-visible:not(.option--disabled) {
    background: var(--tot-color-neutral-100, #f1f5f9);
    color: var(--tot-input-color-hover, #0f172a);
  }

  .option:focus-visible {
    box-shadow: var(--tot-focus-ring, 0 0 0 3px hsl(198.6 88.7% 48.4% / 40%));
  }

  .option--selected {
    color: var(--tot-color-primary-700, #0369a1);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .option--disabled {
    cursor: not-allowed;
    opacity: .55;
  }

  .option__check {
    align-items: center;
    color: var(--tot-color-primary-700, #0369a1);
    display: inline-flex;
    justify-content: center;
    line-height: 1;
    min-width: 1rem;
  }

  .option:not(.option--selected) .option__check {
    visibility: hidden;
  }

  .option__label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .divider {
    border-top: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
    margin-block: var(--tot-menu-divider-spacing, .125rem);
    width: 100%;
  }

  .hint-text {
    color: var(--tot-input-help-text-color, var(--tot-color-neutral-600, #475569));
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-help-text-font-size-medium, .8125rem);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .hint-text:empty {
    display: none;
  }

  .form-control--small .label {
    font-size: var(--tot-input-label-font-size-small, .8125rem);
  }

  .form-control--small .hint-text {
    font-size: var(--tot-input-help-text-font-size-small, .75rem);
  }

  .form-control--large .label {
    font-size: var(--tot-input-label-font-size-large, 1rem);
  }

  .form-control--large .hint-text {
    font-size: var(--tot-input-help-text-font-size-large, .875rem);
  }
`

const sizes = ['small', 'medium', 'large']

export class TotSelect extends HTMLElement {
  static get observedAttributes() {
    return [
      'label',
      'hint-text',
      'placeholder',
      'clearable',
      'disabled',
      'multiple',
      'size',
      'open',
      'hoist',
      'options',
      'items',
      'value',
      'values',
    ]
  }

  constructor() {
    super()
    this._options = null
    this._selectedValues = null
    this._hasPrefix = false
    this._hasSuffix = false
    this._positionFrame = 0
    this._handleDocumentPointerDown = event => this.handleDocumentPointerDown(event)
    this._handleWindowChange = () => this.schedulePanelPosition()
  }

  get options() {
    if (this._options) {
      return cloneOptions(this._options)
    }
    return parseOptions(this.getAttribute('options') || this.getAttribute('items'))
  }

  set options(value) {
    this._options = parseOptions(value)
    this.render()
  }

  get items() {
    return this.options
  }

  set items(value) {
    this.options = value
  }

  get value() {
    const values = this.selectedValues
    return values.length > 0 ? values[0] : ''
  }

  set value(value) {
    this._selectedValues = value === null || value === undefined || value === '' ? [] : [String(value)]
    this.render()
  }

  get values() {
    return this.selectedValues
  }

  set values(value) {
    this._selectedValues = parseValues(value)
    this.render()
  }

  get selectedValues() {
    if (this._selectedValues) {
      return this._selectedValues.slice()
    }

    if (this.multiple) {
      const valuesAttribute = this.getAttribute('values')
      const valueAttribute = this.getAttribute('value')
      const values = parseValues(valuesAttribute !== null ? valuesAttribute : valueAttribute)
      return values.length > 0 ? values : getSelectedValuesFromOptions(this.options)
    }

    const value = this.getAttribute('value')
    if (value !== null) {
      return value === '' ? [] : [value]
    }

    return getSelectedValuesFromOptions(this.options).slice(0, 1)
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  get hintText() {
    return this.getAttribute('hint-text') || ''
  }

  set hintText(value) {
    setNullableAttribute(this, 'hint-text', value)
  }

  get placeholder() {
    return this.getAttribute('placeholder') || ''
  }

  set placeholder(value) {
    setNullableAttribute(this, 'placeholder', value)
  }

  get clearable() {
    return this.hasAttribute('clearable')
  }

  set clearable(value) {
    setBooleanAttribute(this, 'clearable', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  get multiple() {
    return this.hasAttribute('multiple')
  }

  set multiple(value) {
    setBooleanAttribute(this, 'multiple', value)
  }

  get size() {
    return getSupportedValue(this.getAttribute('size'), sizes, 'medium')
  }

  set size(value) {
    this.setAttribute('size', getSupportedValue(value, sizes, 'medium'))
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    setBooleanAttribute(this, 'open', value)
  }

  get hoist() {
    return this.hasAttribute('hoist')
  }

  set hoist(value) {
    setBooleanAttribute(this, 'hoist', value)
  }

  connectedCallback() {
    this.render()
    document.addEventListener('pointerdown', this._handleDocumentPointerDown, true)
    window.addEventListener('resize', this._handleWindowChange)
    document.addEventListener('scroll', this._handleWindowChange, true)
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this._handleDocumentPointerDown, true)
    window.removeEventListener('resize', this._handleWindowChange)
    document.removeEventListener('scroll', this._handleWindowChange, true)
    cancelAnimationFrame(this._positionFrame)
  }

  attributeChangedCallback(name) {
    if (name === 'options' || name === 'items') {
      this._options = null
    }

    if (name === 'value' || name === 'values') {
      this._selectedValues = null
    }

    this.render()
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

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const previousScrollTop = root.querySelector('.panel__surface')?.scrollTop || 0
    const options = this.options
    const selectedValues = this.selectedValues
    const selectedOptions = getSelectedOptions(options, selectedValues)
    const size = this.size
    const open = this.open && !this.disabled
    const disabled = this.disabled
    const hasPrefix = this.hasNamedSlotContent('prefix')
    const hasSuffix = this.hasNamedSlotContent('suffix')
    const formClasses = ['form-control', `form-control--${size}`]
    const selectClasses = ['select', `select--${size}`]
    const controlClasses = ['control']
    const valueContent = this.getDisplayValueContent(selectedOptions, selectedValues)
    const hasValue = selectedValues.length > 0
    const valueClasses = ['select__value']

    this._hasPrefix = hasPrefix
    this._hasSuffix = hasSuffix

    if (open) {
      selectClasses.push('select--open')
    }

    if (this.hoist) {
      selectClasses.push('select--hoist')
    }

    if (disabled) {
      controlClasses.push('control--disabled')
    }

    if (hasPrefix) {
      selectClasses.push('select--has-prefix')
    }

    if (hasSuffix) {
      selectClasses.push('select--has-suffix')
    }

    if (!hasValue) {
      valueClasses.push('select__value--placeholder')
    }

    root.innerHTML = `<style>${selectStyle}</style>
      <div class="${escapeAttribute(formClasses.join(' '))}" part="form-control">
        <span class="label" part="form-control-label">${escapeHtml(this.label)}</span>
        <div class="${escapeAttribute(selectClasses.join(' '))}" part="base">
          <div
            class="${escapeAttribute(controlClasses.join(' '))}"
            part="control"
            role="combobox"
            aria-expanded="${open ? 'true' : 'false'}"
            aria-haspopup="listbox"
            aria-disabled="${disabled ? 'true' : 'false'}"
            tabindex="${disabled ? '-1' : '0'}"
          >
            <span class="select__prefix" part="prefix"><slot name="prefix"></slot></span>
            <span class="${escapeAttribute(valueClasses.join(' '))}" part="display-value">${valueContent}</span>
            <span class="select__suffix" part="suffix"><slot name="suffix"></slot></span>
            <span class="select__actions" part="actions">
              <button class="select__button select__clear-button" type="button" aria-label="Clear selection" ${this.clearable && hasValue ? '' : 'hidden'} ${disabled ? 'disabled' : ''}>×</button>
            </span>
            <span class="select__caret" aria-hidden="true">⌄</span>
          </div>
          <div class="panel" part="panel" ${open ? '' : 'hidden'}>
            <div class="panel__surface">
              <div class="listbox" role="listbox" aria-multiselectable="${this.multiple ? 'true' : 'false'}">
                ${this.renderOptions(options, selectedValues)}
              </div>
            </div>
          </div>
        </div>
        <span class="hint-text" part="form-control-hint-text">${escapeHtml(this.hintText)}</span>
      </div>
    `

    const control = root.querySelector('.control')
    const clearButton = root.querySelector('.select__clear-button')
    const prefixSlot = root.querySelector('slot[name="prefix"]')
    const suffixSlot = root.querySelector('slot[name="suffix"]')
    const panelSurface = root.querySelector('.panel__surface')
    const listbox = root.querySelector('.listbox')

    panelSurface.scrollTop = previousScrollTop
    requestAnimationFrame(() => {
      panelSurface.scrollTop = previousScrollTop
    })

    control.addEventListener('click', () => this.handleControlClick())
    control.addEventListener('keydown', (event) => this.handleControlKeyDown(event))
    clearButton.addEventListener('mousedown', (event) => event.preventDefault())
    clearButton.addEventListener('click', (event) => this.handleClear(event))
    prefixSlot.addEventListener('slotchange', () => this.handleSlotChange())
    suffixSlot.addEventListener('slotchange', () => this.handleSlotChange())
    listbox.addEventListener('click', (event) => this.handleOptionClick(event))
    listbox.addEventListener('keydown', (event) => this.handleListboxKeyDown(event))

    if (open) {
      this.schedulePanelPosition()
    }
  }

  renderOptions(options, selectedValues) {
    const output = []
    for (let i = 0; i < options.length; i++) {
      const option = options[i]
      if (option.type === 'divider') {
        output.push('<div class="divider" role="separator"></div>')
        continue
      }

      const selected = selectedValues.includes(option.value)
      const classes = ['option']
      if (selected) {
        classes.push('option--selected')
      }
      if (option.disabled) {
        classes.push('option--disabled')
      }

      output.push(`<div
        class="${escapeAttribute(classes.join(' '))}"
        role="option"
        aria-selected="${selected ? 'true' : 'false'}"
        aria-disabled="${option.disabled ? 'true' : 'false'}"
        data-value="${escapeAttribute(option.value)}"
        tabindex="${option.disabled ? '-1' : '0'}"
      ><span class="option__check" aria-hidden="true">✓</span><span class="option__label">${escapeHtml(option.label)}</span></div>`)
    }
    return output.join('')
  }

  getDisplayValueContent(selectedOptions, selectedValues) {
    if (selectedValues.length === 0) {
      return escapeHtml(this.placeholder || 'Select an option')
    }

    const labels = []
    for (let i = 0; i < selectedValues.length; i++) {
      const option = getOptionByValue(selectedOptions, selectedValues[i])
      labels.push(option ? option.label : selectedValues[i])
    }

    if (!this.multiple) {
      return escapeHtml(labels.join(', '))
    }

    const visibleCount = labels.length > 3 ? 2 : labels.length
    const parts = []
    for (let i = 0; i < visibleCount; i++) {
      parts.push(`<span class="select__tag">${escapeHtml(labels[i])}</span>`)
    }

    if (labels.length > visibleCount) {
      parts.push(`<span class="select__tag select__tag--count">${labels.length} selected</span>`)
    }

    return parts.join('')
  }

  handleControlClick() {
    if (this.disabled) {
      return
    }

    this.open = !this.open
  }

  handleControlKeyDown(event) {
    if (this.disabled) {
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      if (!this.open) {
        this.open = true
      }
      this.focusCurrentOrFirstOption()
      event.preventDefault()
    }

    if (event.key === 'Escape' && this.open) {
      this.open = false
      event.preventDefault()
    }
  }

  handleOptionClick(event) {
    const option = event.target?.closest?.('.option')
    if (!option || this.disabled) {
      return
    }

    this.toggleValue(option.dataset.value)
  }

  handleListboxKeyDown(event) {
    if (this.disabled) {
      return
    }

    const options = this.getEnabledOptionElements()
    if (options.length === 0) {
      return
    }

    const active = this.shadowRoot?.activeElement
    let next = null

    if (event.key === 'ArrowDown') {
      next = getRelativeOption(options, active, 1)
    } else if (event.key === 'ArrowUp') {
      next = getRelativeOption(options, active, -1)
    } else if (event.key === 'Home') {
      next = options[0]
    } else if (event.key === 'End') {
      next = options[options.length - 1]
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (active && active.classList.contains('option')) {
        this.toggleValue(active.dataset.value)
        event.preventDefault()
      }
      return
    } else if (event.key === 'Escape') {
      this.open = false
      this.focus()
      event.preventDefault()
      return
    }

    if (next) {
      next.focus()
      event.preventDefault()
    }
  }

  handleClear(event) {
    event.stopPropagation()
    if (this.disabled) {
      return
    }

    this._selectedValues = []
    this.render()
    this.focus()
    emit(this, 'input', this.getEventDetail(null, false))
    emit(this, 'change', this.getEventDetail(null, false))
    emit(this, 'clear', this.getEventDetail(null, false))
  }

  handleSlotChange() {
    const hasPrefix = this.hasNamedSlotContent('prefix')
    const hasSuffix = this.hasNamedSlotContent('suffix')
    if (hasPrefix !== this._hasPrefix || hasSuffix !== this._hasSuffix) {
      this.render()
    }
  }

  toggleValue(value) {
    const option = getOptionByValue(this.options, value)
    if (!option || option.disabled || this.disabled) {
      return
    }

    let nextValues = this.selectedValues
    let selected = false

    if (this.multiple) {
      const index = nextValues.indexOf(value)
      if (index >= 0) {
        nextValues.splice(index, 1)
      } else {
        nextValues.push(value)
        selected = true
      }
      this._selectedValues = nextValues
      this.render()
    } else {
      selected = nextValues[0] !== value
      nextValues = [value]
      this._selectedValues = nextValues
      this.open = false
      this.focus()
    }

    emit(this, 'input', this.getEventDetail(option, selected))
    emit(this, 'change', this.getEventDetail(option, selected))
  }

  focusCurrentOrFirstOption() {
    requestAnimationFrame(() => {
      const options = this.getEnabledOptionElements()
      if (options.length === 0) {
        return
      }

      const selectedValue = this.selectedValues[0]
      for (let i = 0; i < options.length; i++) {
        if (options[i].dataset.value === selectedValue) {
          options[i].focus()
          return
        }
      }

      options[0].focus()
    })
  }

  getEnabledOptionElements() {
    const options = this.shadowRoot ? Array.from(this.shadowRoot.querySelectorAll('.option')) : []
    const enabled = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].getAttribute('aria-disabled') !== 'true') {
        enabled.push(options[i])
      }
    }
    return enabled
  }

  getControl() {
    return this.shadowRoot?.querySelector('.control')
  }

  handleDocumentPointerDown(event) {
    if (!this.open) {
      return
    }

    const path = event.composedPath()
    for (let i = 0; i < path.length; i++) {
      if (path[i] === this) {
        return
      }
    }

    this.open = false
  }

  schedulePanelPosition() {
    cancelAnimationFrame(this._positionFrame)
    this._positionFrame = requestAnimationFrame(() => this.updatePanelPosition())
  }

  updatePanelPosition() {
    if (!this.open || !this.shadowRoot) {
      return
    }

    const control = this.shadowRoot.querySelector('.control')
    const panel = this.shadowRoot.querySelector('.panel')
    if (!control || !panel) {
      return
    }

    const controlRect = control.getBoundingClientRect()
    if (!controlRect.width && !controlRect.height) {
      return
    }

    panel.style.minWidth = `${Math.ceil(controlRect.width)}px`

    if (!this.hoist) {
      panel.style.left = '0px'
      panel.style.marginTop = 'var(--tot-dropdown-panel-gap, var(--tot-spacing-2x-small, .25rem))'
      panel.style.top = '100%'
      return
    }

    const margin = 8
    const gap = 4
    const panelRect = panel.getBoundingClientRect()
    const maxLeft = Math.max(margin, window.innerWidth - panelRect.width - margin)
    let left = Math.min(Math.max(margin, controlRect.left), maxLeft)
    let top = controlRect.bottom + gap

    if (top + panelRect.height > window.innerHeight - margin && controlRect.top - panelRect.height - gap >= margin) {
      top = controlRect.top - panelRect.height - gap
    }

    left = Math.round(left)
    top = Math.round(Math.max(margin, Math.min(top, window.innerHeight - panelRect.height - margin)))
    panel.style.left = `${left}px`
    panel.style.marginTop = '0'
    panel.style.top = `${top}px`
  }

  getEventDetail(option, selected) {
    return {
      value: this.value,
      values: this.selectedValues,
      multiple: this.multiple,
      option,
      selected: Boolean(selected),
    }
  }

  hasNamedSlotContent(name) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].slot === name) {
        return true
      }
    }
    return false
  }
}

function getRelativeOption(options, active, step) {
  if (!active || !options.includes(active)) {
    return step > 0 ? options[0] : options[options.length - 1]
  }

  const index = options.indexOf(active)
  return options[(index + step + options.length) % options.length]
}

function parseOptions(value) {
  if (value === null || value === undefined || value === '') {
    return []
  }

  let source = value
  if (typeof value === 'string') {
    source = parseJson(value, [])
  }

  if (!Array.isArray(source)) {
    return []
  }

  const options = []
  for (let i = 0; i < source.length; i++) {
    const option = normalizeOption(source[i])
    if (option) {
      options.push(option)
    }
  }
  return options
}

function normalizeOption(option) {
  if (option === 'divider') {
    return { type: 'divider' }
  }

  if (typeof option === 'string') {
    return {
      type: 'option',
      value: option,
      label: option,
      disabled: false,
      selected: false,
    }
  }

  if (!option || typeof option !== 'object') {
    return null
  }

  if (option.type === 'divider' || option.kind === 'divider' || option.divider) {
    return { type: 'divider' }
  }

  const label = String(option.label ?? option.text ?? option.value ?? option.id ?? '')
  const value = String(option.value ?? option.id ?? label)
  if (!value && !label) {
    return null
  }

  return {
    type: 'option',
    value,
    label,
    disabled: Boolean(option.disabled),
    selected: Boolean(option.selected || option.checked),
  }
}

function cloneOptions(options) {
  return parseOptions(options)
}

function parseValues(value) {
  if (value === null || value === undefined || value === '') {
    return []
  }

  if (Array.isArray(value)) {
    const values = []
    for (let i = 0; i < value.length; i++) {
      values.push(String(value[i]))
    }
    return values
  }

  if (typeof value === 'string') {
    const parsed = parseJson(value, null)
    if (Array.isArray(parsed)) {
      return parseValues(parsed)
    }

    const values = []
    const parts = value.split(',')
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim()
      if (part) {
        values.push(part)
      }
    }
    return values
  }

  return [String(value)]
}

function getSelectedValuesFromOptions(options) {
  const values = []
  for (let i = 0; i < options.length; i++) {
    if (options[i].type === 'option' && options[i].selected) {
      values.push(options[i].value)
    }
  }
  return values
}

function getSelectedOptions(options, selectedValues) {
  const selectedOptions = []
  for (let i = 0; i < selectedValues.length; i++) {
    const option = getOptionByValue(options, selectedValues[i])
    if (option) {
      selectedOptions.push(option)
    }
  }
  return selectedOptions
}

function getOptionByValue(options, value) {
  for (let i = 0; i < options.length; i++) {
    if (options[i].type === 'option' && options[i].value === value) {
      return options[i]
    }
  }
  return null
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

function parseJson(value, fallback) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
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
