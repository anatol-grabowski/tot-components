const markdownStyle = `
  :host {
    box-sizing: border-box;
    display: block;
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .form-control {
    display: grid;
    gap: var(--tot-spacing-2x-small, .25rem);
    max-width: 100%;
    min-width: 0;
  }

  .label {
    color: var(--tot-input-label-color, inherit);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-label-font-size-medium, .875rem);
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .label[hidden] {
    display: none;
  }

  .markdown {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-large, 6px);
    color: var(--tot-input-color, #1e293b);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    line-height: var(--tot-line-height-dense, 1.4);
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .markdown__content {
    max-width: 100%;
    min-width: 0;
    overflow: auto;
    padding: var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem);
    width: 100%;
  }

  .markdown__actions,
  .fullscreen__actions {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    gap: var(--tot-spacing-2x-small, .25rem);
    min-width: 0;
  }

  .markdown__actions {
    position: absolute;
    right: var(--tot-spacing-2x-small, .25rem);
    top: var(--tot-spacing-2x-small, .25rem);
  }

  .markdown__streaming-indicator,
  .fullscreen__streaming-indicator {
    display: inline-flex;
    font-size: .95rem;
    line-height: 1;
  }

  .markdown__streaming-indicator[hidden],
  .fullscreen__streaming-indicator[hidden] {
    display: none;
  }

  .markdown__fullscreen-button,
  .fullscreen__button {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-icon-color, #64748b);
    cursor: pointer;
    display: inline-flex;
    flex: 0 0 auto;
    font: inherit;
    height: 1.75rem;
    justify-content: center;
    line-height: 1;
    padding: 0;
    width: 1.75rem;
  }


  .markdown__fullscreen-button:hover,
  .fullscreen__button:hover {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .markdown__fullscreen-button:focus-visible,
  .fullscreen__button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .markdown__fullscreen-button svg,
  .fullscreen__button svg {
    display: block;
    fill: none;
    height: 1rem;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.75;
    width: 1rem;
  }

  .markdown-output {
    max-width: 100%;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .markdown-output > :first-child {
    margin-top: 0;
  }

  .markdown-output > :last-child {
    margin-bottom: 0;
  }

  .markdown-output h1,
  .markdown-output h2,
  .markdown-output h3,
  .markdown-output h4,
  .markdown-output h5,
  .markdown-output h6 {
    color: var(--tot-input-color, #1e293b);
    font-weight: var(--tot-font-weight-bold, 700);
    line-height: 1.2;
    margin: var(--tot-spacing-small, .75rem) 0 var(--tot-spacing-2x-small, .25rem);
  }

  .markdown-output h1 {
    font-size: var(--tot-font-size-x-large, 1.5rem);
  }

  .markdown-output h2 {
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    font-size: var(--tot-font-size-large, 1.25rem);
    padding-bottom: var(--tot-spacing-3x-small, .125rem);
  }

  .markdown-output h3 {
    font-size: var(--tot-font-size-medium, 1rem);
  }

  .markdown-output h4,
  .markdown-output h5,
  .markdown-output h6 {
    font-size: var(--tot-font-size-small, .875rem);
  }

  .markdown-output p,
  .markdown-output blockquote,
  .markdown-output pre,
  .markdown-output table,
  .markdown-output ul,
  .markdown-output ol,
  .markdown-output dl,
  .markdown-output .pandoc-line-block {
    margin: 0 0 var(--tot-spacing-x-small, .5rem);
  }

  .markdown-output ul,
  .markdown-output ol {
    padding-inline-start: var(--tot-spacing-large, 1.25rem);
  }

  .markdown-output li {
    margin: var(--tot-spacing-3x-small, .125rem) 0;
  }

  .markdown-output li > p {
    margin: 0 0 var(--tot-spacing-2x-small, .25rem);
  }

  .markdown-output li > :last-child {
    margin-bottom: 0;
  }


  .markdown-output dt {
    font-weight: var(--tot-font-weight-semibold, 500);
    margin: var(--tot-spacing-2x-small, .25rem) 0 var(--tot-spacing-3x-small, .125rem);
  }

  .markdown-output dd {
    margin: 0 0 var(--tot-spacing-x-small, .5rem) var(--tot-spacing-large, 1.25rem);
  }

  .markdown-output dd > :last-child {
    margin-bottom: 0;
  }

  .markdown-output .pandoc-line-block {
    display: grid;
    gap: var(--tot-spacing-3x-small, .125rem);
  }

  .markdown-output .pandoc-line {
    min-width: 0;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
  }

  .markdown-output .pandoc-div {
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    margin: 0 0 var(--tot-spacing-x-small, .5rem);
    padding: var(--tot-spacing-x-small, .5rem);
  }

  .markdown-output .pandoc-div > :last-child {
    margin-bottom: 0;
  }

  .markdown-output .smallcaps {
    font-variant: small-caps;
  }

  .markdown-output .math {
    font-family: var(--tot-font-mono, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace);
    white-space: pre-wrap;
  }

  .markdown-output .math.display {
    background: var(--tot-color-neutral-50, #f8fafc);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    display: block;
    margin: 0 0 var(--tot-spacing-x-small, .5rem);
    overflow: auto;
    padding: var(--tot-spacing-x-small, .5rem);
    text-align: center;
  }

  .markdown-output .footnotes {
    border-top: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    color: var(--tot-color-neutral-700, #334155);
    font-size: .92em;
    margin-top: var(--tot-spacing-small, .75rem);
    padding-top: var(--tot-spacing-x-small, .5rem);
  }

  .markdown-output .footnotes ol {
    margin-bottom: 0;
    padding-inline-start: var(--tot-spacing-large, 1.25rem);
  }

  .markdown-output .footnotes li:target {
    background: var(--tot-color-neutral-100, #f1f5f9);
  }

  .markdown-output .footnote-ref,
  .markdown-output .footnote-backref {
    font-size: .85em;
  }

  .markdown-output blockquote {
    border-inline-start: .25rem solid var(--tot-panel-border-color, #e2e8f0);
    color: var(--tot-color-neutral-600, #475569);
    padding: var(--tot-spacing-2x-small, .25rem) 0 var(--tot-spacing-2x-small, .25rem) var(--tot-spacing-x-small, .5rem);
  }

  .markdown-output blockquote > :last-child {
    margin-bottom: 0;
  }

  .markdown-output code {
    background: var(--tot-color-neutral-100, #f1f5f9);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-color, #1e293b);
    font-family: var(--tot-font-mono, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace);
    font-size: .92em;
    padding: 0 .2em;
  }

  .markdown-output pre {
    background: var(--tot-color-neutral-100, #f1f5f9);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    overflow: auto;
    padding: var(--tot-spacing-x-small, .5rem);
  }

  .markdown-output pre code {
    background: transparent;
    border: 0;
    display: block;
    padding: 0;
    white-space: pre;
  }

  .markdown-output a {
    color: var(--tot-color-primary-600, #0284c7);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .markdown-output a:hover {
    color: var(--tot-color-primary-500, #0ea5e9);
  }

  .markdown-output img {
    border-radius: var(--tot-border-radius-medium, 4px);
    display: block;
    height: auto;
    margin: var(--tot-spacing-2x-small, .25rem) 0;
    max-width: 100%;
  }

  .markdown-output table {
    border-collapse: collapse;
    display: block;
    max-width: 100%;
    overflow: auto;
    width: max-content;
  }

  .markdown-output th,
  .markdown-output td {
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    padding: var(--tot-spacing-2x-small, .25rem) var(--tot-spacing-x-small, .5rem);
    vertical-align: top;
  }

  .markdown-output th {
    background: var(--tot-navbar-background-color, var(--tot-color-neutral-100, #f1f5f9));
    font-weight: var(--tot-font-weight-semibold, 500);
  }

  .markdown-output hr {
    border: 0;
    border-top: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    margin: var(--tot-spacing-small, .75rem) 0;
  }

  .markdown-output .task-list-item {
    list-style: none;
  }

  .markdown-output .task-list-item input {
    accent-color: var(--tot-color-primary-600, #0284c7);
    margin: 0 var(--tot-spacing-2x-small, .25rem) 0 calc(-1 * var(--tot-spacing-large, 1.25rem));
    vertical-align: -0.1em;
  }

  .markdown-output .markdown__empty {
    color: var(--tot-input-placeholder-color, #64748b);
    margin: 0;
  }

  .markdown__streaming-caret {
    display: inline-block;
    margin-inline-start: .05em;
    width: .08em;
  }

  .markdown__streaming-caret::after {
    animation: markdown-caret-blink 1s steps(1, end) infinite;
    content: '';
    border-inline-end: .12em solid currentColor;
  }

  @keyframes markdown-caret-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  .help-text {
    color: var(--tot-input-help-text-color, var(--tot-color-neutral-600, #475569));
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-help-text-font-size-medium, .8125rem);
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .help-text[hidden] {
    display: none;
  }

  .fullscreen {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    display: grid;
    inset: 0;
    overscroll-behavior: contain;
    padding: 0;
    position: fixed;
    z-index: var(--tot-z-index-fullscreen, 1300);
  }

  .fullscreen[hidden] {
    display: none;
  }

  .fullscreen__panel {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    grid-template-rows: auto minmax(0, 1fr);
    height: 100dvh;
    min-height: 0;
    min-width: 0;
    width: 100vw;
  }

  .fullscreen__header {
    align-items: center;
    background: var(--tot-navbar-background-color, var(--tot-color-neutral-100, #f1f5f9));
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-navbar-border-color, var(--tot-panel-border-color, #e2e8f0));
    display: flex;
    gap: var(--tot-spacing-small, .75rem);
    justify-content: space-between;
    min-height: var(--tot-navbar-height, 2.75rem);
    padding: 0 var(--tot-spacing-small, .75rem);
  }

  .fullscreen__title {
    font-size: var(--tot-input-font-size-medium, .875rem);
    font-weight: var(--tot-font-weight-semibold, 500);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .fullscreen__body {
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--tot-spacing-small, .75rem);
  }
`

export class TotMarkdown extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'markdown', 'streaming', 'label', 'help-text', 'pandoc']
  }

  constructor() {
    super()
    this._value = null
    this._fullscreen = false
    this._slotMarkdown = ''
    this._mutationObserver = null
    this._historyPushed = false
    this._historyToken = ''
    this._skipHistoryOnClose = false
    this._handleKeyDown = event => this.handleKeyDown(event)
    this._handlePopState = event => this.handlePopState(event)
    this._touchStartY = 0
  }

  get value() {
    if (this._value !== null) {
      return this._value
    }

    if (this.hasAttribute('value')) {
      return this.getAttribute('value') || ''
    }

    if (this.hasAttribute('markdown')) {
      return this.getAttribute('markdown') || ''
    }

    return this._slotMarkdown
  }

  set value(value) {
    this._value = value === null || value === undefined ? '' : String(value)
    this.render()
  }

  get markdown() {
    return this.value
  }

  set markdown(value) {
    this.value = value
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  get helpText() {
    return this.getAttribute('help-text') || ''
  }

  set helpText(value) {
    setNullableAttribute(this, 'help-text', value)
  }

  get pandoc() {
    return this.hasAttribute('pandoc')
  }

  set pandoc(value) {
    setBooleanAttribute(this, 'pandoc', value)
  }

  get streaming() {
    return this.hasAttribute('streaming')
  }

  set streaming(value) {
    setBooleanAttribute(this, 'streaming', value)
  }

  connectedCallback() {
    this.captureSlotMarkdown()
    this.observeLightDom()
    this.render()
  }

  disconnectedCallback() {
    this.closeFullscreen(false, true)
    if (this._mutationObserver) {
      this._mutationObserver.disconnect()
      this._mutationObserver = null
    }
  }

  attributeChangedCallback(name) {
    if (name === 'value' || name === 'markdown') {
      this._value = null
    }
    this.render()
  }

  render() {
    if (!this.isConnected && !this.shadowRoot) {
      return
    }

    this.renderShell()
    this.updateUi()
  }

  renderShell() {
    if (this.shadowRoot) {
      return
    }

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${markdownStyle}</style>
      <div class="form-control" part="form-control">
        <span class="label" part="form-control-label" hidden></span>
        <article class="markdown" part="base">
          <div class="markdown__content markdown-output" part="content"></div>
          <span class="markdown__actions">
            <span class="markdown__streaming-indicator" part="streaming-indicator" aria-label="Streaming" hidden>⏳</span>
            <button class="markdown__fullscreen-button" part="fullscreen-button" type="button" aria-label="Open fullscreen preview">
              ${getEnterFullscreenIcon()}
            </button>
          </span>
        </article>
        <span class="help-text" part="form-control-help-text" hidden></span>
      </div>
      <div class="fullscreen" part="fullscreen" hidden>
        <section class="fullscreen__panel" role="dialog" aria-modal="true" aria-label="Fullscreen markdown preview">
          <header class="fullscreen__header">
            <div class="fullscreen__title">Markdown</div>
            <span class="fullscreen__actions">
              <span class="fullscreen__streaming-indicator" part="fullscreen-streaming-indicator" aria-label="Streaming" hidden>⏳</span>
              <button class="fullscreen__button fullscreen__close-button" part="close-fullscreen-button" type="button" aria-label="Exit fullscreen preview">
                ${getExitFullscreenIcon()}
              </button>
            </span>
          </header>
          <div class="fullscreen__body markdown-output" part="fullscreen-content"></div>
        </section>
      </div>
    `

    const fullscreenButton = root.querySelector('.markdown__fullscreen-button')
    const closeButton = root.querySelector('.fullscreen__close-button')
    const fullscreen = root.querySelector('.fullscreen')

    fullscreenButton.addEventListener('click', () => this.openFullscreen())
    closeButton.addEventListener('click', () => this.closeFullscreen())
    fullscreen.addEventListener('wheel', event => this.handleFullscreenWheel(event), { passive: false })
    fullscreen.addEventListener('touchstart', event => this.handleFullscreenTouchStart(event), { passive: true })
    fullscreen.addEventListener('touchmove', event => this.handleFullscreenTouchMove(event), { passive: false })
  }

  updateUi() {
    const root = this.shadowRoot
    const html = renderMarkdown(this.value, { pandoc: this.pandoc })
    const streamingCaret = this.streaming ? '<span class="markdown__streaming-caret" aria-hidden="true"></span>' : ''
    const label = root.querySelector('.label')
    const helpText = root.querySelector('.help-text')
    const fullscreenTitle = root.querySelector('.fullscreen__title')
    const fullscreen = root.querySelector('.fullscreen')
    const panel = root.querySelector('.markdown')
    const content = root.querySelector('.markdown__content')
    const fullscreenContent = root.querySelector('.fullscreen__body')
    const indicators = root.querySelectorAll('.markdown__streaming-indicator, .fullscreen__streaming-indicator')

    label.textContent = this.label
    label.hidden = this.label === ''
    helpText.textContent = this.helpText
    helpText.hidden = this.helpText === ''
    fullscreenTitle.textContent = this.label || (this.pandoc ? 'Pandoc markdown' : 'Markdown')
    panel.classList.toggle('markdown--pandoc', this.pandoc)
    fullscreen.hidden = !this._fullscreen
    content.innerHTML = `${html}${streamingCaret}`
    fullscreenContent.innerHTML = `${html}${streamingCaret}`

    for (let i = 0; i < indicators.length; i++) {
      indicators[i].hidden = !this.streaming
    }
  }

  openFullscreen() {
    if (this._fullscreen) {
      return
    }

    this._fullscreen = true
    lockPageScroll()
    window.addEventListener('keydown', this._handleKeyDown)
    window.addEventListener('popstate', this._handlePopState)
    this.pushFullscreenHistoryState()
    this.render()
    emit(this, 'fullscreen-change', this.getEventDetail())
  }

  closeFullscreen(shouldRender = true, skipHistory = false) {
    if (!this._fullscreen) {
      return
    }

    const shouldSkipHistory = skipHistory || this._skipHistoryOnClose
    this._skipHistoryOnClose = false
    this._fullscreen = false
    window.removeEventListener('keydown', this._handleKeyDown)
    window.removeEventListener('popstate', this._handlePopState)
    unlockPageScroll()

    if (shouldSkipHistory) {
      this.clearFullscreenHistoryState()
    } else {
      this.removeFullscreenHistoryState()
    }

    if (shouldRender) {
      this.render()
      emit(this, 'fullscreen-change', this.getEventDetail())
    }
  }

  handleKeyDown(event) {
    if (event.key !== 'Escape' || !this._fullscreen) {
      return
    }

    event.preventDefault()
    this.closeFullscreen()
  }

  handlePopState() {
    if (!this._fullscreen || !this._historyPushed) {
      return
    }

    this._skipHistoryOnClose = true
    this.closeFullscreen()
  }

  pushFullscreenHistoryState() {
    if (this._historyPushed || typeof history === 'undefined') {
      return
    }

    this._historyToken = `tot-fullscreen-${Date.now()}-${Math.random().toString(36).slice(2)}`

    try {
      const currentState = history.state && typeof history.state === 'object' ? history.state : {}
      history.pushState({ ...currentState, totFullscreenToken: this._historyToken }, '')
      this._historyPushed = true
    } catch (error) {
      this.clearFullscreenHistoryState()
    }
  }

  removeFullscreenHistoryState() {
    if (!this._historyPushed || typeof history === 'undefined') {
      this.clearFullscreenHistoryState()
      return
    }

    const state = history.state
    const isCurrentFullscreenState = state && state.totFullscreenToken === this._historyToken
    this.clearFullscreenHistoryState()

    if (isCurrentFullscreenState) {
      history.back()
    }
  }

  clearFullscreenHistoryState() {
    this._historyPushed = false
    this._historyToken = ''
  }

  handleFullscreenWheel(event) {
    if (!shouldAllowScroll(event, this.shadowRoot?.querySelector('.fullscreen'), event.deltaY)) {
      event.preventDefault()
    }
  }

  handleFullscreenTouchStart(event) {
    if (event.touches.length !== 1) {
      return
    }

    this._touchStartY = event.touches[0].clientY
  }

  handleFullscreenTouchMove(event) {
    if (event.touches.length !== 1) {
      event.preventDefault()
      return
    }

    const currentY = event.touches[0].clientY
    const deltaY = this._touchStartY - currentY
    this._touchStartY = currentY

    if (!shouldAllowScroll(event, this.shadowRoot?.querySelector('.fullscreen'), deltaY)) {
      event.preventDefault()
    }
  }

  captureSlotMarkdown() {
    if (this.hasAttribute('value') || this.hasAttribute('markdown') || this._value !== null) {
      return
    }

    this._slotMarkdown = this.textContent || ''
  }

  observeLightDom() {
    if (this._mutationObserver) {
      return
    }

    this._mutationObserver = new MutationObserver(() => {
      if (this.hasAttribute('value') || this.hasAttribute('markdown') || this._value !== null) {
        return
      }

      this._slotMarkdown = this.textContent || ''
      this.render()
    })
    this._mutationObserver.observe(this, {
      characterData: true,
      childList: true,
      subtree: true,
    })
  }

  getEventDetail() {
    return {
      fullscreen: this._fullscreen,
      pandoc: this.pandoc,
      streaming: this.streaming,
      value: this.value,
    }
  }
}

function renderMarkdown(markdown, options = {}) {
  const normalizedMarkdown = String(markdown || '').replace(/\r\n?/g, '\n').replace(/\t/g, '    ')
  if (normalizedMarkdown.trim() === '') {
    return '<p class="markdown__empty">No markdown content.</p>'
  }

  const state = {
    footnoteOrder: [],
    footnotes: {},
  }
  let lines = normalizedMarkdown.split('\n')
  if (options.pandoc) {
    lines = preparePandocLines(lines, state)
  }

  const html = parseBlocks(lines, 0, options, state).html
  const footnotes = options.pandoc ? renderPandocFootnotes(state, options) : ''
  return `${html}${footnotes}`
}

function parseBlocks(lines, startIndex, options = {}, state = {}) {
  let html = ''
  let index = startIndex

  while (index < lines.length) {
    if (isBlank(lines[index])) {
      index += 1
      continue
    }

    const fence = matchFence(lines[index])
    if (fence) {
      const result = parseFencedCode(lines, index, fence, options, state)
      html += result.html
      index = result.index
      continue
    }

    const heading = lines[index].match(/^ {0,3}(#{1,6})(?:\s+|$)(.*?)\s*#*\s*$/)
    if (heading) {
      const level = heading[1].length
      const parsedHeading = options.pandoc ? extractTrailingPandocAttributes(heading[2]) : { text: heading[2], attributes: null }
      html += `<h${level}${renderPandocAttributes(parsedHeading.attributes)}>${parseInline(parsedHeading.text, options, state)}</h${level}>`
      index += 1
      continue
    }

    if (index + 1 < lines.length && isSetextHeading(lines[index], lines[index + 1])) {
      const level = lines[index + 1].trim().startsWith('=') ? 1 : 2
      const parsedHeading = options.pandoc ? extractTrailingPandocAttributes(lines[index].trim()) : { text: lines[index].trim(), attributes: null }
      html += `<h${level}${renderPandocAttributes(parsedHeading.attributes)}>${parseInline(parsedHeading.text, options, state)}</h${level}>`
      index += 2
      continue
    }

    if (isHorizontalRule(lines[index])) {
      html += '<hr>'
      index += 1
      continue
    }

    if (/^ {0,3}>/.test(lines[index])) {
      const result = parseBlockquote(lines, index, options, state)
      html += result.html
      index = result.index
      continue
    }

    if (options.pandoc) {
      const pandocBlock = parsePandocBlock(lines, index, options, state)
      if (pandocBlock) {
        html += pandocBlock.html
        index = pandocBlock.index
        continue
      }
    }

    if (matchListItem(lines[index])) {
      const result = parseList(lines, index, options, state)
      html += result.html
      index = result.index
      continue
    }

    const table = parseTable(lines, index, options, state)
    if (table) {
      html += table.html
      index = table.index
      continue
    }

    if (getIndent(lines[index]) >= 4) {
      const result = parseIndentedCode(lines, index, options, state)
      html += result.html
      index = result.index
      continue
    }

    const result = parseParagraph(lines, index, options, state)
    html += result.html
    index = result.index
  }

  return { html, index }
}

function parseFencedCode(lines, startIndex, fence, options = {}, state = {}) {
  const codeLines = []
  let index = startIndex + 1
  const fenceText = fence.marker[0]
  const fenceLength = fence.marker.length

  while (index < lines.length) {
    const line = lines[index]
    const closePattern = new RegExp(`^ {0,3}${escapeRegExp(fenceText)}{${fenceLength},}\\s*$`)
    if (closePattern.test(line)) {
      index += 1
      break
    }

    codeLines.push(line)
    index += 1
  }

  const pandocAttributes = options.pandoc ? parsePandocAttributes(fence.info) : null
  const language = getPandocCodeLanguage(fence.info, pandocAttributes)
  const classes = language ? [`language-${language}`] : []
  const attributes = options.pandoc ? renderPandocAttributes(pandocAttributes, { extraClasses: classes }) : (language ? ` class="language-${escapeAttribute(language)}"` : '')
  return {
    html: `<pre><code${attributes}>${escapeHtml(codeLines.join('\n'))}</code></pre>`,
    index,
  }
}

function parseIndentedCode(lines, startIndex, options = {}, state = {}) {
  const codeLines = []
  let index = startIndex

  while (index < lines.length) {
    if (!isBlank(lines[index]) && getIndent(lines[index]) < 4) {
      break
    }

    codeLines.push(removeIndent(lines[index], 4))
    index += 1
  }

  return {
    html: `<pre><code>${escapeHtml(trimTrailingBlankLines(codeLines).join('\n'))}</code></pre>`,
    index,
  }
}

function parseBlockquote(lines, startIndex, options = {}, state = {}) {
  const quoteLines = []
  let index = startIndex

  while (index < lines.length) {
    if (isBlank(lines[index])) {
      if (index + 1 < lines.length && /^ {0,3}>/.test(lines[index + 1])) {
        quoteLines.push('')
        index += 1
        continue
      }
      break
    }

    const match = lines[index].match(/^ {0,3}> ?(.*)$/)
    if (!match) {
      break
    }

    quoteLines.push(match[1])
    index += 1
  }

  return {
    html: `<blockquote>${parseBlocks(quoteLines, 0, options, state).html}</blockquote>`,
    index,
  }
}

function parseList(lines, startIndex, options = {}, state = {}) {
  const first = matchListItem(lines[startIndex])
  const ordered = isOrderedMarker(first.marker)
  const listIndent = first.indent.length
  const tag = ordered ? 'ol' : 'ul'
  let index = startIndex
  let html = `<${tag}>`

  while (index < lines.length) {
    const match = matchListItem(lines[index])
    if (!match || match.indent.length !== listIndent || isOrderedMarker(match.marker) !== ordered) {
      break
    }

    let firstLine = match.content
    let taskHtml = ''
    const task = firstLine.match(/^\[([ xX])\]\s+(.*)$/)
    if (task) {
      const checked = task[1].toLowerCase() === 'x'
      taskHtml = `<input type="checkbox" disabled ${checked ? 'checked' : ''}>`
      firstLine = task[2]
    }

    const itemLines = [firstLine]
    index += 1

    while (index < lines.length) {
      if (isBlank(lines[index])) {
        itemLines.push('')
        index += 1
        continue
      }

      const nextMatch = matchListItem(lines[index])
      const nextIndent = getIndent(lines[index])
      if (nextMatch && nextIndent <= listIndent) {
        break
      }

      if (!nextMatch && nextIndent <= listIndent && isBlockStart(lines, index)) {
        break
      }

      itemLines.push(removeIndent(lines[index], listIndent + 2))
      index += 1
    }

    const itemHtml = renderListItem(itemLines, taskHtml, options, state)
    const classAttribute = taskHtml ? ' class="task-list-item"' : ''
    html += `<li${classAttribute}>${itemHtml}</li>`
  }

  html += `</${tag}>`
  return { html, index }
}

function renderListItem(lines, taskHtml, options = {}, state = {}) {
  const trimmedLines = trimTrailingBlankLines(lines)
  if (trimmedLines.length === 0) {
    return taskHtml
  }

  if (trimmedLines.length === 1 && !isBlockStart(trimmedLines, 0)) {
    return `${taskHtml}${parseInline(trimmedLines[0].trim(), options, state)}`
  }

  const html = parseBlocks(trimmedLines, 0, options, state).html
  if (!taskHtml) {
    return html
  }

  if (html.startsWith('<p>')) {
    return html.replace('<p>', `<p>${taskHtml}`)
  }

  return `${taskHtml}${html}`
}

function parseTable(lines, startIndex, options = {}, state = {}) {
  if (startIndex + 1 >= lines.length || !lines[startIndex].includes('|')) {
    return null
  }

  const alignments = getTableAlignments(lines[startIndex + 1])
  if (!alignments) {
    return null
  }

  const headers = splitTableRow(lines[startIndex])
  let index = startIndex + 2
  const rows = []

  while (index < lines.length && !isBlank(lines[index]) && lines[index].includes('|')) {
    rows.push(splitTableRow(lines[index]))
    index += 1
  }

  let html = '<table><thead><tr>'
  const cellCount = Math.max(headers.length, alignments.length)
  for (let i = 0; i < cellCount; i++) {
    html += renderTableCell('th', headers[i] || '', alignments[i], options, state)
  }
  html += '</tr></thead>'

  if (rows.length > 0) {
    html += '<tbody>'
    for (let i = 0; i < rows.length; i++) {
      html += '<tr>'
      for (let j = 0; j < cellCount; j++) {
        html += renderTableCell('td', rows[i][j] || '', alignments[j], options, state)
      }
      html += '</tr>'
    }
    html += '</tbody>'
  }

  html += '</table>'
  return { html, index }
}

function renderTableCell(tag, value, alignment, options = {}, state = {}) {
  const styleAttribute = alignment ? ` style="text-align: ${alignment};"` : ''
  return `<${tag}${styleAttribute}>${parseInline(value.trim(), options, state)}</${tag}>`
}

function parseParagraph(lines, startIndex, options = {}, state = {}) {
  const paragraphLines = []
  let index = startIndex

  while (index < lines.length) {
    if (isBlank(lines[index])) {
      break
    }

    if (paragraphLines.length > 0 && isBlockStart(lines, index)) {
      break
    }

    paragraphLines.push(lines[index].trim())
    index += 1
  }

  return {
    html: `<p>${parseInline(paragraphLines.join('\n'), options, state)}</p>`,
    index,
  }
}

function parseInline(value, options = {}, state = {}) {
  const allowLinks = options.links !== false
  const placeholders = []
  let text = String(value || '')

  function stash(html) {
    const token = `\uE000${placeholders.length}\uE001`
    placeholders.push(html)
    return token
  }

  text = text.replace(/\\([\\`*{}\[\]()#+\-.!_|>~^$:])/g, (match, character) => stash(escapeHtml(character)))
  text = text.replace(/(`+)([\s\S]*?)\1/g, (match, tickMarks, code) => stash(`<code>${escapeHtml(code.trim())}</code>`))

  if (options.pandoc) {
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (match, math) => stash(`<span class="math display">${escapeHtml(math.trim())}</span>`))
    text = text.replace(/(^|[^\\])\$([^$\n]+?)\$/g, (match, prefix, math) => `${prefix}${stash(`<span class="math inline">${escapeHtml(math.trim())}</span>`)}`)
    text = text.replace(/\[\^([^\]\s]+)\]/g, (match, id) => {
      const safeId = getSafeId(`fnref-${id}`)
      const targetId = getSafeId(`fn-${id}`)
      const escapedId = escapeHtml(id)
      if (state.footnotes && state.footnotes[id] && state.footnoteOrder && !state.footnoteOrder.includes(id)) {
        state.footnoteOrder.push(id)
      }
      return stash(`<sup class="footnote-ref" id="${safeId}"><a href="#${targetId}">${escapedId}</a></sup>`)
    })
  }

  if (allowLinks) {
    text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)(\{[^}\n]+\})?/g, (match, alt, url, title, attributes) => {
      const safeUrl = sanitizeImageUrl(url)
      if (!safeUrl) {
        return escapeHtml(match)
      }

      const titleAttribute = title ? ` title="${escapeAttribute(title)}"` : ''
      const pandocAttributes = options.pandoc && attributes ? parsePandocAttributes(attributes) : null
      return stash(`<img src="${escapeAttribute(safeUrl)}" alt="${escapeAttribute(alt)}"${titleAttribute}${renderPandocAttributes(pandocAttributes, { allowedAttributes: ['id', 'class', 'style', 'width', 'height'] })}>`)
    })

    text = text.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+["']([^"']*)["'])?\)(\{[^}\n]+\})?/g, (match, label, url, title, attributes) => {
      const safeUrl = sanitizeLinkUrl(url)
      if (!safeUrl) {
        return escapeHtml(match)
      }

      const titleAttribute = title ? ` title="${escapeAttribute(title)}"` : ''
      const pandocAttributes = options.pandoc && attributes ? parsePandocAttributes(attributes) : null
      return stash(`<a href="${escapeAttribute(safeUrl)}" target="_blank" rel="noopener noreferrer"${titleAttribute}${renderPandocAttributes(pandocAttributes, { allowedAttributes: ['id', 'class', 'style'] })}>${parseInline(label, { ...options, links: false }, state)}</a>`)
    })

    text = text.replace(/<((?:https?:\/\/|mailto:)[^>\s]+)>/gi, (match, url) => {
      const safeUrl = sanitizeLinkUrl(url)
      if (!safeUrl) {
        return escapeHtml(match)
      }

      return stash(`<a href="${escapeAttribute(safeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a>`)
    })

    text = text.replace(/(^|[\s(])((?:https?:\/\/)[^\s<)]+[^.,;:\s<)])/gi, (match, prefix, url) => {
      const safeUrl = sanitizeLinkUrl(url)
      if (!safeUrl) {
        return match
      }

      return `${prefix}${stash(`<a href="${escapeAttribute(safeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a>`)}`
    })
  }

  if (options.pandoc) {
    text = text.replace(/\[([^\]\n]+)\]\{([^}\n]+)\}/g, (match, content, attributes) => {
      const parsedAttributes = parsePandocAttributes(attributes)
      return stash(`<span${renderPandocAttributes(parsedAttributes, { defaultClass: 'pandoc-span' })}>${parseInline(content, options, state)}</span>`)
    })

    text = text.replace(/<\/?[a-z][^>]*>/gi, match => stash(sanitizePandocRawInlineHtmlTag(match)))
  }

  text = escapeHtml(text)
  text = text.replace(/ {2,}\n/g, '<br>')
  text = text.replace(/~~(?=\S)([\s\S]*?\S)~~/g, '<del>$1</del>')
  text = text.replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/__(?=\S)([\s\S]*?\S)__/g, '<strong>$1</strong>')
  text = text.replace(/\*(?=\S)([\s\S]*?\S)\*/g, '<em>$1</em>')
  text = text.replace(/_(?=\S)([\s\S]*?\S)_/g, '<em>$1</em>')

  if (options.pandoc) {
    text = text.replace(/\^(?=\S)([\s\S]*?\S)\^/g, '<sup>$1</sup>')
    text = text.replace(/~(?=\S)([^~\n]*?\S)~/g, '<sub>$1</sub>')
    text = text.replace(/\[(@[-A-Za-z0-9_:.#; ]+)\]/g, '<cite>$1</cite>')
  }

  text = text.replace(/\uE000(\d+)\uE001/g, (match, index) => placeholders[Number(index)] || '')

  return text
}


function preparePandocLines(lines, state) {
  const result = []
  let index = 0

  if (lines[index] && lines[index].trim() === '---') {
    index += 1
    while (index < lines.length && !/^(---|\.\.\.)\s*$/.test(lines[index].trim())) {
      index += 1
    }
    if (index < lines.length) {
      index += 1
    }
  }

  while (index < lines.length) {
    const footnote = lines[index].match(/^\[\^([^\]]+)\]:\s*(.*)$/)
    if (!footnote) {
      result.push(lines[index])
      index += 1
      continue
    }

    const id = footnote[1]
    const definitionLines = [footnote[2]]
    index += 1

    while (index < lines.length) {
      if (isBlank(lines[index])) {
        if (index + 1 < lines.length && /^( {2,}|\t)/.test(lines[index + 1])) {
          definitionLines.push('')
          index += 1
          continue
        }
        break
      }

      if (!/^( {2,}|\t)/.test(lines[index])) {
        break
      }

      definitionLines.push(lines[index].replace(/^( {2,}|\t)/, ''))
      index += 1
    }

    state.footnotes[id] = trimTrailingBlankLines(definitionLines)
  }

  return result
}

function parsePandocBlock(lines, index, options, state) {
  return parsePandocDisplayMath(lines, index)
    || parsePandocDiv(lines, index, options, state)
    || parsePandocLineBlock(lines, index, options, state)
    || parsePandocDefinitionList(lines, index, options, state)
    || parsePandocRawHtmlBlock(lines, index)
}

function parsePandocDisplayMath(lines, startIndex) {
  const startLine = lines[startIndex]
  const inline = startLine.match(/^ {0,3}\$\$\s*([\s\S]*?)\s*\$\$\s*$/)
  if (inline && inline[1]) {
    return {
      html: `<div class="math display">${escapeHtml(inline[1].trim())}</div>`,
      index: startIndex + 1,
    }
  }

  if (!/^ {0,3}\$\$\s*$/.test(startLine)) {
    return null
  }

  const mathLines = []
  let index = startIndex + 1
  while (index < lines.length) {
    if (/^ {0,3}\$\$\s*$/.test(lines[index])) {
      index += 1
      break
    }

    mathLines.push(lines[index])
    index += 1
  }

  return {
    html: `<div class="math display">${escapeHtml(mathLines.join('\n').trim())}</div>`,
    index,
  }
}

function parsePandocDiv(lines, startIndex, options, state) {
  const start = lines[startIndex].match(/^ {0,3}:::\s+(.+)$/)
  if (!start) {
    return null
  }

  const contentLines = []
  let index = startIndex + 1
  while (index < lines.length) {
    if (/^ {0,3}:::\s*$/.test(lines[index])) {
      index += 1
      break
    }

    contentLines.push(lines[index])
    index += 1
  }

  const attributes = parsePandocAttributes(start[1])
  return {
    html: `<div${renderPandocAttributes(attributes, { defaultClass: 'pandoc-div' })}>${parseBlocks(contentLines, 0, options, state).html}</div>`,
    index,
  }
}

function parsePandocLineBlock(lines, startIndex, options, state) {
  if (!/^ {0,3}\| ?/.test(lines[startIndex])) {
    return null
  }

  let html = '<div class="pandoc-line-block">'
  let index = startIndex
  while (index < lines.length && /^ {0,3}\| ?/.test(lines[index])) {
    html += `<div class="pandoc-line">${parseInline(lines[index].replace(/^ {0,3}\| ?/, ''), options, state)}</div>`
    index += 1
  }
  html += '</div>'

  return { html, index }
}

function parsePandocDefinitionList(lines, startIndex, options, state) {
  if (startIndex + 1 >= lines.length || isBlank(lines[startIndex]) || !/^ {0,3}:\s+/.test(lines[startIndex + 1])) {
    return null
  }

  let html = '<dl>'
  let index = startIndex

  while (index + 1 < lines.length && !isBlank(lines[index]) && /^ {0,3}:\s+/.test(lines[index + 1])) {
    html += `<dt>${parseInline(lines[index].trim(), options, state)}</dt>`
    index += 1

    while (index < lines.length && /^ {0,3}:\s+/.test(lines[index])) {
      const definitionLines = [lines[index].replace(/^ {0,3}:\s+/, '')]
      index += 1

      while (index < lines.length) {
        if (isBlank(lines[index])) {
          if (index + 1 < lines.length && getIndent(lines[index + 1]) >= 2 && !matchListItem(lines[index + 1])) {
            definitionLines.push('')
            index += 1
            continue
          }
          break
        }

        if (matchListItem(lines[index]) || /^ {0,3}:\s+/.test(lines[index]) || getIndent(lines[index]) < 2) {
          break
        }

        definitionLines.push(removeIndent(lines[index], 2))
        index += 1
      }

      html += `<dd>${parseBlocks(definitionLines, 0, options, state).html}</dd>`
    }

    while (index < lines.length && isBlank(lines[index])) {
      index += 1
    }
  }

  html += '</dl>'
  return { html, index }
}

function parsePandocRawHtmlBlock(lines, startIndex) {
  if (!/^ {0,3}<([a-z][\w:-]*)(?:\s|>|\/>)/i.test(lines[startIndex])) {
    return null
  }

  const htmlLines = []
  let index = startIndex
  while (index < lines.length && !isBlank(lines[index])) {
    htmlLines.push(lines[index])
    index += 1
  }

  return {
    html: sanitizePandocRawHtml(htmlLines.join('\n')),
    index,
  }
}

function renderPandocFootnotes(state, options) {
  if (!state.footnoteOrder || state.footnoteOrder.length === 0) {
    return ''
  }

  let html = '<section class="footnotes"><ol>'
  for (let i = 0; i < state.footnoteOrder.length; i++) {
    const id = state.footnoteOrder[i]
    const lines = state.footnotes[id] || ['']
    const safeId = getSafeId(`fn-${id}`)
    const safeRefId = getSafeId(`fnref-${id}`)
    html += `<li id="${safeId}">${parseBlocks(lines, 0, options, state).html}<a class="footnote-backref" href="#${safeRefId}" aria-label="Back to reference">↩</a></li>`
  }
  html += '</ol></section>'
  return html
}

function extractTrailingPandocAttributes(text) {
  const match = String(text || '').match(/\s+\{([^{}]+)\}\s*$/)
  if (!match) {
    return { text, attributes: null }
  }

  return {
    text: String(text).slice(0, match.index).trimEnd(),
    attributes: parsePandocAttributes(match[1]),
  }
}

function parsePandocAttributes(value) {
  const source = String(value || '').trim().replace(/^\{/, '').replace(/\}$/, '')
  const attributes = {
    classes: [],
    id: '',
    keyValues: {},
  }

  const tokens = source.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || []
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.startsWith('#')) {
      attributes.id = token.slice(1)
      continue
    }

    if (token.startsWith('.')) {
      attributes.classes.push(token.slice(1))
      continue
    }

    const pair = token.match(/^([^=]+)=(.*)$/)
    if (pair) {
      attributes.keyValues[pair[1]] = unquoteAttributeValue(pair[2])
      continue
    }

    if (!attributes.id && /^[A-Za-z][\w:.-]*$/.test(token)) {
      attributes.id = token
    }
  }

  return attributes
}

function renderPandocAttributes(attributes, options = {}) {
  if (!attributes) {
    return ''
  }

  const allowedAttributes = options.allowedAttributes || ['id', 'class', 'style']
  const classes = []
  if (options.defaultClass) {
    classes.push(options.defaultClass)
  }
  if (Array.isArray(options.extraClasses)) {
    for (let i = 0; i < options.extraClasses.length; i++) {
      if (options.extraClasses[i]) {
        classes.push(options.extraClasses[i])
      }
    }
  }
  for (let i = 0; i < attributes.classes.length; i++) {
    if (isSafeClassName(attributes.classes[i])) {
      classes.push(attributes.classes[i])
    }
  }

  const parts = []
  if (allowedAttributes.includes('id') && isSafeId(attributes.id)) {
    parts.push(`id="${escapeAttribute(attributes.id)}"`)
  }
  if (allowedAttributes.includes('class') && classes.length > 0) {
    parts.push(`class="${escapeAttribute(classes.join(' '))}"`)
  }

  const styles = []
  if (attributes.keyValues.color) {
    styles.push(`color: ${attributes.keyValues.color}`)
  }
  if (attributes.keyValues['background-color'] || attributes.keyValues.background) {
    styles.push(`background-color: ${attributes.keyValues['background-color'] || attributes.keyValues.background}`)
  }
  if (attributes.keyValues.style) {
    styles.push(attributes.keyValues.style)
  }
  const style = sanitizePandocStyle(styles.join('; '))
  if (allowedAttributes.includes('style') && style) {
    parts.push(`style="${escapeAttribute(style)}"`)
  }

  const passthroughAttributes = ['width', 'height', 'title', 'aria-label', 'data-label']
  for (let i = 0; i < passthroughAttributes.length; i++) {
    const name = passthroughAttributes[i]
    if (!allowedAttributes.includes(name) || !attributes.keyValues[name]) {
      continue
    }

    parts.push(`${name}="${escapeAttribute(attributes.keyValues[name])}"`)
  }

  return parts.length > 0 ? ` ${parts.join(' ')}` : ''
}

function getPandocCodeLanguage(info, attributes) {
  if (attributes && attributes.classes.length > 0) {
    return attributes.classes[0]
  }

  return getCodeLanguage(info)
}

function sanitizePandocStyle(style) {
  const value = String(style || '')
  if (/expression\s*\(|javascript\s*:|url\s*\(|@import|behavior\s*:/i.test(value)) {
    return ''
  }

  const allowed = new Set([
    'background',
    'background-color',
    'border',
    'border-color',
    'border-radius',
    'border-style',
    'border-width',
    'color',
    'display',
    'font-style',
    'font-variant',
    'font-weight',
    'height',
    'margin',
    'margin-inline',
    'max-height',
    'max-width',
    'min-height',
    'min-width',
    'padding',
    'padding-inline',
    'text-align',
    'text-decoration',
    'width',
  ])
  const declarations = value.split(';')
  const safeDeclarations = []

  for (let i = 0; i < declarations.length; i++) {
    const declaration = declarations[i].trim()
    const separator = declaration.indexOf(':')
    if (separator === -1) {
      continue
    }

    const name = declaration.slice(0, separator).trim().toLowerCase()
    const propertyValue = declaration.slice(separator + 1).trim()
    if (!allowed.has(name) || propertyValue === '' || /[<>]/.test(propertyValue)) {
      continue
    }

    safeDeclarations.push(`${name}: ${propertyValue}`)
  }

  return safeDeclarations.join('; ')
}


function sanitizePandocRawInlineHtmlTag(html) {
  const value = String(html || '')
  const closing = value.match(/^<\/\s*([a-z][\w:-]*)\s*>$/i)
  const allowedTags = new Set(['A', 'ABBR', 'B', 'BR', 'CODE', 'DEL', 'EM', 'I', 'IMG', 'INS', 'KBD', 'MARK', 'SMALL', 'SPAN', 'STRONG', 'SUB', 'SUP', 'U'])

  if (closing) {
    const tagName = closing[1].toUpperCase()
    return allowedTags.has(tagName) ? `</${tagName.toLowerCase()}>` : escapeHtml(value)
  }

  const opening = value.match(/^<\s*([a-z][\w:-]*)([\s\S]*?)(\/?)>$/i)
  if (!opening) {
    return escapeHtml(value)
  }

  const tagName = opening[1].toUpperCase()
  if (!allowedTags.has(tagName)) {
    return escapeHtml(value)
  }

  const attributes = []
  const attributePattern = /([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>/]+)))?/g
  let match
  while ((match = attributePattern.exec(opening[2]))) {
    const name = match[1].toLowerCase()
    const attributeValue = match[2] ?? match[3] ?? match[4] ?? ''

    if (name.startsWith('on') || name === 'srcdoc') {
      continue
    }

    if (name === 'style') {
      const style = sanitizePandocStyle(attributeValue)
      if (style) {
        attributes.push(`style="${escapeAttribute(style)}"`)
      }
      continue
    }

    if (name === 'href') {
      const safeUrl = sanitizeLinkUrl(attributeValue)
      if (safeUrl) {
        attributes.push(`href="${escapeAttribute(safeUrl)}"`)
      }
      continue
    }

    if (name === 'src') {
      const safeUrl = sanitizeImageUrl(attributeValue)
      if (safeUrl) {
        attributes.push(`src="${escapeAttribute(safeUrl)}"`)
      }
      continue
    }

    if (/^(id|class|alt|title|width|height|aria-[\w-]+|data-[\w-]+)$/.test(name)) {
      attributes.push(`${name}="${escapeAttribute(attributeValue)}"`)
    }
  }

  if (tagName === 'A') {
    attributes.push('target="_blank"')
    attributes.push('rel="noopener noreferrer"')
  }

  const space = attributes.length > 0 ? ` ${attributes.join(' ')}` : ''
  const slash = opening[3] || tagName === 'BR' || tagName === 'IMG' ? ' /' : ''
  return `<${tagName.toLowerCase()}${space}${slash}>`
}

function sanitizePandocRawHtml(html) {
  const value = String(html || '')
  if (typeof document === 'undefined') {
    return escapeHtml(value)
  }

  const template = document.createElement('template')
  template.innerHTML = value
  sanitizePandocNode(template.content)
  return template.innerHTML
}

function sanitizePandocNode(node) {
  const blockedTags = new Set(['SCRIPT', 'IFRAME', 'OBJECT', 'EMBED', 'META', 'LINK'])
  const children = Array.from(node.childNodes)

  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (child.nodeType !== Node.ELEMENT_NODE) {
      continue
    }

    if (blockedTags.has(child.tagName)) {
      child.remove()
      continue
    }

    const attributes = Array.from(child.attributes)
    for (let j = 0; j < attributes.length; j++) {
      const attribute = attributes[j]
      const name = attribute.name.toLowerCase()
      const value = attribute.value
      if (name.startsWith('on') || name === 'srcdoc') {
        child.removeAttribute(attribute.name)
        continue
      }

      if ((name === 'href' || name === 'src') && !sanitizeLinkUrl(value) && !sanitizeImageUrl(value)) {
        child.removeAttribute(attribute.name)
        continue
      }

      if (name === 'style') {
        const style = sanitizePandocStyle(value)
        if (style) {
          child.setAttribute('style', style)
        } else {
          child.removeAttribute('style')
        }
      }
    }

    if (child.tagName === 'A') {
      child.setAttribute('target', '_blank')
      child.setAttribute('rel', 'noopener noreferrer')
    }

    sanitizePandocNode(child)
  }
}

function isSafeId(value) {
  return /^[A-Za-z][\w:.-]*$/.test(String(value || ''))
}

function getSafeId(value) {
  return String(value || '').replace(/[^A-Za-z0-9:_.-]+/g, '-').replace(/^-+|-+$/g, '') || 'footnote'
}

function isSafeClassName(value) {
  return /^[A-Za-z_-][\w:-]*$/.test(String(value || ''))
}

function unquoteAttributeValue(value) {
  const text = String(value || '')
  if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
    return text.slice(1, -1)
  }

  return text
}

function matchFence(line) {
  const match = line.match(/^ {0,3}(`{3,}|~{3,})\s*(.*)$/)
  if (!match) {
    return null
  }

  return {
    marker: match[1],
    info: match[2] || '',
  }
}

function getCodeLanguage(info) {
  const match = String(info || '').trim().match(/^([A-Za-z0-9_-]+)/)
  return match ? match[1] : ''
}

function isSetextHeading(line, nextLine) {
  if (isBlank(line)) {
    return false
  }

  return /^ {0,3}(=+|-+)\s*$/.test(nextLine) && !line.includes('|')
}

function isHorizontalRule(line) {
  return /^ {0,3}(([-*_])\s*){3,}$/.test(line.trim())
}

function isBlank(line) {
  return /^\s*$/.test(line || '')
}

function isBlockStart(lines, index) {
  const line = lines[index] || ''
  if (isBlank(line)) {
    return true
  }

  return Boolean(
    matchFence(line)
      || /^ {0,3}#{1,6}(?:\s+|$)/.test(line)
      || (index + 1 < lines.length && isSetextHeading(line, lines[index + 1]))
      || isHorizontalRule(line)
      || /^ {0,3}>/.test(line)
      || matchListItem(line)
      || parseTable(lines, index, {}, {})
      || getIndent(line) >= 4
  )
}

function matchListItem(line) {
  const match = String(line || '').match(/^( *)([-+*]|\d+[.)])\s+(.*)$/)
  if (!match) {
    return null
  }

  return {
    indent: match[1],
    marker: match[2],
    content: match[3],
  }
}

function isOrderedMarker(marker) {
  return /^\d+[.)]$/.test(marker)
}

function getIndent(line) {
  const match = String(line || '').match(/^ */)
  return match ? match[0].length : 0
}

function removeIndent(line, count) {
  let index = 0
  while (index < line.length && index < count && line[index] === ' ') {
    index += 1
  }
  return line.slice(index)
}

function trimTrailingBlankLines(lines) {
  const result = lines.slice()
  while (result.length > 0 && isBlank(result[result.length - 1])) {
    result.pop()
  }
  return result
}

function getTableAlignments(line) {
  if (!line.includes('|')) {
    return null
  }

  const cells = splitTableRow(line)
  if (cells.length === 0) {
    return null
  }

  const alignments = []
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i].trim()
    if (!/^:?-+:?$/.test(cell)) {
      return null
    }

    if (cell.startsWith(':') && cell.endsWith(':')) {
      alignments.push('center')
    } else if (cell.endsWith(':')) {
      alignments.push('right')
    } else {
      alignments.push('')
    }
  }

  return alignments
}

function splitTableRow(line) {
  let value = line.trim()
  if (value.startsWith('|')) {
    value = value.slice(1)
  }
  if (value.endsWith('|')) {
    value = value.slice(0, -1)
  }

  const cells = []
  let cell = ''
  let escaped = false
  for (let i = 0; i < value.length; i++) {
    const character = value[i]
    if (escaped) {
      cell += character
      escaped = false
      continue
    }

    if (character === '\\') {
      cell += character
      escaped = true
      continue
    }

    if (character === '|') {
      cells.push(cell)
      cell = ''
      continue
    }

    cell += character
  }
  cells.push(cell)
  return cells
}

function sanitizeLinkUrl(url) {
  const value = String(url || '').trim()
  if (/^(https?:|mailto:|tel:)/i.test(value)) {
    return value
  }

  if (/^(#|\/|\.\/|\.\.\/)/.test(value)) {
    return value
  }

  return ''
}

function sanitizeImageUrl(url) {
  const value = String(url || '').trim()
  if (/^https?:/i.test(value) || /^(\/|\.\/|\.\.\/)/.test(value)) {
    return value
  }

  if (/^data:image\/(png|gif|jpe?g|webp);base64,[A-Za-z0-9+/=]+$/i.test(value)) {
    return value
  }

  return ''
}

function lockPageScroll() {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !document.body) {
    return
  }

  const state = getScrollLockState()
  if (state.count === 0) {
    state.scrollX = window.scrollX || window.pageXOffset || 0
    state.scrollY = window.scrollY || window.pageYOffset || 0
    state.documentOverflow = document.documentElement.style.overflow
    state.bodyOverflow = document.body.style.overflow
    state.bodyPosition = document.body.style.position
    state.bodyTop = document.body.style.top
    state.bodyLeft = document.body.style.left
    state.bodyRight = document.body.style.right
    state.bodyWidth = document.body.style.width

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${state.scrollY}px`
    document.body.style.left = `-${state.scrollX}px`
    document.body.style.right = '0'
    document.body.style.width = '100%'
  }

  state.count += 1
}

function unlockPageScroll() {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !document.body) {
    return
  }

  const state = getScrollLockState()
  state.count = Math.max(0, state.count - 1)
  if (state.count !== 0) {
    return
  }

  document.documentElement.style.overflow = state.documentOverflow || ''
  document.body.style.overflow = state.bodyOverflow || ''
  document.body.style.position = state.bodyPosition || ''
  document.body.style.top = state.bodyTop || ''
  document.body.style.left = state.bodyLeft || ''
  document.body.style.right = state.bodyRight || ''
  document.body.style.width = state.bodyWidth || ''

  window.scrollTo(state.scrollX || 0, state.scrollY || 0)
}

function getScrollLockState() {
  if (!window.__totFullscreenPreviewScrollLockState) {
    window.__totFullscreenPreviewScrollLockState = {
      count: 0,
    }
  }
  return window.__totFullscreenPreviewScrollLockState
}

function shouldAllowScroll(event, boundary, deltaY) {
  if (deltaY === 0) {
    return false
  }

  const path = typeof event.composedPath === 'function' ? event.composedPath() : []
  for (let i = 0; i < path.length; i++) {
    const node = path[i]
    if (node === boundary) {
      break
    }

    if (!(node instanceof HTMLElement)) {
      continue
    }

    const style = getComputedStyle(node)
    const canScrollY = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight
    if (!canScrollY) {
      continue
    }

    if (deltaY < 0 && node.scrollTop > 0) {
      return true
    }

    if (deltaY > 0 && Math.ceil(node.scrollTop + node.clientHeight) < node.scrollHeight) {
      return true
    }
  }

  return false
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined || value === '') {
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
      '\'': '&#39;',
    }
    return replacements[match]
  })
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;')
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getEnterFullscreenIcon() {
  return `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M2.5 6v-3.5h3.5"></path>
    <path d="M10 2.5h3.5v3.5"></path>
    <path d="M2.5 10v3.5h3.5"></path>
    <path d="M10 13.5h3.5v-3.5"></path>
  </svg>`
}

function getExitFullscreenIcon() {
  return `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M2.5 6h3.5v-3.5"></path>
    <path d="M13.5 6h-3.5v-3.5"></path>
    <path d="M2.5 10h3.5v3.5"></path>
    <path d="M13.5 10h-3.5v3.5"></path>
  </svg>`
}
