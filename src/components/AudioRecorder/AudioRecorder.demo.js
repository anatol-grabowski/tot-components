import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-audio-recorder',
  title: 'AudioRecorder',
  render: (container, { logEvent }) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <tot-audio-recorder></tot-audio-recorder>
    `

    const demoAudio = row.querySelector('tot-audio-recorder')
    const eventNames = [
      'recording-start',
      'recording-pause',
      'recording-resume',
      'recording-stop',
      'recording-error',
    ]

    for (let i = 0; i < eventNames.length; i++) {
      demoAudio.addEventListener(eventNames[i], (event) => {
        logEvent(demoAudio, eventNames[i], getRecorderEventDetail(eventNames[i], event.detail || {}))
      })
    }

    container.appendChild(row)
  },
})

function getRecorderEventDetail(eventName, detail) {
  if (eventName !== 'recording-stop') {
    return detail
  }

  return {
    duration: detail.duration || 0,
    size: detail.blob ? detail.blob.size : 0,
    type: detail.blob ? detail.blob.type : '',
  }
}
