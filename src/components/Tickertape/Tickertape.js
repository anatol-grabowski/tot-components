const tickertapeStyle = `
  :host {
    --tot-tickertape-edge-size: 1.75rem;
    --tot-tickertape-edge-color: var(--tot-panel-background-color, #fff);
    --tot-tickertape-shadow-color: hsl(215 18% 32% / 18%);

    display: block;
    max-width: 100%;
    min-width: 0;
  }

  :host([hidden]) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .tickertape {
    color: var(--tot-color-neutral-900, #0f172a);
    display: block;
    font-family: var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif);
    height: inherit;
    max-height: inherit;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    position: relative;
  }

  .viewport {
    height: inherit;
    max-height: inherit;
    max-width: 100%;
    min-width: 0;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-color: var(--tot-color-neutral-300, #cbd5e1) transparent;
    scrollbar-width: thin;
  }

  .viewport:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: calc(-1 * var(--tot-focus-ring-offset, 1px));
  }

  .content {
    display: inline-block;
    max-width: none;
    min-width: max-content;
    vertical-align: top;
    white-space: nowrap;
  }

  .edge {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: var(--tot-transition-fast, 150ms) opacity;
    z-index: 1;
  }

  .edge--start {
    background:
      linear-gradient(
        to right,
        var(--tot-tickertape-edge-color) 0%,
        var(--tot-tickertape-edge-color) 22%,
        hsl(0 0% 100% / 0) 100%
      );
    box-shadow: .5rem 0 .7rem -.7rem var(--tot-tickertape-shadow-color) inset;
    inset-block: 0;
    inset-inline-start: 0;
    width: var(--tot-tickertape-edge-size);
  }

  .edge--end {
    background:
      linear-gradient(
        to left,
        var(--tot-tickertape-edge-color) 0%,
        var(--tot-tickertape-edge-color) 22%,
        hsl(0 0% 100% / 0) 100%
      );
    box-shadow: -.5rem 0 .7rem -.7rem var(--tot-tickertape-shadow-color) inset;
    inset-block: 0;
    inset-inline-end: 0;
    width: var(--tot-tickertape-edge-size);
  }

  .tickertape--has-start .edge--start,
  .tickertape--has-end .edge--end {
    opacity: 1;
  }

  :host([vertical]) .viewport {
    overflow-x: hidden;
    overflow-y: auto;
  }

  :host([vertical]) .content {
    display: block;
    min-width: 0;
    white-space: normal;
    width: 100%;
  }

  :host([vertical]) .edge--start {
    background:
      linear-gradient(
        to bottom,
        var(--tot-tickertape-edge-color) 0%,
        var(--tot-tickertape-edge-color) 22%,
        hsl(0 0% 100% / 0) 100%
      );
    box-shadow: 0 .5rem .7rem -.7rem var(--tot-tickertape-shadow-color) inset;
    height: var(--tot-tickertape-edge-size);
    inset-block: 0 auto;
    inset-inline: 0;
    width: auto;
  }

  :host([vertical]) .edge--end {
    background:
      linear-gradient(
        to top,
        var(--tot-tickertape-edge-color) 0%,
        var(--tot-tickertape-edge-color) 22%,
        hsl(0 0% 100% / 0) 100%
      );
    box-shadow: 0 -.5rem .7rem -.7rem var(--tot-tickertape-shadow-color) inset;
    height: var(--tot-tickertape-edge-size);
    inset-block: auto 0;
    inset-inline: 0;
    width: auto;
  }
`

export class TotTickertape extends HTMLElement {
  static get observedAttributes() {
    return [
      'vertical',
    ]
  }

  constructor() {
    super()
    this._resizeObserver = null
    this._raf = 0
    this._handleScroll = () => this.scheduleShadowUpdate()
    this._handleSlotChange = () => this.scheduleShadowUpdate()
  }

  get vertical() {
    return this.hasAttribute('vertical')
  }

  set vertical(value) {
    setBooleanAttribute(this, 'vertical', value)
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.stopObserving()
    this.cancelShadowUpdate()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    this.render()
  }

  refresh() {
    this.updateShadows()
  }

  scrollToStart(options = {}) {
    const viewport = this.getViewport()
    if (!viewport) {
      return
    }

    if (this.vertical) {
      viewport.scrollTo(createScrollOptions('top', 0, options.behavior))
    } else {
      viewport.scrollTo(createScrollOptions('left', 0, options.behavior))
    }
  }

  scrollToEnd(options = {}) {
    const viewport = this.getViewport()
    if (!viewport) {
      return
    }

    if (this.vertical) {
      viewport.scrollTo(createScrollOptions('top', viewport.scrollHeight, options.behavior))
    } else {
      viewport.scrollTo(createScrollOptions('left', viewport.scrollWidth, options.behavior))
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })

    root.innerHTML = `<style>${tickertapeStyle}</style>
      <div class="tickertape" part="base">
        <div class="viewport" part="viewport" tabindex="0">
          <div class="content" part="content"><slot></slot></div>
        </div>
        <span class="edge edge--start" part="start-shadow" aria-hidden="true"></span>
        <span class="edge edge--end" part="end-shadow" aria-hidden="true"></span>
      </div>
    `

    const viewport = this.getViewport()
    const slot = root.querySelector('slot')
    if (viewport) {
      viewport.addEventListener('scroll', this._handleScroll, { passive: true })
    }
    if (slot) {
      slot.addEventListener('slotchange', this._handleSlotChange)
    }

    this.startObserving()
    this.scheduleShadowUpdate()
  }

  startObserving() {
    this.stopObserving()

    if (typeof ResizeObserver !== 'function') {
      return
    }

    const viewport = this.getViewport()
    const content = this.shadowRoot?.querySelector('.content')
    if (!viewport || !content) {
      return
    }

    this._resizeObserver = new ResizeObserver(() => this.scheduleShadowUpdate())
    this._resizeObserver.observe(viewport)
    this._resizeObserver.observe(content)
  }

  stopObserving() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    }
  }

  scheduleShadowUpdate() {
    if (this._raf) {
      return
    }

    this._raf = requestAnimationFrame(() => {
      this._raf = 0
      this.updateShadows()
    })
  }

  cancelShadowUpdate() {
    if (!this._raf) {
      return
    }

    cancelAnimationFrame(this._raf)
    this._raf = 0
  }

  updateShadows() {
    const base = this.shadowRoot?.querySelector('.tickertape')
    const viewport = this.getViewport()
    if (!base || !viewport) {
      return
    }

    const scroll = this.getScrollState(viewport)

    base.classList.toggle('tickertape--has-start', scroll.before > 1)
    base.classList.toggle('tickertape--has-end', scroll.after > 1)
  }

  getScrollState(viewport) {
    const size = this.vertical ? viewport.clientHeight : viewport.clientWidth
    const scrollSize = this.vertical ? viewport.scrollHeight : viewport.scrollWidth
    const max = Math.max(0, scrollSize - size)
    const rawOffset = this.vertical ? viewport.scrollTop : viewport.scrollLeft
    const offset = Math.min(max, Math.max(0, Math.abs(rawOffset)))

    return {
      before: offset,
      after: Math.max(0, max - offset),
    }
  }

  getViewport() {
    return this.shadowRoot?.querySelector('.viewport')
  }
}

function createScrollOptions(axis, value, behavior) {
  const options = {
    [axis]: value,
  }

  if (behavior) {
    options.behavior = behavior
  }

  return options
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}
