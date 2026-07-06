import { RequestService } from '../RequestService.js'

/**
 * @typedef {Object.<string, unknown>} OauthExtraParams
 */

/**
 * @typedef {Object} OauthTokenRequest
 * @property {string} grant_type
 * @property {string} redirect_uri
 * @property {string} client_id
 * @property {string} code
 * @property {string} code_verifier
 */

/**
 * @typedef {Object} OauthRefreshTokenRequest
 * @property {string} grant_type
 * @property {string} refresh_token
 */

/**
 * @typedef {Object} OauthTokenResponse
 * @property {string} access_token
 * @property {string=} refresh_token
 * @property {number|string=} expires_in
 * @property {string=} token_type
 * @property {string=} scope
 * @property {string=} id_token
 */

/**
 * @typedef {Object} OauthAuthorizeRequest
 * @property {string} code_challenge_method
 * @property {string} code_challenge
 * @property {string} state
 * @property {string} client_id
 * @property {string} redirect_uri
 * @property {string} response_type
 * @property {string|string[]=} scope
 */

/**
 * @typedef {Object} OauthApiParams
 * @property {string} baseUrl
 * @property {string} clientId
 * @property {RequestService=} requestService
 * @property {string=} clientSecret
 * @property {string=} tokenEndpoint
 * @property {string=} authorizeEndpoint
 * @property {string=} redirectUri
 * @property {string|string[]=} scope
 * @property {OauthExtraParams=} authorizeParams
 * @property {OauthExtraParams=} tokenParams
 * @property {boolean=} useBasicAuth
 */

export class OauthApi {
  /**
   * @param {OauthApiParams} params
   */
  constructor(params) {
    this.baseUrl = params.baseUrl || ''
    this.clientId = params.clientId
    this.clientSecret = params.clientSecret || ''
    this.requestService = params.requestService || new RequestService()
    this.tokenEndpoint = params.tokenEndpoint || '/auth/oauth/token'
    this.authorizeEndpoint = params.authorizeEndpoint || '/auth/oauth/authorize'
    this.redirectUri = params.redirectUri || ''
    this.scope = params.scope || ''
    this.authorizeParams = params.authorizeParams || {}
    this.tokenParams = params.tokenParams || {}
    this.useBasicAuth = Boolean(params.useBasicAuth)
  }

  /**
   * Gets the redirect URI for OAuth callbacks
   *
   * @returns {string}
   */
  getRedirectUri() {
    if (this.redirectUri) {
      return this.redirectUri
    }

    return `${window.location.origin}/redirect`
  }

  /**
   * Creates the OAuth authorization URL with PKCE
   *
   * @param {Partial<OauthAuthorizeRequest> & Pick<OauthAuthorizeRequest, 'code_challenge' | 'state'>} request
   * @returns {string}
   */
  createAuthorizeUrl(request) {
    const params = {
      client_id: this.clientId,
      redirect_uri: this.getRedirectUri(),
      response_type: 'code',
      code_challenge_method: 'S256',
      ...this.authorizeParams,
    }

    if (this.scope) {
      params.scope = this.normalizeScope(this.scope)
    }

    this.assignDefined(params, request)

    if (params.scope) {
      params.scope = this.normalizeScope(params.scope)
    }

    const queryParams = this.createSearchParams(params)

    return `${this.resolveEndpoint(this.authorizeEndpoint)}?${queryParams.toString()}`
  }

  /**
   * Exchanges authorization code for access token
   * Returns the raw response without any modifications
   *
   * @param {Partial<OauthTokenRequest> & Pick<OauthTokenRequest, 'code' | 'code_verifier'>} request
   * @returns {Promise<{ data: OauthTokenResponse, status: number, statusText: string, headers: Object, config: Object, request: Response, url: string }>}
   */
  async exchangeCodeForToken(request) {
    const body = {
      client_id: this.clientId,
      grant_type: 'authorization_code',
      redirect_uri: this.getRedirectUri(),
      ...this.tokenParams,
    }

    this.assignDefined(body, request)
    this.addClientSecret(body)

    return await this.requestToken(body)
  }

  /**
   * Refreshes an access token using the refresh token
   * Returns the raw response without any modifications
   *
   * @param {Partial<OauthRefreshTokenRequest> & Pick<OauthRefreshTokenRequest, 'refresh_token'>} request
   * @returns {Promise<{ data: OauthTokenResponse, status: number, statusText: string, headers: Object, config: Object, request: Response, url: string }>}
   */
  async refreshAccessToken(request) {
    const body = {
      client_id: this.clientId,
      grant_type: 'refresh_token',
      ...this.tokenParams,
    }

    this.assignDefined(body, request)
    this.addClientSecret(body)

    return await this.requestToken(body)
  }

  /**
   * @param {Object.<string, unknown>} body
   * @returns {Promise<{ data: OauthTokenResponse, status: number, statusText: string, headers: Object, config: Object, request: Response, url: string }>}
   */
  async requestToken(body) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    if (this.useBasicAuth && this.clientSecret) {
      headers.Authorization = `Basic ${this.createBasicAuthHeader()}`
      delete body.client_secret
    }

    return await this.requestService.request({
      method: 'POST',
      url: this.resolveEndpoint(this.tokenEndpoint),
      headers,
      data: this.createSearchParams(body),
    })
  }

  /**
   * @param {string} endpoint
   * @returns {string}
   */
  resolveEndpoint(endpoint) {
    if (/^https?:\/\//i.test(endpoint)) {
      return endpoint
    }

    if (!this.baseUrl) {
      return endpoint
    }

    const baseUrl = this.baseUrl.replace(/\/$/, '')
    const normalizedEndpoint = endpoint.startsWith('/')
      ? endpoint
      : `/${endpoint}`

    return `${baseUrl}${normalizedEndpoint}`
  }

  /**
   * @param {Object.<string, unknown>} target
   * @param {Object.<string, unknown>} source
   */
  assignDefined(target, source) {
    for (const key in source || {}) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) {
        continue
      }

      if (source[key] !== undefined && source[key] !== null) {
        target[key] = source[key]
      }
    }
  }

  /**
   * @param {Object.<string, unknown>} body
   */
  addClientSecret(body) {
    if (!this.clientSecret || this.useBasicAuth) {
      return
    }

    if (!body.client_secret) {
      body.client_secret = this.clientSecret
    }
  }

  /**
   * @returns {string}
   */
  createBasicAuthHeader() {
    return btoa(`${this.clientId}:${this.clientSecret}`)
  }

  /**
   * @param {Object.<string, unknown>} params
   * @returns {URLSearchParams}
   */
  createSearchParams(params) {
    const searchParams = new URLSearchParams()

    for (const key in params) {
      if (!Object.prototype.hasOwnProperty.call(params, key)) {
        continue
      }

      const value = params[key]

      if (value === undefined || value === null || value === '') {
        continue
      }

      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          searchParams.append(key, value[i])
        }

        continue
      }

      searchParams.set(key, String(value))
    }

    return searchParams
  }

  /**
   * @param {string|string[]} scope
   * @returns {string}
   */
  normalizeScope(scope) {
    return Array.isArray(scope) ? scope.join(' ') : scope
  }
}
