import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-details',
  title: 'Details',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Native disclosure behavior</div>
        <tot-details summary="Toggle me" open>
          A compact disclosure component based on native details and summary elements.
        </tot-details>
        <tot-details summary="Disabled" disabled>
          This content cannot be opened from the summary while disabled.
        </tot-details>
      </div>
      <div class="stack demo-group details-demo-group">
        <div class="demo-label">Accordion behavior in user code</div>
        <tot-details summary="First" open>
          Close other items by listening for the bubbling toggle event.
        </tot-details>
        <tot-details summary="Second">
          Each component stays independent; the group behavior is added by the demo.
        </tot-details>
        <tot-details summary="Third">
          Read the open property from the event target to distinguish opening and closing.
        </tot-details>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Custom summary and icons</div>
        <tot-details>
          <span slot="summary">With slotted summary</span>
          <span slot="expand-icon">＋</span>
          <span slot="collapse-icon">−</span>
          Summary text and icons can be provided with slots.
        </tot-details>
      </div>
    `

    const detailsElements = wrapper.querySelectorAll('tot-details')
    for (let i = 0; i < detailsElements.length; i++) {
      const details = detailsElements[i]
      details.addEventListener('toggle', event => {
        logEvent(details, 'toggle', { open: event.target.open })
      })
    }

    const group = wrapper.querySelector('.details-demo-group')
    group.addEventListener('toggle', event => {
      if (event.target.localName !== 'tot-details' || !event.target.open) {
        return
      }

      const items = group.querySelectorAll('tot-details')
      for (let i = 0; i < items.length; i++) {
        if (items[i] !== event.target) {
          items[i].hide()
        }
      }
    })

    container.appendChild(wrapper)
  },
})
