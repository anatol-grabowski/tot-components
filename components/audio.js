/**
 * Compact Components - Audio components
 * CompactAudioPlayer and CompactAudioRecorder
 */

import { shadow, emit, formatTime, drawEmptyCanvas } from './core.js'

export class CompactAudioPlayer extends HTMLElement {
  static get observedAttributes() {
    return ['src']
  }

  constructor() {
    super()
    this._wave = []
    this._dragging = false
    this._objectUrl = ''
    this._resizeObserver = null
  }

  get src() {
    return this.getAttribute('src') || ''
  }

  set src(value) {
    if (value) {
      this.setAttribute('src', value)
    } else {
      this.removeAttribute('src')
    }
  }

  set blob(blob) {
    if (this._objectUrl) {
      URL.revokeObjectURL(this._objectUrl)
    }
    this._objectUrl = URL.createObjectURL(blob)
    this.src = this._objectUrl
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
    }
    if (this._objectUrl) {
      URL.revokeObjectURL(this._objectUrl)
    }
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const root = shadow(this, `
      :host {
        display: block;
        max-width: 100%;
      }

      .player {
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        background: #fff;
        padding: 6px;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 6px;
        max-width: 100%;
      }

      button {
        border: 1px solid var(--cc-border-strong);
        border-radius: var(--cc-radius);
        background: #fff;
        min-width: 32px;
        min-height: 32px;
        cursor: pointer;
      }

      canvas {
        width: 100%;
        height: 54px;
        display: block;
        background: #fafafa;
        border-radius: 3px;
        cursor: pointer;
        min-width: 0;
      }

      .time {
        color: var(--cc-muted);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        font-size: 12px;
      }

      audio {
        display: none;
      }
    `, `
      <div class="player">
        <button type="button" aria-label="Play or pause">▶</button>
        <canvas></canvas>
        <div class="time">0:00 / 0:00</div>
        <audio preload="metadata"></audio>
      </div>
    `)
    this._button = root.querySelector('button')
    this._canvas = root.querySelector('canvas')
    this._time = root.querySelector('.time')
    this._audio = root.querySelector('audio')
    this._audio.src = this.src
    this._bindAudio()
    this._resizeObserver = new ResizeObserver(() => this.draw())
    this._resizeObserver.observe(this._canvas)
    this.loadWave()
  }

  _bindAudio() {
    this._button.addEventListener('click', async () => {
      if (!this._audio.src) {
        return
      }
      if (this._audio.paused) {
        await this._audio.play()
        emit(this, 'play')
      } else {
        this._audio.pause()
        emit(this, 'pause')
      }
    })
    this._audio.addEventListener('play', () => {
      this._button.textContent = '❚❚'
    })
    this._audio.addEventListener('pause', () => {
      this._button.textContent = '▶'
    })
    this._audio.addEventListener('loadedmetadata', () => {
      this.updateTime()
      emit(this, 'loaded', { duration: this._audio.duration || 0 })
    })
    this._audio.addEventListener('timeupdate', () => {
      this.updateTime()
      this.draw()
    })
    this._audio.addEventListener('ended', () => {
      this._button.textContent = '▶'
      this.draw()
    })
    this._audio.addEventListener('error', () => emit(this, 'error', { message: 'Audio could not be loaded' }))
    this._canvas.addEventListener('pointerdown', event => {
      this._dragging = true
      this._canvas.setPointerCapture(event.pointerId)
      this.seekFromEvent(event)
    })
    this._canvas.addEventListener('pointermove', event => {
      if (this._dragging) {
        this.seekFromEvent(event)
      }
    })
    this._canvas.addEventListener('pointerup', event => {
      this._dragging = false
      try {
        this._canvas.releasePointerCapture(event.pointerId)
      } catch (error) {}
    })
  }

  async loadWave() {
    if (!this.src) {
      this._wave = []
      this.draw()
      return
    }
    try {
      const response = await fetch(this.src)
      const buffer = await response.arrayBuffer()
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const decoded = await audioContext.decodeAudioData(buffer.slice(0))
      const samples = decoded.getChannelData(0)
      const bars = 180
      const step = Math.max(1, Math.floor(samples.length / bars))
      const wave = []
      for (let i = 0; i < bars; i++) {
        let sum = 0
        const start = i * step
        const end = Math.min(samples.length, start + step)
        for (let j = start; j < end; j++) {
          sum += Math.abs(samples[j])
        }
        wave.push(sum / Math.max(1, end - start))
      }
      const max = Math.max(...wave, .01)
      this._wave = wave.map(value => value / max)
      audioContext.close()
    } catch (error) {
      this._wave = []
    }
    this.draw()
  }

  updateTime() {
    const current = this._audio.currentTime || 0
    const duration = this._audio.duration || 0
    this._time.textContent = `${formatTime(current)} / ${formatTime(duration)}`
  }

  seekFromEvent(event) {
    const duration = this._audio.duration || 0
    if (!duration) {
      return
    }
    const rect = this._canvas.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    this._audio.currentTime = ratio * duration
    emit(this, 'seek', { time: this._audio.currentTime })
    this.updateTime()
    this.draw()
  }

  draw() {
    if (!this._canvas) {
      return
    }
    const rect = this._canvas.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) {
      return
    }
    const ratio = window.devicePixelRatio || 1
    this._canvas.width = Math.floor(rect.width * ratio)
    this._canvas.height = Math.floor(rect.height * ratio)
    const ctx = this._canvas.getContext('2d')
    ctx.scale(ratio, ratio)
    ctx.clearRect(0, 0, rect.width, rect.height)
    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, rect.width, rect.height)
    const wave = this._wave.length ? this._wave : Array.from({ length: 60 }, (_, i) => .18 + .12 * Math.sin(i / 3))
    const barWidth = Math.max(1, rect.width / wave.length - 1)
    const progress = this._audio && this._audio.duration ? this._audio.currentTime / this._audio.duration : 0
    for (let i = 0; i < wave.length; i++) {
      const x = i * rect.width / wave.length
      const height = Math.max(2, wave[i] * (rect.height - 12))
      ctx.fillStyle = i / wave.length <= progress ? '#0066cc' : '#b8c7d6'
      ctx.fillRect(x, (rect.height - height) / 2, barWidth, height)
    }
  }
}

export class CompactAudioRecorder extends HTMLElement {
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
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.stopTracks()
    clearInterval(this._timer)
    cancelAnimationFrame(this._animation)
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
    }
  }

  render() {
    const root = shadow(this, `
      :host {
        display: block;
        max-width: 100%;
      }

      .recorder {
        border: 1px solid var(--cc-border);
        border-radius: var(--cc-radius);
        background: #fff;
        padding: 8px;
        display: grid;
        gap: 6px;
      }

      .controls {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }

      button {
        min-width: 36px;
        min-height: 36px;
        border: 1px solid var(--cc-border-strong);
        background: #fff;
        border-radius: var(--cc-radius);
        cursor: pointer;
        transition: background 0.15s;
      }

      button:hover:not(:disabled) {
        background: #f5f5f5;
      }

      button:active:not(:disabled) {
        background: #e8e8e8;
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .record {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: inline-grid;
        place-items: center;
        border: 2px solid #d71920;
      }

      .record::before {
        content: '';
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #d71920;
      }

      .record:disabled::before {
        background: #999;
      }

      .stop {
        border-radius: 3px;
        display: inline-grid;
        place-items: center;
      }

      .stop::before {
        content: '';
        width: 17px;
        height: 17px;
        border-radius: 2px;
        background: #d71920;
      }

      .stop:disabled::before {
        background: #999;
      }

      .pause {
        display: inline-grid;
        grid-template-columns: 5px 5px;
        justify-content: center;
        align-content: center;
        gap: 5px;
        border-radius: var(--cc-radius);
      }

      .pause::before,
      .pause::after {
        content: '';
        width: 5px;
        height: 19px;
        background: #333;
      }

      .pause:disabled::before,
      .pause:disabled::after {
        background: #999;
      }

      .pause.resume::before {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 9.5px 0 9.5px 16px;
        border-color: transparent transparent transparent #333;
        background: transparent;
      }

      .pause.resume::after {
        display: none;
      }

      .spacer {
        flex-grow: 1;
      }

      .clear-abort {
        padding: 0 12px;
        font-size: 13px;
        min-width: 60px;
      }

      .display {
        position: relative;
      }

      .canvas-container {
        position: relative;
      }

      .canvas-container.hidden {
        display: none;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0 12px 4px;
        pointer-events: none;
      }

      .time {
        font-variant-numeric: tabular-nums;
        color: var(--cc-muted);
        text-shadow: 0 0 4px #fafafa, 0 0 4px #fafafa, 0 0 4px #fafafa;
      }

      .status {
        color: var(--cc-muted);
        text-shadow: 0 0 4px #fafafa, 0 0 4px #fafafa, 0 0 4px #fafafa;
      }

      canvas {
        width: 100%;
        height: 68px;
        background: #fafafa;
        border-radius: 3px;
        display: block;
        min-width: 0;
      }

      .playback {
        min-height: 0;
      }

      .playback:empty {
        display: none;
      }
    `, `
      <div class="recorder">
        <div class="controls">
          <button class="record" type="button" aria-label="Record"></button>
          <button class="stop" type="button" aria-label="Stop" disabled></button>
          <button class="pause" type="button" aria-label="Pause" disabled></button>
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
    `)
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
    this._recordButton.disabled = true
    this._stopButton.disabled = false
    this._pauseButton.disabled = false
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
      this._audioContext = new (window.AudioContext || window.webkitAudioContext)()
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
      return
    }
    const rect = this._canvas.getBoundingClientRect()
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
      ctx.fillStyle = '#fafafa'
      ctx.fillRect(0, 0, rect.width, rect.height)
      ctx.strokeStyle = '#0066cc'
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
      ctx.strokeStyle = '#ccc'
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
    const player = document.createElement('compact-audio-player')
    player.src = url
    this._playback.style.display = ''
    this._playback.innerHTML = ''
    this._playback.append(player)
    this._recordButton.disabled = false
    this._stopButton.disabled = true
    this._pauseButton.disabled = true
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
    this._recordButton.disabled = false
    this._stopButton.disabled = true
    this._pauseButton.disabled = true
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
    if (!this._canvas) return
    const rect = this._canvas.getBoundingClientRect()
    if (!rect.width) return
    const ratio = window.devicePixelRatio || 1
    this._canvas.width = Math.max(1, Math.floor(rect.width * ratio))
    this._canvas.height = Math.max(1, Math.floor(rect.height * ratio))
    const ctx = this._canvas.getContext('2d')
    ctx.scale(ratio, ratio)
    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.strokeStyle = '#b8c7d6'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(0, rect.height / 2)
    ctx.lineTo(rect.width, rect.height / 2)
    ctx.stroke()
  }

  clearRecording() {
    this._playback.innerHTML = ''
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
