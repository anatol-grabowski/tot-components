import { registerDemo } from '../demoCommon.js'

const densityItems = [
  { value: 'compact', label: 'Compact' },
  { value: 'comfortable', label: 'Comfortable', selected: true },
  { value: 'spacious', label: 'Spacious' },
]

const fruitItems = [
  { value: 'apple', label: 'Apple', selected: true },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', selected: true },
  { value: 'dragonfruit', label: 'Dragonfruit' },
  { value: 'elderberry', label: 'Elderberry', disabled: true },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
  { value: 'kiwi', label: 'Kiwi' },
]

registerDemo({
  id: 'tot-horizontal-select',
  title: 'Horizontal Select',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Single selection configured with items property</div>
        <tot-horizontal-select id="densitySelect" label="Density" help-text="One option can be selected."></tot-horizontal-select>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Multiple selection, disabled item, horizontal scroll</div>
        <tot-horizontal-select id="fruitSelect" label="Fruit" help-text="Multiple selected options remain visible." multiple></tot-horizontal-select>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Sizes and JSON attribute configuration</div>
        <div class="stack">
          <tot-horizontal-select size="small" label="Small" value="b" items='[{"value":"a","label":"Alpha"},{"value":"b","label":"Beta"},{"value":"c","label":"Gamma"}]'></tot-horizontal-select>
          <tot-horizontal-select size="large" label="Large" value="week" items='[{"value":"day","label":"Day"},{"value":"week","label":"Week"},{"value":"month","label":"Month"},{"value":"year","label":"Year","disabled":true}]'></tot-horizontal-select>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Inline with button</div>
        <div class="stack">
          <div class="row inline-control-row inline-labeled-control-row">
            <tot-horizontal-select id="inlineViewSelect" label="View"></tot-horizontal-select>
            <tot-button variant="primary">Open</tot-button>
          </div>
          <div class="row inline-control-row">
            <tot-horizontal-select id="inlineDensitySelect"></tot-horizontal-select>
            <tot-button variant="primary">Save</tot-button>
          </div>
          <div class="row inline-control-row">
            <tot-horizontal-select id="inlinePeriodSelect" help-text="This changes the report interval."></tot-horizontal-select>
            <tot-button variant="primary">Update</tot-button>
          </div>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Dynamic item configuration</div>
        <div class="row">
          <tot-horizontal-select id="dynamicSelect" label="Alignment" value="left"></tot-horizontal-select>
          <tot-button data-action="swap-items">Swap items</tot-button>
          <tot-button data-action="set-values">Set selected</tot-button>
        </div>
      </div>
    `

    const densitySelect = wrapper.querySelector('#densitySelect')
    const fruitSelect = wrapper.querySelector('#fruitSelect')
    const inlineViewSelect = wrapper.querySelector('#inlineViewSelect')
    const inlineDensitySelect = wrapper.querySelector('#inlineDensitySelect')
    const inlinePeriodSelect = wrapper.querySelector('#inlinePeriodSelect')
    const dynamicSelect = wrapper.querySelector('#dynamicSelect')

    densitySelect.items = densityItems
    fruitSelect.items = fruitItems
    inlineViewSelect.items = [
      { value: 'list', label: 'List', selected: true },
      { value: 'board', label: 'Board' },
      { value: 'calendar', label: 'Calendar' },
    ]
    inlineDensitySelect.items = densityItems
    inlinePeriodSelect.items = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week', selected: true },
      { value: 'month', label: 'Month' },
    ]
    dynamicSelect.items = [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right', disabled: true },
    ]

    const selects = wrapper.querySelectorAll('tot-horizontal-select')
    for (let i = 0; i < selects.length; i++) {
      const select = selects[i]
      select.addEventListener('change', () => {
        logEvent(select, 'change', getSelectState(select))
      })
    }

    wrapper.addEventListener('click', (event) => {
      const action = event.target?.dataset?.action
      if (action === 'swap-items') {
        dynamicSelect.items = [
          { value: 'red', label: 'Red' },
          { value: 'green', label: 'Green' },
          { value: 'blue', label: 'Blue' },
          { value: 'violet', label: 'Violet', disabled: true },
        ]
        dynamicSelect.value = 'green'
        logEvent(dynamicSelect, 'items-update', { count: dynamicSelect.items.length, value: dynamicSelect.value })
      }

      if (action === 'set-values') {
        fruitSelect.values = ['banana', 'dragonfruit', 'fig']
        logEvent(fruitSelect, 'values-update', { values: fruitSelect.values })
      }
    })

    container.appendChild(wrapper)
  },
})

function getSelectState(select) {
  return {
    value: select.value,
    values: select.values,
    multiple: select.multiple,
  }
}
