/**
 * Compact Components
 */
import { defineElement } from './core.js'

import { TotButton } from './Button/Button.js'
import { TotCheckbox } from './Checkbox/Checkbox.js'
import { TotNavbar } from './Navbar/Navbar.js'
import { TotTabs } from './Tabs/Tabs.js'
import { TotAudioPlayer } from './AudioPlayer/AudioPlayer.js'
import { TotAudioRecorder } from './AudioRecorder/AudioRecorder.js'

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
  TotAudioPlayer,
  TotAudioRecorder,
}
