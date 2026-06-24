import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-navbar',
  title: 'Navbar',
  render: (container) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <tot-navbar tabs="hello,media"></tot-navbar>
    `

    const navbar = row.querySelector('tot-navbar')
    navbar.tabs = [
        { value: 'controls', label: 'Controls' },
        { value: 'media', label: 'Media' },
        { value: 'data', label: 'Data' },
        { value: 'docs', label: 'Docs' },
    ]
    navbar.value = 'media'

    container.appendChild(row)
  }
})
