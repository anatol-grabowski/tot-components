import { registerDemo } from '../demoCommon.js'

const initialItems = [
  { value: 'controls', label: 'Controls' },
  { value: 'media', label: 'Media' },
  { value: 'data', label: 'Data' },
  { value: 'docs', label: 'Docs' },
]

const expandedItems = [
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
        <div class="demo-label">Attribute items</div>
        <div class="demo-scroll-host">
          <tot-navbar items='[{
            "value":"home",
            "label":"Home"
          },{
            "value":"media",
            "label":"Media"
          },{
            "value":"data",
            "label":"Data"
          }]' value="media">
            <span slot="prefix">Demo app</span>
            <tot-theme-selector slot="suffix" size="small" variant="plain"></tot-theme-selector>
            <tot-avatar slot="suffix" initials="AG" label="Account" style="--size: 1.75rem;"></tot-avatar>
          </tot-navbar>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Sizes</div>
        <div class="stack">
          <div class="demo-scroll-host">
            <tot-navbar size="small" items="home,docs" value="home">
              <span slot="prefix">Small</span>
              <tot-theme-selector slot="suffix" size="small" variant="plain"></tot-theme-selector>
            </tot-navbar>
          </div>
          <div class="demo-scroll-host">
            <tot-navbar size="medium" items="home,docs" value="home">
              <span slot="prefix">Medium</span>
              <tot-theme-selector slot="suffix" size="medium" variant="plain"></tot-theme-selector>
            </tot-navbar>
          </div>
          <div class="demo-scroll-host">
            <tot-navbar size="large" items="home,docs" value="home">
              <span slot="prefix">Large</span>
              <tot-theme-selector slot="suffix" size="large" variant="plain"></tot-theme-selector>
            </tot-navbar>
          </div>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Many items stay inside the demo and scroll horizontally</div>
        <div class="demo-scroll-host">
          <tot-navbar id="manyNavbar">
            <span slot="prefix">Tools</span>
            <tot-button slot="suffix" size="small" label="Save"></tot-button>
          </tot-navbar>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Dynamic items property</div>
        <div class="demo-scroll-host">
          <tot-navbar id="dynamicNavbar"></tot-navbar>
        </div>
        <div class="row">
          <button class="demo-native-button" type="button" data-action="initial">Set initial items</button>
          <button class="demo-native-button" type="button" data-action="expanded">Set many items</button>
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
    manyNavbar.items = expandedItems
    manyNavbar.value = 'reports'

    const dynamicNavbar = row.querySelector('#dynamicNavbar')
    dynamicNavbar.items = initialItems
    dynamicNavbar.value = 'media'

    row.addEventListener('click', (event) => {
      const action = event.target?.dataset?.action
      if (!action) {
        return
      }

      if (action === 'initial') {
        dynamicNavbar.items = initialItems
        dynamicNavbar.value = 'controls'
        logEvent(dynamicNavbar, 'items-update', { mode: 'initial', count: initialItems.length })
      }

      if (action === 'expanded') {
        dynamicNavbar.items = expandedItems
        dynamicNavbar.value = 'settings'
        logEvent(dynamicNavbar, 'items-update', { mode: 'many', count: expandedItems.length })
      }

      if (action === 'reports') {
        dynamicNavbar.items = expandedItems
        dynamicNavbar.value = 'reports'
        logEvent(dynamicNavbar, 'items-update', { mode: 'reports', selected: dynamicNavbar.value })
      }

      if (action === 'toggle-disabled') {
        dynamicNavbar.disabled = !dynamicNavbar.disabled
        logEvent(dynamicNavbar, 'disabled-toggle', { disabled: dynamicNavbar.disabled })
      }
    })

    container.appendChild(row)
  },
})
