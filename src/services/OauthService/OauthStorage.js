/**
 * @typedef {Object} AuthData
 * @property {boolean} loggedIn
 * @property {string} accessToken
 * @property {string} refreshToken
 * @property {string} idToken
 * @property {string} tokenType
 * @property {string} scope
 * @property {string|null} expirationDate
 * @property {string} codeVerifier
 */

/**
 * @typedef {Object} TokenDetails
 * @property {string=} country
 * @property {string=} full_name
 * @property {string=} user_name
 * @property {string|string[]=} scope
 * @property {string=} iss
 * @property {number=} exp
 * @property {string[]=} authorities
 * @property {string=} email
 * @property {string=} jti
 * @property {string=} client_id
 * @property {string=} sub
 * @property {string=} aud
 * @property {string=} name
 * @property {string=} picture
 */

const AUTH_STORAGE_KEY = 'auth'
const LAST_LOCATION_KEY = 'last_location'

export class OauthStorage {
  /**
   * @param {{ storage?: Storage, authKey?: string, lastLocationKey?: string }=} params
   */
  constructor(params = {}) {
    this.storage = params.storage || this.getDefaultStorage()
    this.authKey = params.authKey || AUTH_STORAGE_KEY
    this.lastLocationKey = params.lastLocationKey || LAST_LOCATION_KEY
  }

  /**
   * @returns {AuthData}
   */
  getAuthData() {
    const stored = this.storage.getItem(this.authKey)

    if (!stored) {
      return this.getDefaultAuthData()
    }

    try {
      return this.normalizeAuthData(JSON.parse(stored))
    } catch (error) {
      return this.getDefaultAuthData()
    }
  }

  /**
   * @param {Partial<AuthData>} data
   */
  setAuthData(data) {
    this.storage.setItem(this.authKey, JSON.stringify(this.normalizeAuthData(data)))
  }

  /**
   * @returns {AuthData}
   */
  getDefaultAuthData() {
    return {
      loggedIn: false,
      accessToken: '',
      refreshToken: '',
      idToken: '',
      tokenType: '',
      scope: '',
      expirationDate: null,
      codeVerifier: '',
    }
  }

  /**
   * @param {Partial<AuthData>} data
   * @returns {AuthData}
   */
  normalizeAuthData(data) {
    const defaultData = this.getDefaultAuthData()

    return {
      ...defaultData,
      ...data,
      loggedIn: Boolean(data && data.loggedIn),
      accessToken: data && data.accessToken ? String(data.accessToken) : '',
      refreshToken: data && data.refreshToken ? String(data.refreshToken) : '',
      idToken: data && data.idToken ? String(data.idToken) : '',
      tokenType: data && data.tokenType ? String(data.tokenType) : '',
      scope: data && data.scope ? String(data.scope) : '',
      expirationDate: data && data.expirationDate ? String(data.expirationDate) : null,
      codeVerifier: data && data.codeVerifier ? String(data.codeVerifier) : '',
    }
  }

  /**
   * @param {(data: AuthData) => void} updater
   */
  updateAuthData(updater) {
    const data = this.getAuthData()
    updater(data)
    this.setAuthData(data)
  }

  /**
   * @returns {string}
   */
  getAccessToken() {
    return this.getAuthData().accessToken
  }

  /**
   * @param {string} token
   */
  setAccessToken(token) {
    this.updateAuthData(data => {
      data.accessToken = token || ''
    })
  }

  /**
   * @returns {string}
   */
  getRefreshToken() {
    return this.getAuthData().refreshToken
  }

  /**
   * @param {string} token
   */
  setRefreshToken(token) {
    this.updateAuthData(data => {
      data.refreshToken = token || ''
    })
  }

  /**
   * @returns {string}
   */
  getIdToken() {
    return this.getAuthData().idToken
  }

  /**
   * @param {string} token
   */
  setIdToken(token) {
    this.updateAuthData(data => {
      data.idToken = token || ''
    })
  }

  /**
   * @returns {string}
   */
  getTokenType() {
    return this.getAuthData().tokenType
  }

  /**
   * @param {string} tokenType
   */
  setTokenType(tokenType) {
    this.updateAuthData(data => {
      data.tokenType = tokenType || ''
    })
  }

  /**
   * @returns {string}
   */
  getScope() {
    return this.getAuthData().scope
  }

  /**
   * @param {string|string[]} scope
   */
  setScope(scope) {
    this.updateAuthData(data => {
      data.scope = Array.isArray(scope) ? scope.join(' ') : scope || ''
    })
  }

  /**
   * @returns {Date|null}
   */
  getExpirationDate() {
    const dateString = this.getAuthData().expirationDate
    return dateString ? new Date(dateString) : null
  }

  /**
   * @param {Date|null} date
   */
  setExpirationDate(date) {
    this.updateAuthData(data => {
      data.expirationDate = date ? date.toISOString() : null
    })
  }

  /**
   * @returns {boolean}
   */
  isLoggedIn() {
    return this.getAuthData().loggedIn
  }

  /**
   * @param {boolean} loggedIn
   */
  setLoggedIn(loggedIn) {
    this.updateAuthData(data => {
      data.loggedIn = Boolean(loggedIn)
    })
  }

  /**
   * @returns {string}
   */
  getCodeVerifier() {
    return this.getAuthData().codeVerifier
  }

  /**
   * @param {string} verifier
   */
  setCodeVerifier(verifier) {
    this.updateAuthData(data => {
      data.codeVerifier = verifier || ''
    })
  }

  /**
   * @returns {string}
   */
  getLastLocation() {
    return this.storage.getItem(this.lastLocationKey) || '/'
  }

  /**
   * @param {string} location
   */
  setLastLocation(location) {
    this.storage.setItem(this.lastLocationKey, location || '/')
  }

  clearLastLocation() {
    this.storage.removeItem(this.lastLocationKey)
  }

  reset() {
    this.setAuthData(this.getDefaultAuthData())
  }

  clear() {
    this.storage.removeItem(this.authKey)
    this.clearLastLocation()
  }

  /**
   * @returns {TokenDetails|null}
   */
  getTokenDetails() {
    return this.getTokenDetailsFromToken(this.getAccessToken())
  }

  /**
   * @returns {TokenDetails|null}
   */
  getIdTokenDetails() {
    return this.getTokenDetailsFromToken(this.getIdToken())
  }

  /**
   * @param {string} token
   * @returns {TokenDetails|null}
   */
  getTokenDetailsFromToken(token) {
    try {
      if (!token) {
        return null
      }

      const parts = token.split('.')

      if (parts.length < 2) {
        return null
      }

      return JSON.parse(this.decodeBase64Url(parts[1]))
    } catch (error) {
      console.error('Failed to parse token details', error)
      return null
    }
  }

  /**
   * @param {string} value
   * @returns {string}
   */
  decodeBase64Url(value) {
    const normalized = value
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(value.length / 4) * 4, '=')

    const decoded = atob(normalized)
    const bytes = []

    for (let i = 0; i < decoded.length; i++) {
      bytes.push(`%${decoded.charCodeAt(i).toString(16).padStart(2, '0')}`)
    }

    return decodeURIComponent(bytes.join(''))
  }

  /**
   * @returns {Storage}
   */
  getDefaultStorage() {
    if (typeof localStorage !== 'undefined') {
      return localStorage
    }

    return this.createMemoryStorage()
  }

  /**
   * @returns {Storage}
   */
  createMemoryStorage() {
    const store = {}

    return {
      get length() {
        return Object.keys(store).length
      },
      key(index) {
        return Object.keys(store)[index] || null
      },
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null
      },
      setItem(key, value) {
        store[key] = String(value)
      },
      removeItem(key) {
        delete store[key]
      },
      clear() {
        for (const key in store) {
          if (Object.prototype.hasOwnProperty.call(store, key)) {
            delete store[key]
          }
        }
      },
    }
  }
}
