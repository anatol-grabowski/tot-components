import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'compact-button',
  title: 'CompactButton',
  render: (container) => {
    const row1 = document.createElement('div')
    row1.className = 'row'
    row1.innerHTML = `
      <compact-button variant="primary">Primary</compact-button>
      <compact-button variant="secondary">Secondary</compact-button>
      <compact-button variant="danger">Danger</compact-button>
    `

    const row2 = document.createElement('div')
    row2.className = 'row'
    row2.innerHTML = `
      <compact-button variant="primary" disabled>Primary disabled</compact-button>
      <compact-button variant="secondary" disabled>Secondary disabled</compact-button>
      <compact-button variant="danger" disabled>Danger disabled</compact-button>
    `

    container.appendChild(row1)
    container.appendChild(row2)
  }
})
