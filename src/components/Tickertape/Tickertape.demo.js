import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-tickertape',
  title: 'Tickertape',
  render: (container) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <style>
        .tickertape-demo-line {
          align-items: center;
          display: inline-flex;
          gap: var(--tot-spacing-2x-small, .25rem);
          white-space: nowrap;
        }

        .tickertape-demo-item {
          background: var(--tot-color-neutral-50, #f8fafc);
          border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, var(--tot-color-neutral-200, #e2e8f0));
          border-radius: var(--tot-border-radius-small, 3px);
          color: var(--tot-color-neutral-800, #1e293b);
          display: inline-flex;
          font-size: var(--tot-font-size-small, .875rem);
          line-height: var(--tot-line-height-dense, 1.35);
          padding: var(--tot-spacing-3x-small, .125rem) var(--tot-spacing-2x-small, .375rem);
        }

        .tickertape-demo-name {
          font-weight: var(--tot-font-weight-semibold, 600);
        }

        .tickertape-demo-list {
          display: grid;
          gap: var(--tot-spacing-2x-small, .25rem);
          margin: 0;
          padding: 0;
        }
      </style>
      <div class="stack demo-group">
        <div class="demo-label">Horizontal overflow</div>
        <tot-tickertape>
          <div class="tickertape-demo-line">
            <span class="tickertape-demo-item"><span class="tickertape-demo-name">Terranova</span> · sweater with hood : 199.99</span>
            <span class="tickertape-demo-item"><span class="tickertape-demo-name">Nabia</span> · pants : 89.99</span>
            <span class="tickertape-demo-item"><span class="tickertape-demo-name">Market</span> · PLN total : 91</span>
            <span class="tickertape-demo-item"><span class="tickertape-demo-name">Water</span> · 1l : 2.29</span>
            <span class="tickertape-demo-item"><span class="tickertape-demo-name">Notes</span> · long phrase that keeps going beyond the edge</span>
          </div>
        </tot-tickertape>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Vertical overflow</div>
        <tot-tickertape vertical style="max-height: 5.75rem;">
          <div class="tickertape-demo-list">
            <span class="tickertape-demo-item"><span class="tickertape-demo-name">Design</span> · compact layout</span>
            <span class="tickertape-demo-item"><span class="tickertape-demo-name">Grammar</span> · B1 review</span>
            <span class="tickertape-demo-item"><span class="tickertape-demo-name">Vocabulary</span> · shopping and prices</span>
            <span class="tickertape-demo-item"><span class="tickertape-demo-name">Listening</span> · short exercise</span>
            <span class="tickertape-demo-item"><span class="tickertape-demo-name">Homework</span> · finish examples</span>
          </div>
        </tot-tickertape>
      </div>
    `

    container.appendChild(wrapper)
  },
})
