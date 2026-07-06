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
    --suggestions-font-size: var(--tot-input-font-size-small, .8125rem);
    --suggestions-gap: var(--tot-spacing-2x-small, .25rem);
    --suggestions-group-gap: var(--tot-spacing-x-small, .5rem);
    --suggestions-separator-gap: var(--tot-spacing-x-small, .5rem);
    --suggestions-tile-min-height: 1.4rem;
    --suggestions-tile-padding-block: .0625rem;
    --suggestions-tile-padding-inline: .4rem;

    align-items: flex-start;
    color: var(--tot-input-color, #1e293b);
    display: flex;
    flex-wrap: wrap;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--suggestions-font-size);
    gap: var(--suggestions-gap) var(--suggestions-group-gap);
    line-height: var(--tot-line-height-dense, 1.35);
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
  }

  .suggestions--medium {
    --suggestions-font-size: var(--tot-input-font-size-medium, .875rem);
    --suggestions-gap: var(--tot-spacing-x-small, .5rem);
    --suggestions-group-gap: var(--tot-spacing-small, .75rem);
    --suggestions-separator-gap: var(--tot-spacing-small, .75rem);
    --suggestions-tile-min-height: 1.75rem;
    --suggestions-tile-padding-block: .125rem;
    --suggestions-tile-padding-inline: .55rem;
  }

  .suggestions--large {
    --suggestions-font-size: var(--tot-input-font-size-large, 1rem);
    --suggestions-gap: var(--tot-spacing-x-small, .5rem);
    --suggestions-group-gap: var(--tot-spacing-small, .75rem);
    --suggestions-separator-gap: var(--tot-spacing-small, .75rem);
    --suggestions-tile-min-height: 2.1rem;
    --suggestions-tile-padding-block: .1875rem;
    --suggestions-tile-padding-inline: .7rem;
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
    margin-inline: calc((var(--suggestions-separator-gap) - var(--suggestions-group-gap)) / 2) calc(var(--suggestions-separator-gap) / 2);
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
    min-height: var(--suggestions-tile-min-height);
    min-width: 0;
    overflow: hidden;
    padding: var(--suggestions-tile-padding-block) var(--suggestions-tile-padding-inline);
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
    min-height: var(--suggestions-tile-min-height);
    min-width: 0;
    overflow: hidden;
    padding: var(--suggestions-tile-padding-block) calc(var(--suggestions-tile-padding-inline) * .8);
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
    this._isRendering = false
    this._lineVisibleCount = null
    this._measureRaf = 0
    this._resizeObserver = null
    this._lastMeasuredWidth = -1
    this._handleRootClick = (event) => this.handleClick(event)
    this._handleResize = () => this.handleResize()
  }

  get suggestions() {
    if (this._suggestionGroups) {
      return cloneGroups(this._suggestionGroups)
    }

    return parseSuggestions(this.getAttribute('suggestions'))
  }

  set suggestions(value) {
    this._suggestionGroups = normalizeSuggestionGroups(value)
    this.resetLineLimit()
    this.render()
  }

  get limit() {
    return parseLimit(this.getAttribute('limit'))
  }

  set limit(value) {
    setNullableNumberAttribute(this, 'limit', value)
  }

  get lineLimit() {
    const value = this.getAttribute('line-limit') || this.getAttribute('lines')
    return parseLimit(value)
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
    this.render()
  }

  disconnectedCallback() {
    this.stopObserving()
    this.cancelMeasure()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (this._isRendering) {
      return
    }

    if (name === 'suggestions') {
      this._suggestionGroups = null
    }

    if (name !== 'expanded') {
      this.resetLineLimit()
    }

    this.render()
  }

  render() {
    if (!this.isConnected && !this.shadowRoot) {
      return
    }

    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const groups = this.suggestions
    const total = countSuggestions(groups)
    const expanded = this.expanded
    const limit = this.limit
    const lineLimit = this.lineLimit
    const size = this.size
    let visibleCount = total

    if (!expanded && limit > 0) {
      visibleCount = Math.min(visibleCount, limit)
    }

    if (!expanded && lineLimit > 0 && this._lineVisibleCount !== null) {
      visibleCount = Math.min(visibleCount, this._lineVisibleCount)
    }

    const hiddenCount = expanded ? 0 : Math.max(0, total - visibleCount)
    const classes = ['suggestions', `suggestions--${size}`]

    if (expanded) {
      classes.push('suggestions--expanded')
    }

    this._isRendering = true
    root.innerHTML = `<style>${suggestionsStyle}</style>
      <div class="${escapeAttribute(classes.join(' '))}" part="base" role="list">
        ${this.renderGroups(groups, visibleCount)}
        ${this.renderAction(total, hiddenCount, expanded, limit, lineLimit)}
      </div>
    `
    this._isRendering = false

    root.removeEventListener('click', this._handleRootClick)
    root.addEventListener('click', this._handleRootClick)
    this.startObserving()

    if (!expanded && lineLimit > 0 && this._lineVisibleCount === null) {
      this.scheduleMeasure()
    }
  }

  renderGroups(groups, visibleCount) {
    const html = []
    let remaining = visibleCount
    let flatIndex = 0
    let renderedGroups = 0

    for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
      if (remaining <= 0) {
        break
      }

      const group = groups[groupIndex]
      let groupRendered = false
      for (let index = 0; index < group.length; index++) {
        if (remaining <= 0) {
          break
        }

        if (!groupRendered && renderedGroups > 0) {
          html.push('<span class="suggestion-separator" part="separator" aria-hidden="true"></span>')
        }

        const suggestion = group[index]
        html.push(`<button
          class="suggestion"
          type="button"
          part="suggestion"
          data-group-index="${groupIndex}"
          data-index="${index}"
          data-flat-index="${flatIndex}"
          title="${escapeAttribute(suggestion)}"
          role="listitem"
        ><span class="suggestion__text" part="suggestion-text">${escapeHtml(suggestion)}</span></button>`)
        remaining -= 1
        flatIndex += 1
        groupRendered = true
      }

      if (groupRendered) {
        renderedGroups += 1
      }
    }

    return html.join('')
  }

  renderAction(total, hiddenCount, expanded, limit, lineLimit) {
    if (hiddenCount > 0) {
      return `<button class="suggestions-action suggestions-action--more" type="button" part="more" aria-label="Show ${hiddenCount} more suggestions">
        <span class="suggestions-action__text">...+${hiddenCount}</span>
      </button>`
    }

    if (expanded && total > 0 && (limit > 0 || lineLimit > 0)) {
      return `<button class="suggestions-action suggestions-action--collapse" type="button" part="collapse" aria-label="Collapse suggestions">
        <span class="suggestions-action__text">collapse</span>
      </button>`
    }

    return ''
  }

  handleClick(event) {
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

    emit(this, 'select', this.getEventDetail(button))
  }

  getEventDetail(button) {
    const groupIndex = parseDataIndex(button, 'groupIndex')
    const index = parseDataIndex(button, 'index')
    const flatIndex = parseDataIndex(button, 'flatIndex')
    const groups = this.suggestions
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

  handleResize() {
    if (this.expanded || this.lineLimit <= 0) {
      return
    }

    const base = this.getBase()
    if (!base) {
      return
    }

    const width = Math.round(base.getBoundingClientRect().width)
    if (width === this._lastMeasuredWidth) {
      return
    }

    this._lastMeasuredWidth = width
    this._lineVisibleCount = null
    this.cancelMeasure()
    this.render()
  }

  scheduleMeasure() {
    this.cancelMeasure()
    this._measureRaf = requestAnimationFrame(() => {
      this._measureRaf = 0
      this.measureLineLimit()
    })
  }

  cancelMeasure() {
    if (!this._measureRaf) {
      return
    }

    cancelAnimationFrame(this._measureRaf)
    this._measureRaf = 0
  }

  measureLineLimit() {
    if (this.expanded || this.lineLimit <= 0) {
      return
    }

    const base = this.getBase()
    if (!base) {
      return
    }

    const items = base.querySelectorAll('.suggestion')
    const total = countSuggestions(this.suggestions)
    this._lastMeasuredWidth = Math.round(base.getBoundingClientRect().width)

    if (!items.length || !total) {
      this._lineVisibleCount = total
      return
    }

    const visibleCount = getVisibleCountByLines(base, items, this.lineLimit)
    if (visibleCount >= total) {
      this._lineVisibleCount = total
      return
    }

    this._lineVisibleCount = Math.max(1, visibleCount - 1)
    this.render()
  }

  resetLineLimit() {
    this._lineVisibleCount = null
    this._lastMeasuredWidth = -1
    this.cancelMeasure()
  }

  startObserving() {
    if (!('ResizeObserver' in window)) {
      return
    }

    const base = this.getBase()
    if (!base) {
      return
    }

    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(this._handleResize)
    }

    this._resizeObserver.disconnect()
    this._resizeObserver.observe(base)
  }

  stopObserving() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
    }
  }

  getBase() {
    return this.shadowRoot?.querySelector('.suggestions')
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
