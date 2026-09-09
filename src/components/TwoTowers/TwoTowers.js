const twoTowersStyle = `
  :host {
    --tot-two-towers-category-border-color: var(--tot-color-neutral-600, #475569);
    --tot-two-towers-dimmed-border-color: var(--tot-color-neutral-300, #cbd5e1);
    --tot-two-towers-hatch-color: color-mix(in srgb, var(--tot-color-neutral-0, #fff) 76%, transparent);
    --tot-two-towers-delta-overlay-color: color-mix(in srgb, var(--tot-color-neutral-0, #fff) 58%, transparent);
    --tot-two-towers-tear-background-color: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    --tot-two-towers-series-color-1: var(--tot-color-blue-400, #60a5fa);
    --tot-two-towers-series-color-2: var(--tot-color-orange-400, #fb923c);
    --tot-two-towers-series-color-3: var(--tot-color-green-400, #4ade80);
    --tot-two-towers-series-color-4: var(--tot-color-rose-400, #fb7185);
    --tot-two-towers-series-color-5: var(--tot-color-violet-400, #a78bfa);
    --tot-two-towers-series-color-6: var(--tot-color-amber-400, #fbbf24);

    box-sizing: border-box;
    color: var(--tot-input-color, #1e293b);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }

  :host([hidden]) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .two-towers {
    display: grid;
    gap: var(--tot-spacing-x-small, .5rem);
    max-width: 100%;
    min-width: 0;
    position: relative;
    width: 100%;
  }

  .two-towers.is-fullscreen {
    align-content: stretch;
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    gap: var(--tot-spacing-2x-small, .25rem);
    grid-template-rows: minmax(0, 1fr) auto;
    height: 100dvh;
    inset: 0;
    max-width: none;
    overflow: hidden;
    padding: var(--tot-spacing-2x-small, .25rem);
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
    z-index: 3;
  }

  .two-towers.is-fullscreen .fullscreen-button {
    position: fixed;
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

  .chart {
    background: var(--tot-two-towers-background-color, var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff)));
    border: var(--tot-two-towers-border-width, var(--tot-panel-border-width, 1px)) solid var(--tot-two-towers-border-color, var(--tot-panel-border-color, #e2e8f0));
    border-radius: var(--tot-two-towers-border-radius, var(--tot-border-radius-large, 6px));
    min-width: 0;
    overflow: hidden;
    padding: var(--tot-two-towers-padding, var(--tot-spacing-2x-small, .25rem));
    width: 100%;
  }

  .two-towers.is-fullscreen .chart {
    align-items: center;
    border: 0;
    border-radius: 0;
    display: flex;
    justify-content: center;
    min-height: 0;
    padding: 0;
  }

  svg {
    display: block;
    height: auto;
    max-width: 100%;
    overflow: visible;
    width: 100%;
  }

  .two-towers.is-fullscreen svg {
    height: 100%;
    max-height: 100%;
  }

  .category-shape {
    transition: opacity var(--tot-transition-fast, 150ms) ease;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: var(--tot-spacing-2x-small, .25rem);
    min-width: 0;
  }

  .two-towers.is-fullscreen .legend {
    max-height: min(30dvh, 10rem);
    overflow: auto;
  }

  .legend-item {
    align-items: center;
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    display: inline-flex;
    gap: var(--tot-spacing-2x-small, .25rem);
    max-width: 100%;
    min-width: 0;
    padding: var(--tot-spacing-3x-small, .125rem) var(--tot-spacing-x-small, .5rem);
    transition:
      background-color var(--tot-transition-fast, 150ms) ease,
      border-color var(--tot-transition-fast, 150ms) ease,
      opacity var(--tot-transition-fast, 150ms) ease;
  }

  .legend-item.is-active {
    background: var(--tot-color-primary-50, #f0f9ff);
    border-color: var(--tot-color-primary-400, #38bdf8);
  }

  .legend-item.is-dimmed {
    opacity: .7;
  }

  .legend-swatch {
    border: var(--tot-panel-border-width, 1px) solid color-mix(in srgb, var(--tot-two-towers-category-border-color) 40%, transparent);
    border-radius: var(--tot-border-radius-small, 3px);
    flex: 0 0 auto;
    height: .75rem;
    width: .75rem;
  }

  .legend-copy {
    min-width: 0;
  }

  .legend-label,
  .legend-subtitle {
    display: block;
    line-height: var(--tot-line-height-dense, 1.25);
    max-width: 17rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .legend-label {
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-font-size-x-small, .75rem);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .legend-subtitle {
    color: var(--tot-color-neutral-500, #64748b);
    font-size: var(--tot-font-size-2x-small, .625rem);
  }

  .tooltip {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    box-shadow: var(--tot-shadow-medium, 0 4px 12px rgb(15 23 42 / .14));
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-font-size-x-small, .75rem);
    left: 0;
    max-width: min(38rem, calc(100vw - 1rem));
    overflow: hidden;
    pointer-events: none;
    position: fixed;
    top: 0;
    z-index: 1000;
  }

  .tooltip[hidden] {
    display: none;
  }

  .tooltip table {
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;
    width: 100%;
  }

  .tooltip th,
  .tooltip td {
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    padding: var(--tot-spacing-3x-small, .125rem) var(--tot-spacing-x-small, .5rem);
    text-align: right;
    white-space: nowrap;
  }

  .tooltip th:first-child,
  .tooltip td:first-child {
    max-width: 19rem;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: normal;
  }

  .tooltip th {
    background: var(--tot-color-neutral-50, #f8fafc);
    color: var(--tot-color-neutral-500, #64748b);
    font-size: var(--tot-font-size-2x-small, .625rem);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .tooltip tr.total td {
    border-bottom: 0;
    border-top: var(--tot-panel-border-width, 1px) solid var(--tot-color-neutral-400, #94a3b8);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .tooltip tr.total td:first-child {
    font-weight: var(--tot-font-weight-bold, 700);
  }

  .tooltip .positive {
    color: var(--tot-color-success-700, #15803d);
  }

  .tooltip .negative {
    color: var(--tot-color-danger-700, #b91c1c);
  }

  @media (max-width: 36rem) {
    .legend {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .legend-item {
      width: 100%;
    }
  }

  @media (max-width: 24rem) {
    .legend {
      grid-template-columns: 1fr;
    }
  }
`


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

const svgNamespace = 'http://www.w3.org/2000/svg'
const defaultColors = [
  'var(--tot-two-towers-series-color-1)',
  'var(--tot-two-towers-series-color-2)',
  'var(--tot-two-towers-series-color-3)',
  'var(--tot-two-towers-series-color-4)',
  'var(--tot-two-towers-series-color-5)',
  'var(--tot-two-towers-series-color-6)',
]

function finiteNumber(value, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function positiveNumber(value, fallback) {
  const number = finiteNumber(value, fallback)
  return number > 0 ? number : fallback
}

function escapeKey(value) {
  return String(value || 'item').replace(/[^a-z0-9_-]/gi, '-')
}

function createSvgElement(name, attributes = {}, text = '') {
  const element = document.createElementNS(svgNamespace, name)
  const entries = Object.entries(attributes)

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i]
    if (value === undefined || value === null) {
      continue
    }
    element.setAttribute(key, String(value))
  }

  if (text) {
    element.textContent = text
  }

  return element
}

function sum(values) {
  let total = 0
  for (let i = 0; i < values.length; i++) {
    total += finiteNumber(values[i])
  }
  return total
}

function normalizeSubcategory(subcategory, index) {
  const source = subcategory && typeof subcategory === 'object' ? subcategory : {}
  return {
    key: source.key || `subcategory-${index + 1}`,
    label: source.label || source.abbreviation || `Subcategory ${index + 1}`,
    abbreviation: source.abbreviation || source.short || '',
    value: finiteNumber(source.value),
    previous: source.previous === undefined ? undefined : finiteNumber(source.previous),
  }
}

function normalizeCategory(category, index, colorIndex) {
  const source = category && typeof category === 'object' ? category : {}
  const rawSubcategories = Array.isArray(source.subcategories) ? source.subcategories : []
  const subcategories = []

  for (let i = 0; i < rawSubcategories.length; i++) {
    subcategories.push(normalizeSubcategory(rawSubcategories[i], i))
  }

  return {
    key: source.key || `category-${index + 1}`,
    label: source.label || source.abbreviation || `Category ${index + 1}`,
    abbreviation: source.abbreviation || source.short || '',
    color: source.color || defaultColors[colorIndex % defaultColors.length],
    dimmed: Boolean(source.dimmed),
    value: source.value === undefined ? undefined : finiteNumber(source.value),
    previous: source.previous === undefined ? undefined : finiteNumber(source.previous),
    subcategories,
  }
}

function normalizeTower(tower, index, colorOffset) {
  const source = tower && typeof tower === 'object' ? tower : {}
  const rawCategories = Array.isArray(source.categories) ? source.categories : []
  const categories = []

  for (let i = 0; i < rawCategories.length; i++) {
    categories.push(normalizeCategory(rawCategories[i], i, colorOffset + i))
  }

  return {
    key: source.key || `tower-${index + 1}`,
    label: source.label || `Tower ${index + 1}`,
    categories,
  }
}

function normalizeConfig(value) {
  const source = value && typeof value === 'object' ? value : {}
  const rawTowers = Array.isArray(source.towers) ? source.towers : []
  const towers = []

  for (let i = 0; i < Math.min(2, rawTowers.length); i++) {
    towers.push(normalizeTower(rawTowers[i], i, i * 3))
  }

  const periods = source.periods && typeof source.periods === 'object'
    ? source.periods
    : {}

  return {
    label: source.label || 'Two towers visualization',
    orientation: source.orientation === 'horizontal' ? 'horizontal' : 'vertical',
    compare: source.compare !== false,
    tearThreshold: Math.max(1.01, positiveNumber(source.tearThreshold, 1.5)),
    periods: {
      current: periods.current || 'Current',
      previous: periods.previous || 'Previous',
    },
    towers,
  }
}

function categoryCurrent(category) {
  if (category.value !== undefined) {
    return Math.abs(finiteNumber(category.value))
  }

  const values = []
  for (let i = 0; i < category.subcategories.length; i++) {
    values.push(Math.abs(finiteNumber(category.subcategories[i].value)))
  }
  return sum(values)
}

function categoryPrevious(category) {
  if (category.previous !== undefined) {
    return Math.abs(finiteNumber(category.previous))
  }

  const values = []
  for (let i = 0; i < category.subcategories.length; i++) {
    if (category.subcategories[i].previous === undefined) {
      continue
    }
    values.push(Math.abs(finiteNumber(category.subcategories[i].previous)))
  }
  return sum(values)
}

function categorySubtitle(category) {
  const labels = []
  for (let i = 0; i < category.subcategories.length; i++) {
    const subcategory = category.subcategories[i]
    labels.push(subcategory.abbreviation || subcategory.label)
  }
  return labels.join(' · ')
}

function formatNumber(value) {
  const absolute = Math.abs(finiteNumber(value))
  const maximumFractionDigits = absolute >= 1000 ? 0 : absolute >= 100 ? 1 : 2
  return new Intl.NumberFormat(undefined, { maximumFractionDigits }).format(value)
}

function formatSignedNumber(value) {
  if (value === undefined) {
    return '—'
  }

  const number = finiteNumber(value)
  const sign = number > 0 ? '+' : ''
  return `${sign}${formatNumber(number)}`
}

function formatDeltaPercent(current, previous) {
  if (previous === undefined || Math.abs(previous) < 1e-9) {
    return '—'
  }

  const percent = (current - previous) / Math.abs(previous) * 100
  const sign = percent > 0 ? '+' : ''
  return `${sign}${formatNumber(percent)}%`
}

function categoryRawCurrent(category) {
  if (category.value !== undefined) {
    return finiteNumber(category.value)
  }

  const values = []
  for (let i = 0; i < category.subcategories.length; i++) {
    values.push(finiteNumber(category.subcategories[i].value))
  }
  return sum(values)
}

function categoryRawPrevious(category) {
  if (category.previous !== undefined) {
    return finiteNumber(category.previous)
  }

  const values = []
  let hasPrevious = false
  for (let i = 0; i < category.subcategories.length; i++) {
    const previous = category.subcategories[i].previous
    if (previous === undefined) {
      continue
    }
    hasPrevious = true
    values.push(finiteNumber(previous))
  }
  return hasPrevious ? sum(values) : undefined
}

function createTooltipTable(category, periods) {
  const table = document.createElement('table')
  const head = document.createElement('thead')
  const headRow = document.createElement('tr')
  const headings = ['', periods.current, periods.previous, 'Δ', 'Δ %']

  for (let i = 0; i < headings.length; i++) {
    const cell = document.createElement('th')
    cell.textContent = headings[i]
    headRow.append(cell)
  }
  head.append(headRow)

  const body = document.createElement('tbody')
  for (let i = 0; i < category.subcategories.length; i++) {
    const subcategory = category.subcategories[i]
    appendTooltipRow(
      body,
      subcategory.label,
      finiteNumber(subcategory.value),
      subcategory.previous === undefined ? undefined : finiteNumber(subcategory.previous),
      false,
    )
  }

  appendTooltipRow(
    body,
    category.label,
    categoryRawCurrent(category),
    categoryRawPrevious(category),
    true,
  )

  table.append(head, body)
  return table
}

function appendTooltipRow(body, label, current, previous, total) {
  const row = document.createElement('tr')
  row.classList.toggle('total', total)
  const delta = previous === undefined ? undefined : current - previous
  const values = [
    label,
    formatNumber(current),
    previous === undefined ? '—' : formatNumber(previous),
    formatSignedNumber(delta),
    formatDeltaPercent(current, previous),
  ]

  for (let i = 0; i < values.length; i++) {
    const cell = document.createElement('td')
    cell.textContent = values[i]
    if (i >= 3 && delta !== undefined) {
      cell.classList.toggle('positive', delta > 0)
      cell.classList.toggle('negative', delta < 0)
    }
    row.append(cell)
  }
  body.append(row)
}

function currentRegion(orientation, side, geometry, fraction) {
  const clamped = Math.max(0, Math.min(1, fraction))
  const { x, y, width, height } = geometry

  if (orientation === 'vertical') {
    const regionWidth = width * clamped
    return side === 'left'
      ? { x: x + width - regionWidth, y, width: regionWidth, height }
      : { x, y, width: regionWidth, height }
  }

  const regionHeight = height * clamped
  return side === 'top'
    ? { x, y: y + height - regionHeight, width, height: regionHeight }
    : { x, y, width, height: regionHeight }
}

function outerCurrentRegion(orientation, side, geometry, fraction) {
  const clamped = Math.max(0, Math.min(1, fraction))
  const { x, y, width, height } = geometry

  if (orientation === 'vertical') {
    const regionWidth = width * clamped
    return side === 'left'
      ? { x, y, width: regionWidth, height }
      : { x: x + width - regionWidth, y, width: regionWidth, height }
  }

  const regionHeight = height * clamped
  return side === 'top'
    ? { x, y, width, height: regionHeight }
    : { x, y: y + height - regionHeight, width, height: regionHeight }
}

function protrudingRegion(orientation, side, geometry, size) {
  const { x, y, width, height } = geometry

  if (orientation === 'vertical') {
    return side === 'left'
      ? { x: x - size, y, width: size, height }
      : { x: x + width, y, width: size, height }
  }

  return side === 'top'
    ? { x, y: y - size, width, height: size }
    : { x, y: y + height, width, height: size }
}

function appendRect(svg, attributes, categoryKey, registry) {
  const rect = createSvgElement('rect', attributes)
  rect.classList.add('category-shape')
  svg.append(rect)
  registerShape(categoryKey, rect, registry)
  return rect
}

function registerShape(categoryKey, element, registry) {
  if (!registry.has(categoryKey)) {
    registry.set(categoryKey, [])
  }
  registry.get(categoryKey).push(element)
}

function setHighlight(key, registry, legendRegistry) {
  const shapeEntries = Array.from(registry.entries())
  for (let i = 0; i < shapeEntries.length; i++) {
    const [shapeKey, shapes] = shapeEntries[i]
    for (let j = 0; j < shapes.length; j++) {
      const baseOpacity = shapes[j].dataset.baseOpacity || '1'
      shapes[j].setAttribute('opacity', key && key !== shapeKey ? '.28' : baseOpacity)
    }
  }

  const legendEntries = Array.from(legendRegistry.entries())
  for (let i = 0; i < legendEntries.length; i++) {
    const [legendKey, element] = legendEntries[i]
    element.classList.toggle('is-active', Boolean(key) && legendKey === key)
  }
}

function addPattern(svg, id, color) {
  const pattern = createSvgElement('pattern', {
    id,
    width: 9,
    height: 9,
    patternUnits: 'userSpaceOnUse',
    patternTransform: 'rotate(135)',
  })

  pattern.append(
    createSvgElement('rect', {
      width: 9,
      height: 9,
      fill: color,
    }),
    createSvgElement('line', {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 9,
      stroke: 'var(--tot-two-towers-hatch-color)',
      'stroke-width': 2.25,
    }),
  )
  return pattern
}

function drawTear(svg, options) {
  const {
    orientation,
    side,
    normalEdge,
    tearDistance,
    axisStart,
    axisLength,
    stroke,
  } = options

  if (axisLength <= 0 || tearDistance < 6) {
    return
  }

  const center = orientation === 'vertical'
    ? side === 'left'
      ? normalEdge - tearDistance
      : normalEdge + tearDistance
    : side === 'top'
      ? normalEdge - tearDistance
      : normalEdge + tearDistance
  const gap = 7
  const amplitude = 3
  const wavelength = 28
  const sampleCount = Math.max(4, Math.ceil(axisLength / 6))
  const edgeA = []
  const edgeB = []

  for (let i = 0; i <= sampleCount; i++) {
    const ratio = i / sampleCount
    const along = axisStart + axisLength * ratio
    const wave = Math.sin(along / wavelength * Math.PI * 2) * amplitude

    if (orientation === 'vertical') {
      edgeA.push({ x: center - gap / 2 + wave, y: along })
      edgeB.push({ x: center + gap / 2 + wave, y: along })
    } else {
      edgeA.push({ x: along, y: center - gap / 2 + wave })
      edgeB.push({ x: along, y: center + gap / 2 + wave })
    }
  }

  const pathA = pointsPath(edgeA)
  const pathB = pointsPath(edgeB)
  const reversed = edgeB.slice().reverse()
  const ribbon = `${pointsPath(edgeA)} L ${reversed[0].x} ${reversed[0].y} ${pointsPath(reversed, false)} Z`

  svg.append(
    createSvgElement('path', {
      d: ribbon,
      fill: 'var(--tot-two-towers-tear-background-color)',
      stroke: 'none',
      'pointer-events': 'none',
    }),
    createSvgElement('path', {
      d: pathA,
      fill: 'none',
      stroke,
      'stroke-width': 1.3,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'pointer-events': 'none',
    }),
    createSvgElement('path', {
      d: pathB,
      fill: 'none',
      stroke,
      'stroke-width': 1.3,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'pointer-events': 'none',
    }),
  )
}

function pointsPath(points, move = true) {
  if (!points.length) {
    return ''
  }

  let path = move ? `M ${points[0].x} ${points[0].y}` : ''
  for (let i = move ? 1 : 0; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`
  }
  return path
}

function drawComparison(svg, options) {
  const {
    category,
    geometry,
    orientation,
    side,
    current,
    previous,
    compare,
    tearThreshold,
    maxProtrusion,
    patternId,
    registry,
  } = options

  if (!compare || previous === undefined || current <= 1e-9) {
    return
  }

  const baseOpacity = category.dimmed ? .62 : 1
  const crossSize = orientation === 'vertical' ? geometry.width : geometry.height

  if (previous <= current) {
    const previousFraction = previous / current
    const deltaFraction = 1 - previousFraction

    if (deltaFraction > 1e-6) {
      const deltaRegion = outerCurrentRegion(orientation, side, geometry, deltaFraction)
      const overlay = appendRect(svg, {
        x: deltaRegion.x,
        y: deltaRegion.y,
        width: deltaRegion.width,
        height: deltaRegion.height,
        fill: 'var(--tot-two-towers-delta-overlay-color)',
        stroke: 'none',
        opacity: category.dimmed ? .35 : .42,
      }, category.key, registry)
      overlay.dataset.baseOpacity = String(category.dimmed ? .35 : .42)
    }

    const previousRegion = currentRegion(orientation, side, geometry, previousFraction)
    const previousRect = appendRect(svg, {
      x: previousRegion.x,
      y: previousRegion.y,
      width: previousRegion.width,
      height: previousRegion.height,
      fill: category.color,
      stroke: 'none',
      opacity: baseOpacity,
    }, category.key, registry)
    previousRect.dataset.baseOpacity = String(baseOpacity)
    return
  }

  const ratio = previous / current
  const rawSize = crossSize * (ratio - 1)
  const torn = ratio > tearThreshold
  const thresholdSize = crossSize * Math.max(0, tearThreshold - 1)
  const visibleSize = torn
    ? Math.min(maxProtrusion, Math.max(8, thresholdSize))
    : rawSize
  const region = protrudingRegion(orientation, side, geometry, visibleSize)
  const protrusionOpacity = category.dimmed ? .58 : .86
  const protrusion = appendRect(svg, {
    x: region.x,
    y: region.y,
    width: region.width,
    height: region.height,
    fill: `url(#${patternId})`,
    stroke: category.dimmed
      ? 'var(--tot-two-towers-dimmed-border-color)'
      : 'var(--tot-two-towers-category-border-color)',
    'stroke-width': 1,
    opacity: protrusionOpacity,
  }, category.key, registry)
  protrusion.dataset.baseOpacity = String(protrusionOpacity)

  if (torn) {
    const normalEdge = orientation === 'vertical'
      ? side === 'left'
        ? geometry.x
        : geometry.x + geometry.width
      : side === 'top'
        ? geometry.y
        : geometry.y + geometry.height

    drawTear(svg, {
      orientation,
      side,
      normalEdge,
      tearDistance: Math.min(58, Math.max(18, maxProtrusion * .42)),
      axisStart: orientation === 'vertical' ? geometry.y : geometry.x,
      axisLength: orientation === 'vertical' ? geometry.height : geometry.width,
      stroke: category.dimmed
        ? 'var(--tot-two-towers-dimmed-border-color)'
        : 'var(--tot-two-towers-category-border-color)',
    })
  }
}

function drawCategoryOutline(svg, geometry, orientation, dimmed) {
  const { x, y, width, height } = geometry
  const border = dimmed
    ? 'var(--tot-two-towers-dimmed-border-color)'
    : 'var(--tot-two-towers-category-border-color)'
  const common = {
    stroke: border,
    'stroke-width': 1.25,
    'pointer-events': 'none',
  }

  svg.append(
    createSvgElement('line', {
      ...common,
      x1: x,
      y1: y,
      x2: x + width,
      y2: y,
    }),
    createSvgElement('line', {
      ...common,
      x1: x,
      y1: y + height,
      x2: x + width,
      y2: y + height,
    }),
    createSvgElement('line', {
      ...common,
      x1: x,
      y1: y,
      x2: x,
      y2: y + height,
    }),
    createSvgElement('line', {
      ...common,
      x1: x + width,
      y1: y,
      x2: x + width,
      y2: y + height,
    }),
  )

  if (orientation === 'vertical') {
    return
  }
}

function drawSubcategories(svg, options) {
  const {
    category,
    geometry,
    orientation,
    side,
    compare,
    tearThreshold,
    maxProtrusion,
    patternId,
    registry,
  } = options
  const subcategories = category.subcategories
  if (!subcategories.length) {
    return
  }

  const currentAmounts = []
  for (let i = 0; i < subcategories.length; i++) {
    currentAmounts.push(Math.abs(finiteNumber(subcategories[i].value)))
  }
  const currentTotal = sum(currentAmounts)
  if (currentTotal <= 1e-9) {
    return
  }

  let offset = 0
  for (let i = 0; i < subcategories.length; i++) {
    const subcategory = subcategories[i]
    const current = currentAmounts[i]
    const fraction = current / currentTotal
    const subGeometry = orientation === 'vertical'
      ? {
          x: geometry.x,
          y: geometry.y + geometry.height * offset,
          width: geometry.width,
          height: geometry.height * fraction,
        }
      : {
          x: geometry.x + geometry.width * offset,
          y: geometry.y,
          width: geometry.width * fraction,
          height: geometry.height,
        }

    const previous = subcategory.previous === undefined
      ? undefined
      : Math.abs(finiteNumber(subcategory.previous))
    drawComparison(svg, {
      category,
      geometry: subGeometry,
      orientation,
      side,
      current,
      previous,
      compare,
      tearThreshold,
      maxProtrusion,
      patternId,
      registry,
    })

    drawSubcategoryLabel(svg, category, subcategory, subGeometry, orientation, current)

    offset += fraction
    if (i < subcategories.length - 1) {
      if (orientation === 'vertical') {
        const y = geometry.y + geometry.height * offset
        svg.append(createSvgElement('line', {
          x1: geometry.x,
          y1: y,
          x2: geometry.x + geometry.width,
          y2: y,
          stroke: 'color-mix(in srgb, var(--tot-two-towers-category-border-color) 68%, transparent)',
          'stroke-width': 1,
          'pointer-events': 'none',
        }))
      } else {
        const x = geometry.x + geometry.width * offset
        svg.append(createSvgElement('line', {
          x1: x,
          y1: geometry.y,
          x2: x,
          y2: geometry.y + geometry.height,
          stroke: 'color-mix(in srgb, var(--tot-two-towers-category-border-color) 68%, transparent)',
          'stroke-width': 1,
          'pointer-events': 'none',
        }))
      }
    }
  }
}

function drawSubcategoryLabel(svg, category, subcategory, geometry, orientation, current) {
  if (current <= 0) {
    return
  }

  const label = subcategory.abbreviation || ''
  if (!label) {
    return
  }

  const mainPixels = orientation === 'vertical' ? geometry.height : geometry.width
  if (mainPixels < (orientation === 'vertical' ? 10 : 20)) {
    return
  }

  const text = createSvgElement('text', orientation === 'vertical'
    ? {
        x: geometry.x + 5,
        y: geometry.y + Math.min(11, Math.max(7, geometry.height - 2)),
        fill: 'var(--tot-input-color, #1e293b)',
        'font-size': mainPixels < 14 ? 7 : 8.5,
        'font-weight': 600,
        opacity: category.dimmed ? .72 : .88,
        'pointer-events': 'none',
      }
    : {
        x: geometry.x + geometry.width / 2,
        y: geometry.y + 12,
        fill: 'var(--tot-input-color, #1e293b)',
        'font-size': mainPixels < 30 ? 7 : 8.5,
        'font-weight': 600,
        opacity: category.dimmed ? .72 : .88,
        'pointer-events': 'none',
        'text-anchor': 'middle',
      }, label)

  svg.append(text)
}

function drawCategoryLabel(svg, category, geometry) {
  const label = category.abbreviation || ''
  if (!label) {
    return
  }

  const size = Math.min(18, Math.max(9, Math.min(geometry.width, geometry.height) * .17))
  if (geometry.width < 20 || geometry.height < 12) {
    return
  }

  svg.append(createSvgElement('text', {
    x: geometry.x + geometry.width / 2,
    y: geometry.y + geometry.height / 2 + size * .34,
    fill: 'var(--tot-input-color, #1e293b)',
    'font-size': size,
    'font-weight': 700,
    opacity: category.dimmed ? .72 : .92,
    'pointer-events': 'none',
    'text-anchor': 'middle',
  }, label))
}

function drawTowerLabel(svg, tower, x, y, anchor) {
  if (!tower.label) {
    return
  }

  svg.append(createSvgElement('text', {
    x,
    y,
    fill: 'var(--tot-color-neutral-500, #64748b)',
    'font-size': 13,
    'font-weight': 600,
    'letter-spacing': '.02em',
    'pointer-events': 'none',
    'text-anchor': anchor,
  }, tower.label))
}

function renderLegend(container, towers, registry, legendRegistry, handlers) {
  container.replaceChildren()
  let colorIndex = 0

  for (let towerIndex = 0; towerIndex < towers.length; towerIndex++) {
    const categories = towers[towerIndex].categories

    for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
      const category = categories[categoryIndex]
      const item = document.createElement('div')
      item.className = `legend-item${category.dimmed ? ' is-dimmed' : ''}`
      item.setAttribute('part', 'legend-item')

      const swatch = document.createElement('span')
      swatch.className = 'legend-swatch'
      swatch.setAttribute('part', 'legend-swatch')
      swatch.style.background = category.color || defaultColors[colorIndex % defaultColors.length]

      const copy = document.createElement('span')
      copy.className = 'legend-copy'

      const label = document.createElement('span')
      label.className = 'legend-label'
      label.textContent = category.abbreviation
        ? `${category.abbreviation} — ${category.label}`
        : category.label

      const subtitleText = categorySubtitle(category)
      const subtitle = document.createElement('span')
      subtitle.className = 'legend-subtitle'
      subtitle.textContent = subtitleText
      subtitle.hidden = !subtitleText

      copy.append(label, subtitle)
      item.append(swatch, copy)
      item.addEventListener('pointerenter', (event) => {
        setHighlight(category.key, registry, legendRegistry)
        if (event.pointerType !== 'touch') {
          handlers.show(category, event)
        }
      })
      item.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'touch') {
          handlers.move(event)
        }
      })
      item.addEventListener('pointerleave', (event) => {
        if (event.pointerType === 'touch') {
          return
        }
        handlers.hide()
      })
      item.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'touch') {
          handlers.show(category, event, true)
        }
      })

      legendRegistry.set(category.key, item)
      container.append(item)
      colorIndex += 1
    }
  }
}

export class TotTwoTowers extends HTMLElement {
  constructor() {
    super()
    this._config = normalizeConfig(null)
    this._fullscreen = false
    this._fullscreenButton = null
    this._historyPushed = false
    this._historyToken = ''
    this._skipHistoryOnClose = false
    this._handleKeyDown = event => this.handleKeyDown(event)
    this._handlePopState = () => this.handlePopState()
    this._handleResize = () => {
      if (this._fullscreen) {
        this.render()
      }
    }
    this._shapeRegistry = new Map()
    this._legendRegistry = new Map()
    this._tooltipPinnedKey = null
    this._onWindowPointerDown = (event) => {
      if (!event.composedPath().includes(this)) {
        this.hideTooltip(true)
      }
    }

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `
      <style>${twoTowersStyle}</style>
      <div class="two-towers" part="base">
        <div class="chart" part="chart">
          <svg aria-label="Two towers visualization" role="img"></svg>
        </div>
        <div class="legend" part="legend"></div>
        <div class="tooltip" part="tooltip" hidden></div>
        <button class="fullscreen-button" part="fullscreen-button" type="button" aria-label="Open fullscreen visualization">
          ${getEnterFullscreenIcon()}
        </button>
      </div>
    `

    this._base = root.querySelector('.two-towers')
    this._svg = root.querySelector('svg')
    this._legend = root.querySelector('.legend')
    this._tooltip = root.querySelector('.tooltip')
    this._fullscreenButton = root.querySelector('.fullscreen-button')
    this._fullscreenButton.addEventListener('click', () => {
      if (this._fullscreen) {
        this.closeFullscreen()
      } else {
        this.openFullscreen()
      }
    })
    root.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'touch') {
        return
      }
      const target = event.target
      if (
        !(target instanceof Element) ||
        (!target.closest('.category-shape') && !target.closest('.legend-item'))
      ) {
        this.hideTooltip(true)
      }
    })
  }

  get fullscreen() {
    return this._fullscreen
  }

  get config() {
    return this._config
  }

  set config(value) {
    this._config = normalizeConfig(value)
    if (this.isConnected) {
      this.render()
    }
  }

  connectedCallback() {
    window.addEventListener('pointerdown', this._onWindowPointerDown)
    this.render()
  }

  disconnectedCallback() {
    this.closeFullscreen(false, true)
    window.removeEventListener('pointerdown', this._onWindowPointerDown)
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
    window.addEventListener('resize', this._handleResize)
    this.pushFullscreenHistoryState()
    this.updateFullscreenUi()
    this.render()
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
    window.removeEventListener('resize', this._handleResize)
    unlockPageScroll()

    if (shouldSkipHistory) {
      this.clearFullscreenHistoryState()
    } else {
      this.removeFullscreenHistoryState()
    }

    if (shouldUpdate) {
      this.updateFullscreenUi()
      if (this.isConnected) {
        this.render()
      }
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
    if (!this._base || !this._fullscreenButton) {
      return
    }

    this._base.classList.toggle('is-fullscreen', this._fullscreen)
    this._fullscreenButton.innerHTML = this._fullscreen
      ? getExitFullscreenIcon()
      : getEnterFullscreenIcon()
    this._fullscreenButton.setAttribute(
      'aria-label',
      this._fullscreen ? 'Exit fullscreen visualization' : 'Open fullscreen visualization',
    )
  }

  getSvg() {
    return this._svg
  }

  getLegend() {
    return this._legend
  }

  showTooltip(category, event, pinned = false) {
    if (pinned && this._tooltipPinnedKey === category.key && !this._tooltip.hidden) {
      this.hideTooltip(true)
      return
    }

    this._tooltip.replaceChildren(createTooltipTable(category, this._config.periods))
    this._tooltip.hidden = false
    this._tooltipPinnedKey = pinned ? category.key : null
    this.positionTooltip(event)
    setHighlight(category.key, this._shapeRegistry, this._legendRegistry)
  }

  positionTooltip(event) {
    if (this._tooltip.hidden) {
      return
    }

    const margin = 8
    const offset = 12
    const rect = this._tooltip.getBoundingClientRect()
    let left = event.clientX + offset
    let top = event.clientY + offset

    if (left + rect.width + margin > window.innerWidth) {
      left = event.clientX - rect.width - offset
    }
    if (top + rect.height + margin > window.innerHeight) {
      top = event.clientY - rect.height - offset
    }

    this._tooltip.style.left = `${Math.max(margin, left)}px`
    this._tooltip.style.top = `${Math.max(margin, top)}px`
  }

  hideTooltip(force = false) {
    if (this._tooltipPinnedKey && !force) {
      return
    }

    this._tooltip.hidden = true
    this._tooltipPinnedKey = null
    setHighlight(null, this._shapeRegistry, this._legendRegistry)
  }

  render() {
    const config = this._config
    this._shapeRegistry = new Map()
    this._legendRegistry = new Map()
    this._tooltip.hidden = true
    this._tooltipPinnedKey = null
    this._svg.replaceChildren()

    const hasData = config.towers.length === 2 &&
      (config.towers[0].categories.length || config.towers[1].categories.length)
    this._svg.hidden = !hasData
    this._legend.hidden = !hasData

    if (!hasData) {
      this._legend.replaceChildren()
      return
    }

    this._svg.setAttribute('aria-label', config.label)
    const portraitFullscreen = this._fullscreen && window.innerHeight > window.innerWidth
    const layout = config.orientation === 'horizontal'
      ? {
          orientation: 'horizontal',
          viewWidth: 1000,
          viewHeight: 390,
          start: 42,
          end: 958,
          seam: 195,
          breadth: 112,
          margin: 24,
        }
      : portraitFullscreen
        ? {
            orientation: 'vertical',
            viewWidth: 460,
            viewHeight: 640,
            start: 34,
            end: 610,
            seam: 230,
            breadth: 140,
            margin: 10,
          }
        : {
            orientation: 'vertical',
            viewWidth: 1000,
            viewHeight: 640,
            start: 44,
            end: 590,
            seam: 500,
            breadth: 300,
            margin: 24,
          }

    const maximumBreadth = (layout.seam - layout.margin) / config.tearThreshold
    layout.breadth = Math.max(28, Math.min(layout.breadth, maximumBreadth))
    layout.maxProtrusion = Math.max(
      8,
      layout.seam - layout.breadth - layout.margin,
    )

    this._svg.setAttribute('viewBox', `0 0 ${layout.viewWidth} ${layout.viewHeight}`)

    const defs = createSvgElement('defs')
    const categories = []
    for (let towerIndex = 0; towerIndex < config.towers.length; towerIndex++) {
      for (let categoryIndex = 0; categoryIndex < config.towers[towerIndex].categories.length; categoryIndex++) {
        categories.push(config.towers[towerIndex].categories[categoryIndex])
      }
    }

    for (let i = 0; i < categories.length; i++) {
      const patternId = `hatch-${escapeKey(categories[i].key)}-${i}`
      categories[i]._patternId = patternId
      defs.append(addPattern(this._svg, patternId, categories[i].color))
    }
    this._svg.append(defs)

    const towerTotals = []
    for (let i = 0; i < config.towers.length; i++) {
      const categoryValues = []
      for (let j = 0; j < config.towers[i].categories.length; j++) {
        categoryValues.push(categoryCurrent(config.towers[i].categories[j]))
      }
      towerTotals.push(sum(categoryValues))
    }

    const scale = (layout.end - layout.start) / Math.max(1, towerTotals[0], towerTotals[1])

    if (layout.orientation === 'vertical') {
      this.renderVertical(config, layout, scale)
    } else {
      this.renderHorizontal(config, layout, scale)
    }

    renderLegend(
      this._legend,
      config.towers,
      this._shapeRegistry,
      this._legendRegistry,
      {
        show: (category, event, pinned = false) => {
          this.showTooltip(category, event, pinned)
        },
        move: (event) => {
          if (!this._tooltip.hidden) {
            this.positionTooltip(event)
          }
        },
        hide: () => {
          this.hideTooltip()
        },
      },
    )
  }

  renderVertical(config, layout, scale) {
    for (let towerIndex = 0; towerIndex < 2; towerIndex++) {
      const tower = config.towers[towerIndex]
      const side = towerIndex === 0 ? 'left' : 'right'
      const x = side === 'left' ? layout.seam - layout.breadth : layout.seam
      let y = layout.start

      drawTowerLabel(
        this._svg,
        tower,
        side === 'left' ? layout.seam - layout.breadth / 2 : layout.seam + layout.breadth / 2,
        24,
        'middle',
      )

      for (let i = 0; i < tower.categories.length; i++) {
        const category = tower.categories[i]
        const current = categoryCurrent(category)
        const previous = category.previous === undefined && !category.subcategories.length
          ? undefined
          : categoryPrevious(category)

        if (current <= 1e-9) {
          continue
        }

        const height = Math.max(3, current * scale)
        const geometry = {
          x,
          y,
          width: layout.breadth,
          height,
        }

        this.drawCategory(category, geometry, side, config, layout, current, previous)
        y += height
      }
    }
  }

  renderHorizontal(config, layout, scale) {
    for (let towerIndex = 0; towerIndex < 2; towerIndex++) {
      const tower = config.towers[towerIndex]
      const side = towerIndex === 0 ? 'top' : 'bottom'
      const y = side === 'top' ? layout.seam - layout.breadth : layout.seam
      let x = layout.start

      drawTowerLabel(
        this._svg,
        tower,
        14,
        side === 'top' ? layout.seam - layout.breadth / 2 + 5 : layout.seam + layout.breadth / 2 + 5,
        'start',
      )

      for (let i = 0; i < tower.categories.length; i++) {
        const category = tower.categories[i]
        const current = categoryCurrent(category)
        const previous = category.previous === undefined && !category.subcategories.length
          ? undefined
          : categoryPrevious(category)

        if (current <= 1e-9) {
          continue
        }

        const width = Math.max(3, current * scale)
        const geometry = {
          x,
          y,
          width,
          height: layout.breadth,
        }

        this.drawCategory(category, geometry, side, config, layout, current, previous)
        x += width
      }
    }
  }

  drawCategory(category, geometry, side, config, layout, current, previous) {
    const baseOpacity = category.dimmed ? .62 : 1
    const base = appendRect(this._svg, {
      x: geometry.x,
      y: geometry.y,
      width: geometry.width,
      height: geometry.height,
      fill: category.color,
      stroke: 'none',
      opacity: baseOpacity,
    }, category.key, this._shapeRegistry)
    base.dataset.baseOpacity = String(baseOpacity)

    if (category.subcategories.length) {
      drawSubcategories(this._svg, {
        category,
        geometry,
        orientation: layout.orientation,
        side,
        compare: config.compare,
        tearThreshold: config.tearThreshold,
        maxProtrusion: layout.maxProtrusion,
        patternId: category._patternId,
        registry: this._shapeRegistry,
      })
    } else {
      drawComparison(this._svg, {
        category,
        geometry,
        orientation: layout.orientation,
        side,
        current,
        previous,
        compare: config.compare,
        tearThreshold: config.tearThreshold,
        maxProtrusion: layout.maxProtrusion,
        patternId: category._patternId,
        registry: this._shapeRegistry,
      })
    }

    drawCategoryOutline(this._svg, geometry, layout.orientation, category.dimmed)
    drawCategoryLabel(this._svg, category, geometry)

    const shapes = this._shapeRegistry.get(category.key) || []
    for (let i = 0; i < shapes.length; i++) {
      shapes[i].dataset.categoryKey = category.key
      shapes[i].addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'touch') {
          this.showTooltip(category, event)
        }
      })
      shapes[i].addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'touch' && !this._tooltip.hidden) {
          this.positionTooltip(event)
        }
      })
      shapes[i].addEventListener('pointerleave', (event) => {
        if (event.pointerType === 'touch') {
          return
        }
        const relatedTarget = event.relatedTarget
        if (relatedTarget instanceof Element && relatedTarget.dataset.categoryKey === category.key) {
          return
        }
        this.hideTooltip()
      })
      shapes[i].addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'touch') {
          this.showTooltip(category, event, true)
        }
      })
    }
  }
}
