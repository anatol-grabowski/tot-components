import { registerDemo } from '../demoCommon.js'

const actionItems = [
  { type: 'label', label: 'Project' },
  { type: 'item', value: 'new', label: 'New project', suffix: '＋' },
  { type: 'item', value: 'open', label: 'Open…', suffix: '⌘O' },
  { type: 'divider' },
  { type: 'item', value: 'archive', label: 'Archive', suffix: '✓' },
  { type: 'item', value: 'sync', label: 'Syncing', suffix: '⏳', disabled: true },
  { type: 'item', value: 'delete', label: 'Delete', disabled: true },
]

const nestedItems = [
  { type: 'item', value: 'profile', label: 'Profile' },
  { type: 'item', value: 'billing', label: 'Billing' },
  { type: 'divider' },
  {
    type: 'item',
    value: 'theme',
    label: 'Theme',
    items: [
      { type: 'item', value: 'light', label: 'Light', suffix: '✓' },
      { type: 'item', value: 'dark', label: 'Dark' },
      { type: 'item', value: 'system', label: 'System' },
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
        <div class="demo-label">Configured by label and canonical menuItems</div>
        <div class="row">
          <tot-dropdown id="configuredDropdown" label="Actions"></tot-dropdown>
          <tot-dropdown id="nestedDropdown" label="Account" hoist></tot-dropdown>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Slotted button and menu take precedence</div>
        <div class="row">
          <tot-dropdown id="slottedDropdown" label="Ignored label" menu-items='[{"type":"item","value":"ignored","label":"Ignored JSON item"}]'>
            <tot-button slot="trigger" variant="primary" caret>Custom trigger</tot-button>
            <tot-menu>
              <tot-menu-label>Clipboard</tot-menu-label>
              <tot-menu-item value="cut" suffix="✂️">Cut</tot-menu-item>
              <tot-menu-item value="copy" suffix="✓">Copy</tot-menu-item>
              <tot-menu-item value="paste" disabled>Paste</tot-menu-item>
              <tot-divider></tot-divider>
              <tot-menu-item value="more">
                More actions
                <tot-menu slot="submenu">
                  <tot-menu-item value="duplicate" suffix="⌘D">Duplicate</tot-menu-item>
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
      { type: 'item', value: 'small', label: 'Small' },
      { type: 'item', value: 'medium', label: 'Medium', suffix: '✓' },
      { type: 'item', value: 'large', label: 'Large' },
    ]

    const dropdowns = row.querySelectorAll('tot-dropdown')
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].addEventListener('select', (event) => {
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
          { type: 'item', value: 'left', label: 'Left' },
          { type: 'item', value: 'center', label: 'Center', suffix: '✓' },
          { type: 'item', value: 'right', label: 'Right' },
        ]
        logEvent(persistentDropdown, 'menu-items-update', { count: persistentDropdown.menuItems.length })
      }
    })

    container.appendChild(row)
  },
})
