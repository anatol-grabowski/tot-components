/** Additional provider-specific OAuth request parameters. */
export type OauthExtraParams = Record<string, unknown>

/** Token payload returned by OAuth 2.0 and OpenID Connect providers. */
export interface OauthTokenResponse {
  access_token: string
  refresh_token?: string
  expires_in?: number | string
  token_type?: string
  scope?: string
  id_token?: string
  state?: string
  [key: string]: unknown
}

/** Result of inspecting and, when applicable, completing an OAuth redirect. */
export interface OauthLoginResult {
  handled: boolean
  flow: 'code' | 'token' | ''
  state: string
  tokenData: OauthTokenResponse | null
}

/** Persistent OAuth state normalized by an OAuth storage implementation. */
export interface OauthAuthData {
  loggedIn: boolean
  accessToken: string
  refreshToken: string
  idToken: string
  tokenType: string
  scope: string
  expirationDate: string | null
  codeVerifier: string
}

/** Convenience view of common unverified JWT claims. */
export interface OauthTokenDetails extends Record<string, unknown> {
  country?: string
  full_name?: string
  user_name?: string
  scope?: string | string[]
  iss?: string
  exp?: number
  authorities?: string[]
  email?: string
  jti?: string
  client_id?: string
  sub?: string
  aud?: string
  name?: string
  picture?: string
}

/** Minimal request response shape consumed by the OAuth API contract. */
export interface OauthRequestResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Record<string, unknown>
  config: Record<string, unknown>
  request: Response
  url: string
}

/**
 * Generic contracts for the repository's browser OAuth workflow.
 *
 * The current implementation is split into cooperating modules rather than
 * alternative public APIs:
 * - `OauthApi.js` builds provider authorization URLs and performs code exchange
 *   and refresh requests through a compatible request service.
 * - `OauthStorage.js` normalizes token state in browser `localStorage` when
 *   available, with a Storage-compatible in-memory fallback. Its JWT parsing is
 *   unverified and must not be used for authorization decisions.
 * - `OauthService.js` coordinates PKCE or token login, redirect completion,
 *   persistence, refresh, validity checks, and local logout in a browser.
 *
 * Provider endpoints, client configuration, storage keys, collaborator objects,
 * and constructors are implementation details. The three interfaces below
 * describe only the reusable structural roles applications may depend on.
 */

/** Low-level OAuth provider endpoint contract. */
export interface OauthApi {
  /** Returns the explicit redirect URI or the implementation's browser default. */
  getRedirectUri(): string

  /** Builds a provider authorization URL without navigating the browser. */
  createAuthorizeUrl(request?: {
    code_challenge_method?: string
    code_challenge?: string
    state?: string
    client_id?: string
    redirect_uri?: string
    response_type?: string
    scope?: string | string[]
    [key: string]: unknown
  }): string

  /** Exchanges an authorization code and PKCE verifier for tokens. */
  exchangeCodeForToken(request: {
    code: string
    code_verifier: string
    grant_type?: string
    redirect_uri?: string
    client_id?: string
    [key: string]: unknown
  }): Promise<OauthRequestResponse<OauthTokenResponse>>

  /** Exchanges a refresh token for a new token response. */
  refreshAccessToken(request: {
    refresh_token: string
    grant_type?: string
    [key: string]: unknown
  }): Promise<OauthRequestResponse<OauthTokenResponse>>
}

/** Persistent OAuth state contract. */
export interface OauthStorage {
  getAuthData(): OauthAuthData
  setAuthData(data: Partial<OauthAuthData>): void

  getAccessToken(): string
  setAccessToken(token: string): void
  getRefreshToken(): string
  setRefreshToken(token: string): void
  getIdToken(): string
  setIdToken(token: string): void
  getTokenType(): string
  setTokenType(tokenType: string): void
  getScope(): string
  setScope(scope: string | string[]): void
  getExpirationDate(): Date | null
  setExpirationDate(date: Date | null): void
  isLoggedIn(): boolean
  setLoggedIn(loggedIn: boolean): void
  getCodeVerifier(): string
  setCodeVerifier(verifier: string): void
  getLastLocation(): string
  setLastLocation(location: string): void
  clearLastLocation(): void

  /** Resets normalized authentication fields while retaining the storage keys. */
  reset(): void

  /** Removes both authentication data and the remembered pre-login location. */
  clear(): void

  getTokenDetails(): OauthTokenDetails | null
  getIdTokenDetails(): OauthTokenDetails | null
  getTokenDetailsFromToken(token: string): OauthTokenDetails | null
}

/** High-level OAuth browser workflow contract. */
export interface OauthService {
  /** Starts PKCE authorization-code login and navigates to the provider. */
  initiateLogin(path?: string, authorizeParams?: OauthExtraParams): Promise<void>

  /** Starts browser token/implicit login and navigates to the provider. */
  initiateTokenLogin(path?: string, authorizeParams?: OauthExtraParams): void

  /** Detects and completes a code or token redirect when present. */
  completeLoginFromUrl(
    location?: string | URL | Location,
    tokenParams?: OauthExtraParams,
  ): Promise<OauthLoginResult>

  /** Exchanges one authorization code and stores the resulting tokens. */
  completeCodeLogin(code: string, tokenParams?: OauthExtraParams): Promise<OauthTokenResponse>

  /** Stores a token redirect result represented as an object, hash, or search params. */
  completeTokenLogin(tokenData: OauthTokenResponse | URLSearchParams | string): void

  /** Backward-compatible alias for `completeCodeLogin()`. */
  getAccessTokenByCode(code: string, tokenParams?: OauthExtraParams): Promise<OauthTokenResponse>

  /** Refreshes and stores tokens using the currently stored refresh token. */
  refreshToken(tokenParams?: OauthExtraParams): Promise<void>

  /** Checks that an access token exists beyond the optional safety window. */
  hasValidAccessToken(minSeconds?: number): boolean

  /** Stores supported fields from a provider token response. */
  storeTokenData(tokenData: OauthTokenResponse): void

  /** Clears local OAuth state; it does not end a provider-side session. */
  logOut(): void
}


