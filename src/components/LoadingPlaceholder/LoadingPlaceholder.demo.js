import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-loading-placeholder',
  title: 'Loading Placeholder',
  render: (container) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <tot-loading-placeholder>Reviewing recording 1…</tot-loading-placeholder>
      <tot-loading-placeholder label="Loading translation text…"></tot-loading-placeholder>
    `
    container.appendChild(wrapper)
  },
})
