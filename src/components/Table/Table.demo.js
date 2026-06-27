import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-table',
  title: 'Table',
  render: (container, { logEvent }) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Sticky rows and columns with template slots</div>
        <tot-table id="largeTable" style="--tot-table-max-height: 18rem;">
          <template slot="corner"><th class="header">{{content}}</th></template>
          <template slot="group"><th class="group">{{content}}</th></template>
          <template slot="month"><th class="header numeric">{{content}}</th></template>
          <template slot="row-header"><th class="row-header">{{content}}</th></template>
          <template slot="status"><td>{{content}}</td></template>
          <template slot="total"><th class="total numeric">{{content}}</th></template>
        </tot-table>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Attribute table data, default td rendering</div>
        <tot-table id="smallTable" style="--tot-table-max-height: 12rem;"></tot-table>
      </div>
    `

    const largeTable = row.querySelector('#largeTable')
    largeTable.table = createLargeTable()
    largeTable.addEventListener('cell-click', (event) => {
      logEvent(largeTable, 'cell-click', getCompactCellDetail(event.detail))
    })

    const smallTable = row.querySelector('#smallTable')
    smallTable.setAttribute('table', JSON.stringify(createSmallTable()))
    smallTable.addEventListener('cell-click', (event) => {
      logEvent(smallTable, 'cell-click', getCompactCellDetail(event.detail))
    })

    container.appendChild(row)
  },
})

function createLargeTable() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  const cells = []

  cells.push([
    cell('h-region', 'corner', 'Region', ['header']),
    cell('h-name', 'corner', 'Item', ['header']),
    ...repeatCell('h-h1', 5, 'group', 'H1', ['group']),
    ...repeatCell('h-h2', 5, 'group', 'H2', ['group']),
    cell('h-status', 'corner', 'Status', ['header']),
  ])

  cells.push([
    cell('h-region', 'corner', 'Region', ['header']),
    cell('h-name', 'corner', 'Item', ['header']),
    ...months.map((month, index) => cell(`h-month-${index}`, 'month', month, ['header', 'numeric'])),
    cell('h-status', 'corner', 'Status', ['header']),
  ])

  const regions = ['North', 'South', 'East', 'West', 'Central', 'Remote']
  for (let rowIndex = 0; rowIndex < 30; rowIndex++) {
    const status = getStatus(rowIndex)
    const row = [
      cell(`region-${Math.floor(rowIndex / 5)}`, 'row-header', regions[Math.floor(rowIndex / 5) % regions.length], ['row-header']),
      cell(`item-${rowIndex}`, 'row-header', `Course ${rowIndex + 1}`, ['row-header']),
    ]

    for (let colIndex = 0; colIndex < months.length; colIndex++) {
      const value = 42 + rowIndex * 3 + colIndex * 5
      row.push(cell(`score-${rowIndex}-${colIndex}`, 'score', value, [
        'numeric',
        { positive: value >= 120 },
        { warning: value < 65 },
      ]))
    }

    row.push(cell(`status-${rowIndex}`, 'status', status.label, [status.className]))
    cells.push(row)
  }

  const totalRow = [
    cell('total-label', 'row-header', 'Total', ['total'], 2),
    cell('total-label', 'row-header', 'Total', ['total'], 2),
  ]

  for (let colIndex = 0; colIndex < months.length; colIndex++) {
    totalRow.push(cell(`total-${colIndex}`, 'total', 1800 + colIndex * 145, ['total', 'numeric']))
  }

  totalRow.push(cell('total-status', 'status', 'Ready', ['positive', 'total']))
  cells.push(totalRow)

  return {
    cells,
    sticky: {
      top: 2,
      left: 2,
      right: 1,
      bottom: 1,
    },
  }
}

function createSmallTable() {
  return {
    sticky: {
      top: 1,
      left: 1,
    },
    cells: [
      [
        cell('name-head', 'cell', 'Name', ['header']),
        cell('level-head', 'cell', 'Level', ['header']),
        cell('notes-head', 'cell', 'Notes', ['header']),
      ],
      [
        cell('polish', 'cell', 'Polish', ['row-header']),
        cell('polish-level', 'cell', 'B1', []),
        cell('polish-notes', 'cell', 'Case endings need review', []),
      ],
      [
        cell('spanish', 'cell', 'Spanish', ['row-header']),
        cell('spanish-level', 'cell', 'A2', []),
        cell('spanish-notes', 'cell', 'Practice both castellano and argentino', []),
      ],
      [
        cell('ukrainian', 'cell', 'Ukrainian', ['row-header']),
        cell('ukrainian-level', 'cell', 'A1', []),
        cell('ukrainian-notes', 'cell', 'Focus on everyday phrases', []),
      ],
    ],
  }
}

function repeatCell(id, count, type, content, classes) {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(cell(id, type, content, classes, count))
  }
  return result
}

function cell(id, type, content, classes, colspan, rowspan) {
  return {
    id,
    type,
    class: classes || [],
    colspan,
    rowspan,
    content,
  }
}

function getStatus(index) {
  const statuses = [
    { label: 'Ready', className: 'positive' },
    { label: 'Review', className: 'warning' },
    { label: 'Blocked', className: 'negative' },
  ]
  return statuses[index % statuses.length]
}

function getCompactCellDetail(detail) {
  return {
    row: detail.row,
    col: detail.col,
    id: detail.cell?.id,
    type: detail.cell?.type,
    content: detail.cell?.content,
  }
}
