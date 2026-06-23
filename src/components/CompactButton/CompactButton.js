import { shadow, emit, buttonStyle } from '../core.js'

export class CompactButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'disabled']
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const variant = this.getAttribute('variant') || 'secondary'
    const root = shadow(this, buttonStyle, `
      <button class="btn ${variant}" type="button">
        <slot></slot>
      </button>
    `)
    const btn = root.querySelector('button')
    btn.disabled = this.hasAttribute('disabled')
  }
}
