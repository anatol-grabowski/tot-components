const audioPlayerStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .player {
    align-items: center;
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
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

  button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  button:disabled {
    cursor: not-allowed;
    opacity: .55;
  }

  canvas {
    background: var(--tot-color-neutral-50, #f8fafc);
    border-radius: var(--tot-border-radius-medium, 4px);
    cursor: pointer;
    display: block;
    height: 54px;
    min-width: 0;
    width: 100%;
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
    this._wave = []
    this._dragging = false
    this._objectUrl = ''
    this._resizeObserver = null
    this._themeObserver = null
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
    this.observeThemeChanges()
    this.render()
  }

  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    }
    if (this._themeObserver) {
      this._themeObserver.disconnect()
      this._themeObserver = null
    }
    if (this._objectUrl) {
      URL.revokeObjectURL(this._objectUrl)
      this._objectUrl = ''
    }
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    }

    const root = getRoot(this)
    root.innerHTML = `<style>${audioPlayerStyle}</style>
      <div class="player">
        <button type="button" aria-label="Play or pause">▶</button>
        <canvas></canvas>
        <div class="time">0:00 / 0:00</div>
        <audio preload="metadata"></audio>
      </div>
    `

    this._button = root.querySelector('button')
    this._canvas = root.querySelector('canvas')
    this._time = root.querySelector('.time')
    this._audio = root.querySelector('audio')
    this._audio.src = this.src
    this._button.disabled = !this.src
    this._bindAudio()
    this._resizeObserver = new ResizeObserver(() => this.draw())
    this._resizeObserver.observe(this._canvas)
    void this.loadWave()
  }

  observeThemeChanges() {
    if (this._themeObserver) {
      return
    }

    this._themeObserver = new MutationObserver(() => {
      requestAnimationFrame(() => this.draw())
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
  }

  _bindAudio() {
    this._button.addEventListener('click', async () => {
      if (!this._audio.src) {
        return
      }

      try {
        if (this._audio.paused) {
          await this._audio.play()
          emit(this, 'play')
        } else {
          this._audio.pause()
          emit(this, 'pause')
        }
      } catch (error) {
        emit(this, 'error', { message: 'Audio could not be played' })
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
    this._canvas.addEventListener('pointercancel', event => {
      this._dragging = false
      try {
        this._canvas.releasePointerCapture(event.pointerId)
      } catch (error) {}
    })
  }

  async loadWave() {
    if (!this.src) {
      this._wave = []
      this.updateTime()
      this.draw()
      return
    }

    try {
      const response = await fetch(this.src)
      const buffer = await response.arrayBuffer()
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext
      const audioContext = new AudioContextConstructor()
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
      void audioContext.close()
    } catch (error) {
      this._wave = []
    }

    this.draw()
  }

  updateTime() {
    const current = this._audio ? this._audio.currentTime || 0 : 0
    const duration = this._audio ? this._audio.duration || 0 : 0
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
    ctx.fillStyle = getResolvedColor(this, '--tot-color-neutral-50', '#f8fafc')
    ctx.fillRect(0, 0, rect.width, rect.height)

    if (!this._wave.length) {
      this.drawFlatWave(ctx, rect)
      return
    }

    const barWidth = Math.max(1, rect.width / this._wave.length - 1)
    const progress = this._audio && this._audio.duration ? this._audio.currentTime / this._audio.duration : 0
    const playedColor = getResolvedColor(this, '--tot-color-primary-600', '#0284c7')
    const idleColor = getResolvedColor(this, '--tot-color-neutral-300', '#cbd5e1')
    for (let i = 0; i < this._wave.length; i++) {
      const x = i * rect.width / this._wave.length
      const height = Math.max(2, this._wave[i] * (rect.height - 12))
      ctx.fillStyle = i / this._wave.length <= progress ? playedColor : idleColor
      ctx.fillRect(x, (rect.height - height) / 2, barWidth, height)
    }
  }

  drawFlatWave(ctx, rect) {
    ctx.strokeStyle = getResolvedColor(this, '--tot-color-neutral-300', '#cbd5e1')
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(0, rect.height / 2)
    ctx.lineTo(rect.width, rect.height / 2)
    ctx.stroke()
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
