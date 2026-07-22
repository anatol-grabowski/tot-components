import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-toast',
  title: 'Toast',
  render: (container) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Managed temporary toast stack</div>
        <div class="row">
          <tot-button id="showToast" label="Show toast"></tot-button>
          <tot-button id="showLongToast" label="Show longer toast"></tot-button>
          <tot-button id="showSeveralToasts" label="Show several"></tot-button>
        </div>
      </div>
      <tot-toast id="toasts"></tot-toast>
    `

    const toasts = wrapper.querySelector('#toasts')

    wrapper.querySelector('#showToast').addEventListener('click', () => {
      toasts.show('Saved')
    })

    wrapper.querySelector('#showLongToast').addEventListener('click', () => {
      toasts.show('Your changes were saved locally and will sync when the connection is restored.', 4500)
    })

    wrapper.querySelector('#showSeveralToasts').addEventListener('click', () => {
      toasts.show('First message', 3000)
      toasts.show('Second message', 3600)
      toasts.show('Third message', 4200)
    })

    container.appendChild(wrapper)
  },
})
