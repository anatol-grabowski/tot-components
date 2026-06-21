/**
 * Compact Components - Layout components
 * CompactBox
 */

import { shadow, emit, setText } from './core.js'

export class CompactBox extends HTMLElement {
  static get observedAttributes() {
    return ['heading', 'meta', 'selected']
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
        display: block;
        max-width: 100%;
      }

      .box {
        border: 1px solid var(--cc-border);
        border-radius: 8px;
        background: #fff;
        padding: 8px;
        display: grid;
        gap: 4px;
        cursor: default;
        max-width: 100%;
      }

      .box.selected {
        background: var(--cc-blue-soft);
        border-color: var(--cc-blue);
      }

      .head {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }

      .heading {
        font-weight: 700;
        overflow-wrap: anywhere;
      }

      .meta {
        color: var(--cc-muted);
        font-size: 12px;
        white-space: nowrap;
      }

      .body {
        color: var(--cc-text);
        overflow-wrap: anywhere;
      }
    `, `
      <article class="box" tabindex="0">
        <div class="head">
          <div class="heading"></div>
          <div class="meta"></div>
        </div>
        <div class="body"><slot></slot></div>
      </article>
    `)
    const box = root.querySelector('.box')
    box.classList.toggle('selected', this.hasAttribute('selected'))
    setText(root.querySelector('.heading'), this.getAttribute('heading') || '')
    setText(root.querySelector('.meta'), this.getAttribute('meta') || '')
    box.addEventListener('click', () => emit(this, 'box-click'))
    box.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        emit(this, 'box-click')
      }
    })
  }
}
