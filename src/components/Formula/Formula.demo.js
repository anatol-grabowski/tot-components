import { registerDemo } from '../demoCommon.js'

const balanceValues = {
  _Check: 0,
  Assets: 921983,
  AssetsCurrent: 343524,
  CashCashEquivalentsAndShortTermInvestments: 242474,
  CashAndCashEquivalentsAtCarryingValue: 55911,
  MarketableSecuritiesCurrent: 186563,
  AccountsReceivableNetCurrent: 69175,
  OtherAssetsCurrent: 21884,
  InventoryNet: 9991,
  OtherLongTermInvestments: 131461,
  DeferredIncomeTaxAssetsNet: 1448,
  PropertyPlantAndEquipmentAndFinanceLeaseRightOfUseAssetAfterAccumulatedDepreciationAndAmortization: 321212,
  OperatingLeaseRightOfUseAsset: 17694,
  Goodwill: 57828,
  OtherAssetsNoncurrent: 39711,
  IntangibleAssetsNetExcludingGoodwill: 9105,
  LiabilitiesAndStockholdersEquity: 921983,
  Liabilities: 281503,
  LiabilitiesCurrent: 126111,
  AccountsPayableCurrent: 20258,
  EmployeeRelatedLiabilitiesCurrent: 15086,
  AccruedLiabilitiesCurrent: 73014,
  AccruedRevenueShare: 10599,
  ContractWithCustomerLiabilityCurrent: 7154,
  LongTermDebtNoncurrent: 98165,
  AccruedIncomeTaxesNoncurrent: 11306,
  DeferredIncomeTaxLiabilitiesNet: 22819,
  OperatingLeaseLiabilityNoncurrent: 14591,
  OtherLiabilitiesNoncurrent: 8511,
  CommitmentsAndContingencies: 0,
  StockholdersEquity: 640480,
  ConvertiblePreferredStockNonredeemableOrRedeemableIssuerOptionValue: 18023,
  CommonStocksIncludingAdditionalPaidInCapital: 131371,
  AccumulatedOtherComprehensiveIncomeLossNetOfTax: -2285,
  RetainedEarningsAccumulatedDeficit: 493371,
}

const balanceFormulaConfig = {
  title: 'Calculation group 23 — Balance sheet check',
  values: balanceValues,
  items: [
    {
      sign: '+',
      name: '_Check = Assets - LiabilitiesAndStockholdersEquity',
      shortName: 'Check',
      tag: '_Check',
      items: [
        {
          sign: '+',
          name: 'Total assets',
          shortName: 'A',
          tag: 'Assets',
          items: [
            {
              sign: '+',
              name: 'Total current assets',
              shortName: 'CA',
              tag: 'AssetsCurrent',
              items: [
                {
                  sign: '+',
                  name: 'Total cash, cash equivalents, and marketable securities',
                  shortName: 'Cash+MS',
                  tag: 'CashCashEquivalentsAndShortTermInvestments',
                  items: [
                    {
                      sign: '+',
                      name: 'Cash and cash equivalents',
                      shortName: 'Cash',
                      tag: 'CashAndCashEquivalentsAtCarryingValue',
                    },
                    {
                      sign: '+',
                      name: 'Marketable securities',
                      shortName: 'MS',
                      tag: 'MarketableSecuritiesCurrent',
                    },
                  ],
                },
                {
                  sign: '+',
                  name: 'Accounts receivable, net',
                  shortName: 'AR',
                  tag: 'AccountsReceivableNetCurrent',
                },
                {
                  sign: '+',
                  name: 'Other current assets',
                  shortName: 'OCA',
                  tag: 'OtherAssetsCurrent',
                },
                {
                  sign: '+',
                  name: 'Inventory',
                  shortName: 'Inv',
                  tag: 'InventoryNet',
                },
              ],
            },
            {
              sign: '+',
              name: 'Non-marketable securities',
              shortName: 'nMS',
              tag: 'OtherLongTermInvestments',
            },
            {
              sign: '+',
              name: 'Deferred income taxes',
              shortName: 'DIT',
              tag: 'DeferredIncomeTaxAssetsNet',
            },
            {
              sign: '+',
              name: 'Property and equipment, net',
              shortName: 'PPE',
              tag: 'PropertyPlantAndEquipmentAndFinanceLeaseRightOfUseAssetAfterAccumulatedDepreciationAndAmortization',
            },
            {
              sign: '+',
              name: 'Operating lease assets',
              shortName: 'OLA',
              tag: 'OperatingLeaseRightOfUseAsset',
            },
            {
              sign: '+',
              name: 'Goodwill',
              shortName: 'GW',
              tag: 'Goodwill',
            },
            {
              sign: '+',
              name: 'Other non-current assets',
              shortName: 'OnCA',
              tag: 'OtherAssetsNoncurrent',
            },
            {
              sign: '+',
              name: 'Intangible assets, net',
              shortName: 'IA',
              tag: 'IntangibleAssetsNetExcludingGoodwill',
            },
          ],
        },
        {
          sign: '-',
          name: 'Total liabilities and stockholders’ equity',
          shortName: 'L+E',
          tag: 'LiabilitiesAndStockholdersEquity',
          items: [
            {
              sign: '+',
              name: 'Total liabilities',
              shortName: 'L',
              tag: 'Liabilities',
              items: [
                {
                  sign: '+',
                  name: 'Total current liabilities',
                  shortName: 'CL',
                  tag: 'LiabilitiesCurrent',
                  items: [
                    {
                      sign: '+',
                      name: 'Accounts payable',
                      shortName: 'AP',
                      tag: 'AccountsPayableCurrent',
                    },
                    {
                      sign: '+',
                      name: 'Accrued compensation and benefits',
                      shortName: 'Comp',
                      tag: 'EmployeeRelatedLiabilitiesCurrent',
                    },
                    {
                      sign: '+',
                      name: 'Accrued expenses and other current liabilities',
                      shortName: 'AEL',
                      tag: 'AccruedLiabilitiesCurrent',
                    },
                    {
                      sign: '+',
                      name: 'Accrued revenue share',
                      shortName: 'ARS',
                      tag: 'AccruedRevenueShare',
                    },
                    {
                      sign: '+',
                      name: 'Deferred revenue',
                      shortName: 'DR',
                      tag: 'ContractWithCustomerLiabilityCurrent',
                    },
                  ],
                },
                {
                  sign: '+',
                  name: 'Long-term debt',
                  shortName: 'LTD',
                  tag: 'LongTermDebtNoncurrent',
                },
                {
                  sign: '+',
                  name: 'Income taxes payable, non-current',
                  shortName: 'ITP',
                  tag: 'AccruedIncomeTaxesNoncurrent',
                },
                {
                  sign: '+',
                  name: 'Deferred income taxes',
                  shortName: 'DIT',
                  tag: 'DeferredIncomeTaxLiabilitiesNet',
                },
                {
                  sign: '+',
                  name: 'Operating lease liabilities',
                  shortName: 'OLL',
                  tag: 'OperatingLeaseLiabilityNoncurrent',
                },
                {
                  sign: '+',
                  name: 'Other long-term liabilities',
                  shortName: 'OLTL',
                  tag: 'OtherLiabilitiesNoncurrent',
                },
              ],
            },
            {
              sign: '+',
              name: 'Commitments and Contingencies (Note 10)',
              shortName: 'C&C',
              tag: 'CommitmentsAndContingencies',
            },
            {
              sign: '+',
              name: 'Total stockholders’ equity',
              shortName: 'E',
              tag: 'StockholdersEquity',
              items: [
                {
                  sign: '+',
                  name: 'Series A and Series B preferred stock and additional paid-in capital',
                  shortName: 'PS',
                  tag: 'ConvertiblePreferredStockNonredeemableOrRedeemableIssuerOptionValue',
                },
                {
                  sign: '+',
                  name: 'Class A, Class B, and Class C stock and additional paid-in capital',
                  shortName: 'CS',
                  tag: 'CommonStocksIncludingAdditionalPaidInCapital',
                },
                {
                  sign: '+',
                  name: 'Accumulated other comprehensive income (loss)',
                  shortName: 'AOCI',
                  tag: 'AccumulatedOtherComprehensiveIncomeLossNetOfTax',
                },
                {
                  sign: '+',
                  name: 'Retained earnings',
                  shortName: 'RE',
                  tag: 'RetainedEarningsAccumulatedDeficit',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const comprehensiveIncomeValues = {
  ComprehensiveIncomeNetOfTax: 112088,
  NetIncomeLoss: 112193,
  IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest: 138753,
  OperatingIncomeLoss: 40770,
  Revenues: 119796,
  CostsAndExpenses: 79026,
  CostOfRevenue: 45943,
  ResearchAndDevelopmentExpense: 18219,
  SellingAndMarketingExpense: 8403,
  GeneralAndAdministrativeExpense: 6461,
  NonoperatingIncomeExpense: 97983,
  IncomeTaxExpenseBenefit: 26560,
  OtherComprehensiveIncomeLossNetOfTaxPortionAttributableToParent: -105,
  OtherComprehensiveIncomeLossForeignCurrencyTransactionAndTranslationAdjustmentNetOfTax: -9,
  OtherComprehensiveIncomeLossAvailableForSaleSecuritiesAdjustmentNetOfTax: -239,
  OtherComprehensiveIncomeUnrealizedHoldingGainLossOnSecuritiesArisingDuringPeriodNetOfTax: -273,
  OtherComprehensiveIncomeLossReclassificationAdjustmentFromAOCIForSaleOfSecuritiesNetOfTax: -34,
  OtherComprehensiveIncomeLossCashFlowHedgeGainLossAfterReclassificationAndTax: 143,
  OtherComprehensiveIncomeLossCashFlowHedgeGainLossBeforeReclassificationAfterTax: 228,
  OtherComprehensiveIncomeLossCashFlowHedgeGainLossReclassificationAfterTax: 85,
}

const comprehensiveIncomeFormulaConfig = {
  title: 'Calculation groups 14 + 21 — Comprehensive income',
  values: comprehensiveIncomeValues,
  items: [
    {
      sign: '+',
      name: 'Comprehensive income',
      shortName: 'CI',
      tag: 'ComprehensiveIncomeNetOfTax',
      items: [
        {
          sign: '+',
          name: 'Net income',
          shortName: 'NI',
          tag: 'NetIncomeLoss',
          items: [
            {
              sign: '+',
              name: 'Income before income taxes',
              shortName: 'PBT',
              tag: 'IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest',
              items: [
                {
                  sign: '+',
                  name: 'Total income from operations',
                  shortName: 'OpInc',
                  tag: 'OperatingIncomeLoss',
                  items: [
                    {
                      sign: '+',
                      name: 'Total revenues',
                      shortName: 'R',
                      tag: 'Revenues',
                    },
                    {
                      sign: '-',
                      name: 'Total costs and expenses',
                      shortName: 'C',
                      tag: 'CostsAndExpenses',
                      items: [
                        {
                          sign: '+',
                          name: 'Cost of revenues',
                          shortName: 'CoR',
                          tag: 'CostOfRevenue',
                        },
                        {
                          sign: '+',
                          name: 'Research and development',
                          shortName: 'R&D',
                          tag: 'ResearchAndDevelopmentExpense',
                        },
                        {
                          sign: '+',
                          name: 'Sales and marketing',
                          shortName: 'S&M',
                          tag: 'SellingAndMarketingExpense',
                        },
                        {
                          sign: '+',
                          name: 'General and administrative',
                          shortName: 'G&A',
                          tag: 'GeneralAndAdministrativeExpense',
                        },
                      ],
                    },
                  ],
                },
                {
                  sign: '+',
                  name: 'Other income (expense), net',
                  shortName: 'OI',
                  tag: 'NonoperatingIncomeExpense',
                },
              ],
            },
            {
              sign: '-',
              name: 'Provision for income taxes',
              shortName: 'T',
              tag: 'IncomeTaxExpenseBenefit',
            },
          ],
        },
        {
          sign: '+',
          name: 'Other comprehensive income (loss)',
          shortName: 'OCI',
          tag: 'OtherComprehensiveIncomeLossNetOfTaxPortionAttributableToParent',
          items: [
            {
              sign: '+',
              name: 'Change in foreign currency translation adjustment, net of income tax benefit (expense)',
              shortName: 'FX',
              tag: 'OtherComprehensiveIncomeLossForeignCurrencyTransactionAndTranslationAdjustmentNetOfTax',
            },
            {
              sign: '+',
              name: 'Available-for-sale investments — net change, net of income tax benefit (expense)',
              shortName: 'AFS',
              tag: 'OtherComprehensiveIncomeLossAvailableForSaleSecuritiesAdjustmentNetOfTax',
              items: [
                {
                  sign: '+',
                  name: 'Change in net unrealized gains (losses)',
                  shortName: 'AFS Δ',
                  tag: 'OtherComprehensiveIncomeUnrealizedHoldingGainLossOnSecuritiesArisingDuringPeriodNetOfTax',
                },
                {
                  sign: '-',
                  name: 'Less: reclassification adjustment for net (gains) losses included in net income',
                  shortName: 'AFS R',
                  tag: 'OtherComprehensiveIncomeLossReclassificationAdjustmentFromAOCIForSaleOfSecuritiesNetOfTax',
                },
              ],
            },
            {
              sign: '+',
              name: 'Cash flow hedges — net change, net of income tax benefit (expense)',
              shortName: 'CFH',
              tag: 'OtherComprehensiveIncomeLossCashFlowHedgeGainLossAfterReclassificationAndTax',
              items: [
                {
                  sign: '+',
                  name: 'Change in net unrealized gains (losses)',
                  shortName: 'CFH Δ',
                  tag: 'OtherComprehensiveIncomeLossCashFlowHedgeGainLossBeforeReclassificationAfterTax',
                },
                {
                  sign: '-',
                  name: 'Less: reclassification adjustment for net (gains) losses included in net income',
                  shortName: 'CFH R',
                  tag: 'OtherComprehensiveIncomeLossCashFlowHedgeGainLossReclassificationAfterTax',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const cashFlowValues = {
  _Check: 0,
  _CashPeriodStart: -81114,
  _CashPeriodEnd: 55911,
  CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect: 25203,
  NetCashProvidedByUsedInOperatingActivities: 84859,
  NetIncomeLoss: 174771,
  Depreciation: 13586,
  ShareBasedCompensation: 14708,
  DeferredIncomeTaxesAndTaxCredits: 27538,
  DebtAndEquitySecuritiesGainLoss: 135803,
  OtherNoncashIncomeExpense: -3161,
  IncreaseDecreaseInAccountsReceivable: 6904,
  IncreaseDecreaseInIncomeTaxes: 8304,
  IncreaseDecreaseInOtherOperatingAssets: 9950,
  IncreaseDecreaseInAccountsPayable: 2090,
  IncreaseDecreaseInAccruedLiabilities: 308,
  IncreaseDecreaseInContractWithCustomerLiability: 789,
  IncreaseDecreaseInInventories: 7739,
  NetCashProvidedByUsedInInvestingActivities: -145822,
  PaymentsToAcquirePropertyPlantAndEquipment: 80598,
  PaymentsToAcquireMarketableSecurities: 76480,
  ProceedsFromSaleAndMaturityOfMarketableSecurities: 66696,
  PaymentsToAcquireOtherInvestments: 22051,
  ProceedsFromSaleAndMaturityOfOtherInvestments: 1667,
  AcquisitionsNetOfCashAcquiredAndPurchasesOfIntangibleAssets: 33697,
  PaymentsForProceedsFromOtherInvestingActivities: 1359,
  NetCashProvidedByUsedInFinancingActivities: 86320,
  NetProceedsPaymentsRelatedToStockBasedAwardActivities: 12056,
  PaymentsForRepurchaseOfCommonStock: 0,
  PaymentsOfOrdinaryDividends: 5231,
  ProceedsFromIssuanceOfCommonStock: 30499,
  ProceedsFromIssuanceOfConvertiblePreferredStock: 19063,
  ProceedsFromDebtNetOfIssuanceCosts: 56226,
  RepaymentsOfDebtAndCapitalLeaseObligations: 5253,
  ProceedsFromMinorityShareholders: 3758,
  ProceedsFromPaymentsForOtherFinancingActivities: -686,
  EffectOfExchangeRateOnCashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents: -154,
}

const cashFlowFormulaConfig = {
  title: 'Calculation group 15 — Cash flows',
  values: cashFlowValues,
  items: [
    {
      sign: '+',
      name: '_Check = CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect + _CashPeriodStart + _CashPeriodEnd',
      shortName: 'Check',
      tag: '_Check',
      items: [
        {
          sign: '+',
          name: 'Net increase (decrease) in cash and cash equivalents',
          shortName: 'ΔCash',
          tag: 'CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect',
          items: [
        {
          sign: '+',
          name: 'Net cash provided by operating activities',
          shortName: 'Operating',
          tag: 'NetCashProvidedByUsedInOperatingActivities',
          items: [
            {
              sign: '+',
              name: 'Net income',
              shortName: 'NI',
              tag: 'NetIncomeLoss',
            },
            {
              sign: '+',
              name: 'Depreciation of property and equipment',
              shortName: 'D&A',
              tag: 'Depreciation',
            },
            {
              sign: '+',
              name: 'Stock-based compensation expense',
              shortName: 'SBC',
              tag: 'ShareBasedCompensation',
            },
            {
              sign: '+',
              name: 'Deferred income taxes',
              shortName: 'DIT',
              tag: 'DeferredIncomeTaxesAndTaxCredits',
            },
            {
              sign: '-',
              name: 'Loss (gain) on debt and equity securities, net',
              shortName: 'Sec',
              tag: 'DebtAndEquitySecuritiesGainLoss',
            },
            {
              sign: '-',
              name: 'Other',
              shortName: 'Other',
              tag: 'OtherNoncashIncomeExpense',
            },
            {
              sign: '-',
              name: 'Accounts receivable, net',
              shortName: 'AR',
              tag: 'IncreaseDecreaseInAccountsReceivable',
            },
            {
              sign: '+',
              name: 'Income taxes, net',
              shortName: 'Tax',
              tag: 'IncreaseDecreaseInIncomeTaxes',
            },
            {
              sign: '-',
              name: 'Other assets',
              shortName: 'OA',
              tag: 'IncreaseDecreaseInOtherOperatingAssets',
            },
            {
              sign: '+',
              name: 'Accounts payable',
              shortName: 'AP',
              tag: 'IncreaseDecreaseInAccountsPayable',
            },
            {
              sign: '+',
              name: 'Accrued expenses and other liabilities',
              shortName: 'AEL',
              tag: 'IncreaseDecreaseInAccruedLiabilities',
            },
            {
              sign: '+',
              name: 'Deferred revenue',
              shortName: 'DR',
              tag: 'IncreaseDecreaseInContractWithCustomerLiability',
            },
            {
              sign: '-',
              name: 'Inventory',
              shortName: 'Inv',
              tag: 'IncreaseDecreaseInInventories',
            },
          ],
        },
        {
          sign: '+',
          name: 'Net cash used in investing activities',
          shortName: 'Investing',
          tag: 'NetCashProvidedByUsedInInvestingActivities',
          items: [
            {
              sign: '-',
              name: 'Purchases of property and equipment',
              shortName: 'PPE',
              tag: 'PaymentsToAcquirePropertyPlantAndEquipment',
            },
            {
              sign: '-',
              name: 'Purchases of marketable securities',
              shortName: 'MS−',
              tag: 'PaymentsToAcquireMarketableSecurities',
            },
            {
              sign: '+',
              name: 'Maturities and sales of marketable securities',
              shortName: 'MS+',
              tag: 'ProceedsFromSaleAndMaturityOfMarketableSecurities',
            },
            {
              sign: '-',
              name: 'Purchases of non-marketable securities',
              shortName: 'nMS−',
              tag: 'PaymentsToAcquireOtherInvestments',
            },
            {
              sign: '+',
              name: 'Maturities and sales of non-marketable securities',
              shortName: 'nMS+',
              tag: 'ProceedsFromSaleAndMaturityOfOtherInvestments',
            },
            {
              sign: '-',
              name: 'Acquisitions, net of cash acquired, and purchases of intangible assets',
              shortName: 'Acq',
              tag: 'AcquisitionsNetOfCashAcquiredAndPurchasesOfIntangibleAssets',
            },
            {
              sign: '-',
              name: 'Other investing activities',
              shortName: 'Other',
              tag: 'PaymentsForProceedsFromOtherInvestingActivities',
            },
          ],
        },
        {
          sign: '+',
          name: 'Net cash provided by (used in) financing activities',
          shortName: 'Financing',
          tag: 'NetCashProvidedByUsedInFinancingActivities',
          items: [
            {
              sign: '-',
              name: 'Net payments related to stock-based award activities',
              shortName: 'SBA',
              tag: 'NetProceedsPaymentsRelatedToStockBasedAwardActivities',
            },
            {
              sign: '-',
              name: 'Repurchases of stock',
              shortName: 'Buyback',
              tag: 'PaymentsForRepurchaseOfCommonStock',
            },
            {
              sign: '-',
              name: 'Dividend payments',
              shortName: 'Div',
              tag: 'PaymentsOfOrdinaryDividends',
            },
            {
              sign: '+',
              name: 'Proceeds from issuance of common stock, net of costs',
              shortName: 'CS',
              tag: 'ProceedsFromIssuanceOfCommonStock',
            },
            {
              sign: '+',
              name: 'Proceeds from issuance of mandatory convertible preferred stock, net of costs',
              shortName: 'PS',
              tag: 'ProceedsFromIssuanceOfConvertiblePreferredStock',
            },
            {
              sign: '+',
              name: 'Proceeds from issuance of debt, net of costs',
              shortName: 'Debt+',
              tag: 'ProceedsFromDebtNetOfIssuanceCosts',
            },
            {
              sign: '-',
              name: 'Repayments of debt',
              shortName: 'Debt−',
              tag: 'RepaymentsOfDebtAndCapitalLeaseObligations',
            },
            {
              sign: '+',
              name: 'Proceeds from sale of interest in consolidated entities, net',
              shortName: 'Sale',
              tag: 'ProceedsFromMinorityShareholders',
            },
            {
              sign: '+',
              name: 'Other financing activities',
              shortName: 'Other',
              tag: 'ProceedsFromPaymentsForOtherFinancingActivities',
            },
          ],
        },
            {
              sign: '+',
              name: 'Effect of exchange rate changes on cash and cash equivalents',
              shortName: 'FX',
              tag: 'EffectOfExchangeRateOnCashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents',
            },
          ],
        },
        {
          sign: '+',
          name: 'Cash and cash equivalents at beginning of period',
          shortName: 'Dec 31, 2025',
          tag: '_CashPeriodStart',
        },
        {
          sign: '+',
          name: 'Cash and cash equivalents at end of period',
          shortName: 'Jun 30, 2026',
          tag: '_CashPeriodEnd',
        },
      ],
    },
  ],
}

registerDemo({
  id: 'tot-formula',
  title: 'Formula',
  render: (container) => {
    const controls = document.createElement('label')
    controls.style.display = 'inline-flex'
    controls.style.alignItems = 'center'
    controls.style.gap = 'var(--tot-spacing-2x-small, .25rem)'
    controls.style.marginBottom = 'var(--tot-spacing-2x-small, .25rem)'
    controls.style.fontSize = 'var(--tot-font-size-small, .8125rem)'

    const simplified = document.createElement('input')
    simplified.type = 'checkbox'
    const controlText = document.createElement('span')
    controlText.textContent = 'Simplified'
    controls.append(simplified, controlText)

    const formulas = document.createElement('div')
    formulas.style.display = 'grid'
    formulas.style.gap = 'var(--tot-spacing-x-small, .5rem)'
    formulas.style.maxWidth = '54rem'

    const balanceFormula = document.createElement('tot-formula')
    balanceFormula.config = balanceFormulaConfig

    const comprehensiveIncomeFormula = document.createElement('tot-formula')
    comprehensiveIncomeFormula.config = comprehensiveIncomeFormulaConfig

    const cashFlowFormula = document.createElement('tot-formula')
    cashFlowFormula.config = cashFlowFormulaConfig

    simplified.addEventListener('change', () => {
      balanceFormula.simplified = simplified.checked
      comprehensiveIncomeFormula.simplified = simplified.checked
      cashFlowFormula.simplified = simplified.checked
    })

    formulas.append(balanceFormula, comprehensiveIncomeFormula, cashFlowFormula)
    container.append(controls, formulas)
  },
})
