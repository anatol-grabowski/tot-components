/**
 * Compact Components - Overlay components
 * CompactModal, CompactDialog, CompactTooltip, CompactHint
 */

import { 
  shadow, 
  emit, 
  setText, 
  buttonStyle,
  lockDocumentScroll,
  unlockDocumentScroll,
  placeLayer 
} from './core.js'

export class CompactModal extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'heading']
  }

  constructor() {
    super()
    this._locked = false
    this._historyOpen = false
    this._popping = false
    this._onKey = event => {
      if (event.key === 'Escape' && this.hasAttribute('open')) {
        this.close()
      }
    }
    this._onPop = () => {
      if (this.hasAttribute('open')) {
        this._popping = true
        this.removeAttribute('open')
        this._popping = false
      }
    }
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.unlock()
    document.removeEventListener('keydown', this._onKey)
    window.removeEventListener('popstate', this._onPop)
  }

  attributeChangedCallback() {
    this.render()
    this.syncOpen()
  }

  open() {
    this.setAttribute('open', '')
  }

  close() {
    this.removeAttribute('open')
  }

  render() {
    const root = shadow(this, `
      :host {
        position: fixed;
        inset: 0;
        z-index: 2147482000;
        display: none;
      }

      :host([open]) {
        display: block;
      }

      .backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, .28);
        display: grid;
        place-items: center;
        padding: 16px;
      }

      .modal {
        width: min(720px, 100%);
        max-height: min(760px, calc(100vh - 32px));
        background: #fff;
        border: 1px solid var(--cc-border-strong);
        border-radius: 8px;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr) auto;
        box-shadow: 0 12px 40px rgba(0, 0, 0, .20);
      }

      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 8px 10px;
        background: var(--cc-soft-bg);
        border-bottom: 1px solid var(--cc-border);
      }

      h2 {
        margin: 0;
        font-size: 15px;
      }

      .close {
        width: 32px;
        height: 32px;
        border: 1px solid var(--cc-border-strong);
        background: #fff;
        border-radius: var(--cc-radius);
        cursor: pointer;
      }

      .body {
        overflow: auto;
        padding: 10px;
      }

      .footer {
        border-top: 1px solid var(--cc-border);
        background: var(--cc-softer-bg);
        padding: 8px 10px;
      }

      @media (max-width: 640px) {
        .backdrop {
          padding: 0;
        }

        .modal {
          width: 100%;
          height: 100%;
          max-height: 100%;
          border-radius: 0;
          border: 0;
        }
      }
    `, `
      <div class="backdrop" part="backdrop">
        <section class="modal" role="dialog" aria-modal="true">
          <header class="head">
            <h2></h2>
            <button class="close" type="button" aria-label="Close">✕</button>
          </header>
          <div class="body"><slot></slot></div>
          <footer class="footer"><slot name="footer"></slot></footer>
        </section>
      </div>
    `)
    setText(root.querySelector('h2'), this.getAttribute('heading') || '')
    root.querySelector('.close').addEventListener('click', () => this.close())
    root.querySelector('.backdrop').addEventListener('click', event => {
      if (event.target === root.querySelector('.backdrop')) {
        this.close()
      }
    })
  }

  syncOpen() {
    if (this.hasAttribute('open')) {
      this.lock()
      document.addEventListener('keydown', this._onKey)
      window.addEventListener('popstate', this._onPop)
      if (!this._historyOpen && !this._popping) {
        history.pushState({ compactModal: true }, '')
        this._historyOpen = true
      }
      emit(this, 'open')
    } else {
      this.unlock()
      document.removeEventListener('keydown', this._onKey)
      window.removeEventListener('popstate', this._onPop)
      if (this._historyOpen && !this._popping) {
        this._historyOpen = false
        history.back()
      } else {
        this._historyOpen = false
      }
      emit(this, 'close')
    }
  }

  lock() {
    if (!this._locked) {
      lockDocumentScroll()
      this._locked = true
    }
  }

  unlock() {
    if (this._locked) {
      unlockDocumentScroll()
      this._locked = false
    }
  }
}

export class CompactDialog extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'heading', 'message', 'confirm-label', 'cancel-label', 'danger']
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  open() {
    this.setAttribute('open', '')
  }

  close() {
    this.removeAttribute('open')
    emit(this, 'close')
  }

  render() {
    const root = shadow(this, `${buttonStyle}
      :host {
        position: fixed;
        inset: 0;
        z-index: 2147482100;
        display: none;
      }

      :host([open]) {
        display: grid;
        place-items: center;
        background: rgba(0, 0, 0, .25);
        padding: 16px;
      }

      .box {
        width: min(420px, 100%);
        background: #fff;
        border: 1px solid var(--cc-border-strong);
        border-radius: 8px;
        box-shadow: 0 10px 34px rgba(0, 0, 0, .18);
      }

      .head {
        padding: 8px 10px;
        background: var(--cc-soft-bg);
        border-bottom: 1px solid var(--cc-border);
        font-weight: 700;
      }

      .body {
        padding: 10px;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 6px;
        padding: 8px 10px;
        background: var(--cc-softer-bg);
        border-top: 1px solid var(--cc-border);
      }
    `, `
      <section class="box" role="dialog" aria-modal="true">
        <div class="head"></div>
        <div class="body"><slot></slot><span class="message"></span></div>
        <div class="actions">
          <button class="btn secondary cancel" type="button"></button>
          <button class="btn confirm" type="button"></button>
        </div>
      </section>
    `)
    setText(root.querySelector('.head'), this.getAttribute('heading') || 'Confirm')
    setText(root.querySelector('.message'), this.getAttribute('message') || '')
    setText(root.querySelector('.cancel'), this.getAttribute('cancel-label') || 'Cancel')
    setText(root.querySelector('.confirm'), this.getAttribute('confirm-label') || 'OK')
    root.querySelector('.confirm').className = `btn confirm ${this.hasAttribute('danger') ? 'danger' : 'primary'}`
    root.querySelector('.cancel').addEventListener('click', () => {
      emit(this, 'cancel')
      this.close()
    })
    root.querySelector('.confirm').addEventListener('click', () => {
      emit(this, 'confirm')
      this.close()
    })
    this.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        emit(this, 'cancel')
        this.close()
      }
    })
  }
}

export class CompactTooltip extends HTMLElement {
  static get observedAttributes() {
    return ['text', 'open-on-click']
  }

  constructor() {
    super()
    this._open = false
    this._pointer = null
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.removeLayer()
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

      .trigger {
        display: inline-block;
        max-width: 100%;
      }
    `, '<span class="trigger" tabindex="0"><slot></slot></span><slot name="content" hidden></slot>')
    const trigger = root.querySelector('.trigger')
    const openOnClick = this.hasAttribute('open-on-click')
    
    trigger.addEventListener('mouseenter', event => {
      if (!openOnClick) this.show(event)
    })
    trigger.addEventListener('mouseleave', () => {
      if (!openOnClick) this.hide()
    })
    trigger.addEventListener('focus', event => {
      if (!openOnClick) this.show(event)
    })
    trigger.addEventListener('blur', () => {
      if (!openOnClick) this.hide()
    })
    trigger.addEventListener('click', event => {
      if (openOnClick) {
        event.preventDefault()
        if (this._open) {
          this.hide(true)
        } else {
          this.show(event)
        }
      }
    })
    
    // Close when clicking outside
    if (openOnClick) {
      document.addEventListener('click', (event) => {
        if (this._open && !this.contains(event.target) && this._layer && !this._layer.contains(event.target)) {
          this.hide(true)
        }
      })
    }
  }

  show(event) {
    if (!this._layer) {
      this._layer = document.createElement('div')
      this._layer.className = 'compact-tooltip-layer'
      this._layer.innerHTML = `
        <style>
          .compact-tooltip-layer {
            position: fixed;
            z-index: 2147482600;
            max-width: min(360px, calc(100vw - 16px));
            background: #fff;
            border: 1px solid #999;
            border-radius: 6px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, .18);
            padding: 8px;
            font: 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            overflow-wrap: anywhere;
          }
          .compact-tooltip-layer h4 {
            margin: 0 0 4px;
            font-size: 13px;
          }
          .compact-tooltip-layer .muted {
            color: #666;
          }
        </style>
        <div class="content"></div>
      `
      document.body.append(this._layer)
    }
    const content = this._layer.querySelector('.content')
    content.innerHTML = ''
    const slotted = this.querySelector('[slot="content"]')
    if (slotted) {
      content.append(slotted.cloneNode(true))
    } else {
      setText(content, this.getAttribute('text') || '')
    }
    this._layer.style.visibility = 'hidden'
    this._layer.style.display = 'block'
    requestAnimationFrame(() => {
      const rect = this.shadowRoot.querySelector('.trigger').getBoundingClientRect()
      const gap = 8
      const margin = 8
      const width = this._layer.offsetWidth
      const height = this._layer.offsetHeight
      let left = rect.left + (rect.width - width) / 2
      let top = rect.bottom + gap
      if (top + height + margin > window.innerHeight) {
        top = Math.max(margin, rect.top - height - gap)
      }
      left = Math.min(Math.max(margin, left), window.innerWidth - width - margin)
      this._layer.style.left = `${left}px`
      this._layer.style.top = `${top}px`
      this._layer.style.visibility = 'visible'
    })
    this._open = true
    emit(this, 'tooltip-open')
  }

  hide(force) {
    if (this._layer && (force || !this.hasAttribute('open-on-click'))) {
      this._layer.style.display = 'none'
      this._open = false
      emit(this, 'tooltip-close')
    }
  }

  removeLayer() {
    if (this._layer) {
      this._layer.remove()
      this._layer = null
    }
  }
}

export class CompactHint extends HTMLElement {
  static get observedAttributes() {
    return ['text']
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    if (this._layer) {
      this._layer.remove()
    }
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
    `, '<span class="trigger"><slot></slot></span>')
    const trigger = root.querySelector('.trigger')
    trigger.addEventListener('mousemove', event => this.show(event))
    trigger.addEventListener('mouseleave', () => this.hide())
    trigger.addEventListener('focus', event => this.show(event))
    trigger.addEventListener('blur', () => this.hide())
  }

  show(event) {
    if (!this._layer) {
      this._layer = document.createElement('div')
      this._layer.className = 'compact-hint-layer'
      this._layer.style.cssText = 'position:fixed;z-index:2147482550;max-width:min(280px,calc(100vw - 16px));background:#333;color:#fff;border-radius:4px;padding:5px 7px;font:12px -apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif;pointer-events:none;overflow-wrap:anywhere;'
      document.body.append(this._layer)
    }
    setText(this._layer, this.getAttribute('text') || '')
    this._layer.style.visibility = 'hidden'
    this._layer.style.display = 'block'
    requestAnimationFrame(() => {
      const rect = this.shadowRoot.querySelector('.trigger').getBoundingClientRect()
      // Position with 18px offset from cursor instead of default 8px
      const pointer = event && event.clientX ? {
        clientX: event.clientX,
        clientY: event.clientY
      } : null
      if (pointer) {
        const gap = 18
        const margin = 8
        const width = this._layer.offsetWidth
        const height = this._layer.offsetHeight
        let left = pointer.clientX + gap
        let top = pointer.clientY + gap
        
        if (left + width + margin > window.innerWidth) {
          left = Math.max(margin, pointer.clientX - width - gap)
        }
        if (top + height + margin > window.innerHeight) {
          top = Math.max(margin, pointer.clientY - height - gap)
        }
        
        this._layer.style.left = `${Math.min(Math.max(margin, left), Math.max(margin, window.innerWidth - width - margin))}px`
        this._layer.style.top = `${Math.min(Math.max(margin, top), Math.max(margin, window.innerHeight - height - margin))}px`
      } else {
        placeLayer(rect, this._layer, null)
      }
      this._layer.style.visibility = 'visible'
    })
  }

  hide() {
    if (this._layer) {
      this._layer.style.display = 'none'
    }
  }
}
