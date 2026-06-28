const listStyle = `
  :host {
    display: block;
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }

  :host([hidden]) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .list {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--tot-input-color, #1e293b);
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-small, .8125rem);
    height: var(--tot-list-height, 18rem);
    line-height: var(--tot-line-height-dense, 1.4);
    max-height: var(--tot-list-max-height, 100%);
    max-width: 100%;
    min-height: var(--tot-list-min-height, 6rem);
    min-width: 0;
    overflow: auto;
    overflow-anchor: none;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    width: 100%;
  }

  .list:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .content {
    min-height: 100%;
    overflow-anchor: none;
  }

  .spacer {
    flex: 0 0 auto;
    overflow-anchor: none;
    pointer-events: none;
  }

  .items {
    display: grid;
    min-width: 0;
    overflow-anchor: none;
  }

  .item {
    min-width: 0;
    overflow-anchor: none;
  }

  .item + .item {
    border-top: var(--tot-panel-border-width, 1px) solid var(--tot-color-neutral-100, #f1f5f9);
  }

  .item:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: calc(-1 * var(--tot-focus-ring-offset, 1px));
  }

  .status {
    color: var(--tot-color-neutral-600, #64748b);
    overflow-anchor: none;
    padding: var(--tot-spacing-small, .75rem);
    text-align: center;
  }

  .status[hidden] {
    display: none;
  }

  .status--error {
    color: var(--tot-color-danger-700, #b91c1c);
  }
`

export class TotList extends HTMLElement {
  static get observedAttributes() {
    return [
      'items',
      'buffer-size',
      'buffersize',
      'page-size',
      'pagesize',
      'estimated-item-height',
      'estimateditemheight',
    ]
  }

  constructor() {
    super()
    this._items = []
    this._providedSource = undefined
    this._source = null
    this._iterator = null
    this._loader = null
    this._hasMore = false
    this._isLoading = false
    this._error = null
    this._sourceToken = 0
    this._rendered = false
    this._visibleFirst = 0
    this._visibleLast = -1
    this._topPadding = 0
    this._bottomPadding = 0
    this._heightCache = new Map()
    this._cumulativeHeights = [0]
    this._scrollFrame = 0
    this._measureFrame = 0
    this._needsRender = false
    this._resizeObserver = null
    this._templateObserver = null
    this._handleScroll = () => this.scheduleVisibleRangeUpdate()
    this._handleClick = event => this.handleItemClick(event)
    this._handleResize = () => this.scheduleMeasure()
    this._handleWindowResize = () => this.scheduleVisibleRangeUpdate()
  }

  get items() {
    return this._items.slice()
  }

  set items(value) {
    this.setDataSource(Array.isArray(value) ? value : [])
  }

  get dataSource() {
    return this._providedSource
  }

  set dataSource(value) {
    this.setDataSource(value)
  }

  get loadMore() {
    return this._loader
  }

  set loadMore(value) {
    this.setDataSource(value)
  }

  get bufferSize() {
    return normalizePositiveNumber(this.getAttribute('buffer-size') || this.getAttribute('buffersize'), 600)
  }

  set bufferSize(value) {
    setNullableAttribute(this, 'buffer-size', value)
  }

  get pageSize() {
    return normalizePositiveInteger(this.getAttribute('page-size') || this.getAttribute('pagesize'), 30)
  }

  set pageSize(value) {
    setNullableAttribute(this, 'page-size', value)
  }

  get estimatedItemHeight() {
    return normalizePositiveNumber(this.getAttribute('estimated-item-height') || this.getAttribute('estimateditemheight'), 48)
  }

  set estimatedItemHeight(value) {
    setNullableAttribute(this, 'estimated-item-height', value)
  }

  connectedCallback() {
    this.render()

    if (this._providedSource !== undefined) {
      this.resetSource(this._providedSource)
      return
    }

    this.resetSource(parseItems(this.getAttribute('items')))
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._handleWindowResize)
    this.cancelFrames()
    this.teardownResizeObserver()
    this.teardownTemplateObserver()
  }

  attributeChangedCallback(name) {
    if (name === 'items') {
      this._providedSource = undefined
      if (this.isConnected) {
        this.resetSource(parseItems(this.getAttribute('items')))
      }
      return
    }

    this.rebuildCumulativeHeights()
    this.scheduleVisibleRangeUpdate()
  }

  setDataSource(source) {
    this._providedSource = source

    if (this.isConnected) {
      this.resetSource(source)
    }
  }

  async refresh() {
    const source = this._providedSource !== undefined ? this._providedSource : parseItems(this.getAttribute('items'))
    this.resetSource(source)
  }

  async loadNextPage() {
    if (this._isLoading || !this._hasMore || this._error) {
      return []
    }

    const token = this._sourceToken
    this._isLoading = true
    this.updateStatus()
    emit(this, 'load-start', this.getEventDetail())

    try {
      let result

      if (this._iterator) {
        result = await readIteratorPage(this._iterator, this.pageSize)
      } else if (this._loader) {
        result = await this._loader({
          offset: this._items.length,
          pageSize: this.pageSize,
          items: this._items.slice(),
        })
      } else {
        result = {
          items: [],
          hasMore: false,
        }
      }

      if (token !== this._sourceToken) {
        return []
      }

      const normalized = normalizeLoadResult(result, Boolean(this._iterator))
      const nextItems = normalized.items

      for (let i = 0; i < nextItems.length; i++) {
        this._items.push(nextItems[i])
      }

      this._hasMore = normalized.hasMore
      this.rebuildCumulativeHeights()
      this.updateVisibleRange()
      emit(this, 'load-end', {
        ...this.getEventDetail(),
        added: nextItems.length,
      })

      this.loadMoreIfNeeded()
      return nextItems
    } catch (error) {
      if (token !== this._sourceToken) {
        return []
      }

      this._error = error
      this._hasMore = false
      this.updateStatus()
      emit(this, 'error', {
        ...this.getEventDetail(),
        error,
      })
      return []
    } finally {
      if (token === this._sourceToken) {
        this._isLoading = false
        this.updateStatus()
        this.loadMoreIfNeeded()
      }
    }
  }

  handleItemClick(event) {
    const itemElement = event.target?.closest?.('.item')
    const scroller = this.getScroller()
    if (!itemElement || !scroller || !scroller.contains(itemElement)) {
      return
    }

    const context = itemElement._totItemContext || {}
    emit(this, 'item-click', {
      item: itemElement._totItem,
      index: context.index,
      position: context.position,
    })
  }

  async scrollToIndex(index, options) {
    const targetIndex = Math.max(0, normalizeInteger(index, 0))

    while (this._hasMore && this._items.length <= targetIndex && !this._error) {
      const loadedItems = await this.loadNextPage()
      if (loadedItems.length === 0) {
        break
      }
    }

    if (this._items.length === 0) {
      return
    }

    const clampedIndex = Math.min(targetIndex, this._items.length - 1)
    const scroller = this.getScroller()
    if (!scroller) {
      return
    }

    const align = normalizeAlign(options)
    const itemTop = this.getOffsetForIndex(clampedIndex)
    const itemBottom = this.getOffsetForIndex(clampedIndex + 1)
    let nextScrollTop = itemTop

    if (align === 'center') {
      nextScrollTop = itemTop - (scroller.clientHeight - (itemBottom - itemTop)) / 2
    } else if (align === 'end') {
      nextScrollTop = itemBottom - scroller.clientHeight
    } else if (align === 'nearest') {
      const currentTop = scroller.scrollTop
      const currentBottom = currentTop + scroller.clientHeight
      if (itemTop >= currentTop && itemBottom <= currentBottom) {
        return
      }
      nextScrollTop = Math.abs(itemTop - currentTop) < Math.abs(itemBottom - currentBottom) ? itemTop : itemBottom - scroller.clientHeight
    }

    const maxScrollTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight)
    scroller.scrollTop = clamp(nextScrollTop, 0, maxScrollTop)
    this.updateVisibleRange()
  }

  async scrollToItem(index, options) {
    await this.scrollToIndex(index, options)
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    root.innerHTML = `
      <style>${listStyle}</style>
      <div class="list" part="base" role="list" tabindex="0">
        <div class="content" part="content">
          <div class="spacer spacer--top" part="top-spacer"></div>
          <div class="items" part="items"></div>
          <div class="spacer spacer--bottom" part="bottom-spacer"></div>
          <div class="status status--loading" part="loading" hidden><slot name="loading">Loading...</slot></div>
          <div class="status status--empty" part="empty" hidden><slot name="empty">No items.</slot></div>
          <div class="status status--end" part="end" hidden><slot name="end">End of list.</slot></div>
          <div class="status status--error" part="error" hidden><slot name="error"><span class="error-message"></span></slot></div>
        </div>
      </div>
    `

    this._rendered = true
    this.teardownResizeObserver()
    this.setupResizeObserver()
    this.teardownTemplateObserver()
    this.setupTemplateObserver()

    const scroller = this.getScroller()
    if (scroller) {
      scroller.addEventListener('scroll', this._handleScroll, { passive: true })
      scroller.addEventListener('click', this._handleClick)
    }

    window.removeEventListener('resize', this._handleWindowResize)
    window.addEventListener('resize', this._handleWindowResize)

    this.updateVisibleRange()
    this.updateStatus()
  }

  resetSource(source) {
    this._sourceToken += 1
    this._items = []
    this._source = source
    this._iterator = null
    this._loader = null
    this._hasMore = false
    this._isLoading = false
    this._error = null
    this._visibleFirst = 0
    this._visibleLast = -1
    this._topPadding = 0
    this._bottomPadding = 0
    this._heightCache.clear()
    this._cumulativeHeights = [0]
    this._needsRender = true

    const scroller = this.getScroller()
    if (scroller) {
      scroller.scrollTop = 0
    }

    if (Array.isArray(source)) {
      this._items = source.slice()
      this._hasMore = false
      this.rebuildCumulativeHeights()
      this.updateVisibleRange()
      this.updateStatus()
      return
    }

    if (typeof source === 'function') {
      this._loader = source
      this._hasMore = true
      this.updateVisibleRange()
      this.updateStatus()
      void this.loadNextPage()
      return
    }

    if (isIterator(source)) {
      this._iterator = source
      this._hasMore = true
      this.updateVisibleRange()
      this.updateStatus()
      void this.loadNextPage()
      return
    }

    this.updateVisibleRange()
    this.updateStatus()
  }

  scheduleVisibleRangeUpdate() {
    if (this._scrollFrame) {
      return
    }

    this._scrollFrame = requestAnimationFrame(() => {
      this._scrollFrame = 0
      this.updateVisibleRange()
    })
  }

  updateVisibleRange() {
    if (!this._rendered) {
      return
    }

    const scroller = this.getScroller()
    if (!scroller) {
      return
    }

    const count = this._items.length
    const topSpacer = this.shadowRoot.querySelector('.spacer--top')
    const bottomSpacer = this.shadowRoot.querySelector('.spacer--bottom')
    const previousFirst = this._visibleFirst
    const previousLast = this._visibleLast
    const previousScrollTop = scroller.scrollTop

    if (count === 0) {
      this._visibleFirst = 0
      this._visibleLast = -1
      this._topPadding = 0
      this._bottomPadding = 0
      topSpacer.style.height = '0px'
      bottomSpacer.style.height = '0px'
      this.renderItems()
      this.restoreScrollTop(scroller, previousScrollTop)
      this.loadMoreIfNeeded()
      return
    }

    const scrollTop = scroller.scrollTop
    const viewportHeight = scroller.clientHeight || 0
    const bufferSize = this.bufferSize
    const startPosition = Math.max(0, scrollTop - bufferSize)
    const endPosition = scrollTop + viewportHeight + bufferSize
    let firstIndex = scrollTop < bufferSize / 2 ? 0 : this.findIndexAtPosition(startPosition)
    let lastIndex = this.findIndexAtPosition(endPosition)

    while (lastIndex < count - 1 && this.getOffsetForIndex(lastIndex + 1) < endPosition) {
      lastIndex += 1
    }

    firstIndex = clamp(firstIndex, 0, count - 1)
    lastIndex = clamp(Math.max(firstIndex, lastIndex), 0, count - 1)

    const nextTopPadding = this.getOffsetForIndex(firstIndex)
    const nextBottomPadding = Math.max(0, this.getOffsetForIndex(count) - this.getOffsetForIndex(lastIndex + 1))
    const rangeChanged = firstIndex !== previousFirst || lastIndex !== previousLast

    this._visibleFirst = firstIndex
    this._visibleLast = lastIndex
    this._topPadding = nextTopPadding
    this._bottomPadding = nextBottomPadding

    topSpacer.style.height = `${Math.round(nextTopPadding)}px`
    bottomSpacer.style.height = `${Math.round(nextBottomPadding)}px`

    if (rangeChanged || this._needsRender) {
      this.renderItems()
    }

    this.restoreScrollTop(scroller, previousScrollTop)
    this.loadMoreIfNeeded()
  }

  renderItems() {
    const itemsContainer = this.shadowRoot?.querySelector('.items')
    if (!itemsContainer) {
      return
    }

    this._needsRender = false

    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
    }

    itemsContainer.innerHTML = ''

    if (this._visibleLast < this._visibleFirst) {
      return
    }

    const fragment = document.createDocumentFragment()
    const template = getItemTemplate(this)

    for (let index = this._visibleFirst; index <= this._visibleLast; index++) {
      const itemElement = document.createElement('div')
      const item = this._items[index]
      const context = {
        index,
        position: index + 1,
        item,
      }

      itemElement.className = 'item'
      itemElement.part = 'item'
      itemElement.role = 'listitem'
      itemElement.tabIndex = -1
      itemElement.dataset.index = String(index)
      itemElement._totItem = item
      itemElement._totItemContext = context
      itemElement.append(renderItemContent(this, template, item, context))
      fragment.append(itemElement)
    }

    itemsContainer.append(fragment)
    this.observeVisibleItems()
    this.scheduleMeasure()
  }

  observeVisibleItems() {
    if (!this._resizeObserver) {
      return
    }

    const items = this.shadowRoot.querySelectorAll('.item')
    for (let i = 0; i < items.length; i++) {
      this._resizeObserver.observe(items[i])
    }
  }

  setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined') {
      return
    }

    this._resizeObserver = new ResizeObserver(this._handleResize)
  }

  teardownResizeObserver() {
    if (!this._resizeObserver) {
      return
    }

    this._resizeObserver.disconnect()
    this._resizeObserver = null
  }

  setupTemplateObserver() {
    if (typeof MutationObserver === 'undefined') {
      return
    }

    this._templateObserver = new MutationObserver(() => {
      this._needsRender = true
      this.scheduleVisibleRangeUpdate()
    })
    this._templateObserver.observe(this, {
      attributes: true,
      childList: true,
      subtree: true,
    })
  }

  teardownTemplateObserver() {
    if (!this._templateObserver) {
      return
    }

    this._templateObserver.disconnect()
    this._templateObserver = null
  }

  scheduleMeasure() {
    if (this._measureFrame) {
      return
    }

    this._measureFrame = requestAnimationFrame(() => {
      this._measureFrame = 0
      this.measureVisibleItems()
    })
  }

  measureVisibleItems() {
    const itemElements = this.shadowRoot?.querySelectorAll('.item') || []
    let changed = false

    for (let i = 0; i < itemElements.length; i++) {
      const itemElement = itemElements[i]
      const index = normalizeInteger(itemElement.dataset.index, -1)
      const height = itemElement.getBoundingClientRect().height

      if (index < 0 || height <= 0) {
        continue
      }

      const previousHeight = this._heightCache.get(index)
      if (previousHeight === undefined || Math.abs(previousHeight - height) > 0.5) {
        this._heightCache.set(index, height)
        changed = true
      }
    }

    if (!changed) {
      return
    }

    this.rebuildCumulativeHeights()
    this.updateVisibleRange()
  }

  rebuildCumulativeHeights() {
    const heights = [0]
    let total = 0
    const estimatedHeight = this.estimatedItemHeight

    for (let i = 0; i < this._items.length; i++) {
      total += this._heightCache.get(i) || estimatedHeight
      heights.push(total)
    }

    this._cumulativeHeights = heights
  }

  findIndexAtPosition(position) {
    if (this._items.length === 0) {
      return 0
    }

    const heights = this._cumulativeHeights
    let left = 0
    let right = this._items.length - 1

    while (left < right) {
      const mid = Math.floor((left + right + 1) / 2)
      if (heights[mid] <= position) {
        left = mid
      } else {
        right = mid - 1
      }
    }

    return left
  }

  getOffsetForIndex(index) {
    if (index <= 0) {
      return 0
    }

    if (index >= this._cumulativeHeights.length) {
      return this._cumulativeHeights[this._cumulativeHeights.length - 1] || 0
    }

    return this._cumulativeHeights[index] || 0
  }


  restoreScrollTop(scroller, scrollTop) {
    if (Math.abs(scroller.scrollTop - scrollTop) <= 0.5) {
      return
    }

    const maxScrollTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight)
    scroller.scrollTop = clamp(scrollTop, 0, maxScrollTop)
  }

  loadMoreIfNeeded() {
    if (!this._hasMore || this._isLoading || this._error) {
      return
    }

    const scroller = this.getScroller()
    if (!scroller) {
      return
    }

    const threshold = Math.max(this.bufferSize, scroller.clientHeight)
    const remaining = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight

    if (remaining <= threshold || scroller.scrollHeight <= scroller.clientHeight + threshold / 2) {
      void this.loadNextPage()
    }
  }

  updateStatus() {
    const root = this.shadowRoot
    if (!root) {
      return
    }

    const loading = root.querySelector('.status--loading')
    const empty = root.querySelector('.status--empty')
    const end = root.querySelector('.status--end')
    const error = root.querySelector('.status--error')
    const errorMessage = root.querySelector('.error-message')

    loading.hidden = !this._isLoading
    empty.hidden = Boolean(this._error) || this._isLoading || this._items.length > 0 || this._hasMore
    end.hidden = Boolean(this._error) || this._isLoading || this._items.length === 0 || this._hasMore
    error.hidden = !this._error

    if (errorMessage) {
      errorMessage.textContent = getErrorMessage(this._error)
    }
  }

  getScroller() {
    return this.shadowRoot?.querySelector('.list') || null
  }

  getEventDetail() {
    return {
      count: this._items.length,
      first: this._visibleFirst,
      last: this._visibleLast,
      hasMore: this._hasMore,
      loading: this._isLoading,
    }
  }

  cancelFrames() {
    if (this._scrollFrame) {
      cancelAnimationFrame(this._scrollFrame)
      this._scrollFrame = 0
    }

    if (this._measureFrame) {
      cancelAnimationFrame(this._measureFrame)
      this._measureFrame = 0
    }
  }
}

function renderItemContent(host, template, item, context) {
  const renderer = host.renderItem || host.itemRenderer
  if (typeof renderer === 'function') {
    const rendered = renderer(item, context)
    return normalizeRenderedContent(rendered)
  }

  if (template) {
    const fragment = template.content.cloneNode(true)
    hydrateTemplate(fragment, item, context)
    return fragment
  }

  const itemElement = document.createElement('div')
  itemElement.textContent = getItemText(item)
  itemElement.style.padding = 'var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem)'
  return itemElement
}

function normalizeRenderedContent(value) {
  if (value instanceof Node) {
    return value
  }

  const fragment = document.createDocumentFragment()

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      fragment.append(normalizeRenderedContent(value[i]))
    }
    return fragment
  }

  const span = document.createElement('span')
  span.textContent = value === null || value === undefined ? '' : String(value)
  return span
}

function getItemTemplate(element) {
  return element.querySelector('template[slot="item"], template[data-slot="item"], template:not([slot])')
}

function hydrateTemplate(node, item, context) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT)
  const values = {
    index: context.index,
    position: context.position,
    item,
    json: safeStringify(item),
    value: getItemText(item),
  }

  while (walker.nextNode()) {
    const current = walker.currentNode

    if (current.nodeType === Node.TEXT_NODE) {
      current.nodeValue = replaceTokens(current.nodeValue, values, item)
      continue
    }

    if (current.nodeType === Node.ELEMENT_NODE) {
      const attributes = Array.from(current.attributes)
      for (let i = 0; i < attributes.length; i++) {
        current.setAttribute(attributes[i].name, replaceTokens(attributes[i].value, values, item))
      }
      current.item = item
      current.itemContext = context
    }
  }
}

function replaceTokens(value, values, item) {
  return String(value).replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      return values[key]
    }

    if (key.startsWith('item.')) {
      const result = getPath(item, key.slice(5))
      return result === undefined || result === null ? '' : result
    }

    const result = getPath(item, key)
    return result === undefined || result === null ? match : result
  })
}

function getPath(source, path) {
  if (!source || typeof source !== 'object') {
    return undefined
  }

  const parts = String(path).split('.')
  let current = source

  for (let i = 0; i < parts.length; i++) {
    if (!current || typeof current !== 'object' || !Object.prototype.hasOwnProperty.call(current, parts[i])) {
      return undefined
    }
    current = current[parts[i]]
  }

  return current
}

function getItemText(item) {
  if (item === null || item === undefined) {
    return ''
  }

  if (typeof item !== 'object') {
    return String(item)
  }

  const keys = ['label', 'title', 'name', 'text', 'content', 'value']
  for (let i = 0; i < keys.length; i++) {
    const value = item[keys[i]]
    if (value !== null && value !== undefined) {
      return String(value)
    }
  }

  return safeStringify(item)
}

function parseItems(value) {
  if (!value) {
    return []
  }

  const parsed = parseJson(value, [])
  return Array.isArray(parsed) ? parsed : []
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

function isIterator(value) {
  return value && (typeof value.next === 'function' || typeof value[Symbol.iterator] === 'function' || typeof value[Symbol.asyncIterator] === 'function')
}

async function readIteratorPage(iteratorSource, pageSize) {
  const iterator = getIterator(iteratorSource)
  const items = []
  let hasMore = true

  for (let i = 0; i < pageSize; i++) {
    const result = await iterator.next()
    if (result.done) {
      hasMore = false
      break
    }
    items.push(result.value)
  }

  return {
    items,
    hasMore,
  }
}

function getIterator(source) {
  if (typeof source.next === 'function') {
    return source
  }

  if (typeof source[Symbol.asyncIterator] === 'function') {
    return source[Symbol.asyncIterator]()
  }

  return source[Symbol.iterator]()
}

function normalizeLoadResult(result, fromIterator) {
  if (Array.isArray(result)) {
    return {
      items: result,
      hasMore: fromIterator || result.length > 0,
    }
  }

  if (!result) {
    return {
      items: [],
      hasMore: false,
    }
  }

  if (typeof result === 'object') {
    const items = Array.isArray(result.items) ? result.items : Array.isArray(result.data) ? result.data : []
    return {
      items,
      hasMore: typeof result.hasMore === 'boolean' ? result.hasMore : items.length > 0,
    }
  }

  return {
    items: [],
    hasMore: false,
  }
}

function safeStringify(value) {
  try {
    return JSON.stringify(value)
  } catch (error) {
    return String(value)
  }
}

function normalizePositiveNumber(value, fallback) {
  const number = Number(value)
  if (!Number.isFinite(number) || number <= 0) {
    return fallback
  }
  return number
}

function normalizePositiveInteger(value, fallback) {
  return Math.max(1, Math.floor(normalizePositiveNumber(value, fallback)))
}

function normalizeInteger(value, fallback) {
  const number = Number(value)
  if (!Number.isFinite(number)) {
    return fallback
  }
  return Math.floor(number)
}

function normalizeAlign(options) {
  if (typeof options === 'string') {
    return getSupportedAlign(options)
  }

  return getSupportedAlign(options?.align)
}

function getSupportedAlign(value) {
  const supported = ['start', 'center', 'end', 'nearest']
  for (let i = 0; i < supported.length; i++) {
    if (supported[i] === value) {
      return value
    }
  }
  return 'start'
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getErrorMessage(error) {
  if (!error) {
    return ''
  }

  return error.message || String(error)
}

function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}
