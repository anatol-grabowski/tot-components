import { RequestService } from './RequestService.js'

const authRefreshWindowSeconds = 60
const defaultRetries = 3
const nonRetriableHttpStatuses = new Set([403, 404])

/**
 * @typedef {import('./RequestService.js').RequestConfig} RequestConfig
 */

/**
 * @typedef {import('./RequestService.js').RequestResponse} RequestResponse
 */

/**
 * @typedef {Object} OauthServiceLike
 * @property {(minSeconds?: number) => boolean=} hasValidAccessToken
 * @property {() => Promise<void>} refreshToken
 * @property {(path?: string) => Promise<void>} initiateLogin
 */

/**
 * @typedef {Object} OauthStorageLike
 * @property {() => string} getAccessToken
 * @property {() => string} getRefreshToken
 * @property {() => Date|null} getExpirationDate
 * @property {() => string=} getTokenType
 */

class AuthFlowError extends Error {
  /**
   * Marks an authentication refresh/login transition as terminal for this
   * request. Retrying while a browser redirect is starting would create loops.
   *
   * @param {string} message
   * @param {unknown} [cause]
   */
  constructor(message, cause) {
    super(message)
    this.name = 'AuthFlowError'
    this.code = 'ERR_AUTH_FLOW'
    this.cause = cause
  }
}

/**
 * Waits between retries using the original short linear backoff: 500 ms,
 * 1000 ms, then 1500 ms.
 *
 * @param {number} retry
 * @returns {Promise<void>}
 */
function waitForRetry(retry) {
  return new Promise(resolve => {
    setTimeout(resolve, 500 * retry)
  })
}

/**
 * @param {unknown} error
 * @returns {RequestResponse|undefined}
 */
function getErrorResponse(error) {
  return error && typeof error === 'object' && 'response' in error
    ? /** @type {{ response?: RequestResponse }} */ (error).response
    : undefined
}

/**
 * @param {unknown} data
 * @returns {string|number|undefined}
 */
function getResponseErrorCode(data) {
  if (!data || typeof data !== 'object') {
    return undefined
  }

  const errors = /** @type {{ errors?: Array<{ code?: string|number }> }} */ (data).errors
  return Array.isArray(errors) ? errors[0]?.code : undefined
}

/**
 * @param {unknown} data
 * @returns {boolean}
 */
function isClientError(data) {
  return Boolean(
    data &&
    typeof data === 'object' &&
    /** @type {{ type?: unknown }} */ (data).type === 'client_error',
  )
}

/**
 * @param {number|undefined} status
 * @param {string|number|undefined} errorCode
 * @returns {boolean}
 */
function isAuthenticationError(status, errorCode) {
  return status === 401 || (
    typeof errorCode === 'string' && /^(token|auth)/i.test(errorCode)
  )
}

/**
 * Authenticated RequestService wrapper for the repository's OauthService and
 * OauthStorage implementations.
 *
 * Assumptions and effects:
 * - Runs in a browser when login redirection is required.
 * - Refreshes tokens that expire within one minute before sending a request.
 * - Coalesces concurrent refreshes into one OAuth refresh operation.
 * - Adds an Authorization header without mutating the caller's config.
 * - Retries network and server failures up to three times with short backoff.
 * - Does not retry authentication redirects, client errors, 403, or 404.
 * - A 401/auth-token response starts login and is returned to the caller when
 *   the underlying RequestService supplied a response object.
 */
export class RequestServiceAuthed {
  /**
   * Creates an authenticated request wrapper.
   *
   * `requestService` may be a preconfigured RequestService with base URL,
   * headers, credentials, timeout, or status validation defaults. Passing the
   * same OauthService/OauthStorage instances used by the rest of the app keeps
   * refresh and login state consistent.
   *
   * @param {OauthServiceLike} oauthService
   * @param {OauthStorageLike} oauthStorage
   * @param {RequestService} [requestService]
   */
  constructor(oauthService, oauthStorage, requestService = new RequestService()) {
    this.oauthService = oauthService
    this.oauthStorage = oauthStorage
    this.requestService = requestService

    /** @type {Promise<void>|null} */
    this.refreshTokenPromise = null
    this.isLoginInProgress = false
  }

  /**
   * Sends one authenticated HTTP request.
   *
   * The method refreshes an expiring token first, adds the current access token,
   * and delegates transport/parsing to RequestService. Authentication failures
   * initiate login once. Other eligible failures are retried up to three times.
   *
   * @template T
   * @param {RequestConfig} config
   * @returns {Promise<RequestResponse & { data: T }>}
   */
  async request(config) {
    return await this._request(config, 0)
  }

  /**
   * @template T
   * @param {RequestConfig} config
   * @param {number} retry
   * @returns {Promise<RequestResponse & { data: T }>}
   */
  async _request(config, retry) {
    try {
      await this._ensureFreshToken()
      const response = await this.requestService.request(this._addAuthorizationHeader(config))
      return /** @type {RequestResponse & { data: T }} */ (response)
    } catch (error) {
      if (error instanceof AuthFlowError) {
        throw error
      }

      const response = getErrorResponse(error)
      const responseStatus = response?.status
      const responseData = response?.data
      const errorCode = getResponseErrorCode(responseData)

      if (isAuthenticationError(responseStatus, errorCode)) {
        await this._handleBadAuth()

        if (response) {
          return /** @type {RequestResponse & { data: T }} */ (response)
        }

        throw new AuthFlowError('Authentication is required', error)
      }

      if (isClientError(responseData) || (
        responseStatus !== undefined && nonRetriableHttpStatuses.has(responseStatus)
      )) {
        throw error
      }

      if (retry >= defaultRetries) {
        throw error
      }

      const nextRetry = retry + 1
      await waitForRetry(nextRetry)
      return await this._request(config, nextRetry)
    }
  }

  /**
   * @returns {boolean}
   */
  _shouldRefreshToken() {
    if (typeof this.oauthService.hasValidAccessToken === 'function') {
      return !this.oauthService.hasValidAccessToken(authRefreshWindowSeconds)
    }

    const expirationDate = this.oauthStorage.getExpirationDate()
    return !expirationDate || expirationDate.getTime() - Date.now() < authRefreshWindowSeconds * 1000
  }

  /**
   * Waits for or starts the one shared refresh operation.
   *
   * @returns {Promise<void>}
   */
  async _ensureFreshToken() {
    if (this.refreshTokenPromise) {
      await this.refreshTokenPromise
      return
    }

    if (!this._shouldRefreshToken()) {
      return
    }

    this.refreshTokenPromise = this._refreshToken()

    try {
      await this.refreshTokenPromise
    } finally {
      this.refreshTokenPromise = null
    }
  }

  /**
   * Refreshes the current access token or starts login when no refresh token is
   * available. Failures are converted to AuthFlowError so request retries cannot
   * race a redirect.
   *
   * @returns {Promise<void>}
   */
  async _refreshToken() {
    if (!this.oauthStorage.getRefreshToken()) {
      await this._handleBadAuth()
      throw new AuthFlowError('No OAuth refresh token is available')
    }

    try {
      await this.oauthService.refreshToken()
    } catch (error) {
      await this._handleBadAuth()
      throw new AuthFlowError('Failed to refresh the OAuth token', error)
    }
  }

  /**
   * Starts the OAuth login flow once. OauthService normally redirects the page,
   * so the guard intentionally remains set until the next page load.
   *
   * @returns {Promise<void>}
   */
  async _handleBadAuth() {
    if (this.isLoginInProgress) {
      return
    }

    this.isLoginInProgress = true
    const pathname = globalThis.location?.pathname || '/'
    await this.oauthService.initiateLogin(pathname === '/redirect' ? '/' : undefined)
  }

  /**
   * Returns a shallow config copy with the current OAuth Authorization header.
   * Caller-provided headers and config objects are never mutated.
   *
   * @param {RequestConfig} config
   * @returns {RequestConfig}
   */
  _addAuthorizationHeader(config) {
    const accessToken = this.oauthStorage.getAccessToken()

    if (!accessToken) {
      return config
    }

    const tokenType = typeof this.oauthStorage.getTokenType === 'function'
      ? this.oauthStorage.getTokenType() || 'Bearer'
      : 'Bearer'

    return {
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: `${tokenType} ${accessToken}`,
      },
    }
  }
}

export default RequestServiceAuthed
