import { registerDemo } from '../demoCommon.js'


function makeDemoAudioBlob() {
  const sampleRate = 44100
  const seconds = 2.25
  const samples = Math.floor(sampleRate * seconds)
  const buffer = new ArrayBuffer(44 + samples * 2)
  const view = new DataView(buffer)
  writeString(view, 0, 'RIFF')
  view.setUint32(4, 36 + samples * 2, true)
  writeString(view, 8, 'WAVE')
  writeString(view, 12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(view, 36, 'data')
  view.setUint32(40, samples * 2, true)
  for (let i = 0; i < samples; i++) {
    const t = i / sampleRate
    const envelope = Math.min(1, i / 2500) * Math.min(1, (samples - i) / 4000)
    const tone = Math.sin(2 * Math.PI * 220 * t) * .45 + Math.sin(2 * Math.PI * 330 * t) * .25
    const pulse = Math.sin(2 * Math.PI * 3 * t) * .5 + .5
    const sample = Math.max(-1, Math.min(1, tone * envelope * (.65 + pulse * .35)))
    view.setInt16(44 + i * 2, sample * 32767, true)
  }
  return new Blob([buffer], { type: 'audio/wav' })
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}

registerDemo({
  id: 'tot-audio-player',
  title: 'AudioPlayer',
  render: (container) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <tot-audio-player></tot-audio-player>
    `

    const demoAudio = row.querySelector('tot-audio-player')
    demoAudio.blob = makeDemoAudioBlob()

    container.appendChild(row)
  }
})
