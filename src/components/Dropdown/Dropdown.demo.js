import { registerDemo } from '../demoCommon.js'

const actionItems = [
  { type: 'label', label: 'Project' },
  { value: 'new', label: 'New project' },
  { value: 'open', label: 'Open…' },
  { type: 'divider' },
  { value: 'archive', label: 'Archive', checked: true },
  { value: 'sync', label: 'Syncing', loading: true },
  { value: 'delete', label: 'Delete', disabled: true },
]

const nestedItems = [
  { value: 'profile', label: 'Profile' },
  { value: 'billing', label: 'Billing' },
  { type: 'divider' },
  {
    value: 'theme',
    label: 'Theme',
    items: [
      { value: 'light', label: 'Light', checked: true },
      { value: 'dark', label: 'Dark' },
      { value: 'system', label: 'System' },
    ],
  },
]

registerDemo({
  id: 'tot-dropdown',
  title: 'Dropdown',
  render: (container, { logEvent }) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Configured by label and menuItems property</div>
        <div class="row">
          <tot-dropdown id="configuredDropdown" label="Actions"></tot-dropdown>
          <tot-dropdown id="nestedDropdown" label="Account" hoist></tot-dropdown>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Default slot content takes precedence over menuItems</div>
        <div class="row">
          <tot-dropdown id="slottedDropdown" label="Ignored label" menu-items='[{"value":"ignored","label":"Ignored JSON item"}]'>
            <tot-button slot="trigger" variant="primary" caret>Custom trigger</tot-button>
            <tot-menu>
              <tot-menu-label>Clipboard</tot-menu-label>
              <tot-menu-item value="cut">Cut</tot-menu-item>
              <tot-menu-item value="copy" checked>Copy</tot-menu-item>
              <tot-menu-item value="paste" disabled>Paste</tot-menu-item>
              <tot-divider></tot-divider>
              <tot-menu-item value="more">
                More actions
                <tot-menu slot="submenu">
                  <tot-menu-item value="duplicate">Duplicate</tot-menu-item>
                  <tot-menu-item value="archive">Archive</tot-menu-item>
                </tot-menu>
              </tot-menu-item>
            </tot-menu>
          </tot-dropdown>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Open and stayOpenOnSelect properties</div>
        <div class="row">
          <tot-dropdown id="persistentDropdown" label="Persistent" stay-open-on-select></tot-dropdown>
          <button class="demo-native-button" type="button" data-action="toggle-open">Toggle open</button>
          <button class="demo-native-button" type="button" data-action="swap-items">Swap items</button>
        </div>
      </div>
    `

    const configuredDropdown = row.querySelector('#configuredDropdown')
    const nestedDropdown = row.querySelector('#nestedDropdown')
    const persistentDropdown = row.querySelector('#persistentDropdown')

    configuredDropdown.menuItems = actionItems
    nestedDropdown.menuItems = nestedItems
    persistentDropdown.menuItems = [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium', checked: true },
      { value: 'large', label: 'Large' },
    ]

    const dropdowns = row.querySelectorAll('tot-dropdown')
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].addEventListener('select', (event) => {
        event.__totDemoLogged = true
        logEvent(dropdowns[i], 'select', {
          value: event.detail.value,
          label: event.detail.label,
          stayOpenOnSelect: dropdowns[i].stayOpenOnSelect,
          open: dropdowns[i].open,
        })
      })
    }

    row.addEventListener('click', (event) => {
      const action = event.target?.dataset?.action
      if (!action) {
        return
      }

      if (action === 'toggle-open') {
        persistentDropdown.open = !persistentDropdown.open
        logEvent(persistentDropdown, 'open-update', { open: persistentDropdown.open })
      }

      if (action === 'swap-items') {
        persistentDropdown.menuItems = [
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center', checked: true },
          { value: 'right', label: 'Right' },
        ]
        logEvent(persistentDropdown, 'menu-items-update', { count: persistentDropdown.menuItems.length })
      }
    })

    container.appendChild(row)
  },
})
