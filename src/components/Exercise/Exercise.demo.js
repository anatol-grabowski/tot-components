import { registerDemo } from '../demoCommon.js'

const mixedExercise = [
  '# Grammar warm-up',
  '',
  'Fill each gap with the most natural verb form:',
  '',
  '- Before the bakery opens, Nora []{task=1 problem=1 slot=input key="kneads"} the dough in a quiet kitchen.',
  '- Last winter, the same bakery []{task=1 problem=2 slot=input key="sold"} cinnamon rolls before sunrise.',
  '',
  'Choose the option that best completes the sentence:',
  '',
  '- The city clock []{task=2 problem=1 slot=choice key="strikes" options=\'["strikes", "strike", "striking"]\'} twelve when the market gets busy.',
  '- If Leo had checked the timetable, he []{task=2 problem=2 slot=choice key="would have caught" options=\'["will catch", "would have caught", "catches"]\'} the early train.',
  '',
  'Match the words to the empty places:',
  '',
  '[lantern]{task=3 problem=1 slot=match side=word} [compass]{task=3 problem=2 slot=match side=word} [blanket]{task=3 problem=3 slot=match side=word}',
  '',
  '- During the hike, Maya used a []{task=3 problem=2 slot=match side=gap} to find the ridge path.',
  '- At dusk, she lit a []{task=3 problem=1 slot=match side=gap} outside the tent.',
  '- When the wind grew cold, she wrapped herself in a []{task=3 problem=3 slot=match side=gap}.',
  '',
  'Match words to definitions:',
  '',
  '| word | definition |',
  '| ---- | ---------- |',
  '| [harbor]{task=4 problem=1 slot=match side=word} | [2.]{task=4 problem=2 slot=match side=definition} a brave action |',
  '| [gesture]{task=4 problem=2 slot=match side=word} | [1.]{task=4 problem=1 slot=match side=definition} a sheltered place for ships |',
].join('\n')

const streamingExercise = [
  '# Story exercise',
  '',
  'Complete the short travel story as it appears:',
  '',
  '- Every morning, the guide []{task=1 problem=1 slot=input key="checks"} the weather before the group leaves.',
  '- Yesterday, the clouds []{task=1 problem=2 slot=choice key="cleared" options=\'["clear", "cleared", "clearing"]\'} just after lunch.',
  '',
  'Match each object to the sentence where it belongs:',
  '',
  '[map]{task=2 problem=1 slot=match side=object} [thermos]{task=2 problem=2 slot=match side=object} [notebook]{task=2 problem=3 slot=match side=object}',
  '',
  '- Elena poured tea from her []{task=2 problem=2 slot=match side=sentence}.',
  '- Jonas marked the route on the []{task=2 problem=1 slot=match side=sentence}.',
  '- Priya wrote new phrases in her []{task=2 problem=3 slot=match side=sentence}.',
].join('\n')

registerDemo({
  id: 'tot-exercise',
  title: 'Exercise',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Pandoc placeholders rendered as exercise controls</div>
        <tot-exercise id="mixedExercise" label="Mixed grammar exercise" help-text="Use the eye buttons to show or hide each correct answer."></tot-exercise>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Streaming exercise markdown</div>
        <div class="row">
          <tot-button id="streamExercise" size="small" label="Stream exercise"></tot-button>
          <tot-button id="showExercise" size="small" label="Show complete"></tot-button>
        </div>
        <tot-exercise id="streamingExercise" label="Streaming travel exercise" help-text="Controls appear when their complete placeholders arrive."></tot-exercise>
      </div>
    `

    const mixed = wrapper.querySelector('#mixedExercise')
    const streaming = wrapper.querySelector('#streamingExercise')
    const streamButton = wrapper.querySelector('#streamExercise')
    const showButton = wrapper.querySelector('#showExercise')

    mixed.value = mixedExercise
    streaming.value = streamingExercise

    setupStreamingExercise(streaming, streamButton, showButton, streamingExercise)
    logExerciseEvents(mixed, logEvent)
    logExerciseEvents(streaming, logEvent)

    container.appendChild(wrapper)
  },
})

function logExerciseEvents(exercise, logEvent) {
  exercise.addEventListener('change', () => {
    logEvent(exercise, 'change', { responses: exercise.responses })
  })
  exercise.addEventListener('validate', () => {
    logEvent(exercise, 'validate', { responses: exercise.responses })
  })
  exercise.addEventListener('reset', () => {
    logEvent(exercise, 'reset', { responses: exercise.responses })
  })
}

function setupStreamingExercise(exercise, streamButton, showButton, markdown) {
  let timer = 0

  streamButton.addEventListener('click', () => {
    clearTimeout(timer)
    streamButton.setAttribute('label', 'Restart stream')
    exercise.reset()
    exercise.value = ''
    exercise.streaming = true
    streamStep(exercise, markdown, 0, () => timer, value => {
      timer = value
    })
  })

  showButton.addEventListener('click', () => {
    clearTimeout(timer)
    streamButton.setAttribute('label', 'Stream exercise')
    exercise.streaming = false
    exercise.value = markdown
  })
}

function streamStep(exercise, markdown, index, getTimer, setTimer) {
  if (!exercise.isConnected) {
    clearTimeout(getTimer())
    return
  }

  exercise.value = markdown.slice(0, index)
  if (index >= markdown.length) {
    exercise.streaming = false
    return
  }

  const step = markdown[index] === '\n' ? 1 : 4
  setTimer(setTimeout(() => {
    streamStep(exercise, markdown, Math.min(markdown.length, index + step), getTimer, setTimer)
  }, 28))
}
