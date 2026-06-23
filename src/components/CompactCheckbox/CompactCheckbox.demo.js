import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'compact-checkbox',
  title: 'CompactCheckbox',
  render: (container) => {
    const row = document.createElement('div')
    row.className = 'stack'
    
    row.innerHTML = `
      <compact-checkbox label="Unchecked"></compact-checkbox>
      <compact-checkbox label="Checked" checked></compact-checkbox>
      <compact-checkbox label="Indeterminate" indeterminate></compact-checkbox>
      <compact-checkbox label="Disabled" disabled></compact-checkbox>
      <compact-checkbox label="Disabled Checked" checked disabled></compact-checkbox>
      <compact-checkbox label="Disabled Indeterminate" indeterminate disabled></compact-checkbox>
    `

    container.appendChild(row)
  }
})
