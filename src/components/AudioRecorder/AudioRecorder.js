const audioRecorderStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .recorder {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
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
    border: 2px solid var(--tot-color-danger-600, #dc2626);
    border-radius: var(--tot-border-radius-circle, 50%);
    display: inline-grid;
    height: var(--tot-audio-recorder-main-control-size, 2.625rem);
    padding: 0;
    place-items: center;
    width: var(--tot-audio-recorder-main-control-size, 2.625rem);
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

  .time {
    font-variant-numeric: tabular-nums;
  }

  canvas {
    background: var(--tot-color-neutral-50, #f8fafc);
    border-radius: var(--tot-border-radius-medium, 4px);
    display: block;
    height: 68px;
    min-width: 0;
    width: 100%;
  }

  .playback {
    min-height: 0;
  }

  .playback:empty {
    display: none;
  }
`

export class TotAudioRecorder extends HTMLElement {
  constructor() {
    super()
    this._stream = null
    this._recorder = null
    this._chunks = []
    this._startedAt = 0
    this._elapsedBeforePause = 0
    this._timer = 0
    this._animation = 0
    this._analyser = null
    this._audioContext = null
    this._resizeObserver = null
    this._themeObserver = null
    this._themeStylesheetLinks = []
    this._handleThemeChange = () => this.scheduleThemeRedraw()
    this._handleThemeStylesheetLoad = () => this.scheduleThemeRedraw()
    this._isAbort = false
  }

  connectedCallback() {
    this.observeThemeChanges()
    this.render()
  }

  disconnectedCallback() {
    this.stopTracks()
    clearInterval(this._timer)
    cancelAnimationFrame(this._animation)
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    }
    if (this._themeObserver) {
      this._themeObserver.disconnect()
      this._themeObserver = null
    }
    this.clearThemeStylesheetListeners()
    window.removeEventListener('tot-theme-change', this._handleThemeChange)
    document.removeEventListener('tot-theme-change', this._handleThemeChange)
  }

  render() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    }

    const root = getRoot(this)
    root.innerHTML = `<style>${audioRecorderStyle}</style>
      <div class="recorder">
        <div class="controls">
          <button class="record" type="button" aria-label="Record"></button>
          <button class="pause" type="button" aria-label="Pause" disabled hidden></button>
          <button class="stop" type="button" aria-label="Stop" disabled></button>
          <div class="spacer"></div>
          <button class="clear-abort" type="button" disabled>Clear</button>
        </div>
        <div class="display">
          <div class="canvas-container">
            <canvas></canvas>
            <div class="overlay">
              <span class="status">Ready</span>
              <span class="time">0:00</span>
            </div>
          </div>
          <div class="playback"></div>
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

    this._resizeObserver = new ResizeObserver(() => {
      if ((!this._recorder || this._recorder.state === 'inactive') && !this._playback.innerHTML) {
        this.drawFlatWave()
      } else if (this._recorder && this._recorder.state === 'paused') {
        this.drawFlatWave()
      }
    })
    this._resizeObserver.observe(this._canvas)

    this._stopButton.addEventListener('click', () => this.stopRecording())
    this._pauseButton.addEventListener('click', () => this.togglePause())
    this._clearAbortButton.addEventListener('click', () => this.handleClearAbort())
    setTimeout(() => this.drawFlatWave(), 0)
  }

  observeThemeChanges() {
    if (this._themeObserver) {
      return
    }

    this._themeObserver = new MutationObserver(() => {
      this.syncThemeStylesheetListeners()
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
        attributeFilter: ['href', 'media', 'disabled', 'class', 'style'],
        attributes: true,
        childList: true,
        subtree: true,
      })
    }

    window.addEventListener('tot-theme-change', this._handleThemeChange)
    document.addEventListener('tot-theme-change', this._handleThemeChange)
    this.syncThemeStylesheetListeners()
  }

  scheduleThemeRedraw() {
    const draw = () => {
      if (!this.isConnected) {
        return
      }

      if (this._recorder && this._recorder.state === 'recording' && this._analyser) {
        return
      }

      this.drawFlatWave()
    }

    requestAnimationFrame(draw)
    window.setTimeout(draw, 60)
    window.setTimeout(draw, 180)
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

  async startRecording() {
    try {
      this._stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (error) {
      const message = error && error.name === 'NotAllowedError'
        ? 'Microphone permission was denied'
        : 'Microphone is unavailable'
      this.setStatus(message)
      emit(this, 'recording-error', { message })
      return
    }

    try {
      const mimeType = this.getAttribute('mime-type') || ''
      const options = mimeType && MediaRecorder.isTypeSupported(mimeType) ? { mimeType } : undefined
      this._recorder = new MediaRecorder(this._stream, options)
    } catch (error) {
      this.setStatus('Recording is not supported in this browser')
      emit(this, 'recording-error', { message: 'Recording is not supported in this browser' })
      this.stopTracks()
      return
    }

    this._chunks = []
    this._elapsedBeforePause = 0
    this._startedAt = performance.now()
    this._recorder.addEventListener('dataavailable', event => {
      if (event.data && event.data.size > 0) {
        this._chunks.push(event.data)
      }
    })
    this._recorder.addEventListener('stop', () => {
      if (this._isAbort) {
        this._cleanupAfterAbort()
      } else {
        this.finishRecording()
      }
    })
    this._recorder.start()
    this._playback.style.display = 'none'
    this._recordButton.hidden = true
    this._recordButton.disabled = false
    this._pauseButton.hidden = false
    this._pauseButton.disabled = false
    this._stopButton.disabled = false
    this._pauseButton.classList.remove('resume')
    this._pauseButton.setAttribute('aria-label', 'Pause')
    this._clearAbortButton.textContent = 'Abort'
    this._clearAbortButton.disabled = false
    this.setStatus('Recording')
    this._canvasContainer.classList.remove('hidden')
    this._timer = setInterval(() => this.updateElapsed(), 250)
    this.setupAnalyser()
    this.drawLiveWave()
    emit(this, 'recording-start')
  }

  setupAnalyser() {
    try {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext
      this._audioContext = new AudioContextConstructor()
      const source = this._audioContext.createMediaStreamSource(this._stream)
      this._analyser = this._audioContext.createAnalyser()
      this._analyser.fftSize = 1024
      source.connect(this._analyser)
    } catch (error) {
      this._analyser = null
    }
  }

  drawLiveWave() {
    if (!this._canvas || !this._analyser) {
      this.drawFlatWave()
      return
    }
    const rect = this._canvas.getBoundingClientRect()
    if (!rect.width || !rect.height) {
      return
    }
    const ratio = window.devicePixelRatio || 1
    this._canvas.width = Math.max(1, Math.floor(rect.width * ratio))
    this._canvas.height = Math.max(1, Math.floor(rect.height * ratio))
    const ctx = this._canvas.getContext('2d')
    ctx.scale(ratio, ratio)
    const data = new Uint8Array(this._analyser.fftSize)
    const draw = () => {
      if (!this._analyser) {
        return
      }
      this._analyser.getByteTimeDomainData(data)
      ctx.clearRect(0, 0, rect.width, rect.height)
      ctx.fillStyle = getResolvedColor(this, '--tot-color-neutral-50', '#f8fafc')
      ctx.fillRect(0, 0, rect.width, rect.height)
      ctx.strokeStyle = getResolvedColor(this, '--tot-color-primary-600', '#0284c7')
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = 0; i < data.length; i++) {
        const x = i / (data.length - 1) * rect.width
        const y = data[i] / 255 * rect.height
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      ctx.strokeStyle = getResolvedColor(this, '--tot-panel-border-color', '#e2e8f0')
      ctx.strokeRect(.5, .5, rect.width - 1, rect.height - 1)
      this._animation = requestAnimationFrame(draw)
    }
    draw()
  }

  togglePause() {
    if (!this._recorder) {
      return
    }
    if (this._recorder.state === 'recording') {
      this._recorder.pause()
      this._elapsedBeforePause += performance.now() - this._startedAt
      this.setStatus('Paused')
      this._pauseButton.setAttribute('aria-label', 'Resume')
      this._pauseButton.classList.add('resume')
      cancelAnimationFrame(this._animation)
      this._animation = 0
      this.drawFlatWave()
      emit(this, 'recording-pause')
    } else if (this._recorder.state === 'paused') {
      this._startedAt = performance.now()
      this._recorder.resume()
      this.setStatus('Recording')
      this._pauseButton.setAttribute('aria-label', 'Pause')
      this._pauseButton.classList.remove('resume')
      this.drawLiveWave()
      emit(this, 'recording-resume')
    }
  }

  stopRecording() {
    if (this._recorder && this._recorder.state !== 'inactive') {
      this._recorder.stop()
    }
  }

  finishRecording() {
    clearInterval(this._timer)
    cancelAnimationFrame(this._animation)
    const duration = this.getElapsedSeconds()
    const type = this._recorder && this._recorder.mimeType ? this._recorder.mimeType : 'audio/webm'
    const blob = new Blob(this._chunks, { type })
    const url = URL.createObjectURL(blob)
    const player = document.createElement('tot-audio-player')
    player.src = url
    this._playback.style.display = ''
    this._playback.innerHTML = ''
    this._playback.append(player)
    this._recordButton.hidden = false
    this._recordButton.disabled = false
    this._pauseButton.hidden = true
    this._pauseButton.disabled = true
    this._stopButton.disabled = true
    this._pauseButton.classList.remove('resume')
    this._canvasContainer.classList.add('hidden')
    this._clearAbortButton.textContent = 'Clear'
    this._clearAbortButton.disabled = false
    this.setStatus('')
    this.stopTracks()
    emit(this, 'recording-stop', { blob, url, duration })
  }

  handleClearAbort() {
    if (this._clearAbortButton.textContent === 'Abort') {
      this.abortRecording()
    } else {
      this.clearRecording()
    }
  }

  abortRecording() {
    this._isAbort = true
    if (this._recorder && this._recorder.state !== 'inactive') {
      this._recorder.stop()
    } else {
      this._cleanupAfterAbort()
    }
  }

  _cleanupAfterAbort() {
    clearInterval(this._timer)
    cancelAnimationFrame(this._animation)
    this.stopTracks()
    this._isAbort = false
    this._recordButton.hidden = false
    this._recordButton.disabled = false
    this._pauseButton.hidden = true
    this._pauseButton.disabled = true
    this._stopButton.disabled = true
    this._pauseButton.classList.remove('resume')
    this._clearAbortButton.textContent = 'Clear'

    this.setStatus('Ready')
    this._timeLabel.textContent = formatTime(0)

    if (this._playback.innerHTML) {
      this._playback.style.display = ''
      this._canvasContainer.classList.add('hidden')
      this._clearAbortButton.disabled = false
    } else {
      this._canvasContainer.classList.remove('hidden')
      this._clearAbortButton.disabled = true
      this.drawFlatWave()
    }
  }

  updateElapsed() {
    this._timeLabel.textContent = formatTime(this.getElapsedSeconds())
  }

  getElapsedSeconds() {
    let elapsed = this._elapsedBeforePause
    if (this._recorder && this._recorder.state === 'recording') {
      elapsed += performance.now() - this._startedAt
    }
    return elapsed / 1000
  }

  setStatus(message) {
    this._status.textContent = message
  }

  drawFlatWave() {
    if (!this._canvas) {
      return
    }
    const rect = this._canvas.getBoundingClientRect()
    if (!rect.width || !rect.height) {
      return
    }
    const ratio = window.devicePixelRatio || 1
    this._canvas.width = Math.max(1, Math.floor(rect.width * ratio))
    this._canvas.height = Math.max(1, Math.floor(rect.height * ratio))
    const ctx = this._canvas.getContext('2d')
    ctx.scale(ratio, ratio)
    ctx.fillStyle = getResolvedColor(this, '--tot-color-neutral-50', '#f8fafc')
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.strokeStyle = getResolvedColor(this, '--tot-color-neutral-300', '#cbd5e1')
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(0, rect.height / 2)
    ctx.lineTo(rect.width, rect.height / 2)
    ctx.stroke()
  }

  clearRecording() {
    const player = this._playback.querySelector('tot-audio-player')
    if (player && player.src && player.src.startsWith('blob:')) {
      URL.revokeObjectURL(player.src)
    }
    this._playback.innerHTML = ''
    this._recordButton.hidden = false
    this._recordButton.disabled = false
    this._pauseButton.hidden = true
    this._pauseButton.disabled = true
    this._stopButton.disabled = true
    this._canvasContainer.classList.remove('hidden')
    this._clearAbortButton.disabled = true
    this._timeLabel.textContent = formatTime(0)
    this.setStatus('Ready')
    this.drawFlatWave()
  }

  stopTracks() {
    if (this._stream) {
      const tracks = this._stream.getTracks()
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].stop()
      }
      this._stream = null
    }
    if (this._audioContext) {
      void this._audioContext.close()
      this._audioContext = null
    }
    this._analyser = null
  }
}

function getRoot(element) {
  return element.shadowRoot || element.attachShadow({ mode: 'open' })
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    seconds = 0
  }
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}

function getResolvedColor(element, propertyName, fallback) {
  const root = element.shadowRoot
  if (!root) {
    return fallback
  }

  const probe = document.createElement('span')
  probe.style.color = `var(${propertyName}, ${fallback})`
  probe.style.display = 'none'
  root.append(probe)
  const color = getComputedStyle(probe).color || fallback
  probe.remove()
  return color
}
