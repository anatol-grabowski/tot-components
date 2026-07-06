const treeStyle = `
  :host {
    display: block;
    max-width: 100%;
    min-width: 0;
  }

  :host([hidden]) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .tree {
    --tree-indent: var(--tot-tree-indent, 1rem);
    --tree-indent-guide-width: 0;
    --tree-row-height: var(--tot-tree-row-height, 1.55rem);

    color: var(--tot-input-color, #1e293b);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-small, .8125rem);
    line-height: var(--tot-line-height-dense, 1.35);
    max-width: 100%;
    min-width: 0;
    outline: none;
  }

  :host([indent-guides]) .tree,
  :host([guides]) .tree {
    --tree-indent-guide-width: var(--tot-tree-indent-guide-width, 1px);
  }

  .tree:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .tree--virtual {
    max-height: var(--tot-tree-virtual-max-height, 16rem);
    overflow: auto;
    position: relative;
    scrollbar-gutter: stable;
  }

  .tree__virtual-spacer {
    min-width: 100%;
    position: relative;
  }

  .tree__virtual-window {
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .tree-row {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: inherit;
    cursor: pointer;
    display: grid;
    font: inherit;
    gap: var(--tot-tree-item-gap, .25rem);
    grid-template-columns: 1rem auto minmax(0, 1fr);
    height: var(--tree-row-height);
    min-height: 0;
    min-width: 0;
    outline: none;
    padding: 0 var(--tot-tree-item-padding-inline, .25rem) 0 calc(var(--tot-tree-item-padding-inline, .25rem) + var(--tree-level, 0) * var(--tree-indent, 1rem));
    text-align: start;
    width: 100%;
  }

  .tree-row:hover:not(:disabled),
  .tree-row:focus-visible:not(:disabled) {
    background: var(--tot-tree-item-background-color-hover, var(--tot-color-neutral-100, #f1f5f9));
    color: var(--tot-input-color-hover, #0f172a);
  }

  .tree-row:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: calc(var(--tot-focus-ring-offset, 1px) * -1);
  }

  .tree-row--selected {
    background: var(--tot-tree-item-background-color-selected, var(--tot-color-primary-100, #e0f2fe));
    border-radius: 0;
    color: var(--tot-tree-item-color-selected, var(--tot-color-primary-800, #075985));
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .tree-row--selected:hover:not(:disabled),
  .tree-row--selected:focus-visible:not(:disabled) {
    background: var(--tot-tree-item-background-color-selected-hover, var(--tot-color-primary-200, #bae6fd));
    color: var(--tot-tree-item-color-selected-hover, var(--tot-color-primary-900, #0c4a6e));
  }

  .tree-row:disabled {
    color: var(--tot-input-color-disabled, var(--tot-color-neutral-500, #64748b));
    cursor: not-allowed;
    opacity: .65;
  }

  .tree-row__expand,
  .tree-row__icon {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    line-height: 1;
    min-width: 0;
  }

  .tree-row__expand {
    color: var(--tot-tree-expand-color, var(--tot-color-neutral-500, #64748b));
    font-size: .9em;
    height: 1rem;
    justify-self: center;
    transition: var(--tot-transition-fast, 150ms) transform;
    width: 1rem;
  }

  .tree-row--leaf .tree-row__expand {
    color: transparent;
    pointer-events: none;
  }

  .tree-row--expanded .tree-row__expand {
    transform: rotate(90deg);
  }

  .tree-row__icon {
    color: var(--tot-tree-icon-color, var(--tot-color-neutral-500, #64748b));
    font-size: .95em;
  }

  .tree-row:not(.tree-row--has-icon) .tree-row__icon {
    display: none;
  }

  .tree-row__label {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ::slotted(tot-tree-item) {
    display: block;
  }
`

const treeItemStyle = `
  :host {
    display: block;
    max-width: 100%;
    min-width: 0;
  }

  :host([hidden]) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .tree-item {
    color: var(--tot-input-color, #1e293b);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: inherit;
    line-height: inherit;
    max-width: 100%;
    min-width: 0;
  }

  .tree-item__row {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: inherit;
    cursor: pointer;
    display: grid;
    font: inherit;
    gap: var(--tot-tree-item-gap, .25rem);
    grid-template-columns: 1rem auto minmax(0, 1fr);
    min-height: var(--tot-tree-item-min-height, 1.55rem);
    min-width: 0;
    outline: none;
    padding: var(--tot-tree-item-padding-block, .125rem) var(--tot-tree-item-padding-inline, .25rem) var(--tot-tree-item-padding-block, .125rem) calc(var(--tot-tree-item-padding-inline, .25rem) + var(--tree-item-level, 0) * var(--tree-indent, 1rem));
    text-align: start;
    width: 100%;
  }

  .tree-item__row:hover:not(:disabled),
  .tree-item__row:focus-visible:not(:disabled) {
    background: var(--tot-tree-item-background-color-hover, var(--tot-color-neutral-100, #f1f5f9));
    color: var(--tot-input-color-hover, #0f172a);
  }

  .tree-item__row:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: calc(var(--tot-focus-ring-offset, 1px) * -1);
  }

  .tree-item--selected > .tree-item__row {
    background: var(--tot-tree-item-background-color-selected, var(--tot-color-primary-100, #e0f2fe));
    border-radius: 0;
    color: var(--tot-tree-item-color-selected, var(--tot-color-primary-800, #075985));
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .tree-item--selected > .tree-item__row:hover:not(:disabled),
  .tree-item--selected > .tree-item__row:focus-visible:not(:disabled) {
    background: var(--tot-tree-item-background-color-selected-hover, var(--tot-color-primary-200, #bae6fd));
    color: var(--tot-tree-item-color-selected-hover, var(--tot-color-primary-900, #0c4a6e));
  }

  .tree-item--disabled {
    color: var(--tot-input-color-disabled, var(--tot-color-neutral-500, #64748b));
  }

  .tree-item--disabled > .tree-item__row {
    cursor: not-allowed;
    opacity: .65;
  }

  .tree-item__expand,
  .tree-item__icon {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    line-height: 1;
    min-width: 0;
  }

  .tree-item__expand {
    color: var(--tot-tree-expand-color, var(--tot-color-neutral-500, #64748b));
    font-size: .9em;
    height: 1rem;
    justify-self: center;
    transition: var(--tot-transition-fast, 150ms) transform;
    width: 1rem;
  }

  .tree-item--leaf .tree-item__expand {
    color: transparent;
    pointer-events: none;
  }

  .tree-item--expanded .tree-item__expand {
    transform: rotate(90deg);
  }

  .tree-item__icon {
    color: var(--tot-tree-icon-color, var(--tot-color-neutral-500, #64748b));
    font-size: .95em;
  }

  .tree-item:not(.tree-item--has-icon) .tree-item__icon {
    display: none;
  }

  .tree-item__label {
    display: block;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tree-item__children {
    border-inline-start: 0;
    display: none;
    margin-inline-start: 0;
    max-width: 100%;
    min-width: 0;
    padding-inline-start: 0;
  }

  .tree-item--expanded > .tree-item__children {
    display: block;
  }

  ::slotted(tot-tree-item) {
    display: block;
  }
`

const selectionModes = ['single', 'multiple', 'leaf', 'none']

export class TotTree extends HTMLElement {
  static get observedAttributes() {
    return [
      'aria-label',
      'buffer',
      'guides',
      'indent-guides',
      'items',
      'item-height',
      'row-height',
      'selected',
      'selection',
      'virtual',
    ]
  }

  constructor() {
    super()
    this._items = null
    this._expandedValues = null
    this._selectedValues = null
    this._isUpdatingSelected = false
    this._typeToSelect = ''
    this._typeToSelectTimer = 0
    this._activeValue = ''
    this._handleRootClick = (event) => this.handleClick(event)
    this._handleRootKeyDown = (event) => this.handleKeyDown(event)
    this._handleRootFocusIn = (event) => this.handleFocusIn(event)
    this._handleSlotChange = () => this.handleSlotChange()
    this._handleVirtualScroll = () => this.updateVirtualRows()
  }

  get items() {
    if (this._items === null) {
      this._items = parseItems(this.getAttribute('items'))
    }
    return cloneItems(this._items)
  }

  set items(value) {
    this._items = parseItems(value)
    this._expandedValues = null
    this.render()
  }

  get itemHeight() {
    const value = Number(this.getAttribute('item-height') || this.getAttribute('row-height'))
    return Number.isFinite(value) && value > 0 ? value : 24
  }

  set itemHeight(value) {
    setNullableAttribute(this, 'item-height', value)
  }

  get selection() {
    return getSupportedValue(this.getAttribute('selection'), selectionModes, 'single')
  }

  set selection(value) {
    this.setAttribute('selection', getSupportedValue(value, selectionModes, 'single'))
  }

  get selected() {
    return this.selectedValues
  }

  set selected(value) {
    this.selectedValues = value
  }

  get selectedValues() {
    if (this._selectedValues !== null) {
      return this._selectedValues.slice()
    }

    if (this.hasAttribute('selected')) {
      return parseSelected(this.getAttribute('selected'))
    }

    if (this.isVirtual()) {
      return getSelectedValuesFromData(this.items)
    }

    return getSelectedValuesFromItems(this.getTreeItems())
  }

  set selectedValues(value) {
    const values = parseSelected(value)
    this._selectedValues = values
    this.applySelectedValues(values, true)
  }

  get selectedItems() {
    if (this.isVirtualRendered()) {
      const selected = new Set(this.selectedValues)
      const rows = this.getAllVirtualRows()
      const selectedItems = []
      for (let i = 0; i < rows.length; i++) {
        if (selected.has(rows[i].value)) {
          selectedItems.push(rows[i].item)
        }
      }
      return selectedItems
    }

    const items = this.getTreeItems()
    const selected = []
    for (let i = 0; i < items.length; i++) {
      if (items[i].selected) {
        selected.push(items[i])
      }
    }
    return selected
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    window.clearTimeout(this._typeToSelectTimer)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (name === 'items') {
      this._items = null
      this._expandedValues = null
      if (this.isConnected) {
        this.render()
      }
      return
    }

    if (name === 'selected') {
      if (this._isUpdatingSelected) {
        return
      }

      this._selectedValues = parseSelected(newValue)
      if (this.isConnected) {
        this.applySelectedValues(this._selectedValues, false)
      }
      return
    }

    if (name === 'selection') {
      if (this.isConnected) {
        this.applySelectionRules(true)
        this.updateTreeItems()
      }
      return
    }

    if (name === 'item-height' || name === 'row-height' || name === 'buffer') {
      if (this.isConnected && this.isVirtualRendered()) {
        this.updateVirtualRows()
      }
      return
    }

    if (this.isConnected) {
      this.render()
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const label = this.getAttribute('aria-label') || 'Tree'
    const hasDefaultSlotContent = this.hasDefaultSlotContent()
    const virtual = this.isVirtual() && !hasDefaultSlotContent
    const multiselectable = this.selection === 'multiple'
    const classes = ['tree']

    if (virtual) {
      classes.push('tree--virtual')
    }

    root.innerHTML = `<style>${treeStyle}</style>
      <div
        class="${escapeAttribute(classes.join(' '))}"
        part="base"
        role="tree"
        aria-label="${escapeAttribute(label)}"
        aria-multiselectable="${multiselectable ? 'true' : 'false'}"
      ></div>
    `

    const holder = root.querySelector('.tree')
    holder.addEventListener('click', this._handleRootClick)
    holder.addEventListener('keydown', this._handleRootKeyDown)
    holder.addEventListener('focusin', this._handleRootFocusIn)
    holder.addEventListener('expand', () => this.updateTreeItems())
    holder.addEventListener('collapse', () => this.updateTreeItems())

    if (virtual) {
      holder.addEventListener('scroll', this._handleVirtualScroll)
      holder.innerHTML = `
        <div class="tree__virtual-spacer" part="virtual-spacer">
          <div class="tree__virtual-window" part="virtual-window"></div>
        </div>
      `
      this.updateTreeItems()
      return
    }

    if (hasDefaultSlotContent) {
      const slot = document.createElement('slot')
      slot.addEventListener('slotchange', this._handleSlotChange)
      holder.append(slot)
    } else {
      this.renderItems(holder, this.items)
    }

    this.updateTreeItems()
  }

  renderItems(holder, items) {
    for (let i = 0; i < items.length; i++) {
      holder.append(this.createItemElement(items[i]))
    }
  }

  createItemElement(item) {
    const element = document.createElement('tot-tree-item')
    element.value = item.value

    if (item.expanded) {
      element.expanded = true
    }

    if (item.selected) {
      element.selected = true
    }

    if (item.disabled) {
      element.disabled = true
    }

    if (item.icon) {
      const icon = document.createElement('span')
      icon.slot = 'icon'
      icon.textContent = item.icon
      element.append(icon)
    }

    const label = document.createElement('span')
    label.slot = 'label'
    label.textContent = item.label
    element.append(label)

    for (let i = 0; i < item.items.length; i++) {
      element.append(this.createItemElement(item.items[i]))
    }

    return element
  }

  handleSlotChange() {
    this.updateTreeItems()
  }

  handleClick(event) {
    if (this.isVirtualRendered()) {
      this.handleVirtualClick(event)
      return
    }

    const item = getTreeItemFromEvent(event)
    if (!item || getOwningTreeFromEvent(event) !== this) {
      return
    }

    if (item.disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    const expandClicked = isExpandClick(event)
    if (expandClicked || (this.selection === 'leaf' && item.hasChildren)) {
      if (item.hasChildren) {
        item.setExpanded(!item.expanded, true)
        this.updateTreeItems()
      }
      event.preventDefault()
      return
    }

    if (this.isSelectable(item)) {
      this.selectItem(item, true)
      event.preventDefault()
    }
  }

  handleVirtualClick(event) {
    const target = getVirtualRowFromEvent(event)
    if (!target) {
      return
    }

    const row = this.getVirtualRowByValue(target.dataset.value)
    if (!row) {
      return
    }

    this._activeValue = row.value

    if (row.disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    const expandClicked = isVirtualExpandClick(event)
    if (expandClicked || (this.selection === 'leaf' && row.hasChildren)) {
      if (row.hasChildren) {
        this.setVirtualExpanded(row, !row.expanded, true)
      }
      event.preventDefault()
      return
    }

    if (this.isVirtualSelectable(row)) {
      this.selectVirtualRow(row, true)
      event.preventDefault()
    }
  }

  handleFocusIn(event) {
    if (this.isVirtualRendered()) {
      const target = getVirtualRowFromEvent(event)
      if (target) {
        this._activeValue = target.dataset.value || ''
      }
      return
    }

    const item = getTreeItemFromEvent(event)
    if (!item || getOwningTreeFromEvent(event) !== this) {
      return
    }

    this.updateFocusableItem(item)
  }

  handleKeyDown(event) {
    if (this.isVirtualRendered()) {
      this.handleVirtualKeyDown(event)
      return
    }

    if (getOwningTreeFromEvent(event) !== this) {
      return
    }

    const visibleItems = this.getEnabledVisibleItems()
    if (visibleItems.length === 0) {
      return
    }

    const active = this.getActiveItem(visibleItems) || visibleItems[0]
    let next = null
    let handled = false

    if (event.key === 'ArrowDown') {
      handled = true
      next = this.getRelativeItem(visibleItems, active, 1)
    } else if (event.key === 'ArrowUp') {
      handled = true
      next = this.getRelativeItem(visibleItems, active, -1)
    } else if (event.key === 'Home') {
      handled = true
      next = visibleItems[0]
    } else if (event.key === 'End') {
      handled = true
      next = visibleItems[visibleItems.length - 1]
    } else if (event.key === 'ArrowRight') {
      handled = true
      if (active.hasChildren && !active.expanded) {
        active.setExpanded(true, true)
        this.updateTreeItems()
      } else if (active.hasChildren) {
        next = this.getFirstVisibleChild(active)
      }
    } else if (event.key === 'ArrowLeft') {
      handled = true
      if (active.hasChildren && active.expanded) {
        active.setExpanded(false, true)
        this.updateTreeItems()
      } else {
        next = getParentTreeItem(active)
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (this.selection === 'leaf' && active.hasChildren) {
        active.setExpanded(!active.expanded, true)
        this.updateTreeItems()
      } else if (this.isSelectable(active)) {
        this.selectItem(active, true)
      }
      event.preventDefault()
      return
    } else if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      handled = true
      next = this.getTypeAheadItem(visibleItems, event.key)
    }

    if (next && visibleItems.indexOf(next) !== -1) {
      this.focusItem(next)
    }

    if (handled) {
      event.preventDefault()
    }
  }

  handleVirtualKeyDown(event) {
    const rows = this.getEnabledVirtualRows()
    if (rows.length === 0) {
      return
    }

    const active = this.getActiveVirtualRow(rows) || rows[0]
    let next = null
    let handled = false

    if (event.key === 'ArrowDown') {
      handled = true
      next = this.getRelativeVirtualRow(rows, active, 1)
    } else if (event.key === 'ArrowUp') {
      handled = true
      next = this.getRelativeVirtualRow(rows, active, -1)
    } else if (event.key === 'Home') {
      handled = true
      next = rows[0]
    } else if (event.key === 'End') {
      handled = true
      next = rows[rows.length - 1]
    } else if (event.key === 'ArrowRight') {
      handled = true
      if (active.hasChildren && !active.expanded) {
        this.setVirtualExpanded(active, true, true)
      } else if (active.hasChildren) {
        next = this.getFirstVisibleVirtualChild(active)
      }
    } else if (event.key === 'ArrowLeft') {
      handled = true
      if (active.hasChildren && active.expanded) {
        this.setVirtualExpanded(active, false, true)
      } else {
        next = this.getVirtualRowByValue(active.parentValue)
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (this.selection === 'leaf' && active.hasChildren) {
        this.setVirtualExpanded(active, !active.expanded, true)
      } else if (this.isVirtualSelectable(active)) {
        this.selectVirtualRow(active, true)
      }
      event.preventDefault()
      return
    } else if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      handled = true
      next = this.getTypeAheadVirtualRow(rows, event.key)
    }

    if (next) {
      this.focusVirtualRow(next.value)
    }

    if (handled) {
      event.preventDefault()
    }
  }

  selectItem(item, emitEvents) {
    const previousValues = this.selectedValues
    const selection = this.selection

    if (selection === 'none') {
      return
    }

    if (selection === 'multiple') {
      item.selected = !item.selected
    } else {
      const items = this.getTreeItems()
      for (let i = 0; i < items.length; i++) {
        items[i].selected = items[i] === item
      }
    }

    const nextValues = getSelectedValuesFromItems(this.getTreeItems())
    this._selectedValues = nextValues
    this.updateSelectedAttribute(nextValues)
    this.updateTreeItems()

    if (!emitEvents) {
      return
    }

    emit(this, 'select', {
      item,
      value: item.value,
      label: item.label,
      selected: item.selected,
      selectedValues: nextValues.slice(),
    })

    if (!arraysEqual(previousValues, nextValues)) {
      emit(this, 'change', {
        item,
        value: item.value,
        label: item.label,
        selected: item.selected,
        selectedValues: nextValues.slice(),
      })
    }
  }

  selectVirtualRow(row, emitEvents) {
    const previousValues = this.selectedValues
    const selection = this.selection

    if (selection === 'none') {
      return
    }

    let nextValues = []
    if (selection === 'multiple') {
      nextValues = previousValues.slice()
      const index = nextValues.indexOf(row.value)
      if (index === -1) {
        nextValues.push(row.value)
      } else {
        nextValues.splice(index, 1)
      }
    } else {
      nextValues = [row.value]
    }

    nextValues = normalizeSelectedForData(nextValues, this.items, selection)
    this._selectedValues = nextValues
    this._activeValue = row.value
    this.updateSelectedAttribute(nextValues)
    this.updateVirtualRows()

    if (!emitEvents) {
      return
    }

    const selected = nextValues.indexOf(row.value) !== -1
    emit(this, 'select', {
      item: row.item,
      value: row.value,
      label: row.label,
      selected,
      selectedValues: nextValues.slice(),
    })

    if (!arraysEqual(previousValues, nextValues)) {
      emit(this, 'change', {
        item: row.item,
        value: row.value,
        label: row.label,
        selected,
        selectedValues: nextValues.slice(),
      })
    }
  }

  applySelectedValues(values, updateAttribute) {
    if (this.isVirtualRendered()) {
      this.applyVirtualSelectedValues(values, updateAttribute)
      return
    }

    const selectedValues = normalizeSelectedForMode(values, this.getTreeItems(), this.selection)
    const selectedSet = new Set(selectedValues)
    const items = this.getTreeItems()

    for (let i = 0; i < items.length; i++) {
      items[i].selected = selectedSet.has(items[i].value)
    }

    this._selectedValues = selectedValues
    if (updateAttribute) {
      this.updateSelectedAttribute(selectedValues)
    }
    this.updateTreeItems()
  }

  applyVirtualSelectedValues(values, updateAttribute) {
    const selectedValues = normalizeSelectedForData(values, this.items, this.selection)
    this._selectedValues = selectedValues
    if (updateAttribute) {
      this.updateSelectedAttribute(selectedValues)
    }
    this.updateVirtualRows()
  }

  applySelectionRules(updateAttribute) {
    const selectedValues = this.isVirtualRendered()
      ? this.selectedValues
      : getSelectedValuesFromItems(this.getTreeItems())
    this.applySelectedValues(selectedValues, updateAttribute)
  }

  updateTreeItems() {
    if (this.isVirtualRendered()) {
      this.updateVirtualTree()
      return
    }

    const items = this.getTreeItems()

    if (this._selectedValues !== null) {
      this.applySelectedValuesWithoutLoop(this._selectedValues)
    } else if (items.length > 0) {
      this._selectedValues = normalizeSelectedForMode(getSelectedValuesFromItems(items), items, this.selection)
      this.updateSelectedAttribute(this._selectedValues)
    }

    const active = this.getActiveItem(items)
    const visibleItems = this.getEnabledVisibleItems()
    const focusable = active && this.isItemVisible(active) && !active.disabled
      ? active
      : visibleItems[0]

    for (let i = 0; i < items.length; i++) {
      items[i].setInTree(true)
      items[i].setFocusable(items[i] === focusable)
      items[i].style.setProperty('--tree-item-level', String(getTreeItemLevel(items[i])))
    }
  }

  updateVirtualTree() {
    if (this._selectedValues !== null) {
      this._selectedValues = normalizeSelectedForData(this._selectedValues, this.items, this.selection)
    } else {
      this._selectedValues = normalizeSelectedForData(getSelectedValuesFromData(this.items), this.items, this.selection)
      this.updateSelectedAttribute(this._selectedValues)
    }

    if (this._expandedValues === null) {
      this._expandedValues = getExpandedValuesFromData(this.items)
    }

    const rows = this.getEnabledVirtualRows()
    if (rows.length > 0 && !this.getActiveVirtualRow(rows)) {
      const selected = this._selectedValues.length > 0 ? this._selectedValues[0] : ''
      const selectedRow = selected ? this.getVirtualRowByValue(selected, rows) : null
      this._activeValue = selectedRow ? selectedRow.value : rows[0].value
    }

    this.updateVirtualRows()
  }

  applySelectedValuesWithoutLoop(values) {
    const items = this.getTreeItems()
    const selectedValues = normalizeSelectedForMode(values, items, this.selection)
    const selectedSet = new Set(selectedValues)

    for (let i = 0; i < items.length; i++) {
      items[i].selected = selectedSet.has(items[i].value)
    }

    this._selectedValues = selectedValues
  }

  updateFocusableItem(item) {
    const items = this.getTreeItems()
    for (let i = 0; i < items.length; i++) {
      items[i].setFocusable(items[i] === item)
    }
  }

  focusItem(item) {
    this.updateFocusableItem(item)
    item.focus()
  }

  focusVirtualRow(value) {
    if (!value) {
      return
    }

    this._activeValue = value
    this.scrollVirtualRowIntoView(value)
    this.updateVirtualRows()
    window.requestAnimationFrame(() => {
      const holder = this.getTreeHolder()
      const row = holder?.querySelector(`[data-value="${cssEscape(value)}"]`)
      if (row) {
        row.focus()
      }
    })
  }

  scrollVirtualRowIntoView(value) {
    const holder = this.getTreeHolder()
    if (!holder) {
      return
    }

    const rows = this.getVisibleVirtualRows()
    const index = findRowIndex(rows, value)
    if (index === -1) {
      return
    }

    const itemHeight = this.itemHeight
    const rowTop = index * itemHeight
    const rowBottom = rowTop + itemHeight
    const viewTop = holder.scrollTop
    const viewBottom = viewTop + holder.clientHeight

    if (rowTop < viewTop) {
      holder.scrollTop = rowTop
    } else if (rowBottom > viewBottom) {
      holder.scrollTop = rowBottom - holder.clientHeight
    }
  }

  updateVirtualRows() {
    const holder = this.getTreeHolder()
    if (!holder || !holder.classList.contains('tree--virtual')) {
      return
    }

    const spacer = holder.querySelector('.tree__virtual-spacer')
    const windowElement = holder.querySelector('.tree__virtual-window')
    if (!spacer || !windowElement) {
      return
    }

    const rows = this.getVisibleVirtualRows()
    const itemHeight = this.itemHeight
    const buffer = this.virtualBuffer
    const viewportHeight = holder.clientHeight || Math.min(rows.length * itemHeight, 256)
    const scrollTop = holder.scrollTop || 0
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer)
    const visibleCount = Math.max(1, Math.ceil(viewportHeight / itemHeight) + buffer * 2)
    const end = Math.min(rows.length, start + visibleCount)
    const active = this.getActiveVirtualRow(rows)
    const activeValue = active ? active.value : rows[0]?.value || ''

    spacer.style.height = `${rows.length * itemHeight}px`
    windowElement.style.transform = `translateY(${start * itemHeight}px)`
    windowElement.innerHTML = ''

    const fragment = document.createDocumentFragment()
    for (let i = start; i < end; i++) {
      fragment.append(this.createVirtualRowElement(rows[i], i, activeValue))
    }
    windowElement.append(fragment)
  }

  createVirtualRowElement(row, index, activeValue) {
    const classes = ['tree-row']
    if (row.expanded) {
      classes.push('tree-row--expanded')
    }

    if (row.selected) {
      classes.push('tree-row--selected')
    }

    if (!row.hasChildren) {
      classes.push('tree-row--leaf')
    }

    if (row.icon) {
      classes.push('tree-row--has-icon')
    }

    const element = document.createElement('button')
    element.className = classes.join(' ')
    element.type = 'button'
    element.dataset.value = row.value
    element.dataset.index = String(index)
    element.disabled = row.disabled
    element.tabIndex = row.value === activeValue ? 0 : -1
    element.setAttribute('part', 'item')
    element.setAttribute('role', 'treeitem')
    element.setAttribute('aria-level', String(row.level + 1))
    element.setAttribute('aria-disabled', row.disabled ? 'true' : 'false')
    element.setAttribute('aria-selected', row.selected ? 'true' : 'false')
    element.style.setProperty('--tree-level', String(row.level))
    element.style.height = `${this.itemHeight}px`

    if (row.hasChildren) {
      element.setAttribute('aria-expanded', row.expanded ? 'true' : 'false')
    }

    element.innerHTML = `
      <span class="tree-row__expand" part="expand-button" aria-hidden="true">›</span>
      <span class="tree-row__icon" part="icon">${escapeHtml(row.icon)}</span>
      <span class="tree-row__label" part="label">${escapeHtml(row.label)}</span>
    `
    return element
  }

  setVirtualExpanded(row, value, emitEvents) {
    const nextExpanded = Boolean(value)
    if (nextExpanded === row.expanded) {
      return
    }

    const expanded = new Set(this.getExpandedValues())
    if (nextExpanded) {
      expanded.add(row.value)
    } else {
      expanded.delete(row.value)
    }
    this._expandedValues = Array.from(expanded)
    this._activeValue = row.value

    if (emitEvents) {
      emit(this, nextExpanded ? 'expand' : 'collapse', {
        item: row.item,
        value: row.value,
        label: row.label,
        expanded: nextExpanded,
      })
    }

    this.updateVirtualRows()
  }

  getTreeItems() {
    const root = this.shadowRoot
    if (!root) {
      return []
    }

    const holder = root.querySelector('.tree')
    if (!holder) {
      return []
    }

    const slot = holder.querySelector('slot:not([name])')
    const source = slot
      ? this.querySelectorAll('tot-tree-item')
      : holder.querySelectorAll('tot-tree-item')
    const items = []

    for (let i = 0; i < source.length; i++) {
      if (slot && source[i].closest('tot-tree') !== this) {
        continue
      }
      items.push(source[i])
    }

    return items
  }

  getVisibleItems() {
    const items = this.getTreeItems()
    const visible = []
    for (let i = 0; i < items.length; i++) {
      if (this.isItemVisible(items[i])) {
        visible.push(items[i])
      }
    }
    return visible
  }

  getEnabledVisibleItems() {
    const visible = this.getVisibleItems()
    const enabled = []
    for (let i = 0; i < visible.length; i++) {
      if (!visible[i].disabled) {
        enabled.push(visible[i])
      }
    }
    return enabled
  }

  getVisibleVirtualRows() {
    const selectedSet = new Set(this.selectedValues)
    const expandedSet = new Set(this.getExpandedValues())
    return flattenDataItems(this.items, {
      expandedSet,
      selectedSet,
      visibleOnly: true,
    })
  }

  getAllVirtualRows() {
    const selectedSet = new Set(this.selectedValues)
    const expandedSet = new Set(this.getExpandedValues())
    return flattenDataItems(this.items, {
      expandedSet,
      selectedSet,
      visibleOnly: false,
    })
  }

  getEnabledVirtualRows() {
    const rows = this.getVisibleVirtualRows()
    const enabled = []
    for (let i = 0; i < rows.length; i++) {
      if (!rows[i].disabled) {
        enabled.push(rows[i])
      }
    }
    return enabled
  }

  getExpandedValues() {
    if (this._expandedValues === null) {
      this._expandedValues = getExpandedValuesFromData(this.items)
    }
    return this._expandedValues.slice()
  }

  getVirtualRowByValue(value, rows) {
    const source = rows || this.getVisibleVirtualRows()
    for (let i = 0; i < source.length; i++) {
      if (source[i].value === value) {
        return source[i]
      }
    }
    return null
  }

  getActiveVirtualRow(rows) {
    if (this._activeValue) {
      const active = this.getVirtualRowByValue(this._activeValue, rows)
      if (active && !active.disabled) {
        return active
      }
    }

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].selected && !rows[i].disabled) {
        return rows[i]
      }
    }
    return null
  }

  getRelativeVirtualRow(rows, active, step) {
    if (!active) {
      return step > 0 ? rows[0] : rows[rows.length - 1]
    }

    const index = findRowIndex(rows, active.value)
    const nextIndex = (index + step + rows.length) % rows.length
    return rows[nextIndex]
  }

  getFirstVisibleVirtualChild(row) {
    const rows = this.getVisibleVirtualRows()
    const start = findRowIndex(rows, row.value) + 1
    for (let i = start; i < rows.length; i++) {
      if (rows[i].level <= row.level) {
        return null
      }

      if (rows[i].parentValue === row.value && !rows[i].disabled) {
        return rows[i]
      }
    }
    return null
  }

  getTypeAheadVirtualRow(rows, key) {
    window.clearTimeout(this._typeToSelectTimer)
    this._typeToSelect += key.toLocaleLowerCase()
    this._typeToSelectTimer = window.setTimeout(() => {
      this._typeToSelect = ''
    }, 700)

    const active = this.getActiveVirtualRow(rows)
    const start = active ? findRowIndex(rows, active.value) + 1 : 0
    for (let i = 0; i < rows.length; i++) {
      const index = (start + i) % rows.length
      const label = rows[index].label.toLocaleLowerCase()
      if (label.startsWith(this._typeToSelect)) {
        return rows[index]
      }
    }

    return null
  }

  isItemVisible(item) {
    let parent = getParentTreeItem(item)
    while (parent) {
      if (!parent.expanded) {
        return false
      }
      parent = getParentTreeItem(parent)
    }
    return true
  }

  isSelectable(item) {
    if (this.selection === 'none') {
      return false
    }

    if (this.selection === 'leaf') {
      return !item.hasChildren
    }

    return true
  }

  isVirtualSelectable(row) {
    if (this.selection === 'none') {
      return false
    }

    if (this.selection === 'leaf') {
      return !row.hasChildren
    }

    return true
  }

  getActiveItem(items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].isFocused()) {
        return items[i]
      }
    }
    return null
  }

  getRelativeItem(items, active, step) {
    if (!active) {
      return step > 0 ? items[0] : items[items.length - 1]
    }

    const index = items.indexOf(active)
    const nextIndex = (index + step + items.length) % items.length
    return items[nextIndex]
  }

  getFirstVisibleChild(item) {
    const children = getDirectChildItems(item)
    for (let i = 0; i < children.length; i++) {
      if (!children[i].disabled && this.isItemVisible(children[i])) {
        return children[i]
      }
    }
    return null
  }

  getTypeAheadItem(items, key) {
    window.clearTimeout(this._typeToSelectTimer)
    this._typeToSelect += key.toLocaleLowerCase()
    this._typeToSelectTimer = window.setTimeout(() => {
      this._typeToSelect = ''
    }, 700)

    const active = this.getActiveItem(items)
    const start = active ? items.indexOf(active) + 1 : 0
    for (let i = 0; i < items.length; i++) {
      const index = (start + i) % items.length
      const label = items[index].label.toLocaleLowerCase()
      if (label.startsWith(this._typeToSelect)) {
        return items[index]
      }
    }

    return null
  }

  get virtualBuffer() {
    const value = Number(this.getAttribute('buffer'))
    return Number.isFinite(value) && value >= 0 ? Math.floor(value) : 6
  }

  getTreeHolder() {
    return this.shadowRoot?.querySelector('.tree') || null
  }

  isVirtual() {
    return this.hasAttribute('virtual')
  }

  isVirtualRendered() {
    const holder = this.getTreeHolder()
    return Boolean(holder && holder.classList.contains('tree--virtual'))
  }

  updateSelectedAttribute(values) {
    this._isUpdatingSelected = true
    if (!values || values.length === 0) {
      this.removeAttribute('selected')
    } else {
      this.setAttribute('selected', JSON.stringify(values))
    }
    this._isUpdatingSelected = false
  }

  hasDefaultSlotContent() {
    for (let i = 0; i < this.childNodes.length; i++) {
      const node = this.childNodes[i]
      if (node.nodeType === Node.ELEMENT_NODE && !node.slot) {
        return true
      }

      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        return true
      }
    }
    return false
  }
}

export class TotTreeItem extends HTMLElement {
  static get observedAttributes() {
    return [
      'disabled',
      'expanded',
      'label',
      'selected',
      'value',
    ]
  }

  constructor() {
    super()
    this._mutationObserver = null
    this._isNormalizing = false
    this._isInTree = false
    this._lastHasChildren = null
    this._lastHasIcon = null
    this._handleSlotChange = () => this.handleSlotChange()
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  get expanded() {
    return this.hasAttribute('expanded')
  }

  set expanded(value) {
    this.setExpanded(value, false)
  }

  get selected() {
    return this.hasAttribute('selected')
  }

  set selected(value) {
    setBooleanAttribute(this, 'selected', value)
  }

  get value() {
    return this.getAttribute('value') || this.label
  }

  set value(value) {
    setNullableAttribute(this, 'value', value)
  }

  get label() {
    const labelSlot = this.getLabelSlotElement()
    if (labelSlot) {
      return labelSlot.textContent.replace(/\s+/g, ' ').trim()
    }

    return this.getAttribute('label') || ''
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  get hasChildren() {
    return getDirectChildItems(this).length > 0
  }

  connectedCallback() {
    this.normalizeLightDom()
    this.render()
    this.startObserving()
  }

  disconnectedCallback() {
    this.stopObserving()
  }

  attributeChangedCallback(oldName, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }

    if (this.isConnected) {
      this.render()
    }
  }

  focus(options) {
    const row = this.getRow()
    if (row) {
      row.focus(options)
    }
  }

  blur() {
    const row = this.getRow()
    if (row) {
      row.blur()
    }
  }

  isFocused() {
    return this.shadowRoot?.activeElement === this.getRow()
  }

  setFocusable(value) {
    const row = this.getRow()
    if (row) {
      row.tabIndex = value ? 0 : -1
    }
  }

  setInTree(value) {
    this._isInTree = Boolean(value)
  }

  setExpanded(value, emitEvents) {
    const nextExpanded = Boolean(value)
    if (nextExpanded === this.expanded) {
      return
    }

    setBooleanAttribute(this, 'expanded', nextExpanded)

    if (emitEvents) {
      emit(this, nextExpanded ? 'expand' : 'collapse', {
        item: this,
        value: this.value,
        label: this.label,
        expanded: nextExpanded,
      })
    }
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const disabled = this.disabled
    const expanded = this.expanded
    const selected = this.selected
    const hasChildren = this.hasChildren
    const hasIcon = this.hasNamedSlotContent('icon')
    const classes = ['tree-item']

    if (expanded) {
      classes.push('tree-item--expanded')
    }

    if (selected) {
      classes.push('tree-item--selected')
    }

    if (disabled) {
      classes.push('tree-item--disabled')
    }

    if (!hasChildren) {
      classes.push('tree-item--leaf')
    }

    if (hasIcon) {
      classes.push('tree-item--has-icon')
    }

    this._lastHasChildren = hasChildren
    this._lastHasIcon = hasIcon

    root.innerHTML = `<style>${treeItemStyle}</style>
      <div
        class="${escapeAttribute(classes.join(' '))}"
        part="base"
        role="treeitem"
        aria-disabled="${disabled ? 'true' : 'false'}"
        aria-selected="${selected ? 'true' : 'false'}"
        ${hasChildren ? `aria-expanded="${expanded ? 'true' : 'false'}"` : ''}
      >
        <button
          class="tree-item__row"
          part="item"
          type="button"
          tabindex="${this._isInTree ? '-1' : '0'}"
          ${disabled ? 'disabled' : ''}
        >
          <span class="tree-item__expand" part="expand-button" aria-hidden="true">›</span>
          <span class="tree-item__icon" part="icon"><slot name="icon"></slot></span>
          <span class="tree-item__label" part="label"><slot name="label">${escapeHtml(this.getAttribute('label') || '')}</slot></span>
        </button>
        <div class="tree-item__children" part="children" role="group">
          <slot></slot>
        </div>
      </div>
    `

    const slots = root.querySelectorAll('slot')
    for (let i = 0; i < slots.length; i++) {
      slots[i].addEventListener('slotchange', this._handleSlotChange)
    }
  }

  handleSlotChange() {
    if (!this.isConnected) {
      return
    }

    this.normalizeLightDom()
    const hasChildren = this.hasChildren
    const hasIcon = this.hasNamedSlotContent('icon')
    if (hasChildren !== this._lastHasChildren || hasIcon !== this._lastHasIcon) {
      this.render()
    }
  }

  startObserving() {
    this.stopObserving()
    this._mutationObserver = new MutationObserver(() => {
      if (this._isNormalizing) {
        return
      }
      this.normalizeLightDom()
      this.render()
    })
    this._mutationObserver.observe(this, {
      childList: true,
      subtree: false,
    })
  }

  stopObserving() {
    if (this._mutationObserver) {
      this._mutationObserver.disconnect()
      this._mutationObserver = null
    }
  }

  normalizeLightDom() {
    if (this._isNormalizing || this.getLabelSlotElement()) {
      return
    }

    const labelNodes = []
    for (let i = 0; i < this.childNodes.length; i++) {
      const node = this.childNodes[i]
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim()) {
          labelNodes.push(node)
        }
        continue
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        continue
      }

      if (node.slot || node.localName === 'tot-tree-item') {
        continue
      }

      labelNodes.push(node)
    }

    if (labelNodes.length === 0) {
      return
    }

    this._isNormalizing = true
    const wrapper = document.createElement('span')
    wrapper.slot = 'label'
    wrapper.dataset.treeLabel = 'true'
    this.insertBefore(wrapper, labelNodes[0])
    for (let i = 0; i < labelNodes.length; i++) {
      wrapper.append(labelNodes[i])
    }
    this._isNormalizing = false
  }

  getLabelSlotElement() {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].slot === 'label') {
        return this.children[i]
      }
    }
    return null
  }

  hasNamedSlotContent(name) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].slot === name) {
        return true
      }
    }
    return false
  }

  getRow() {
    return this.shadowRoot?.querySelector('.tree-item__row')
  }
}

function parseItems(value) {
  if (value === null || value === undefined || value === '') {
    return []
  }

  let source = value
  if (typeof value === 'string') {
    source = parseJson(value, [])
  }

  if (!Array.isArray(source)) {
    return []
  }

  const items = []
  for (let i = 0; i < source.length; i++) {
    const normalized = normalizeItem(source[i])
    if (normalized) {
      items.push(normalized)
    }
  }
  return items
}

function normalizeItem(item) {
  if (typeof item === 'string') {
    return {
      disabled: false,
      expanded: false,
      icon: '',
      items: [],
      label: item,
      selected: false,
      value: item,
    }
  }

  if (!item || typeof item !== 'object') {
    return null
  }

  const label = String(item.label ?? item.text ?? item.name ?? item.value ?? item.id ?? '')
  const value = String(item.value ?? item.id ?? label)
  const children = item.items ?? item.children ?? item.nodes ?? []

  return {
    disabled: Boolean(item.disabled),
    expanded: Boolean(item.expanded || item.open),
    icon: item.icon === null || item.icon === undefined ? '' : String(item.icon),
    items: parseItems(children),
    label,
    selected: Boolean(item.selected || item.checked),
    value,
  }
}

function cloneItems(items) {
  return parseItems(items)
}

function parseSelected(value) {
  if (value === null || value === undefined || value === '') {
    return []
  }

  if (Array.isArray(value)) {
    const result = []
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeSelectedValue(value[i])
      if (normalized !== '') {
        result.push(normalized)
      }
    }
    return uniqueStrings(result)
  }

  if (value instanceof Set) {
    return parseSelected(Array.from(value))
  }

  if (typeof value === 'string') {
    const parsed = parseJson(value, null)
    if (Array.isArray(parsed)) {
      return parseSelected(parsed)
    }

    const parts = value.split(',')
    const selected = []
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim()
      if (part) {
        selected.push(part)
      }
    }
    return uniqueStrings(selected)
  }

  return [String(value)]
}

function normalizeSelectedValue(value) {
  if (value === null || value === undefined) {
    return ''
  }
  return String(value)
}

function normalizeSelectedForMode(values, items, selection) {
  if (selection === 'none') {
    return []
  }

  const allowed = new Set()
  for (let i = 0; i < items.length; i++) {
    if (selection === 'leaf' && items[i].hasChildren) {
      continue
    }
    allowed.add(items[i].value)
  }

  const result = []
  for (let i = 0; i < values.length; i++) {
    if (!allowed.has(values[i]) || result.indexOf(values[i]) !== -1) {
      continue
    }

    result.push(values[i])
    if (selection !== 'multiple') {
      break
    }
  }
  return result
}

function normalizeSelectedForData(values, items, selection) {
  if (selection === 'none') {
    return []
  }

  const rows = flattenDataItems(items, {
    expandedSet: new Set(),
    selectedSet: new Set(),
    visibleOnly: false,
  })
  const allowed = new Set()
  for (let i = 0; i < rows.length; i++) {
    if (selection === 'leaf' && rows[i].hasChildren) {
      continue
    }
    allowed.add(rows[i].value)
  }

  const result = []
  for (let i = 0; i < values.length; i++) {
    if (!allowed.has(values[i]) || result.indexOf(values[i]) !== -1) {
      continue
    }

    result.push(values[i])
    if (selection !== 'multiple') {
      break
    }
  }
  return result
}

function uniqueStrings(values) {
  const result = []
  for (let i = 0; i < values.length; i++) {
    const value = String(values[i])
    if (result.indexOf(value) === -1) {
      result.push(value)
    }
  }
  return result
}

function getSelectedValuesFromItems(items) {
  const selected = []
  for (let i = 0; i < items.length; i++) {
    if (items[i].selected) {
      selected.push(items[i].value)
    }
  }
  return uniqueStrings(selected)
}

function getSelectedValuesFromData(items) {
  const selected = []
  collectSelectedValuesFromData(items, selected)
  return uniqueStrings(selected)
}

function collectSelectedValuesFromData(items, selected) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].selected) {
      selected.push(items[i].value)
    }
    collectSelectedValuesFromData(items[i].items, selected)
  }
}

function getExpandedValuesFromData(items) {
  const expanded = []
  collectExpandedValuesFromData(items, expanded)
  return uniqueStrings(expanded)
}

function collectExpandedValuesFromData(items, expanded) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].expanded && items[i].items.length > 0) {
      expanded.push(items[i].value)
    }
    collectExpandedValuesFromData(items[i].items, expanded)
  }
}

function flattenDataItems(items, options) {
  const result = []
  const expandedSet = options.expandedSet || new Set()
  const selectedSet = options.selectedSet || new Set()
  const visibleOnly = Boolean(options.visibleOnly)

  function addRows(list, level, parentValue, path) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      const hasChildren = item.items.length > 0
      const expanded = hasChildren && expandedSet.has(item.value)
      const nextPath = path.concat(item)
      result.push({
        disabled: item.disabled,
        expanded,
        hasChildren,
        icon: item.icon,
        item,
        label: item.label,
        level,
        parentValue,
        path: nextPath,
        selected: selectedSet.has(item.value),
        value: item.value,
      })

      if (hasChildren && (!visibleOnly || expanded)) {
        addRows(item.items, level + 1, item.value, nextPath)
      }
    }
  }

  addRows(items, 0, '', [])
  return result
}

function findRowIndex(rows, value) {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].value === value) {
      return i
    }
  }
  return -1
}

function getDirectChildItems(item) {
  const children = []
  for (let i = 0; i < item.children.length; i++) {
    if (item.children[i].localName === 'tot-tree-item') {
      children.push(item.children[i])
    }
  }
  return children
}

function getParentTreeItem(item) {
  let parent = item.parentElement
  while (parent) {
    if (parent.localName === 'tot-tree-item') {
      return parent
    }
    if (parent.localName === 'tot-tree') {
      return null
    }
    parent = parent.parentElement
  }
  return null
}

function getTreeItemLevel(item) {
  let level = 0
  let parent = getParentTreeItem(item)
  while (parent) {
    level += 1
    parent = getParentTreeItem(parent)
  }
  return level
}

function getTreeItemFromEvent(event) {
  const path = event.composedPath()
  for (let i = 0; i < path.length; i++) {
    const node = path[i]
    if (node instanceof HTMLElement && node.localName === 'tot-tree-item') {
      return node
    }
  }
  return null
}

function getOwningTreeFromEvent(event) {
  const path = event.composedPath()
  for (let i = 0; i < path.length; i++) {
    const node = path[i]
    if (node instanceof HTMLElement && node.localName === 'tot-tree') {
      return node
    }
  }
  return null
}

function getVirtualRowFromEvent(event) {
  const path = event.composedPath()
  for (let i = 0; i < path.length; i++) {
    const node = path[i]
    if (node instanceof HTMLElement && node.classList && node.classList.contains('tree-row')) {
      return node
    }
  }
  return null
}

function isExpandClick(event) {
  const path = event.composedPath()
  for (let i = 0; i < path.length; i++) {
    const node = path[i]
    if (!(node instanceof HTMLElement)) {
      continue
    }

    if (node.classList && node.classList.contains('tree-item__expand')) {
      return true
    }

    if (node.classList && node.classList.contains('tree-item__label')) {
      return false
    }
  }
  return false
}

function isVirtualExpandClick(event) {
  const path = event.composedPath()
  for (let i = 0; i < path.length; i++) {
    const node = path[i]
    if (!(node instanceof HTMLElement)) {
      continue
    }

    if (node.classList && node.classList.contains('tree-row__expand')) {
      return true
    }

    if (node.classList && node.classList.contains('tree-row__label')) {
      return false
    }
  }
  return false
}

function arraysEqual(first, second) {
  if (first.length !== second.length) {
    return false
  }

  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) {
      return false
    }
  }
  return true
}

function getSupportedValue(value, values, fallback) {
  const normalized = String(value || '').toLowerCase()
  return values.indexOf(normalized) === -1 ? fallback : normalized
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (match) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return replacements[match]
  })
}

function escapeAttribute(value) {
  return String(value).replace(/[&<>"'`]/g, (match) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '`': '&#96;',
    }
    return replacements[match]
  })
}

function cssEscape(value) {
  if (window.CSS && typeof window.CSS.escape === 'function') {
    return window.CSS.escape(value)
  }

  return String(value).replace(/[^a-zA-Z0-9_-]/g, (match) => `\\${match}`)
}
