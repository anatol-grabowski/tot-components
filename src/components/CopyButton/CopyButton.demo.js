import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-copy-button',
  title: 'Copy Button',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Copy explicit values</div>
        <div class="row">
          <tot-copy-button value="Copied from a value attribute"></tot-copy-button>
          <span>Value attribute</span>
          <tot-copy-button value="Short feedback" feedback-duration="500" copy-label="Copy text" success-label="Done"></tot-copy-button>
          <span>Custom labels</span>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Copy from another element</div>
        <div class="row">
          <span id="copy-demo-phone">+48 123 456 789</span>
          <tot-copy-button from="copy-demo-phone"></tot-copy-button>
        </div>
        <div class="row">
          <input id="copy-demo-input" class="demo-native-button" value="Input property value">
          <tot-copy-button from="copy-demo-input.value"></tot-copy-button>
        </div>
        <div class="row">
          <a id="copy-demo-link" href="https://example.com/components">Example link</a>
          <tot-copy-button from="copy-demo-link[href]"></tot-copy-button>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">States and slots</div>
        <div class="row">
          <tot-copy-button value="Custom icons">
            <span slot="copy-icon">📋</span>
            <span slot="success-icon">✅</span>
            <span slot="error-icon">⚠️</span>
          </tot-copy-button>
          <tot-copy-button from="copy-demo-missing" error-label="Nothing to copy"></tot-copy-button>
          <tot-copy-button value="Disabled" disabled></tot-copy-button>
        </div>
      </div>
    `

    const copyButtons = wrapper.querySelectorAll('tot-copy-button')
    for (let i = 0; i < copyButtons.length; i++) {
      const copyButton = copyButtons[i]
      copyButton.addEventListener('copy', (event) => {
        logEvent(copyButton, 'copy', event.detail)
      })
      copyButton.addEventListener('error', (event) => {
        event.preventDefault()
        logEvent(copyButton, 'error', event.detail)
      })
    }

    container.appendChild(wrapper)
  },
})
