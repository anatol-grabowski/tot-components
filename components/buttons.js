/**
 * Compact Components - Button components
 * CompactButton and CompactSplitButton
 */

import { shadow, emit, buttonStyle, setText } from './core.js'

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
    btn.addEventListener('click', () => emit(this, 'compact-click'))
  }
}

export class CompactSplitButton extends HTMLElement {
  static get observedAttributes() {
    return ['main-label', 'alt-label', 'variant', 'disabled']
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary'
    const root = shadow(this, `${buttonStyle}
      :host {
        display: inline-flex;
        max-width: 100%;
      }

      .split {
        display: inline-flex;
        max-width: 100%;
      }

      .btn:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .btn:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left-width: 0;
      }
    `, `
      <span class="split">
        <button class="btn ${variant} main" type="button"></button>
        <button class="btn secondary alt" type="button"></button>
      </span>
    `)
    const main = root.querySelector('.main')
    const alt = root.querySelector('.alt')
    main.disabled = this.hasAttribute('disabled')
    alt.disabled = this.hasAttribute('disabled')
    setText(main, this.getAttribute('main-label') || 'Save')
    setText(alt, this.getAttribute('alt-label') || 'More')
    main.addEventListener('click', () => emit(this, 'main-click'))
    alt.addEventListener('click', () => emit(this, 'alt-click'))
  }
}
