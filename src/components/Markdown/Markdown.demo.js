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

registerDemo({
  id: 'tot-markdown',
  title: 'Markdown',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
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
    `

    const markdown = wrapper.querySelector('#markdownPreview')
    const streamButton = wrapper.querySelector('#streamMarkdown')
    const showButton = wrapper.querySelector('#showMarkdown')
    const pandoc = wrapper.querySelector('#pandocPreview')
    const pandocStreamButton = wrapper.querySelector('#streamPandocMarkdown')
    const pandocShowButton = wrapper.querySelector('#showPandocMarkdown')

    setupStreaming(markdown, streamButton, showButton, completeMarkdown)
    setupStreaming(pandoc, pandocStreamButton, pandocShowButton, pandocMarkdown)

    markdown.addEventListener('fullscreen-change', (event) => {
      logEvent(markdown, 'fullscreen-change', event.detail)
    })

    pandoc.addEventListener('fullscreen-change', (event) => {
      logEvent(pandoc, 'fullscreen-change', event.detail)
    })

    container.appendChild(wrapper)
  },
})

function setupStreaming(markdown, streamButton, showButton, source) {
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
    streamButton.setAttribute('label', markdown.pandoc ? 'Stream pandoc' : 'Stream markdown')
    markdown.streaming = false
  }
}
