import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-list',
  title: 'List',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <style>
        .list-demo-item {
          display: grid;
          gap: var(--tot-spacing-2x-small, .25rem);
          padding: var(--tot-spacing-x-small, .5rem) var(--tot-spacing-small, .75rem);
        }

        .list-demo-title {
          color: var(--tot-input-color, #1e293b);
          font-weight: var(--tot-font-weight-semibold, 600);
        }

        .list-demo-summary {
          color: var(--tot-color-neutral-600, #64748b);
        }

        .list-demo-badge {
          background: var(--tot-color-primary-100, #e0f2fe);
          border-radius: var(--tot-border-radius-pill, 999px);
          color: var(--tot-color-primary-700, #0369a1);
          display: inline-flex;
          font-size: var(--tot-font-size-x-small, .75rem);
          padding: 0 var(--tot-spacing-2x-small, .25rem);
          width: fit-content;
        }

        .list-demo-status {
          color: var(--tot-color-neutral-600, #64748b);
          padding: var(--tot-spacing-x-small, .5rem);
          text-align: center;
        }

        .list-demo-error {
          color: var(--tot-color-danger-700, #b91c1c);
          padding: var(--tot-spacing-x-small, .5rem);
          text-align: center;
        }
      </style>

      <div class="stack demo-group">
        <div class="demo-label">Array source with arbitrary item heights and scroll API</div>
        <div class="row">
          <tot-button id="listTop" label="Top" size="small"></tot-button>
          <tot-button id="listMiddle" label="Item 150" size="small"></tot-button>
          <tot-button id="listEnd" label="Item 480" size="small"></tot-button>
        </div>
        <tot-list id="arrayList" style="--tot-list-height: 17rem;" buffer-size="700" estimated-item-height="58">
          <template slot="item">
            <div class="list-demo-item">
              <div class="list-demo-title">#{{position}} {{title}}</div>
              <div class="list-demo-summary">{{summary}}</div>
              <span class="list-demo-badge">{{kind}}</span>
            </div>
          </template>
          <div slot="empty" class="list-demo-status">No rows in this list.</div>
          <div slot="end" class="list-demo-status">Array list finished.</div>
        </tot-list>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">loadMore function</div>
        <tot-list id="loaderList" style="--tot-list-height: 14rem;" page-size="24" estimated-item-height="50">
          <template slot="item">
            <div class="list-demo-item">
              <div class="list-demo-title">Loaded row {{position}}</div>
              <div class="list-demo-summary">{{text}}</div>
            </div>
          </template>
          <div slot="loading" class="list-demo-status">Loading more rows...</div>
          <div slot="end" class="list-demo-status">No more rows to load.</div>
          <div slot="error" class="list-demo-error">The loader failed. Check the event log for details.</div>
        </tot-list>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">Generator and empty state</div>
        <div class="demo-grid">
          <tot-list id="generatorList" style="--tot-list-height: 10rem;" page-size="12">
            <template slot="item">
              <div class="list-demo-item">
                <div class="list-demo-title">{{label}}</div>
                <div class="list-demo-summary">{{details}}</div>
              </div>
            </template>
            <div slot="end" class="list-demo-status">Generator exhausted.</div>
          </tot-list>
          <tot-list id="emptyList" style="--tot-list-height: 10rem;">
            <div slot="empty" class="list-demo-status">This list is intentionally empty.</div>
          </tot-list>
        </div>
      </div>
    `

    const arrayList = wrapper.querySelector('#arrayList')
    arrayList.items = createArrayItems(500)
    wrapper.querySelector('#listTop').addEventListener('click', () => {
      void arrayList.scrollToIndex(0)
    })
    wrapper.querySelector('#listMiddle').addEventListener('click', () => {
      void arrayList.scrollToIndex(149, 'center')
    })
    wrapper.querySelector('#listEnd').addEventListener('click', () => {
      void arrayList.scrollToIndex(479, 'end')
    })

    const loaderList = wrapper.querySelector('#loaderList')
    loaderList.loadMore = async ({ offset, pageSize }) => {
      await delay(220)

      if (offset >= 96) {
        return {
          items: [],
          hasMore: false,
        }
      }

      return {
        items: createLoadedItems(offset, pageSize),
        hasMore: offset + pageSize < 96,
      }
    }

    const generatorList = wrapper.querySelector('#generatorList')
    generatorList.dataSource = createGeneratorItems(42)

    const lists = wrapper.querySelectorAll('tot-list')
    for (let i = 0; i < lists.length; i++) {
      lists[i].addEventListener('item-click', (event) => {
        logEvent(lists[i], 'item-click', {
          index: event.detail.index,
          item: getCompactItem(event.detail.item),
        })
      })
      lists[i].addEventListener('load-start', (event) => {
        logEvent(lists[i], 'load-start', event.detail)
      })
      lists[i].addEventListener('load-end', (event) => {
        logEvent(lists[i], 'load-end', event.detail)
      })
      lists[i].addEventListener('error', (event) => {
        logEvent(lists[i], 'error', {
          message: event.detail.error?.message || String(event.detail.error),
        })
      })
    }

    container.appendChild(wrapper)
  },
})

function createArrayItems(count) {
  const result = []
  const kinds = ['Short', 'Medium', 'Detailed']

  for (let i = 0; i < count; i++) {
    const kind = kinds[i % kinds.length]
    result.push({
      title: `Array item ${i + 1}`,
      kind,
      summary: getSummary(i, kind),
    })
  }

  return result
}

function createLoadedItems(offset, pageSize) {
  const result = []
  const limit = Math.min(96, offset + pageSize)

  for (let i = offset; i < limit; i++) {
    result.push({
      text: `This item came from loadMore at offset ${offset}. ${i % 5 === 0 ? 'It is a little taller to show that rows can change height.' : ''}`,
    })
  }

  return result
}

function* createGeneratorItems(count) {
  for (let i = 0; i < count; i++) {
    yield {
      label: `Generated item ${i + 1}`,
      details: i % 4 === 0 ? 'This generator row has extra text, so it is taller than its neighbors.' : 'Generated lazily.',
    }
  }
}

function getSummary(index, kind) {
  if (kind === 'Short') {
    return 'A compact row.'
  }

  if (kind === 'Medium') {
    return 'A row with enough content to measure a different height than the compact rows.'
  }

  return `A taller row with more text. The virtual list only renders the visible window plus a buffer, so item ${index + 1} is measured when it appears instead of measuring every item up front.`
}

function getCompactItem(item) {
  if (!item || typeof item !== 'object') {
    return item
  }

  return item.title || item.label || item.text || item
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
