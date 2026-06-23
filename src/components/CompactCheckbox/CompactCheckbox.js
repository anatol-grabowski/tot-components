import { shadow, emit, nextId, setText } from '../core.js'

export class CompactCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'checked', 'disabled', 'indeterminate']
  }

  get checked() {
    return this.hasAttribute('checked')
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '')
    } else {
      this.removeAttribute('checked')
    }
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate')
  }

  set indeterminate(value) {
    if (value) {
      this.setAttribute('indeterminate', '')
    } else {
      this.removeAttribute('indeterminate')
    }
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const id = nextId('checkbox')
    const root = shadow(this, `
      :host {
        display: inline-block;
      }

      label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-height: 32px;
        cursor: pointer;
      }

      input {
        width: 16px;
        height: 16px;
        accent-color: var(--cc-blue);
      }

      span {
        user-select: none;
      }
    `, `
      <label for="${id}">
        <input id="${id}" type="checkbox">
        <span></span>
      </label>
    `)
    const input = root.querySelector('input')
    input.checked = this.hasAttribute('checked')
    input.disabled = this.hasAttribute('disabled')
    input.indeterminate = this.hasAttribute('indeterminate')
    setText(root.querySelector('span'), this.getAttribute('label') || this.textContent || '')
    input.addEventListener('change', () => {
      this.removeAttribute('indeterminate')
      this.checked = input.checked
      emit(this, 'change', { checked: input.checked })
    })
  }
}
