const checkboxStyle = `
  :host {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .checkbox-wrap {
    display: grid;
    gap: var(--tot-spacing-2x-small, .25rem);
    max-width: 100%;
  }

  .checkbox {
    --toggle-size: var(--tot-toggle-size-medium, 1.125rem);
    --checkbox-font-size: var(--tot-input-font-size-medium, .875rem);

    color: var(--tot-input-label-color, var(--tot-input-color, #1e293b));
    cursor: pointer;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--checkbox-font-size);
    font-weight: var(--tot-input-font-weight, 400);
    letter-spacing: var(--tot-input-letter-spacing, normal);
    line-height: var(--toggle-size);
    max-width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .checkbox--small {
    --toggle-size: var(--tot-toggle-size-small, 1rem);
    --checkbox-font-size: var(--tot-input-font-size-small, .8125rem);
  }

  .checkbox--large {
    --toggle-size: var(--tot-toggle-size-large, 1.375rem);
    --checkbox-font-size: var(--tot-input-font-size-large, 1rem);
  }

  .checkbox__input {
    appearance: none;
    border: 0;
    height: var(--toggle-size);
    margin: 0;
    opacity: 0;
    padding: 0;
    pointer-events: none;
    position: absolute;
    width: var(--toggle-size);
  }

  .checkbox__control {
    align-items: center;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-checkbox-border-radius, 3px);
    color: var(--tot-color-neutral-0, #fff);
    display: inline-flex;
    flex: 0 0 auto;
    height: var(--toggle-size);
    justify-content: center;
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) color,
      var(--tot-transition-fast, 150ms) box-shadow;
    width: var(--toggle-size);
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: none;
    font-size: calc(var(--toggle-size) * .78);
    font-weight: var(--tot-font-weight-bold, 700);
    line-height: 1;
  }

  .checkbox__label {
    margin-inline-start: .5em;
    max-width: 100%;
    min-width: 0;
    overflow-wrap: anywhere;
    user-select: none;
    -webkit-user-select: none;
  }

  .checkbox__help-text {
    color: var(--tot-input-help-text-color, var(--tot-color-neutral-500, #64748b));
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-help-text-font-size-medium, .8125rem);
    line-height: 1.35;
    margin-inline-start: calc(var(--toggle-size) + .5em);
    max-width: 100%;
    overflow-wrap: anywhere;
  }

  .checkbox--small + .checkbox__help-text {
    font-size: var(--tot-input-help-text-font-size-small, .75rem);
  }

  .checkbox--large + .checkbox__help-text {
    font-size: var(--tot-input-help-text-font-size-large, .875rem);
  }

  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    background: var(--tot-input-background-color-hover, #fff);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
  }

  .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    background: var(--tot-color-primary-600, #0284c7);
    border-color: var(--tot-color-primary-600, #0284c7);
  }

  .checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    background: var(--tot-color-primary-500, #0ea5e9);
    border-color: var(--tot-color-primary-500, #0ea5e9);
  }

  .checkbox--checked .checkbox__checked-icon,
  .checkbox--indeterminate:not(.checkbox--checked) .checkbox__indeterminate-icon {
    display: inline-block;
  }

  .checkbox--disabled {
    cursor: not-allowed;
    opacity: .55;
  }

  .checkbox--disabled .checkbox__label {
    color: var(--tot-input-color-disabled, var(--tot-color-neutral-700, #334155));
  }

  .checkbox__help-text:empty {
    display: none;
  }
`

const sizes = ['small', 'medium', 'large']

export class TotCheckbox extends HTMLElement {
  static get observedAttributes() {
    return [
      'checked',
      'indeterminate',
      'disabled',
      'size',
      'help-text',
      'label',
    ]
  }

  get checked() {
    return this.hasAttribute('checked')
  }

  set checked(value) {
    this.toggleBooleanAttribute('checked', value)
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate')
  }

  set indeterminate(value) {
    this.toggleBooleanAttribute('indeterminate', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    this.toggleBooleanAttribute('disabled', value)
  }

  get size() {
    return getSupportedValue(this.getAttribute('size'), sizes, 'medium')
  }

  set size(value) {
    this.setAttribute('size', getSupportedValue(value, sizes, 'medium'))
  }

  get helpText() {
    return this.getAttribute('help-text') || ''
  }

  set helpText(value) {
    if (value === null || value === undefined) {
      this.removeAttribute('help-text')
    } else {
      this.setAttribute('help-text', String(value))
    }
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  click() {
    const input = this.getInput()
    if (input) {
      input.click()
    }
  }

  focus(options) {
    const input = this.getInput()
    if (input) {
      input.focus(options)
    }
  }

  blur() {
    const input = this.getInput()
    if (input) {
      input.blur()
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const checked = this.checked
    const indeterminate = this.indeterminate
    const disabled = this.disabled
    const size = this.size
    const label = this.getAttribute('label') || ''
    const helpText = this.helpText
    const classes = [
      'checkbox',
      `checkbox--${size}`,
    ]

    if (checked) {
      classes.push('checkbox--checked')
    }

    if (indeterminate) {
      classes.push('checkbox--indeterminate')
    }

    if (disabled) {
      classes.push('checkbox--disabled')
    }

    root.innerHTML = `<style>${checkboxStyle}</style>
      <div class="checkbox-wrap" part="base">
        <label class="${escapeAttribute(classes.join(' '))}">
          <input
            class="checkbox__input"
            type="checkbox"
            aria-checked="${indeterminate ? 'mixed' : String(checked)}"
            ${checked ? 'checked' : ''}
            ${disabled ? 'disabled' : ''}
          >
          <span class="checkbox__control" part="control">
            <span class="checkbox__checked-icon" part="checked-icon" aria-hidden="true">✓</span>
            <span class="checkbox__indeterminate-icon" part="indeterminate-icon" aria-hidden="true">−</span>
          </span>
          <span class="checkbox__label" part="label"><slot>${escapeHtml(label)}</slot></span>
        </label>
        <span class="checkbox__help-text" part="form-control-help-text"><slot name="help-text">${escapeHtml(helpText)}</slot></span>
      </div>
    `

    const input = root.querySelector('input')
    input.indeterminate = indeterminate
    input.addEventListener('input', () => {
      emit(this, 'input', this.getEventDetail(input))
    })
    input.addEventListener('change', () => {
      this.indeterminate = false
      this.checked = input.checked
      emit(this, 'change', this.getEventDetail(input))
    })
  }

  getInput() {
    return this.shadowRoot?.querySelector('input')
  }

  getEventDetail(input) {
    return {
      checked: input.checked,
      indeterminate: input.indeterminate,
      size: this.size,
    }
  }

  toggleBooleanAttribute(name, value) {
    if (value === true || value === '' || value === name) {
      this.setAttribute(name, '')
    } else {
      this.removeAttribute(name)
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
