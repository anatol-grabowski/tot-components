/**
 * Compact Components - Main entry point
 * 
 * A small framework-free web component library.
 * 
 * Usage:
 *   <script type="module" src="./components/index.js"></script>
 */

import { componentsDocs, defineElement } from './core.js'
import { CompactNavbar, CompactTabs } from './navigation.js'
import { CompactButton, CompactSplitButton } from './buttons.js'
import { 
  CompactCheckbox, 
  CompactInput, 
  CompactTextarea, 
  CompactSelect, 
  CompactDropdown,
  CompactHorizontalSelect,
  CompactFileInput,
  CompactTagSelector 
} from './form-controls.js'
import { CompactBox } from './layouts.js'
import { CompactAudioPlayer, CompactAudioRecorder } from './audio.js'
import { CompactModal, CompactDialog, CompactTooltip, CompactHint } from './overlays.js'
import { CompactMessage, CompactToast } from './messages.js'
import { 
  CompactStackedBarChart, 
  CompactLineChart, 
  CompactHorizontalBarChart, 
  CompactTable 
} from './charts.js'
import { CompactList } from './lists.js'
import './markdown.js'

// Register all components
defineElement('compact-navbar', CompactNavbar)
defineElement('compact-tabs', CompactTabs)
defineElement('compact-button', CompactButton)
defineElement('compact-split-button', CompactSplitButton)
defineElement('compact-checkbox', CompactCheckbox)
defineElement('compact-select', CompactSelect)
defineElement('compact-input', CompactInput)
defineElement('compact-textarea', CompactTextarea)
defineElement('compact-box', CompactBox)
defineElement('compact-dropdown', CompactDropdown)
defineElement('compact-horizontal-select', CompactHorizontalSelect)
defineElement('compact-audio-player', CompactAudioPlayer)
defineElement('compact-audio-recorder', CompactAudioRecorder)
defineElement('compact-modal', CompactModal)
defineElement('compact-dialog', CompactDialog)
defineElement('compact-message', CompactMessage)
defineElement('compact-toast', CompactToast)
defineElement('compact-stacked-bar-chart', CompactStackedBarChart)
defineElement('compact-line-chart', CompactLineChart)
defineElement('compact-horizontal-bar-chart', CompactHorizontalBarChart)
defineElement('compact-table', CompactTable)
defineElement('compact-tooltip', CompactTooltip)
defineElement('compact-hint', CompactHint)
defineElement('compact-ordered-list', class extends CompactList {})
defineElement('compact-unordered-list', class extends CompactList {})
defineElement('compact-file-input', CompactFileInput)
defineElement('compact-tag-selector', CompactTagSelector)

// Export global CompactUi helper
window.CompactUi = {
  docs: componentsDocs,
  toast: options => CompactToast.show(options),
}

// Export components for programmatic use
export {
  CompactNavbar,
  CompactTabs,
  CompactButton,
  CompactSplitButton,
  CompactCheckbox,
  CompactInput,
  CompactTextarea,
  CompactSelect,
  CompactDropdown,
  CompactHorizontalSelect,
  CompactAudioPlayer,
  CompactAudioRecorder,
  CompactModal,
  CompactDialog,
  CompactMessage,
  CompactToast,
  CompactStackedBarChart,
  CompactLineChart,
  CompactHorizontalBarChart,
  CompactTable,
  CompactTooltip,
  CompactHint,
  CompactList,
  CompactBox,
  CompactFileInput,
  CompactTagSelector,
  componentsDocs,
}
