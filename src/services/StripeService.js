import { RequestService } from './RequestService.js'

/**
 * @typedef {Object} StripeCheckoutSession
 * @property {string=} id Stripe Checkout session id.
 * @property {string=} sessionId Alternative Checkout session id property.
 * @property {string=} url Stripe-hosted Checkout URL, when your backend returns it.
 */

/**
 * @typedef {Object} StripePortalSession
 * @property {string=} url Stripe-hosted Billing Portal URL.
 */

/**
 * @typedef {Object} StripeRedirectResult
 * @property {boolean} isStripeRedirect
 * @property {'idle'|'processing'|'success'|'cancelled'|'error'} status
 * @property {string} sessionId
 * @property {string} paymentIntent
 * @property {string} setupIntent
 * @property {string} error
 * @property {Object.<string, string>} params
 */

/**
 * @typedef {Object} StripeServiceParams
 * @property {string=} publishableKey Stripe publishable key used by Stripe.js.
 * @property {string=} baseUrl Base URL for your app backend.
 * @property {string=} baseURL Alias for baseUrl.
 * @property {string=} checkoutEndpoint Backend endpoint that creates a Checkout session.
 * @property {string=} portalEndpoint Backend endpoint that creates a Billing Portal session.
 * @property {string=} stripeJsUrl URL of Stripe.js. Defaults to https://js.stripe.com/v3.
 * @property {Object=} stripeOptions Options passed as the second argument to Stripe().
 * @property {Object=} defaultCheckoutData Data sent with every createCheckoutSession() call.
 * @property {Object=} defaultPortalData Data sent with every createBillingPortalSession() call.
 * @property {RequestService=} requestService Optional preconfigured request service.
 */

const DEFAULT_STRIPE_JS_URL = 'https://js.stripe.com/v3'
const DEFAULT_CHECKOUT_ENDPOINT = '/api/stripe/checkout'
const DEFAULT_PORTAL_ENDPOINT = '/api/stripe/portal'
const STRIPE_SCRIPT_ATTRIBUTE = 'data-tot-stripe-js'

let _stripeScriptPromise = null

/**
 * @param {string|URL|Location|undefined} value
 * @returns {URL}
 */
function _toUrl(value) {
  if (value instanceof URL) {
    return value
  }

  if (typeof value === 'string') {
    return new URL(value, window.location.href)
  }

  return new URL(value?.href || window.location.href)
}

/**
 * @param {string} url
 * @returns {Promise<void>}
 */
function _loadStripeScript(url) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.reject(new Error('Stripe.js can only be loaded in a browser.'))
  }

  if (window.Stripe) {
    return Promise.resolve()
  }

  if (_stripeScriptPromise) {
    return _stripeScriptPromise
  }

  _stripeScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[${STRIPE_SCRIPT_ATTRIBUTE}]`) || document.querySelector(`script[src="${url}"]`)

    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Failed to load Stripe.js.')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = url
    script.async = true
    script.setAttribute(STRIPE_SCRIPT_ATTRIBUTE, '')
    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener('error', () => reject(new Error('Failed to load Stripe.js.')), { once: true })
    document.head.append(script)
  })

  return _stripeScriptPromise
}

/**
 * @param {Object|undefined} source
 * @returns {Object}
 */
function _copyObject(source) {
  return source && typeof source === 'object' && !Array.isArray(source)
    ? { ...source }
    : {}
}

/**
 * @param {Object} left
 * @param {Object} right
 * @returns {Object}
 */
function _mergeData(left, right) {
  return {
    ..._copyObject(left),
    ..._copyObject(right),
  }
}

/**
 * @param {string} name
 * @param {unknown} value
 */
function _requireValue(name, value) {
  if (value === null || value === undefined || value === '') {
    throw new Error(`${name} is required.`)
  }
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function _getCheckoutSessionId(value) {
  if (!value || typeof value !== 'object') {
    return ''
  }

  return String(value.id || value.sessionId || value.checkoutSessionId || '')
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function _getRedirectUrl(value) {
  if (!value || typeof value !== 'object') {
    return ''
  }

  return String(value.url || value.redirectUrl || value.location || '')
}

/**
 * @param {Object} params
 * @returns {Object}
 */
function _getCheckoutData(params) {
  return _mergeData(params.data, {
    priceId: params.priceId,
    planId: params.planId,
    lookupKey: params.lookupKey,
    successUrl: params.successUrl,
    cancelUrl: params.cancelUrl,
    customerEmail: params.customerEmail,
    clientReferenceId: params.clientReferenceId,
    metadata: params.metadata,
  })
}

/**
 * @param {Object} data
 * @returns {Object}
 */
function _removeUndefined(data) {
  const result = {}

  for (const key in data) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) {
      continue
    }

    if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
      result[key] = data[key]
    }
  }

  return result
}

/**
 * @param {URLSearchParams} params
 * @param {string} name
 * @returns {string}
 */
function _getParam(params, name) {
  return params.get(name) || ''
}

/**
 * @param {URLSearchParams} params
 * @returns {Object.<string, string>}
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
 * @param {URLSearchParams} params
 * @returns {'idle'|'processing'|'success'|'cancelled'|'error'}
 */
function _getResultStatus(params) {
  const explicitStatus = (
    _getParam(params, 'stripe_status') ||
    _getParam(params, 'payment_status') ||
    _getParam(params, 'checkout_status') ||
    _getParam(params, 'status') ||
    _getParam(params, 'payment') ||
    _getParam(params, 'checkout')
  ).toLowerCase()

  if (['success', 'succeeded', 'complete', 'completed', 'paid'].includes(explicitStatus)) {
    return 'success'
  }

  if (['cancelled', 'canceled', 'cancel'].includes(explicitStatus)) {
    return 'cancelled'
  }

  if (['processing', 'pending'].includes(explicitStatus)) {
    return 'processing'
  }

  if (['error', 'failed', 'failure'].includes(explicitStatus) || params.get('error')) {
    return 'error'
  }

  if (params.get('session_id') || params.get('checkout_session_id')) {
    return 'processing'
  }

  return 'idle'
}

/**
 * @param {URL} url
 * @returns {URLSearchParams}
 */
function _getCombinedParams(url) {
  const params = new URLSearchParams(url.search)
  const hashText = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash
  const hashParams = new URLSearchParams(hashText)
  const entries = Array.from(hashParams.entries())

  for (let i = 0; i < entries.length; i++) {
    if (!params.has(entries[i][0])) {
      params.set(entries[i][0], entries[i][1])
    }
  }

  return params
}

/**
 * @param {URL} url
 * @param {Array<string>} names
 * @returns {string}
 */
function _removeParams(url, names) {
  for (let i = 0; i < names.length; i++) {
    url.searchParams.delete(names[i])
  }

  if (url.hash) {
    const hashText = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash
    const hashParams = new URLSearchParams(hashText)

    for (let i = 0; i < names.length; i++) {
      hashParams.delete(names[i])
    }

    const hashString = hashParams.toString()
    url.hash = hashString ? `#${hashString}` : ''
  }

  return url.toString()
}

/**
 * @param {Object} stripeResult
 */
function _throwIfStripeRedirectError(stripeResult) {
  if (stripeResult && stripeResult.error) {
    throw new Error(stripeResult.error.message || 'Stripe redirect failed.')
  }
}

export class StripeService {
  /**
   * Creates a browser-side Stripe helper.
   * Use this once after you know your publishable key and backend endpoints. A
   * typical order is: create StripeService, call getResultFromUrl() on page load
   * to decide whether to show a success/cancelled/processing screen, call
   * redirectToCheckout() after the user selects a plan, and call
   * redirectToBillingPortal() from account settings. Keep all Stripe secret keys
   * on your backend; this service only uses publishable keys and backend-created
   * session URLs or ids.
   *
   * @param {StripeServiceParams} [params]
   */
  constructor(params = {}) {
    this.publishableKey = params.publishableKey || ''
    this.checkoutEndpoint = params.checkoutEndpoint || DEFAULT_CHECKOUT_ENDPOINT
    this.portalEndpoint = params.portalEndpoint || DEFAULT_PORTAL_ENDPOINT
    this.stripeJsUrl = params.stripeJsUrl || DEFAULT_STRIPE_JS_URL
    this.stripeOptions = _copyObject(params.stripeOptions)
    this.defaultCheckoutData = _copyObject(params.defaultCheckoutData)
    this.defaultPortalData = _copyObject(params.defaultPortalData)
    this.requestService = params.requestService || new RequestService({
      baseUrl: params.baseUrl || params.baseURL || '',
    })
    this.stripe = null
  }

  /**
   * Updates the publishable key used by later loadStripe() and
   * redirectToCheckout() calls.
   * Use this when your app loads configuration asynchronously before starting a
   * payment flow. Call it before loadStripe() when changing between projects or
   * test/live modes.
   *
   * @param {string} publishableKey
   */
  setPublishableKey(publishableKey) {
    if (this.publishableKey !== publishableKey) {
      this.stripe = null
    }

    this.publishableKey = publishableKey || ''
  }

  /**
   * Loads Stripe.js and returns a Stripe instance.
   * Use this only when you need direct access to Stripe.js. Most apps can skip
   * it and call redirectToCheckout(), which loads Stripe.js automatically when a
   * backend returns a Checkout session id. Call setPublishableKey() first if the
   * key was not provided in the constructor.
   *
   * @returns {Promise<Object>}
   */
  async loadStripe() {
    if (this.stripe) {
      return this.stripe
    }

    _requireValue('Stripe publishableKey', this.publishableKey)
    await _loadStripeScript(this.stripeJsUrl)

    if (!window.Stripe) {
      throw new Error('Stripe.js loaded, but window.Stripe is not available.')
    }

    this.stripe = window.Stripe(this.publishableKey, this.stripeOptions)
    return this.stripe
  }

  /**
   * Asks your backend to create a Checkout session.
   * Use this when you want to inspect the backend response yourself. In most
   * apps, call redirectToCheckout() instead. The backend endpoint should create
   * the Stripe Checkout session with your secret key and return either { url } or
   * { id } / { sessionId }.
   *
   * @param {Object} [data]
   * @param {Object} [requestConfig]
   * @returns {Promise<StripeCheckoutSession>}
   */
  async createCheckoutSession(data = {}, requestConfig = {}) {
    const response = await this.requestService.request({
      url: requestConfig.url || this.checkoutEndpoint,
      method: requestConfig.method || 'post',
      ...requestConfig,
      data: _removeUndefined(_mergeData(this.defaultCheckoutData, data)),
    })

    return response.data
  }

  /**
   * Starts the Checkout redirect flow.
   * Use this after a user selects a plan. You can pass a backend-created
   * sessionId, a hosted Checkout url, or plan data such as priceId/planId. When
   * plan data is provided, the service first calls createCheckoutSession(), then
   * redirects to the returned url or session id. Show a <tot-stripe> processing
   * screen after Stripe redirects back to your app.
   *
   * @param {Object} [params]
   * @returns {Promise<void>}
   */
  async redirectToCheckout(params = {}) {
    const directUrl = params.url || params.sessionUrl || params.checkoutUrl

    if (directUrl) {
      window.location.assign(directUrl)
      return
    }

    let sessionId = params.sessionId || ''
    let session = null

    if (!sessionId) {
      const data = _getCheckoutData(params)
      session = await this.createCheckoutSession(data, params.requestConfig || {})
      const sessionUrl = _getRedirectUrl(session)

      if (sessionUrl) {
        window.location.assign(sessionUrl)
        return
      }

      sessionId = _getCheckoutSessionId(session)
    }

    _requireValue('Stripe Checkout session id or url', sessionId)

    const stripe = await this.loadStripe()
    const result = await stripe.redirectToCheckout({
      sessionId,
      ...(params.stripeOptions || {}),
    })

    _throwIfStripeRedirectError(result)
  }

  /**
   * Asks your backend to create a Billing Portal session.
   * Use this when you want to inspect the portal response yourself. In most apps,
   * call redirectToBillingPortal() instead. The backend endpoint should create
   * the portal session with your secret key and return { url }.
   *
   * @param {Object} [data]
   * @param {Object} [requestConfig]
   * @returns {Promise<StripePortalSession>}
   */
  async createBillingPortalSession(data = {}, requestConfig = {}) {
    const response = await this.requestService.request({
      url: requestConfig.url || this.portalEndpoint,
      method: requestConfig.method || 'post',
      ...requestConfig,
      data: _removeUndefined(_mergeData(this.defaultPortalData, data)),
    })

    return response.data
  }

  /**
   * Redirects the user to Stripe Billing Portal.
   * Use this from account/subscription settings after the user is authenticated.
   * The backend should create the portal session for the current customer and
   * return { url }. The service does not need Stripe.js for portal redirects.
   *
   * @param {Object} [data]
   * @param {Object} [requestConfig]
   * @returns {Promise<void>}
   */
  async redirectToBillingPortal(data = {}, requestConfig = {}) {
    const session = await this.createBillingPortalSession(data, requestConfig)
    const url = _getRedirectUrl(session)

    _requireValue('Stripe Billing Portal url', url)
    window.location.assign(url)
  }

  /**
   * Reads Stripe checkout status from a redirect URL.
   * Use this once on page load before rendering payment UI. Pass window.location
   * or omit the argument. Configure your Stripe success/cancel URLs to include a
   * status parameter such as ?checkout=success, ?checkout=cancelled, and usually
   * {CHECKOUT_SESSION_ID} as session_id. The returned status can be shown with
   * <tot-stripe status="...">.
   *
   * @param {string|URL|Location=} location
   * @returns {StripeRedirectResult}
   */
  getResultFromUrl(location = window.location.href) {
    const url = _toUrl(location)
    const params = _getCombinedParams(url)
    const status = _getResultStatus(params)
    const sessionId = _getParam(params, 'session_id') || _getParam(params, 'checkout_session_id')
    const paymentIntent = _getParam(params, 'payment_intent')
    const setupIntent = _getParam(params, 'setup_intent')
    const error = _getParam(params, 'error_description') || _getParam(params, 'error')

    return {
      isStripeRedirect: status !== 'idle',
      status,
      sessionId,
      paymentIntent,
      setupIntent,
      error,
      params: _paramsToObject(params),
    }
  }

  /**
   * Removes common Stripe status parameters from the current URL.
   * Use this after getResultFromUrl() has been handled and your app has stored or
   * rendered the result. It keeps the user on the same page while preventing the
   * payment screen from reappearing on refresh. Pass replace: false to push a new
   * history entry instead of replacing the current one.
   *
   * @param {{ location?: string|URL|Location, replace?: boolean, params?: Array<string> }} [options]
   * @returns {string}
   */
  clearResultFromUrl(options = {}) {
    const names = options.params || [
      'checkout',
      'checkout_status',
      'payment',
      'payment_status',
      'stripe_status',
      'status',
      'session_id',
      'checkout_session_id',
      'payment_intent',
      'setup_intent',
      'error',
      'error_description',
    ]
    const url = _toUrl(options.location || window.location.href)
    const cleanUrl = _removeParams(url, names)

    if (typeof window !== 'undefined' && window.history) {
      if (options.replace === false) {
        window.history.pushState({}, '', cleanUrl)
      } else {
        window.history.replaceState({}, '', cleanUrl)
      }
    }

    return cleanUrl
  }
}
