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
    display: flex;
    justify-content: center;
    min-height: 0;
    overflow: hidden;
    padding: calc(var(--tot-spacing-large, 1.25rem) + 1.75rem) var(--tot-spacing-large, 1.25rem) var(--tot-spacing-small, .75rem);
    position: relative;
    touch-action: none;
    user-select: none;
  }

  .image {
    display: block;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    pointer-events: none;
    width: 100%;
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
let previousBodyOverflow = ''

export class TotImagePreview extends HTMLElement {
  static get observedAttributes() {
    return ['contained', 'images', 'index', 'open']
  }

  constructor() {
    super()
    this._images = undefined
    this._previouslyFocused = null
    this._swipePointerId = null
    this._swipeStartX = 0
    this._swipeStartY = 0
    this._wasOpen = false

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
    this._syncImages()
    this._syncOpenState()
  }

  disconnectedCallback() {
    this._releasePointer()
    this._deactivateOpenState()
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
      this._syncBodyLock()
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
    this._imageElement.hidden = !hasImages
    this._counterElement.hidden = !hasImages
    this._counterElement.textContent = hasImages ? `${index + 1} / ${images.length}` : ''
    this._stageElement.dataset.navigable = String(hasNavigation)
    this._thumbnailsElement.hidden = !hasNavigation

    if (hasImages) {
      const source = images[index]
      if (this._imageElement.getAttribute('src') !== source) {
        this._imageElement.hidden = true
        this._imageElement.src = source
      } else if (this._imageElement.complete && this._imageElement.naturalWidth > 0) {
        this._imageElement.hidden = false
      }
      this._imageElement.alt = `Image ${index + 1} of ${images.length}`
    } else {
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
      this._syncBodyLock()
      return
    }

    this._wasOpen = open
    if (open) {
      this._previouslyFocused = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
      this._syncBodyLock()
      this._syncCurrentImage()
      requestAnimationFrame(() => {
        if (this.open) {
          this._baseElement.focus({ preventScroll: true })
        }
      })
      dispatchEvent(this, 'show')
    } else {
      this._deactivateOpenState()
      dispatchEvent(this, 'hide')
    }
  }

  _syncBodyLock() {
    if (!this.open || this.contained) {
      unlockBody(this)
      return
    }
    lockBody(this)
  }

  _deactivateOpenState() {
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
    if (event.button !== 0 || event.target.closest?.('button')) {
      return
    }

    this._swipePointerId = event.pointerId
    this._swipeStartX = event.clientX
    this._swipeStartY = event.clientY
    this._stageElement.setPointerCapture?.(event.pointerId)
  }

  _handlePointerMove(event) {
    if (event.pointerId !== this._swipePointerId) {
      return
    }

    const horizontalDistance = Math.abs(event.clientX - this._swipeStartX)
    const verticalDistance = Math.abs(event.clientY - this._swipeStartY)
    if (horizontalDistance > verticalDistance && horizontalDistance > 8) {
      event.preventDefault()
    }
  }

  _handlePointerUp(event) {
    if (event.pointerId !== this._swipePointerId) {
      return
    }

    const distanceX = event.clientX - this._swipeStartX
    const distanceY = event.clientY - this._swipeStartY
    const threshold = Math.max(40, this._stageElement.clientWidth * .08)
    this._releasePointer()

    if (Math.abs(distanceX) >= threshold && Math.abs(distanceX) > Math.abs(distanceY)) {
      if (distanceX < 0) {
        this.next()
      } else {
        this.previous()
      }
      return
    }

    if (Math.abs(distanceX) > 8 || Math.abs(distanceY) > 8 || this.images.length < 2) {
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
    if (event.pointerId === this._swipePointerId) {
      this._releasePointer()
    }
  }

  _releasePointer() {
    if (this._swipePointerId === null) {
      return
    }

    if (this._stageElement.hasPointerCapture?.(this._swipePointerId)) {
      this._stageElement.releasePointerCapture(this._swipePointerId)
    }
    this._swipePointerId = null
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
    if (!this.images.length) {
      return
    }
    this._errorElement.hidden = true
    this._imageElement.hidden = false
  }

  _handleImageError() {
    this._imageElement.hidden = true
    this._errorElement.hidden = false
  }
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
