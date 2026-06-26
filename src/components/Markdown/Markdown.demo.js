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
    `

    const markdown = wrapper.querySelector('#markdownPreview')
    const streamButton = wrapper.querySelector('#streamMarkdown')
    const showButton = wrapper.querySelector('#showMarkdown')
    let streamTimer = 0
    let streamIndex = completeMarkdown.length
    markdown.value = completeMarkdown

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
      markdown.value = completeMarkdown
      streamIndex = completeMarkdown.length
    })

    markdown.addEventListener('fullscreen-change', (event) => {
      logEvent(markdown, 'fullscreen-change', event.detail)
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
        streamIndex = Math.min(completeMarkdown.length, streamIndex + 8)
        markdown.value = completeMarkdown.slice(0, streamIndex)

        if (streamIndex >= completeMarkdown.length) {
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
      streamButton.setAttribute('label', 'Stream markdown')
      markdown.streaming = false
    }

    container.appendChild(wrapper)
  },
})
