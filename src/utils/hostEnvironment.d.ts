/** Browser, platform, and application-host flags. */
export interface HostEnvironment {
  readonly isBrowserExtension: boolean
  readonly isElectronApplication: boolean
  readonly isWebBrowser: boolean
  readonly isDesktop: boolean
  readonly isChrome: boolean
  readonly isMsEdge: boolean
  readonly isFirefox: boolean
  readonly isChromiumBrowser: boolean
  readonly isMac: boolean
  readonly isWindows: boolean
  readonly isLinux: boolean
  readonly isMobile: boolean
  readonly isNativeApp: boolean
  readonly isAndroid: boolean
  readonly isIos: boolean
}

/** Current host-environment flags captured when the module is loaded. */
export const host: HostEnvironment
