const generationPlaceholderStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .generation-placeholder {
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

  .generation-placeholder__indicator {
    display: inline-flex;
    flex: 0 0 auto;
    gap: .15rem;
  }

  .generation-placeholder__indicator span {
    animation: generation-placeholder-pulse 1.2s ease-in-out infinite;
    background: currentColor;
    border-radius: var(--tot-border-radius-circle, 50%);
    height: .3rem;
    opacity: .35;
    width: .3rem;
  }

  .generation-placeholder__indicator span:nth-child(2) {
    animation-delay: .15s;
  }

  .generation-placeholder__indicator span:nth-child(3) {
    animation-delay: .3s;
  }

  .generation-placeholder__message {
    min-width: 0;
  }

  @keyframes generation-placeholder-pulse {
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
    .generation-placeholder__indicator span {
      animation: none;
      opacity: .7;
    }
  }
`

export class TotGenerationPlaceholder extends HTMLElement {
  static get observedAttributes() {
    return ['label']
  }

  get label() {
    return this.getAttribute('label') || 'Generating…'
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render()
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${generationPlaceholderStyle}</style>
      <div class="generation-placeholder" part="base" role="status" aria-live="polite" aria-busy="true">
        <span class="generation-placeholder__indicator" part="indicator" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
        <span class="generation-placeholder__message" part="message"><slot>${escapeHtml(this.label)}</slot></span>
      </div>
    `
  }
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
