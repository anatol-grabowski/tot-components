import { RequestService } from '../RequestService/RequestService.js'

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
 * @property {string=} code_challenge_method
 * @property {string=} code_challenge
 * @property {string=} state
 * @property {string=} client_id
 * @property {string=} redirect_uri
 * @property {string=} response_type
 * @property {string|string[]=} scope
 */

/**
 * @typedef {Object} OauthApiParams
 * @property {string=} baseUrl
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

/**
 * @param {string} baseUrl
 * @param {string} endpoint
 * @returns {string}
 */
function _resolveEndpoint(baseUrl, endpoint) {
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint
  }

  if (!baseUrl) {
    return endpoint
  }

  const normalizedBaseUrl = baseUrl.replace(/\/$/, '')
  const normalizedEndpoint = endpoint.startsWith('/')
    ? endpoint
    : `/${endpoint}`

  return `${normalizedBaseUrl}${normalizedEndpoint}`
}

/**
 * @param {Object.<string, unknown>} target
 * @param {Object.<string, unknown>} source
 */
function _assignDefined(target, source) {
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
 * @param {string} clientSecret
 * @param {boolean} useBasicAuth
 */
function _addClientSecret(body, clientSecret, useBasicAuth) {
  if (!clientSecret || useBasicAuth) {
    return
  }

  if (!body.client_secret) {
    body.client_secret = clientSecret
  }
}

/**
 * @param {string} clientId
 * @param {string} clientSecret
 * @returns {string}
 */
function _createBasicAuthHeader(clientId, clientSecret) {
  return btoa(`${clientId}:${clientSecret}`)
}

/**
 * @param {Object.<string, unknown>} params
 * @returns {URLSearchParams}
 */
function _createSearchParams(params) {
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
function _normalizeScope(scope) {
  return Array.isArray(scope) ? scope.join(' ') : scope
}


/**
 * @param {OauthApi} api
 * @param {Object.<string, unknown>} body
 * @returns {Promise<{ data: OauthTokenResponse, status: number, statusText: string, headers: Object.<string, unknown>, config: Object.<string, unknown>, request: Response, url: string }>}
 */
async function _requestToken(api, body) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  if (api.useBasicAuth && api.clientSecret) {
    headers.Authorization = `Basic ${_createBasicAuthHeader(api.clientId, api.clientSecret)}`
    delete body.client_secret
  }

  return await api.requestService.request({
    method: 'POST',
    url: _resolveEndpoint(api.baseUrl, api.tokenEndpoint),
    headers,
    data: _createSearchParams(body),
  })
}

export class OauthApi {
  /**
   * Creates a low-level OAuth HTTP helper.
   * Use it before OauthService: first create OauthApi with provider endpoints,
   * clientId, redirectUri, and optional scope, then pass it to OauthService.
   * Most apps should call OauthService methods instead of calling this class
   * directly, except when they need to build a custom authorize URL or perform a
   * raw token request.
   *
   * @param {OauthApiParams} params
   */
  constructor(params = {}) {
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
   * Returns the redirect URI that will be sent to the OAuth provider.
   * Use this for diagnostics or when a provider console needs the exact redirect
   * URI. It is used internally by createAuthorizeUrl(), exchangeCodeForToken(),
   * and refreshAccessToken().
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
   * Builds the provider authorization URL.
   * Use this after constructing OauthApi and before redirecting the browser.
   * OauthService.initiateLogin() calls it for PKCE code flow; pass
   * response_type: 'token' when a provider supports browser-only token flow.
   * The returned URL is not fetched with XHR; assign it to window.location.href.
   *
   * @param {Partial<OauthAuthorizeRequest>} request
   * @returns {string}
   */
  createAuthorizeUrl(request = {}) {
    const params = {
      client_id: this.clientId,
      redirect_uri: this.getRedirectUri(),
      response_type: 'code',
      code_challenge_method: 'S256',
      ...this.authorizeParams,
    }

    if (this.scope) {
      params.scope = _normalizeScope(this.scope)
    }

    _assignDefined(params, request)

    if (params.scope) {
      params.scope = _normalizeScope(params.scope)
    }

    const queryParams = _createSearchParams(params)

    return `${_resolveEndpoint(this.baseUrl, this.authorizeEndpoint)}?${queryParams.toString()}`
  }

  /**
   * Exchanges an authorization code for tokens.
   * Use this only after the browser returns from a code-flow login and you have
   * both the code and the original PKCE code_verifier. OauthService.completeCodeLogin()
   * wraps this and stores the token response, so most app code should use the
   * service method instead.
   *
   * @param {Partial<OauthTokenRequest> & Pick<OauthTokenRequest, 'code' | 'code_verifier'>} request
   * @returns {Promise<{ data: OauthTokenResponse, status: number, statusText: string, headers: Object.<string, unknown>, config: Object.<string, unknown>, request: Response, url: string }>}
   */
  async exchangeCodeForToken(request) {
    const body = {
      client_id: this.clientId,
      grant_type: 'authorization_code',
      redirect_uri: this.getRedirectUri(),
      ...this.tokenParams,
    }

    _assignDefined(body, request)
    _addClientSecret(body, this.clientSecret, this.useBasicAuth)

    return await _requestToken(this, body)
  }

  /**
   * Refreshes tokens using a stored refresh token.
   * Use this after login when hasValidAccessToken() is false but a refresh token
   * exists. OauthService.refreshToken() wraps this and stores the new tokens.
   * Browser-only implicit/token flows usually do not provide refresh tokens.
   *
   * @param {Partial<OauthRefreshTokenRequest> & Pick<OauthRefreshTokenRequest, 'refresh_token'>} request
   * @returns {Promise<{ data: OauthTokenResponse, status: number, statusText: string, headers: Object.<string, unknown>, config: Object.<string, unknown>, request: Response, url: string }>}
   */
  async refreshAccessToken(request) {
    const body = {
      client_id: this.clientId,
      grant_type: 'refresh_token',
      ...this.tokenParams,
    }

    _assignDefined(body, request)
    _addClientSecret(body, this.clientSecret, this.useBasicAuth)

    return await _requestToken(this, body)
  }

}
