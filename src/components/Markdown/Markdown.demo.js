import { registerDemo } from '../demoCommon.js'

const completeMarkdown = [
  '# Markdown preview',
  '',
  'Compact markdown with **bold**, *italic*, ~~deleted text~~, `inline code`, [links](https://example.com), and autolinks such as https://example.com/docs.',
  '',
  '## Lists',
  '',
  '- First item',
  '  - Nested item',
  '  - Another nested item with **formatting**',
  '- [x] Completed task',
  '- [ ] Open task',
  '',
  '1. Ordered item',
  '2. Ordered item with a continuation paragraph.',
  '   The continuation stays inside the item.',
  '',
  '> A compact blockquote can contain **inline markdown** and multiple lines.',
  '',
  '## Table',
  '',
  '| Feature | Support | Notes |',
  '| :-- | :-: | --: |',
  '| Headers | Yes | 6 levels |',
  '| Lists | Yes | Nested |',
  '| Tables | Yes | Aligned |',
  '',
  '## Code block',
  '',
  '```js',
  'const message = \'streaming markdown\'',
  'for (let i = 0; i < 3; i++) {',
  '  console.log(message, i)',
  '}',
  '```',
  '',
  '## Image',
  '',
  '![Placeholder image](https://placehold.co/480x120?text=Markdown+image)',
  '',
  '---',
  '',
  'Streaming can stop in the middle of **bold text, a list, or a code fence:',
  '',
  '```txt',
  'Partial fenced code is still rendered as code while it streams.',
].join('\n')

const pandocMarkdown = [
  '---',
  'title: Pandoc feature sample',
  'author: Tot components',
  '---',
  '',
  '# Pandoc-flavored markdown {#pandoc-sample .sample-heading}',
  '',
  'Pandoc mode supports attributes, footnotes, definition lists, line blocks, raw inline HTML, math, and spans.',
  '',
  'Colored spans: [red text]{style="color: #dc2626;"}, [blue text]{color=#2563eb}, and [highlighted text]{style="background-color: #fef3c7; color: #92400e; padding: 0 .25rem; border-radius: .25rem;"}.',
  '',
  'Small caps: [compact components]{.smallcaps}. Superscript E = mc^2^ and subscript H~2~O.',
  '',
  'A citation marker is preserved as [@doe2025], and inline math renders as $a^2 + b^2 = c^2$.',
  '',
  '$$',
  '\\int_0^1 x^2 dx = \\frac{1}{3}',
  '$$',
  '',
  'Term one',
  ': A definition with **markdown** inside it.',
  '',
  'Term two',
  ': Another definition that includes a [colored phrase]{style="color: #16a34a; font-weight: 700;"}.',
  '',
  '| Line blocks keep manual line breaks',
  '|   and indentation-like spacing',
  '| while still parsing **inline formatting**.',
  '',
  '::: {.note style="border-color: #93c5fd; background-color: #eff6ff;"}',
  'A fenced div can contain nested markdown, lists, and tables.',
  '',
  '- Nested item',
  '- Another nested item',
  ':::',
  '',
  '``` {.js .numberLines}',
  'const colored = \'pandoc span attributes\'',
  'console.log(colored)',
  '```',
  '',
  '<span style="color: #7c3aed; font-weight: 700;">Raw inline HTML is sanitized and preserved.</span>',
  '',
  'Footnote reference[^color-note] with its definition below.',
  '',
  '[^color-note]: Footnotes render at the end and can include [colored content]{style="color: #db2777;"}.',
].join('\n')


const staticSlotMarkdown = [
  'Sam likes [_]{slot="fill-the-blank" key="coffee"}.',
].join('\n')

const interactiveSlotMarkdown = [
  '# Interactive slots',
  '',
  'Translate **dzień dobry**: [answer]{slot="answer" key="good morning"}.',
  '',
  'Pick the response tone: [tone]{slot="tone" key="friendly"}.',
  '',
  'Set your confidence: [0%]{slot="confidence" key="80"}.',
  '',
  '> Slotted controls stay connected while the surrounding markdown streams.',
].join('\n')

registerDemo({
  id: 'tot-markdown',
  title: 'Markdown',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <style>
        .markdown-slot-demo {
          align-items: center;
          display: inline-flex;
          gap: var(--tot-spacing-2x-small, .25rem);
          vertical-align: baseline;
        }

        .markdown-slot-input {
          background: var(--tot-input-background-color, #fff);
          border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
          border-radius: var(--tot-input-border-radius-medium, 4px);
          color: var(--tot-input-color, #1e293b);
          font: inherit;
          height: 1.65rem;
          padding: 0 var(--tot-input-spacing-small, .5rem);
          width: 8.5rem;
        }

        .markdown-slot-range {
          width: 6.5rem;
        }

        .markdown-slot-button {
          background: var(--tot-input-background-color, #fff);
          border: var(--tot-input-border-width, 1px) solid var(--tot-input-border-color, #cbd5e1);
          border-radius: var(--tot-input-border-radius-medium, 4px);
          color: var(--tot-input-color, #1e293b);
          cursor: pointer;
          font: inherit;
          height: 1.65rem;
          padding: 0 var(--tot-spacing-x-small, .5rem);
        }

        .markdown-slot-button:hover,
        .markdown-slot-button[aria-pressed="true"] {
          background: var(--tot-color-primary-50, #f0f9ff);
          border-color: var(--tot-color-primary-500, #0ea5e9);
          color: var(--tot-color-primary-700, #0369a1);
        }

        .markdown-slot-button:focus-visible,
        .markdown-slot-input:focus-visible,
        .markdown-slot-range:focus-visible {
          outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
          outline-offset: var(--tot-focus-ring-offset, 1px);
        }

        .markdown-slot-status {
          color: var(--tot-color-neutral-600, #475569);
          font-size: var(--tot-font-size-x-small, .75rem);
          min-width: 3rem;
        }
      </style>
      <div class="stack demo-group">
        <div class="demo-label">Markdown preview with fullscreen and streaming</div>
        <div class="row">
          <tot-button id="streamMarkdown" label="Stream markdown"></tot-button>
          <tot-button id="showMarkdown" label="Show complete"></tot-button>
        </div>
        <tot-markdown id="markdownPreview" label="Markdown preview" help-text="Streamed content shows a typing caret while partial markdown is rendered."></tot-markdown>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Pandoc markdown features</div>
        <div class="row">
          <tot-button id="streamPandocMarkdown" label="Stream pandoc"></tot-button>
          <tot-button id="showPandocMarkdown" label="Show complete"></tot-button>
        </div>
        <tot-markdown id="pandocPreview" pandoc label="Pandoc markdown" help-text="Pandoc mode adds attributes, colored spans, math, line blocks, definitions, fenced divs, footnotes, and raw HTML sanitization."></tot-markdown>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Pandoc slot placeholder</div>
        <tot-markdown id="staticSlotPreview" pandoc label="Exercise 1" help-text="The placeholder renders as a normal span until matching light-DOM slot content is provided.">
          <span slot="fill-the-blank" class="markdown-slot-demo">
            <input class="markdown-slot-input" aria-label="Fill the blank" placeholder="answer">
            <button class="markdown-slot-button" type="button" data-action="show-static-key">show key</button>
            <span class="markdown-slot-status" data-slot-status></span>
          </span>
        </tot-markdown>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Interactive pandoc slots with streaming</div>
        <div class="row">
          <tot-button id="streamSlotsMarkdown" label="Stream slots"></tot-button>
          <tot-button id="showSlotsMarkdown" label="Show complete"></tot-button>
        </div>
        <tot-markdown id="interactiveSlotsPreview" pandoc label="Streaming exercise" help-text="Multiple named slots can provide different interactive controls while markdown streams.">
          <span slot="answer" class="markdown-slot-demo">
            <input class="markdown-slot-input" aria-label="Translation answer" placeholder="translation">
            <button class="markdown-slot-button" type="button" data-action="check-answer">check</button>
            <span class="markdown-slot-status" data-slot-status></span>
          </span>
          <span slot="tone" class="markdown-slot-demo">
            <button class="markdown-slot-button" type="button" data-tone="friendly" aria-pressed="false">friendly</button>
            <button class="markdown-slot-button" type="button" data-tone="formal" aria-pressed="false">formal</button>
            <span class="markdown-slot-status" data-slot-status></span>
          </span>
          <span slot="confidence" class="markdown-slot-demo">
            <input class="markdown-slot-range" type="range" min="0" max="100" value="40" aria-label="Confidence">
            <span class="markdown-slot-status" data-slot-status>40%</span>
          </span>
        </tot-markdown>
      </div>
    `

    const markdown = wrapper.querySelector('#markdownPreview')
    const streamButton = wrapper.querySelector('#streamMarkdown')
    const showButton = wrapper.querySelector('#showMarkdown')
    const pandoc = wrapper.querySelector('#pandocPreview')
    const pandocStreamButton = wrapper.querySelector('#streamPandocMarkdown')
    const pandocShowButton = wrapper.querySelector('#showPandocMarkdown')
    const staticSlot = wrapper.querySelector('#staticSlotPreview')
    const interactiveSlots = wrapper.querySelector('#interactiveSlotsPreview')
    const slotsStreamButton = wrapper.querySelector('#streamSlotsMarkdown')
    const slotsShowButton = wrapper.querySelector('#showSlotsMarkdown')

    setupStreaming(markdown, streamButton, showButton, completeMarkdown, 'Stream markdown')
    setupStreaming(pandoc, pandocStreamButton, pandocShowButton, pandocMarkdown, 'Stream pandoc')
    setupStreaming(interactiveSlots, slotsStreamButton, slotsShowButton, interactiveSlotMarkdown, 'Stream slots')
    staticSlot.value = staticSlotMarkdown
    setupStaticSlotDemo(wrapper)
    setupInteractiveSlotDemo(wrapper)

    markdown.addEventListener('fullscreen-change', () => {
      logEvent(markdown, 'fullscreen-change', { fullscreen: markdown.fullscreen })
    })

    pandoc.addEventListener('fullscreen-change', () => {
      logEvent(pandoc, 'fullscreen-change', { fullscreen: pandoc.fullscreen })
    })

    staticSlot.addEventListener('fullscreen-change', () => {
      logEvent(staticSlot, 'fullscreen-change', { fullscreen: staticSlot.fullscreen })
    })

    interactiveSlots.addEventListener('fullscreen-change', () => {
      logEvent(interactiveSlots, 'fullscreen-change', { fullscreen: interactiveSlots.fullscreen })
    })

    container.appendChild(wrapper)
  },
})

function setupStreaming(markdown, streamButton, showButton, source, idleLabel) {
  let streamTimer = 0
  let streamIndex = source.length
  markdown.value = source

  streamButton.addEventListener('click', () => {
    if (!markdown.streaming) {
      startStreaming()
      return
    }

    if (streamTimer) {
      pauseStreaming()
      return
    }

    continueStreaming()
  })

  showButton.addEventListener('click', () => {
    stopStreaming()
    markdown.value = source
    streamIndex = source.length
  })

  function startStreaming() {
    streamIndex = 0
    markdown.value = ''
    markdown.streaming = true
    continueStreaming()
  }

  function continueStreaming() {
    streamButton.setAttribute('label', 'Pause streaming')
    streamTimer = window.setInterval(() => {
      streamIndex = Math.min(source.length, streamIndex + 8)
      markdown.value = source.slice(0, streamIndex)

      if (streamIndex >= source.length) {
        stopStreaming()
      }
    }, 35)
  }

  function pauseStreaming() {
    if (!streamTimer) {
      return
    }

    window.clearInterval(streamTimer)
    streamTimer = 0
    streamButton.setAttribute('label', 'Continue streaming')
  }

  function stopStreaming() {
    if (streamTimer) {
      window.clearInterval(streamTimer)
    }

    streamTimer = 0
    streamButton.setAttribute('label', idleLabel || (markdown.pandoc ? 'Stream pandoc' : 'Stream markdown'))
    markdown.streaming = false
  }
}

function setupStaticSlotDemo(wrapper) {
  const slotContent = wrapper.querySelector('[slot="fill-the-blank"]')
  const button = slotContent.querySelector('[data-action="show-static-key"]')
  const status = slotContent.querySelector('[data-slot-status]')

  button.addEventListener('click', () => {
    status.textContent = `key: ${getSlotKey(slotContent)}`
  })
}

function setupInteractiveSlotDemo(wrapper) {
  const answerSlot = wrapper.querySelector('[slot="answer"]')
  const answerInput = answerSlot.querySelector('input')
  const checkButton = answerSlot.querySelector('[data-action="check-answer"]')
  const answerStatus = answerSlot.querySelector('[data-slot-status]')
  const toneSlot = wrapper.querySelector('[slot="tone"]')
  const toneButtons = toneSlot.querySelectorAll('[data-tone]')
  const toneStatus = toneSlot.querySelector('[data-slot-status]')
  const confidenceSlot = wrapper.querySelector('[slot="confidence"]')
  const confidenceRange = confidenceSlot.querySelector('input')
  const confidenceStatus = confidenceSlot.querySelector('[data-slot-status]')

  checkButton.addEventListener('click', () => {
    const isCorrect = normalizeAnswer(answerInput.value) === normalizeAnswer(getSlotKey(answerSlot))
    answerStatus.textContent = isCorrect ? 'correct' : 'try again'
  })

  for (let i = 0; i < toneButtons.length; i++) {
    toneButtons[i].addEventListener('click', () => {
      for (let j = 0; j < toneButtons.length; j++) {
        toneButtons[j].setAttribute('aria-pressed', String(toneButtons[j] === toneButtons[i]))
      }
      toneStatus.textContent = toneButtons[i].dataset.tone === getSlotKey(toneSlot) ? 'key' : 'custom'
    })
  }

  confidenceRange.addEventListener('input', () => {
    confidenceStatus.textContent = `${confidenceRange.value}%`
  })
}

function getSlotKey(element) {
  return element.assignedSlot?.dataset.markdownKey || ''
}

function normalizeAnswer(value) {
  return String(value || '').trim().toLocaleLowerCase()
}
