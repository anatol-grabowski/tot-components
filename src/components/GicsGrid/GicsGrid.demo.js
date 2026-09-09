import { registerDemo } from '../demoCommon.js'

const demoPatterns = {
  '2010': 'diagonal',
  '201060': 'dots',
  '20106020': 'crosshatch',
}

const demoConfig = {
  label: 'Editable GICS 13 by 13 grid',
  showCodes: false,
  iconOpacity: 1,
  editMode: true,
  patterns: demoPatterns,
}

registerDemo({
  id: 'tot-gics-grid',
  title: 'GICS Grid',
  render: (container) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="row" aria-label="GICS grid demo controls">
        <tot-checkbox id="gicsGridShowCodes">Show codes</tot-checkbox>
        <label style="display:inline-flex;align-items:center;gap:var(--tot-spacing-2x-small, .375rem);color:var(--tot-color-neutral-600, #475569);font-size:var(--tot-font-size-x-small, .75rem);">
          Icon opacity
          <input
            id="gicsGridIconOpacity"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value="1"
            aria-label="GICS icon opacity"
            style="accent-color:var(--tot-color-primary-500, #0ea5e9);"
          >
          <output id="gicsGridIconOpacityValue" for="gicsGridIconOpacity" style="min-width:2.6rem;text-align:right;">100%</output>
        </label>
        <tot-checkbox id="gicsGridEditMode" checked>Edit mode</tot-checkbox>
        <tot-checkbox id="gicsGridPatterns" checked>Demo patterns</tot-checkbox>
      </div>
    `

    const grid = document.createElement('tot-gics-grid')
    grid.config = demoConfig
    grid.style.maxWidth = '44rem'
    wrapper.append(grid)

    const showCodes = wrapper.querySelector('#gicsGridShowCodes')
    const iconOpacity = wrapper.querySelector('#gicsGridIconOpacity')
    const iconOpacityValue = wrapper.querySelector('#gicsGridIconOpacityValue')
    const editMode = wrapper.querySelector('#gicsGridEditMode')
    const patterns = wrapper.querySelector('#gicsGridPatterns')

    showCodes.addEventListener('change', () => {
      grid.config = {
        ...grid.config,
        showCodes: showCodes.checked,
      }
    })

    iconOpacity.addEventListener('input', () => {
      const value = Number(iconOpacity.value)
      iconOpacityValue.value = `${Math.round(value * 100)}%`
      iconOpacityValue.textContent = iconOpacityValue.value
      grid.config = {
        ...grid.config,
        iconOpacity: value,
      }
    })

    editMode.addEventListener('change', () => {
      grid.config = {
        ...grid.config,
        editMode: editMode.checked,
      }
    })

    patterns.addEventListener('change', () => {
      grid.config = {
        ...grid.config,
        patterns: patterns.checked ? demoPatterns : {},
      }
    })

    container.append(wrapper)
  },
})
