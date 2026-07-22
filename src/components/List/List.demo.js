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
        <tot-list id="arrayList" style="--tot-list-height: 17rem;" buffer-size="700" estimated-item-size="58">
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
        <div class="demo-label">Argument-free loadMore; the callback owns its offset</div>
        <tot-list id="loaderList" style="--tot-list-height: 14rem;" estimated-item-size="50">
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
        <div class="demo-label">Slow loader for inspecting the loading part</div>
        <tot-list
          id="slowLoaderList"
          buffer-size="40"
          estimated-item-size="48"
          style="--tot-list-height: 11rem; --tot-list-min-height: 11rem;"
        >
          <template slot="item">
            <div class="list-demo-item">
              <div class="list-demo-title">Slow row {{position}}</div>
              <div class="list-demo-summary">{{text}}</div>
            </div>
          </template>
          <div slot="loading" class="list-demo-status">Loading for 1.5 seconds...</div>
          <div slot="end" class="list-demo-status">Slow loader exhausted.</div>
          <div slot="error" class="list-demo-error">Slow loader failed.</div>
        </tot-list>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">Generator and empty state</div>
        <div class="demo-grid">
          <tot-list id="generatorList" style="--tot-list-height: 10rem;">
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

      <div class="stack demo-group">
        <div class="demo-label">Horizontally virtualized list with inline-axis edge shadows</div>
        <div class="row">
          <tot-button id="horizontalListStart" label="Start" size="small"></tot-button>
          <tot-button id="horizontalListMiddle" label="Item 40" size="small"></tot-button>
          <tot-button id="horizontalListEnd" label="End" size="small"></tot-button>
        </div>
        <tot-list
          id="horizontalList"
          horizontal
          edge-shadows
          buffer-size="500"
          estimated-item-size="190"
          style="--tot-list-height: 8rem; --tot-list-min-height: 8rem; --tot-list-edge-size: 2rem;"
        >
          <template slot="item">
            <div style="display: grid; gap: var(--tot-spacing-2x-small, .25rem); padding: var(--tot-spacing-small, .75rem); width: 12rem;">
              <div style="font-weight: var(--tot-font-weight-semibold, 600);">#{{position}} {{title}}</div>
              <div style="color: var(--tot-color-neutral-600, #64748b);">{{summary}}</div>
            </div>
          </template>
        </tot-list>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">Optional overflow edge shadows</div>
        <div class="row">
          <tot-button id="edgeListTop" label="Top" size="small"></tot-button>
          <tot-button id="edgeListEnd" label="End" size="small"></tot-button>
        </div>
        <tot-list
          id="edgeList"
          edge-shadows
          estimated-item-size="46"
          style="--tot-list-height: 9rem; --tot-list-min-height: 9rem; --tot-list-edge-size: 2rem;"
        >
          <template slot="item">
            <div class="list-demo-item">
              <div class="list-demo-title">{{title}}</div>
              <div class="list-demo-summary">{{summary}}</div>
            </div>
          </template>
        </tot-list>
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
    let loaderOffset = 0
    loaderList.loadMore = async () => {
      await delay(220)

      if (loaderOffset >= 96) {
        return []
      }

      const items = createLoadedItems(loaderOffset, 12)
      loaderOffset += items.length
      return items
    }

    const slowLoaderList = wrapper.querySelector('#slowLoaderList')
    let slowLoaderOffset = 0
    slowLoaderList.loadMore = async () => {
      await delay(1500)

      if (slowLoaderOffset >= 20) {
        return []
      }

      const items = createLoadedItems(slowLoaderOffset, 5)
      slowLoaderOffset += items.length
      return items
    }

    const generatorList = wrapper.querySelector('#generatorList')
    generatorList.items = createGeneratorItems(42)

    const horizontalList = wrapper.querySelector('#horizontalList')
    horizontalList.items = createArrayItems(80)
    wrapper.querySelector('#horizontalListStart').addEventListener('click', () => {
      void horizontalList.scrollToIndex(0)
    })
    wrapper.querySelector('#horizontalListMiddle').addEventListener('click', () => {
      void horizontalList.scrollToIndex(39, 'center')
    })
    wrapper.querySelector('#horizontalListEnd').addEventListener('click', () => {
      void horizontalList.scrollToIndex(horizontalList.items.length - 1, 'end')
    })

    const edgeList = wrapper.querySelector('#edgeList')
    edgeList.items = createArrayItems(24)
    wrapper.querySelector('#edgeListTop').addEventListener('click', () => {
      void edgeList.scrollToIndex(0)
    })
    wrapper.querySelector('#edgeListEnd').addEventListener('click', () => {
      void edgeList.scrollToIndex(edgeList.items.length - 1, 'end')
    })

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

function createLoadedItems(offset, count) {
  const result = []
  const limit = Math.min(96, offset + count)

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
