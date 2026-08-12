import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-editable-chart',
  title: 'Editable Chart',
  render: (container, { logEvent }) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Drag across the plot to edit values in 5-point steps</div>
        <tot-editable-chart id="editableLine" editable min="0" max="100" step="5" style="--tot-chart-height: 15rem;"></tot-editable-chart>
        <div class="row">
          <tot-button id="toggleEdit" size="small" label="Exit edit mode"></tot-button>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Bar chart, 0.5 step</div>
        <tot-editable-chart id="editableBar" editable type="bar" min="0" max="10" step="0.5" style="--tot-chart-height: 13rem;"></tot-editable-chart>
      </div>
    `

    const lineChart = row.querySelector('#editableLine')
    const barChart = row.querySelector('#editableBar')
    const toggleButton = row.querySelector('#toggleEdit')

    lineChart.data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [35, 50, 45, 65, 55, 75, 60],
    }
    barChart.data = {
      labels: ['Bass', 'Low', 'Mid', 'High', 'Air'],
      values: [4, 6.5, 5, 7.5, 6],
    }

    const charts = [lineChart, barChart]
    for (let i = 0; i < charts.length; i++) {
      charts[i].addEventListener('input', (event) => {
        logEvent(charts[i], 'input', event.detail)
      })
      charts[i].addEventListener('change', (event) => {
        logEvent(charts[i], 'change', event.detail)
      })
    }

    toggleButton.addEventListener('click', () => {
      lineChart.editable = !lineChart.editable
      toggleButton.label = lineChart.editable ? 'Exit edit mode' : 'Enter edit mode'
    })

    container.appendChild(row)
  },
})
