import { registerDemo } from '../demoCommon.js'

const flowerVideo = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
const flowerWebm = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'
const captions = `data:text/vtt;charset=utf-8,${encodeURIComponent(`WEBVTT

00:00:00.000 --> 00:00:03.000
A white flower moves in the breeze.

00:00:03.000 --> 00:00:06.000
The camera remains close to the petals.
`)}`

const videoOptions = [
  { type: 'label', label: 'Resolution' },
  { type: 'item', value: 'resolution:auto', label: 'Auto', suffix: '✓' },
  { type: 'item', value: 'resolution:1080', label: '1080p' },
  { type: 'item', value: 'resolution:720', label: '720p' },
  { type: 'divider' },
  { type: 'label', label: 'Audio track' },
  { type: 'item', value: 'audio:original', label: 'Original', suffix: '✓' },
  { type: 'item', value: 'audio:commentary', label: 'Commentary' },
]

registerDemo({
  id: 'tot-video',
  title: 'Video',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="demo-group stack">
        <div class="demo-label">Complete controls, custom skip intervals, auto-hiding toolbar, subtitles, and Menu.js options</div>
        <tot-video id="completeVideo" playsinline>
          <source src="${flowerWebm}" type="video/webm">
          <source src="${flowerVideo}" type="video/mp4">
          <track kind="subtitles" srclang="en" label="English" src="${captions}">
        </tot-video>
      </div>
      <div class="demo-group stack">
        <div class="demo-label">Reduced controls configured through the controls property</div>
        <tot-video id="compactVideo" src="${flowerVideo}" playsinline></tot-video>
      </div>
    `

    const completeVideo = wrapper.querySelector('#completeVideo')
    const compactVideo = wrapper.querySelector('#compactVideo')
    completeVideo.options = videoOptions
    completeVideo.rewindSeconds = 15
    completeVideo.forwardSeconds = 30
    compactVideo.controls = ['progress', 'play', 'volume', 'fullscreen']

    const videos = [completeVideo, compactVideo]
    const eventNames = [
      'play',
      'pause',
      'ended',
      'loaded',
      'seek',
      'ratechange',
      'volumechange',
      'subtitleschange',
      'optionselect',
      'enterfullscreen',
      'exitfullscreen',
      'error',
    ]
    for (let i = 0; i < videos.length; i++) {
      for (let j = 0; j < eventNames.length; j++) {
        videos[i].addEventListener(eventNames[j], event => {
          logEvent(videos[i], eventNames[j], event.detail)
        })
      }
    }

    container.appendChild(wrapper)
  },
})
