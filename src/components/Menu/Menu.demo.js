import { registerDemo } from '../demoCommon.js'

const configuredItems = [
  { type: 'label', label: 'Edit' },
  { type: 'item', value: 'undo', label: 'Undo', suffix: '⌘Z' },
  { type: 'item', value: 'redo', label: 'Redo', suffix: '⇧⌘Z' },
  { type: 'divider' },
  { type: 'item', value: 'cut', label: 'Cut', suffix: '✂️' },
  { type: 'item', value: 'copy', label: 'Copy', suffix: '✓' },
  { type: 'item', value: 'paste', label: 'Paste', disabled: true },
  { type: 'item', value: 'sync', label: 'Syncing', suffix: '⏳', disabled: true },
  { type: 'divider' },
  { type: 'label', label: 'Search' },
  {
    type: 'item',
    value: 'find',
    label: 'Find',
    items: [
      { type: 'item', value: 'find-current', label: 'Find…' },
      { type: 'item', value: 'find-next', label: 'Find next' },
      { type: 'item', value: 'find-previous', label: 'Find previous' },
    ],
  },
  {
    type: 'item',
    value: 'transform',
    label: 'Transformations',
    items: [
      { type: 'item', value: 'uppercase', label: 'Make uppercase' },
      { type: 'item', value: 'lowercase', label: 'Make lowercase' },
      { type: 'item', value: 'capitalize', label: 'Capitalize' },
    ],
  },
]

const compactItems = [
  { type: 'item', value: 'new', label: 'New file' },
  { type: 'item', value: 'open', label: 'Open…' },
  { type: 'divider' },
  { type: 'item', value: 'save', label: 'Save', suffix: '⌘S' },
]

registerDemo({
  id: 'tot-menu',
  title: 'Menu',
  render: (container, { logEvent }) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Configured from one canonical nested array</div>
        <tot-menu id="configuredMenu" style="max-width: 240px;"></tot-menu>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Slotted items with suffix text and an icon</div>
        <tot-menu id="slottedMenu" style="max-width: 240px;">
          <tot-menu-label>Clipboard</tot-menu-label>
          <tot-menu-item value="cut">
            Cut
            <svg slot="suffix" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5.2 6.2 2.5 3.5M5.2 9.8l-2.7 2.7M6.1 7.1l6.4-4.6M6.1 8.9l6.4 4.6" fill="none" stroke="currentColor" stroke-linecap="round"></path>
              <circle cx="4" cy="4" r="2" fill="none" stroke="currentColor"></circle>
              <circle cx="4" cy="12" r="2" fill="none" stroke="currentColor"></circle>
            </svg>
          </tot-menu-item>
          <tot-menu-item value="copy" suffix="✓">Copy</tot-menu-item>
          <tot-menu-item value="paste" disabled>Paste</tot-menu-item>
          <tot-divider></tot-divider>
          <tot-menu-item value="more">
            More actions
            <tot-menu slot="submenu">
              <tot-menu-item value="duplicate" suffix="⌘D">Duplicate</tot-menu-item>
              <tot-menu-item value="archive">Archive</tot-menu-item>
              <tot-menu-item value="delete" disabled>Delete</tot-menu-item>
            </tot-menu>
          </tot-menu-item>
        </tot-menu>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Dense mode</div>
        <tot-menu id="denseMenu" dense style="max-width: 240px;"></tot-menu>
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
    const denseMenu = row.querySelector('#denseMenu')
    const dynamicMenu = row.querySelector('#dynamicMenu')
    configuredMenu.items = configuredItems
    denseMenu.items = compactItems
    dynamicMenu.items = compactItems

    const menus = row.querySelectorAll('tot-menu')
    for (let i = 0; i < menus.length; i++) {
      menus[i].addEventListener('select', (event) => {
        logEvent(menus[i], 'select', {
          value: event.detail.value,
          label: event.detail.label,
          suffix: event.detail.item.suffix,
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
