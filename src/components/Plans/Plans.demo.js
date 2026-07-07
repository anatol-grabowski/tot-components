import { registerDemo } from '../demoCommon.js'

const plans = [
  {
    value: 'starter',
    name: 'Starter',
    price: '$9',
    interval: 'month',
    description: 'Basic access for individual projects.',
    features: ['1 workspace', 'Basic support', 'Monthly billing'],
  },
  {
    value: 'pro',
    name: 'Pro',
    price: '$19',
    interval: 'month',
    description: 'More usage and better collaboration.',
    badge: 'Popular',
    highlighted: true,
    features: ['5 workspaces', 'Priority support', 'Team sharing'],
  },
  {
    value: 'business',
    name: 'Business',
    price: '$49',
    interval: 'month',
    description: 'Advanced plan for small teams.',
    features: ['Unlimited workspaces', 'Admin tools', 'Invoice support'],
  },
]

registerDemo({
  id: 'tot-plans',
  title: 'Plans',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="demo-group stack">
        <div class="demo-label">Subscription plans configured with property data</div>
        <tot-plans id="plans" value="starter"></tot-plans>
      </div>
      <div class="demo-group stack">
        <div class="demo-label">Subscription plans configured with JSON attribute</div>
        <tot-plans button-label="Subscribe" plans='[{"value":"basic","name":"Basic","price":"€8","interval":"month","features":["Single user","Email support"]},{"value":"team","name":"Team","price":"€24","interval":"month","badge":"Best value","highlighted":true,"features":["5 users","Shared billing"]}]'></tot-plans>
      </div>
    `

    const plansElement = wrapper.querySelector('#plans')
    plansElement.plans = plans

    const allPlans = wrapper.querySelectorAll('tot-plans')
    for (let i = 0; i < allPlans.length; i++) {
      allPlans[i].addEventListener('plan-select', event => {
        logEvent(allPlans[i], 'plan-select', event.detail)
      })
      allPlans[i].addEventListener('change', event => {
        logEvent(allPlans[i], 'change', event.detail)
      })
    }

    container.append(wrapper)
  },
})
