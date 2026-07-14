const avatarStyle = `
  :host {
    --size: 2.5rem;

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
    align-items: center;
    background: var(--tot-color-neutral-100, #f1f5f9);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-color-neutral-200, #e2e8f0);
    color: var(--tot-color-neutral-600, #475569);
    display: inline-flex;
    font-family: var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif);
    font-size: calc(var(--size) * .4);
    font-weight: var(--tot-font-weight-semibold, 600);
    height: var(--size);
    justify-content: center;
    line-height: 1;
    max-width: 100%;
    overflow: hidden;
    text-transform: uppercase;
    user-select: none;
    -webkit-user-select: none;
    width: var(--size);
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
    font-size: calc(var(--size) * .5);
  }
`

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
    ]
  }

  constructor() {
    super()
    this._imageFailed = false
  }

  get image() {
    return this.getAttribute('image') || ''
  }

  set image(value) {
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

    this.render()
  }

  render() {
    const image = this.image
    const label = this.label
    const initials = this.initials.trim().slice(0, 2)
    const shape = this.shape
    const root = this.getRoot()
    const content = image && !this._imageFailed
      ? `<img class="avatar__image" part="image" src="${escapeAttribute(image)}" alt="" loading="${escapeAttribute(this.loading)}">`
      : initials
        ? `<span class="avatar__initials" part="initials">${escapeHtml(initials)}</span>`
        : `<span class="avatar__icon" part="icon" aria-hidden="true"><slot name="icon">👤</slot></span>`

    root.innerHTML = `<style>${avatarStyle}</style>
      <span
        class="avatar avatar--${escapeAttribute(shape)}"
        part="base"
        role="img"
        aria-label="${escapeAttribute(label)}"
      >${content}</span>
    `

    const img = root.querySelector('img')
    if (img) {
      img.addEventListener('error', () => {
        this._imageFailed = true
        this.render()
      })
    }
  }

  getRoot() {
    return this.shadowRoot || this.attachShadow({ mode: 'open' })
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
