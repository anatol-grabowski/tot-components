import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-modal',
  title: 'Modal',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Header attribute, default body slot, and footer slot</div>
        <div class="row">
          <tot-button id="openBasicModal" label="Open modal"></tot-button>
        </div>
        <tot-modal id="basicModal" header="Preferences">
          <div class="stack">
            <p>Click outside, press Escape, use the × button, or use the mobile back button to close.</p>
            <tot-input label="Name" value="Ada Lovelace" clearable></tot-input>
            <tot-checkbox checked help-text="Example checkbox inside modal">Enable compact controls</tot-checkbox>
          </div>
          <tot-button slot="footer" id="closeBasicModal" label="Close"></tot-button>
          <tot-button slot="footer" variant="primary" label="Save"></tot-button>
        </tot-modal>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Header and body slots</div>
        <div class="row">
          <tot-button id="openSlottedModal" label="Open slotted modal"></tot-button>
        </div>
        <tot-modal id="slottedModal" header="Ignored header attribute" close-on-overlay="false">
          <span slot="header">Slotted header takes precedence</span>
          <div slot="body" class="stack">
            <p>The named body slot is filled here. Overlay clicks are disabled for this example. On narrow screens the modal fills the viewport with a navbar-height header.</p>
            <tot-textarea label="Notes" rows="4" placeholder="Write a note..."></tot-textarea>
          </div>
        </tot-modal>
      </div>
    `

    const basicModal = wrapper.querySelector('#basicModal')
    const slottedModal = wrapper.querySelector('#slottedModal')

    wrapper.querySelector('#openBasicModal').addEventListener('click', () => {
      basicModal.show()
    })

    wrapper.querySelector('#closeBasicModal').addEventListener('click', () => {
      basicModal.hide()
    })

    wrapper.querySelector('#openSlottedModal').addEventListener('click', () => {
      slottedModal.open = true
    })

    const modals = wrapper.querySelectorAll('tot-modal')
    for (let i = 0; i < modals.length; i++) {
      modals[i].addEventListener('show', (event) => {
        logEvent(modals[i], 'show', event.detail)
      })
      modals[i].addEventListener('hide', (event) => {
        logEvent(modals[i], 'hide', event.detail)
      })
    }

    container.appendChild(wrapper)
  },
})
