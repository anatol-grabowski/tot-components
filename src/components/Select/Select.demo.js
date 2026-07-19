import { registerDemo } from '../demoCommon.js'

const statusItems = [
  { value: 'todo', label: 'To do' },
  { value: 'doing', label: 'In progress', selected: true },
  { value: 'done', label: 'Done' },
  'divider',
  { value: 'archived', label: 'Archived', disabled: true },
]

const tagItems = [
  { value: 'ux', label: 'UX' },
  { value: 'api', label: 'Api' },
  { value: 'docs', label: 'Docs' },
  'divider',
  { value: 'infra', label: 'Infrastructure' },
  { value: 'blocked', label: 'Blocked', disabled: true },
]

const manyItems = [
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
        <div class="demo-label">Single select, JSON items, clearable</div>
        <tot-select
          id="statusSelect"
          label="Status"
          help-text="Items can include dividers and disabled rows."
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
          <tot-select size="small" label="Small" value="b" items='[{"value":"a","label":"Alpha"},{"value":"b","label":"Beta"},{"value":"c","label":"Gamma"}]'></tot-select>
          <tot-select size="large" label="Large" placeholder="Choose period" value="week" items='[{"value":"day","label":"Day"},{"value":"week","label":"Week"},{"value":"month","label":"Month"},"divider",{"value":"year","label":"Year","disabled":true}]'></tot-select>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Inline with button</div>
        <div class="stack">
          <div class="row inline-control-row inline-labeled-control-row">
            <tot-select id="inlinePrioritySelect" label="Priority" placeholder="Choose priority"></tot-select>
            <tot-button variant="primary">Set</tot-button>
          </div>
          <div class="row inline-control-row">
            <tot-select id="inlineStatusSelect" placeholder="Choose status"></tot-select>
            <tot-button variant="primary">Apply</tot-button>
          </div>
          <div class="row inline-control-row">
            <tot-select id="inlineTeamSelect" placeholder="Choose team" help-text="The assignment is applied immediately."></tot-select>
            <tot-button variant="primary">Assign</tot-button>
          </div>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Dynamic items and hoisted panel</div>
        <div class="row">
          <tot-select id="dynamicSelect" label="Assignee" placeholder="Assign" hoist clearable></tot-select>
          <tot-button data-action="swap-items">Swap items</tot-button>
          <tot-button data-action="set-value">Set selected</tot-button>
          <tot-button data-action="toggle-disabled">Toggle disabled</tot-button>
        </div>
      </div>
    `

    const statusSelect = wrapper.querySelector('#statusSelect')
    const tagSelect = wrapper.querySelector('#tagSelect')
    const manySelect = wrapper.querySelector('#manySelect')
    const inlinePrioritySelect = wrapper.querySelector('#inlinePrioritySelect')
    const inlineStatusSelect = wrapper.querySelector('#inlineStatusSelect')
    const inlineTeamSelect = wrapper.querySelector('#inlineTeamSelect')
    const dynamicSelect = wrapper.querySelector('#dynamicSelect')

    statusSelect.items = statusItems
    tagSelect.items = tagItems
    tagSelect.values = ['ux', 'docs']
    manySelect.items = manyItems
    manySelect.values = ['overview', 'activity', 'media', 'data', 'docs', 'settings']
    inlinePrioritySelect.items = [
      { value: 'low', label: 'Low' },
      { value: 'normal', label: 'Normal', selected: true },
      { value: 'high', label: 'High' },
    ]
    inlineStatusSelect.items = statusItems
    inlineTeamSelect.items = [
      { value: 'design', label: 'Design' },
      { value: 'frontend', label: 'Frontend' },
      { value: 'backend', label: 'Backend' },
    ]
    dynamicSelect.items = [
      { value: 'ana', label: 'Ana' },
      { value: 'bo', label: 'Bo' },
      { value: 'chen', label: 'Chen', disabled: true },
    ]

    const selects = wrapper.querySelectorAll('tot-select')
    for (let i = 0; i < selects.length; i++) {
      const select = selects[i]
      select.addEventListener('change', () => {
        logEvent(select, 'change', getSelectState(select))
      })
      select.addEventListener('clear', () => {
        logEvent(select, 'clear', getSelectState(select))
      })
    }

    wrapper.addEventListener('click', (event) => {
      const action = event.target?.dataset?.action
      if (!action) {
        return
      }

      if (action === 'swap-items') {
        dynamicSelect.items = [
          { value: 'design', label: 'Design team' },
          { value: 'frontend', label: 'Frontend' },
          'divider',
          { value: 'backend', label: 'Backend' },
        ]
        dynamicSelect.value = 'frontend'
        logEvent(dynamicSelect, 'items-update', { count: dynamicSelect.items.length, value: dynamicSelect.value })
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

function getSelectState(select) {
  return {
    value: select.value,
    values: select.values,
    multiple: select.multiple,
  }
}
