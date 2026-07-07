import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-odometer',
  title: 'Odometer',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Scroll any digit column (8 rows)</div>
        <tot-odometer columns="5" value="00123" visible-rows="8"></tot-odometer>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Small</div>
        <tot-odometer size="small" columns="4" value="0579"></tot-odometer>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Large</div>
        <tot-odometer size="large" columns="6" value="123456" style="height: 16rem;"></tot-odometer>
      </div>
    `

    const examples = wrapper.querySelectorAll('tot-odometer')
    for (let i = 0; i < examples.length; i++) {
      examples[i].addEventListener('input', (event) => {
        logEvent(examples[i], 'input', event.detail)
      })
      examples[i].addEventListener('change', (event) => {
        logEvent(examples[i], 'change', event.detail)
      })
    }

    container.appendChild(wrapper)
  },
})
