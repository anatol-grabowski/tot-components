import { registerDemo } from '../demoCommon.js'

const treeItems = [
  {
    value: 'documents',
    label: 'Documents',
    prefix: '📁',
    expanded: true,
    suffix: '6',
    items: [
      {
        value: 'photos',
        label: 'Photos',
        prefix: '📁',
        expanded: true,
        items: [
          { value: 'birds', label: 'birds.jpg', prefix: '🖼️' },
          { value: 'kitten', label: 'kitten.jpg', prefix: '🖼️' },
          { value: 'puppy', label: 'puppy.jpg', prefix: '🖼️' },
        ],
      },
      {
        value: 'writing',
        label: 'Writing',
        prefix: '📁',
        items: [
          { value: 'draft', label: 'draft.txt', prefix: '📄' },
          { value: 'final', label: 'final.pdf', prefix: '📄' },
          { value: 'sales', label: 'sales.xls', prefix: '📊' },
        ],
      },
    ],
  },
  {
    value: 'downloads',
    label: 'Downloads',
    prefix: '📁',
    suffix: '2',
    items: [
      { value: 'archive', label: 'archive.zip', prefix: '📦' },
      { value: 'installer', label: 'installer.pkg', prefix: '📦', disabled: true },
    ],
  },
  {
    value: 'notes',
    label: 'Notes',
    prefix: '📄',
  },
]


const largeTreeItems = []
for (let i = 1; i <= 80; i++) {
  const children = []
  for (let j = 1; j <= 8; j++) {
    children.push({
      value: `large-${i}-${j}`,
      label: `Item ${i}.${j}`,
      prefix: '📄',
    })
  }

  largeTreeItems.push({
    value: `large-${i}`,
    label: `Folder ${i}`,
    prefix: '📁',
    expanded: i <= 4,
    suffix: String(children.length),
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
        <tot-tree id="multipleTree" selection="any" multiple style="max-width: 280px;"></tot-tree>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Large JSON tree with automatic windowing</div>
        <tot-tree id="largeTree" item-height="24" style="max-width: 280px; --tot-tree-max-height: 190px;"></tot-tree>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Slotted items</div>
        <tot-tree id="slottedTree" selection="leaf" style="max-width: 280px;">
          <tot-tree-item value="plants" prefix="🌿" suffix="2" expanded>
            Plants
            <tot-tree-item value="trees" prefix="🌳" suffix="3" expanded>
              Trees
              <tot-tree-item value="birch">Birch</tot-tree-item>
              <tot-tree-item value="maple">Maple</tot-tree-item>
              <tot-tree-item value="oak">Oak</tot-tree-item>
            </tot-tree-item>
            <tot-tree-item value="flowers">Flowers</tot-tree-item>
          </tot-tree-item>
          <tot-tree-item value="animals" suffix="2">
            <span slot="prefix">🐾</span>
            Animals
            <tot-tree-item value="cat">Cat</tot-tree-item>
            <tot-tree-item value="dog">Dog</tot-tree-item>
          </tot-tree-item>
        </tot-tree>
      </div>
    `

    const jsonTree = row.querySelector('#jsonTree')
    const multipleTree = row.querySelector('#multipleTree')
    const largeTree = row.querySelector('#largeTree')
    jsonTree.items = treeItems
    jsonTree.values = ['kitten']
    multipleTree.items = treeItems
    multipleTree.values = ['birds', 'notes']
    largeTree.items = largeTreeItems
    largeTree.values = ['large-2-3']

    const trees = row.querySelectorAll('tot-tree')
    for (let i = 0; i < trees.length; i++) {
      trees[i].addEventListener('change', (event) => {
        logEvent(trees[i], 'change', event.detail)
      })

      trees[i].addEventListener('toggle', (event) => {
        logEvent(trees[i], 'toggle', event.detail)
      })
    }

    container.appendChild(row)
  },
})
