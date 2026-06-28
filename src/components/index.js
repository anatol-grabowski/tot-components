/**
 * Compact Components
 */
import { TotButton } from './Button/Button.js'
import { TotCheckbox } from './Checkbox/Checkbox.js'
import { TotNavbar } from './Navbar/Navbar.js'
import { TotTabs } from './Tabs/Tabs.js'
import { TotAudioPlayer } from './AudioPlayer/AudioPlayer.js'
import { TotAudioRecorder } from './AudioRecorder/AudioRecorder.js'
import { TotDivider } from './Divider/Divider.js'
import { TotMenu, TotMenuItem, TotMenuLabel } from './Menu/Menu.js'
import { TotDropdown } from './Dropdown/Dropdown.js'
import { TotDialog } from './Dialog/Dialog.js'
import { TotHint } from './Hint/Hint.js'
import { TotTooltip } from './Tooltip/Tooltip.js'
import { TotToast } from './Toast/Toast.js'
import { TotMessage } from './Message/Message.js'
import { TotInput } from './Input/Input.js'
import { TotFileInput } from './FileInput/FileInput.js'
import { TotHorizontalSelect } from './HorizontalSelect/HorizontalSelect.js'
import { TotSelect } from './Select/Select.js'
import { TotModal } from './Modal/Modal.js'
import { TotTextarea } from './Textarea/Textarea.js'
import { TotTable } from './Table/Table.js'
import { TotMarkdown } from './Markdown/Markdown.js'
import { TotHtml } from './Html/Html.js'
import { TotThemeSelector } from './ThemeSelector/ThemeSelector.js'

export function defineElement(name, klass) {
  if (!customElements.get(name)) {
    customElements.define(name, klass)
  }
}

// Register components
defineElement('tot-button', TotButton)
defineElement('tot-checkbox', TotCheckbox)

defineElement('tot-navbar', TotNavbar)
defineElement('tot-tabs', TotTabs)

defineElement('tot-audio-player', TotAudioPlayer)
defineElement('tot-audio-recorder', TotAudioRecorder)

defineElement('tot-divider', TotDivider)
defineElement('tot-menu', TotMenu)
defineElement('tot-menu-item', TotMenuItem)
defineElement('tot-menu-label', TotMenuLabel)
defineElement('tot-dropdown', TotDropdown)
defineElement('tot-dialog', TotDialog)
defineElement('tot-hint', TotHint)
defineElement('tot-tooltip', TotTooltip)
defineElement('tot-toast', TotToast)
defineElement('tot-message', TotMessage)
defineElement('tot-input', TotInput)
defineElement('tot-file-input', TotFileInput)
defineElement('tot-horizontal-select', TotHorizontalSelect)
defineElement('tot-select', TotSelect)
defineElement('tot-modal', TotModal)
defineElement('tot-textarea', TotTextarea)
defineElement('tot-table', TotTable)
defineElement('tot-markdown', TotMarkdown)
defineElement('tot-html', TotHtml)
defineElement('tot-theme-selector', TotThemeSelector)

export {
  TotButton,
  TotCheckbox,
  TotNavbar,
  TotTabs,
  TotAudioPlayer,
  TotAudioRecorder,
  TotDivider,
  TotMenu,
  TotMenuItem,
  TotMenuLabel,
  TotDropdown,
  TotDialog,
  TotHint,
  TotTooltip,
  TotToast,
  TotMessage,
  TotInput,
  TotFileInput,
  TotHorizontalSelect,
  TotSelect,
  TotModal,
  TotTextarea,
  TotTable,
  TotMarkdown,
  TotHtml,
  TotThemeSelector,
}
