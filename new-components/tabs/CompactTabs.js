/**
 * Compact Components - Navigation components
 * CompactTabs
 */
import { defineElement, shadow, emit, parseOptions, setText } from '../core.js'

export class CompactTabs extends HTMLElement {
  static get observedAttributes() {
    return ['options', 'value', 'disabled']
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const root = shadow(this, `
      :host {
        display: inline-block;
        max-width: 100%;
      }
      .tabs {
        display: flex;
        gap: 2px;
        box-shadow: inset 0 -1px 0 var(--cc-border);
        overflow-x: auto;
        overflow-y: hidden;
        max-width: 100%;
        scrollbar-width: thin;
        height: 36px;
      }
      button {
        background: var(--cc-soft-bg, #f5f5f5);
        border: 1px solid var(--cc-border);
        border-radius: 4px 4px 0 0;
        height: 100%;
        padding: 0 16px;
        cursor: pointer;
        white-space: nowrap;
        position: relative;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      button::after {
        display: block;
        content: attr(data-text);
        font-weight: 600;
        height: 0;
        overflow: hidden;
        visibility: hidden;
        pointer-events: none;
      }
      button:hover:not(:disabled) {
        filter: brightness(0.95);
      }
      button[aria-selected='true'] {
        background: var(--cc-bg, #ffffff);
        border-bottom-color: var(--cc-bg, #ffffff);
        font-weight: 600;
        z-index: 1;
      }
      button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
    `, '<div class="tabs" role="tablist"></div>')

    const holder = root.querySelector('.tabs')
    const options = parseOptions(this.getAttribute('options'))
    const value = this.getAttribute('value') || (options[0] ? options[0].value : '')
    const disabled = this.hasAttribute('disabled')

    for (let i = 0; i < options.length; i++) {
      const item = options[i]
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.setAttribute('role', 'tab')
      btn.setAttribute('aria-selected', String(item.value === value))
      btn.disabled = disabled || item.disabled
      btn.dataset.text = item.label
      setText(btn, item.label)
      btn.addEventListener('click', () => {
        this.setAttribute('value', item.value)
        emit(this, 'change', { value: item.value, item })
      })
      holder.append(btn)
    }
  }
}

defineElement('compact-tabs', CompactTabs)
