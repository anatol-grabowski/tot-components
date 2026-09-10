const twoTowersStyle = `
  :host {
    --tot-two-towers-category-border-color: var(--tot-color-neutral-600, #475569);
    --tot-two-towers-subcategory-border-color: color-mix(in srgb, var(--tot-two-towers-category-border-color) 55%, transparent);
    --tot-two-towers-dimmed-border-color: var(--tot-color-neutral-300, #cbd5e1);
    --tot-two-towers-hatch-color: color-mix(in srgb, var(--tot-color-neutral-0, #fff) 76%, transparent);
    --tot-two-towers-delta-overlay-color: color-mix(in srgb, var(--tot-color-neutral-0, #fff) 58%, transparent);
    --tot-two-towers-tear-background-color: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    --tot-two-towers-series-color-1: var(--tot-color-blue-400, #60a5fa);
    --tot-two-towers-series-color-2: var(--tot-color-orange-400, #fb923c);
    --tot-two-towers-series-color-3: var(--tot-color-green-400, #4ade80);
    --tot-two-towers-series-color-4: var(--tot-color-rose-400, #fb7185);
    --tot-two-towers-series-color-5: var(--tot-color-violet-400, #a78bfa);
    --tot-two-towers-series-color-6: var(--tot-color-amber-400, #fbbf24);

    box-sizing: border-box;
    color: var(--tot-input-color, #1e293b);
    display: block;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }

  :host([hidden]) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .two-towers {
    --tot-two-towers-details-width: min(34rem, 42vw);
    display: grid;
    gap: var(--tot-spacing-x-small, .5rem);
    grid-template-areas:
      'chart'
      'legend';
    max-width: 100%;
    min-width: 0;
    position: relative;
    width: 100%;
  }

  .two-towers.is-fullscreen {
    align-content: stretch;
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    gap: var(--tot-spacing-2x-small, .25rem);
    grid-template-areas:
      'chart'
      'legend';
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) auto;
    height: 100dvh;
    inset: 0;
    max-width: none;
    overflow: hidden;
    padding: var(--tot-spacing-2x-small, .25rem);
    position: fixed;
    width: 100vw;
    z-index: var(--tot-z-index-fullscreen, 1300);
  }

  .two-towers.is-fullscreen.has-details-table,
  .two-towers.is-fullscreen.has-formula,
  .two-towers.is-fullscreen.has-groups {
    grid-template-areas:
      'details chart'
      'details legend';
    grid-template-columns: clamp(10rem, var(--tot-two-towers-details-width), 72vw) minmax(0, 1fr);
  }

  .fullscreen-button,
  .details-button,
  .formula-button,
  .groups-button {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: color-mix(in srgb, var(--tot-panel-background-color, #fff) 88%, transparent);
    border: 0;
    border-radius: var(--tot-border-radius-small, 3px);
    color: var(--tot-input-icon-color, var(--tot-color-neutral-500, #64748b));
    cursor: pointer;
    display: inline-flex;
    height: 1.75rem;
    justify-content: center;
    padding: 0;
    position: absolute;
    right: var(--tot-spacing-2x-small, .25rem);
    top: var(--tot-spacing-2x-small, .25rem);
    width: 1.75rem;
    z-index: 3;
  }

  .two-towers.is-fullscreen .fullscreen-button,
  .two-towers.is-fullscreen .details-button,
  .two-towers.is-fullscreen .formula-button,
  .two-towers.is-fullscreen .groups-button {
    position: fixed;
  }

  .details-button,
  .formula-button,
  .groups-button {
    display: none;
  }

  .details-button {
    right: calc(var(--tot-spacing-2x-small, .25rem) + 2rem);
  }

  .formula-button {
    right: calc(var(--tot-spacing-2x-small, .25rem) + 4rem);
  }

  .groups-button {
    right: calc(var(--tot-spacing-2x-small, .25rem) + 6rem);
  }

  .formula-button[hidden],
  .groups-button[hidden] {
    display: none !important;
  }

  .two-towers.is-fullscreen .details-button,
  .two-towers.is-fullscreen .formula-button,
  .two-towers.is-fullscreen .groups-button {
    display: inline-flex;
  }

  .details-button[aria-expanded='true'],
  .formula-button[aria-expanded='true'],
  .groups-button[aria-expanded='true'] {
    background: var(--tot-color-primary-50, #f0f9ff);
    color: var(--tot-color-primary-700, #0369a1);
  }

  .fullscreen-button:hover,
  .details-button:hover,
  .formula-button:hover,
  .groups-button:hover {
    color: var(--tot-input-icon-color-hover, #475569);
  }

  .fullscreen-button:focus-visible,
  .details-button:focus-visible,
  .formula-button:focus-visible,
  .groups-button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .fullscreen-button svg,
  .details-button svg,
  .formula-button svg,
  .groups-button svg {
    display: block;
    fill: none;
    height: 1rem;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
    width: 1rem;
  }

  .chart {
    grid-area: chart;
    background: var(--tot-two-towers-background-color, var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff)));
    border: var(--tot-two-towers-border-width, var(--tot-panel-border-width, 1px)) solid var(--tot-two-towers-border-color, var(--tot-panel-border-color, #e2e8f0));
    border-radius: var(--tot-two-towers-border-radius, var(--tot-border-radius-large, 6px));
    min-width: 0;
    overflow: hidden;
    padding: var(--tot-two-towers-padding, var(--tot-spacing-2x-small, .25rem));
    width: 100%;
  }

  .two-towers.is-fullscreen .chart {
    align-items: center;
    border: 0;
    border-radius: 0;
    display: flex;
    justify-content: center;
    min-height: 0;
    padding: 0;
  }

  svg {
    display: block;
    height: auto;
    max-width: 100%;
    overflow: visible;
    width: 100%;
  }

  .two-towers.is-fullscreen svg {
    height: 100%;
    max-height: 100%;
  }

  .category-shape {
    transition: opacity var(--tot-transition-fast, 150ms) ease;
  }

  .legend {
    display: flex;
    grid-area: legend;
    flex-wrap: wrap;
    gap: var(--tot-spacing-2x-small, .25rem);
    min-width: 0;
  }

  .two-towers.is-fullscreen .legend {
    max-height: min(30dvh, 10rem);
    overflow: auto;
  }

  .legend-item {
    align-items: center;
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    display: inline-flex;
    gap: var(--tot-spacing-2x-small, .25rem);
    max-width: 100%;
    min-width: 0;
    padding: var(--tot-spacing-3x-small, .125rem) var(--tot-spacing-x-small, .5rem);
    transition:
      background-color var(--tot-transition-fast, 150ms) ease,
      border-color var(--tot-transition-fast, 150ms) ease,
      opacity var(--tot-transition-fast, 150ms) ease;
  }

  .legend-item.is-active {
    background: var(--tot-color-primary-50, #f0f9ff);
    border-color: var(--tot-color-primary-400, #38bdf8);
  }

  .legend-item.is-dimmed {
    opacity: .7;
  }

  .legend-item.is-hidden {
    opacity: .46;
  }

  .legend-item.is-hidden .legend-label {
    text-decoration: line-through;
  }

  .legend-swatch {
    border: var(--tot-panel-border-width, 1px) solid color-mix(in srgb, var(--tot-two-towers-category-border-color) 40%, transparent);
    border-radius: var(--tot-border-radius-small, 3px);
    flex: 0 0 auto;
    height: .75rem;
    width: .75rem;
  }

  .legend-copy {
    min-width: 0;
  }

  .legend-label,
  .legend-subtitle {
    display: block;
    line-height: var(--tot-line-height-dense, 1.25);
    max-width: 17rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .legend-label {
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-font-size-x-small, .75rem);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .legend-subtitle {
    color: var(--tot-color-neutral-500, #64748b);
    font-size: var(--tot-font-size-2x-small, .625rem);
  }

  .tooltip {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    box-shadow: var(--tot-shadow-medium, 0 4px 12px rgb(15 23 42 / .14));
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-font-size-x-small, .75rem);
    left: 0;
    max-width: min(38rem, calc(100vw - 1rem));
    overflow: hidden;
    pointer-events: none;
    position: fixed;
    top: 0;
    z-index: 1000;
  }

  .tooltip[hidden] {
    display: none;
  }

  .tooltip table,
  .details-table table {
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;
    width: 100%;
  }

  .tooltip th,
  .tooltip td,
  .details-table th,
  .details-table td {
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    padding: var(--tot-spacing-3x-small, .125rem) var(--tot-spacing-x-small, .5rem);
    text-align: right;
    white-space: nowrap;
  }

  .tooltip th:first-child,
  .tooltip td:first-child,
  .details-table th:first-child,
  .details-table td:first-child {
    max-width: 19rem;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: normal;
  }

  .tooltip th,
  .details-table th {
    background: var(--tot-color-neutral-50, #f8fafc);
    color: var(--tot-color-neutral-500, #64748b);
    font-size: var(--tot-font-size-2x-small, .625rem);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .tooltip tr.total td,
  .details-table tr.total td {
    background: color-mix(in srgb, var(--tot-color-neutral-50, #f8fafc) 72%, transparent);
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-color-neutral-400, #94a3b8);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .tooltip tr.total td:first-child,
  .details-table tr.total td:first-child {
    font-weight: var(--tot-font-weight-bold, 700);
  }

  .tooltip tr.subcategory td:first-child,
  .details-table tr.subcategory td:first-child {
    padding-inline-start: var(--tot-spacing-medium, 1rem);
  }

  .tooltip .positive,
  .details-table .positive {
    color: var(--tot-color-success-700, #15803d);
  }

  .tooltip .negative,
  .details-table .negative {
    color: var(--tot-color-danger-700, #b91c1c);
  }

  .formula-panel {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border-right: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: none;
    grid-area: details;
    grid-template-rows: auto minmax(0, 1fr);
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }

  .two-towers.is-fullscreen.has-formula .formula-panel {
    display: grid;
  }

  .formula-panel-header {
    align-items: center;
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: flex;
    gap: var(--tot-spacing-small, .75rem);
    min-height: 2rem;
    padding: 0 var(--tot-spacing-x-small, .5rem);
  }

  .formula-panel-title {
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-font-size-x-small, .75rem);
    font-weight: var(--tot-font-weight-semibold, 600);
    margin-inline-end: auto;
  }

  .formula-simplified {
    align-items: center;
    color: var(--tot-color-neutral-600, #475569);
    display: inline-flex;
    font-size: var(--tot-font-size-2x-small, .625rem);
    gap: var(--tot-spacing-3x-small, .125rem);
    white-space: nowrap;
  }

  .formula-simplified input {
    margin: 0;
  }

  .formula-panel-scroll {
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--tot-spacing-2x-small, .25rem);
  }

  .formula-panel tot-formula::part(base) {
    border: 0;
    border-radius: 0;
  }

  .groups-panel {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border-right: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: none;
    grid-area: details;
    grid-template-rows: auto minmax(0, 1fr);
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }

  .two-towers.is-fullscreen.has-groups .groups-panel {
    display: grid;
  }

  .groups-panel-header {
    align-items: center;
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: flex;
    min-height: 2rem;
    padding: 0 var(--tot-spacing-x-small, .5rem);
  }

  .groups-panel-title {
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-font-size-x-small, .75rem);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .groups-panel-scroll {
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--tot-spacing-2x-small, .25rem);
  }

  .groups-tree,
  .groups-children {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .groups-tree {
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-font-size-x-small, .75rem);
    line-height: var(--tot-line-height-dense, 1.2);
  }

  .groups-node {
    min-width: 0;
  }

  .groups-row {
    align-items: start;
    border: var(--tot-panel-border-width, 1px) solid color-mix(in srgb, var(--tot-two-towers-category-border-color) 22%, transparent);
    border-radius: var(--tot-border-radius-small, 3px);
    display: grid;
    gap: 0 var(--tot-spacing-2x-small, .25rem);
    grid-template-columns: .9rem minmax(0, 1fr) minmax(0, max-content);
    margin: .08rem 0;
    min-width: 0;
    padding: .16rem .3rem;
  }

  .groups-row.has-group {
    background: var(--tot-two-towers-group-row-background);
  }

  .groups-row.is-hidden-group {
    background: color-mix(in srgb, var(--tot-color-neutral-100, #f1f5f9) 75%, transparent);
    border-style: dashed;
  }

  .groups-sign {
    font-family: var(--tot-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    font-weight: var(--tot-font-weight-bold, 700);
    line-height: 1rem;
    text-align: center;
  }

  .groups-sign.is-plus {
    color: var(--tot-color-success-700, #15803d);
  }

  .groups-sign.is-minus {
    color: var(--tot-color-danger-700, #b91c1c);
  }

  .groups-copy {
    min-width: 0;
  }

  .groups-name,
  .groups-tag {
    display: block;
    overflow-wrap: anywhere;
  }

  .groups-name {
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .groups-tag {
    color: color-mix(in srgb, currentColor 68%, transparent);
    font-family: var(--tot-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    font-size: var(--tot-font-size-2x-small, .625rem);
    line-height: 1.05;
  }

  .groups-category {
    align-items: center;
    align-self: center;
    background: color-mix(in srgb, var(--tot-panel-background-color, #fff) 76%, transparent);
    border-radius: var(--tot-border-radius-small, 3px);
    display: inline-flex;
    font-size: var(--tot-font-size-2x-small, .625rem);
    font-weight: var(--tot-font-weight-semibold, 600);
    gap: var(--tot-spacing-3x-small, .125rem);
    max-width: 13rem;
    padding: .08rem .25rem;
    white-space: normal;
  }

  .groups-category svg {
    flex: 0 0 auto;
    fill: none;
    height: .8rem;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
    width: .8rem;
  }

  .groups-children {
    border-left: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    margin-left: .45rem;
    padding-left: .35rem;
  }

  .groups-tree > .groups-node > .groups-children {
    border-left: 0;
  }

  .details-table {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border-right: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: none;
    grid-area: details;
    min-height: 0;
    min-width: 0;
    overflow: visible;
    position: relative;
  }

  .two-towers.is-fullscreen.has-details-table .details-table {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
  }

  .details-table-header {
    align-items: center;
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    display: flex;
    min-height: 2rem;
    padding: 0 var(--tot-spacing-x-small, .5rem);
  }

  .details-table-title {
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-font-size-x-small, .75rem);
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .details-table-scroll {
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
  }

  .details-table table {
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-font-size-x-small, .75rem);
  }

  .details-table thead th {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .details-table tr.total:not(:first-child) td {
    border-top: var(--tot-panel-border-width, 1px) solid var(--tot-color-neutral-300, #cbd5e1);
  }

  .details-resize-handle {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    border: 0;
    bottom: 0;
    cursor: ew-resize;
    margin: 0;
    padding: 0;
    position: absolute;
    right: -6px;
    top: 0;
    touch-action: none;
    width: 12px;
    z-index: 3;
  }

  .details-resize-handle::before {
    background: var(--tot-focus-ring-color, hsl(198.6 88.7% 48.4% / 45%));
    bottom: 0;
    content: '';
    opacity: 0;
    position: absolute;
    right: 5px;
    top: 0;
    transition: opacity var(--tot-transition-fast, 120ms);
    width: 2px;
  }

  .details-resize-handle:hover::before,
  .details-resize-handle:focus-visible::before,
  .details-table.is-resizing .details-resize-handle::before {
    opacity: 1;
  }

  .details-resize-handle:focus-visible {
    outline: none;
  }

  @media (pointer: coarse) {
    .details-resize-handle {
      right: -14px;
      width: 28px;
    }

    .details-resize-handle::before {
      right: 13px;
    }
  }

  @media (max-width: 48rem) {
    .two-towers.is-fullscreen.has-details-table,
    .two-towers.is-fullscreen.has-formula,
    .two-towers.is-fullscreen.has-groups {
      gap: 0;
      grid-template-areas: 'details';
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(0, 1fr);
      padding: 0;
    }

    .two-towers.is-fullscreen.has-details-table .chart,
    .two-towers.is-fullscreen.has-details-table .legend,
    .two-towers.is-fullscreen.has-formula .chart,
    .two-towers.is-fullscreen.has-formula .legend,
    .two-towers.is-fullscreen.has-groups .chart,
    .two-towers.is-fullscreen.has-groups .legend {
      display: none;
    }

    .two-towers.is-fullscreen.has-details-table .details-table,
    .two-towers.is-fullscreen.has-formula .formula-panel,
    .two-towers.is-fullscreen.has-groups .groups-panel {
      border: 0;
      height: 100dvh;
      width: 100vw;
    }

    .two-towers.is-fullscreen.has-details-table .details-table-header,
    .two-towers.is-fullscreen.has-formula .formula-panel-header,
    .two-towers.is-fullscreen.has-groups .groups-panel-header {
      padding-inline-end: 8.5rem;
    }

    .two-towers.is-fullscreen.has-details-table .details-resize-handle {
      display: none;
    }

    .groups-row {
      grid-template-columns: .9rem minmax(0, 1fr);
    }

    .groups-category {
      grid-column: 2;
      justify-self: start;
      max-width: 100%;
    }
  }

  @media (max-width: 36rem) {
    .legend {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .legend-item {
      width: 100%;
    }
  }

  @media (max-width: 24rem) {
    .legend {
      grid-template-columns: 1fr;
    }
  }
`


function markFullscreenOpen() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  window.__totFullscreenOpenCount = (window.__totFullscreenOpenCount || 0) + 1
  document.documentElement.setAttribute('data-tot-fullscreen-open', '')
}

function markFullscreenClosed() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  window.__totFullscreenOpenCount = Math.max(0, (window.__totFullscreenOpenCount || 0) - 1)
  if (window.__totFullscreenOpenCount === 0) {
    document.documentElement.removeAttribute('data-tot-fullscreen-open')
  }
}

function lockPageScroll() {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !document.body) {
    return
  }

  const state = getScrollLockState()
  if (state.count === 0) {
    state.scrollX = window.scrollX || window.pageXOffset || 0
    state.scrollY = window.scrollY || window.pageYOffset || 0
    state.documentOverflow = document.documentElement.style.overflow
    state.bodyOverflow = document.body.style.overflow
    state.bodyPosition = document.body.style.position
    state.bodyTop = document.body.style.top
    state.bodyLeft = document.body.style.left
    state.bodyRight = document.body.style.right
    state.bodyWidth = document.body.style.width
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${state.scrollY}px`
    document.body.style.left = `-${state.scrollX}px`
    document.body.style.right = '0'
    document.body.style.width = '100%'
  }

  state.count += 1
}

function unlockPageScroll() {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !document.body) {
    return
  }

  const state = getScrollLockState()
  state.count = Math.max(0, state.count - 1)
  if (state.count !== 0) {
    return
  }

  document.documentElement.style.overflow = state.documentOverflow || ''
  document.body.style.overflow = state.bodyOverflow || ''
  document.body.style.position = state.bodyPosition || ''
  document.body.style.top = state.bodyTop || ''
  document.body.style.left = state.bodyLeft || ''
  document.body.style.right = state.bodyRight || ''
  document.body.style.width = state.bodyWidth || ''
  window.scrollTo(state.scrollX || 0, state.scrollY || 0)
}

function getScrollLockState() {
  if (!window.__totFullscreenPreviewScrollLockState) {
    window.__totFullscreenPreviewScrollLockState = { count: 0 }
  }
  return window.__totFullscreenPreviewScrollLockState
}

function getEnterFullscreenIcon() {
  return `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M2.5 6v-3.5h3.5"></path>
    <path d="M10 2.5h3.5v3.5"></path>
    <path d="M2.5 10v3.5h3.5"></path>
    <path d="M10 13.5h3.5v-3.5"></path>
  </svg>`
}

function getExitFullscreenIcon() {
  return `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M2.5 6h3.5v-3.5"></path>
    <path d="M13.5 6h-3.5v-3.5"></path>
    <path d="M2.5 10h3.5v3.5"></path>
    <path d="M13.5 10h-3.5v3.5"></path>
  </svg>`
}

function getDetailsTableIcon() {
  return `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <rect x="2.5" y="3" width="11" height="10" rx="1"></rect>
    <path d="M2.5 6.5h11M2.5 10h11M7 3v10"></path>
  </svg>`
}

function getFormulaIcon() {
  return `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <text x="7.4" y="12.4" fill="currentColor" stroke="none" font-family="Georgia, Times New Roman, serif" font-size="15" font-style="italic" font-weight="700">f</text>
  </svg>`
}

function getGroupsIcon() {
  return `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <rect x="2.5" y="2.5" width="4.5" height="4.5" rx=".6"></rect>
    <rect x="9" y="2.5" width="4.5" height="4.5" rx=".6"></rect>
    <rect x="5.75" y="9" width="4.5" height="4.5" rx=".6"></rect>
  </svg>`
}

function getHiddenGroupIcon() {
  return `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M2 2l12 12"></path>
    <path d="M6.2 4.2A7.9 7.9 0 0 1 8 4c3.4 0 5.6 2.7 6.2 4-.3.7-1.1 1.8-2.2 2.6"></path>
    <path d="M9.7 11.8A8.3 8.3 0 0 1 8 12C4.6 12 2.4 9.3 1.8 8c.3-.6 1-1.6 2-2.4"></path>
  </svg>`
}

const svgNamespace = 'http://www.w3.org/2000/svg'
const defaultColors = [
  'var(--tot-two-towers-series-color-1)',
  'var(--tot-two-towers-series-color-2)',
  'var(--tot-two-towers-series-color-3)',
  'var(--tot-two-towers-series-color-4)',
  'var(--tot-two-towers-series-color-5)',
  'var(--tot-two-towers-series-color-6)',
]

function finiteNumber(value, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function positiveNumber(value, fallback) {
  const number = finiteNumber(value, fallback)
  return number > 0 ? number : fallback
}

function escapeKey(value) {
  return String(value || 'item').replace(/[^a-z0-9_-]/gi, '-')
}

function tagHookToken(tag) {
  const value = String(tag || '').trim()
  return value ? `tag-${value.replace(/[^a-z0-9_-]/gi, '-')}` : ''
}

function applyTagHooks(element, tags, basePart = '') {
  const parts = basePart ? [basePart] : []
  const seen = new Set(parts)

  for (let i = 0; i < tags.length; i++) {
    const tag = String(tags[i] || '').trim()
    if (!tag) {
      continue
    }
    const rawClass = !/\s/.test(tag) ? tag : ''
    const rawPart = /^[a-z_][a-z0-9_-]*$/i.test(tag) ? tag : ''
    const token = tagHookToken(tag)
    const classTokens = rawClass ? [rawClass, token] : [token]
    const partTokens = rawPart ? [rawPart, token] : [token]

    for (let tokenIndex = 0; tokenIndex < classTokens.length; tokenIndex++) {
      const currentToken = classTokens[tokenIndex]
      if (currentToken) {
        element.classList.add(currentToken)
      }
    }
    for (let tokenIndex = 0; tokenIndex < partTokens.length; tokenIndex++) {
      const currentToken = partTokens[tokenIndex]
      if (!currentToken || seen.has(currentToken)) {
        continue
      }
      seen.add(currentToken)
      parts.push(currentToken)
    }
  }

  if (parts.length) {
    element.setAttribute('part', parts.join(' '))
  }
}

function createSvgElement(name, attributes = {}, text = '') {
  const element = document.createElementNS(svgNamespace, name)
  const entries = Object.entries(attributes)

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i]
    if (value === undefined || value === null) {
      continue
    }
    element.setAttribute(key, String(value))
  }

  if (text) {
    element.textContent = text
  }

  return element
}

function sum(values) {
  let total = 0
  for (let i = 0; i < values.length; i++) {
    total += finiteNumber(values[i])
  }
  return total
}

function normalizeDisplay(display) {
  const source = display && typeof display === 'object' ? display : {}
  const normalizeValue = (value) => {
    if (typeof value === 'string') {
      return value
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value
    }
    return undefined
  }

  return {
    current: normalizeValue(source.current),
    previous: normalizeValue(source.previous),
  }
}

function normalizeSubcategory(subcategory, categoryIndex, index) {
  const source = subcategory && typeof subcategory === 'object' ? subcategory : {}
  const current = source.current === undefined ? source.value : source.current
  const name = source.name || source.label || source.shortName || source.abbreviation || `Subcategory ${index + 1}`

  return {
    key: source.key || `category-${categoryIndex + 1}-subcategory-${index + 1}`,
    name,
    shortName: source.shortName || source.short || source.abbreviation || '',
    tag: String(source.tag || '').trim(),
    current: finiteNumber(current),
    previous: source.previous === undefined ? undefined : finiteNumber(source.previous),
    display: normalizeDisplay(source.display),
  }
}

function normalizeCategory(category, index) {
  const source = category && typeof category === 'object' ? category : {}
  const name = source.name || source.label || source.shortName || source.abbreviation || `Category ${index + 1}`
  const rawSubcategories = Array.isArray(source.subcategories) ? source.subcategories : []
  const subcategories = []

  for (let i = 0; i < rawSubcategories.length; i++) {
    subcategories.push(normalizeSubcategory(rawSubcategories[i], index, i))
  }

  if (!subcategories.length && (source.current !== undefined || source.value !== undefined)) {
    subcategories.push(normalizeSubcategory({
      key: `${source.key || `category-${index + 1}`}-value`,
      name,
      shortName: source.shortName || source.short || source.abbreviation || '',
      tag: source.tag,
      current: source.current === undefined ? source.value : source.current,
      previous: source.previous,
      display: source.display,
    }, index, 0))
  }

  return {
    key: source.key || `category-${index + 1}`,
    name,
    shortName: source.shortName || source.short || source.abbreviation || '',
    tag: String(source.tag || '').trim(),
    color: source.color || defaultColors[index % defaultColors.length],
    display: normalizeDisplay(source.display),
    subcategories,
  }
}

function signMultiplier(sign) {
  return sign === '-' ? -1 : 1
}

function normalizeValueDictionary(value) {
  const source = value && typeof value === 'object' ? value : {}
  const result = {}
  const entries = Object.entries(source)

  for (let i = 0; i < entries.length; i++) {
    const [tag, rawValue] = entries[i]
    const number = Number(rawValue)
    if (Number.isFinite(number)) {
      result[tag] = number
    }
  }

  return result
}

function buildFormulaNodes(items) {
  const roots = []
  const byTag = new Map()
  let order = 0

  const visit = (item, parent, effectiveSign, depth) => {
    const source = item && typeof item === 'object' ? item : {}
    const tag = String(source.tag || '').trim()
    const children = []
    const node = {
      name: source.name || source.shortName || tag || 'Item',
      shortName: source.shortName || '',
      tag,
      sign: source.sign === '-' ? '-' : '+',
      effectiveSign,
      parent,
      children,
      depth,
      order: order++,
    }
    const rawChildren = Array.isArray(source.items) ? source.items : []

    if (tag) {
      if (!byTag.has(tag)) {
        byTag.set(tag, [])
      }
      byTag.get(tag).push(node)
    }

    for (let i = 0; i < rawChildren.length; i++) {
      const child = rawChildren[i]
      children.push(visit(
        child,
        node,
        effectiveSign * signMultiplier(child?.sign),
        depth + 1,
      ))
    }

    return node
  }

  const rawRoots = Array.isArray(items) ? items : []
  for (let i = 0; i < rawRoots.length; i++) {
    roots.push(visit(rawRoots[i], null, 1, 0))
  }

  return { roots, byTag }
}

function normalizeGroup(group, tag, index, formulaNodes) {
  const source = typeof group === 'string'
    ? { color: group }
    : group && typeof group === 'object'
      ? group
      : {}
  const nodes = formulaNodes.byTag.get(tag) || []
  const node = nodes[0]

  return {
    tag,
    key: tag,
    name: source.name || node?.name || tag,
    shortName: source.shortName || node?.shortName || '',
    color: source.color || defaultColors[index % defaultColors.length],
    valueTag: String(source.valueTag || '').trim(),
    group: String(source.group || '').trim(),
    hidden: source.hidden === true,
    node,
  }
}

function resolvedFormulaGroup(group, groupMap) {
  let current = group
  const visited = new Set()

  while (current?.group && !visited.has(current.tag)) {
    visited.add(current.tag)
    const next = groupMap.get(current.group)
    if (!next) {
      break
    }
    current = next
  }

  return current
}

function formulaLeaves(roots) {
  const leaves = []
  const visit = (node) => {
    if (!node.children.length) {
      leaves.push(node)
      return
    }
    for (let i = 0; i < node.children.length; i++) {
      visit(node.children[i])
    }
  }

  for (let i = 0; i < roots.length; i++) {
    visit(roots[i])
  }
  return leaves
}

function nearestFormulaGroup(node, groupMap) {
  let current = node
  while (current) {
    if (current.tag && groupMap.has(current.tag)) {
      return resolvedFormulaGroup(groupMap.get(current.tag), groupMap)
    }
    current = current.parent
  }
  return null
}

function valueForTag(values, tag) {
  return Object.prototype.hasOwnProperty.call(values, tag) ? values[tag] : undefined
}

function buildFormulaCategories(source) {
  const formula = source.formula && typeof source.formula === 'object' ? source.formula : {}
  const formulaNodes = buildFormulaNodes(formula.items)
  const values = normalizeValueDictionary(source.values)
  const previousValues = source.previousValues === undefined
    ? null
    : normalizeValueDictionary(source.previousValues)
  const rawGroups = source.groups && typeof source.groups === 'object' ? source.groups : {}
  const groupEntries = Object.entries(rawGroups)
  const groups = []
  const groupMap = new Map()

  for (let i = 0; i < groupEntries.length; i++) {
    const [tag, groupValue] = groupEntries[i]
    if (!tag) {
      continue
    }
    const group = normalizeGroup(groupValue, tag, groups.length, formulaNodes)
    if (!group.node) {
      continue
    }
    groups.push(group)
    groupMap.set(tag, group)
  }

  const members = new Map()
  for (let i = 0; i < groups.length; i++) {
    const group = resolvedFormulaGroup(groups[i], groupMap)
    if (!group.hidden && !group.group && !members.has(group.tag)) {
      members.set(group.tag, [])
    }
  }

  const leaves = formulaLeaves(formulaNodes.roots)
  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i]
    const group = nearestFormulaGroup(leaf, groupMap)
    if (!group || group.hidden || group.group || !members.has(group.tag) || !leaf.tag) {
      continue
    }

    const rawCurrent = valueForTag(values, leaf.tag)
    if (rawCurrent === undefined) {
      continue
    }
    const rawPrevious = previousValues ? valueForTag(previousValues, leaf.tag) : undefined
    const groupSign = group.node?.effectiveSign || 1
    const relativeSign = leaf.effectiveSign / groupSign
    members.get(group.tag).push({
      leaf,
      rawCurrent,
      rawPrevious,
      relativeSign,
    })
  }

  const categories = []
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]
    if (group.hidden || group.group) {
      continue
    }
    const groupMembers = members.get(group.tag) || []
    if (!groupMembers.length) {
      continue
    }

    const subcategories = []
    let currentDisplay = 0
    let previousDisplay = 0
    let hasPreviousDisplay = false

    for (let memberIndex = 0; memberIndex < groupMembers.length; memberIndex++) {
      const member = groupMembers[memberIndex]
      const leaf = member.leaf
      const rawPrevious = member.rawPrevious
      currentDisplay += member.relativeSign * member.rawCurrent
      if (rawPrevious !== undefined) {
        previousDisplay += member.relativeSign * rawPrevious
        hasPreviousDisplay = true
      }

      subcategories.push({
        key: leaf.tag || `${group.tag}-item-${memberIndex + 1}`,
        name: leaf.name,
        shortName: leaf.shortName,
        tag: leaf.tag,
        current: leaf.effectiveSign * member.rawCurrent,
        previous: rawPrevious === undefined ? undefined : leaf.effectiveSign * rawPrevious,
        display: {
          current: member.rawCurrent,
          previous: rawPrevious,
        },
      })
    }

    const summaryTag = group.valueTag || ''
    if (summaryTag) {
      const summaryCurrent = valueForTag(values, summaryTag)
      const summaryPrevious = previousValues ? valueForTag(previousValues, summaryTag) : undefined
      if (summaryCurrent !== undefined) {
        currentDisplay = summaryCurrent
      }
      if (summaryPrevious !== undefined) {
        previousDisplay = summaryPrevious
        hasPreviousDisplay = true
      }
    }

    categories.push({
      key: group.key,
      name: group.name,
      shortName: group.shortName,
      tag: group.tag,
      color: group.color,
      display: {
        current: currentDisplay,
        previous: hasPreviousDisplay ? previousDisplay : undefined,
      },
      subcategories,
    })
  }

  return categories
}

function normalizeConfig(value) {
  const source = value && typeof value === 'object' ? value : {}
  let categories = []
  if (source.formula && source.groups) {
    categories = buildFormulaCategories(source)
  } else if (Array.isArray(source.categories)) {
    for (let i = 0; i < source.categories.length; i++) {
      categories.push(normalizeCategory(source.categories[i], i))
    }
  }
  const periods = source.periods && typeof source.periods === 'object'
    ? source.periods
    : {}

  const formula = source.formula && typeof source.formula === 'object'
    ? source.formula
    : { items: [] }

  return {
    label: source.label || 'Two towers visualization',
    orientation: source.orientation === 'horizontal' ? 'horizontal' : 'vertical',
    compare: source.compare !== false,
    tearThreshold: Math.max(1.01, positiveNumber(source.tearThreshold, 1.5)),
    positiveLabel: source.positiveLabel || 'Positive',
    negativeLabel: source.negativeLabel || 'Negative',
    periods: {
      current: periods.current || 'Current',
      previous: periods.previous || 'Previous',
    },
    formula: {
      title: formula.title == null ? '' : String(formula.title),
      items: Array.isArray(formula.items) ? formula.items : [],
    },
    values: normalizeValueDictionary(source.values),
    groups: source.groups && typeof source.groups === 'object' ? { ...source.groups } : {},
    categories,
  }
}

function createGroupsPresentation(config, handlers = {}) {
  const formulaNodes = buildFormulaNodes(config.formula.items)
  const groupEntries = Object.entries(config.groups || {})
  const groupMap = new Map()

  for (let i = 0; i < groupEntries.length; i++) {
    const [tag, groupValue] = groupEntries[i]
    if (!tag) {
      continue
    }
    const group = normalizeGroup(groupValue, tag, i, formulaNodes)
    if (group.node) {
      groupMap.set(tag, group)
    }
  }

  const groupForNode = (node) => {
    const direct = node.tag ? groupMap.get(node.tag) : null
    if (direct) {
      const resolved = resolvedFormulaGroup(direct, groupMap)
      return {
        group: resolved,
        hidden: direct.hidden || resolved?.hidden === true,
      }
    }

    const found = new Map()
    const visitLeaves = (current) => {
      if (!current.children.length) {
        const group = nearestFormulaGroup(current, groupMap)
        if (group) {
          found.set(group.tag, group)
        }
        return
      }
      for (let i = 0; i < current.children.length; i++) {
        visitLeaves(current.children[i])
      }
    }
    visitLeaves(node)

    if (found.size !== 1) {
      return { group: null, hidden: false }
    }
    const group = found.values().next().value
    return { group, hidden: group?.hidden === true }
  }

  const list = document.createElement('ul')
  list.className = 'groups-tree'

  const appendNode = (node, container) => {
    const item = document.createElement('li')
    item.className = 'groups-node'

    const row = document.createElement('div')
    row.className = 'groups-row'
    applyTagHooks(row, [node.tag], 'groups-item')

    const sign = document.createElement('span')
    sign.className = `groups-sign ${node.sign === '-' ? 'is-minus' : 'is-plus'}`
    sign.textContent = node.sign

    const copy = document.createElement('span')
    copy.className = 'groups-copy'
    const name = document.createElement('span')
    name.className = 'groups-name'
    name.textContent = node.name
    const tag = document.createElement('span')
    tag.className = 'groups-tag'
    tag.textContent = node.tag
    copy.append(name, tag)

    const mapping = groupForNode(node)
    const category = document.createElement('span')
    category.className = 'groups-category'
    if (mapping.hidden) {
      row.classList.add('is-hidden-group')
      category.innerHTML = getHiddenGroupIcon()
      const label = document.createElement('span')
      label.textContent = 'Hidden'
      category.append(label)
    } else if (mapping.group) {
      row.classList.add('has-group')
      row.style.setProperty('--tot-two-towers-group-row-background', mapping.group.color)
      category.textContent = mapping.group.shortName
        ? `${mapping.group.shortName} — ${mapping.group.name}`
        : mapping.group.name
    } else {
      category.textContent = 'No group'
    }

    row.append(sign, copy, category)
    item.append(row)

    row.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') {
        handlers.hover?.(node.tag)
      }
    })
    row.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'touch') {
        handlers.unhover?.(node.tag)
      }
    })
    row.addEventListener('click', () => handlers.click?.(node.tag))

    if (node.children.length) {
      const children = document.createElement('ul')
      children.className = 'groups-children'
      for (let i = 0; i < node.children.length; i++) {
        appendNode(node.children[i], children)
      }
      item.append(children)
    }

    container.append(item)
  }

  for (let i = 0; i < formulaNodes.roots.length; i++) {
    appendNode(formulaNodes.roots[i], list)
  }

  return list
}

function configuredGroupHidden(config, tag) {
  const group = config.groups?.[tag]
  return Boolean(group && typeof group === 'object' && group.hidden === true)
}

function descendantLeafTagsForFormulaTag(config, tag) {
  const tags = new Set()
  if (!tag) {
    return tags
  }

  const formulaNodes = buildFormulaNodes(config.formula.items)
  const nodes = formulaNodes.byTag.get(tag) || []
  const visit = node => {
    if (!node.children.length) {
      if (node.tag) {
        tags.add(node.tag)
      }
      return
    }
    for (let i = 0; i < node.children.length; i++) {
      visit(node.children[i])
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    visit(nodes[i])
  }
  return tags
}

function categorySubtitle(category) {
  const labels = []
  for (let i = 0; i < category.subcategories.length; i++) {
    const subcategory = category.subcategories[i]
    labels.push(subcategory.shortName || subcategory.name)
  }
  return labels.join(' · ')
}

function parseDisplayNumber(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined
  }
  if (typeof value !== 'string') {
    return undefined
  }

  const text = value.trim()
  if (!text) {
    return undefined
  }

  const parenthesized = /^\(.*\)$/.test(text)
  const normalized = text
    .replace(/^\(|\)$/g, '')
    .replace(/[,$\s]/g, '')
  if (!/^[-+]?\d+(?:\.\d+)?$/.test(normalized)) {
    return undefined
  }

  const number = Number(normalized)
  if (!Number.isFinite(number)) {
    return undefined
  }
  return parenthesized ? -Math.abs(number) : number
}

function displayNumber(displayValue, rawValue) {
  if (displayValue === undefined) {
    return rawValue === undefined ? undefined : finiteNumber(rawValue)
  }
  return parseDisplayNumber(displayValue)
}

function formatDisplayValue(displayValue, rawValue) {
  if (displayValue !== undefined) {
    return typeof displayValue === 'number' ? formatNumber(displayValue) : displayValue
  }
  return rawValue === undefined ? '—' : formatNumber(rawValue)
}

function categoryDisplayNumber(category, period) {
  const explicit = category.display?.[period]
  if (explicit !== undefined) {
    return displayNumber(explicit, undefined)
  }

  let total = 0
  let hasValue = false
  for (let i = 0; i < category.subcategories.length; i++) {
    const subcategory = category.subcategories[i]
    const rawValue = period === 'current' ? subcategory.current : subcategory.previous
    if (rawValue === undefined) {
      continue
    }
    const value = displayNumber(subcategory.display?.[period], rawValue)
    if (value === undefined) {
      return undefined
    }
    total += value
    hasValue = true
  }
  return hasValue ? total : undefined
}

function categoryDisplayValue(category, period) {
  const explicit = category.display?.[period]
  if (explicit !== undefined) {
    return formatDisplayValue(explicit, undefined)
  }

  const number = categoryDisplayNumber(category, period)
  return number === undefined ? '—' : formatNumber(number)
}

function categorySideMagnitude(category, towerIndex) {
  let total = 0
  for (let i = 0; i < category.subcategories.length; i++) {
    const current = category.subcategories[i].current
    if ((towerIndex === 0 && current > 0) || (towerIndex === 1 && current < 0)) {
      total += Math.abs(current)
    }
  }
  return total
}

function formatNumber(value) {
  const absolute = Math.abs(finiteNumber(value))
  const maximumFractionDigits = absolute >= 1000 ? 0 : absolute >= 100 ? 1 : 2
  return new Intl.NumberFormat(undefined, { maximumFractionDigits }).format(value)
}

function formatSignedNumber(value) {
  if (value === undefined) {
    return '—'
  }

  const number = finiteNumber(value)
  return `${number > 0 ? '+' : ''}${formatNumber(number)}`
}

function formatDeltaPercent(current, previous) {
  if (previous === undefined || Math.abs(previous) < 1e-9) {
    return '—'
  }

  const percent = (current - previous) / Math.abs(previous) * 100
  return `${percent > 0 ? '+' : ''}${formatNumber(percent)}%`
}

function createTooltipTable(category, periods) {
  const table = createComparisonTable(periods)
  appendCategoryRows(table.querySelector('tbody'), category)
  return table
}

function createComparisonTable(periods) {
  const table = document.createElement('table')
  const head = document.createElement('thead')
  const headRow = document.createElement('tr')
  const headings = ['', periods.current, periods.previous, 'Δ', 'Δ %']

  for (let i = 0; i < headings.length; i++) {
    const cell = document.createElement('th')
    cell.textContent = headings[i]
    headRow.append(cell)
  }

  head.append(headRow)
  table.append(head, document.createElement('tbody'))
  return table
}

function appendCategoryRows(body, category) {
  const current = categoryDisplayNumber(category, 'current')
  const previous = categoryDisplayNumber(category, 'previous')
  appendTooltipRow(
    body,
    category.name,
    current,
    previous,
    true,
    categoryDisplayValue(category, 'current'),
    categoryDisplayValue(category, 'previous'),
    [category.tag],
  )

  for (let i = 0; i < category.subcategories.length; i++) {
    const subcategory = category.subcategories[i]
    const subcategoryCurrent = displayNumber(subcategory.display?.current, subcategory.current)
    const subcategoryPrevious = displayNumber(subcategory.display?.previous, subcategory.previous)
    appendTooltipRow(
      body,
      subcategory.name,
      subcategoryCurrent,
      subcategoryPrevious,
      false,
      formatDisplayValue(subcategory.display?.current, subcategory.current),
      formatDisplayValue(subcategory.display?.previous, subcategory.previous),
      [category.tag, subcategory.tag],
    )
  }
}

function appendTooltipRow(body, label, current, previous, total, currentText, previousText, tags = []) {
  const row = document.createElement('tr')
  applyTagHooks(row, tags)
  row.classList.toggle('total', total)
  row.classList.toggle('subcategory', !total)
  const delta = current === undefined || previous === undefined ? undefined : current - previous
  const values = [
    label,
    currentText ?? (current === undefined ? '—' : formatNumber(current)),
    previousText ?? (previous === undefined ? '—' : formatNumber(previous)),
    formatSignedNumber(delta),
    current === undefined ? '—' : formatDeltaPercent(current, previous),
  ]

  for (let i = 0; i < values.length; i++) {
    const cell = document.createElement('td')
    cell.textContent = values[i]
    if (i >= 3 && delta !== undefined) {
      cell.classList.toggle('positive', delta > 0)
      cell.classList.toggle('negative', delta < 0)
    }
    row.append(cell)
  }

  body.append(row)
}

function createFullDetailsTable(config) {
  const table = createComparisonTable(config.periods)
  const body = table.querySelector('tbody')

  for (let i = 0; i < config.categories.length; i++) {
    appendCategoryRows(body, config.categories[i])
  }

  return table
}

function currentRegion(orientation, side, geometry, fraction) {
  const clamped = Math.max(0, Math.min(1, fraction))
  const { x, y, width, height } = geometry

  if (orientation === 'vertical') {
    const regionWidth = width * clamped
    return side === 'left'
      ? { x: x + width - regionWidth, y, width: regionWidth, height }
      : { x, y, width: regionWidth, height }
  }

  const regionHeight = height * clamped
  return side === 'top'
    ? { x, y: y + height - regionHeight, width, height: regionHeight }
    : { x, y, width, height: regionHeight }
}

function outerCurrentRegion(orientation, side, geometry, fraction) {
  const clamped = Math.max(0, Math.min(1, fraction))
  const { x, y, width, height } = geometry

  if (orientation === 'vertical') {
    const regionWidth = width * clamped
    return side === 'left'
      ? { x, y, width: regionWidth, height }
      : { x: x + width - regionWidth, y, width: regionWidth, height }
  }

  const regionHeight = height * clamped
  return side === 'top'
    ? { x, y, width, height: regionHeight }
    : { x, y: y + height - regionHeight, width, height: regionHeight }
}

function protrudingRegion(orientation, side, geometry, size) {
  const { x, y, width, height } = geometry

  if (orientation === 'vertical') {
    return side === 'left'
      ? { x: x - size, y, width: size, height }
      : { x: x + width, y, width: size, height }
  }

  return side === 'top'
    ? { x, y: y - size, width, height: size }
    : { x, y: y + height, width, height: size }
}

function appendRect(svg, attributes, categoryKey, registry, tags = []) {
  const rect = createSvgElement('rect', attributes)
  rect.classList.add('category-shape')
  applyTagHooks(rect, tags)
  svg.append(rect)
  registerShape(categoryKey, rect, registry)
  return rect
}

function registerShape(categoryKey, element, registry) {
  if (!registry.has(categoryKey)) {
    registry.set(categoryKey, [])
  }
  registry.get(categoryKey).push(element)
}

function setTargetHighlight(activeShapes, activeCategoryKeys, registry, legendRegistry, dimLegend = false) {
  const hasHighlight = activeShapes.size > 0 || activeCategoryKeys.size > 0
  const shapeEntries = Array.from(registry.entries())
  for (let i = 0; i < shapeEntries.length; i++) {
    const shapes = shapeEntries[i][1]
    for (let j = 0; j < shapes.length; j++) {
      const shape = shapes[j]
      const baseOpacity = shape.dataset.baseOpacity || '1'
      shape.setAttribute('opacity', hasHighlight && !activeShapes.has(shape) ? '.28' : baseOpacity)
    }
  }

  const legendEntries = Array.from(legendRegistry.entries())
  for (let i = 0; i < legendEntries.length; i++) {
    const [legendKey, element] = legendEntries[i]
    const active = activeCategoryKeys.has(legendKey)
    element.classList.toggle('is-active', active)
    element.classList.toggle('is-dimmed', dimLegend && hasHighlight && !active)
  }
}

function setHighlight(key, registry, legendRegistry) {
  const activeShapes = new Set(key ? registry.get(key) || [] : [])
  const activeCategoryKeys = new Set(key ? [key] : [])
  setTargetHighlight(activeShapes, activeCategoryKeys, registry, legendRegistry)
}

function addPattern(id, color) {
  const pattern = createSvgElement('pattern', {
    id,
    width: 9,
    height: 9,
    patternUnits: 'userSpaceOnUse',
    patternTransform: 'rotate(135)',
  })

  pattern.append(
    createSvgElement('rect', {
      width: 9,
      height: 9,
      fill: color,
    }),
    createSvgElement('line', {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 9,
      stroke: 'var(--tot-two-towers-hatch-color)',
      'stroke-width': 2.25,
    }),
  )

  return pattern
}

function drawTear(svg, options) {
  const {
    orientation,
    side,
    normalEdge,
    tearDistance,
    axisStart,
    axisLength,
    stroke,
  } = options

  if (axisLength <= 0 || tearDistance < 6) {
    return
  }

  const center = orientation === 'vertical'
    ? side === 'left'
      ? normalEdge - tearDistance
      : normalEdge + tearDistance
    : side === 'top'
      ? normalEdge - tearDistance
      : normalEdge + tearDistance
  const gap = 7
  const amplitude = 3
  const wavelength = 28
  const sampleCount = Math.max(4, Math.ceil(axisLength / 6))
  const edgeA = []
  const edgeB = []

  for (let i = 0; i <= sampleCount; i++) {
    const ratio = i / sampleCount
    const along = axisStart + axisLength * ratio
    const wave = Math.sin(along / wavelength * Math.PI * 2) * amplitude

    if (orientation === 'vertical') {
      edgeA.push({ x: center - gap / 2 + wave, y: along })
      edgeB.push({ x: center + gap / 2 + wave, y: along })
    } else {
      edgeA.push({ x: along, y: center - gap / 2 + wave })
      edgeB.push({ x: along, y: center + gap / 2 + wave })
    }
  }

  const erasePadding = 2
  const eraseAxisStart = axisStart - erasePadding
  const eraseAxisLength = axisLength + erasePadding * 2
  const eraseSampleCount = Math.max(4, Math.ceil(eraseAxisLength / 6))
  const eraseEdgeA = []
  const eraseEdgeB = []

  for (let i = 0; i <= eraseSampleCount; i++) {
    const ratio = i / eraseSampleCount
    const along = eraseAxisStart + eraseAxisLength * ratio
    const wave = Math.sin(along / wavelength * Math.PI * 2) * amplitude

    if (orientation === 'vertical') {
      eraseEdgeA.push({ x: center - gap / 2 + wave, y: along })
      eraseEdgeB.push({ x: center + gap / 2 + wave, y: along })
    } else {
      eraseEdgeA.push({ x: along, y: center - gap / 2 + wave })
      eraseEdgeB.push({ x: along, y: center + gap / 2 + wave })
    }
  }

  const pathA = pointsPath(edgeA)
  const pathB = pointsPath(edgeB)
  const reversedEraseEdgeB = eraseEdgeB.slice().reverse()
  const ribbon = `${pointsPath(eraseEdgeA)} L ${reversedEraseEdgeB[0].x} ${reversedEraseEdgeB[0].y} ${pointsPath(reversedEraseEdgeB, false)} Z`

  svg.append(
    createSvgElement('path', {
      d: ribbon,
      fill: 'var(--tot-two-towers-tear-background-color)',
      stroke: 'none',
      'pointer-events': 'none',
    }),
    createSvgElement('path', {
      d: pathA,
      fill: 'none',
      stroke,
      'stroke-width': 1.3,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'pointer-events': 'none',
    }),
    createSvgElement('path', {
      d: pathB,
      fill: 'none',
      stroke,
      'stroke-width': 1.3,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'pointer-events': 'none',
    }),
  )
}

function pointsPath(points, move = true) {
  if (!points.length) {
    return ''
  }

  let path = move ? `M ${points[0].x} ${points[0].y}` : ''
  for (let i = move ? 1 : 0; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`
  }
  return path
}

function appendPaleOverlay(svg, category, subcategory, region, registry, opacity = .45) {
  if (region.width <= 0 || region.height <= 0) {
    return
  }

  const overlay = appendRect(svg, {
    x: region.x,
    y: region.y,
    width: region.width,
    height: region.height,
    fill: 'var(--tot-two-towers-delta-overlay-color)',
    stroke: 'none',
    opacity,
    'shape-rendering': 'crispEdges',
  }, category.key, registry, [category.tag, subcategory?.tag])
  overlay.dataset.baseOpacity = String(opacity)
}

function appendHatchedRegion(svg, category, subcategory, region, patternId, registry, withBorder = false) {
  if (region.width <= 0 || region.height <= 0) {
    return
  }

  const rect = appendRect(svg, {
    x: region.x,
    y: region.y,
    width: region.width,
    height: region.height,
    fill: `url(#${patternId})`,
    stroke: withBorder ? 'var(--tot-two-towers-category-border-color)' : 'none',
    'stroke-width': withBorder ? 1 : 0,
    opacity: .94,
  }, category.key, registry, [category.tag, subcategory?.tag])
  rect.dataset.baseOpacity = '.94'
}

function appendPaleProtrusion(svg, category, subcategory, region, registry) {
  const base = appendRect(svg, {
    x: region.x,
    y: region.y,
    width: region.width,
    height: region.height,
    fill: category.color,
    stroke: 'var(--tot-two-towers-category-border-color)',
    'stroke-width': 1,
    opacity: .88,
  }, category.key, registry, [category.tag, subcategory?.tag])
  base.dataset.baseOpacity = '.88'
  appendPaleOverlay(svg, category, subcategory, region, registry, .5)
}

function drawComparison(svg, options) {
  const {
    category,
    subcategory,
    geometry,
    orientation,
    side,
    compare,
    tearThreshold,
    maxProtrusion,
    patternId,
    registry,
  } = options
  const currentRaw = subcategory.current
  const previousRaw = subcategory.previous
  const current = Math.abs(currentRaw)

  if (!compare || previousRaw === undefined || current <= 1e-9) {
    return
  }

  const previous = Math.abs(previousRaw)
  const sameSign = previous <= 1e-9 || Math.sign(previousRaw) === Math.sign(currentRaw)
  const crossSize = orientation === 'vertical' ? geometry.width : geometry.height

  if (previous <= current) {
    const previousFraction = previous / current

    if (!sameSign && previousFraction > 1e-6) {
      appendHatchedRegion(
        svg,
        category,
        subcategory,
        currentRegion(orientation, side, geometry, previousFraction),
        patternId,
        registry,
      )
    }

    const deltaFraction = 1 - previousFraction
    if (deltaFraction > 1e-6) {
      appendPaleOverlay(
        svg,
        category,
        subcategory,
        outerCurrentRegion(orientation, side, geometry, deltaFraction),
        registry,
      )
    }
    return
  }

  const ratio = previous / current
  const rawSize = crossSize * (ratio - 1)
  const torn = ratio > tearThreshold
  const thresholdSize = crossSize * Math.max(0, tearThreshold - 1)
  const visibleSize = torn
    ? Math.min(maxProtrusion, Math.max(8, thresholdSize))
    : rawSize
  const region = protrudingRegion(orientation, side, geometry, visibleSize)

  if (sameSign) {
    appendPaleProtrusion(svg, category, subcategory, region, registry)
  } else {
    appendHatchedRegion(svg, category, subcategory, region, patternId, registry, true)
  }

  if (torn) {
    const normalEdge = orientation === 'vertical'
      ? side === 'left'
        ? geometry.x
        : geometry.x + geometry.width
      : side === 'top'
        ? geometry.y
        : geometry.y + geometry.height

    drawTear(svg, {
      orientation,
      side,
      normalEdge,
      tearDistance: Math.min(58, Math.max(18, maxProtrusion * .42)),
      axisStart: orientation === 'vertical' ? geometry.y : geometry.x,
      axisLength: orientation === 'vertical' ? geometry.height : geometry.width,
      stroke: 'var(--tot-two-towers-category-border-color)',
    })
  }
}

function drawOutline(svg, geometry, width = 1, color = 'var(--tot-two-towers-category-border-color)', tags = []) {
  const { x, y, height, width: rectWidth } = geometry
  const outline = createSvgElement('rect', {
    x,
    y,
    width: rectWidth,
    height,
    fill: 'none',
    stroke: color,
    'stroke-width': width,
    'pointer-events': 'none',
    'shape-rendering': 'crispEdges',
  })
  applyTagHooks(outline, tags)
  svg.append(outline)
}

function drawSubcategoryLabel(svg, category, subcategory, geometry, orientation) {
  const current = Math.abs(subcategory.current)
  if (current <= 0) {
    return
  }

  const mainPixels = orientation === 'vertical' ? geometry.height : geometry.width
  if (mainPixels < (orientation === 'vertical' ? 9 : 18)) {
    return
  }

  const fontSize = mainPixels < (orientation === 'vertical' ? 14 : 30) ? 7 : 8.5
  const y = geometry.y + Math.min(11, Math.max(7, geometry.height - 2))
  const common = {
    fill: 'var(--tot-input-color, #1e293b)',
    'font-size': fontSize,
    'font-weight': 600,
    opacity: .88,
    'pointer-events': 'none',
  }

  if (subcategory.shortName) {
    const label = createSvgElement('text', {
      ...common,
      x: geometry.x + 5,
      y,
      'text-anchor': 'start',
    }, subcategory.shortName)
    applyTagHooks(label, [category.tag, subcategory.tag])
    svg.append(label)
  }

  if (geometry.width >= 28) {
    const amount = createSvgElement('text', {
      ...common,
      x: geometry.x + geometry.width - 5,
      y,
      'font-variant-numeric': 'tabular-nums',
      'text-anchor': 'end',
    }, formatDisplayValue(subcategory.display?.current, subcategory.current))
    applyTagHooks(amount, [category.tag, subcategory.tag])
    svg.append(amount)
  }
}

function drawCategoryGroupLabel(svg, category, geometry, orientation) {
  if (!category.shortName) {
    return
  }

  const mainSize = orientation === 'vertical' ? geometry.height : geometry.width
  if (mainSize < (orientation === 'vertical' ? 46 : 70) || geometry.width < 36 || geometry.height < 24) {
    return
  }

  const size = Math.min(17, Math.max(9, Math.min(geometry.width, geometry.height) * .14))
  const label = createSvgElement('text', {
    x: geometry.x + geometry.width / 2,
    y: geometry.y + geometry.height / 2 + size * .34,
    fill: 'var(--tot-input-color, #1e293b)',
    'font-size': size,
    'font-weight': 700,
    opacity: .78,
    'pointer-events': 'none',
    'text-anchor': 'middle',
  }, category.shortName)
  applyTagHooks(label, [category.tag])
  svg.append(label)
}

function drawTowerLabel(svg, label, x, y, anchor) {
  if (!label) {
    return
  }

  svg.append(createSvgElement('text', {
    x,
    y,
    fill: 'var(--tot-color-neutral-500, #64748b)',
    'font-size': 13,
    'font-weight': 600,
    'letter-spacing': '.02em',
    'pointer-events': 'none',
    'text-anchor': anchor,
  }, label))
}

function categorySideSubcategories(category, towerIndex) {
  const result = []
  for (let i = 0; i < category.subcategories.length; i++) {
    const subcategory = category.subcategories[i]
    if ((towerIndex === 0 && subcategory.current > 0) || (towerIndex === 1 && subcategory.current < 0)) {
      result.push(subcategory)
    }
  }
  return result
}

function categoryGeometryFrom(position, mainSize, layout) {
  if (layout.orientation === 'vertical') {
    return {
      x: position.x,
      y: position.main,
      width: layout.breadth,
      height: mainSize,
    }
  }

  return {
    x: position.main,
    y: position.y,
    width: mainSize,
    height: layout.breadth,
  }
}

function subcategoryGeometry(categoryGeometry, offset, fraction, orientation) {
  if (orientation === 'vertical') {
    return {
      x: categoryGeometry.x,
      y: categoryGeometry.y + categoryGeometry.height * offset,
      width: categoryGeometry.width,
      height: categoryGeometry.height * fraction,
    }
  }

  return {
    x: categoryGeometry.x + categoryGeometry.width * offset,
    y: categoryGeometry.y,
    width: categoryGeometry.width * fraction,
    height: categoryGeometry.height,
  }
}

function renderLegend(container, categories, registry, legendRegistry, handlers, hiddenKeys) {
  container.replaceChildren()

  for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
    const category = categories[categoryIndex]
    const item = document.createElement('div')
    item.className = 'legend-item'
    item.classList.toggle('is-hidden', hiddenKeys.has(category.key))
    item.title = hiddenKeys.has(category.key) ? 'Hold or right-click to show category' : 'Hold or right-click to hide category'
    applyTagHooks(item, [category.tag], 'legend-item')

    const swatch = document.createElement('span')
    swatch.className = 'legend-swatch'
    applyTagHooks(swatch, [category.tag], 'legend-swatch')
    swatch.style.background = category.color

    const copy = document.createElement('span')
    copy.className = 'legend-copy'

    const label = document.createElement('span')
    label.className = 'legend-label'
    label.textContent = category.shortName
      ? `${category.shortName} — ${category.name}`
      : category.name

    const subtitleText = categorySubtitle(category)
    const subtitle = document.createElement('span')
    subtitle.className = 'legend-subtitle'
    subtitle.textContent = subtitleText
    subtitle.hidden = !subtitleText

    copy.append(label, subtitle)
    item.append(swatch, copy)
    item.addEventListener('pointerenter', (event) => {
      setHighlight(category.key, registry, legendRegistry)
      if (event.pointerType !== 'touch') {
        handlers.show(category, event, false, item)
      }
    })
    item.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'touch') {
        handlers.hide()
      }
    })
    let holdTimer = null
    let holdStart = null
    let held = false
    let lastHoldToggle = 0
    const cancelHold = () => {
      if (holdTimer !== null) {
        clearTimeout(holdTimer)
        holdTimer = null
      }
      holdStart = null
    }

    item.addEventListener('contextmenu', (event) => {
      event.preventDefault()
      cancelHold()
      if (Date.now() - lastHoldToggle < 1000) {
        return
      }
      handlers.toggleHidden(category)
    })
    item.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 || event.pointerType !== 'touch') {
        return
      }
      held = false
      holdStart = { x: event.clientX, y: event.clientY }
      holdTimer = window.setTimeout(() => {
        held = true
        lastHoldToggle = Date.now()
        holdTimer = null
        handlers.hide()
        handlers.toggleHidden(category)
      }, 550)
    })
    item.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch' && holdStart) {
        if (Math.hypot(event.clientX - holdStart.x, event.clientY - holdStart.y) > 8) {
          cancelHold()
        }
        return
      }
      if (event.pointerType !== 'touch') {
        handlers.move(event, item)
      }
    })
    item.addEventListener('pointerup', (event) => {
      if (event.pointerType !== 'touch') {
        return
      }
      const wasHeld = held
      cancelHold()
      held = false
      if (!wasHeld) {
        handlers.show(category, event, true, item)
      }
    })
    item.addEventListener('pointercancel', cancelHold)

    legendRegistry.set(category.key, item)
    container.append(item)
  }
}

export class TotTwoTowers extends HTMLElement {
  constructor() {
    super()
    this._config = normalizeConfig(null)
    this._fullscreen = false
    this._detailsOpen = false
    this._formulaOpen = false
    this._groupsOpen = false
    this._formulaSimplified = false
    this._detailsWidthPx = null
    this._activeDetailsResize = null
    this._tooltipAnchor = null
    this._tooltipCategoryKey = null
    this._tooltipPinnedKey = null
    this._historyPushed = false
    this._historyToken = ''
    this._skipHistoryOnClose = false
    this._shapeRegistry = new Map()
    this._legendRegistry = new Map()
    this._hiddenCategoryKeys = new Set()
    this._handleKeyDown = event => this.handleKeyDown(event)
    this._handlePopState = () => this.handlePopState()
    this._handleDetailsResizeMove = event => this.handleDetailsResizeMove(event)
    this._handleDetailsResizeEnd = () => this.stopDetailsResize()
    this._handleResize = () => {
      if (this._fullscreen) {
        this.render()
      }
    }
    this._onWindowPointerDown = (event) => {
      if (!event.composedPath().includes(this)) {
        this.hideTooltip(true)
      }
    }

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `
      <style>${twoTowersStyle}</style>
      <div class="two-towers" part="base">
        <aside class="details-table" part="details-table" aria-label="All category details">
          <div class="details-table-header" part="details-table-header">
            <span class="details-table-title">All details</span>
          </div>
          <div class="details-table-scroll" part="details-table-scroll"></div>
          <button class="details-resize-handle" part="details-resize-handle" type="button" aria-label="Resize details table"></button>
        </aside>
        <aside class="formula-panel" part="formula-panel" aria-label="Formula">
          <div class="formula-panel-header" part="formula-panel-header">
            <span class="formula-panel-title">Formula</span>
            <label class="formula-simplified" part="formula-simplified">
              <input class="formula-simplified-input" type="checkbox">
              Simplified
            </label>
          </div>
          <div class="formula-panel-scroll" part="formula-panel-scroll">
            <tot-formula class="formula-view" part="formula-view"></tot-formula>
          </div>
        </aside>
        <aside class="groups-panel" part="groups-panel" aria-label="Groups and colors">
          <div class="groups-panel-header" part="groups-panel-header">
            <span class="groups-panel-title">Groups &amp; colors</span>
          </div>
          <div class="groups-panel-scroll" part="groups-panel-scroll"></div>
        </aside>
        <div class="chart" part="chart">
          <svg aria-label="Two towers visualization" role="img"></svg>
        </div>
        <div class="legend" part="legend"></div>
        <div class="tooltip" part="tooltip" hidden></div>
        <button class="formula-button" part="formula-button" type="button" aria-label="Show formula" aria-expanded="false">
          ${getFormulaIcon()}
        </button>
        <button class="groups-button" part="groups-button" type="button" aria-label="Show groups and colors" aria-expanded="false">
          ${getGroupsIcon()}
        </button>
        <button class="details-button" part="details-button" type="button" aria-label="Show all details" aria-expanded="false">
          ${getDetailsTableIcon()}
        </button>
        <button class="fullscreen-button" part="fullscreen-button" type="button" aria-label="Open fullscreen visualization">
          ${getEnterFullscreenIcon()}
        </button>
      </div>
    `

    this._base = root.querySelector('.two-towers')
    this._svg = root.querySelector('svg')
    this._legend = root.querySelector('.legend')
    this._tooltip = root.querySelector('.tooltip')
    this._detailsTable = root.querySelector('.details-table')
    this._detailsTableScroll = root.querySelector('.details-table-scroll')
    this._detailsResizeHandle = root.querySelector('.details-resize-handle')
    this._formulaPanel = root.querySelector('.formula-panel')
    this._formulaView = root.querySelector('.formula-view')
    this._groupsPanel = root.querySelector('.groups-panel')
    this._groupsPanelScroll = root.querySelector('.groups-panel-scroll')
    this._formulaSimplifiedInput = root.querySelector('.formula-simplified-input')
    this._formulaButton = root.querySelector('.formula-button')
    this._groupsButton = root.querySelector('.groups-button')
    this._detailsButton = root.querySelector('.details-button')
    this._fullscreenButton = root.querySelector('.fullscreen-button')

    this._detailsButton.addEventListener('click', () => this.toggleDetailsTable())
    this._formulaButton.addEventListener('click', () => this.toggleFormulaPanel())
    this._groupsButton.addEventListener('click', () => this.toggleGroupsPanel())
    this._formulaSimplifiedInput.addEventListener('change', () => {
      this._formulaSimplified = this._formulaSimplifiedInput.checked
      this.renderFormulaPanel()
    })
    this._formulaView.addEventListener('item-hover', event => {
      this.highlightFormulaTag(event.detail?.tag)
    })
    this._formulaView.addEventListener('item-unhover', () => {
      this.clearFormulaHighlight()
    })
    this._detailsResizeHandle.addEventListener('pointerdown', event => this.startDetailsResize(event))
    this._detailsResizeHandle.addEventListener('keydown', event => this.handleDetailsResizeKeyDown(event))
    this._fullscreenButton.addEventListener('click', () => {
      if (this._fullscreen) {
        this.closeFullscreen()
      } else {
        this.openFullscreen()
      }
    })
    root.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'touch') {
        return
      }
      const target = event.target
      if (
        !(target instanceof Element) ||
        (!target.closest('.category-shape') && !target.closest('.legend-item'))
      ) {
        this.hideTooltip(true)
      }
    })
  }

  get fullscreen() {
    return this._fullscreen
  }

  get config() {
    return this._config
  }

  set config(value) {
    this._config = normalizeConfig(value)
    const keys = new Set(this._config.categories.map(category => category.key))
    const hidden = Array.from(this._hiddenCategoryKeys)
    for (let i = 0; i < hidden.length; i++) {
      if (!keys.has(hidden[i])) {
        this._hiddenCategoryKeys.delete(hidden[i])
      }
    }
    if (this.isConnected) {
      this.render()
    }
  }

  connectedCallback() {
    window.addEventListener('pointerdown', this._onWindowPointerDown)
    this.render()
  }

  disconnectedCallback() {
    this.stopDetailsResize()
    this.closeFullscreen(false, true)
    window.removeEventListener('pointerdown', this._onWindowPointerDown)
  }

  openFullscreen() {
    if (this._fullscreen) {
      return
    }

    this._fullscreen = true
    markFullscreenOpen()
    lockPageScroll()
    window.addEventListener('keydown', this._handleKeyDown)
    window.addEventListener('popstate', this._handlePopState)
    window.addEventListener('resize', this._handleResize)
    this.pushFullscreenHistoryState()
    this.updateFullscreenUi()
    this.render()
    this.dispatchEvent(new Event('fullscreen-change', { bubbles: true, composed: true }))
  }

  closeFullscreen(shouldUpdate = true, skipHistory = false) {
    if (!this._fullscreen) {
      return
    }

    const shouldSkipHistory = skipHistory || this._skipHistoryOnClose
    this._skipHistoryOnClose = false
    this._fullscreen = false
    this._detailsOpen = false
    this._formulaOpen = false
    this._groupsOpen = false
    this.stopDetailsResize()
    markFullscreenClosed()
    window.removeEventListener('keydown', this._handleKeyDown)
    window.removeEventListener('popstate', this._handlePopState)
    window.removeEventListener('resize', this._handleResize)
    unlockPageScroll()

    if (shouldSkipHistory) {
      this.clearFullscreenHistoryState()
    } else {
      this.removeFullscreenHistoryState()
    }

    if (shouldUpdate) {
      this.updateFullscreenUi()
      if (this.isConnected) {
        this.render()
      }
      this.dispatchEvent(new Event('fullscreen-change', { bubbles: true, composed: true }))
    }
  }

  handleKeyDown(event) {
    if (event.key !== 'Escape' || !this._fullscreen) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    if (typeof event.stopImmediatePropagation === 'function') {
      event.stopImmediatePropagation()
    }
    this.closeFullscreen()
  }

  handlePopState() {
    if (!this._fullscreen || !this._historyPushed) {
      return
    }

    this._skipHistoryOnClose = true
    this.closeFullscreen()
  }

  pushFullscreenHistoryState() {
    if (this._historyPushed || typeof history === 'undefined') {
      return
    }

    this._historyToken = `tot-fullscreen-${Date.now()}-${Math.random().toString(36).slice(2)}`
    try {
      const currentState = history.state && typeof history.state === 'object' ? history.state : {}
      history.pushState({ ...currentState, totFullscreenToken: this._historyToken }, '')
      this._historyPushed = true
    } catch (error) {
      this.clearFullscreenHistoryState()
    }
  }

  removeFullscreenHistoryState() {
    if (!this._historyPushed || typeof history === 'undefined') {
      this.clearFullscreenHistoryState()
      return
    }

    const state = history.state
    const isCurrentFullscreenState = state && state.totFullscreenToken === this._historyToken
    this.clearFullscreenHistoryState()
    if (isCurrentFullscreenState) {
      history.back()
    }
  }

  clearFullscreenHistoryState() {
    this._historyPushed = false
    this._historyToken = ''
  }

  updateFullscreenUi() {
    if (!this._base || !this._fullscreenButton || !this._detailsButton || !this._formulaButton || !this._groupsButton) {
      return
    }

    const detailsOpen = this._fullscreen && this._detailsOpen
    const formulaOpen = this._fullscreen && this._formulaOpen
    const groupsOpen = this._fullscreen && this._groupsOpen
    this._base.classList.toggle('is-fullscreen', this._fullscreen)
    this._base.classList.toggle('has-details-table', detailsOpen)
    this._base.classList.toggle('has-formula', formulaOpen)
    this._base.classList.toggle('has-groups', groupsOpen)
    this._detailsButton.setAttribute('aria-expanded', String(detailsOpen))
    this._detailsButton.setAttribute(
      'aria-label',
      detailsOpen ? 'Hide all details' : 'Show all details',
    )
    this._formulaButton.setAttribute('aria-expanded', String(formulaOpen))
    this._formulaButton.setAttribute(
      'aria-label',
      formulaOpen ? 'Hide formula' : 'Show formula',
    )
    this._formulaButton.hidden = !this._config.formula.items.length
    this._groupsButton.setAttribute('aria-expanded', String(groupsOpen))
    this._groupsButton.setAttribute(
      'aria-label',
      groupsOpen ? 'Hide groups and colors' : 'Show groups and colors',
    )
    this._groupsButton.hidden = !this._config.formula.items.length || !Object.keys(this._config.groups).length
    this._fullscreenButton.innerHTML = this._fullscreen
      ? getExitFullscreenIcon()
      : getEnterFullscreenIcon()
    this._fullscreenButton.setAttribute(
      'aria-label',
      this._fullscreen ? 'Exit fullscreen visualization' : 'Open fullscreen visualization',
    )
  }

  toggleDetailsTable() {
    if (!this._fullscreen) {
      return
    }

    const next = !this._detailsOpen
    this._detailsOpen = next
    if (next) {
      this._formulaOpen = false
      this._groupsOpen = false
    }
    this.hideTooltip(true)
    this.updateFullscreenUi()
    this.renderDetailsTable()
    this.renderFormulaPanel()
    this.renderGroupsPanel()
  }

  toggleFormulaPanel() {
    if (!this._fullscreen || !this._config.formula.items.length) {
      return
    }

    const next = !this._formulaOpen
    this.clearFormulaHighlight()
    this._formulaOpen = next
    if (next) {
      this._detailsOpen = false
      this._groupsOpen = false
      this.stopDetailsResize()
    }
    this.hideTooltip(true)
    this.updateFullscreenUi()
    this.renderDetailsTable()
    this.renderFormulaPanel()
    this.renderGroupsPanel()
  }

  toggleGroupsPanel() {
    if (!this._fullscreen || !this._config.formula.items.length || !Object.keys(this._config.groups).length) {
      return
    }

    const next = !this._groupsOpen
    this.clearFormulaHighlight()
    this._groupsOpen = next
    if (next) {
      this._detailsOpen = false
      this._formulaOpen = false
      this.stopDetailsResize()
    }
    this.hideTooltip(true)
    this.updateFullscreenUi()
    this.renderDetailsTable()
    this.renderFormulaPanel()
    this.renderGroupsPanel()
  }

  highlightFormulaTag(tag) {
    const value = String(tag || '').trim()
    if (!value || configuredGroupHidden(this._config, value)) {
      this.clearFormulaHighlight()
      return
    }

    const activeShapes = new Set()
    const activeCategoryKeys = new Set()
    const directCategories = []

    for (let i = 0; i < this._config.categories.length; i++) {
      const category = this._config.categories[i]
      if (category.tag === value) {
        directCategories.push(category)
      }
    }

    if (directCategories.length) {
      for (let i = 0; i < directCategories.length; i++) {
        const category = directCategories[i]
        activeCategoryKeys.add(category.key)
        const shapes = this._shapeRegistry.get(category.key) || []
        for (let j = 0; j < shapes.length; j++) {
          activeShapes.add(shapes[j])
        }
      }
    } else {
      const leafTags = descendantLeafTagsForFormulaTag(this._config, value)
      if (!leafTags.size) {
        leafTags.add(value)
      }

      for (let i = 0; i < this._config.categories.length; i++) {
        const category = this._config.categories[i]
        const categoryShapes = this._shapeRegistry.get(category.key) || []
        let categoryMatched = false

        for (let j = 0; j < category.subcategories.length; j++) {
          const subcategory = category.subcategories[j]
          if (!subcategory.tag || !leafTags.has(subcategory.tag)) {
            continue
          }
          categoryMatched = true
          const hook = tagHookToken(subcategory.tag)
          for (let shapeIndex = 0; shapeIndex < categoryShapes.length; shapeIndex++) {
            const shape = categoryShapes[shapeIndex]
            if (hook && shape.classList.contains(hook)) {
              activeShapes.add(shape)
            }
          }
        }

        if (categoryMatched) {
          activeCategoryKeys.add(category.key)
        }
      }
    }

    setTargetHighlight(activeShapes, activeCategoryKeys, this._shapeRegistry, this._legendRegistry, true)
  }

  clearFormulaHighlight() {
    setHighlight(null, this._shapeRegistry, this._legendRegistry)
  }

  renderFormulaPanel() {
    if (!this._formulaView || !this._formulaSimplifiedInput) {
      return
    }

    this._formulaSimplifiedInput.checked = this._formulaSimplified
    this.clearFormulaHighlight()
    if (!this._fullscreen || !this._formulaOpen) {
      return
    }

    this._formulaView.config = {
      title: this._config.formula.title,
      simplified: this._formulaSimplified,
      items: this._config.formula.items,
      values: this._config.values,
    }
  }

  renderGroupsPanel() {
    if (!this._groupsPanelScroll) {
      return
    }

    this.clearFormulaHighlight()
    if (!this._fullscreen || !this._groupsOpen) {
      this._groupsPanelScroll.replaceChildren()
      return
    }

    this._groupsPanelScroll.replaceChildren(createGroupsPresentation(this._config, {
      hover: tag => this.highlightFormulaTag(tag),
      unhover: () => this.clearFormulaHighlight(),
    }))
  }

  renderDetailsTable() {
    if (!this._detailsTableScroll) {
      return
    }

    if (!this._fullscreen || !this._detailsOpen) {
      this._detailsTableScroll.replaceChildren()
      return
    }

    const categories = this._config.categories.filter(category => !this._hiddenCategoryKeys.has(category.key))
    this._detailsTableScroll.replaceChildren(createFullDetailsTable({ ...this._config, categories }))
  }

  startDetailsResize(event) {
    if (!this._fullscreen || !this._detailsOpen) {
      return
    }

    const rect = this._detailsTable.getBoundingClientRect()
    this._activeDetailsResize = {
      startX: event.clientX,
      startWidth: rect.width,
    }
    this._detailsTable.classList.add('is-resizing')
    event.currentTarget.setPointerCapture?.(event.pointerId)
    document.addEventListener('pointermove', this._handleDetailsResizeMove)
    document.addEventListener('pointerup', this._handleDetailsResizeEnd)
    event.preventDefault()
  }

  handleDetailsResizeMove(event) {
    if (!this._activeDetailsResize) {
      return
    }

    const delta = event.clientX - this._activeDetailsResize.startX
    this.setDetailsTableWidth(this._activeDetailsResize.startWidth + delta)
    event.preventDefault()
  }

  handleDetailsResizeKeyDown(event) {
    if (!this._fullscreen || !this._detailsOpen) {
      return
    }

    const rect = this._detailsTable.getBoundingClientRect()
    const limits = this.getDetailsTableWidthLimits()
    const step = event.shiftKey ? 48 : 16

    if (event.key === 'ArrowLeft') {
      this.setDetailsTableWidth(rect.width - step)
    } else if (event.key === 'ArrowRight') {
      this.setDetailsTableWidth(rect.width + step)
    } else if (event.key === 'Home') {
      this.setDetailsTableWidth(limits.min)
    } else if (event.key === 'End') {
      this.setDetailsTableWidth(limits.max)
    } else {
      return
    }

    event.preventDefault()
  }

  setDetailsTableWidth(width) {
    const limits = this.getDetailsTableWidthLimits()
    this._detailsWidthPx = Math.max(limits.min, Math.min(limits.max, width))
    this._base.style.setProperty('--tot-two-towers-details-width', `${Math.round(this._detailsWidthPx)}px`)
  }

  getDetailsTableWidthLimits() {
    const viewportWidth = Math.max(1, window.innerWidth)
    const min = Math.min(224, viewportWidth * .42)
    const max = Math.max(min, viewportWidth * .72)
    return { min, max }
  }

  stopDetailsResize() {
    this._detailsTable?.classList.remove('is-resizing')
    document.removeEventListener('pointermove', this._handleDetailsResizeMove)
    document.removeEventListener('pointerup', this._handleDetailsResizeEnd)
    this._activeDetailsResize = null
  }

  toggleCategoryHidden(category) {
    if (this._hiddenCategoryKeys.has(category.key)) {
      this._hiddenCategoryKeys.delete(category.key)
    } else {
      this._hiddenCategoryKeys.add(category.key)
    }
    this.hideTooltip(true)
    this.render()
  }

  getSvg() {
    return this._svg
  }

  getLegend() {
    return this._legend
  }

  showTooltip(category, event, pinned = false, anchor = null) {
    if (pinned && this._tooltipPinnedKey === category.key && !this._tooltip.hidden) {
      this.hideTooltip(true)
      return
    }

    this._tooltip.replaceChildren(createTooltipTable(category, this._config.periods))
    this._tooltip.hidden = false
    this._tooltipPinnedKey = pinned ? category.key : null
    this._tooltipCategoryKey = category.key
    this._tooltipAnchor = anchor instanceof Element ? anchor : null
    this.positionTooltip(event, this._tooltipAnchor)
    setHighlight(
      this._hiddenCategoryKeys.has(category.key) ? null : category.key,
      this._shapeRegistry,
      this._legendRegistry,
    )
  }

  positionTooltip(event, anchor = this._tooltipAnchor) {
    if (this._tooltip.hidden) {
      return
    }

    const margin = 8
    const offset = 12
    const tooltipRect = this._tooltip.getBoundingClientRect()
    const pointerX = finiteNumber(event?.clientX, window.innerWidth / 2)
    const pointerY = finiteNumber(event?.clientY, window.innerHeight / 2)
    const anchorRect = anchor instanceof Element ? anchor.getBoundingClientRect() : null
    const maxLeft = Math.max(margin, window.innerWidth - margin - tooltipRect.width)
    const maxTop = Math.max(margin, window.innerHeight - margin - tooltipRect.height)

    if (!anchorRect || (!anchorRect.width && !anchorRect.height)) {
      this._tooltip.style.left = `${Math.min(maxLeft, Math.max(margin, pointerX + offset))}px`
      this._tooltip.style.top = `${Math.min(maxTop, Math.max(margin, pointerY + offset))}px`
      return
    }

    const candidates = [
      { left: anchorRect.right + offset, top: pointerY - tooltipRect.height / 2 },
      { left: anchorRect.left - tooltipRect.width - offset, top: pointerY - tooltipRect.height / 2 },
      { left: pointerX - tooltipRect.width / 2, top: anchorRect.bottom + offset },
      { left: pointerX - tooltipRect.width / 2, top: anchorRect.top - tooltipRect.height - offset },
    ]
    let best = null

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i]
      const overflow = Math.max(0, margin - candidate.left) +
        Math.max(0, candidate.left + tooltipRect.width + margin - window.innerWidth) +
        Math.max(0, margin - candidate.top) +
        Math.max(0, candidate.top + tooltipRect.height + margin - window.innerHeight)
      const left = Math.min(maxLeft, Math.max(margin, candidate.left))
      const top = Math.min(maxTop, Math.max(margin, candidate.top))
      const right = left + tooltipRect.width
      const bottom = top + tooltipRect.height
      const avoidShapes = this._shapeRegistry.get(this._tooltipCategoryKey) || []
      let overlapArea = 0

      for (let shapeIndex = 0; shapeIndex < avoidShapes.length; shapeIndex++) {
        const shapeRect = avoidShapes[shapeIndex].getBoundingClientRect()
        const overlapWidth = Math.max(0, Math.min(right, shapeRect.right) - Math.max(left, shapeRect.left))
        const overlapHeight = Math.max(0, Math.min(bottom, shapeRect.bottom) - Math.max(top, shapeRect.top))
        overlapArea += overlapWidth * overlapHeight
      }

      const score = overflow * 100000 + overlapArea * 10 + i
      if (!best || score < best.score) {
        best = { left, top, score }
      }
    }

    this._tooltip.style.left = `${best.left}px`
    this._tooltip.style.top = `${best.top}px`
  }

  hideTooltip(force = false) {
    if (this._tooltipPinnedKey && !force) {
      return
    }

    this._tooltip.hidden = true
    this._tooltipPinnedKey = null
    this._tooltipAnchor = null
    this._tooltipCategoryKey = null
    setHighlight(null, this._shapeRegistry, this._legendRegistry)
  }

  render() {
    const config = this._config
    this._shapeRegistry = new Map()
    this._legendRegistry = new Map()
    this._tooltip.hidden = true
    this._tooltipPinnedKey = null
    this._tooltipAnchor = null
    this._tooltipCategoryKey = null
    this._svg.replaceChildren()

    const visibleCategories = config.categories.filter(category => !this._hiddenCategoryKeys.has(category.key))
    const hasVisibleData = visibleCategories.some(category => category.subcategories.some(subcategory => Math.abs(subcategory.current) > 1e-9))
    this._svg.hidden = !hasVisibleData
    this._legend.hidden = !config.categories.length

    if (!config.categories.length) {
      this._legend.replaceChildren()
      this._detailsTableScroll.replaceChildren()
      return
    }

    this._svg.setAttribute('aria-label', config.label)
    const portraitFullscreen = this._fullscreen && window.innerHeight > window.innerWidth
    const layout = config.orientation === 'horizontal'
      ? {
          orientation: 'horizontal',
          viewWidth: 1000,
          viewHeight: 390,
          start: 42,
          end: 958,
          seam: 195,
          breadth: 112,
          margin: 24,
        }
      : portraitFullscreen
        ? {
            orientation: 'vertical',
            viewWidth: 460,
            viewHeight: 640,
            start: 34,
            end: 610,
            seam: 230,
            breadth: 140,
            margin: 10,
          }
        : {
            orientation: 'vertical',
            viewWidth: 1000,
            viewHeight: 640,
            start: 44,
            end: 590,
            seam: 500,
            breadth: 300,
            margin: 24,
          }

    const maximumBreadth = (layout.seam - layout.margin) / config.tearThreshold
    layout.breadth = Math.max(28, Math.min(layout.breadth, maximumBreadth))
    layout.maxProtrusion = Math.max(8, layout.seam - layout.breadth - layout.margin)
    this._svg.setAttribute('viewBox', `0 0 ${layout.viewWidth} ${layout.viewHeight}`)

    const defs = createSvgElement('defs')
    for (let i = 0; i < visibleCategories.length; i++) {
      const category = visibleCategories[i]
      category._patternId = `hatch-${escapeKey(category.key)}-${i}`
      defs.append(addPattern(category._patternId, category.color))
    }
    this._svg.append(defs)

    const totals = [0, 0]
    for (let towerIndex = 0; towerIndex < 2; towerIndex++) {
      for (let i = 0; i < visibleCategories.length; i++) {
        totals[towerIndex] += categorySideMagnitude(visibleCategories[i], towerIndex)
      }
    }

    const scale = (layout.end - layout.start) / Math.max(1, totals[0], totals[1])
    const visibleConfig = { ...config, categories: visibleCategories }
    if (hasVisibleData) {
      if (layout.orientation === 'vertical') {
        this.renderVertical(visibleConfig, layout, scale)
      } else {
        this.renderHorizontal(visibleConfig, layout, scale)
      }
    }

    this.bindShapeInteractions(visibleCategories)
    renderLegend(
      this._legend,
      config.categories,
      this._shapeRegistry,
      this._legendRegistry,
      {
        show: (category, event, pinned = false, anchor = null) => {
          this.showTooltip(category, event, pinned, anchor)
        },
        move: (event, anchor = null) => {
          if (!this._tooltip.hidden) {
            this.positionTooltip(event, anchor)
          }
        },
        hide: () => this.hideTooltip(),
        toggleHidden: category => this.toggleCategoryHidden(category),
      },
      this._hiddenCategoryKeys,
    )
    this.renderDetailsTable()
    this.renderFormulaPanel()
    this.renderGroupsPanel()
    this.updateFullscreenUi()
  }

  renderVertical(config, layout, scale) {
    for (let towerIndex = 0; towerIndex < 2; towerIndex++) {
      const side = towerIndex === 0 ? 'left' : 'right'
      const x = side === 'left' ? layout.seam - layout.breadth : layout.seam
      const label = towerIndex === 0 ? config.positiveLabel : config.negativeLabel
      let main = layout.start

      drawTowerLabel(
        this._svg,
        label,
        side === 'left' ? layout.seam - layout.breadth / 2 : layout.seam + layout.breadth / 2,
        24,
        'middle',
      )

      for (let i = 0; i < config.categories.length; i++) {
        const category = config.categories[i]
        const displayMagnitude = categorySideMagnitude(category, towerIndex)
        const subcategories = categorySideSubcategories(category, towerIndex)
        if (displayMagnitude <= 1e-9 || !subcategories.length) {
          continue
        }

        const mainSize = displayMagnitude * scale
        const geometry = categoryGeometryFrom({ x, main }, mainSize, layout)
        this.drawCategorySide(category, subcategories, geometry, side, config, layout)
        main += mainSize
      }
    }
  }

  renderHorizontal(config, layout, scale) {
    for (let towerIndex = 0; towerIndex < 2; towerIndex++) {
      const side = towerIndex === 0 ? 'top' : 'bottom'
      const y = side === 'top' ? layout.seam - layout.breadth : layout.seam
      const label = towerIndex === 0 ? config.positiveLabel : config.negativeLabel
      let main = layout.start

      drawTowerLabel(
        this._svg,
        label,
        14,
        side === 'top' ? layout.seam - layout.breadth / 2 + 5 : layout.seam + layout.breadth / 2 + 5,
        'start',
      )

      for (let i = 0; i < config.categories.length; i++) {
        const category = config.categories[i]
        const displayMagnitude = categorySideMagnitude(category, towerIndex)
        const subcategories = categorySideSubcategories(category, towerIndex)
        if (displayMagnitude <= 1e-9 || !subcategories.length) {
          continue
        }

        const mainSize = displayMagnitude * scale
        const geometry = categoryGeometryFrom({ y, main }, mainSize, layout)
        this.drawCategorySide(category, subcategories, geometry, side, config, layout)
        main += mainSize
      }
    }
  }

  drawCategorySide(category, subcategories, geometry, side, config, layout) {
    let total = 0
    for (let i = 0; i < subcategories.length; i++) {
      total += Math.abs(subcategories[i].current)
    }
    if (total <= 1e-9) {
      return
    }

    let offset = 0
    for (let i = 0; i < subcategories.length; i++) {
      const subcategory = subcategories[i]
      const fraction = Math.abs(subcategory.current) / total
      const subGeometry = subcategoryGeometry(geometry, offset, fraction, layout.orientation)
      this.drawSubcategory(category, subcategory, subGeometry, side, config, layout)
      offset += fraction
    }

    drawOutline(this._svg, geometry, 1.25, 'var(--tot-two-towers-category-border-color)', [category.tag])
    drawCategoryGroupLabel(this._svg, category, geometry, layout.orientation)
  }

  drawSubcategory(category, subcategory, geometry, side, config, layout) {
    const base = appendRect(this._svg, {
      x: geometry.x,
      y: geometry.y,
      width: geometry.width,
      height: geometry.height,
      fill: category.color,
      stroke: 'none',
      opacity: 1,
    }, category.key, this._shapeRegistry, [category.tag, subcategory.tag])
    base.dataset.baseOpacity = '1'

    const mainSize = layout.orientation === 'vertical' ? geometry.height : geometry.width
    if (mainSize >= 3) {
      drawComparison(this._svg, {
        category,
        subcategory,
        geometry,
        orientation: layout.orientation,
        side,
        compare: config.compare,
        tearThreshold: config.tearThreshold,
        maxProtrusion: layout.maxProtrusion,
        patternId: category._patternId,
        registry: this._shapeRegistry,
      })
    }

    drawOutline(this._svg, geometry, 1, 'var(--tot-two-towers-subcategory-border-color)', [category.tag, subcategory.tag])
    drawSubcategoryLabel(this._svg, category, subcategory, geometry, layout.orientation)
  }

  bindShapeInteractions(categories) {
    const byKey = new Map()
    for (let i = 0; i < categories.length; i++) {
      byKey.set(categories[i].key, categories[i])
    }

    const entries = Array.from(this._shapeRegistry.entries())
    for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
      const [key, shapes] = entries[entryIndex]
      const category = byKey.get(key)
      if (!category) {
        continue
      }

      for (let shapeIndex = 0; shapeIndex < shapes.length; shapeIndex++) {
        const shape = shapes[shapeIndex]
        shape.dataset.categoryKey = key
        shape.addEventListener('pointerenter', (event) => {
          if (event.pointerType !== 'touch') {
            this.showTooltip(category, event, false, shape)
          }
        })
        shape.addEventListener('pointermove', (event) => {
          if (event.pointerType !== 'touch' && !this._tooltip.hidden) {
            this.positionTooltip(event, shape)
          }
        })
        shape.addEventListener('pointerleave', (event) => {
          if (event.pointerType === 'touch') {
            return
          }
          const relatedTarget = event.relatedTarget
          if (relatedTarget instanceof Element && relatedTarget.dataset.categoryKey === key) {
            return
          }
          this.hideTooltip()
        })
        shape.addEventListener('pointerdown', (event) => {
          if (event.pointerType === 'touch') {
            this.showTooltip(category, event, true, shape)
          }
        })
      }
    }
  }
}
