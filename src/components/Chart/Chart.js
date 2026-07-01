const chartStyle = `
  :host {
    --border-color-1: var(--tot-color-blue-600, #2563eb);
    --border-color-2: var(--tot-color-pink-600, #db2777);
    --border-color-3: var(--tot-color-green-600, #16a34a);
    --border-color-4: var(--tot-color-yellow-600, #ca8a04);
    --border-color-5: var(--tot-color-purple-600, #9333ea);
    --border-color-6: var(--tot-color-orange-600, #ea580c);
    --fill-color-1: color-mix(in srgb, var(--border-color-1) 40%, transparent);
    --fill-color-2: color-mix(in srgb, var(--border-color-2) 40%, transparent);
    --fill-color-3: color-mix(in srgb, var(--border-color-3) 40%, transparent);
    --fill-color-4: color-mix(in srgb, var(--border-color-4) 40%, transparent);
    --fill-color-5: color-mix(in srgb, var(--border-color-5) 40%, transparent);
    --fill-color-6: color-mix(in srgb, var(--border-color-6) 40%, transparent);
    --border-radius: var(--tot-border-radius-small, 3px);
    --border-width: var(--tot-panel-border-width, 1px);
    --grid-border-width: var(--tot-panel-border-width, 1px);
    --grid-color: var(--tot-panel-border-color, #e2e8f0);
    --line-border-width: 2px;
    --point-radius: 3px;

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

  .description,
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

  slot {
    display: none;
  }
`

const chartJsUrl = new URL('../../vendor/chart.js/chart.umd.min.js', import.meta.url).href
const chartTypesWithArcColors = ['pie', 'doughnut', 'polarArea']
const radialChartTypes = ['radar', 'polarArea']
const cartesianChartTypes = ['bar', 'line', 'scatter', 'bubble']
let chartJsLoadPromise = null

export class TotChart extends HTMLElement {
  static get observedAttributes() {
    return [
      'config',
      'description',
      'grid',
      'index-axis',
      'label',
      'legend-position',
      'max',
      'min',
      'plugins',
      'stacked',
      'style',
      'class',
      'type',
      'without-animation',
      'without-legend',
      'without-tooltip',
      'x-label',
      'y-label',
    ]
  }

  constructor() {
    super()
    this.chart = null
    this.updateComplete = Promise.resolve()
    this._config = undefined
    this._plugins = undefined
    this._renderQueued = false
    this._statusMessage = ''
  }

  get config() {
    if (this._config !== undefined) {
      return this._config
    }

    const configAttribute = this.getAttribute('config')
    if (configAttribute) {
      return parseJson(configAttribute, null)
    }

    return parseSlottedConfig(this) || {
      type: this.type,
      data: {
        labels: [],
        datasets: [],
      },
    }
  }

  set config(value) {
    this._config = normalizeConfig(value)
    this.scheduleRender()
  }

  get description() {
    return this.getAttribute('description')
  }

  set description(value) {
    setStringAttribute(this, 'description', value)
  }

  get grid() {
    const value = this.getAttribute('grid') || 'both'
    if (['x', 'y', 'both', 'none'].includes(value)) {
      return value
    }
    return 'both'
  }

  set grid(value) {
    setStringAttribute(this, 'grid', value)
  }

  get indexAxis() {
    return this.getAttribute('index-axis') === 'y' ? 'y' : 'x'
  }

  set indexAxis(value) {
    setStringAttribute(this, 'index-axis', value === 'y' ? 'y' : 'x')
  }

  get label() {
    return this.getAttribute('label')
  }

  set label(value) {
    setStringAttribute(this, 'label', value)
  }

  get legendPosition() {
    return this.getAttribute('legend-position') || 'top'
  }

  set legendPosition(value) {
    setStringAttribute(this, 'legend-position', value)
  }

  get max() {
    return getNumberAttribute(this, 'max')
  }

  set max(value) {
    setNumberAttribute(this, 'max', value)
  }

  get min() {
    return getNumberAttribute(this, 'min')
  }

  set min(value) {
    setNumberAttribute(this, 'min', value)
  }

  get plugins() {
    if (this._plugins !== undefined) {
      return this._plugins
    }

    const pluginsAttribute = this.getAttribute('plugins')
    if (!pluginsAttribute) {
      return []
    }

    const parsed = parseJson(pluginsAttribute, [])
    return Array.isArray(parsed) ? parsed : []
  }

  set plugins(value) {
    this._plugins = Array.isArray(value) ? value : []
    this.scheduleRender()
  }

  get stacked() {
    return this.hasAttribute('stacked')
  }

  set stacked(value) {
    setBooleanAttribute(this, 'stacked', value)
  }

  get type() {
    return this.getAttribute('type') || 'bar'
  }

  set type(value) {
    setStringAttribute(this, 'type', value || 'bar')
  }

  get withoutAnimation() {
    return this.hasAttribute('without-animation')
  }

  set withoutAnimation(value) {
    setBooleanAttribute(this, 'without-animation', value)
  }

  get withoutLegend() {
    return this.hasAttribute('without-legend')
  }

  set withoutLegend(value) {
    setBooleanAttribute(this, 'without-legend', value)
  }

  get withoutTooltip() {
    return this.hasAttribute('without-tooltip')
  }

  set withoutTooltip(value) {
    setBooleanAttribute(this, 'without-tooltip', value)
  }

  get xLabel() {
    return this.getAttribute('x-label')
  }

  set xLabel(value) {
    setStringAttribute(this, 'x-label', value)
  }

  get yLabel() {
    return this.getAttribute('y-label')
  }

  set yLabel(value) {
    setStringAttribute(this, 'y-label', value)
  }

  connectedCallback() {
    this.renderBase()
    this.setupObservers()
    this.scheduleRender()
  }

  disconnectedCallback() {
    this.destroyChart()
    this.teardownObservers()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'config') {
      this._config = undefined
    }

    if (name === 'plugins') {
      this._plugins = undefined
    }

    this.scheduleRender()
  }

  async renderChart() {
    this.renderBase()
    const root = this.shadowRoot
    const canvas = root.querySelector('canvas')
    const status = root.querySelector('.status')

    try {
      const ChartClass = await loadChartJs()
      const config = this.createChartConfig()
      this.updateCanvasAccessibility(canvas)
      this.destroyChart()
      status.classList.remove('is-visible')
      status.textContent = ''
      this.chart = new ChartClass(canvas, config)
      this.dispatchEvent(new CustomEvent('chart-render', {
        detail: {
          type: config.type,
          datasets: Array.isArray(config.data?.datasets) ? config.data.datasets.length : 0,
        },
      }))
      return this.chart
    } catch (error) {
      const message = error?.message || 'Unable to render chart.'
      this.destroyChart()
      status.textContent = message
      status.classList.add('is-visible')
      this.dispatchEvent(new CustomEvent('chart-error', {
        detail: {
          message,
        },
      }))
      return null
    }
  }

  renderBase() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    if (root.querySelector('.chart-wrap')) {
      return
    }

    root.innerHTML = `
      <style>${chartStyle}</style>
      <div class="chart-wrap" part="base">
        <canvas part="canvas"></canvas>
        <div class="status" part="status"></div>
        <span class="description" id="description"></span>
        <span class="probe" aria-hidden="true"></span>
      </div>
      <slot></slot>
    `

    const slot = root.querySelector('slot')
    slot.addEventListener('slotchange', () => this.scheduleRender())
  }

  scheduleRender() {
    if (!this.isConnected) {
      return
    }

    if (this._renderQueued) {
      return
    }

    this._renderQueued = true
    queueMicrotask(() => {
      this._renderQueued = false
      const renderPromise = this.renderChart()
      this.updateComplete = renderPromise.then(() => undefined, () => undefined)
    })
  }

  createChartConfig() {
    const sourceConfig = cloneValue(this.config)
    const config = isPlainObject(sourceConfig) ? sourceConfig : {}
    const tokens = getChartTokens(this)
    const type = this.hasAttribute('type') ? this.type : config.type || this.type
    const data = isPlainObject(config.data) ? config.data : {}
    const datasets = Array.isArray(data.datasets) ? data.datasets : []
    const defaultOptions = createDefaultOptions(this, tokens, type)
    const mergedOptions = mergeDeep(defaultOptions, config.options || {})
    const attributeOptions = createAttributeOptions(this, tokens, type)

    config.type = type
    config.data = data
    config.data.datasets = datasets
    config.options = mergeDeep(mergedOptions, attributeOptions)
    config.plugins = mergePluginArrays(config.plugins, this.plugins)

    applyDatasetDefaults(config, tokens)
    return resolveCssValues(config, this)
  }

  updateCanvasAccessibility(canvas) {
    const root = this.shadowRoot
    const description = root.querySelector('#description')
    const label = this.label
    const descriptionText = this.description
    const fallback = [label, descriptionText].filter(Boolean).join('. ')

    canvas.setAttribute('role', 'img')

    if (label) {
      canvas.setAttribute('aria-label', label)
    } else {
      canvas.removeAttribute('aria-label')
    }

    if (descriptionText) {
      description.textContent = descriptionText
      canvas.setAttribute('aria-describedby', 'description')
    } else {
      description.textContent = ''
      canvas.removeAttribute('aria-describedby')
    }

    canvas.textContent = fallback || 'Chart'
  }

  destroyChart() {
    if (!this.chart) {
      return
    }

    this.chart.destroy()
    this.chart = null
  }

  setupObservers() {
    if (!this._contentObserver) {
      this._contentObserver = new MutationObserver(() => this.scheduleRender())
      this._contentObserver.observe(this, {
        childList: true,
        characterData: true,
        subtree: true,
      })
    }

    if (!this._themeObserver && typeof document !== 'undefined') {
      this._themeObserver = new MutationObserver(() => this.scheduleRender())

      if (document.documentElement) {
        this._themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class', 'style'],
        })
      }

      if (document.body) {
        this._themeObserver.observe(document.body, {
          attributes: true,
          attributeFilter: ['class', 'style'],
        })
      }
    }
  }

  teardownObservers() {
    if (this._contentObserver) {
      this._contentObserver.disconnect()
      this._contentObserver = null
    }

    if (this._themeObserver) {
      this._themeObserver.disconnect()
      this._themeObserver = null
    }
  }
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

  chartJsLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-tot-chart-js]')
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Chart), { once: true })
      existing.addEventListener('error', () => reject(new Error('Unable to load Chart.js.')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = chartJsUrl
    script.async = true
    script.dataset.totChartJs = 'true'
    script.addEventListener('load', () => {
      if (window.Chart) {
        resolve(window.Chart)
        return
      }
      reject(new Error('Chart.js loaded without exposing a Chart global.'))
    }, { once: true })
    script.addEventListener('error', () => reject(new Error('Unable to load Chart.js.')), { once: true })
    document.head.appendChild(script)
  })

  return chartJsLoadPromise
}

function parseSlottedConfig(host) {
  const script = host.querySelector('script[type="application/json"]')
  if (!script) {
    return null
  }

  const text = script.textContent.trim()
  if (!text) {
    return null
  }

  return parseJson(text, null)
}

function parseJson(text, fallback) {
  try {
    return JSON.parse(text)
  } catch {
    return fallback
  }
}

function normalizeConfig(value) {
  if (typeof value === 'string') {
    return parseJson(value, {})
  }

  if (value && typeof value === 'object') {
    return value
  }

  return {}
}

function createDefaultOptions(host, tokens, type) {
  const hasCartesianScales = cartesianChartTypes.includes(type)
  const hasRadialScale = radialChartTypes.includes(type)
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
        display: true,
        position: normalizeLegendPosition(host.legendPosition, host),
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
        enabled: true,
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

  if (hasCartesianScales) {
    options.indexAxis = host.indexAxis
    options.scales = createCartesianScales(host, tokens)
  }

  if (hasRadialScale) {
    options.scales = mergeDeep(options.scales || {}, createRadialScale(host, tokens))
  }

  return options
}

function createAttributeOptions(host, tokens, type) {
  const options = {
    plugins: {
      legend: {
        display: !host.withoutLegend,
        position: normalizeLegendPosition(host.legendPosition, host),
      },
      tooltip: {
        enabled: !host.withoutTooltip,
      },
    },
  }

  if (host.withoutAnimation) {
    options.animation = false
  }

  if (cartesianChartTypes.includes(type)) {
    options.indexAxis = host.indexAxis
    options.scales = createCartesianScales(host, tokens)
  }

  if (radialChartTypes.includes(type)) {
    options.scales = mergeDeep(options.scales || {}, createRadialScale(host, tokens))
  }

  return options
}

function createCartesianScales(host, tokens) {
  const grid = host.grid
  const showXGrid = grid === 'both' || grid === 'x'
  const showYGrid = grid === 'both' || grid === 'y'
  const valueAxis = host.indexAxis === 'y' ? 'x' : 'y'
  const scales = {
    x: createAxisOptions(host.xLabel, showXGrid, tokens),
    y: createAxisOptions(host.yLabel, showYGrid, tokens),
  }

  if (host.stacked) {
    scales.x.stacked = true
    scales.y.stacked = true
  }

  if (host.min !== null) {
    scales[valueAxis].min = host.min
  }

  if (host.max !== null) {
    scales[valueAxis].max = host.max
  }

  return scales
}

function createAxisOptions(label, showGrid, tokens) {
  return {
    border: {
      color: tokens.gridColor,
      display: showGrid,
      width: tokens.gridBorderWidth,
    },
    grid: {
      color: tokens.gridColor,
      display: showGrid,
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
      display: Boolean(label),
      font: {
        family: tokens.fontFamily,
        size: tokens.fontSize,
        weight: '500',
      },
      text: label || '',
    },
  }
}

function createRadialScale(host, tokens) {
  const showGrid = host.grid !== 'none'
  const r = {
    angleLines: {
      color: tokens.gridColor,
      display: showGrid,
      lineWidth: tokens.gridBorderWidth,
    },
    grid: {
      color: tokens.gridColor,
      display: showGrid,
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
  }

  if (host.min !== null) {
    r.min = host.min
  }

  if (host.max !== null) {
    r.max = host.max
  }

  return { r }
}

function applyDatasetDefaults(config, tokens) {
  const type = config.type || 'bar'
  const datasets = config.data?.datasets || []

  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i]
    const datasetType = dataset.type || type
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
      dataset.borderWidth = datasetType === 'line' || datasetType === 'radar' ? tokens.lineBorderWidth : tokens.borderWidth
    }

    if (datasetType === 'bar' && dataset.borderRadius === undefined) {
      dataset.borderRadius = tokens.borderRadius
    }

    if ((datasetType === 'line' || datasetType === 'radar' || datasetType === 'scatter' || datasetType === 'bubble') && dataset.pointRadius === undefined) {
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
  const colors = []

  for (let i = 1; i <= 6; i++) {
    colors.push({
      border: getResolvedColor(host, `--border-color-${i}`, getFallbackBorderColor(i)),
      fill: getResolvedColor(host, `--fill-color-${i}`, getFallbackFillColor(i)),
    })
  }

  return {
    borderRadius: getResolvedLength(host, '--border-radius', 3),
    borderWidth: getResolvedLength(host, '--border-width', 1),
    colors,
    fontFamily: computed.fontFamily || '-apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif',
    fontSize: getResolvedLength(host, '--tot-font-size-x-small', 12),
    gridBorderWidth: getResolvedLength(host, '--grid-border-width', 1),
    gridColor: getResolvedColor(host, '--grid-color', '#e2e8f0'),
    lineBorderWidth: getResolvedLength(host, '--line-border-width', 2),
    mutedTextColor: getResolvedColor(host, '--tot-color-neutral-600', '#475569'),
    pointRadius: getResolvedLength(host, '--point-radius', 3),
    textColor: getResolvedColor(host, '--tot-input-color', '#1e293b'),
  }
}

function getResolvedColor(host, propertyName, fallback) {
  const value = getPropertyValue(host, propertyName, fallback)
  return resolveColor(host, value, fallback)
}

function getResolvedLength(host, propertyName, fallback) {
  const value = getPropertyValue(host, propertyName, String(fallback))
  return resolveLength(host, value, fallback)
}

function getPropertyValue(host, propertyName, fallback) {
  const value = getComputedStyle(host).getPropertyValue(propertyName).trim()
  return value || fallback
}

function resolveColor(host, value, fallback) {
  if (!value) {
    return fallback
  }

  const root = host.shadowRoot
  const probe = root?.querySelector('.probe')
  if (!probe) {
    return value
  }

  probe.style.color = ''
  probe.style.color = value
  const resolved = getComputedStyle(probe).color
  if (!resolved || resolved === 'rgba(0, 0, 0, 0)' && value !== 'transparent') {
    return fallback
  }

  return resolved
}

function resolveLength(host, value, fallback) {
  const parsed = Number(value)
  if (Number.isFinite(parsed)) {
    return parsed
  }

  const root = host.shadowRoot
  const probe = root?.querySelector('.probe')
  if (!probe) {
    return fallback
  }

  probe.style.width = ''
  probe.style.width = value
  const resolved = parseFloat(getComputedStyle(probe).width)
  return Number.isFinite(resolved) ? resolved : fallback
}

function resolveCssValues(value, host) {
  if (typeof value === 'string') {
    if (value.includes('var(') || value.includes('color-mix(')) {
      return resolveColor(host, value, value)
    }
    return value
  }

  if (Array.isArray(value)) {
    const result = []
    for (let i = 0; i < value.length; i++) {
      result.push(resolveCssValues(value[i], host))
    }
    return result
  }

  if (isPlainObject(value)) {
    const result = {}
    const keys = Object.keys(value)
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = resolveCssValues(value[keys[i]], host)
    }
    return result
  }

  return value
}

function normalizeLegendPosition(position, host) {
  if (position === 'start' || position === 'end') {
    const direction = getComputedStyle(host).direction || 'ltr'
    const isRtl = direction === 'rtl'
    if (position === 'start') {
      return isRtl ? 'right' : 'left'
    }
    return isRtl ? 'left' : 'right'
  }

  if (['top', 'bottom', 'left', 'right', 'chartArea'].includes(position)) {
    return position
  }

  return 'top'
}

function mergePluginArrays(configPlugins, propertyPlugins) {
  const plugins = []
  appendPlugins(plugins, configPlugins)
  appendPlugins(plugins, propertyPlugins)
  return plugins
}

function appendPlugins(target, plugins) {
  if (!Array.isArray(plugins)) {
    return
  }

  for (let i = 0; i < plugins.length; i++) {
    target.push(plugins[i])
  }
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

function cloneValue(value) {
  if (Array.isArray(value)) {
    const result = []
    for (let i = 0; i < value.length; i++) {
      result.push(cloneValue(value[i]))
    }
    return result
  }

  if (isPlainObject(value)) {
    const result = {}
    const keys = Object.keys(value)
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = cloneValue(value[keys[i]])
    }
    return result
  }

  return value
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype
}

function getNumberAttribute(element, name) {
  if (!element.hasAttribute(name)) {
    return null
  }

  const rawValue = element.getAttribute(name)
  if (rawValue === null || rawValue.trim() === '') {
    return null
  }

  const value = Number(rawValue)
  return Number.isFinite(value) ? value : null
}

function setStringAttribute(element, name, value) {
  if (value === null || value === undefined || value === '') {
    element.removeAttribute(name)
    return
  }

  element.setAttribute(name, String(value))
}

function setNumberAttribute(element, name, value) {
  const number = Number(value)
  if (!Number.isFinite(number)) {
    element.removeAttribute(name)
    return
  }

  element.setAttribute(name, String(number))
}

function setBooleanAttribute(element, name, value) {
  if (value) {
    element.setAttribute(name, '')
    return
  }

  element.removeAttribute(name)
}

function getFallbackBorderColor(index) {
  const colors = ['#2563eb', '#db2777', '#16a34a', '#ca8a04', '#9333ea', '#ea580c']
  return colors[(index - 1) % colors.length]
}

function getFallbackFillColor(index) {
  const colors = [
    'rgba(37, 99, 235, .35)',
    'rgba(219, 39, 119, .35)',
    'rgba(22, 163, 74, .35)',
    'rgba(202, 138, 4, .35)',
    'rgba(147, 51, 234, .35)',
    'rgba(234, 88, 12, .35)',
  ]
  return colors[(index - 1) % colors.length]
}
