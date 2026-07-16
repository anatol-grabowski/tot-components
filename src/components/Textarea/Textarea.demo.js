import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-textarea',
  title: 'Textarea',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Basic textareas</div>
        <div class="stack">
          <tot-textarea label="Message" placeholder="Write something" rows="3" help-text="Use the fullscreen button for a larger editor."></tot-textarea>
          <tot-textarea label="Disabled" value="Unavailable" disabled></tot-textarea>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Sizes</div>
        <div class="stack">
          <tot-textarea size="small" label="Small" rows="2" placeholder="Small textarea"></tot-textarea>
          <tot-textarea size="medium" label="Medium" rows="2" placeholder="Medium textarea"></tot-textarea>
          <tot-textarea size="large" label="Large" rows="2" placeholder="Large textarea"></tot-textarea>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Resize modes</div>
        <div class="stack">
          <tot-textarea label="Resize auto" resize="auto" placeholder="Native resize handle is visible." rows="2"></tot-textarea>
          <tot-textarea label="Resize none" resize="none" placeholder="Resize handle is hidden." rows="2"></tot-textarea>
          <tot-textarea label="Auto size" auto-size resize="none" placeholder="The field grows with its content." rows="2"></tot-textarea>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Fullscreen reset button</div>
        <tot-textarea id="resetTextarea" label="Draft" rows="4" value="Open fullscreen, edit this text, then use Reset."></tot-textarea>
      </div>
    `

    const textareas = wrapper.querySelectorAll('tot-textarea')
    for (let i = 0; i < textareas.length; i++) {
      const textarea = textareas[i]
      textarea.addEventListener('input', (event) => {
        logEvent(textarea, 'input', event.detail)
      })
      textarea.addEventListener('change', (event) => {
        logEvent(textarea, 'change', event.detail)
      })
      textarea.addEventListener('reset', (event) => {
        logEvent(textarea, 'reset', event.detail)
      })
      textarea.addEventListener('fullscreen-change', (event) => {
        logEvent(textarea, 'fullscreen-change', event.detail)
      })
    }

    container.appendChild(wrapper)
  },
})
