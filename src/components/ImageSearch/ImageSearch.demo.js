import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-image-search',
  title: 'Image Search',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="demo-label">Openverse search with single selection, preview, licence details, and resizable tiles</div>
      <tot-image-search id="imageSearch" query="mountain lake" min-tile-size="120" page-size="12"></tot-image-search>
      <div class="demo-label">Multiple selection filtered to landscape images at least 800 px wide</div>
      <tot-image-search id="filteredImageSearch" query="forest" multiple min-tile-size="105" page-size="12"></tot-image-search>
    `

    const search = wrapper.querySelector('#imageSearch')
    const filteredSearch = wrapper.querySelector('#filteredImageSearch')
    filteredSearch.filter = image => Number(image.width) >= 800 && Number(image.width) >= Number(image.height)

    const searches = [search, filteredSearch]
    for (let i = 0; i < searches.length; i++) {
      searches[i].addEventListener('change', event => {
        logEvent(searches[i], 'change', {
          selected: event.detail.selected.map(image => image.id),
        })
      })
      searches[i].addEventListener('search-start', event => {
        logEvent(searches[i], 'search-start', event.detail)
      })
      searches[i].addEventListener('search-end', event => {
        logEvent(searches[i], 'search-end', event.detail)
      })
      searches[i].addEventListener('error', event => {
        logEvent(searches[i], 'error', {
          message: event.detail.error?.message || String(event.detail.error),
        })
      })
    }

    container.appendChild(wrapper)
  },
})
