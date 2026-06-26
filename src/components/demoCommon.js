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

export function getRegisteredDemos() {
  const registered = []
  for (let i = 0; i < sections.length; i++) {
    registered.push({
      id: sections[i].id,
      title: sections[i].title,
    })
  }
  return registered
}

export function renderDemos(mainElement) {
  const context = {
    logEvent: logDemoEvent,
  }

  for (let i = 0; i < sections.length; i++) {
    const { id, title, render } = sections[i]
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
