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
      <div class="stack demo-group">
        <div class="demo-label">Dialog over modal with one shared backdrop</div>
        <div class="row">
          <tot-button id="openStackedModal" label="Open stacked example"></tot-button>
        </div>
        <tot-modal id="stackedModal" header="Project settings">
          <div class="stack">
            <p>The dialog opens above this modal. Escape, Back, and overlay clicks close only the topmost layer.</p>
            <tot-input label="Project name" value="Components" clearable></tot-input>
            <tot-button id="openNestedDialog" label="Delete project" variant="danger" outline></tot-button>
          </div>
          <tot-button slot="footer" id="closeStackedModal" label="Done"></tot-button>
        </tot-modal>
        <tot-dialog
          id="nestedDialog"
          header="Delete project?"
          content="The modal stays open behind this dialog. One translucent backdrop is drawn beneath the dialog and over the modal."
          confirm-label="Delete"
          confirm-variant="danger"
        ></tot-dialog>
      </div>
    `

    const basicModal = wrapper.querySelector('#basicModal')
    const slottedModal = wrapper.querySelector('#slottedModal')
    const stackedModal = wrapper.querySelector('#stackedModal')
    const nestedDialog = wrapper.querySelector('#nestedDialog')

    wrapper.querySelector('#openBasicModal').addEventListener('click', () => {
      basicModal.show()
    })

    wrapper.querySelector('#closeBasicModal').addEventListener('click', () => {
      basicModal.hide()
    })

    wrapper.querySelector('#openSlottedModal').addEventListener('click', () => {
      slottedModal.open = true
    })

    wrapper.querySelector('#openStackedModal').addEventListener('click', () => {
      stackedModal.show()
    })

    wrapper.querySelector('#openNestedDialog').addEventListener('click', () => {
      nestedDialog.show()
    })

    wrapper.querySelector('#closeStackedModal').addEventListener('click', () => {
      stackedModal.hide()
    })

    const modals = wrapper.querySelectorAll('tot-modal')
    for (let i = 0; i < modals.length; i++) {
      modals[i].addEventListener('show', () => {
        logEvent(modals[i], 'show')
      })
      modals[i].addEventListener('hide', () => {
        logEvent(modals[i], 'hide')
      })
    }

    nestedDialog.addEventListener('show', () => {
      logEvent(nestedDialog, 'show')
    })
    nestedDialog.addEventListener('hide', event => {
      logEvent(nestedDialog, 'hide', event.detail)
    })

    container.appendChild(wrapper)
  },
})
