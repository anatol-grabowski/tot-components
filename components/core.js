/**
 * Compact Components - Core utilities and styles
 * Shared resources used across all components
 */

export const componentsDocs = [
  ['compact-navbar', 'Tabs in a compact top bar with a configuration button. Attributes: title, tabs, value. Events: change, config-click.'],
  ['compact-tabs', 'Compact tab selector. Attributes: options, value. Event: change.'],
  ['compact-button', 'Button variants primary, secondary, danger. Attribute: disabled. Event: compact-click.'],
  ['compact-split-button', 'Two fixed adjacent actions. Attributes: main-label, alt-label, variant. Events: main-click, alt-click.'],
  ['compact-checkbox', 'Labeled checkbox. Attributes/properties: label, checked, indeterminate, disabled. Event: change.'],
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

export const baseStyle = `
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

export const buttonStyle = `
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

export const palette = ['#0066cc', '#b35c00', '#0b7a3b', '#7a3db8', '#b00020', '#007c89', '#6b5b00', '#444']

let modalLocks = 0
let uid = 0

export function nextId(prefix) {
  uid += 1
  return `${prefix}-${uid}`
}

export function defineElement(name, klass) {
  if (!customElements.get(name)) {
    customElements.define(name, klass)
  }
}

export function shadow(element, styles, html) {
  const root = element.shadowRoot || element.attachShadow({ mode: 'open' })
  root.innerHTML = `<style>${baseStyle}${styles || ''}</style>${html || ''}`
  return root
}

export function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

export function toBool(value) {
  return value !== null && value !== 'false'
}

export function parseJson(value, fallback) {
  if (value === null || value === undefined || value === '') {
    return fallback
  }
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

export function parseOptions(value) {
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

export function setText(node, value) {
  node.textContent = value === undefined || value === null ? '' : String(value)
}

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    seconds = 0
  }
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}

export function lockDocumentScroll() {
  modalLocks += 1
  if (modalLocks === 1) {
    document.documentElement.dataset.compactPreviousOverflow = document.documentElement.style.overflow || ''
    document.body.dataset.compactPreviousOverflow = document.body.style.overflow || ''
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
  }
}

export function unlockDocumentScroll() {
  modalLocks = Math.max(0, modalLocks - 1)
  if (modalLocks === 0) {
    document.documentElement.style.overflow = document.documentElement.dataset.compactPreviousOverflow || ''
    document.body.style.overflow = document.body.dataset.compactPreviousOverflow || ''
    delete document.documentElement.dataset.compactPreviousOverflow
    delete document.body.dataset.compactPreviousOverflow
  }
}

export function placeLayer(triggerRect, layer, pointer) {
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

export function drawEmptyCanvas(canvas, label) {
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
