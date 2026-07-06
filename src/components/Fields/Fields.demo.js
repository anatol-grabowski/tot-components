import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-fields',
  title: 'Fields',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Empty key/value pairs</div>
        <tot-fields></tot-fields>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Initial fields</div>
        <tot-fields key-placeholder="Name" value-placeholder="Value"></tot-fields>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Medium fields</div>
        <tot-fields size="medium"></tot-fields>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Large fields</div>
        <tot-fields size="large"></tot-fields>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Read-only fields</div>
        <tot-fields readonly></tot-fields>
      </div>
    `

    const fields = wrapper.querySelectorAll('tot-fields')
    fields[1].fields = {
      Topic: 'Grammar',
      Level: 'B1',
      Status: 'Review',
    }
    fields[2].fields = {
      Topic: 'Listening',
    }
    fields[3].fields = {
      Level: 'C1',
    }
    fields[4].fields = {
      Topic: 'Grammar',
      Level: 'B1',
      Status: 'Review',
    }

    for (let i = 0; i < fields.length; i++) {
      fields[i].addEventListener('change', (event) => {
        logEvent(fields[i], 'change', event.detail)
      })
    }

    container.appendChild(wrapper)
  },
})
