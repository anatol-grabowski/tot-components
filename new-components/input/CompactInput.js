import { shadow, emit, nextId, setText, defineElement } from '../core.js'

export class CompactInput extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'value', 'type', 'placeholder', 'disabled']
  }

  get value() {
    return this.getAttribute('value') || ''
  }

  set value(value) {
    this.setAttribute('value', value)
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this._input && name === 'value' && newValue !== this._input.value) {
      this._input.value = newValue || ''
    } else if (!this._input) {
      this.render()
    }
  }

  render() {
    const id = nextId('input')
    const root = shadow(this, `
      :host {
        display: block;
        max-width: 100%;
      }

      label {
        display: grid;
        gap: 3px;
        max-width: 100%;
      }

      span {
        font-weight: 600;
      }

      input {
        min-height: 32px;
        padding: 4px 7px;
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        background: #fff;
        width: 100%;
        transition: border-color 0.15s, box-shadow 0.15s;
      }

      input:focus {
        border-color: var(--cc-blue);
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.15);
        outline: none;
      }
    `, `<label for="${id}"><span></span><input id="${id}"></label>`)
    this._input = root.querySelector('input')
    this._input.type = this.getAttribute('type') || 'text'
    this._input.value = this.getAttribute('value') || ''
    this._input.placeholder = this.getAttribute('placeholder') || ''
    this._input.disabled = this.hasAttribute('disabled')
    setText(root.querySelector('span'), this.getAttribute('label') || '')
    this._input.addEventListener('input', () => {
      this.setAttribute('value', this._input.value)
      emit(this, 'input', { value: this._input.value })
    })
    this._input.addEventListener('change', () => emit(this, 'change', { value: this._input.value }))
  }
}

defineElement('compact-input', CompactInput)
