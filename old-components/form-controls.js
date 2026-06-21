/**
 * Compact Components - Form control components
 * CompactCheckbox, CompactInput, CompactTextarea, CompactSelect, CompactDropdown,
 * CompactHorizontalSelect, CompactFileInput, CompactTagSelector
 */

import { 
  shadow, 
  emit, 
  nextId, 
  setText, 
  parseOptions, 
  parseJson,
  buttonStyle,
  lockDocumentScroll,
  unlockDocumentScroll 
} from './core.js'

export class CompactCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'checked', 'disabled', 'indeterminate']
  }

  get checked() {
    return this.hasAttribute('checked')
  }

  set checked(value) {
    if (value) {
      this.setAttribute('checked', '')
    } else {
      this.removeAttribute('checked')
    }
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate')
  }

  set indeterminate(value) {
    if (value) {
      this.setAttribute('indeterminate', '')
    } else {
      this.removeAttribute('indeterminate')
    }
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const id = nextId('checkbox')
    const root = shadow(this, `
      :host {
        display: inline-block;
      }

      label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-height: 32px;
        cursor: pointer;
      }

      input {
        width: 16px;
        height: 16px;
        accent-color: var(--cc-blue);
      }

      span {
        user-select: none;
      }
    `, `
      <label for="${id}">
        <input id="${id}" type="checkbox">
        <span></span>
      </label>
    `)
    const input = root.querySelector('input')
    input.checked = this.hasAttribute('checked')
    input.disabled = this.hasAttribute('disabled')
    input.indeterminate = this.hasAttribute('indeterminate')
    setText(root.querySelector('span'), this.getAttribute('label') || this.textContent || '')
    input.addEventListener('change', () => {
      this.removeAttribute('indeterminate')
      this.checked = input.checked
      emit(this, 'change', { checked: input.checked })
    })
  }
}

export class CompactInput extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'value', 'type', 'placeholder', 'disabled']
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
    if (this._input && name === 'value' && newValue !== this._input.value) {
      this._input.value = newValue || ''
    } else if (!this._input) {
      this.render()
    }
  }

  render() {
    const id = nextId('input')
    const root = shadow(this, `
      :host {
        display: block;
        max-width: 100%;
      }

      label {
        display: grid;
        gap: 3px;
        max-width: 100%;
      }

      span {
        font-weight: 600;
      }

      input {
        min-height: 32px;
        padding: 4px 7px;
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        background: #fff;
        width: 100%;
        transition: border-color 0.15s, box-shadow 0.15s;
      }

      input:focus {
        border-color: var(--cc-blue);
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.15);
        outline: none;
      }
    `, `<label for="${id}"><span></span><input id="${id}"></label>`)
    this._input = root.querySelector('input')
    this._input.type = this.getAttribute('type') || 'text'
    this._input.value = this.getAttribute('value') || ''
    this._input.placeholder = this.getAttribute('placeholder') || ''
    this._input.disabled = this.hasAttribute('disabled')
    setText(root.querySelector('span'), this.getAttribute('label') || '')
    this._input.addEventListener('input', () => {
      this.setAttribute('value', this._input.value)
      emit(this, 'input', { value: this._input.value })
    })
    this._input.addEventListener('change', () => emit(this, 'change', { value: this._input.value }))
  }
}

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

export class CompactSelect extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'options', 'value', 'placeholder', 'disabled']
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
    const id = nextId('select')
    const root = shadow(this, `
      :host {
        display: block;
        max-width: 100%;
      }

      label {
        display: grid;
        gap: 3px;
        max-width: 100%;
      }

      span {
        font-weight: 600;
      }

      select {
        min-height: 32px;
        padding: 4px 28px 4px 7px;
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        background: #fff;
        max-width: 100%;
        transition: border-color 0.15s, box-shadow 0.15s;
      }

      select:focus {
        border-color: var(--cc-blue);
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.15);
        outline: none;
      }
    `, `<label for="${id}"><span></span><select id="${id}"></select></label>`)
    setText(root.querySelector('span'), this.getAttribute('label') || '')
    buildSelect(this, root.querySelector('select'))
  }
}

export class CompactDropdown extends HTMLElement {
  static get observedAttributes() {
    return ['options', 'value', 'placeholder', 'disabled']
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

      select {
        min-height: 32px;
        padding: 4px 28px 4px 7px;
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        background: #fff;
        max-width: 100%;
        transition: border-color 0.15s, box-shadow 0.15s;
      }

      select:focus {
        border-color: var(--cc-blue);
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.15);
        outline: none;
      }
    `, '<select></select>')
    buildSelect(this, root.querySelector('select'))
  }
}

function buildSelect(owner, select) {
  select.disabled = owner.hasAttribute('disabled')
  select.innerHTML = ''
  const placeholder = owner.getAttribute('placeholder')
  if (placeholder) {
    const option = document.createElement('option')
    option.value = ''
    setText(option, placeholder)
    select.append(option)
  }
  const options = parseOptions(owner.getAttribute('options'))
  for (let i = 0; i < options.length; i++) {
    const item = options[i]
    const option = document.createElement('option')
    option.value = item.value
    option.disabled = item.disabled
    setText(option, item.label)
    select.append(option)
  }
  select.value = owner.getAttribute('value') || ''
  select.addEventListener('change', () => {
    owner.setAttribute('value', select.value)
    const item = options.find(option => option.value === select.value) || null
    emit(owner, 'change', { value: select.value, item })
  })
}

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

export class CompactTagSelector extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'placeholder', 'value', 'disabled']
  }

  constructor() {
    super()
    this._tags = []
    this._lastSpaceAt = 0
  }

  get value() {
    return this._tags.slice()
  }

  set value(value) {
    this._tags = Array.isArray(value) ? value.map(String) : []
    this.setAttribute('value', JSON.stringify(this._tags))
    this.render()
  }

  connectedCallback() {
    this._tags = parseJson(this.getAttribute('value'), [])
    this.render()
  }

  attributeChangedCallback(name) {
    if (name === 'value') {
      this._tags = parseJson(this.getAttribute('value'), [])
    }
    this.render()
  }

  render() {
    const root = shadow(this, `
      :host {
        display: block;
        max-width: 100%;
      }

      label {
        display: grid;
        gap: 3px;
      }

      .label {
        font-weight: 700;
      }

      .box {
        min-height: 36px;
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        background: #fff;
        display: flex;
        align-items: center;
        gap: 3px;
        padding: 3px;
        flex-wrap: wrap;
        cursor: text;
        transition: border-color 0.15s, box-shadow 0.15s;
      }

      .box:focus-within {
        border-color: var(--cc-blue);
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.15);
      }

      .tag {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        border: 1px solid var(--cc-border);
        border-radius: 999px;
        background: var(--cc-blue-soft);
        padding: 2px 5px 2px 7px;
        max-width: 100%;
      }

      .tag span {
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 180px;
      }

      .remove {
        border: 0;
        background: transparent;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.1s;
      }

      .tag:hover .remove {
        opacity: 1;
        pointer-events: auto;
      }

      .remove:focus-visible {
        opacity: 1;
        pointer-events: auto;
      }

      input {
        flex: 1 1 120px;
        min-width: 80px;
        border: 0;
        outline: 0;
        min-height: 28px;
        background: transparent;
      }
    `, `
      <label>
        <span class="label"></span>
        <span class="box"></span>
      </label>
    `)
    setText(root.querySelector('.label'), this.getAttribute('label') || '')
    const box = root.querySelector('.box')
    for (let i = 0; i < this._tags.length; i++) {
      const tag = document.createElement('span')
      tag.className = 'tag'
      const text = document.createElement('span')
      setText(text, this._tags[i])
      const remove = document.createElement('button')
      remove.type = 'button'
      remove.className = 'remove'
      remove.setAttribute('aria-label', `Remove ${this._tags[i]}`)
      setText(remove, '×')
      remove.addEventListener('click', () => this.removeTag(i))
      tag.append(text, remove)
      box.append(tag)
    }
    const input = document.createElement('input')
    input.placeholder = this.getAttribute('placeholder') || 'Add tag'
    input.disabled = this.hasAttribute('disabled')
    input.addEventListener('keydown', event => this.handleKey(event, input))
    input.addEventListener('input', () => emit(this, 'input', { value: this.value }))
    box.append(input)
    box.addEventListener('click', () => input.focus())
  }

  handleKey(event, input) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.addTag(input.value)
      requestAnimationFrame(() => {
        const inp = this.shadowRoot && this.shadowRoot.querySelector('input')
        if (inp) inp.focus()
      })
      return
    }
    if (event.key === ' ' && input.value.trim()) {
      const now = performance.now()
      if (now - this._lastSpaceAt < 500) {
        event.preventDefault()
        this.addTag(input.value)
        requestAnimationFrame(() => {
          const inp = this.shadowRoot && this.shadowRoot.querySelector('input')
          if (inp) inp.focus()
        })
      }
      this._lastSpaceAt = now
    }
    if (event.key === 'Backspace' && input.value === '' && this._tags.length) {
      this.removeTag(this._tags.length - 1)
      requestAnimationFrame(() => {
        const inp = this.shadowRoot && this.shadowRoot.querySelector('input')
        if (inp) inp.focus()
      })
    }
  }

  addTag(value) {
    const tag = String(value || '').trim()
    if (!tag || this._tags.includes(tag)) {
      return
    }
    this._tags.push(tag)
    this.setAttribute('value', JSON.stringify(this._tags))
    emit(this, 'change', { value: this.value })
  }

  removeTag(index) {
    this._tags.splice(index, 1)
    this.setAttribute('value', JSON.stringify(this._tags))
    emit(this, 'change', { value: this.value })
  }
}
