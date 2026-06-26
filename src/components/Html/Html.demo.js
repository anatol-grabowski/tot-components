import { registerDemo } from '../demoCommon.js'

const safeHtml = [
  '<article style="display: grid; gap: .5rem; color: #334155;">',
  '  <h1 style="font-size: 1.4rem; margin: 0; color: #0f172a;">Safe HTML preview</h1>',
  '  <p style="margin: 0;">Inline styles are preserved, while scripts, event handlers, and javascript URLs are removed.</p>',
  '  <p style="margin: 0; color: #2563eb;">This paragraph uses an inline style.</p>',
  '  <a href="https://example.com/docs" target="_self">This link starts with target=&quot;_self&quot;, but safe mode opens it in a new tab</a>',
  '  <a href="javascript:alert(1)" onclick="alert(1)">Unsafe link is neutralized</a>',
  '  <script>document.body.innerHTML = \'This should not run in safe mode\'</script>',
  '  <table style="border-collapse: collapse; width: 100%;">',
  '    <tr><th style="border: 1px solid #cbd5e1; padding: .25rem; text-align: left;">Feature</th><th style="border: 1px solid #cbd5e1; padding: .25rem; text-align: left;">Safe mode</th></tr>',
  '    <tr><td style="border: 1px solid #cbd5e1; padding: .25rem;">Inline style</td><td style="border: 1px solid #cbd5e1; padding: .25rem;">Preserved</td></tr>',
  '    <tr><td style="border: 1px solid #cbd5e1; padding: .25rem;">JavaScript</td><td style="border: 1px solid #cbd5e1; padding: .25rem;">Stripped / sandboxed</td></tr>',
  '  </table>',
  '</article>',
].join('\n')

const unsafeHtml = [
  '<!doctype html>',
  '<html>',
  '<head>',
  '  <style>',
  '    body { font-family: system-ui, sans-serif; color: #334155; min-width: 130vw; }',
  '    .box { border: 1px solid #cbd5e1; border-radius: 6px; padding: .5rem; }',
  '    .escape-attempt { position: fixed; inset: -40px; z-index: 2147483647; pointer-events: none; border: 10px dashed #ef4444; background: rgb(239 68 68 / 10%); }',
  '    button { border: 1px solid #94a3b8; border-radius: 4px; background: white; cursor: pointer; padding: .25rem .5rem; }',
  '  </style>',
  '</head>',
  '<body>',
  '  <div class="escape-attempt">This fixed overlay tries to overflow its own page, but remains clipped inside the component iframe.</div>',
  '  <main class="box">',
  '    <h1 style="font-size: 1.4rem; margin: 0 0 .5rem;">Unsafe HTML preview</h1>',
  '    <p>Scripts are allowed here, but the document still runs inside a sandboxed iframe.</p>',
  '    <button onclick="document.getElementById(\'unsafeOutput\').textContent = new Date().toLocaleTimeString()">Run inline JS</button>',
  '    <p id="unsafeOutput">Waiting for script.</p>',
  '    <p id="parentOutput">Trying to edit parent page...</p>',
  '  </main>',
  '  <script>',
  '    document.getElementById(\'unsafeOutput\').textContent = \'Script ran when the iframe loaded.\'',
  '    try {',
  '      parent.document.body.style.transform = \'rotate(2deg)\'',
  '      document.getElementById(\'parentOutput\').textContent = \'Parent page was changed.\'',
  '    } catch (error) {',
  '      document.getElementById(\'parentOutput\').textContent = \'Parent page access blocked by iframe isolation.\'',
  '    }',
  '  </script>',
  '</body>',
  '</html>',
].join('\n')

registerDemo({
  id: 'tot-html',
  title: 'HTML',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Safe HTML preview with fullscreen and streaming</div>
        <div class="row">
          <tot-button id="streamSafeHtml" label="Stream safe HTML"></tot-button>
          <tot-button id="showSafeHtml" label="Show complete"></tot-button>
        </div>
        <tot-html id="safeHtmlPreview" label="Safe HTML" help-text="Safe mode sanitizes JavaScript and forces links to open in a new tab."></tot-html>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Unsafe HTML preview with scripts in an isolated iframe</div>
        <div class="row">
          <tot-button id="streamUnsafeHtml" label="Stream unsafe HTML"></tot-button>
          <tot-button id="showUnsafeHtml" label="Show complete"></tot-button>
        </div>
        <tot-html id="unsafeHtmlPreview" label="Unsafe HTML" help-text="Unsafe mode allows scripts, but the iframe still clips layout and isolates it from the parent page." unsafe></tot-html>
      </div>
    `

    const safePreview = wrapper.querySelector('#safeHtmlPreview')
    const unsafePreview = wrapper.querySelector('#unsafeHtmlPreview')
    const streamSafeButton = wrapper.querySelector('#streamSafeHtml')
    const streamUnsafeButton = wrapper.querySelector('#streamUnsafeHtml')
    const showSafeButton = wrapper.querySelector('#showSafeHtml')
    const showUnsafeButton = wrapper.querySelector('#showUnsafeHtml')
    const safeStreamState = createStreamState(safeHtml.length)
    const unsafeStreamState = createStreamState(unsafeHtml.length)

    safePreview.value = safeHtml
    unsafePreview.value = unsafeHtml

    streamSafeButton.addEventListener('click', () => {
      toggleStreaming({
        button: streamSafeButton,
        label: 'Stream safe HTML',
        state: safeStreamState,
        text: safeHtml,
        viewer: safePreview,
      })
    })

    streamUnsafeButton.addEventListener('click', () => {
      toggleStreaming({
        button: streamUnsafeButton,
        label: 'Stream unsafe HTML',
        state: unsafeStreamState,
        text: unsafeHtml,
        viewer: unsafePreview,
      })
    })

    showSafeButton.addEventListener('click', () => {
      stopStreaming(streamSafeButton, safeStreamState, 'Stream safe HTML', safePreview)
      safePreview.value = safeHtml
      safeStreamState.index = safeHtml.length
    })

    showUnsafeButton.addEventListener('click', () => {
      stopStreaming(streamUnsafeButton, unsafeStreamState, 'Stream unsafe HTML', unsafePreview)
      unsafePreview.value = unsafeHtml
      unsafeStreamState.index = unsafeHtml.length
    })

    safePreview.addEventListener('fullscreen-change', (event) => {
      logEvent(safePreview, 'fullscreen-change', event.detail)
    })

    unsafePreview.addEventListener('fullscreen-change', (event) => {
      logEvent(unsafePreview, 'fullscreen-change', event.detail)
    })

    container.appendChild(wrapper)
  },
})

function createStreamState(length) {
  return {
    index: length,
    timer: 0,
  }
}

function toggleStreaming(options) {
  if (!options.viewer.streaming) {
    startStreaming(options)
    return
  }

  if (options.state.timer) {
    pauseStreaming(options.button, options.state)
    return
  }

  continueStreaming(options)
}

function startStreaming(options) {
  options.state.index = 0
  options.viewer.value = ''
  options.viewer.streaming = true
  continueStreaming(options)
}

function continueStreaming(options) {
  options.button.setAttribute('label', 'Pause streaming')
  options.state.timer = window.setInterval(() => {
    options.state.index = Math.min(options.text.length, options.state.index + 10)
    options.viewer.value = options.text.slice(0, options.state.index)

    if (options.state.index >= options.text.length) {
      stopStreaming(options.button, options.state, options.label, options.viewer)
    }
  }, 35)
}

function pauseStreaming(button, state) {
  if (!state.timer) {
    return
  }

  window.clearInterval(state.timer)
  state.timer = 0
  button.setAttribute('label', 'Continue streaming')
}

function stopStreaming(button, state, label, viewer) {
  if (state.timer) {
    window.clearInterval(state.timer)
  }

  state.timer = 0
  button.setAttribute('label', label)
  if (viewer) {
    viewer.streaming = false
  }
}
