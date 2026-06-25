import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-checkbox',
  title: 'Checkbox',
  render: (container, { logEvent }) => {
    const row = document.createElement('div')
    row.className = 'stack'

    row.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">States</div>
        <tot-checkbox>Unchecked</tot-checkbox>
        <tot-checkbox checked>Checked</tot-checkbox>
        <tot-checkbox indeterminate>Indeterminate</tot-checkbox>
        <tot-checkbox disabled>Disabled</tot-checkbox>
        <tot-checkbox checked disabled>Disabled checked</tot-checkbox>
        <tot-checkbox indeterminate disabled>Disabled indeterminate</tot-checkbox>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Sizes and help text</div>
        <tot-checkbox size="small" help-text="Compact helper text">Small</tot-checkbox>
        <tot-checkbox size="medium" help-text="A medium checkbox with help text">Medium</tot-checkbox>
        <tot-checkbox size="large" help-text="Larger checkbox for touch-heavy UIs">Large</tot-checkbox>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Label fallback compatibility</div>
        <tot-checkbox label="Label attribute fallback"></tot-checkbox>
        <tot-checkbox label="Slot has priority">Slotted label wins</tot-checkbox>
      </div>
    `

    const checkboxes = row.querySelectorAll('tot-checkbox')
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i]
      checkbox.addEventListener('input', (event) => {
        logEvent(checkbox, 'input', event.detail)
      })
      checkbox.addEventListener('change', (event) => {
        logEvent(checkbox, 'change', event.detail)
      })
    }

    container.appendChild(row)
  },
})
