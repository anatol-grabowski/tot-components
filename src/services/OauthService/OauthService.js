/**
 * @typedef {Object} OauthTokenResponse
 * @property {string} access_token
 * @property {string=} refresh_token
 * @property {number|string=} expires_in
 * @property {string=} token_type
 * @property {string=} scope
 * @property {string=} id_token
 * @property {string=} state
 */

/**
 * @typedef {Object} OauthLoginResult
 * @property {boolean} handled
 * @property {'code'|'token'|''} flow
 * @property {string} state
 * @property {OauthTokenResponse|null} tokenData
 */

import { OauthApi } from './OauthApi.js'
import { OauthStorage } from './OauthStorage.js'

const CODE_VERIFIER_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'

/**
 * @param {number} length
 * @returns {string}
 */
function _generateRandomString(length) {
  const bytes = new Uint8Array(length)

  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256)
    }
  }

  let result = ''

  for (let i = 0; i < bytes.length; i++) {
    result += CODE_VERIFIER_ALPHABET[bytes[i] % CODE_VERIFIER_ALPHABET.length]
  }

  return result
}

/**
 * @param {string} codeVerifier
 * @returns {Promise<string>}
 */
async function _generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)

  return _base64UrlEncode(digest)
}

/**
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
function _base64UrlEncode(buffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ''

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

/**
 * @returns {string}
 */
function _getCurrentPath() {
  return window.location.pathname + window.location.search
}

/**
 * @param {OauthStorage} authStorage
 * @param {string} currentPath
 */
function _rememberLastLocation(authStorage, currentPath) {
  if (!currentPath.includes('redirect')) {
    authStorage.setLastLocation(currentPath)
  }
}

/**
 * @param {string|URL|Location} value
 * @returns {URL}
 */
function _toUrl(value) {
  if (value instanceof URL) {
    return value
  }

  if (typeof value === 'string') {
    return new URL(value, window.location.href)
  }

  return new URL(value.href || window.location.href)
}

/**
 * @param {URLSearchParams} params
 * @returns {OauthTokenResponse}
 */
function _paramsToObject(params) {
  const result = {}
  const entries = Array.from(params.entries())

  for (let i = 0; i < entries.length; i++) {
    result[entries[i][0]] = entries[i][1]
  }

  return result
}

/**
 * @param {string} hash
 * @returns {URLSearchParams}
 */
function _getHashParams(hash) {
  const value = String(hash || '').replace(/^#/, '')
  return new URLSearchParams(value)
}

/**
 * @param {URLSearchParams} params
 */
function _throwIfOauthError(params) {
  const error = params.get('error')

  if (!error) {
    return
  }

  const description = params.get('error_description') || params.get('error_uri') || ''
  throw new Error(description ? `${error}: ${description}` : error)
}

/**
 * @param {OauthTokenResponse} tokenData
 * @returns {Date|null}
 */
function _getExpirationDate(tokenData) {
  if (!tokenData || !tokenData.expires_in) {
    return null
  }

  return new Date(Date.now() + Number(tokenData.expires_in) * 1000)
}

export class OauthService {
  /**
   * Creates the high-level OAuth workflow service.
   * Use this after constructing OauthApi and OauthStorage. The usual order is:
   * create OauthApi, create OauthStorage, create OauthService, call
   * completeLoginFromUrl() on page load, then call initiateLogin() or
   * initiateTokenLogin() from the login button, and logOut() from the logout
   * button.
   *
   * @param {{ oauthApi: OauthApi, authStorage: OauthStorage }} params
   */
  constructor(params) {
    this.oauthApi = params.oauthApi
    this.authStorage = params.authStorage
  }

  /**
   * Starts a PKCE authorization-code login.
   * Use this when the provider supports browser/public-client PKCE code exchange
   * or when your app has a backend/token proxy. The order is: call this from a
   * login button, let the provider redirect back with ?code=..., then call
   * completeLoginFromUrl() on app startup to exchange the code and store tokens.
   * Do not use this directly with providers that require a client_secret in the
   * browser; use initiateTokenLogin() or a backend instead.
   *
   * @param {string=} path
   * @param {Object.<string, unknown>=} authorizeParams
   * @returns {Promise<void>}
   */
  async initiateLogin(path, authorizeParams = {}) {
    const currentPath = path || _getCurrentPath()
    const codeVerifier = _generateRandomString(128)
    const codeChallenge = await _generateCodeChallenge(codeVerifier)

    this.authStorage.setCodeVerifier(codeVerifier)
    _rememberLastLocation(this.authStorage, currentPath)

    const authorizeUrl = this.oauthApi.createAuthorizeUrl({
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      state: currentPath,
      ...authorizeParams,
    })

    window.location.href = authorizeUrl
  }

  /**
   * Starts a browser-only token/implicit login.
   * Use this for static single-page apps when the provider supports returning an
   * access token directly to the browser and no client_secret can be stored. The
   * order is: call this from a login button, let the provider redirect back with
   * #access_token=..., then call completeLoginFromUrl() on app startup to store
   * the returned token. This flow usually has no refresh token.
   *
   * @param {string=} path
   * @param {Object.<string, unknown>=} authorizeParams
   */
  initiateTokenLogin(path, authorizeParams = {}) {
    const currentPath = path || _getCurrentPath()

    _rememberLastLocation(this.authStorage, currentPath)

    const authorizeUrl = this.oauthApi.createAuthorizeUrl({
      response_type: 'token',
      code_challenge_method: undefined,
      code_challenge: undefined,
      state: currentPath,
      ...authorizeParams,
    })

    window.location.href = authorizeUrl
  }

  /**
   * Completes whichever OAuth redirect is present in the current URL.
   * Call this once on app startup before rendering logged-in/logged-out UI. It
   * handles #access_token redirects from initiateTokenLogin() and ?code redirects
   * from initiateLogin(). It stores tokens when a login redirect is found and
   * returns handled: false when the page load is not an OAuth callback.
   *
   * @param {string|URL|Location=} location
   * @param {Object.<string, unknown>=} tokenParams
   * @returns {Promise<OauthLoginResult>}
   */
  async completeLoginFromUrl(location = window.location.href, tokenParams = {}) {
    const url = _toUrl(location)
    const hashParams = _getHashParams(url.hash)
    const searchParams = url.searchParams

    _throwIfOauthError(hashParams)
    _throwIfOauthError(searchParams)

    if (hashParams.get('access_token')) {
      const tokenData = _paramsToObject(hashParams)
      this.completeTokenLogin(tokenData)

      return {
        handled: true,
        flow: 'token',
        state: String(tokenData.state || ''),
        tokenData,
      }
    }

    const code = searchParams.get('code')

    if (code) {
      const tokenData = await this.completeCodeLogin(code, tokenParams)

      return {
        handled: true,
        flow: 'code',
        state: searchParams.get('state') || '',
        tokenData,
      }
    }

    return {
      handled: false,
      flow: '',
      state: '',
      tokenData: null,
    }
  }

  /**
   * Exchanges a redirect authorization code for tokens and stores them.
   * Use this after initiateLogin() only when you parse the ?code callback
   * yourself. Most apps should use completeLoginFromUrl() instead.
   *
   * @param {string} code
   * @param {Object.<string, unknown>=} tokenParams
   * @returns {Promise<OauthTokenResponse>}
   */
  async completeCodeLogin(code, tokenParams = {}) {
    try {
      const response = await this.oauthApi.exchangeCodeForToken({
        code,
        code_verifier: this.authStorage.getCodeVerifier(),
        ...tokenParams,
      })

      this.storeTokenData(response.data)
      return response.data
    } catch (error) {
      this.authStorage.reset()
      throw new Error(`Couldn't log in: ${error && error.message ? error.message : error}`)
    }
  }

  /**
   * Stores a browser-token redirect result.
   * Use this after initiateTokenLogin() only when you parse the #access_token
   * callback yourself. Most apps should use completeLoginFromUrl() instead.
   *
   * @param {OauthTokenResponse|URLSearchParams|string} tokenData
   */
  completeTokenLogin(tokenData) {
    if (typeof tokenData === 'string') {
      this.storeTokenData(_paramsToObject(_getHashParams(tokenData)))
      return
    }

    if (tokenData instanceof URLSearchParams) {
      this.storeTokenData(_paramsToObject(tokenData))
      return
    }

    this.storeTokenData(tokenData)
  }

  /**
   * Exchanges a redirect authorization code for tokens and stores them.
   * Kept for backward compatibility. New code should call completeCodeLogin() or
   * completeLoginFromUrl() so the login order is clearer.
   *
   * @param {string} code
   * @param {Object.<string, unknown>=} tokenParams
   * @returns {Promise<OauthTokenResponse>}
   */
  async getAccessTokenByCode(code, tokenParams = {}) {
    return await this.completeCodeLogin(code, tokenParams)
  }

  /**
   * Refreshes stored tokens using the stored refresh token.
   * Use this after login when hasValidAccessToken() returns false and
   * authStorage.getRefreshToken() is not empty. It stores the refreshed token
   * response. Do not use it for browser-only token flows that have no refresh
   * token.
   *
   * @param {Object.<string, unknown>=} tokenParams
   * @returns {Promise<void>}
   */
  async refreshToken(tokenParams = {}) {
    try {
      const response = await this.oauthApi.refreshAccessToken({
        refresh_token: this.authStorage.getRefreshToken(),
        ...tokenParams,
      })

      this.storeTokenData(response.data)
    } catch (error) {
      console.log('Refresh token expired')
      this.authStorage.setRefreshToken('')
      throw error
    }
  }

  /**
   * Checks whether a stored access token exists and is not close to expiration.
   * Use this before authenticated API calls. Pass minSeconds when you want a
   * safety window, for example 60 to refresh a token that will expire within the
   * next minute.
   *
   * @param {number=} minSeconds
   * @returns {boolean}
   */
  hasValidAccessToken(minSeconds = 0) {
    const accessToken = this.authStorage.getAccessToken()
    const expirationDate = this.authStorage.getExpirationDate()

    if (!accessToken || !expirationDate) {
      return false
    }

    return expirationDate.valueOf() - minSeconds * 1000 > Date.now()
  }

  /**
   * Stores a provider token response in OauthStorage.
   * Use this after a custom login/token flow returns the same fields as an OAuth
   * token response. In normal app order, completeLoginFromUrl(), completeCodeLogin(),
   * completeTokenLogin(), and refreshToken() call it automatically.
   *
   * @param {OauthTokenResponse} tokenData
   */
  storeTokenData(tokenData) {
    if (!tokenData) {
      return
    }

    if (tokenData.access_token) {
      this.authStorage.setAccessToken(tokenData.access_token)
    }

    if (tokenData.refresh_token) {
      this.authStorage.setRefreshToken(tokenData.refresh_token)
    }

    if (tokenData.id_token) {
      this.authStorage.setIdToken(tokenData.id_token)
    }

    if (tokenData.token_type) {
      this.authStorage.setTokenType(tokenData.token_type)
    }

    if (tokenData.scope) {
      this.authStorage.setScope(tokenData.scope)
    }

    const expirationDate = _getExpirationDate(tokenData)

    if (expirationDate) {
      this.authStorage.setExpirationDate(expirationDate)
    }

    this.authStorage.setLoggedIn(Boolean(tokenData.access_token || this.authStorage.getAccessToken()))
  }

  /**
   * Clears stored OAuth state.
   * Use this from a logout button after any login flow. This only clears local
   * app storage; provider-side sessions may still exist unless the app also
   * redirects to a provider logout endpoint.
   */
  logOut() {
    this.authStorage.reset()
  }
}
