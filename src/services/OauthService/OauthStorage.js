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

/**
 * @returns {AuthData}
 */
function _getDefaultAuthData() {
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
function _normalizeAuthData(data) {
  const defaultData = _getDefaultAuthData()

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
 * @param {string} value
 * @returns {string}
 */
function _decodeBase64Url(value) {
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
 * @param {string} token
 * @returns {TokenDetails|null}
 */
function _getTokenDetailsFromToken(token) {
  try {
    if (!token) {
      return null
    }

    const parts = token.split('.')

    if (parts.length < 2) {
      return null
    }

    return JSON.parse(_decodeBase64Url(parts[1]))
  } catch (error) {
    console.error('Failed to parse token details', error)
    return null
  }
}

/**
 * @returns {Storage}
 */
function _getDefaultStorage() {
  if (typeof localStorage !== 'undefined') {
    return localStorage
  }

  return _createMemoryStorage()
}

/**
 * @returns {Storage}
 */
function _createMemoryStorage() {
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


/**
 * @param {OauthStorage} authStorage
 * @param {(data: AuthData) => void} updater
 */
function _updateAuthData(authStorage, updater) {
  const data = authStorage.getAuthData()
  updater(data)
  authStorage.setAuthData(data)
}

export class OauthStorage {
  /**
   * Creates the storage adapter used by OauthService.
   * Use this before constructing OauthService. Pass a custom Storage object in
   * tests, embedded apps, or when tokens should be stored somewhere other than
   * localStorage. Application code normally reads tokens through these methods
   * after OauthService completes login.
   *
   * @param {{ storage?: Storage, authKey?: string, lastLocationKey?: string }=} params
   */
  constructor(params = {}) {
    this.storage = params.storage || _getDefaultStorage()
    this.authKey = params.authKey || AUTH_STORAGE_KEY
    this.lastLocationKey = params.lastLocationKey || LAST_LOCATION_KEY
  }

  /**
   * Reads the whole normalized OAuth state.
   * Use this after login, refresh, or logout when an app needs all token fields
   * at once. Prefer the specific getters below when only one token value is
   * needed.
   *
   * @returns {AuthData}
   */
  getAuthData() {
    const stored = this.storage.getItem(this.authKey)

    if (!stored) {
      return _getDefaultAuthData()
    }

    try {
      return _normalizeAuthData(JSON.parse(stored))
    } catch (error) {
      return _getDefaultAuthData()
    }
  }

  /**
   * Replaces the stored OAuth state.
   * Use this from OauthService after a token response is received, or in tests
   * to seed auth state before calling app code. Values are normalized before
   * storage.
   *
   * @param {Partial<AuthData>} data
   */
  setAuthData(data) {
    this.storage.setItem(this.authKey, JSON.stringify(_normalizeAuthData(data)))
  }

  /**
   * Reads the access token used for authenticated API calls.
   * Use this after OauthService completes login or refreshToken(). Check
   * OauthService.hasValidAccessToken() first when expiration matters.
   *
   * @returns {string}
   */
  getAccessToken() {
    return this.getAuthData().accessToken
  }

  /**
   * Stores an access token without changing other token fields.
   * Use this from auth helpers that receive a new access token independently;
   * most apps should let OauthService.storeTokenData() call it.
   *
   * @param {string} token
   */
  setAccessToken(token) {
    _updateAuthData(this, data => {
      data.accessToken = token || ''
    })
  }

  /**
   * Reads the refresh token used to renew access tokens.
   * Use this after code-flow login and before OauthService.refreshToken().
   * Browser-only token flows usually do not provide refresh tokens.
   *
   * @returns {string}
   */
  getRefreshToken() {
    return this.getAuthData().refreshToken
  }

  /**
   * Stores a refresh token without changing other token fields.
   * Use this from OauthService after token exchange or token refresh; app code
   * rarely needs to call it directly.
   *
   * @param {string} token
   */
  setRefreshToken(token) {
    _updateAuthData(this, data => {
      data.refreshToken = token || ''
    })
  }

  /**
   * Reads the ID token returned by OpenID Connect providers.
   * Use this after login when profile claims are embedded in the ID token. Use
   * getIdTokenDetails() to parse those claims safely.
   *
   * @returns {string}
   */
  getIdToken() {
    return this.getAuthData().idToken
  }

  /**
   * Stores an ID token without changing other token fields.
   * Use this from OauthService after an OpenID Connect token response.
   *
   * @param {string} token
   */
  setIdToken(token) {
    _updateAuthData(this, data => {
      data.idToken = token || ''
    })
  }

  /**
   * Reads the token type, usually Bearer.
   * Use this together with getAccessToken() when constructing Authorization
   * headers after login.
   *
   * @returns {string}
   */
  getTokenType() {
    return this.getAuthData().tokenType
  }

  /**
   * Stores the token type returned by the provider.
   * Use this from OauthService.storeTokenData(); app code normally should not
   * call it directly.
   *
   * @param {string} tokenType
   */
  setTokenType(tokenType) {
    _updateAuthData(this, data => {
      data.tokenType = tokenType || ''
    })
  }

  /**
   * Reads the granted OAuth scope string.
   * Use this after login to inspect which permissions the provider actually
   * granted.
   *
   * @returns {string}
   */
  getScope() {
    return this.getAuthData().scope
  }

  /**
   * Stores granted scopes.
   * Use this from OauthService.storeTokenData() after login or refresh.
   *
   * @param {string|string[]} scope
   */
  setScope(scope) {
    _updateAuthData(this, data => {
      data.scope = Array.isArray(scope) ? scope.join(' ') : scope || ''
    })
  }

  /**
   * Reads the access-token expiration date.
   * Use this before API calls, usually through OauthService.hasValidAccessToken(),
   * to decide whether refreshToken() should run first.
   *
   * @returns {Date|null}
   */
  getExpirationDate() {
    const dateString = this.getAuthData().expirationDate
    return dateString ? new Date(dateString) : null
  }

  /**
   * Stores the access-token expiration date.
   * Use this from OauthService.storeTokenData() after a provider returns
   * expires_in, or in tests to simulate an expired token.
   *
   * @param {Date|null} date
   */
  setExpirationDate(date) {
    _updateAuthData(this, data => {
      data.expirationDate = date ? date.toISOString() : null
    })
  }

  /**
   * Returns whether stored auth data currently represents a logged-in user.
   * Use this after app startup and after OauthService.completeLoginFromUrl() to
   * decide whether to show logged-in UI.
   *
   * @returns {boolean}
   */
  isLoggedIn() {
    return this.getAuthData().loggedIn
  }

  /**
   * Stores the logged-in flag.
   * Use this from OauthService.storeTokenData() or tests. App code usually calls
   * OauthService.logOut() instead of setting this to false directly.
   *
   * @param {boolean} loggedIn
   */
  setLoggedIn(loggedIn) {
    _updateAuthData(this, data => {
      data.loggedIn = Boolean(loggedIn)
    })
  }

  /**
   * Reads the PKCE code verifier saved before redirect.
   * Use this only during code-flow redirect handling, before exchanging the
   * authorization code. OauthService.completeCodeLogin() calls it automatically.
   *
   * @returns {string}
   */
  getCodeVerifier() {
    return this.getAuthData().codeVerifier
  }

  /**
   * Stores the PKCE code verifier before redirecting to the provider.
   * Use this only as part of code-flow login initiation. OauthService.initiateLogin()
   * calls it automatically.
   *
   * @param {string} verifier
   */
  setCodeVerifier(verifier) {
    _updateAuthData(this, data => {
      data.codeVerifier = verifier || ''
    })
  }

  /**
   * Reads the app location saved before OAuth redirect.
   * Use this after login completes to return the user to the page they started
   * from. OauthService stores it during login initiation.
   *
   * @returns {string}
   */
  getLastLocation() {
    return this.storage.getItem(this.lastLocationKey) || '/'
  }

  /**
   * Saves the app location before OAuth redirect.
   * Use this just before sending the browser to the provider. OauthService
   * handles it automatically for both code and token flows.
   *
   * @param {string} location
   */
  setLastLocation(location) {
    this.storage.setItem(this.lastLocationKey, location || '/')
  }

  /**
   * Removes only the saved pre-login location.
   * Use this after the app has restored navigation following a successful login.
   */
  clearLastLocation() {
    this.storage.removeItem(this.lastLocationKey)
  }

  /**
   * Resets token fields to their logged-out defaults but keeps storage keys.
   * Use this from OauthService.logOut() or after a failed login/refresh when the
   * current auth state should be forgotten.
   */
  reset() {
    this.setAuthData(_getDefaultAuthData())
  }

  /**
   * Removes auth data and the saved last location from storage.
   * Use this when an app wants to fully clear OAuth storage, for example during
   * account switching or test cleanup.
   */
  clear() {
    this.storage.removeItem(this.authKey)
    this.clearLastLocation()
  }

  /**
   * Parses claims from the current access token when it is a JWT.
   * Use this after login only for convenience display/debug information; do not
   * use unverified browser-parsed claims as a security decision.
   *
   * @returns {TokenDetails|null}
   */
  getTokenDetails() {
    return this.getTokenDetailsFromToken(this.getAccessToken())
  }

  /**
   * Parses claims from the current ID token when it is a JWT.
   * Use this after OpenID Connect login to read profile claims such as email or
   * name when the provider includes them.
   *
   * @returns {TokenDetails|null}
   */
  getIdTokenDetails() {
    return this.getTokenDetailsFromToken(this.getIdToken())
  }

  /**
   * Parses claims from an arbitrary JWT string.
   * Use this as a utility after receiving a JWT from login or refresh. It returns
   * null for opaque tokens or invalid JWTs.
   *
   * @param {string} token
   * @returns {TokenDetails|null}
   */
  getTokenDetailsFromToken(token) {
    return _getTokenDetailsFromToken(token)
  }

}