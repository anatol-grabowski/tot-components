/**
 * `<tot-tree>` - a keyboard-navigable hierarchical selector. Assign one
 * canonical nested `items` array or provide direct `<tot-tree-item>` children;
 * slotted children take precedence. Array data is windowed automatically,
 * while slotted items remain direct DOM so their element identity and content
 * are preserved. Set the accessible name with the native `aria-label`
 * attribute.
 */
export type TotTree = {
  props: {
    /**
     * Nested tree data. String shorthands and alternate field names are not
     * accepted. `prefix` and `suffix` are short text or emoji displayed around
     * the label. @default []
     */
    items: Array<{
      /** Stable selection and expansion identifier. */
      value: string
      /** Visible text. */
      label: string
      prefix?: string
      suffix?: string
      disabled?: boolean
      /** Initial expansion state. */
      expanded?: boolean
      items?: TotTree['props']['items']
    }>

    /** Fixed row height used by automatic windowing of array data. @default 24 */
    itemHeight: number

    /** Extra rows rendered before and after the visible array-data range. @default 6 */
    buffer: number

    /** Shows indentation guides. @default false */
    indentGuides: boolean

    /**
     * Which item kinds can be selected: leaves, branches, either, or none.
     * Branch expansion remains available when selection is disabled. @default 'any'
     */
    selection: 'leaf' | 'branch' | 'any' | 'none'

    /** Allows more than one selected value. @default false */
    multiple: boolean

    /** The complete selection state. */
    values: string[]
  }

  methods: {
    /** Returns the focusable role="tree" scrolling element. */
    getBase(): HTMLElement | null
  }

  events: {
    /**
     * Emitted when user interaction changes the selection.
     */
    change: CustomEvent<{
      values: string[]
    }>

    /** Emitted when a branch is expanded or collapsed by the user. */
    toggle: CustomEvent<{
      value: string
      expanded: boolean
    }>
  }

  slots: {
    /** Direct `<tot-tree-item>` children. */
    default: undefined
  }

  /**
   * Array data and slotted items use different internals:
   *
   * - `scroll-space` exists only for array data. Its full height represents all
   *   currently visible flattened rows and creates the correct scrollbar.
   * - `items` exists inside `scroll-space` and is translated to the current
   *   scroll position. It contains only the buffered rows that are rendered.
   * - Slotted `<tot-tree-item>` elements are rendered directly under `base` and
   *   therefore use neither `scroll-space` nor `items`.
   *
   * ```text
   * base — role="tree" scrolling holder
   * ├─ default slot — direct `<tot-tree-item>` mode
   * └─ scroll-space — full scrollable height for array data
   *    └─ items — translated container for the currently rendered row range
   *       └─ item — repeated native button
   *          ├─ expand-button
   *          ├─ prefix
   *          ├─ label
   *          └─ suffix
   * ```
   */
  parts:
    | 'base'
    | 'scroll-space'
    | 'items'
    | 'item'
    | 'expand-button'
    | 'prefix'
    | 'label'
    | 'suffix'
}

/**
 * `<tot-tree-item>` - one slotted tree item based on a native button. The
 * owning tree manages selection; set initial tree selection through
 * `<tot-tree>.values`.
 */
export type TotTreeItem = {
  props: {
    /** Stable selection and expansion identifier. Defaults to the label. */
    value: string
    /** Visible slotted or fallback label. @default '' */
    label: string
    /** Text fallback for the `prefix` slot. @default '' */
    prefix: string
    /** Text fallback for the `suffix` slot. @default '' */
    suffix: string
    disabled: boolean
    /** Controls child visibility. */
    expanded: boolean
    /** Current selection state managed by the owning tree. */
    readonly selected: boolean
    readonly hasChildren: boolean
  }

  methods: {
    /** Returns the native row button. */
    getButton(): HTMLButtonElement | null
  }

  events: {}

  slots: {
    /** Child `<tot-tree-item>` elements. */
    default: undefined
    /** Visible label content. */
    label: undefined
    /** Content before the label. */
    prefix: undefined
    /** Content after the label. */
    suffix: undefined
  }

  /**
   * ```text
   * base — role="treeitem" state wrapper
   * ├─ item — native button row
   * │  ├─ expand-button
   * │  ├─ prefix
   * │  ├─ label
   * │  └─ suffix
   * └─ children — role="group" child-item container
   * ```
   */
  parts: 'base' | 'item' | 'expand-button' | 'prefix' | 'label' | 'suffix' | 'children'
}
