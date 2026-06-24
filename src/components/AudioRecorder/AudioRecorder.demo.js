import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-audio-recorder',
  title: 'AudioRecorder',
  render: (container) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <tot-audio-recorder></tot-audio-recorder>
    `

    const demoAudio = row.querySelector('tot-audio-recorder')

    container.appendChild(row)
  }
})
