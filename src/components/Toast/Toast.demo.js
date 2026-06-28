import { registerDemo } from '../demoCommon.js'
import { TotToast } from '../index.js'

registerDemo({
  id: 'tot-toast',
  title: 'Toast',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Simple stacked bottom toasts</div>
        <div class="row">
          <tot-button id="showToast" label="Show toast"></tot-button>
          <tot-button id="showLongToast" label="Show longer toast"></tot-button>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Markup toast instance</div>
        <div class="row">
          <tot-button id="showMarkupToast" label="Show markup toast"></tot-button>
        </div>
        <tot-toast id="markupToast" message="A persistent toast instance from markup." duration="0"></tot-toast>
      </div>
    `

    const showToastButton = wrapper.querySelector('#showToast')
    const showLongToastButton = wrapper.querySelector('#showLongToast')
    const markupToast = wrapper.querySelector('#markupToast')

    showToastButton.addEventListener('click', () => {
      const toast = TotToast.show('Saved')
      toast.addEventListener('show', (toastEvent) => logEvent(toast, 'show', toastEvent.detail))
      toast.addEventListener('hide', (toastEvent) => logEvent(toast, 'hide', toastEvent.detail))
    })

    showLongToastButton.addEventListener('click', () => {
      const toast = TotToast.show({
        message: 'Your changes were saved locally and will sync when the connection is restored.',
        duration: 4500,
      })
      toast.addEventListener('show', (toastEvent) => logEvent(toast, 'show', toastEvent.detail))
      toast.addEventListener('hide', (toastEvent) => logEvent(toast, 'hide', toastEvent.detail))
    })

    wrapper.querySelector('#showMarkupToast').addEventListener('click', () => {
      markupToast.show()
      logEvent(markupToast, 'show', markupToast.getEventDetail ? markupToast.getEventDetail() : {})
    })

    container.appendChild(wrapper)
  },
})
