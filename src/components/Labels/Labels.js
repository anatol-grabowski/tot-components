const labelsStyle = `
  :host {
    display: block;
    max-width: 100%;
    min-width: 0;
  }

  :host([hidden]) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .labels {
    --labels-entry-height: 1.65rem;
    --labels-entry-prefix-spacing: var(--tot-spacing-2x-small, .375rem);
    --labels-entry-spacing: var(--tot-spacing-2x-small, .375rem);
    --labels-font-size: var(--tot-input-font-size-small, .8125rem);
    --labels-gap: var(--tot-spacing-2x-small, .25rem);
    --labels-label-min-height: 1.4rem;
    --labels-label-padding-block: .0625rem;
    --labels-label-padding-inline: .4rem;

    align-items: flex-start;
    color: var(--tot-input-color, #1e293b);
    display: flex;
    flex-wrap: wrap;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--labels-font-size);
    gap: var(--labels-gap);
    line-height: var(--tot-line-height-dense, 1.35);
    max-width: 100%;
    min-width: 0;
  }

  .labels--medium {
    --labels-entry-height: var(--tot-input-height-medium, 2.25rem);
    --labels-entry-prefix-spacing: var(--tot-spacing-x-small, .5rem);
    --labels-entry-spacing: var(--tot-input-spacing-medium, .75rem);
    --labels-font-size: var(--tot-input-font-size-medium, .875rem);
    --labels-gap: var(--tot-spacing-x-small, .5rem);
    --labels-label-min-height: 1.75rem;
    --labels-label-padding-block: .125rem;
    --labels-label-padding-inline: .55rem;
  }

  .labels--large {
    --labels-entry-height: var(--tot-input-height-large, 2.75rem);
    --labels-entry-prefix-spacing: var(--tot-spacing-x-small, .5rem);
    --labels-entry-spacing: var(--tot-input-spacing-large, 1rem);
    --labels-font-size: var(--tot-input-font-size-large, 1rem);
    --labels-gap: var(--tot-spacing-x-small, .5rem);
    --labels-label-min-height: 2.1rem;
    --labels-label-padding-block: .1875rem;
    --labels-label-padding-inline: .7rem;
  }

  .label {
    align-items: center;
    background: var(--label-background-color, hsl(200 88% 91%));
    border: var(--tot-panel-border-width, 1px) solid var(--label-border-color, hsl(200 72% 74%));
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--label-color, hsl(200 82% 22%));
    cursor: default;
    display: inline-flex;
    font-weight: var(--tot-font-weight-semibold, 600);
    max-width: min(100%, 16rem);
    min-height: var(--labels-label-min-height);
    min-width: 0;
    overflow: hidden;
    padding: var(--labels-label-padding-block) var(--labels-label-padding-inline);
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .label:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .label__text {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .label__remove {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: var(--label-background-color, hsl(200 88% 91%));
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-size: .95em;
    font-weight: var(--tot-font-weight-bold, 700);
    height: 1.35em;
    inset-inline-end: .0625rem;
    justify-content: center;
    line-height: 1;
    opacity: 0;
    padding: 0;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: var(--tot-transition-fast, 150ms) opacity;
    width: 1.35em;
  }

  .label__remove:hover {
    background: var(--label-border-color, hsl(200 72% 74%));
  }

  .label__remove:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .label--active .label__remove,
  .label:focus .label__remove,
  .label:focus-within .label__remove {
    opacity: 1;
    pointer-events: auto;
  }

  @media (hover: hover) and (pointer: fine) {
    .label:hover .label__remove {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .entry {
    display: block;
    flex: 1 0 100%;
    margin-block-start: var(--labels-gap);
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }

  .entry::part(base) {
    border-radius: var(--tot-input-border-radius-small, var(--tot-border-radius-small, 3px));
    font-size: var(--labels-font-size);
    height: var(--labels-entry-height);
    min-height: var(--labels-entry-height);
    padding-inline: var(--labels-entry-spacing);
    padding-inline-start: var(--labels-entry-prefix-spacing);
  }

  .entry::part(input) {
    min-width: 3rem;
  }

  .add-button {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-icon-color, #64748b);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    height: 1.45em;
    justify-content: center;
    line-height: 1;
    padding: 0;
    width: 1.45em;
  }

  .add-button:hover:not(:disabled) {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .add-button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .add-button:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
`

const sizes = ['small', 'medium', 'large']

export class TotLabels extends HTMLElement {
  static get observedAttributes() {
    return [
      'disabled',
      'labels',
      'placeholder',
      'readonly',
      'size',
    ]
  }

  constructor() {
    super()
    this._labels = null
    this._draft = ''
    this._activeLabel = ''
    this._isRendering = false
    this._handleRootClick = (event) => this.handleClick(event)
    this._handleRootKeydown = (event) => this.handleKeydown(event)
  }

  get labels() {
    if (this._labels) {
      return this._labels.slice()
    }

    return parseLabels(this.getAttribute('labels'))
  }

  set labels(value) {
    this._labels = normalizeLabels(value)
    this._activeLabel = ''
    this.render()
  }

  get placeholder() {
    return this.getAttribute('placeholder') || 'Add label'
  }

  set placeholder(value) {
    setNullableAttribute(this, 'placeholder', value)
  }

  get readonly() {
    return this.hasAttribute('readonly')
  }

  set readonly(value) {
    setBooleanAttribute(this, 'readonly', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  get size() {
    return getSupportedValue(this.getAttribute('size'), sizes, 'small')
  }

  set size(value) {
    this.setAttribute('size', getSupportedValue(value, sizes, 'small'))
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (this._isRendering) {
      return
    }

    if (name === 'labels') {
      this._labels = null
      this._activeLabel = ''
    }

    if (name === 'disabled' || name === 'readonly') {
      this._activeLabel = ''
    }

    this.render()
  }

  focus(options) {
    const input = this.getInputComponent()
    if (input) {
      input.focus(options)
    }
  }

  addLabel(label) {
    if (this.disabled || this.readonly) {
      return false
    }

    const nextLabel = normalizeLabel(label)
    if (!nextLabel) {
      return false
    }

    const labels = this.labels
    if (hasLabel(labels, nextLabel)) {
      this.clearDraft()
      return false
    }

    labels.push(nextLabel)
    this._labels = labels
    this._activeLabel = ''
    this.clearDraft()
    this.render()
    this.focus()
    emit(this, 'add', {
      label: nextLabel,
      labels: this.labels,
    })
    emit(this, 'change', {
      action: 'add',
      label: nextLabel,
      labels: this.labels,
    })
    return true
  }

  removeLabel(label) {
    const normalizedLabel = normalizeLabel(label)
    const labels = this.labels
    for (let i = 0; i < labels.length; i++) {
      if (labels[i] === normalizedLabel) {
        return this.removeLabelAt(i)
      }
    }
    return false
  }

  removeLabelAt(index) {
    if (this.disabled || this.readonly) {
      return false
    }

    const labels = this.labels
    if (index < 0 || index >= labels.length) {
      return false
    }

    const removedLabel = labels.splice(index, 1)[0]
    this._labels = labels
    if (this._activeLabel === removedLabel) {
      this._activeLabel = ''
    }

    this.render()
    emit(this, 'remove', {
      label: removedLabel,
      labels: this.labels,
    })
    emit(this, 'change', {
      action: 'remove',
      label: removedLabel,
      labels: this.labels,
    })
    return true
  }

  render() {
    if (!this.isConnected && !this.shadowRoot) {
      return
    }

    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const labels = this.labels
    const disabled = this.disabled
    const readonly = this.readonly
    const size = this.size
    const classes = ['labels', `labels--${size}`]
    const tiles = []

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i]
      const color = getLabelColor(label)
      const classes = ['label']

      if (!disabled && !readonly && label === this._activeLabel) {
        classes.push('label--active')
      }

      const removeButton = disabled || readonly
        ? ''
        : `<button class="label__remove" type="button" part="label-remove" tabindex="-1" aria-label="Remove ${escapeAttribute(label)}">×</button>`

      tiles.push(`<span
        class="${escapeAttribute(classes.join(' '))}"
        data-index="${i}"
        part="label"
        role="listitem"
        style="--label-background-color: ${color.background}; --label-border-color: ${color.border}; --label-color: ${color.text};"
        ${disabled || readonly ? '' : 'tabindex="0"'}
        title="${escapeAttribute(label)}"
      >
        <span class="label__text" part="label-text">${escapeHtml(label)}</span>
        ${removeButton}
      </span>`)
    }

    const entry = readonly
      ? ''
      : `<tot-input class="entry" size="${escapeAttribute(size)}" placeholder="${escapeAttribute(this.placeholder)}" value="${escapeAttribute(this._draft)}" ${disabled ? 'disabled' : ''}>
          <button class="add-button" slot="prefix" type="button" aria-label="Add label" ${disabled || !this._draft.trim() ? 'disabled' : ''}>➕</button>
        </tot-input>`

    this._isRendering = true
    root.innerHTML = `<style>${labelsStyle}</style>
      <div class="${escapeAttribute(classes.join(' '))}" part="base" role="list">
        ${tiles.join('')}
        ${entry}
      </div>
    `
    this._isRendering = false

    const input = this.getInputComponent()
    const addButton = root.querySelector('.add-button')
    if (input) {
      input.addEventListener('input', (event) => this.handleDraftInput(event))
      input.addEventListener('change', (event) => event.stopPropagation())
      input.addEventListener('clear', (event) => event.stopPropagation())
      input.addEventListener('keydown', (event) => this.handleDraftKeydown(event))
    }

    if (addButton) {
      addButton.addEventListener('mousedown', (event) => event.preventDefault())
      addButton.addEventListener('click', (event) => this.handleAddButtonClick(event))
    }

    root.removeEventListener('click', this._handleRootClick)
    root.removeEventListener('keydown', this._handleRootKeydown)
    root.addEventListener('click', this._handleRootClick)
    root.addEventListener('keydown', this._handleRootKeydown)
  }

  handleDraftInput(event) {
    event.stopPropagation()
    const input = this.getInputComponent()
    this._draft = input ? input.value : ''
    this.updateAddButton()
  }

  handleDraftKeydown(event) {
    if (this.disabled || this.readonly || event.isComposing) {
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      this.addDraft()
      return
    }

    if (!isSpaceKey(event)) {
      return
    }

    const value = this.getDraftValue()
    if (!value || !value.endsWith(' ')) {
      return
    }

    event.preventDefault()
    this._draft = value
    this.addDraft()
  }

  handleAddButtonClick(event) {
    event.preventDefault()
    event.stopPropagation()
    this.addDraft()
  }

  handleClick(event) {
    if (this.disabled || this.readonly) {
      return
    }

    const removeButton = closestElement(event.target, '.label__remove')
    if (removeButton) {
      event.preventDefault()
      event.stopPropagation()
      const labelElement = closestElement(removeButton, '.label')
      this.removeLabelAt(getElementIndex(labelElement))
      return
    }

    const labelElement = closestElement(event.target, '.label')
    if (!labelElement) {
      this._activeLabel = ''
      this.updateActiveLabel()
      return
    }

    this._activeLabel = this.labels[getElementIndex(labelElement)] || ''
    this.updateActiveLabel()
  }

  handleKeydown(event) {
    if (this.disabled || this.readonly) {
      return
    }

    const labelElement = closestElement(event.target, '.label')
    if (!labelElement || closestElement(event.target, '.entry')) {
      return
    }

    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault()
      this.removeLabelAt(getElementIndex(labelElement))
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this._activeLabel = this.labels[getElementIndex(labelElement)] || ''
      this.updateActiveLabel()
    }
  }

  addDraft() {
    const label = this.getDraftValue().trim()
    if (!label) {
      this.clearDraft()
      return false
    }

    return this.addLabel(label)
  }

  clearDraft() {
    this._draft = ''
    const input = this.getInputComponent()
    if (input) {
      input.value = ''
    }
    this.updateAddButton()
  }

  getDraftValue() {
    const input = this.getInputComponent()
    if (input) {
      return input.value
    }
    return this._draft
  }

  getInputComponent() {
    return this.shadowRoot?.querySelector('.entry')
  }

  updateAddButton() {
    const addButton = this.shadowRoot?.querySelector('.add-button')
    if (!addButton) {
      return
    }

    addButton.disabled = this.disabled || this.readonly || !this._draft.trim()
  }

  updateActiveLabel() {
    const labels = this.shadowRoot?.querySelectorAll('.label') || []
    const currentLabels = this.labels
    const activeAllowed = !this.disabled && !this.readonly
    for (let i = 0; i < labels.length; i++) {
      labels[i].classList.toggle('label--active', activeAllowed && currentLabels[i] === this._activeLabel)
    }
  }
}

const labelColors = [
  {
    background: 'hsl(0 92% 90%)',
    border: 'hsl(0 80% 66%)',
    text: 'hsl(0 72% 24%)',
  },
  {
    background: 'hsl(24 95% 88%)',
    border: 'hsl(24 86% 58%)',
    text: 'hsl(24 78% 23%)',
  },
  {
    background: 'hsl(42 100% 84%)',
    border: 'hsl(38 92% 52%)',
    text: 'hsl(36 92% 20%)',
  },
  {
    background: 'hsl(61 92% 84%)',
    border: 'hsl(56 84% 50%)',
    text: 'hsl(50 90% 18%)',
  },
  {
    background: 'hsl(82 88% 84%)',
    border: 'hsl(83 74% 48%)',
    text: 'hsl(92 76% 20%)',
  },
  {
    background: 'hsl(120 70% 84%)',
    border: 'hsl(128 58% 50%)',
    text: 'hsl(132 64% 20%)',
  },
  {
    background: 'hsl(151 74% 84%)',
    border: 'hsl(158 64% 46%)',
    text: 'hsl(157 72% 18%)',
  },
  {
    background: 'hsl(174 76% 84%)',
    border: 'hsl(178 66% 44%)',
    text: 'hsl(178 78% 17%)',
  },
  {
    background: 'hsl(188 86% 84%)',
    border: 'hsl(189 74% 50%)',
    text: 'hsl(191 84% 20%)',
  },
  {
    background: 'hsl(199 94% 86%)',
    border: 'hsl(199 84% 56%)',
    text: 'hsl(201 86% 22%)',
  },
  {
    background: 'hsl(218 92% 88%)',
    border: 'hsl(217 82% 62%)',
    text: 'hsl(222 76% 26%)',
  },
  {
    background: 'hsl(240 88% 90%)',
    border: 'hsl(239 76% 68%)',
    text: 'hsl(240 68% 28%)',
  },
  {
    background: 'hsl(261 88% 90%)',
    border: 'hsl(262 78% 68%)',
    text: 'hsl(263 72% 28%)',
  },
  {
    background: 'hsl(280 86% 90%)',
    border: 'hsl(280 76% 66%)',
    text: 'hsl(281 70% 26%)',
  },
  {
    background: 'hsl(303 86% 90%)',
    border: 'hsl(303 74% 62%)',
    text: 'hsl(306 72% 24%)',
  },
  {
    background: 'hsl(328 88% 90%)',
    border: 'hsl(330 78% 64%)',
    text: 'hsl(331 72% 24%)',
  },
  {
    background: 'hsl(345 90% 90%)',
    border: 'hsl(345 80% 64%)',
    text: 'hsl(345 74% 24%)',
  },
]

function parseLabels(value) {
  if (!value) {
    return []
  }

  try {
    const parsed = JSON.parse(value)
    return normalizeLabels(parsed)
  } catch (_error) {
    return normalizeLabels(String(value).split(','))
  }
}

function normalizeLabels(value) {
  if (!Array.isArray(value)) {
    return []
  }

  const labels = []
  for (let i = 0; i < value.length; i++) {
    const label = normalizeLabel(value[i])
    if (label && !hasLabel(labels, label)) {
      labels.push(label)
    }
  }
  return labels
}

function normalizeLabel(value) {
  return String(value === null || value === undefined ? '' : value).replace(/\s+/g, ' ').trim()
}

function hasLabel(labels, label) {
  for (let i = 0; i < labels.length; i++) {
    if (labels[i] === label) {
      return true
    }
  }
  return false
}

function getLabelColor(label) {
  const hash = hashString(label.toLowerCase())
  const index = ((hash ^ (hash >>> 16)) >>> 0) % labelColors.length
  return labelColors[index]
}

function hashString(value) {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function getSupportedValue(value, supportedValues, fallback) {
  const normalizedValue = value || fallback
  for (let i = 0; i < supportedValues.length; i++) {
    if (supportedValues[i] === normalizedValue) {
      return normalizedValue
    }
  }
  return fallback
}

function isSpaceKey(event) {
  return event.key === ' ' || event.key === 'Spacebar' || event.code === 'Space'
}

function closestElement(target, selector) {
  if (!(target instanceof Element)) {
    return null
  }

  return target.closest(selector)
}

function getElementIndex(element) {
  if (!element) {
    return -1
  }

  const index = Number(element.dataset.index)
  return Number.isFinite(index) ? index : -1
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
