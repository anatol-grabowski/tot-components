const commonStyle = `
  :root {
    color: #222222;
    background: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.35;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    min-height: 100%;
  }

  body {
    background: #ffffff;
  }

  body.embedded {
    overflow: hidden;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  .demo-page {
    display: grid;
    gap: 10px;
    margin: 0;
    padding: 8px;
    width: 100%;
  }

  body.embedded .demo-page {
    padding: 0;
  }

  h1,
  h2,
  p,
  pre {
    margin: 0;
  }

  h1 {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.15;
  }

  h2 {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
  }

  .intro,
  .demo-case {
    display: grid;
    gap: 6px;
  }

  .intro {
    gap: 3px;
  }

  .note,
  .intro p {
    color: #666666;
    font-size: 12px;
  }

  .demo-case {
    border-top: 1px solid #eeeeee;
    padding-top: 8px;
  }

  .demo-case:first-of-type {
    border-top: 0;
    padding-top: 0;
  }

  .demo-sample {
    min-width: 0;
  }

  .row {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .narrow {
    max-width: 380px;
    min-width: 0;
    width: 100%;
  }

  .demo-button {
    align-items: center;
    background: #ffffff;
    border: 1px solid #999999;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    min-height: 30px;
    padding: 4px 8px;
  }

  .demo-button:hover {
    background: #f2f2f2;
  }

  .demo-brand,
  .demo-label {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .demo-label {
    color: #666666;
    font-size: 12px;
  }

  .log {
    background: #fafafa;
    border: 1px solid #dddddd;
    border-radius: 4px;
    color: #555555;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
    font-size: 12px;
    line-height: 1.25;
    min-height: 28px;
    overflow: auto;
    padding: 6px;
    white-space: pre-wrap;
  }

  body.hide-notes h2,
  body.hide-notes .note,
  body.hide-notes .intro p,
  body.hide-notes .log {
    display: none;
  }

  body.hide-notes .demo-page {
    gap: 7px;
  }

  body.hide-notes .demo-case {
    border-top: 0;
    padding-top: 0;
  }
`

function ensureStyle() {
  if (document.getElementById('compactDemoCommonStyle')) {
    return
  }

  const style = document.createElement('style')
  style.id = 'compactDemoCommonStyle'
  style.textContent = commonStyle
  document.head.append(style)
}

function setHiddenNotes(hidden) {
  document.body.classList.toggle('hide-notes', Boolean(hidden))
  postHeight()
}

function setLog(pre, value) {
  if (typeof value === 'string') {
    pre.textContent = value
  } else {
    pre.textContent = JSON.stringify(value, null, 2)
  }

  postHeight()
}

function postHeight() {
  if (window.self === window.top) {
    return
  }

  requestAnimationFrame(() => {
    const height = Math.ceil(Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
    ))

    window.parent.postMessage({
      type: 'compact-component-demo-height',
      height,
    }, '*')
  })
}

function watchHeight() {
  const resizeObserver = new ResizeObserver(() => postHeight())
  resizeObserver.observe(document.documentElement)
  resizeObserver.observe(document.body)

  const mutationObserver = new MutationObserver(() => postHeight())
  mutationObserver.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  })

  window.addEventListener('load', postHeight)
  window.addEventListener('resize', postHeight)
  postHeight()
}

function createIntro(title, intro) {
  const header = document.createElement('header')
  const h1 = document.createElement('h1')

  header.className = 'intro'
  h1.textContent = title
  header.append(h1)

  if (intro) {
    const paragraph = document.createElement('p')
    paragraph.textContent = intro
    header.append(paragraph)
  }

  return header
}

function createCase(item) {
  const section = document.createElement('section')
  const title = document.createElement('h2')
  const sample = document.createElement('div')
  const log = document.createElement('pre')

  section.className = 'demo-case'
  sample.className = 'demo-sample'
  log.className = 'log'
  log.textContent = 'Waiting for change...'
  title.textContent = item.title

  section.append(title)

  if (item.note) {
    const note = document.createElement('p')
    note.className = 'note'
    note.textContent = item.note
    section.append(note)
  }

  section.append(sample, log)
  item.render(sample, value => setLog(log, value))

  return section
}

function render(config) {
  ensureStyle()
  document.body.classList.toggle('embedded', window.self !== window.top)
  document.body.innerHTML = ''

  const page = document.createElement('main')
  page.className = 'demo-page'
  page.append(createIntro(config.title, config.intro || ''))

  for (let i = 0; i < config.cases.length; i++) {
    page.append(createCase(config.cases[i]))
  }

  document.body.append(page)

  window.addEventListener('message', event => {
    if (!event.data || event.data.type !== 'compact-demo-visibility') {
      return
    }

    setHiddenNotes(event.data.hideNotes)
  })

  watchHeight()
}

window.CompactDemo = {
  render,
  setHiddenNotes,
  postHeight,
}
