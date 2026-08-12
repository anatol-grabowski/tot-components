const defaultControls = [
  'progress',
  'play',
  'rewind',
  'forward',
  'hide-controls',
  'speed-0.5',
  'speed-1',
  'speed-1.5',
  'subtitles',
  'options',
  'volume',
  'fullscreen',
]

const validControls = new Set(defaultControls)

const videoStyle = `
  :host {
    container-type: inline-size;
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .base {
    -webkit-tap-highlight-color: transparent;
    aspect-ratio: var(--tot-video-aspect-ratio, 16 / 9);
    background: var(--tot-video-background-color, #000);
    border-radius: var(--tot-video-border-radius, var(--tot-border-radius-large, 6px));
    color: var(--tot-video-control-color, #fff);
    display: block;
    font-family: var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif);
    max-height: var(--tot-video-max-height, none);
    max-width: 100%;
    min-height: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .base:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .base:fullscreen,
  .base:-webkit-full-screen {
    aspect-ratio: auto;
    border-radius: 0;
    height: 100%;
    width: 100%;
  }

  .video {
    background: var(--tot-video-background-color, #000);
    cursor: pointer;
    display: block;
    height: 100%;
    inset: 0;
    object-fit: var(--tot-video-object-fit, contain);
    position: absolute;
    width: 100%;
  }

  .controls {
    background: var(--tot-video-controls-background-color, rgb(0 0 0 / 88%));
    bottom: 0;
    color: var(--tot-video-control-color, #fff);
    left: 0;
    padding-block-start: .55rem;
    position: absolute;
    right: 0;
    z-index: 2;
  }

  .controls-row {
    align-items: center;
    display: flex;
    gap: var(--tot-spacing-3x-small, .125rem);
    min-height: var(--tot-video-controls-height, 2.5rem);
    padding: var(--tot-spacing-3x-small, .125rem) var(--tot-spacing-x-small, .5rem) var(--tot-spacing-x-small, .5rem);
  }

  .left-controls,
  .right-controls,
  .volume-control {
    align-items: center;
    display: flex;
    gap: var(--tot-spacing-3x-small, .125rem);
  }

  .left-controls,
  .right-controls {
    min-width: 0;
  }

  .right-controls {
    margin-inline-start: auto;
  }

  .controls[hidden],
  .controls-row[hidden],
  .control[hidden],
  .progress-control[hidden] {
    display: none;
  }

  .control-button {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-medium, 4px);
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-size: var(--tot-font-size-small, .8125rem);
    height: 2rem;
    justify-content: center;
    line-height: 1;
    min-width: 2rem;
    padding: 0 var(--tot-spacing-2x-small, .25rem);
    white-space: nowrap;
  }

  .control-button:hover:not(:disabled),
  .control-button[aria-pressed='true'] {
    background: var(--tot-video-control-background-color-hover, rgb(255 255 255 / 18%));
  }

  .control-button:focus-visible,
  .volume-input:focus-visible,
  .progress:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 55%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .control-button:disabled,
  .volume-input:disabled {
    cursor: default;
    opacity: .45;
  }

  .control-button svg {
    display: block;
    fill: none;
    height: 1.15rem;
    pointer-events: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
    width: 1.15rem;
  }

  .seek-button,
  .speed-button {
    font-variant-numeric: tabular-nums;
  }

  .seek-button {
    min-width: 2.65rem;
  }

  .speed-button {
    min-width: 2.3rem;
  }

  .progress {
    cursor: pointer;
    height: 1.1rem;
    left: 0;
    outline: none;
    position: absolute;
    right: 0;
    top: -.55rem;
    touch-action: none;
  }

  .progress-track,
  .progress-buffered,
  .progress-played {
    border-radius: 999px;
    height: var(--tot-video-progress-height, 3px);
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .progress-track {
    background: var(--tot-video-progress-background-color, rgb(255 255 255 / 32%));
    right: 0;
  }

  .progress-buffered {
    background: var(--tot-video-progress-buffered-color, rgb(255 255 255 / 55%));
    width: 0;
  }

  .progress-played {
    background: var(--tot-video-progress-color, var(--tot-color-primary-500, #0ea5e9));
    width: 0;
  }

  .progress::after {
    background: var(--tot-video-progress-color, var(--tot-color-primary-500, #0ea5e9));
    border-radius: 50%;
    content: '';
    height: .7rem;
    left: var(--tot-video-progress-position, 0%);
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 100ms ease;
    width: .7rem;
  }

  .progress:hover::after,
  .progress[data-dragging='true']::after,
  .progress:focus-visible::after {
    opacity: 1;
  }

  .scrub-preview {
    background: var(--tot-video-preview-background-color, #000);
    border: var(--tot-video-preview-border-width, 1px) solid var(--tot-video-preview-border-color, rgb(255 255 255 / 45%));
    border-radius: var(--tot-border-radius-medium, 4px);
    bottom: calc(100% + var(--tot-spacing-2x-small, .25rem));
    box-shadow: var(--tot-shadow-medium, 0 4px 8px rgb(0 0 0 / 30%));
    left: 0;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    transform: translateX(-50%);
    width: min(var(--tot-video-preview-width, 10rem), 45vw);
  }

  .scrub-preview[hidden] {
    display: none;
  }

  .scrub-preview video {
    aspect-ratio: 16 / 9;
    background: #000;
    display: block;
    object-fit: cover;
    width: 100%;
  }

  .scrub-preview__time {
    background: rgb(0 0 0 / 78%);
    bottom: 0;
    color: #fff;
    font-size: var(--tot-font-size-x-small, .75rem);
    font-variant-numeric: tabular-nums;
    left: 0;
    padding: var(--tot-spacing-3x-small, .125rem) var(--tot-spacing-2x-small, .25rem);
    position: absolute;
  }

  .volume-control {
    padding-inline: var(--tot-spacing-3x-small, .125rem);
  }

  .volume-icon {
    display: block;
    height: 1rem;
    pointer-events: none;
    width: 1rem;
  }

  .volume-input {
    accent-color: var(--tot-video-progress-color, var(--tot-color-primary-500, #0ea5e9));
    cursor: pointer;
    margin: 0;
    width: var(--tot-video-volume-width, 5rem);
  }

  .options-control {
    position: relative;
  }

  .options-panel {
    bottom: calc(100% + var(--tot-spacing-x-small, .5rem));
    max-width: min(22rem, calc(100vw - 1rem));
    min-width: var(--tot-video-options-width, 13rem);
    position: absolute;
    right: 0;
    z-index: var(--tot-z-index-dropdown, 1000);
  }

  .options-panel[hidden] {
    display: none;
  }

  .options-panel > tot-menu,
  .options-panel ::slotted(tot-menu) {
    --tot-menu-max-height: min(18rem, 55vh);
    --tot-menu-overflow: auto;
    color: var(--tot-input-color, #1e293b);
    display: block;
  }

  .media-slot {
    display: none;
  }

  @container (max-width: 32rem) {
    .controls-row {
      padding-inline: var(--tot-spacing-2x-small, .25rem);
    }

    .control-button {
      height: 1.8rem;
      min-width: 1.8rem;
      padding-inline: var(--tot-spacing-3x-small, .125rem);
    }

    .speed-button {
      min-width: 2rem;
    }

    .volume-input {
      width: 3rem;
    }
  }

  @container (max-width: 23rem) {
    .controls-row,
    .left-controls,
    .right-controls {
      gap: 0;
    }

    .control-button {
      min-width: 1.65rem;
    }

    .speed-button {
      font-size: .7rem;
      min-width: 1.8rem;
    }

    .volume-icon {
      display: none;
    }

    .volume-input {
      width: 2.6rem;
    }
  }
`

const icons = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>',
  hideControls: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  options: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 8.97 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.52-1.03H3v-4h.08A1.7 1.7 0 0 0 4.6 8.97a1.7 1.7 0 0 0-.34-1.88l-.06-.06L7.03 4.2l.06.06A1.7 1.7 0 0 0 8.97 4.6 1.7 1.7 0 0 0 10 3.08V3h4v.08a1.7 1.7 0 0 0 1.03 1.52 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z"/></svg>',
  fullscreen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>',
  exitFullscreen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3v3a2 2 0 0 1-2 2H3M16 3v3a2 2 0 0 0 2 2h3M8 21v-3a2 2 0 0 0-2-2H3M16 21v-3a2 2 0 0 1 2-2h3"/></svg>',
  volume: '<svg class="volume-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v6h4l5 4V5L9 9H5Z"/><path d="M17 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/></svg>',
  muted: '<svg class="volume-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v6h4l5 4V5L9 9H5Z"/><path d="m17 9 5 5M22 9l-5 5"/></svg>',
}

export class TotVideo extends HTMLElement {
  static get observedAttributes() {
    return [
      'src',
      'poster',
      'preload',
      'autoplay',
      'loop',
      'muted',
      'playsinline',
      'crossorigin',
      'rewind-seconds',
      'forward-seconds',
      'controls',
      'options',
      'subtitles',
      'controls-hidden',
      'auto-hide-controls',
    ]
  }

  constructor() {
    super()
    this._controls = null
    this._options = undefined
    this._draggingProgress = false
    this._previewFrame = 0
    this._pendingPreviewTime = 0
    this._documentListening = false
    this._fullscreenActive = false
    this._pointerInside = false
    this._pointerInControlsZone = false
    this._controlsRevealHeight = 56
    this._lastPointerType = ''
    this._lastSubtitleTrack = 0
    this._subtitlesEnabled = false
    this._sourceSignature = ''
    this._handleDocumentPointerDown = event => this.handleDocumentPointerDown(event)
    this._handleFullscreenChange = () => this.syncFullscreenState()

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${videoStyle}</style>
      <div class="base" part="base" tabindex="0">
        <video class="video" part="video"></video>
        <slot class="media-slot"></slot>
        <div class="controls" part="controls">
          <div
            class="progress-control"
            data-control="progress"
            part="progress-control"
          >
            <div
              class="progress"
              part="progress"
              role="slider"
              tabindex="0"
              aria-label="Playback position"
              aria-valuemin="0"
              aria-valuemax="0"
              aria-valuenow="0"
              aria-valuetext="0:00 / 0:00"
            >
              <div class="progress-track" part="progress-track">
                <div class="progress-buffered" part="progress-buffered"></div>
                <div class="progress-played" part="progress-played"></div>
              </div>
              <div class="scrub-preview" part="preview" hidden>
                <video muted playsinline preload="metadata"></video>
                <span class="scrub-preview__time" part="preview-time">0:00</span>
              </div>
            </div>
          </div>
          <div class="controls-row" part="controls-row">
            <div class="left-controls" part="left-controls">
              <span class="control" data-control="play" part="play-control">
                <slot name="play"><button class="control-button play-button" type="button" aria-label="Play">${icons.play}</button></slot>
              </span>
              <span class="control" data-control="rewind" part="rewind-control">
                <slot name="rewind"><button class="control-button seek-button rewind-button" type="button"></button></slot>
              </span>
              <span class="control" data-control="forward" part="forward-control">
                <slot name="forward"><button class="control-button seek-button forward-button" type="button"></button></slot>
              </span>
              <span class="control" data-control="hide-controls" part="hide-controls-control">
                <slot name="hide-controls"><button class="control-button hide-controls-button" type="button" aria-label="Automatically hide controls">${icons.hideControls}</button></slot>
              </span>
            </div>
            <div class="right-controls" part="right-controls">
              <span class="control" data-control="speed-0.5" part="speed-half-control">
                <slot name="speed-half"><button class="control-button speed-button" type="button" data-rate="0.5" aria-label="Playback speed 0.5">×0.5</button></slot>
              </span>
              <span class="control" data-control="speed-1" part="speed-normal-control">
                <slot name="speed-normal"><button class="control-button speed-button" type="button" data-rate="1" aria-label="Playback speed 1">×1</button></slot>
              </span>
              <span class="control" data-control="speed-1.5" part="speed-one-half-control">
                <slot name="speed-one-half"><button class="control-button speed-button" type="button" data-rate="1.5" aria-label="Playback speed 1.5">×1.5</button></slot>
              </span>
              <span class="control" data-control="subtitles" part="subtitles-control">
                <slot name="subtitles"><button class="control-button subtitles-button" type="button" aria-label="Turn subtitles on" aria-pressed="false">CC</button></slot>
              </span>
              <span class="control options-control" data-control="options" part="options-control">
                <slot name="options"><button class="control-button options-button" type="button" aria-label="Video options" aria-haspopup="menu" aria-expanded="false">${icons.options}</button></slot>
                <div class="options-panel" part="options-panel" hidden>
                  <slot name="options-menu"><tot-menu class="options-menu" dense></tot-menu></slot>
                </div>
              </span>
              <span class="control volume-control" data-control="volume" part="volume-control">
                <slot name="volume">
                  <span class="volume-icon-container">${icons.volume}</span>
                  <input class="volume-input" part="volume" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume">
                </slot>
              </span>
              <span class="control" data-control="fullscreen" part="fullscreen-control">
                <slot name="fullscreen"><button class="control-button fullscreen-button" type="button" aria-label="Enter fullscreen">${icons.fullscreen}</button></slot>
              </span>
            </div>
          </div>
        </div>
      </div>
    `

    this._base = root.querySelector('.base')
    this._video = root.querySelector('.video')
    this._mediaSlot = root.querySelector('.media-slot')
    this._controlsElement = root.querySelector('.controls')
    this._controlsRow = root.querySelector('.controls-row')
    this._progress = root.querySelector('.progress')
    this._progressBuffered = root.querySelector('.progress-buffered')
    this._progressPlayed = root.querySelector('.progress-played')
    this._scrubPreview = root.querySelector('.scrub-preview')
    this._previewVideo = this._scrubPreview.querySelector('video')
    this._previewTime = root.querySelector('.scrub-preview__time')
    this._playButton = root.querySelector('.play-button')
    this._rewindButton = root.querySelector('.rewind-button')
    this._forwardButton = root.querySelector('.forward-button')
    this._hideControlsButton = root.querySelector('.hide-controls-button')
    this._subtitlesButton = root.querySelector('.subtitles-button')
    this._optionsButton = root.querySelector('.options-button')
    this._optionsPanel = root.querySelector('.options-panel')
    this._optionsMenu = root.querySelector('.options-menu')
    this._optionsMenuSlot = root.querySelector('slot[name="options-menu"]')
    this._volumeInput = root.querySelector('.volume-input')
    this._volumeIconContainer = root.querySelector('.volume-icon-container')
    this._fullscreenButton = root.querySelector('.fullscreen-button')
    this.bindEvents()
  }

  get src() {
    return this.getAttribute('src') || ''
  }

  set src(value) {
    setStringAttribute(this, 'src', value)
  }

  get poster() {
    return this.getAttribute('poster') || ''
  }

  set poster(value) {
    setStringAttribute(this, 'poster', value)
  }

  get preload() {
    return this.getAttribute('preload') || 'metadata'
  }

  set preload(value) {
    setStringAttribute(this, 'preload', value || 'metadata')
  }

  get autoplay() {
    return this.hasAttribute('autoplay')
  }

  set autoplay(value) {
    setBooleanAttribute(this, 'autoplay', value)
  }

  get loop() {
    return this.hasAttribute('loop')
  }

  set loop(value) {
    setBooleanAttribute(this, 'loop', value)
  }

  get muted() {
    return this.hasAttribute('muted')
  }

  set muted(value) {
    setBooleanAttribute(this, 'muted', value)
  }

  get playsInline() {
    return this.hasAttribute('playsinline')
  }

  set playsInline(value) {
    setBooleanAttribute(this, 'playsinline', value)
  }

  get crossOrigin() {
    return this.getAttribute('crossorigin') || ''
  }

  set crossOrigin(value) {
    setStringAttribute(this, 'crossorigin', value)
  }

  get rewindSeconds() {
    return getPositiveNumberAttribute(this, 'rewind-seconds', 10)
  }

  set rewindSeconds(value) {
    setPositiveNumberAttribute(this, 'rewind-seconds', value, 10)
  }

  get forwardSeconds() {
    return getPositiveNumberAttribute(this, 'forward-seconds', 10)
  }

  set forwardSeconds(value) {
    setPositiveNumberAttribute(this, 'forward-seconds', value, 10)
  }

  get controlsHidden() {
    return this.hasAttribute('controls-hidden')
  }

  set controlsHidden(value) {
    setBooleanAttribute(this, 'controls-hidden', value)
  }

  get autoHideControls() {
    return this.hasAttribute('auto-hide-controls')
  }

  set autoHideControls(value) {
    setBooleanAttribute(this, 'auto-hide-controls', value)
  }

  get controls() {
    if (this._controls !== null) {
      return [...this._controls]
    }

    if (!this.hasAttribute('controls')) {
      return [...defaultControls]
    }

    return parseControls(this.getAttribute('controls'))
  }

  set controls(value) {
    this._controls = normalizeControls(value)
    this.setAttribute('controls', this._controls.join(' '))
    this.syncControls()
  }

  get options() {
    if (this._options !== undefined) {
      return cloneMenuItems(this._options)
    }

    return parseMenuItems(this.getAttribute('options'))
  }

  set options(value) {
    this._options = normalizeMenuItems(value)
    this.syncOptions()
  }

  get subtitles() {
    return this.hasAttribute('subtitles')
  }

  set subtitles(value) {
    setBooleanAttribute(this, 'subtitles', value)
  }

  get currentTime() {
    return this._video.currentTime || 0
  }

  set currentTime(value) {
    this.seek(value)
  }

  get volume() {
    return this._video.volume
  }

  set volume(value) {
    const next = clamp(Number(value), 0, 1)
    this._video.volume = next
    if (next > 0 && this._video.muted) {
      this._video.muted = false
      this.muted = false
    }
    this.syncVolume()
  }

  get playbackRate() {
    return this._video.playbackRate
  }

  set playbackRate(value) {
    const next = Number(value)
    if (!Number.isFinite(next) || next <= 0) {
      throw new TypeError('playbackRate must be a positive number')
    }
    this._video.playbackRate = next
    this.syncPlaybackRate()
  }

  connectedCallback() {
    this.syncMediaAttributes()
    this.syncMediaChildren()
    this.syncSkipControls()
    this.syncControls()
    this.syncOptions()
    this.syncPlaybackState()
    this.syncAutoHideControls()
    this.syncPlaybackRate()
    this.syncVolume()
    this.syncSubtitles()
    this.updateProgress()
    document.addEventListener('fullscreenchange', this._handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', this._handleFullscreenChange)
  }

  disconnectedCallback() {
    this.stopDocumentListening()
    cancelAnimationFrame(this._previewFrame)
    this._previewFrame = 0
    this._previewVideo.pause()
    document.removeEventListener('fullscreenchange', this._handleFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', this._handleFullscreenChange)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'rewind-seconds' || name === 'forward-seconds') {
      this.syncSkipControls()
      return
    }

    if (name === 'controls-hidden') {
      if (newValue !== null && this._video.paused) {
        this.controlsHidden = false
        return
      }
      this.syncControls()
      return
    }

    if (name === 'auto-hide-controls') {
      this.syncAutoHideControls()
      return
    }

    if (name === 'controls') {
      this._controls = null
      this.syncControls()
      return
    }

    if (name === 'options') {
      this._options = undefined
      this.syncOptions()
      return
    }

    if (name === 'subtitles') {
      this.syncSubtitles()
      return
    }

    this.syncMediaAttributes()
    if (name === 'src' || name === 'crossorigin') {
      this.syncMediaChildren()
    }
  }

  play() {
    return this._video.play()
  }

  pause() {
    this._video.pause()
  }

  async togglePlayback() {
    if (this._video.paused) {
      await this.play()
    } else {
      this.pause()
    }
  }

  seek(time) {
    const duration = getDuration(this._video)
    const next = clamp(Number(time) || 0, 0, duration || Number.MAX_SAFE_INTEGER)
    this._video.currentTime = next
    this.updateProgress()
    emitDetail(this, 'seek', { time: next })
  }

  skip(seconds) {
    this.seek(this.currentTime + Number(seconds || 0))
  }

  hideControls() {
    if (this._video.paused) {
      return
    }
    this.controlsHidden = true
  }

  showControls() {
    this.controlsHidden = false
  }

  toggleControls() {
    if (this.controlsHidden) {
      this.showControls()
    } else {
      this.hideControls()
    }
  }

  toggleAutoHideControls() {
    const enabled = !this.autoHideControls
    if (enabled) {
      const pointerCanHover = this._lastPointerType !== 'touch'
      this._pointerInside = pointerCanHover
      this._pointerInControlsZone = pointerCanHover
    }
    this.autoHideControls = enabled
  }

  async toggleFullscreen() {
    if (isFullscreen(this._base, this._video)) {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen()
      } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (typeof this._video.webkitExitFullscreen === 'function') {
        this._video.webkitExitFullscreen()
      }
      this.syncFullscreenState()
      return
    }

    if (this._base.requestFullscreen) {
      await this._base.requestFullscreen()
    } else if (this._base.webkitRequestFullscreen) {
      this._base.webkitRequestFullscreen()
    } else if (typeof this._video.webkitEnterFullscreen === 'function') {
      this._video.webkitEnterFullscreen()
    }
    this.syncFullscreenState()
  }

  showOptions() {
    if (!this.hasOptions()) {
      return
    }

    this._optionsPanel.hidden = false
    this._optionsButton?.setAttribute('aria-expanded', 'true')
    this.startDocumentListening()
    const menu = this.getOptionsMenu()
    if (menu && typeof menu.focus === 'function') {
      requestAnimationFrame(() => menu.focus())
    }
  }

  hideOptions() {
    this._optionsPanel.hidden = true
    this._optionsButton?.setAttribute('aria-expanded', 'false')
    this.stopDocumentListening()
  }

  toggleOptions() {
    if (this._optionsPanel.hidden) {
      this.showOptions()
    } else {
      this.hideOptions()
    }
  }

  getVideo() {
    return this._video
  }

  getProgress() {
    return this._progress
  }

  getOptionsMenu() {
    const assigned = this._optionsMenuSlot.assignedElements({ flatten: true })
    return assigned[0] || this._optionsMenu
  }

  bindEvents() {
    this._base.addEventListener('pointerdown', event => {
      this._lastPointerType = event.pointerType
    })
    this._base.addEventListener('pointerenter', event => this.handleControlsPointerMove(event))
    this._base.addEventListener('pointermove', event => this.handleControlsPointerMove(event))
    this._base.addEventListener('pointerleave', event => this.handleControlsPointerLeave(event))
    this._video.addEventListener('click', () => {
      if (!this._video.paused) {
        this.pause()
      }
    })

    this._video.addEventListener('play', () => {
      this.syncPlaybackState()
      this.syncAutoHideControls()
      emitEvent(this, 'play')
    })
    this._video.addEventListener('pause', () => {
      this.showControls()
      this.syncPlaybackState()
      emitEvent(this, 'pause')
    })
    this._video.addEventListener('ended', () => {
      this.showControls()
      this.syncPlaybackState()
      emitEvent(this, 'ended')
    })
    this._video.addEventListener('loadedmetadata', () => {
      this.updateProgress()
      this.syncSubtitles()
      emitDetail(this, 'loaded', { duration: getDuration(this._video) })
    })
    this._video.addEventListener('durationchange', () => this.updateProgress())
    this._video.addEventListener('progress', () => this.updateProgress())
    this._video.addEventListener('timeupdate', () => {
      this.updateProgress()
      emitDetail(this, 'timeupdate', {
        currentTime: this.currentTime,
        duration: getDuration(this._video),
      })
    })
    this._video.addEventListener('ratechange', () => {
      this.syncPlaybackRate()
      emitDetail(this, 'ratechange', { rate: this.playbackRate })
    })
    this._video.addEventListener('volumechange', () => {
      this.syncVolume()
      emitDetail(this, 'volumechange', {
        volume: this.volume,
        muted: this._video.muted,
      })
    })
    this._video.addEventListener('error', () => {
      this.showControls()
      emitDetail(this, 'error', { message: mediaErrorMessage(this._video.error) })
    })
    this._video.addEventListener('webkitbeginfullscreen', () => this.syncFullscreenState())
    this._video.addEventListener('webkitendfullscreen', () => this.syncFullscreenState())

    this._base.addEventListener('keydown', event => this.handleKeyDown(event))
    this._mediaSlot.addEventListener('slotchange', () => this.syncMediaChildren())
    this._optionsMenuSlot.addEventListener('slotchange', () => {
      this.syncOptions()
      this.syncControls()
    })

    this.bindClickSlot('play', () => void this.safeTogglePlayback())
    this.bindClickSlot('rewind', () => this.skip(-this.rewindSeconds))
    this.bindClickSlot('forward', () => this.skip(this.forwardSeconds))
    this.bindClickSlot('hide-controls', () => this.toggleAutoHideControls())
    this.bindClickSlot('speed-half', () => { this.playbackRate = .5 })
    this.bindClickSlot('speed-normal', () => { this.playbackRate = 1 })
    this.bindClickSlot('speed-one-half', () => { this.playbackRate = 1.5 })
    this.bindClickSlot('subtitles', () => this.toggleSubtitles())
    this.bindClickSlot('options', () => this.toggleOptions())
    this.bindClickSlot('fullscreen', () => void this.safeToggleFullscreen())

    const volumeSlot = this.shadowRoot.querySelector('slot[name="volume"]')
    volumeSlot.addEventListener('input', event => {
      const target = event.composedPath()[0]
      if (target && 'value' in target) {
        this.volume = Number(target.value)
      }
    })

    this._progress.addEventListener('pointerdown', event => this.handleProgressPointerDown(event))
    this._progress.addEventListener('pointermove', event => this.handleProgressPointerMove(event))
    this._progress.addEventListener('pointerup', event => this.handleProgressPointerUp(event))
    this._progress.addEventListener('pointercancel', event => this.handleProgressPointerUp(event))
    this._progress.addEventListener('pointerleave', () => {
      if (!this._draggingProgress) {
        this.hideScrubPreview()
      }
    })
    this._progress.addEventListener('keydown', event => this.handleProgressKeyDown(event))

    this._optionsPanel.addEventListener('select', event => {
      const detail = event.detail || {}
      this.hideOptions()
      emitDetail(this, 'optionselect', {
        item: detail.item || null,
        value: String(detail.value || ''),
        label: String(detail.label || ''),
      })
    })
  }

  handleControlsPointerMove(event) {
    if (event.pointerType === 'touch') {
      return
    }

    this._lastPointerType = event.pointerType
    this._pointerInside = true
    const baseRect = this._base.getBoundingClientRect()
    if (!this._controlsElement.hidden) {
      const controlsHeight = this._controlsElement.getBoundingClientRect().height
      if (controlsHeight > 0) {
        this._controlsRevealHeight = controlsHeight
      }
    }

    const revealHeight = Math.max(56, this._controlsRevealHeight + 8)
    this._pointerInControlsZone = event.clientY >= baseRect.bottom - revealHeight
      && event.clientY <= baseRect.bottom
    this.syncAutoHideControls()
  }

  handleControlsPointerLeave(event) {
    if (event.pointerType === 'touch') {
      return
    }

    this._pointerInside = false
    this._pointerInControlsZone = false
    this.syncAutoHideControls()
  }

  syncAutoHideControls() {
    const enabled = this.autoHideControls
    if (this._hideControlsButton) {
      this._hideControlsButton.setAttribute('aria-pressed', String(enabled))
      this._hideControlsButton.setAttribute(
        'aria-label',
        enabled ? 'Keep controls visible' : 'Automatically hide controls',
      )
    }

    if (!enabled || this._video.paused) {
      this.showControls()
      return
    }

    if (this._pointerInside && this._pointerInControlsZone) {
      this.showControls()
    } else {
      this.hideControls()
    }
  }

  bindClickSlot(name, callback) {
    const slot = this.shadowRoot.querySelector(`slot[name="${name}"]`)
    slot.addEventListener('click', event => {
      event.preventDefault()
      callback()
    })
  }

  async safeTogglePlayback() {
    try {
      await this.togglePlayback()
    } catch {
      emitDetail(this, 'error', { message: 'Video could not be played' })
    }
  }

  async safeToggleFullscreen() {
    try {
      await this.toggleFullscreen()
    } catch {
      emitDetail(this, 'error', { message: 'Fullscreen mode is unavailable' })
    }
  }

  handleKeyDown(event) {
    if (isInteractiveEventTarget(event)) {
      return
    }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      void this.safeTogglePlayback()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      this.skip(-this.rewindSeconds)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      this.skip(this.forwardSeconds)
    } else if (event.key.toLowerCase() === 'm') {
      event.preventDefault()
      this.muted = !this.muted
    } else if (event.key.toLowerCase() === 'f') {
      event.preventDefault()
      void this.safeToggleFullscreen()
    } else if (event.key === 'Escape' && !this._optionsPanel.hidden) {
      event.preventDefault()
      this.hideOptions()
    }
  }

  handleProgressKeyDown(event) {
    const duration = getDuration(this._video)
    if (!duration) {
      return
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault()
      this.skip(event.shiftKey ? -30 : -5)
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault()
      this.skip(event.shiftKey ? 30 : 5)
    } else if (event.key === 'Home') {
      event.preventDefault()
      this.seek(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      this.seek(duration)
    }
  }

  handleProgressPointerDown(event) {
    if (!getDuration(this._video)) {
      return
    }

    this._draggingProgress = true
    this._progress.dataset.dragging = 'true'
    this._progress.setPointerCapture(event.pointerId)
    this.updateScrubPreview(event, true)
  }

  handleProgressPointerMove(event) {
    if (event.pointerType === 'touch' && !this._draggingProgress) {
      return
    }
    this.updateScrubPreview(event, this._draggingProgress)
  }

  handleProgressPointerUp(event) {
    if (!this._draggingProgress) {
      return
    }

    this.updateScrubPreview(event, true)
    this._draggingProgress = false
    this._progress.dataset.dragging = 'false'
    if (this._progress.hasPointerCapture(event.pointerId)) {
      this._progress.releasePointerCapture(event.pointerId)
    }
    this.hideScrubPreview()
  }

  updateScrubPreview(event, commit) {
    const duration = getDuration(this._video)
    if (!duration) {
      return
    }

    const rect = this._progress.getBoundingClientRect()
    if (!rect.width) {
      return
    }

    const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 1)
    const time = ratio * duration
    this._scrubPreview.hidden = false
    this._scrubPreview.style.left = `${ratio * 100}%`
    this._previewTime.textContent = formatTime(time)
    this.schedulePreviewTime(time)
    if (commit) {
      this.seek(time)
    }
  }

  schedulePreviewTime(time) {
    this._pendingPreviewTime = time
    if (this._previewFrame) {
      return
    }

    this._previewFrame = requestAnimationFrame(() => {
      this._previewFrame = 0
      if (this._previewVideo.readyState >= HTMLMediaElement.HAVE_METADATA) {
        const duration = getDuration(this._previewVideo)
        this._previewVideo.currentTime = clamp(this._pendingPreviewTime, 0, duration || this._pendingPreviewTime)
      }
    })
  }

  hideScrubPreview() {
    this._scrubPreview.hidden = true
  }

  toggleSubtitles() {
    const tracks = this.getSubtitleTracks()
    if (!tracks.length) {
      return
    }
    this.subtitles = !this.subtitles
  }

  getSubtitleTracks() {
    const tracks = []
    for (let i = 0; i < this._video.textTracks.length; i++) {
      const track = this._video.textTracks[i]
      if (track.kind === 'subtitles' || track.kind === 'captions') {
        tracks.push(track)
      }
    }
    return tracks
  }

  syncSubtitles() {
    const tracks = this.getSubtitleTracks()
    const enabled = this.subtitles && tracks.length > 0
    for (let i = 0; i < tracks.length; i++) {
      const shouldShow = enabled && i === clamp(this._lastSubtitleTrack, 0, tracks.length - 1)
      tracks[i].mode = shouldShow ? 'showing' : 'disabled'
    }

    if (this._subtitlesButton) {
      this._subtitlesButton.disabled = tracks.length === 0
      this._subtitlesButton.setAttribute('aria-pressed', String(enabled))
      this._subtitlesButton.setAttribute('aria-label', enabled ? 'Turn subtitles off' : 'Turn subtitles on')
    }

    if (enabled !== this._subtitlesEnabled) {
      this._subtitlesEnabled = enabled
      emitDetail(this, 'subtitleschange', { enabled })
    }
  }

  syncMediaAttributes() {
    const attributes = [
      ['poster', this.poster],
      ['preload', this.preload],
      ['crossorigin', this.crossOrigin],
    ]
    for (let i = 0; i < attributes.length; i++) {
      const [name, value] = attributes[i]
      if (value) {
        this._video.setAttribute(name, value)
      } else {
        this._video.removeAttribute(name)
      }
    }

    this._video.autoplay = this.autoplay
    this._video.loop = this.loop
    this._video.muted = this.muted
    this._video.playsInline = this.playsInline
    this._previewVideo.crossOrigin = this.crossOrigin || null
    this.syncVolume()
  }

  syncMediaChildren() {
    const assigned = this._mediaSlot.assignedElements({ flatten: true })
    const signatureParts = [this.src, this.crossOrigin]
    for (let i = 0; i < assigned.length; i++) {
      if (assigned[i].localName === 'source' || assigned[i].localName === 'track') {
        signatureParts.push(assigned[i].outerHTML)
      }
    }
    const signature = signatureParts.join('\n')
    if (signature === this._sourceSignature) {
      return
    }
    this._sourceSignature = signature

    removeClonedMediaChildren(this._video)
    removeClonedMediaChildren(this._previewVideo)
    if (this.src) {
      this._video.src = this.src
      this._previewVideo.src = this.src
    } else {
      this._video.removeAttribute('src')
      this._previewVideo.removeAttribute('src')
    }

    for (let i = 0; i < assigned.length; i++) {
      const element = assigned[i]
      if (element.localName !== 'source' && element.localName !== 'track') {
        continue
      }

      const clone = element.cloneNode(true)
      clone.dataset.totVideoClone = 'true'
      this._video.appendChild(clone)
      if (element.localName === 'source') {
        const previewClone = element.cloneNode(true)
        previewClone.dataset.totVideoClone = 'true'
        this._previewVideo.appendChild(previewClone)
      }
    }

    this._video.load()
    this._previewVideo.load()
  }

  syncSkipControls() {
    syncSeekButton(this._rewindButton, -this.rewindSeconds)
    syncSeekButton(this._forwardButton, this.forwardSeconds)
  }

  syncControls() {
    const enabled = new Set(this.controls)
    const elements = this.shadowRoot.querySelectorAll('[data-control]')
    let visibleControls = 0
    let visibleRowControls = 0
    for (let i = 0; i < elements.length; i++) {
      const name = elements[i].dataset.control
      let visible = enabled.has(name)
      if (name === 'options') {
        visible = visible && this.hasOptions()
      }
      elements[i].hidden = !visible
      if (visible) {
        visibleControls++
        if (name !== 'progress') {
          visibleRowControls++
        }
      }
    }
    this._controlsRow.hidden = visibleRowControls === 0
    this._controlsElement.hidden = visibleControls === 0 || this.controlsHidden
    if (this.controlsHidden) {
      this.hideOptions()
    }
  }

  syncOptions() {
    if ('items' in this._optionsMenu) {
      this._optionsMenu.items = this.options
    }
    if (!this.hasOptions()) {
      this.hideOptions()
    }
    this.syncControls()
  }

  hasOptions() {
    if (this.options.length) {
      return true
    }
    return this._optionsMenuSlot.assignedElements({ flatten: true }).length > 0
  }

  syncPlaybackState() {
    const paused = this._video.paused
    if (this._playButton) {
      this._playButton.innerHTML = paused ? icons.play : icons.pause
      this._playButton.setAttribute('aria-label', paused ? 'Play' : 'Pause')
      this._playButton.setAttribute('aria-pressed', String(!paused))
    }
    if (this._hideControlsButton) {
      this._hideControlsButton.disabled = paused
      this._hideControlsButton.setAttribute('aria-disabled', String(paused))
      this._hideControlsButton.setAttribute('aria-pressed', String(this.autoHideControls))
      this._hideControlsButton.setAttribute(
        'aria-label',
        this.autoHideControls ? 'Keep controls visible' : 'Automatically hide controls',
      )
    }
    if (paused && this.controlsHidden) {
      this.showControls()
    }
  }

  syncPlaybackRate() {
    const buttons = this.shadowRoot.querySelectorAll('[data-rate]')
    for (let i = 0; i < buttons.length; i++) {
      const active = Math.abs(Number(buttons[i].dataset.rate) - this.playbackRate) < .001
      buttons[i].setAttribute('aria-pressed', String(active))
    }
  }

  syncVolume() {
    if (this._volumeInput) {
      this._volumeInput.value = String(this._video.muted ? 0 : this._video.volume)
    }
    if (this._volumeIconContainer) {
      this._volumeIconContainer.innerHTML = this._video.muted || this._video.volume === 0 ? icons.muted : icons.volume
    }
  }

  updateProgress() {
    const duration = getDuration(this._video)
    const currentTime = clamp(this.currentTime, 0, duration || 0)
    const playedRatio = duration ? currentTime / duration : 0
    const bufferedRatio = duration ? getBufferedEnd(this._video) / duration : 0
    this._progressPlayed.style.width = `${playedRatio * 100}%`
    this._progressBuffered.style.width = `${clamp(bufferedRatio, 0, 1) * 100}%`
    this._progress.style.setProperty('--tot-video-progress-position', `${playedRatio * 100}%`)
    this._progress.setAttribute('aria-valuemax', String(duration))
    this._progress.setAttribute('aria-valuenow', String(currentTime))
    this._progress.setAttribute('aria-valuetext', `${formatTime(currentTime)} / ${formatTime(duration)}`)
  }

  syncFullscreenState() {
    const active = isFullscreen(this._base, this._video)
    if (this._fullscreenButton) {
      this._fullscreenButton.innerHTML = active ? icons.exitFullscreen : icons.fullscreen
      this._fullscreenButton.setAttribute('aria-label', active ? 'Exit fullscreen' : 'Enter fullscreen')
      this._fullscreenButton.setAttribute('aria-pressed', String(active))
    }
    if (active !== this._fullscreenActive) {
      this._fullscreenActive = active
      emitEvent(this, active ? 'enterfullscreen' : 'exitfullscreen')
    }
  }

  handleDocumentPointerDown(event) {
    if (!event.composedPath().includes(this)) {
      this.hideOptions()
    }
  }

  startDocumentListening() {
    if (this._documentListening) {
      return
    }
    this._documentListening = true
    document.addEventListener('pointerdown', this._handleDocumentPointerDown, true)
  }

  stopDocumentListening() {
    if (!this._documentListening) {
      return
    }
    this._documentListening = false
    document.removeEventListener('pointerdown', this._handleDocumentPointerDown, true)
  }
}

function normalizeControls(value) {
  const source = Array.isArray(value) ? value : parseControls(String(value || ''))
  const controls = []
  for (let i = 0; i < source.length; i++) {
    const name = String(source[i])
    if (validControls.has(name) && !controls.includes(name)) {
      controls.push(name)
    }
  }
  return controls
}

function parseControls(value) {
  return normalizeControls(String(value || '').split(/[\s,]+/).filter(Boolean))
}

function normalizeMenuItems(value) {
  if (!Array.isArray(value)) {
    return []
  }

  const items = []
  for (let i = 0; i < value.length; i++) {
    const item = value[i]
    if (!item || typeof item !== 'object') {
      continue
    }
    if (item.type === 'divider') {
      items.push({ type: 'divider' })
    } else if (item.type === 'label' && typeof item.label === 'string') {
      items.push({ type: 'label', label: item.label })
    } else if (item.type === 'item' && typeof item.value === 'string' && typeof item.label === 'string') {
      const normalized = {
        type: 'item',
        value: item.value,
        label: item.label,
      }
      if (item.disabled) {
        normalized.disabled = true
      }
      if (typeof item.suffix === 'string') {
        normalized.suffix = item.suffix
      }
      if (Array.isArray(item.items)) {
        normalized.items = normalizeMenuItems(item.items)
      }
      items.push(normalized)
    }
  }
  return items
}

function parseMenuItems(value) {
  if (!value) {
    return []
  }
  try {
    return normalizeMenuItems(JSON.parse(value))
  } catch {
    return []
  }
}

function cloneMenuItems(value) {
  return normalizeMenuItems(value)
}

function removeClonedMediaChildren(video) {
  const children = video.querySelectorAll('[data-tot-video-clone]')
  for (let i = 0; i < children.length; i++) {
    children[i].remove()
  }
}

function setStringAttribute(element, name, value) {
  const normalized = value == null ? '' : String(value)
  if (normalized) {
    element.setAttribute(name, normalized)
  } else {
    element.removeAttribute(name)
  }
}

function setBooleanAttribute(element, name, value) {
  element.toggleAttribute(name, Boolean(value))
}

function getPositiveNumberAttribute(element, name, fallback) {
  const value = Number(element.getAttribute(name))
  return Number.isFinite(value) && value > 0 ? value : fallback
}

function setPositiveNumberAttribute(element, name, value, fallback) {
  const next = Number(value)
  element.setAttribute(name, String(Number.isFinite(next) && next > 0 ? next : fallback))
}

function syncSeekButton(button, seconds) {
  if (!button) {
    return
  }
  const amount = Math.abs(seconds)
  const prefix = seconds < 0 ? '−' : '+'
  const direction = seconds < 0 ? 'back' : 'forward'
  button.textContent = `${prefix}${formatNumber(amount)}s`
  button.setAttribute('aria-label', `Go ${direction} ${formatNumber(amount)} seconds`)
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)))
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value))
}

function getDuration(video) {
  return Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0
}

function getBufferedEnd(video) {
  if (!video.buffered.length) {
    return 0
  }
  return video.buffered.end(video.buffered.length - 1)
}

function formatTime(value) {
  const seconds = Math.max(0, Math.floor(Number(value) || 0))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainder = seconds % 60
  if (hours) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
  }
  return `${minutes}:${String(remainder).padStart(2, '0')}`
}

function mediaErrorMessage(error) {
  if (!error) {
    return 'Video could not be loaded'
  }
  if (error.code === 1) {
    return 'Video loading was aborted'
  }
  if (error.code === 2) {
    return 'A network error interrupted video loading'
  }
  if (error.code === 3) {
    return 'The video could not be decoded'
  }
  if (error.code === 4) {
    return 'The video source is not supported'
  }
  return error.message || 'Video could not be loaded'
}

function isInteractiveEventTarget(event) {
  const path = event.composedPath()
  for (let i = 0; i < path.length; i++) {
    const node = path[i]
    if (!(node instanceof Element)) {
      continue
    }
    if (node.matches('button, input, select, textarea, a, [role="menuitem"], [contenteditable="true"]')) {
      return true
    }
    if (node.classList.contains('progress')) {
      return true
    }
  }
  return false
}

function isFullscreen(base, video) {
  return document.fullscreenElement === base ||
    document.webkitFullscreenElement === base ||
    Boolean(video.webkitDisplayingFullscreen)
}

function emitEvent(element, name) {
  element.dispatchEvent(new Event(name, { bubbles: true, composed: true }))
}

function emitDetail(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail,
  }))
}
