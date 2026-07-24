import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-rating',
  title: 'Rating',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Basic</div>
        <div class="row">
          <tot-rating label="Rating" value="3"></tot-rating>
          <span class="rating-demo-value">3</span>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Inline with button</div>
        <div class="row inline-control-row inline-control-center-row">
          <tot-rating label="Inline rating" value="4"></tot-rating>
          <tot-button size="small" variant="primary">Submit</tot-button>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Precision and max</div>
        <div class="row">
          <tot-rating label="Half step rating" value="2.5" precision="0.5"></tot-rating>
          <tot-rating label="Three point rating" value="2" max="3"></tot-rating>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Readonly and disabled</div>
        <div class="row">
          <tot-rating label="Readonly rating" value="4" readonly></tot-rating>
          <tot-rating label="Disabled rating" value="3" disabled></tot-rating>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">One-tap favorite</div>
        <div class="row">
          <tot-rating class="rating-demo-favorite" label="Favorite" max="1" value="0" style="--tot-rating-symbol-color-active: var(--tot-color-danger-500, #ef4444);"></tot-rating>
          <span class="rating-demo-favorite-value">0</span>
        </div>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Custom symbols and hover</div>
        <div class="row">
          <tot-rating class="rating-demo-hearts" label="Heart rating" value="4" style="--tot-rating-symbol-color-active: var(--tot-color-danger-500, #ef4444);"></tot-rating>
          <span class="rating-demo-hover"></span>
        </div>
      </div>
    `

    const ratings = wrapper.querySelectorAll('tot-rating')
    for (let i = 0; i < ratings.length; i++) {
      const rating = ratings[i]
      rating.addEventListener('input', (event) => {
        logEvent(rating, 'input', event.detail)
      })
      rating.addEventListener('change', (event) => {
        logEvent(rating, 'change', event.detail)
        const value = wrapper.querySelector('.rating-demo-value')
        if (rating === ratings[0] && value) {
          value.textContent = String(event.detail.value)
        }

        const favoriteValue = wrapper.querySelector('.rating-demo-favorite-value')
        if (rating.classList.contains('rating-demo-favorite') && favoriteValue) {
          favoriteValue.textContent = String(event.detail.value)
        }
      })
      rating.addEventListener('hover', (event) => {
        logEvent(rating, 'hover', event.detail)
        const hover = wrapper.querySelector('.rating-demo-hover')
        if (rating.classList.contains('rating-demo-hearts') && hover) {
          hover.textContent = event.detail.phase === 'end' ? '' : `Hover: ${event.detail.value}`
        }
      })
    }

    const favorite = wrapper.querySelector('.rating-demo-favorite')
    favorite.getSymbol = () => '♥'

    const hearts = wrapper.querySelector('.rating-demo-hearts')
    hearts.getSymbol = () => '♥'

    container.appendChild(wrapper)
  },
})
