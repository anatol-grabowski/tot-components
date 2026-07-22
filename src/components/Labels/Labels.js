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
    --tot-labels-entry-height: 1.65rem;
    --tot-labels-entry-prefix-spacing: var(--tot-spacing-3x-small, .125rem);
    --tot-labels-entry-spacing: var(--tot-spacing-2x-small, .375rem);
    --tot-labels-font-size: var(--tot-input-font-size-small, .8125rem);
    --tot-labels-gap: var(--tot-spacing-2x-small, .25rem);
    --tot-labels-label-min-height: 1.4rem;
    --tot-labels-label-padding-block: .0625rem;
    --tot-labels-label-padding-inline: .4rem;

    align-items: flex-start;
    color: var(--tot-input-color, #1e293b);
    display: flex;
    flex-wrap: wrap;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-labels-font-size);
    gap: var(--tot-labels-gap);
    line-height: var(--tot-line-height-dense, 1.35);
    max-width: 100%;
    min-width: 0;
  }

  .labels--medium {
    --tot-labels-entry-height: var(--tot-input-height-medium, 2.25rem);
    --tot-labels-entry-prefix-spacing: var(--tot-spacing-2x-small, .25rem);
    --tot-labels-entry-spacing: var(--tot-input-spacing-medium, .75rem);
    --tot-labels-font-size: var(--tot-input-font-size-medium, .875rem);
    --tot-labels-gap: var(--tot-spacing-x-small, .5rem);
    --tot-labels-label-min-height: 1.75rem;
    --tot-labels-label-padding-block: .125rem;
    --tot-labels-label-padding-inline: .55rem;
  }

  .labels--large {
    --tot-labels-entry-height: var(--tot-input-height-large, 2.75rem);
    --tot-labels-entry-prefix-spacing: var(--tot-spacing-2x-small, .25rem);
    --tot-labels-entry-spacing: var(--tot-input-spacing-large, 1rem);
    --tot-labels-font-size: var(--tot-input-font-size-large, 1rem);
    --tot-labels-gap: var(--tot-spacing-x-small, .5rem);
    --tot-labels-label-min-height: 2.1rem;
    --tot-labels-label-padding-block: .1875rem;
    --tot-labels-label-padding-inline: .7rem;
  }

  .labels__items {
    display: contents;
  }

  .label {
    align-items: center;
    background: var(--tot-label-background-color, hsl(200 88% 91%));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-label-border-color, hsl(200 72% 74%));
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--tot-label-color, hsl(200 82% 22%));
    cursor: default;
    display: inline-flex;
    font-weight: var(--tot-font-weight-semibold, 600);
    max-width: min(100%, 16rem);
    min-height: var(--tot-labels-label-min-height);
    min-width: 0;
    overflow: hidden;
    padding: var(--tot-labels-label-padding-block) var(--tot-labels-label-padding-inline);
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
    background: var(--tot-label-background-color, hsl(200 88% 91%));
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
    background: var(--tot-label-border-color, hsl(200 72% 74%));
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

  .entry[hidden] {
    display: none;
  }

  .entry {
    display: block;
    flex: 1 0 100%;
    margin-block-start: var(--tot-labels-gap);
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }

  .entry::part(control) {
    border-radius: var(--tot-input-border-radius-small, var(--tot-border-radius-small, 3px));
    font-size: var(--tot-labels-font-size);
    height: var(--tot-labels-entry-height);
    min-height: var(--tot-labels-entry-height);
    padding-inline: var(--tot-labels-entry-spacing);
    padding-inline-start: var(--tot-labels-entry-prefix-spacing);
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
    flex: 0 0 auto;
    font: inherit;
    height: 1.1em;
    justify-content: center;
    padding: 0;
    width: 1.1em;
  }

  .add-button svg {
    display: block;
    height: 100%;
    pointer-events: none;
    stroke: currentColor;
    width: 100%;
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

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${labelsStyle}</style>
      <div class="labels labels--small" part="base" role="list">
        <div class="labels__items"></div>
        <tot-input class="entry" part="entry" size="small">
          <button class="add-button" part="add-button" slot="prefix" type="button" aria-label="Add label">
            <svg viewBox="0 0 16 16" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M8 3v10M3 8h10"></path>
            </svg>
          </button>
        </tot-input>
      </div>
    `

    this._baseElement = root.querySelector('.labels')
    this._itemsElement = root.querySelector('.labels__items')
    this._inputElement = root.querySelector('.entry')
    this._addButton = root.querySelector('.add-button')

    this._baseElement.addEventListener('click', event => this._handleClick(event))
    this._baseElement.addEventListener('keydown', event => this._handleKeydown(event))
    this._inputElement.addEventListener('input', event => this._handleDraftInput(event))
    this._inputElement.addEventListener('change', event => event.stopPropagation())
    this._inputElement.addEventListener('clear', event => event.stopPropagation())
    this._inputElement.addEventListener('keydown', event => this._handleDraftKeydown(event))
    this._addButton.addEventListener('mousedown', event => event.preventDefault())
    this._addButton.addEventListener('click', event => this._handleAddButtonClick(event))
  }

  get labels() {
    return this._getLabels().slice()
  }

  set labels(value) {
    this._labels = normalizeLabels(value)
    this._activeLabel = ''
    this._syncLabels()
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
    this._syncAll()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'labels') {
      this._labels = null
      this._activeLabel = ''
      this._syncLabels()
      return
    }

    if (name === 'disabled' || name === 'readonly') {
      this._activeLabel = ''
      this._syncInteractionState()
      this._syncLabels()
      return
    }

    if (name === 'placeholder') {
      this._inputElement.placeholder = this.placeholder
      return
    }

    if (name === 'size') {
      this._syncSize()
    }
  }

  focus(options) {
    if (!this.readonly) {
      this._inputElement.focus(options)
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
      this._clearDraft()
      return false
    }

    labels.push(nextLabel)
    this._labels = labels
    this._activeLabel = ''
    this._clearDraft()
    this._syncLabels()
    this.focus()
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
    if (!Number.isInteger(index) || index < 0 || index >= labels.length) {
      return false
    }

    const removedLabel = labels.splice(index, 1)[0]
    this._labels = labels
    if (this._activeLabel === removedLabel) {
      this._activeLabel = ''
    }

    this._syncLabels()
    emit(this, 'change', {
      action: 'remove',
      label: removedLabel,
      labels: this.labels,
    })
    return true
  }

  getBase() {
    return this._baseElement
  }

  getInputComponent() {
    return this._inputElement
  }

  _syncAll() {
    this._syncSize()
    this._inputElement.placeholder = this.placeholder
    this._inputElement.value = this._draft
    this._syncInteractionState()
    this._syncLabels()
  }

  _syncSize() {
    const size = this.size
    this._baseElement.classList.remove('labels--small', 'labels--medium', 'labels--large')
    this._baseElement.classList.add(`labels--${size}`)
    this._inputElement.size = size
  }

  _syncInteractionState() {
    const readonly = this.readonly
    this._inputElement.hidden = readonly
    this._inputElement.disabled = this.disabled
    this._updateAddButton()
  }

  _syncLabels() {
    const labels = this._getLabels()
    const interactive = !this.disabled && !this.readonly
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < labels.length; i++) {
      fragment.append(this._createLabelElement(labels[i], i, interactive))
    }

    this._itemsElement.replaceChildren(fragment)
    this._updateActiveLabel(labels)
    this._updateAddButton()
  }

  _createLabelElement(label, index, interactive) {
    const color = getLabelColor(label)
    const element = document.createElement('span')
    element.className = 'label'
    element.dataset.index = String(index)
    element.setAttribute('part', 'label')
    element.setAttribute('role', 'listitem')
    element.title = label
    element.style.setProperty('--tot-label-background-color', color.background)
    element.style.setProperty('--tot-label-border-color', color.border)
    element.style.setProperty('--tot-label-color', color.text)

    if (interactive) {
      element.tabIndex = 0
    }

    const text = document.createElement('span')
    text.className = 'label__text'
    text.setAttribute('part', 'label-text')
    text.textContent = label
    element.append(text)

    if (interactive) {
      const remove = document.createElement('button')
      remove.className = 'label__remove'
      remove.type = 'button'
      remove.tabIndex = -1
      remove.setAttribute('part', 'label-remove')
      remove.setAttribute('aria-label', `Remove ${label}`)
      remove.textContent = '×'
      element.append(remove)
    }

    return element
  }

  _handleDraftInput(event) {
    event.stopPropagation()
    this._draft = this._inputElement.value
    this._updateAddButton()
  }

  _handleDraftKeydown(event) {
    if (this.disabled || this.readonly || event.isComposing) {
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      this._addDraft()
      return
    }

    if (!isSpaceKey(event)) {
      return
    }

    const value = this._getDraftValue()
    if (!value || !value.endsWith(' ')) {
      return
    }

    event.preventDefault()
    this._draft = value
    this._addDraft()
  }

  _handleAddButtonClick(event) {
    event.preventDefault()
    event.stopPropagation()
    this._addDraft()
  }

  _handleClick(event) {
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
    this._activeLabel = labelElement
      ? this.labels[getElementIndex(labelElement)] || ''
      : ''
    this._updateActiveLabel()
  }

  _handleKeydown(event) {
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
      this._updateActiveLabel()
    }
  }

  _addDraft() {
    const label = this._getDraftValue().trim()
    if (!label) {
      this._clearDraft()
      return false
    }

    return this.addLabel(label)
  }

  _clearDraft() {
    this._draft = ''
    this._inputElement.value = ''
    this._updateAddButton()
  }

  _getDraftValue() {
    return this._inputElement.value || this._draft
  }

  _getLabels() {
    if (!this._labels) {
      this._labels = parseLabels(this.getAttribute('labels'))
    }
    return this._labels
  }

  _updateAddButton() {
    this._addButton.disabled = this.disabled || this.readonly || !this._draft.trim()
  }

  _updateActiveLabel(labels = this._getLabels()) {
    const elements = this._itemsElement.querySelectorAll('.label')
    const activeAllowed = !this.disabled && !this.readonly
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('label--active', activeAllowed && labels[i] === this._activeLabel)
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


