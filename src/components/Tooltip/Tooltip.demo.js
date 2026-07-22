import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-tooltip',
  title: 'Tooltip',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Hover tooltip with slotted content</div>
        <div class="row">
          <tot-tooltip content="The tooltip chooses the side with enough available space.">
            <tot-button label="Hover tooltip"></tot-button>
          </tot-tooltip>
          <tot-tooltip placement="right-start">
            <tot-button label="Rich hover"></tot-button>
            <div slot="content" class="stack" style="min-width: 14rem;">
              <strong>Rich tooltip</strong>
              <span>Can contain formatted content and components.</span>
              <tot-checkbox checked>Keep visible while hovered</tot-checkbox>
            </div>
          </tot-tooltip>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Click and programmatic activation</div>
        <div class="row">
          <tot-tooltip id="clickTooltip" activation="click" placement="bottom-start">
            <tot-button label="Click tooltip" caret></tot-button>
            <div slot="content" class="stack" style="min-width: 16rem;">
              <tot-input label="Quick note" placeholder="Type inside tooltip" clearable></tot-input>
              <tot-button size="small" variant="create" label="Save"></tot-button>
            </div>
          </tot-tooltip>
          <tot-tooltip id="programmaticTooltip" activation="none" content="Shown and hidden from JavaScript.">
            <tot-button id="programmaticTooltipButton" label="Toggle programmatically"></tot-button>
          </tot-tooltip>
        </div>
      </div>
    `

    const clickTooltip = wrapper.querySelector('#clickTooltip')
    const programmaticTooltip = wrapper.querySelector('#programmaticTooltip')
    const programmaticTooltipButton = wrapper.querySelector('#programmaticTooltipButton')

    clickTooltip.addEventListener('click', () => {
      logEvent(clickTooltip, 'click', { open: clickTooltip.open })
    })

    programmaticTooltipButton.addEventListener('click', () => {
      programmaticTooltip.toggle()
      logEvent(programmaticTooltip, 'toggle', { open: programmaticTooltip.open })
    })

    container.appendChild(wrapper)
  },
})
