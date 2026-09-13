export type TotFormulaItem = {
  /** Calculation weight shown as an operator before the item. @default '+' */
  sign?: '+' | '-'
  /** Human-readable XBRL concept name. */
  name: string
  /**
   * XBRL concept/tag name. Tags without whitespace are used as exact CSS
   * classes; CSS-safe tags are also exact shadow parts. Every tag is exposed as
   * a `tag-<sanitized-tag>` class/part as well.
   */
  tag: string
  /** Nested calculation children. */
  items?: TotFormulaItem[]
}


export type TotFormulaItemEventDetail = {
  path: string
  sign: '+' | '-'
  name: string
  shortName: string
  tag: string
  value?: number
}

export type TotFormulaConfig = {
  /** Optional compact heading, for example "Calculation group 23". */
  title?: string
  /** Show only short names and values in formula rows. @default false */
  simple?: boolean
  /** Numeric values keyed by XBRL tag name. */
  values?: Record<string, number>
  /** Compact labels keyed by XBRL tag name. */
  abbreviations?: Record<string, string>
  /** One or more calculation roots. */
  items: TotFormulaItem[]
}

/**
 * `<tot-formula>` - compact recursive XBRL calculation-linkbase formula viewer.
 *
 * The `config` HTML attribute accepts JSON with the recursive formula in `items`
 * and numeric facts in a separate `values` dictionary keyed by XBRL tag name.
 * Formula items contain their + / - calculation sign, full concept name, tag,
 * and nested children; they do not contain values or compact labels. Compact
 * labels live in the separate `abbreviations` dictionary keyed by tag.
 *
 * Clicking a parent item's sign collapses/expands its children. Collapsed rows
 * visually highlight the calculation sign without adding a separate caret. In simple mode
 * rows show only the configured tag abbreviation and value. Hovering a row, or tapping it on touch
 * devices, shows a compact tooltip with name, tag, short name, and value. Rows
 * emit `item-hover`, `item-unhover`, and `item-click` events with the complete
 * item identity and current value.
 *
 * Numeric parent values are checked against the signed sum of their direct
 * children. The header shows a validation icon with hover/touch details.
 *
 * Each formula row and its pieces receive CSS hooks derived from `tag`. When a
 * tag has no whitespace its exact name is added as a class; CSS-safe tags are
 * also exported as exact shadow parts. A `tag-<sanitized-tag>` class/part is
 * always added. For example:
 * `tot-formula::part(Assets) { font-weight: 700; }`.
 */
export class TotFormula extends HTMLElement {
  static get observedAttributes(): string[]

  config: TotFormulaConfig


  /** Returns the component's root formula panel. */
  getBase(): HTMLElement

  addEventListener(
    type: 'item-hover' | 'item-unhover' | 'item-click',
    listener: (this: TotFormula, event: CustomEvent<TotFormulaItemEventDetail>) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void
}

declare global {
  interface HTMLElementTagNameMap {
    'tot-formula': TotFormula
  }
}
