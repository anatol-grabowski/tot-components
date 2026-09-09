import { registerDemo } from '../demoCommon.js'

const incomeState = [
  {
    key: 'revenue',
    label: 'Revenues',
    abbreviation: 'R',
    effect: 1,
    color: 'var(--tot-color-blue-400)',
    value: 119796,
    previous: 96428,
  },
  {
    key: 'costs',
    label: 'Costs and expenses',
    abbreviation: 'C',
    effect: -1,
    color: 'var(--tot-color-orange-400)',
    value: 79026,
    previous: 65157,
    subcategories: [
      { key: 'cost-revenue', label: 'Cost of revenues', abbreviation: 'CoR', value: 45943, previous: 39039 },
      { key: 'research', label: 'Research and development', abbreviation: 'R&D', value: 18219, previous: 13808 },
      { key: 'sales', label: 'Sales and marketing', abbreviation: 'S&M', value: 8403, previous: 7101 },
      { key: 'admin', label: 'General and administrative', abbreviation: 'G&A', value: 6461, previous: 5209 },
    ],
  },
  {
    key: 'other-income',
    label: 'Other income (expense), net',
    abbreviation: 'OI',
    effect: 1,
    color: 'var(--tot-color-violet-400)',
    value: 97983,
    previous: 2662,
  },
  {
    key: 'taxes',
    label: 'Provision for income taxes',
    abbreviation: 'T',
    effect: -1,
    color: 'var(--tot-color-amber-400)',
    value: 26560,
    previous: 5737,
  },
  {
    key: 'preferred-dividends',
    label: 'Preferred stock dividends',
    abbreviation: 'PD',
    effect: -1,
    color: 'var(--tot-color-neutral-400)',
    dimmed: true,
    value: 86,
    previous: 0,
  },
  {
    key: 'oci',
    label: 'Other comprehensive income (loss)',
    abbreviation: 'OCI',
    effect: 1,
    color: 'var(--tot-color-yellow-300)',
    dimmed: true,
    value: -105,
    previous: 1959,
    subcategories: [
      {
        key: 'fx-translation',
        label: 'Change in foreign currency translation adjustment',
        abbreviation: 'FX',
        value: -9,
        previous: 2610,
      },
      {
        key: 'afs-unrealized',
        label: 'Available-for-sale investments — change in net unrealized gains (losses)',
        abbreviation: 'AFS Δ',
        value: -273,
        previous: 191,
      },
      {
        key: 'afs-reclassification',
        label: 'Available-for-sale investments — less: reclassification adjustment for net (gains) losses included in net income',
        abbreviation: 'AFS R',
        value: 34,
        previous: -29,
      },
      {
        key: 'cash-flow-hedges-unrealized',
        label: 'Cash flow hedges — change in net unrealized gains (losses)',
        abbreviation: 'CFH Δ',
        value: 228,
        previous: -920,
      },
      {
        key: 'cash-flow-hedges-reclassification',
        label: 'Cash flow hedges — less: reclassification adjustment for net (gains) losses included in net income',
        abbreviation: 'CFH R',
        value: -85,
        previous: 107,
      },
    ],
  },
]

const balanceConfig = {
  label: 'Alphabet balance sheet comparison',
  orientation: 'vertical',
  compare: true,
  tearThreshold: 1.5,
  periods: {
    current: 'June 2026',
    previous: 'December 2025',
  },
  towers: [
    {
      key: 'assets',
      label: 'Assets',
      categories: [
        {
          key: 'current-assets',
          label: 'Current assets',
          abbreviation: 'CA',
          color: 'var(--tot-color-blue-300)',
          value: 343524,
          previous: 206038,
          subcategories: [
            { key: 'cash', label: 'Cash and cash equivalents', abbreviation: 'Cash', value: 55911, previous: 30708 },
            { key: 'marketable', label: 'Marketable securities', abbreviation: 'MS', value: 186563, previous: 96135 },
            { key: 'receivables', label: 'Accounts receivable, net', abbreviation: 'AR', value: 69175, previous: 62886 },
            { key: 'inventory', label: 'Inventory', abbreviation: 'Inv', value: 9991, previous: 2439 },
            { key: 'other-current', label: 'Other current assets', abbreviation: 'OCA', value: 21884, previous: 13870 },
          ],
        },
        {
          key: 'noncurrent-assets',
          label: 'Non-current assets excluding property and equipment',
          abbreviation: 'nCA',
          color: 'var(--tot-color-amber-200)',
          value: 257247,
          previous: 142646,
          subcategories: [
            { key: 'nonmarketable', label: 'Non-marketable securities', abbreviation: 'nMS', value: 131461, previous: 68687 },
            { key: 'deferred-income-taxes-asset', label: 'Deferred income taxes', abbreviation: 'DIT', value: 1448, previous: 9113 },
            { key: 'lease-assets', label: 'Operating lease assets', abbreviation: 'OLA', value: 17694, previous: 15221 },
            { key: 'goodwill', label: 'Goodwill', abbreviation: 'GW', value: 57828, previous: 33380 },
            { key: 'intangibles', label: 'Intangible assets, net', abbreviation: 'IA', value: 9105, previous: 1283 },
            { key: 'other-noncurrent', label: 'Other non-current assets', abbreviation: 'OnCA', value: 39711, previous: 14962 },
          ],
        },
        {
          key: 'property-equipment',
          label: 'Property and equipment, net',
          abbreviation: 'PPE',
          color: 'var(--tot-color-green-300)',
          value: 321212,
          previous: 246597,
        },
      ],
    },
    {
      key: 'liabilities-equity',
      label: 'Liabilities + equity',
      categories: [
        {
          key: 'current-liabilities',
          label: 'Current liabilities',
          abbreviation: 'CL',
          color: 'var(--tot-color-rose-300)',
          value: 126111,
          previous: 102745,
          subcategories: [
            { key: 'accounts-payable', label: 'Accounts payable', abbreviation: 'AP', value: 20258, previous: 12200 },
            { key: 'accrued-compensation', label: 'Accrued compensation and benefits', abbreviation: 'Comp', value: 15086, previous: 17546 },
            { key: 'accrued-expenses', label: 'Accrued expenses and other current liabilities', abbreviation: 'AEL', value: 73014, previous: 55557 },
            { key: 'accrued-revenue-share', label: 'Accrued revenue share', abbreviation: 'ARS', value: 10599, previous: 10864 },
            { key: 'deferred-revenue', label: 'Deferred revenue', abbreviation: 'DR', value: 7154, previous: 6578 },
          ],
        },
        {
          key: 'noncurrent-liabilities',
          label: 'Non-current liabilities',
          abbreviation: 'nCL',
          color: 'var(--tot-color-orange-300)',
          value: 155392,
          previous: 77271,
          subcategories: [
            { key: 'long-term-debt', label: 'Long-term debt', abbreviation: 'LTD', value: 98165, previous: 46547 },
            { key: 'income-taxes-payable', label: 'Income taxes payable, non-current', abbreviation: 'ITP', value: 11306, previous: 9531 },
            { key: 'deferred-income-taxes-liability', label: 'Deferred income taxes', abbreviation: 'DIT', value: 22819, previous: 919 },
            { key: 'lease-liabilities', label: 'Operating lease liabilities', abbreviation: 'OLL', value: 14591, previous: 12744 },
            { key: 'other-long-term-liabilities', label: 'Other long-term liabilities', abbreviation: 'OLTL', value: 8511, previous: 7530 },
          ],
        },
        {
          key: 'equity',
          label: 'Stockholders’ equity',
          abbreviation: 'E',
          color: 'var(--tot-color-green-300)',
          value: 640480,
          previous: 415265,
          subcategories: [
            {
              key: 'preferred-stock',
              label: 'Series A and Series B preferred stock and additional paid-in capital',
              abbreviation: 'PS',
              value: 18023,
              previous: 0,
            },
            {
              key: 'common-stock',
              label: 'Class A, Class B, and Class C stock and additional paid-in capital',
              abbreviation: 'CS',
              value: 131371,
              previous: 93126,
            },
            {
              key: 'accumulated-other-comprehensive-income',
              label: 'Accumulated other comprehensive income (loss)',
              abbreviation: 'AOCI',
              value: -2285,
              previous: -1916,
            },
            {
              key: 'retained-earnings',
              label: 'Retained earnings',
              abbreviation: 'RE',
              value: 493371,
              previous: 324055,
            },
          ],
        },
      ],
    },
  ],
}

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

        .two-towers-demo-values .name {
          align-items: center;
          color: var(--tot-input-color, #1e293b);
          display: flex;
          font-size: var(--tot-font-size-x-small, .75rem);
          min-height: 1.8rem;
          overflow: hidden;
          padding-inline: var(--tot-spacing-3x-small, .125rem);
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .two-towers-demo-values .name.subcategory {
          color: var(--tot-color-neutral-600, #475569);
          padding-inline-start: var(--tot-spacing-medium, 1rem);
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
        <div class="demo-label">Balance sheet — Alphabet 10-Q values and groupings from the reference statement</div>
        <tot-two-towers id="balanceTowers"></tot-two-towers>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">Income statement — Alphabet, three months ended June 30, 2025 / 2026 — fully configurable</div>
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
    const incomeTowers = demo.querySelector('#incomeTowers')
    const orientation = demo.querySelector('#incomeOrientation')
    const compare = demo.querySelector('#incomeCompare')
    const tearThreshold = demo.querySelector('#incomeTearThreshold')
    const values = demo.querySelector('#incomeValues')

    balanceTowers.config = balanceConfig

    const renderIncome = () => {
      incomeTowers.config = createIncomeConfig({
        orientation: orientation.value,
        compare: compare.checked,
        tearThreshold: Number(tearThreshold.value),
      })
    }

    renderIncomeInputs(values, renderIncome)
    orientation.addEventListener('change', renderIncome)
    compare.addEventListener('change', renderIncome)
    tearThreshold.addEventListener('input', renderIncome)
    renderIncome()

    container.appendChild(demo)
  },
})

function createIncomeConfig(options) {
  const left = []
  const right = []

  for (let i = 0; i < incomeState.length; i++) {
    const definition = incomeState[i]
    const currentContribution = definition.value * definition.effect
    const category = {
      key: definition.key,
      label: definition.label,
      abbreviation: definition.abbreviation,
      color: definition.color,
      dimmed: definition.dimmed,
      value: definition.value,
      previous: definition.previous,
    }

    if (definition.subcategories) {
      category.subcategories = []
      for (let j = 0; j < definition.subcategories.length; j++) {
        const subcategory = definition.subcategories[j]
        category.subcategories.push({
          key: subcategory.key,
          label: subcategory.label,
          abbreviation: subcategory.abbreviation,
          value: subcategory.value,
          previous: subcategory.previous,
        })
      }
    }

    if (currentContribution >= 0) {
      left.push(category)
    } else {
      right.push(category)
    }
  }

  return {
    label: 'Income statement comparison',
    orientation: options.orientation,
    compare: options.compare,
    tearThreshold: options.tearThreshold,
    periods: {
      current: 'June 2026',
      previous: 'June 2025',
    },
    towers: [
      {
        key: 'income-positive',
        label: 'Positive contributions',
        categories: left,
      },
      {
        key: 'income-negative',
        label: 'Negative contributions',
        categories: right,
      },
    ],
  }
}

function renderIncomeInputs(container, onChange) {
  container.replaceChildren()

  const headers = ['Concept', 'Current', 'Previous']
  for (let i = 0; i < headers.length; i++) {
    const head = document.createElement('div')
    head.className = 'head'
    head.textContent = headers[i]
    container.append(head)
  }

  for (let categoryIndex = 0; categoryIndex < incomeState.length; categoryIndex++) {
    const category = incomeState[categoryIndex]
    appendValueRow(container, category, false, onChange)

    if (!category.subcategories) {
      continue
    }

    for (let subcategoryIndex = 0; subcategoryIndex < category.subcategories.length; subcategoryIndex++) {
      appendValueRow(
        container,
        category.subcategories[subcategoryIndex],
        true,
        onChange,
      )
    }
  }
}

function appendValueRow(container, item, subcategory, onChange) {
  const name = document.createElement('div')
  name.className = `name${subcategory ? ' subcategory' : ''}`
  name.textContent = `${item.abbreviation} — ${item.label}`
  name.title = item.label

  const current = createNumberInput(item.value, (value) => {
    item.value = value
    onChange()
  })
  const previous = createNumberInput(item.previous, (value) => {
    item.previous = value
    onChange()
  })

  container.append(name, current, previous)
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
