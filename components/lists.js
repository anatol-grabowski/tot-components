/**
 * Compact Components - List component
 * CompactList (handles both ordered and unordered lists)
 */

import { shadow, setText, parseJson } from './core.js'

export class CompactList extends HTMLElement {
  static get observedAttributes() {
    return ['items']
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const isOrdered = this.tagName.toLowerCase() === 'compact-ordered-list'
    const tag = isOrdered ? 'ol' : 'ul'
    const root = shadow(this, `
      :host {
        display: block;
      }

      ol, ul {
        margin: 0;
        padding-left: 22px;
      }

      li {
        padding: 2px 0;
      }
    `, `<${tag}></${tag}><slot hidden></slot>`)
    const list = root.querySelector(tag)
    const items = parseJson(this.getAttribute('items'), null)
    if (items && Array.isArray(items)) {
      for (let i = 0; i < items.length; i++) {
        const li = document.createElement('li')
        setText(li, items[i])
        list.append(li)
      }
    } else {
      const slot = document.createElement('slot')
      list.replaceWith(slot)
    }
  }
}
