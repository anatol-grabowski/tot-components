import { registerDemo } from '../demoCommon.js'

const initialItems = [
  { value: 'controls', label: 'Controls' },
  { value: 'media', label: 'Media' },
  { value: 'data', label: 'Data' },
  { value: 'docs', label: 'Docs' },
]

const stickyItems = [
  { value: 'home', label: 'Home', sticky: 'start' },
  { value: 'overview', label: 'Overview' },
  { value: 'activity', label: 'Activity' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'tasks', label: 'Tasks' },
  { value: 'files', label: 'Files' },
  { value: 'members', label: 'Members' },
  { value: 'billing', label: 'Billing' },
  { value: 'automation', label: 'Automation' },
  { value: 'integrations', label: 'Integrations' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'permissions', label: 'Permissions' },
  { value: 'audit', label: 'Audit Log' },
  { value: 'exports', label: 'Exports' },
  { value: 'settings', label: 'Settings', sticky: 'end' },
  { value: 'add', label: '➕', sticky: 'end' },
]

const manyItems = [
  { value: 'overview', label: 'Overview' },
  { value: 'activity', label: 'Activity' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'tasks', label: 'Tasks' },
  { value: 'files', label: 'Files' },
  { value: 'members', label: 'Members' },
  { value: 'billing', label: 'Billing' },
  { value: 'automation', label: 'Automation' },
  { value: 'integrations', label: 'Integrations' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'permissions', label: 'Permissions' },
  { value: 'audit', label: 'Audit Log' },
  { value: 'exports', label: 'Exports' },
  { value: 'disabled', label: 'Disabled', disabled: true },
]

registerDemo({
  id: 'tot-tabs',
  title: 'Tabs',
  render: (container, { logEvent }) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Attribute items</div>
        <div class="demo-scroll-host">
          <tot-tabs items='[{
            "value":"controls",
            "label":"Controls"
          },{
            "value":"media",
            "label":"Media"
          },{
            "value":"data",
            "label":"Data"
          },{
            "value":"docs",
            "label":"Docs"
          }]' value="media"></tot-tabs>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Sizes</div>
        <div class="stack">
          <div class="demo-scroll-host"><tot-tabs size="small" items="Overview,Activity,Files" value="Activity"></tot-tabs></div>
          <div class="demo-scroll-host"><tot-tabs size="medium" items="Overview,Activity,Files" value="Activity"></tot-tabs></div>
          <div class="demo-scroll-host"><tot-tabs size="large" items="Overview,Activity,Files" value="Activity"></tot-tabs></div>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">String items attribute</div>
        <div class="demo-scroll-host">
          <tot-tabs items="alpha,beta,gamma" value="beta"></tot-tabs>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Many items stay inside the demo and scroll horizontally</div>
        <div class="demo-scroll-host">
          <tot-tabs id="manyItems"></tot-tabs>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Sticky start/end items</div>
        <div class="demo-scroll-host">
          <tot-tabs id="stickyItems"></tot-tabs>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Dynamic items property</div>
        <div class="demo-scroll-host">
          <tot-tabs id="dynamicTabs"></tot-tabs>
        </div>
        <div class="row">
          <button class="demo-native-button" type="button" data-action="initial">Set initial items</button>
          <button class="demo-native-button" type="button" data-action="many">Set many items</button>
          <button class="demo-native-button" type="button" data-action="select-files">Select Files</button>
          <button class="demo-native-button" type="button" data-action="toggle-disabled">Toggle disabled</button>
        </div>
      </div>
    `

    const tabComponents = row.querySelectorAll('tot-tabs')
    for (let i = 0; i < tabComponents.length; i++) {
      tabComponents[i].addEventListener('change', (event) => {
        logEvent(tabComponents[i], 'change', event.detail)
      })
    }

    const manyItemsElement = row.querySelector('#manyItems')
    manyItemsElement.items = manyItems
    manyItemsElement.value = 'activity'

    const stickyItemsElement = row.querySelector('#stickyItems')
    stickyItemsElement.items = stickyItems
    stickyItemsElement.value = 'activity'

    const dynamicTabs = row.querySelector('#dynamicTabs')
    dynamicTabs.items = initialItems
    dynamicTabs.value = 'media'

    row.addEventListener('click', (event) => {
      const action = event.target?.dataset?.action
      if (!action) {
        return
      }

      if (action === 'initial') {
        dynamicTabs.items = initialItems
        dynamicTabs.value = 'controls'
        logEvent(dynamicTabs, 'items-update', { mode: 'initial', count: initialItems.length })
      }

      if (action === 'many') {
        dynamicTabs.items = manyItems
        dynamicTabs.value = 'activity'
        logEvent(dynamicTabs, 'items-update', { mode: 'many', count: manyItems.length })
      }

      if (action === 'select-files') {
        dynamicTabs.items = manyItems
        dynamicTabs.value = 'files'
        logEvent(dynamicTabs, 'value-update', { value: dynamicTabs.value })
      }

      if (action === 'toggle-disabled') {
        dynamicTabs.disabled = !dynamicTabs.disabled
        logEvent(dynamicTabs, 'disabled-toggle', { disabled: dynamicTabs.disabled })
      }
    })

    container.appendChild(row)
  },
})
