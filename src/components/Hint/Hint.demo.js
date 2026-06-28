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
          <tot-hint text="Saved locally in your browser.">
            <tot-button label="Hover for hint"></tot-button>
          </tot-hint>
          <tot-hint text="The hint flips when there is not enough space below or to the right.">
            <span class="demo-native-button" tabindex="0">Hover text</span>
          </tot-hint>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Programmatic hint near the cursor</div>
        <div class="row">
          <button class="demo-native-button" type="button" id="manualHintTrigger">Show hint here</button>
          <tot-hint id="manualHint" trigger="manual" text="Shown by calling show(event)."></tot-hint>
        </div>
      </div>
    `

    const manualHint = wrapper.querySelector('#manualHint')
    const manualHintTrigger = wrapper.querySelector('#manualHintTrigger')

    manualHintTrigger.addEventListener('click', (event) => {
      manualHint.show(event)
      logEvent(manualHint, 'show', { x: event.clientX, y: event.clientY })
      window.setTimeout(() => {
        manualHint.hide()
      }, 1800)
    })

    container.appendChild(wrapper)
  },
})
