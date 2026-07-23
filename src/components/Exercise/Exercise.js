import '../Markdown/Markdown.js'
import '../Button/Button.js'

const exerciseStyle = `
  :host {
    box-sizing: border-box;
    display: block;
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .exercise {
    display: grid;
    gap: var(--tot-spacing-x-small, .5rem);
    max-width: 100%;
    min-width: 0;
  }

  .exercise__footer {
    align-items: center;
    display: flex;
    gap: var(--tot-spacing-2x-small, .25rem);
    justify-content: flex-end;
    min-width: 0;
  }

  .exercise__footer tot-button,
  .exercise__fullscreen-footer tot-button {
    flex: 0 0 auto;
    min-width: 5.5rem;
  }

  .exercise__fullscreen-footer {
    align-items: center;
    display: flex;
    gap: var(--tot-spacing-2x-small, .25rem);
    justify-content: flex-end;
    min-width: 0;
  }

  .exercise-slot {
    display: inline;
    line-height: inherit;
    margin: 0 .08em;
    max-width: 100%;
    min-width: 0;
    position: relative;
    vertical-align: baseline;
  }

  .exercise-slot__work {
    display: inline;
    line-height: inherit;
    min-width: 0;
    vertical-align: baseline;
  }

  .exercise-correction {
    background: color-mix(in srgb, var(--tot-color-success-50, #f0fdf4) 88%, transparent);
    border-radius: var(--tot-border-radius-small, 3px);
    bottom: calc(100% - .02em);
    color: var(--tot-color-success-700, #15803d);
    display: inline-flex;
    font-size: .58em;
    font-weight: var(--tot-font-weight-semibold, 500);
    left: 1.45em;
    line-height: 1;
    max-width: min(16ch, 60vw);
    opacity: 0;
    overflow: hidden;
    padding: 0 .12em;
    pointer-events: none;
    position: absolute;
    text-overflow: ellipsis;
    transform: none;
    visibility: hidden;
    white-space: nowrap;
    z-index: 1;
  }

  .exercise-correction:empty {
    display: none;
  }

  .exercise-slot--shown.exercise-slot--wrong .exercise-correction:not(:empty) {
    opacity: 1;
    visibility: visible;
  }

  .exercise-input {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    border: 0;
    border-bottom: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    border-radius: 0;
    color: inherit;
    display: inline-block;
    font: inherit;
    font-size: .96em;
    height: 1.12em;
    line-height: 1;
    margin: 0 .02em;
    max-width: 100%;
    min-width: var(--exercise-input-width, 4ch);
    padding: 0 .1em .02em;
    text-align: center;
    vertical-align: baseline;
    width: var(--exercise-input-width, 4ch);
  }

  .exercise-input:focus {
    border-bottom-color: var(--tot-color-primary-600, #0284c7);
    box-shadow: 0 1px 0 var(--tot-color-primary-600, #0284c7);
    outline: 0;
  }

  .exercise-slot--shown.exercise-slot--correct .exercise-input {
    border-bottom-color: var(--tot-color-success-500, #22c55e);
    color: var(--tot-color-success-700, #15803d);
  }

  .exercise-slot--shown.exercise-slot--wrong .exercise-input {
    border-bottom-color: var(--tot-color-danger-500, #ef4444);
    color: var(--tot-color-danger-700, #b91c1c);
    text-decoration: line-through;
    text-decoration-color: var(--tot-color-danger-600, #dc2626);
    text-decoration-thickness: 2px;
  }

  .exercise-choice-list {
    display: inline;
    line-height: inherit;
    max-width: 100%;
    min-width: 0;
    vertical-align: baseline;
    white-space: normal;
  }

  .exercise-choice {
    display: inline;
    line-height: inherit;
    max-width: 100%;
    min-width: 0;
    vertical-align: baseline;
    white-space: normal;
  }

  .exercise-choice__blank {
    align-items: baseline;
    border-bottom: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    display: inline-flex;
    justify-content: center;
    line-height: .98;
    min-height: 1em;
    min-width: var(--exercise-choice-width, 5ch);
    padding: 0 .12em .02em;
    vertical-align: baseline;
  }

  .exercise-choice__blank-text {
    color: var(--tot-color-primary-700, #0369a1);
    display: inline-block;
    min-width: 1ch;
    text-align: center;
  }

  .exercise-choice__blank-text:empty::before {
    content: '\\00a0';
  }

  .exercise-choice__option-number {
    color: var(--tot-color-neutral-600, #475569);
    display: inline-block;
    font-size: .52em;
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: 1;
    margin: -.45em -.05em 0 .08em;
    position: relative;
    top: -.38em;
  }

  .exercise-choice__options {
    color: inherit;
    display: inline;
    line-height: inherit;
    white-space: normal;
  }

  .exercise-choice-button,
  .exercise-match-button,
  .exercise-answer-toggle {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    border: 0;
    border-radius: 0;
    color: inherit;
    cursor: pointer;
    font: inherit;
    line-height: inherit;
    min-height: 0;
    padding: 0;
  }

  .exercise-choice-button {
    display: inline;
    white-space: normal;
  }

  .exercise-choice-button:hover,
  .exercise-match-button:hover,
  .exercise-answer-toggle:hover {
    color: var(--tot-color-primary-700, #0369a1);
  }

  .exercise-choice-button:focus-visible,
  .exercise-match-button:focus-visible,
  .exercise-answer-toggle:focus-visible {
    border-radius: var(--tot-border-radius-small, 3px);
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .exercise-choice-button[aria-pressed="true"] {
    color: inherit;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: .14em;
  }

  .exercise-slot--shown.exercise-slot--correct .exercise-choice__blank {
    border-bottom-color: var(--tot-color-success-500, #22c55e);
  }

  .exercise-slot--shown.exercise-slot--correct .exercise-choice__blank-text {
    color: var(--tot-color-success-700, #15803d);
  }

  .exercise-slot--shown.exercise-slot--wrong .exercise-choice__blank {
    border-bottom-color: var(--tot-color-danger-500, #ef4444);
  }

  .exercise-slot--shown.exercise-slot--wrong .exercise-choice__blank-text {
    color: var(--tot-color-danger-700, #b91c1c);
    text-decoration-color: var(--tot-color-danger-600, #dc2626);
    text-decoration-line: line-through;
    text-decoration-thickness: 1px;
  }

  .exercise-choice-separator {
    color: var(--tot-color-neutral-500, #64748b);
    display: inline;
    line-height: inherit;
    padding: 0;
    white-space: normal;
  }

  .exercise-slot--match-bank {
    margin-inline: .18em;
  }

  .exercise-slot--match-gap {
    margin-inline: .04em;
  }

  .exercise-match-button {
    display: inline;
    line-height: inherit;
    min-width: 0;
    vertical-align: baseline;
    white-space: normal;
  }

  .exercise-match-button[aria-pressed="true"] .exercise-match-token,
  .exercise-match-button[aria-pressed="true"] .exercise-match-space-text {
    color: var(--tot-color-primary-700, #0369a1);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: .14em;
  }

  .exercise-match-token {
    display: inline;
    font-weight: inherit;
    line-height: inherit;
    min-width: 0;
    vertical-align: baseline;
    white-space: normal;
  }

  .exercise-match-button--bank .exercise-match-token {
    background: color-mix(in srgb, var(--tot-color-neutral-200, #e5e7eb) 72%, transparent);
    padding: .02em .32em;
  }

  .exercise-match-space {
    border-bottom: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
    color: var(--tot-color-primary-700, #0369a1);
    display: inline-block;
    line-height: .98;
    min-height: 1em;
    min-width: var(--exercise-match-width, 8ch);
    padding: 0 .18em .02em;
    text-align: center;
    vertical-align: baseline;
  }

  .exercise-match-space-text {
    display: inline;
    line-height: inherit;
  }

  .exercise-match-space-text:empty::before {
    color: var(--tot-input-placeholder-color, #64748b);
    content: '\\00a0';
  }

  .exercise-match-number {
    color: var(--tot-color-neutral-600, #475569);
    display: inline-block;
    font-size: .52em;
    font-weight: var(--tot-font-weight-semibold, 500);
    line-height: 1;
    margin-left: .08em;
    position: relative;
    top: -.48em;
  }

  .exercise-slot--shown.exercise-slot--correct .exercise-match-space {
    border-color: var(--tot-color-success-500, #22c55e);
  }

  .exercise-slot--shown.exercise-slot--correct .exercise-match-space-text {
    color: var(--tot-color-success-700, #15803d);
  }

  .exercise-slot--shown.exercise-slot--wrong .exercise-match-space {
    border-color: var(--tot-color-danger-500, #ef4444);
  }

  .exercise-slot--shown.exercise-slot--wrong .exercise-match-space-text {
    color: var(--tot-color-danger-700, #b91c1c);
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }

  .exercise-match-button--used-empty .exercise-match-token {
    text-decoration: line-through;
    text-decoration-color: var(--tot-color-danger-600, #dc2626);
    text-decoration-thickness: 1px;
  }

  .exercise-answer-toggle {
    align-items: baseline;
    color: var(--tot-color-neutral-500, #64748b);
    display: inline-flex;
    font-size: .66em;
    justify-content: center;
    line-height: 1;
    min-height: 1em;
    min-width: 1.05em;
    opacity: .62;
    padding: 0;
    vertical-align: baseline;
    width: 1.05em;
  }

  .exercise-result {
    align-items: baseline;
    display: inline-flex;
    font-size: .72em;
    justify-content: center;
    line-height: 1;
    min-width: 1em;
    visibility: hidden;
    width: 1em;
  }

  .exercise-slot--shown .exercise-result {
    visibility: visible;
  }
`

let exerciseId = 0

export class TotExercise extends HTMLElement {
  static get observedAttributes() {
    return [
      'value',
      'streaming',
      'label',
      'help-text',
      'variant',
    ]
  }

  constructor() {
    super()
    exerciseId += 1
    this._value = null
    this._slotPrefix = `exercise-${exerciseId}`
    this._answersShown = new Map()
    this._inputResponses = new Map()
    this._choiceResponses = new Map()
    this._matchResponses = new Map()
    this._selectedMatchId = ''
    this._elements = null
    this._exerciseSource = undefined
    this._exerciseResult = null
    this._renderedSlots = new Map()
    this._renderedStructure = ''
    this._controlsDirty = true
  }

  get value() {
    if (this._value !== null) {
      return this._value
    }

    if (this.hasAttribute('value')) {
      return this.getAttribute('value') || ''
    }

    return ''
  }

  set value(value) {
    const previousValue = this.value
    this._value = value === null || value === undefined ? '' : String(value)
    if (this._value !== previousValue) {
      this.render()
    }
  }

  get responses() {
    const result = this.getExerciseResult()
    const responses = []
    for (let i = 0; i < result.placeholders.length; i++) {
      const placeholder = result.placeholders[i]
      responses.push({
        responseId: placeholder.responseId,
        task: placeholder.task,
        problem: placeholder.problem,
        type: placeholder.type,
        side: placeholder.side,
        value: this.getResponseValue(placeholder, result),
        correct: this.isPlaceholderCorrect(placeholder, result),
      })
    }
    return responses
  }

  set responses(value) {
    const responses = Array.isArray(value) ? value : []
    const result = this.getExerciseResult()
    const byResponseId = new Map()
    for (let i = 0; i < result.placeholders.length; i++) {
      byResponseId.set(result.placeholders[i].responseId, result.placeholders[i])
    }

    const provided = new Map()
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i]
      if (!response || typeof response !== 'object') {
        continue
      }

      const responseId = typeof response.responseId === 'string'
        ? response.responseId
        : createResponseId(response)
      if (byResponseId.has(responseId)) {
        provided.set(responseId, response)
      }
    }

    this._inputResponses.clear()
    this._choiceResponses.clear()
    this._matchResponses.clear()
    this._selectedMatchId = ''

    for (let i = 0; i < result.placeholders.length; i++) {
      const placeholder = result.placeholders[i]
      const response = provided.get(placeholder.responseId)
      if (!response || typeof response.value !== 'string' || response.value === '') {
        continue
      }

      if (placeholder.type === 'input') {
        this._inputResponses.set(placeholder.id, response.value)
      } else if (placeholder.type === 'choice') {
        this._choiceResponses.set(placeholder.id, response.value)
      }
    }

    for (let i = 0; i < result.placeholders.length; i++) {
      const placeholder = result.placeholders[i]
      if (placeholder.type !== 'match' || this._matchResponses.has(placeholder.id)) {
        continue
      }

      const response = provided.get(placeholder.responseId)
      const paired = response && typeof response.value === 'string'
        ? byResponseId.get(response.value)
        : null
      if (!paired || paired.type !== 'match' || paired.task !== placeholder.task || paired.side === placeholder.side) {
        continue
      }
      if (this._matchResponses.has(paired.id)) {
        continue
      }

      this._matchResponses.set(placeholder.id, paired.id)
      this._matchResponses.set(paired.id, placeholder.id)
    }

    this.renderControls()
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  set label(value) {
    setNullableAttribute(this, 'label', value)
  }

  get helpText() {
    return this.getAttribute('help-text') || ''
  }

  set helpText(value) {
    setNullableAttribute(this, 'help-text', value)
  }

  get streaming() {
    return this.hasAttribute('streaming')
  }

  set streaming(value) {
    setBooleanAttribute(this, 'streaming', value)
  }

  get variant() {
    return normalizeVariant(this.getAttribute('variant'))
  }

  set variant(value) {
    this.setAttribute('variant', normalizeVariant(value))
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name) {
    if (name === 'value') {
      this._value = null
      this.render()
      return
    }

    if (!this.isConnected && !this.shadowRoot) {
      return
    }

    this.renderShell()
    this.updateMarkdownProperties()
  }

  validate() {
    const placeholders = this.getExerciseResult().placeholders
    for (let i = 0; i < placeholders.length; i++) {
      this._answersShown.set(placeholders[i].id, true)
    }
    this.renderControls()
    emit(this, 'validate')
  }

  reset() {
    this._answersShown.clear()
    this._inputResponses.clear()
    this._choiceResponses.clear()
    this._matchResponses.clear()
    this._selectedMatchId = ''
    this.renderControls()
    emit(this, 'reset')
    emit(this, 'change')
  }

  render() {
    if (!this.isConnected && !this.shadowRoot) {
      return
    }

    const result = this.getExerciseResult()
    this.renderShell(result)
    this.cleanState(result.placeholders)
    this.updateMarkdownProperties(result)
    this.renderExerciseSlots(result)
    this.updateFooter(result.placeholders)
  }

  renderShell(result = this.getExerciseResult()) {
    if (this.shadowRoot) {
      return
    }

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${exerciseStyle}</style>
      <div class="exercise" part="base">
        <div class="exercise__footer" part="footer">
          <tot-button class="exercise__reveal-all" size="small" variant="primary"></tot-button>
          <tot-button class="exercise__reset" size="small" label="Reset exercise"></tot-button>
        </div>
      </div>
    `

    const exercise = root.querySelector('.exercise')
    const footer = root.querySelector('.exercise__footer')
    const markdown = document.createElement('tot-markdown')
    markdown.className = 'exercise__markdown'
    markdown.setAttribute('pandoc', '')
    markdown.setAttribute('part', 'markdown')
    markdown.label = this.label
    markdown.helpText = this.helpText
    markdown.streaming = this.streaming
    markdown.variant = this.variant
    markdown.value = result.markdown
    exercise.insertBefore(markdown, footer)

    const fullscreenFooter = document.createElement('div')
    const fullscreenRevealButton = document.createElement('tot-button')
    const fullscreenResetButton = document.createElement('tot-button')
    fullscreenFooter.className = 'exercise__fullscreen-footer'
    fullscreenFooter.slot = 'fullscreen-footer'
    fullscreenFooter.setAttribute('part', 'fullscreen-footer')
    fullscreenRevealButton.className = 'exercise__fullscreen-reveal-all'
    fullscreenRevealButton.setAttribute('size', 'small')
    fullscreenRevealButton.setAttribute('variant', 'primary')
    fullscreenResetButton.className = 'exercise__fullscreen-reset'
    fullscreenResetButton.setAttribute('size', 'small')
    fullscreenResetButton.setAttribute('label', 'Reset exercise')
    fullscreenFooter.appendChild(fullscreenRevealButton)
    fullscreenFooter.appendChild(fullscreenResetButton)
    markdown.appendChild(fullscreenFooter)

    this._elements = {
      fullscreenFooter,
      markdown,
      resetButtons: [
        root.querySelector('.exercise__reset'),
        fullscreenResetButton,
      ],
      revealAllButtons: [
        root.querySelector('.exercise__reveal-all'),
        fullscreenRevealButton,
      ],
    }
    for (let i = 0; i < this._elements.revealAllButtons.length; i++) {
      this._elements.revealAllButtons[i].addEventListener('click', () => {
        this.toggleAllAnswers(this.getExerciseResult().placeholders)
      })
    }
    for (let i = 0; i < this._elements.resetButtons.length; i++) {
      this._elements.resetButtons[i].addEventListener('click', () => this.reset())
    }
  }

  updateMarkdownProperties(result = this.getExerciseResult()) {
    const markdown = this._elements?.markdown
    if (!markdown) {
      return
    }

    const label = this.label
    const helpText = this.helpText
    const streaming = this.streaming
    const variant = this.variant
    if (markdown.label !== label) {
      markdown.label = label
    }
    if (markdown.helpText !== helpText) {
      markdown.helpText = helpText
    }
    if (markdown.streaming !== streaming) {
      markdown.streaming = streaming
    }
    if (markdown.variant !== variant) {
      markdown.variant = variant
    }
    if (markdown.value !== result.markdown) {
      markdown.value = result.markdown
    }
  }

  updateFooter(placeholders) {
    const revealAllButtons = this._elements?.revealAllButtons
    if (!revealAllButtons) {
      return
    }

    const label = this.areAllAnswersShown(placeholders) ? 'Hide' : 'Validate'
    for (let i = 0; i < revealAllButtons.length; i++) {
      if (revealAllButtons[i].getAttribute('label') !== label) {
        revealAllButtons[i].setAttribute('label', label)
      }
    }
  }

  renderExerciseSlots(result) {
    const markdown = this._elements?.markdown
    if (!markdown) {
      return
    }

    const structure = getPlaceholderStructure(result.placeholders)
    if (!this._controlsDirty && structure === this._renderedStructure) {
      return
    }

    const fragment = document.createDocumentFragment()
    this._renderedSlots.clear()
    for (let i = 0; i < result.placeholders.length; i++) {
      const placeholder = result.placeholders[i]
      const slot = this.createExerciseSlot(placeholder, result)
      this._renderedSlots.set(placeholder.id, slot)
      fragment.appendChild(slot)
    }
    if (this._elements.fullscreenFooter) {
      fragment.appendChild(this._elements.fullscreenFooter)
    }
    markdown.replaceChildren(fragment)
    this._renderedStructure = structure
    this._controlsDirty = false
  }

  renderControls() {
    this._controlsDirty = true
    this.render()
  }

  createExerciseSlot(placeholder, result) {
    const slot = document.createElement('span')
    slot.slot = placeholder.slotName
    slot.className = this.getSlotClasses(placeholder, result).join(' ')
    slot.dataset.exerciseId = placeholder.id

    const correction = document.createElement('span')
    correction.className = 'exercise-correction'
    correction.textContent = this.getCorrectAnswerLabel(placeholder, result)

    const resultIcon = document.createElement('span')
    resultIcon.className = 'exercise-result'
    if (this._answersShown.get(placeholder.id)) {
      resultIcon.textContent = this.isPlaceholderCorrect(placeholder, result) ? '✅' : '❌'
    }

    const work = document.createElement('span')
    work.className = 'exercise-slot__work'
    this.appendProblemControl(work, placeholder, result)

    const toggle = document.createElement('button')
    toggle.className = 'exercise-answer-toggle'
    toggle.type = 'button'
    toggle.textContent = this._answersShown.get(placeholder.id) ? '🙈' : '👁️'
    toggle.setAttribute('aria-label', this._answersShown.get(placeholder.id) ? 'Hide answer' : 'Show answer')
    toggle.addEventListener('click', () => this.toggleAnswer(placeholder.id))

    slot.appendChild(correction)
    slot.appendChild(resultIcon)
    slot.appendChild(work)
    slot.appendChild(toggle)
    return slot
  }

  appendProblemControl(parent, placeholder, result) {
    if (placeholder.type === 'input') {
      this.appendInputControl(parent, placeholder)
      return
    }

    if (placeholder.type === 'choice') {
      this.appendChoiceControl(parent, placeholder)
      return
    }

    if (placeholder.type === 'match') {
      this.appendMatchControl(parent, placeholder, result)
    }
  }

  appendInputControl(parent, placeholder) {
    const input = document.createElement('input')
    const width = Math.max(4, Math.ceil(getDisplayLength(placeholder.key) * 1.25))
    input.autocomplete = 'off'
    input.className = 'exercise-input'
    input.inputMode = 'text'
    input.spellcheck = false
    input.type = 'text'
    input.value = this._inputResponses.get(placeholder.id) || ''
    input.setAttribute('aria-label', 'Answer')
    input.style.setProperty('--exercise-input-width', `${width}ch`)
    input.addEventListener('input', () => {
      if (input.value === '') {
        this._inputResponses.delete(placeholder.id)
      } else {
        this._inputResponses.set(placeholder.id, input.value)
      }
      this.updatePlaceholderFeedback(placeholder.id)
      this.emitUserChange()
    })
    input.addEventListener('change', () => this.emitUserChange())
    parent.appendChild(input)
  }

  appendChoiceControl(parent, placeholder) {
    const choice = document.createElement('span')
    choice.className = 'exercise-choice'

    const blank = document.createElement('span')
    const selected = this._choiceResponses.get(placeholder.id) || ''
    const options = placeholder.options.length > 0 ? placeholder.options : [placeholder.key]
    const width = Math.max(4, getLongestDisplayLength(options, placeholder.key) + 1)

    blank.className = 'exercise-choice__blank'
    blank.style.setProperty('--exercise-choice-width', `${width}ch`)

    const blankText = document.createElement('span')
    blankText.className = 'exercise-choice__blank-text'
    blankText.textContent = selected
    blank.appendChild(blankText)

    const optionNumber = document.createElement('sup')
    optionNumber.className = 'exercise-choice__option-number'
    optionNumber.textContent = getProblemNumber(placeholder)

    const optionsWrap = document.createElement('span')
    optionsWrap.className = 'exercise-choice__options'
    optionsWrap.appendChild(document.createTextNode('('))

    const list = document.createElement('span')
    list.className = 'exercise-choice-list'

    for (let i = 0; i < options.length; i++) {
      if (i > 0) {
        const separator = document.createElement('span')
        separator.className = 'exercise-choice-separator'
        separator.textContent = ' / '
        list.appendChild(separator)
      }

      const button = document.createElement('button')
      button.className = 'exercise-choice-button'
      button.type = 'button'
      button.textContent = options[i]
      button.setAttribute('aria-pressed', selected === options[i] ? 'true' : 'false')
      button.addEventListener('click', () => this.selectChoice(placeholder.id, options[i]))
      list.appendChild(button)
    }

    optionsWrap.appendChild(list)
    optionsWrap.appendChild(document.createTextNode(')'))

    choice.appendChild(blank)
    choice.appendChild(optionNumber)
    choice.appendChild(document.createTextNode(' '))
    choice.appendChild(optionsWrap)
    parent.appendChild(choice)
  }

  appendMatchControl(parent, placeholder, result) {
    const button = document.createElement('button')
    const response = this.getMatchResponseText(placeholder, result)
    const hasContent = placeholder.content.trim() !== ''
    const shouldShowSpace = this.shouldShowMatchSpace(placeholder, result)
    const width = result.matchWidths.get(placeholder.task) || 8

    button.className = this.getMatchButtonClasses(placeholder, result).join(' ')
    button.type = 'button'
    button.setAttribute('aria-pressed', this._selectedMatchId === placeholder.id ? 'true' : 'false')
    button.addEventListener('click', () => this.selectMatch(placeholder, result))

    if (hasContent) {
      const token = document.createElement('span')
      token.className = 'exercise-match-token'
      token.textContent = placeholder.content
      button.appendChild(token)
    }

    if (shouldShowSpace) {
      if (hasContent) {
        button.appendChild(document.createTextNode(' '))
      }

      const space = document.createElement('span')
      const spaceText = document.createElement('span')
      space.className = 'exercise-match-space'
      spaceText.className = 'exercise-match-space-text'
      spaceText.textContent = response
      space.style.setProperty('--exercise-match-width', `${width}ch`)
      space.appendChild(spaceText)
      button.appendChild(space)

      if (!hasContent) {
        const number = document.createElement('sup')
        number.className = 'exercise-match-number'
        number.textContent = getProblemNumber(placeholder)
        button.appendChild(number)
      }
    }

    parent.appendChild(button)
  }

  getSlotClasses(placeholder, result) {
    const classes = [
      'exercise-slot',
      `exercise-slot--${placeholder.type}`,
    ]

    if (placeholder.type === 'match') {
      if (placeholder.content.trim()) {
        classes.push('exercise-slot--match-bank')
      } else {
        classes.push('exercise-slot--match-gap')
      }
    }

    if (this._answersShown.get(placeholder.id)) {
      classes.push('exercise-slot--shown')
      classes.push(this.isPlaceholderCorrect(placeholder, result) ? 'exercise-slot--correct' : 'exercise-slot--wrong')
    }

    return classes
  }

  getMatchButtonClasses(placeholder, result) {
    const classes = ['exercise-match-button']
    const pairedId = this._matchResponses.get(placeholder.id)
    const pairedResponse = pairedId ? result.byId.get(pairedId) : null
    const pairedCorrect = this.getCorrectMatch(placeholder, result)

    if (placeholder.content.trim() && pairedCorrect && !pairedCorrect.content.trim()) {
      classes.push('exercise-match-button--bank')
    }

    if (placeholder.content.trim() && pairedResponse && !pairedResponse.content.trim()) {
      classes.push('exercise-match-button--used-empty')
    }
    return classes
  }

  selectChoice(id, option) {
    const selected = this._choiceResponses.get(id) || ''
    if (selected === option) {
      this._choiceResponses.delete(id)
    } else {
      this._choiceResponses.set(id, option)
    }

    this.renderControls()
    this.emitUserChange()
  }

  selectMatch(placeholder) {
    if (this._selectedMatchId === placeholder.id) {
      this._selectedMatchId = ''
      this.renderControls()
      this.emitUserChange()
      return
    }

    if (!this._selectedMatchId) {
      this._selectedMatchId = placeholder.id
      this.renderControls()
      this.emitUserChange()
      return
    }

    const selected = this.getPlaceholderById(this._selectedMatchId)
    if (!selected || selected.task !== placeholder.task || selected.side === placeholder.side) {
      this._selectedMatchId = placeholder.id
      this.renderControls()
      this.emitUserChange()
      return
    }

    this.removeMatch(selected.id)
    this.removeMatch(placeholder.id)
    this._matchResponses.set(selected.id, placeholder.id)
    this._matchResponses.set(placeholder.id, selected.id)
    this._selectedMatchId = ''
    this.renderControls()
    this.emitUserChange()
  }

  removeMatch(id) {
    const pairedId = this._matchResponses.get(id)
    if (pairedId) {
      this._matchResponses.delete(pairedId)
    }
    this._matchResponses.delete(id)
  }

  toggleAnswer(id) {
    const result = this.getExerciseResult()
    const placeholder = result.byId.get(id)
    const nextShown = !this._answersShown.get(id)
    this._answersShown.set(id, nextShown)

    if (placeholder && placeholder.type === 'match') {
      const paired = this.getCorrectMatch(placeholder, result)
      if (paired) {
        this._answersShown.set(paired.id, nextShown)
      }
    }

    this.renderControls()
  }

  toggleAllAnswers(placeholders) {
    if (!this.areAllAnswersShown(placeholders)) {
      this.validate()
      return
    }

    for (let i = 0; i < placeholders.length; i++) {
      this._answersShown.set(placeholders[i].id, false)
    }
    this.renderControls()
  }

  areAllAnswersShown(placeholders) {
    if (placeholders.length === 0) {
      return false
    }

    for (let i = 0; i < placeholders.length; i++) {
      if (!this._answersShown.get(placeholders[i].id)) {
        return false
      }
    }

    return true
  }

  updatePlaceholderFeedback(id) {
    if (!this._answersShown.get(id)) {
      return
    }

    const result = this.getExerciseResult()
    const placeholder = result.byId.get(id)
    const slot = this.getRenderedSlot(id)
    if (!placeholder || !slot) {
      return
    }

    const correct = this.isPlaceholderCorrect(placeholder, result)
    slot.classList.toggle('exercise-slot--correct', correct)
    slot.classList.toggle('exercise-slot--wrong', !correct)

    const resultIcon = slot.querySelector('.exercise-result')
    if (resultIcon) {
      resultIcon.textContent = correct ? '✅' : '❌'
    }
  }

  getRenderedSlot(id) {
    return this._renderedSlots.get(id) || null
  }

  isPlaceholderCorrect(placeholder, result) {
    if (placeholder.type === 'input') {
      return normalizeAnswer(this._inputResponses.get(placeholder.id) || '') === normalizeAnswer(placeholder.key)
    }

    if (placeholder.type === 'choice') {
      return normalizeAnswer(this._choiceResponses.get(placeholder.id) || '') === normalizeAnswer(placeholder.key)
    }

    if (placeholder.type === 'match') {
      const pairedId = this._matchResponses.get(placeholder.id)
      const paired = result.byId.get(pairedId)
      return Boolean(paired && paired.task === placeholder.task && paired.problem === placeholder.problem)
    }

    return false
  }

  getCorrectAnswerLabel(placeholder, result) {
    if (placeholder.type === 'input' || placeholder.type === 'choice') {
      return placeholder.key || 'No answer key'
    }

    const paired = this.getCorrectMatch(placeholder, result)
    if (paired && paired.content.trim()) {
      return paired.content
    }

    return ''
  }

  getCorrectMatch(placeholder, result) {
    const taskPlaceholders = result.matchTasks.get(placeholder.task) || []
    for (let i = 0; i < taskPlaceholders.length; i++) {
      const item = taskPlaceholders[i]
      if (item.id !== placeholder.id && item.problem === placeholder.problem) {
        return item
      }
    }

    return null
  }

  shouldShowMatchSpace(placeholder, result) {
    if (placeholder.content.trim() === '') {
      return true
    }

    const paired = this.getCorrectMatch(placeholder, result)
    return Boolean(paired && paired.content.trim())
  }

  getMatchResponseText(placeholder, result = this.getExerciseResult()) {
    const pairedId = this._matchResponses.get(placeholder.id)
    if (!pairedId) {
      return ''
    }

    const paired = result.byId.get(pairedId)
    return paired ? paired.content : ''
  }

  getPlaceholderById(id) {
    return this.getExerciseResult().byId.get(id) || null
  }

  getExerciseResult() {
    const source = this.value
    if (source !== this._exerciseSource || !this._exerciseResult) {
      this._exerciseSource = source
      this._exerciseResult = buildExerciseMarkdown(source, this._slotPrefix)
    }
    return this._exerciseResult
  }

  cleanState(placeholders) {
    const ids = new Set()
    const matchIds = new Set()
    for (let i = 0; i < placeholders.length; i++) {
      ids.add(placeholders[i].id)
      if (placeholders[i].type === 'match') {
        matchIds.add(placeholders[i].id)
      }
    }

    cleanMap(this._answersShown, ids)
    cleanMap(this._inputResponses, ids)
    cleanMap(this._choiceResponses, ids)
    cleanMap(this._matchResponses, matchIds, matchIds)

    if (this._selectedMatchId && !matchIds.has(this._selectedMatchId)) {
      this._selectedMatchId = ''
    }
  }

  emitUserChange() {
    emit(this, 'change')
  }

  getResponseValue(placeholder, result) {
    if (placeholder.type === 'input') {
      return this._inputResponses.has(placeholder.id) ? this._inputResponses.get(placeholder.id) : null
    }

    if (placeholder.type === 'choice') {
      return this._choiceResponses.has(placeholder.id) ? this._choiceResponses.get(placeholder.id) : null
    }

    if (placeholder.type === 'match') {
      const pairedId = this._matchResponses.get(placeholder.id)
      const paired = result.byId.get(pairedId)
      return paired ? paired.responseId : null
    }

    return null
  }
}

function getPlaceholderStructure(placeholders) {
  let structure = ''
  for (let i = 0; i < placeholders.length; i++) {
    const placeholder = placeholders[i]
    structure += `${placeholder.id}\u0000${placeholder.type}\u0000${placeholder.content}\u0000${placeholder.task}\u0000${placeholder.problem}\u0000${placeholder.side}\u0000${placeholder.key}\u0000${JSON.stringify(placeholder.options)}\u0001`
  }
  return structure
}

function buildExerciseMarkdown(markdown, slotPrefix) {
  const placeholders = []
  const byId = new Map()
  const matchTasks = new Map()
  const matchWidths = new Map()
  const transformedMarkdown = String(markdown || '').replace(/\[([^\]\n]*)\]\{([^}\n]+)\}/g, (match, content, sourceAttributes) => {
    const attributes = parseExerciseAttributes(sourceAttributes)
    const type = String(attributes.slot || '').trim()
    if (!isExerciseType(type)) {
      return match
    }

    const index = placeholders.length
    const placeholder = {
      id: `${slotPrefix}-${index}`,
      slotName: `${slotPrefix}-slot-${index}`,
      type,
      content: unescapeMarkdownText(content),
      task: normalizeId(attributes.task || '1'),
      problem: normalizeId(attributes.problem || String(index + 1)),
      side: normalizeId(attributes.side || type),
      key: String(attributes.key || ''),
      options: parseOptions(attributes.options),
    }
    placeholder.responseId = createResponseId(placeholder)

    placeholders.push(placeholder)
    byId.set(placeholder.id, placeholder)

    attributes.slot = placeholder.slotName
    const canonicalAttributes = stringifyPandocAttributes(attributes)
    return `[${content}]{${canonicalAttributes}}`
  })

  for (let i = 0; i < placeholders.length; i++) {
    const placeholder = placeholders[i]
    if (placeholder.type !== 'match') {
      continue
    }

    if (!matchTasks.has(placeholder.task)) {
      matchTasks.set(placeholder.task, [])
    }
    matchTasks.get(placeholder.task).push(placeholder)
  }

  for (let i = 0; i < placeholders.length; i++) {
    const placeholder = placeholders[i]
    if (placeholder.type !== 'match') {
      continue
    }

    const currentWidth = matchWidths.get(placeholder.task) || 8
    const nextWidth = Math.max(currentWidth, getDisplayLength(placeholder.content) + 3)
    matchWidths.set(placeholder.task, nextWidth)
  }

  return {
    markdown: transformedMarkdown,
    placeholders,
    byId,
    matchTasks,
    matchWidths,
  }
}

function isExerciseType(type) {
  return type === 'input' || type === 'choice' || type === 'match'
}

function parseExerciseAttributes(value) {
  const attributes = {}
  const tokens = splitAttributeTokens(value)
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const separator = token.indexOf('=')
    if (separator === -1) {
      continue
    }

    const name = token.slice(0, separator).trim()
    const attributeValue = token.slice(separator + 1).trim()
    if (!name) {
      continue
    }

    attributes[name] = unquoteAttributeValue(attributeValue)
  }
  return attributes
}

function splitAttributeTokens(value) {
  const tokens = []
  let token = ''
  let quote = ''
  const source = String(value || '').trim()

  for (let i = 0; i < source.length; i++) {
    const character = source[i]
    if (quote) {
      token += character
      if (character === quote) {
        quote = ''
      }
      continue
    }

    if (character === '"' || character === "'") {
      quote = character
      token += character
      continue
    }

    if (/\s/.test(character) || character === ',') {
      if (token.trim()) {
        tokens.push(token.trim())
        token = ''
      }
      continue
    }

    token += character
  }

  if (token.trim()) {
    tokens.push(token.trim())
  }

  return tokens
}

function stringifyPandocAttributes(attributes) {
  const parts = []
  const names = Object.keys(attributes)
  for (let i = 0; i < names.length; i++) {
    const name = names[i]
    const value = attributes[name]
    if (value === null || value === undefined || value === '') {
      continue
    }

    parts.push(`${name}=${quotePandocAttribute(value)}`)
  }
  return parts.join(' ')
}

function quotePandocAttribute(value) {
  const text = String(value)
  if (/^[A-Za-z0-9_.:-]+$/.test(text)) {
    return text
  }

  if (!text.includes("'")) {
    return `'${text}'`
  }

  if (!text.includes('"')) {
    return `"${text}"`
  }

  return `'${text.replace(/'/g, '’')}'`
}

function parseOptions(value) {
  const text = String(value || '').trim()
  if (!text) {
    return []
  }

  try {
    const parsed = JSON.parse(text)
    if (Array.isArray(parsed)) {
      const options = []
      for (let i = 0; i < parsed.length; i++) {
        options.push(String(parsed[i]))
      }
      return options
    }
  } catch (error) {
    // Fall through to simple separators.
  }

  const separator = text.includes('|') ? '|' : ','
  const options = text.split(separator)
  const result = []
  for (let i = 0; i < options.length; i++) {
    const option = options[i].trim()
    if (option) {
      result.push(option)
    }
  }
  return result
}

function normalizeAnswer(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

function normalizeId(value) {
  return String(value || '').trim()
}

function unescapeMarkdownText(value) {
  return String(value || '')
    .replace(/\\([\\`*{}\[\]()#+\-.!_|>~^$:])/g, '$1')
    .trim()
}

function unquoteAttributeValue(value) {
  const text = String(value || '').trim()
  if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
    return text.slice(1, -1)
  }

  return text
}

function getDisplayLength(value) {
  return Math.max(0, String(value || '').trim().length)
}

function getLongestDisplayLength(values, fallback = '') {
  let longest = getDisplayLength(fallback)
  for (let i = 0; i < values.length; i++) {
    longest = Math.max(longest, getDisplayLength(values[i]))
  }
  return longest
}

function getProblemNumber(placeholder) {
  const number = String(placeholder.problem || '').trim()
  return number || '1'
}

function cleanMap(map, allowedKeys, allowedValues = null) {
  const keys = Array.from(map.keys())
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (!allowedKeys.has(key)) {
      map.delete(key)
      continue
    }

    if (allowedValues && !allowedValues.has(map.get(key))) {
      map.delete(key)
    }
  }
}

function createResponseId(response) {
  return JSON.stringify([
    normalizeId(response.task),
    normalizeId(response.problem),
    normalizeId(response.type),
    normalizeId(response.side),
  ])
}

function emit(element, name) {
  element.dispatchEvent(new Event(name, {
    bubbles: true,
    composed: true,
  }))
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}

function normalizeVariant(value) {
  return value === 'plain' ? 'plain' : 'default'
}
