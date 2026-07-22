const dividerStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .divider {
    border: 0;
    border-top: var(--tot-divider-width, var(--tot-panel-border-width, 1px)) solid
      var(--tot-divider-color, var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0)));
    display: block;
    height: 0;
    margin: var(--tot-divider-spacing, var(--tot-spacing-medium, 1rem)) 0;
    max-width: 100%;
    width: 100%;
  }

  :host([vertical]) {
    align-self: stretch;
    display: inline-flex;
    max-width: none;
  }

  :host([vertical]) .divider {
    border-left: var(--tot-divider-width, var(--tot-panel-border-width, 1px)) solid
      var(--tot-divider-color, var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0)));
    border-top: 0;
    height: 100%;
    margin: 0 var(--tot-divider-spacing, var(--tot-spacing-medium, 1rem));
    min-height: 1em;
    width: 0;
  }
`

export class TotDivider extends HTMLElement {
  static get observedAttributes() {
    return ['vertical']
  }

  constructor() {
    super()
    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${dividerStyle}</style><div class="divider" part="base" role="separator"></div>`
  }

  get vertical() {
    return this.hasAttribute('vertical')
  }

  set vertical(value) {
    setBooleanAttribute(this, 'vertical', value)
  }

  connectedCallback() {
    this.syncOrientation()
  }

  attributeChangedCallback() {
    this.syncOrientation()
  }

  getSeparator() {
    return this.shadowRoot?.querySelector('.divider') || null
  }

  syncOrientation() {
    const separator = this.getSeparator()
    if (separator) {
      separator.setAttribute('aria-orientation', this.vertical ? 'vertical' : 'horizontal')
    }
  }
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}
