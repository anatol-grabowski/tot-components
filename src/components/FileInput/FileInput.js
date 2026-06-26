const fileInputStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .file-control {
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    gap: var(--tot-spacing-2x-small, .25rem);
    max-width: 100%;
    min-width: 0;
  }

  .label {
    color: var(--tot-input-label-color, inherit);
    font-size: var(--tot-input-label-font-size-medium, .875rem);
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .label:empty {
    display: none;
  }

  .dropzone {
    align-items: center;
    --dropzone-border-color: var(--tot-input-border-color, #cbd5e1);
    --dropzone-border-size: var(--tot-file-input-border-width, 2px);
    --dropzone-dash-size: var(--tot-file-input-dash-size, .625rem);
    --dropzone-dash-repeat: var(--tot-file-input-dash-repeat, 1.375rem);

    background: var(--tot-file-input-background-color, var(--tot-navbar-background-color, var(--tot-input-background-color, #fff)));
    border: 0;
    border-radius: var(--tot-border-radius-large, 8px);
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: grid;
    gap: var(--tot-spacing-x-small, .5rem);
    justify-items: center;
    max-width: 100%;
    min-height: var(--tot-file-input-min-height, 5.5rem);
    min-width: 0;
    padding: var(--tot-file-input-padding, .75rem);
    position: relative;
    text-align: center;
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) color,
      var(--tot-transition-fast, 150ms) box-shadow;
  }

  .dropzone::before {
    background-image:
      repeating-linear-gradient(90deg, var(--dropzone-border-color) 0 var(--dropzone-dash-size), transparent var(--dropzone-dash-size) var(--dropzone-dash-repeat)),
      repeating-linear-gradient(90deg, var(--dropzone-border-color) 0 var(--dropzone-dash-size), transparent var(--dropzone-dash-size) var(--dropzone-dash-repeat)),
      repeating-linear-gradient(0deg, var(--dropzone-border-color) 0 var(--dropzone-dash-size), transparent var(--dropzone-dash-size) var(--dropzone-dash-repeat)),
      repeating-linear-gradient(0deg, var(--dropzone-border-color) 0 var(--dropzone-dash-size), transparent var(--dropzone-dash-size) var(--dropzone-dash-repeat));
    background-position: 0 0, 0 100%, 0 0, 100% 0;
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size:
      var(--dropzone-dash-repeat) var(--dropzone-border-size),
      var(--dropzone-dash-repeat) var(--dropzone-border-size),
      var(--dropzone-border-size) var(--dropzone-dash-repeat),
      var(--dropzone-border-size) var(--dropzone-dash-repeat);
    border-radius: inherit;
    content: '';
    inset: 0;
    pointer-events: none;
    position: absolute;
  }

  .dropzone:hover:not(.dropzone--disabled),
  .dropzone--drag-active:not(.dropzone--disabled) {
    background: var(--tot-file-input-background-color-hover, var(--tot-navbar-background-color, var(--tot-input-background-color-hover, #f8fafc)));
    --dropzone-border-color: var(--tot-color-primary-600, #0284c7);
  }

  .dropzone:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .dropzone--disabled {
    background: var(--tot-file-input-background-color-disabled, var(--tot-input-background-color-disabled, #f1f5f9));
    --dropzone-border-color: var(--tot-input-border-color-disabled, #cbd5e1);
    color: var(--tot-input-color-disabled, #64748b);
    cursor: not-allowed;
    opacity: .7;
  }

  .dropzone__icon {
    color: var(--tot-input-icon-color, #64748b);
    align-items: center;
    display: none;
    font-size: 1.25rem;
    justify-content: center;
    line-height: 1;
  }

  .dropzone__icon--has-content {
    display: inline-flex;
  }

  .dropzone__title {
    font-size: var(--tot-input-font-size-medium, .875rem);
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: 1.35;
  }

  .dropzone__hint,
  .help-text,
  .file-list__meta {
    color: var(--tot-input-help-text-color, var(--tot-color-neutral-600, #475569));
    font-size: var(--tot-input-help-text-font-size-medium, .8125rem);
    line-height: 1.35;
  }

  .file-native-input {
    display: none;
  }

  .file-actions {
    align-items: center;
    display: inline-flex;
    gap: var(--tot-spacing-x-small, .5rem);
    justify-content: center;
    max-width: 100%;
  }

  .file-button {
    -webkit-appearance: none;
    appearance: none;
    background: var(--tot-color-primary-600, #0284c7);
    border: var(--tot-input-border-width, 1px) solid var(--tot-color-primary-600, #0284c7);
    border-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
    color: var(--tot-color-neutral-0, #fff);
    cursor: pointer;
    font: inherit;
    line-height: 1;
    min-height: var(--tot-input-height-small, 1.875rem);
    padding: 0 var(--tot-input-spacing-small, .75rem);
  }

  .file-button:hover:not(:disabled) {
    background: var(--tot-color-primary-500, #0ea5e9);
    border-color: var(--tot-color-primary-500, #0ea5e9);
  }

  .file-button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .file-button:disabled {
    cursor: not-allowed;
    opacity: .6;
  }

  .file-button--neutral {
    background: var(--tot-input-background-color, #fff);
    border-color: var(--tot-input-border-color, #cbd5e1);
    color: var(--tot-input-color, #1e293b);
  }

  .file-button--neutral:hover:not(:disabled) {
    background: var(--tot-input-background-color-hover, #f8fafc);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
  }

  .file-list {
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
    border-radius: var(--tot-border-radius-medium, 4px);
    display: grid;
    gap: var(--tot-spacing-2x-small, .25rem);
    max-height: 9rem;
    max-width: 100%;
    min-width: 0;
    overflow: auto;
    padding: var(--tot-spacing-x-small, .5rem);
  }

  .file-list[hidden] {
    display: none;
  }

  .file-list__item {
    align-items: center;
    display: grid;
    gap: var(--tot-spacing-x-small, .5rem);
    grid-template-columns: minmax(0, 1fr) auto;
    min-width: 0;
  }

  .file-list__name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .help-text:empty {
    display: none;
  }
`

export class TotFileInput extends HTMLElement {
  static get observedAttributes() {
    return [
      'label',
      'help-text',
      'multiple',
      'directory',
      'disabled',
      'accept',
      'button-label',
    ]
  }

  constructor() {
    super()
    this.files = []
    this.entries = []
    this._dragDepth = 0
  }

  get label() {
    return this.getAttribute('label') || 'Files'
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  get helpText() {
    return this.getAttribute('help-text') || ''
  }

  set helpText(value) {
    setNullableAttribute(this, 'help-text', value)
  }

  get multiple() {
    return this.hasAttribute('multiple')
  }

  set multiple(value) {
    setBooleanAttribute(this, 'multiple', value)
  }

  get directory() {
    return this.hasAttribute('directory')
  }

  set directory(value) {
    setBooleanAttribute(this, 'directory', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  click() {
    this.openPicker()
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const disabled = this.disabled
    const browseLabel = this.getAttribute('button-label') || 'Choose files'
    const title = this.directory ? 'Drop files/directories' : this.multiple ? 'Drop files' : 'Drop a file'
    const hint = this.getModeHint()
    const fileListHtml = this.getFileListHtml()

    root.innerHTML = `<style>${fileInputStyle}</style>
      <div class="file-control" part="base">
        <span class="label" part="form-control-label"><slot name="label">${escapeHtml(this.label)}</slot></span>
        <div class="dropzone${disabled ? ' dropzone--disabled' : ''}" part="dropzone" tabindex="${disabled ? '-1' : '0'}" role="button" aria-disabled="${disabled ? 'true' : 'false'}">
          <input class="file-native-input" part="input" type="file" ${this.multiple || this.directory ? 'multiple' : ''} ${this.directory ? 'webkitdirectory directory' : ''} ${disabled ? 'disabled' : ''} ${this.hasAttribute('accept') ? `accept="${escapeAttribute(this.getAttribute('accept') || '')}"` : ''}>
          <span class="dropzone__icon" aria-hidden="true"><slot name="icon"></slot></span>
          <span class="dropzone__title">${escapeHtml(title)}</span>
          <span class="dropzone__hint">${escapeHtml(hint)}</span>
          <span class="file-actions">
            <button class="file-button" type="button" ${disabled ? 'disabled' : ''}>${escapeHtml(browseLabel)}</button>
            <button class="file-button file-button--neutral" type="button" data-action="clear" ${this.files.length === 0 || disabled ? 'disabled' : ''}>Clear</button>
          </span>
        </div>
        <div class="file-list" part="file-list" ${this.files.length === 0 ? 'hidden' : ''}>${fileListHtml}</div>
        <span class="help-text" part="form-control-help-text"><slot name="help-text">${escapeHtml(this.helpText)}</slot></span>
      </div>
    `

    const dropzone = root.querySelector('.dropzone')
    const input = root.querySelector('.file-native-input')
    const browseButton = root.querySelector('.file-button:not(.file-button--neutral)')
    const clearButton = root.querySelector('[data-action="clear"]')
    const icon = root.querySelector('.dropzone__icon')
    const iconSlot = root.querySelector('slot[name="icon"]')

    this.syncIconSlot(icon, iconSlot)
    iconSlot.addEventListener('slotchange', () => this.syncIconSlot(icon, iconSlot))
    input.addEventListener('change', () => this.handleInputChange(input))
    browseButton.addEventListener('click', (event) => {
      event.stopPropagation()
      this.openPicker()
    })
    clearButton.addEventListener('click', (event) => {
      event.stopPropagation()
      this.clearFiles()
    })
    dropzone.addEventListener('click', (event) => this.handleDropzoneClick(event))
    dropzone.addEventListener('keydown', (event) => this.handleDropzoneKeyDown(event))
    dropzone.addEventListener('dragenter', (event) => this.handleDragEnter(event))
    dropzone.addEventListener('dragover', (event) => this.handleDragOver(event))
    dropzone.addEventListener('dragleave', (event) => this.handleDragLeave(event))
    dropzone.addEventListener('drop', (event) => {
      void this.handleDrop(event)
    })
  }

  syncIconSlot(icon, iconSlot) {
    const nodes = iconSlot.assignedNodes({ flatten: true })
    let hasContent = false
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].nodeType === Node.ELEMENT_NODE || String(nodes[i].textContent || '').trim()) {
        hasContent = true
        break
      }
    }

    icon.classList.toggle('dropzone__icon--has-content', hasContent)
  }

  handleDropzoneClick(event) {
    if (event.target?.closest?.('button')) {
      return
    }

    this.openPicker()
  }

  handleDropzoneKeyDown(event) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    this.openPicker()
  }

  handleDragEnter(event) {
    if (this.disabled) {
      return
    }

    event.preventDefault()
    this._dragDepth += 1
    this.setDragActive(true)
  }

  handleDragOver(event) {
    if (this.disabled) {
      return
    }

    event.preventDefault()
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy'
    }
    this.setDragActive(true)
  }

  handleDragLeave(event) {
    if (this.disabled) {
      return
    }

    event.preventDefault()
    this._dragDepth = Math.max(0, this._dragDepth - 1)
    if (this._dragDepth === 0) {
      this.setDragActive(false)
    }
  }

  async handleDrop(event) {
    if (this.disabled) {
      return
    }

    event.preventDefault()
    this._dragDepth = 0
    this.setDragActive(false)
    const entries = await getEntriesFromDataTransfer(event.dataTransfer)
    this.setEntries(entries)
  }

  handleInputChange(input) {
    const inputFiles = Array.from(input.files || [])
    const entries = []
    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles[i]
      entries.push({
        file,
        path: file.webkitRelativePath || file.name,
      })
    }

    input.value = ''
    this.setEntries(entries)
  }

  setEntries(entries) {
    const normalized = this.multiple || this.directory ? entries : entries.slice(0, 1)
    this.entries = normalized
    this.files = []
    for (let i = 0; i < normalized.length; i++) {
      this.files.push(normalized[i].file)
    }

    this.render()
    emit(this, 'change', this.getEventDetail())
  }

  clearFiles() {
    if (this.disabled || this.files.length === 0) {
      return
    }

    this.files = []
    this.entries = []
    this.render()
    emit(this, 'change', this.getEventDetail())
    emit(this, 'clear', this.getEventDetail())
  }

  openPicker() {
    if (this.disabled) {
      return
    }

    const input = this.shadowRoot?.querySelector('.file-native-input')
    if (input) {
      input.click()
    }
  }

  setDragActive(active) {
    const dropzone = this.shadowRoot?.querySelector('.dropzone')
    if (dropzone) {
      dropzone.classList.toggle('dropzone--drag-active', active)
    }
  }

  getModeHint() {
    if (this.directory) {
      return 'Files and folders are accepted.'
    }

    return this.multiple ? 'Multiple files are accepted.' : 'One file is accepted.'
  }

  getFileListHtml() {
    if (this.entries.length === 0) {
      return ''
    }

    const lines = []
    const maxVisible = 8
    for (let i = 0; i < this.entries.length && i < maxVisible; i++) {
      const entry = this.entries[i]
      lines.push(`<div class="file-list__item">
        <span class="file-list__name" title="${escapeAttribute(entry.path)}">${escapeHtml(entry.path)}</span>
        <span class="file-list__meta">${escapeHtml(formatBytes(entry.file.size))}</span>
      </div>`)
    }

    if (this.entries.length > maxVisible) {
      lines.push(`<div class="file-list__meta">+${this.entries.length - maxVisible} more</div>`)
    }

    return lines.join('')
  }

  getEventDetail() {
    const entries = []
    for (let i = 0; i < this.entries.length; i++) {
      const entry = this.entries[i]
      entries.push({
        file: entry.file,
        name: entry.file.name,
        path: entry.path,
        size: entry.file.size,
        type: entry.file.type,
      })
    }

    return {
      files: this.files.slice(),
      entries,
      count: this.files.length,
      multiple: this.multiple,
      directory: this.directory,
    }
  }
}

async function getEntriesFromDataTransfer(dataTransfer) {
  if (!dataTransfer) {
    return []
  }

  const items = dataTransfer.items ? Array.from(dataTransfer.items) : []
  if (items.length > 0) {
    const entries = []
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.kind !== 'file') {
        continue
      }

      const entry = typeof item.webkitGetAsEntry === 'function' ? item.webkitGetAsEntry() : null
      if (entry) {
        const entryFiles = await readEntry(entry, '')
        entries.push(...entryFiles)
      } else {
        const file = item.getAsFile()
        if (file) {
          entries.push({ file, path: file.name })
        }
      }
    }
    return entries
  }

  const files = Array.from(dataTransfer.files || [])
  const entries = []
  for (let i = 0; i < files.length; i++) {
    entries.push({ file: files[i], path: files[i].name })
  }
  return entries
}

async function readEntry(entry, parentPath) {
  if (entry.isFile) {
    return await readFileEntry(entry, parentPath)
  }

  if (entry.isDirectory) {
    const directoryPath = `${parentPath}${entry.name}/`
    const children = await readDirectoryEntries(entry)
    const files = []
    for (let i = 0; i < children.length; i++) {
      const childFiles = await readEntry(children[i], directoryPath)
      files.push(...childFiles)
    }
    return files
  }

  return []
}

async function readFileEntry(entry, parentPath) {
  return await new Promise((resolve) => {
    entry.file(
      (file) => resolve([{ file, path: `${parentPath}${file.name}` }]),
      () => resolve([]),
    )
  })
}

async function readDirectoryEntries(entry) {
  const reader = entry.createReader()
  const entries = []

  while (true) {
    const batch = await new Promise((resolve) => {
      reader.readEntries(resolve, () => resolve([]))
    })

    if (batch.length === 0) {
      break
    }

    entries.push(...batch)
  }

  return entries
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}

function formatBytes(bytes) {
  if (!bytes) {
    return '0 B'
  }

  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex += 1
  }

  return `${size >= 10 || unitIndex === 0 ? Math.round(size) : size.toFixed(1)} ${units[unitIndex]}`
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (match) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return replacements[match]
  })
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;')
}
