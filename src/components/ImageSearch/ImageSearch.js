const openverseImagesUrl = 'https://api.openverse.org/v1/images/'
const minimumTileSize = 72
const wheelStep = 12
const pinchStep = .04
const wheelResetDelay = 180

const imageSearchStyle = `
  :host {
    display: block;
    max-width: 100%;
    min-width: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .search {
    display: grid;
    font-family: var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif);
    gap: var(--tot-spacing-x-small, .5rem);
    max-width: 100%;
    min-width: 0;
  }

  .search-input {
    min-width: 0;
  }

  .search-button {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-icon-color, #64748b);
    cursor: pointer;
    display: inline-flex;
    height: 1.5rem;
    justify-content: center;
    padding: 0;
    width: 1.5rem;
  }

  .search-button:hover:not(:disabled) {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .search-button:focus-visible,
  .tile__preview:focus-visible,
  .tile__action:focus-visible,
  .load-more:focus-visible,
  .info a:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .search-button:disabled {
    cursor: default;
    opacity: .45;
  }

  .search-button svg {
    display: block;
    height: 1rem;
    pointer-events: none;
    stroke: currentColor;
    width: 1rem;
  }

  .grid {
    --tot-image-search-tile-size: 9rem;
    display: grid;
    gap: var(--tot-spacing-2x-small, .25rem);
    grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--tot-image-search-tile-size)), 1fr));
    min-width: 0;
    touch-action: pan-y;
  }

  .status[hidden],
  .grid[hidden],
  .empty[hidden],
  .load-more[hidden] {
    display: none;
  }

  .status {
    color: var(--tot-color-neutral-600, #64748b);
    font-size: var(--tot-font-size-small, .875rem);
    line-height: var(--tot-line-height-normal, 1.45);
  }

  .tile {
    aspect-ratio: 1;
    background: var(--tot-color-neutral-100, #f1f5f9);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    min-width: 0;
    overflow: hidden;
    position: relative;
  }

  .tile[data-selected='true'] {
    border-color: var(--tot-color-primary-500, #0ea5e9);
    box-shadow: inset 0 0 0 2px var(--tot-color-primary-500, #0ea5e9);
  }

  .tile__preview {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    border: 0;
    cursor: zoom-in;
    display: block;
    height: 100%;
    padding: 0;
    width: 100%;
  }

  .tile__preview img {
    background: var(--tot-color-neutral-200, #e2e8f0);
    display: block;
    height: 100%;
    object-fit: cover;
    transition: var(--tot-transition-fast, 150ms) transform;
    width: 100%;
  }

  .tile:hover .tile__preview img {
    transform: scale(1.025);
  }

  .tile[data-error='true'] .tile__preview::after {
    align-items: center;
    color: var(--tot-color-neutral-600, #64748b);
    content: 'Image unavailable';
    display: flex;
    font-size: var(--tot-font-size-x-small, .75rem);
    inset: 0;
    justify-content: center;
    padding: var(--tot-spacing-small, .75rem);
    position: absolute;
    text-align: center;
  }

  .tile[data-error='true'] img {
    display: none;
  }

  .tile__action {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    backdrop-filter: blur(4px);
    background: var(--tot-image-search-action-background-color, rgb(15 23 42 / 72%));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-image-search-action-border-color, rgb(255 255 255 / 30%));
    border-radius: var(--tot-border-radius-circle, 50%);
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    height: 1.75rem;
    justify-content: center;
    padding: 0;
    position: absolute;
    top: var(--tot-spacing-2x-small, .25rem);
    width: 1.75rem;
    z-index: 1;
  }

  .tile__action:hover {
    background: var(--tot-image-search-action-background-color-hover, rgb(15 23 42 / 90%));
  }

  .tile__action svg {
    display: block;
    height: 1rem;
    pointer-events: none;
    stroke: currentColor;
    width: 1rem;
  }

  .tile__select {
    left: var(--tot-spacing-2x-small, .25rem);
  }

  .tile__info {
    right: var(--tot-spacing-2x-small, .25rem);
  }

  .tile[data-selected='true'] .tile__select {
    background: var(--tot-color-primary-600, #0284c7);
    border-color: var(--tot-color-primary-400, #38bdf8);
  }

  .tile__caption {
    background: linear-gradient(transparent, rgb(0 0 0 / 75%));
    bottom: 0;
    color: #fff;
    font-size: var(--tot-font-size-x-small, .75rem);
    left: 0;
    line-height: 1.25;
    overflow: hidden;
    padding: 1.5rem var(--tot-spacing-x-small, .5rem) var(--tot-spacing-2x-small, .25rem);
    pointer-events: none;
    position: absolute;
    right: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .empty {
    border: var(--tot-panel-border-width, 1px) dashed var(--tot-panel-border-color, #cbd5e1);
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--tot-color-neutral-600, #64748b);
    font-size: var(--tot-font-size-small, .875rem);
    padding: var(--tot-spacing-large, 1.25rem);
    text-align: center;
  }

  .load-more {
    -webkit-appearance: none;
    appearance: none;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-input-border-radius-medium, 4px);
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    font: inherit;
    justify-self: center;
    min-height: var(--tot-input-height-small, 1.75rem);
    padding: 0 var(--tot-spacing-small, .75rem);
  }

  .load-more:hover:not(:disabled) {
    background: var(--tot-input-background-color-hover, #f8fafc);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
  }

  .load-more:disabled {
    cursor: default;
    opacity: .55;
  }

  .info {
    --tot-dialog-width: min(36rem, calc(100vw - 2rem));
  }

  .info__content,
  .info__rows,
  .info__metadata {
    display: grid;
    gap: var(--tot-spacing-x-small, .5rem);
  }

  .info__openverse {
    color: var(--tot-color-neutral-700, #334155);
    line-height: var(--tot-line-height-normal, 1.45);
    margin: 0;
  }

  .info__row {
    display: grid;
    gap: var(--tot-spacing-3x-small, .125rem) var(--tot-spacing-small, .75rem);
    grid-template-columns: minmax(7rem, auto) minmax(0, 1fr);
  }

  .info__label {
    color: var(--tot-color-neutral-600, #64748b);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .info__value {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .info__value--multiline {
    white-space: pre-wrap;
  }

  .info a {
    color: var(--tot-color-primary-700, #0369a1);
  }

  .info__details {
    --tot-panel-background-color: transparent;
  }

  @media (max-width: 520px) {
    .info__row {
      grid-template-columns: 1fr;
    }
  }
`

const searchIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7"></circle>
    <path d="m20 20-4-4"></path>
  </svg>
`

const selectIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="m5 12 4 4L19 6"></path>
  </svg>
`

const infoIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9"></circle>
    <path d="M12 11v6M12 7h.01"></path>
  </svg>
`

export class TotImageSearch extends HTMLElement {
  static get observedAttributes() {
    return ['min-tile-size', 'multiple', 'page-size', 'query']
  }

  constructor() {
    super()
    this._abortController = null
    this._debounceTimer = 0
    this._filter = null
    this._images = []
    this._loading = false
    this._page = 0
    this._pageCount = 0
    this._pinchDistance = 0
    this._pinchDelta = 0
    this._wheelDelta = 0
    this._rawResults = []
    this._resultCount = 0
    this._selectedKeys = new Set()
    this._wheelResetTimer = 0

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${imageSearchStyle}</style>
      <div class="search" part="base">
        <tot-input class="search-input" part="input" placeholder="Search openly licensed images" clearable>
          <button class="search-button" slot="suffix" type="button" aria-label="Search">${searchIcon}</button>
        </tot-input>
        <div class="status" part="status" role="status" aria-live="polite" hidden></div>
        <div class="grid" part="grid" hidden></div>
        <div class="empty" part="empty">Enter a search term.</div>
        <button class="load-more" part="load-more-button" type="button" hidden>Load more</button>
      </div>
      <tot-image-preview class="preview"></tot-image-preview>
      <tot-dialog class="info" part="copyright-dialog" header="Image information" hide-footer>
        <div class="info__content" part="copyright-body">
          <p class="info__openverse">
            This result was found using <a href="https://openverse.org/" target="_blank" rel="noopener noreferrer">Openverse search</a>.
            Check the licence and attribution requirements at the original source before reuse.
          </p>
          <div class="info__rows"></div>
          <tot-details class="info__details" part="copyright-details" summary="Details" variant="plain">
            <div class="info__metadata"></div>
          </tot-details>
        </div>
      </tot-dialog>
    `

    this._input = /** @type {HTMLElement & { value: string, getInput(): HTMLInputElement | null }} */ (root.querySelector('tot-input'))
    this._searchButton = /** @type {HTMLButtonElement} */ (root.querySelector('.search-button'))
    this._statusElement = /** @type {HTMLElement} */ (root.querySelector('.status'))
    this._gridElement = /** @type {HTMLElement} */ (root.querySelector('.grid'))
    this._emptyElement = /** @type {HTMLElement} */ (root.querySelector('.empty'))
    this._loadMoreButton = /** @type {HTMLButtonElement} */ (root.querySelector('.load-more'))
    this._previewElement = /** @type {HTMLElement & { images: string[], show(index?: number): void }} */ (root.querySelector('.preview'))
    this._infoDialog = /** @type {HTMLElement & { header: string, show(): void }} */ (root.querySelector('.info'))
    this._infoRows = /** @type {HTMLElement} */ (root.querySelector('.info__rows'))
    this._infoMetadata = /** @type {HTMLElement} */ (root.querySelector('.info__metadata'))
    this._infoDetails = /** @type {HTMLElement & { open: boolean }} */ (root.querySelector('.info__details'))

    this._input.addEventListener('input', () => this._handleQueryInput())
    this._input.addEventListener('keydown', event => this._handleInputKeyDown(event))
    this._searchButton.addEventListener('click', () => void this.search())
    this._loadMoreButton.addEventListener('click', () => void this.loadMore())
    this._gridElement.addEventListener('click', event => this._handleGridClick(event))
    this._gridElement.addEventListener('error', event => this._handleImageError(event), true)
    this._gridElement.addEventListener('wheel', event => this._handleWheel(event), { passive: false })
    this._gridElement.addEventListener('touchstart', event => this._handleTouchStart(event), { passive: false })
    this._gridElement.addEventListener('touchmove', event => this._handleTouchMove(event), { passive: false })
    this._gridElement.addEventListener('touchend', event => this._handleTouchEnd(event), { passive: false })
    this._gridElement.addEventListener('touchcancel', event => this._handleTouchEnd(event), { passive: false })
  }

  get query() {
    return this.getAttribute('query') || ''
  }

  set query(value) {
    const query = value === null || value === undefined ? '' : String(value)
    if (query === this.query) {
      this._syncQueryInput()
      return
    }
    this.setAttribute('query', query)
  }

  get multiple() {
    return this.hasAttribute('multiple')
  }

  set multiple(value) {
    setBooleanAttribute(this, 'multiple', value)
  }

  get minTileSize() {
    return normalizeTileSize(this.getAttribute('min-tile-size'))
  }

  set minTileSize(value) {
    this.setAttribute('min-tile-size', String(normalizeTileSize(value)))
  }

  get pageSize() {
    const parsed = Number.parseInt(this.getAttribute('page-size') || '', 10)
    return Number.isFinite(parsed) ? Math.min(50, Math.max(1, parsed)) : 20
  }

  set pageSize(value) {
    const parsed = Number.parseInt(String(value), 10)
    this.setAttribute('page-size', String(Number.isFinite(parsed) ? Math.min(50, Math.max(1, parsed)) : 20))
  }

  get filter() {
    return this._filter
  }

  set filter(value) {
    this._filter = typeof value === 'function' ? value : null
    this._applyFilter()
  }

  get results() {
    return this._images.slice()
  }

  get selected() {
    const selected = []
    for (let i = 0; i < this._images.length; i++) {
      if (this._selectedKeys.has(getImageKey(this._images[i]))) {
        selected.push(this._images[i])
      }
    }
    return selected
  }

  connectedCallback() {
    this._syncQueryInput()
    this._input.getInput()?.setAttribute('aria-label', 'Search images')
    this._syncTileSize()
    this._syncMultiple()
    this._renderResults()
    if (this.query.trim()) {
      this._scheduleSearch()
    }
  }

  disconnectedCallback() {
    clearTimeout(this._debounceTimer)
    this._debounceTimer = 0
    this._abortController?.abort()
    this._abortController = null
    clearTimeout(this._wheelResetTimer)
    this._wheelResetTimer = 0
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'query') {
      this._syncQueryInput()
      this._abortController?.abort()
      if (this.isConnected) {
        if (this.query.trim()) {
          this._scheduleSearch()
        } else {
          clearTimeout(this._debounceTimer)
          this._debounceTimer = 0
          this._clearResults()
        }
      }
    } else if (name === 'min-tile-size') {
      this._syncTileSize()
    } else if (name === 'multiple') {
      this._syncMultiple()
    } else if (name === 'page-size' && this.isConnected && this.query.trim()) {
      this._scheduleSearch()
    }
  }

  async search(query = this.query) {
    const nextQuery = String(query ?? '').trim()
    clearTimeout(this._debounceTimer)
    this._debounceTimer = 0

    if (nextQuery !== this.query) {
      this.setAttribute('query', nextQuery)
      clearTimeout(this._debounceTimer)
      this._debounceTimer = 0
    }

    if (!nextQuery) {
      this._clearResults()
      return []
    }

    return this._fetchPage(1, false)
  }

  async loadMore() {
    if (this._loading || this._page >= this._pageCount) {
      return this.results
    }
    return this._fetchPage(this._page + 1, true)
  }

  clearSelection() {
    if (this._selectedKeys.size === 0) {
      return
    }
    this._selectedKeys.clear()
    this._renderSelection()
    this._dispatchSelectionChange()
  }

  getInput() {
    return this._input
  }

  getGrid() {
    return this._gridElement
  }

  getPreview() {
    return this._previewElement
  }

  _handleQueryInput() {
    const value = this._input.value
    if (value !== this.query) {
      this.setAttribute('query', value)
    }
  }

  _handleInputKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      void this.search()
    }
  }

  _scheduleSearch() {
    clearTimeout(this._debounceTimer)
    this._debounceTimer = setTimeout(() => {
      this._debounceTimer = 0
      void this.search()
    }, 350)
  }

  async _fetchPage(page, append) {
    const query = this.query.trim()
    if (!query) {
      this._clearResults()
      return []
    }

    this._abortController?.abort()
    if (!append) {
      const hadSelection = this._selectedKeys.size > 0
      this._page = 0
      this._pageCount = 0
      this._rawResults = []
      this._images = []
      this._resultCount = 0
      this._selectedKeys.clear()
      this._renderResults()
      if (hadSelection) {
        this._dispatchSelectionChange()
      }
    }

    const controller = new AbortController()
    this._abortController = controller
    this._loading = true
    this._syncLoading()
    dispatchCustomEvent(this, 'search-start', { query, page })

    try {
      const url = new URL(openverseImagesUrl)
      url.searchParams.set('q', query)
      url.searchParams.set('page', String(page))
      url.searchParams.set('page_size', String(this.pageSize))
      url.searchParams.set('mature', 'false')

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(await getResponseError(response))
      }

      const data = await response.json()
      if (query !== this.query.trim()) {
        return this.results
      }

      const incoming = Array.isArray(data?.results) ? data.results : []
      this._rawResults = append
        ? mergeUniqueImages(this._rawResults, incoming)
        : mergeUniqueImages([], incoming)
      this._page = normalizePositiveInteger(data?.page, page)
      this._pageCount = normalizePositiveInteger(data?.page_count, this._page)
      this._resultCount = normalizePositiveInteger(data?.result_count, this._rawResults.length, true)

      this._applyFilter()
      dispatchCustomEvent(this, 'search-end', {
        count: this._images.length,
        page: this._page,
        query,
        total: this._resultCount,
      })
      return this.results
    } catch (error) {
      if (error?.name === 'AbortError') {
        return this.results
      }

      this._showError(error)
      dispatchCustomEvent(this, 'error', { error })
      return this.results
    } finally {
      if (this._abortController === controller) {
        this._abortController = null
        this._loading = false
        this._syncLoading()
      }
    }
  }

  _applyFilter() {
    const images = []
    let filterError = null

    for (let i = 0; i < this._rawResults.length; i++) {
      const image = this._rawResults[i]
      try {
        if (!this._filter || this._filter(image)) {
          images.push(image)
        }
      } catch (error) {
        filterError ||= error
      }
    }

    this._images = images
    const availableKeys = new Set()
    for (let i = 0; i < images.length; i++) {
      availableKeys.add(getImageKey(images[i]))
    }

    let selectionChanged = false
    for (const key of this._selectedKeys) {
      if (!availableKeys.has(key)) {
        this._selectedKeys.delete(key)
        selectionChanged = true
      }
    }

    this._renderResults()
    if (selectionChanged) {
      this._dispatchSelectionChange()
    }
    if (filterError) {
      dispatchCustomEvent(this, 'error', { error: filterError })
    }
  }

  _renderResults() {
    if (!this.isConnected) {
      return
    }

    this._gridElement.replaceChildren()
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < this._images.length; i++) {
      fragment.appendChild(this._createTile(this._images[i], i))
    }
    this._gridElement.appendChild(fragment)

    const hasImages = this._images.length > 0
    this._gridElement.hidden = !hasImages
    this._emptyElement.hidden = hasImages || this._loading
    this._loadMoreButton.hidden = !hasImages || this._page >= this._pageCount

    if (!this.query.trim()) {
      this._emptyElement.textContent = 'Enter a search term.'
    } else if (!hasImages && !this._loading) {
      this._emptyElement.textContent = this._rawResults.length
        ? 'No images match the filter.'
        : 'No images found.'
    }

    this._syncLoading()
  }

  _createTile(image, index) {
    const tile = document.createElement('article')
    tile.className = 'tile'
    tile.dataset.index = String(index)
    tile.dataset.selected = String(this._selectedKeys.has(getImageKey(image)))
    tile.setAttribute('part', 'tile')

    const previewButton = document.createElement('button')
    previewButton.className = 'tile__preview'
    previewButton.type = 'button'
    previewButton.dataset.action = 'preview'
    previewButton.setAttribute('aria-label', `Preview ${getImageTitle(image)}`)

    const imageElement = document.createElement('img')
    const thumbnailUrl = getThumbnailUrl(image)
    if (thumbnailUrl) {
      imageElement.src = thumbnailUrl
    } else {
      tile.dataset.error = 'true'
    }
    imageElement.alt = getImageTitle(image)
    imageElement.loading = 'lazy'
    imageElement.decoding = 'async'
    previewButton.appendChild(imageElement)

    const selectButton = document.createElement('button')
    selectButton.className = 'tile__action tile__select'
    selectButton.type = 'button'
    selectButton.dataset.action = 'select'
    selectButton.innerHTML = selectIcon
    selectButton.setAttribute('aria-label', 'Select image')
    selectButton.setAttribute('aria-pressed', tile.dataset.selected)

    const infoButton = document.createElement('button')
    infoButton.className = 'tile__action tile__info'
    infoButton.type = 'button'
    infoButton.dataset.action = 'info'
    infoButton.innerHTML = infoIcon
    infoButton.setAttribute('aria-label', 'View copyright information')

    const caption = document.createElement('div')
    caption.className = 'tile__caption'
    caption.textContent = getImageTitle(image)

    tile.appendChild(previewButton)
    tile.appendChild(selectButton)
    tile.appendChild(infoButton)
    tile.appendChild(caption)
    return tile
  }

  _renderSelection() {
    const tiles = /** @type {NodeListOf<HTMLElement>} */ (this._gridElement.querySelectorAll('.tile'))
    for (let i = 0; i < tiles.length; i++) {
      const image = this._images[Number(tiles[i].dataset.index)]
      const selected = Boolean(image) && this._selectedKeys.has(getImageKey(image))
      tiles[i].dataset.selected = String(selected)
      const button = tiles[i].querySelector('.tile__select')
      button?.setAttribute('aria-pressed', String(selected))
      button?.setAttribute('aria-label', selected ? 'Deselect image' : 'Select image')
    }
  }

  _handleGridClick(event) {
    const actionElement = event.target.closest?.('[data-action]')
    const tile = event.target.closest?.('.tile')
    if (!actionElement || !tile || !this._gridElement.contains(tile)) {
      return
    }

    const index = Number(tile.dataset.index)
    const image = this._images[index]
    if (!image) {
      return
    }

    const action = actionElement.dataset.action
    if (action === 'select') {
      this._toggleSelection(image)
    } else if (action === 'info') {
      this._showCopyrightInfo(image)
    } else if (action === 'preview') {
      this._showPreview(index)
    }
  }

  _toggleSelection(image) {
    const key = getImageKey(image)
    const wasSelected = this._selectedKeys.has(key)

    if (wasSelected) {
      this._selectedKeys.delete(key)
    } else if (this.multiple) {
      this._selectedKeys.add(key)
    } else {
      this._selectedKeys.clear()
      this._selectedKeys.add(key)
    }

    this._renderSelection()
    this._dispatchSelectionChange()
  }

  _dispatchSelectionChange() {
    dispatchCustomEvent(this, 'change', {
      selected: this.selected,
    })
  }

  _showPreview(index) {
    const links = []
    const sourceIndexes = []
    for (let i = 0; i < this._images.length; i++) {
      const url = getPreviewUrl(this._images[i])
      if (url) {
        links.push(url)
        sourceIndexes.push(i)
      }
    }

    const previewIndex = Math.max(0, sourceIndexes.indexOf(index))
    this._previewElement.images = links
    this._previewElement.show(previewIndex)
  }

  _showCopyrightInfo(image) {
    this._infoDialog.header = getImageTitle(image)
    this._infoRows.replaceChildren()
    this._infoMetadata.replaceChildren()
    this._infoDetails.open = false

    appendInfoRow(this._infoRows, 'Creator', image.creator || 'Unknown', image.creator_url)
    appendInfoRow(this._infoRows, 'Licence', formatLicense(image), image.license_url)
    appendInfoRow(this._infoRows, 'Source', image.source || image.provider || 'Unknown', image.foreign_landing_url)
    if (image.attribution) {
      appendInfoRow(this._infoRows, 'Attribution', String(image.attribution))
    }

    appendImageMetadata(this._infoMetadata, image)
    this._infoDialog.show()
  }

  _handleImageError(event) {
    const tile = event.target.closest?.('.tile')
    if (tile) {
      tile.dataset.error = 'true'
    }
  }

  _handleWheel(event) {
    if (!event.ctrlKey) {
      return
    }

    event.preventDefault()
    clearTimeout(this._wheelResetTimer)
    this._wheelResetTimer = setTimeout(() => {
      this._wheelDelta = 0
      this._wheelResetTimer = 0
    }, wheelResetDelay)

    const delta = normalizeWheelDelta(event)
    this._wheelDelta += Math.max(-wheelStep, Math.min(wheelStep, delta))
    if (Math.abs(this._wheelDelta) < wheelStep) {
      return
    }

    const direction = this._wheelDelta > 0 ? 1 : -1
    if (this._changeColumnCount(direction)) {
      this._wheelDelta -= direction * wheelStep
    } else {
      this._wheelDelta = 0
    }
  }

  _handleTouchStart(event) {
    if (event.touches.length !== 2) {
      return
    }

    event.preventDefault()
    this._pinchDistance = getTouchDistance(event.touches)
    this._pinchDelta = 0
  }

  _handleTouchMove(event) {
    if (event.touches.length !== 2) {
      return
    }

    event.preventDefault()
    const distance = getTouchDistance(event.touches)
    if (distance <= 0) {
      return
    }
    if (this._pinchDistance <= 0) {
      this._pinchDistance = distance
      return
    }

    this._pinchDelta += Math.log(distance / this._pinchDistance)
    this._pinchDistance = distance
    if (Math.abs(this._pinchDelta) < pinchStep) {
      return
    }

    const direction = this._pinchDelta > 0 ? -1 : 1
    if (this._changeColumnCount(direction)) {
      this._pinchDelta += direction * pinchStep
    } else {
      this._pinchDelta = 0
    }
  }

  _handleTouchEnd(event) {
    if (event.touches.length === 2) {
      this._pinchDistance = getTouchDistance(event.touches)
      this._pinchDelta = 0
      return
    }

    this._pinchDistance = 0
    this._pinchDelta = 0
  }

  _changeColumnCount(direction) {
    const width = this._gridElement.clientWidth
    if (width <= 0) {
      return false
    }

    const style = getComputedStyle(this._gridElement)
    const gap = Number.parseFloat(style.columnGap) || 0
    const currentColumns = getGridColumnCount(style.gridTemplateColumns, width, gap, this.minTileSize)
    const maximumColumns = Math.max(1, Math.floor((width + gap) / (minimumTileSize + gap)))
    const nextColumns = Math.min(maximumColumns, Math.max(1, currentColumns + direction))
    if (nextColumns === currentColumns) {
      return false
    }

    const nextTileSize = Math.ceil((width - gap * (nextColumns - 1)) / nextColumns)
    const normalizedSize = normalizeTileSize(nextTileSize)
    if (normalizedSize === this.minTileSize) {
      return false
    }

    this.minTileSize = normalizedSize
    return true
  }

  _syncQueryInput() {
    if (this._input && this._input.value !== this.query) {
      this._input.value = this.query
    }
  }

  _syncTileSize() {
    if (this._gridElement) {
      this._gridElement.style.setProperty('--tot-image-search-tile-size', `${this.minTileSize}px`)
    }
  }

  _syncMultiple() {
    if (this.multiple || this._selectedKeys.size <= 1) {
      return
    }

    const firstKey = this._selectedKeys.values().next().value
    this._selectedKeys.clear()
    if (firstKey) {
      this._selectedKeys.add(firstKey)
    }
    this._renderSelection()
    this._dispatchSelectionChange()
  }

  _syncLoading() {
    if (!this.isConnected) {
      return
    }

    this._searchButton.disabled = this._loading
    this._loadMoreButton.disabled = this._loading
    this._gridElement.setAttribute('aria-busy', String(this._loading))
    this._loadMoreButton.textContent = this._loading ? 'Loading…' : 'Load more'
    this._statusElement.hidden = !this._loading
    this._statusElement.textContent = this._loading ? 'Searching Openverse images…' : ''
    if (this._loading) {
      this._emptyElement.hidden = true
    }
  }

  _clearResults() {
    this._abortController?.abort()
    this._abortController = null
    this._loading = false
    this._page = 0
    this._pageCount = 0
    this._rawResults = []
    this._images = []
    this._resultCount = 0
    const hadSelection = this._selectedKeys.size > 0
    this._selectedKeys.clear()
    this._renderResults()
    if (hadSelection) {
      this._dispatchSelectionChange()
    }
  }

  _showError(error) {
    this._gridElement.hidden = this._images.length === 0
    this._emptyElement.hidden = false
    this._emptyElement.textContent = error instanceof Error ? error.message : 'Unable to search images.'
  }
}

function normalizeTileSize(value) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) {
    return 144
  }
  return Math.round(Math.max(minimumTileSize, parsed))
}

function normalizePositiveInteger(value, fallback, allowZero = false) {
  const parsed = Number.parseInt(String(value), 10)
  const minimum = allowZero ? 0 : 1
  return Number.isFinite(parsed) && parsed >= minimum ? parsed : fallback
}

function mergeUniqueImages(current, incoming) {
  const images = current.slice()
  const keys = new Set()
  for (let i = 0; i < images.length; i++) {
    keys.add(getImageKey(images[i]))
  }

  for (let i = 0; i < incoming.length; i++) {
    const image = incoming[i]
    const key = getImageKey(image)
    if (!keys.has(key)) {
      keys.add(key)
      images.push(image)
    }
  }
  return images
}

function getImageKey(image) {
  return String(image?.id || image?.url || image?.thumbnail || '')
}

function getImageTitle(image) {
  const title = typeof image?.title === 'string' ? image.title.trim() : ''
  return title || 'Untitled image'
}

function getThumbnailUrl(image) {
  return String(image?.thumbnail || image?.url || '')
}

function getPreviewUrl(image) {
  return String(image?.url || image?.thumbnail || '')
}

function formatLicense(image) {
  const license = typeof image?.license === 'string' ? image.license.toUpperCase() : 'Unknown'
  const version = typeof image?.license_version === 'string' ? image.license_version : ''
  return version ? `${license} ${version}` : license
}

function appendImageMetadata(container, image) {
  const dimensions = formatDimensions(image)
  if (dimensions) {
    appendInfoRow(container, 'Dimensions', dimensions)
  }

  const fileSize = Number(image?.filesize)
  if (Number.isFinite(fileSize) && fileSize >= 0) {
    appendInfoRow(container, 'File size', formatFileSize(fileSize))
  }

  if (image?.filetype) {
    appendInfoRow(container, 'File type', String(image.filetype))
  }
  if (typeof image?.mature === 'boolean') {
    appendInfoRow(container, 'Mature content', image.mature ? 'Yes' : 'No')
  }

  const excluded = new Set([
    'creator',
    'creator_url',
    'filetype',
    'filesize',
    'foreign_landing_url',
    'height',
    'license',
    'license_url',
    'license_version',
    'mature',
    'source',
    'attribution',
    'width',
  ])
  const preferred = [
    'id',
    'title',
    'category',
    'provider',
    'indexed_on',
    'url',
    'thumbnail',
    'detail_url',
    'related_url',
    'tags',
  ]
  const keys = Object.keys(image).filter(key => !excluded.has(key) && hasMetadataValue(image[key]))
  keys.sort((left, right) => {
    const leftIndex = preferred.indexOf(left)
    const rightIndex = preferred.indexOf(right)
    if (leftIndex >= 0 || rightIndex >= 0) {
      return (leftIndex < 0 ? preferred.length : leftIndex) - (rightIndex < 0 ? preferred.length : rightIndex)
    }
    return left.localeCompare(right)
  })

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = image[key]
    const formatted = formatMetadataValue(value)
    if (!formatted) {
      continue
    }
    const url = typeof value === 'string' ? value : ''
    appendInfoRow(container, formatMetadataLabel(key), formatted, url)
  }
}

function hasMetadataValue(value) {
  if (value === null || value === undefined || value === '') {
    return false
  }
  if (Array.isArray(value)) {
    return value.length > 0
  }
  return true
}

function formatMetadataValue(value) {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) ? formatNumber(value) : String(value)
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    const labels = []
    let simple = true
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      if (typeof item === 'string' || typeof item === 'number') {
        labels.push(String(item))
      } else if (
        item &&
        typeof item === 'object' &&
        typeof item.name === 'string' &&
        Object.keys(item).length === 1
      ) {
        labels.push(item.name)
      } else {
        simple = false
        break
      }
    }
    return simple ? labels.join(', ') : formatJsonValue(value)
  }
  return formatJsonValue(value)
}

function formatJsonValue(value) {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function formatMetadataLabel(key) {
  const words = key
    .replace(/__/g, ' ')
    .replace(/_/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim()
  return words
    .split(/\s+/)
    .map(word => {
      const lower = word.toLowerCase()
      if (lower === 'id') return 'ID'
      if (lower === 'url') return 'URL'
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    })
    .join(' ')
}

function formatDimensions(image) {
  const width = Number(image?.width)
  const height = Number(image?.height)
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return ''
  }
  return `${formatNumber(width)} × ${formatNumber(height)} px`
}

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }
  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

function formatNumber(value) {
  return new Intl.NumberFormat().format(value)
}

function appendInfoRow(container, label, value, url = '') {
  const row = document.createElement('div')
  row.className = 'info__row'

  const labelElement = document.createElement('span')
  labelElement.className = 'info__label'
  labelElement.textContent = label

  const valueElement = document.createElement('span')
  valueElement.className = 'info__value'
  if (String(value).includes('\n')) {
    valueElement.classList.add('info__value--multiline')
  }
  const safeUrl = getSafeUrl(url)
  if (safeUrl) {
    const link = document.createElement('a')
    link.href = safeUrl
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.textContent = String(value)
    valueElement.appendChild(link)
  } else {
    valueElement.textContent = String(value)
  }

  row.appendChild(labelElement)
  row.appendChild(valueElement)
  container.appendChild(row)
}

function getSafeUrl(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return ''
  }

  try {
    const url = new URL(value, document.baseURI)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : ''
  } catch {
    return ''
  }
}

function getGridColumnCount(template, width, gap, tileSize) {
  if (template && template !== 'none') {
    const tracks = template.trim().split(/\s+/).filter(Boolean)
    if (tracks.length > 0 && !tracks.some(track => track.includes('repeat('))) {
      return tracks.length
    }
  }
  return Math.max(1, Math.floor((width + gap) / (tileSize + gap)))
}

function normalizeWheelDelta(event) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16
  }
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * Math.max(1, window.innerHeight)
  }
  return event.deltaY
}

function getTouchDistance(touches) {
  if (touches.length < 2) {
    return 0
  }
  return Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY,
  )
}

async function getResponseError(response) {
  try {
    const data = await response.json()
    if (typeof data?.detail === 'string' && data.detail) {
      return data.detail
    }
  } catch {
    // Use the HTTP status below when the response is not JSON.
  }
  return `Openverse request failed (${response.status})`
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function dispatchCustomEvent(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail,
  }))
}
