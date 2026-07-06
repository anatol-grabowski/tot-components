import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-suggestions',
  title: 'Suggestions',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Flat suggestions</div>
        <tot-suggestions></tot-suggestions>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Grouped suggestions</div>
        <tot-suggestions></tot-suggestions>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Limited suggestions</div>
        <tot-suggestions limit="7"></tot-suggestions>
      </div>
      <div class="stack demo-group" style="max-width: 28rem;">
        <div class="demo-label">Line-limited suggestions</div>
        <tot-suggestions line-limit="2"></tot-suggestions>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Large suggestions</div>
        <tot-suggestions size="large" limit="4"></tot-suggestions>
      </div>
    `

    const examples = wrapper.querySelectorAll('tot-suggestions')
    examples[0].suggestions = ['Grammar', 'Vocabulary', 'Listening', 'Speaking', 'Review']
    examples[1].suggestions = [
      ['Name', 'Topic', 'Level', 'Status'],
      ['Grammar', 'Vocabulary', 'Listening'],
      ['B1', 'B2', 'Review'],
    ]
    examples[2].suggestions = [
      'pronunciation',
      'homework',
      'reading',
      'speaking',
      'writing',
      'exam prep',
      'irregular verbs',
      'phrases',
      'dialogue',
      'revision',
      'travel',
      'work',
    ]
    examples[3].suggestions = [
      ['short answer', 'multiple choice', 'matching', 'fill the gap'],
      ['food and cooking', 'travel vocabulary', 'past simple', 'present perfect'],
      ['easy', 'medium', 'challenging', 'homework review'],
    ]
    examples[4].suggestions = ['Large', 'Suggested value', 'Another tile', 'More options', 'Last item']

    for (let i = 0; i < examples.length; i++) {
      examples[i].addEventListener('select', (event) => {
        logEvent(examples[i], 'select', event.detail)
      })
    }

    container.appendChild(wrapper)
  },
})
