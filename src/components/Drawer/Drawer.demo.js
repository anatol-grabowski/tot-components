import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-drawer',
  title: 'Drawer',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <style>
        .drawer-demo-contained-box {
          background: var(--tot-color-neutral-50, #f8fafc);
          border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
          border-radius: var(--tot-border-radius-medium, 4px);
          min-height: 180px;
          overflow: hidden;
          padding: var(--tot-spacing-small, .75rem);
          position: relative;
        }

        .drawer-demo-copy {
          color: var(--tot-color-neutral-700, #334155);
          display: grid;
          gap: var(--tot-spacing-x-small, .5rem);
          line-height: var(--tot-line-height-dense, 1.4);
        }
      </style>

      <div class="stack demo-group">
        <div class="demo-label">Placements</div>
        <div class="row">
          <tot-button id="openEndDrawer" label="End"></tot-button>
          <tot-button id="openStartDrawer" label="Start"></tot-button>
          <tot-button id="openTopDrawer" label="Top"></tot-button>
          <tot-button id="openBottomDrawer" label="Bottom"></tot-button>
        </div>
        <tot-drawer id="endDrawer" label="End drawer">
          <div class="drawer-demo-copy">
            <p>The default drawer opens from the inline end of the viewport.</p>
            <p>Click outside, press Escape, or use the close button to dismiss it.</p>
          </div>
          <tot-button slot="footer" id="closeEndDrawer" label="Close" variant="primary"></tot-button>
        </tot-drawer>
        <tot-drawer id="startDrawer" label="Start drawer" placement="start">
          <span slot="header-actions" class="demo-label">Custom action</span>
          <div class="drawer-demo-copy">
            <p>This drawer uses the header-actions slot and the start placement.</p>
          </div>
          <tot-button slot="footer" id="closeStartDrawer" label="Close" variant="primary"></tot-button>
        </tot-drawer>
        <tot-drawer id="topDrawer" label="Top drawer" placement="top" style="--size: 35dvh;">
          <div class="drawer-demo-copy">
            <p>The top drawer uses <code>--size</code> to set its preferred height.</p>
          </div>
          <tot-button slot="footer" id="closeTopDrawer" label="Close" variant="primary"></tot-button>
        </tot-drawer>
        <tot-drawer id="bottomDrawer" label="Bottom drawer" placement="bottom" style="--size: 35dvh;">
          <div class="drawer-demo-copy">
            <p>The bottom drawer keeps the header and footer visible while the body scrolls.</p>
          </div>
          <tot-button slot="footer" id="closeBottomDrawer" label="Close" variant="primary"></tot-button>
        </tot-drawer>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">Resizable drawer</div>
        <div class="row">
          <tot-button id="openResizableDrawer" label="Open resizable" variant="primary"></tot-button>
        </div>
        <tot-drawer id="resizableDrawer" label="Resizable drawer" resizable min-size="16rem" max-size="80vw" style="--size: 24rem;">
          <div class="drawer-demo-copy">
            <p>Drag the handle on the drawer edge to resize it.</p>
            <p>The size is clamped between <code>min-size</code> and <code>max-size</code>.</p>
          </div>
          <tot-button slot="footer" id="closeResizableDrawer" label="Done" variant="create"></tot-button>
        </tot-drawer>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">Contained drawer</div>
        <div class="drawer-demo-contained-box">
          <p>The drawer is contained to this box. It is intentionally not modal.</p>
          <tot-drawer id="containedDrawer" label="Contained drawer" contained resizable min-size="30%" max-size="80%" style="--size: 50%;">
            <div class="drawer-demo-copy">
              <p>Contained drawers do not show an overlay and do not close with Escape.</p>
              <p>You can still close this one with its button.</p>
            </div>
            <tot-button slot="footer" id="closeContainedDrawer" label="Close" variant="primary"></tot-button>
          </tot-drawer>
        </div>
        <div class="row">
          <tot-button id="toggleContainedDrawer" label="Toggle contained"></tot-button>
        </div>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">Cancelable request-close</div>
        <div class="row">
          <tot-button id="openProtectedDrawer" label="Protected overlay" variant="danger" outline></tot-button>
        </div>
        <tot-drawer id="protectedDrawer" label="Protected drawer">
          <div class="drawer-demo-copy">
            <p>Overlay clicks are canceled through the request-close event.</p>
            <p>Escape or the close button still closes the drawer.</p>
          </div>
          <tot-button slot="footer" id="closeProtectedDrawer" label="Close" variant="primary"></tot-button>
        </tot-drawer>
      </div>
    `

    const drawerConfigs = [
      ['openEndDrawer', 'endDrawer', 'closeEndDrawer'],
      ['openStartDrawer', 'startDrawer', 'closeStartDrawer'],
      ['openTopDrawer', 'topDrawer', 'closeTopDrawer'],
      ['openBottomDrawer', 'bottomDrawer', 'closeBottomDrawer'],
      ['openResizableDrawer', 'resizableDrawer', 'closeResizableDrawer'],
      ['openProtectedDrawer', 'protectedDrawer', 'closeProtectedDrawer'],
    ]

    for (let i = 0; i < drawerConfigs.length; i++) {
      const [openId, drawerId, closeId] = drawerConfigs[i]
      const drawer = wrapper.querySelector(`#${drawerId}`)
      wrapper.querySelector(`#${openId}`).addEventListener('click', () => drawer.show())
      wrapper.querySelector(`#${closeId}`).addEventListener('click', () => drawer.hide())
    }

    const containedDrawer = wrapper.querySelector('#containedDrawer')
    wrapper.querySelector('#toggleContainedDrawer').addEventListener('click', () => {
      containedDrawer.open = !containedDrawer.open
    })
    wrapper.querySelector('#closeContainedDrawer').addEventListener('click', () => containedDrawer.hide())

    const protectedDrawer = wrapper.querySelector('#protectedDrawer')
    protectedDrawer.addEventListener('sl-request-close', (event) => {
      if (event.detail.source === 'overlay') {
        event.preventDefault()
      }
    })

    const drawers = wrapper.querySelectorAll('tot-drawer')
    for (let i = 0; i < drawers.length; i++) {
      drawers[i].addEventListener('sl-show', (event) => {
        logEvent(drawers[i], 'sl-show', event.detail)
      })
      drawers[i].addEventListener('sl-hide', (event) => {
        logEvent(drawers[i], 'sl-hide', event.detail)
      })
      drawers[i].addEventListener('sl-request-close', (event) => {
        logEvent(drawers[i], 'sl-request-close', event.detail)
      })
    }

    container.appendChild(wrapper)
  },
})
