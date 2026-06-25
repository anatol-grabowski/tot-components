import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-theme-selector',
  title: 'Theme Selector',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Themes from the current demo theme stylesheet path</div>
        <div class="row">
          <tot-theme-selector id="themeSelectorDemo"></tot-theme-selector>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Configured with explicit theme names</div>
        <div class="row">
          <tot-theme-selector id="namedThemeSelector" label="Color scheme" themes="light,dark"></tot-theme-selector>
        </div>
      </div>
    `

    const selectors = wrapper.querySelectorAll('tot-theme-selector')
    for (let i = 0; i < selectors.length; i++) {
      selectors[i].addEventListener('theme-change', (event) => {
        logEvent(selectors[i], 'theme-change', {
          theme: event.detail.theme,
          label: event.detail.label,
          href: event.detail.href,
        })
      })
    }

    container.appendChild(wrapper)
  },
})
