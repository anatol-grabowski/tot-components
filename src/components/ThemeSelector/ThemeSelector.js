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
    --tot-dropdown-max-width: 16rem;
    --tot-dropdown-min-width: 9rem;
    --tot-menu-min-width: 9rem;

    display: inline-block;
    max-width: 100%;
  }

  .trigger-content,
  .theme-option {
    align-items: center;
    display: inline-flex;
    gap: var(--tot-spacing-2x-small, .25rem);
    min-width: 0;
  }

  .trigger-icon,
  .theme-option__icon,
  .item-check {
    align-items: center;
    color: currentColor;
    display: inline-flex;
    flex: 0 0 auto;
    justify-content: center;
    line-height: 1;
  }

  .trigger-icon,
  .theme-option__icon {
    height: 1.25em;
    width: 1.25em;
  }

  .trigger-icon svg,
  .theme-option__icon svg,
  .item-check svg {
    display: block;
    height: 100%;
    width: 100%;
  }

  .trigger-label,
  .theme-option__label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .trigger-label[hidden] {
    display: none;
  }

  .item-check {
    color: var(--tot-color-primary-600, #0284c7);
    height: 1rem;
    width: 1rem;
  }

  tot-menu-item[data-selected]::part(base) {
    background: var(--tot-color-neutral-100, #f1f5f9);
  }
`

const systemThemeName = 'system'
const lightThemeName = 'light'
const darkThemeName = 'dark'

const sizes = ['small', 'medium', 'large']
const variants = ['default', 'plain']

const defaultThemes = [
  { name: lightThemeName, label: 'Light', href: '' },
  { name: darkThemeName, label: 'Dark', href: '' },
  { name: systemThemeName, label: 'System', href: '' },
]

const checkIcon = `
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path d="m3.5 8.2 2.8 2.8 6.2-6.2"></path>
  </svg>
`

export class TotThemeSelector extends HTMLElement {
  static get observedAttributes() {
    return [
      'themes',
      'value',
      'label',
      'base-path',
      'link-id',
      'size',
      'variant',
    ]
  }

  constructor() {
    super()
    this._themes = null
    this._systemMediaQuery = null
    this._handleDocumentThemeChange = event => this.handleDocumentThemeChange(event)
    this._handleSystemThemeChange = () => this.handleSystemThemeChange()

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${themeSelectorStyle}</style>
      <tot-dropdown class="selector" part="base" hoist exportparts="panel">
        <tot-button class="trigger" slot="trigger" caret exportparts="base:trigger, caret:caret">
          <span class="trigger-content">
            <span class="trigger-icon" part="trigger-icon" aria-hidden="true"></span>
            <span class="trigger-label" part="trigger-label" hidden></span>
          </span>
        </tot-button>
        <tot-menu class="menu" aria-label="Theme options" exportparts="base:menu"></tot-menu>
      </tot-dropdown>
    `

    this._dropdown = root.querySelector('.selector')
    this._trigger = root.querySelector('.trigger')
    this._triggerIcon = root.querySelector('.trigger-icon')
    this._triggerLabel = root.querySelector('.trigger-label')
    this._menu = root.querySelector('.menu')
    this._dropdown.addEventListener('select', event => this.handleSelect(event))
  }

  get themes() {
    if (this._themes) {
      return cloneThemes(this._themes)
    }

    return parseThemes(this.getAttribute('themes'))
  }

  set themes(value) {
    this._themes = parseThemes(value)
    if (this.isConnected) {
      this.sync()
    }
  }

  get value() {
    return this.getAttribute('value') || this.detectCurrentTheme()
  }

  set value(value) {
    setNullableAttribute(this, 'value', value)
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  get basePath() {
    return this.getAttribute('base-path') || ''
  }

  set basePath(value) {
    setStringAttribute(this, 'base-path', value)
  }

  get linkId() {
    return this.getAttribute('link-id') || 'themeStylesheet'
  }

  set linkId(value) {
    setNullableAttribute(this, 'link-id', value)
  }

  get size() {
    return getSupportedValue(this.getAttribute('size'), sizes, 'medium')
  }

  set size(value) {
    this.setAttribute('size', getSupportedValue(value, sizes, 'medium'))
  }

  get variant() {
    return getSupportedValue(this.getAttribute('variant'), variants, 'default')
  }

  set variant(value) {
    this.setAttribute('variant', getSupportedValue(value, variants, 'default'))
  }

  connectedCallback() {
    document.addEventListener('tot-theme-change', this._handleDocumentThemeChange)
    this.addSystemThemeListener()
    this.sync()
  }

  disconnectedCallback() {
    document.removeEventListener('tot-theme-change', this._handleDocumentThemeChange)
    this.removeSystemThemeListener()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'themes') {
      this._themes = null
    }

    if (this.isConnected) {
      this.sync()
    }
  }

  focus(options) {
    this._trigger.focus(options)
  }

  blur() {
    this._trigger.blur()
  }

  getTrigger() {
    return this._trigger.getControl?.() || null
  }

  getItems() {
    const items = Array.from(this._menu.querySelectorAll('tot-menu-item'))
    const controls = []
    for (let i = 0; i < items.length; i++) {
      const control = items[i].getBase?.()
      if (control) {
        controls.push(control)
      }
    }
    return controls
  }

  sync() {
    const currentThemeName = this.value
    const currentTheme = this.getThemeByName(currentThemeName) || this.themes[0] || null
    const effectiveTheme = this.getEffectiveTheme(currentTheme)
    const accessibleLabel = this.getAccessibleLabel(currentTheme, effectiveTheme)

    this._trigger.setAttribute('size', this.size)
    this._trigger.setAttribute('variant', this.variant)
    this._triggerIcon.innerHTML = renderThemeIcon(currentThemeName, effectiveTheme?.name)
    this._triggerLabel.textContent = this.label
    this._triggerLabel.hidden = !this.label
    this.syncTriggerAccessibleLabel(accessibleLabel)
    this.syncMenu(currentThemeName)
  }

  syncTriggerAccessibleLabel(label) {
    this._trigger.setAttribute('title', label)
    const control = this._trigger.getControl?.()
    if (control) {
      control.setAttribute('aria-label', label)
      control.setAttribute('title', label)
      return
    }

    requestAnimationFrame(() => {
      if (!this.isConnected) {
        return
      }
      const nextControl = this._trigger.getControl?.()
      if (nextControl) {
        nextControl.setAttribute('aria-label', label)
        nextControl.setAttribute('title', label)
      }
    })
  }

  syncMenu(currentThemeName) {
    const themes = this.themes
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < themes.length; i++) {
      const theme = themes[i]
      const selected = theme.name === currentThemeName
      const item = document.createElement('tot-menu-item')
      item.value = theme.name
      item.label = theme.label
      item.toggleAttribute('data-selected', selected)
      item.setAttribute('exportparts', 'base:item')
      const itemControl = item.getBase?.()
      if (itemControl) {
        itemControl.setAttribute('role', 'menuitemradio')
        itemControl.setAttribute('aria-checked', selected ? 'true' : 'false')
      }

      const option = document.createElement('span')
      option.className = 'theme-option'
      const icon = document.createElement('span')
      icon.className = 'theme-option__icon'
      icon.setAttribute('part', 'item-icon')
      icon.setAttribute('aria-hidden', 'true')
      icon.innerHTML = renderThemeIcon(theme.name, theme.name === systemThemeName ? this.getSystemThemeName() : theme.name)
      const label = document.createElement('span')
      label.className = 'theme-option__label'
      label.setAttribute('part', 'item-label')
      label.textContent = theme.label
      option.append(icon, label)
      item.append(option)

      if (selected) {
        const check = document.createElement('span')
        check.className = 'item-check'
        check.slot = 'suffix'
        check.setAttribute('part', 'item-check')
        check.setAttribute('aria-hidden', 'true')
        check.innerHTML = checkIcon
        item.append(check)
      }

      fragment.append(item)
    }

    this._menu.replaceChildren(fragment)
  }

  handleSelect(event) {
    const theme = this.getThemeByName(String(event.detail?.value || ''))
    if (theme) {
      this.applyTheme(theme)
    }
  }

  getAccessibleLabel(theme, effectiveTheme) {
    const label = this.label || 'Theme'
    const themeLabel = theme ? theme.label : ''
    if (!themeLabel) {
      return label
    }

    const selectedLabel = label.toLocaleLowerCase() === themeLabel.toLocaleLowerCase()
      ? themeLabel
      : `${label}: ${themeLabel}`
    if (theme && theme.name === systemThemeName && effectiveTheme) {
      return `${selectedLabel} (${effectiveTheme.label})`
    }

    return selectedLabel
  }

  handleDocumentThemeChange(event) {
    if (event.detail && event.detail.source === this) {
      return
    }

    const themeName = event.detail && event.detail.theme ? String(event.detail.theme) : this.detectCurrentTheme()
    if (themeName && this.getThemeByName(themeName) && this.getAttribute('value') !== themeName) {
      this.setAttribute('value', themeName)
      return
    }

    this.sync()
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

    const valueChanged = this.getAttribute('value') !== theme.name
    if (valueChanged) {
      this.setAttribute('value', theme.name)
    } else if (this.isConnected) {
      this.sync()
    }

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
    const configured = this.basePath
    if (configured) {
      return configured.endsWith('/') ? configured : `${configured}/`
    }

    if (this.hasAttribute('base-path')) {
      return ''
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

function renderThemeIcon(themeName, effectiveThemeName = themeName) {
  if (themeName === systemThemeName) {
    return renderSystemIcon(effectiveThemeName)
  }

  if (themeName === darkThemeName) {
    return renderDarkIcon()
  }

  if (themeName === lightThemeName) {
    return renderLightIcon()
  }

  return renderGenericThemeIcon()
}

function renderLightIcon() {
  return `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="3.5"></circle>
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"></path>
    </svg>
  `
}

function renderDarkIcon() {
  return `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M20.2 15.2A8.6 8.6 0 0 1 8.8 3.8 8.6 8.6 0 1 0 20.2 15.2Z"></path>
    </svg>
  `
}

function renderSystemIcon(effectiveThemeName) {
  const badgeBackground = `
    <circle cx="18" cy="5.5" r="4.25" fill="var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff))" stroke="none"></circle>
  `
  const stateIcon = effectiveThemeName === darkThemeName
    ? `
      ${badgeBackground}
      <path d="M20.8 7.2A3.8 3.8 0 0 1 16.3 2.7a3.8 3.8 0 1 0 4.5 4.5Z"></path>
    `
    : `
      <circle cx="17.7" cy="6.2" r="5.9" fill="var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff))" stroke="none"></circle>
      <circle cx="17.7" cy="6.2" r="2.45"></circle>
      <path d="M17.7.2v1.65M17.7 10.55v1.65M11.55 6.2h1.65M22.2 6.2h1.65M13.35 1.85l1.18 1.18M20.87 9.37l1.18 1.18M22.05 1.85l-1.18 1.18M14.53 9.37l-1.18 1.18"></path>
    `

  return `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <rect x="2.5" y="6" width="15.5" height="11" rx="2"></rect>
      <path d="M6.5 21h7M10.25 17v4"></path>
      ${stateIcon}
    </svg>
  `
}

function renderGenericThemeIcon() {
  return `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8.5"></circle>
      <path d="M12 3.5a8.5 8.5 0 0 1 0 17Z"></path>
    </svg>
  `
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

function getSupportedValue(value, supportedValues, fallback) {
  const normalized = value || fallback
  for (let i = 0; i < supportedValues.length; i++) {
    if (supportedValues[i] === normalized) {
      return normalized
    }
  }
  return fallback
}

function toClassName(value) {
  return String(value)
    .trim()
    .toLocaleLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toLabel(value) {
  const text = String(value).replace(/[-_]+/g, ' ').trim()
  return text ? text.charAt(0).toLocaleUpperCase() + text.slice(1) : ''
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail,
  }))
}

function setStringAttribute(element, name, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}

function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined || value === '') {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}

function parseJson(value, fallback) {
  if (!value) {
    return fallback
  }

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}
