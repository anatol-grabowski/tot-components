const selectStyle = `
  :host {
    display: block;
    max-width: 100%;
    vertical-align: top;
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

  .label[hidden],
  .help-text[hidden] {
    display: none;
  }

  .select {
    --select-height: var(--tot-input-height-medium, 2.25rem);
    --select-spacing: var(--tot-spacing-2x-small, .25rem);
    --select-edge-spacing: calc(var(--select-spacing) + var(--tot-spacing-3x-small, .125rem));
    --select-font-size: var(--tot-input-font-size-medium, .875rem);
    --select-tag-height: calc(
      1.15em
      + var(--tot-spacing-3x-small, .125rem)
      + var(--tot-spacing-3x-small, .125rem)
    );
    --select-tag-row-padding: max(0px, calc((var(--select-content-height) - var(--select-tag-height)) / 2));
    --select-content-height: calc(
      var(--select-height)
      - var(--tot-input-border-width, 1px)
      - var(--tot-input-border-width, 1px)
    );

    max-width: 100%;
    min-height: var(--select-height);
    min-width: 0;
    position: relative;
  }

  .control {
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
    height: var(--select-height);
    line-height: var(--tot-input-line-height, 1.25);
    min-height: var(--select-height);
    max-width: 100%;
    min-width: 0;
    outline: none;
    padding-block: 0;
    padding-inline: var(--select-edge-spacing);
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) box-shadow,
      var(--tot-transition-fast, 150ms) color;
    user-select: none;
    width: 100%;
  }

  .select--small {
    --select-height: var(--tot-input-height-small, 1.75rem);
    --select-spacing: var(--tot-spacing-3x-small, .125rem);
    --select-font-size: var(--tot-input-font-size-small, .75rem);
  }

  .select--large {
    --select-height: var(--tot-input-height-large, 2.75rem);
    --select-spacing: var(--tot-spacing-x-small, .5rem);
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

  .select__value-shell {
    flex: 1 1 auto;
    height: var(--select-content-height);
    min-width: 0;
    position: relative;
  }

  .select__value {
    align-items: center;
    display: flex;
    gap: var(--tot-spacing-2x-small, .25rem);
    inset: 0;
    line-height: inherit;
    min-width: 0;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select--multiple .control {
    align-items: flex-start;
    height: var(--select-height);
  }

  .select--multiple .select__prefix,
  .select--multiple .select__suffix,
  .select--multiple .select__actions,
  .select--multiple .select__caret {
    height: var(--select-content-height);
  }

  .select--multiple .select__value {
    flex-wrap: nowrap;
    height: var(--select-content-height);
    max-height: var(--select-content-height);
    overflow: hidden;
  }

  .select--tag-rows-2 {
    --select-tag-row-count: 2;
  }

  .select--tag-rows-3 {
    --select-tag-row-count: 3;
  }

  .select--tags-overflow:not(.select--tags-expanded) .select__value {
    -webkit-mask-image: linear-gradient(to right, #000 0, #000 calc(100% - 1.25rem), transparent 100%);
    mask-image: linear-gradient(to right, #000 0, #000 calc(100% - 1.25rem), transparent 100%);
  }

  .select--tags-expanded .control {
    align-items: flex-end;
    background: var(--tot-input-background-color-focus, var(--tot-input-background-color, #fff));
    height: auto;
    inset: auto 0 0;
    position: absolute;
    z-index: calc(var(--tot-z-index-dropdown, 1000) + 1);
  }

  .select--tags-expanded .select__value-shell {
    height: auto;
    max-height: calc(
      var(--select-tag-row-count, 3) * var(--select-content-height)
      + (var(--select-tag-row-count, 3) - 1) * var(--tot-spacing-2x-small, .25rem)
    );
    min-height: var(--select-content-height);
    direction: rtl;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-color: var(--tot-color-neutral-400, #94a3b8) transparent;
    scrollbar-width: thin;
  }

  .select--tags-expanded .select__value-shell::-webkit-scrollbar {
    width: .45rem;
  }

  .select--tags-expanded .select__value-shell::-webkit-scrollbar-thumb {
    background: var(--tot-color-neutral-400, #94a3b8);
    border-radius: var(--tot-border-radius-pill, 999px);
  }

  .select--tags-expanded .select__value {
    align-content: flex-end;
    direction: ltr;
    display: flex;
    flex-wrap: wrap-reverse;
    height: auto;
    max-height: none;
    min-height: var(--select-content-height);
    overflow: visible;
    padding-block: var(--select-tag-row-padding);
    position: static;
    white-space: normal;
  }

  .select__value--placeholder {
    color: var(--tot-input-placeholder-color, #94a3b8);
  }

  .select__tag {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: var(--tot-color-neutral-50, #f8fafc);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: inline-flex;
    flex: 0 0 auto;
    font: inherit;
    line-height: 1.15;
    max-width: 9rem;
    min-width: 0;
    overflow: hidden;
    padding: var(--tot-spacing-3x-small, .125rem) var(--tot-spacing-2x-small, .25rem);
    position: relative;
    white-space: nowrap;
  }

  .select__tag[hidden] {
    display: none;
  }


  .select__tag:hover:not(:disabled) {
    background: var(--tot-color-neutral-100, #f1f5f9);
  }

  .select__tag:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: -1px;
  }

  .select__tag:disabled {
    cursor: not-allowed;
  }

  .select__tag-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .select__tag-remove {
    align-items: center;
    background: inherit;
    border-radius: inherit;
    display: inline-flex;
    height: 1em;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: var(--tot-spacing-3x-small, .125rem);
    top: 50%;
    transform: translateY(-50%);
    width: 1em;
  }

  .select__tag-remove svg {
    display: block;
    fill: none;
    height: 100%;
    stroke: currentColor;
    width: 100%;
  }

  .select__tag:hover:not(:disabled) .select__tag-remove,
  .select__tag:focus-visible .select__tag-remove {
    opacity: 1;
  }

  .select__tag:disabled .select__tag-remove {
    display: none;
  }

  .select__selection-count {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-icon-color, #64748b);
    cursor: default;
    flex: 0 0 auto;
    font: inherit;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    padding: 0;
    touch-action: manipulation;
  }

  .select--tags-overflow .select__selection-count:not(:disabled) {
    cursor: pointer;
  }

  .select--tags-overflow .select__selection-count:hover:not(:disabled) {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .select__selection-count:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .select__selection-count:disabled {
    cursor: not-allowed;
  }

  .select__selection-count[hidden] {
    display: none;
  }

  .select__actions {
    gap: var(--tot-spacing-3x-small, .125rem);
  }

  .select__actions[hidden] {
    display: none;
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
    height: 1em;
    justify-content: center;
    transform: rotate(0deg);
    transition: var(--tot-transition-fast, 150ms) transform;
    width: 1em;
  }

  .select__caret svg {
    display: block;
    fill: none;
    height: 100%;
    stroke: currentColor;
    width: 100%;
  }

  .select--open .select__caret {
    transform: rotate(180deg);
  }

  .panel {
    left: 0;
    margin-top: var(--tot-dropdown-panel-gap, var(--tot-spacing-2x-small, .25rem));
    min-width: 100%;
    position: absolute;
    top: calc(100% + var(--select-tag-expansion, 0px));
    width: 100%;
    z-index: var(--tot-z-index-dropdown, 1000);
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
    min-width: 100%;
    overflow: auto;
    padding: var(--tot-menu-padding, .125rem);
    width: 100%;
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
`

const sizes = ['small', 'medium', 'large']

export class TotSelect extends HTMLElement {
  static get observedAttributes() {
    return [
      'label',
      'help-text',
      'hint-text',
      'placeholder',
      'clearable',
      'disabled',
      'multiple',
      'max-tag-rows',
      'size',
      'open',
      'hoist',
      'items',
      'value',
      'values',
    ]
  }

  constructor() {
    super()
    this._items = null
    this._selectedValues = null
    this._hasPrefix = false
    this._hasSuffix = false
    this._tagsExpanded = false
    this._tagsOverflow = false
    this._selectionCountPointerType = ''
    this._positionFrame = 0
    this._tagMeasureFrame = 0
    this._controlResizeObserver = typeof ResizeObserver === 'function'
      ? new ResizeObserver(() => this.handleControlResize())
      : null
    this._handleDocumentPointerDown = event => this.handleDocumentPointerDown(event)
    this._handleWindowChange = () => {
      this.scheduleTagMeasurement()
      this.schedulePanelPosition()
    }
  }

  get items() {
    if (this._items) {
      return cloneItems(this._items)
    }
    return parseItems(this.getAttribute('items'))
  }

  set items(value) {
    this._items = parseItems(value)
    this.requestRender()
  }

  get value() {
    const values = this.selectedValues
    return values.length > 0 ? values[0] : ''
  }

  set value(value) {
    this._selectedValues = value === null || value === undefined || value === '' ? [] : [String(value)]
    this.requestRender()
  }

  get values() {
    return this.selectedValues
  }

  set values(value) {
    this._selectedValues = parseValues(value)
    this.requestRender()
  }

  get selectedValues() {
    if (this._selectedValues) {
      return this._selectedValues.slice()
    }

    if (this.multiple) {
      const valuesAttribute = this.getAttribute('values')
      const valueAttribute = this.getAttribute('value')
      const values = parseValues(valuesAttribute !== null ? valuesAttribute : valueAttribute)
      return values.length > 0 ? values : getSelectedValuesFromOptions(this.items)
    }

    const value = this.getAttribute('value')
    if (value !== null) {
      return value === '' ? [] : [value]
    }

    return getSelectedValuesFromOptions(this.items).slice(0, 1)
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  get helpText() {
    return this.getAttribute('help-text') || this.getAttribute('hint-text') || ''
  }

  set helpText(value) {
    setNullableAttribute(this, 'help-text', value)
  }

  get hintText() {
    return this.helpText
  }

  set hintText(value) {
    this.helpText = value
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

  get maxTagRows() {
    return getSupportedNumber(this.getAttribute('max-tag-rows'), [2, 3], 3)
  }

  set maxTagRows(value) {
    this.setAttribute('max-tag-rows', String(getSupportedNumber(value, [2, 3], 3)))
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
    this.requestRender()
    document.addEventListener('pointerdown', this._handleDocumentPointerDown, true)
    window.addEventListener('resize', this._handleWindowChange)
    document.addEventListener('scroll', this._handleWindowChange, true)
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this._handleDocumentPointerDown, true)
    window.removeEventListener('resize', this._handleWindowChange)
    document.removeEventListener('scroll', this._handleWindowChange, true)
    this._controlResizeObserver?.disconnect()
    cancelAnimationFrame(this._positionFrame)
    cancelAnimationFrame(this._tagMeasureFrame)
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'items') {
      this._items = null
    }

    if (name === 'value' || name === 'values') {
      this._selectedValues = null
    }

    if (name === 'open' && newValue === null) {
      this._tagsExpanded = false
    }

    this.requestRender()
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

  requestRender() {
    if (this.isConnected) {
      this.render()
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    this._controlResizeObserver?.disconnect()
    const previousScrollTop = root.querySelector('.panel__surface')?.scrollTop || 0
    const previousTagScrollTop = root.querySelector('.select__value-shell')?.scrollTop || 0
    const previousFocusedValue = root.activeElement?.classList?.contains('option')
      ? root.activeElement.dataset.value
      : ''
    const options = this.items
    const selectedValues = this.selectedValues
    const selectedOptions = getSelectedOptions(options, selectedValues)
    const size = this.size
    const open = this.open && !this.disabled
    const disabled = this.disabled
    const hasPrefix = this.hasNamedSlotContent('prefix')
    const hasSuffix = this.hasNamedSlotContent('suffix')
    const hasLabel = Boolean(this.label) || this.hasNamedSlotContent('label')
    const hasHelpText = Boolean(this.helpText) || this.hasNamedSlotContent('help-text')
    const formClasses = ['form-control', `form-control--${size}`]
    const selectClasses = ['select', `select--${size}`]
    const controlClasses = ['control']
    const valueContent = this.getDisplayValueContent(selectedOptions, selectedValues)
    const hasValue = selectedValues.length > 0
    const showClearButton = this.clearable && hasValue
    const showSelectionCount = this.multiple && hasValue
    const showActions = showSelectionCount || showClearButton
    const valueClasses = ['select__value']

    this._hasPrefix = hasPrefix
    this._hasSuffix = hasSuffix

    if (this.multiple) {
      selectClasses.push('select--multiple', `select--tag-rows-${this.maxTagRows}`)
      if (this._tagsExpanded) {
        selectClasses.push('select--tags-expanded')
      }
    }

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
      <div class="${escapeAttribute(formClasses.join(' '))}" part="base">
        <span id="label" class="label" part="label" ${hasLabel ? '' : 'hidden'}><slot name="label">${escapeHtml(this.label)}</slot></span>
        <div class="${escapeAttribute(selectClasses.join(' '))}">
          <div
            class="${escapeAttribute(controlClasses.join(' '))}"
            part="control"
            role="combobox"
            aria-expanded="${open ? 'true' : 'false'}"
            aria-haspopup="listbox"
            aria-controls="listbox"
            aria-disabled="${disabled ? 'true' : 'false'}"
            ${hasLabel ? 'aria-labelledby="label"' : ''}
            ${hasHelpText ? 'aria-describedby="help-text"' : ''}
            tabindex="${disabled ? '-1' : '0'}"
          >
            <span class="select__prefix" part="prefix"><slot name="prefix"></slot></span>
            <span class="select__value-shell"><span class="${escapeAttribute(valueClasses.join(' '))}" part="display-value">${valueContent}</span></span>
            <span class="select__suffix" part="suffix"><slot name="suffix"></slot></span>
            <span class="select__actions" part="actions" ${showActions ? '' : 'hidden'}>
              <button
                class="select__selection-count"
                part="selection-count"
                type="button"
                aria-label="Preview ${selectedValues.length} selected items"
                aria-expanded="${this._tagsExpanded ? 'true' : 'false'}"
                ${showSelectionCount ? '' : 'hidden'}
                ${disabled ? 'disabled' : ''}
              >(${selectedValues.length})</button>
              <button class="select__button select__clear-button" part="clear-button" type="button" aria-label="Clear selection" ${showClearButton ? '' : 'hidden'} ${disabled ? 'disabled' : ''}>×</button>
            </span>
            <span class="select__caret" part="caret" aria-hidden="true">
              <svg viewBox="0 0 16 16" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" focusable="false">
                <path d="m4.5 6.25 3.5 3.5 3.5-3.5"></path>
              </svg>
            </span>
          </div>
          <div class="panel" part="panel" ${open ? '' : 'hidden'}>
            <div class="panel__surface" part="panel-surface">
              <div id="listbox" class="listbox" part="listbox" role="listbox" aria-multiselectable="${this.multiple ? 'true' : 'false'}">
                ${this.renderOptions(options, selectedValues)}
              </div>
            </div>
          </div>
        </div>
        <span id="help-text" class="help-text" part="help-text" ${hasHelpText ? '' : 'hidden'}><slot name="help-text">${escapeHtml(this.helpText)}</slot></span>
      </div>
    `

    const select = root.querySelector('.select')
    const control = root.querySelector('.control')
    const valueShell = root.querySelector('.select__value-shell')
    const displayValue = root.querySelector('.select__value')
    const selectionCount = root.querySelector('.select__selection-count')
    const clearButton = root.querySelector('.select__clear-button')
    const labelSlot = root.querySelector('slot[name="label"]')
    const prefixSlot = root.querySelector('slot[name="prefix"]')
    const suffixSlot = root.querySelector('slot[name="suffix"]')
    const helpTextSlot = root.querySelector('slot[name="help-text"]')
    const panelSurface = root.querySelector('.panel__surface')
    const listbox = root.querySelector('.listbox')

    panelSurface.scrollTop = previousScrollTop
    requestAnimationFrame(() => {
      panelSurface.scrollTop = previousScrollTop
      if (this._tagsExpanded && valueShell) {
        valueShell.scrollTop = previousTagScrollTop || valueShell.scrollHeight
      }
      if (open && previousFocusedValue) {
        this.focusOption(previousFocusedValue)
      }
    })

    this._controlResizeObserver?.observe(control)
    control.addEventListener('click', () => this.handleControlClick())
    control.addEventListener('keydown', (event) => this.handleControlKeyDown(event))
    selectionCount.addEventListener('pointerenter', (event) => this.handleSelectionCountPointerEnter(event))
    selectionCount.addEventListener('pointerdown', (event) => {
      this._selectionCountPointerType = event.pointerType
    })
    selectionCount.addEventListener('click', (event) => this.handleSelectionCountClick(event))
    selectionCount.addEventListener('keydown', (event) => this.handleSelectionCountKeyDown(event))
    select.addEventListener('pointerleave', () => this.handleTagPreviewPointerLeave())
    select.addEventListener('focusout', () => this.handleTagPreviewFocusOut())
    displayValue.addEventListener('click', (event) => this.handleTagClick(event))
    clearButton.addEventListener('mousedown', (event) => event.preventDefault())
    clearButton.addEventListener('click', (event) => this.handleClear(event))
    labelSlot.addEventListener('slotchange', () => this.syncTextVisibility('label'))
    prefixSlot.addEventListener('slotchange', () => this.handleSlotChange())
    suffixSlot.addEventListener('slotchange', () => this.handleSlotChange())
    helpTextSlot.addEventListener('slotchange', () => this.syncTextVisibility('help-text'))
    listbox.addEventListener('click', (event) => this.handleOptionClick(event))
    listbox.addEventListener('keydown', (event) => this.handleListboxKeyDown(event))

    this.scheduleTagMeasurement()
    if (open) {
      this.schedulePanelPosition()
    }
  }

  renderOptions(options, selectedValues) {
    const output = []
    for (let i = 0; i < options.length; i++) {
      const option = options[i]
      if (option.type === 'divider') {
        output.push('<div class="divider" part="divider" role="separator"></div>')
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
        part="option"
        role="option"
        aria-selected="${selected ? 'true' : 'false'}"
        aria-disabled="${option.disabled ? 'true' : 'false'}"
        data-value="${escapeAttribute(option.value)}"
        tabindex="${option.disabled ? '-1' : '0'}"
      ><span class="option__check" part="option-check" aria-hidden="true">✓</span><span class="option__label" part="option-label">${escapeHtml(option.label)}</span></div>`)
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

    const parts = []
    for (let i = 0; i < labels.length; i++) {
      parts.push(`<button
        class="select__tag"
        part="tag"
        type="button"
        data-value="${escapeAttribute(selectedValues[i])}"
        aria-label="Remove ${escapeAttribute(labels[i])}"
        ${this.disabled ? 'disabled' : ''}
      ><span class="select__tag-label">${escapeHtml(labels[i])}</span><span class="select__tag-remove" aria-hidden="true"><svg viewBox="0 0 16 16" stroke-width="1.8" stroke-linecap="round" focusable="false"><path d="M4.5 4.5l7 7m0-7-7 7"></path></svg></span></button>`)
    }

    return parts.join('')
  }

  handleControlClick() {
    if (this.disabled) {
      return
    }

    this.open = !this.open
  }

  handleTagClick(event) {
    const tag = event.target?.closest?.('.select__tag')
    if (!tag) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    if (this.disabled) {
      return
    }

    this.toggleValue(tag.dataset.value)
    requestAnimationFrame(() => this.focus())
  }

  handleSelectionCountPointerEnter(event) {
    if (event.pointerType === 'touch' || !supportsHover() || !this.multiple || this.disabled) {
      return
    }

    this.updateTagOverflow()
    if (this._tagsOverflow) {
      this.setTagsExpanded(true)
    }
  }

  handleSelectionCountClick(event) {
    event.preventDefault()
    event.stopPropagation()
    const pointerType = this._selectionCountPointerType
    this._selectionCountPointerType = ''
    if (!this.multiple || this.disabled || (supportsHover() && pointerType === 'mouse')) {
      return
    }

    this.updateTagOverflow()
    if (this._tagsOverflow) {
      this.setTagsExpanded(!this._tagsExpanded)
    }
  }

  handleSelectionCountKeyDown(event) {
    if (event.key === 'Escape' && this._tagsExpanded) {
      this.setTagsExpanded(false, true)
      event.preventDefault()
    }
  }

  handleTagPreviewPointerLeave() {
    if (!this.open) {
      this.setTagsExpanded(false)
    }
  }

  handleTagPreviewFocusOut() {
    requestAnimationFrame(() => {
      const select = this.shadowRoot?.querySelector('.select')
      if (!this.open && select && !select.contains(this.shadowRoot?.activeElement)) {
        this.setTagsExpanded(false)
      }
    })
  }

  setTagsExpanded(expanded, force = false) {
    const nextExpanded = Boolean(expanded && this.multiple && this._tagsOverflow && !this.disabled)
    if (!force && !nextExpanded && this.open) {
      return
    }

    if (this._tagsExpanded === nextExpanded) {
      this.updateTagExpansionMetrics()
      return
    }

    this._tagsExpanded = nextExpanded
    const select = this.shadowRoot?.querySelector('.select')
    if (select) {
      select.classList.toggle('select--tags-expanded', nextExpanded)
    }

    const count = this.shadowRoot?.querySelector('.select__selection-count')
    if (count) {
      const selectedCount = this.selectedValues.length
      const action = nextExpanded ? 'Hide' : 'Preview'
      count.setAttribute('aria-expanded', nextExpanded ? 'true' : 'false')
      count.setAttribute('aria-label', `${action} ${selectedCount} selected items`)
      if (this._tagsOverflow) {
        count.title = `${action} selected items`
      }
    }

    const tags = this.shadowRoot?.querySelectorAll('.select__tag') || []
    if (nextExpanded) {
      for (let i = 0; i < tags.length; i++) {
        tags[i].hidden = false
      }
    } else {
      this.scheduleTagMeasurement()
    }

    requestAnimationFrame(() => {
      const valueShell = this.shadowRoot?.querySelector('.select__value-shell')
      if (nextExpanded && valueShell) {
        valueShell.scrollTop = valueShell.scrollHeight
      }
      this.updateTagExpansionMetrics()
    })
  }

  scheduleTagMeasurement() {
    cancelAnimationFrame(this._tagMeasureFrame)
    this._tagMeasureFrame = requestAnimationFrame(() => this.updateTagOverflow())
  }

  updateTagOverflow() {
    if (!this.multiple || !this.shadowRoot) {
      this._tagsOverflow = false
      this.setTagsExpanded(false, true)
      return
    }

    const select = this.shadowRoot.querySelector('.select')
    const value = this.shadowRoot.querySelector('.select__value')
    const count = this.shadowRoot.querySelector('.select__selection-count')
    const tags = value ? value.querySelectorAll('.select__tag') : []

    if (!select || !value || tags.length === 0) {
      this._tagsOverflow = false
      select?.classList.remove('select--tags-overflow')
      if (count) {
        count.setAttribute('aria-expanded', 'false')
        count.setAttribute('aria-label', `${this.selectedValues.length} selected items`)
        count.removeAttribute('title')
      }
      this.setTagsExpanded(false, true)
      return
    }

    for (let i = 0; i < tags.length; i++) {
      tags[i].hidden = false
    }

    const gap = Number.parseFloat(getComputedStyle(value).columnGap) || 0
    const availableWidth = value.clientWidth
    let visibleCount = 0
    let usedWidth = 0

    for (let i = 0; i < tags.length; i++) {
      const nextWidth = usedWidth + (visibleCount > 0 ? gap : 0) + tags[i].offsetWidth
      if (nextWidth > availableWidth + .5) {
        break
      }
      usedWidth = nextWidth
      visibleCount += 1
    }

    const overflow = visibleCount < tags.length
    this._tagsOverflow = overflow
    select.classList.toggle('select--tags-overflow', overflow)

    if (count) {
      const expanded = this._tagsExpanded && overflow
      const selectedCount = this.selectedValues.length
      count.setAttribute('aria-expanded', expanded ? 'true' : 'false')
      if (overflow) {
        const action = expanded ? 'Hide' : 'Preview'
        count.setAttribute('aria-label', `${action} ${selectedCount} selected items`)
        count.title = `${action} selected items`
      } else {
        count.setAttribute('aria-label', `${selectedCount} selected items`)
        count.removeAttribute('title')
      }
    }

    if (!this._tagsExpanded) {
      const firstClippedIndex = Math.min(visibleCount, tags.length - 1)
      for (let i = firstClippedIndex + 1; i < tags.length; i++) {
        tags[i].hidden = true
      }
    }

    if (!overflow) {
      this.setTagsExpanded(false, true)
    } else if (this._tagsExpanded) {
      this.setTagsExpanded(true)
    } else {
      this.updateTagExpansionMetrics()
    }
  }

  updateTagExpansionMetrics() {
    const select = this.shadowRoot?.querySelector('.select')
    const control = this.getControl()
    if (!select || !control) {
      return
    }

    let expansion = 0
    if (this._tagsExpanded) {
      const selectRect = select.getBoundingClientRect()
      const controlRect = control.getBoundingClientRect()
      expansion = Math.max(0, Math.ceil(controlRect.bottom - selectRect.bottom))
    }

    select.style.setProperty('--select-tag-expansion', `${expansion}px`)
    if (this.open) {
      this.schedulePanelPosition()
    }
  }

  handleControlKeyDown(event) {
    if (this.disabled || event.target !== event.currentTarget) {
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
    this.requestRender()
    this.focus()
    dispatchComposedEvent(this, 'change')
    dispatchComposedEvent(this, 'clear')
  }

  handleSlotChange() {
    const hasPrefix = this.hasNamedSlotContent('prefix')
    const hasSuffix = this.hasNamedSlotContent('suffix')
    if (hasPrefix !== this._hasPrefix || hasSuffix !== this._hasSuffix) {
      this.requestRender()
    }
  }

  toggleValue(value) {
    const option = getOptionByValue(this.items, value)
    if (!option || option.disabled || this.disabled) {
      return
    }

    let nextValues = this.selectedValues

    if (this.multiple) {
      const index = nextValues.indexOf(value)
      if (index >= 0) {
        nextValues.splice(index, 1)
      } else {
        nextValues.push(value)
      }
      this._selectedValues = nextValues
      this.requestRender()
    } else {
      if (nextValues[0] === value) {
        this.open = false
        this.focus()
        return
      }

      nextValues = [value]
      this._selectedValues = nextValues
      this.open = false
      this.focus()
    }

    dispatchComposedEvent(this, 'change')
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

  getOptionElements() {
    return this.shadowRoot ? Array.from(this.shadowRoot.querySelectorAll('.option')) : []
  }

  focusOption(value) {
    const options = this.getOptionElements()
    for (let i = 0; i < options.length; i++) {
      if (options[i].dataset.value === value && options[i].getAttribute('aria-disabled') !== 'true') {
        options[i].focus()
        return
      }
    }
  }

  getEnabledOptionElements() {
    const options = this.getOptionElements()
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

  handleControlResize() {
    this.scheduleTagMeasurement()
    if (this.open) {
      this.schedulePanelPosition()
    }
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
    panel.style.width = `${Math.ceil(controlRect.width)}px`

    const anchorBottom = controlRect.bottom

    if (!this.hoist) {
      panel.style.left = '0px'
      panel.style.marginTop = 'var(--tot-dropdown-panel-gap, var(--tot-spacing-2x-small, .25rem))'
      panel.style.top = 'calc(100% + var(--select-tag-expansion, 0px))'
      return
    }

    const margin = 8
    const gap = 4
    const panelRect = panel.getBoundingClientRect()
    const maxLeft = Math.max(margin, window.innerWidth - panelRect.width - margin)
    let left = Math.min(Math.max(margin, controlRect.left), maxLeft)
    let top = anchorBottom + gap

    if (top + panelRect.height > window.innerHeight - margin && controlRect.top - panelRect.height - gap >= margin) {
      top = controlRect.top - panelRect.height - gap
    }

    left = Math.round(left)
    top = Math.round(Math.max(margin, Math.min(top, window.innerHeight - panelRect.height - margin)))
    panel.style.left = `${left}px`
    panel.style.marginTop = '0'
    panel.style.top = `${top}px`
  }

  syncTextVisibility(name) {
    const selector = name === 'label' ? '.label' : '.help-text'
    const element = this.shadowRoot?.querySelector(selector)
    const control = this.getControl()
    const hasContent = name === 'label'
      ? Boolean(this.label) || this.hasNamedSlotContent(name)
      : Boolean(this.helpText) || this.hasNamedSlotContent(name)

    if (element) {
      element.hidden = !hasContent
    }

    if (control) {
      const ariaAttribute = name === 'label' ? 'aria-labelledby' : 'aria-describedby'
      if (hasContent) {
        control.setAttribute(ariaAttribute, name)
      } else {
        control.removeAttribute(ariaAttribute)
      }
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

function supportsHover() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(hover: hover)').matches
}

function getRelativeOption(options, active, step) {
  if (!active || !options.includes(active)) {
    return step > 0 ? options[0] : options[options.length - 1]
  }

  const index = options.indexOf(active)
  return options[(index + step + options.length) % options.length]
}

function parseItems(value) {
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

function cloneItems(items) {
  return parseItems(items)
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

function dispatchComposedEvent(element, name) {
  element.dispatchEvent(new Event(name, {
    bubbles: true,
    composed: true,
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

function getSupportedNumber(value, supportedValues, fallback) {
  const number = Number(value)
  for (let i = 0; i < supportedValues.length; i++) {
    if (supportedValues[i] === number) {
      return number
    }
  }
  return fallback
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
