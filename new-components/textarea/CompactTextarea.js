import { shadow, emit, nextId, setText, buttonStyle, lockDocumentScroll, unlockDocumentScroll, defineElement } from '../core.js'

export class CompactTextarea extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'value', 'placeholder', 'rows', 'disabled']
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

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const id = nextId('textarea')
    const root = shadow(this, `${buttonStyle}
      :host {
        display: block;
        max-width: 100%;
      }

      .wrap {
        display: grid;
        gap: 3px;
      }

      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      label {
        font-weight: 600;
      }

      textarea {
        min-height: 64px;
        padding: 5px 7px;
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        width: 100%;
        resize: vertical;
        transition: border-color 0.15s, box-shadow 0.15s;
      }

      textarea:focus {
        border-color: var(--cc-blue);
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.15);
        outline: none;
      }

      .mini {
        min-height: 26px;
        padding: 2px 7px;
        font-size: 12px;
      }
    `, `
      <div class="wrap">
        <div class="head">
          <label for="${id}"></label>
          <button class="btn secondary mini" type="button" aria-label="Fullscreen" title="Fullscreen"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 5V1h4M8 1h4v4M1 8v4h4M8 12h4V8"/></svg></button>
        </div>
        <textarea id="${id}"></textarea>
      </div>
    `)
    const textarea = root.querySelector('textarea')
    textarea.value = this.getAttribute('value') || ''
    textarea.placeholder = this.getAttribute('placeholder') || ''
    textarea.rows = Number(this.getAttribute('rows') || 4)
    textarea.disabled = this.hasAttribute('disabled')
    setText(root.querySelector('label'), this.getAttribute('label') || '')
    textarea.addEventListener('input', () => {
      this.setAttribute('value', textarea.value)
      emit(this, 'input', { value: textarea.value })
    })
    textarea.addEventListener('change', () => emit(this, 'change', { value: textarea.value }))
    root.querySelector('button').addEventListener('click', () => this.openFullscreen(textarea.value))
  }

  openFullscreen(initialValue) {
    const overlay = document.createElement('div')
    overlay.className = 'compact-textarea-fullscreen'
    overlay.innerHTML = `
      <style>
        .compact-textarea-fullscreen {
          position: fixed;
          inset: 0;
          background: #fff;
          z-index: 2147483000;
          display: grid;
          grid-template-rows: auto 1fr;
          font: 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        }
        .compact-textarea-fullscreen .bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          background: #f5f5f5;
          border-bottom: 1px solid #ccc;
          padding: 8px;
        }
        .compact-textarea-fullscreen textarea {
          border: 0;
          resize: none;
          width: 100%;
          height: 100%;
          padding: 10px;
          font: inherit;
          outline: 0;
        }
        .compact-textarea-fullscreen button {
          min-width: 36px;
          min-height: 32px;
          padding: 5px 8px;
          border: 1px solid #999;
          border-radius: 4px;
          background: #fff;
          font: inherit;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .compact-textarea-fullscreen button:hover {
          background: #f0f0f0;
        }
      </style>
      <div class="bar">
        <strong></strong>
        <button type="button" aria-label="Done, close fullscreen" title="Done"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 1v4H1M8 1v4h4M1 8h4v4M8  12v-4h4"/></svg></button>
      </div>
      <textarea></textarea>
    `
    overlay.querySelector('strong').textContent = this.getAttribute('label') || 'Edit text'
    const textarea = overlay.querySelector('textarea')
    textarea.value = initialValue || ''
    document.body.append(overlay)
    lockDocumentScroll()
    emit(this, 'fullscreen-open')
    const close = () => {
      this.value = textarea.value
      emit(this, 'input', { value: textarea.value })
      emit(this, 'change', { value: textarea.value })
      overlay.remove()
      unlockDocumentScroll()
      emit(this, 'fullscreen-close')
    }
    overlay.querySelector('button').addEventListener('click', close)
    textarea.focus()
  }
}

defineElement('compact-textarea', CompactTextarea)
