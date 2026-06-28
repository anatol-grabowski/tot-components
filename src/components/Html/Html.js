const htmlStyle = `
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

  .html {
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

  .html__frame-wrap {
    background: var(--tot-color-neutral-0, #fff);
    height: var(--tot-html-height, 18rem);
    max-height: var(--tot-html-max-height, 60vh);
    max-width: 100%;
    min-height: var(--tot-html-min-height, 8rem);
    min-width: 0;
    overflow: hidden;
    width: 100%;
  }

  .html__frame-wrap[hidden] {
    display: none;
  }

  .html__frame,
  .fullscreen__frame {
    background: var(--tot-color-neutral-0, #fff);
    border: 0;
    display: block;
    height: 100%;
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }

  .html__actions,
  .fullscreen__actions {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    gap: var(--tot-spacing-2x-small, .25rem);
    min-width: 0;
  }

  .html__actions {
    position: absolute;
    right: var(--tot-spacing-2x-small, .25rem);
    top: var(--tot-spacing-2x-small, .25rem);
    z-index: 1;
  }

  .html__streaming-indicator,
  .fullscreen__streaming-indicator {
    display: inline-flex;
    font-size: .95rem;
    line-height: 1;
  }

  .html__streaming-indicator[hidden],
  .fullscreen__streaming-indicator[hidden] {
    display: none;
  }

  .html__fullscreen-button,
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

  .html__fullscreen-button:hover,
  .fullscreen__button:hover {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .html__fullscreen-button:focus-visible,
  .fullscreen__button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .html__fullscreen-button svg,
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

  .html__empty {
    color: var(--tot-input-placeholder-color, #64748b);
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    margin: 0;
    padding: var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem);
  }

  .html__empty[hidden] {
    display: none;
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

  .fullscreen__mode {
    color: var(--tot-color-neutral-600, #475569);
    font-size: var(--tot-input-font-size-small, .75rem);
    font-weight: var(--tot-font-weight-normal, 400);
  }

  .fullscreen__body {
    min-height: 0;
    overflow: hidden;
  }
`

const frameBaseStyle = `
  :root {
    color-scheme: light;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    font-size: 13px;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  html {
    background: #fff;
    box-sizing: border-box;
    color: #1e293b;
    margin: 0;
    min-height: 100%;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    min-height: 100%;
    overflow-wrap: anywhere;
    padding: .5rem .75rem;
  }

  img,
  video,
  canvas,
  svg {
    height: auto;
    max-width: 100%;
  }

  iframe,
  object,
  embed {
    max-width: 100%;
  }

  pre {
    overflow: auto;
    white-space: pre;
  }

  code,
  pre {
    font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
  }

  table {
    border-collapse: collapse;
    display: block;
    max-width: 100%;
    overflow: auto;
    width: max-content;
  }

  .tot-html-streaming-caret {
    display: inline-block;
    margin-inline-start: .05em;
    width: .08em;
  }

  .tot-html-streaming-caret::after {
    animation: tot-html-caret-blink 1s steps(1, end) infinite;
    content: '';
    border-inline-end: .12em solid currentColor;
  }

  @keyframes tot-html-caret-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
`

const frameBootScript = `
;(() => {
  const marker = '__totHtmlPreview'

  function copyAttributes(target, source) {
    const existing = Array.from(target.attributes)
    for (let i = 0; i < existing.length; i++) {
      target.removeAttribute(existing[i].name)
    }

    const attributes = Array.from(source.attributes)
    for (let i = 0; i < attributes.length; i++) {
      target.setAttribute(attributes[i].name, attributes[i].value)
    }
  }

  function executeScripts(root) {
    const scripts = Array.from(root.querySelectorAll('script'))
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i]
      const replacement = document.createElement('script')
      const attributes = Array.from(script.attributes)
      for (let j = 0; j < attributes.length; j++) {
        replacement.setAttribute(attributes[j].name, attributes[j].value)
      }
      replacement.text = script.textContent
      script.replaceWith(replacement)
    }
  }

  function appendCaret() {
    const caret = document.createElement('span')
    caret.className = 'tot-html-streaming-caret'
    caret.setAttribute('aria-hidden', 'true')
    document.body.appendChild(caret)
  }

  function applyPreview(payload) {
    const parser = new DOMParser()
    const nextDocument = parser.parseFromString(payload.html || '<!doctype html><html><head></head><body></body></html>', 'text/html')
    const nextHead = document.importNode(nextDocument.head || document.createElement('head'), true)
    const nextBody = document.importNode(nextDocument.body || document.createElement('body'), true)

    copyAttributes(document.documentElement, nextDocument.documentElement)
    document.head.replaceWith(nextHead)
    document.body.replaceWith(nextBody)

    if (payload.streaming) {
      appendCaret()
    }

    if (payload.unsafe) {
      executeScripts(document)
    }
  }

  window.addEventListener('message', (event) => {
    const payload = event.data
    if (!payload || payload[marker] !== true) {
      return
    }

    applyPreview(payload)
  })

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return
    }

    parent.postMessage({ __totHtmlPreviewEscape: true }, '*')
  })
})()
`

const safeSandbox = 'allow-scripts allow-popups allow-popups-to-escape-sandbox'
const unsafeSandbox = 'allow-scripts allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-downloads'

const blockedSafeElements = new Set([
  'applet',
  'base',
  'embed',
  'frame',
  'frameset',
  'iframe',
  'link',
  'meta',
  'object',
  'portal',
  'script',
])

const urlAttributes = new Set([
  'action',
  'background',
  'cite',
  'data',
  'formaction',
  'href',
  'poster',
  'src',
  'xlink:href',
])

export class TotHtml extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'html', 'unsafe', 'mode', 'streaming', 'label', 'help-text']
  }

  constructor() {
    super()
    this._value = null
    this._fullscreen = false
    this._slotHtml = ''
    this._mutationObserver = null
    this._historyPushed = false
    this._historyToken = ''
    this._skipHistoryOnClose = false
    this._handleKeyDown = event => this.handleKeyDown(event)
    this._handlePopState = event => this.handlePopState(event)
    this._handleFrameMessage = event => this.handleFrameMessage(event)
    this._touchStartY = 0
  }

  get value() {
    if (this._value !== null) {
      return this._value
    }

    if (this.hasAttribute('value')) {
      return this.getAttribute('value') || ''
    }

    if (this.hasAttribute('html')) {
      return this.getAttribute('html') || ''
    }

    return this._slotHtml
  }

  set value(value) {
    this._value = value === null || value === undefined ? '' : String(value)
    this.render()
  }

  get html() {
    return this.value
  }

  set html(value) {
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

  get unsafe() {
    return this.hasAttribute('unsafe') || (this.getAttribute('mode') || '').toLowerCase() === 'unsafe'
  }

  set unsafe(value) {
    setBooleanAttribute(this, 'unsafe', value)
  }

  get streaming() {
    return this.hasAttribute('streaming')
  }

  set streaming(value) {
    setBooleanAttribute(this, 'streaming', value)
  }

  connectedCallback() {
    this.captureSlotHtml()
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
    if (name === 'value' || name === 'html') {
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
    root.innerHTML = `<style>${htmlStyle}</style>
      <div class="form-control" part="form-control">
        <span class="label" part="form-control-label" hidden></span>
        <article class="html" part="base">
          <div class="html__frame-wrap" part="content">
            <iframe class="html__frame" part="iframe" referrerpolicy="no-referrer" title="HTML preview"></iframe>
          </div>
          <p class="html__empty" part="empty" hidden>No HTML content.</p>
          <span class="html__actions">
            <span class="html__streaming-indicator" part="streaming-indicator" aria-label="Streaming" hidden>⏳</span>
            <button class="html__fullscreen-button" part="fullscreen-button" type="button" aria-label="Open fullscreen preview">
              ${getEnterFullscreenIcon()}
            </button>
          </span>
        </article>
        <span class="help-text" part="form-control-help-text" hidden></span>
      </div>
      <div class="fullscreen" part="fullscreen" hidden>
        <section class="fullscreen__panel" role="dialog" aria-modal="true" aria-label="Fullscreen HTML preview">
          <header class="fullscreen__header">
            <div class="fullscreen__title"><span class="fullscreen__label">HTML</span> <span class="fullscreen__mode"></span></div>
            <span class="fullscreen__actions">
              <span class="fullscreen__streaming-indicator" part="fullscreen-streaming-indicator" aria-label="Streaming" hidden>⏳</span>
              <button class="fullscreen__button fullscreen__close-button" part="close-fullscreen-button" type="button" aria-label="Exit fullscreen preview">
                ${getExitFullscreenIcon()}
              </button>
            </span>
          </header>
          <div class="fullscreen__body" part="fullscreen-content">
            <iframe class="fullscreen__frame" part="fullscreen-iframe" referrerpolicy="no-referrer" title="Fullscreen HTML preview"></iframe>
            <p class="html__empty fullscreen__empty" part="fullscreen-empty" hidden>No HTML content.</p>
          </div>
        </section>
      </div>
    `

    const fullscreenButton = root.querySelector('.html__fullscreen-button')
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
    const source = this.value
    const hasContent = String(source || '').trim() !== ''
    const sandboxAttribute = this.unsafe ? unsafeSandbox : safeSandbox
    const label = root.querySelector('.label')
    const helpText = root.querySelector('.help-text')
    const fullscreenLabel = root.querySelector('.fullscreen__label')
    const mode = root.querySelector('.fullscreen__mode')
    const fullscreen = root.querySelector('.fullscreen')
    const frameWrap = root.querySelector('.html__frame-wrap')
    const empty = root.querySelector('.html > .html__empty')
    const fullscreenFrame = root.querySelector('.fullscreen__frame')
    const fullscreenEmpty = root.querySelector('.fullscreen__empty')
    const indicators = root.querySelectorAll('.html__streaming-indicator, .fullscreen__streaming-indicator')

    label.textContent = this.label
    label.hidden = this.label === ''
    helpText.textContent = this.helpText
    helpText.hidden = this.helpText === ''
    fullscreenLabel.textContent = this.label || 'HTML'
    mode.textContent = this.unsafe ? 'unsafe' : 'safe'
    fullscreen.hidden = !this._fullscreen
    frameWrap.hidden = !hasContent
    empty.hidden = hasContent
    fullscreenFrame.hidden = !hasContent
    fullscreenEmpty.hidden = hasContent

    for (let i = 0; i < indicators.length; i++) {
      indicators[i].hidden = !this.streaming
    }

    this.updateFrame(root.querySelector('.html__frame'), sandboxAttribute, hasContent)
    this.updateFrame(fullscreenFrame, sandboxAttribute, hasContent)
  }

  updateFrame(frame, sandboxAttribute, hasContent) {
    if (!frame || !hasContent) {
      return
    }

    const bootSrcdoc = buildBootSrcdoc()
    if (frame.__totHtmlSandbox !== sandboxAttribute || !frame.__totHtmlBooted) {
      frame.__totHtmlSandbox = sandboxAttribute
      frame.__totHtmlBooted = true
      frame.__totHtmlReady = false
      frame.setAttribute('sandbox', sandboxAttribute)
      frame.srcdoc = bootSrcdoc

      if (!frame.__totHtmlLoadHandlerAttached) {
        frame.__totHtmlLoadHandlerAttached = true
        frame.addEventListener('load', () => {
          frame.__totHtmlReady = true
          this.sendFrameContent(frame)
        })
      }
    }

    this.sendFrameContent(frame)
  }

  sendFrameContent(frame) {
    const payload = {
      __totHtmlPreview: true,
      html: buildContentDoc(this.value, this.unsafe),
      unsafe: this.unsafe,
      streaming: this.streaming,
    }
    frame.__totHtmlPendingPayload = payload

    if (!frame.__totHtmlReady || !frame.contentWindow) {
      return
    }

    frame.contentWindow.postMessage(payload, '*')
  }

  openFullscreen() {
    if (this._fullscreen) {
      return
    }

    this._fullscreen = true
    markFullscreenOpen()
    lockPageScroll()
    window.addEventListener('keydown', this._handleKeyDown)
    window.addEventListener('popstate', this._handlePopState)
    window.addEventListener('message', this._handleFrameMessage)
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
    markFullscreenClosed()
    window.removeEventListener('keydown', this._handleKeyDown)
    window.removeEventListener('popstate', this._handlePopState)
    window.removeEventListener('message', this._handleFrameMessage)
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
    event.stopPropagation()
    if (typeof event.stopImmediatePropagation === 'function') {
      event.stopImmediatePropagation()
    }
    this.closeFullscreen()
  }

  handlePopState() {
    if (!this._fullscreen || !this._historyPushed) {
      return
    }

    this._skipHistoryOnClose = true
    this.closeFullscreen()
  }

  handleFrameMessage(event) {
    const data = event.data
    if (!this._fullscreen || !data || data.__totHtmlPreviewEscape !== true) {
      return
    }

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

  captureSlotHtml() {
    if (this.hasAttribute('value') || this.hasAttribute('html') || this._value !== null) {
      return
    }

    this._slotHtml = this.innerHTML || ''
  }

  observeLightDom() {
    if (this._mutationObserver) {
      return
    }

    this._mutationObserver = new MutationObserver(() => {
      if (this.hasAttribute('value') || this.hasAttribute('html') || this._value !== null) {
        return
      }

      this._slotHtml = this.innerHTML || ''
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
      mode: this.unsafe ? 'unsafe' : 'safe',
      streaming: this.streaming,
      value: this.value,
    }
  }
}

function buildBootSrcdoc() {
  return `<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><script>${escapeScript(frameBootScript)}</script></head><body></body></html>`
}

function buildContentDoc(value, unsafe) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(String(value || ''), 'text/html')

  if (!unsafe) {
    sanitizeDocument(doc)
  }

  injectFrameHead(doc, unsafe)
  return `<!doctype html>\n${doc.documentElement.outerHTML}`
}

function injectFrameHead(doc, unsafe) {
  const head = doc.head || doc.createElement('head')
  if (!doc.head) {
    doc.documentElement.insertBefore(head, doc.body || null)
  }

  const meta = doc.createElement('meta')
  meta.setAttribute('charset', 'UTF-8')
  head.insertBefore(meta, head.firstChild)

  const viewport = doc.createElement('meta')
  viewport.setAttribute('name', 'viewport')
  viewport.setAttribute('content', 'width=device-width, initial-scale=1')
  head.appendChild(viewport)

  if (!unsafe) {
    const base = doc.createElement('base')
    base.setAttribute('target', '_blank')
    head.appendChild(base)
  }

  const style = doc.createElement('style')
  style.textContent = frameBaseStyle
  head.appendChild(style)
}

function sanitizeDocument(doc) {
  const walker = doc.createTreeWalker(doc.documentElement, NodeFilter.SHOW_ELEMENT)
  const elements = []
  let node = walker.currentNode
  while (node) {
    elements.push(node)
    node = walker.nextNode()
  }

  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i]
    const tagName = element.localName.toLowerCase()
    if (blockedSafeElements.has(tagName)) {
      element.remove()
      continue
    }

    sanitizeElementAttributes(element)

    if (tagName === 'style') {
      element.textContent = sanitizeCss(element.textContent)
    }

    if (tagName === 'a') {
      element.setAttribute('target', '_blank')
      element.setAttribute('rel', 'noopener noreferrer')
    }
  }
}

function sanitizeElementAttributes(element) {
  const attributes = Array.from(element.attributes)
  for (let i = 0; i < attributes.length; i++) {
    const attribute = attributes[i]
    const name = attribute.name.toLowerCase()
    const value = attribute.value

    if (name.startsWith('on') || name === 'srcdoc') {
      element.removeAttribute(attribute.name)
      continue
    }

    if (name === 'style') {
      const css = sanitizeCss(value)
      if (css.trim() === '') {
        element.removeAttribute(attribute.name)
      } else {
        element.setAttribute(attribute.name, css)
      }
      continue
    }

    if (urlAttributes.has(name) && !isSafeUrl(value, name)) {
      element.removeAttribute(attribute.name)
    }
  }
}

function sanitizeCss(value) {
  let css = String(value || '')
  css = css.replace(/@import\s+[^;]+;?/gi, '')
  css = css.replace(/expression\s*\([^)]*\)/gi, '')
  css = css.replace(/behavior\s*:\s*[^;]+;?/gi, '')
  css = css.replace(/-moz-binding\s*:\s*[^;]+;?/gi, '')
  css = css.replace(/url\(\s*(['"]?)\s*(?:javascript|vbscript):[^)]*\1\s*\)/gi, 'url(about:blank)')
  css = css.replace(/(?:javascript|vbscript):/gi, '')
  return css
}

function isSafeUrl(value, attributeName) {
  const url = String(value || '').trim()
  if (url === '' || url.startsWith('#')) {
    return true
  }

  if (attributeName === 'href' || attributeName === 'xlink:href') {
    return /^(https?:|mailto:|tel:|\/|\.\/|\.\.\/)/i.test(url)
  }

  if (attributeName === 'src' || attributeName === 'poster' || attributeName === 'background') {
    if (/^data:image\/(png|gif|jpe?g|webp);base64,[A-Za-z0-9+/=]+$/i.test(url)) {
      return true
    }
    return /^(https?:|\/|\.\/|\.\.\/)/i.test(url)
  }

  return /^(https?:|mailto:|tel:|\/|\.\/|\.\.\/)/i.test(url)
}

function markFullscreenOpen() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  window.__totFullscreenOpenCount = (window.__totFullscreenOpenCount || 0) + 1
  document.documentElement.setAttribute('data-tot-fullscreen-open', '')
}

function markFullscreenClosed() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  window.__totFullscreenOpenCount = Math.max(0, (window.__totFullscreenOpenCount || 0) - 1)
  if (window.__totFullscreenOpenCount === 0) {
    document.documentElement.removeAttribute('data-tot-fullscreen-open')
  }
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

function escapeScript(value) {
  return String(value).replace(/<\/script/gi, '<\\/script')
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
