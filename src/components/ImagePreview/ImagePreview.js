const minimumZoom = 1
const maximumZoom = 8
const zoomStep = 1.25

const imagePreviewStyle = `
  :host {
    display: contents;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .preview {
    --tot-image-preview-thumbnail-size: 4.5rem;
    background: var(--tot-image-preview-background-color, #000);
    color: var(--tot-image-preview-color, #fff);
    display: grid;
    font-family: var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif);
    grid-template-rows: minmax(0, 1fr) auto;
    inset: 0;
    min-height: 0;
    overflow: hidden;
    overscroll-behavior: contain;
    position: fixed;
    z-index: var(--tot-z-index-fullscreen, 1400);
  }

  :host([contained]) .preview {
    position: absolute;
    z-index: var(--tot-z-index-overlay, 1100);
  }

  .preview[hidden] {
    display: none;
  }

  .stage {
    align-items: center;
    cursor: default;
    display: flex;
    justify-content: center;
    min-height: 0;
    overflow: hidden;
    padding: calc(var(--tot-spacing-large, 1.25rem) + 1.75rem) var(--tot-spacing-large, 1.25rem) var(--tot-spacing-small, .75rem);
    position: relative;
    touch-action: none;
    user-select: none;
  }

  .stage[data-zoomed='true'] {
    cursor: grab;
  }

  .stage[data-dragging='true'] {
    cursor: grabbing;
  }

  .image {
    display: block;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    pointer-events: none;
    transform: translate3d(0, 0, 0) scale(1);
    transform-origin: center;
    width: 100%;
    will-change: transform;
  }

  .image[hidden],
  .empty[hidden],
  .error[hidden] {
    display: none;
  }

  .empty,
  .error {
    color: var(--tot-image-preview-muted-color, rgb(255 255 255 / 70%));
    font-size: var(--tot-font-size-small, .875rem);
    line-height: var(--tot-line-height-normal, 1.5);
    max-width: 28rem;
    padding: var(--tot-spacing-medium, 1rem);
    text-align: center;
  }

  .control {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: var(--tot-image-preview-control-background-color, rgb(0 0 0 / 55%));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-image-preview-control-border-color, rgb(255 255 255 / 22%));
    border-radius: var(--tot-border-radius-circle, 50%);
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    height: 2.25rem;
    justify-content: center;
    padding: 0;
    position: absolute;
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color;
    width: 2.25rem;
    z-index: 1;
  }

  .control:hover:not(:disabled) {
    background: var(--tot-image-preview-control-background-color-hover, rgb(255 255 255 / 16%));
    border-color: var(--tot-image-preview-control-border-color-hover, rgb(255 255 255 / 45%));
  }

  .control:focus-visible,
  .thumbnail:focus-visible,
  .preview:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 55%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .control:disabled {
    cursor: default;
    opacity: .35;
  }

  .control svg {
    display: block;
    height: 1.25rem;
    pointer-events: none;
    stroke: currentColor;
    width: 1.25rem;
  }

  .close {
    right: max(var(--tot-spacing-small, .75rem), env(safe-area-inset-right));
    top: max(var(--tot-spacing-small, .75rem), env(safe-area-inset-top));
  }

  .counter {
    background: var(--tot-image-preview-control-background-color, rgb(0 0 0 / 55%));
    border-radius: var(--tot-border-radius-pill, 999px);
    color: var(--tot-image-preview-muted-color, rgb(255 255 255 / 78%));
    font-size: var(--tot-font-size-x-small, .75rem);
    left: max(var(--tot-spacing-small, .75rem), env(safe-area-inset-left));
    line-height: 1;
    padding: var(--tot-spacing-2x-small, .25rem) var(--tot-spacing-x-small, .5rem);
    position: absolute;
    top: max(var(--tot-spacing-small, .75rem), env(safe-area-inset-top));
  }

  .thumbnails {
    align-items: center;
    display: flex;
    gap: var(--tot-spacing-2x-small, .25rem);
    min-height: calc(var(--tot-image-preview-thumbnail-size) + var(--tot-spacing-small, .75rem));
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    padding: var(--tot-spacing-2x-small, .25rem) max(var(--tot-spacing-small, .75rem), env(safe-area-inset-right)) max(var(--tot-spacing-x-small, .5rem), env(safe-area-inset-bottom)) max(var(--tot-spacing-small, .75rem), env(safe-area-inset-left));
    scrollbar-width: thin;
    scroll-snap-type: x proximity;
    touch-action: pan-x;
  }

  .thumbnails[hidden] {
    display: none;
  }

  .thumbnail {
    -webkit-appearance: none;
    appearance: none;
    background: var(--tot-image-preview-thumbnail-background-color, #111);
    border: 2px solid transparent;
    border-radius: var(--tot-border-radius-small, 3px);
    cursor: pointer;
    flex: 0 0 var(--tot-image-preview-thumbnail-size);
    height: var(--tot-image-preview-thumbnail-size);
    overflow: hidden;
    padding: 0;
    scroll-snap-align: center;
  }

  .thumbnail[aria-current='true'] {
    border-color: var(--tot-color-primary-500, #0ea5e9);
  }

  .thumbnail img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  @media (max-width: 640px) {
    .preview {
      --tot-image-preview-thumbnail-size: 3.75rem;
    }

    .stage {
      padding-inline: var(--tot-spacing-x-small, .5rem);
    }
  }
`

const closeIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true">
    <path d="M5 5l14 14M19 5 5 19"></path>
  </svg>
`

const openFullscreenPreviews = new Set()
const fullscreenPreviewStack = []
let previousBodyOverflow = ''
let fullscreenPreviewHistoryToken = ''
let fullscreenPreviewHistoryActive = false
let ignoreNextFullscreenPreviewPopState = false
let fullscreenPreviewHistoryResetTimer = 0

export class TotImagePreview extends HTMLElement {
  static get observedAttributes() {
    return ['contained', 'images', 'index', 'open']
  }

  constructor() {
    super()
    this._images = undefined
    this._previouslyFocused = null
    /** @type {Map<number, { x: number, y: number }>} */
    this._activePointers = new Map()
    this._gestureMode = 'idle'
    this._gestureMoved = false
    this._gestureStartX = 0
    this._gestureStartY = 0
    this._panStartX = 0
    this._panStartY = 0
    this._pinchDistance = 0
    this._pinchCenterX = 0
    this._pinchCenterY = 0
    this._panX = 0
    this._panY = 0
    this._zoom = minimumZoom
    this._zoomSource = ''
    this._requestedSource = ''
    this._wasOpen = false
    this._skipHistoryOnDeactivate = false
    this._resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(() => this._clampAndRenderTransform())

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${imagePreviewStyle}</style>
      <div class="preview" part="base" role="dialog" aria-modal="true" aria-label="Image preview" tabindex="-1" hidden>
        <div class="stage" part="stage">
          <span class="counter" part="counter"></span>
          <button class="control close" part="close-button" type="button" aria-label="Close preview">${closeIcon}</button>
          <img class="image" part="image" alt="" hidden>
          <div class="empty" part="empty">No images to preview.</div>
          <div class="error" part="error" hidden>Unable to load this image.</div>
        </div>
        <div class="thumbnails" part="thumbnails" hidden></div>
      </div>
    `

    this._baseElement = /** @type {HTMLElement} */ (root.querySelector('.preview'))
    this._stageElement = /** @type {HTMLElement} */ (root.querySelector('.stage'))
    this._imageElement = /** @type {HTMLImageElement} */ (root.querySelector('.image'))
    this._emptyElement = /** @type {HTMLElement} */ (root.querySelector('.empty'))
    this._errorElement = /** @type {HTMLElement} */ (root.querySelector('.error'))
    this._counterElement = /** @type {HTMLElement} */ (root.querySelector('.counter'))
    this._thumbnailsElement = /** @type {HTMLElement} */ (root.querySelector('.thumbnails'))
    this._closeButton = /** @type {HTMLButtonElement} */ (root.querySelector('.close'))
    this._closeButton.addEventListener('click', () => this.hide())
    this._baseElement.addEventListener('keydown', event => this._handleKeyDown(event))
    this._stageElement.addEventListener('pointerdown', event => this._handlePointerDown(event))
    this._stageElement.addEventListener('pointermove', event => this._handlePointerMove(event))
    this._stageElement.addEventListener('pointerup', event => this._handlePointerUp(event))
    this._stageElement.addEventListener('pointercancel', event => this._handlePointerCancel(event))
    this._stageElement.addEventListener('wheel', event => this._handleWheel(event), { passive: false })
    this._imageElement.addEventListener('load', () => this._handleImageLoad())
    this._imageElement.addEventListener('error', () => this._handleImageError())
    this._thumbnailsElement.addEventListener('click', event => this._handleThumbnailClick(event))
  }

  get images() {
    if (this._images !== undefined) {
      return this._images.slice()
    }

    this._images = parseImages(this.getAttribute('images'))
    return this._images.slice()
  }

  set images(value) {
    this._images = normalizeImages(value)
    this._syncImages()
  }

  get index() {
    return normalizeIndex(this.getAttribute('index'), this.images.length)
  }

  set index(value) {
    const nextIndex = normalizeIndex(value, this.images.length)
    if (String(nextIndex) === this.getAttribute('index')) {
      this._syncCurrentImage()
      return
    }
    this.setAttribute('index', String(nextIndex))
  }

  get open() {
    return this.hasAttribute('open')
  }

  set open(value) {
    setBooleanAttribute(this, 'open', value)
  }

  get contained() {
    return this.hasAttribute('contained')
  }

  set contained(value) {
    setBooleanAttribute(this, 'contained', value)
  }

  connectedCallback() {
    this._resizeObserver?.observe(this._stageElement)
    this._syncImages()
    this._syncOpenState()
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect()
    this._releasePointers()
    this._deactivateOpenState(true)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'images') {
      this._images = undefined
      this._syncImages()
    } else if (name === 'index') {
      this._syncCurrentImage(true)
    } else if (name === 'open') {
      this._syncOpenState()
    } else if (name === 'contained' && this.open) {
      this._syncFullscreenState()
    }
  }

  show(index = this.index) {
    this.index = index
    this.open = true
  }

  hide() {
    this.open = false
  }

  previous() {
    const images = this.images
    if (images.length < 2) {
      return
    }
    this.index = (this.index - 1 + images.length) % images.length
  }

  next() {
    const images = this.images
    if (images.length < 2) {
      return
    }
    this.index = (this.index + 1) % images.length
  }

  zoomIn() {
    const anchor = this._getStageCenter()
    this._applyZoom(this._zoom * zoomStep, anchor.x, anchor.y)
  }

  zoomOut() {
    const anchor = this._getStageCenter()
    this._applyZoom(this._zoom / zoomStep, anchor.x, anchor.y)
  }

  resetZoom() {
    this._zoom = minimumZoom
    this._panX = 0
    this._panY = 0
    this._renderTransform()
  }

  getBase() {
    return this._baseElement
  }

  getImage() {
    return this._imageElement
  }

  getThumbnails() {
    return Array.from(this._thumbnailsElement.querySelectorAll('.thumbnail'))
      .map(element => /** @type {HTMLButtonElement} */ (element))
  }

  _syncImages() {
    if (!this.isConnected) {
      return
    }

    const images = this.images
    this._thumbnailsElement.replaceChildren()

    for (let i = 0; i < images.length; i++) {
      const button = document.createElement('button')
      button.className = 'thumbnail'
      button.type = 'button'
      button.dataset.index = String(i)
      button.setAttribute('aria-label', `Show image ${i + 1}`)
      button.setAttribute('part', 'thumbnail')

      const image = document.createElement('img')
      image.src = images[i]
      image.alt = ''
      image.loading = 'lazy'
      image.decoding = 'async'
      button.appendChild(image)
      this._thumbnailsElement.appendChild(button)
    }

    const index = normalizeIndex(this.getAttribute('index'), images.length)
    if (String(index) !== this.getAttribute('index')) {
      this.setAttribute('index', String(index))
      return
    }
    this._syncCurrentImage()
  }

  _syncCurrentImage(emitChange = false) {
    if (!this.isConnected) {
      return
    }

    const images = this.images
    const index = normalizeIndex(this.getAttribute('index'), images.length)
    const hasImages = images.length > 0
    const hasNavigation = images.length > 1

    this._emptyElement.hidden = hasImages
    this._errorElement.hidden = true
    this._imageElement.hidden = true
    this._counterElement.hidden = !hasImages
    this._counterElement.textContent = hasImages ? `${index + 1} / ${images.length}` : ''
    this._stageElement.dataset.navigable = String(hasNavigation)
    this._thumbnailsElement.hidden = !hasNavigation

    if (hasImages) {
      const source = images[index]
      if (source !== this._zoomSource) {
        this._zoomSource = source
        this.resetZoom()
      }
      if (source !== this._requestedSource) {
        this._requestedSource = source
        this._imageElement.removeAttribute('src')
        this._imageElement.src = source
      } else if (this._imageElement.complete && this._imageElement.naturalWidth > 0) {
        this._imageElement.hidden = false
      }
      this._imageElement.alt = `Image ${index + 1} of ${images.length}`
    } else {
      this._zoomSource = ''
      this._requestedSource = ''
      this.resetZoom()
      this._imageElement.removeAttribute('src')
      this._imageElement.alt = ''
    }

    const thumbnails = this.getThumbnails()
    for (let i = 0; i < thumbnails.length; i++) {
      const current = i === index
      thumbnails[i].setAttribute('aria-current', String(current))
      thumbnails[i].tabIndex = current ? 0 : -1
      if (current && this.open) {
        thumbnails[i].scrollIntoView({
          block: 'nearest',
          inline: 'center',
        })
      }
    }

    if (emitChange && hasImages) {
      dispatchCustomEvent(this, 'change', {
        index,
        src: images[index],
      })
    }
  }

  _syncOpenState() {
    if (!this.isConnected) {
      return
    }

    const open = this.open
    this._baseElement.hidden = !open
    if (open === this._wasOpen) {
      this._syncFullscreenState()
      return
    }

    this._wasOpen = open
    if (open) {
      this.resetZoom()
      this._previouslyFocused = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
      this._syncFullscreenState()
      this._syncCurrentImage()
      requestAnimationFrame(() => {
        if (this.open) {
          this._baseElement.focus({ preventScroll: true })
        }
      })
      dispatchEvent(this, 'show')
    } else {
      this._releasePointers()
      this.resetZoom()
      this._deactivateOpenState(this._skipHistoryOnDeactivate)
      this._skipHistoryOnDeactivate = false
      dispatchEvent(this, 'hide')
    }
  }

  _syncFullscreenState() {
    if (!this.open || this.contained) {
      unregisterFullscreenPreview(this, false)
      unlockBody(this)
      return
    }

    lockBody(this)
    registerFullscreenPreview(this)
  }

  _deactivateOpenState(skipHistory = false) {
    unregisterFullscreenPreview(this, skipHistory)
    unlockBody(this)
    if (this._previouslyFocused?.isConnected) {
      this._previouslyFocused.focus({ preventScroll: true })
    }
    this._previouslyFocused = null
    this._wasOpen = false
  }

  _handleKeyDown(event) {
    if (!this.open) {
      return
    }

    if (event.key === 'Tab') {
      this._trapFocus(event)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      this.previous()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      this.next()
    } else if (event.key === 'Home') {
      event.preventDefault()
      this.index = 0
    } else if (event.key === 'End') {
      event.preventDefault()
      this.index = Math.max(0, this.images.length - 1)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      this.hide()
    }
  }

  _trapFocus(event) {
    const controls = Array.from(this.shadowRoot.querySelectorAll('button:not(:disabled)'))
      .map(element => /** @type {HTMLButtonElement} */ (element))
      .filter(element => !element.hidden && element.offsetParent !== null)
    if (controls.length === 0) {
      event.preventDefault()
      this._baseElement.focus()
      return
    }

    const activeElement = this.shadowRoot.activeElement
    const firstControl = controls[0]
    const lastControl = controls[controls.length - 1]
    if (event.shiftKey && (activeElement === firstControl || activeElement === this._baseElement)) {
      event.preventDefault()
      lastControl.focus()
    } else if (!event.shiftKey && activeElement === lastControl) {
      event.preventDefault()
      firstControl.focus()
    }
  }

  _handlePointerDown(event) {
    if ((event.pointerType === 'mouse' && event.button !== 0) || event.target.closest?.('button')) {
      return
    }

    this._activePointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    })
    this._stageElement.setPointerCapture?.(event.pointerId)

    if (this._activePointers.size === 1) {
      this._startSinglePointerGesture(event.clientX, event.clientY)
    } else if (this._activePointers.size === 2) {
      this._startPinchGesture()
    }
  }

  _handlePointerMove(event) {
    if (!this._activePointers.has(event.pointerId)) {
      return
    }

    this._activePointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    })

    if (this._activePointers.size >= 2) {
      event.preventDefault()
      const pinch = getPointerPinch(this._activePointers)
      if (!pinch || this._pinchDistance <= 0) {
        this._startPinchGesture()
        return
      }

      const factor = pinch.distance / this._pinchDistance
      this._applyZoom(this._zoom * factor, this._pinchCenterX, this._pinchCenterY)
      this._panX += pinch.centerX - this._pinchCenterX
      this._panY += pinch.centerY - this._pinchCenterY
      this._pinchDistance = pinch.distance
      this._pinchCenterX = pinch.centerX
      this._pinchCenterY = pinch.centerY
      this._gestureMoved = true
      this._clampAndRenderTransform()
      return
    }

    if (this._gestureMode === 'pan') {
      const distanceX = event.clientX - this._gestureStartX
      const distanceY = event.clientY - this._gestureStartY
      if (Math.abs(distanceX) > 2 || Math.abs(distanceY) > 2) {
        this._gestureMoved = true
        this._stageElement.dataset.dragging = 'true'
      }
      this._panX = this._panStartX + distanceX
      this._panY = this._panStartY + distanceY
      this._clampAndRenderTransform()
      event.preventDefault()
      return
    }

    if (this._gestureMode === 'navigate') {
      const horizontalDistance = Math.abs(event.clientX - this._gestureStartX)
      const verticalDistance = Math.abs(event.clientY - this._gestureStartY)
      if (horizontalDistance > verticalDistance && horizontalDistance > 8) {
        this._gestureMoved = true
        event.preventDefault()
      }
    }
  }

  _handlePointerUp(event) {
    if (!this._activePointers.has(event.pointerId)) {
      return
    }

    this._activePointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    })
    const mode = this._gestureMode
    const distanceX = event.clientX - this._gestureStartX
    const distanceY = event.clientY - this._gestureStartY
    this._releasePointer(event.pointerId)

    if (mode === 'pinch' || this._activePointers.size > 0) {
      if (this._activePointers.size >= 2) {
        this._startPinchGesture()
      } else {
        this._gestureMode = this._activePointers.size > 0 ? 'suppressed' : 'idle'
        this._stageElement.dataset.dragging = 'false'
      }
      return
    }

    this._gestureMode = 'idle'
    this._stageElement.dataset.dragging = 'false'
    if (mode !== 'navigate') {
      return
    }

    const threshold = Math.max(40, this._stageElement.clientWidth * .08)
    if (Math.abs(distanceX) >= threshold && Math.abs(distanceX) > Math.abs(distanceY)) {
      if (distanceX < 0) {
        this.next()
      } else {
        this.previous()
      }
      return
    }

    if (this._gestureMoved || Math.abs(distanceX) > 8 || Math.abs(distanceY) > 8 || this.images.length < 2) {
      return
    }

    const bounds = this._stageElement.getBoundingClientRect()
    if (bounds.width <= 0) {
      return
    }

    const position = (event.clientX - bounds.left) / bounds.width
    if (position <= .25) {
      this.previous()
    } else if (position >= .75) {
      this.next()
    }
  }

  _handlePointerCancel(event) {
    if (!this._activePointers.has(event.pointerId)) {
      return
    }

    this._releasePointer(event.pointerId)
    if (this._activePointers.size === 0) {
      this._gestureMode = 'idle'
      this._stageElement.dataset.dragging = 'false'
    } else {
      this._gestureMode = 'suppressed'
    }
  }

  _handleWheel(event) {
    if (!event.ctrlKey || this._imageElement.hidden) {
      return
    }

    event.preventDefault()
    const delta = normalizeZoomWheelDelta(event)
    const factor = Math.exp(-delta * .0025)
    this._applyZoom(this._zoom * factor, event.clientX, event.clientY)
  }

  _startSinglePointerGesture(x, y) {
    this._gestureMode = this._zoom > minimumZoom ? 'pan' : 'navigate'
    this._gestureMoved = false
    this._gestureStartX = x
    this._gestureStartY = y
    this._panStartX = this._panX
    this._panStartY = this._panY
  }

  _startPinchGesture() {
    const pinch = getPointerPinch(this._activePointers)
    if (!pinch) {
      return
    }

    this._gestureMode = 'pinch'
    this._gestureMoved = true
    this._pinchDistance = pinch.distance
    this._pinchCenterX = pinch.centerX
    this._pinchCenterY = pinch.centerY
    this._stageElement.dataset.dragging = 'true'
  }

  _applyZoom(value, anchorX, anchorY) {
    if (this._imageElement.hidden) {
      return
    }

    const nextZoom = Math.min(maximumZoom, Math.max(minimumZoom, value))
    if (nextZoom <= minimumZoom + .001) {
      this.resetZoom()
      return
    }

    if (Math.abs(nextZoom - this._zoom) < .001) {
      return
    }

    const center = this._getImageCenter()
    const relativeX = anchorX - center.x
    const relativeY = anchorY - center.y
    const imageX = (relativeX - this._panX) / this._zoom
    const imageY = (relativeY - this._panY) / this._zoom
    this._panX = relativeX - imageX * nextZoom
    this._panY = relativeY - imageY * nextZoom
    this._zoom = nextZoom
    this._clampAndRenderTransform()
  }

  _clampAndRenderTransform() {
    if (this._zoom <= minimumZoom) {
      this._zoom = minimumZoom
      this._panX = 0
      this._panY = 0
      this._renderTransform()
      return
    }

    const viewport = getStageViewportSize(this._stageElement)
    const image = getContainedImageSize(this._imageElement)
    const maximumPanX = Math.max(0, (image.width * this._zoom - viewport.width) / 2)
    const maximumPanY = Math.max(0, (image.height * this._zoom - viewport.height) / 2)
    this._panX = Math.min(maximumPanX, Math.max(-maximumPanX, this._panX))
    this._panY = Math.min(maximumPanY, Math.max(-maximumPanY, this._panY))
    this._renderTransform()
  }

  _renderTransform() {
    this._imageElement.style.transform = `translate3d(${this._panX}px, ${this._panY}px, 0) scale(${this._zoom})`
    this._stageElement.dataset.zoomed = String(this._zoom > minimumZoom)
  }

  _getStageCenter() {
    const bounds = this._stageElement.getBoundingClientRect()
    return {
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    }
  }

  _getImageCenter() {
    const stageBounds = this._stageElement.getBoundingClientRect()
    return {
      x: stageBounds.left + this._imageElement.offsetLeft + this._imageElement.offsetWidth / 2,
      y: stageBounds.top + this._imageElement.offsetTop + this._imageElement.offsetHeight / 2,
    }
  }

  _releasePointer(pointerId) {
    if (this._stageElement.hasPointerCapture?.(pointerId)) {
      this._stageElement.releasePointerCapture(pointerId)
    }
    this._activePointers.delete(pointerId)
  }

  _releasePointers() {
    const pointerIds = Array.from(this._activePointers.keys())
    for (let i = 0; i < pointerIds.length; i++) {
      this._releasePointer(pointerIds[i])
    }
    this._gestureMode = 'idle'
    this._stageElement.dataset.dragging = 'false'
  }

  _handleThumbnailClick(event) {
    const button = event.target.closest?.('.thumbnail')
    if (!button || !this._thumbnailsElement.contains(button)) {
      return
    }
    this.index = Number(button.dataset.index)
    button.focus()
  }

  _handleImageLoad() {
    const images = this.images
    const source = images[normalizeIndex(this.getAttribute('index'), images.length)]
    if (!source || source !== this._requestedSource || this._imageElement.getAttribute('src') !== source) {
      return
    }
    this._errorElement.hidden = true
    this._imageElement.hidden = false
    this._clampAndRenderTransform()
  }

  _handleImageError() {
    const images = this.images
    const source = images[normalizeIndex(this.getAttribute('index'), images.length)]
    if (!source || source !== this._requestedSource || this._imageElement.getAttribute('src') !== source) {
      return
    }
    this._imageElement.hidden = true
    this._errorElement.hidden = false
  }
}

/** @param {Map<number, { x: number, y: number }>} pointers */
function getPointerPinch(pointers) {
  if (pointers.size < 2) {
    return null
  }

  const values = Array.from(pointers.values())
  const first = values[0]
  const second = values[1]
  return {
    centerX: (first.x + second.x) / 2,
    centerY: (first.y + second.y) / 2,
    distance: Math.hypot(first.x - second.x, first.y - second.y),
  }
}

/** @param {HTMLElement} stage */
function getStageViewportSize(stage) {
  const style = getComputedStyle(stage)
  const horizontalPadding = (Number.parseFloat(style.paddingLeft) || 0)
    + (Number.parseFloat(style.paddingRight) || 0)
  const verticalPadding = (Number.parseFloat(style.paddingTop) || 0)
    + (Number.parseFloat(style.paddingBottom) || 0)
  return {
    width: Math.max(0, stage.clientWidth - horizontalPadding),
    height: Math.max(0, stage.clientHeight - verticalPadding),
  }
}

/** @param {HTMLImageElement} image */
function getContainedImageSize(image) {
  const width = image.clientWidth
  const height = image.clientHeight
  if (width <= 0 || height <= 0 || image.naturalWidth <= 0 || image.naturalHeight <= 0) {
    return { width, height }
  }

  const ratio = Math.min(width / image.naturalWidth, height / image.naturalHeight)
  return {
    width: image.naturalWidth * ratio,
    height: image.naturalHeight * ratio,
  }
}

/** @param {WheelEvent} event */
function normalizeZoomWheelDelta(event) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16
  }
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * Math.max(1, window.innerHeight)
  }
  return event.deltaY
}

function normalizeImages(value) {
  if (!Array.isArray(value)) {
    return []
  }

  const images = []
  for (let i = 0; i < value.length; i++) {
    if (typeof value[i] === 'string' && value[i].trim()) {
      images.push(value[i].trim())
    }
  }
  return images
}

function parseImages(value) {
  if (!value) {
    return []
  }

  try {
    return normalizeImages(JSON.parse(value))
  } catch {
    return []
  }
}

function normalizeIndex(value, length) {
  if (length < 1) {
    return 0
  }

  const parsed = Number.parseInt(String(value ?? 0), 10)
  if (!Number.isFinite(parsed)) {
    return 0
  }
  return Math.min(length - 1, Math.max(0, parsed))
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function dispatchEvent(element, name) {
  element.dispatchEvent(new Event(name, {
    bubbles: true,
    composed: true,
  }))
}

function dispatchCustomEvent(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail,
  }))
}

function lockBody(preview) {
  if (openFullscreenPreviews.has(preview)) {
    return
  }

  if (openFullscreenPreviews.size === 0 && document.body) {
    previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  openFullscreenPreviews.add(preview)
}

function unlockBody(preview) {
  if (!openFullscreenPreviews.delete(preview)) {
    return
  }

  if (openFullscreenPreviews.size === 0 && document.body) {
    document.body.style.overflow = previousBodyOverflow
    previousBodyOverflow = ''
  }
}

function registerFullscreenPreview(preview) {
  if (fullscreenPreviewStack.indexOf(preview) !== -1) {
    return
  }

  const wasEmpty = fullscreenPreviewStack.length === 0
  fullscreenPreviewStack.push(preview)
  if (wasEmpty) {
    window.addEventListener('popstate', handleFullscreenPreviewPopState)
    pushFullscreenPreviewHistoryState()
  }
}

function unregisterFullscreenPreview(preview, skipHistory) {
  const index = fullscreenPreviewStack.indexOf(preview)
  if (index === -1) {
    return
  }

  fullscreenPreviewStack.splice(index, 1)
  if (fullscreenPreviewStack.length === 0) {
    window.removeEventListener('popstate', handleFullscreenPreviewPopState)
    removeFullscreenPreviewHistoryState(skipHistory)
  }
}

function handleFullscreenPreviewPopState(event) {
  if (ignoreNextFullscreenPreviewPopState) {
    ignoreNextFullscreenPreviewPopState = false
    clearTimeout(fullscreenPreviewHistoryResetTimer)
    fullscreenPreviewHistoryResetTimer = 0
    return
  }

  const top = fullscreenPreviewStack[fullscreenPreviewStack.length - 1]
  if (!top || !fullscreenPreviewHistoryActive) {
    return
  }

  if (event.state && event.state.totImagePreviewToken === fullscreenPreviewHistoryToken) {
    return
  }

  fullscreenPreviewHistoryActive = false
  fullscreenPreviewHistoryToken = ''
  top._skipHistoryOnDeactivate = true
  top.hide()

  if (fullscreenPreviewStack.length > 0) {
    pushFullscreenPreviewHistoryState()
  }
}

function pushFullscreenPreviewHistoryState() {
  if (fullscreenPreviewHistoryActive || typeof history === 'undefined') {
    return
  }

  fullscreenPreviewHistoryToken = `tot-image-preview-${Date.now()}-${Math.random().toString(36).slice(2)}`

  try {
    const currentState = history.state && typeof history.state === 'object' ? history.state : {}
    history.pushState({ ...currentState, totImagePreviewToken: fullscreenPreviewHistoryToken }, '')
    fullscreenPreviewHistoryActive = true
  } catch {
    fullscreenPreviewHistoryActive = false
    fullscreenPreviewHistoryToken = ''
  }
}

function removeFullscreenPreviewHistoryState(skipHistory) {
  if (!fullscreenPreviewHistoryActive || typeof history === 'undefined') {
    fullscreenPreviewHistoryActive = false
    fullscreenPreviewHistoryToken = ''
    return
  }

  const token = fullscreenPreviewHistoryToken
  const state = history.state
  const isCurrentPreviewState = state && state.totImagePreviewToken === token
  fullscreenPreviewHistoryActive = false
  fullscreenPreviewHistoryToken = ''

  if (!isCurrentPreviewState) {
    return
  }

  if (skipHistory) {
    const nextState = { ...state }
    delete nextState.totImagePreviewToken
    history.replaceState(nextState, '')
    return
  }

  ignoreNextFullscreenPreviewPopState = true
  clearTimeout(fullscreenPreviewHistoryResetTimer)
  fullscreenPreviewHistoryResetTimer = window.setTimeout(() => {
    ignoreNextFullscreenPreviewPopState = false
    fullscreenPreviewHistoryResetTimer = 0
  }, 1000)
  history.back()
}

