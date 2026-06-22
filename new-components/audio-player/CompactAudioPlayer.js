
import { shadow, emit, formatTime, drawEmptyCanvas, defineElement } from '../core.js'

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

defineElement('compact-audio-player', CompactAudioPlayer)