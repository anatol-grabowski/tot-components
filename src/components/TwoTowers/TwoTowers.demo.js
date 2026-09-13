import { registerDemo } from '../demoCommon.js'
import {
  balanceFormulaConfig,
  cashFlowFormulaConfig,
  comprehensiveIncomeFormulaConfig,
} from '../Formula/Formula.demo.js'

const balanceValues = { ...balanceFormulaConfig.values }
const balancePreviousValues = {
  _Check: 0,
  Assets: 595281,
  AssetsCurrent: 206038,
  CashCashEquivalentsAndShortTermInvestments: 126843,
  CashAndCashEquivalentsAtCarryingValue: 30708,
  MarketableSecuritiesCurrent: 96135,
  AccountsReceivableNetCurrent: 62886,
  OtherAssetsCurrent: 13870,
  InventoryNet: 2439,
  OtherLongTermInvestments: 68687,
  DeferredIncomeTaxAssetsNet: 9113,
  PropertyPlantAndEquipmentAndFinanceLeaseRightOfUseAssetAfterAccumulatedDepreciationAndAmortization: 246597,
  OperatingLeaseRightOfUseAsset: 15221,
  Goodwill: 33380,
  OtherAssetsNoncurrent: 14962,
  IntangibleAssetsNetExcludingGoodwill: 1283,
  LiabilitiesAndStockholdersEquity: 595281,
  Liabilities: 180016,
  LiabilitiesCurrent: 102745,
  AccountsPayableCurrent: 12200,
  EmployeeRelatedLiabilitiesCurrent: 17546,
  AccruedLiabilitiesCurrent: 55557,
  AccruedRevenueShare: 10864,
  ContractWithCustomerLiabilityCurrent: 6578,
  LongTermDebtNoncurrent: 46547,
  AccruedIncomeTaxesNoncurrent: 9531,
  DeferredIncomeTaxLiabilitiesNet: 919,
  OperatingLeaseLiabilityNoncurrent: 12744,
  OtherLiabilitiesNoncurrent: 7530,
  CommitmentsAndContingencies: 0,
  StockholdersEquity: 415265,
  ConvertiblePreferredStockNonredeemableOrRedeemableIssuerOptionValue: 0,
  CommonStocksIncludingAdditionalPaidInCapital: 93126,
  AccumulatedOtherComprehensiveIncomeLossNetOfTax: -1916,
  RetainedEarningsAccumulatedDeficit: 324055,
}

const balanceGroups = {
  _Check: { hidden: true },
  AssetsCurrent: {
    name: 'Total current assets',
    color: 'var(--tot-color-blue-300)',
  },
  Assets: {
    name: 'Non-current assets excluding property and equipment',
    color: 'var(--tot-color-amber-200)',
  },
  PropertyPlantAndEquipmentAndFinanceLeaseRightOfUseAssetAfterAccumulatedDepreciationAndAmortization: {
    name: 'Property and equipment, net',
    color: 'var(--tot-color-green-300)',
  },
  LiabilitiesCurrent: {
    name: 'Total current liabilities',
    color: 'var(--tot-color-rose-300)',
  },
  Liabilities: {
    name: 'Non-current liabilities',
    color: 'var(--tot-color-orange-300)',
  },
  CommitmentsAndContingencies: {
    name: 'Commitments and Contingencies',
    color: 'var(--tot-color-neutral-300)',
  },
  StockholdersEquity: {
    name: 'Total stockholders’ equity',
    color: 'var(--tot-color-green-300)',
  },
}

const incomeValues = { ...comprehensiveIncomeFormulaConfig.values }
const incomePreviousValues = {
  ComprehensiveIncomeNetOfTax: 30155,
  NetIncomeLoss: 28196,
  IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest: 33933,
  OperatingIncomeLoss: 31271,
  Revenues: 96428,
  CostsAndExpenses: 65157,
  CostOfRevenue: 39039,
  ResearchAndDevelopmentExpense: 13808,
  SellingAndMarketingExpense: 7101,
  GeneralAndAdministrativeExpense: 5209,
  NonoperatingIncomeExpense: 2662,
  IncomeTaxExpenseBenefit: 5737,
  OtherComprehensiveIncomeLossNetOfTaxPortionAttributableToParent: 1959,
  OtherComprehensiveIncomeLossForeignCurrencyTransactionAndTranslationAdjustmentNetOfTax: 2610,
  OtherComprehensiveIncomeLossAvailableForSaleSecuritiesAdjustmentNetOfTax: 162,
  OtherComprehensiveIncomeUnrealizedHoldingGainLossOnSecuritiesArisingDuringPeriodNetOfTax: 191,
  OtherComprehensiveIncomeLossReclassificationAdjustmentFromAOCIForSaleOfSecuritiesNetOfTax: 29,
  OtherComprehensiveIncomeLossCashFlowHedgeGainLossAfterReclassificationAndTax: -813,
  OtherComprehensiveIncomeLossCashFlowHedgeGainLossBeforeReclassificationAfterTax: -920,
  OtherComprehensiveIncomeLossCashFlowHedgeGainLossReclassificationAfterTax: -107,
}

const incomeGroups = {
  Revenues: {
    name: 'Revenues',
    color: 'var(--tot-color-blue-400)',
  },
  CostsAndExpenses: {
    name: 'Total costs and expenses',
    color: 'var(--tot-color-orange-400)',
  },
  NonoperatingIncomeExpense: {
    name: 'Other income (expense), net',
    color: 'var(--tot-color-violet-400)',
  },
  IncomeTaxExpenseBenefit: {
    name: 'Provision for income taxes',
    color: 'var(--tot-color-amber-400)',
  },
  OtherComprehensiveIncomeLossNetOfTaxPortionAttributableToParent: {
    name: 'Other comprehensive income (loss)',
    color: 'var(--tot-color-yellow-300)',
  },
}

const cashFlowValues = cashFlowFormulaConfig.values
const cashFlowPreviousValues = {
  _Check: 0,
  CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect: -2430,
  NetCashProvidedByUsedInOperatingActivities: 63897,
  NetIncomeLoss: 62736,
  Depreciation: 9485,
  ShareBasedCompensation: 11514,
  DeferredIncomeTaxesAndTaxCredits: -1596,
  DebtAndEquitySecuritiesGainLoss: 11411,
  OtherNoncashIncomeExpense: -1041,
  IncreaseDecreaseInAccountsReceivable: 1201,
  IncreaseDecreaseInIncomeTaxes: -2434,
  IncreaseDecreaseInOtherOperatingAssets: 2139,
  IncreaseDecreaseInAccountsPayable: -327,
  IncreaseDecreaseInAccruedLiabilities: -1779,
  IncreaseDecreaseInContractWithCustomerLiability: 636,
  IncreaseDecreaseInInventories: 628,
  NetCashProvidedByUsedInInvestingActivities: -40738,
  PaymentsToAcquirePropertyPlantAndEquipment: 39643,
  PaymentsToAcquireMarketableSecurities: 39870,
  ProceedsFromSaleAndMaturityOfMarketableSecurities: 40930,
  PaymentsToAcquireOtherInvestments: 2312,
  ProceedsFromSaleAndMaturityOfOtherInvestments: 873,
  AcquisitionsNetOfCashAcquiredAndPurchasesOfIntangibleAssets: 353,
  PaymentsForProceedsFromOtherInvestingActivities: 363,
  NetCashProvidedByUsedInFinancingActivities: -26033,
  NetProceedsPaymentsRelatedToStockBasedAwardActivities: 5731,
  PaymentsForRepurchaseOfCommonStock: 28306,
  PaymentsOfOrdinaryDividends: 4977,
  ProceedsFromIssuanceOfCommonStock: 0,
  ProceedsFromIssuanceOfConvertiblePreferredStock: 0,
  ProceedsFromDebtNetOfIssuanceCosts: 31378,
  RepaymentsOfDebtAndCapitalLeaseObligations: 18397,
  ProceedsFromMinorityShareholders: 400,
  ProceedsFromPaymentsForOtherFinancingActivities: -400,
  EffectOfExchangeRateOnCashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents: 444,
  CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents: 23466,
  _CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents0: 21036,
}

const cashFlowGroups = {
  _Check: { hidden: true },
  NetCashProvidedByUsedInOperatingActivities: {
    name: 'Net cash provided by operating activities',
    color: 'var(--tot-color-green-400)',
  },
  NetCashProvidedByUsedInInvestingActivities: {
    name: 'Net cash used in investing activities',
    color: 'var(--tot-color-orange-400)',
  },
  NetCashProvidedByUsedInFinancingActivities: {
    name: 'Net cash provided by (used in) financing activities',
    color: 'var(--tot-color-violet-400)',
  },
  EffectOfExchangeRateOnCashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents: {
    name: 'Effect of exchange rate changes on cash and cash equivalents',
    color: 'var(--tot-color-amber-400)',
  },
  CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents: {
    name: 'Cash and cash equivalents',
    color: 'var(--tot-color-blue-300)',
    valueTag: '_CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents0',
  },
  _CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents0: {
    group: 'CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents',
  },
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

      <div class="two-towers-demo-controls">
        <div class="two-towers-demo-toolbar">
          <label class="two-towers-demo-check">
            <input id="twoTowersSimple" type="checkbox">
            Simple
          </label>
          <label class="two-towers-demo-check">
            <input id="twoTowersLegend" type="checkbox">
            Show legend
          </label>
        </div>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">Balance sheet — grouped directly from the CAL formula</div>
        <div class="two-towers-demo-controls">
          <div class="two-towers-demo-values" id="balanceValues"></div>
        </div>
        <tot-two-towers id="balanceTowers"></tot-two-towers>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">Cash flows — grouped directly from the CAL formula</div>
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
        <div class="demo-label">Income + comprehensive income — fully configurable</div>
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
    const balanceValuesElement = demo.querySelector('#balanceValues')
    const simple = demo.querySelector('#twoTowersSimple')
    const legend = demo.querySelector('#twoTowersLegend')
    const cashFlowCompare = demo.querySelector('#cashFlowCompare')
    const orientation = demo.querySelector('#incomeOrientation')
    const compare = demo.querySelector('#incomeCompare')
    const tearThreshold = demo.querySelector('#incomeTearThreshold')
    const incomeValuesElement = demo.querySelector('#incomeValues')

    const renderBalance = () => {
      balanceTowers.config = createBalanceConfig({ simple: simple.checked, legend: legend.checked })
    }

    const renderCashFlow = () => {
      cashFlowTowers.config = createCashFlowConfig(cashFlowCompare.checked, { simple: simple.checked, legend: legend.checked })
    }

    const renderIncome = () => {
      incomeTowers.config = createIncomeConfig({
        orientation: orientation.value,
        compare: compare.checked,
        tearThreshold: Number(tearThreshold.value),
        simple: simple.checked,
        legend: legend.checked,
      })
    }

    const renderAll = () => {
      renderBalance()
      renderCashFlow()
      renderIncome()
    }
    simple.addEventListener('change', renderAll)
    legend.addEventListener('change', renderAll)

    renderValueInputs(
      balanceValuesElement,
      balanceFormulaConfig.items,
      balanceGroups,
      balanceFormulaConfig.abbreviations,
      balanceValues,
      balancePreviousValues,
      renderBalance,
    )
    renderBalance()
    cashFlowCompare.addEventListener('change', renderCashFlow)
    renderCashFlow()
    renderValueInputs(
      incomeValuesElement,
      comprehensiveIncomeFormulaConfig.items,
      incomeGroups,
      comprehensiveIncomeFormulaConfig.abbreviations,
      incomeValues,
      incomePreviousValues,
      renderIncome,
    )
    orientation.addEventListener('change', renderIncome)
    compare.addEventListener('change', renderIncome)
    tearThreshold.addEventListener('input', renderIncome)
    renderIncome()

    container.appendChild(demo)
  },
})

function createBalanceConfig(options = {}) {
  return {
    label: 'Alphabet balance sheet comparison',
    orientation: 'vertical',
    simple: options.simple === true,
    legend: options.legend === true,
    compare: true,
    tearThreshold: 1.5,
    positiveLabel: 'Assets',
    negativeLabel: 'Liabilities + equity',
    periods: {
      current: 'Jun 30, 2026',
      previous: 'Dec 31, 2025',
    },
    formula: balanceFormulaConfig,
    abbreviations: balanceFormulaConfig.abbreviations,
    values: balanceValues,
    previousValues: balancePreviousValues,
    groups: balanceGroups,
  }
}

function createCashFlowConfig(compare, options = {}) {
  return {
    label: 'Alphabet cash flow reconciliation',
    orientation: 'vertical',
    simple: options.simple === true,
    legend: options.legend === true,
    compare,
    tearThreshold: 1.5,
    positiveLabel: 'Positive cash flows',
    negativeLabel: 'Negative cash flows',
    periods: {
      current: 'Jun 30, 2026',
      previous: 'Jun 30, 2025',
    },
    formula: cashFlowFormulaConfig,
    abbreviations: cashFlowFormulaConfig.abbreviations,
    values: cashFlowValues,
    previousValues: cashFlowPreviousValues,
    groups: cashFlowGroups,
  }
}

function createIncomeConfig(options) {
  return {
    label: 'Income and comprehensive income comparison',
    orientation: options.orientation,
    simple: options.simple === true,
    legend: options.legend === true,
    compare: options.compare,
    tearThreshold: options.tearThreshold,
    positiveLabel: 'Positive contributions',
    negativeLabel: 'Negative contributions',
    periods: {
      current: 'Jun 30, 2026',
      previous: 'Jun 30, 2025',
    },
    formula: comprehensiveIncomeFormulaConfig,
    abbreviations: comprehensiveIncomeFormulaConfig.abbreviations,
    values: incomeValues,
    previousValues: incomePreviousValues,
    groups: incomeGroups,
  }
}

function renderValueInputs(container, formulaItems, groups, abbreviations, currentValues, previousValues, onChange) {
  container.replaceChildren()
  appendValueHeaders(container)
  const rowsByGroup = groupedLeafRows(formulaItems, groups, abbreviations)
  const groupEntries = Object.entries(groups)

  for (let groupIndex = 0; groupIndex < groupEntries.length; groupIndex++) {
    const [tag, group] = groupEntries[groupIndex]
    const rows = rowsByGroup.get(tag) || []
    if (!rows.length) {
      continue
    }

    const categoryName = document.createElement('div')
    categoryName.className = 'category'
    const shortName = abbreviations[tag] || rows[0].groupShortName
    const name = group.name || rows[0].groupName || tag
    categoryName.textContent = shortName ? `${shortName} — ${name}` : name
    container.append(categoryName)

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex]
      appendValueRow(container, row, currentValues, previousValues, onChange)
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

function appendValueRow(container, item, currentValues, previousValues, onChange) {
  const name = document.createElement('div')
  name.className = 'name'
  name.textContent = item.shortName ? `${item.shortName} — ${item.name}` : item.name
  name.title = `${item.name}\n${item.tag}`

  const current = createNumberInput(currentValues[item.tag] ?? 0, (value) => {
    currentValues[item.tag] = value
    onChange()
  })
  const previous = createNumberInput(previousValues[item.tag] ?? 0, (value) => {
    previousValues[item.tag] = value
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

function groupedLeafRows(items, groups, abbreviations) {
  const groupTags = new Set(Object.keys(groups).filter(tag => !tag.startsWith('_')))
  const rows = new Map()
  const groupMeta = new Map()
  for (const tag of groupTags) {
    rows.set(tag, [])
  }

  const visit = (item, ancestors) => {
    const nextAncestors = [...ancestors, item]
    if (groupTags.has(item.tag)) {
      groupMeta.set(item.tag, item)
    }

    const children = Array.isArray(item.items) ? item.items : []
    if (children.length) {
      for (let i = 0; i < children.length; i++) {
        visit(children[i], nextAncestors)
      }
      return
    }

    let groupTag = ''
    for (let i = nextAncestors.length - 1; i >= 0; i--) {
      const tag = nextAncestors[i].tag
      if (tag && !tag.startsWith('_') && groupTags.has(tag)) {
        groupTag = tag
        break
      }
    }

    if (!groupTag) {
      const match = /^_(.+?)\d+$/.exec(item.tag || '')
      if (match && groupTags.has(match[1])) {
        groupTag = match[1]
      }
    }

    if (!groupTag) {
      return
    }
    rows.get(groupTag).push(item)
  }

  for (let i = 0; i < items.length; i++) {
    visit(items[i], [])
  }

  const entries = Array.from(rows.entries())
  for (let i = 0; i < entries.length; i++) {
    const [tag, groupRows] = entries[i]
    const meta = groupMeta.get(tag)
    for (let rowIndex = 0; rowIndex < groupRows.length; rowIndex++) {
      groupRows[rowIndex] = {
        ...groupRows[rowIndex],
        groupName: meta?.name || tag,
        shortName: abbreviations[groupRows[rowIndex].tag] || '',
        groupShortName: abbreviations[tag] || '',
      }
    }
  }

  return rows
}
