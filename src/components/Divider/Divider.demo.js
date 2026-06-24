import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-divider',
  title: 'Divider',
  render: (container) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Horizontal</div>
        <div>Above<tot-divider></tot-divider>Below</div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Theme custom properties</div>
        <div>
          Thin default
          <tot-divider></tot-divider>
          Thicker primary divider
          <tot-divider style="--tot-divider-width: 3px; --tot-divider-color: var(--tot-color-primary-500); --tot-divider-spacing: .5rem;"></tot-divider>
          Compact spacing
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Vertical in a flex row</div>
        <div class="row" style="height: 2rem; flex-wrap: nowrap;">
          <span>Left</span>
          <tot-divider vertical></tot-divider>
          <span>Middle</span>
          <tot-divider vertical style="--tot-divider-color: var(--tot-color-primary-500);"></tot-divider>
          <span>Right</span>
        </div>
      </div>
    `

    container.appendChild(row)
  },
})
