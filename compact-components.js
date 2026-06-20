/**
 * Compact Components - a small framework-free web component library.
 *
 * Usage:
 *   <script type="module" src="./compact-components.js"></script>
 *
 * Design notes:
 * - Compact, light UI inspired by small data tools: grey headers, thin borders,
 *   tight padding, sticky-looking controls, and simple cards.
 * - Mobile friendly by default. Inputs use at least 36px touch targets, charts and
 *   tables resize to their containers, and overlays never depend on page width.
 * - Color blind friendly. Charts and states use labels, icons, outlines, and a
 *   blue/orange/green/red palette with non-color cues.
 * - Tooltips and hints use fixed-position layers and automatically flip when the
 *   default right/down direction does not fit.
 *
 * Component documentation:
 *
 * <compact-navbar>
 * Attributes: title, tabs, value. tabs may be JSON [{value,label}] or comma text.
 * Slots: default optional left content.
 * Events: change { value, item }, config-click.
 * Behavior: horizontal navigation with selected tab and config icon on the right.
 *
 * <compact-tabs>
 * Attributes: options, value, aria-label. options may be JSON or comma text.
 * Events: change { value, item }.
 * Behavior: compact tab selector, keyboard friendly through real buttons.
 *
 * <compact-button>
 * Attributes: variant="primary|secondary|danger", disabled.
 * Events: compact-click.
 * Behavior: styled button with a default slot. It also forwards normal click events.
 *
 * <compact-split-button>
 * Attributes: variant, main-label, alt-label, disabled.
 * Events: main-click, alt-click.
 * Behavior: two adjacent actions without a dropdown; useful for a primary action
 * plus a fixed secondary action.
 *
 * <compact-checkbox>
 * Attributes: label, checked, disabled.
 * Properties: checked boolean.
 * Events: change { checked }.
 * Behavior: checkbox with a clickable label and visible focus state.
 *
 * <compact-select>
 * Attributes: label, options, value, placeholder, disabled.
 * Events: change { value, item }.
 * Behavior: labeled native select. options may be JSON [{value,label}] or comma text.
 *
 * <compact-input>
 * Attributes: label, value, type, placeholder, disabled.
 * Events: input { value }, change { value }.
 * Behavior: labeled input with compact spacing.
 *
 * <compact-textarea>
 * Attributes: label, value, placeholder, rows, disabled.
 * Events: input { value }, change { value }, fullscreen-open, fullscreen-close.
 * Behavior: labeled textarea with a fullscreen editor button.
 *
 * <compact-box>
 * Attributes: heading, meta, selected.
 * Slots: default.
 * Events: box-click.
 * Behavior: rounded list/card box with optional selected state.
 *
 * <compact-dropdown>
 * Attributes: options, value, placeholder, disabled.
 * Events: change { value, item }.
 * Behavior: plain compact native select without a label.
 *
 * <compact-horizontal-select>
 * Attributes: options, value, disabled.
 * Events: change { value, item }.
 * Behavior: horizontally scrollable button row with one selected option.
 *
 * <compact-audio-player>
 * Attributes: src.
 * Properties: src, blob.
 * Events: play, pause, seek { time }, loaded { duration }, error { message }.
 * Behavior: audio player with canvas waveform, seek by click/drag, and time labels.
 *
 * <compact-audio-recorder>
 * Attributes: mime-type optional.
 * Events: recording-start, recording-pause, recording-resume, recording-stop { blob,
 *   url, duration }, recording-error { message }.
 * Behavior: requests microphone permission, records audio, shows elapsed time and a
 *   live waveform, then embeds <compact-audio-player> for playback.
 *
 * <compact-modal>
 * Attributes: open, heading.
 * Slots: default, footer.
 * Events: open, close.
 * Behavior: overlay with close cross, Escape and Android/back-button support. It is
 * fullscreen on small screens and locks background scroll.
 *
 * <compact-dialog>
 * Attributes: open, heading, message, confirm-label, cancel-label, danger.
 * Slots: default for custom message.
 * Events: confirm, cancel, close.
 * Behavior: compact confirm/cancel dialog.
 *
 * <compact-message>
 * Attributes: type="info|warning|success|error".
 * Slots: default.
 * Events: none.
 * Behavior: inline status message with text label and icon.
 *
 * <compact-toast>
 * Attributes: message, type, duration, open.
 * Static helper: window.CompactUi.toast({ message, type, duration }).
 * Events: close.
 * Behavior: Android-like bottom toast that auto-dismisses.
 *
 * <compact-stacked-bar-chart>
 * Attributes: data, height.
 * Property: data = [{ label, values: { Done: 4, Todo: 2 } }].
 * Events: none.
 * Behavior: simple responsive stacked horizontal bars with legend and values.
 *
 * <compact-line-chart>
 * Attributes: data, height.
 * Property: data = [{ label: 'Mon', value: 3 }, ...].
 * Events: none.
 * Behavior: simple SVG line chart with axes, points, and value labels.
 *
 * <compact-horizontal-bar-chart>
 * Attributes: data, height.
 * Property: data = [{ label: 'A', value: 7 }, ...].
 * Events: none.
 * Behavior: simple horizontal bars with labels and numbers.
 *
 * <compact-table>
 * Attributes: data.
 * Property: data = [{...}, ...] or { rows: [...], columns: [...] }.
 * Events: row-click { row, index }.
 * Behavior: compact table with sticky header inside its own scroll container.
 *
 * <compact-tooltip>
 * Attributes: text, open-on-click.
 * Slots: default is trigger; slot="content" is rich styled tooltip content.
 * Events: tooltip-open, tooltip-close.
 * Behavior: complex tooltip that defaults to right/down and flips to stay on-screen.
 *
 * <compact-hint>
 * Attributes: text.
 * Slots: default is trigger.
 * Events: none.
 * Behavior: plain text hint near the cursor; flips when space is limited.
 *
 * <compact-ordered-list>, <compact-unordered-list>
 * Attributes: items JSON/string list.
 * Slots: default fallback.
 * Events: none.
 * Behavior: compact styled list.
 *
 * <compact-file-input>
 * Attributes: label, accept, multiple.
 * Properties: files FileList/array after change.
 * Events: files-change { files }.
 * Behavior: dashed drop zone supporting click, drag and drop.
 *
 * <compact-tag-selector>
 * Attributes: label, placeholder, value JSON array.
 * Properties: value array.
 * Events: change { value }, input { value }.
 * Behavior: chips before an input; Enter or two spaces add arbitrary text. Each tag
 * has a cross visible on hover/focus and always reachable by keyboard.
 */

export const componentsDocs = [
  ['compact-navbar', 'Tabs in a compact top bar with a configuration button. Attributes: title, tabs, value. Events: change, config-click.'],
  ['compact-tabs', 'Compact tab selector. Attributes: options, value. Event: change.'],
  ['compact-button', 'Button variants primary, secondary, danger. Attribute: disabled. Event: compact-click.'],
  ['compact-split-button', 'Two fixed adjacent actions. Attributes: main-label, alt-label, variant. Events: main-click, alt-click.'],
  ['compact-checkbox', 'Labeled checkbox. Attributes/properties: label, checked, disabled. Event: change.'],
  ['compact-select', 'Labeled dropdown. Attributes: label, options, value, placeholder. Event: change.'],
  ['compact-input', 'Labeled input. Attributes: label, type, value, placeholder. Events: input, change.'],
  ['compact-textarea', 'Labeled textarea with fullscreen editor. Attributes: label, rows, value. Events: input, change, fullscreen-open, fullscreen-close.'],
  ['compact-box', 'Rounded card/list item. Attributes: heading, meta, selected. Event: box-click.'],
  ['compact-dropdown', 'Plain dropdown/select. Attributes: options, value, placeholder. Event: change.'],
  ['compact-horizontal-select', 'Horizontally scrollable one-of-many selector. Attributes: options, value. Event: change.'],
  ['compact-audio-player', 'Waveform audio player. Attributes/properties: src, blob. Events: play, pause, seek, loaded, error.'],
  ['compact-audio-recorder', 'Microphone recorder with record, stop, pause controls, permission handling, waveform and playback. Events: recording-start, recording-pause, recording-resume, recording-stop, recording-error.'],
  ['compact-modal', 'Responsive modal. Attribute: open. Slots: default, footer. Closes by cross, Escape, and mobile back. Events: open, close.'],
  ['compact-dialog', 'Confirm/cancel dialog. Attributes: heading, message, confirm-label, cancel-label, danger. Events: confirm, cancel, close.'],
  ['compact-message', 'Inline info/warning/success/error message. Attribute: type.'],
  ['compact-toast', 'Android-like toast. Attributes: message, type, duration, open. Helper: window.CompactUi.toast(). Event: close.'],
  ['compact-stacked-bar-chart', 'Responsive stacked bar chart. Property/attribute: data.'],
  ['compact-line-chart', 'Responsive line chart. Property/attribute: data.'],
  ['compact-horizontal-bar-chart', 'Responsive horizontal bar chart. Property/attribute: data.'],
  ['compact-table', 'Compact table from object/array data. Property/attribute: data. Event: row-click.'],
  ['compact-tooltip', 'Rich tooltip with slotted content and automatic screen-fit positioning. Attributes: text, open-on-click.'],
  ['compact-hint', 'Plain text cursor hint with automatic screen-fit positioning. Attribute: text.'],
  ['compact-ordered-list', 'Styled ordered list. Attribute: items.'],
  ['compact-unordered-list', 'Styled unordered list. Attribute: items.'],
  ['compact-file-input', 'Dashed drag/drop file input. Attributes: label, accept, multiple. Event: files-change.'],
  ['compact-tag-selector', 'Tag input. Attribute/property: value array. Enter or two spaces adds a tag. Event: change.'],
]

const baseStyle = `
  :host {
    --cc-bg: #fff;
    --cc-soft-bg: #f5f5f5;
    --cc-softer-bg: #fafafa;
    --cc-border: #ccc;
    --cc-border-strong: #999;
    --cc-text: #222;
    --cc-muted: #666;
    --cc-blue: #0066cc;
    --cc-blue-soft: #e8f4ff;
    --cc-blue-selected: #cce5ff;
    --cc-green: #0b7a3b;
    --cc-green-soft: #e9f8ee;
    --cc-orange: #b35c00;
    --cc-orange-soft: #fff2df;
    --cc-red: #b00020;
    --cc-red-soft: #ffe8ec;
    --cc-focus: #1d70b8;
    --cc-radius: 4px;
    color: var(--cc-text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    font-size: 13px;
    line-height: 1.35;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  button, input, select, textarea {
    font: inherit;
  }

  button, select, input, textarea {
    color: var(--cc-text);
  }

  .sr-only {
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    position: absolute;
  }

  .focusable:focus-visible,
  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid var(--cc-focus);
    outline-offset: 1px;
  }
`

const buttonStyle = `
  .btn {
    border: 1px solid var(--cc-border-strong);
    border-radius: var(--cc-radius);
    background: var(--cc-bg);
    min-height: 32px;
    padding: 5px 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    user-select: none;
    max-width: 100%;
  }

  .btn:hover:not(:disabled) {
    background: #f0f0f0;
  }

  .btn:active:not(:disabled) {
    transform: translateY(1px);
  }

  .btn.primary {
    background: var(--cc-blue);
    border-color: var(--cc-blue);
    color: #fff;
  }

  .btn.primary:hover:not(:disabled) {
    background: #005bb8;
  }

  .btn.secondary {
    background: #fff;
    border-color: var(--cc-border-strong);
    color: var(--cc-text);
  }

  .btn.danger {
    background: var(--cc-red);
    border-color: var(--cc-red);
    color: #fff;
  }

  .btn.danger:hover:not(:disabled) {
    background: #8f001a;
  }

  .btn:disabled {
    cursor: not-allowed;
    opacity: .55;
  }
`

const palette = ['#0066cc', '#b35c00', '#0b7a3b', '#7a3db8', '#b00020', '#007c89', '#6b5b00', '#444']
let modalLocks = 0
let uid = 0

function nextId(prefix) {
  uid += 1
  return `${prefix}-${uid}`
}

function defineElement(name, klass) {
  if (!customElements.get(name)) {
    customElements.define(name, klass)
  }
}

function shadow(element, styles, html) {
  const root = element.shadowRoot || element.attachShadow({ mode: 'open' })
  root.innerHTML = `<style>${baseStyle}${styles || ''}</style>${html || ''}`
  return root
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

function toBool(value) {
  return value !== null && value !== 'false'
}

function parseJson(value, fallback) {
  if (value === null || value === undefined || value === '') {
    return fallback
  }
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

function parseOptions(value) {
  const parsed = parseJson(value, null)
  const source = parsed || String(value || '').split(',').map(item => item.trim()).filter(Boolean)
  const options = []
  for (let i = 0; i < source.length; i++) {
    const item = source[i]
    if (typeof item === 'string') {
      options.push({ value: item, label: item })
    } else if (item && typeof item === 'object') {
      options.push({
        value: String(item.value ?? item.id ?? item.label ?? ''),
        label: String(item.label ?? item.value ?? item.id ?? ''),
        disabled: Boolean(item.disabled),
      })
    }
  }
  return options
}

function setText(node, value) {
  node.textContent = value === undefined || value === null ? '' : String(value)
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    seconds = 0
  }
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}

function lockDocumentScroll() {
  modalLocks += 1
  if (modalLocks === 1) {
    document.documentElement.dataset.compactPreviousOverflow = document.documentElement.style.overflow || ''
    document.body.dataset.compactPreviousOverflow = document.body.style.overflow || ''
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
  }
}

function unlockDocumentScroll() {
  modalLocks = Math.max(0, modalLocks - 1)
  if (modalLocks === 0) {
    document.documentElement.style.overflow = document.documentElement.dataset.compactPreviousOverflow || ''
    document.body.style.overflow = document.body.dataset.compactPreviousOverflow || ''
    delete document.documentElement.dataset.compactPreviousOverflow
    delete document.body.dataset.compactPreviousOverflow
  }
}

function placeLayer(triggerRect, layer, pointer) {
  const gap = 8
  const margin = 8
  const width = layer.offsetWidth
  const height = layer.offsetHeight
  let left = triggerRect.right + gap
  let top = triggerRect.bottom + gap

  if (pointer) {
    left = pointer.clientX + gap
    top = pointer.clientY + gap
  }

  if (left + width + margin > window.innerWidth) {
    left = Math.max(margin, triggerRect.left - width - gap)
    if (pointer) {
      left = Math.max(margin, pointer.clientX - width - gap)
    }
  }

  if (top + height + margin > window.innerHeight) {
    top = Math.max(margin, triggerRect.top - height - gap)
    if (pointer) {
      top = Math.max(margin, pointer.clientY - height - gap)
    }
  }

  layer.style.left = `${Math.min(Math.max(margin, left), Math.max(margin, window.innerWidth - width - margin))}px`
  layer.style.top = `${Math.min(Math.max(margin, top), Math.max(margin, window.innerHeight - height - margin))}px`
}

function drawEmptyCanvas(canvas, label) {
  const ctx = canvas.getContext('2d')
  const ratio = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = Math.max(1, Math.floor(rect.width * ratio))
  canvas.height = Math.max(1, Math.floor(rect.height * ratio))
  ctx.scale(ratio, ratio)
  ctx.clearRect(0, 0, rect.width, rect.height)
  ctx.fillStyle = '#fafafa'
  ctx.fillRect(0, 0, rect.width, rect.height)
  ctx.strokeStyle = '#ccc'
  ctx.strokeRect(.5, .5, rect.width - 1, rect.height - 1)
  ctx.fillStyle = '#666'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label || 'No data', rect.width / 2, rect.height / 2)
}

class CompactNavbar extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'tabs', 'value']
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

      nav {
        background: var(--cc-soft-bg);
        border-bottom: 1px solid var(--cc-border);
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 42px;
        padding: 6px 8px;
        max-width: 100%;
        overflow: hidden;
      }

      .title {
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
      }

      .tabs {
        display: flex;
        gap: 2px;
        overflow-x: auto;
        scrollbar-width: thin;
        flex: 1;
        min-width: 0;
      }

      button.tab {
        border: 1px solid transparent;
        border-radius: var(--cc-radius);
        background: transparent;
        padding: 5px 8px;
        min-height: 30px;
        cursor: pointer;
        white-space: nowrap;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      button.tab::after {
        display: block;
        content: attr(data-text);
        font-weight: 600;
        height: 0;
        overflow: hidden;
        visibility: hidden;
        pointer-events: none;
      }

      button.tab:hover {
        background: #eee;
      }

      button.tab[aria-selected='true'] {
        background: var(--cc-blue-selected);
        border-color: #8bbff3;
        color: #003b73;
        font-weight: 600;
      }

      .config {
        border: 1px solid var(--cc-border-strong);
        background: #fff;
        border-radius: var(--cc-radius);
        min-width: 32px;
        min-height: 32px;
        cursor: pointer;
      }
    `, `
      <nav aria-label="Main navigation">
        <slot></slot>
        <div class="title"></div>
        <div class="tabs" role="tablist"></div>
        <button class="config" type="button" aria-label="Configuration">⚙</button>
      </nav>
    `)
    setText(root.querySelector('.title'), this.getAttribute('title') || '')
    const tabs = parseOptions(this.getAttribute('tabs'))
    const value = this.getAttribute('value') || (tabs[0] ? tabs[0].value : '')
    const holder = root.querySelector('.tabs')
    holder.innerHTML = ''
    for (let i = 0; i < tabs.length; i++) {
      const item = tabs[i]
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'tab'
      btn.setAttribute('role', 'tab')
      btn.setAttribute('aria-selected', String(item.value === value))
      btn.dataset.value = item.value
      btn.dataset.text = item.label
      setText(btn, item.label)
      btn.addEventListener('click', () => {
        this.setAttribute('value', item.value)
        emit(this, 'change', { value: item.value, item })
      })
      holder.append(btn)
    }
    root.querySelector('.config').addEventListener('click', () => emit(this, 'config-click'))
  }
}

class CompactTabs extends HTMLElement {
  static get observedAttributes() {
    return ['options', 'value', 'disabled']
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

      .tabs {
        display: inline-flex;
        gap: 2px;
        padding: 2px;
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        background: var(--cc-soft-bg);
        overflow-x: auto;
        max-width: 100%;
        scrollbar-width: thin;
      }

      button {
        background: transparent;
        border: 1px solid transparent;
        border-radius: 3px;
        min-height: 30px;
        padding: 4px 9px;
        cursor: pointer;
        white-space: nowrap;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      button::after {
        display: block;
        content: attr(data-text);
        font-weight: 600;
        height: 0;
        overflow: hidden;
        visibility: hidden;
        pointer-events: none;
      }

      button:hover:not(:disabled) {
        background: #fff;
      }

      button[aria-selected='true'] {
        background: #fff;
        border-color: var(--cc-border-strong);
        font-weight: 600;
      }
    `, '<div class="tabs" role="tablist"></div>')
    const holder = root.querySelector('.tabs')
    const options = parseOptions(this.getAttribute('options'))
    const value = this.getAttribute('value') || (options[0] ? options[0].value : '')
    const disabled = this.hasAttribute('disabled')
    for (let i = 0; i < options.length; i++) {
      const item = options[i]
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.setAttribute('role', 'tab')
      btn.setAttribute('aria-selected', String(item.value === value))
      btn.disabled = disabled || item.disabled
      btn.dataset.text = item.label
      setText(btn, item.label)
      btn.addEventListener('click', () => {
        this.setAttribute('value', item.value)
        emit(this, 'change', { value: item.value, item })
      })
      holder.append(btn)
    }
  }
}

class CompactButton extends HTMLElement {
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

class CompactSplitButton extends HTMLElement {
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

class CompactCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'checked', 'disabled']
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
    setText(root.querySelector('span'), this.getAttribute('label') || this.textContent || '')
    input.addEventListener('change', () => {
      this.checked = input.checked
      emit(this, 'change', { checked: input.checked })
    })
  }
}

class CompactSelect extends HTMLElement {
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
        border: 1px solid var(--cc-border-strong);
        border-radius: var(--cc-radius);
        background: #fff;
        max-width: 100%;
      }
    `, `<label for="${id}"><span></span><select id="${id}"></select></label>`)
    setText(root.querySelector('span'), this.getAttribute('label') || '')
    buildSelect(this, root.querySelector('select'))
  }
}

class CompactDropdown extends HTMLElement {
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
        border: 1px solid var(--cc-border-strong);
        border-radius: var(--cc-radius);
        background: #fff;
        max-width: 100%;
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

class CompactInput extends HTMLElement {
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

  attributeChangedCallback() {
    this.render()
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
        border: 1px solid var(--cc-border-strong);
        border-radius: var(--cc-radius);
        background: #fff;
        width: 100%;
      }
    `, `<label for="${id}"><span></span><input id="${id}"></label>`)
    const input = root.querySelector('input')
    input.type = this.getAttribute('type') || 'text'
    input.value = this.getAttribute('value') || ''
    input.placeholder = this.getAttribute('placeholder') || ''
    input.disabled = this.hasAttribute('disabled')
    setText(root.querySelector('span'), this.getAttribute('label') || '')
    input.addEventListener('input', () => {
      this.setAttribute('value', input.value)
      emit(this, 'input', { value: input.value })
    })
    input.addEventListener('change', () => emit(this, 'change', { value: input.value }))
  }
}

class CompactTextarea extends HTMLElement {
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
        border: 1px solid var(--cc-border-strong);
        border-radius: var(--cc-radius);
        width: 100%;
        resize: vertical;
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
          <button class="btn secondary mini" type="button">Fullscreen</button>
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
          min-height: 32px;
          padding: 5px 10px;
          border: 1px solid #999;
          border-radius: 4px;
          background: #fff;
          font: inherit;
        }
      </style>
      <div class="bar">
        <strong></strong>
        <button type="button">Done</button>
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

class CompactBox extends HTMLElement {
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

class CompactHorizontalSelect extends HTMLElement {
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
        border-radius: 999px;
        min-height: 30px;
        padding: 4px 9px;
        cursor: pointer;
        white-space: nowrap;
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

class CompactAudioPlayer extends HTMLElement {
  static get observedAttributes() {
    return ['src']
  }

  constructor() {
    super()
    this._wave = []
    this._dragging = false
    this._objectUrl = ''
    this._resizeObserver = null
  }

  get src() {
    return this.getAttribute('src') || ''
  }

  set src(value) {
    if (value) {
      this.setAttribute('src', value)
    } else {
      this.removeAttribute('src')
    }
  }

  set blob(blob) {
    if (this._objectUrl) {
      URL.revokeObjectURL(this._objectUrl)
    }
    this._objectUrl = URL.createObjectURL(blob)
    this.src = this._objectUrl
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
    }
    if (this._objectUrl) {
      URL.revokeObjectURL(this._objectUrl)
    }
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

      .player {
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        background: #fff;
        padding: 6px;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 6px;
        max-width: 100%;
      }

      button {
        border: 1px solid var(--cc-border-strong);
        border-radius: var(--cc-radius);
        background: #fff;
        min-width: 32px;
        min-height: 32px;
        cursor: pointer;
      }

      canvas {
        width: 100%;
        height: 54px;
        display: block;
        border: 1px solid var(--cc-border);
        background: #fafafa;
        border-radius: 3px;
        cursor: pointer;
        min-width: 0;
      }

      .time {
        color: var(--cc-muted);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        font-size: 12px;
      }

      audio {
        display: none;
      }
    `, `
      <div class="player">
        <button type="button" aria-label="Play or pause">▶</button>
        <canvas></canvas>
        <div class="time">0:00 / 0:00</div>
        <audio preload="metadata"></audio>
      </div>
    `)
    this._button = root.querySelector('button')
    this._canvas = root.querySelector('canvas')
    this._time = root.querySelector('.time')
    this._audio = root.querySelector('audio')
    this._audio.src = this.src
    this._bindAudio()
    this._resizeObserver = new ResizeObserver(() => this.draw())
    this._resizeObserver.observe(this._canvas)
    this.loadWave()
  }

  _bindAudio() {
    this._button.addEventListener('click', async () => {
      if (!this._audio.src) {
        return
      }
      if (this._audio.paused) {
        await this._audio.play()
        emit(this, 'play')
      } else {
        this._audio.pause()
        emit(this, 'pause')
      }
    })
    this._audio.addEventListener('play', () => {
      this._button.textContent = '❚❚'
    })
    this._audio.addEventListener('pause', () => {
      this._button.textContent = '▶'
    })
    this._audio.addEventListener('loadedmetadata', () => {
      this.updateTime()
      emit(this, 'loaded', { duration: this._audio.duration || 0 })
    })
    this._audio.addEventListener('timeupdate', () => {
      this.updateTime()
      this.draw()
    })
    this._audio.addEventListener('ended', () => {
      this._button.textContent = '▶'
      this.draw()
    })
    this._audio.addEventListener('error', () => emit(this, 'error', { message: 'Audio could not be loaded' }))
    this._canvas.addEventListener('pointerdown', event => {
      this._dragging = true
      this._canvas.setPointerCapture(event.pointerId)
      this.seekFromEvent(event)
    })
    this._canvas.addEventListener('pointermove', event => {
      if (this._dragging) {
        this.seekFromEvent(event)
      }
    })
    this._canvas.addEventListener('pointerup', event => {
      this._dragging = false
      try {
        this._canvas.releasePointerCapture(event.pointerId)
      } catch (error) {}
    })
  }

  async loadWave() {
    if (!this.src) {
      this._wave = []
      this.draw()
      return
    }
    try {
      const response = await fetch(this.src)
      const buffer = await response.arrayBuffer()
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const decoded = await audioContext.decodeAudioData(buffer.slice(0))
      const samples = decoded.getChannelData(0)
      const bars = 180
      const step = Math.max(1, Math.floor(samples.length / bars))
      const wave = []
      for (let i = 0; i < bars; i++) {
        let sum = 0
        const start = i * step
        const end = Math.min(samples.length, start + step)
        for (let j = start; j < end; j++) {
          sum += Math.abs(samples[j])
        }
        wave.push(sum / Math.max(1, end - start))
      }
      const max = Math.max(...wave, .01)
      this._wave = wave.map(value => value / max)
      audioContext.close()
    } catch (error) {
      this._wave = []
    }
    this.draw()
  }

  updateTime() {
    const current = this._audio.currentTime || 0
    const duration = this._audio.duration || 0
    this._time.textContent = `${formatTime(current)} / ${formatTime(duration)}`
  }

  seekFromEvent(event) {
    const duration = this._audio.duration || 0
    if (!duration) {
      return
    }
    const rect = this._canvas.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    this._audio.currentTime = ratio * duration
    emit(this, 'seek', { time: this._audio.currentTime })
    this.updateTime()
    this.draw()
  }

  draw() {
    if (!this._canvas) {
      return
    }
    const rect = this._canvas.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) {
      return
    }
    const ratio = window.devicePixelRatio || 1
    this._canvas.width = Math.floor(rect.width * ratio)
    this._canvas.height = Math.floor(rect.height * ratio)
    const ctx = this._canvas.getContext('2d')
    ctx.scale(ratio, ratio)
    ctx.clearRect(0, 0, rect.width, rect.height)
    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, rect.width, rect.height)
    const wave = this._wave.length ? this._wave : Array.from({ length: 60 }, (_, i) => .18 + .12 * Math.sin(i / 3))
    const barWidth = Math.max(1, rect.width / wave.length - 1)
    const progress = this._audio && this._audio.duration ? this._audio.currentTime / this._audio.duration : 0
    for (let i = 0; i < wave.length; i++) {
      const x = i * rect.width / wave.length
      const height = Math.max(2, wave[i] * (rect.height - 12))
      ctx.fillStyle = i / wave.length <= progress ? '#0066cc' : '#b8c7d6'
      ctx.fillRect(x, (rect.height - height) / 2, barWidth, height)
    }
    ctx.strokeStyle = '#ccc'
    ctx.strokeRect(.5, .5, rect.width - 1, rect.height - 1)
  }
}

class CompactAudioRecorder extends HTMLElement {
  constructor() {
    super()
    this._stream = null
    this._recorder = null
    this._chunks = []
    this._startedAt = 0
    this._elapsedBeforePause = 0
    this._timer = 0
    this._animation = 0
    this._analyser = null
    this._audioContext = null
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.stopTracks()
    clearInterval(this._timer)
    cancelAnimationFrame(this._animation)
  }

  render() {
    const root = shadow(this, `
      :host {
        display: block;
        max-width: 100%;
      }

      .recorder {
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        background: #fff;
        padding: 8px;
        display: grid;
        gap: 6px;
      }

      .controls {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }

      button {
        min-width: 36px;
        min-height: 36px;
        border: 1px solid var(--cc-border-strong);
        background: #fff;
        cursor: pointer;
      }

      .record {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: inline-grid;
        place-items: center;
      }

      .record::before {
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #d71920;
        box-shadow: 0 0 0 3px #fff, 0 0 0 5px #d71920;
      }

      .stop {
        border: 0;
        border-radius: 3px;
        display: inline-grid;
        place-items: center;
      }

      .stop::before {
        content: '';
        width: 17px;
        height: 17px;
        border-radius: 2px;
        background: #d71920;
      }

      .pause {
        display: inline-grid;
        grid-template-columns: 5px 5px;
        justify-content: center;
        align-content: center;
        gap: 5px;
      }

      .pause::before,
      .pause::after {
        content: '';
        width: 5px;
        height: 19px;
        background: #333;
      }

      .time {
        font-variant-numeric: tabular-nums;
        color: var(--cc-muted);
        min-width: 48px;
      }

      .status {
        color: var(--cc-muted);
      }

      canvas {
        width: 100%;
        height: 54px;
        background: #fafafa;
        border: 1px solid var(--cc-border);
        border-radius: 3px;
        display: block;
      }

      .playback:empty {
        display: none;
      }
    `, `
      <div class="recorder">
        <div class="controls">
          <button class="record" type="button" aria-label="Record"></button>
          <button class="stop" type="button" aria-label="Stop" disabled></button>
          <button class="pause" type="button" aria-label="Pause" disabled></button>
          <span class="time">0:00</span>
          <span class="status">Ready</span>
        </div>
        <canvas></canvas>
        <div class="playback"></div>
      </div>
    `)
    this._recordButton = root.querySelector('.record')
    this._stopButton = root.querySelector('.stop')
    this._pauseButton = root.querySelector('.pause')
    this._timeLabel = root.querySelector('.time')
    this._status = root.querySelector('.status')
    this._canvas = root.querySelector('canvas')
    this._playback = root.querySelector('.playback')
    this._recordButton.addEventListener('click', () => void this.startRecording())
    this._stopButton.addEventListener('click', () => this.stopRecording())
    this._pauseButton.addEventListener('click', () => this.togglePause())
    drawEmptyCanvas(this._canvas, 'Recording waveform')
  }

  async startRecording() {
    try {
      this._stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (error) {
      const message = error && error.name === 'NotAllowedError'
        ? 'Microphone permission was denied'
        : 'Microphone is unavailable'
      this.setStatus(message)
      emit(this, 'recording-error', { message })
      return
    }

    try {
      const mimeType = this.getAttribute('mime-type') || ''
      const options = mimeType && MediaRecorder.isTypeSupported(mimeType) ? { mimeType } : undefined
      this._recorder = new MediaRecorder(this._stream, options)
    } catch (error) {
      this.setStatus('Recording is not supported in this browser')
      emit(this, 'recording-error', { message: 'Recording is not supported in this browser' })
      this.stopTracks()
      return
    }

    this._chunks = []
    this._elapsedBeforePause = 0
    this._startedAt = performance.now()
    this._recorder.addEventListener('dataavailable', event => {
      if (event.data && event.data.size > 0) {
        this._chunks.push(event.data)
      }
    })
    this._recorder.addEventListener('stop', () => this.finishRecording())
    this._recorder.start()
    this._recordButton.disabled = true
    this._stopButton.disabled = false
    this._pauseButton.disabled = false
    this._pauseButton.setAttribute('aria-label', 'Pause')
    this.setStatus('Recording')
    this._timer = setInterval(() => this.updateElapsed(), 250)
    this.setupAnalyser()
    this.drawLiveWave()
    emit(this, 'recording-start')
  }

  setupAnalyser() {
    try {
      this._audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const source = this._audioContext.createMediaStreamSource(this._stream)
      this._analyser = this._audioContext.createAnalyser()
      this._analyser.fftSize = 1024
      source.connect(this._analyser)
    } catch (error) {
      this._analyser = null
    }
  }

  drawLiveWave() {
    if (!this._canvas || !this._analyser) {
      return
    }
    const rect = this._canvas.getBoundingClientRect()
    const ratio = window.devicePixelRatio || 1
    this._canvas.width = Math.max(1, Math.floor(rect.width * ratio))
    this._canvas.height = Math.max(1, Math.floor(rect.height * ratio))
    const ctx = this._canvas.getContext('2d')
    ctx.scale(ratio, ratio)
    const data = new Uint8Array(this._analyser.fftSize)
    const draw = () => {
      if (!this._analyser) {
        return
      }
      this._analyser.getByteTimeDomainData(data)
      ctx.clearRect(0, 0, rect.width, rect.height)
      ctx.fillStyle = '#fafafa'
      ctx.fillRect(0, 0, rect.width, rect.height)
      ctx.strokeStyle = '#0066cc'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = 0; i < data.length; i++) {
        const x = i / (data.length - 1) * rect.width
        const y = data[i] / 255 * rect.height
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      ctx.strokeStyle = '#ccc'
      ctx.strokeRect(.5, .5, rect.width - 1, rect.height - 1)
      this._animation = requestAnimationFrame(draw)
    }
    draw()
  }

  togglePause() {
    if (!this._recorder) {
      return
    }
    if (this._recorder.state === 'recording') {
      this._recorder.pause()
      this._elapsedBeforePause += performance.now() - this._startedAt
      this.setStatus('Paused')
      this._pauseButton.setAttribute('aria-label', 'Resume')
      emit(this, 'recording-pause')
    } else if (this._recorder.state === 'paused') {
      this._startedAt = performance.now()
      this._recorder.resume()
      this.setStatus('Recording')
      this._pauseButton.setAttribute('aria-label', 'Pause')
      emit(this, 'recording-resume')
    }
  }

  stopRecording() {
    if (this._recorder && this._recorder.state !== 'inactive') {
      this._recorder.stop()
    }
  }

  finishRecording() {
    clearInterval(this._timer)
    cancelAnimationFrame(this._animation)
    const duration = this.getElapsedSeconds()
    const type = this._recorder && this._recorder.mimeType ? this._recorder.mimeType : 'audio/webm'
    const blob = new Blob(this._chunks, { type })
    const url = URL.createObjectURL(blob)
    const player = document.createElement('compact-audio-player')
    player.src = url
    this._playback.innerHTML = ''
    this._playback.append(player)
    this._recordButton.disabled = false
    this._stopButton.disabled = true
    this._pauseButton.disabled = true
    this.setStatus('Recorded')
    this.stopTracks()
    emit(this, 'recording-stop', { blob, url, duration })
  }

  updateElapsed() {
    this._timeLabel.textContent = formatTime(this.getElapsedSeconds())
  }

  getElapsedSeconds() {
    let elapsed = this._elapsedBeforePause
    if (this._recorder && this._recorder.state === 'recording') {
      elapsed += performance.now() - this._startedAt
    }
    return elapsed / 1000
  }

  setStatus(message) {
    this._status.textContent = message
  }

  stopTracks() {
    if (this._stream) {
      const tracks = this._stream.getTracks()
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].stop()
      }
      this._stream = null
    }
    if (this._audioContext) {
      void this._audioContext.close()
      this._audioContext = null
    }
    this._analyser = null
  }
}

class CompactModal extends HTMLElement {
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

class CompactDialog extends HTMLElement {
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

class CompactMessage extends HTMLElement {
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
        width: 16px;
        text-align: center;
      }
    `, `<div class="message ${type}"><span class="icon"></span><span><slot></slot></span></div>`)
    setText(root.querySelector('.icon'), icons[type] || icons.info)
  }
}

class CompactToast extends HTMLElement {
  static get observedAttributes() {
    return ['message', 'type', 'duration', 'open']
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
    const type = this.getAttribute('type') || 'info'
    const root = shadow(this, `
      :host {
        position: fixed;
        left: 50%;
        bottom: max(14px, env(safe-area-inset-bottom));
        transform: translateX(-50%) translateY(16px);
        z-index: 2147482500;
        display: none;
        max-width: min(520px, calc(100vw - 24px));
      }

      :host([open]) {
        display: block;
        animation: toast-in .16s ease-out forwards;
      }

      .toast {
        background: #262626;
        color: #fff;
        border-radius: 999px;
        padding: 8px 12px;
        box-shadow: 0 6px 22px rgba(0, 0, 0, .25);
        overflow-wrap: anywhere;
      }

      .toast.success::before {
        content: '✓ ';
      }

      .toast.warning::before {
        content: '⚠ ';
      }

      .toast.error::before {
        content: '✕ ';
      }

      @keyframes toast-in {
        to {
          transform: translateX(-50%) translateY(0);
        }
      }
    `, `<div class="toast ${type}" role="status"></div>`)
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
    const toast = document.createElement('compact-toast')
    const opts = typeof options === 'string' ? { message: options } : options || {}
    toast.setAttribute('message', opts.message || '')
    toast.setAttribute('type', opts.type || 'info')
    toast.setAttribute('duration', String(opts.duration || 3000))
    document.body.append(toast)
    requestAnimationFrame(() => toast.setAttribute('open', ''))
    toast.addEventListener('close', () => toast.remove(), { once: true })
    return toast
  }
}

function normalizeChartData(value) {
  if (Array.isArray(value)) {
    return value
  }
  if (value && Array.isArray(value.rows)) {
    return value.rows
  }
  if (value && typeof value === 'object') {
    return Object.keys(value).map(key => ({ label: key, value: value[key] }))
  }
  return []
}

class CompactStackedBarChart extends HTMLElement {
  static get observedAttributes() {
    return ['data', 'height']
  }

  set data(value) {
    this._data = value
    this.render()
  }

  get data() {
    return this._data || parseJson(this.getAttribute('data'), [])
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const data = normalizeChartData(this.data)
    const height = Number(this.getAttribute('height') || 190)
    const keys = []
    for (let i = 0; i < data.length; i++) {
      const values = data[i].values || {}
      const names = Object.keys(values)
      for (let j = 0; j < names.length; j++) {
        if (!keys.includes(names[j])) {
          keys.push(names[j])
        }
      }
    }
    const root = shadow(this, chartStyle(), '<div class="chart"></div>')
    const holder = root.querySelector('.chart')
    holder.style.minHeight = `${height}px`
    if (!data.length || !keys.length) {
      holder.textContent = 'No chart data'
      return
    }
    const legend = document.createElement('div')
    legend.className = 'legend'
    for (let i = 0; i < keys.length; i++) {
      const item = document.createElement('span')
      item.innerHTML = `<i style="background:${palette[i % palette.length]};"></i>`
      item.append(document.createTextNode(keys[i]))
      legend.append(item)
    }
    holder.append(legend)
    for (let i = 0; i < data.length; i++) {
      const row = document.createElement('div')
      row.className = 'bar-row'
      const label = document.createElement('div')
      label.className = 'bar-label'
      setText(label, data[i].label || `Row ${i + 1}`)
      const bar = document.createElement('div')
      bar.className = 'stack'
      const total = keys.reduce((sum, key) => sum + Number((data[i].values || {})[key] || 0), 0)
      for (let j = 0; j < keys.length; j++) {
        const value = Number((data[i].values || {})[keys[j]] || 0)
        if (value <= 0) {
          continue
        }
        const seg = document.createElement('span')
        seg.style.width = `${value / Math.max(1, total) * 100}%`
        seg.style.background = palette[j % palette.length]
        seg.title = `${keys[j]}: ${value}`
        setText(seg, value)
        bar.append(seg)
      }
      const totalNode = document.createElement('div')
      totalNode.className = 'bar-value'
      setText(totalNode, total)
      row.append(label, bar, totalNode)
      holder.append(row)
    }
  }
}

class CompactHorizontalBarChart extends HTMLElement {
  static get observedAttributes() {
    return ['data', 'height']
  }

  set data(value) {
    this._data = value
    this.render()
  }

  get data() {
    return this._data || parseJson(this.getAttribute('data'), [])
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const data = normalizeChartData(this.data)
    const max = Math.max(...data.map(item => Number(item.value || 0)), 1)
    const root = shadow(this, chartStyle(), '<div class="chart"></div>')
    const holder = root.querySelector('.chart')
    if (!data.length) {
      holder.textContent = 'No chart data'
      return
    }
    for (let i = 0; i < data.length; i++) {
      const row = document.createElement('div')
      row.className = 'bar-row'
      const label = document.createElement('div')
      label.className = 'bar-label'
      setText(label, data[i].label || `Row ${i + 1}`)
      const bar = document.createElement('div')
      bar.className = 'plain-bar'
      const fill = document.createElement('span')
      fill.style.width = `${Number(data[i].value || 0) / max * 100}%`
      fill.style.background = palette[i % palette.length]
      bar.append(fill)
      const value = document.createElement('div')
      value.className = 'bar-value'
      setText(value, data[i].value || 0)
      row.append(label, bar, value)
      holder.append(row)
    }
  }
}

class CompactLineChart extends HTMLElement {
  static get observedAttributes() {
    return ['data', 'height']
  }

  set data(value) {
    this._data = value
    this.render()
  }

  get data() {
    return this._data || parseJson(this.getAttribute('data'), [])
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const data = normalizeChartData(this.data)
    const height = Number(this.getAttribute('height') || 220)
    const width = 640
    const padLeft = 36
    const padRight = 12
    const padTop = 12
    const padBottom = 28
    const values = data.map(item => Number(item.value || item.y || 0))
    const max = Math.max(...values, 1)
    const min = Math.min(...values, 0)
    const root = shadow(this, `
      :host {
        display: block;
        max-width: 100%;
      }

      .wrap {
        border: 1px solid var(--cc-border);
        background: #fff;
        border-radius: var(--cc-radius);
        padding: 6px;
        overflow-x: auto;
      }

      svg {
        width: 100%;
        min-width: 320px;
        height: auto;
        display: block;
      }

      text {
        fill: #555;
        font-size: 11px;
      }
    `, '<div class="wrap"></div>')
    const wrap = root.querySelector('.wrap')
    if (!data.length) {
      wrap.textContent = 'No chart data'
      return
    }
    const usableW = width - padLeft - padRight
    const usableH = height - padTop - padBottom
    const xFor = index => padLeft + (data.length === 1 ? usableW / 2 : index / (data.length - 1) * usableW)
    const yFor = value => padTop + (max - value) / Math.max(.0001, max - min) * usableH
    const points = []
    for (let i = 0; i < data.length; i++) {
      points.push(`${xFor(i)},${yFor(values[i])}`)
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    svg.innerHTML = `
      <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${height - padBottom}" stroke="#ccc"></line>
      <line x1="${padLeft}" y1="${height - padBottom}" x2="${width - padRight}" y2="${height - padBottom}" stroke="#ccc"></line>
      <text x="4" y="${yFor(max) + 4}">${max}</text>
      <text x="4" y="${yFor(min) + 4}">${min}</text>
      <polyline fill="none" stroke="#0066cc" stroke-width="2.5" points="${points.join(' ')}"></polyline>
    `
    for (let i = 0; i < data.length; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', String(xFor(i)))
      circle.setAttribute('cy', String(yFor(values[i])))
      circle.setAttribute('r', '4')
      circle.setAttribute('fill', '#fff')
      circle.setAttribute('stroke', '#0066cc')
      circle.setAttribute('stroke-width', '2')
      svg.append(circle)
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      label.setAttribute('x', String(xFor(i)))
      label.setAttribute('y', String(height - 8))
      label.setAttribute('text-anchor', 'middle')
      label.textContent = data[i].label || data[i].x || String(i + 1)
      svg.append(label)
      const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      valueText.setAttribute('x', String(xFor(i)))
      valueText.setAttribute('y', String(yFor(values[i]) - 8))
      valueText.setAttribute('text-anchor', 'middle')
      valueText.textContent = String(values[i])
      svg.append(valueText)
    }
    wrap.append(svg)
  }
}

function chartStyle() {
  return `
    :host {
      display: block;
      max-width: 100%;
    }

    .chart {
      border: 1px solid var(--cc-border);
      border-radius: var(--cc-radius);
      background: #fff;
      padding: 7px;
      display: grid;
      gap: 6px;
      max-width: 100%;
      overflow: hidden;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 5px 10px;
      font-size: 12px;
      color: var(--cc-muted);
    }

    .legend span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .legend i {
      width: 10px;
      height: 10px;
      display: inline-block;
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, .2);
    }

    .bar-row {
      display: grid;
      grid-template-columns: minmax(58px, 120px) minmax(80px, 1fr) minmax(34px, auto);
      gap: 6px;
      align-items: center;
      min-width: 0;
    }

    .bar-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--cc-muted);
    }

    .bar-value {
      font-variant-numeric: tabular-nums;
      text-align: right;
      color: var(--cc-muted);
    }

    .stack,
    .plain-bar {
      height: 22px;
      background: #f3f3f3;
      border: 1px solid var(--cc-border);
      border-radius: 3px;
      overflow: hidden;
      display: flex;
      min-width: 0;
    }

    .stack span {
      color: #fff;
      min-width: 1px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      overflow: hidden;
      text-shadow: 0 1px 1px rgba(0, 0, 0, .35);
    }

    .plain-bar span {
      display: block;
      height: 100%;
    }

    @media (max-width: 480px) {
      .bar-row {
        grid-template-columns: 1fr;
        gap: 2px;
      }

      .bar-value {
        text-align: left;
      }
    }
  `
}

class CompactTable extends HTMLElement {
  static get observedAttributes() {
    return ['data']
  }

  set data(value) {
    this._data = value
    this.render()
  }

  get data() {
    return this._data || parseJson(this.getAttribute('data'), [])
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

      .wrap {
        overflow: auto;
        max-width: 100%;
        border: 1px solid var(--cc-border);
        background: #fff;
      }

      table {
        border-collapse: collapse;
        width: max-content;
        min-width: 100%;
        font-size: 12px;
      }

      th, td {
        border: 1px solid #ddd;
        padding: 4px 8px;
        text-align: left;
        vertical-align: top;
      }

      th {
        position: sticky;
        top: 0;
        z-index: 1;
        background: #f0f0f0;
        font-weight: 700;
      }

      tbody tr:hover {
        background: var(--cc-blue-soft);
      }
    `, '<div class="wrap"><table><thead></thead><tbody></tbody></table></div>')
    const normalized = normalizeTableData(this.data)
    const head = root.querySelector('thead')
    const body = root.querySelector('tbody')
    const tr = document.createElement('tr')
    for (let i = 0; i < normalized.columns.length; i++) {
      const th = document.createElement('th')
      setText(th, normalized.columns[i].label)
      tr.append(th)
    }
    head.append(tr)
    for (let i = 0; i < normalized.rows.length; i++) {
      const row = normalized.rows[i]
      const bodyTr = document.createElement('tr')
      bodyTr.tabIndex = 0
      for (let j = 0; j < normalized.columns.length; j++) {
        const col = normalized.columns[j]
        const td = document.createElement('td')
        const value = row[col.key]
        setText(td, typeof value === 'object' ? JSON.stringify(value) : value)
        bodyTr.append(td)
      }
      bodyTr.addEventListener('click', () => emit(this, 'row-click', { row, index: i }))
      body.append(bodyTr)
    }
  }
}

function normalizeTableData(data) {
  if (data && Array.isArray(data.rows)) {
    const rows = data.rows
    const columns = (data.columns || inferColumns(rows)).map(col => {
      if (typeof col === 'string') {
        return { key: col, label: col }
      }
      return { key: col.key || col.value, label: col.label || col.key || col.value }
    })
    return { rows, columns }
  }
  if (Array.isArray(data)) {
    return { rows: data, columns: inferColumns(data) }
  }
  if (data && typeof data === 'object') {
    const rows = Object.keys(data).map(key => ({ key, value: data[key] }))
    return { rows, columns: inferColumns(rows) }
  }
  return { rows: [], columns: [] }
}

function inferColumns(rows) {
  const keys = []
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    if (!row || typeof row !== 'object') {
      continue
    }
    const rowKeys = Object.keys(row)
    for (let j = 0; j < rowKeys.length; j++) {
      if (!keys.includes(rowKeys[j])) {
        keys.push(rowKeys[j])
      }
    }
  }
  return keys.map(key => ({ key, label: key }))
}

class CompactTooltip extends HTMLElement {
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
    trigger.addEventListener('mouseenter', event => this.show(event))
    trigger.addEventListener('mouseleave', () => this.hide())
    trigger.addEventListener('focus', event => this.show(event))
    trigger.addEventListener('blur', () => this.hide())
    trigger.addEventListener('click', event => {
      if (this.hasAttribute('open-on-click')) {
        event.preventDefault()
        if (this._open) {
          this.hide(true)
        } else {
          this.show(event)
        }
      }
    })
  }

  show(event) {
    this._pointer = event && event.clientX ? event : null
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
      placeLayer(rect, this._layer, this._pointer)
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

class CompactHint extends HTMLElement {
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
      placeLayer(rect, this._layer, event && event.clientX ? event : null)
      this._layer.style.visibility = 'visible'
    })
  }

  hide() {
    if (this._layer) {
      this._layer.style.display = 'none'
    }
  }
}

class CompactList extends HTMLElement {
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

class CompactFileInput extends HTMLElement {
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

class CompactTagSelector extends HTMLElement {
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
        border: 1px solid var(--cc-border-strong);
        border-radius: var(--cc-radius);
        background: #fff;
        display: flex;
        align-items: center;
        gap: 3px;
        padding: 3px;
        flex-wrap: wrap;
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
        opacity: .25;
      }

      .tag:hover .remove,
      .tag:focus-within .remove,
      .box:focus-within .remove {
        opacity: 1;
      }

      input {
        flex: 1 1 120px;
        min-width: 80px;
        border: 0;
        outline: 0;
        min-height: 28px;
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
      input.value = ''
      return
    }
    if (event.key === ' ' && input.value.trim()) {
      const now = performance.now()
      if (now - this._lastSpaceAt < 500) {
        event.preventDefault()
        this.addTag(input.value)
        input.value = ''
      }
      this._lastSpaceAt = now
    }
    if (event.key === 'Backspace' && input.value === '' && this._tags.length) {
      this.removeTag(this._tags.length - 1)
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

defineElement('compact-navbar', CompactNavbar)
defineElement('compact-tabs', CompactTabs)
defineElement('compact-button', CompactButton)
defineElement('compact-split-button', CompactSplitButton)
defineElement('compact-checkbox', CompactCheckbox)
defineElement('compact-select', CompactSelect)
defineElement('compact-input', CompactInput)
defineElement('compact-textarea', CompactTextarea)
defineElement('compact-box', CompactBox)

class CompactSection extends HTMLElement {
  static get observedAttributes() { return ["title"] }
  connectedCallback() { this.render() }
  attributeChangedCallback() { this.render() }
  render() {
    const root = shadow(this, `
      :host { display: block; }
      .section { border: 1px solid var(--cc-border, #ccc); border-radius: 6px; background: var(--cc-bg-alt, #fafafa); padding: 8px; display: flex; flex-direction: column; gap: 7px; min-width: 0; height: 100%; box-sizing: border-box; }
      .title { font-size: 14px; margin: 0; padding-bottom: 4px; border-bottom: 1px solid var(--cc-border-light, #ddd); font-weight: 600; }
      .title:empty { display: none; }
    `, `
      <section class="section">
        <h2 class="title"></h2>
        <slot></slot>
      </section>
    `)
    setText(root.querySelector(".title"), this.getAttribute("title") || "")
  }
}

defineElement("compact-section", CompactSection)

defineElement('compact-dropdown', CompactDropdown)
defineElement('compact-horizontal-select', CompactHorizontalSelect)
defineElement('compact-audio-player', CompactAudioPlayer)
defineElement('compact-audio-recorder', CompactAudioRecorder)
defineElement('compact-modal', CompactModal)
defineElement('compact-dialog', CompactDialog)
defineElement('compact-message', CompactMessage)
defineElement('compact-toast', CompactToast)
defineElement('compact-stacked-bar-chart', CompactStackedBarChart)
defineElement('compact-line-chart', CompactLineChart)
defineElement('compact-horizontal-bar-chart', CompactHorizontalBarChart)
defineElement('compact-table', CompactTable)
defineElement('compact-tooltip', CompactTooltip)
defineElement('compact-hint', CompactHint)
defineElement('compact-ordered-list', CompactList)
defineElement('compact-unordered-list', CompactList)
defineElement('compact-file-input', CompactFileInput)
defineElement('compact-tag-selector', CompactTagSelector)

window.CompactUi = {
  docs: componentsDocs,
  toast: options => CompactToast.show(options),
}