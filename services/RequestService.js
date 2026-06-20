export class RequestService {
  constructor(defaultConfig = {}) {
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

  async request(config = {}) {
    const mergedConfig = this.mergeConfig(config)
    const controller = typeof AbortController !== 'undefined'
      ? new AbortController()
      : null

    let timeoutId = null

    if (controller && mergedConfig.timeout > 0) {
      timeoutId = setTimeout(() => controller.abort(), mergedConfig.timeout)
    }

    const url = this.buildUrl(mergedConfig)
    const headers = this.buildHeaders(mergedConfig)
    const fetchOptions = {
      method: (mergedConfig.method || 'get').toUpperCase(),
      headers,
      credentials: mergedConfig.withCredentials ? 'include' : 'same-origin',
      signal: controller ? controller.signal : undefined,
    }

    if (!this.isBodylessMethod(fetchOptions.method)) {
      fetchOptions.body = this.buildBody(mergedConfig, headers)
    }

    let fetchResponse

    try {
      fetchResponse = await fetch(url, fetchOptions)
    } catch (error) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      throw this.createError({
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

    const response = await this.createResponse(fetchResponse, mergedConfig, url)

    if (!mergedConfig.validateStatus(response.status)) {
      throw this.createError({
        message: `Request failed with status code ${response.status}`,
        code: null,
        config: mergedConfig,
        request: fetchResponse,
        response,
      })
    }

    return response
  }

  mergeConfig(config) {
    return {
      ...this.defaultConfig,
      ...config,
      headers: {
        ...(this.defaultConfig.headers || {}),
        ...(config.headers || {}),
      },
      validateStatus: config.validateStatus || this.defaultConfig.validateStatus,
    }
  }

  buildUrl(config) {
    const baseUrl = config.baseURL || config.baseUrl || ''
    const rawUrl = config.url || ''

    let url = /^https?:\/\//i.test(rawUrl)
      ? rawUrl
      : `${baseUrl}${rawUrl}`

    if (config.params && typeof config.params === 'object') {
      const query = this.buildQuery(config.params)

      if (query) {
        url += url.includes('?') ? `&${query}` : `?${query}`
      }
    }

    return url
  }

  buildQuery(params) {
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

  buildHeaders(config) {
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

  buildBody(config, headers) {
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

  async createResponse(fetchResponse, config, requestUrl) {
    const responseHeaders = this.parseHeaders(fetchResponse.headers)
    const data = await this.parseBody(fetchResponse, config)

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

  async parseBody(fetchResponse, config) {
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
          throw this.createError({
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

  parseHeaders(headers) {
    const result = {}

    headers.forEach((value, key) => {
      result[key] = value
    })

    return result
  }

  isBodylessMethod(method) {
    return method === 'GET' || method === 'HEAD'
  }

  createError({ message, code, config, request, response, cause }) {
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
}