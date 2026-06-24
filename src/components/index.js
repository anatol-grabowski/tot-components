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
}
