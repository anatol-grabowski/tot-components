/**
 * Compact Components
 */
import { defineElement } from './core.js'
import { CompactButton } from './CompactButton/CompactButton.js'
import { CompactCheckbox } from './CompactCheckbox/CompactCheckbox.js'

// Register components
defineElement('compact-button', CompactButton)
defineElement('compact-checkbox', CompactCheckbox)

export {
  CompactButton,
  CompactCheckbox,
}
