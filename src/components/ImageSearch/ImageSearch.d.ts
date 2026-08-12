export type TotOpenverseImage = {
  id: string
  title?: string | null
  url?: string | null
  thumbnail?: string | null
  foreign_landing_url?: string | null
  creator?: string | null
  creator_url?: string | null
  license?: string | null
  license_version?: string | null
  license_url?: string | null
  provider?: string | null
  source?: string | null
  attribution?: string | null
  width?: number | null
  height?: number | null
  filesize?: number | null
  filetype?: string | null
  mature?: boolean
  category?: string | null
  indexed_on?: string | null
  detail_url?: string | null
  related_url?: string | null
  tags?: unknown[] | null
  [key: string]: unknown
}

export type TotImageSearchFilter = (image: TotOpenverseImage) => boolean

export type TotImageSearchSelectionDetail = {
  selected: TotOpenverseImage[]
}

export type TotImageSearchProgressDetail = {
  query: string
  page: number
}

export type TotImageSearchResultDetail = TotImageSearchProgressDetail & {
  count: number
  total: number
}

/**
 * `<tot-image-search>` - a responsive Openverse image search grid using
 * `<tot-input>`, `<tot-image-preview>`, `<tot-dialog>`, and `<tot-details>`.
 */
export type TotImageSearch = {
  props: {
    /** Search text. Editing the property or attribute starts a debounced search. @default '' */
    query: string

    /** Allows more than one selected image. @default false */
    multiple: boolean

    /**
     * Minimum tile width in pixels. Grid columns expand evenly to use the
     * available width. Pinch or Ctrl+wheel over the grid updates this value.
     * Values are clamped to at least 32. Pinch and Ctrl+wheel can enlarge
     * tiles to a single column regardless of container width. @default 144
     */
    minTileSize: number

    /** Number of Openverse results requested per page, clamped to 1–50. @default 20 */
    pageSize: number

    /** Optional synchronous metadata filter applied to every loaded result. @default null */
    filter: TotImageSearchFilter | null

    /** Currently loaded results after `filter` is applied. Read-only copy. */
    results: TotOpenverseImage[]

    /** Currently selected visible results. Read-only copy. */
    selected: TotOpenverseImage[]
  }

  methods: {
    search(query?: string): Promise<TotOpenverseImage[]>
    loadMore(): Promise<TotOpenverseImage[]>
    clearSelection(): void
    getInput(): HTMLElement | null
    getGrid(): HTMLElement | null
    getPreview(): HTMLElement | null
  }

  /** All events bubble and are composed. */
  events: {
    /** Emitted when image selection changes. */
    change: CustomEvent<TotImageSearchSelectionDetail>
    'search-start': CustomEvent<TotImageSearchProgressDetail>
    'search-end': CustomEvent<TotImageSearchResultDetail>
    error: CustomEvent<{ error: unknown }>
  }

  slots: Record<never, never>

  /**
   * ```text
   * base
   * ├─ input — tot-input search field
   * ├─ status — visible only while an Openverse request is active
   * ├─ grid
   * │  └─ tile — repeated preview/select/info tile
   * ├─ empty
   * └─ load-more-button
   * copyright-dialog — generated `<tot-dialog>`
   * └─ copyright-body
   *    └─ copyright-details — generated `<tot-details>` with all available metadata
   * ```
   */
  parts:
    | 'base'
    | 'input'
    | 'status'
    | 'grid'
    | 'tile'
    | 'empty'
    | 'load-more-button'
    | 'copyright-dialog'
    | 'copyright-body'
    | 'copyright-details'
}
