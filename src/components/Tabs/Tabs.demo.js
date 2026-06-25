import { registerDemo } from '../demoCommon.js'

const initialTabs = [
  { value: 'controls', label: 'Controls' },
  { value: 'media', label: 'Media' },
  { value: 'data', label: 'Data' },
  { value: 'docs', label: 'Docs' },
]

const manyTabs = [
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
        <div class="demo-label">Attribute tabs</div>
        <div class="demo-scroll-host">
          <tot-tabs tabs='[{
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
        <div class="demo-label">Legacy options attribute</div>
        <div class="demo-scroll-host">
          <tot-tabs options="alpha,beta,gamma" value="beta"></tot-tabs>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Many options stay inside the demo and scroll horizontally</div>
        <div class="demo-scroll-host">
          <tot-tabs id="manyTabs"></tot-tabs>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Dynamic tabs property</div>
        <div class="demo-scroll-host">
          <tot-tabs id="dynamicTabs"></tot-tabs>
        </div>
        <div class="row">
          <button class="demo-native-button" type="button" data-action="initial">Set initial tabs</button>
          <button class="demo-native-button" type="button" data-action="many">Set many tabs</button>
          <button class="demo-native-button" type="button" data-action="select-files">Select Files</button>
          <button class="demo-native-button" type="button" data-action="toggle-disabled">Toggle disabled</button>
        </div>
      </div>
    `

    const tabsElements = row.querySelectorAll('tot-tabs')
    for (let i = 0; i < tabsElements.length; i++) {
      tabsElements[i].addEventListener('change', (event) => {
        logEvent(tabsElements[i], 'change', event.detail)
      })
    }

    const manyTabsElement = row.querySelector('#manyTabs')
    manyTabsElement.tabs = manyTabs
    manyTabsElement.value = 'activity'

    const dynamicTabs = row.querySelector('#dynamicTabs')
    dynamicTabs.tabs = initialTabs
    dynamicTabs.value = 'media'

    row.addEventListener('click', (event) => {
      const action = event.target?.dataset?.action
      if (!action) {
        return
      }

      if (action === 'initial') {
        dynamicTabs.tabs = initialTabs
        dynamicTabs.value = 'controls'
        logEvent(dynamicTabs, 'tabs-update', { mode: 'initial', count: initialTabs.length })
      }

      if (action === 'many') {
        dynamicTabs.tabs = manyTabs
        dynamicTabs.value = 'activity'
        logEvent(dynamicTabs, 'tabs-update', { mode: 'many', count: manyTabs.length })
      }

      if (action === 'select-files') {
        dynamicTabs.tabs = manyTabs
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
