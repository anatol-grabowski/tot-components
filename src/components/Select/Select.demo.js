import { registerDemo } from '../demoCommon.js'

const statusOptions = [
  { value: 'todo', label: 'To do' },
  { value: 'doing', label: 'In progress', selected: true },
  { value: 'done', label: 'Done' },
  'divider',
  { value: 'archived', label: 'Archived', disabled: true },
]

const tagOptions = [
  { value: 'ux', label: 'UX' },
  { value: 'api', label: 'Api' },
  { value: 'docs', label: 'Docs' },
  'divider',
  { value: 'infra', label: 'Infrastructure' },
  { value: 'blocked', label: 'Blocked', disabled: true },
]

const manyOptions = [
  { value: 'overview', label: 'Overview' },
  { value: 'activity', label: 'Activity' },
  { value: 'media', label: 'Media' },
  { value: 'data', label: 'Data' },
  { value: 'docs', label: 'Docs' },
  { value: 'settings', label: 'Settings' },
  { value: 'billing', label: 'Billing' },
  { value: 'security', label: 'Security' },
  { value: 'integrations', label: 'Integrations' },
  { value: 'support', label: 'Support' },
]

registerDemo({
  id: 'tot-select',
  title: 'Select',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Single select, JSON options, clearable</div>
        <tot-select
          id="statusSelect"
          label="Status"
          hint-text="Options can include dividers and disabled rows."
          placeholder="Choose status"
          clearable
        >
          <span slot="prefix">●</span>
        </tot-select>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Multiple select with suffix slot</div>
        <tot-select id="tagSelect" label="Tags" placeholder="Pick tags" multiple clearable>
          <span slot="suffix">#</span>
        </tot-select>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Multiple select with many selected options</div>
        <tot-select id="manySelect" label="Sections" placeholder="Pick sections" multiple clearable></tot-select>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Sizes and attribute configuration</div>
        <div class="stack">
          <tot-select size="small" label="Small" value="b" options='[{"value":"a","label":"Alpha"},{"value":"b","label":"Beta"},{"value":"c","label":"Gamma"}]'></tot-select>
          <tot-select size="large" label="Large" placeholder="Choose period" value="week" options='[{"value":"day","label":"Day"},{"value":"week","label":"Week"},{"value":"month","label":"Month"},"divider",{"value":"year","label":"Year","disabled":true}]'></tot-select>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Dynamic options and hoisted panel</div>
        <div class="row">
          <tot-select id="dynamicSelect" label="Assignee" placeholder="Assign" hoist clearable></tot-select>
          <button class="demo-native-button" type="button" data-action="swap-options">Swap options</button>
          <button class="demo-native-button" type="button" data-action="set-value">Set selected</button>
          <button class="demo-native-button" type="button" data-action="toggle-disabled">Toggle disabled</button>
        </div>
      </div>
    `

    const statusSelect = wrapper.querySelector('#statusSelect')
    const tagSelect = wrapper.querySelector('#tagSelect')
    const dynamicSelect = wrapper.querySelector('#dynamicSelect')
    const manySelect = wrapper.querySelector('#manySelect')

    statusSelect.options = statusOptions
    tagSelect.options = tagOptions
    tagSelect.values = ['ux', 'docs']
    manySelect.options = manyOptions
    manySelect.values = ['overview', 'activity', 'media', 'data', 'docs', 'settings']
    dynamicSelect.options = [
      { value: 'ana', label: 'Ana' },
      { value: 'bo', label: 'Bo' },
      { value: 'chen', label: 'Chen', disabled: true },
    ]

    const selects = wrapper.querySelectorAll('tot-select')
    for (let i = 0; i < selects.length; i++) {
      const select = selects[i]
      select.addEventListener('input', (event) => {
        logEvent(select, 'input', getSelectEventDetail(event.detail))
      })
      select.addEventListener('change', (event) => {
        logEvent(select, 'change', getSelectEventDetail(event.detail))
      })
      select.addEventListener('clear', (event) => {
        logEvent(select, 'clear', getSelectEventDetail(event.detail))
      })
    }

    wrapper.addEventListener('click', (event) => {
      const action = event.target?.dataset?.action
      if (!action) {
        return
      }

      if (action === 'swap-options') {
        dynamicSelect.options = [
          { value: 'design', label: 'Design team' },
          { value: 'frontend', label: 'Frontend' },
          'divider',
          { value: 'backend', label: 'Backend' },
        ]
        dynamicSelect.value = 'frontend'
        logEvent(dynamicSelect, 'options-update', { count: dynamicSelect.options.length, value: dynamicSelect.value })
      }

      if (action === 'set-value') {
        statusSelect.value = 'done'
        tagSelect.values = ['api', 'infra']
        logEvent(statusSelect, 'value-update', { value: statusSelect.value })
        logEvent(tagSelect, 'values-update', { values: tagSelect.values })
      }

      if (action === 'toggle-disabled') {
        dynamicSelect.disabled = !dynamicSelect.disabled
        logEvent(dynamicSelect, 'disabled-toggle', { disabled: dynamicSelect.disabled })
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
    option: detail.option ? { value: detail.option.value, label: detail.option.label } : null,
  }
}
