import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-stripe',
  title: 'Stripe',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="demo-group stack">
        <div class="demo-label">Payment processing state</div>
        <tot-stripe status="processing" session-id="cs_test_123" show-actions></tot-stripe>
      </div>
      <div class="demo-group stack">
        <div class="demo-label">Payment finished states</div>
        <tot-stripe status="success" session-id="cs_test_success" show-actions></tot-stripe>
        <tot-stripe status="cancelled" show-actions></tot-stripe>
        <tot-stripe status="error" detail="Payment method was declined." show-actions></tot-stripe>
      </div>
    `

    const stripeElements = wrapper.querySelectorAll('tot-stripe')
    for (let i = 0; i < stripeElements.length; i++) {
      stripeElements[i].addEventListener('continue', event => {
        logEvent(stripeElements[i], 'continue', event.detail)
      })
      stripeElements[i].addEventListener('retry', event => {
        logEvent(stripeElements[i], 'retry', event.detail)
      })
    }

    container.append(wrapper)
  },
})
