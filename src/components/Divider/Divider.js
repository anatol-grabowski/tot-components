const dividerStyle = `
  :host {
    --divider-color: var(--color, var(--tot-divider-color, var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0))));
    --divider-width: var(--width, var(--tot-divider-width, var(--tot-panel-border-width, 1px)));
    --divider-spacing: var(--spacing, var(--tot-divider-spacing, var(--tot-spacing-medium, 1rem)));

    border: 0;
    border-top: var(--divider-width) solid var(--divider-color);
    display: block;
    height: 0;
    margin: var(--divider-spacing) 0;
    max-width: 100%;
    width: 100%;
  }

  :host([vertical]) {
    align-self: stretch;
    border-left: var(--divider-width) solid var(--divider-color);
    border-top: 0;
    display: inline-block;
    flex: 0 0 auto;
    height: auto;
    margin: 0 var(--divider-spacing);
    min-height: 1em;
    width: 0;
  }
`

export class TotDivider extends HTMLElement {
  static get observedAttributes() {
    return ['vertical']
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const orientation = this.hasAttribute('vertical') ? 'vertical' : 'horizontal'

    root.innerHTML = `<style>${dividerStyle}</style><span part="base" role="separator" aria-orientation="${orientation}"></span>`
  }
}
