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

export const balanceFormulaConfig = {
  title: 'Calculation group 23 — Balance sheet check',
  values: balanceValues,
  abbreviations: {
    '_Check': 'Check',
    'Assets': 'A',
    'AssetsCurrent': 'CA',
    'CashCashEquivalentsAndShortTermInvestments': 'Cash+MS',
    'CashAndCashEquivalentsAtCarryingValue': 'Cash',
    'MarketableSecuritiesCurrent': 'MS',
    'AccountsReceivableNetCurrent': 'AR',
    'OtherAssetsCurrent': 'OCA',
    'InventoryNet': 'Inv',
    'OtherLongTermInvestments': 'nMS',
    'DeferredIncomeTaxAssetsNet': 'DIT',
    'PropertyPlantAndEquipmentAndFinanceLeaseRightOfUseAssetAfterAccumulatedDepreciationAndAmortization': 'PPE',
    'OperatingLeaseRightOfUseAsset': 'OLA',
    'Goodwill': 'GW',
    'OtherAssetsNoncurrent': 'OnCA',
    'IntangibleAssetsNetExcludingGoodwill': 'IA',
    'LiabilitiesAndStockholdersEquity': 'L+E',
    'Liabilities': 'L',
    'LiabilitiesCurrent': 'CL',
    'AccountsPayableCurrent': 'AP',
    'EmployeeRelatedLiabilitiesCurrent': 'Comp',
    'AccruedLiabilitiesCurrent': 'AEL',
    'AccruedRevenueShare': 'ARS',
    'ContractWithCustomerLiabilityCurrent': 'DR',
    'LongTermDebtNoncurrent': 'LTD',
    'AccruedIncomeTaxesNoncurrent': 'ITP',
    'DeferredIncomeTaxLiabilitiesNet': 'DIT',
    'OperatingLeaseLiabilityNoncurrent': 'OLL',
    'OtherLiabilitiesNoncurrent': 'OLTL',
    'CommitmentsAndContingencies': 'C&C',
    'StockholdersEquity': 'E',
    'ConvertiblePreferredStockNonredeemableOrRedeemableIssuerOptionValue': 'PS',
    'CommonStocksIncludingAdditionalPaidInCapital': 'CS',
    'AccumulatedOtherComprehensiveIncomeLossNetOfTax': 'AOCI',
    'RetainedEarningsAccumulatedDeficit': 'RE',
  },
  items: [
    {
      sign: '+',
      name: '_Check = Assets - LiabilitiesAndStockholdersEquity',
      tag: '_Check',
      items: [
        {
          sign: '+',
          name: 'Total assets',
          tag: 'Assets',
          items: [
            {
              sign: '+',
              name: 'Total current assets',
              tag: 'AssetsCurrent',
              items: [
                {
                  sign: '+',
                  name: 'Total cash, cash equivalents, and marketable securities',
                  tag: 'CashCashEquivalentsAndShortTermInvestments',
                  items: [
                    {
                      sign: '+',
                      name: 'Cash and cash equivalents',
                      tag: 'CashAndCashEquivalentsAtCarryingValue',
                    },
                    {
                      sign: '+',
                      name: 'Marketable securities',
                      tag: 'MarketableSecuritiesCurrent',
                    },
                  ],
                },
                {
                  sign: '+',
                  name: 'Accounts receivable, net',
                  tag: 'AccountsReceivableNetCurrent',
                },
                {
                  sign: '+',
                  name: 'Other current assets',
                  tag: 'OtherAssetsCurrent',
                },
                {
                  sign: '+',
                  name: 'Inventory',
                  tag: 'InventoryNet',
                },
              ],
            },
            {
              sign: '+',
              name: 'Non-marketable securities',
              tag: 'OtherLongTermInvestments',
            },
            {
              sign: '+',
              name: 'Deferred income taxes',
              tag: 'DeferredIncomeTaxAssetsNet',
            },
            {
              sign: '+',
              name: 'Property and equipment, net',
              tag: 'PropertyPlantAndEquipmentAndFinanceLeaseRightOfUseAssetAfterAccumulatedDepreciationAndAmortization',
            },
            {
              sign: '+',
              name: 'Operating lease assets',
              tag: 'OperatingLeaseRightOfUseAsset',
            },
            {
              sign: '+',
              name: 'Goodwill',
              tag: 'Goodwill',
            },
            {
              sign: '+',
              name: 'Other non-current assets',
              tag: 'OtherAssetsNoncurrent',
            },
            {
              sign: '+',
              name: 'Intangible assets, net',
              tag: 'IntangibleAssetsNetExcludingGoodwill',
            },
          ],
        },
        {
          sign: '-',
          name: 'Total liabilities and stockholders’ equity',
          tag: 'LiabilitiesAndStockholdersEquity',
          items: [
            {
              sign: '+',
              name: 'Total liabilities',
              tag: 'Liabilities',
              items: [
                {
                  sign: '+',
                  name: 'Total current liabilities',
                  tag: 'LiabilitiesCurrent',
                  items: [
                    {
                      sign: '+',
                      name: 'Accounts payable',
                      tag: 'AccountsPayableCurrent',
                    },
                    {
                      sign: '+',
                      name: 'Accrued compensation and benefits',
                      tag: 'EmployeeRelatedLiabilitiesCurrent',
                    },
                    {
                      sign: '+',
                      name: 'Accrued expenses and other current liabilities',
                      tag: 'AccruedLiabilitiesCurrent',
                    },
                    {
                      sign: '+',
                      name: 'Accrued revenue share',
                      tag: 'AccruedRevenueShare',
                    },
                    {
                      sign: '+',
                      name: 'Deferred revenue',
                      tag: 'ContractWithCustomerLiabilityCurrent',
                    },
                  ],
                },
                {
                  sign: '+',
                  name: 'Long-term debt',
                  tag: 'LongTermDebtNoncurrent',
                },
                {
                  sign: '+',
                  name: 'Income taxes payable, non-current',
                  tag: 'AccruedIncomeTaxesNoncurrent',
                },
                {
                  sign: '+',
                  name: 'Deferred income taxes',
                  tag: 'DeferredIncomeTaxLiabilitiesNet',
                },
                {
                  sign: '+',
                  name: 'Operating lease liabilities',
                  tag: 'OperatingLeaseLiabilityNoncurrent',
                },
                {
                  sign: '+',
                  name: 'Other long-term liabilities',
                  tag: 'OtherLiabilitiesNoncurrent',
                },
              ],
            },
            {
              sign: '+',
              name: 'Commitments and Contingencies (Note 10)',
              tag: 'CommitmentsAndContingencies',
            },
            {
              sign: '+',
              name: 'Total stockholders’ equity',
              tag: 'StockholdersEquity',
              items: [
                {
                  sign: '+',
                  name: 'Series A and Series B preferred stock and additional paid-in capital',
                  tag: 'ConvertiblePreferredStockNonredeemableOrRedeemableIssuerOptionValue',
                },
                {
                  sign: '+',
                  name: 'Class A, Class B, and Class C stock and additional paid-in capital',
                  tag: 'CommonStocksIncludingAdditionalPaidInCapital',
                },
                {
                  sign: '+',
                  name: 'Accumulated other comprehensive income (loss)',
                  tag: 'AccumulatedOtherComprehensiveIncomeLossNetOfTax',
                },
                {
                  sign: '+',
                  name: 'Retained earnings',
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

export const comprehensiveIncomeFormulaConfig = {
  title: 'Calculation groups 14 + 21 — Comprehensive income',
  values: comprehensiveIncomeValues,
  abbreviations: {
    'ComprehensiveIncomeNetOfTax': 'CI',
    'NetIncomeLoss': 'NI',
    'IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest': 'PBT',
    'OperatingIncomeLoss': 'OpInc',
    'Revenues': 'R',
    'CostsAndExpenses': 'C',
    'CostOfRevenue': 'CoR',
    'ResearchAndDevelopmentExpense': 'R&D',
    'SellingAndMarketingExpense': 'S&M',
    'GeneralAndAdministrativeExpense': 'G&A',
    'NonoperatingIncomeExpense': 'OI',
    'IncomeTaxExpenseBenefit': 'T',
    'OtherComprehensiveIncomeLossNetOfTaxPortionAttributableToParent': 'OCI',
    'OtherComprehensiveIncomeLossForeignCurrencyTransactionAndTranslationAdjustmentNetOfTax': 'FX',
    'OtherComprehensiveIncomeLossAvailableForSaleSecuritiesAdjustmentNetOfTax': 'AFS',
    'OtherComprehensiveIncomeUnrealizedHoldingGainLossOnSecuritiesArisingDuringPeriodNetOfTax': 'AFS Δ',
    'OtherComprehensiveIncomeLossReclassificationAdjustmentFromAOCIForSaleOfSecuritiesNetOfTax': 'AFS R',
    'OtherComprehensiveIncomeLossCashFlowHedgeGainLossAfterReclassificationAndTax': 'CFH',
    'OtherComprehensiveIncomeLossCashFlowHedgeGainLossBeforeReclassificationAfterTax': 'CFH Δ',
    'OtherComprehensiveIncomeLossCashFlowHedgeGainLossReclassificationAfterTax': 'CFH R',
  },
  items: [
    {
      sign: '+',
      name: 'Comprehensive income',
      tag: 'ComprehensiveIncomeNetOfTax',
      items: [
        {
          sign: '+',
          name: 'Net income',
          tag: 'NetIncomeLoss',
          items: [
            {
              sign: '+',
              name: 'Income before income taxes',
              tag: 'IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest',
              items: [
                {
                  sign: '+',
                  name: 'Total income from operations',
                  tag: 'OperatingIncomeLoss',
                  items: [
                    {
                      sign: '+',
                      name: 'Total revenues',
                      tag: 'Revenues',
                    },
                    {
                      sign: '-',
                      name: 'Total costs and expenses',
                      tag: 'CostsAndExpenses',
                      items: [
                        {
                          sign: '+',
                          name: 'Cost of revenues',
                          tag: 'CostOfRevenue',
                        },
                        {
                          sign: '+',
                          name: 'Research and development',
                          tag: 'ResearchAndDevelopmentExpense',
                        },
                        {
                          sign: '+',
                          name: 'Sales and marketing',
                          tag: 'SellingAndMarketingExpense',
                        },
                        {
                          sign: '+',
                          name: 'General and administrative',
                          tag: 'GeneralAndAdministrativeExpense',
                        },
                      ],
                    },
                  ],
                },
                {
                  sign: '+',
                  name: 'Other income (expense), net',
                  tag: 'NonoperatingIncomeExpense',
                },
              ],
            },
            {
              sign: '-',
              name: 'Provision for income taxes',
              tag: 'IncomeTaxExpenseBenefit',
            },
          ],
        },
        {
          sign: '+',
          name: 'Other comprehensive income (loss)',
          tag: 'OtherComprehensiveIncomeLossNetOfTaxPortionAttributableToParent',
          items: [
            {
              sign: '+',
              name: 'Change in foreign currency translation adjustment, net of income tax benefit (expense)',
              tag: 'OtherComprehensiveIncomeLossForeignCurrencyTransactionAndTranslationAdjustmentNetOfTax',
            },
            {
              sign: '+',
              name: 'Available-for-sale investments — net change, net of income tax benefit (expense)',
              tag: 'OtherComprehensiveIncomeLossAvailableForSaleSecuritiesAdjustmentNetOfTax',
              items: [
                {
                  sign: '+',
                  name: 'Change in net unrealized gains (losses)',
                  tag: 'OtherComprehensiveIncomeUnrealizedHoldingGainLossOnSecuritiesArisingDuringPeriodNetOfTax',
                },
                {
                  sign: '-',
                  name: 'Less: reclassification adjustment for net (gains) losses included in net income',
                  tag: 'OtherComprehensiveIncomeLossReclassificationAdjustmentFromAOCIForSaleOfSecuritiesNetOfTax',
                },
              ],
            },
            {
              sign: '+',
              name: 'Cash flow hedges — net change, net of income tax benefit (expense)',
              tag: 'OtherComprehensiveIncomeLossCashFlowHedgeGainLossAfterReclassificationAndTax',
              items: [
                {
                  sign: '+',
                  name: 'Change in net unrealized gains (losses)',
                  tag: 'OtherComprehensiveIncomeLossCashFlowHedgeGainLossBeforeReclassificationAfterTax',
                },
                {
                  sign: '-',
                  name: 'Less: reclassification adjustment for net (gains) losses included in net income',
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
  CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents: 30708,
  _CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents0: 55911,
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

export const cashFlowFormulaConfig = {
  title: 'Calculation group 15 — Cash flows',
  values: cashFlowValues,
  abbreviations: {
    '_Check': 'Check',
    'CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect': 'ΔCash',
    'NetCashProvidedByUsedInOperatingActivities': 'Operating',
    'NetIncomeLoss': 'NI',
    'Depreciation': 'D&A',
    'ShareBasedCompensation': 'SBC',
    'DeferredIncomeTaxesAndTaxCredits': 'DIT',
    'DebtAndEquitySecuritiesGainLoss': 'Sec',
    'OtherNoncashIncomeExpense': 'Other',
    'IncreaseDecreaseInAccountsReceivable': 'AR',
    'IncreaseDecreaseInIncomeTaxes': 'Tax',
    'IncreaseDecreaseInOtherOperatingAssets': 'OA',
    'IncreaseDecreaseInAccountsPayable': 'AP',
    'IncreaseDecreaseInAccruedLiabilities': 'AEL',
    'IncreaseDecreaseInContractWithCustomerLiability': 'DR',
    'IncreaseDecreaseInInventories': 'Inv',
    'NetCashProvidedByUsedInInvestingActivities': 'Investing',
    'PaymentsToAcquirePropertyPlantAndEquipment': 'PPE',
    'PaymentsToAcquireMarketableSecurities': 'MS−',
    'ProceedsFromSaleAndMaturityOfMarketableSecurities': 'MS+',
    'PaymentsToAcquireOtherInvestments': 'nMS−',
    'ProceedsFromSaleAndMaturityOfOtherInvestments': 'nMS+',
    'AcquisitionsNetOfCashAcquiredAndPurchasesOfIntangibleAssets': 'Acq',
    'PaymentsForProceedsFromOtherInvestingActivities': 'Other',
    'NetCashProvidedByUsedInFinancingActivities': 'Financing',
    'NetProceedsPaymentsRelatedToStockBasedAwardActivities': 'SBA',
    'PaymentsForRepurchaseOfCommonStock': 'Buyback',
    'PaymentsOfOrdinaryDividends': 'Div',
    'ProceedsFromIssuanceOfCommonStock': 'CS',
    'ProceedsFromIssuanceOfConvertiblePreferredStock': 'PS',
    'ProceedsFromDebtNetOfIssuanceCosts': 'Debt+',
    'RepaymentsOfDebtAndCapitalLeaseObligations': 'Debt−',
    'ProceedsFromMinorityShareholders': 'Sale',
    'ProceedsFromPaymentsForOtherFinancingActivities': 'Other',
    'EffectOfExchangeRateOnCashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents': 'FX',
    'CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents': 'Dec 31, 2025',
    '_CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents0': 'Jun 30, 2026',
  },
  items: [
    {
      sign: '+',
      name: '_Check = CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect + CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents - _CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents0',
      tag: '_Check',
      items: [
        {
          sign: '+',
          name: 'Net increase (decrease) in cash and cash equivalents',
          tag: 'CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalentsPeriodIncreaseDecreaseIncludingExchangeRateEffect',
          items: [
        {
          sign: '+',
          name: 'Net cash provided by operating activities',
          tag: 'NetCashProvidedByUsedInOperatingActivities',
          items: [
            {
              sign: '+',
              name: 'Net income',
              tag: 'NetIncomeLoss',
            },
            {
              sign: '+',
              name: 'Depreciation of property and equipment',
              tag: 'Depreciation',
            },
            {
              sign: '+',
              name: 'Stock-based compensation expense',
              tag: 'ShareBasedCompensation',
            },
            {
              sign: '+',
              name: 'Deferred income taxes',
              tag: 'DeferredIncomeTaxesAndTaxCredits',
            },
            {
              sign: '-',
              name: 'Loss (gain) on debt and equity securities, net',
              tag: 'DebtAndEquitySecuritiesGainLoss',
            },
            {
              sign: '-',
              name: 'Other',
              tag: 'OtherNoncashIncomeExpense',
            },
            {
              sign: '-',
              name: 'Accounts receivable, net',
              tag: 'IncreaseDecreaseInAccountsReceivable',
            },
            {
              sign: '+',
              name: 'Income taxes, net',
              tag: 'IncreaseDecreaseInIncomeTaxes',
            },
            {
              sign: '-',
              name: 'Other assets',
              tag: 'IncreaseDecreaseInOtherOperatingAssets',
            },
            {
              sign: '+',
              name: 'Accounts payable',
              tag: 'IncreaseDecreaseInAccountsPayable',
            },
            {
              sign: '+',
              name: 'Accrued expenses and other liabilities',
              tag: 'IncreaseDecreaseInAccruedLiabilities',
            },
            {
              sign: '+',
              name: 'Deferred revenue',
              tag: 'IncreaseDecreaseInContractWithCustomerLiability',
            },
            {
              sign: '-',
              name: 'Inventory',
              tag: 'IncreaseDecreaseInInventories',
            },
          ],
        },
        {
          sign: '+',
          name: 'Net cash used in investing activities',
          tag: 'NetCashProvidedByUsedInInvestingActivities',
          items: [
            {
              sign: '-',
              name: 'Purchases of property and equipment',
              tag: 'PaymentsToAcquirePropertyPlantAndEquipment',
            },
            {
              sign: '-',
              name: 'Purchases of marketable securities',
              tag: 'PaymentsToAcquireMarketableSecurities',
            },
            {
              sign: '+',
              name: 'Maturities and sales of marketable securities',
              tag: 'ProceedsFromSaleAndMaturityOfMarketableSecurities',
            },
            {
              sign: '-',
              name: 'Purchases of non-marketable securities',
              tag: 'PaymentsToAcquireOtherInvestments',
            },
            {
              sign: '+',
              name: 'Maturities and sales of non-marketable securities',
              tag: 'ProceedsFromSaleAndMaturityOfOtherInvestments',
            },
            {
              sign: '-',
              name: 'Acquisitions, net of cash acquired, and purchases of intangible assets',
              tag: 'AcquisitionsNetOfCashAcquiredAndPurchasesOfIntangibleAssets',
            },
            {
              sign: '-',
              name: 'Other investing activities',
              tag: 'PaymentsForProceedsFromOtherInvestingActivities',
            },
          ],
        },
        {
          sign: '+',
          name: 'Net cash provided by (used in) financing activities',
          tag: 'NetCashProvidedByUsedInFinancingActivities',
          items: [
            {
              sign: '-',
              name: 'Net payments related to stock-based award activities',
              tag: 'NetProceedsPaymentsRelatedToStockBasedAwardActivities',
            },
            {
              sign: '-',
              name: 'Repurchases of stock',
              tag: 'PaymentsForRepurchaseOfCommonStock',
            },
            {
              sign: '-',
              name: 'Dividend payments',
              tag: 'PaymentsOfOrdinaryDividends',
            },
            {
              sign: '+',
              name: 'Proceeds from issuance of common stock, net of costs',
              tag: 'ProceedsFromIssuanceOfCommonStock',
            },
            {
              sign: '+',
              name: 'Proceeds from issuance of mandatory convertible preferred stock, net of costs',
              tag: 'ProceedsFromIssuanceOfConvertiblePreferredStock',
            },
            {
              sign: '+',
              name: 'Proceeds from issuance of debt, net of costs',
              tag: 'ProceedsFromDebtNetOfIssuanceCosts',
            },
            {
              sign: '-',
              name: 'Repayments of debt',
              tag: 'RepaymentsOfDebtAndCapitalLeaseObligations',
            },
            {
              sign: '+',
              name: 'Proceeds from sale of interest in consolidated entities, net',
              tag: 'ProceedsFromMinorityShareholders',
            },
            {
              sign: '+',
              name: 'Other financing activities',
              tag: 'ProceedsFromPaymentsForOtherFinancingActivities',
            },
          ],
        },
            {
              sign: '+',
              name: 'Effect of exchange rate changes on cash and cash equivalents',
              tag: 'EffectOfExchangeRateOnCashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents',
            },
          ],
        },
        {
          sign: '+',
          name: 'Cash and cash equivalents at beginning of period',
          tag: 'CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents',
        },
        {
          sign: '-',
          name: 'Cash and cash equivalents at end of period',
          tag: '_CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents0',
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

    const simple = document.createElement('input')
    simple.type = 'checkbox'
    const controlText = document.createElement('span')
    controlText.textContent = 'Simple'
    controls.append(simple, controlText)

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

    simple.addEventListener('change', () => {
      balanceFormula.config = { ...balanceFormulaConfig, simple: simple.checked }
      comprehensiveIncomeFormula.config = { ...comprehensiveIncomeFormulaConfig, simple: simple.checked }
      cashFlowFormula.config = { ...cashFlowFormulaConfig, simple: simple.checked }
    })

    formulas.append(balanceFormula, comprehensiveIncomeFormula, cashFlowFormula)
    container.append(controls, formulas)
  },
})
