import { registerDemo } from '../demoCommon.js'

const previewImages = [
  'https://placehold.co/1200x800/0f172a/f8fafc?text=Mountain+Lake',
  'https://placehold.co/900x1200/1e293b/f8fafc?text=Forest+Path',
  'https://placehold.co/1400x800/334155/f8fafc?text=Night+Sky',
]

registerDemo({
  id: 'tot-image-preview',
  title: 'Image Preview',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="demo-group stack">
        <div class="demo-label">Fullscreen preview with thumbnails, swipe, and keyboard navigation</div>
        <div class="row">
          <tot-button id="openImagePreview" label="Open preview"></tot-button>
        </div>
        <tot-image-preview id="imagePreview"></tot-image-preview>
      </div>
      <div class="demo-group stack">
        <div class="demo-label">Contained preview</div>
        <div class="row">
          <tot-button id="restoreContainedPreview" label="Restore contained preview"></tot-button>
        </div>
        <div id="containedPreviewHost" style="height: 18rem; overflow: hidden; position: relative; border-radius: var(--tot-border-radius-large, 6px);">
          <tot-image-preview id="containedImagePreview" contained open></tot-image-preview>
        </div>
      </div>
    `

    const preview = wrapper.querySelector('#imagePreview')
    const containedPreview = wrapper.querySelector('#containedImagePreview')
    preview.images = previewImages
    containedPreview.images = previewImages

    wrapper.querySelector('#openImagePreview').addEventListener('click', () => {
      preview.show()
    })
    wrapper.querySelector('#restoreContainedPreview').addEventListener('click', () => {
      containedPreview.show()
    })

    const previews = [preview, containedPreview]
    for (let i = 0; i < previews.length; i++) {
      previews[i].addEventListener('change', event => {
        logEvent(previews[i], 'change', event.detail)
      })
      previews[i].addEventListener('show', () => logEvent(previews[i], 'show'))
      previews[i].addEventListener('hide', () => logEvent(previews[i], 'hide'))
    }

    container.appendChild(wrapper)
  },
})
