export type TotImagePreviewChangeDetail = {
  index: number
  src: string
}

/**
 * `<tot-image-preview>` - a black image gallery overlay with a large current
 * image, top index and close controls, bottom thumbnails, quarter-click and
 * pointer-swipe navigation, pinch and Ctrl+wheel image zooming, keyboard
 * navigation, and mobile browser-back closing while fullscreen.
 */
export type TotImagePreview = {
  props: {
    /** Image URLs. A JSON array is also accepted through the `images` attribute. @default [] */
    images: string[]

    /** Zero-based current image index, clamped to the available images. @default 0 */
    index: number

    /** Whether the preview is visible. @default false */
    open: boolean

    /**
     * Uses `position: absolute` instead of a viewport-fixed overlay. The nearest
     * ancestor that should contain the preview must establish a positioning
     * context, usually with `position: relative`. Contained previews do not
     * add a browser-history entry. @default false
     */
    contained: boolean
  }

  methods: {
    show(index?: number): void
    hide(): void
    previous(): void
    next(): void
    zoomIn(): void
    zoomOut(): void
    resetZoom(): void
    getBase(): HTMLElement | null
    getImage(): HTMLImageElement | null
    getThumbnails(): HTMLButtonElement[]
  }

  /** All events bubble and are composed. */
  events: {
    show: Event
    hide: Event
    change: CustomEvent<TotImagePreviewChangeDetail>
  }

  slots: Record<never, never>

  /**
   * ```text
   * base — fixed or contained black preview surface
   * ├─ stage
   * │  ├─ counter
   * │  ├─ close-button
   * │  ├─ image
   * │  └─ empty / error
   * └─ thumbnails
   *    └─ thumbnail — repeated native button
   * ```
   */
  parts:
    | 'base'
    | 'stage'
    | 'counter'
    | 'close-button'
    | 'image'
    | 'empty'
    | 'error'
    | 'thumbnails'
    | 'thumbnail'
}
