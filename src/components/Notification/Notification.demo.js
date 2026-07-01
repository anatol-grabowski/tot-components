import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-notification',
  title: 'Notification',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Variants</div>
        <tot-notification variant="primary" open>
          <span slot="icon">i</span>
          <strong>Helpful note.</strong> This notification follows the active theme.
        </tot-notification>
        <tot-notification variant="success" open>
          <span slot="icon">✓</span>
          <strong>Saved.</strong> Your changes are now stored locally.
        </tot-notification>
        <tot-notification variant="neutral" open>
          <span slot="icon">⚙</span>
          <strong>Settings updated.</strong> Reload to apply every change.
        </tot-notification>
        <tot-notification variant="warning" open>
          <span slot="icon">!</span>
          <strong>Review required.</strong> This action overwrites existing files.
        </tot-notification>
        <tot-notification variant="danger" open>
          <span slot="icon">×</span>
          <strong>Request failed.</strong> Check the console for details.
        </tot-notification>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Closable and timed</div>
        <tot-notification id="closableNotification" variant="primary" open closable>
          You can close this notification.
        </tot-notification>
        <div class="row">
          <tot-button id="restoreNotification" label="Restore"></tot-button>
          <tot-button id="timedNotificationButton" label="Show timed notification"></tot-button>
        </div>
        <tot-notification id="timedNotification" variant="success" duration="4000" countdown="ltr" closable>
          <span slot="icon">✓</span>
          This one closes automatically and restarts its timer while hovered or focused.
        </tot-notification>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Toast notification</div>
        <div class="row">
          <tot-button id="showNotificationToast" label="Show toast"></tot-button>
          <tot-button id="showDangerNotificationToast" label="Show danger toast" variant="danger"></tot-button>
        </div>
      </div>
    `

    const closableNotification = wrapper.querySelector('#closableNotification')
    const timedNotification = wrapper.querySelector('#timedNotification')
    const notifications = wrapper.querySelectorAll('tot-notification')

    for (let i = 0; i < notifications.length; i++) {
      addNotificationLogs(notifications[i], logEvent)
    }

    wrapper.querySelector('#restoreNotification').addEventListener('click', () => {
      closableNotification.show()
    })

    wrapper.querySelector('#timedNotificationButton').addEventListener('click', () => {
      timedNotification.show()
    })

    wrapper.querySelector('#showNotificationToast').addEventListener('click', () => {
      const notification = document.createElement('tot-notification')
      notification.variant = 'primary'
      notification.closable = true
      notification.duration = 3500
      notification.countdown = 'rtl'
      notification.innerHTML = '<span slot="icon">i</span><strong>Toast created.</strong> It will be removed after it hides.'
      addNotificationLogs(notification, logEvent)
      void notification.toast()
    })

    wrapper.querySelector('#showDangerNotificationToast').addEventListener('click', () => {
      const notification = document.createElement('tot-notification')
      notification.variant = 'danger'
      notification.closable = true
      notification.duration = 5000
      notification.countdown = 'ltr'
      notification.innerHTML = '<span slot="icon">!</span><strong>Danger toast.</strong> Acknowledgement is optional here.'
      addNotificationLogs(notification, logEvent)
      void notification.toast()
    })

    container.appendChild(wrapper)
  },
})

function addNotificationLogs(notification, logEvent) {
  const events = ['show', 'after-show', 'hide', 'after-hide']
  for (let i = 0; i < events.length; i++) {
    notification.addEventListener(events[i], (event) => {
      logEvent(notification, events[i], event.detail)
    })
  }
}
