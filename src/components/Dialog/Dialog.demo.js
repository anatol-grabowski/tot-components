import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-dialog',
  title: 'Dialog',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Confirm/cancel dialog configured by attributes</div>
        <div class="row">
          <tot-button id="openConfirmDialog" label="Delete file" variant="danger" outline></tot-button>
        </div>
        <tot-dialog
          id="confirmDialog"
          header="Delete file?"
          content="This action cannot be undone. The dialog keeps its compact size on narrow screens instead of becoming fullscreen."
          confirm-label="Delete"
          confirm-variant="danger"
        ></tot-dialog>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Custom body and custom footer buttons</div>
        <div class="row">
          <tot-button id="openCustomDialog" label="Review changes" variant="primary"></tot-button>
        </div>
        <tot-dialog id="customDialog" header="Apply edits">
          <div class="stack">
            <tot-message type="info" content="Footer buttons are provided through the footer slot."></tot-message>
            <tot-input label="Change summary" value="Update labels and spacing" clearable></tot-input>
          </div>
          <tot-button slot="footer" id="skipCustomDialog" label="Skip"></tot-button>
          <tot-button slot="footer" id="saveCustomDialog" variant="create" label="Apply"></tot-button>
        </tot-dialog>
      </div>
    `

    const confirmDialog = wrapper.querySelector('#confirmDialog')
    const customDialog = wrapper.querySelector('#customDialog')

    wrapper.querySelector('#openConfirmDialog').addEventListener('click', () => {
      confirmDialog.show()
    })

    wrapper.querySelector('#openCustomDialog').addEventListener('click', () => {
      customDialog.show()
    })

    wrapper.querySelector('#skipCustomDialog').addEventListener('click', () => {
      customDialog.cancel('skip')
    })

    wrapper.querySelector('#saveCustomDialog').addEventListener('click', () => {
      customDialog.confirm()
    })

    const dialogs = wrapper.querySelectorAll('tot-dialog')
    for (let i = 0; i < dialogs.length; i++) {
      dialogs[i].addEventListener('show', (event) => {
        logEvent(dialogs[i], 'show', event.detail)
      })
      dialogs[i].addEventListener('hide', (event) => {
        logEvent(dialogs[i], 'hide', event.detail)
      })
      dialogs[i].addEventListener('confirm', (event) => {
        logEvent(dialogs[i], 'confirm', event.detail)
      })
      dialogs[i].addEventListener('cancel', (event) => {
        logEvent(dialogs[i], 'cancel', event.detail)
      })
    }

    container.appendChild(wrapper)
  },
})
