import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-tabs',
  title: 'Tabs',
  render: (container) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <tot-tabs options='[{"value":"controls","label":"Controls"},{"value":"media","label":"Media"},{"value":"data","label":"Data"},{"value":"docs","label":"Docs"}]'></tot-tabs>
    `

    const tabs = row.querySelector('tot-tabs')
    tabs.value = 'media'

    container.appendChild(row)
  }
})
