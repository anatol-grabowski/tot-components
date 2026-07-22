import { TotModal } from '../Modal/Modal.js'

const dialogStyle = `
  .overlay {
    align-items: center;
    justify-content: center;
    padding: max(var(--tot-spacing-small, .75rem), env(safe-area-inset-top)) max(var(--tot-spacing-small, .75rem), env(safe-area-inset-right)) max(var(--tot-spacing-small, .75rem), env(safe-area-inset-bottom)) max(var(--tot-spacing-small, .75rem), env(safe-area-inset-left));
  }

  .modal {
    background: var(--tot-dialog-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: var(--tot-border-radius-large, 8px);
    height: auto;
    max-height: min(var(--tot-dialog-max-height, 90dvh), calc(100dvh - 2 * var(--tot-spacing-small, .75rem)));
    max-width: calc(100vw - 2 * var(--tot-spacing-small, .75rem));
    min-width: min(var(--tot-dialog-min-width, 18rem), calc(100vw - 2 * var(--tot-spacing-small, .75rem)));
    width: var(--tot-dialog-width, 28rem);
  }

  .modal__header {
    min-height: var(--tot-input-height-medium, 2.25rem);
    padding: var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem);
  }

  .modal__title {
    line-height: var(--tot-line-height-dense, 1.4);
  }

  .modal__close[hidden] {
    display: none;
  }

  .modal__body ::slotted(*) {
    margin-top: 0;
  }

  .modal__footer {
    gap: var(--tot-spacing-x-small, .5rem);
    justify-content: flex-end;
  }

  .dialog__fallback-actions {
    display: inline-flex;
    flex-wrap: wrap;
    gap: var(--tot-spacing-x-small, .5rem);
    justify-content: flex-end;
  }

  .dialog__fallback-actions tot-button[hidden] {
    display: none;
  }
`

const confirmVariants = ['default', 'primary', 'danger', 'create']

export class TotDialog extends TotModal {
  static get observedAttributes() {
    return [
      ...TotModal.observedAttributes,
      'content',
      'confirm-label',
      'cancellabel',
      'cancel-label',
      'confirmlabel',
      'confirm-variant',
      'confirmvariant',
      'hide-cancel',
      'hide-confirm',
      'hide-footer',
      'no-close',
    ]
  }

  constructor() {
    super()

    const style = document.createElement('style')
    style.textContent = dialogStyle
    this.shadowRoot.appendChild(style)

    this._baseElement.setAttribute('aria-labelledby', 'dialog-title')
    this._titleElement.id = 'dialog-title'
    this._defaultSlot = this.shadowRoot.querySelector('.modal__body slot:not([name])')
    this._footerSlot.innerHTML = `
      <span class="dialog__fallback-actions" part="actions">
        <tot-button class="dialog__cancel" part="cancel-button"></tot-button>
        <tot-button class="dialog__confirm" part="confirm-button"></tot-button>
      </span>
    `
    this._cancelButton = this.shadowRoot.querySelector('.dialog__cancel')
    this._confirmButton = this.shadowRoot.querySelector('.dialog__confirm')

    this._cancelButton.addEventListener('click', () => this.cancel())
    this._confirmButton.addEventListener('click', () => this.confirm())
  }

  get content() {
    return this.getAttribute('content') || ''
  }

  set content(value) {
    setNullableAttribute(this, 'content', value)
  }

  get confirmLabel() {
    return this.getAttribute('confirm-label') || this.getAttribute('confirmlabel') || 'Confirm'
  }

  set confirmLabel(value) {
    setNullableAttribute(this, 'confirm-label', value)
  }

  get cancelLabel() {
    return this.getAttribute('cancel-label') || this.getAttribute('cancellabel') || 'Cancel'
  }

  set cancelLabel(value) {
    setNullableAttribute(this, 'cancel-label', value)
  }

  get confirmVariant() {
    return this.getAttribute('confirm-variant') || this.getAttribute('confirmvariant') || 'primary'
  }

  set confirmVariant(value) {
    setNullableAttribute(this, 'confirm-variant', value)
  }

  get hideCancel() {
    return this.hasAttribute('hide-cancel')
  }

  set hideCancel(value) {
    setBooleanAttribute(this, 'hide-cancel', value)
  }

  get hideConfirm() {
    return this.hasAttribute('hide-confirm')
  }

  set hideConfirm(value) {
    setBooleanAttribute(this, 'hide-confirm', value)
  }

  get hideFooter() {
    return this.hasAttribute('hide-footer')
  }

  set hideFooter(value) {
    setBooleanAttribute(this, 'hide-footer', value)
  }

  get noClose() {
    return this.hasAttribute('no-close')
  }

  set noClose(value) {
    setBooleanAttribute(this, 'no-close', value)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue)
    if (oldValue === newValue) {
      return
    }

    if (name === 'content') {
      this._syncBodyFallback()
    } else if (name === 'no-close') {
      this._syncCloseButton()
    } else if (name === 'hide-footer') {
      this._syncFooter()
    } else if (name === 'hide-cancel') {
      this._syncCancelVisibility()
    } else if (name === 'hide-confirm') {
      this._syncConfirmVisibility()
    } else if (name === 'cancel-label' || name === 'cancellabel') {
      this._syncCancelLabel()
    } else if (name === 'confirm-label' || name === 'confirmlabel') {
      this._syncConfirmLabel()
    } else if (name === 'confirm-variant' || name === 'confirmvariant') {
      this._syncConfirmVariant()
    }
  }

  confirm() {
    this._hide('confirm')
  }

  cancel(reason = 'cancel') {
    this._hide(String(reason || 'cancel'))
  }

  getCancelButton() {
    return this._cancelButton
  }

  getConfirmButton() {
    return this._confirmButton
  }

  _syncAll() {
    super._syncAll()
    this._syncBodyFallback()
    this._syncCloseButton()
    this._syncFooter()
    this._syncCancelVisibility()
    this._syncConfirmVisibility()
    this._syncCancelLabel()
    this._syncConfirmLabel()
    this._syncConfirmVariant()
  }

  _syncBodyFallback() {
    this._defaultSlot.textContent = this.content
  }

  _syncCloseButton() {
    this._closeButton.hidden = this.noClose
  }

  _syncFooter() {
    this._footerElement.hidden = this.hideFooter
  }

  _syncCancelVisibility() {
    this._cancelButton.hidden = this.hideCancel
  }

  _syncConfirmVisibility() {
    this._confirmButton.hidden = this.hideConfirm
  }

  _syncCancelLabel() {
    setNullableAttribute(this._cancelButton, 'label', this.cancelLabel)
  }

  _syncConfirmLabel() {
    setNullableAttribute(this._confirmButton, 'label', this.confirmLabel)
  }

  _syncConfirmVariant() {
    setNullableAttribute(this._confirmButton, 'variant', getSupportedValue(this.confirmVariant, confirmVariants, 'primary'))
  }

  _requestClose(reason) {
    this.cancel(reason)
  }

  _getInitialFocusTarget() {
    const assignedFooter = this._footerSlot.assignedElements({ flatten: true })
    const customFooterTarget = findFocusable(assignedFooter)
    if (customFooterTarget) {
      return customFooterTarget
    }

    if (!this.hideConfirm) {
      return this._confirmButton
    }

    if (!this.noClose) {
      return this._closeButton
    }

    return this._baseElement
  }

  _emitHide(reason) {
    this.dispatchEvent(new CustomEvent('hide', {
      bubbles: true,
      composed: true,
      detail: { reason },
    }))
  }
}

function findFocusable(elements) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    if (isFocusable(element)) {
      return element
    }

    const candidates = element.querySelectorAll?.('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), tot-button') || []
    for (let j = 0; j < candidates.length; j++) {
      if (isFocusable(candidates[j])) {
        return candidates[j]
      }
    }
  }

  return null
}

function isFocusable(element) {
  if (!(element instanceof HTMLElement) || element.hidden || element.hasAttribute('disabled')) {
    return false
  }

  if (element.getAttribute('aria-hidden') === 'true' || element.getAttribute('tabindex') === '-1') {
    return false
  }

  return element.matches('button, [href], input, select, textarea, [tabindex], tot-button')
}


function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function getSupportedValue(value, supportedValues, fallback) {
  for (let i = 0; i < supportedValues.length; i++) {
    if (supportedValues[i] === value) {
      return value
    }
  }
  return fallback
}
