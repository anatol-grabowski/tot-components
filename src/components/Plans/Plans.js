const plansStyle = `
  :host {
    display: block;
    max-width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .plans {
    display: grid;
    gap: var(--tot-spacing-small, .75rem);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--tot-plans-card-min-width, 14rem)), 1fr));
    max-width: 100%;
    min-width: 0;
  }

  .plan {
    background: var(--tot-panel-background-color, #fff);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-large, 8px);
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif);
    gap: var(--tot-spacing-small, .75rem);
    grid-template-rows: auto auto minmax(0, 1fr) auto;
    min-width: 0;
    overflow: hidden;
    padding: var(--tot-spacing-medium, 1rem);
    position: relative;
  }

  .plan--highlighted {
    border-color: var(--tot-color-primary-500, #0ea5e9);
    box-shadow: 0 0 0 1px var(--tot-color-primary-500, #0ea5e9);
  }

  .plan--selected {
    border-color: var(--tot-color-success-600, #16a34a);
    box-shadow: 0 0 0 1px var(--tot-color-success-600, #16a34a);
  }

  .plan--disabled {
    opacity: .65;
  }

  .plan__head {
    display: grid;
    gap: var(--tot-spacing-2x-small, .25rem);
    min-width: 0;
  }

  .plan__top {
    align-items: start;
    display: flex;
    gap: var(--tot-spacing-x-small, .5rem);
    justify-content: space-between;
    min-width: 0;
  }

  .plan__name {
    font-size: var(--tot-font-size-large, 1.125rem);
    font-weight: var(--tot-font-weight-bold, 700);
    line-height: 1.2;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .plan__badge {
    background: var(--tot-color-primary-50, #f0f9ff);
    border: var(--tot-panel-border-width, 1px) solid var(--tot-color-primary-200, #bae6fd);
    border-radius: var(--tot-border-radius-pill, 999px);
    color: var(--tot-color-primary-800, #075985);
    flex: 0 0 auto;
    font-size: var(--tot-font-size-x-small, .75rem);
    font-weight: var(--tot-font-weight-semibold, 600);
    line-height: 1.1;
    padding: .2rem .45rem;
    white-space: nowrap;
  }

  .plan__badge:empty {
    display: none;
  }

  .plan__description {
    color: var(--tot-input-help-text-color, #64748b);
    font-size: var(--tot-font-size-small, .875rem);
    line-height: var(--tot-line-height-dense, 1.35);
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .plan__price {
    align-items: baseline;
    display: flex;
    flex-wrap: wrap;
    gap: var(--tot-spacing-2x-small, .25rem);
    min-width: 0;
  }

  .plan__amount {
    font-size: var(--tot-font-size-2x-large, 1.75rem);
    font-weight: var(--tot-font-weight-bold, 700);
    letter-spacing: -.02em;
    line-height: 1;
  }

  .plan__interval {
    color: var(--tot-input-help-text-color, #64748b);
    font-size: var(--tot-font-size-small, .875rem);
  }

  .plan__features {
    display: grid;
    gap: var(--tot-spacing-2x-small, .25rem);
    list-style: none;
    margin: 0;
    min-width: 0;
    padding: 0;
  }

  .plan__feature {
    align-items: start;
    display: grid;
    gap: var(--tot-spacing-2x-small, .25rem);
    grid-template-columns: auto minmax(0, 1fr);
    min-width: 0;
  }

  .plan__feature::before {
    color: var(--tot-color-success-600, #16a34a);
    content: '✓';
    font-weight: var(--tot-font-weight-bold, 700);
    line-height: 1.35;
  }

  .plan__feature-text {
    font-size: var(--tot-font-size-small, .875rem);
    line-height: var(--tot-line-height-dense, 1.35);
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .plan__button {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: var(--tot-input-background-color, #fff);
    border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: var(--tot-input-border-radius-medium, 4px);
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-weight: var(--tot-font-weight-semibold, 600);
    gap: var(--tot-spacing-2x-small, .25rem);
    justify-content: center;
    min-height: var(--tot-input-height-medium, 2.25rem);
    min-width: 0;
    padding: 0 var(--tot-input-spacing-medium, .75rem);
    width: 100%;
  }

  .plan__button:hover:not(:disabled) {
    background: var(--tot-input-background-color-hover, #f8fafc);
    border-color: var(--tot-input-border-color-hover, #94a3b8);
  }

  .plan__button:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .plan__button:disabled {
    cursor: not-allowed;
    opacity: .65;
  }

  .plan__button--primary {
    background: var(--tot-color-primary-600, #0284c7);
    border-color: var(--tot-color-primary-600, #0284c7);
    color: var(--tot-color-neutral-0, #fff);
  }

  .plan__button--primary:hover:not(:disabled) {
    background: var(--tot-color-primary-500, #0ea5e9);
    border-color: var(--tot-color-primary-500, #0ea5e9);
  }

  .plans__empty {
    background: var(--tot-panel-background-color, #fff);
    border: var(--tot-panel-border-width, 1px) dashed var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-large, 8px);
    color: var(--tot-input-help-text-color, #64748b);
    font-family: var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif);
    padding: var(--tot-spacing-medium, 1rem);
    text-align: center;
  }
`

export class TotPlans extends HTMLElement {
  static get observedAttributes() {
    return [
      'plans',
      'value',
      'button-label',
      'current-label',
      'disabled',
    ]
  }

  constructor() {
    super()
    this._plans = []
  }

  get plans() {
    return this._plans.slice()
  }

  set plans(value) {
    this._plans = normalizePlans(value)
    this.render()
  }

  get value() {
    return this.getAttribute('value') || ''
  }

  set value(value) {
    setNullableAttribute(this, 'value', value)
  }

  get buttonLabel() {
    return this.getAttribute('button-label') || 'Choose plan'
  }

  set buttonLabel(value) {
    setNullableAttribute(this, 'button-label', value)
  }

  get currentLabel() {
    return this.getAttribute('current-label') || 'Current plan'
  }

  set currentLabel(value) {
    setNullableAttribute(this, 'current-label', value)
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  set disabled(value) {
    setBooleanAttribute(this, 'disabled', value)
  }

  connectedCallback() {
    this.syncPlansAttribute()
    this.render()
  }

  attributeChangedCallback(name) {
    if (name === 'plans') {
      this.syncPlansAttribute()
    }

    if (this.isConnected) {
      this.render()
    }
  }

  syncPlansAttribute() {
    if (!this.hasAttribute('plans')) {
      return
    }

    this._plans = parsePlansAttribute(this.getAttribute('plans'))
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    const plans = this._plans

    if (!plans.length) {
      root.innerHTML = `<style>${plansStyle}</style><div class="plans__empty" part="empty"><slot name="empty">No plans configured.</slot></div>`
      return
    }

    root.innerHTML = `<style>${plansStyle}</style>
      <div class="plans" part="base">
        ${plans.map(plan => renderPlan(this, plan)).join('')}
      </div>
    `

    const buttons = root.querySelectorAll('[data-plan-value]')
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', event => {
        const value = event.currentTarget.dataset.planValue
        const plan = findPlan(this._plans, value)

        if (!plan || plan.disabled || this.disabled) {
          return
        }

        this.value = plan.value
        this.dispatchEvent(new CustomEvent('plan-select', {
          bubbles: true,
          composed: true,
          detail: {
            value: plan.value,
            plan,
          },
        }))
        this.dispatchEvent(new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: {
            value: plan.value,
            plan,
          },
        }))
        this.render()
      })
    }
  }
}

function renderPlan(host, plan) {
  const selected = host.value && plan.value === host.value
  const current = Boolean(plan.current)
  const disabled = host.disabled || plan.disabled || current
  const classes = [
    'plan',
    plan.highlighted ? 'plan--highlighted' : '',
    selected || current ? 'plan--selected' : '',
    disabled ? 'plan--disabled' : '',
  ].filter(Boolean).join(' ')
  const buttonClass = plan.highlighted || selected ? 'plan__button plan__button--primary' : 'plan__button'
  const buttonLabel = current ? host.currentLabel : plan.buttonLabel || host.buttonLabel

  return `<article class="${escapeAttribute(classes)}" part="plan" data-plan="${escapeAttribute(plan.value)}">
    <div class="plan__head" part="plan-head">
      <div class="plan__top">
        <div class="plan__name" part="plan-name">${escapeHtml(plan.name)}</div>
        <div class="plan__badge" part="plan-badge">${escapeHtml(plan.badge)}</div>
      </div>
      <div class="plan__description" part="plan-description">${escapeHtml(plan.description)}</div>
    </div>
    <div class="plan__price" part="plan-price">
      <span class="plan__amount" part="plan-amount">${escapeHtml(formatPrice(plan))}</span>
      <span class="plan__interval" part="plan-interval">${escapeHtml(formatInterval(plan))}</span>
    </div>
    <ul class="plan__features" part="plan-features">
      ${plan.features.map(feature => `<li class="plan__feature" part="plan-feature"><span class="plan__feature-text">${escapeHtml(feature)}</span></li>`).join('')}
    </ul>
    <button class="${escapeAttribute(buttonClass)}" part="plan-button" type="button" data-plan-value="${escapeAttribute(plan.value)}" ${disabled ? 'disabled' : ''}>${escapeHtml(buttonLabel)}</button>
  </article>`
}

function normalizePlans(value) {
  const source = Array.isArray(value) ? value : []
  const plans = []

  for (let i = 0; i < source.length; i++) {
    const plan = normalizePlan(source[i], i)
    if (plan) {
      plans.push(plan)
    }
  }

  return plans
}

function normalizePlan(plan, index) {
  if (!plan || typeof plan !== 'object') {
    return null
  }

  const value = String(plan.value || plan.id || plan.priceId || `plan-${index + 1}`)
  const name = String(plan.name || plan.title || value)
  const features = Array.isArray(plan.features)
    ? plan.features.map(feature => String(feature)).filter(Boolean)
    : []

  return {
    ...plan,
    value,
    id: String(plan.id || value),
    name,
    description: String(plan.description || ''),
    badge: String(plan.badge || ''),
    price: plan.price === undefined || plan.price === null ? '' : plan.price,
    amount: plan.amount === undefined || plan.amount === null ? '' : plan.amount,
    currency: String(plan.currency || '$'),
    interval: String(plan.interval || plan.period || ''),
    features,
    buttonLabel: String(plan.buttonLabel || ''),
    disabled: Boolean(plan.disabled),
    current: Boolean(plan.current),
    highlighted: Boolean(plan.highlighted || plan.popular),
  }
}

function parsePlansAttribute(value) {
  try {
    return normalizePlans(JSON.parse(value || '[]'))
  } catch (error) {
    return []
  }
}

function findPlan(plans, value) {
  for (let i = 0; i < plans.length; i++) {
    if (plans[i].value === value) {
      return plans[i]
    }
  }

  return null
}

function formatPrice(plan) {
  if (plan.price !== '') {
    return String(plan.price)
  }

  if (plan.amount === '') {
    return ''
  }

  if (typeof plan.amount === 'number') {
    return `${plan.currency}${trimNumber(plan.amount)}`
  }

  return `${plan.currency}${plan.amount}`
}

function formatInterval(plan) {
  if (!plan.interval) {
    return ''
  }

  return plan.interval.startsWith('/') ? plan.interval : `/${plan.interval}`
}

function trimNumber(value) {
  return Number.isInteger(value) ? String(value) : String(value).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined || value === '') {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (match) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return replacements[match]
  })
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;')
}
