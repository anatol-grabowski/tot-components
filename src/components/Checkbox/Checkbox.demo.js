import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-checkbox',
  title: 'Checkbox',
  render: (container) => {
    const row = document.createElement('div')
    row.className = 'stack'
    
    row.innerHTML = `
      <tot-checkbox label="Unchecked"></tot-checkbox>
      <tot-checkbox label="Checked" checked></tot-checkbox>
      <tot-checkbox label="Indeterminate" indeterminate></tot-checkbox>
      <tot-checkbox label="Disabled" disabled></tot-checkbox>
      <tot-checkbox label="Disabled Checked" checked disabled></tot-checkbox>
      <tot-checkbox label="Disabled Indeterminate" indeterminate disabled></tot-checkbox>
    `

    container.appendChild(row)
  }
})
