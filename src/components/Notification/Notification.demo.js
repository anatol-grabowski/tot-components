import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-notification',
  title: 'Notification',
  render: (container, { logEvent }) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <div class="stack demo-group">
        <div class="demo-label">Inline variants with built-in icons</div>
        <tot-notification type="info" open>
          <strong>Helpful note.</strong> This notification follows the active theme.
        </tot-notification>
        <tot-notification type="success" open>
          <strong>Saved.</strong> Your changes are now stored locally.
        </tot-notification>
        <tot-notification type="warning" open>
          <strong>Review required.</strong> This action overwrites existing files.
        </tot-notification>
        <tot-notification type="error" open>
          <strong>Request failed.</strong> Check the console for details.
        </tot-notification>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Custom icon and close control</div>
        <tot-notification id="closableNotification" type="info" open closable>
          <span slot="icon">?</span>
          You can replace the built-in icon and close this notification.
        </tot-notification>
        <tot-button id="restoreNotification" label="Restore"></tot-button>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Timed notification — hover, focus, or hold to pause</div>
        <tot-notification id="timedNotification" type="success" duration="6000" closable>
          The CSS progress bar keeps its remaining time while paused.
        </tot-notification>
        <tot-button id="timedNotificationButton" label="Show timed notification"></tot-button>
      </div>
      <div class="stack demo-group">
        <div class="demo-label">Multiple timed toasts share one expiry scheduler</div>
        <div class="row">
          <tot-button id="showNotificationToast" label="Show info toast"></tot-button>
          <tot-button id="showErrorNotificationToast" label="Show error toast" variant="danger"></tot-button>
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
      notification.type = 'info'
      notification.closable = true
      notification.duration = 5000
      notification.innerHTML = '<strong>Toast created.</strong> Hold or hover to pause it.'
      addNotificationLogs(notification, logEvent)
      void notification.toast()
    })

    wrapper.querySelector('#showErrorNotificationToast').addEventListener('click', () => {
      const notification = document.createElement('tot-notification')
      notification.type = 'error'
      notification.closable = true
      notification.duration = 7000
      notification.innerHTML = '<strong>Request failed.</strong> This toast has a longer timeout.'
      addNotificationLogs(notification, logEvent)
      void notification.toast()
    })

    container.appendChild(wrapper)
  },
})

function addNotificationLogs(notification, logEvent) {
  const events = ['show', 'hide']
  for (let i = 0; i < events.length; i++) {
    notification.addEventListener(events[i], event => {
      logEvent(notification, events[i], event.detail)
    })
  }
}
