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

  tot-dropdown {
    max-width: 100%;
  }
`

const systemThemeName = 'system'
const lightThemeName = 'light'
const darkThemeName = 'dark'

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
    ]
  }

  constructor() {
    super()
    this._themes = null
    this._systemMediaQuery = null
    this._handleDocumentThemeChange = event => this.handleDocumentThemeChange(event)
    this._handleSystemThemeChange = () => this.handleSystemThemeChange()
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

  connectedCallback() {
    document.addEventListener('tot-theme-change', this._handleDocumentThemeChange)
    this.addSystemThemeListener()
    this.render()
  }

  disconnectedCallback() {
    document.removeEventListener('tot-theme-change', this._handleDocumentThemeChange)
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

    root.innerHTML = `<style>${themeSelectorStyle}</style>
      <span class="selector" part="base">
        <tot-dropdown></tot-dropdown>
      </span>
    `

    const dropdown = root.querySelector('tot-dropdown')
    dropdown.label = this.getButtonLabel(currentTheme)
    dropdown.menuItems = this.getMenuItems(currentTheme)
    dropdown.addEventListener('select', event => this.handleSelect(event))
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

  handleSelect(event) {
    const theme = this.getThemeByName(event.detail.value)
    if (!theme) {
      return
    }

    this.applyTheme(theme)
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

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}
