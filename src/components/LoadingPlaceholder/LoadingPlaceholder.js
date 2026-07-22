const loadingPlaceholderStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .loading-placeholder {
    align-items: center;
    background: color-mix(in srgb, var(--tot-color-warning-100, #fef3c7) 65%, var(--tot-panel-background-color, #fff));
    border: var(--tot-panel-border-width, 1px) dashed var(--tot-color-warning-600, #d97706);
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--tot-color-warning-800, #92400e);
    display: flex;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    font-weight: var(--tot-font-weight-semibold, 600);
    gap: var(--tot-spacing-x-small, .5rem);
    line-height: var(--tot-line-height-dense, 1.4);
    min-height: var(--tot-input-height-large, 2.75rem);
    min-width: 0;
    overflow-wrap: anywhere;
    padding: var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem);
    width: 100%;
  }

  .loading-placeholder__indicator {
    display: inline-flex;
    flex: 0 0 auto;
    gap: .15rem;
  }

  .loading-placeholder__indicator span {
    animation: loading-placeholder-pulse 1.2s ease-in-out infinite;
    background: currentColor;
    border-radius: var(--tot-border-radius-circle, 50%);
    height: .3rem;
    opacity: .35;
    width: .3rem;
  }

  .loading-placeholder__indicator span:nth-child(2) {
    animation-delay: .15s;
  }

  .loading-placeholder__indicator span:nth-child(3) {
    animation-delay: .3s;
  }

  .loading-placeholder__message {
    min-width: 0;
  }

  @keyframes loading-placeholder-pulse {
    0%, 60%, 100% {
      opacity: .35;
      transform: translateY(0);
    }

    30% {
      opacity: 1;
      transform: translateY(-.12rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .loading-placeholder__indicator span {
      animation: none;
      opacity: .7;
    }
  }
`

export class TotLoadingPlaceholder extends HTMLElement {
  static get observedAttributes() {
    return ['label']
  }

  constructor() {
    super()
    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${loadingPlaceholderStyle}</style>
      <div class="loading-placeholder" part="base" role="status" aria-live="polite" aria-busy="true">
        <span class="loading-placeholder__indicator" part="indicator" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
        <span class="loading-placeholder__message" part="message"><slot></slot></span>
      </div>
    `

    this._baseElement = root.querySelector('.loading-placeholder')
    this._indicatorElement = root.querySelector('.loading-placeholder__indicator')
    this._messageElement = root.querySelector('.loading-placeholder__message')
    this._slotElement = root.querySelector('slot')
  }

  get label() {
    return this.getAttribute('label') || 'Loading…'
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  connectedCallback() {
    this.syncLabel()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'label' && oldValue !== newValue) {
      this.syncLabel()
    }
  }

  getBase() {
    return this._baseElement
  }

  getIndicator() {
    return this._indicatorElement
  }

  getMessage() {
    return this._messageElement
  }

  render() {
    this.syncLabel()
  }

  syncLabel() {
    if (this._slotElement) {
      this._slotElement.textContent = this.label
    }
  }
}

function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}
