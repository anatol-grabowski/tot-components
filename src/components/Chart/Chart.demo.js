import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-chart',
  title: 'Chart',
  render: (container, { logEvent }) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Line chart from a Chart.js config object</div>
        <tot-chart id="chartLine" style="--tot-chart-height: 15rem;"></tot-chart>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Stacked bar chart</div>
        <tot-chart id="chartStackedBar" style="--tot-chart-height: 15rem;"></tot-chart>
        <div class="row">
          <tot-button id="randomizeChart" size="small" label="Randomize"></tot-button>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Pie chart</div>
        <tot-chart id="chartPie" style="--tot-chart-height: 13rem;"></tot-chart>
      </div>
    `

    const lineChart = row.querySelector('#chartLine')
    const stackedBarChart = row.querySelector('#chartStackedBar')
    const pieChart = row.querySelector('#chartPie')
    const randomizeButton = row.querySelector('#randomizeChart')

    lineChart.config = createLineConfig()
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
      const config = createStackedBarConfig()
      const datasets = config.data.datasets
      for (let i = 0; i < datasets.length; i++) {
        for (let j = 0; j < datasets[i].data.length; j++) {
          datasets[i].data[j] = 15 + Math.round(Math.random() * 35)
        }
      }
      stackedBarChart.config = config
      logEvent(stackedBarChart, 'chart-config', { action: 'randomize' })
    })

    container.appendChild(row)
  },
})

function createLineConfig() {
  return {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Visitors',
          data: [120, 150, 132, 178, 190, 224],
          tension: .35,
        },
        {
          label: 'Signups',
          data: [32, 41, 39, 53, 62, 74],
          tension: .35,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: false,
          text: 'Monthly visitors',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Count',
          },
        },
      },
    },
  }
}

function createStackedBarConfig() {
  return {
    type: 'bar',
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
    options: {
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: false,
          text: 'Work by category',
        },
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Month',
          },
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'Hours',
          },
        },
      },
    },
  }
}

function createPieConfig() {
  return {
    type: 'pie',
    data: {
      labels: ['Development', 'Design', 'Testing', 'Meetings'],
      datasets: [
        {
          label: 'Hours',
          data: [35, 20, 15, 18],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: false,
          text: 'Time allocation',
        },
      },
    },
  }
}
