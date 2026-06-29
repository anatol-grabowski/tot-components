import { registerDemo } from '../demoCommon.js'

registerDemo({
  id: 'tot-calendar',
  title: 'Calendar',
  render: (container, { logEvent }) => {
    const today = formatDate(new Date())
    const wrapper = document.createElement('div')
    wrapper.className = 'stack'
    wrapper.innerHTML = `
      <style>
        .calendar-demo-actions {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: var(--tot-spacing-2x-small, .25rem);
        }

        .calendar-demo-note {
          color: var(--tot-color-neutral-600, #64748b);
          font-size: var(--tot-font-size-x-small, .75rem);
        }

        .calendar-demo-grid {
          display: grid;
          gap: var(--tot-spacing-small, .75rem);
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        }

        tot-calendar::part(demo-holiday) {
          background: var(--tot-color-rose-100, #ffe4e6);
          color: var(--tot-color-rose-800, #9f1239);
          font-weight: var(--tot-font-weight-semibold, 600);
        }

        tot-calendar::part(demo-payday) {
          box-shadow: inset 0 -2px 0 var(--tot-color-green-500, #22c55e);
        }

        tot-calendar::part(demo-month-start) {
          font-weight: var(--tot-font-weight-semibold, 600);
        }

        @media (max-width: 760px) {
          .calendar-demo-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="stack demo-group">
        <div class="demo-label">Infinite week rows, typed date, selected date, and scroll API</div>
        <div class="calendar-demo-actions">
          <tot-button id="calendarToday" label="Today" size="small"></tot-button>
          <tot-button id="calendarPast" label="1980-01-01" size="small"></tot-button>
          <tot-button id="calendarFuture" label="2050-12-25" size="small"></tot-button>
        </div>
        <tot-calendar id="mainCalendar" date="${today}" style="--tot-calendar-height: 18rem;"></tot-calendar>
        <div class="calendar-demo-note">Type YYYY-MM-DD or scroll by touch/mouse. Month labels are virtualized with the visible week rows.</div>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">Custom day/month classes, slots, and Sunday week start</div>
        <tot-calendar id="classCalendar" date="${today}" weekstart="sunday" style="--tot-calendar-height: 15rem;">
          <template slot="cell-day">
            <button class="{{contentClasses}}" part="{{contentParts}}" type="button" data-date="{{date}}" aria-label="{{date}}" aria-pressed="{{features.isSelected}}">
              <span>{{day.dayOfMonth}}</span>
            </button>
          </template>
          <template slot="cell-month">
            <span class="month__label">{{month.monthName}} {{month.year}}</span>
          </template>
        </tot-calendar>
      </div>

      <div class="stack demo-group">
        <div class="demo-label">No input</div>
        <div class="calendar-demo-grid">
          <tot-calendar id="compactCalendar" no-input date="${today}" style="--tot-calendar-height: 12rem;"></tot-calendar>
          <tot-calendar id="smallRowsCalendar" no-input date="${today}" style="--tot-calendar-height: 12rem; --tot-calendar-week-height: 1.625rem;"></tot-calendar>
        </div>
      </div>
    `

    const mainCalendar = wrapper.querySelector('#mainCalendar')
    const classCalendar = wrapper.querySelector('#classCalendar')
    const compactCalendar = wrapper.querySelector('#compactCalendar')
    const smallRowsCalendar = wrapper.querySelector('#smallRowsCalendar')

    classCalendar.getDayClasses = (day, features) => {
      const classes = []

      if (day.dayOfMonth === 1) {
        classes.push('demo-month-start')
      }

      if (isHoliday(day)) {
        classes.push('demo-holiday')
      }

      if (day.dayOfMonth === 15) {
        classes.push('demo-payday')
      }

      return classes
    }

    classCalendar.getMonthClasses = (month, features) => {
      return features.isYearStart ? ['demo-month-start'] : []
    }

    wrapper.querySelector('#calendarToday').addEventListener('click', () => {
      mainCalendar.date = today
      void mainCalendar.scrollToDate(today, 'center')
    })

    wrapper.querySelector('#calendarPast').addEventListener('click', () => {
      mainCalendar.date = '1980-01-01'
      void mainCalendar.scrollToDate('1980-01-01', 'center')
    })

    wrapper.querySelector('#calendarFuture').addEventListener('click', () => {
      mainCalendar.date = '2050-12-25'
      void mainCalendar.scrollToDate('2050-12-25', 'center')
    })

    const calendars = [mainCalendar, classCalendar, compactCalendar, smallRowsCalendar]
    for (let i = 0; i < calendars.length; i++) {
      calendars[i].addEventListener('change', (event) => {
        logEvent(calendars[i], 'change', event.detail)
      })
    }

    container.appendChild(wrapper)
  },
})

function isHoliday(context) {
  return (context.month === 1 && context.dayOfMonth === 1) ||
    (context.month === 12 && context.dayOfMonth === 25) ||
    (context.month === 7 && context.dayOfMonth === 4)
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
