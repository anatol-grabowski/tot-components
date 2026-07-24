/** HTTP method names accepted by request-service implementations. */
export type RequestMethod =
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'delete'
  | 'get'
  | 'head'
  | 'options'
  | 'patch'
  | 'post'
  | 'put'

/** Response body representation requested from the transport. */
export type RequestResponseType = 'arraybuffer' | 'blob' | 'json' | 'stream' | 'text'

/** Query-string value supported by the generic request contract. */
export type RequestParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | Record<string, unknown>
  | unknown[]

/** Request body supported by the generic request contract. */
export type RequestData =
  | FormData
  | Blob
  | ArrayBuffer
  | URLSearchParams
  | string
  | Record<string, unknown>
  | null
  | undefined

/** Axios-like request configuration shared by request implementations. */
export interface RequestConfig {
  url?: string
  baseURL?: string
  baseUrl?: string
  method?: RequestMethod
  headers?: Record<string, string | number | boolean | null | undefined>
  params?: Record<string, RequestParamValue>
  data?: RequestData
  /** Timeout in milliseconds; `0` disables the timeout. */
  timeout?: number
  withCredentials?: boolean
  responseType?: RequestResponseType
  validateStatus?(status: number): boolean
}

/** Axios-like response returned by request implementations. */
export interface RequestResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
  config: RequestConfig
  request: Response
  url: string
}

/**
 * Transport error shape used by the fetch implementation and propagated by
 * wrappers when they do not replace the failure with another error.
 */
export interface RequestError<T = unknown> extends Error {
  code: string | null
  config: RequestConfig
  request: Response | null
  response?: RequestResponse<T>
  status: number | null
  isAxiosError: true
  cause?: Error
  toJSON(): Record<string, unknown>
}

/**
 * Generic asynchronous HTTP request contract.
 *
 * Current implementations:
 * - `RequestService.js` is the direct Fetch API transport. It merges optional
 *   defaults, serializes query values and plain-object bodies, parses the chosen
 *   response type, rejects statuses rejected by `validateStatus`, and exposes
 *   Axios-like response and `RequestError` objects.
 * - `RequestServiceAuthed.js` is an OAuth-aware wrapper around any compatible
 *   request service. It refreshes expiring tokens, coalesces concurrent refresh
 *   operations, adds an Authorization header, starts login on authentication
 *   failure, and retries eligible network/server failures. It may additionally
 *   reject with an authentication-flow error and may return an authentication
 *   error response after initiating login.
 *
 * Constructors, defaults, OAuth collaborators, retry state, and other public or
 * private implementation extensions are intentionally outside this structural
 * contract. Both implementations accept an omitted config object.
 */
export interface RequestService {
  /** Sends one HTTP request. */
  request<T = unknown>(config?: RequestConfig): Promise<RequestResponse<T>>
}

