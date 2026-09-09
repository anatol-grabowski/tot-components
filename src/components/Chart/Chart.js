const chartStyle = `
  :host {
    --tot-chart-series-border-color-1: var(--tot-color-blue-600, #2563eb);
    --tot-chart-series-border-color-2: var(--tot-color-pink-600, #db2777);
    --tot-chart-series-border-color-3: var(--tot-color-green-600, #16a34a);
    --tot-chart-series-border-color-4: var(--tot-color-yellow-600, #ca8a04);
    --tot-chart-series-border-color-5: var(--tot-color-purple-600, #9333ea);
    --tot-chart-series-border-color-6: var(--tot-color-orange-600, #ea580c);
    --tot-chart-series-fill-color-1: color-mix(in srgb, var(--tot-chart-series-border-color-1) 40%, transparent);
    --tot-chart-series-fill-color-2: color-mix(in srgb, var(--tot-chart-series-border-color-2) 40%, transparent);
    --tot-chart-series-fill-color-3: color-mix(in srgb, var(--tot-chart-series-border-color-3) 40%, transparent);
    --tot-chart-series-fill-color-4: color-mix(in srgb, var(--tot-chart-series-border-color-4) 40%, transparent);
    --tot-chart-series-fill-color-5: color-mix(in srgb, var(--tot-chart-series-border-color-5) 40%, transparent);
    --tot-chart-series-fill-color-6: color-mix(in srgb, var(--tot-chart-series-border-color-6) 40%, transparent);
    --tot-chart-dataset-border-radius: var(--tot-border-radius-small, 3px);
    --tot-chart-dataset-border-width: var(--tot-panel-border-width, 1px);
    --tot-chart-grid-border-width: var(--tot-panel-border-width, 1px);
    --tot-chart-line-border-width: 2px;
    --tot-chart-point-radius: 3px;

    display: block;
    max-width: 100%;
    min-height: var(--tot-chart-height, 16.25rem);
    min-width: 0;
    width: 100%;
  }

  :host([hidden]) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .chart-wrap {
    background: var(--tot-chart-background-color, transparent);
    border-radius: var(--tot-chart-border-radius, 0);
    color: var(--tot-input-color, #1e293b);
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    height: var(--tot-chart-height, 16.25rem);
    max-height: 100%;
    max-width: 100%;
    min-height: inherit;
    min-width: 0;
    position: relative;
    width: 100%;
  }

  .chart-wrap.is-fullscreen {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border-radius: 0;
    height: 100dvh;
    inset: 0;
    max-height: none;
    max-width: none;
    min-height: 0;
    padding: var(--tot-spacing-x-small, .5rem);
    position: fixed;
    width: 100vw;
    z-index: var(--tot-z-index-fullscreen, 1300);
  }

  .fullscreen-button {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: color-mix(in srgb, var(--tot-panel-background-color, #fff) 88%, transparent);
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-icon-color, var(--tot-color-neutral-500, #64748b));
    cursor: pointer;
    display: inline-flex;
    height: 1.75rem;
    justify-content: center;
    padding: 0;
    position: absolute;
    right: var(--tot-spacing-2x-small, .25rem);
    top: var(--tot-spacing-2x-small, .25rem);
    width: 1.75rem;
    z-index: 2;
  }

  .fullscreen-button:hover {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .fullscreen-button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .fullscreen-button svg {
    display: block;
    fill: none;
    height: 1rem;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
    width: 1rem;
  }

  canvas {
    display: block;
    height: 100%;
    max-width: 100%;
    width: 100%;
  }

  .status {
    align-items: center;
    background: color-mix(in srgb, var(--tot-panel-background-color, #fff) 88%, transparent);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--tot-color-danger-700, #b91c1c);
    display: none;
    font-size: var(--tot-font-size-x-small, .75rem);
    inset: var(--tot-spacing-x-small, .5rem);
    justify-content: center;
    line-height: var(--tot-line-height-dense, 1.4);
    padding: var(--tot-spacing-x-small, .5rem);
    position: absolute;
    text-align: center;
    z-index: 1;
  }

  .status.is-visible {
    display: flex;
  }

  .probe {
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`

const chartJsUrl = new URL('../../vendor/chart.js/chart.umd.min.js', import.meta.url).href
const chartTypesWithArcColors = ['pie', 'doughnut', 'polarArea']
const radialChartTypes = ['radar', 'polarArea']
const cartesianChartTypes = ['bar', 'line', 'scatter', 'bubble']
let chartJsLoadPromise = null
const chartThemeSubscribers = new Set()
let chartThemeObserver = null
let chartThemeStylesheetLinks = []

export class TotChart extends HTMLElement {
  static get observedAttributes() {
    return ['style', 'class']
  }

  constructor() {
    super()
    this.chart = null
    this.updateComplete = Promise.resolve()
    this._canvas = null
    this._config = null
    this._fullscreen = false
    this._fullscreenButton = null
    this._historyPushed = false
    this._historyToken = ''
    this._skipHistoryOnClose = false
    this._handleKeyDown = event => this.handleKeyDown(event)
    this._handlePopState = () => this.handlePopState()
    this._renderQueued = false
    this._renderVersion = 0
    this._status = null
    this._themeRenderFrame = 0
  }

  get fullscreen() {
    return this._fullscreen
  }

  get config() {
    return this._config
  }

  set config(value) {
    this._config = value && typeof value === 'object' ? value : null
    this._scheduleRender()
  }

  connectedCallback() {
    this._initialize()
    subscribeToChartTheme(this)
    this._scheduleRender()
  }

  disconnectedCallback() {
    this.closeFullscreen(false, true)
    this._renderVersion += 1
    destroyChart(this)
    this._teardownObservers()
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._scheduleRender()
    }
  }

  _initialize() {
    if (this.shadowRoot) {
      return
    }

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `
      <style>${chartStyle}</style>
      <div class="chart-wrap" part="base">
        <canvas part="canvas" role="img">Chart</canvas>
        <div class="status" part="status"></div>
        <span class="probe" aria-hidden="true"></span>
        <button class="fullscreen-button" part="fullscreen-button" type="button" aria-label="Open fullscreen chart">
          ${getEnterFullscreenIcon()}
        </button>
      </div>
    `

    this._canvas = root.querySelector('canvas')
    this._status = root.querySelector('.status')
    this._wrap = root.querySelector('.chart-wrap')
    this._fullscreenButton = root.querySelector('.fullscreen-button')
    this._fullscreenButton.addEventListener('click', () => {
      if (this._fullscreen) {
        this.closeFullscreen()
      } else {
        this.openFullscreen()
      }
    })
  }


  openFullscreen() {
    this._initialize()
    if (this._fullscreen) {
      return
    }

    this._fullscreen = true
    markFullscreenOpen()
    lockPageScroll()
    window.addEventListener('keydown', this._handleKeyDown)
    window.addEventListener('popstate', this._handlePopState)
    this.pushFullscreenHistoryState()
    this.updateFullscreenUi()
    this.dispatchEvent(new Event('fullscreen-change', { bubbles: true, composed: true }))
  }

  closeFullscreen(shouldUpdate = true, skipHistory = false) {
    if (!this._fullscreen) {
      return
    }

    const shouldSkipHistory = skipHistory || this._skipHistoryOnClose
    this._skipHistoryOnClose = false
    this._fullscreen = false
    markFullscreenClosed()
    window.removeEventListener('keydown', this._handleKeyDown)
    window.removeEventListener('popstate', this._handlePopState)
    unlockPageScroll()

    if (shouldSkipHistory) {
      this.clearFullscreenHistoryState()
    } else {
      this.removeFullscreenHistoryState()
    }

    if (shouldUpdate) {
      this.updateFullscreenUi()
      this.dispatchEvent(new Event('fullscreen-change', { bubbles: true, composed: true }))
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

  updateFullscreenUi() {
    if (!this._wrap || !this._fullscreenButton) {
      return
    }

    this._wrap.classList.toggle('is-fullscreen', this._fullscreen)
    this._fullscreenButton.innerHTML = this._fullscreen
      ? getExitFullscreenIcon()
      : getEnterFullscreenIcon()
    this._fullscreenButton.setAttribute(
      'aria-label',
      this._fullscreen ? 'Exit fullscreen chart' : 'Open fullscreen chart',
    )

    requestAnimationFrame(() => {
      this.chart?.resize()
    })
  }

  _scheduleRender() {
    if (!this.isConnected || this._renderQueued) {
      return
    }

    this._renderQueued = true
    queueMicrotask(() => {
      this._renderQueued = false
      if (!this.isConnected) {
        return
      }

      const renderPromise = renderChart(this)
      this.updateComplete = renderPromise.then(() => undefined, () => undefined)
    })
  }

  _createChartConfig() {
    const config = cloneValue(this._config)
    if (!config || typeof config !== 'object') {
      throw new TypeError('Chart config must be a Chart.js configuration object.')
    }

    const tokens = getChartTokens(this)
    const type = typeof config.type === 'string' ? config.type : ''
    config.options = mergeDeep(createDefaultOptions(tokens, type), config.options)
    applyDatasetDefaults(config, tokens)
    return resolveCssValues(config, this, new Map(), new WeakSet())
  }

  _updateCanvasAccessibility(config) {
    if (!this._canvas) {
      return
    }

    const title = getConfigTitle(config)
    if (title) {
      this._canvas.setAttribute('aria-label', title)
      this._canvas.textContent = title
      return
    }

    this._canvas.removeAttribute('aria-label')
    this._canvas.textContent = 'Chart'
  }

  getCanvas() {
    return this._canvas
  }

  getStatus() {
    return this._status
  }

  _showStatus(message) {
    if (!this._status) {
      return
    }

    this._status.textContent = message
    this._status.classList.add('is-visible')
  }

  _hideStatus() {
    if (!this._status) {
      return
    }

    this._status.textContent = ''
    this._status.classList.remove('is-visible')
  }

  _scheduleThemeRender() {
    if (!this.isConnected || this._themeRenderFrame) {
      return
    }

    this._themeRenderFrame = requestAnimationFrame(() => {
      this._themeRenderFrame = 0
      this._scheduleRender()
    })
  }

  _teardownObservers() {
    if (this._themeRenderFrame) {
      cancelAnimationFrame(this._themeRenderFrame)
      this._themeRenderFrame = 0
    }

    unsubscribeFromChartTheme(this)
  }
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
    window.__totFullscreenPreviewScrollLockState = { count: 0 }
  }
  return window.__totFullscreenPreviewScrollLockState
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

async function renderChart(host) {
  host._initialize()
  const renderVersion = ++host._renderVersion

  if (!host._config) {
    destroyChart(host)
    host._hideStatus()
    host._updateCanvasAccessibility(null)
    return null
  }

  try {
    const ChartClass = await loadChartJs()
    if (!host.isConnected || renderVersion !== host._renderVersion) {
      return host.chart
    }

    const config = host._createChartConfig()
    destroyChart(host)
    host._hideStatus()
    host._updateCanvasAccessibility(config)
    host.chart = new ChartClass(host._canvas, config)
    host.dispatchEvent(new CustomEvent('chart-render', {
      detail: {
        type: typeof config.type === 'string' ? config.type : '',
        datasets: Array.isArray(config.data?.datasets) ? config.data.datasets.length : 0,
      },
    }))
    return host.chart
  } catch (error) {
    if (renderVersion !== host._renderVersion) {
      return host.chart
    }

    const message = error?.message || 'Unable to render chart.'
    destroyChart(host)
    host._showStatus(message)
    host.dispatchEvent(new CustomEvent('chart-error', {
      detail: { message },
    }))
    return null
  }
}

function destroyChart(host) {
  if (!host.chart) {
    return
  }

  host.chart.destroy()
  host.chart = null
}

function subscribeToChartTheme(chart) {
  chartThemeSubscribers.add(chart)
  if (chartThemeObserver || typeof document === 'undefined') {
    return
  }

  chartThemeObserver = new MutationObserver(() => {
    syncChartThemeStylesheetListeners()
    notifyChartThemeSubscribers()
  })

  if (document.documentElement) {
    chartThemeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    })
  }

  if (document.body) {
    chartThemeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    })
  }

  if (document.head) {
    chartThemeObserver.observe(document.head, {
      attributes: true,
      attributeFilter: ['href', 'media', 'disabled', 'class', 'style'],
      childList: true,
      subtree: true,
    })
  }

  window.addEventListener('tot-theme-change', notifyChartThemeSubscribers)
  document.addEventListener('tot-theme-change', notifyChartThemeSubscribers)
  syncChartThemeStylesheetListeners()
}

function unsubscribeFromChartTheme(chart) {
  chartThemeSubscribers.delete(chart)
  if (chartThemeSubscribers.size > 0) {
    return
  }

  if (chartThemeObserver) {
    chartThemeObserver.disconnect()
    chartThemeObserver = null
  }

  window.removeEventListener('tot-theme-change', notifyChartThemeSubscribers)
  document.removeEventListener('tot-theme-change', notifyChartThemeSubscribers)
  clearChartThemeStylesheetListeners()
}

function notifyChartThemeSubscribers() {
  const subscribers = Array.from(chartThemeSubscribers)
  for (let i = 0; i < subscribers.length; i++) {
    subscribers[i]._scheduleThemeRender()
  }
}

function syncChartThemeStylesheetListeners() {
  const nextLinks = Array.from(document.querySelectorAll('link[rel~="stylesheet"]'))

  for (let i = chartThemeStylesheetLinks.length - 1; i >= 0; i--) {
    const link = chartThemeStylesheetLinks[i]
    if (nextLinks.includes(link)) {
      continue
    }
    link.removeEventListener('load', notifyChartThemeSubscribers)
    chartThemeStylesheetLinks.splice(i, 1)
  }

  for (let i = 0; i < nextLinks.length; i++) {
    if (chartThemeStylesheetLinks.includes(nextLinks[i])) {
      continue
    }
    nextLinks[i].addEventListener('load', notifyChartThemeSubscribers)
    chartThemeStylesheetLinks.push(nextLinks[i])
  }
}

function clearChartThemeStylesheetListeners() {
  for (let i = 0; i < chartThemeStylesheetLinks.length; i++) {
    chartThemeStylesheetLinks[i].removeEventListener('load', notifyChartThemeSubscribers)
  }
  chartThemeStylesheetLinks = []
}

function loadChartJs() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Chart.js can only be loaded in a browser.'))
  }

  if (window.Chart) {
    return Promise.resolve(window.Chart)
  }

  if (chartJsLoadPromise) {
    return chartJsLoadPromise
  }

  const loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-tot-chart-js]')
    if (existing) {
      if (existing.dataset.totChartLoaded === 'true') {
        reject(new Error('Chart.js loaded without exposing a Chart global.'))
        return
      }

      existing.addEventListener('load', () => {
        existing.dataset.totChartLoaded = 'true'
        if (window.Chart) {
          resolve(window.Chart)
          return
        }
        reject(new Error('Chart.js loaded without exposing a Chart global.'))
      }, { once: true })
      existing.addEventListener('error', () => {
        existing.remove()
        reject(new Error('Unable to load Chart.js.'))
      }, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = chartJsUrl
    script.async = true
    script.dataset.totChartJs = 'true'
    script.addEventListener('load', () => {
      script.dataset.totChartLoaded = 'true'
      if (window.Chart) {
        resolve(window.Chart)
        return
      }
      reject(new Error('Chart.js loaded without exposing a Chart global.'))
    }, { once: true })
    script.addEventListener('error', () => {
      script.remove()
      reject(new Error('Unable to load Chart.js.'))
    }, { once: true })
    document.head.appendChild(script)
  })

  chartJsLoadPromise = loadPromise.catch((error) => {
    chartJsLoadPromise = null
    throw error
  })
  return chartJsLoadPromise
}

function createDefaultOptions(tokens, type) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    color: tokens.textColor,
    font: {
      family: tokens.fontFamily,
      size: tokens.fontSize,
    },
    plugins: {
      legend: {
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          color: tokens.textColor,
          font: {
            family: tokens.fontFamily,
            size: tokens.fontSize,
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        titleFont: {
          family: tokens.fontFamily,
          size: tokens.fontSize,
        },
        bodyFont: {
          family: tokens.fontFamily,
          size: tokens.fontSize,
        },
      },
    },
  }

  if (cartesianChartTypes.includes(type)) {
    options.scales = {
      x: createAxisOptions(tokens),
      y: createAxisOptions(tokens),
    }
  } else if (radialChartTypes.includes(type)) {
    options.scales = createRadialScale(tokens)
  }

  return options
}

function createAxisOptions(tokens) {
  return {
    border: {
      color: tokens.gridColor,
      width: tokens.gridBorderWidth,
    },
    grid: {
      color: tokens.gridColor,
      lineWidth: tokens.gridBorderWidth,
    },
    ticks: {
      color: tokens.mutedTextColor,
      font: {
        family: tokens.fontFamily,
        size: tokens.fontSize,
      },
    },
    title: {
      color: tokens.textColor,
      font: {
        family: tokens.fontFamily,
        size: tokens.fontSize,
        weight: '500',
      },
    },
  }
}

function createRadialScale(tokens) {
  return {
    r: {
      angleLines: {
        color: tokens.gridColor,
        lineWidth: tokens.gridBorderWidth,
      },
      grid: {
        color: tokens.gridColor,
        lineWidth: tokens.gridBorderWidth,
      },
      pointLabels: {
        color: tokens.textColor,
        font: {
          family: tokens.fontFamily,
          size: tokens.fontSize,
        },
      },
      ticks: {
        backdropColor: 'transparent',
        color: tokens.mutedTextColor,
        font: {
          family: tokens.fontFamily,
          size: tokens.fontSize,
        },
      },
    },
  }
}

function applyDatasetDefaults(config, tokens) {
  const type = typeof config.type === 'string' ? config.type : 'bar'
  const datasets = Array.isArray(config.data?.datasets) ? config.data.datasets : []

  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i]
    if (!dataset || typeof dataset !== 'object') {
      continue
    }

    const datasetType = typeof dataset.type === 'string' ? dataset.type : type
    const colors = tokens.colors[i % tokens.colors.length]

    if (chartTypesWithArcColors.includes(datasetType)) {
      applyArcDatasetDefaults(dataset, tokens)
      continue
    }

    if (dataset.backgroundColor === undefined) {
      dataset.backgroundColor = colors.fill
    }

    if (dataset.borderColor === undefined) {
      dataset.borderColor = colors.border
    }

    if (dataset.borderWidth === undefined) {
      dataset.borderWidth = datasetType === 'line' || datasetType === 'radar'
        ? tokens.lineBorderWidth
        : tokens.borderWidth
    }

    if (datasetType === 'bar' && dataset.borderRadius === undefined) {
      dataset.borderRadius = tokens.borderRadius
    }

    if ((datasetType === 'line' || datasetType === 'radar' || datasetType === 'scatter' || datasetType === 'bubble')
      && dataset.pointRadius === undefined) {
      dataset.pointRadius = tokens.pointRadius
    }
  }
}

function applyArcDatasetDefaults(dataset, tokens) {
  const data = Array.isArray(dataset.data) ? dataset.data : []
  const fillColors = []
  const borderColors = []

  for (let i = 0; i < data.length; i++) {
    const colors = tokens.colors[i % tokens.colors.length]
    fillColors.push(colors.fill)
    borderColors.push(colors.border)
  }

  if (dataset.backgroundColor === undefined) {
    dataset.backgroundColor = fillColors
  }

  if (dataset.borderColor === undefined) {
    dataset.borderColor = borderColors
  }

  if (dataset.borderWidth === undefined) {
    dataset.borderWidth = tokens.borderWidth
  }
}

function getChartTokens(host) {
  const computed = getComputedStyle(host)
  const probe = host.shadowRoot?.querySelector('.probe') || null
  const colors = []

  for (let i = 1; i <= 6; i++) {
    colors.push({
      border: getResolvedColor(computed, probe, `--tot-chart-series-border-color-${i}`, getFallbackBorderColor(i)),
      fill: getResolvedColor(computed, probe, `--tot-chart-series-fill-color-${i}`, getFallbackFillColor(i)),
    })
  }

  return {
    borderRadius: getResolvedLength(computed, probe, '--tot-chart-dataset-border-radius', 3),
    borderWidth: getResolvedLength(computed, probe, '--tot-chart-dataset-border-width', 1),
    colors,
    fontFamily: getResolvedFontFamily(computed, probe),
    fontSize: getResolvedLength(computed, probe, '--tot-font-size-x-small', 12),
    gridBorderWidth: getResolvedLength(computed, probe, '--tot-chart-grid-border-width', 1),
    gridColor: getResolvedColor(computed, probe, '--tot-chart-grid-color', 'color-mix(in srgb, var(--tot-panel-border-color, #e2e8f0) 55%, transparent)'),
    lineBorderWidth: getResolvedLength(computed, probe, '--tot-chart-line-border-width', 2),
    mutedTextColor: getResolvedColor(computed, probe, '--tot-chart-muted-text-color', 'var(--tot-input-color, #1e293b)'),
    pointRadius: getResolvedLength(computed, probe, '--tot-chart-point-radius', 3),
    textColor: getResolvedColor(computed, probe, '--tot-chart-text-color', 'var(--tot-input-color, #1e293b)'),
  }
}

function getResolvedColor(computed, probe, propertyName, fallback) {
  const value = getPropertyValue(computed, propertyName, fallback)
  return resolveColorWithProbe(probe, value, fallback)
}

function getResolvedLength(computed, probe, propertyName, fallback) {
  const value = getPropertyValue(computed, propertyName, String(fallback))
  return resolveLengthWithProbe(probe, value, fallback)
}

function getResolvedFontFamily(computed, probe) {
  const fallback = '-apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif'
  const value = getPropertyValue(computed, '--tot-input-font-family', '')
    || getPropertyValue(computed, '--tot-font-sans', '')
    || computed.fontFamily
    || fallback

  if (!probe) {
    return value
  }

  probe.style.fontFamily = ''
  probe.style.fontFamily = value
  return getComputedStyle(probe).fontFamily || fallback
}

function getPropertyValue(computed, propertyName, fallback) {
  const value = computed.getPropertyValue(propertyName).trim()
  return value || fallback
}

function resolveColor(host, value, fallback) {
  const probe = host.shadowRoot?.querySelector('.probe') || null
  return resolveColorWithProbe(probe, value, fallback)
}

function resolveColorWithProbe(probe, value, fallback) {
  if (!value || !probe) {
    return value || fallback
  }

  probe.style.color = ''
  probe.style.color = value
  const resolved = getComputedStyle(probe).color
  return resolved || fallback
}

function resolveLengthWithProbe(probe, value, fallback) {
  const parsed = Number(value)
  if (Number.isFinite(parsed)) {
    return parsed
  }

  if (!probe) {
    return fallback
  }

  probe.style.width = ''
  probe.style.width = value
  const resolved = parseFloat(getComputedStyle(probe).width)
  return Number.isFinite(resolved) ? resolved : fallback
}

function resolveCssValues(value, host, cache, seen) {
  if (typeof value === 'string') {
    if (!value.includes('var(') && !value.includes('color-mix(')) {
      return value
    }

    if (cache.has(value)) {
      return cache.get(value)
    }

    const resolved = resolveColor(host, value, value)
    cache.set(value, resolved)
    return resolved
  }

  if (!value || typeof value !== 'object' || seen.has(value)) {
    return value
  }

  seen.add(value)

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      value[i] = resolveCssValues(value[i], host, cache, seen)
    }
    return value
  }

  if (isPlainObject(value)) {
    const keys = Object.keys(value)
    for (let i = 0; i < keys.length; i++) {
      value[keys[i]] = resolveCssValues(value[keys[i]], host, cache, seen)
    }
  }

  return value
}

function mergeDeep(...sources) {
  const target = {}

  for (let i = 0; i < sources.length; i++) {
    mergeInto(target, sources[i])
  }

  return target
}

function mergeInto(target, source) {
  if (!isPlainObject(source)) {
    return target
  }

  const keys = Object.keys(source)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = source[key]

    if (isPlainObject(value)) {
      target[key] = mergeDeep(isPlainObject(target[key]) ? target[key] : {}, value)
      continue
    }

    target[key] = cloneValue(value)
  }

  return target
}

function cloneValue(value, seen = new WeakMap()) {
  if (!value || typeof value !== 'object') {
    return value
  }

  if (seen.has(value)) {
    return seen.get(value)
  }

  if (Array.isArray(value)) {
    const result = []
    seen.set(value, result)
    for (let i = 0; i < value.length; i++) {
      result.push(cloneValue(value[i], seen))
    }
    return result
  }

  if (isPlainObject(value)) {
    const result = {}
    seen.set(value, result)
    const keys = Object.keys(value)
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = cloneValue(value[keys[i]], seen)
    }
    return result
  }

  return value
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype
}

function getConfigTitle(config) {
  const text = config?.options?.plugins?.title?.text
  if (Array.isArray(text)) {
    const parts = []
    for (let i = 0; i < text.length; i++) {
      if (typeof text[i] === 'string') {
        parts.push(text[i])
      }
    }
    return parts.join(' ')
  }
  return typeof text === 'string' ? text : ''
}

function getFallbackBorderColor(index) {
  const colors = ['#2563eb', '#db2777', '#16a34a', '#ca8a04', '#9333ea', '#ea580c']
  return colors[(index - 1) % colors.length]
}

function getFallbackFillColor(index) {
  const colors = [
    'rgba(37, 99, 235, .4)',
    'rgba(219, 39, 119, .4)',
    'rgba(22, 163, 74, .4)',
    'rgba(202, 138, 4, .4)',
    'rgba(147, 51, 234, .4)',
    'rgba(234, 88, 12, .4)',
  ]
  return colors[(index - 1) % colors.length]
}
