import { registerDemo } from '../demoCommon.js'

const avatarImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%23bae6fd"/%3E%3Ccircle cx="40" cy="32" r="16" fill="%230284c7"/%3E%3Cpath d="M14 74c4-18 16-28 26-28s22 10 26 28" fill="%230f172a"/%3E%3C/svg%3E'

registerDemo({
  id: 'tot-avatar',
  title: 'Avatar',
  render: (container) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Images, initials, and icon fallback</div>
        <div class="row">
          <tot-avatar image="${avatarImage}" label="User avatar with image"></tot-avatar>
          <tot-avatar initials="AG" label="Avatar with initials AG"></tot-avatar>
          <tot-avatar label="Avatar with default icon"></tot-avatar>
          <tot-avatar label="Avatar with custom icon">
            <span slot="icon">🚀</span>
          </tot-avatar>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Shapes</div>
        <div class="row">
          <tot-avatar initials="SQ" shape="square" label="Square avatar"></tot-avatar>
          <tot-avatar initials="RO" shape="rounded" label="Rounded avatar"></tot-avatar>
          <tot-avatar initials="CI" shape="circle" label="Circle avatar"></tot-avatar>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Sizes via CSS custom property</div>
        <div class="row">
          <tot-avatar initials="S" label="Small avatar" style="--size: 1.75rem;"></tot-avatar>
          <tot-avatar initials="M" label="Medium avatar"></tot-avatar>
          <tot-avatar initials="L" label="Large avatar" style="--size: 3.25rem;"></tot-avatar>
        </div>
      </div>
    `

    container.appendChild(wrapper)
  },
})
