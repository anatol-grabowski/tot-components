const listStyle = `
  :host {
    --tot-list-edge-size: 1.75rem;
    --tot-list-edge-color: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    --tot-list-shadow-color: color-mix(in srgb, var(--tot-color-neutral-900, #0f172a) 18%, transparent);

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
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .viewport {
    height: 100%;
    max-height: 100%;
    min-height: 0;
    min-width: 0;
    overflow: auto;
    overflow-anchor: none;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    width: 100%;
  }

  .viewport:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: calc(-1 * var(--tot-focus-ring-offset, 1px));
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
    border-block-start: var(--tot-panel-border-width, 1px) solid var(--tot-color-neutral-100, #f1f5f9);
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

  .status--error {
    color: var(--tot-color-danger-700, #b91c1c);
  }

  .edge {
    inset-inline: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: var(--tot-transition-fast, 150ms) opacity;
    z-index: 1;
  }

  .edge--start {
    background:
      linear-gradient(
        to bottom,
        var(--tot-list-edge-color) 0%,
        var(--tot-list-edge-color) 22%,
        transparent 100%
      );
    box-shadow: 0 .5rem .7rem -.7rem var(--tot-list-shadow-color) inset;
    height: var(--tot-list-edge-size);
    inset-block: 0 auto;
  }

  .edge--end {
    background:
      linear-gradient(
        to top,
        var(--tot-list-edge-color) 0%,
        var(--tot-list-edge-color) 22%,
        transparent 100%
      );
    box-shadow: 0 -.5rem .7rem -.7rem var(--tot-list-shadow-color) inset;
    height: var(--tot-list-edge-size);
    inset-block: auto 0;
  }

  :host([horizontal]) .viewport {
    overflow-x: auto;
    overflow-y: hidden;
  }

  :host([horizontal]) .content {
    display: flex;
    height: 100%;
    min-height: 100%;
    min-width: 100%;
    width: max-content;
  }

  :host([horizontal]) .items {
    display: flex;
    flex: 0 0 auto;
    min-height: 100%;
  }

  :host([horizontal]) .item {
    flex: 0 0 auto;
    min-height: 100%;
  }

  :host([horizontal]) .item + .item {
    border-block-start: 0;
    border-inline-start: var(--tot-panel-border-width, 1px) solid var(--tot-color-neutral-100, #f1f5f9);
  }

  :host([horizontal]) .status {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    min-height: 100%;
  }

  :host([horizontal]) .edge {
    height: auto;
    inset-block: 0;
    width: var(--tot-list-edge-size);
  }

  :host([horizontal]) .edge--start {
    background:
      linear-gradient(
        to right,
        var(--tot-list-edge-color) 0%,
        var(--tot-list-edge-color) 22%,
        transparent 100%
      );
    box-shadow: .5rem 0 .7rem -.7rem var(--tot-list-shadow-color) inset;
    inset-inline: 0 auto;
  }

  :host([horizontal]) .edge--end {
    background:
      linear-gradient(
        to left,
        var(--tot-list-edge-color) 0%,
        var(--tot-list-edge-color) 22%,
        transparent 100%
      );
    box-shadow: -.5rem 0 .7rem -.7rem var(--tot-list-shadow-color) inset;
    inset-inline: auto 0;
  }

  :host([edge-shadows]) .list--has-start .edge--start,
  :host([edge-shadows]) .list--has-end .edge--end {
    opacity: 1;
  }

  .status[hidden] {
    display: none !important;
  }
`

export class TotList extends HTMLElement {
  static get observedAttributes() {
    return [
      'items',
      'buffer-size',
      'estimated-item-size',
      'edge-shadows',
      'horizontal',
    ]
  }

  constructor() {
    super()
    this._items = []
    this._itemsSource = undefined
    this._iterator = null
    this._iteratorHasMore = false
    this._loader = null
    this._loaderHasMore = false
    this._isLoading = false
    this._loadPromise = null
    this._requestedIndex = -1
    this._error = null
    this._sourceToken = 0
    this._rendered = false
    this._visibleFirst = 0
    this._visibleLast = -1
    this._sizeCache = new Map()
    this._cumulativeSizes = [0]
    this._scrollFrame = 0
    this._measureFrame = 0
    this._edgeFrame = 0
    this._needsRender = false
    this._resizeObserver = null
    this._templateObserver = null
    this._base = null
    this._scroller = null
    this._startSpacer = null
    this._itemsContainer = null
    this._endSpacer = null
    this._loadingStatus = null
    this._emptyStatus = null
    this._endStatus = null
    this._errorStatus = null
    this._errorMessage = null
    this._handleScroll = () => {
      this.scheduleVisibleRangeUpdate()
      this.scheduleEdgeUpdate()
    }
    this._handleClick = event => this.handleItemClick(event)
    this._handleResize = () => {
      this.scheduleMeasure()
      this.scheduleVisibleRangeUpdate()
      this.scheduleEdgeUpdate()
    }
    this._handleWindowResize = () => {
      this.scheduleVisibleRangeUpdate()
      this.scheduleEdgeUpdate()
    }
  }

  get items() {
    return this._items.slice()
  }

  set items(value) {
    this._itemsSource = normalizeItemsSource(value)

    if (this.isConnected) {
      this.resetItemsSource(this._itemsSource)
      void this.fillBuffer()
    }
  }

  get loadMore() {
    return this._loader
  }

  set loadMore(value) {
    this._loader = typeof value === 'function' ? value : null
    this._loaderHasMore = Boolean(this._loader)
    this._error = null

    if (this.isConnected) {
      this.updateStatus()
      void this.fillBuffer()
    }
  }

  get bufferSize() {
    return normalizePositiveNumber(this.getAttribute('buffer-size'), 600)
  }

  set bufferSize(value) {
    setNullableAttribute(this, 'buffer-size', value)
  }

  get estimatedItemSize() {
    return normalizePositiveNumber(this.getAttribute('estimated-item-size'), 48)
  }

  set estimatedItemSize(value) {
    setNullableAttribute(this, 'estimated-item-size', value)
  }

  get edgeShadows() {
    return this.hasAttribute('edge-shadows')
  }

  set edgeShadows(value) {
    setBooleanAttribute(this, 'edge-shadows', value)
  }

  get horizontal() {
    return this.hasAttribute('horizontal')
  }

  set horizontal(value) {
    setBooleanAttribute(this, 'horizontal', value)
  }

  connectedCallback() {
    this.render()
    this.attachListeners()
    this.setupResizeObserver()
    this.setupTemplateObserver()
    this.updateOrientation()

    const source = this._itemsSource !== undefined
      ? this._itemsSource
      : parseItems(this.getAttribute('items'))

    this.resetItemsSource(source)
    void this.fillBuffer()
  }

  disconnectedCallback() {
    this.detachListeners()
    this.cancelFrames()
    this.teardownResizeObserver()
    this.teardownTemplateObserver()
  }

  attributeChangedCallback(name) {
    if (name === 'items') {
      this._itemsSource = undefined
      if (this.isConnected) {
        this.resetItemsSource(parseItems(this.getAttribute('items')))
        void this.fillBuffer()
      }
      return
    }

    if (name === 'edge-shadows') {
      this.scheduleEdgeUpdate()
      return
    }

    if (name === 'horizontal') {
      this._sizeCache.clear()
      this.updateOrientation()
      this.resetScrollPosition()
    }

    this.rebuildCumulativeSizes()
    this.scheduleVisibleRangeUpdate()
  }

  handleItemClick(event) {
    const itemElement = event.target?.closest?.('.item')
    if (!itemElement || !this._scroller?.contains(itemElement)) {
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
    await this.fillBuffer(targetIndex)

    if (this._items.length === 0 || !this._scroller) {
      return
    }

    const clampedIndex = Math.min(targetIndex, this._items.length - 1)
    const align = normalizeAlign(options)
    const itemStart = this.getOffsetForIndex(clampedIndex)
    const itemEnd = this.getOffsetForIndex(clampedIndex + 1)
    const viewportSize = this.getViewportSize()
    const currentPosition = this.getScrollPosition()
    let nextPosition = itemStart

    if (align === 'center') {
      nextPosition = itemStart - (viewportSize - (itemEnd - itemStart)) / 2
    } else if (align === 'end') {
      nextPosition = itemEnd - viewportSize
    } else if (align === 'nearest') {
      const currentEnd = currentPosition + viewportSize
      if (itemStart >= currentPosition && itemEnd <= currentEnd) {
        return
      }
      nextPosition = Math.abs(itemStart - currentPosition) < Math.abs(itemEnd - currentEnd)
        ? itemStart
        : itemEnd - viewportSize
    }

    const maxPosition = Math.max(0, this.getScrollSize() - viewportSize)
    this.setScrollPosition(clamp(nextPosition, 0, maxPosition))
    this.updateVisibleRange()
  }

  render() {
    if (this._rendered) {
      return
    }

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `
      <style>${listStyle}</style>
      <div class="list" part="base">
        <div class="viewport" part="viewport" role="list" tabindex="0">
          <div class="content" part="content">
            <div class="spacer spacer--start" part="start-spacer"></div>
            <div class="items" part="items"></div>
            <div class="status status--loading" part="loading" hidden><slot name="loading">Loading...</slot></div>
            <div class="status status--error" part="error" hidden><slot name="error"><span class="error-message"></span></slot></div>
            <div class="spacer spacer--end" part="end-spacer"></div>
            <div class="status status--empty" part="empty" hidden><slot name="empty">No items.</slot></div>
            <div class="status status--end" part="end" hidden><slot name="end">End of list.</slot></div>
          </div>
        </div>
        <span class="edge edge--start" part="start-shadow" aria-hidden="true"></span>
        <span class="edge edge--end" part="end-shadow" aria-hidden="true"></span>
      </div>
    `

    this._base = root.querySelector('.list')
    this._scroller = root.querySelector('.viewport')
    this._startSpacer = root.querySelector('.spacer--start')
    this._itemsContainer = root.querySelector('.items')
    this._endSpacer = root.querySelector('.spacer--end')
    this._loadingStatus = root.querySelector('.status--loading')
    this._emptyStatus = root.querySelector('.status--empty')
    this._endStatus = root.querySelector('.status--end')
    this._errorStatus = root.querySelector('.status--error')
    this._errorMessage = root.querySelector('.error-message')
    this._rendered = true
  }

  attachListeners() {
    this._scroller?.addEventListener('scroll', this._handleScroll, { passive: true })
    this._scroller?.addEventListener('click', this._handleClick)
    window.addEventListener('resize', this._handleWindowResize)
  }

  detachListeners() {
    this._scroller?.removeEventListener('scroll', this._handleScroll)
    this._scroller?.removeEventListener('click', this._handleClick)
    window.removeEventListener('resize', this._handleWindowResize)
  }

  updateOrientation() {
    if (!this._scroller) {
      return
    }

    this._scroller.setAttribute('aria-orientation', this.horizontal ? 'horizontal' : 'vertical')
  }

  resetScrollPosition() {
    if (!this._scroller) {
      return
    }

    this._scroller.scrollTop = 0
    this._scroller.scrollLeft = 0
  }

  resetItemsSource(source) {
    this._sourceToken += 1
    this._items = []
    this._iterator = null
    this._iteratorHasMore = false
    this._loaderHasMore = Boolean(this._loader)
    this._isLoading = false
    this._loadPromise = null
    this._requestedIndex = -1
    this._error = null
    this._visibleFirst = 0
    this._visibleLast = -1
    this._sizeCache.clear()
    this._cumulativeSizes = [0]
    this._needsRender = true
    this.resetScrollPosition()

    if (Array.isArray(source)) {
      this._items = source.slice()
    } else if (isItemsIterator(source)) {
      this._iterator = getIterator(source)
      this._iteratorHasMore = true
    }

    this.rebuildCumulativeSizes()
    this.updateVisibleRange()
    this.updateStatus()
  }

  async fillBuffer(targetIndex = -1) {
    this._requestedIndex = Math.max(this._requestedIndex, targetIndex)

    if (this._loadPromise) {
      const loadedItems = await this._loadPromise
      if (this.hasMore() && this.shouldLoadMore(targetIndex)) {
        const moreItems = await this.fillBuffer(targetIndex)
        return loadedItems.concat(moreItems)
      }
      return loadedItems
    }

    if (!this.hasMore() || this._error) {
      return []
    }

    let loadPromise
    loadPromise = this.performLoad().finally(() => {
      if (this._loadPromise === loadPromise) {
        this._loadPromise = null
      }
    })
    this._loadPromise = loadPromise
    return loadPromise
  }

  async performLoad() {
    const token = this._sourceToken
    const addedItems = []
    this._isLoading = true
    this.updateStatus()
    emit(this, 'load-start', this.getEventDetail())

    try {
      while (token === this._sourceToken && this.hasMore() && this.shouldLoadMore(this._requestedIndex)) {
        const nextItems = await this.readNextItems()

        if (token !== this._sourceToken) {
          return addedItems
        }

        for (let i = 0; i < nextItems.length; i++) {
          this._items.push(nextItems[i])
          addedItems.push(nextItems[i])
        }

        if (nextItems.length > 0) {
          this.rebuildCumulativeSizes()
          this.updateVisibleRange()
        }
      }
    } catch (error) {
      if (token === this._sourceToken) {
        this._error = error
        this._iteratorHasMore = false
        this._loaderHasMore = false
        emit(this, 'error', {
          ...this.getEventDetail(),
          error,
        })
      }
    } finally {
      if (token === this._sourceToken) {
        this._isLoading = false
        this._requestedIndex = -1
        this.updateVisibleRange()
        this.updateStatus()

        if (!this._error) {
          emit(this, 'load-end', {
            ...this.getEventDetail(),
            added: addedItems.length,
          })
        }
      }
    }

    return addedItems
  }

  async readNextItems() {
    if (this._iteratorHasMore && this._iterator) {
      const result = await this._iterator.next()
      if (!result.done) {
        return [result.value]
      }
      this._iteratorHasMore = false
    }

    if (this._loaderHasMore && this._loader) {
      const result = await this._loader()
      if (!Array.isArray(result)) {
        throw new TypeError('TotList loadMore must return an array')
      }
      if (result.length > 0) {
        return result
      }
      this._loaderHasMore = false
    }

    return []
  }

  hasMore() {
    return this._iteratorHasMore || this._loaderHasMore
  }

  shouldLoadMore(targetIndex) {
    if (targetIndex >= this._items.length) {
      return true
    }

    const viewportEnd = this.getScrollPosition() + this.getViewportSize() + this.bufferSize
    return this.getOffsetForIndex(this._items.length) <= viewportEnd + 1
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
    if (!this._rendered || !this._scroller || !this._startSpacer || !this._endSpacer) {
      return
    }

    const count = this._items.length
    const previousFirst = this._visibleFirst
    const previousLast = this._visibleLast
    const previousPosition = this.getScrollPosition()

    if (count === 0) {
      this._visibleFirst = 0
      this._visibleLast = -1
      this.setSpacerSize(this._startSpacer, 0)
      this.setSpacerSize(this._endSpacer, 0)
      this.renderItems()
      this.restoreScrollPosition(previousPosition)
      this.loadMoreIfNeeded()
      this.scheduleEdgeUpdate()
      return
    }

    const scrollPosition = this.getScrollPosition()
    const viewportSize = this.getViewportSize()
    const bufferSize = this.bufferSize
    const startPosition = Math.max(0, scrollPosition - bufferSize)
    const endPosition = scrollPosition + viewportSize + bufferSize
    let firstIndex = scrollPosition < bufferSize / 2 ? 0 : this.findIndexAtPosition(startPosition)
    let lastIndex = this.findIndexAtPosition(endPosition)

    while (lastIndex < count - 1 && this.getOffsetForIndex(lastIndex + 1) < endPosition) {
      lastIndex += 1
    }

    firstIndex = clamp(firstIndex, 0, count - 1)
    lastIndex = clamp(Math.max(firstIndex, lastIndex), 0, count - 1)

    const nextStartPadding = this.getOffsetForIndex(firstIndex)
    const nextEndPadding = Math.max(0, this.getOffsetForIndex(count) - this.getOffsetForIndex(lastIndex + 1))
    const rangeChanged = firstIndex !== previousFirst || lastIndex !== previousLast

    this._visibleFirst = firstIndex
    this._visibleLast = lastIndex

    this.setSpacerSize(this._startSpacer, nextStartPadding)
    this.setSpacerSize(this._endSpacer, nextEndPadding)

    if (rangeChanged || this._needsRender) {
      this.renderItems()
    }

    this.restoreScrollPosition(previousPosition)
    this.loadMoreIfNeeded()
    this.scheduleEdgeUpdate()
  }

  renderItems() {
    if (!this._itemsContainer) {
      return
    }

    this._needsRender = false
    this._resizeObserver?.disconnect()
    this._itemsContainer.replaceChildren()

    if (this._visibleLast < this._visibleFirst) {
      this.observeVisibleItems()
      this.scheduleEdgeUpdate()
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
      itemElement.append(createItemContent(template, item, context))
      fragment.append(itemElement)
    }

    this._itemsContainer.append(fragment)
    this.observeVisibleItems()
    this.scheduleMeasure()
  }

  observeVisibleItems() {
    if (!this._resizeObserver) {
      return
    }

    if (this._scroller) {
      this._resizeObserver.observe(this._scroller)
    }

    const items = this._itemsContainer?.children || []
    for (let i = 0; i < items.length; i++) {
      this._resizeObserver.observe(items[i])
    }
  }

  setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined' || this._resizeObserver) {
      return
    }

    this._resizeObserver = new ResizeObserver(this._handleResize)
    this.observeVisibleItems()
  }

  teardownResizeObserver() {
    this._resizeObserver?.disconnect()
    this._resizeObserver = null
  }

  setupTemplateObserver() {
    if (typeof MutationObserver === 'undefined' || this._templateObserver) {
      return
    }

    this._templateObserver = new MutationObserver(() => {
      this._needsRender = true
      this.scheduleVisibleRangeUpdate()
    })
    this._templateObserver.observe(this, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    })
  }

  teardownTemplateObserver() {
    this._templateObserver?.disconnect()
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
    const itemElements = this._itemsContainer?.children || []
    let changed = false

    for (let i = 0; i < itemElements.length; i++) {
      const itemElement = itemElements[i]
      const index = normalizeInteger(itemElement.dataset.index, -1)
      const rect = itemElement.getBoundingClientRect()
      const size = this.horizontal ? rect.width : rect.height

      if (index < 0 || size <= 0) {
        continue
      }

      const previousSize = this._sizeCache.get(index)
      if (previousSize === undefined || Math.abs(previousSize - size) > 0.5) {
        this._sizeCache.set(index, size)
        changed = true
      }
    }

    if (!changed) {
      return
    }

    this.rebuildCumulativeSizes()
    this.updateVisibleRange()
  }

  rebuildCumulativeSizes() {
    const sizes = [0]
    let total = 0
    const estimatedSize = this.estimatedItemSize

    for (let i = 0; i < this._items.length; i++) {
      total += this._sizeCache.get(i) || estimatedSize
      sizes.push(total)
    }

    this._cumulativeSizes = sizes
  }

  findIndexAtPosition(position) {
    if (this._items.length === 0) {
      return 0
    }

    let left = 0
    let right = this._items.length - 1

    while (left < right) {
      const mid = Math.floor((left + right + 1) / 2)
      if (this._cumulativeSizes[mid] <= position) {
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

    if (index >= this._cumulativeSizes.length) {
      return this._cumulativeSizes[this._cumulativeSizes.length - 1] || 0
    }

    return this._cumulativeSizes[index] || 0
  }

  setSpacerSize(spacer, size) {
    if (this.horizontal) {
      spacer.style.width = `${Math.round(size)}px`
      spacer.style.height = ''
    } else {
      spacer.style.width = ''
      spacer.style.height = `${Math.round(size)}px`
    }
  }

  getScrollPosition() {
    if (!this._scroller) {
      return 0
    }
    return this.horizontal ? this._scroller.scrollLeft : this._scroller.scrollTop
  }

  setScrollPosition(value) {
    if (!this._scroller) {
      return
    }

    if (this.horizontal) {
      this._scroller.scrollLeft = value
    } else {
      this._scroller.scrollTop = value
    }
  }

  getViewportSize() {
    if (!this._scroller) {
      return 0
    }
    return this.horizontal ? this._scroller.clientWidth : this._scroller.clientHeight
  }

  getScrollSize() {
    if (!this._scroller) {
      return 0
    }
    return this.horizontal ? this._scroller.scrollWidth : this._scroller.scrollHeight
  }

  restoreScrollPosition(position) {
    const currentPosition = this.getScrollPosition()
    if (Math.abs(currentPosition - position) <= 0.5) {
      return
    }

    const maxPosition = Math.max(0, this.getScrollSize() - this.getViewportSize())
    this.setScrollPosition(clamp(position, 0, maxPosition))
  }

  loadMoreIfNeeded() {
    if (!this.hasMore() || this._isLoading || this._error) {
      return
    }

    if (this.shouldLoadMore(-1)) {
      void this.fillBuffer()
    }
  }

  updateStatus() {
    if (!this._loadingStatus) {
      return
    }

    const hasMore = this.hasMore()
    this._loadingStatus.hidden = !this._isLoading
    this._emptyStatus.hidden = Boolean(this._error) || this._isLoading || this._items.length > 0 || hasMore
    this._endStatus.hidden = Boolean(this._error) || this._isLoading || this._items.length === 0 || hasMore
    this._errorStatus.hidden = !this._error

    if (this._errorMessage) {
      this._errorMessage.textContent = getErrorMessage(this._error)
    }

    this.scheduleEdgeUpdate()
  }

  scheduleEdgeUpdate() {
    if (this._edgeFrame) {
      return
    }

    this._edgeFrame = requestAnimationFrame(() => {
      this._edgeFrame = 0
      this.updateEdges()
    })
  }

  updateEdges() {
    if (!this._base || !this._scroller) {
      return
    }

    if (!this.edgeShadows) {
      this._base.classList.remove('list--has-start', 'list--has-end')
      return
    }

    const maxPosition = Math.max(0, this.getScrollSize() - this.getViewportSize())
    const position = clamp(this.getScrollPosition(), 0, maxPosition)
    this._base.classList.toggle('list--has-start', position > 1)
    this._base.classList.toggle('list--has-end', maxPosition - position > 1)
  }

  getBase() {
    return this._base
  }

  getScroller() {
    return this._scroller
  }

  getItemsContainer() {
    return this._itemsContainer
  }

  getRenderedItems() {
    return Array.from(this._itemsContainer?.children || [])
  }

  getEventDetail() {
    return {
      count: this._items.length,
      first: this._visibleFirst,
      last: this._visibleLast,
      hasMore: this.hasMore(),
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

    if (this._edgeFrame) {
      cancelAnimationFrame(this._edgeFrame)
      this._edgeFrame = 0
    }
  }
}

function createItemContent(template, item, context) {
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

function getItemTemplate(element) {
  return element.querySelector('template[slot="item"]')
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

function normalizeItemsSource(value) {
  if (Array.isArray(value) || isItemsIterator(value)) {
    return value
  }
  throw new TypeError('TotList items must be an array, iterator, or iterable')
}

function parseItems(value) {
  if (!value) {
    return []
  }

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    return []
  }
}

function isItemsIterator(value) {
  return Boolean(value) && (
    typeof value.next === 'function'
    || typeof value[Symbol.iterator] === 'function'
    || typeof value[Symbol.asyncIterator] === 'function'
  )
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

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}
