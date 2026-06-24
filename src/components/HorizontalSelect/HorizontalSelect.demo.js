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
        <tot-horizontal-select id="fruitSelect" label="Fruit" help-text="Multiple selected options keep visible borders and fixed widths." multiple></tot-horizontal-select>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Sizes and JSON attribute configuration</div>
        <div class="stack">
          <tot-horizontal-select size="small" label="Small" value="b" items='[{"value":"a","label":"Alpha"},{"value":"b","label":"Beta"},{"value":"c","label":"Gamma"}]'></tot-horizontal-select>
          <tot-horizontal-select size="large" label="Large" value="week" items='[{"value":"day","label":"Day"},{"value":"week","label":"Week"},{"value":"month","label":"Month"},{"value":"year","label":"Year","disabled":true}]'></tot-horizontal-select>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Dynamic item configuration</div>
        <div class="row">
          <tot-horizontal-select id="dynamicSelect" label="Dynamic" value="left"></tot-horizontal-select>
          <button class="demo-native-button" type="button" data-action="swap-items">Swap items</button>
          <button class="demo-native-button" type="button" data-action="set-values">Set selected</button>
        </div>
      </div>
    `

    const densitySelect = wrapper.querySelector('#densitySelect')
    const fruitSelect = wrapper.querySelector('#fruitSelect')
    const dynamicSelect = wrapper.querySelector('#dynamicSelect')

    densitySelect.items = densityItems
    fruitSelect.items = fruitItems
    dynamicSelect.items = [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right', disabled: true },
    ]

    const selects = wrapper.querySelectorAll('tot-horizontal-select')
    for (let i = 0; i < selects.length; i++) {
      const select = selects[i]
      select.addEventListener('input', (event) => {
        event.__totDemoLogged = true
        logEvent(select, 'input', getSelectEventDetail(event.detail))
      })
      select.addEventListener('change', (event) => {
        event.__totDemoLogged = true
        logEvent(select, 'change', getSelectEventDetail(event.detail))
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

function getSelectEventDetail(detail) {
  return {
    value: detail.value,
    values: detail.values,
    multiple: detail.multiple,
    selected: detail.selected,
    item: detail.item ? { value: detail.item.value, label: detail.item.label } : null,
  }
}
