const suggestionsStyle = `
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

  .suggestions {
    --tot-suggestions-font-size: var(--tot-input-font-size-small, .8125rem);
    --tot-suggestions-gap: var(--tot-spacing-2x-small, .25rem);
    --tot-suggestions-group-gap: var(--tot-spacing-x-small, .5rem);
    --tot-suggestions-separator-gap: var(--tot-spacing-x-small, .5rem);
    --tot-suggestions-tile-min-height: 1.4rem;
    --tot-suggestions-tile-padding-block: .0625rem;
    --tot-suggestions-tile-padding-inline: .4rem;

    align-items: flex-start;
    color: var(--tot-input-color, #1e293b);
    display: flex;
    flex-wrap: wrap;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-suggestions-font-size);
    gap: var(--tot-suggestions-gap) var(--tot-suggestions-group-gap);
    line-height: var(--tot-line-height-dense, 1.35);
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
  }

  .suggestions--medium {
    --tot-suggestions-font-size: var(--tot-input-font-size-medium, .875rem);
    --tot-suggestions-gap: var(--tot-spacing-x-small, .5rem);
    --tot-suggestions-group-gap: var(--tot-spacing-small, .75rem);
    --tot-suggestions-separator-gap: var(--tot-spacing-small, .75rem);
    --tot-suggestions-tile-min-height: 1.75rem;
    --tot-suggestions-tile-padding-block: .125rem;
    --tot-suggestions-tile-padding-inline: .55rem;
  }

  .suggestions--large {
    --tot-suggestions-font-size: var(--tot-input-font-size-large, 1rem);
    --tot-suggestions-gap: var(--tot-spacing-x-small, .5rem);
    --tot-suggestions-group-gap: var(--tot-spacing-small, .75rem);
    --tot-suggestions-separator-gap: var(--tot-spacing-small, .75rem);
    --tot-suggestions-tile-min-height: 2.1rem;
    --tot-suggestions-tile-padding-block: .1875rem;
    --tot-suggestions-tile-padding-inline: .7rem;
  }

  .suggestions--expanded {
    max-height: var(--tot-suggestions-expanded-max-height, 12rem);
    overflow: auto;
    padding-inline-end: var(--tot-spacing-3x-small, .125rem);
    scrollbar-color: var(--tot-color-neutral-300, #cbd5e1) transparent;
    scrollbar-width: thin;
  }

  .suggestion-separator {
    align-self: stretch;
    background: var(--tot-panel-border-color, var(--tot-color-neutral-300, #cbd5e1));
    flex: 0 0 var(--tot-panel-border-width, 1px);
    margin-block: .1875rem;
    margin-inline: calc((var(--tot-suggestions-separator-gap) - var(--tot-suggestions-group-gap)) / 2) calc(var(--tot-suggestions-separator-gap) / 2);
    min-height: 1rem;
  }

  .suggestion {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: var(--tot-suggestions-background-color, var(--tot-color-neutral-100, #f1f5f9));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-suggestions-border-color, var(--tot-color-neutral-300, #cbd5e1));
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--tot-suggestions-color, var(--tot-color-neutral-800, #1e293b));
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-weight: var(--tot-font-weight-semibold, 600);
    justify-content: center;
    line-height: inherit;
    margin: 0;
    max-width: min(100%, 18rem);
    min-height: var(--tot-suggestions-tile-min-height);
    min-width: 0;
    overflow: hidden;
    padding: var(--tot-suggestions-tile-padding-block) var(--tot-suggestions-tile-padding-inline);
    text-align: start;
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) color;
    user-select: none;
    -webkit-user-select: none;
  }

  .suggestion:hover {
    background: var(--tot-suggestions-background-color-hover, var(--tot-color-neutral-200, #e2e8f0));
    border-color: var(--tot-suggestions-border-color-hover, var(--tot-color-neutral-400, #94a3b8));
    color: var(--tot-suggestions-color-hover, var(--tot-color-neutral-900, #0f172a));
  }

  .suggestion:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .suggestion__text {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .suggestions-action {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: var(--tot-panel-border-width, 1px) dashed var(--tot-suggestions-action-border-color, var(--tot-color-neutral-400, #94a3b8));
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-suggestions-action-color, var(--tot-color-neutral-600, #475569));
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-weight: var(--tot-font-weight-normal, 400);
    justify-content: center;
    line-height: inherit;
    margin: 0;
    max-width: min(100%, 18rem);
    min-height: var(--tot-suggestions-tile-min-height);
    min-width: 0;
    overflow: hidden;
    padding: var(--tot-suggestions-tile-padding-block) calc(var(--tot-suggestions-tile-padding-inline) * .8);
    text-align: start;
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) color;
    user-select: none;
    -webkit-user-select: none;
  }

  .suggestions-action:hover {
    background: var(--tot-suggestions-action-background-color-hover, var(--tot-color-neutral-100, #f1f5f9));
    border-color: var(--tot-suggestions-action-border-color-hover, var(--tot-color-neutral-500, #64748b));
    color: var(--tot-suggestions-action-color-hover, var(--tot-color-neutral-900, #0f172a));
  }

  .suggestions-action:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .suggestions-action__text {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const sizes = ['small', 'medium', 'large']

export class TotSuggestions extends HTMLElement {
  static get observedAttributes() {
    return [
      'expanded',
      'limit',
      'line-limit',
      'lines',
      'size',
      'suggestions',
    ]
  }

  constructor() {
    super()
    this._suggestionGroups = null
    this._lineVisibleCount = null
    this._measureFrame = 0
    this._resizeObserver = null
    this._lastMeasuredWidth = -1

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${suggestionsStyle}</style>
      <div class="suggestions suggestions--small" part="base" role="list"></div>
    `

    this._baseElement = root.querySelector('.suggestions')
    this._baseElement.addEventListener('click', event => this._handleClick(event))
  }

  get suggestions() {
    return cloneGroups(this._getSuggestionGroups())
  }

  set suggestions(value) {
    this._suggestionGroups = normalizeSuggestionGroups(value)
    this._resetLineLimit()
    this._render()
  }

  get limit() {
    return parseLimit(this.getAttribute('limit'))
  }

  set limit(value) {
    setNullableNumberAttribute(this, 'limit', value)
  }

  get lineLimit() {
    return parseLimit(this.getAttribute('line-limit') || this.getAttribute('lines'))
  }

  set lineLimit(value) {
    setNullableNumberAttribute(this, 'line-limit', value)
  }

  get expanded() {
    return this.hasAttribute('expanded')
  }

  set expanded(value) {
    setBooleanAttribute(this, 'expanded', value)
  }

  get size() {
    return getSupportedValue(this.getAttribute('size'), sizes, 'small')
  }

  set size(value) {
    this.setAttribute('size', getSupportedValue(value, sizes, 'small'))
  }

  connectedCallback() {
    this._render()
    this._startObserving()
  }

  disconnectedCallback() {
    this._stopObserving()
    this._cancelMeasure()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'suggestions') {
      this._suggestionGroups = null
    }

    if (name !== 'expanded' || !this.expanded) {
      this._resetLineLimit()
    }

    this._render()
  }

  getBase() {
    return this._baseElement
  }

  _render() {
    const groups = this._getSuggestionGroups()
    const total = countSuggestions(groups)
    const expanded = this.expanded
    const limit = this.limit
    const lineLimit = this.lineLimit
    let visibleCount = total

    if (!expanded && limit > 0) {
      visibleCount = Math.min(visibleCount, limit)
    }

    if (!expanded && lineLimit > 0 && this._lineVisibleCount !== null) {
      visibleCount = Math.min(visibleCount, this._lineVisibleCount)
    }

    const hiddenCount = expanded ? 0 : Math.max(0, total - visibleCount)
    this._syncClasses(expanded)

    const fragment = document.createDocumentFragment()
    this._appendSuggestions(fragment, groups, visibleCount)
    this._appendAction(fragment, total, hiddenCount, expanded, limit, lineLimit)
    this._baseElement.replaceChildren(fragment)

    if (this.isConnected) {
      this._startObserving()
    }

    if (!expanded && lineLimit > 0 && this._lineVisibleCount === null) {
      this._scheduleMeasure()
    }
  }

  _syncClasses(expanded) {
    const size = this.size
    this._baseElement.classList.remove(
      'suggestions--small',
      'suggestions--medium',
      'suggestions--large',
    )
    this._baseElement.classList.add(`suggestions--${size}`)
    this._baseElement.classList.toggle('suggestions--expanded', expanded)
  }

  _appendSuggestions(fragment, groups, visibleCount) {
    let remaining = visibleCount
    let flatIndex = 0
    let renderedGroups = 0

    for (let groupIndex = 0; groupIndex < groups.length && remaining > 0; groupIndex++) {
      const group = groups[groupIndex]
      let groupRendered = false

      for (let index = 0; index < group.length && remaining > 0; index++) {
        if (!groupRendered && renderedGroups > 0) {
          const separator = document.createElement('span')
          separator.className = 'suggestion-separator'
          separator.setAttribute('part', 'separator')
          separator.setAttribute('aria-hidden', 'true')
          fragment.append(separator)
        }

        fragment.append(this._createSuggestion(group[index], groupIndex, index, flatIndex))
        remaining -= 1
        flatIndex += 1
        groupRendered = true
      }

      if (groupRendered) {
        renderedGroups += 1
      }
    }
  }

  _createSuggestion(suggestion, groupIndex, index, flatIndex) {
    const button = document.createElement('button')
    button.className = 'suggestion'
    button.type = 'button'
    button.dataset.groupIndex = String(groupIndex)
    button.dataset.index = String(index)
    button.dataset.flatIndex = String(flatIndex)
    button.setAttribute('part', 'suggestion')
    button.setAttribute('role', 'listitem')
    button.title = suggestion

    const text = document.createElement('span')
    text.className = 'suggestion__text'
    text.setAttribute('part', 'suggestion-text')
    text.textContent = suggestion
    button.append(text)
    return button
  }

  _appendAction(fragment, total, hiddenCount, expanded, limit, lineLimit) {
    if (hiddenCount > 0) {
      fragment.append(this._createAction('more', `Show ${hiddenCount} more suggestions`, `...+${hiddenCount}`))
      return
    }

    if (expanded && total > 0 && (limit > 0 || lineLimit > 0)) {
      fragment.append(this._createAction('collapse', 'Collapse suggestions', 'collapse'))
    }
  }

  _createAction(action, label, text) {
    const button = document.createElement('button')
    button.className = `suggestions-action suggestions-action--${action}`
    button.type = 'button'
    button.setAttribute('part', action)
    button.setAttribute('aria-label', label)

    const content = document.createElement('span')
    content.className = 'suggestions-action__text'
    content.textContent = text
    button.append(content)
    return button
  }

  _handleClick(event) {
    const moreButton = closestElement(event.target, '.suggestions-action--more')
    if (moreButton) {
      event.preventDefault()
      this.expanded = true
      return
    }

    const collapseButton = closestElement(event.target, '.suggestions-action--collapse')
    if (collapseButton) {
      event.preventDefault()
      this.expanded = false
      return
    }

    const button = closestElement(event.target, '.suggestion')
    if (!button) {
      return
    }

    emit(this, 'select', this._getEventDetail(button))
  }

  _getEventDetail(button) {
    const groupIndex = parseDataIndex(button, 'groupIndex')
    const index = parseDataIndex(button, 'index')
    const flatIndex = parseDataIndex(button, 'flatIndex')
    const groups = this._getSuggestionGroups()
    const suggestion = groups[groupIndex]?.[index] || ''

    return {
      suggestion,
      value: suggestion,
      groupIndex,
      index,
      flatIndex,
      suggestions: cloneGroups(groups),
    }
  }

  _handleResize() {
    if (this.expanded || this.lineLimit <= 0) {
      return
    }

    const width = Math.round(this._baseElement.getBoundingClientRect().width)
    if (width === this._lastMeasuredWidth) {
      return
    }

    this._lastMeasuredWidth = width
    this._lineVisibleCount = null
    this._cancelMeasure()
    this._render()
  }

  _scheduleMeasure() {
    this._cancelMeasure()
    this._measureFrame = requestAnimationFrame(() => {
      this._measureFrame = 0
      this._measureLineLimit()
    })
  }

  _cancelMeasure() {
    if (!this._measureFrame) {
      return
    }

    cancelAnimationFrame(this._measureFrame)
    this._measureFrame = 0
  }

  _measureLineLimit() {
    if (this.expanded || this.lineLimit <= 0) {
      return
    }

    const baseRect = this._baseElement.getBoundingClientRect()
    const width = Math.round(baseRect.width)
    if (width <= 0) {
      return
    }

    const items = this._baseElement.querySelectorAll('.suggestion')
    const total = countSuggestions(this._getSuggestionGroups())
    this._lastMeasuredWidth = width

    if (!items.length || !total) {
      this._lineVisibleCount = total
      return
    }

    const visibleCount = getVisibleCountByLines(this._baseElement, items, this.lineLimit)
    const nextVisibleCount = visibleCount >= total
      ? total
      : Math.max(1, visibleCount - 1)

    if (nextVisibleCount !== this._lineVisibleCount) {
      this._lineVisibleCount = nextVisibleCount
      this._render()
    }
  }

  _getSuggestionGroups() {
    if (!this._suggestionGroups) {
      this._suggestionGroups = parseSuggestions(this.getAttribute('suggestions'))
    }
    return this._suggestionGroups
  }

  _resetLineLimit() {
    this._lineVisibleCount = null
    this._lastMeasuredWidth = -1
    this._cancelMeasure()
  }

  _startObserving() {
    if (!this.isConnected || !('ResizeObserver' in window)) {
      return
    }

    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => this._handleResize())
    }

    this._resizeObserver.disconnect()
    this._resizeObserver.observe(this._baseElement)
  }

  _stopObserving() {
    this._resizeObserver?.disconnect()
  }
}

function parseSuggestions(value) {
  if (!value) {
    return []
  }

  let source = value
  if (typeof value === 'string') {
    try {
      source = JSON.parse(value)
    } catch (_error) {
      source = value.split(',')
    }
  }

  return normalizeSuggestionGroups(source)
}

function normalizeSuggestionGroups(value) {
  if (!Array.isArray(value)) {
    return []
  }

  let hasGroups = false
  for (let i = 0; i < value.length; i++) {
    if (Array.isArray(value[i])) {
      hasGroups = true
      break
    }
  }

  if (!hasGroups) {
    const group = normalizeSuggestionList(value)
    return group.length ? [group] : []
  }

  const groups = []
  for (let i = 0; i < value.length; i++) {
    const sourceGroup = Array.isArray(value[i]) ? value[i] : [value[i]]
    const group = normalizeSuggestionList(sourceGroup)
    if (group.length) {
      groups.push(group)
    }
  }
  return groups
}

function normalizeSuggestionList(value) {
  const suggestions = []
  for (let i = 0; i < value.length; i++) {
    const suggestion = normalizeSuggestion(value[i])
    if (suggestion) {
      suggestions.push(suggestion)
    }
  }
  return suggestions
}

function normalizeSuggestion(value) {
  return String(value === null || value === undefined ? '' : value).replace(/\s+/g, ' ').trim()
}

function cloneGroups(groups) {
  const clone = []
  for (let i = 0; i < groups.length; i++) {
    clone.push(groups[i].slice())
  }
  return clone
}

function countSuggestions(groups) {
  let count = 0
  for (let i = 0; i < groups.length; i++) {
    count += groups[i].length
  }
  return count
}

function getVisibleCountByLines(base, items, lineLimit) {
  const baseRect = base.getBoundingClientRect()
  const lineTops = []

  for (let i = 0; i < items.length; i++) {
    const rect = items[i].getBoundingClientRect()
    const top = Math.round(rect.top - baseRect.top)
    if (!lineTops.length || Math.abs(lineTops[lineTops.length - 1] - top) > 2) {
      lineTops.push(top)
    }

    if (lineTops.length > lineLimit) {
      return i
    }
  }

  return items.length
}

function parseLimit(value) {
  const number = Number(value)
  if (!Number.isFinite(number) || number <= 0) {
    return 0
  }
  return Math.floor(number)
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

function parseDataIndex(element, key) {
  const value = Number(element.dataset[key])
  return Number.isFinite(value) ? value : -1
}

function closestElement(target, selector) {
  if (!(target instanceof Element)) {
    return null
  }

  return target.closest(selector)
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

function setNullableNumberAttribute(element, name, value) {
  const number = parseLimit(value)
  if (number > 0) {
    element.setAttribute(name, String(number))
  } else {
    element.removeAttribute(name)
  }
}


