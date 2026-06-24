import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-button',
  title: 'Button',
  render: (container, { logEvent }) => {
    const examples = [
      {
        label: 'Variants',
        html: `
          <tot-button variant="default">Default</tot-button>
          <tot-button variant="primary">Primary</tot-button>
          <tot-button variant="danger">Danger</tot-button>
        `,
      },
      {
        label: 'Sizes',
        html: `
          <tot-button size="small">Small</tot-button>
          <tot-button size="medium">Medium</tot-button>
          <tot-button size="large">Large</tot-button>
        `,
      },
      {
        label: 'Outline',
        html: `
          <tot-button variant="default" outline>Default</tot-button>
          <tot-button variant="primary" outline>Primary</tot-button>
          <tot-button variant="danger" outline>Danger</tot-button>
        `,
      },
      {
        label: 'States',
        html: `
          <tot-button variant="primary" disabled>Disabled</tot-button>
          <tot-button variant="primary" loading>Loading</tot-button>
          <tot-button variant="danger" loading outline>Outline loading</tot-button>
        `,
      },
      {
        label: 'Href and label attribute',
        html: `
          <tot-button href="https://example.com" target="_blank">Href button</tot-button>
          <tot-button label="Label fallback"></tot-button>
          <tot-button label="Slot wins">Default slot wins</tot-button>
        `,
      },
    ]

    for (let i = 0; i < examples.length; i++) {
      const group = document.createElement('div')
      group.className = 'stack demo-group'
      group.innerHTML = `
        <div class="demo-label">${examples[i].label}</div>
        <div class="row">${examples[i].html}</div>
      `
      container.appendChild(group)
    }

    const buttons = container.querySelectorAll('tot-button')
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i]
      button.addEventListener('click', (event) => {
        if (button.hasAttribute('href')) {
          // event.preventDefault()
        }

        logEvent(button, 'click', {
          variant: button.getAttribute('variant') || 'default',
          size: button.getAttribute('size') || 'medium',
          outline: button.hasAttribute('outline'),
          loading: button.hasAttribute('loading'),
          href: button.getAttribute('href') || '',
          text: getButtonText(button),
        })
      })
    }
  },
})

function getButtonText(button) {
  return (button.textContent || button.getAttribute('label') || '').trim()
}
