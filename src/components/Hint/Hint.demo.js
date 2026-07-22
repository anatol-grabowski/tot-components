import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-hint',
  title: 'Hint',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Pointer-following text hint on hover</div>
        <div class="row">
          <tot-hint content="Saved locally in your browser.">
            <tot-button label="Hover for hint"></tot-button>
          </tot-hint>
          <tot-hint content="The hint flips when there is not enough space below or to the right.">
            <span class="demo-native-button" tabindex="0">Hover text</span>
          </tot-hint>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Programmatic hint at viewport coordinates</div>
        <div class="row">
          <button class="demo-native-button" type="button" id="programmaticHintAnchor">Show hint here</button>
          <tot-hint id="programmaticHint" activation="none" content="Shown by calling showAt(clientX, clientY)."></tot-hint>
        </div>
      </div>
    `

    const programmaticHint = wrapper.querySelector('#programmaticHint')
    const programmaticHintAnchor = wrapper.querySelector('#programmaticHintAnchor')

    programmaticHintAnchor.addEventListener('click', (event) => {
      programmaticHint.showAt(event.clientX, event.clientY)
      logEvent(programmaticHint, 'showAt', { clientX: event.clientX, clientY: event.clientY })
      window.setTimeout(() => {
        programmaticHint.hide()
      }, 1800)
    })

    container.appendChild(wrapper)
  },
})
