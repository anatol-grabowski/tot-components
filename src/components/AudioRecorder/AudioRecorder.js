const audioRecorderStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .base {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border-radius: var(--tot-border-radius-large, 6px);
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-small, .875rem);
    gap: var(--tot-spacing-x-small, .5rem);
    padding: var(--tot-spacing-x-small, .5rem);
  }

  .controls {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--tot-spacing-x-small, .5rem);
  }

  button {
    -webkit-appearance: none;
    appearance: none;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    font: inherit;
    min-height: var(--tot-input-height-medium, 2.25rem);
    min-width: var(--tot-input-height-medium, 2.25rem);
    transition:
      var(--tot-transition-fast, 150ms) background-color,
      var(--tot-transition-fast, 150ms) border-color,
      var(--tot-transition-fast, 150ms) color;
  }

  button:hover:not(:disabled) {
    background: var(--tot-input-background-color-hover, #f8fafc);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
    color: var(--tot-input-color-hover, #0f172a);
  }

  button:active:not(:disabled) {
    background: var(--tot-color-neutral-100, #f1f5f9);
  }

  button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  button:disabled {
    cursor: not-allowed;
    opacity: .55;
  }

  button[hidden] {
    display: none;
  }

  .record,
  .pause {
    border-radius: var(--tot-border-radius-circle, 50%);
    display: inline-grid;
    height: var(--tot-audio-recorder-main-control-size, 2.625rem);
    padding: 0;
    place-items: center;
    width: var(--tot-audio-recorder-main-control-size, 2.625rem);
  }

  .record {
    border: 2px solid var(--tot-color-danger-600, #dc2626);
  }

  .pause {
    border: 2px solid var(--tot-input-border-color, #cbd5e1);
  }

  .record::before {
    background: var(--tot-color-danger-600, #dc2626);
    border-radius: var(--tot-border-radius-circle, 50%);
    content: '';
    height: 1.625rem;
    width: 1.625rem;
  }

  .record:disabled::before {
    background: var(--tot-input-color-disabled, var(--tot-color-neutral-500, #64748b));
  }

  .stop {
    border-radius: var(--tot-border-radius-small, 3px);
    display: inline-grid;
    place-items: center;
  }

  .stop::before {
    background: var(--tot-color-danger-600, #dc2626);
    border-radius: var(--tot-border-radius-small, 3px);
    content: '';
    height: 17px;
    width: 17px;
  }

  .stop:disabled::before {
    background: var(--tot-input-color-disabled, var(--tot-color-neutral-500, #64748b));
  }

  .pause {
    gap: .3125rem;
    grid-template-columns: .3125rem .3125rem;
  }

  .pause:hover:not(:disabled) {
    border-color: var(--tot-input-border-color-hover, #94a3b8);
  }

  .pause::before,
  .pause::after {
    background: var(--tot-input-color, #1e293b);
    content: '';
    height: 1.1875rem;
    width: .3125rem;

    position: relative;
    left: 0.7rem;
  }

  .resume::before,
  .resume::after {
    position: relative;
    left: 0;
  }

  .pause:disabled::before,
  .pause:disabled::after {
    background: var(--tot-input-color-disabled, var(--tot-color-neutral-500, #64748b));
  }

  .pause.resume {
    grid-template-columns: 1fr;
  }

  .pause.resume::before {
    background: transparent;
    border-color: transparent transparent transparent var(--tot-input-color, #1e293b);
    border-style: solid;
    border-width: .59375rem 0 .59375rem 1rem;
    height: 0;
    width: 0;
  }

  .pause.resume::after {
    display: none;
  }

  .spacer {
    flex-grow: 1;
  }

  .clear-abort {
    font-size: var(--tot-button-font-size-small, .875rem);
    min-width: 60px;
    padding: 0 var(--tot-spacing-small, .75rem);
  }

  .display,
  .canvas-container {
    position: relative;
  }

  .display {
    min-height: var(--tot-audio-recorder-display-height, 72px);
  }

  .canvas-container.hidden {
    display: none;
  }

  .overlay {
    align-items: flex-end;
    bottom: 50%;
    display: flex;
    justify-content: space-between;
    left: 0;
    padding: 0 var(--tot-spacing-small, .75rem) var(--tot-spacing-2x-small, .25rem);
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
  }

  .time,
  .status {
    color: var(--tot-input-help-text-color, var(--tot-color-neutral-600, #64748b));
    text-shadow:
      0 0 4px var(--tot-color-neutral-50, #f8fafc),
      0 0 4px var(--tot-color-neutral-50, #f8fafc),
      0 0 4px var(--tot-color-neutral-50, #f8fafc);
  }

  .status {
    align-items: center;
    display: inline-flex;
    gap: var(--tot-spacing-2x-small, .25rem);
  }

  .status::before {
    content: none;
    flex: 0 0 auto;
  }

  .status[data-state='ready']::before,
  .status[data-state='recording']::before {
    border-radius: var(--tot-border-radius-circle, 50%);
    content: '';
    height: .625rem;
    width: .625rem;
  }

  .status[data-state='ready']::before {
    background: var(--tot-color-neutral-400, #94a3b8);
  }

  .status[data-state='recording']::before {
    animation: tot-audio-recorder-recording-indicator 1.8s ease-in-out infinite;
    background: var(--tot-color-danger-600, #dc2626);
  }

  .status[data-state='paused']::before {
    background: linear-gradient(
      to right,
      var(--tot-color-warning-600, #d97706) 0 35%,
      transparent 35% 65%,
      var(--tot-color-warning-600, #d97706) 65% 100%
    );
    border-radius: 1px;
    content: '';
    height: .625rem;
    width: .625rem;
  }

  @keyframes tot-audio-recorder-recording-indicator {
    0%, 100% {
      opacity: 1;
    }

    50% {
      opacity: .25;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .status[data-state='recording']::before {
      animation: none;
    }
  }

  .time {
    font-variant-numeric: tabular-nums;
  }

  canvas {
    background: transparent;
    border-radius: var(--tot-border-radius-medium, 4px);
    display: block;
    height: var(--tot-audio-recorder-display-height, 72px);
    min-width: 0;
    width: 100%;
  }

  .playback {
    min-height: var(--tot-audio-recorder-display-height, 72px);
  }

  .playback > tot-audio-player {
    display: block;
  }

  .playback > tot-audio-player::part(base) {
    background: transparent;
    border-radius: 0;
    padding-inline: 0;
  }

  .playback:empty {
    display: none;
  }
`

/**
 * Microphone recorder with pause/resume controls, a live waveform, and
 * playback through `<tot-audio-player>`. While a recording session is active,
 * it holds a screen wake lock when supported so the device does not lock or
 * sleep. Browsers may deny or release the lock; recording continues normally.
 */
export class TotAudioRecorder extends HTMLElement {
  constructor() {
    super()
    this._analyser = null
    this._animation = 0
    this._abortEventPending = false
    this._audioContext = null
    this._canvas = null
    this._canvasContainer = null
    this._chunks = []
    this._clearAbortButton = null
    this._colors = null
    this._duration = 0
    this._elapsedBeforePause = 0
    this._initialized = false
    this._isAbort = false
    this._pauseButton = null
    this._playback = null
    this._permissionStatusTimer = 0
    this._recordButton = null
    this._recordingBlob = null
    this._recordingUrl = ''
    this._recorder = null
    this._resizeObserver = null
    this._startRequest = 0
    this._startedAt = 0
    this._starting = false
    this._status = null
    this._stopButton = null
    this._stream = null
    this._themeDrawFrame = 0
    this._themeDrawTimer = 0
    this._themeObserver = null
    this._themeStylesheetLinks = []
    this._timeLabel = null
    this._timer = 0
    this._wakeLock = null
    this._wakeLockPending = false
    this._handleThemeChange = () => this.scheduleThemeRedraw()
    this._handleThemeStylesheetLoad = () => this.scheduleThemeRedraw()
    this._handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && this.isRecordingInProgress()) {
        void this.acquireWakeLock()
      }
    }
  }

  get mimeType() {
    return this.getAttribute('mime-type') || ''
  }

  set mimeType(value) {
    if (value) {
      this.setAttribute('mime-type', value)
    } else {
      this.removeAttribute('mime-type')
    }
  }

  get state() {
    if (this._starting) {
      return 'starting'
    }
    return this._recorder ? this._recorder.state : 'inactive'
  }

  get blob() {
    return this._recordingBlob
  }

  get url() {
    return this._recordingUrl
  }

  get duration() {
    return this._duration
  }

  connectedCallback() {
    this.initialize()
    this.observeThemeChanges()
    this.observeSize()
    document.addEventListener('visibilitychange', this._handleVisibilityChange)
    this.ensurePlayback()
    this.restoreUi()
  }

  disconnectedCallback() {
    document.removeEventListener('visibilitychange', this._handleVisibilityChange)
    this.stopObservingSize()
    this.stopObservingThemeChanges()
    this._startRequest++
    this._starting = false
    this._abortEventPending = false
    this._isAbort = true
    if (this._recorder && this._recorder.state !== 'inactive') {
      try {
        this._recorder.stop()
      } catch {}
    }
    this.clearPermissionStatusTimer()
    this.stopTimerAndAnimation()
    this.stopTracks()
    this.releaseRecordingUrl()
  }

  async startRecording() {
    if (this._starting || this.isRecordingInProgress()) {
      return
    }

    const request = ++this._startRequest
    this._starting = true
    this.showStartingUi()
    this.schedulePermissionStatus(request)
    let stream
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (error) {
      if (request !== this._startRequest) {
        return
      }
      this._starting = false
      this.clearPermissionStatusTimer()
      const message = error && error.name === 'NotAllowedError'
        ? 'Microphone permission was denied'
        : 'Microphone is unavailable'
      this.showIdleUi(message)
      emitDetail(this, 'recording-error', { message })
      return
    }

    if (request !== this._startRequest || !this.isConnected) {
      stopMediaStream(stream)
      return
    }

    this._stream = stream
    this.clearPermissionStatusTimer()
    try {
      const options = this.mimeType && MediaRecorder.isTypeSupported(this.mimeType)
        ? { mimeType: this.mimeType }
        : undefined
      this._recorder = new MediaRecorder(stream, options)
    } catch {
      this._starting = false
      this.clearPermissionStatusTimer()
      this.stopTracks()
      const message = 'Recording is not supported in this browser'
      this.showIdleUi(message)
      emitDetail(this, 'recording-error', { message })
      return
    }

    this._chunks = []
    this._elapsedBeforePause = 0
    this._startedAt = performance.now()
    this._isAbort = false
    this._recorder.addEventListener('dataavailable', event => {
      if (event.data && event.data.size > 0) {
        this._chunks.push(event.data)
      }
    })
    this._recorder.addEventListener('stop', () => {
      if (this._isAbort) {
        this.cleanupAfterAbort()
      } else {
        this.finishRecording()
      }
    }, { once: true })

    try {
      this._recorder.start()
    } catch {
      this._starting = false
      this.clearPermissionStatusTimer()
      this._recorder = null
      this.stopTracks()
      const message = 'Recording could not be started'
      this.showIdleUi(message)
      emitDetail(this, 'recording-error', { message })
      return
    }

    this._starting = false
    this.showRecordingUi()
    this._timer = window.setInterval(() => this.updateElapsed(), 250)
    this.setupAnalyser()
    this.drawLiveWave()
    void this.acquireWakeLock()
    emitEvent(this, 'recording-start')
  }

  togglePause() {
    if (!this._recorder) {
      return
    }

    if (this._recorder.state === 'recording') {
      this.captureActiveElapsed()
      this._recorder.pause()
      this.updateElapsed()
      this.showPausedUi()
      cancelAnimationFrame(this._animation)
      this._animation = 0
      this.drawFlatWave()
      emitEvent(this, 'recording-pause')
    } else if (this._recorder.state === 'paused') {
      this._startedAt = performance.now()
      this._recorder.resume()
      this.showRecordingUi()
      this.drawLiveWave()
      emitEvent(this, 'recording-resume')
    }
  }

  stopRecording() {
    if (!this._recorder || this._recorder.state === 'inactive') {
      return
    }
    this.captureActiveElapsed()
    this.updateElapsed()
    this._pauseButton.disabled = true
    this._stopButton.disabled = true
    this._clearAbortButton.disabled = true
    this._recorder.stop()
  }

  abortRecording() {
    if (this._starting) {
      this._abortEventPending = true
      this._startRequest++
      this._starting = false
      this.clearPermissionStatusTimer()
      this.cleanupAfterAbort()
      return
    }

    if (!this._recorder || this._recorder.state === 'inactive') {
      return
    }

    this._abortEventPending = true
    this._isAbort = true
    this._pauseButton.disabled = true
    this._stopButton.disabled = true
    this._clearAbortButton.disabled = true
    this._recorder.stop()
  }

  clearRecording() {
    if (this._starting || this.isRecordingInProgress() || !this._recordingBlob) {
      return
    }
    this._recordingBlob = null
    this._duration = 0
    this.releaseRecordingUrl()
    this._playback.replaceChildren()
    this._startedAt = 0
    this._elapsedBeforePause = 0
    this.showIdleUi('Ready')
    this.drawFlatWave()
    emitEvent(this, 'recording-clear')
  }

  isRecordingInProgress() {
    return Boolean(this._recorder && this._recorder.state !== 'inactive')
  }

  getElapsedSeconds() {
    let elapsed = this._elapsedBeforePause
    if (this._startedAt) {
      elapsed += performance.now() - this._startedAt
    }
    return elapsed / 1000
  }

  getMediaRecorder() {
    return this._recorder
  }

  getMediaStream() {
    return this._stream
  }

  getPlayer() {
    return this._playback ? this._playback.querySelector('tot-audio-player') : null
  }

  initialize() {
    if (this._initialized) {
      return
    }

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${audioRecorderStyle}</style>
      <div class="base" part="base">
        <div class="controls" part="controls">
          <button class="record" part="record-button" type="button" aria-label="Record"></button>
          <button class="pause" part="pause-button" type="button" aria-label="Pause" disabled hidden></button>
          <button class="stop" part="stop-button" type="button" aria-label="Stop" disabled></button>
          <div class="spacer"></div>
          <button class="clear-abort" part="clear-button" type="button" disabled>Clear</button>
        </div>
        <div class="display" part="display">
          <div class="canvas-container" part="waveform-container">
            <canvas part="waveform"></canvas>
            <div class="overlay" part="overlay">
              <span class="status" part="status" role="status" aria-live="polite">Ready</span>
              <span class="time" part="time">0:00</span>
            </div>
          </div>
          <div class="playback" part="playback"></div>
        </div>
      </div>
    `

    this._recordButton = root.querySelector('.record')
    this._stopButton = root.querySelector('.stop')
    this._pauseButton = root.querySelector('.pause')
    this._clearAbortButton = root.querySelector('.clear-abort')
    this._timeLabel = root.querySelector('.time')
    this._status = root.querySelector('.status')
    this._canvasContainer = root.querySelector('.canvas-container')
    this._canvas = root.querySelector('canvas')
    this._playback = root.querySelector('.playback')
    this._recordButton.addEventListener('click', () => void this.startRecording())
    this._stopButton.addEventListener('click', () => this.stopRecording())
    this._pauseButton.addEventListener('click', () => this.togglePause())
    this._clearAbortButton.addEventListener('click', () => {
      if (this._starting || this.isRecordingInProgress()) {
        this.abortRecording()
      } else {
        this.clearRecording()
      }
    })
    this._initialized = true
  }

  observeSize() {
    if (this._resizeObserver) {
      return
    }
    this._resizeObserver = new ResizeObserver(() => {
      if (this._recorder && this._recorder.state === 'recording' && this._analyser) {
        return
      }
      this.drawFlatWave()
    })
    this._resizeObserver.observe(this._canvas)
  }

  stopObservingSize() {
    if (!this._resizeObserver) {
      return
    }
    this._resizeObserver.disconnect()
    this._resizeObserver = null
  }

  observeThemeChanges() {
    if (this._themeObserver) {
      return
    }

    this._themeObserver = new MutationObserver(records => {
      let headChanged = false
      for (let i = 0; i < records.length; i++) {
        if (document.head && (records[i].target === document.head || document.head.contains(records[i].target))) {
          headChanged = true
          break
        }
      }
      if (headChanged) {
        this.syncThemeStylesheetListeners()
      }
      this.scheduleThemeRedraw()
    })

    if (document.body) {
      this._themeObserver.observe(document.body, {
        attributeFilter: ['class', 'style'],
        attributes: true,
      })
    }
    this._themeObserver.observe(document.documentElement, {
      attributeFilter: ['class', 'style'],
      attributes: true,
    })
    if (document.head) {
      this._themeObserver.observe(document.head, {
        attributeFilter: ['href', 'media', 'disabled'],
        attributes: true,
        childList: true,
        subtree: true,
      })
    }

    window.addEventListener('tot-theme-change', this._handleThemeChange)
    document.addEventListener('tot-theme-change', this._handleThemeChange)
    this.syncThemeStylesheetListeners()
  }

  stopObservingThemeChanges() {
    if (this._themeObserver) {
      this._themeObserver.disconnect()
      this._themeObserver = null
    }
    this.clearThemeStylesheetListeners()
    window.removeEventListener('tot-theme-change', this._handleThemeChange)
    document.removeEventListener('tot-theme-change', this._handleThemeChange)
    cancelAnimationFrame(this._themeDrawFrame)
    window.clearTimeout(this._themeDrawTimer)
    this._themeDrawFrame = 0
    this._themeDrawTimer = 0
  }

  scheduleThemeRedraw() {
    this._colors = null
    if (this._recorder && this._recorder.state === 'recording' && this._analyser) {
      return
    }

    cancelAnimationFrame(this._themeDrawFrame)
    window.clearTimeout(this._themeDrawTimer)
    const draw = () => {
      if (this.isConnected) {
        this.drawFlatWave()
      }
    }
    this._themeDrawFrame = requestAnimationFrame(draw)
    this._themeDrawTimer = window.setTimeout(draw, 100)
  }

  syncThemeStylesheetListeners() {
    this.clearThemeStylesheetListeners()
    const links = document.querySelectorAll('link[rel~="stylesheet"]')
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('load', this._handleThemeStylesheetLoad)
      this._themeStylesheetLinks.push(links[i])
    }
  }

  clearThemeStylesheetListeners() {
    for (let i = 0; i < this._themeStylesheetLinks.length; i++) {
      this._themeStylesheetLinks[i].removeEventListener('load', this._handleThemeStylesheetLoad)
    }
    this._themeStylesheetLinks = []
  }

  async acquireWakeLock() {
    if (
      this._wakeLock
      || this._wakeLockPending
      || !this.isConnected
      || !this.isRecordingInProgress()
      || document.visibilityState !== 'visible'
      || !('wakeLock' in navigator)
    ) {
      return
    }

    this._wakeLockPending = true
    try {
      const wakeLock = await navigator.wakeLock.request('screen')
      if (!this.isConnected || !this.isRecordingInProgress()) {
        await wakeLock.release()
        return
      }
      this._wakeLock = wakeLock
      wakeLock.addEventListener('release', () => {
        if (this._wakeLock === wakeLock) {
          this._wakeLock = null
        }
      }, { once: true })
    } catch {
      // Recording remains available when wake lock is unsupported or denied.
    } finally {
      this._wakeLockPending = false
    }
  }

  async releaseWakeLock() {
    const wakeLock = this._wakeLock
    this._wakeLock = null
    if (!wakeLock || wakeLock.released) {
      return
    }
    try {
      await wakeLock.release()
    } catch {
      // The browser may already have released the lock.
    }
  }

  setupAnalyser() {
    try {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext
      if (!AudioContextConstructor) {
        return
      }
      this._audioContext = new AudioContextConstructor()
      const source = this._audioContext.createMediaStreamSource(this._stream)
      this._analyser = this._audioContext.createAnalyser()
      this._analyser.fftSize = 1024
      source.connect(this._analyser)
    } catch {
      this._analyser = null
    }
  }

  drawLiveWave() {
    cancelAnimationFrame(this._animation)
    this._animation = 0
    if (!this._canvas || !this._analyser) {
      this.drawFlatWave()
      return
    }

    const data = new Uint8Array(this._analyser.fftSize)
    const draw = () => {
      if (!this._analyser || !this._recorder || this._recorder.state !== 'recording') {
        this._animation = 0
        return
      }
      this._analyser.getByteTimeDomainData(data)
      this.drawWaveData(data)
      this._animation = requestAnimationFrame(draw)
    }
    draw()
  }

  drawWaveData(data) {
    const canvas = this.prepareCanvas()
    if (!canvas) {
      return
    }
    const { context, height, width } = canvas
    const colors = this.getColors()
    context.strokeStyle = colors.primary
    context.lineWidth = 2
    context.beginPath()
    for (let i = 0; i < data.length; i++) {
      const x = i / (data.length - 1) * width
      const y = data[i] / 255 * height
      if (i === 0) {
        context.moveTo(x, y)
      } else {
        context.lineTo(x, y)
      }
    }
    context.stroke()
  }

  drawFlatWave() {
    const canvas = this.prepareCanvas()
    if (!canvas) {
      return
    }
    const { context, height, width } = canvas
    const colors = this.getColors()
    context.strokeStyle = colors.idle
    context.lineWidth = 1.5
    context.beginPath()
    context.moveTo(0, height / 2)
    context.lineTo(width, height / 2)
    context.stroke()
  }

  prepareCanvas() {
    if (!this._canvas) {
      return null
    }
    const width = this._canvas.clientWidth
    const height = this._canvas.clientHeight
    if (!width || !height) {
      return null
    }
    const ratio = window.devicePixelRatio || 1
    const pixelWidth = Math.max(1, Math.floor(width * ratio))
    const pixelHeight = Math.max(1, Math.floor(height * ratio))
    if (this._canvas.width !== pixelWidth || this._canvas.height !== pixelHeight) {
      this._canvas.width = pixelWidth
      this._canvas.height = pixelHeight
    }
    const context = this._canvas.getContext('2d')
    if (!context) {
      return null
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    context.clearRect(0, 0, width, height)
    return { context, height, width }
  }

  getColors() {
    if (!this._colors) {
      this._colors = {
        idle: getResolvedColor(this, '--tot-color-neutral-300', '#cbd5e1'),
        primary: getResolvedColor(this, '--tot-color-primary-600', '#0284c7'),
      }
    }
    return this._colors
  }

  finishRecording() {
    this.stopTimerAndAnimation()
    this.captureActiveElapsed(true)
    const duration = this.getElapsedSeconds()
    const recorder = this._recorder
    const type = recorder && recorder.mimeType ? recorder.mimeType : 'audio/webm'
    const blob = new Blob(this._chunks, { type })
    this._chunks = []
    this._recorder = null
    this.stopTracks()
    this._recordingBlob = blob
    this._duration = duration
    this.releaseRecordingUrl()
    this.ensurePlayback()
    this.showPlaybackUi()
    emitDetail(this, 'recording-stop', {
      blob,
      duration,
      url: this._recordingUrl,
    })
  }

  cleanupAfterAbort() {
    const emitAbort = this._abortEventPending
    this._abortEventPending = false
    this.stopTimerAndAnimation()
    this.stopTracks()
    this._chunks = []
    this._recorder = null
    this._startedAt = 0
    this._elapsedBeforePause = 0
    this._isAbort = false
    if (this.isConnected) {
      this.ensurePlayback()
      this.restoreUi()
    }
    if (emitAbort) {
      emitEvent(this, 'recording-abort')
    }
  }

  captureActiveElapsed(force = false) {
    if (!this._startedAt) {
      return
    }
    const recording = this._recorder && this._recorder.state === 'recording'
    if (!force && !recording) {
      return
    }
    this._elapsedBeforePause += performance.now() - this._startedAt
    this._startedAt = 0
  }

  updateElapsed() {
    this._timeLabel.textContent = formatTime(this.getElapsedSeconds())
  }

  stopTimerAndAnimation() {
    window.clearInterval(this._timer)
    cancelAnimationFrame(this._animation)
    this._timer = 0
    this._animation = 0
  }

  stopTracks() {
    void this.releaseWakeLock()
    if (this._stream) {
      stopMediaStream(this._stream)
      this._stream = null
    }
    if (this._audioContext) {
      void this._audioContext.close().catch(() => {})
      this._audioContext = null
    }
    this._analyser = null
  }

  ensurePlayback() {
    if (!this._playback || !this._recordingBlob) {
      return
    }
    if (!this._recordingUrl) {
      this._recordingUrl = URL.createObjectURL(this._recordingBlob)
    }
    let player = this.getPlayer()
    if (!player) {
      player = document.createElement('tot-audio-player')
      this._playback.replaceChildren(player)
    }
    player.src = this._recordingUrl
  }

  releaseRecordingUrl() {
    if (!this._recordingUrl) {
      return
    }
    const player = this.getPlayer()
    if (player && player.src === this._recordingUrl) {
      player.src = ''
    }
    URL.revokeObjectURL(this._recordingUrl)
    this._recordingUrl = ''
  }

  restoreUi() {
    if (this._starting) {
      this.showStartingUi()
    } else if (this._recorder && this._recorder.state === 'recording') {
      this.showRecordingUi()
    } else if (this._recorder && this._recorder.state === 'paused') {
      this.showPausedUi()
    } else if (this._recordingBlob) {
      this.showPlaybackUi()
    } else {
      this.showIdleUi('Ready')
      requestAnimationFrame(() => this.drawFlatWave())
    }
  }

  showStartingUi() {
    this._recordButton.hidden = false
    this._recordButton.disabled = true
    this._pauseButton.hidden = true
    this._pauseButton.disabled = true
    this._stopButton.disabled = true
    this._clearAbortButton.textContent = 'Abort'
    this._clearAbortButton.disabled = false
    this._canvasContainer.classList.remove('hidden')
    this._playback.style.display = 'none'
    this._timeLabel.textContent = formatTime(0)
    this.setStatus('Ready', 'ready')
    this.drawFlatWave()
  }

  schedulePermissionStatus(request) {
    this.clearPermissionStatusTimer()
    this._permissionStatusTimer = window.setTimeout(() => {
      this._permissionStatusTimer = 0
      if (this._starting && request === this._startRequest) {
        this.setStatus('Requesting microphone')
      }
    }, 300)
  }

  clearPermissionStatusTimer() {
    window.clearTimeout(this._permissionStatusTimer)
    this._permissionStatusTimer = 0
  }

  showRecordingUi() {
    this._recordButton.hidden = true
    this._recordButton.disabled = false
    this._pauseButton.hidden = false
    this._pauseButton.disabled = false
    this._pauseButton.classList.remove('resume')
    this._pauseButton.setAttribute('aria-label', 'Pause')
    this._stopButton.disabled = false
    this._clearAbortButton.textContent = 'Abort'
    this._clearAbortButton.disabled = false
    this._canvasContainer.classList.remove('hidden')
    this._playback.style.display = 'none'
    this.setStatus('Recording', 'recording')
  }

  showPausedUi() {
    this._recordButton.hidden = true
    this._pauseButton.hidden = false
    this._pauseButton.disabled = false
    this._pauseButton.classList.add('resume')
    this._pauseButton.setAttribute('aria-label', 'Resume')
    this._stopButton.disabled = false
    this._clearAbortButton.textContent = 'Abort'
    this._clearAbortButton.disabled = false
    this._canvasContainer.classList.remove('hidden')
    this._playback.style.display = 'none'
    this.setStatus('Paused', 'paused')
  }

  showPlaybackUi() {
    this._recordButton.hidden = false
    this._recordButton.disabled = false
    this._pauseButton.hidden = true
    this._pauseButton.disabled = true
    this._pauseButton.classList.remove('resume')
    this._stopButton.disabled = true
    this._clearAbortButton.textContent = 'Clear'
    this._clearAbortButton.disabled = false
    this._canvasContainer.classList.add('hidden')
    this._playback.style.display = ''
    this._timeLabel.textContent = formatTime(this._duration)
    this.setStatus('')
  }

  showIdleUi(status) {
    this._recordButton.hidden = false
    this._recordButton.disabled = false
    this._pauseButton.hidden = true
    this._pauseButton.disabled = true
    this._pauseButton.classList.remove('resume')
    this._stopButton.disabled = true
    this._clearAbortButton.textContent = 'Clear'
    this._clearAbortButton.disabled = !this._recordingBlob
    this._canvasContainer.classList.toggle('hidden', Boolean(this._recordingBlob))
    this._playback.style.display = this._recordingBlob ? '' : 'none'
    this._timeLabel.textContent = formatTime(0)
    this.setStatus(status, status === 'Ready' ? 'ready' : '')
  }

  setStatus(message, state = '') {
    this._status.textContent = message
    if (state) {
      this._status.dataset.state = state
    } else {
      delete this._status.dataset.state
    }
  }
}

function emitEvent(element, name) {
  element.dispatchEvent(new Event(name, {
    bubbles: true,
    composed: true,
  }))
}

function emitDetail(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail,
  }))
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    seconds = 0
  }
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.floor(seconds % 60)
  return `${minutes}:${String(remainder).padStart(2, '0')}`
}

function getResolvedColor(element, propertyName, fallback) {
  return getComputedStyle(element).getPropertyValue(propertyName).trim() || fallback
}

function stopMediaStream(stream) {
  const tracks = stream.getTracks()
  for (let i = 0; i < tracks.length; i++) {
    tracks[i].stop()
  }
}
