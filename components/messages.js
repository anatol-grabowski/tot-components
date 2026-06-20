/**
 * Compact Components - Message components
 * CompactMessage and CompactToast
 */

import { shadow, emit, setText } from './core.js'

export class CompactMessage extends HTMLElement {
  static get observedAttributes() {
    return ['type']
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const type = this.getAttribute('type') || 'info'
    const icons = {
      info: 'ℹ',
      warning: '⚠',
      success: '✓',
      error: '✕',
    }
    const root = shadow(this, `
      :host {
        display: block;
      }

      .message {
        border: 1px solid var(--cc-border);
        border-left-width: 4px;
        border-radius: var(--cc-radius);
        padding: 7px 8px;
        display: flex;
        gap: 7px;
        align-items: center;
        background: var(--cc-blue-soft);
        border-left-color: var(--cc-blue);
      }

      .message.warning {
        background: var(--cc-orange-soft);
        border-left-color: var(--cc-orange);
      }

      .message.success {
        background: #d4f2d7; 
        border-left-color: var(--cc-green);
      }

      .message.error {
        background: var(--cc-red-soft);
        border-left-color: var(--cc-red);
      }

      .icon {
        font-weight: 700;
        width: 20px;
        height: 20px;
        font-size: 16px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
    `, `<div class="message ${type}"><span class="icon"></span><span><slot></slot></span></div>`)
    setText(root.querySelector('.icon'), icons[type] || icons.info)
  }
}

export class CompactToast extends HTMLElement {
  static get observedAttributes() {
    return ['message', 'duration', 'open']
  }

  connectedCallback() {
    this.render()
    this.syncTimer()
  }

  attributeChangedCallback() {
    this.render()
    this.syncTimer()
  }

  close() {
    this.removeAttribute('open')
    emit(this, 'close')
  }

  render() {
    const root = shadow(this, `
      :host {
        display: none;
        max-width: min(520px, calc(100vw - 24px));
        transform: translateY(16px);
        opacity: 0;
      }

      :host([open]) {
        display: block;
        animation: toast-in .2s ease-out forwards;
      }

      .toast {
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        border-radius: 12px;
        padding: 8px 16px;
        overflow-wrap: anywhere;
        pointer-events: auto;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }

      @keyframes toast-in {
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `, `<div class="toast" role="status"></div>`)
    setText(root.querySelector('.toast'), this.getAttribute('message') || this.textContent || '')
  }

  syncTimer() {
    clearTimeout(this._timer)
    if (this.hasAttribute('open')) {
      const duration = Number(this.getAttribute('duration') || 3000)
      this._timer = setTimeout(() => this.close(), duration)
    }
  }

  static show(options) {
    let container = document.getElementById('compact-toast-container')
    if (!container) {
      container = document.createElement('div')
      container.id = 'compact-toast-container'
      Object.assign(container.style, {
        position: 'fixed',
        left: '50%',
        bottom: 'max(14px, env(safe-area-inset-bottom))',
        transform: 'translateX(-50%)',
        zIndex: '2147482500',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
        pointerEvents: 'none',
      })
      document.body.append(container)
    }

    const toast = document.createElement('compact-toast')
    const opts = typeof options === 'string' ? { message: options } : options || {}
    toast.setAttribute('message', opts.message || '')
    toast.setAttribute('duration', String(opts.duration || 3000))
    container.append(toast)
    requestAnimationFrame(() => toast.setAttribute('open', ''))
    toast.addEventListener('close', () => toast.remove(), { once: true })
    return toast
  }
}
