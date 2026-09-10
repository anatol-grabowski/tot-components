import { registerDemo } from '../demoCommon.js'

const incomeCategories = [
  {
    key: 'revenue',
    name: 'Revenues',
    shortName: 'R',
    color: 'var(--tot-color-blue-400)',
    subcategories: [
      { name: 'Revenues', shortName: 'R', current: 119796, previous: 96428 },
    ],
  },
  {
    key: 'costs',
    name: 'Total costs and expenses',
    shortName: 'C',
    color: 'var(--tot-color-orange-400)',
    subcategories: [
      { name: 'Cost of revenues', shortName: 'CoR', current: -45943, previous: -39039, display: { current: 45943, previous: 39039 } },
      { name: 'Research and development', shortName: 'R&D', current: -18219, previous: -13808, display: { current: 18219, previous: 13808 } },
      { name: 'Sales and marketing', shortName: 'S&M', current: -8403, previous: -7101, display: { current: 8403, previous: 7101 } },
      { name: 'General and administrative', shortName: 'G&A', current: -6461, previous: -5209, display: { current: 6461, previous: 5209 } },
    ],
  },
  {
    key: 'other-income',
    name: 'Other income (expense), net',
    shortName: 'OI',
    color: 'var(--tot-color-violet-400)',
    subcategories: [
      { name: 'Other income (expense), net', shortName: 'OI', current: 97983, previous: 2662 },
    ],
  },
  {
    key: 'taxes',
    name: 'Provision for income taxes',
    shortName: 'T',
    color: 'var(--tot-color-amber-400)',
    subcategories: [
      { name: 'Provision for income taxes', shortName: 'T', current: -26560, previous: -5737, display: { current: 26560, previous: 5737 } },
    ],
  },
  {
    key: 'preferred-dividends',
    name: 'Preferred stock dividends',
    shortName: 'PD',
    color: 'var(--tot-color-neutral-400)',
    subcategories: [
      { name: 'Preferred stock dividends', shortName: 'PD', current: -86, previous: 0, display: { current: 86, previous: 0 } },
    ],
  },
  {
    key: 'oci',
    name: 'Other comprehensive income (loss)',
    shortName: 'OCI',
    color: 'var(--tot-color-yellow-300)',
    subcategories: [
      {
        name: 'Change in foreign currency translation adjustment',
        shortName: 'FX',
        current: -9,
        previous: 2610,
        display: { current: '(9)', previous: 2610 },
      },
      {
        name: 'Available-for-sale investments — change in net unrealized gains (losses)',
        shortName: 'AFS Δ',
        current: -273,
        previous: 191,
        display: { current: '(273)', previous: 191 },
      },
      {
        name: 'Available-for-sale investments — less: reclassification adjustment for net (gains) losses included in net income',
        shortName: 'AFS R',
        current: 34,
        previous: -29,
        display: { current: 34, previous: '(29)' },
      },
      {
        name: 'Cash flow hedges — change in net unrealized gains (losses)',
        shortName: 'CFH Δ',
        current: 228,
        previous: -920,
        display: { current: 228, previous: '(920)' },
      },
      {
        name: 'Cash flow hedges — less: reclassification adjustment for net (gains) losses included in net income',
        shortName: 'CFH R',
        current: -85,
        previous: 107,
        display: { current: '(85)', previous: 107 },
      },
    ],
  },
]

const balanceCategories = [
  {
    key: 'current-assets',
    name: 'Total current assets',
    shortName: 'CA',
    color: 'var(--tot-color-blue-300)',
    subcategories: [
      { name: 'Cash and cash equivalents', shortName: 'Cash', current: 55911, previous: 30708 },
      { name: 'Marketable securities', shortName: 'MS', current: 186563, previous: 96135 },
      { name: 'Accounts receivable, net', shortName: 'AR', current: 69175, previous: 62886 },
      { name: 'Inventory', shortName: 'Inv', current: 9991, previous: 2439 },
      { name: 'Other current assets', shortName: 'OCA', current: 21884, previous: 13870 },
    ],
  },
  {
    key: 'noncurrent-assets',
    name: 'Non-current assets excluding property and equipment',
    shortName: 'nCA',
    color: 'var(--tot-color-amber-200)',
    subcategories: [
      { name: 'Non-marketable securities', shortName: 'nMS', current: 131461, previous: 68687 },
      { name: 'Deferred income taxes', shortName: 'DIT', current: 1448, previous: 9113 },
      { name: 'Operating lease assets', shortName: 'OLA', current: 17694, previous: 15221 },
      { name: 'Goodwill', shortName: 'GW', current: 57828, previous: 33380 },
      { name: 'Intangible assets, net', shortName: 'IA', current: 9105, previous: 1283 },
      { name: 'Other non-current assets', shortName: 'OnCA', current: 39711, previous: 14962 },
    ],
  },
  {
    key: 'property-equipment',
    name: 'Property and equipment, net',
    shortName: 'PPE',
    color: 'var(--tot-color-green-300)',
    subcategories: [
      { name: 'Property and equipment, net', shortName: 'PPE', current: 321212, previous: 246597 },
    ],
  },
  {
    key: 'current-liabilities',
    name: 'Total current liabilities',
    shortName: 'CL',
    color: 'var(--tot-color-rose-300)',
    subcategories: [
      { name: 'Accounts payable', shortName: 'AP', current: -20258, previous: -12200, display: { current: 20258, previous: 12200 } },
      { name: 'Accrued compensation and benefits', shortName: 'Comp', current: -15086, previous: -17546, display: { current: 15086, previous: 17546 } },
      { name: 'Accrued expenses and other current liabilities', shortName: 'AEL', current: -73014, previous: -55557, display: { current: 73014, previous: 55557 } },
      { name: 'Accrued revenue share', shortName: 'ARS', current: -10599, previous: -10864, display: { current: 10599, previous: 10864 } },
      { name: 'Deferred revenue', shortName: 'DR', current: -7154, previous: -6578, display: { current: 7154, previous: 6578 } },
    ],
  },
  {
    key: 'noncurrent-liabilities',
    name: 'Non-current liabilities',
    shortName: 'nCL',
    color: 'var(--tot-color-orange-300)',
    subcategories: [
      { name: 'Long-term debt', shortName: 'LTD', current: -98165, previous: -46547, display: { current: 98165, previous: 46547 } },
      { name: 'Income taxes payable, non-current', shortName: 'ITP', current: -11306, previous: -9531, display: { current: 11306, previous: 9531 } },
      { name: 'Deferred income taxes', shortName: 'DIT', current: -22819, previous: -919, display: { current: 22819, previous: 919 } },
      { name: 'Operating lease liabilities', shortName: 'OLL', current: -14591, previous: -12744, display: { current: 14591, previous: 12744 } },
      { name: 'Other long-term liabilities', shortName: 'OLTL', current: -8511, previous: -7530, display: { current: 8511, previous: 7530 } },
    ],
  },
  {
    key: 'equity',
    name: 'Total stockholders’ equity',
    shortName: 'E',
    color: 'var(--tot-color-green-300)',
    subcategories: [
      {
        name: 'Series A and Series B preferred stock and additional paid-in capital',
        shortName: 'PS',
        current: -18023,
        previous: 0,
        display: { current: 18023, previous: 0 },
      },
      {
        name: 'Class A, Class B, and Class C stock and additional paid-in capital',
        shortName: 'CS',
        current: -131371,
        previous: -93126,
        display: { current: 131371, previous: 93126 },
      },
      {
        name: 'Accumulated other comprehensive income (loss)',
        shortName: 'AOCI',
        current: 2285,
        previous: 1916,
        display: { current: -2285, previous: -1916 },
      },
      { name: 'Retained earnings', shortName: 'RE', current: -493371, previous: -324055, display: { current: 493371, previous: 324055 } },
    ],
  },
]

const cashFlowCategories = [
  {
    key: 'operating-activities',
    name: 'Net cash provided by operating activities',
    shortName: 'Operating',
    color: 'var(--tot-color-green-400)',
    subcategories: [
      { name: 'Net income', shortName: 'NI', current: 174771, previous: 62736 },
      { name: 'Depreciation of property and equipment', shortName: 'D&A', current: 13586, previous: 9485 },
      { name: 'Stock-based compensation expense', shortName: 'SBC', current: 14708, previous: 11514 },
      { name: 'Deferred income taxes', shortName: 'DIT', current: 27538, previous: -1596, display: { current: 27538, previous: '(1,596)' } },
      { name: 'Loss (gain) on debt and equity securities, net', shortName: 'Sec', current: -135803, previous: -11411, display: { current: '(135,803)', previous: '(11,411)' } },
      { name: 'Other', shortName: 'Other', current: 3161, previous: 1041 },
      { name: 'Accounts receivable, net', shortName: 'AR', current: -6904, previous: -1201, display: { current: '(6,904)', previous: '(1,201)' } },
      { name: 'Inventory', shortName: 'Inv', current: -7739, previous: -628, display: { current: '(7,739)', previous: '(628)' } },
      { name: 'Income taxes, net', shortName: 'Tax', current: 8304, previous: -2434, display: { current: 8304, previous: '(2,434)' } },
      { name: 'Other assets', shortName: 'OA', current: -9950, previous: -2139, display: { current: '(9,950)', previous: '(2,139)' } },
      { name: 'Accounts payable', shortName: 'AP', current: 2090, previous: -327, display: { current: 2090, previous: '(327)' } },
      { name: 'Accrued expenses and other liabilities', shortName: 'AEL', current: 308, previous: -1779, display: { current: 308, previous: '(1,779)' } },
      { name: 'Deferred revenue', shortName: 'DR', current: 789, previous: 636 },
    ],
  },
  {
    key: 'investing-activities',
    name: 'Net cash used in investing activities',
    shortName: 'Investing',
    color: 'var(--tot-color-orange-400)',
    subcategories: [
      { name: 'Purchases of property and equipment', shortName: 'PPE', current: -80598, previous: -39643, display: { current: '(80,598)', previous: '(39,643)' } },
      { name: 'Purchases of marketable securities', shortName: 'MS−', current: -76480, previous: -39870, display: { current: '(76,480)', previous: '(39,870)' } },
      { name: 'Maturities and sales of marketable securities', shortName: 'MS+', current: 66696, previous: 40930 },
      { name: 'Purchases of non-marketable securities', shortName: 'nMS−', current: -22051, previous: -2312, display: { current: '(22,051)', previous: '(2,312)' } },
      { name: 'Maturities and sales of non-marketable securities', shortName: 'nMS+', current: 1667, previous: 873 },
      { name: 'Acquisitions, net of cash acquired, and purchases of intangible assets', shortName: 'Acq', current: -33697, previous: -353, display: { current: '(33,697)', previous: '(353)' } },
      { name: 'Other investing activities', shortName: 'Other', current: -1359, previous: -363, display: { current: '(1,359)', previous: '(363)' } },
    ],
  },
  {
    key: 'financing-activities',
    name: 'Net cash provided by (used in) financing activities',
    shortName: 'Financing',
    color: 'var(--tot-color-violet-400)',
    subcategories: [
      { name: 'Net payments related to stock-based award activities', shortName: 'SBA', current: -12056, previous: -5731, display: { current: '(12,056)', previous: '(5,731)' } },
      { name: 'Repurchases of stock', shortName: 'Buyback', current: 0, previous: -28306, display: { current: 0, previous: '(28,306)' } },
      { name: 'Dividend payments', shortName: 'Div', current: -5231, previous: -4977, display: { current: '(5,231)', previous: '(4,977)' } },
      { name: 'Proceeds from issuance of common stock, net of costs', shortName: 'CS', current: 30499, previous: 0 },
      { name: 'Proceeds from issuance of mandatory convertible preferred stock, net of costs', shortName: 'PS', current: 19063, previous: 0 },
      { name: 'Proceeds from issuance of debt, net of costs', shortName: 'Debt+', current: 56226, previous: 31378 },
      { name: 'Repayments of debt', shortName: 'Debt−', current: -5253, previous: -18397, display: { current: '(5,253)', previous: '(18,397)' } },
      { name: 'Proceeds from sale of interests in consolidated entities, net', shortName: 'Sale', current: 3758, previous: 400 },
      { name: 'Other financing activities', shortName: 'Other', current: -686, previous: -400, display: { current: '(686)', previous: '(400)' } },
    ],
  },
  {
    key: 'exchange-rate-effect',
    name: 'Effect of exchange rate changes on cash and cash equivalents',
    shortName: 'FX',
    color: 'var(--tot-color-amber-400)',
    subcategories: [
      { name: 'Effect of exchange rate changes on cash and cash equivalents', shortName: 'FX', current: -154, previous: 444, display: { current: '(154)', previous: 444 } },
    ],
  },
  {
    key: 'cash-and-cash-equivalents',
    name: 'Cash and cash equivalents',
    shortName: 'Cash',
    color: 'var(--tot-color-blue-300)',
    display: { current: '55,911', previous: '21,036' },
    subcategories: [
      {
        name: 'Cash and cash equivalents at beginning of period',
        shortName: 'Dec 31, 2025',
        current: 30708,
        previous: 23466,
      },
      {
        name: 'Cash and cash equivalents at end of period',
        shortName: 'Jun 30, 2026',
        current: -55911,
        previous: -21036,
        display: { current: '55,911', previous: '21,036' },
      },
    ],
  },
]

registerDemo({
  id: 'tot-two-towers',
  title: 'Two Towers',
  render: (container) => {
    const demo = document.createElement('div')
    demo.className = 'stack'
    demo.innerHTML = `
      <style>
        .two-towers-demo-controls {
          background: var(--tot-panel-background-color, #fff);
          border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
          border-radius: var(--tot-border-radius-large, 6px);
          display: grid;
          gap: var(--tot-spacing-x-small, .5rem);
          padding: var(--tot-spacing-x-small, .5rem);
        }

        .two-towers-demo-toolbar {
          align-items: end;
          display: flex;
          flex-wrap: wrap;
          gap: var(--tot-spacing-x-small, .5rem);
        }

        .two-towers-demo-field {
          color: var(--tot-color-neutral-600, #475569);
          display: grid;
          font-size: var(--tot-font-size-x-small, .75rem);
          font-weight: var(--tot-font-weight-semibold, 600);
          gap: var(--tot-spacing-3x-small, .125rem);
        }

        .two-towers-demo-field > input,
        .two-towers-demo-field > select {
          background: var(--tot-input-background-color, #fff);
          border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
          border-radius: var(--tot-input-border-radius-small, 3px);
          color: var(--tot-input-color, #1e293b);
          font: inherit;
          min-height: var(--tot-input-height-small, 1.875rem);
          padding: 0 var(--tot-input-spacing-small, .5rem);
        }

        .two-towers-demo-check {
          align-items: center;
          color: var(--tot-input-color, #1e293b);
          display: inline-flex;
          font-size: var(--tot-font-size-small, .875rem);
          gap: var(--tot-spacing-2x-small, .25rem);
          min-height: var(--tot-input-height-small, 1.875rem);
        }

        .two-towers-demo-values {
          display: grid;
          gap: var(--tot-spacing-3x-small, .125rem);
          grid-template-columns: minmax(9rem, 1fr) repeat(2, minmax(5.5rem, .55fr));
        }

        .two-towers-demo-values > * {
          min-width: 0;
        }

        .two-towers-demo-values .head {
          color: var(--tot-color-neutral-500, #64748b);
          font-size: var(--tot-font-size-2x-small, .625rem);
          font-weight: var(--tot-font-weight-semibold, 600);
          padding: 0 var(--tot-spacing-3x-small, .125rem);
          text-transform: uppercase;
        }

        .two-towers-demo-values .category {
          color: var(--tot-input-color, #1e293b);
          font-size: var(--tot-font-size-x-small, .75rem);
          font-weight: var(--tot-font-weight-semibold, 600);
          grid-column: 1 / -1;
          padding: var(--tot-spacing-2x-small, .25rem) var(--tot-spacing-3x-small, .125rem) 0;
        }

        .two-towers-demo-values .name {
          align-items: center;
          color: var(--tot-color-neutral-600, #475569);
          display: flex;
          font-size: var(--tot-font-size-x-small, .75rem);
          min-height: 1.8rem;
          overflow: hidden;
          padding-inline-start: var(--tot-spacing-medium, 1rem);
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .two-towers-demo-values input {
          background: var(--tot-input-background-color, #fff);
          border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
          border-radius: var(--tot-input-border-radius-small, 3px);
          color: var(--tot-input-color, #1e293b);
          font: inherit;
          min-height: 1.8rem;
          min-width: 0;
          padding: 0 var(--tot-spacing-2x-small, .25rem);
          text-align: right;
          width: 100%;
        }

        @media (max-width: 34rem) {
          .two-towers-demo-values {
            grid-template-columns: minmax(7rem, 1fr) repeat(2, minmax(4.5rem, .7fr));
          }
        }
      </style>

      <div class="stack demo-group">
        <div class="demo-label">Balance sheet — signed subcategories determine the tower</div>
        <div class="two-towers-demo-controls">
          <div class="two-towers-demo-values" id="balanceValues"></div>
        </div>
        <tot-two-towers id="balanceTowers"></tot-two-towers>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">Cash flows — signed subcategories can share one category across both towers</div>
        <div class="two-towers-demo-controls">
          <div class="two-towers-demo-toolbar">
            <label class="two-towers-demo-check">
              <input id="cashFlowCompare" type="checkbox">
              Compare previous
            </label>
          </div>
        </div>
        <tot-two-towers id="cashFlowTowers"></tot-two-towers>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">Income statement — fully configurable</div>
        <div class="two-towers-demo-controls">
          <div class="two-towers-demo-toolbar">
            <label class="two-towers-demo-field">
              Orientation
              <select id="incomeOrientation">
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
            </label>
            <label class="two-towers-demo-field">
              Tear threshold
              <input id="incomeTearThreshold" type="number" min="1.05" step=".05" value="1.5">
            </label>
            <label class="two-towers-demo-check">
              <input id="incomeCompare" type="checkbox" checked>
              Compare previous
            </label>
          </div>
          <div class="two-towers-demo-values" id="incomeValues"></div>
        </div>
        <tot-two-towers id="incomeTowers"></tot-two-towers>
      </div>
    `

    const balanceTowers = demo.querySelector('#balanceTowers')
    const cashFlowTowers = demo.querySelector('#cashFlowTowers')
    const incomeTowers = demo.querySelector('#incomeTowers')
    const balanceValues = demo.querySelector('#balanceValues')
    const cashFlowCompare = demo.querySelector('#cashFlowCompare')
    const orientation = demo.querySelector('#incomeOrientation')
    const compare = demo.querySelector('#incomeCompare')
    const tearThreshold = demo.querySelector('#incomeTearThreshold')
    const incomeValues = demo.querySelector('#incomeValues')

    const renderBalance = () => {
      balanceTowers.config = createBalanceConfig()
    }

    const renderCashFlow = () => {
      cashFlowTowers.config = createCashFlowConfig(cashFlowCompare.checked)
    }

    const renderIncome = () => {
      incomeTowers.config = createIncomeConfig({
        orientation: orientation.value,
        compare: compare.checked,
        tearThreshold: Number(tearThreshold.value),
      })
    }

    renderValueInputs(balanceValues, balanceCategories, renderBalance)
    renderBalance()
    cashFlowCompare.addEventListener('change', renderCashFlow)
    renderCashFlow()
    renderValueInputs(incomeValues, incomeCategories, renderIncome)
    orientation.addEventListener('change', renderIncome)
    compare.addEventListener('change', renderIncome)
    tearThreshold.addEventListener('input', renderIncome)
    renderIncome()

    container.appendChild(demo)
  },
})

function createBalanceConfig() {
  return {
    label: 'Alphabet balance sheet comparison',
    orientation: 'vertical',
    compare: true,
    tearThreshold: 1.5,
    positiveLabel: 'Assets',
    negativeLabel: 'Liabilities + equity',
    periods: {
      current: 'Jun 30, 2026',
      previous: 'Dec 31, 2025',
    },
    categories: balanceCategories,
  }
}

function createCashFlowConfig(compare) {
  return {
    label: 'Alphabet cash flow reconciliation',
    orientation: 'vertical',
    compare,
    tearThreshold: 1.5,
    positiveLabel: 'Positive cash flows',
    negativeLabel: 'Negative cash flows',
    periods: {
      current: 'Jun 30, 2026',
      previous: 'Jun 30, 2025',
    },
    categories: cashFlowCategories,
  }
}

function createIncomeConfig(options) {
  return {
    label: 'Income statement comparison',
    orientation: options.orientation,
    compare: options.compare,
    tearThreshold: options.tearThreshold,
    positiveLabel: 'Positive contributions',
    negativeLabel: 'Negative contributions',
    periods: {
      current: 'Jun 30, 2026',
      previous: 'Jun 30, 2025',
    },
    categories: incomeCategories,
  }
}

function renderValueInputs(container, categories, onChange) {
  container.replaceChildren()
  appendValueHeaders(container)

  for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
    const category = categories[categoryIndex]
    const categoryName = document.createElement('div')
    categoryName.className = 'category'
    categoryName.textContent = category.shortName
      ? `${category.shortName} — ${category.name}`
      : category.name
    container.append(categoryName)

    for (let subcategoryIndex = 0; subcategoryIndex < category.subcategories.length; subcategoryIndex++) {
      appendValueRow(container, category.subcategories[subcategoryIndex], onChange)
    }
  }
}

function appendValueHeaders(container) {
  const headers = ['Concept', 'Current', 'Previous']
  for (let i = 0; i < headers.length; i++) {
    const head = document.createElement('div')
    head.className = 'head'
    head.textContent = headers[i]
    container.append(head)
  }
}

function appendValueRow(container, item, onChange) {
  const name = document.createElement('div')
  name.className = 'name'
  name.textContent = `${item.shortName} — ${item.name}`
  name.title = item.name
  const currentDisplayFactor = getDisplayFactor(item, 'current')
  const previousDisplayFactor = getDisplayFactor(item, 'previous', currentDisplayFactor)

  const current = createNumberInput(item.current, (value) => {
    item.current = value
    syncDisplayValue(item, 'current', value, currentDisplayFactor)
    onChange()
  })
  const previous = createNumberInput(item.previous, (value) => {
    item.previous = value
    syncDisplayValue(item, 'previous', value, previousDisplayFactor)
    onChange()
  })

  container.append(name, current, previous)
}

function getDisplayFactor(item, period, fallback = 1) {
  const raw = Number(item[period])
  const display = Number(item.display?.[period])
  if (Number.isFinite(raw) && Math.abs(raw) > 1e-9 && Number.isFinite(display)) {
    return display / raw
  }
  return fallback
}

function syncDisplayValue(item, period, value, factor) {
  if (!item.display || item.display[period] === undefined) {
    return
  }
  item.display[period] = value * factor
}

function createNumberInput(value, onInput) {
  const input = document.createElement('input')
  input.type = 'number'
  input.step = 'any'
  input.value = value
  input.addEventListener('input', () => {
    const nextValue = Number(input.value)
    onInput(Number.isFinite(nextValue) ? nextValue : 0)
  })
  return input
}
