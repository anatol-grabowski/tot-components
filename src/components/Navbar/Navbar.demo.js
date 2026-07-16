import { registerDemo } from '../demoCommon.js'

const initialTabs = [
  { value: 'controls', label: 'Controls' },
  { value: 'media', label: 'Media' },
  { value: 'data', label: 'Data' },
  { value: 'docs', label: 'Docs' },
]

const expandedTabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'controls', label: 'Controls' },
  { value: 'media', label: 'Media' },
  { value: 'data', label: 'Data' },
  { value: 'docs', label: 'Docs' },
  { value: 'settings', label: 'Settings' },
  { value: 'account', label: 'Account' },
  { value: 'reports', label: 'Reports' },
  { value: 'exports', label: 'Exports' },
  { value: 'billing', label: 'Billing' },
  { value: 'members', label: 'Members' },
  { value: 'audit', label: 'Audit Log' },
  { value: 'integrations', label: 'Integrations' },
  { value: 'disabled', label: 'Disabled', disabled: true },
]

registerDemo({
  id: 'tot-navbar',
  title: 'Navbar',
  render: (container, { logEvent }) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Attribute tabs</div>
        <div class="demo-scroll-host">
          <tot-navbar tabs='[{
            "value":"home",
            "label":"Home"
          },{
            "value":"media",
            "label":"Media"
          },{
            "value":"data",
            "label":"Data"
          }]' value="media">
            <span slot="left">Demo app</span>
            <tot-theme-selector slot="right" size="small"></tot-theme-selector>
            <tot-avatar slot="right" initials="AG" label="Account" style="--size: 1.75rem;"></tot-avatar>
          </tot-navbar>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Many options stay inside the demo and scroll horizontally</div>
        <div class="demo-scroll-host">
          <tot-navbar id="manyNavbar">
            <span slot="left">Tools</span>
            <tot-button slot="right" size="small" label="Save"></tot-button>
          </tot-navbar>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Dynamic tabs property</div>
        <div class="demo-scroll-host">
          <tot-navbar id="dynamicNavbar"></tot-navbar>
        </div>
        <div class="row">
          <button class="demo-native-button" type="button" data-action="initial">Set initial tabs</button>
          <button class="demo-native-button" type="button" data-action="expanded">Set many tabs</button>
          <button class="demo-native-button" type="button" data-action="reports">Select Reports</button>
          <button class="demo-native-button" type="button" data-action="toggle-disabled">Toggle disabled</button>
        </div>
      </div>
    `

    const navbars = row.querySelectorAll('tot-navbar')
    for (let i = 0; i < navbars.length; i++) {
      navbars[i].addEventListener('change', (event) => {
        logEvent(navbars[i], 'change', event.detail)
      })
    }

    const manyNavbar = row.querySelector('#manyNavbar')
    manyNavbar.tabs = expandedTabs
    manyNavbar.value = 'reports'

    const dynamicNavbar = row.querySelector('#dynamicNavbar')
    dynamicNavbar.tabs = initialTabs
    dynamicNavbar.value = 'media'

    row.addEventListener('click', (event) => {
      const action = event.target?.dataset?.action
      if (!action) {
        return
      }

      if (action === 'initial') {
        dynamicNavbar.tabs = initialTabs
        dynamicNavbar.value = 'controls'
        logEvent(dynamicNavbar, 'tabs-update', { mode: 'initial', count: initialTabs.length })
      }

      if (action === 'expanded') {
        dynamicNavbar.tabs = expandedTabs
        dynamicNavbar.value = 'settings'
        logEvent(dynamicNavbar, 'tabs-update', { mode: 'many', count: expandedTabs.length })
      }

      if (action === 'reports') {
        dynamicNavbar.tabs = expandedTabs
        dynamicNavbar.value = 'reports'
        logEvent(dynamicNavbar, 'tabs-update', { mode: 'reports', selected: dynamicNavbar.value })
      }

      if (action === 'toggle-disabled') {
        dynamicNavbar.disabled = !dynamicNavbar.disabled
        logEvent(dynamicNavbar, 'disabled-toggle', { disabled: dynamicNavbar.disabled })
      }
    })

    container.appendChild(row)
  },
})
