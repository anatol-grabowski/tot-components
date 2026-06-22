import { shadow, emit, setText, defineElement } from '../core.js'


export class CompactFileInput extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'accept', 'multiple']
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

      .drop {
        border: 2px dashed var(--cc-border);
        border-radius: 6px;
        background: #fafafa;
        padding: 14px;
        text-align: center;
        cursor: pointer;
        display: grid;
        gap: 4px;
      }

      .drop.dragover {
        background: var(--cc-blue-soft);
        border-color: var(--cc-blue);
      }

      .label {
        font-weight: 700;
      }

      .meta {
        color: var(--cc-muted);
        font-size: 12px;
      }

      input {
        display: none;
      }
    `, `
      <div class="drop" tabindex="0">
        <div class="label"></div>
        <div class="meta">Drop files here or click to choose</div>
        <input type="file">
      </div>
    `)
    const drop = root.querySelector('.drop')
    const input = root.querySelector('input')
    input.accept = this.getAttribute('accept') || ''
    input.multiple = this.hasAttribute('multiple')
    setText(root.querySelector('.label'), this.getAttribute('label') || 'Files')
    const handleFiles = files => {
      this.files = files
      const names = Array.from(files).map(file => file.name).join(', ')
      root.querySelector('.meta').textContent = names || 'Drop files here or click to choose'
      emit(this, 'files-change', { files: Array.from(files) })
    }
    drop.addEventListener('click', () => input.click())
    drop.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        input.click()
      }
    })
    input.addEventListener('change', () => handleFiles(input.files))
    drop.addEventListener('dragover', event => {
      event.preventDefault()
      drop.classList.add('dragover')
    })
    drop.addEventListener('dragleave', () => drop.classList.remove('dragover'))
    drop.addEventListener('drop', event => {
      event.preventDefault()
      drop.classList.remove('dragover')
      handleFiles(event.dataTransfer.files)
    })
  }
}

defineElement('compact-file-input', CompactFileInput)
