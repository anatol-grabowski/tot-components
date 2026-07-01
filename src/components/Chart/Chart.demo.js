import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-chart',
  title: 'Chart',
  render: (container, { logEvent }) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Line chart from JSON config</div>
        <tot-chart
          id="chartLine"
          type="line"
          label="Monthly visitors"
          description="Unique visitors and signups over six months."
          legend-position="bottom"
          x-label="Month"
          y-label="Count"
          style="--tot-chart-height: 15rem;"
        >
          <script type="application/json">
            {
              "data": {
                "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                "datasets": [
                  {
                    "label": "Visitors",
                    "data": [120, 150, 132, 178, 190, 224],
                    "tension": 0.35
                  },
                  {
                    "label": "Signups",
                    "data": [32, 41, 39, 53, 62, 74],
                    "tension": 0.35
                  }
                ]
              }
            }
          </script>
        </tot-chart>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Stacked bar chart from JavaScript config</div>
        <tot-chart
          id="chartStackedBar"
          type="bar"
          stacked
          label="Work by category"
          description="Stacked work amounts for project categories over six months."
          legend-position="bottom"
          x-label="Month"
          y-label="Hours"
          style="--tot-chart-height: 15rem;"
        ></tot-chart>
        <div class="row">
          <tot-button id="randomizeChart" size="small" label="Randomize"></tot-button>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Pie chart with generated arc colors</div>
        <tot-chart
          id="chartPie"
          type="pie"
          label="Time allocation"
          description="Share of time by activity."
          legend-position="bottom"
          style="--tot-chart-height: 13rem;"
        ></tot-chart>
      </div>
    `

    const lineChart = row.querySelector('#chartLine')
    const stackedBarChart = row.querySelector('#chartStackedBar')
    const pieChart = row.querySelector('#chartPie')
    const randomizeButton = row.querySelector('#randomizeChart')

    stackedBarChart.config = createStackedBarConfig()
    pieChart.config = createPieConfig()

    const charts = [lineChart, stackedBarChart, pieChart]
    for (let i = 0; i < charts.length; i++) {
      charts[i].addEventListener('chart-render', (event) => {
        logEvent(charts[i], 'chart-render', event.detail)
      })
      charts[i].addEventListener('chart-error', (event) => {
        logEvent(charts[i], 'chart-error', event.detail)
      })
    }

    randomizeButton.addEventListener('click', () => {
      if (!stackedBarChart.chart) {
        return
      }

      const datasets = stackedBarChart.chart.data.datasets
      for (let i = 0; i < datasets.length; i++) {
        for (let j = 0; j < datasets[i].data.length; j++) {
          datasets[i].data[j] = 15 + Math.round(Math.random() * 35)
        }
      }
      stackedBarChart.chart.update()
      logEvent(stackedBarChart, 'chart-update', { action: 'randomize' })
    })

    container.appendChild(row)
  },
})

function createStackedBarConfig() {
  return {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Design',
          data: [22, 28, 24, 31, 25, 27],
        },
        {
          label: 'Development',
          data: [44, 50, 54, 59, 61, 66],
        },
        {
          label: 'Testing',
          data: [12, 18, 20, 24, 22, 28],
        },
      ],
    },
  }
}

function createPieConfig() {
  return {
    data: {
      labels: ['Development', 'Design', 'Testing', 'Meetings'],
      datasets: [
        {
          label: 'Hours',
          data: [35, 20, 15, 18],
        },
      ],
    },
  }
}
