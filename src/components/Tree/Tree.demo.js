import { registerDemo } from '../demoCommon.js'

const treeItems = [
  {
    value: 'documents',
    label: 'Documents',
    icon: '📁',
    expanded: true,
    items: [
      {
        value: 'photos',
        label: 'Photos',
        icon: '📁',
        expanded: true,
        items: [
          { value: 'birds', label: 'birds.jpg', icon: '🖼️' },
          { value: 'kitten', label: 'kitten.jpg', icon: '🖼️' },
          { value: 'puppy', label: 'puppy.jpg', icon: '🖼️' },
        ],
      },
      {
        value: 'writing',
        label: 'Writing',
        icon: '📁',
        items: [
          { value: 'draft', label: 'draft.txt', icon: '📄' },
          { value: 'final', label: 'final.pdf', icon: '📄' },
          { value: 'sales', label: 'sales.xls', icon: '📊' },
        ],
      },
    ],
  },
  {
    value: 'downloads',
    label: 'Downloads',
    icon: '📁',
    items: [
      { value: 'archive', label: 'archive.zip', icon: '📦' },
      { value: 'installer', label: 'installer.pkg', icon: '📦', disabled: true },
    ],
  },
  {
    value: 'notes',
    label: 'Notes',
    icon: '📄',
  },
]


const virtualTreeItems = []
for (let i = 1; i <= 80; i++) {
  const children = []
  for (let j = 1; j <= 8; j++) {
    children.push({
      value: `virtual-${i}-${j}`,
      label: `Item ${i}.${j}`,
      icon: '📄',
    })
  }

  virtualTreeItems.push({
    value: `virtual-${i}`,
    label: `Folder ${i}`,
    icon: '📁',
    expanded: i <= 4,
    items: children,
  })
}

registerDemo({
  id: 'tot-tree',
  title: 'Tree',
  render: (container, { logEvent }) => {
    const row = document.createElement('div')
    row.className = 'stack'
    row.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Configured from one nested JSON array</div>
        <tot-tree id="jsonTree" indent-guides style="max-width: 280px;"></tot-tree>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Multiple selection</div>
        <tot-tree id="multipleTree" selection="multiple" style="max-width: 280px;"></tot-tree>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Virtual scroll from JSON</div>
        <tot-tree id="virtualTree" virtual item-height="24" style="max-width: 280px; --tot-tree-virtual-max-height: 190px;"></tot-tree>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Slotted items</div>
        <tot-tree id="slottedTree" selection="leaf" style="max-width: 280px;">
          <tot-tree-item value="plants" expanded>
            Plants
            <tot-tree-item value="trees" expanded>
              Trees
              <tot-tree-item value="birch">Birch</tot-tree-item>
              <tot-tree-item value="maple">Maple</tot-tree-item>
              <tot-tree-item value="oak">Oak</tot-tree-item>
            </tot-tree-item>
            <tot-tree-item value="flowers">Flowers</tot-tree-item>
          </tot-tree-item>
          <tot-tree-item value="animals">
            Animals
            <tot-tree-item value="cat">Cat</tot-tree-item>
            <tot-tree-item value="dog">Dog</tot-tree-item>
          </tot-tree-item>
        </tot-tree>
      </div>
    `

    const jsonTree = row.querySelector('#jsonTree')
    const multipleTree = row.querySelector('#multipleTree')
    const virtualTree = row.querySelector('#virtualTree')
    jsonTree.items = treeItems
    jsonTree.selectedValues = ['kitten']
    multipleTree.items = treeItems
    multipleTree.selectedValues = ['birds', 'notes']
    virtualTree.items = virtualTreeItems
    virtualTree.selectedValues = ['virtual-2-3']

    const trees = row.querySelectorAll('tot-tree')
    for (let i = 0; i < trees.length; i++) {
      trees[i].addEventListener('select', (event) => {
        logEvent(trees[i], 'select', {
          value: event.detail.value,
          label: event.detail.label,
          selected: event.detail.selected,
          selectedValues: event.detail.selectedValues,
        })
      })

      trees[i].addEventListener('change', (event) => {
        logEvent(trees[i], 'change', {
          selectedValues: event.detail.selectedValues,
        })
      })

      trees[i].addEventListener('expand', (event) => {
        logEvent(trees[i], 'expand', {
          value: event.detail.value,
          label: event.detail.label,
        })
      })

      trees[i].addEventListener('collapse', (event) => {
        logEvent(trees[i], 'collapse', {
          value: event.detail.value,
          label: event.detail.label,
        })
      })
    }

    container.appendChild(row)
  },
})
