const avatarStyle = `
  :host {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    line-height: 0;
    max-width: 100%;
    vertical-align: middle;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .avatar {
    --tot-avatar-effective-size: var(--tot-avatar-size, var(--tot-avatar-size-medium, 2.5rem));
    align-items: center;
    background: var(--tot-color-neutral-100, #f1f5f9);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-color-neutral-200, #e2e8f0);
    color: var(--tot-color-neutral-600, #475569);
    display: inline-flex;
    font-family: var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif);
    font-size: calc(var(--tot-avatar-effective-size) * .4);
    font-weight: var(--tot-font-weight-semibold, 600);
    height: var(--tot-avatar-effective-size);
    justify-content: center;
    line-height: 1;
    max-width: 100%;
    overflow: hidden;
    text-transform: uppercase;
    user-select: none;
    -webkit-user-select: none;
    width: var(--tot-avatar-effective-size);
  }

  .avatar--small {
    --tot-avatar-effective-size: var(--tot-avatar-size, var(--tot-avatar-size-small, 1.75rem));
  }

  .avatar--large {
    --tot-avatar-effective-size: var(--tot-avatar-size, var(--tot-avatar-size-large, 3.25rem));
  }

  .avatar--circle {
    border-radius: var(--tot-border-radius-circle, 50%);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar--rounded {
    border-radius: var(--tot-border-radius-medium, 4px);
  }

  .avatar__image {
    display: block;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
    width: 100%;
  }

  .avatar__initials,
  .avatar__icon {
    align-items: center;
    display: inline-flex;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    padding: var(--tot-spacing-2x-small, .25rem);
    text-align: center;
    width: 100%;
  }

  .avatar__icon {
    font-size: calc(var(--tot-avatar-effective-size) * .5);
  }

  [hidden] {
    display: none;
  }
`

const sizes = ['small', 'medium', 'large']
const shapes = ['circle', 'square', 'rounded']
const loadings = ['eager', 'lazy']

export class TotAvatar extends HTMLElement {
  static get observedAttributes() {
    return [
      'image',
      'label',
      'initials',
      'loading',
      'shape',
      'size',
    ]
  }

  constructor() {
    super()
    this._imageFailed = false
    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${avatarStyle}</style>
      <span class="avatar" part="base">
        <img class="avatar__image" part="image" alt="" hidden>
        <span class="avatar__initials" part="initials" hidden></span>
        <span class="avatar__icon" part="icon" aria-hidden="true" hidden><slot name="icon">👤</slot></span>
      </span>
    `

    this._baseElement = root.querySelector('.avatar')
    this._imageElement = root.querySelector('.avatar__image')
    this._initialsElement = root.querySelector('.avatar__initials')
    this._iconElement = root.querySelector('.avatar__icon')
    this._imageElement.addEventListener('error', () => this.handleImageError())
  }

  get image() {
    return this.getAttribute('image') || ''
  }

  set image(value) {
    const nextValue = value === null || value === undefined ? null : String(value)
    if (nextValue !== null && this.getAttribute('image') === nextValue) {
      this._imageElement.removeAttribute('src')
      this._imageFailed = false
      if (this.isConnected) {
        this.render()
      }
      return
    }

    setNullableAttribute(this, 'image', value)
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  get initials() {
    return this.getAttribute('initials') || ''
  }

  set initials(value) {
    setNullableAttribute(this, 'initials', value)
  }

  get loading() {
    return getSupportedValue(this.getAttribute('loading'), loadings, 'eager')
  }

  set loading(value) {
    this.setAttribute('loading', getSupportedValue(value, loadings, 'eager'))
  }

  get size() {
    return getSupportedValue(this.getAttribute('size'), sizes, 'medium')
  }

  set size(value) {
    this.setAttribute('size', getSupportedValue(value, sizes, 'medium'))
  }

  get shape() {
    return getSupportedValue(this.getAttribute('shape'), shapes, 'circle')
  }

  set shape(value) {
    this.setAttribute('shape', getSupportedValue(value, shapes, 'circle'))
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'image') {
      this._imageFailed = false
    }

    if (this.isConnected) {
      this.render()
    }
  }

  getImage() {
    return this._imageElement
  }

  handleImageError() {
    if (this._imageFailed) {
      return
    }

    this._imageFailed = true
    this.render()
  }

  render() {
    const image = this.image
    const initials = this.initials.trim().slice(0, 2)
    const showImage = Boolean(image && !this._imageFailed)
    const showInitials = Boolean(!showImage && initials)
    const label = this.label

    this._baseElement.className = `avatar avatar--${this.size} avatar--${this.shape}`
    if (label) {
      this._baseElement.setAttribute('role', 'img')
      this._baseElement.setAttribute('aria-label', label)
      this._baseElement.removeAttribute('aria-hidden')
    } else {
      this._baseElement.removeAttribute('role')
      this._baseElement.removeAttribute('aria-label')
      this._baseElement.setAttribute('aria-hidden', 'true')
    }

    this._imageElement.hidden = !showImage
    this._initialsElement.hidden = !showInitials
    this._iconElement.hidden = showImage || showInitials
    this._initialsElement.textContent = initials
    this._imageElement.loading = this.loading

    if (image) {
      if (this._imageElement.getAttribute('src') !== image) {
        this._imageElement.setAttribute('src', image)
      }
    } else {
      this._imageElement.removeAttribute('src')
    }
  }
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

function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}
