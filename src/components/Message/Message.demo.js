import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-message',
  title: 'Message',
  render: (container) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Attribute content</div>
        <tot-message type="success" content="Settings were saved successfully."></tot-message>
        <tot-message type="info" content="Mutation observers require at least one watched change type."></tot-message>
        <tot-message type="warning" content="This import will overwrite existing files with matching names."></tot-message>
        <tot-message type="error" content="The request failed. Check the console for details."></tot-message>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Slotted content and custom symbol</div>
        <tot-message type="info" symbol="?">
          <strong>Need context?</strong>
          <span>Use the slot for inline markup or other components.</span>
        </tot-message>
        <tot-message type="warning" no-symbol>
          This message hides the symbol but keeps the left accent line.
        </tot-message>
      </div>
    `

    container.appendChild(wrapper)
  },
})
