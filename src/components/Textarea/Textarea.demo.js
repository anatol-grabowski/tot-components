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
        <div class="demo-label">Sizing modes</div>
        <div class="stack">
          <tot-textarea size="default" label="Default" placeholder="Regular textarea behavior with a resize handle." rows="2"></tot-textarea>
          <tot-textarea size="auto" label="Auto" placeholder="The field grows with its content." rows="2"></tot-textarea>
          <tot-textarea size="none" label="None" placeholder="The resize handle is hidden." rows="2"></tot-textarea>
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
      textarea.addEventListener('input', () => {
        logEvent(textarea, 'input', { value: textarea.value })
      })
      textarea.addEventListener('change', () => {
        logEvent(textarea, 'change', { value: textarea.value })
      })
      textarea.addEventListener('reset', () => {
        logEvent(textarea, 'reset', { value: textarea.value })
      })
      textarea.addEventListener('fullscreen-change', () => {
        logEvent(textarea, 'fullscreen-change', { fullscreen: textarea.fullscreen })
      })
    }

    container.appendChild(wrapper)
  },
})
