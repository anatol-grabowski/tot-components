import { shadow, emit, setText, parseOptions, defineElement } from '../core.js'


export class CompactHorizontalSelect extends HTMLElement {
  static get observedAttributes() {
    return ['options', 'value', 'disabled']
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
    if (oldValue === newValue) return
    if (name === 'value' && this.shadowRoot) {
      const options = parseOptions(this.getAttribute('options'))
      const btns = this.shadowRoot.querySelectorAll('button')
      if (btns.length === options.length) {
        const val = newValue || (options[0] ? options[0].value : '')
        for (let i = 0; i < options.length; i++) {
          btns[i].setAttribute('aria-pressed', String(options[i].value === val))
        }
        return
      }
    }
    this.render()
  }

  render() {
    const root = shadow(this, `
      :host {
        display: block;
        max-width: 100%;
      }

      .row {
        display: flex;
        gap: 2px;
        overflow-x: auto;
        padding: 2px 0;
        scrollbar-width: thin;
        max-width: 100%;
      }

      button {
        flex: 0 0 auto;
        border: 1px solid var(--cc-border);
        background: #fff;
        border-radius: 6px;
        min-height: 30px;
        padding: 4px 9px;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      button::after {
        display: block;
        content: attr(data-text);
        font-weight: 700;
        height: 0;
        overflow: hidden;
        visibility: hidden;
        pointer-events: none;
      }

      button:hover:not(:disabled) {
        background: #f0f0f0;
      }

      button[aria-pressed='true'] {
        background: var(--cc-blue-selected);
        border-color: var(--cc-blue);
        font-weight: 700;
      }
    `, '<div class="row" role="listbox"></div>')
    const options = parseOptions(this.getAttribute('options'))
    const value = this.getAttribute('value') || (options[0] ? options[0].value : '')
    const disabled = this.hasAttribute('disabled')
    const row = root.querySelector('.row')
    for (let i = 0; i < options.length; i++) {
      const item = options[i]
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.disabled = disabled || item.disabled
      btn.setAttribute('role', 'option')
      btn.setAttribute('aria-pressed', String(item.value === value))
      btn.dataset.text = item.label
      setText(btn, item.label)
      btn.addEventListener('click', () => {
        this.setAttribute('value', item.value)
        emit(this, 'change', { value: item.value, item })
      })
      row.append(btn)
    }
  }
}

defineElement('compact-horizontal-select', CompactHorizontalSelect)
