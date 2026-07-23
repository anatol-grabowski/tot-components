/** HTTP method names accepted by RequestService. */
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

/** Response body representation requested from fetch. */
export type RequestResponseType = 'arraybuffer' | 'blob' | 'json' | 'stream' | 'text'

/** Query-string value supported by RequestService. */
export type RequestParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | Record<string, unknown>
  | unknown[]

/** Request body supported by RequestService. Plain objects are JSON encoded. */
export type RequestData =
  | FormData
  | Blob
  | ArrayBuffer
  | URLSearchParams
  | string
  | Record<string, unknown>
  | null
  | undefined

/** Axios-like request configuration consumed by both request services. */
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

/** Axios-like response returned by RequestService. */
export interface RequestResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
  config: RequestConfig
  request: Response
  url: string
}

/** Error thrown for transport, parsing, timeout, and rejected-status failures. */
export interface RequestError<T = unknown> extends Error {
  code: string | null
  config: RequestConfig
  request: Response | null
  response?: RequestResponse<T>
  status: number | null
  /** Compatibility marker retained by the fetch-based implementation. */
  isAxiosError: true
  cause?: Error
  toJSON(): Record<string, unknown>
}

/**
 * Generic asynchronous HTTP request service.
 *
 * The concrete fetch implementation accepts Axios-like configuration, JSON
 * encodes plain-object bodies, rejects statuses outside its configured accepted
 * range, and returns Axios-like response/error objects. The generic declaration
 * intentionally does not prescribe constructor configuration.
 */
export class RequestService {
  defaultConfig: RequestConfig

  /** Sends one HTTP request and rejects with RequestError on failure. */
  request<T = unknown>(config?: RequestConfig): Promise<RequestResponse<T>>
}

/**
 * RequestService-compatible OAuth wrapper.
 *
 * It refreshes tokens nearing expiry, coalesces concurrent refreshes, adds the
 * current Authorization header, initiates login on authentication failure, and
 * retries eligible network/server failures. It is configured with compatible
 * OauthService, OauthStorage, and RequestService instances by the JavaScript
 * implementation; constructor details are intentionally outside this generic
 * service contract.
 */
export class RequestServiceAuthed {
  /** Sends one authenticated request using the same config/response shapes. */
  request<T = unknown>(config: RequestConfig): Promise<RequestResponse<T>>
}

export default RequestServiceAuthed
