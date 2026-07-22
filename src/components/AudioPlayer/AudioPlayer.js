const audioPlayerStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .base {
    -webkit-tap-highlight-color: transparent;
    align-items: center;
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border-radius: var(--tot-border-radius-large, 6px);
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-small, .875rem);
    gap: var(--tot-spacing-x-small, .5rem);
    grid-template-columns: auto minmax(0, 1fr) auto;
    max-width: 100%;
    padding: var(--tot-spacing-x-small, .5rem);
  }

  button {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-input-border-radius-medium, var(--tot-border-radius-medium, 4px));
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    justify-content: center;
    min-height: var(--tot-input-height-small, 1.875rem);
    min-width: var(--tot-input-height-small, 1.875rem);
    padding: 0 var(--tot-spacing-2x-small, .25rem);
  }

  button:hover:not(:disabled) {
    background: var(--tot-input-background-color-hover, #f8fafc);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
    color: var(--tot-input-color-hover, #0f172a);
  }

  button:focus-visible,
  canvas:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  button:disabled {
    cursor: not-allowed;
    opacity: .55;
  }

  canvas {
    -webkit-tap-highlight-color: transparent;
    background: transparent;
    border-radius: var(--tot-border-radius-medium, 4px);
    cursor: pointer;
    display: block;
    height: 54px;
    min-width: 0;
    touch-action: none;
    width: 100%;
  }

  canvas[aria-disabled='true'] {
    cursor: default;
  }

  .time {
    color: var(--tot-input-help-text-color, var(--tot-color-neutral-600, #64748b));
    font-size: var(--tot-font-size-x-small, .75rem);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  audio {
    display: none;
  }
`

export class TotAudioPlayer extends HTMLElement {
  static get observedAttributes() {
    return ['src']
  }

  constructor() {
    super()
    this._audio = null
    this._blob = null
    this._button = null
    this._canvas = null
    this._colors = null
    this._dragging = false
    this._initialized = false
    this._objectUrl = ''
    this._objectUrlCleanupTimer = 0
    this._resizeObserver = null
    this._settingSourceAttribute = false
    this._themeDrawFrame = 0
    this._themeDrawTimer = 0
    this._themeObserver = null
    this._themeStylesheetLinks = []
    this._time = null
    this._wave = []
    this._waveAbortController = null
    this._waveRequest = 0
    this._handleThemeChange = () => this.scheduleThemeRedraw()
    this._handleThemeStylesheetLoad = () => this.scheduleThemeRedraw()
  }

  get src() {
    return this.getAttribute('src') || ''
  }

  set src(value) {
    this._blob = null
    this.revokeObjectUrl()
    this.setSourceAttribute(value || '')
  }

  get blob() {
    return this._blob
  }

  set blob(value) {
    if (value !== null && !(value instanceof Blob)) {
      throw new TypeError('blob must be a Blob or null')
    }

    this._blob = value
    this.revokeObjectUrl()
    if (!value) {
      this.setSourceAttribute('')
      return
    }

    this._objectUrl = URL.createObjectURL(value)
    this.setSourceAttribute(this._objectUrl)
  }

  connectedCallback() {
    window.clearTimeout(this._objectUrlCleanupTimer)
    this._objectUrlCleanupTimer = 0
    if (this._blob && !this._objectUrl) {
      this._objectUrl = URL.createObjectURL(this._blob)
      this.setSourceAttribute(this._objectUrl)
    }

    this.initialize()
    this.observeThemeChanges()
    this.observeSize()
    this.syncSource()
  }

  disconnectedCallback() {
    this.stopObservingSize()
    this.stopObservingThemeChanges()
    this.abortWaveLoad()
    if (this._audio) {
      this._audio.pause()
    }

    if (this._objectUrl && this._blob) {
      this._objectUrlCleanupTimer = window.setTimeout(() => {
        if (this.isConnected || !this._objectUrl || !this._blob) {
          return
        }
        this.revokeObjectUrl()
        this.setSourceAttribute('')
      }, 0)
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== 'src' || oldValue === newValue) {
      return
    }

    if (!this._settingSourceAttribute) {
      this._blob = null
      this.revokeObjectUrl()
    }

    if (this._initialized) {
      this.syncSource()
    }
  }

  play() {
    if (!this._audio || !this.src) {
      return Promise.resolve()
    }
    return this._audio.play()
  }

  pause() {
    if (this._audio) {
      this._audio.pause()
    }
  }

  getAudio() {
    return this._audio
  }

  getWaveform() {
    return this._canvas
  }

  initialize() {
    if (this._initialized) {
      return
    }

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${audioPlayerStyle}</style>
      <div class="base" part="base">
        <button part="play-button" type="button" aria-label="Play">▶</button>
        <canvas
          part="waveform"
          role="slider"
          aria-label="Playback position"
          aria-valuemin="0"
          aria-valuemax="0"
          aria-valuenow="0"
          aria-valuetext="0:00 / 0:00"
        ></canvas>
        <div class="time" part="time">0:00 / 0:00</div>
        <audio part="audio" preload="metadata"></audio>
      </div>
    `

    this._button = root.querySelector('button')
    this._canvas = root.querySelector('canvas')
    this._time = root.querySelector('.time')
    this._audio = root.querySelector('audio')
    this.bindEvents()
    this._initialized = true
  }

  bindEvents() {
    this._button.addEventListener('click', async () => {
      try {
        if (this._audio.paused) {
          await this.play()
        } else {
          this.pause()
        }
      } catch {
        emitDetail(this, 'error', { message: 'Audio could not be played' })
      }
    })

    this._audio.addEventListener('play', () => {
      this._button.textContent = '❚❚'
      this._button.setAttribute('aria-label', 'Pause')
      emitEvent(this, 'play')
    })
    this._audio.addEventListener('pause', () => {
      this._button.textContent = '▶'
      this._button.setAttribute('aria-label', 'Play')
      emitEvent(this, 'pause')
    })
    this._audio.addEventListener('loadedmetadata', () => {
      this.updateTime()
      emitDetail(this, 'loaded', { duration: this._audio.duration || 0 })
    })
    this._audio.addEventListener('durationchange', () => this.updateTime())
    this._audio.addEventListener('timeupdate', () => {
      this.updateTime()
      this.draw()
    })
    this._audio.addEventListener('ended', () => {
      this.updatePlayButton()
      this.draw()
      emitEvent(this, 'ended')
    })
    this._audio.addEventListener('error', () => {
      emitDetail(this, 'error', { message: 'Audio could not be loaded' })
    })

    this._canvas.addEventListener('keydown', event => this.handleSeekKeydown(event))
    this._canvas.addEventListener('pointerdown', event => {
      if (!this.src) {
        return
      }
      event.preventDefault()
      this._dragging = true
      this._canvas.setPointerCapture(event.pointerId)
      this.seekFromPointer(event)
    })
    this._canvas.addEventListener('pointermove', event => {
      if (this._dragging) {
        this.seekFromPointer(event)
      }
    })
    this._canvas.addEventListener('pointerup', event => this.endPointerSeek(event))
    this._canvas.addEventListener('pointercancel', event => this.endPointerSeek(event))
  }

  syncSource() {
    if (!this._audio) {
      return
    }

    const src = this.src
    this.abortWaveLoad()
    this._wave = []
    this._audio.pause()
    if (src) {
      this._audio.src = src
    } else {
      this._audio.removeAttribute('src')
    }
    this._audio.load()
    this._button.disabled = !src
    this._canvas.tabIndex = src ? 0 : -1
    this._canvas.setAttribute('aria-disabled', String(!src))
    this.updatePlayButton()
    this.updateTime()
    this.draw()
    if (src) {
      void this.loadWave(src)
    }
  }

  setSourceAttribute(value) {
    this._settingSourceAttribute = true
    try {
      if (value) {
        this.setAttribute('src', value)
      } else {
        this.removeAttribute('src')
      }
    } finally {
      this._settingSourceAttribute = false
    }
  }

  revokeObjectUrl() {
    if (!this._objectUrl) {
      return
    }
    URL.revokeObjectURL(this._objectUrl)
    this._objectUrl = ''
  }

  observeSize() {
    if (this._resizeObserver) {
      return
    }
    this._resizeObserver = new ResizeObserver(() => this.draw())
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
    cancelAnimationFrame(this._themeDrawFrame)
    window.clearTimeout(this._themeDrawTimer)
    const draw = () => {
      if (this.isConnected) {
        this.draw()
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

  abortWaveLoad() {
    this._waveRequest++
    if (this._waveAbortController) {
      this._waveAbortController.abort()
      this._waveAbortController = null
    }
  }

  async loadWave(src) {
    const request = ++this._waveRequest
    const controller = new AbortController()
    this._waveAbortController = controller
    let audioContext = null

    try {
      const response = await fetch(src, { signal: controller.signal })
      if (!response.ok) {
        throw new Error('Audio request failed')
      }
      const buffer = await response.arrayBuffer()
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext
      if (!AudioContextConstructor) {
        throw new Error('Audio decoding is unavailable')
      }
      audioContext = new AudioContextConstructor()
      const decoded = await audioContext.decodeAudioData(buffer)
      if (request !== this._waveRequest || src !== this.src) {
        return
      }

      const samples = decoded.getChannelData(0)
      const bars = 180
      const step = Math.max(1, Math.floor(samples.length / bars))
      const wave = new Array(bars)
      let max = .01
      for (let i = 0; i < bars; i++) {
        let sum = 0
        const start = i * step
        const end = Math.min(samples.length, start + step)
        for (let j = start; j < end; j++) {
          sum += Math.abs(samples[j])
        }
        const average = sum / Math.max(1, end - start)
        wave[i] = average
        max = Math.max(max, average)
      }
      for (let i = 0; i < wave.length; i++) {
        wave[i] /= max
      }
      this._wave = wave
    } catch (error) {
      if (error.name !== 'AbortError' && request === this._waveRequest) {
        this._wave = []
      }
    } finally {
      if (this._waveAbortController === controller) {
        this._waveAbortController = null
      }
      if (audioContext) {
        try {
          await audioContext.close()
        } catch {}
      }
    }

    if (request === this._waveRequest) {
      this.draw()
    }
  }

  updatePlayButton() {
    if (!this._button || !this._audio) {
      return
    }
    const playing = !this._audio.paused && !this._audio.ended
    this._button.textContent = playing ? '❚❚' : '▶'
    this._button.setAttribute('aria-label', playing ? 'Pause' : 'Play')
  }

  updateTime() {
    if (!this._audio || !this._time || !this._canvas) {
      return
    }
    const current = this._audio.currentTime || 0
    const duration = this._audio.duration || 0
    const text = `${formatTime(current)} / ${formatTime(duration)}`
    this._time.textContent = text
    this._canvas.setAttribute('aria-valuemax', String(duration))
    this._canvas.setAttribute('aria-valuenow', String(current))
    this._canvas.setAttribute('aria-valuetext', text)
  }

  handleSeekKeydown(event) {
    const duration = this._audio.duration || 0
    if (!duration) {
      return
    }

    let time = this._audio.currentTime
    const step = event.shiftKey ? 10 : 5
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      time -= step
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      time += step
    } else if (event.key === 'Home') {
      time = 0
    } else if (event.key === 'End') {
      time = duration
    } else {
      return
    }

    event.preventDefault()
    this.seek(time)
  }

  seekFromPointer(event) {
    const duration = this._audio.duration || 0
    if (!duration) {
      return
    }
    const rect = this._canvas.getBoundingClientRect()
    if (!rect.width) {
      return
    }
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    this.seek(ratio * duration)
  }

  endPointerSeek(event) {
    this._dragging = false
    if (this._canvas.hasPointerCapture(event.pointerId)) {
      this._canvas.releasePointerCapture(event.pointerId)
    }
  }

  seek(time) {
    const duration = this._audio.duration || 0
    if (!duration || !Number.isFinite(time)) {
      return
    }
    this._audio.currentTime = Math.min(duration, Math.max(0, time))
    emitDetail(this, 'seek', { time: this._audio.currentTime })
    this.updateTime()
    this.draw()
  }

  getColors() {
    if (!this._colors) {
      this._colors = {
        idle: getResolvedColor(this, '--tot-color-neutral-300', '#cbd5e1'),
        played: getResolvedColor(this, '--tot-color-primary-600', '#0284c7'),
      }
    }
    return this._colors
  }

  draw() {
    if (!this._canvas) {
      return
    }
    const rect = this._canvas.getBoundingClientRect()
    if (!rect.width || !rect.height) {
      return
    }

    const ratio = window.devicePixelRatio || 1
    const width = Math.max(1, Math.floor(rect.width * ratio))
    const height = Math.max(1, Math.floor(rect.height * ratio))
    if (this._canvas.width !== width || this._canvas.height !== height) {
      this._canvas.width = width
      this._canvas.height = height
    }

    const context = this._canvas.getContext('2d')
    if (!context) {
      return
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    const colors = this.getColors()
    context.clearRect(0, 0, rect.width, rect.height)

    if (!this._wave.length) {
      context.strokeStyle = colors.idle
      context.lineWidth = 1.5
      context.beginPath()
      context.moveTo(0, rect.height / 2)
      context.lineTo(rect.width, rect.height / 2)
      context.stroke()
      return
    }

    const barWidth = Math.max(1, rect.width / this._wave.length - 1)
    const progress = this._audio.duration ? this._audio.currentTime / this._audio.duration : 0
    for (let i = 0; i < this._wave.length; i++) {
      const x = i * rect.width / this._wave.length
      const barHeight = Math.max(2, this._wave[i] * (rect.height - 12))
      context.fillStyle = i / this._wave.length <= progress ? colors.played : colors.idle
      context.fillRect(x, (rect.height - barHeight) / 2, barWidth, barHeight)
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
