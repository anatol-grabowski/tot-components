/** A divider inside the options menu shown by `<tot-video>`. */
export type TotVideoMenuDivider = {
  type: 'divider'
}

/** A non-interactive label inside the options menu. */
export type TotVideoMenuLabel = {
  type: 'label'
  label: string
}

/** An action, optionally with nested actions, inside the options menu. */
export type TotVideoMenuItem = {
  type: 'item'
  value: string
  label: string
  disabled?: boolean
  suffix?: string
  items?: TotVideoMenuOption[]
}

/** Canonical options-menu entries accepted by `<tot-video>`. */
export type TotVideoMenuOption =
  | TotVideoMenuDivider
  | TotVideoMenuLabel
  | TotVideoMenuItem

/** Built-in controls that can be included in `TotVideo.controls`. */
export type TotVideoControl =
  | 'progress'
  | 'play'
  | 'rewind'
  | 'forward'
  | 'hide-controls'
  | 'speed-0.5'
  | 'speed-1'
  | 'speed-1.5'
  | 'subtitles'
  | 'options'
  | 'volume'
  | 'fullscreen'

/**
 * `<tot-video>` - a native-video viewer with compact custom controls, seeking
 * previews, configurable skip intervals, subtitles, playback speeds, volume,
 * fullscreen, and a customizable `Menu.js` options surface.
 */
export type TotVideo = {
  props: {
    /** Direct video URL. `<source>` elements can instead be placed in the default slot. @default '' */
    src: string

    /** Poster image URL. @default '' */
    poster: string

    /** Native preload mode. @default 'metadata' */
    preload: 'none' | 'metadata' | 'auto'

    /** Starts playback when allowed by the browser. @default false */
    autoplay: boolean

    /** Restarts playback after the video ends. @default false */
    loop: boolean

    /** Native muted state. @default false */
    muted: boolean

    /** Requests inline playback on supported mobile browsers. @default false */
    playsInline: boolean

    /** Native CORS mode used by the main and scrub-preview videos. @default '' */
    crossOrigin: '' | 'anonymous' | 'use-credentials'

    /** Positive number of seconds used by the rewind control and left arrow key. @default 10 */
    rewindSeconds: number

    /** Positive number of seconds used by the forward control and right arrow key. @default 10 */
    forwardSeconds: number

    /**
     * Ordered built-in controls to show. Setting `[]` hides the entire set of
     * built-in controls while keeping the native video and public methods.
     * The default contains every `TotVideoControl` value in visual order.
     */
    controls: TotVideoControl[]

    /**
     * Entries rendered by `Menu.js` above the gearbox control. The gearbox is
     * hidden when this is empty and the `options-menu` slot is not assigned.
     * @default []
     */
    options: TotVideoMenuOption[]

    /** Shows the first available subtitles/captions track. @default false */
    subtitles: boolean

    /** Current playback position in seconds. */
    currentTime: number

    /** Volume from `0` to `1`. Assigning a positive value also unmutes. @default 1 */
    volume: number

    /** Positive native playback rate. @default 1 */
    playbackRate: number

    /**
     * Whether the complete toolbar is currently hidden. Setting this while
     * paused has no effect. @default false
     */
    controlsHidden: boolean

    /**
     * Automatically hides the toolbar while playing whenever a non-touch
     * pointer is outside the bottom control zone. Pausing keeps the toolbar
     * visible without disabling this mode. @default false
     */
    autoHideControls: boolean
  }

  methods: {
    play(): Promise<void>
    pause(): void
    togglePlayback(): Promise<void>

    /** Seeks to a clamped time in seconds. */
    seek(time: number): void

    /** Moves relative to the current position. */
    skip(seconds: number): void

    /** Directly changes the current toolbar visibility while playing. */
    hideControls(): void
    showControls(): void
    toggleControls(): void

    /** Toggles persistent automatic hiding outside the bottom control zone. */
    toggleAutoHideControls(): void

    /** Enters or exits fullscreen, including the native iOS fallback. */
    toggleFullscreen(): Promise<void>

    showOptions(): void
    hideOptions(): void
    toggleOptions(): void

    /** Exposes the native playback element for uncommon media APIs. */
    getVideo(): HTMLVideoElement | null
    getProgress(): HTMLElement | null

    /** Returns the slotted options menu or the generated `<tot-menu>`. */
    getOptionsMenu(): HTMLElement | null
  }

  events: {
    play: Event
    pause: Event
    ended: Event
    loaded: CustomEvent<{
      duration: number
    }>
    timeupdate: CustomEvent<{
      currentTime: number
      duration: number
    }>
    seek: CustomEvent<{
      time: number
    }>
    ratechange: CustomEvent<{
      rate: number
    }>
    volumechange: CustomEvent<{
      volume: number
      muted: boolean
    }>
    subtitleschange: CustomEvent<{
      enabled: boolean
    }>
    optionselect: CustomEvent<{
      item: HTMLElement | null
      value: string
      label: string
    }>
    enterfullscreen: Event
    exitfullscreen: Event
    error: CustomEvent<{
      message: string
    }>
  }

  slots: {
    /** `<source>` and `<track>` elements copied into the native video. */
    default: undefined

    /** Replaces the corresponding built-in control; clicks retain the built-in action. */
    play: undefined
    rewind: undefined
    forward: undefined
    'hide-controls': undefined
    'speed-half': undefined
    'speed-normal': undefined
    'speed-one-half': undefined
    subtitles: undefined
    options: undefined
    fullscreen: undefined

    /**
     * Replaces the volume icon/range group. An `input` event whose target has a
     * numeric `value` updates the native volume.
     */
    volume: undefined

    /**
     * A custom `<tot-menu>` replacing the generated menu. Its `select` event is
     * translated into `optionselect`.
     */
    'options-menu': undefined
  }

  /**
   * ```text
   * base — complete video surface
   * ├─ video — native playback element
   * └─ controls — slightly translucent bottom control surface
   *    ├─ progress-control
   *    │  └─ progress
   *    │     ├─ progress-track / progress-buffered / progress-played
   *    │     └─ preview / preview-time
   *    └─ controls-row
   *       ├─ left-controls
   *       │  ├─ play-control
   *       │  ├─ rewind-control
   *       │  ├─ forward-control
   *       │  └─ hide-controls-control
   *       └─ right-controls
   *          ├─ speed-half-control / speed-normal-control / speed-one-half-control
   *          ├─ subtitles-control
   *          ├─ options-control / options-panel
   *          ├─ volume-control / volume
   *          └─ fullscreen-control
   * ```
   */
  parts:
    | 'base'
    | 'video'
    | 'controls'
    | 'progress-control'
    | 'progress'
    | 'progress-track'
    | 'progress-buffered'
    | 'progress-played'
    | 'preview'
    | 'preview-time'
    | 'controls-row'
    | 'left-controls'
    | 'right-controls'
    | 'play-control'
    | 'rewind-control'
    | 'forward-control'
    | 'hide-controls-control'
    | 'speed-half-control'
    | 'speed-normal-control'
    | 'speed-one-half-control'
    | 'subtitles-control'
    | 'options-control'
    | 'options-panel'
    | 'volume-control'
    | 'volume'
    | 'fullscreen-control'
}
