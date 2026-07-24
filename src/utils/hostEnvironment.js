/**
 * @typedef {object} HostEnvironment
 * @property {boolean} isBrowserExtension
 * @property {boolean} isElectronApplication
 * @property {boolean} isWebBrowser
 * @property {boolean} isDesktop
 * @property {boolean} isChrome
 * @property {boolean} isMsEdge
 * @property {boolean} isFirefox
 * @property {boolean} isChromiumBrowser
 * @property {boolean} isMac
 * @property {boolean} isWindows
 * @property {boolean} isLinux
 * @property {boolean} isMobile
 * @property {boolean} isNativeApp
 * @property {boolean} isAndroid
 * @property {boolean} isIos
 */

function getGlobal(name) {
  return Reflect.get(globalThis, name)
}

function getNavigator() {
  return typeof globalThis.navigator === 'undefined' ? null : globalThis.navigator
}

function getPlatform(navigatorValue) {
  const userAgent = navigatorValue?.userAgent || ''
  const browserPlatform = navigatorValue?.platform || ''
  const processPlatform = getGlobal('process')?.platform || ''
  const platform = browserPlatform || processPlatform

  return {
    isMac: /Mac|iPhone|iPad|iPod/i.test(platform) || /Macintosh|Mac OS X/i.test(userAgent),
    isWindows: /Win/i.test(platform) || /Windows/i.test(userAgent),
    isLinux: /Linux/i.test(platform) && !/Android/i.test(userAgent),
  }
}

function checkBrowserExtension() {
  const chrome = getGlobal('chrome')
  const browser = getGlobal('browser')
  return chrome?.runtime?.id != null || browser?.runtime?.id != null
}

function checkElectronApplication(userAgent) {
  const processValue = getGlobal('process')
  return /Electron/i.test(userAgent) || processValue?.versions?.electron != null
}

function checkNativeApp() {
  const capacitor = getGlobal('Capacitor')
  if (typeof capacitor?.isNativePlatform !== 'function') return false

  try {
    return capacitor.isNativePlatform()
  } catch {
    return false
  }
}

/**
 * Detects the current browser, platform, and application host.
 *
 * @returns {HostEnvironment}
 */
function getHostEnvironment() {
  const navigatorValue = getNavigator()
  const userAgent = navigatorValue?.userAgent || ''
  const platform = navigatorValue?.platform || ''
  const hasBrowserRuntime = navigatorValue != null && !/^Node\.js\//i.test(userAgent)
  const isBrowserExtension = checkBrowserExtension()
  const isElectronApplication = checkElectronApplication(userAgent)
  const isNativeApp = checkNativeApp()
  const isAndroid = /Android/i.test(userAgent)
  const isIos = /iPhone|iPad|iPod/i.test(userAgent)
    || (/Mac/i.test(platform) && (navigatorValue?.maxTouchPoints || 0) > 1)
  const isMobile = isAndroid || isIos || /Mobile/i.test(userAgent)
  const isMsEdge = /Edg(?:A|iOS)?\//i.test(userAgent)
  const isOpera = /(?:OPR|Opera)\//i.test(userAgent)
  const isChrome = /(?:Chrome|CriOS)\//i.test(userAgent) && !isMsEdge && !isOpera
  const isFirefox = /(?:Firefox|FxiOS)\//i.test(userAgent)
  const isChromiumBrowser = isChrome
    || isMsEdge
    || isOpera
    || /Chromium\//i.test(userAgent)
    || getGlobal('chrome') != null

  return {
    isBrowserExtension,
    isElectronApplication,
    isWebBrowser: hasBrowserRuntime
      && !isBrowserExtension
      && !isElectronApplication
      && !isNativeApp,
    isDesktop: !isMobile,
    isChrome,
    isMsEdge,
    isFirefox,
    isChromiumBrowser,
    isMobile,
    isNativeApp,
    isAndroid,
    isIos,
    ...getPlatform(navigatorValue),
  }
}

/** Current host-environment flags captured when this module is loaded. */
export const host = getHostEnvironment()
