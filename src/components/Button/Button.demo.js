import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-button',
  title: 'Button',
  render: (container) => {
    const row1 = document.createElement('div')
    row1.className = 'row'
    row1.innerHTML = `
      <tot-button variant="primary">Primary</tot-button>
      <tot-button variant="secondary">Secondary</tot-button>
      <tot-button variant="danger">Danger</tot-button>
    `

    const row2 = document.createElement('div')
    row2.className = 'row'
    row2.innerHTML = `
      <tot-button variant="primary" disabled>Primary disabled</tot-button>
      <tot-button variant="secondary" disabled>Secondary disabled</tot-button>
      <tot-button variant="danger" disabled>Danger disabled</tot-button>
    `

    container.appendChild(row1)
    container.appendChild(row2)
  }
})
