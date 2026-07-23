/**
 * @typedef {'DELETE'|'GET'|'HEAD'|'OPTIONS'|'PATCH'|'POST'|'PUT'|'delete'|'get'|'head'|'options'|'patch'|'post'|'put'} RequestMethod
 */

/**
 * @typedef {'arraybuffer'|'blob'|'json'|'stream'|'text'} RequestResponseType
 */

/**
 * @typedef {string|number|boolean|null|undefined|Date|Object|Array<unknown>} RequestParamValue
 */

/**
 * @typedef {Object.<string, RequestParamValue>} RequestParams
 */

/**
 * @typedef {Object.<string, string|number|boolean|null|undefined>} RequestHeaders
 */

/**
 * @typedef {FormData|Blob|ArrayBuffer|URLSearchParams|string|Object|null|undefined} RequestData
 */

/**
 * @callback RequestValidateStatus
 * @param {number} status
 * @returns {boolean}
 */

/**
 * @typedef {Object} RequestConfig
 * @property {string=} url
 * @property {string=} baseURL
 * @property {string=} baseUrl
 * @property {RequestMethod=} method
 * @property {RequestHeaders=} headers
 * @property {RequestParams=} params
 * @property {RequestData=} data
 * @property {number=} timeout
 * @property {boolean=} withCredentials
 * @property {RequestResponseType=} responseType
 * @property {RequestValidateStatus=} validateStatus
 */

/**
 * @typedef {Object} RequestResponse
 * @property {unknown} data
 * @property {number} status
 * @property {string} statusText
 * @property {Object.<string, string>} headers
 * @property {RequestConfig} config
 * @property {Response} request
 * @property {string} url
 */

/**
 * @typedef {Object} RequestErrorInput
 * @property {string} message
 * @property {string|null} code
 * @property {RequestConfig} config
 * @property {Response|null} request
 * @property {RequestResponse=} response
 * @property {Error=} cause
 */

/**
 * @typedef {Error & {
 *   code: string|null,
 *   config: RequestConfig,
 *   request: Response|null,
 *   response?: RequestResponse,
 *   status: number|null,
 *   isAxiosError: boolean,
 *   cause?: Error,
 *   toJSON: () => Object
 * }} RequestError
 */

/**
 * @param {RequestConfig} defaults
 * @param {RequestConfig} config
 * @returns {RequestConfig}
 */
function _mergeConfig(defaults, config) {
  return {
    ...defaults,
    ...config,
    headers: {
      ...(defaults.headers || {}),
      ...(config.headers || {}),
    },
    validateStatus: config.validateStatus || defaults.validateStatus,
  }
}

/**
 * @param {RequestConfig} config
 * @returns {string}
 */
function _buildUrl(config) {
  const baseUrl = config.baseURL || config.baseUrl || ''
  const rawUrl = config.url || ''

  let url = /^https?:\/\//i.test(rawUrl)
    ? rawUrl
    : `${baseUrl}${rawUrl}`

  if (config.params && typeof config.params === 'object') {
    const query = _buildQuery(config.params)

    if (query) {
      url += url.includes('?') ? `&${query}` : `?${query}`
    }
  }

  return url
}

/**
 * @param {RequestParams} params
 * @returns {string}
 */
function _buildQuery(params) {
  const parts = []

  for (const key in params) {
    if (!Object.prototype.hasOwnProperty.call(params, key)) {
      continue
    }

    const value = params[key]

    if (value === null || value === undefined) {
      continue
    }

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        parts.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(value[i])}`)
      }

      continue
    }

    if (value instanceof Date) {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.toISOString())}`)
      continue
    }

    if (typeof value === 'object') {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`)
      continue
    }

    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  }

  return parts.join('&')
}

/**
 * @param {RequestConfig} config
 * @returns {Headers}
 */
function _buildHeaders(config) {
  const headers = new Headers()

  for (const key in config.headers || {}) {
    if (!Object.prototype.hasOwnProperty.call(config.headers, key)) {
      continue
    }

    const value = config.headers[key]

    if (value !== null && value !== undefined) {
      headers.set(key, value)
    }
  }

  return headers
}

/**
 * @param {RequestConfig} config
 * @param {Headers} headers
 * @returns {RequestData}
 */
function _buildBody(config, headers) {
  const data = config.data

  if (
    data === null ||
    data === undefined ||
    data instanceof FormData ||
    data instanceof Blob ||
    data instanceof ArrayBuffer ||
    data instanceof URLSearchParams ||
    typeof data === 'string'
  ) {
    return data
  }

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  return JSON.stringify(data)
}

/**
 * @param {Response} fetchResponse
 * @param {RequestConfig} config
 * @param {string} requestUrl
 * @returns {Promise<RequestResponse>}
 */
async function _createResponse(fetchResponse, config, requestUrl) {
  const responseHeaders = _parseHeaders(fetchResponse.headers)
  const data = await _parseBody(fetchResponse, config)

  return {
    data,
    status: fetchResponse.status,
    statusText: fetchResponse.statusText,
    headers: responseHeaders,
    config,
    request: fetchResponse,
    url: requestUrl,
  }
}

/**
 * @param {Response} fetchResponse
 * @param {RequestConfig} config
 * @returns {Promise<unknown>}
 * @throws {RequestError}
 */
async function _parseBody(fetchResponse, config) {
  const responseType = config.responseType || 'json'
  const contentType = fetchResponse.headers.get('Content-Type') || ''

  if (responseType === 'stream') {
    return fetchResponse.body
  }

  if (responseType === 'arraybuffer') {
    return await fetchResponse.arrayBuffer()
  }

  if (responseType === 'blob') {
    return await fetchResponse.blob()
  }

  if (responseType === 'text') {
    return await fetchResponse.text()
  }

  const text = await fetchResponse.text()

  if (!text) {
    return null
  }

  if (responseType === 'json' || contentType.includes('application/json')) {
    try {
      return JSON.parse(text)
    } catch (error) {
      if (responseType === 'json') {
        throw _createError({
          message: 'Failed to parse JSON response',
          code: 'ERR_BAD_RESPONSE',
          config,
          request: fetchResponse,
          cause: error,
        })
      }
    }
  }

  return text
}

/**
 * @param {Headers} headers
 * @returns {Object.<string, string>}
 */
function _parseHeaders(headers) {
  const result = {}
  const entries = Array.from(headers.entries())

  for (let i = 0; i < entries.length; i++) {
    result[entries[i][0]] = entries[i][1]
  }

  return result
}

/**
 * @param {string} method
 * @returns {boolean}
 */
function _isBodylessMethod(method) {
  return method === 'GET' || method === 'HEAD'
}

/**
 * @param {RequestErrorInput} params
 * @returns {RequestError}
 */
function _createError({ message, code, config, request, response, cause }) {
  const error = new Error(message)

  error.name = 'RequestError'
  error.code = code
  error.config = config
  error.request = request
  error.response = response
  error.status = response ? response.status : null
  error.isAxiosError = true
  error.cause = cause

  error.toJSON = () => ({
    message: error.message,
    name: error.name,
    code: error.code,
    status: error.status,
    config: error.config,
  })

  return error
}

export class RequestService {
  /**
   * Creates a small fetch wrapper with Axios-like config and response objects.
   * Use this once near the edge of an app or service, optionally with defaults
   * such as baseUrl, headers, timeout, withCredentials, or validateStatus.
   * After construction, call request() for each HTTP call.
   *
   * @param {RequestConfig} [defaultConfig]
   */
  constructor(defaultConfig = {}) {
    /** @type {RequestConfig} */
    this.defaultConfig = {
      timeout: 0,
      headers: {},
      validateStatus: status => status >= 200 && status < 300,
      ...defaultConfig,
      headers: {
        ...(defaultConfig.headers || {}),
      },
    }
  }

  /**
   * Sends one HTTP request and returns an Axios-like response object.
   * This is the only method normally needed by application code. Call it after
   * constructing RequestService; pass per-request overrides such as url, method,
   * params, data, headers, responseType, timeout, or validateStatus. It throws a
   * RequestError for network errors, timeouts, invalid JSON in json mode, and
   * statuses rejected by validateStatus.
   *
   * @param {RequestConfig} [config]
   * @returns {Promise<RequestResponse>}
   * @throws {RequestError}
   */
  async request(config = {}) {
    const mergedConfig = _mergeConfig(this.defaultConfig, config)
    const controller = typeof AbortController !== 'undefined'
      ? new AbortController()
      : null

    let timeoutId = null

    if (controller && mergedConfig.timeout > 0) {
      timeoutId = setTimeout(() => controller.abort(), mergedConfig.timeout)
    }

    const url = _buildUrl(mergedConfig)
    const headers = _buildHeaders(mergedConfig)
    const fetchOptions = {
      method: (mergedConfig.method || 'get').toUpperCase(),
      headers,
      credentials: mergedConfig.withCredentials ? 'include' : 'same-origin',
      signal: controller ? controller.signal : undefined,
    }

    if (!_isBodylessMethod(fetchOptions.method)) {
      fetchOptions.body = _buildBody(mergedConfig, headers)
    }

    let fetchResponse

    try {
      fetchResponse = await fetch(url, fetchOptions)
    } catch (error) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      throw _createError({
        message: error && error.name === 'AbortError'
          ? `timeout of ${mergedConfig.timeout}ms exceeded`
          : error.message || 'Network Error',
        code: error && error.name === 'AbortError' ? 'ECONNABORTED' : 'ERR_NETWORK',
        config: mergedConfig,
        request: null,
        cause: error,
      })
    }

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const response = await _createResponse(fetchResponse, mergedConfig, url)

    if (!mergedConfig.validateStatus(response.status)) {
      throw _createError({
        message: `Request failed with status code ${response.status}`,
        code: null,
        config: mergedConfig,
        request: fetchResponse,
        response,
      })
    }

    return response
  }
}
