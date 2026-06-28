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
          <tot-button variant="create">Create</tot-button>
          <tot-button variant="danger">Danger</tot-button>
        `,
      },
      {
        label: 'Outline variants',
        html: `
          <tot-button variant="default" outline>Default outline</tot-button>
          <tot-button variant="primary" outline>Primary outline</tot-button>
          <tot-button variant="create" outline>Create outline</tot-button>
          <tot-button variant="danger" outline>Danger outline</tot-button>
        `,
      },

      {
        label: 'Caret buttons',
        html: `
          <tot-button caret>Default caret</tot-button>
          <tot-button variant="primary" caret>Primary caret</tot-button>
          <tot-button variant="create" caret>Create caret</tot-button>
          <tot-button variant="danger" outline caret>Danger outline caret</tot-button>
        `,
      },
      {
        label: 'Sizes',
        html: `
          <tot-button size="small" variant="primary">Small primary</tot-button>
          <tot-button size="medium" variant="primary">Medium primary</tot-button>
          <tot-button size="large" variant="primary">Large primary</tot-button>
        `,
      },
      {
        label: 'Small outline combinations',
        html: `
          <tot-button size="small" variant="default" outline>Default</tot-button>
          <tot-button size="small" variant="primary" outline>Primary</tot-button>
          <tot-button size="small" variant="create" outline>Create</tot-button>
          <tot-button size="small" variant="danger" outline>Danger</tot-button>
        `,
      },
      {
        label: 'Disabled combinations',
        html: `
          <tot-button variant="default" disabled>Disabled</tot-button>
          <tot-button variant="primary" disabled>Disabled primary</tot-button>
          <tot-button variant="danger" outline disabled>Disabled outline danger</tot-button>
        `,
      },
      {
        label: 'Loading combinations',
        html: `
          <tot-button variant="default" loading>Default loading</tot-button>
          <tot-button variant="primary" loading>Primary loading</tot-button>
          <tot-button variant="danger" outline loading>Danger outline loading</tot-button>
        `,
      },
      {
        label: 'Href combinations',
        html: `
          <tot-button href="https://example.com" target="_blank">Href default</tot-button>
          <tot-button href="https://example.com" target="_blank" variant="primary">Href primary</tot-button>
          <tot-button href="https://example.com" target="_blank" variant="danger" outline>Href danger outline</tot-button>
          <tot-button href="https://example.com" target="_blank" disabled>Disabled href</tot-button>
        `,
      },
      {
        label: 'Label fallback and long text',
        html: `
          <tot-button label="Label fallback"></tot-button>
          <tot-button label="Slot wins">Default slot wins</tot-button>
          <tot-button variant="primary" size="small" label="Small label fallback"></tot-button>
          <tot-button variant="danger" outline label="Very long label fallback that should keep the button compact"></tot-button>
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
          event.preventDefault()
        }

        logEvent(button, 'click', {
          variant: button.getAttribute('variant') || 'default',
          size: button.getAttribute('size') || 'medium',
          outline: button.hasAttribute('outline'),
          disabled: button.hasAttribute('disabled'),
          loading: button.hasAttribute('loading'),
          caret: button.hasAttribute('caret'),
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
