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
      <div class="stack demo-group">
        <div class="demo-label">Inline with button</div>
        <div class="stack">
          <div class="row inline-control-row inline-checkbox-row">
            <tot-checkbox>Remember this choice</tot-checkbox>
            <tot-button variant="primary">Save</tot-button>
          </div>
          <div class="row inline-control-row inline-checkbox-row">
            <tot-checkbox help-text="You can change this later.">Enable notifications</tot-checkbox>
            <tot-button variant="primary">Continue</tot-button>
          </div>
        </div>
      </div>
    `

    const checkboxes = row.querySelectorAll('tot-checkbox')
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i]
      checkbox.addEventListener('input', () => {
        logEvent(checkbox, 'input', getCheckboxState(checkbox))
      })
      checkbox.addEventListener('change', () => {
        logEvent(checkbox, 'change', getCheckboxState(checkbox))
      })
    }

    container.appendChild(row)
  },
})

function getCheckboxState(checkbox) {
  return {
    checked: checkbox.checked,
    indeterminate: checkbox.indeterminate,
  }
}
