const sections = []

export function registerDemo(sectionConfig) {
  sections.push(sectionConfig)
}

export function renderDemos(mainElement) {
  for (const { id, title, render } of sections) {
    const section = document.createElement('section')
    section.className = 'section'
    section.dataset.section = id

    const heading = document.createElement('h2')
    heading.textContent = title
    section.appendChild(heading)

    render(section)
    mainElement.appendChild(section)
  }
}
