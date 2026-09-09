export type TotGicsGridPattern =
  | 'none'
  | 'diagonal'
  | 'diagonal-reverse'
  | 'crosshatch'
  | 'dots'
  | 'horizontal'
  | 'vertical'

export type TotGicsGridConfig = {
  /** Accessible label for the 13×13 grid. @default "GICS codes grid" */
  label?: string
  /** Show the eight-digit sub-industry code as four two-digit lines in each occupied cell. @default false */
  showCodes?: boolean
  /** Opacity of the hardcoded cell icons, from 0 to 1. @default 1 */
  iconOpacity?: number
  /** Allow pointer/touch dragging to swap or move cells. @default true */
  editMode?: boolean
  /**
   * Optional 169-entry row-major layout. Entries are eight-digit GICS sub-industry
   * codes or `null` for empty cells. Invalid layouts fall back to the built-in grid.
   */
  layout?: Array<string | null>
  /**
   * Optional overlay patterns keyed by a 2-, 4-, 6-, or 8-digit GICS code.
   * Patterns inherit from sector → industry group → industry → sub-industry.
   */
  patterns?: Record<string, TotGicsGridPattern>
}

/**
 * Square 13×13 GICS sub-industry grid with hardcoded icons, taxonomy names, and
 * theme-aware default sector colors.
 *
 * Each occupied cell has hierarchy class names and matching shadow parts:
 * `sector-20`, `industry-group-2010`, `industry-201060`, and
 * `subindustry-20106020`. External CSS can therefore override colors, for example:
 * `tot-gics-grid::part(industry-201060) { --tot-gics-grid-cell-background: ...; }`.
 * `--tot-gics-grid-cell-color` controls the cell text/pattern color.
 *
 * The `config` HTML attribute accepts JSON in the shape described by
 * `TotGicsGridConfig`. In edit mode, a completed drag updates `config.layout` and
 * emits a bubbling native `change` event. Fullscreen changes emit
 * `fullscreen-change`.
 */
export class TotGicsGrid extends HTMLElement {
  static get observedAttributes(): string[]

  config: TotGicsGridConfig
  readonly fullscreen: boolean

  /** Native grid element inside the shadow root. */
  getGrid(): HTMLElement
  openFullscreen(): void
  closeFullscreen(shouldUpdate?: boolean, skipHistory?: boolean): void
}

declare global {
  interface HTMLElementTagNameMap {
    'tot-gics-grid': TotGicsGrid
  }
}
