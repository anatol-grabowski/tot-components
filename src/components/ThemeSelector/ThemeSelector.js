const themeSelectorStyle = `
  :host {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .selector {
    display: inline-block;
    max-width: 100%;
  }

  .trigger {
    -webkit-appearance: none;
    align-items: center;
    appearance: none;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: inline-flex;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-button-font-size-medium, var(--tot-input-font-size-medium, .875rem));
    font-weight: var(--tot-font-weight-semibold, 500);
    gap: var(--tot-spacing-2x-small, .25rem);
    justify-content: center;
    line-height: 1;
    max-width: 100%;
    min-height: var(--tot-input-height-medium, 2.25rem);
    min-width: var(--tot-input-height-medium, 2.25rem);
    padding: 0 var(--tot-input-spacing-medium, .75rem);
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) color;
    white-space: nowrap;
  }

  .trigger:hover {
    background: var(--tot-input-background-color-hover, #f8fafc);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
    color: var(--tot-input-color-hover, #0f172a);
  }

  .trigger:active {
    background: var(--tot-color-neutral-100, #f1f5f9);
  }

  .trigger:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .trigger--small {
    font-size: var(--tot-button-font-size-small, var(--tot-input-font-size-small, .75rem));
    min-height: var(--tot-input-height-small, 1.75rem);
    min-width: var(--tot-input-height-small, 1.75rem);
    padding: 0 var(--tot-input-spacing-small, .5rem);
  }

  .trigger--large {
    font-size: var(--tot-button-font-size-large, var(--tot-input-font-size-large, 1rem));
    min-height: var(--tot-input-height-large, 2.75rem);
    min-width: var(--tot-input-height-large, 2.75rem);
    padding: 0 var(--tot-input-spacing-large, 1rem);
  }

  .trigger__label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .trigger__caret {
    color: currentColor;
    font-size: 1.1em;
    line-height: 1;
    position: relative;
    top: -.15em;
  }

  .panel {
    left: 0;
    max-width: min(var(--tot-theme-selector-panel-max-width, 16rem), calc(100vw - 1rem));
    min-width: var(--tot-theme-selector-panel-min-width, 9rem);
    position: fixed;
    top: 0;
    z-index: var(--tot-z-index-dropdown, 1000);
  }

  .panel[hidden] {
    display: none;
  }

  .menu {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
    border-radius: var(--tot-border-radius-medium, 4px);
    box-shadow: var(--tot-shadow-medium, var(--tot-shadow-small, 0 1px 2px rgb(15 23 42 / 8%)));
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-medium, .875rem);
    max-height: var(--tot-theme-selector-panel-max-height, none);
    overflow: auto;
    padding: var(--tot-spacing-2x-small, .25rem);
  }

  .item {
    -webkit-appearance: none;
    align-items: center;
    appearance: none;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: inherit;
    cursor: pointer;
    display: grid;
    font: inherit;
    gap: var(--tot-spacing-2x-small, .25rem);
    grid-template-columns: 1.25rem minmax(0, 1fr);
    line-height: var(--tot-line-height-normal, 1.4);
    min-height: var(--tot-input-height-small, 1.75rem);
    padding: var(--tot-spacing-2x-small, .25rem) var(--tot-spacing-x-small, .5rem);
    text-align: left;
    width: 100%;
  }

  .item:hover,
  .item:focus-visible {
    background: var(--tot-color-neutral-100, #f1f5f9);
    outline: 0;
  }

  .item__check {
    color: var(--tot-color-primary-600, #0284c7);
    text-align: center;
  }

  .item__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const systemThemeName = 'system'
const lightThemeName = 'light'
const darkThemeName = 'dark'

const sizes = ['small', 'medium', 'large']

const defaultThemes = [
  { name: lightThemeName, label: 'Light', href: '' },
  { name: darkThemeName, label: 'Dark', href: '' },
  { name: systemThemeName, label: 'System', href: '' },
]

export class TotThemeSelector extends HTMLElement {
  static get observedAttributes() {
    return [
      'themes',
      'value',
      'label',
      'base-path',
      'link-id',
      'size',
    ]
  }

  constructor() {
    super()
    this._themes = null
    this._systemMediaQuery = null
    this._open = false
    this._positionFrame = 0
    this._visualViewport = null
    this._handleDocumentThemeChange = event => this.handleDocumentThemeChange(event)
    this._handleSystemThemeChange = () => this.handleSystemThemeChange()
    this._handleDocumentPointerDown = event => this.handleDocumentPointerDown(event)
    this._handleWindowChange = () => this.schedulePanelPosition()
  }

  get themes() {
    if (this._themes) {
      return cloneThemes(this._themes)
    }

    return parseThemes(this.getAttribute('themes'))
  }

  set themes(value) {
    this._themes = parseThemes(value)
    this.render()
  }

  get value() {
    return this.getAttribute('value') || this.detectCurrentTheme()
  }

  set value(value) {
    if (value === null || value === undefined || value === '') {
      this.removeAttribute('value')
    } else {
      this.setAttribute('value', String(value))
    }
  }

  get linkId() {
    return this.getAttribute('link-id') || 'themeStylesheet'
  }

  get size() {
    return getSupportedValue(this.getAttribute('size'), sizes, 'medium')
  }

  set size(value) {
    this.setAttribute('size', getSupportedValue(value, sizes, 'medium'))
  }

  connectedCallback() {
    document.addEventListener('tot-theme-change', this._handleDocumentThemeChange)
    document.addEventListener('pointerdown', this._handleDocumentPointerDown, true)
    window.addEventListener('resize', this._handleWindowChange)
    document.addEventListener('scroll', this._handleWindowChange, true)
    this._visualViewport = window.visualViewport || null
    if (this._visualViewport) {
      this._visualViewport.addEventListener('resize', this._handleWindowChange)
      this._visualViewport.addEventListener('scroll', this._handleWindowChange)
    }
    this.addSystemThemeListener()
    this.render()
  }

  disconnectedCallback() {
    document.removeEventListener('tot-theme-change', this._handleDocumentThemeChange)
    document.removeEventListener('pointerdown', this._handleDocumentPointerDown, true)
    window.removeEventListener('resize', this._handleWindowChange)
    document.removeEventListener('scroll', this._handleWindowChange, true)
    if (this._visualViewport) {
      this._visualViewport.removeEventListener('resize', this._handleWindowChange)
      this._visualViewport.removeEventListener('scroll', this._handleWindowChange)
      this._visualViewport = null
    }
    cancelAnimationFrame(this._positionFrame)
    this.removeSystemThemeListener()
  }

  attributeChangedCallback(name) {
    if (name === 'themes') {
      this._themes = null
    }

    this.render()
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const currentTheme = this.value
    const buttonLabel = this.getButtonLabel(currentTheme)
    const size = this.size
    const items = this.getMenuItems(currentTheme)
    const itemsHtml = this.renderItems(items)

    root.innerHTML = `<style>${themeSelectorStyle}</style>
      <span class="selector" part="base">
        <button class="trigger trigger--${escapeAttribute(size)}" type="button" aria-haspopup="listbox" aria-expanded="${this._open ? 'true' : 'false'}" aria-label="Theme">
          <span class="trigger__label">${escapeHtml(buttonLabel)}</span>
          <span class="trigger__caret" aria-hidden="true">⌵</span>
        </button>
        <div class="panel" part="panel" ${this._open ? '' : 'hidden'}>
          <div class="menu" role="listbox" aria-label="Theme options">
            ${itemsHtml}
          </div>
        </div>
      </span>
    `

    const trigger = root.querySelector('.trigger')
    const panel = root.querySelector('.panel')
    const menu = root.querySelector('.menu')

    trigger.addEventListener('click', event => this.handleTriggerClick(event))
    trigger.addEventListener('keydown', event => this.handleTriggerKeyDown(event))
    panel.addEventListener('keydown', event => this.handlePanelKeyDown(event))
    menu.addEventListener('click', event => this.handleMenuClick(event))

    if (this._open) {
      this.schedulePanelPosition()
    }
  }

  renderItems(items) {
    let html = ''
    for (let i = 0; i < items.length; i++) {
      html += this.renderItem(items[i])
    }
    return html
  }

  renderItem(item) {
    return `<button class="item" type="button" role="option" aria-selected="${item.checked ? 'true' : 'false'}" data-value="${escapeAttribute(item.value)}">
      <span class="item__check" aria-hidden="true">${item.checked ? '✓' : ''}</span>
      <span class="item__label">${escapeHtml(item.label)}</span>
    </button>`
  }

  getMenuItems(currentTheme) {
    const themes = this.themes
    const items = []

    for (let i = 0; i < themes.length; i++) {
      items.push({
        value: themes[i].name,
        label: themes[i].label,
        checked: themes[i].name === currentTheme,
      })
    }

    return items
  }

  getButtonLabel(currentTheme) {
    const theme = this.getThemeByName(currentTheme) || this.themes[0]
    const icon = theme ? this.getThemeIcon(theme.name) : ''
    const prefix = this.getAttribute('label')

    if (prefix) {
      return icon ? `${prefix}: ${icon}` : prefix
    }

    return icon || (theme ? theme.label : '')
  }

  getThemeIcon(themeName) {
    const effectiveThemeName = themeName === systemThemeName ? this.getSystemThemeName() : themeName

    if (effectiveThemeName === darkThemeName) {
      return '🌙'
    }

    if (effectiveThemeName === lightThemeName) {
      return '☀️'
    }

    return '◐'
  }

  handleTriggerClick(event) {
    event.preventDefault()
    this.setOpen(!this._open)
  }

  handleTriggerKeyDown(event) {
    if (event.key === 'ArrowDown') {
      this.setOpen(true)
      this.focusFirstItem()
      event.preventDefault()
      return
    }

    if (event.key === 'Escape' && this._open) {
      this.setOpen(false)
      event.preventDefault()
    }
  }

  handlePanelKeyDown(event) {
    if (event.key !== 'Escape') {
      return
    }

    this.setOpen(false)
    this.focusTrigger()
    event.preventDefault()
  }

  handleMenuClick(event) {
    const target = event.target instanceof Element ? event.target : null
    const item = target ? target.closest('.item') : null
    if (!item) {
      return
    }

    const theme = this.getThemeByName(item.dataset.value)
    if (!theme) {
      return
    }

    this.applyTheme(theme)
    this.setOpen(false)
    this.focusTrigger()
  }

  handleDocumentPointerDown(event) {
    if (!this._open) {
      return
    }

    const path = event.composedPath()
    for (let i = 0; i < path.length; i++) {
      if (path[i] === this) {
        return
      }
    }

    this.setOpen(false)
  }

  setOpen(open) {
    if (this._open === open) {
      if (open) {
        this.schedulePanelPosition()
      }
      return
    }

    this._open = open
    this.render()
  }

  schedulePanelPosition() {
    cancelAnimationFrame(this._positionFrame)
    this._positionFrame = requestAnimationFrame(() => this.updatePanelPosition())
  }

  updatePanelPosition() {
    if (!this._open || !this.shadowRoot) {
      return
    }

    const trigger = this.shadowRoot.querySelector('.trigger')
    const panel = this.shadowRoot.querySelector('.panel')
    if (!trigger || !panel) {
      return
    }

    const triggerRect = trigger.getBoundingClientRect()
    if (!triggerRect.width && !triggerRect.height) {
      return
    }

    const viewport = getViewportRect()
    const margin = 8
    const gap = getCssLength(this, '--tot-dropdown-panel-gap', 4)
    const viewportWidth = Math.max(0, viewport.width - margin * 2)

    panel.style.maxWidth = `min(var(--tot-theme-selector-panel-max-width, 16rem), ${Math.floor(viewportWidth)}px)`
    panel.style.minWidth = `max(${Math.ceil(triggerRect.width)}px, var(--tot-theme-selector-panel-min-width, 9rem))`
    panel.style.setProperty('--tot-theme-selector-panel-max-height', 'none')

    const panelRect = panel.getBoundingClientRect()
    const panelWidth = Math.min(panelRect.width, viewportWidth)
    const belowSpace = Math.max(0, viewport.bottom - triggerRect.bottom - gap - margin)
    const aboveSpace = Math.max(0, triggerRect.top - viewport.top - gap - margin)
    const placeAbove = panelRect.height > belowSpace && aboveSpace > belowSpace
    const availableHeight = Math.max(0, placeAbove ? aboveSpace : belowSpace)
    const panelHeight = Math.min(panelRect.height, availableHeight)
    let left = triggerRect.left
    let top = placeAbove ? triggerRect.top - panelHeight - gap : triggerRect.bottom + gap

    if (left + panelWidth > viewport.right - margin) {
      left = triggerRect.right - panelWidth
    }

    left = clamp(left, viewport.left + margin, viewport.right - panelWidth - margin)
    top = clamp(top, viewport.top + margin, viewport.bottom - panelHeight - margin)

    panel.style.left = `${Math.round(left)}px`
    panel.style.top = `${Math.round(top)}px`
    panel.style.setProperty('--tot-theme-selector-panel-max-height', `${Math.floor(availableHeight)}px`)
  }

  focusTrigger() {
    this.shadowRoot?.querySelector('.trigger')?.focus()
  }

  focusFirstItem() {
    requestAnimationFrame(() => {
      this.shadowRoot?.querySelector('.item:not([disabled])')?.focus()
    })
  }

  handleDocumentThemeChange(event) {
    if (event.detail && event.detail.source === this) {
      return
    }

    const themeName = event.detail && event.detail.theme ? String(event.detail.theme) : this.detectCurrentTheme()
    if (themeName && this.getAttribute('value') !== themeName) {
      this.setAttribute('value', themeName)
      return
    }

    this.render()
  }

  handleSystemThemeChange() {
    if (this.value !== systemThemeName) {
      return
    }

    const systemTheme = this.getThemeByName(systemThemeName)
    if (systemTheme) {
      this.applyTheme(systemTheme)
    }
  }

  applyTheme(theme) {
    const effectiveTheme = this.getEffectiveTheme(theme)
    const href = effectiveTheme ? this.getThemeHref(effectiveTheme) : ''
    const link = this.getThemeLink(true)

    if (link && href) {
      link.setAttribute('href', href)
    }

    if (effectiveTheme) {
      this.applyThemeClasses(effectiveTheme.name)
    }

    this.setAttribute('value', theme.name)

    const detail = {
      theme: theme.name,
      label: theme.label,
      effectiveTheme: effectiveTheme ? effectiveTheme.name : theme.name,
      effectiveLabel: effectiveTheme ? effectiveTheme.label : theme.label,
      href,
      source: this,
    }

    emit(this, 'theme-change', detail)
    document.dispatchEvent(new CustomEvent('tot-theme-change', {
      bubbles: true,
      detail,
    }))
  }

  applyThemeClasses(themeName) {
    const themes = this.themes
    const targets = [document.documentElement, document.body]

    for (let targetIndex = 0; targetIndex < targets.length; targetIndex++) {
      const target = targets[targetIndex]
      if (!target) {
        continue
      }

      for (let i = 0; i < themes.length; i++) {
        target.classList.toggle(`tot-theme-${toClassName(themes[i].name)}`, themes[i].name === themeName)
      }
    }
  }

  getEffectiveTheme(theme) {
    if (!theme) {
      return null
    }

    if (theme.name !== systemThemeName) {
      return theme
    }

    return this.getThemeByName(this.getSystemThemeName()) || this.getThemeByName(lightThemeName) || this.getThemeByName(darkThemeName)
  }

  getSystemThemeName() {
    const mediaQuery = this.getSystemMediaQuery()
    return mediaQuery && mediaQuery.matches ? darkThemeName : lightThemeName
  }

  getSystemMediaQuery() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return null
    }

    if (!this._systemMediaQuery) {
      this._systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    }

    return this._systemMediaQuery
  }

  addSystemThemeListener() {
    const mediaQuery = this.getSystemMediaQuery()
    if (!mediaQuery) {
      return
    }

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', this._handleSystemThemeChange)
      return
    }

    if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(this._handleSystemThemeChange)
    }
  }

  removeSystemThemeListener() {
    const mediaQuery = this._systemMediaQuery
    if (!mediaQuery) {
      return
    }

    if (typeof mediaQuery.removeEventListener === 'function') {
      mediaQuery.removeEventListener('change', this._handleSystemThemeChange)
      return
    }

    if (typeof mediaQuery.removeListener === 'function') {
      mediaQuery.removeListener(this._handleSystemThemeChange)
    }
  }

  getThemeByName(name) {
    const themes = this.themes
    for (let i = 0; i < themes.length; i++) {
      if (themes[i].name === name) {
        return themes[i]
      }
    }
    return null
  }

  getThemeHref(theme) {
    if (theme.href) {
      return theme.href
    }

    return `${this.getBasePath()}${theme.name}.css`
  }

  getBasePath() {
    const configured = this.getAttribute('base-path')
    if (configured !== null) {
      return configured.endsWith('/') || configured === '' ? configured : `${configured}/`
    }

    const link = this.getThemeLink(false)
    const href = link ? link.getAttribute('href') || '' : ''
    if (href) {
      const cleanHref = href.split('#')[0].split('?')[0]
      const slashIndex = cleanHref.lastIndexOf('/')
      if (slashIndex >= 0) {
        return cleanHref.slice(0, slashIndex + 1)
      }
    }

    return './themes/'
  }

  getThemeLink(create) {
    let link = document.getElementById(this.linkId)
    if (!link) {
      link = document.querySelector('link[rel~="stylesheet"][data-tot-theme]')
    }

    if (!link && create) {
      link = document.createElement('link')
      link.id = this.linkId
      link.rel = 'stylesheet'
      link.setAttribute('data-tot-theme', '')
      document.head.append(link)
    }

    return link
  }

  detectCurrentTheme() {
    const themes = this.themes
    const bodyClass = getThemeNameFromClasses(document.body, themes)
    if (bodyClass) {
      return bodyClass
    }

    const documentClass = getThemeNameFromClasses(document.documentElement, themes)
    if (documentClass) {
      return documentClass
    }

    const link = this.getThemeLink(false)
    const href = link ? link.getAttribute('href') || link.href || '' : ''
    const nameFromHref = getNameFromHref(href)
    if (nameFromHref) {
      for (let i = 0; i < themes.length; i++) {
        if (themes[i].name === nameFromHref) {
          return nameFromHref
        }
      }
    }

    return themes[0] ? themes[0].name : ''
  }
}

function parseThemes(value) {
  if (value === null || value === undefined || value === '') {
    return cloneThemes(defaultThemes)
  }

  let source = value
  if (typeof value === 'string') {
    source = parseJson(value, null)
    if (!source) {
      source = value.split(',')
    }
  }

  if (!Array.isArray(source)) {
    return cloneThemes(defaultThemes)
  }

  const themes = []
  for (let i = 0; i < source.length; i++) {
    const theme = normalizeTheme(source[i])
    if (theme) {
      themes.push(theme)
    }
  }

  return normalizeThemeList(themes.length > 0 ? themes : cloneThemes(defaultThemes))
}

function normalizeTheme(value) {
  if (typeof value === 'string') {
    const text = value.trim()
    if (!text) {
      return null
    }

    const isCssPath = /\.css(?:[?#].*)?$/i.test(text)
    const name = isCssPath ? getNameFromHref(text) : text
    return {
      name,
      label: toLabel(name),
      href: isCssPath ? text : '',
    }
  }

  if (!value || typeof value !== 'object') {
    return null
  }

  const href = String(value.href ?? value.path ?? value.url ?? '')
  const name = String(value.name ?? value.value ?? value.theme ?? value.id ?? getNameFromHref(href) ?? '').trim()
  if (!name) {
    return null
  }

  return {
    name,
    label: String(value.label ?? value.text ?? toLabel(name)),
    href,
  }
}

function normalizeThemeList(themes) {
  let hasLight = false
  let hasDark = false
  let hasSystem = false

  for (let i = 0; i < themes.length; i++) {
    hasLight = hasLight || themes[i].name === lightThemeName
    hasDark = hasDark || themes[i].name === darkThemeName
    hasSystem = hasSystem || themes[i].name === systemThemeName
  }

  if (hasLight && hasDark && !hasSystem) {
    themes.push({
      name: systemThemeName,
      label: 'System',
      href: '',
    })
  }

  return themes
}

function cloneThemes(themes) {
  const result = []
  for (let i = 0; i < themes.length; i++) {
    result.push({
      name: themes[i].name,
      label: themes[i].label,
      href: themes[i].href,
    })
  }
  return result
}

function getThemeNameFromClasses(element, themes) {
  if (!element) {
    return ''
  }

  for (let i = 0; i < themes.length; i++) {
    if (element.classList.contains(`tot-theme-${toClassName(themes[i].name)}`)) {
      return themes[i].name
    }
  }

  return ''
}

function getNameFromHref(href) {
  if (!href) {
    return ''
  }

  const cleanHref = String(href).split('#')[0].split('?')[0]
  const fileName = cleanHref.slice(cleanHref.lastIndexOf('/') + 1)
  return fileName.replace(/\.css$/i, '')
}

function getViewportRect() {
  const viewport = window.visualViewport
  if (!viewport) {
    return {
      left: 0,
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  return {
    left: viewport.offsetLeft,
    top: viewport.offsetTop,
    right: viewport.offsetLeft + viewport.width,
    bottom: viewport.offsetTop + viewport.height,
    width: viewport.width,
    height: viewport.height,
  }
}

function getCssLength(element, property, fallback) {
  const rawValue = getComputedStyle(element).getPropertyValue(property).trim()
  if (!rawValue) {
    return fallback
  }

  const numericValue = Number.parseFloat(rawValue)
  if (!Number.isFinite(numericValue)) {
    return fallback
  }

  if (rawValue.endsWith('rem')) {
    const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
    return Number.isFinite(rootFontSize) ? numericValue * rootFontSize : fallback
  }

  if (rawValue.endsWith('em')) {
    const fontSize = Number.parseFloat(getComputedStyle(element).fontSize)
    return Number.isFinite(fontSize) ? numericValue * fontSize : fallback
  }

  if (rawValue.endsWith('px')) {
    return numericValue
  }

  return fallback
}

function clamp(value, min, max) {
  if (max < min) {
    return min
  }

  return Math.min(Math.max(value, min), max)
}

function toLabel(value) {
  const words = String(value).replace(/[-_]+/g, ' ').trim()
  if (!words) {
    return ''
  }

  return words.replace(/\b\w/g, letter => letter.toLocaleUpperCase())
}

function toClassName(value) {
  return String(value).trim().replace(/[^a-z0-9_-]/gi, '-')
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

function getSupportedValue(value, supportedValues, fallback) {
  const normalizedValue = value || fallback
  for (let i = 0; i < supportedValues.length; i++) {
    if (supportedValues[i] === normalizedValue) {
      return normalizedValue
    }
  }
  return fallback
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
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

function escapeAttribute(value) {
  return String(value).replace(/[&<>"'`]/g, (match) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '`': '&#96;',
    }
    return replacements[match]
  })
}
