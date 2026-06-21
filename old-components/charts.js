/**
 * Compact Components - Chart and table components
 * CompactStackedBarChart, CompactLineChart, CompactHorizontalBarChart, CompactTable
 */

import { shadow, emit, setText, parseJson, palette } from './core.js'

function normalizeChartData(value) {
  if (Array.isArray(value)) {
    return value
  }
  if (value && Array.isArray(value.rows)) {
    return value.rows
  }
  if (value && typeof value === 'object') {
    return Object.keys(value).map(key => ({ label: key, value: value[key] }))
  }
  return []
}

function chartStyle() {
  return `
    :host {
      display: block;
      max-width: 100%;
    }

    .chart {
      border: 1px solid var(--cc-border);
      border-radius: var(--cc-radius);
      background: #fff;
      padding: 7px;
      display: grid;
      gap: 6px;
      max-width: 100%;
      overflow: hidden;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 5px 10px;
      font-size: 12px;
      color: var(--cc-muted);
    }

    .legend span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .legend i {
      width: 10px;
      height: 10px;
      display: inline-block;
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, .2);
    }

    .bar-row {
      display: grid;
      grid-template-columns: minmax(58px, 120px) minmax(80px, 1fr) minmax(34px, auto);
      gap: 6px;
      align-items: center;
      min-width: 0;
    }

    .bar-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--cc-muted);
    }

    .bar-value {
      font-variant-numeric: tabular-nums;
      text-align: right;
      color: var(--cc-muted);
    }

    .stack,
    .plain-bar {
      height: 22px;
      background: #f3f3f3;
      border: 1px solid var(--cc-border);
      border-radius: 3px;
      overflow: hidden;
      display: flex;
      min-width: 0;
    }

    .stack span {
      color: #fff;
      min-width: 1px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      overflow: hidden;
      text-shadow: 0 1px 1px rgba(0, 0, 0, .35);
    }

    .plain-bar span {
      display: block;
      height: 100%;
    }

    @media (max-width: 480px) {
      .bar-row {
        grid-template-columns: 1fr;
        gap: 2px;
      }

      .bar-value {
        text-align: left;
      }
    }
  `
}

export class CompactStackedBarChart extends HTMLElement {
  static get observedAttributes() {
    return ['data', 'height']
  }

  set data(value) {
    this._data = value
    this.render()
  }

  get data() {
    return this._data || parseJson(this.getAttribute('data'), [])
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const data = normalizeChartData(this.data)
    const height = Number(this.getAttribute('height') || 190)
    const keys = []
    for (let i = 0; i < data.length; i++) {
      const values = data[i].values || {}
      const names = Object.keys(values)
      for (let j = 0; j < names.length; j++) {
        if (!keys.includes(names[j])) {
          keys.push(names[j])
        }
      }
    }
    const root = shadow(this, chartStyle(), '<div class="chart"></div>')
    const holder = root.querySelector('.chart')
    holder.style.minHeight = `${height}px`
    if (!data.length || !keys.length) {
      holder.textContent = 'No chart data'
      return
    }
    const legend = document.createElement('div')
    legend.className = 'legend'
    for (let i = 0; i < keys.length; i++) {
      const item = document.createElement('span')
      item.innerHTML = `<i style="background:${palette[i % palette.length]};"></i>`
      item.append(document.createTextNode(keys[i]))
      legend.append(item)
    }
    holder.append(legend)
    for (let i = 0; i < data.length; i++) {
      const row = document.createElement('div')
      row.className = 'bar-row'
      const label = document.createElement('div')
      label.className = 'bar-label'
      setText(label, data[i].label || `Row ${i + 1}`)
      const bar = document.createElement('div')
      bar.className = 'stack'
      const total = keys.reduce((sum, key) => sum + Number((data[i].values || {})[key] || 0), 0)
      for (let j = 0; j < keys.length; j++) {
        const value = Number((data[i].values || {})[keys[j]] || 0)
        if (value <= 0) {
          continue
        }
        const seg = document.createElement('span')
        seg.style.width = `${value / Math.max(1, total) * 100}%`
        seg.style.background = palette[j % palette.length]
        seg.title = `${keys[j]}: ${value}`
        setText(seg, value)
        bar.append(seg)
      }
      const totalNode = document.createElement('div')
      totalNode.className = 'bar-value'
      setText(totalNode, total)
      row.append(label, bar, totalNode)
      holder.append(row)
    }
  }
}

export class CompactHorizontalBarChart extends HTMLElement {
  static get observedAttributes() {
    return ['data', 'height']
  }

  set data(value) {
    this._data = value
    this.render()
  }

  get data() {
    return this._data || parseJson(this.getAttribute('data'), [])
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const data = normalizeChartData(this.data)
    const max = Math.max(...data.map(item => Number(item.value || 0)), 1)
    const root = shadow(this, chartStyle(), '<div class="chart"></div>')
    const holder = root.querySelector('.chart')
    if (!data.length) {
      holder.textContent = 'No chart data'
      return
    }
    for (let i = 0; i < data.length; i++) {
      const row = document.createElement('div')
      row.className = 'bar-row'
      const label = document.createElement('div')
      label.className = 'bar-label'
      setText(label, data[i].label || `Row ${i + 1}`)
      const bar = document.createElement('div')
      bar.className = 'plain-bar'
      const fill = document.createElement('span')
      fill.style.width = `${Number(data[i].value || 0) / max * 100}%`
      fill.style.background = palette[i % palette.length]
      bar.append(fill)
      const value = document.createElement('div')
      value.className = 'bar-value'
      setText(value, data[i].value || 0)
      row.append(label, bar, value)
      holder.append(row)
    }
  }
}

export class CompactLineChart extends HTMLElement {
  static get observedAttributes() {
    return ['data', 'height']
  }

  set data(value) {
    this._data = value
    this.render()
  }

  get data() {
    return this._data || parseJson(this.getAttribute('data'), [])
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const data = normalizeChartData(this.data)
    const height = Number(this.getAttribute('height') || 220)
    const width = 640
    const padLeft = 36
    const padRight = 12
    const padTop = 12
    const padBottom = 28
    const values = data.map(item => Number(item.value || item.y || 0))
    const max = Math.max(...values, 1)
    const min = Math.min(...values, 0)
    const root = shadow(this, `
      :host {
        display: block;
        max-width: 100%;
      }

      .wrap {
        border: 1px solid var(--cc-border);
        background: #fff;
        border-radius: var(--cc-radius);
        padding: 6px;
        overflow-x: auto;
      }

      svg {
        width: 100%;
        min-width: 320px;
        height: auto;
        display: block;
      }

      text {
        fill: #555;
        font-size: 11px;
      }
    `, '<div class="wrap"></div>')
    const wrap = root.querySelector('.wrap')
    if (!data.length) {
      wrap.textContent = 'No chart data'
      return
    }
    const usableW = width - padLeft - padRight
    const usableH = height - padTop - padBottom
    const xFor = index => padLeft + (data.length === 1 ? usableW / 2 : index / (data.length - 1) * usableW)
    const yFor = value => padTop + (max - value) / Math.max(.0001, max - min) * usableH
    const points = []
    for (let i = 0; i < data.length; i++) {
      points.push(`${xFor(i)},${yFor(values[i])}`)
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    svg.innerHTML = `
      <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${height - padBottom}" stroke="#ccc"></line>
      <line x1="${padLeft}" y1="${height - padBottom}" x2="${width - padRight}" y2="${height - padBottom}" stroke="#ccc"></line>
      <text x="4" y="${yFor(max) + 4}">${max}</text>
      <text x="4" y="${yFor(min) + 4}">${min}</text>
      <polyline fill="none" stroke="#0066cc" stroke-width="2.5" points="${points.join(' ')}"></polyline>
    `
    for (let i = 0; i < data.length; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', String(xFor(i)))
      circle.setAttribute('cy', String(yFor(values[i])))
      circle.setAttribute('r', '4')
      circle.setAttribute('fill', '#fff')
      circle.setAttribute('stroke', '#0066cc')
      circle.setAttribute('stroke-width', '2')
      svg.append(circle)
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      label.setAttribute('x', String(xFor(i)))
      label.setAttribute('y', String(height - 8))
      label.setAttribute('text-anchor', 'middle')
      label.textContent = data[i].label || data[i].x || String(i + 1)
      svg.append(label)
      const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      valueText.setAttribute('x', String(xFor(i)))
      valueText.setAttribute('y', String(yFor(values[i]) - 8))
      valueText.setAttribute('text-anchor', 'middle')
      valueText.textContent = String(values[i])
      svg.append(valueText)
    }
    wrap.append(svg)
  }
}

export class CompactTable extends HTMLElement {
  static get observedAttributes() {
    return ['data']
  }

  set data(value) {
    this._data = value
    this.render()
  }

  get data() {
    return this._data || parseJson(this.getAttribute('data'), [])
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const root = shadow(this, `
      :host {
        display: block;
        max-width: 100%;
      }

      .wrap {
        overflow: auto;
        max-width: 100%;
        border: 1px solid var(--cc-border);
        background: #fff;
      }

      table {
        border-collapse: collapse;
        width: max-content;
        min-width: 100%;
        font-size: 12px;
      }

      th, td {
        border: 1px solid #ddd;
        padding: 4px 8px;
        text-align: left;
        vertical-align: top;
      }

      th {
        position: sticky;
        top: 0;
        z-index: 1;
        background: #f0f0f0;
        font-weight: 700;
      }

      tbody tr:hover {
        background: var(--cc-blue-soft);
      }
    `, '<div class="wrap"><table><thead></thead><tbody></tbody></table></div>')
    const normalized = normalizeTableData(this.data)
    const head = root.querySelector('thead')
    const body = root.querySelector('tbody')
    const tr = document.createElement('tr')
    for (let i = 0; i < normalized.columns.length; i++) {
      const th = document.createElement('th')
      setText(th, normalized.columns[i].label)
      tr.append(th)
    }
    head.append(tr)
    for (let i = 0; i < normalized.rows.length; i++) {
      const row = normalized.rows[i]
      const bodyTr = document.createElement('tr')
      bodyTr.tabIndex = 0
      for (let j = 0; j < normalized.columns.length; j++) {
        const col = normalized.columns[j]
        const td = document.createElement('td')
        const value = row[col.key]
        setText(td, typeof value === 'object' ? JSON.stringify(value) : value)
        bodyTr.append(td)
      }
      bodyTr.addEventListener('click', () => emit(this, 'row-click', { row, index: i }))
      body.append(bodyTr)
    }
  }
}

function normalizeTableData(data) {
  if (data && Array.isArray(data.rows)) {
    const rows = data.rows
    const columns = (data.columns || inferColumns(rows)).map(col => {
      if (typeof col === 'string') {
        return { key: col, label: col }
      }
      return { key: col.key || col.value, label: col.label || col.key || col.value }
    })
    return { rows, columns }
  }
  if (Array.isArray(data)) {
    return { rows: data, columns: inferColumns(data) }
  }
  if (data && typeof data === 'object') {
    const rows = Object.keys(data).map(key => ({ key, value: data[key] }))
    return { rows, columns: inferColumns(rows) }
  }
  return { rows: [], columns: [] }
}

function inferColumns(rows) {
  const keys = []
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    if (!row || typeof row !== 'object') {
      continue
    }
    const rowKeys = Object.keys(row)
    for (let j = 0; j < rowKeys.length; j++) {
      if (!keys.includes(rowKeys[j])) {
        keys.push(rowKeys[j])
      }
    }
  }
  return keys.map(key => ({ key, label: key }))
}
