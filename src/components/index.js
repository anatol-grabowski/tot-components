/**
 * Compact Components
 */
import { TotButton } from './Button/Button.js'
import { TotCheckbox } from './Checkbox/Checkbox.js'
import { TotNavbar } from './Navbar/Navbar.js'
import { TotTabs } from './Tabs/Tabs.js'
import { TotAudioPlayer } from './AudioPlayer/AudioPlayer.js'
import { TotAudioRecorder } from './AudioRecorder/AudioRecorder.js'


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

export {
  TotButton,
  TotCheckbox,
  TotNavbar,
  TotTabs,
  TotAudioPlayer,
  TotAudioRecorder,
}
