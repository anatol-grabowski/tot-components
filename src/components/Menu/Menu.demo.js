import { registerDemo } from '../demoCommon.js'

const configuredItems = [
  { type: 'label', label: 'Edit' },
  { value: 'undo', label: 'Undo' },
  { value: 'redo', label: 'Redo' },
  { type: 'divider' },
  { value: 'cut', label: 'Cut' },
  { value: 'copy', label: 'Copy', checked: true },
  { value: 'paste', label: 'Paste', disabled: true },
  { value: 'sync', label: 'Syncing', loading: true },
  { type: 'divider' },
  { type: 'label', label: 'Search' },
  {
    value: 'find',
    label: 'Find',
    items: [
      { value: 'find-current', label: 'Find…' },
      { value: 'find-next', label: 'Find next' },
      { value: 'find-previous', label: 'Find previous' },
    ],
  },
  {
    value: 'transform',
    label: 'Transformations',
    children: [
      { value: 'uppercase', label: 'Make uppercase' },
      { value: 'lowercase', label: 'Make lowercase' },
      { value: 'capitalize', label: 'Capitalize' },
    ],
  },
]

const compactItems = [
  { value: 'new', label: 'New file' },
  { value: 'open', label: 'Open…' },
  { type: 'divider' },
  { value: 'save', label: 'Save', checked: true },
]

registerDemo({
  id: 'tot-menu',
  title: 'Menu',
  render: (container, { logEvent }) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Configured from one nested JSON array</div>
        <tot-menu id="configuredMenu" style="max-width: 240px;"></tot-menu>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Default slot content takes precedence over JSON</div>
        <tot-menu id="slottedMenu" items='[{"value":"json","label":"Ignored JSON item"}]' style="max-width: 240px;">
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
              <tot-menu-item value="delete" disabled>Delete</tot-menu-item>
            </tot-menu>
          </tot-menu-item>
        </tot-menu>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Dynamic items property</div>
        <tot-menu id="dynamicMenu" style="max-width: 240px;"></tot-menu>
        <div class="row">
          <button class="demo-native-button" type="button" data-action="full">Set full menu</button>
          <button class="demo-native-button" type="button" data-action="compact">Set compact menu</button>
        </div>
      </div>
    `

    const configuredMenu = row.querySelector('#configuredMenu')
    const dynamicMenu = row.querySelector('#dynamicMenu')
    configuredMenu.items = configuredItems
    dynamicMenu.items = compactItems

    const menus = row.querySelectorAll('tot-menu')
    for (let i = 0; i < menus.length; i++) {
      menus[i].addEventListener('select', (event) => {
        logEvent(menus[i], 'select', {
          value: event.detail.value,
          label: event.detail.label,
          checked: event.detail.checked,
        })
      })
    }

    row.addEventListener('click', (event) => {
      const action = event.target?.dataset?.action
      if (!action) {
        return
      }

      if (action === 'full') {
        dynamicMenu.items = configuredItems
        logEvent(dynamicMenu, 'items-update', { mode: 'full', count: configuredItems.length })
      }

      if (action === 'compact') {
        dynamicMenu.items = compactItems
        logEvent(dynamicMenu, 'items-update', { mode: 'compact', count: compactItems.length })
      }
    })

    container.appendChild(row)
  },
})
