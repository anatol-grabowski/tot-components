const gicsGridStyle = `
  :host {
    --tot-gics-grid-sector-border-width: 3px;
    --tot-gics-grid-group-border-width: 2px;
    --tot-gics-grid-industry-border-width: 1px;
    --tot-gics-grid-cell-border-width: 0px;
    --tot-gics-grid-sector-border-color: var(--tot-color-neutral-800, #1f2937);
    --tot-gics-grid-group-border-color: var(--tot-color-neutral-600, #475569);
    --tot-gics-grid-industry-border-color: var(--tot-color-neutral-400, #94a3b8);
    --tot-gics-grid-cell-border-color: var(--tot-color-neutral-200, #e2e8f0);

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

  .gics-grid {
    max-width: 100%;
    min-width: 0;
    position: relative;
    width: 100%;
  }

  .gics-grid.is-fullscreen {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    display: grid;
    gap: var(--tot-spacing-small, .75rem);
    grid-template-columns: minmax(0, 1fr) minmax(16rem, 22rem);
    height: 100dvh;
    inset: 0;
    max-width: none;
    overflow: hidden;
    padding: var(--tot-spacing-small, .75rem);
    position: fixed;
    width: 100vw;
    z-index: var(--tot-z-index-fullscreen, 1300);
  }

  .fullscreen-button {
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
    z-index: 20;
  }

  .gics-grid.is-fullscreen .fullscreen-button {
    position: fixed;
  }

  .fullscreen-button:hover {
    color: var(--tot-input-icon-color-hover, var(--tot-color-neutral-700, #334155));
  }

  .fullscreen-button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .fullscreen-button svg {
    display: block;
    fill: none;
    height: 1rem;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
    width: 1rem;
  }

  .grid-stage {
    aspect-ratio: 1 / 1;
    container-type: size;
    display: grid;
    min-height: 0;
    min-width: 0;
    place-items: center;
    width: 100%;
  }

  .gics-grid.is-fullscreen .grid-stage {
    aspect-ratio: auto;
    height: 100%;
    width: 100%;
  }

  .grid {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-gics-grid-sector-border-width) solid var(--tot-gics-grid-sector-border-color);
    display: grid;
    grid-template-columns: repeat(13, minmax(0, 1fr));
    grid-template-rows: repeat(13, minmax(0, 1fr));
    height: min(100cqw, 100cqh);
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    user-select: none;
    width: min(100cqw, 100cqh);
  }

  .slot {
    background: var(--tot-color-neutral-50, #f8fafc);
    min-height: 0;
    min-width: 0;
    position: relative;
  }

  .slot::before,
  .slot::after {
    content: '';
    pointer-events: none;
    position: absolute;
    z-index: 8;
  }

  .slot::before {
    border-top: var(--edge-top-width, 0) solid var(--edge-top-color, transparent);
    height: 0;
    left: 0;
    right: 0;
    top: 0;
    transform: translateY(-50%);
  }

  .slot::after {
    border-left: var(--edge-left-width, 0) solid var(--edge-left-color, transparent);
    bottom: 0;
    left: 0;
    top: 0;
    transform: translateX(-50%);
    width: 0;
  }

  .edge-top-cell {
    --edge-top-width: var(--tot-gics-grid-cell-border-width);
    --edge-top-color: var(--tot-gics-grid-cell-border-color);
  }

  .edge-top-industry {
    --edge-top-width: var(--tot-gics-grid-industry-border-width);
    --edge-top-color: var(--tot-gics-grid-industry-border-color);
  }

  .edge-top-group {
    --edge-top-width: var(--tot-gics-grid-group-border-width);
    --edge-top-color: var(--tot-gics-grid-group-border-color);
  }

  .edge-top-sector {
    --edge-top-width: var(--tot-gics-grid-sector-border-width);
    --edge-top-color: var(--tot-gics-grid-sector-border-color);
  }

  .edge-left-cell {
    --edge-left-width: var(--tot-gics-grid-cell-border-width);
    --edge-left-color: var(--tot-gics-grid-cell-border-color);
  }

  .edge-left-industry {
    --edge-left-width: var(--tot-gics-grid-industry-border-width);
    --edge-left-color: var(--tot-gics-grid-industry-border-color);
  }

  .edge-left-group {
    --edge-left-width: var(--tot-gics-grid-group-border-width);
    --edge-left-color: var(--tot-gics-grid-group-border-color);
  }

  .edge-left-sector {
    --edge-left-width: var(--tot-gics-grid-sector-border-width);
    --edge-left-color: var(--tot-gics-grid-sector-border-color);
  }

  .slot.empty {
    background:
      repeating-linear-gradient(
        135deg,
        var(--tot-color-neutral-0, #fff) 0,
        var(--tot-color-neutral-0, #fff) 6px,
        var(--tot-color-neutral-100, #f1f5f9) 6px,
        var(--tot-color-neutral-100, #f1f5f9) 12px
      );
  }

  .cell {
    --tot-gics-grid-cell-background: color-mix(
      in srgb,
      var(--tot-color-neutral-500, #64748b) 34%,
      var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff))
    );
    --tot-gics-grid-cell-color: var(--tot-input-color, #1e293b);

    align-items: center;
    background: var(--tot-gics-grid-cell-background);
    color: var(--tot-gics-grid-cell-color);
    display: flex;
    inset: 0;
    isolation: isolate;
    justify-content: center;
    overflow: hidden;
    position: absolute;
  }

  /*
   * Sector colors intentionally mirror Chart.js' categorical palette, but mix the
   * theme-aware 600 tone into the panel background so they stay calm in both themes.
   * Every cell also exposes its hierarchy as matching class and ::part tokens, so
   * applications can override --tot-gics-grid-cell-background / -color per code.
   */
  .cell.sector-10 {
    --tot-gics-grid-cell-background: color-mix(in srgb, var(--tot-color-orange-600, #ea580c) 34%, var(--tot-panel-background-color, #fff));
  }

  .cell.sector-15 {
    --tot-gics-grid-cell-background: color-mix(in srgb, var(--tot-color-yellow-600, #ca8a04) 34%, var(--tot-panel-background-color, #fff));
  }

  .cell.sector-20 {
    --tot-gics-grid-cell-background: color-mix(in srgb, var(--tot-color-blue-600, #2563eb) 34%, var(--tot-panel-background-color, #fff));
  }

  .cell.sector-25 {
    --tot-gics-grid-cell-background: color-mix(in srgb, var(--tot-color-pink-600, #db2777) 34%, var(--tot-panel-background-color, #fff));
  }

  .cell.sector-30 {
    --tot-gics-grid-cell-background: color-mix(in srgb, var(--tot-color-green-600, #16a34a) 34%, var(--tot-panel-background-color, #fff));
  }

  .cell.sector-35 {
    --tot-gics-grid-cell-background: color-mix(in srgb, var(--tot-color-rose-600, #e11d48) 34%, var(--tot-panel-background-color, #fff));
  }

  .cell.sector-40 {
    --tot-gics-grid-cell-background: color-mix(in srgb, var(--tot-color-purple-600, #9333ea) 34%, var(--tot-panel-background-color, #fff));
  }

  .cell.sector-45 {
    --tot-gics-grid-cell-background: color-mix(in srgb, var(--tot-color-cyan-600, #0891b2) 34%, var(--tot-panel-background-color, #fff));
  }

  .cell.sector-50 {
    --tot-gics-grid-cell-background: color-mix(in srgb, var(--tot-color-indigo-600, #4f46e5) 34%, var(--tot-panel-background-color, #fff));
  }

  .cell.sector-55 {
    --tot-gics-grid-cell-background: color-mix(in srgb, var(--tot-color-teal-600, #0d9488) 34%, var(--tot-panel-background-color, #fff));
  }

  .cell.sector-60 {
    --tot-gics-grid-cell-background: color-mix(in srgb, var(--tot-color-amber-600, #d97706) 34%, var(--tot-panel-background-color, #fff));
  }

  .cell::after {
    background-image: var(--cell-pattern, none);
    content: '';
    inset: 0;
    pointer-events: none;
    position: absolute;
    z-index: 0;
  }

  .cell::before {
    background-image: var(--icon-image);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 94% 94%;
    content: '';
    inset: 2%;
    opacity: var(--icon-opacity, .35);
    pointer-events: none;
    position: absolute;
    z-index: 1;
  }

  .grid.is-editable .cell {
    cursor: grab;
    touch-action: none;
  }

  .grid.is-editable .cell:active {
    cursor: grabbing;
  }

  .cell.is-active {
    box-shadow:
      inset 0 0 0 2px var(--tot-color-primary-500, #0ea5e9),
      inset 0 0 0 4px color-mix(in srgb, var(--tot-color-neutral-0, #fff) 72%, transparent);
    z-index: 5;
  }

  .cell.is-dragging {
    opacity: .34;
  }

  .slot.is-drop-target {
    outline: 3px solid var(--tot-color-primary-400, #38bdf8);
    outline-offset: -3px;
    z-index: 10;
  }

  .code {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-family: var(--tot-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    font-size: clamp(.34rem, .72vw, .62rem);
    font-weight: var(--tot-font-weight-bold, 700);
    justify-content: center;
    letter-spacing: .035em;
    line-height: .92;
    position: relative;
    text-align: center;
    text-shadow:
      0 1px 0 color-mix(in srgb, var(--tot-color-neutral-0, #fff) 72%, transparent),
      0 0 5px color-mix(in srgb, var(--tot-color-neutral-0, #fff) 50%, transparent);
    z-index: 2;
  }

  .code span {
    display: block;
    min-height: .92em;
  }

  .grid.codes-hidden .code {
    display: none;
  }

  .tooltip,
  .fullscreen-tooltip {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-medium, 4px);
    color: var(--tot-input-color, #1e293b);
    font-size: var(--tot-font-size-x-small, .75rem);
  }

  .tooltip {
    box-shadow: var(--tot-shadow-medium, 0 4px 12px rgb(15 23 42 / .14));
    left: 0;
    max-width: min(34rem, calc(100vw - 1rem));
    overflow: hidden;
    pointer-events: none;
    position: fixed;
    top: 0;
    z-index: var(--tot-z-index-tooltip, 1200);
  }

  .tooltip[hidden] {
    display: none;
  }

  .gics-grid.is-fullscreen .tooltip {
    display: none !important;
  }

  .fullscreen-tooltip {
    display: none;
    min-height: 0;
    overflow: auto;
    padding: var(--tot-spacing-x-small, .5rem);
  }

  .gics-grid.is-fullscreen .fullscreen-tooltip {
    display: block;
  }

  .tooltip-placeholder {
    color: var(--tot-color-neutral-500, #64748b);
    line-height: var(--tot-line-height-normal, 1.4);
    padding: var(--tot-spacing-2x-small, .25rem);
  }

  .details-table {
    border-collapse: collapse;
    width: 100%;
  }

  .details-table th,
  .details-table td {
    border-bottom: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    padding: var(--tot-spacing-3x-small, .125rem) var(--tot-spacing-x-small, .5rem);
    text-align: left;
    vertical-align: top;
  }

  .details-table tr:last-child td {
    border-bottom: 0;
  }

  .details-table th {
    background: var(--tot-color-neutral-50, #f8fafc);
    color: var(--tot-color-neutral-500, #64748b);
    font-size: var(--tot-font-size-2x-small, .625rem);
    font-weight: var(--tot-font-weight-semibold, 600);
    white-space: nowrap;
  }

  .details-table td:first-child {
    color: var(--tot-color-neutral-600, #475569);
    font-weight: var(--tot-font-weight-semibold, 600);
    white-space: nowrap;
  }

  .details-table td:nth-child(2) {
    font-family: var(--tot-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
    white-space: nowrap;
  }

  .details-table td:last-child {
    min-width: 10rem;
  }

  .details-table tr.current td {
    font-weight: var(--tot-font-weight-bold, 700);
  }

  @media (max-width: 52rem), (max-aspect-ratio: 5 / 4) {
    .gics-grid.is-fullscreen {
      grid-template-columns: 1fr;
      grid-template-rows: minmax(0, 1fr) auto;
    }

    .gics-grid.is-fullscreen .fullscreen-tooltip {
      max-height: min(30dvh, 13rem);
    }
  }
`

const gicsNames = {
  '10': 'Energy',
  '1010': 'Energy',
  '101010': 'Energy Equipment & Services',
  '10101010': 'Oil & Gas Drilling',
  '10101020': 'Oil & Gas Equipment & Services',
  '101020': 'Oil, Gas & Consumable Fuels',
  '10102010': 'Integrated Oil & Gas',
  '10102020': 'Oil & Gas Exploration & Production',
  '10102030': 'Oil & Gas Refining & Marketing',
  '10102040': 'Oil & Gas Storage & Transportation',
  '10102050': 'Coal & Consumable Fuels',
  '15': 'Materials',
  '1510': 'Materials',
  '151010': 'Chemicals',
  '15101010': 'Commodity Chemicals',
  '15101020': 'Diversified Chemicals',
  '15101030': 'Fertilizers & Agricultural Chemicals',
  '15101040': 'Industrial Gases',
  '15101050': 'Specialty Chemicals',
  '151020': 'Construction Materials',
  '15102010': 'Construction Materials',
  '151030': 'Containers & Packaging',
  '15103010': 'Metal, Glass & Plastic Containers',
  '15103020': 'Paper & Plastic Packaging Products & Materials',
  '151040': 'Metals & Mining',
  '15104010': 'Aluminum',
  '15104020': 'Diversified Metals & Mining',
  '15104025': 'Copper',
  '15104030': 'Gold',
  '15104040': 'Precious Metals & Minerals',
  '15104045': 'Silver',
  '15104050': 'Steel',
  '151050': 'Paper & Forest Products',
  '15105010': 'Forest Products',
  '15105020': 'Paper Products',
  '20': 'Industrials',
  '2010': 'Capital Goods',
  '201010': 'Aerospace & Defense',
  '20101010': 'Aerospace & Defense',
  '201020': 'Building Products',
  '20102010': 'Building Products',
  '201030': 'Construction & Engineering',
  '20103010': 'Construction & Engineering',
  '201040': 'Electrical Equipment',
  '20104010': 'Electrical Components & Equipment',
  '20104020': 'Heavy Electrical Equipment',
  '201050': 'Industrial Conglomerates',
  '20105010': 'Industrial Conglomerates',
  '201060': 'Machinery',
  '20106010': 'Construction Machinery & Heavy Transportation Equipment',
  '20106015': 'Agricultural & Farm Machinery',
  '20106020': 'Industrial Machinery & Supplies & Components',
  '201070': 'Trading Companies & Distributors',
  '20107010': 'Trading Companies & Distributors',
  '2020': 'Commercial & Professional Services',
  '202010': 'Commercial Services & Supplies',
  '20201010': 'Commercial Printing',
  '20201050': 'Environmental & Facilities Services',
  '20201060': 'Office Services & Supplies',
  '20201070': 'Diversified Support Services',
  '20201080': 'Security & Alarm Services',
  '202020': 'Professional Services',
  '20202010': 'Human Resource & Employment Services',
  '20202020': 'Research & Consulting Services',
  '20202030': 'Data Processing & Outsourced Services',
  '2030': 'Transportation',
  '203010': 'Air Freight & Logistics',
  '20301010': 'Air Freight & Logistics',
  '203020': 'Passenger Airlines',
  '20302010': 'Passenger Airlines',
  '203030': 'Marine Transportation',
  '20303010': 'Marine Transportation',
  '203040': 'Ground Transportation',
  '20304010': 'Rail Transportation',
  '20304030': 'Cargo Ground Transportation',
  '20304040': 'Passenger Ground Transportation',
  '203050': 'Transportation Infrastructure',
  '20305010': 'Airport Services',
  '20305020': 'Highways & Railtracks',
  '20305030': 'Marine Ports & Services',
  '25': 'Consumer Discretionary',
  '2510': 'Automobiles & Components',
  '251010': 'Automobile Components',
  '25101010': 'Automotive Parts & Equipment',
  '25101020': 'Tires & Rubber',
  '251020': 'Automobiles',
  '25102010': 'Automobile Manufacturers',
  '25102020': 'Motorcycle Manufacturers',
  '2520': 'Consumer Durables & Apparel',
  '252010': 'Household Durables',
  '25201010': 'Consumer Electronics',
  '25201020': 'Home Furnishings',
  '25201030': 'Homebuilding',
  '25201040': 'Household Appliances',
  '25201050': 'Housewares & Specialties',
  '252020': 'Leisure Products',
  '25202010': 'Leisure Products',
  '252030': 'Textiles, Apparel & Luxury Goods',
  '25203010': 'Apparel, Accessories & Luxury Goods',
  '25203020': 'Footwear',
  '25203030': 'Textiles',
  '2530': 'Consumer Services',
  '253010': 'Hotels, Restaurants & Leisure',
  '25301010': 'Casinos & Gaming',
  '25301020': 'Hotels, Resorts & Cruise Lines',
  '25301030': 'Leisure Facilities',
  '25301040': 'Restaurants',
  '253020': 'Diversified Consumer Services',
  '25302010': 'Education Services',
  '25302020': 'Specialized Consumer Services',
  '2550': 'Consumer Discretionary Distribution & Retail',
  '255010': 'Distributors',
  '25501010': 'Distributors',
  '255030': 'Broadline Retail',
  '25503030': 'Broadline Retail',
  '255040': 'Specialty Retail',
  '25504010': 'Apparel Retail',
  '25504020': 'Computer & Electronics Retail',
  '25504030': 'Home Improvement Retail',
  '25504040': 'Other Specialty Retail',
  '25504050': 'Automotive Retail',
  '25504060': 'Homefurnishing Retail',
  '30': 'Consumer Staples',
  '3010': 'Consumer Staples Distribution & Retail',
  '301010': 'Consumer Staples Distribution & Retail',
  '30101010': 'Drug Retail',
  '30101020': 'Food Distributors',
  '30101030': 'Food Retail',
  '30101040': 'Consumer Staples Merchandise Retail',
  '3020': 'Food, Beverage & Tobacco',
  '302010': 'Beverages',
  '30201010': 'Brewers',
  '30201020': 'Distillers & Vintners',
  '30201030': 'Soft Drinks & Non-alcoholic Beverages',
  '302020': 'Food Products',
  '30202010': 'Agricultural Products & Services',
  '30202030': 'Packaged Foods & Meats',
  '302030': 'Tobacco',
  '30203010': 'Tobacco',
  '3030': 'Personal Care Products',
  '303010': 'Household Products',
  '30301010': 'Household Products',
  '303020': 'Personal Care Products',
  '30302010': 'Personal Care Products',
  '35': 'Health Care',
  '3510': 'Health Care Equipment & Services',
  '351010': 'Health Care Equipment & Supplies',
  '35101010': 'Health Care Equipment',
  '35101020': 'Health Care Supplies',
  '351020': 'Health Care Providers & Services',
  '35102010': 'Health Care Distributors',
  '35102015': 'Health Care Services',
  '35102020': 'Health Care Facilities',
  '35102030': 'Managed Health Care',
  '351030': 'Health Care Technology',
  '35103010': 'Health Care Technology',
  '3520': 'Pharmaceuticals, Biotechnology & Life Sciences',
  '352010': 'Biotechnology',
  '35201010': 'Biotechnology',
  '352020': 'Pharmaceuticals',
  '35202010': 'Pharmaceuticals',
  '352030': 'Life Sciences Tools & Services',
  '35203010': 'Life Sciences Tools & Services',
  '40': 'Financials',
  '4010': 'Banks',
  '401010': 'Banks',
  '40101010': 'Diversified Banks',
  '40101015': 'Regional Banks',
  '4020': 'Financial Services',
  '402010': 'Financial Services',
  '40201020': 'Diversified Financial Services',
  '40201030': 'Multi-Sector Holdings',
  '40201040': 'Specialized Finance',
  '40201050': 'Commercial & Residential Mortgage Finance',
  '40201060': 'Transaction & Payment Processing Services',
  '402020': 'Consumer Finance',
  '40202010': 'Consumer Finance',
  '402030': 'Capital Markets',
  '40203010': 'Asset Management & Custody Banks',
  '40203020': 'Investment Banking & Brokerage',
  '40203030': 'Diversified Capital Markets',
  '40203040': 'Financial Exchanges & Data',
  '402040': 'Mortgage Real Estate Investment Trusts (REITs)',
  '40204010': 'Mortgage REITs',
  '4030': 'Insurance',
  '403010': 'Insurance',
  '40301010': 'Insurance Brokers',
  '40301020': 'Life & Health Insurance',
  '40301030': 'Multi-line Insurance',
  '40301040': 'Property & Casualty Insurance',
  '40301050': 'Reinsurance',
  '45': 'Information Technology',
  '4510': 'Software & Services',
  '451020': 'IT Services',
  '45102010': 'IT Consulting & Other Services',
  '45102030': 'Internet Services & Infrastructure',
  '451030': 'Software',
  '45103010': 'Application Software',
  '45103020': 'Systems Software',
  '4520': 'Technology Hardware & Equipment',
  '452010': 'Communications Equipment',
  '45201020': 'Communications Equipment',
  '452020': 'Technology Hardware, Storage & Peripherals',
  '45202030': 'Technology Hardware, Storage & Peripherals',
  '452030': 'Electronic Equipment, Instruments & Components',
  '45203010': 'Electronic Equipment & Instruments',
  '45203015': 'Electronic Components',
  '45203020': 'Electronic Manufacturing Services',
  '45203030': 'Technology Distributors',
  '4530': 'Semiconductors & Semiconductor Equipment',
  '453010': 'Semiconductors & Semiconductor Equipment',
  '45301010': 'Semiconductor Materials & Equipment',
  '45301020': 'Semiconductors',
  '50': 'Communication Services',
  '5010': 'Telecommunication Services',
  '501010': 'Diversified Telecommunication Services',
  '50101010': 'Alternative Carriers',
  '50101020': 'Integrated Telecommunication Services',
  '501020': 'Wireless Telecommunication Services',
  '50102010': 'Wireless Telecommunication Services',
  '5020': 'Media & Entertainment',
  '502010': 'Media',
  '50201010': 'Advertising',
  '50201020': 'Broadcasting',
  '50201030': 'Cable & Satellite',
  '50201040': 'Publishing',
  '502020': 'Entertainment',
  '50202010': 'Movies & Entertainment',
  '50202020': 'Interactive Home Entertainment',
  '502030': 'Interactive Media & Services',
  '50203010': 'Interactive Media & Services',
  '55': 'Utilities',
  '5510': 'Utilities',
  '551010': 'Electric Utilities',
  '55101010': 'Electric Utilities',
  '551020': 'Gas Utilities',
  '55102010': 'Gas Utilities',
  '551030': 'Multi-Utilities',
  '55103010': 'Multi-Utilities',
  '551040': 'Water Utilities',
  '55104010': 'Water Utilities',
  '551050': 'Independent Power and Renewable Electricity Producers',
  '55105010': 'Independent Power Producers & Energy Traders',
  '55105020': 'Renewable Electricity',
  '60': 'Real Estate',
  '6010': 'Equity Real Estate Investment Trusts (REITs)',
  '601010': 'Diversified REITs',
  '60101010': 'Diversified REITs',
  '601025': 'Industrial REITs',
  '60102510': 'Industrial REITs',
  '601030': 'Hotel & Resort REITs',
  '60103010': 'Hotel & Resort REITs',
  '601040': 'Office REITs',
  '60104010': 'Office REITs',
  '601050': 'Health Care REITs',
  '60105010': 'Health Care REITs',
  '601060': 'Residential REITs',
  '60106010': 'Multi-Family Residential REITs',
  '60106020': 'Single-Family Residential REITs',
  '601070': 'Retail REITs',
  '60107010': 'Retail REITs',
  '601080': 'Specialized REITs',
  '60108010': 'Other Specialized REITs',
  '60108020': 'Self-Storage REITs',
  '60108030': 'Telecom Tower REITs',
  '60108040': 'Timber REITs',
  '60108050': 'Data Center REITs',
  '6020': 'Real Estate Management & Development',
  '602010': 'Real Estate Management & Development',
  '60201010': 'Diversified Real Estate Activities',
  '60201020': 'Real Estate Operating Companies',
  '60201030': 'Real Estate Development',
  '60201040': 'Real Estate Services',
}

const iconSpecs = {
  '10101010': { emojis: ['🛢️', '⛏️'] },
  '10101020': { emojis: ['🛢️', '🛠️'] },
  '10102010': { emojis: ['🛢️', '🔥'] },
  '10102020': { emojis: ['🛢️', '🧭'] },
  '10102030': { emojis: ['🛢️', '⛽'] },
  '10102040': { emojis: ['🛢️', '🚚'] },
  '10102050': { emojis: ['⛏️', '🪨'] },
  '15101010': { emojis: ['🧪'] },
  '15101020': { emojis: ['🧪', '🧩'] },
  '15101030': { emojis: ['🧪', '🌱'] },
  '15101040': { emojis: ['🧪', '💨'] },
  '15101050': { emojis: ['🧪', '✨'] },
  '15102010': { emojis: ['🧱'] },
  '15103010': { emojis: ['🥫', '🍾'] },
  '15103020': { emojis: ['📦', '🧴'] },
  '15104010': { tile: 'Al' },
  '15104020': { emojis: ['⛏️', '🧩'] },
  '15104025': { tile: 'Cu' },
  '15104030': { tile: 'Au' },
  '15104040': { emojis: ['💎'] },
  '15104045': { tile: 'Ag' },
  '15104050': { tile: 'Fe' },
  '15105010': { emojis: ['🌲'] },
  '15105020': { emojis: ['📄'] },
  '20101010': { emojis: ['✈️', '🛡️'] },
  '20102010': { emojis: ['🚪'] },
  '20103010': { emojis: ['🏗️'] },
  '20104010': { emojis: ['🔌'] },
  '20104020': { emojis: ['🏗️', '⚡'] },
  '20105010': { emojis: ['🏭'] },
  '20106010': { emojis: ['🚛'] },
  '20106015': { emojis: ['🚜'] },
  '20106020': { emojis: ['🏭', '🔧'] },
  '20107010': { emojis: ['📦', '🔄'] },
  '20201010': { emojis: ['🖨️'] },
  '20201050': { emojis: ['♻️'] },
  '20201060': { emojis: ['📎'] },
  '20201070': { emojis: ['🧰', '🧩'] },
  '20201080': { emojis: ['🛡️'] },
  '20202010': { emojis: ['👥'] },
  '20202020': { emojis: ['🔍'] },
  '20202030': { emojis: ['📊'] },
  '20301010': { emojis: ['📦', '✈️'] },
  '20302010': { emojis: ['✈️'] },
  '20303010': { emojis: ['🚢'] },
  '20304010': { emojis: ['🚆'] },
  '20304030': { emojis: ['🚚'] },
  '20304040': { emojis: ['🚌'] },
  '20305010': { emojis: ['🛬'] },
  '20305020': { emojis: ['🚆', '🛣️'] },
  '20305030': { emojis: ['⚓'] },
  '25101010': { emojis: ['⚙️'] },
  '25101020': { emojis: ['🛞'] },
  '25102010': { emojis: ['🚗'] },
  '25102020': { emojis: ['🏍️'] },
  '25201010': { emojis: ['📱'] },
  '25201020': { emojis: ['🛋️'] },
  '25201030': { emojis: ['🏠', '🔨'] },
  '25201040': { emojis: ['🏠', '🔌'] },
  '25201050': { emojis: ['🍽️', '✨'] },
  '25202010': { emojis: ['⚽'] },
  '25203010': { emojis: ['👗', '⌚'] },
  '25203020': { emojis: ['👟'] },
  '25203030': { emojis: ['🧵'] },
  '25301010': { emojis: ['🎲'] },
  '25301020': { emojis: ['🏨', '🛳️'] },
  '25301030': { emojis: ['🎡'] },
  '25301040': { emojis: ['🍽️'] },
  '25302010': { emojis: ['🎓'] },
  '25302020': { emojis: ['✂️', '✨'] },
  '25501010': { emojis: ['📦'] },
  '25503030': { emojis: ['🛒', '🏬'] },
  '25504010': { emojis: ['🛒', '👕'] },
  '25504020': { emojis: ['🛒', '💻'] },
  '25504030': { emojis: ['🛒', '🔨'] },
  '25504040': { emojis: ['🛒', '✨'] },
  '25504050': { emojis: ['🛒', '🚗'] },
  '25504060': { emojis: ['🛒', '🛋️'] },
  '30101010': { emojis: ['🛒', '💊'] },
  '30101020': { emojis: ['📦', '🍎'] },
  '30101030': { emojis: ['🛒', '🍎'] },
  '30101040': { emojis: ['🛒', '🧺'] },
  '30201010': { emojis: ['🍺'] },
  '30201020': { emojis: ['🍷'] },
  '30201030': { emojis: ['🥤'] },
  '30202010': { emojis: ['🌾'] },
  '30202030': { emojis: ['🥩'] },
  '30203010': { emojis: ['🚬'] },
  '30301010': { emojis: ['🧴'] },
  '30302010': { emojis: ['🧼'] },
  '35101010': { emojis: ['🩺'] },
  '35101020': { emojis: ['🩹'] },
  '35102010': { emojis: ['⚕️', '📦'] },
  '35102015': { emojis: ['⚕️'] },
  '35102020': { emojis: ['⚕️', '🏥'] },
  '35102030': { emojis: ['⚕️', '📋'] },
  '35103010': { emojis: ['⚕️', '💻'] },
  '35201010': { emojis: ['🧬'] },
  '35202010': { emojis: ['💊'] },
  '35203010': { emojis: ['🔬'] },
  '40101010': { emojis: ['🏦', '🧩'] },
  '40101015': { emojis: ['🏦', '🗺️'] },
  '40201020': { emojis: ['💹', '🧩'] },
  '40201030': { emojis: ['🧩'] },
  '40201040': { emojis: ['🧮', '✨'] },
  '40201050': { emojis: ['🏠', '💲'] },
  '40201060': { emojis: ['💳'] },
  '40202010': { emojis: ['👛'] },
  '40203010': { emojis: ['🔐'] },
  '40203020': { emojis: ['📈'] },
  '40203030': { emojis: ['📊', '🧩'] },
  '40203040': { emojis: ['🔁', '📈'] },
  '40204010': { emojis: ['🏛️', '🏠', '💲'], layout: 'leftRightStack' },
  '40301010': { emojis: ['☂️', '🤝'] },
  '40301020': { emojis: ['☂️', '⚕️'] },
  '40301030': { emojis: ['☂️', '🧩'] },
  '40301040': { emojis: ['☂️', '🏠'] },
  '40301050': { emojis: ['☂️', '🔁'] },
  '45102010': { emojis: ['💻', '🔧'] },
  '45102030': { emojis: ['🌐'] },
  '45103010': { emojis: ['💻', '📦'] },
  '45103020': { emojis: ['💻', '🛠️'] },
  '45201020': { emojis: ['📡'] },
  '45202030': { emojis: ['💽'] },
  '45203010': { emojis: ['🎛️'] },
  '45203015': { emojis: ['🔌'] },
  '45203020': { emojis: ['🏭', '🔌'] },
  '45203030': { emojis: ['📦'] },
  '45301010': { tile: 'Fab' },
  '45301020': { tile: 'Si' },
  '50101010': { emojis: ['🔀'] },
  '50101020': { emojis: ['🌐'] },
  '50102010': { emojis: ['📶'] },
  '50201010': { emojis: ['📣'] },
  '50201020': { emojis: ['📺'] },
  '50201030': { emojis: ['🔌', '📡'] },
  '50201040': { emojis: ['📚'] },
  '50202010': { emojis: ['🎬'] },
  '50202020': { emojis: ['🎮'] },
  '50203010': { emojis: ['🌐', '💬'] },
  '55101010': { emojis: ['⚡'] },
  '55102010': { emojis: ['🔥'] },
  '55103010': { emojis: ['⚡', '💧', '🔥'] },
  '55104010': { emojis: ['💧'] },
  '55105010': { emojis: ['⚡', '💱'] },
  '55105020': { emojis: ['⚡', '☀️'] },
  '60101010': { emojis: ['🏛️', '🧩'] },
  '60102510': { emojis: ['🏛️', '🏭'] },
  '60103010': { emojis: ['🏛️', '🏨'] },
  '60104010': { emojis: ['🏛️', '🏢'] },
  '60105010': { emojis: ['🏛️', '🏥'] },
  '60106010': { emojis: ['🏛️', '🏘️'] },
  '60106020': { emojis: ['🏛️', '🏠'] },
  '60107010': { emojis: ['🏛️', '🛒'] },
  '60108010': { emojis: ['🏛️', '✨'] },
  '60108020': { emojis: ['🏛️', '📦'] },
  '60108030': { emojis: ['🏛️', '📡'] },
  '60108040': { emojis: ['🏛️', '🌲'] },
  '60108050': { emojis: ['🏛️', '🖥️'] },
  '60201010': { emojis: ['🗝️', '🧩'] },
  '60201020': { emojis: ['🗝️', '🏢'] },
  '60201030': { emojis: ['🗝️', '🏗️'] },
  '60201040': { emojis: ['🗝️', '🤝'] },
}

const defaultLayout = [
  '20101010', '20102010', '20201010', '20201050', '20201060', '20201070', '40101010', '40101015', '40301010', '60101010', null, null, null,
  '20103010', '20104010', '20201080', '20202010', '20202020', '20202030', '40201020', '40201030', '40301020', '60102510', '60103010', '60104010', '60107010',
  '20104020', '20105010', '20301010', '20302010', '20303010', '40201040', '40201050', '40201060', '40301030', '60105010', '60106010', '60106020', '60108050',
  '20106010', '20106015', '20304010', '20304030', '20304040', '40202010', '40203010', '40203020', '40301040', '60108010', '60108020', '60108030', '60108040',
  '20106020', '20107010', '20305010', '20305020', '20305030', '40204010', '40203030', '40203040', '40301050', '60201010', '60201020', '60201030', '60201040',
  '15103020', '15103010', '15105010', '15105020', '55101010', '55102010', '55105010', '50101010', '50101020', '50102010', '45102010', '45201020', '45202030',
  '15104045', '15104050', '15104040', '15104030', '55104010', '55103010', '55105020', '50202010', '50202020', '50203010', '45102030', '45203010', '45203015',
  '15104025', '15104010', '15104020', '15102010', '10101010', '10101020', '10102010', '10102020', '50201010', '50201020', '45103010', '45203020', '45203030',
  '15101010', '15101020', '15101030', '15101040', '15101050', '10102030', '10102040', '10102050', '50201030', '50201040', '45103020', '45301020', '45301010',
  '30101010', '30201010', '30201020', '25101010', '25101020', '25203030', '25202010', '25203010', '25203020', '35102010', '35102015', '35102020', '35102030',
  '30101020', '30201030', '30202010', '25102010', '25102020', '25201010', '25201020', '25201030', '25201040', '25201050', '35101010', '35101020', '35103010',
  '30101030', '30202030', '30203010', '25301010', '25301020', '25301030', '25501010', '25503030', '25504010', '25504020', '35201010', '35202010', '35203010',
  '30101040', '30301010', '30302010', '25301040', '25302010', '25302020', '25504030', '25504040', '25504050', '25504060', null, null, null,
]

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

function getScrollLockState() {
  if (!window.__totFullscreenPreviewScrollLockState) {
    window.__totFullscreenPreviewScrollLockState = { count: 0 }
  }
  return window.__totFullscreenPreviewScrollLockState
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

const gridSize = 13
const slotCount = gridSize * gridSize
const allowedPatterns = new Set([
  'none',
  'diagonal',
  'diagonal-reverse',
  'crosshatch',
  'dots',
  'horizontal',
  'vertical',
])

const fallbackIconSpecs = {
  '10': { emojis: ['🛢️'] },
  '15': { emojis: ['🧪'] },
  '20': { emojis: ['⚙️'] },
  '25': { emojis: ['🛍️'] },
  '30': { emojis: ['🍎'] },
  '35': { emojis: ['⚕️'] },
  '40': { emojis: ['💹'] },
  '45': { emojis: ['💻'] },
  '50': { emojis: ['📡'] },
  '55': { emojis: ['⚡'] },
  '60': { emojis: ['🏢'] },
}

const iconCache = new Map()

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value))
}

function normalizePattern(value) {
  return allowedPatterns.has(value) ? value : 'none'
}

function normalizePatterns(value) {
  const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  const result = {}
  const entries = Object.entries(source)

  for (let i = 0; i < entries.length; i++) {
    const [code, pattern] = entries[i]
    if (!gicsNames[code] || ![2, 4, 6, 8].includes(code.length) || typeof pattern !== 'string') {
      continue
    }
    result[code] = normalizePattern(pattern)
  }

  return result
}

function normalizeLayout(value) {
  if (!Array.isArray(value) || value.length !== slotCount) {
    return defaultLayout.slice()
  }

  const seen = new Set()
  const layout = []
  for (let i = 0; i < value.length; i++) {
    const code = value[i]
    if (code === null || code === undefined || code === '') {
      layout.push(null)
      continue
    }

    const normalized = String(code)
    if (normalized.length !== 8 || !gicsNames[normalized] || seen.has(normalized)) {
      return defaultLayout.slice()
    }
    seen.add(normalized)
    layout.push(normalized)
  }

  return layout
}

function normalizeConfig(value) {
  const source = value && typeof value === 'object' ? value : {}
  const iconOpacity = Number(source.iconOpacity)

  return {
    label: typeof source.label === 'string' && source.label ? source.label : 'GICS codes grid',
    showCodes: source.showCodes === true,
    iconOpacity: Number.isFinite(iconOpacity) ? clamp(iconOpacity, 0, 1) : 1,
    editMode: source.editMode !== false,
    patterns: normalizePatterns(source.patterns),
    layout: normalizeLayout(source.layout),
  }
}

function pathFor(code) {
  return {
    sector: code.slice(0, 2),
    group: code.slice(0, 4),
    industry: code.slice(0, 6),
    subindustry: code,
  }
}

function patternForCode(code, patterns) {
  let pattern = 'none'
  const lengths = [2, 4, 6, 8]

  for (let i = 0; i < lengths.length; i++) {
    const key = code.slice(0, lengths[i])
    if (Object.prototype.hasOwnProperty.call(patterns, key)) {
      pattern = patterns[key]
    }
  }

  return pattern
}

function edgeLevel(leftCode, rightCode) {
  if (!leftCode && !rightCode) {
    return 'cell'
  }
  if (!leftCode || !rightCode) {
    return 'sector'
  }

  const left = pathFor(leftCode)
  const right = pathFor(rightCode)
  if (left.sector !== right.sector) {
    return 'sector'
  }
  if (left.group !== right.group) {
    return 'group'
  }
  if (left.industry !== right.industry) {
    return 'industry'
  }
  return 'cell'
}

function patternImage(pattern) {
  const ink = 'color-mix(in srgb, var(--tot-gics-grid-cell-color) 16%, transparent)'

  if (pattern === 'diagonal') {
    return `repeating-linear-gradient(135deg, transparent 0, transparent 7px, ${ink} 7px, ${ink} 9px)`
  }
  if (pattern === 'diagonal-reverse') {
    return `repeating-linear-gradient(45deg, transparent 0, transparent 7px, ${ink} 7px, ${ink} 9px)`
  }
  if (pattern === 'crosshatch') {
    return `repeating-linear-gradient(135deg, transparent 0, transparent 8px, ${ink} 8px, ${ink} 9px), repeating-linear-gradient(45deg, transparent 0, transparent 8px, ${ink} 8px, ${ink} 9px)`
  }
  if (pattern === 'dots') {
    return `radial-gradient(circle at 2px 2px, ${ink} 0 1.5px, transparent 1.7px)`
  }
  if (pattern === 'horizontal') {
    return `repeating-linear-gradient(0deg, transparent 0, transparent 7px, ${ink} 7px, ${ink} 9px)`
  }
  if (pattern === 'vertical') {
    return `repeating-linear-gradient(90deg, transparent 0, transparent 7px, ${ink} 7px, ${ink} 9px)`
  }
  return 'none'
}

function escapeXml(value) {
  const replacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return String(value).replace(/[&<>"']/g, character => replacements[character])
}

function emojiSvg(emojis, layout = 'auto') {
  const list = Array.isArray(emojis) ? emojis.slice(0, 3) : []
  let positions = []

  if (list.length === 1) {
    positions = [[50, 58, 64]]
  } else if (list.length === 2) {
    positions = [[34, 58, 50], [66, 58, 50]]
  } else if (layout === 'horizontal3') {
    positions = [[20, 58, 32], [50, 58, 32], [80, 58, 32]]
  } else if (layout === 'leftRightStack') {
    positions = [[28, 58, 38], [70, 34, 30], [70, 72, 30]]
  } else {
    positions = [[50, 24, 28], [34, 68, 36], [66, 68, 36]]
  }

  let items = ''
  for (let i = 0; i < list.length; i++) {
    items += `<text x="${positions[i][0]}" y="${positions[i][1]}" font-size="${positions[i][2]}" text-anchor="middle" dominant-baseline="middle">${escapeXml(list[i])}</text>`
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true"><g font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif">${items}</g></svg>`
}

function tileSvg(text) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true"><rect x="14" y="14" width="72" height="72" fill="none" stroke="rgba(20,32,51,.22)" stroke-width="3"/><text x="50" y="56" font-size="34" font-weight="800" text-anchor="middle" dominant-baseline="middle" fill="rgba(20,32,51,.48)" font-family="Inter,Segoe UI,sans-serif">${escapeXml(text)}</text></svg>`
}

function iconImageFor(code) {
  if (iconCache.has(code)) {
    return iconCache.get(code)
  }

  const spec = iconSpecs[code] || fallbackIconSpecs[code.slice(0, 2)] || { emojis: ['◻️'] }
  const svg = spec.tile ? tileSvg(spec.tile) : emojiSvg(spec.emojis, spec.layout || 'auto')
  const value = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
  iconCache.set(code, value)
  return value
}

function createDetailsTable(code) {
  const path = pathFor(code)
  const rows = [
    ['Sector', path.sector],
    ['Industry group', path.group],
    ['Industry', path.industry],
    ['Sub-industry', path.subindustry],
  ]
  const table = document.createElement('table')
  table.className = 'details-table'
  const head = document.createElement('thead')
  const headRow = document.createElement('tr')
  const headings = ['Level', 'Code', 'Name']

  for (let i = 0; i < headings.length; i++) {
    const cell = document.createElement('th')
    cell.textContent = headings[i]
    headRow.append(cell)
  }
  head.append(headRow)

  const body = document.createElement('tbody')
  for (let i = 0; i < rows.length; i++) {
    const [level, rowCode] = rows[i]
    const row = document.createElement('tr')
    row.classList.toggle('current', i === rows.length - 1)
    const values = [level, rowCode, gicsNames[rowCode] || '']

    for (let j = 0; j < values.length; j++) {
      const cell = document.createElement('td')
      cell.textContent = values[j]
      row.append(cell)
    }
    body.append(row)
  }

  table.append(head, body)
  return table
}

export class TotGicsGrid extends HTMLElement {
  static get observedAttributes() {
    return ['config']
  }

  constructor() {
    super()
    this._config = normalizeConfig(null)
    this._fullscreen = false
    this._historyPushed = false
    this._historyToken = ''
    this._skipHistoryOnClose = false
    this._activeCode = null
    this._tooltipPinnedCode = null
    this._dragState = null
    this._cellByCode = new Map()
    this._slots = []
    this._handleKeyDown = event => this.handleKeyDown(event)
    this._handlePopState = () => this.handlePopState()
    this._onWindowPointerDown = event => {
      if (!event.composedPath().includes(this)) {
        this.hideTooltip(true)
      }
    }

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `
      <style>${gicsGridStyle}</style>
      <div class="gics-grid" part="base">
        <div class="grid-stage" part="grid-stage">
          <div class="grid" part="grid" role="grid" aria-label="GICS codes grid"></div>
        </div>
        <div class="fullscreen-tooltip" part="fullscreen-tooltip"></div>
        <div class="tooltip" part="tooltip" hidden></div>
        <button class="fullscreen-button" part="fullscreen-button" type="button" aria-label="Open fullscreen visualization">
          ${getEnterFullscreenIcon()}
        </button>
      </div>
    `

    this._base = root.querySelector('.gics-grid')
    this._grid = root.querySelector('.grid')
    this._tooltip = root.querySelector('.tooltip')
    this._fullscreenTooltip = root.querySelector('.fullscreen-tooltip')
    this._fullscreenButton = root.querySelector('.fullscreen-button')

    this._fullscreenButton.addEventListener('click', () => {
      if (this._fullscreen) {
        this.closeFullscreen()
      } else {
        this.openFullscreen()
      }
    })

    root.addEventListener('pointerdown', event => {
      const target = event.target
      if (!(target instanceof Element) || target.closest('.cell')) {
        return
      }
      if (event.pointerType !== 'mouse') {
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
    this.hideTooltip(true)
    if (this.isConnected) {
      this.render()
    }
  }

  connectedCallback() {
    window.addEventListener('pointerdown', this._onWindowPointerDown)
    this.render()
  }

  disconnectedCallback() {
    this.closeFullscreen(false, true)
    window.removeEventListener('pointerdown', this._onWindowPointerDown)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== 'config' || oldValue === newValue) {
      return
    }

    if (!newValue) {
      this.config = null
      return
    }

    try {
      this.config = JSON.parse(newValue)
    } catch (error) {
      this.config = null
    }
  }

  getGrid() {
    return this._grid
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
    this.pushFullscreenHistoryState()
    this.updateFullscreenUi()
    this.renderFullscreenTooltip()
    this.dispatchEvent(new Event('fullscreen-change', { bubbles: true, composed: true }))
  }

  closeFullscreen(shouldUpdate = true, skipHistory = false) {
    if (!this._fullscreen) {
      return
    }

    const shouldSkipHistory = skipHistory || this._skipHistoryOnClose
    this._skipHistoryOnClose = false
    this._fullscreen = false
    markFullscreenClosed()
    window.removeEventListener('keydown', this._handleKeyDown)
    window.removeEventListener('popstate', this._handlePopState)
    unlockPageScroll()

    if (shouldSkipHistory) {
      this.clearFullscreenHistoryState()
    } else {
      this.removeFullscreenHistoryState()
    }

    this.hideTooltip(true)
    if (shouldUpdate) {
      this.updateFullscreenUi()
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
    this._base.classList.toggle('is-fullscreen', this._fullscreen)
    this._fullscreenButton.innerHTML = this._fullscreen
      ? getExitFullscreenIcon()
      : getEnterFullscreenIcon()
    this._fullscreenButton.setAttribute(
      'aria-label',
      this._fullscreen ? 'Exit fullscreen visualization' : 'Open fullscreen visualization',
    )
  }

  render() {
    this._grid.replaceChildren()
    this._grid.setAttribute('aria-label', this._config.label)
    this._grid.classList.toggle('codes-hidden', !this._config.showCodes)
    this._grid.classList.toggle('is-editable', this._config.editMode)
    this._grid.style.setProperty('--icon-opacity', String(this._config.iconOpacity))
    this._cellByCode = new Map()
    this._slots = []
    this._dragState = null

    const layout = this._config.layout
    for (let index = 0; index < slotCount; index++) {
      const code = layout[index]
      const row = Math.floor(index / gridSize)
      const column = index % gridSize
      const slot = document.createElement('div')
      slot.className = `slot${code ? '' : ' empty'}`
      slot.setAttribute('part', 'slot')
      slot.dataset.index = String(index)
      slot.setAttribute('role', 'gridcell')

      if (row > 0) {
        slot.classList.add(`edge-top-${edgeLevel(code, layout[index - gridSize])}`)
      }
      if (column > 0) {
        slot.classList.add(`edge-left-${edgeLevel(code, layout[index - 1])}`)
      }
      if (code) {
        slot.append(this.createCell(code, index))
      }

      this._slots.push(slot)
      this._grid.append(slot)
    }

    this.renderFullscreenTooltip()
  }

  createCell(code, index) {
    const path = pathFor(code)
    const hierarchyTokens = [
      `sector-${path.sector}`,
      `industry-group-${path.group}`,
      `industry-${path.industry}`,
      `subindustry-${path.subindustry}`,
    ]
    const cell = document.createElement('div')
    cell.className = ['cell', ...hierarchyTokens].join(' ')
    cell.setAttribute('part', ['cell', ...hierarchyTokens].join(' '))
    cell.dataset.code = code
    cell.dataset.index = String(index)
    cell.setAttribute('aria-label', `${code} ${gicsNames[code] || ''}`)
    cell.style.setProperty('--cell-pattern', patternImage(patternForCode(code, this._config.patterns)))
    cell.style.setProperty('--icon-image', iconImageFor(code))

    const codeLabel = document.createElement('span')
    codeLabel.className = 'code'
    codeLabel.setAttribute('part', 'code')
    for (let i = 0; i < code.length; i += 2) {
      const line = document.createElement('span')
      line.textContent = code.slice(i, i + 2)
      codeLabel.append(line)
    }
    cell.append(codeLabel)

    cell.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' && !this._dragState?.dragging) {
        this.showTooltip(code, event)
      }
    })
    cell.addEventListener('pointermove', event => this.handleCellPointerMove(event, code))
    cell.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse' && !this._dragState?.dragging) {
        this.hideTooltip()
      }
    })
    cell.addEventListener('pointerdown', event => this.handleCellPointerDown(event, code, index))
    cell.addEventListener('pointerup', event => this.handleCellPointerUp(event, code))
    cell.addEventListener('pointercancel', event => this.handleCellPointerCancel(event))

    this._cellByCode.set(code, cell)
    return cell
  }

  handleCellPointerDown(event, code, index) {
    if (!this._config.editMode || event.button !== 0) {
      return
    }

    this._dragState = {
      pointerId: event.pointerId,
      code,
      sourceIndex: index,
      targetIndex: index,
      startX: event.clientX,
      startY: event.clientY,
      dragging: false,
      cell: event.currentTarget,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  handleCellPointerMove(event, code) {
    const drag = this._dragState
    if (drag && drag.pointerId === event.pointerId) {
      const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY)
      if (!drag.dragging && distance >= 4) {
        drag.dragging = true
        drag.cell.classList.add('is-dragging')
        this.hideTooltip(true)
      }

      if (drag.dragging) {
        if (event.cancelable) {
          event.preventDefault()
        }
        const target = this.shadowRoot.elementFromPoint(event.clientX, event.clientY)
        const slot = target instanceof Element ? target.closest('.slot') : null
        const targetIndex = slot ? Number(slot.dataset.index) : -1
        this.setDropTarget(Number.isInteger(targetIndex) ? targetIndex : -1)
        return
      }
    }

    if (event.pointerType === 'mouse' && this._activeCode === code && !this._fullscreen && !this._tooltip.hidden) {
      this.positionTooltip(event)
    }
  }

  handleCellPointerUp(event, code) {
    let didDrag = false
    const drag = this._dragState

    if (drag && drag.pointerId === event.pointerId) {
      didDrag = drag.dragging
      const sourceIndex = drag.sourceIndex
      const targetIndex = drag.targetIndex
      this.clearDragState()

      if (didDrag && targetIndex >= 0 && targetIndex < slotCount && targetIndex !== sourceIndex) {
        const sourceCode = this._config.layout[sourceIndex]
        const targetCode = this._config.layout[targetIndex]
        this._config.layout[sourceIndex] = targetCode
        this._config.layout[targetIndex] = sourceCode
        this.render()
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }))
      }
    }

    if (!didDrag && event.pointerType !== 'mouse') {
      this.showTooltip(code, event, true)
    }
  }

  handleCellPointerCancel(event) {
    if (this._dragState && this._dragState.pointerId === event.pointerId) {
      this.clearDragState()
    }
  }

  setDropTarget(index) {
    if (!this._dragState) {
      return
    }

    if (this._dragState.targetIndex === index) {
      return
    }

    const previous = this._slots[this._dragState.targetIndex]
    if (previous) {
      previous.classList.remove('is-drop-target')
    }
    this._dragState.targetIndex = index
    const next = this._slots[index]
    if (next) {
      next.classList.add('is-drop-target')
    }
  }

  clearDragState() {
    if (!this._dragState) {
      return
    }

    const target = this._slots[this._dragState.targetIndex]
    if (target) {
      target.classList.remove('is-drop-target')
    }
    if (this._dragState.cell) {
      this._dragState.cell.classList.remove('is-dragging')
      if (this._dragState.cell.hasPointerCapture(this._dragState.pointerId)) {
        this._dragState.cell.releasePointerCapture(this._dragState.pointerId)
      }
    }
    this._dragState = null
  }

  showTooltip(code, event, pinned = false) {
    if (pinned && this._tooltipPinnedCode === code && this._activeCode === code) {
      this.hideTooltip(true)
      return
    }

    this._tooltipPinnedCode = pinned ? code : null
    this.setActiveCode(code)

    if (this._fullscreen) {
      this._tooltip.hidden = true
      this.renderFullscreenTooltip()
      return
    }

    this._tooltip.replaceChildren(createDetailsTable(code))
    this._tooltip.hidden = false
    this.positionTooltip(event)
  }

  positionTooltip(event) {
    if (this._tooltip.hidden || this._fullscreen) {
      return
    }

    const margin = 8
    const offset = 12
    const rect = this._tooltip.getBoundingClientRect()
    let left = event.clientX + offset
    let top = event.clientY + offset

    if (left + rect.width + margin > window.innerWidth) {
      left = event.clientX - rect.width - offset
    }
    if (top + rect.height + margin > window.innerHeight) {
      top = event.clientY - rect.height - offset
    }

    this._tooltip.style.left = `${Math.max(margin, left)}px`
    this._tooltip.style.top = `${Math.max(margin, top)}px`
  }

  hideTooltip(force = false) {
    if (this._tooltipPinnedCode && !force) {
      return
    }

    this._tooltip.hidden = true
    this._tooltipPinnedCode = null
    this.setActiveCode(null)
    this.renderFullscreenTooltip()
  }

  setActiveCode(code) {
    if (this._activeCode) {
      const previous = this._cellByCode.get(this._activeCode)
      if (previous) {
        previous.classList.remove('is-active')
      }
    }

    this._activeCode = code
    if (code) {
      const next = this._cellByCode.get(code)
      if (next) {
        next.classList.add('is-active')
      }
    }
  }

  renderFullscreenTooltip() {
    if (!this._fullscreenTooltip) {
      return
    }

    if (!this._activeCode) {
      const placeholder = document.createElement('div')
      placeholder.className = 'tooltip-placeholder'
      placeholder.textContent = 'Hover or tap a cell to see its GICS classification.'
      this._fullscreenTooltip.replaceChildren(placeholder)
      return
    }

    this._fullscreenTooltip.replaceChildren(createDetailsTable(this._activeCode))
  }
}
