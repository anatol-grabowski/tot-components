import { registerDemo } from '../demoCommon.js'

const initialTabs = [
  { value: 'controls', label: 'Controls' },
  { value: 'media', label: 'Media' },
  { value: 'data', label: 'Data' },
  { value: 'docs', label: 'Docs' },
]

const expandedTabs = [
  { value: 'controls', label: 'Controls' },
  { value: 'media', label: 'Media' },
  { value: 'data', label: 'Data' },
  { value: 'docs', label: 'Docs' },
  { value: 'settings', label: 'Settings' },
  { value: 'account', label: 'Account' },
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
          <tot-button slot="right" size="small" label="Config">⚙</tot-button>
        </tot-navbar>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Dynamic tabs property</div>
        <tot-navbar id="dynamicNavbar"></tot-navbar>
        <div class="row">
          <button class="demo-native-button" type="button" data-action="initial">Set initial tabs</button>
          <button class="demo-native-button" type="button" data-action="expanded">Set expanded tabs</button>
          <button class="demo-native-button" type="button" data-action="reports">Select Reports</button>
          <button class="demo-native-button" type="button" data-action="toggle-disabled">Toggle disabled</button>
        </div>
      </div>
    `

    const navbars = row.querySelectorAll('tot-navbar')
    for (let i = 0; i < navbars.length; i++) {
      navbars[i].addEventListener('change', (event) => {
        event.__totDemoLogged = true
        logEvent(navbars[i], 'change', event.detail)
      })
    }

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
        logEvent(dynamicNavbar, 'tabs-update', { mode: 'expanded', count: expandedTabs.length })
      }

      if (action === 'reports') {
        dynamicNavbar.tabs = [
          { value: 'overview', label: 'Overview' },
          { value: 'reports', label: 'Reports' },
          { value: 'exports', label: 'Exports' },
        ]
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
