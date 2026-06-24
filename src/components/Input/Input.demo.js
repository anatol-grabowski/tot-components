import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-input',
  title: 'Input',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Basic inputs</div>
        <div class="stack">
          <tot-input label="Name" placeholder="Ada Lovelace" clearable></tot-input>
          <tot-input label="Email" type="email" placeholder="ada@example.com" help-text="Uses native email input type."></tot-input>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Sizes</div>
        <div class="stack">
          <tot-input size="small" label="Small" placeholder="Small input"></tot-input>
          <tot-input size="medium" label="Medium" placeholder="Medium input"></tot-input>
          <tot-input size="large" label="Large" placeholder="Large input"></tot-input>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Prefix and suffix slots</div>
        <div class="stack">
          <tot-input label="Price" placeholder="0.00" type="number" clearable>
            <span slot="prefix">$</span>
            <span slot="suffix">USD</span>
          </tot-input>
          <tot-input label="Search" placeholder="Search components" clearable>
            <span slot="prefix">🔎</span>
            <span slot="suffix">⌘K</span>
          </tot-input>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Clearable, password toggle, and disabled</div>
        <div class="stack">
          <tot-input label="Clearable value" value="Click × to clear" clearable help-text="Clear emits input, change, and clear events."></tot-input>
          <tot-input label="Password" type="password" password-toggle clearable placeholder="Password"></tot-input>
          <tot-input label="Disabled" value="Unavailable" disabled help-text="Disabled input"></tot-input>
        </div>
      </div>
    `

    const inputs = wrapper.querySelectorAll('tot-input')
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      input.addEventListener('input', (event) => {
        event.__totDemoLogged = true
        logEvent(input, 'input', event.detail)
      })
      input.addEventListener('change', (event) => {
        event.__totDemoLogged = true
        logEvent(input, 'change', event.detail)
      })
      input.addEventListener('clear', (event) => {
        event.__totDemoLogged = true
        logEvent(input, 'clear', event.detail)
      })
    }

    container.appendChild(wrapper)
  },
})
