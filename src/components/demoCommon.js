const sections = []
let demoLogger = null

export function registerDemo(sectionConfig) {
  sections.push(sectionConfig)
}

export function setDemoLogger(logger) {
  demoLogger = logger
}

export function logDemoEvent(source, eventName, detail) {
  if (!demoLogger) {
    return
  }

  demoLogger({
    source,
    eventName,
    detail: detail || {},
    time: new Date(),
  })
}

export function renderDemos(mainElement) {
  const context = {
    logEvent: logDemoEvent,
  }

  for (const { id, title, render } of sections) {
    const section = document.createElement('section')
    section.className = 'section'
    section.dataset.section = id

    const heading = document.createElement('h2')
    heading.textContent = title
    section.appendChild(heading)

    render(section, context)
    mainElement.appendChild(section)
  }
}
