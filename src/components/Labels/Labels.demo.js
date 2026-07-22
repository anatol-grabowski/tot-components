import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-labels',
  title: 'Labels',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Compact editable labels</div>
        <tot-labels></tot-labels>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Initial list</div>
        <tot-labels placeholder="New topic"></tot-labels>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Medium labels</div>
        <tot-labels size="medium" placeholder="Add medium label"></tot-labels>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Large labels</div>
        <tot-labels size="large" placeholder="Add large label"></tot-labels>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Read-only labels</div>
        <tot-labels readonly></tot-labels>
      </div>
    `

    const labels = wrapper.querySelectorAll('tot-labels')
    labels[1].labels = ['Design', 'Grammar', 'Vocabulary', 'Listening']
    labels[2].labels = ['Medium', 'Review']
    labels[3].labels = ['Large', 'Important']
    labels[4].labels = ['Archived', 'Reference', 'Shared', 'Final']

    for (let i = 0; i < labels.length; i++) {
      labels[i].addEventListener('change', (event) => {
        logEvent(labels[i], 'change', event.detail)
      })
    }

    container.appendChild(wrapper)
  },
})
