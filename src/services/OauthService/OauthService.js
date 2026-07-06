/**
 * @typedef {Object} OauthTokenResponse
 * @property {string} access_token
 * @property {string=} refresh_token
 * @property {number|string=} expires_in
 * @property {string=} token_type
 * @property {string=} scope
 * @property {string=} id_token
 */

import { OauthApi } from './OauthApi.js'
import { OauthStorage } from './OauthStorage.js'

const CODE_VERIFIER_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'

/**
 * @param {number} length
 * @returns {string}
 */
function generateRandomString(length) {
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
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)

  return base64UrlEncode(digest)
}

/**
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
function base64UrlEncode(buffer) {
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

export class OauthService {
  /**
   * @param {{ oauthApi: OauthApi, authStorage: OauthStorage }} params
   */
  constructor(params) {
    this.oauthApi = params.oauthApi
    this.authStorage = params.authStorage
  }

  /**
   * Use PKCE (Proof Key for Code Exchange) to initiate the OAuth2 login flow:
   * - Generate code verifier (random string)
   * - Generate code challenge (compute SHA256 from verifier and base64-url-encode it)
   * - Store code verifier on client
   * - Redirect browser to authorization URI with code challenge and redirect URI (pointing to a page in our app) in query params
   *
   * @param {string=} path
   * @param {Object.<string, unknown>=} authorizeParams
   * @returns {Promise<void>}
   */
  async initiateLogin(path, authorizeParams = {}) {
    const currentPath = path || window.location.pathname + window.location.search

    const codeVerifier = generateRandomString(128)
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    this.authStorage.setCodeVerifier(codeVerifier)

    const authorizeUrl = this.oauthApi.createAuthorizeUrl({
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      state: currentPath,
      ...authorizeParams,
    })

    if (!currentPath.includes('redirect')) {
      this.authStorage.setLastLocation(currentPath)
    }

    window.location.href = authorizeUrl
  }

  logOut() {
    this.authStorage.reset()
  }

  /**
   * After user logs in, auth server redirects browser to our redirect URI with authorization code in query params
   * Some page/component in our app is responsible for extracting the code from URL and calling this method
   * - Read previously stored code verifier
   * - Send authorization code + code verifier to auth server
   *   - Auth server computes code challenge from code verifier and compares it to the one sent to it during login initiation
   *   - This ensures that the entity that initiated the login is the same as the one completing it (no man-in-the-middle)
   * - Auth server responds with access token and refresh token
   *
   * @param {string} code
   * @param {Object.<string, unknown>=} tokenParams
   * @returns {Promise<void>}
   */
  async getAccessTokenByCode(code, tokenParams = {}) {
    try {
      const response = await this.oauthApi.exchangeCodeForToken({
        code,
        code_verifier: this.authStorage.getCodeVerifier(),
        ...tokenParams,
      })

      const tokenData = response.data
      this.storeTokenData(tokenData)
    } catch (error) {
      this.authStorage.reset()
      throw new Error(`Couldn't log in: ${error && error.message ? error.message : error}`)
    }
  }

  /**
   * Exchange refresh token for a new refresh token and access token pair
   * Access token stores user's permissions that are not checked by the backend (backend trusts what's in the access token)
   * Limited lifetime of access token provided the backend with an opportunity to re-check user's permissions periodically
   * This provides balance between security and performance
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

      const tokenData = response.data
      this.storeTokenData(tokenData)
    } catch (error) {
      console.log('Refresh token expired')
      this.authStorage.setRefreshToken('')
      throw error
    }
  }

  /**
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

    if (tokenData.expires_in) {
      const expirationDate = new Date(
        Date.now() + Number(tokenData.expires_in) * 1000,
      )
      this.authStorage.setExpirationDate(expirationDate)
    }

    this.authStorage.setLoggedIn(Boolean(tokenData.access_token || this.authStorage.getAccessToken()))
  }
}
