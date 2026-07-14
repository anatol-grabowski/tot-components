import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-generation-placeholder',
  title: 'Generation Placeholder',
  render: (container) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <tot-generation-placeholder>Reviewing recording 1…</tot-generation-placeholder>
      <tot-generation-placeholder label="Generating translation text…"></tot-generation-placeholder>
    `
    container.appendChild(wrapper)
  },
})
