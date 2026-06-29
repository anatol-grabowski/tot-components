const calendarStyle = `
  :host {
    display: block;
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }

  :host([hidden]) {
    display: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .calendar {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: 0;
    color: var(--tot-input-color, #1e293b);
    display: grid;
    font-family: var(--tot-input-font-family, var(--tot-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif));
    font-size: var(--tot-input-font-size-small, .8125rem);
    gap: var(--tot-spacing-2x-small, .25rem);
    line-height: 1.25;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    padding: var(--tot-spacing-2x-small, .25rem);
    width: 100%;
  }

  .input-row {
    display: block;
    max-width: 12rem;
    min-width: 0;
  }

  .input-row[hidden] {
    display: none;
  }

  .year-scroller {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: 0;
    height: var(--tot-calendar-year-height, 2rem);
    max-width: 100%;
    min-width: 0;
    overflow-x: auto;
    overflow-y: hidden;
    overscroll-behavior: contain;
    scrollbar-width: none;
    -ms-overflow-style: none;
    width: 100%;
  }

  .year-scroller::-webkit-scrollbar {
    height: 0;
    width: 0;
  }

  .year-scroller:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .year-strip {
    height: 100%;
    min-width: 100%;
    position: relative;
  }

  .year-cell {
    align-items: center;
    background: var(--tot-calendar-month-background, var(--tot-color-neutral-50, #f8fafc));
    border: 0;
    border-inline-start: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    color: var(--tot-color-neutral-600, #64748b);
    cursor: pointer;
    display: flex;
    font-size: var(--tot-font-size-x-small, .75rem);
    font-weight: var(--tot-font-weight-semibold, 600);
    height: 100%;
    justify-content: center;
    overflow: hidden;
    position: absolute;
    top: 0;
    touch-action: pan-x;
    user-select: none;
    white-space: nowrap;
  }

  .year-cell--selected {
    color: var(--tot-input-color, #1e293b);
  }

  .year-cell__highlight {
    background: var(--tot-calendar-year-highlight-background, hsl(198.6 88.7% 48.4% / 18%));
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
    width: 0;
  }

  .year-cell__today {
    background: currentColor;
    border-radius: var(--tot-border-radius-pill, 999px);
    bottom: .1875rem;
    height: .1875rem;
    left: 0;
    opacity: .55;
    position: absolute;
    transform: translateX(-50%);
    width: .1875rem;
    z-index: 2;
  }

  .year-cell__label {
    overflow: hidden;
    padding: 0 var(--tot-spacing-2x-small, .25rem);
    position: relative;
    text-overflow: ellipsis;
    z-index: 1;
  }

  .scroller {
    background: var(--tot-panel-background-color, var(--tot-color-neutral-0, #fff));
    border: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-radius: 0;
    height: var(--tot-calendar-height, 20rem);
    max-height: var(--tot-calendar-max-height, 100%);
    min-height: var(--tot-calendar-min-height, 10rem);
    max-width: 100%;
    min-width: 0;
    overflow: auto;
    overflow-anchor: none;
    overscroll-behavior: contain;
    scrollbar-width: none;
    -ms-overflow-style: none;
    width: 100%;
  }

  .scroller::-webkit-scrollbar {
    height: 0;
    width: 0;
  }

  .scroller:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: var(--tot-focus-ring-offset, 1px);
  }

  .table {
    border-collapse: separate;
    border-spacing: 0;
    color: inherit;
    font: inherit;
    table-layout: fixed;
    width: 100%;
  }

  .head {
    background: transparent;
    position: sticky;
    top: 0;
    z-index: 3;
  }

  .weekday,
  .month-head {
    border: 0;
    border-block-end: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-block-start: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-inline-end: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    color: var(--tot-color-neutral-600, #64748b);
    font-size: var(--tot-font-size-x-small, .75rem);
    font-weight: var(--tot-font-weight-semibold, 600);
    height: var(--tot-calendar-header-height, 1.75rem);
    padding: 0 var(--tot-spacing-3x-small, .125rem);
    text-align: center;
    white-space: nowrap;
  }

  .weekday {
    background: var(--tot-calendar-month-background, var(--tot-color-neutral-50, #f8fafc));
  }

  .month-head {
    background: transparent;
    border: 0;
    overflow: visible;
    pointer-events: none;
    position: relative;
  }

  .month-head__label {
    display: none;
  }

  .month-head,
  .month {
    inline-size: var(--tot-calendar-month-label-width, 2rem);
    max-inline-size: var(--tot-calendar-month-label-width, 2rem);
    min-inline-size: var(--tot-calendar-month-label-width, 2rem);
    width: var(--tot-calendar-month-label-width, 2rem);
  }

  .spacer-cell {
    border: 0;
    height: 0;
    padding: 0;
  }

  .week-row {
    height: var(--tot-calendar-week-height, 2rem);
  }

  .month {
    background: var(--tot-calendar-month-background, var(--tot-color-neutral-50, #f8fafc));
    border: 0;
    border-block-end: var(--tot-calendar-month-border-width, var(--tot-panel-border-width, 1px)) solid var(--tot-calendar-month-border-color, var(--tot-color-neutral-300, #cbd5e1));
    border-block-start: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-inline-end: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-inline-start: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    color: var(--tot-color-neutral-600, #64748b);
    font-size: var(--tot-font-size-x-small, .75rem);
    font-weight: var(--tot-font-weight-semibold, 600);
    overflow: hidden;
    padding: 0;
    position: relative;
    vertical-align: middle;
  }

  .month__label {
    left: 50%;
    max-width: 10rem;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    transform-origin: center;
    white-space: nowrap;
  }

  .date-cell {
    background: var(--tot-calendar-date-background, var(--tot-color-neutral-0, #fff));
    border: 0;
    border-block-end: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    border-inline-end: var(--tot-panel-border-width, 1px) solid var(--tot-panel-border-color, #e2e8f0);
    height: var(--tot-calendar-week-height, 2rem);
    overflow: hidden;
    padding: 0;
    text-align: center;
    vertical-align: middle;
  }

  .month--year-top {
    border-block-start: var(--tot-calendar-year-border-width, 2px) solid var(--tot-calendar-year-border-color, var(--tot-color-neutral-400, #94a3b8));
  }

  .month--year-bottom {
    border-block-end-color: var(--tot-calendar-year-border-color, var(--tot-color-neutral-400, #94a3b8));
    border-block-end-width: var(--tot-calendar-year-border-width, 2px);
  }

  .date-cell--month-top {
    border-block-start: var(--tot-calendar-month-border-width, var(--tot-panel-border-width, 1px)) solid var(--tot-calendar-month-border-color, var(--tot-color-neutral-300, #cbd5e1));
  }

  .date-cell--month-bottom {
    border-block-end-color: var(--tot-calendar-month-border-color, var(--tot-color-neutral-300, #cbd5e1));
    border-block-end-width: var(--tot-calendar-month-border-width, var(--tot-panel-border-width, 1px));
  }

  .date-cell--month-start {
    border-inline-start: var(--tot-calendar-month-border-width, var(--tot-panel-border-width, 1px)) solid var(--tot-calendar-month-border-color, var(--tot-color-neutral-300, #cbd5e1));
  }

  .date-cell--month-end {
    border-inline-end-color: var(--tot-calendar-month-border-color, var(--tot-color-neutral-300, #cbd5e1));
    border-inline-end-width: var(--tot-calendar-month-border-width, var(--tot-panel-border-width, 1px));
  }


  .date-cell--year-top {
    border-block-start: var(--tot-calendar-year-border-width, 2px) solid var(--tot-calendar-year-border-color, var(--tot-color-neutral-400, #94a3b8));
  }

  .date-cell--year-bottom {
    border-block-end-color: var(--tot-calendar-year-border-color, var(--tot-color-neutral-400, #94a3b8));
    border-block-end-width: var(--tot-calendar-year-border-width, 2px);
  }

  .date-cell--year-start {
    border-inline-start: var(--tot-calendar-year-border-width, 2px) solid var(--tot-calendar-year-border-color, var(--tot-color-neutral-400, #94a3b8));
  }

  .date-cell--year-end {
    border-inline-end-color: var(--tot-calendar-year-border-color, var(--tot-color-neutral-400, #94a3b8));
    border-inline-end-width: var(--tot-calendar-year-border-width, 2px);
  }

  .date-cell--weekend {
    background: var(--tot-calendar-weekend-background, var(--tot-color-sky-50, #f0f9ff));
  }

  .date-cell--selected {
    background: var(--tot-calendar-selected-background, var(--tot-color-primary-600, #0284c7));
  }

  .date {
    -webkit-appearance: none;
    appearance: none;
    align-items: center;
    background: transparent;
    border: 0;
    border-radius: 0;
    color: var(--tot-input-color, #1e293b);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    height: 100%;
    justify-content: center;
    line-height: 1;
    min-width: 0;
    padding: 0 var(--tot-spacing-2x-small, .25rem);
    position: relative;
    width: 100%;
  }

  .date:hover {
    background: var(--tot-calendar-date-background-hover, var(--tot-color-neutral-100, #f1f5f9));
    color: var(--tot-input-color-hover, #0f172a);
  }

  .date:focus-visible {
    outline: var(--tot-focus-ring, solid 3px hsl(198.6 88.7% 48.4% / 40%));
    outline-offset: calc(-1 * var(--tot-focus-ring-offset, 1px));
  }

  .date--weekend {
    color: var(--tot-calendar-weekend-color, var(--tot-color-sky-800, #075985));
  }

  .date--today::after {
    background: currentColor;
    border-radius: var(--tot-border-radius-pill, 999px);
    bottom: .1875rem;
    content: '';
    height: .1875rem;
    left: 50%;
    opacity: .55;
    position: absolute;
    transform: translateX(-50%);
    width: .1875rem;
  }

  .date--selected,
  .date--selected:hover {
    background: var(--tot-calendar-selected-background, var(--tot-color-primary-600, #0284c7));
    color: var(--tot-calendar-selected-color, var(--tot-color-neutral-0, #fff));
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .date--month-start {
    font-weight: var(--tot-font-weight-semibold, 600);
  }

  .measure-week {
    height: var(--tot-calendar-week-height, 2rem);
    left: -9999px;
    pointer-events: none;
    position: fixed;
    top: -9999px;
    visibility: hidden;
    width: 1px;
  }
`

const msPerDay = 24 * 60 * 60 * 1000
const totalRows = 240000
const centerRow = Math.floor(totalRows / 2)
const totalYearCells = 24000
const centerYearCell = Math.floor(totalYearCells / 2)
const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export class TotCalendar extends HTMLElement {
  static get observedAttributes() {
    return [
      'date',
      'weekstart',
      'no-input',
    ]
  }

  constructor() {
    super()
    this._getDayClasses = null
    this._getMonthClasses = null
    this._templateObserver = null
    this._baseWeekStartDay = 0
    this._rowHeight = 32
    this._yearCellWidth = 96
    this._baseYear = getDateParts(getTodayDay()).year
    this._visibleFirst = 0
    this._visibleLast = -1
    this._visibleYearFirst = 0
    this._visibleYearLast = -1
    this._rendered = false
    this._needsRender = false
    this._needsYearRender = true
    this._scrollFrame = 0
    this._yearScrollFrame = 0
    this._yearSyncClearTimer = 0
    this._ignoreYearScrollUntil = 0
    this._userYearScrollUntil = 0
    this._yearPointer = null
    this._resizeObserver = null
    this._dateUpdateSource = ''
    this._isSettingScroll = false
    this._isSettingYearScroll = false
    this._isSyncingFromYearScroller = false
    this._handleScroll = () => this.handleScroll()
    this._handleYearScroll = () => this.handleYearScroll()
    this._handleYearWheel = event => this.handleYearWheel(event)
    this._handleYearPointerDown = event => this.handleYearPointerDown(event)
    this._handleYearPointerMove = event => this.handleYearPointerMove(event)
    this._handleYearPointerUp = event => this.handleYearPointerUp(event)
    this._handleYearPointerCancel = event => this.handleYearPointerCancel(event)
    this._handleInput = event => this.handleInput(event)
    this._handleInputChange = event => this.handleInputChange(event)
    this._handleClick = event => this.handleClick(event)
    this._handleResize = () => this.handleResize()
  }

  get date() {
    const value = this.getAttribute('date') || ''
    return parseDate(value) === null ? '' : value
  }

  set date(value) {
    setNullableAttribute(this, 'date', normalizeDateValue(value))
  }

  get weekStart() {
    return normalizeWeekStart(this.getAttribute('weekstart'))
  }

  set weekStart(value) {
    this.setAttribute('weekstart', formatWeekStart(value))
  }

  get weekstart() {
    return this.weekStart
  }

  set weekstart(value) {
    this.weekStart = value
  }

  get noInput() {
    return this.hasAttribute('no-input')
  }

  set noInput(value) {
    setBooleanAttribute(this, 'no-input', value)
  }

  get getDayClasses() {
    return this._getDayClasses
  }

  set getDayClasses(value) {
    this._getDayClasses = typeof value === 'function' ? value : null
    this.scheduleRender(true)
  }

  get dayClasses() {
    return this._getDayClasses
  }

  set dayClasses(value) {
    this.getDayClasses = value
  }

  get dateClassProvider() {
    return this._getDayClasses
  }

  set dateClassProvider(value) {
    this.getDayClasses = value
  }

  get dateClasses() {
    return this._getDayClasses
  }

  set dateClasses(value) {
    this.getDayClasses = value
  }

  get getMonthClasses() {
    return this._getMonthClasses
  }

  set getMonthClasses(value) {
    this._getMonthClasses = typeof value === 'function' ? value : null
    this.scheduleRender(true)
  }

  get monthClasses() {
    return this._getMonthClasses
  }

  set monthClasses(value) {
    this.getMonthClasses = value
  }

  connectedCallback() {
    this.render()
    this.resetBaseWeek()

    const initialDate = this.date || formatDay(getTodayDay())
    this.renderRowsNearDate(initialDate)
    void this.scrollToDate(initialDate, {
      align: 'center',
      silent: true,
    })
    requestAnimationFrame(() => {
      void this.scrollToDate(initialDate, {
        align: 'center',
        silent: true,
      })
    })
  }

  disconnectedCallback() {
    this.cancelScrollFrame()
    this.cancelYearScrollFrame()
    this.clearYearSyncTimer()
    this.teardownResizeObserver()
    this.teardownTemplateObserver()
  }

  attributeChangedCallback(name) {
    if (!this.isConnected) {
      return
    }

    if (name === 'no-input') {
      this.updateInputVisibility()
      return
    }

    if (name === 'weekstart') {
      this.resetBaseWeek()
      this._needsRender = true
      this.updateWeekdayHeader()
      void this.scrollToDate(this.date || formatDay(getTodayDay()), {
        align: 'center',
        silent: true,
      })
      return
    }

    if (name === 'date') {
      this.updateInputValue()
      this.scheduleRender(true)

      if (this._dateUpdateSource !== 'click') {
        void this.scrollToDate(this.date || formatDay(getTodayDay()), {
          align: 'center',
          silent: true,
        })
      }
    }
  }

  focus(options) {
    const input = this.getInput()
    if (input && !this.noInput) {
      input.focus(options)
      return
    }

    const scroller = this.getScroller()
    if (scroller) {
      scroller.focus(options)
    }
  }

  async scrollToDate(date, options) {
    const targetDay = parseDate(date)
    if (targetDay === null) {
      return
    }

    this.scrollToDay(targetDay, options)
  }

  scrollToDay(targetDay, options) {
    if (!Number.isFinite(targetDay)) {
      return
    }

    const scroller = this.getScroller()
    if (!scroller) {
      return
    }

    this.updateRowHeight()

    const roundedTargetDay = Math.floor(targetDay)
    const targetWeekStartDay = getWeekStartDay(roundedTargetDay, this.weekStart)
    let weekOffset = Math.round((targetWeekStartDay - this._baseWeekStartDay) / 7)

    if (centerRow + weekOffset < 1000 || centerRow + weekOffset > totalRows - 1000) {
      this._baseWeekStartDay = targetWeekStartDay
      this._needsRender = true
      weekOffset = 0
    }

    const align = normalizeAlign(options)
    const targetAbsoluteRow = clamp(centerRow + weekOffset, 0, totalRows - 1)
    this.renderRowsNearAbsoluteRow(targetAbsoluteRow)

    const rowTop = targetAbsoluteRow * this._rowHeight
    let nextScrollTop = rowTop

    if (align === 'center') {
      nextScrollTop = rowTop - (scroller.clientHeight - this._rowHeight) / 2
    } else if (align === 'end') {
      nextScrollTop = rowTop - scroller.clientHeight + this._rowHeight
    } else if (align === 'nearest') {
      const currentTop = scroller.scrollTop
      const currentBottom = currentTop + scroller.clientHeight
      const rowBottom = rowTop + this._rowHeight
      if (rowTop >= currentTop && rowBottom <= currentBottom) {
        this.updateVisibleWeeks()
        if (!options?.skipYearSync) {
          this.syncYearScrollerToDays()
        }
        return
      }
      nextScrollTop = Math.abs(rowTop - currentTop) < Math.abs(rowBottom - currentBottom) ? rowTop : rowBottom - scroller.clientHeight
    }

    this._isSettingScroll = true
    scroller.scrollTop = clamp(nextScrollTop, 0, Math.max(0, totalRows * this._rowHeight - scroller.clientHeight))
    this._isSettingScroll = false
    this.updateVisibleWeeks()

    if (!options?.skipYearSync) {
      this.syncYearScrollerToDays()
    }
  }

  scrollToSelected(options) {
    return this.scrollToDate(this.date || formatDay(getTodayDay()), options)
  }

  scrollToTimelineDay(targetDay, options) {
    if (!Number.isFinite(targetDay)) {
      return
    }

    const scroller = this.getScroller()
    if (!scroller) {
      return
    }

    this.updateRowHeight()

    const targetWeekStartDay = getWeekStartDay(Math.floor(targetDay), this.weekStart)
    let weekOffset = Math.round((targetWeekStartDay - this._baseWeekStartDay) / 7)

    if (centerRow + weekOffset < 1000 || centerRow + weekOffset > totalRows - 1000) {
      this._baseWeekStartDay = targetWeekStartDay
      this._needsRender = true
      weekOffset = 0
    }

    const visibleDayCount = (scroller.clientHeight / Math.max(1, this._rowHeight)) * 7
    const targetRow = centerRow + (targetDay - this._baseWeekStartDay - visibleDayCount / 2) / 7
    const targetAbsoluteRow = clamp(Math.floor(centerRow + weekOffset), 0, totalRows - 1)
    this.renderRowsNearAbsoluteRow(targetAbsoluteRow)

    const nextScrollTop = clamp(
      targetRow * this._rowHeight,
      0,
      Math.max(0, totalRows * this._rowHeight - scroller.clientHeight),
    )

    this._isSettingScroll = true
    scroller.scrollTop = nextScrollTop
    this._isSettingScroll = false
    this.updateVisibleWeeks()

    if (!options?.skipYearSync) {
      this.syncYearScrollerToDays()
    }
  }


  getDay(value) {
    const day = parseDateInput(value)
    if (day === null) {
      return null
    }

    return getDayData(day)
  }

  getMonth(value) {
    const month = parseMonthInput(value)
    if (!month) {
      return null
    }

    return getMonthData(month.year, month.monthIndex, this.weekStart)
  }

  render() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' })
    root.innerHTML = `
      <style>${calendarStyle}</style>
      <div class="calendar" part="base">
        <div class="input-row" part="input-row">
          <tot-input class="input" part="input" placeholder="YYYY-MM-DD" clearable size="small"></tot-input>
        </div>
        <div class="year-scroller" part="year-scroller" tabindex="0" aria-label="Years">
          <div class="year-strip" part="year-strip"></div>
        </div>
        <div class="scroller" part="scroller" tabindex="0">
          <table class="table" part="table" aria-label="Calendar">
            <thead class="head" part="header">
              <tr class="weekday-row"></tr>
            </thead>
            <tbody class="body" part="body"></tbody>
          </table>
        </div>
        <div class="measure-week"></div>
      </div>
    `

    this._rendered = true
    this.updateInputVisibility()
    this.updateInputValue()
    this.updateWeekdayHeader()
    this.updateRowHeight()
    this.updateYearCellWidth()
    this.setupResizeObserver()
    this.teardownTemplateObserver()
    this.setupTemplateObserver()

    const input = this.getInput()
    const scroller = this.getScroller()

    if (input) {
      input.addEventListener('input', this._handleInput)
      input.addEventListener('change', this._handleInputChange)
    }

    if (scroller) {
      scroller.addEventListener('scroll', this._handleScroll, { passive: true })
      scroller.addEventListener('click', this._handleClick)
    }

    const yearScroller = this.getYearScroller()
    if (yearScroller) {
      yearScroller.addEventListener('scroll', this._handleYearScroll, { passive: true })
      yearScroller.addEventListener('wheel', this._handleYearWheel, { passive: false })
      yearScroller.addEventListener('pointerdown', this._handleYearPointerDown)
      yearScroller.addEventListener('pointermove', this._handleYearPointerMove)
      yearScroller.addEventListener('pointerup', this._handleYearPointerUp)
      yearScroller.addEventListener('pointercancel', this._handleYearPointerCancel)
      this.syncYearScrollerToDays(true)
    }
  }

  resetBaseWeek() {
    const selectedDay = parseDate(this.date)
    const baseDay = selectedDay === null ? getTodayDay() : selectedDay
    this._baseWeekStartDay = getWeekStartDay(baseDay, this.weekStart)
    this._baseYear = getDateParts(baseDay).year
    this._needsYearRender = true
  }

  handleInput(event) {
    this.applyInputValue(event.detail?.value ?? event.target?.value ?? '', false)
  }

  handleInputChange(event) {
    this.applyInputValue(event.detail?.value ?? event.target?.value ?? '', true)
  }

  applyInputValue(value, commit) {
    const trimmedValue = String(value || '').trim()

    if (trimmedValue === '') {
      this.clearDate('input')
      return
    }

    const day = parseDate(trimmedValue)
    if (day !== null) {
      this.selectDay(day, {
        scroll: true,
        source: 'input',
      })
      return
    }

    if (commit) {
      this.updateInputValue()
    }
  }

  handleClick(event) {
    const target = event.target?.closest?.('[data-date]')
    const scroller = this.getScroller()
    if (!target || !scroller || !scroller.contains(target)) {
      return
    }

    const day = parseDate(target.dataset.date)
    if (day === null) {
      return
    }

    this.selectDay(day, {
      scroll: false,
      source: 'click',
    })
  }

  handleScroll() {
    if (this._isSettingScroll) {
      return
    }

    this.scheduleRender()
  }

  handleYearScroll() {
    this.updateVisibleYears()
    this.updateYearHighlightsFromDays()

    if (this._isSettingYearScroll || Date.now() < this._ignoreYearScrollUntil) {
      return
    }

    this.scrollDaysToYearScroller()
  }

  handleYearWheel(event) {
    const scroller = this.getYearScroller()
    if (!scroller) {
      return
    }

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    if (!delta) {
      return
    }

    event.preventDefault()
    this.markUserYearScroll()
    scroller.scrollLeft += delta
    this.updateVisibleYears()
    this.scrollDaysToYearScroller()
  }

  handleYearPointerDown(event) {
    const scroller = this.getYearScroller()
    if (!scroller || event.button > 0) {
      return
    }

    this.markUserYearScroll(600)
    this._yearPointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      scrollLeft: scroller.scrollLeft,
    }
  }

  handleYearPointerMove(event) {
    if (!this._yearPointer || this._yearPointer.id !== event.pointerId) {
      return
    }

    this.markUserYearScroll(300)
  }

  handleYearPointerUp(event) {
    const state = this._yearPointer
    const scroller = this.getYearScroller()
    this._yearPointer = null

    if (!state || !scroller || state.id !== event.pointerId) {
      return
    }

    const moved = Math.hypot(event.clientX - state.x, event.clientY - state.y)
    const scrolled = Math.abs(scroller.scrollLeft - state.scrollLeft)
    this.markUserYearScroll(150)

    if (moved > 6 || scrolled > 3) {
      return
    }

    this.scrollDaysToYearClientX(event.clientX)
  }

  handleYearPointerCancel(event) {
    if (!this._yearPointer || this._yearPointer.id === event.pointerId) {
      this._yearPointer = null
    }
  }

  handleResize() {
    const scroller = this.getScroller()
    if (!scroller) {
      return
    }

    const oldRowHeight = this._rowHeight
    const oldWeekOffset = scroller.scrollTop / Math.max(1, oldRowHeight) - centerRow
    this.updateRowHeight()
    this.updateYearCellWidth()
    this._needsYearRender = true

    if (Math.abs(oldRowHeight - this._rowHeight) > .5) {
      this._isSettingScroll = true
      scroller.scrollTop = (centerRow + oldWeekOffset) * this._rowHeight
      this._isSettingScroll = false
      this._needsRender = true
    }

    this.scheduleRender()
    this.syncYearScrollerToDays()
  }

  selectDay(day, options) {
    const nextDate = formatDay(day)
    const previousDate = this.date
    this._dateUpdateSource = options?.source || ''
    this.setAttribute('date', nextDate)
    this._dateUpdateSource = ''

    if (previousDate === nextDate) {
      this.updateInputValue()
      this.scheduleRender(true)
    }

    if (options?.scroll) {
      void this.scrollToDate(nextDate, {
        align: 'center',
        silent: true,
      })
    }

    if (!options?.silent && previousDate !== nextDate) {
      emit(this, 'input', this.getEventDetail())
      emit(this, 'change', this.getEventDetail())
    }
  }

  clearDate(source) {
    const previousDate = this.date
    this._dateUpdateSource = source || ''
    this.removeAttribute('date')
    this._dateUpdateSource = ''
    this.updateInputValue()
    this.scheduleRender(true)

    if (previousDate) {
      emit(this, 'input', this.getEventDetail())
      emit(this, 'change', this.getEventDetail())
    }
  }

  updateVisibleWeeks() {
    if (!this._rendered) {
      return
    }

    const scroller = this.getScroller()
    const body = this.getBody()
    if (!scroller || !body) {
      return
    }

    this.updateRowHeight()
    this.recenterIfNeeded()

    const viewportHeight = scroller.clientHeight || 0
    const scrollTop = scroller.scrollTop
    const bufferRows = 8
    const firstAbsoluteRow = clamp(Math.floor(scrollTop / this._rowHeight) - bufferRows, 0, totalRows - 1)
    const lastAbsoluteRow = clamp(Math.ceil((scrollTop + viewportHeight) / this._rowHeight) + bufferRows, firstAbsoluteRow, totalRows - 1)
    const isYearDriven = this.isYearDrivingDays()

    this.updateStickyMonthHeader()

    if (firstAbsoluteRow === this._visibleFirst && lastAbsoluteRow === this._visibleLast && !this._needsRender) {
      if (isYearDriven) {
        this.updateVisibleYears()
        this.updateYearHighlightsFromDays()
      } else {
        this.syncYearScrollerToDays()
      }
      return
    }

    this._visibleFirst = firstAbsoluteRow
    this._visibleLast = lastAbsoluteRow
    this._needsRender = false
    this.renderRows(firstAbsoluteRow, lastAbsoluteRow)
    this.updateStickyMonthHeader()

    if (isYearDriven) {
      this.updateVisibleYears()
      this.updateYearHighlightsFromDays()
    } else {
      this.syncYearScrollerToDays()
    }
  }

  renderRowsNearDate(date) {
    const targetDay = parseDate(date)
    if (targetDay === null) {
      return
    }

    const targetWeekStartDay = getWeekStartDay(targetDay, this.weekStart)
    const weekOffset = Math.round((targetWeekStartDay - this._baseWeekStartDay) / 7)
    this.renderRowsNearAbsoluteRow(clamp(centerRow + weekOffset, 0, totalRows - 1))
  }

  renderRowsNearAbsoluteRow(absoluteRow) {
    const body = this.getBody()
    const scroller = this.getScroller()
    if (!body || !scroller) {
      return
    }

    this.updateRowHeight()

    const viewportRows = Math.max(8, Math.ceil((scroller.clientHeight || this._rowHeight * 8) / this._rowHeight))
    const bufferRows = 8
    const firstAbsoluteRow = clamp(absoluteRow - bufferRows, 0, totalRows - 1)
    const lastAbsoluteRow = clamp(absoluteRow + viewportRows + bufferRows, firstAbsoluteRow, totalRows - 1)

    this._visibleFirst = firstAbsoluteRow
    this._visibleLast = lastAbsoluteRow
    this._needsRender = false
    this.renderRows(firstAbsoluteRow, lastAbsoluteRow)
    this.updateStickyMonthHeader()

    if (this.isYearDrivingDays()) {
      this.updateVisibleYears()
      this.updateYearHighlightsFromDays()
    } else {
      this.syncYearScrollerToDays()
    }
  }

  renderRows(firstAbsoluteRow, lastAbsoluteRow) {
    const body = this.getBody()
    if (!body) {
      return
    }

    const topSpacerHeight = Math.max(0, firstAbsoluteRow * this._rowHeight)
    const bottomSpacerHeight = Math.max(0, (totalRows - lastAbsoluteRow - 1) * this._rowHeight)
    const firstWeekOffset = firstAbsoluteRow - centerRow
    const weekCount = lastAbsoluteRow - firstAbsoluteRow + 1
    const groups = getMonthGroups(this._baseWeekStartDay, firstWeekOffset, weekCount, this.weekStart)
    const selectedDay = parseDate(this.date)
    const todayDay = getTodayDay()
    const templates = getCellTemplates(this)
    const fragment = document.createDocumentFragment()

    body.innerHTML = ''
    fragment.append(createSpacerRow('top', topSpacerHeight))

    for (let rowIndex = 0; rowIndex < weekCount; rowIndex++) {
      const absoluteRow = firstAbsoluteRow + rowIndex
      const weekStartDay = this._baseWeekStartDay + (absoluteRow - centerRow) * 7
      const monthGroup = groups.get(rowIndex)
      const rowElement = document.createElement('tr')

      rowElement.className = monthGroup ? 'week-row week-row--month-start' : 'week-row'
      rowElement.style.height = `${this._rowHeight}px`

      if (monthGroup) {
        rowElement.append(this.getMonthCellElement(monthGroup, templates))
      }

      for (let column = 0; column < 7; column++) {
        const day = weekStartDay + column
        rowElement.append(this.getDayCellElement(day, selectedDay, todayDay, column, templates))
      }

      fragment.append(rowElement)
    }

    fragment.append(createSpacerRow('bottom', bottomSpacerHeight))
    body.append(fragment)
  }

  getDayCellElement(day, selectedDay, todayDay, column, templates) {
    const dateParts = getDateParts(day)
    const dayData = getDayData(day, dateParts)
    const features = getDayFeatures(day, dateParts, selectedDay, todayDay, this.weekStart, column)
    Object.assign(dayData, features)
    const customClasses = normalizeClassList(this._getDayClasses ? this._getDayClasses(dayData, features) : [])
    const cellClasses = ['date-cell']
    const cellParts = ['date-cell']
    const contentClasses = ['date']
    const contentParts = ['date']
    const template = templates.get('cell-day')

    if (features.bordersMonthTop) {
      cellClasses.push('date-cell--month-top')
      cellParts.push('month-top-date-cell')
    }

    if (features.bordersMonthBottom) {
      cellClasses.push('date-cell--month-bottom')
      cellParts.push('month-bottom-date-cell')
    }

    if (features.bordersMonthLeft) {
      cellClasses.push('date-cell--month-start')
      cellParts.push('month-start-date-cell')
    }

    if (features.bordersMonthRight) {
      cellClasses.push('date-cell--month-end')
      cellParts.push('month-end-date-cell')
    }

    if (features.bordersYearTop) {
      cellClasses.push('date-cell--year-top')
      cellParts.push('year-top-date-cell')
    }

    if (features.bordersYearBottom) {
      cellClasses.push('date-cell--year-bottom')
      cellParts.push('year-bottom-date-cell')
    }

    if (features.bordersYearLeft) {
      cellClasses.push('date-cell--year-start')
      cellParts.push('year-start-date-cell')
    }

    if (features.bordersYearRight) {
      cellClasses.push('date-cell--year-end')
      cellParts.push('year-end-date-cell')
    }

    if (features.isMonthStart) {
      contentClasses.push('date--month-start')
      contentParts.push('month-start-date')
    }

    if (features.isWeekend) {
      cellClasses.push('date-cell--weekend')
      cellParts.push('weekend-date-cell')
      contentClasses.push('date--weekend')
      contentParts.push('weekend-date')
    }

    if (features.isToday) {
      contentClasses.push('date--today')
      contentParts.push('today-date')
    }

    if (features.isSelected) {
      cellClasses.push('date-cell--selected')
      cellParts.push('selected-date-cell')
      contentClasses.push('date--selected')
      contentParts.push('selected-date')
    }

    for (let i = 0; i < customClasses.length; i++) {
      contentClasses.push(customClasses[i])
      contentParts.push(customClasses[i])
    }

    if (template) {
      const cell = renderDayTemplate(template, {
        cellClasses,
        cellParts,
        contentClasses,
        contentParts,
        customClasses,
        day: dayData,
        features,
      })
      this.applyDayCellData(cell, dayData, features, customClasses)
      return cell
    }

    const cell = document.createElement('td')
    const button = document.createElement('button')

    cell.className = cellClasses.join(' ')
    cell.part = cellParts.join(' ')
    cell.dataset.date = dayData.date
    button.className = contentClasses.join(' ')
    button.part = contentParts.join(' ')
    button.type = 'button'
    button.dataset.date = dayData.date
    button.setAttribute('aria-label', formatReadableDate(day))
    button.setAttribute('aria-pressed', features.isSelected ? 'true' : 'false')
    button.textContent = String(dayData.dayOfMonth)
    this.applyDayCellData(cell, dayData, features, customClasses)
    applyTemplateProps(button, {
      day: dayData,
      dayData,
      features,
      classes: customClasses,
      dayClasses: customClasses,
    })
    cell.append(button)
    return cell
  }

  getMonthCellElement(monthGroup, templates) {
    const monthData = monthGroup.month
    const features = getMonthFeatures(monthData, monthGroup)
    const customClasses = normalizeClassList(this._getMonthClasses ? this._getMonthClasses(monthData, features) : [])
    const cellClasses = ['month']
    const cellParts = ['month']
    const template = templates.get('cell-month')

    if (features.bordersMonthTop) {
      cellClasses.push('month--month-top')
      cellParts.push('month-top')
    }

    if (features.bordersMonthBottom) {
      cellClasses.push('month--month-bottom')
      cellParts.push('month-bottom')
    }

    if (features.bordersYearTop) {
      cellClasses.push('month--year-top')
      cellParts.push('year-top')
    }

    if (features.bordersYearBottom) {
      cellClasses.push('month--year-bottom')
      cellParts.push('year-bottom')
    }

    for (let i = 0; i < customClasses.length; i++) {
      cellClasses.push(customClasses[i])
      cellParts.push(customClasses[i])
    }

    if (template) {
      const cell = renderMonthTemplate(template, {
        cellClasses,
        cellParts,
        customClasses,
        month: monthData,
        features,
      })
      cell.rowSpan = monthGroup.rows
      this.applyMonthCellData(cell, monthData, features, customClasses)
      return cell
    }

    const cell = document.createElement('th')
    const label = document.createElement('span')

    cell.className = cellClasses.join(' ')
    cell.part = cellParts.join(' ')
    cell.scope = 'rowgroup'
    cell.rowSpan = monthGroup.rows
    label.className = 'month__label'
    label.textContent = monthData.label
    cell.append(label)
    this.applyMonthCellData(cell, monthData, features, customClasses)
    return cell
  }

  applyDayCellData(cell, day, features, classes) {
    cell.dataset.date = day.date
    applyTemplateProps(cell, {
      day,
      dayData: day,
      features,
      classes,
      dayClasses: classes,
    })
  }

  applyMonthCellData(cell, month, features, classes) {
    cell.dataset.month = month.date
    applyTemplateProps(cell, {
      month,
      monthData: month,
      features,
      classes,
      monthClasses: classes,
    })
  }

  scheduleRender(force) {
    if (force) {
      this._needsRender = true
    }

    if (this._scrollFrame) {
      return
    }

    this._scrollFrame = requestAnimationFrame(() => {
      this._scrollFrame = 0
      this.updateVisibleWeeks()
    })
  }

  cancelScrollFrame() {
    if (!this._scrollFrame) {
      return
    }

    cancelAnimationFrame(this._scrollFrame)
    this._scrollFrame = 0
  }

  cancelYearScrollFrame() {
    if (!this._yearScrollFrame) {
      return
    }

    cancelAnimationFrame(this._yearScrollFrame)
    this._yearScrollFrame = 0
  }

  recenterIfNeeded() {
    const scroller = this.getScroller()
    if (!scroller) {
      return
    }

    const currentAbsoluteRow = Math.floor(scroller.scrollTop / this._rowHeight)
    if (currentAbsoluteRow > 2000 && currentAbsoluteRow < totalRows - 2000) {
      return
    }

    const currentWeekOffset = currentAbsoluteRow - centerRow
    const rowRemainder = scroller.scrollTop - currentAbsoluteRow * this._rowHeight
    this._baseWeekStartDay += currentWeekOffset * 7
    this._needsRender = true
    this._isSettingScroll = true
    scroller.scrollTop = centerRow * this._rowHeight + rowRemainder
    this._isSettingScroll = false
  }

  syncYearScrollerToDays(force) {
    const yearScroller = this.getYearScroller()
    if (!yearScroller) {
      return
    }

    this.updateYearCellWidth()

    if (this._isSyncingFromYearScroller) {
      this.updateVisibleYears(force)
      this.updateYearHighlightsFromDays()
      return
    }

    const range = this.getVisibleDayRange()
    const targetLeft = this.getYearScrollLeftForDay(range.centerDay) - yearScroller.clientWidth / 2
    const maxScrollLeft = Math.max(0, totalYearCells * this._yearCellWidth - yearScroller.clientWidth)
    const nextScrollLeft = clamp(targetLeft, 0, maxScrollLeft)

    if (force || Math.abs(yearScroller.scrollLeft - nextScrollLeft) > 1) {
      this._isSettingYearScroll = true
      this._ignoreYearScrollUntil = 0
      yearScroller.scrollLeft = nextScrollLeft
      requestAnimationFrame(() => {
        this._isSettingYearScroll = false
      })
    }

    this.updateVisibleYears(force)
    this.updateYearHighlightsFromDays()
  }

  scrollDaysToYearScroller() {
    const yearScroller = this.getYearScroller()
    if (!yearScroller) {
      return
    }

    this.updateYearCellWidth()
    this.recenterYearsIfNeeded()

    const centerPosition = yearScroller.scrollLeft + yearScroller.clientWidth / 2
    const targetDay = this.getDayForYearPosition(centerPosition)

    this._isSyncingFromYearScroller = true
    this.scrollToTimelineDay(targetDay, {
      skipYearSync: true,
    })
    this._isSyncingFromYearScroller = false
    this.updateVisibleYears()
    this.updateYearHighlightsFromDays()
  }

  scrollDaysToYearClientX(clientX) {
    const yearScroller = this.getYearScroller()
    if (!yearScroller) {
      return
    }

    this.updateYearCellWidth()
    this.recenterYearsIfNeeded()

    const rect = yearScroller.getBoundingClientRect()
    const position = yearScroller.scrollLeft + clientX - rect.left
    const maxScrollLeft = Math.max(0, totalYearCells * this._yearCellWidth - yearScroller.clientWidth)
    const nextScrollLeft = clamp(position - yearScroller.clientWidth / 2, 0, maxScrollLeft)

    this._isSettingYearScroll = true
    this._ignoreYearScrollUntil = 0
    yearScroller.scrollLeft = nextScrollLeft
    requestAnimationFrame(() => {
      this._isSettingYearScroll = false
    })

    this.updateVisibleYears()
    this.scrollDaysToYearScroller()
  }

  getDayForYearPosition(position) {
    const rawOffset = position / Math.max(1, this._yearCellWidth) - centerYearCell
    const yearOffset = Math.floor(rawOffset)
    const progress = clamp(rawOffset - yearOffset, 0, .999999)
    const year = this._baseYear + yearOffset
    const startDay = getMonthStartDay(year, 0)

    return startDay + progress * getYearDayCount(year)
  }

  getYearScrollLeftForDay(day) {
    const parts = getDateParts(Math.floor(day))
    let yearOffset = parts.year - this._baseYear

    if (centerYearCell + yearOffset < 1000 || centerYearCell + yearOffset > totalYearCells - 1000) {
      this._baseYear = parts.year
      this._needsYearRender = true
      yearOffset = 0
    }

    const yearStartDay = getMonthStartDay(parts.year, 0)
    const progress = clamp((day - yearStartDay) / getYearDayCount(parts.year), 0, .999999)
    return (centerYearCell + yearOffset + progress) * this._yearCellWidth
  }

  updateVisibleYears(force) {
    const yearScroller = this.getYearScroller()
    const strip = this.getYearStrip()
    if (!yearScroller || !strip) {
      return
    }

    this.updateYearCellWidth()
    this.recenterYearsIfNeeded()

    const fullWidth = Math.max(yearScroller.clientWidth, totalYearCells * this._yearCellWidth)
    strip.style.width = `${Math.round(fullWidth)}px`

    const bufferCells = 4
    const firstIndex = clamp(Math.floor(yearScroller.scrollLeft / this._yearCellWidth) - bufferCells, 0, totalYearCells - 1)
    const lastIndex = clamp(Math.ceil((yearScroller.scrollLeft + yearScroller.clientWidth) / this._yearCellWidth) + bufferCells, firstIndex, totalYearCells - 1)

    if (!force && !this._needsYearRender && firstIndex === this._visibleYearFirst && lastIndex === this._visibleYearLast) {
      this.updateYearHighlightsFromDays()
      return
    }

    this._visibleYearFirst = firstIndex
    this._visibleYearLast = lastIndex
    this._needsYearRender = false
    this.renderYears(firstIndex, lastIndex)
    this.updateYearHighlightsFromDays()
  }

  renderYears(firstIndex, lastIndex) {
    const strip = this.getYearStrip()
    if (!strip) {
      return
    }

    const selectedDay = parseDate(this.date)
    const selectedYear = selectedDay === null ? null : getDateParts(selectedDay).year
    const fragment = document.createDocumentFragment()

    strip.innerHTML = ''

    for (let index = firstIndex; index <= lastIndex; index++) {
      const year = this._baseYear + index - centerYearCell
      const cell = document.createElement('div')
      const highlight = document.createElement('span')
      const today = document.createElement('span')
      const label = document.createElement('span')

      cell.className = year === selectedYear ? 'year-cell year-cell--selected' : 'year-cell'
      cell.part = year === selectedYear ? 'year-cell selected-year-cell' : 'year-cell'
      cell.dataset.year = String(year)
      cell.style.left = `${index * this._yearCellWidth}px`
      cell.style.width = `${this._yearCellWidth}px`
      highlight.className = 'year-cell__highlight'
      highlight.part = 'year-highlight'
      today.className = 'year-cell__today'
      today.part = 'year-today'
      today.hidden = true
      label.className = 'year-cell__label'
      label.part = 'year-label'
      label.textContent = formatYearLabel(year)
      cell.append(highlight, today, label)
      fragment.append(cell)
    }

    strip.append(fragment)
  }

  updateYearHighlightsFromDays() {
    const cells = this.shadowRoot?.querySelectorAll('.year-cell')
    if (!cells || cells.length === 0) {
      return
    }

    const range = this.getVisibleDayRange()
    const visibleStart = range.startDay
    const visibleEnd = range.endDay
    const todayMoment = getCurrentDayMoment()
    const todayYear = getDateParts(Math.floor(todayMoment)).year

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i]
      const year = Number(cell.dataset.year)
      const highlight = cell.querySelector('.year-cell__highlight')
      const today = cell.querySelector('.year-cell__today')
      if (!highlight || !Number.isFinite(year)) {
        continue
      }

      const yearStart = getMonthStartDay(year, 0)
      const yearEnd = getMonthStartDay(year + 1, 0)
      const start = clamp((visibleStart - yearStart) / (yearEnd - yearStart), 0, 1)
      const end = clamp((visibleEnd - yearStart) / (yearEnd - yearStart), 0, 1)

      if (end <= 0 || start >= 1 || end <= start) {
        highlight.hidden = true
      } else {
        highlight.hidden = false
        highlight.style.left = `${start * 100}%`
        highlight.style.width = `${(end - start) * 100}%`
      }

      if (today) {
        today.hidden = year !== todayYear
        if (year === todayYear) {
          today.style.left = `${clamp((todayMoment - yearStart) / (yearEnd - yearStart), 0, 1) * 100}%`
        }
      }
    }
  }

  recenterYearsIfNeeded() {
    const yearScroller = this.getYearScroller()
    if (!yearScroller) {
      return
    }

    const currentIndex = Math.floor(yearScroller.scrollLeft / Math.max(1, this._yearCellWidth))
    if (currentIndex > 1000 && currentIndex < totalYearCells - 1000) {
      return
    }

    const yearOffset = currentIndex - centerYearCell
    const remainder = yearScroller.scrollLeft - currentIndex * this._yearCellWidth
    this._baseYear += yearOffset
    this._needsYearRender = true
    this._isSettingYearScroll = true
    this._ignoreYearScrollUntil = 0
    yearScroller.scrollLeft = centerYearCell * this._yearCellWidth + remainder
    requestAnimationFrame(() => {
      this._isSettingYearScroll = false
    })
  }

  scheduleYearToDaySync() {
    this.updateVisibleYears()
    this.scrollDaysToYearScroller()
  }

  markUserYearScroll(duration = 200) {
    this._userYearScrollUntil = Date.now() + duration
  }

  isUserYearScrollActive() {
    return Date.now() < this._userYearScrollUntil
  }

  beginYearDrivenSync() {
    this.clearYearSyncTimer()
    this._isSyncingFromYearScroller = true
    this._yearSyncClearTimer = window.setTimeout(() => {
      this._isSyncingFromYearScroller = false
      this._yearSyncClearTimer = 0
    }, 180)
  }

  clearYearSyncTimer() {
    if (!this._yearSyncClearTimer) {
      return
    }

    window.clearTimeout(this._yearSyncClearTimer)
    this._yearSyncClearTimer = 0
  }

  isYearDrivingDays() {
    return this._isSyncingFromYearScroller
  }

  getVisibleDayRange() {
    const scroller = this.getScroller()
    if (!scroller) {
      const day = parseDate(this.date) || getTodayDay()
      return {
        startDay: day - 14,
        centerDay: day,
        endDay: day + 14,
      }
    }

    this.updateRowHeight()

    const rowHeight = Math.max(1, this._rowHeight)
    const scrollTop = scroller.scrollTop
    const visibleRowCount = scroller.clientHeight / rowHeight
    const startDay = this._baseWeekStartDay + (scrollTop / rowHeight - centerRow) * 7
    const endDay = startDay + visibleRowCount * 7

    return {
      startDay,
      centerDay: (startDay + endDay) / 2,
      endDay,
    }
  }

  updateYearCellWidth() {
    const yearScroller = this.getYearScroller()
    const width = yearScroller?.clientWidth || 0
    const nextWidth = width > 0 ? width / 10 : 72
    this._yearCellWidth = Math.max(48, nextWidth)
  }

  updateWeekdayHeader() {
    const row = this.shadowRoot?.querySelector('.weekday-row')
    if (!row) {
      return
    }

    let html = '<th class="month-head" part="month-header" aria-hidden="true"></th>'
    const weekStart = this.weekStart

    for (let i = 0; i < 7; i++) {
      const dayOfWeek = (weekStart + i) % 7
      html += `<th class="weekday" part="weekday" scope="col">${weekdayNames[dayOfWeek]}</th>`
    }

    row.innerHTML = html
    this.updateStickyMonthHeader()
  }

  updateStickyMonthHeader() {
  }

  updateInputValue() {
    const input = this.getInput()
    if (!input) {
      return
    }

    const rawValue = this.getAttribute('date') || ''
    input.value = parseDate(rawValue) === null ? rawValue : this.date
  }

  updateInputVisibility() {
    const row = this.shadowRoot?.querySelector('.input-row')
    if (row) {
      row.hidden = this.noInput
    }
  }

  updateRowHeight() {
    const measure = this.shadowRoot?.querySelector('.measure-week')
    const measuredHeight = measure?.getBoundingClientRect?.().height || 0
    this._rowHeight = measuredHeight > 0 ? measuredHeight : 32
  }

  setupResizeObserver() {
    this.teardownResizeObserver()

    if (typeof ResizeObserver === 'undefined') {
      return
    }

    const scroller = this.getScroller()
    if (!scroller) {
      return
    }

    this._resizeObserver = new ResizeObserver(this._handleResize)
    this._resizeObserver.observe(scroller)
  }

  teardownResizeObserver() {
    if (!this._resizeObserver) {
      return
    }

    this._resizeObserver.disconnect()
    this._resizeObserver = null
  }

  setupTemplateObserver() {
    if (typeof MutationObserver === 'undefined') {
      return
    }

    this._templateObserver = new MutationObserver(() => {
      this.scheduleRender(true)
    })
    this._templateObserver.observe(this, {
      attributes: true,
      childList: true,
      subtree: true,
    })
  }

  teardownTemplateObserver() {
    if (!this._templateObserver) {
      return
    }

    this._templateObserver.disconnect()
    this._templateObserver = null
  }

  getInput() {
    return this.shadowRoot?.querySelector('tot-input')
  }

  getYearScroller() {
    return this.shadowRoot?.querySelector('.year-scroller')
  }

  getYearStrip() {
    return this.shadowRoot?.querySelector('.year-strip')
  }

  getScroller() {
    return this.shadowRoot?.querySelector('.scroller')
  }

  getBody() {
    return this.shadowRoot?.querySelector('.body')
  }

  getEventDetail() {
    return {
      date: this.date,
      value: this.date,
      weekStart: this.weekStart,
    }
  }
}

function getMonthGroups(baseWeekStartDay, firstWeekOffset, weekCount, weekStart) {
  const groups = new Map()
  let rowIndex = 0

  while (rowIndex < weekCount) {
    const weekStartDay = baseWeekStartDay + (firstWeekOffset + rowIndex) * 7
    const key = getWeekMonthKey(weekStartDay)
    let endIndex = rowIndex + 1

    while (endIndex < weekCount) {
      const nextWeekStartDay = baseWeekStartDay + (firstWeekOffset + endIndex) * 7
      if (getWeekMonthKey(nextWeekStartDay) !== key) {
        break
      }
      endIndex += 1
    }

    const parts = getDateParts(weekStartDay)
    const month = getMonthData(parts.year, parts.month, weekStart)
    groups.set(rowIndex, {
      label: month.label,
      month,
      rows: endIndex - rowIndex,
      firstRow: rowIndex,
      lastRow: endIndex - 1,
      weekStartDay,
      startsVisibleRange: rowIndex === 0,
      endsVisibleRange: endIndex === weekCount,
    })
    rowIndex = endIndex
  }

  return groups
}

function getWeekMonthKey(weekStartDay) {
  const parts = getDateParts(weekStartDay)
  return `${parts.year}-${parts.month}`
}

function getMonthData(year, monthIndex, weekStart) {
  const startDay = getMonthStartDay(year, monthIndex)
  const endDay = getMonthEndDay(year, monthIndex)
  const weekStartDay = getWeekStartDay(startDay, weekStart)
  const weekEndStartDay = getWeekStartDay(endDay, weekStart)

  return {
    date: `${String(year).padStart(4, '0')}-${String(monthIndex + 1).padStart(2, '0')}`,
    label: monthNames[monthIndex],
    yearLabel: `${monthNames[monthIndex]} ${year}`,
    year,
    month: monthIndex + 1,
    monthIndex,
    monthName: monthNames[monthIndex],
    startDay,
    startDate: formatDay(startDay),
    endDay,
    endDate: formatDay(endDay),
    weekStart,
    weekStartDay,
    weekEndStartDay,
    weekRowCount: Math.round((weekEndStartDay - weekStartDay) / 7) + 1,
  }
}

function getMonthFeatures(month, group) {
  return {
    year: month.year,
    month: month.month,
    monthIndex: month.monthIndex,
    rows: group.rows,
    firstRow: group.firstRow,
    lastRow: group.lastRow,
    startsVisibleRange: group.startsVisibleRange,
    endsVisibleRange: group.endsVisibleRange,
    isYearStart: month.monthIndex === 0,
    isYearEnd: month.monthIndex === 11,
    bordersMonthTop: !group.startsVisibleRange,
    bordersMonthBottom: !group.endsVisibleRange,
    bordersYearTop: !group.startsVisibleRange && month.monthIndex === 0,
    bordersYearBottom: !group.endsVisibleRange && month.monthIndex === 11,
    bordersPreviousMonthTop: !group.startsVisibleRange,
    bordersNextMonthTop: false,
    bordersPreviousMonthBottom: false,
    bordersNextMonthBottom: !group.endsVisibleRange,
    bordersPreviousYearTop: !group.startsVisibleRange && month.monthIndex === 0,
    bordersNextYearTop: false,
    bordersPreviousYearBottom: false,
    bordersNextYearBottom: !group.endsVisibleRange && month.monthIndex === 11,
    bordersMonthLeft: false,
    bordersMonthRight: false,
    bordersYearLeft: false,
    bordersYearRight: false,
    bordersPreviousMonthLeft: false,
    bordersNextMonthLeft: false,
    bordersPreviousMonthRight: false,
    bordersNextMonthRight: false,
    bordersPreviousYearLeft: false,
    bordersNextYearLeft: false,
    bordersPreviousYearRight: false,
    bordersNextYearRight: false,
  }
}

function getDayData(day, dateParts = getDateParts(day)) {
  const dayOfWeek = getDayOfWeek(day)

  return {
    date: formatDay(day),
    day,
    year: dateParts.year,
    month: dateParts.month + 1,
    monthIndex: dateParts.month,
    monthName: monthNames[dateParts.month],
    dayOfMonth: dateParts.day,
    dayOfWeek,
    weekdayName: weekdayNames[dayOfWeek],
  }
}

function getDayFeatures(day, dateParts, selectedDay, todayDay, weekStart, column) {
  const dayData = getDayData(day, dateParts)
  const features = {
    weekStart,
    column,
    isWeekend: dayData.dayOfWeek === 0 || dayData.dayOfWeek === 6,
    isSelected: selectedDay !== null && selectedDay === day,
    isToday: todayDay === day,
    isMonthStart: dateParts.day === 1,
    isMonthEnd: !isSameMonth(day + 1, dateParts),
    isYearStart: dateParts.month === 0 && dateParts.day === 1,
    isYearEnd: dateParts.month === 11 && !isSameMonth(day + 1, dateParts),
  }

  appendDayBoundaryFeatures(features, day, day - 7, 'Top')
  appendDayBoundaryFeatures(features, day, day + 7, 'Bottom')

  if (column > 0) {
    appendDayBoundaryFeatures(features, day, day - 1, 'Left')
  } else {
    clearBoundaryFeatures(features, 'Left')
  }

  if (column < 6) {
    appendDayBoundaryFeatures(features, day, day + 1, 'Right')
  } else {
    clearBoundaryFeatures(features, 'Right')
  }

  return features
}

function appendDayBoundaryFeatures(features, day, neighborDay, side) {
  const current = getDateParts(day)
  const neighbor = getDateParts(neighborDay)
  const monthComparison = compareYearMonth(neighbor, current)
  const yearComparison = Math.sign(neighbor.year - current.year)

  features[`bordersMonth${side}`] = monthComparison !== 0
  features[`bordersYear${side}`] = yearComparison !== 0
  features[`bordersPreviousMonth${side}`] = monthComparison < 0
  features[`bordersNextMonth${side}`] = monthComparison > 0
  features[`bordersPreviousYear${side}`] = yearComparison < 0
  features[`bordersNextYear${side}`] = yearComparison > 0
}


function clearBoundaryFeatures(features, side) {
  features[`bordersMonth${side}`] = false
  features[`bordersYear${side}`] = false
  features[`bordersPreviousMonth${side}`] = false
  features[`bordersNextMonth${side}`] = false
  features[`bordersPreviousYear${side}`] = false
  features[`bordersNextYear${side}`] = false
}

function compareYearMonth(a, b) {
  if (a.year !== b.year) {
    return Math.sign(a.year - b.year)
  }

  return Math.sign(a.month - b.month)
}

function getMonthStartDay(year, monthIndex) {
  return Math.floor(Date.UTC(year, monthIndex, 1) / msPerDay)
}

function getMonthEndDay(year, monthIndex) {
  return Math.floor(Date.UTC(year, monthIndex + 1, 0) / msPerDay)
}

function getYearDayCount(year) {
  return getMonthStartDay(year + 1, 0) - getMonthStartDay(year, 0)
}

function parseDateInput(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.floor(value)
  }

  if (value instanceof Date) {
    return Math.floor(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()) / msPerDay)
  }

  if (value && typeof value === 'object' && Number.isFinite(value.day)) {
    return Math.floor(value.day)
  }

  return parseDate(value)
}

function parseMonthInput(value) {
  if (value instanceof Date) {
    return {
      year: value.getFullYear(),
      monthIndex: value.getMonth(),
    }
  }

  if (value && typeof value === 'object') {
    const year = Number(value.year)
    const monthIndex = value.monthIndex === undefined ? Number(value.month) - 1 : Number(value.monthIndex)
    if (Number.isInteger(year) && Number.isInteger(monthIndex) && monthIndex >= 0 && monthIndex <= 11) {
      return { year, monthIndex }
    }
  }

  const normalizedValue = String(value || '').trim()
  const match = /^(\d{4})-(\d{2})(?:-\d{2})?$/.exec(normalizedValue)
  if (!match) {
    return null
  }

  const year = Number(match[1])
  const monthIndex = Number(match[2]) - 1
  if (!Number.isInteger(year) || monthIndex < 0 || monthIndex > 11) {
    return null
  }

  return { year, monthIndex }
}

function createSpacerRow(type, height) {
  const row = document.createElement('tr')
  const cell = document.createElement('td')

  row.className = `spacer spacer--${type}`
  row.setAttribute('aria-hidden', 'true')
  cell.className = 'spacer-cell'
  cell.colSpan = 8
  cell.style.height = `${Math.round(height)}px`
  row.append(cell)
  return row
}

function getCellTemplates(element) {
  const templates = new Map()
  const nodes = element.querySelectorAll('template[slot], template[data-slot]')

  for (let i = 0; i < nodes.length; i++) {
    const name = nodes[i].getAttribute('slot') || nodes[i].dataset.slot || ''
    if (name === 'cell-day' || name === 'cell-month') {
      templates.set(name, nodes[i])
    }
  }

  return templates
}

function renderDayTemplate(template, context) {
  const fragment = template.content.cloneNode(true)
  hydrateCalendarTemplate(fragment, getDayTemplateValues(context), {
    day: context.day,
    dayData: context.day,
    features: context.features,
    classes: context.customClasses,
    dayClasses: context.customClasses,
  })
  const cell = getTemplateTableCell(fragment, 'td')

  if (cell) {
    cell.className = mergeClassNames(context.cellClasses, cell.className)
    cell.part = mergePartNames(context.cellParts, cell.part)
    cell.dataset.date = context.day.date
    cell.remove()
    if (fragment.childNodes.length > 0) {
      cell.append(fragment)
    }
    return cell
  }

  const wrapper = document.createElement('td')
  wrapper.className = context.cellClasses.join(' ')
  wrapper.part = context.cellParts.join(' ')
  wrapper.dataset.date = context.day.date
  wrapper.append(fragment)
  return wrapper
}

function renderMonthTemplate(template, context) {
  const fragment = template.content.cloneNode(true)
  hydrateCalendarTemplate(fragment, getMonthTemplateValues(context), {
    month: context.month,
    monthData: context.month,
    features: context.features,
    classes: context.customClasses,
    monthClasses: context.customClasses,
  })
  const cell = getTemplateTableCell(fragment, 'th')

  if (cell) {
    cell.className = mergeClassNames(context.cellClasses, cell.className)
    cell.part = mergePartNames(context.cellParts, cell.part)
    cell.dataset.month = context.month.date
    cell.remove()
    if (fragment.childNodes.length > 0) {
      cell.append(fragment)
    }
    return cell
  }

  const wrapper = document.createElement('th')
  wrapper.className = context.cellClasses.join(' ')
  wrapper.part = context.cellParts.join(' ')
  wrapper.scope = 'rowgroup'
  wrapper.dataset.month = context.month.date
  wrapper.append(fragment)
  return wrapper
}

function getTemplateTableCell(fragment, localName) {
  for (let i = 0; i < fragment.childNodes.length; i++) {
    const node = fragment.childNodes[i]
    if (node.nodeType === Node.ELEMENT_NODE && node.localName === localName) {
      return node
    }
  }

  return null
}

function hydrateCalendarTemplate(node, values, props) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT)

  while (walker.nextNode()) {
    const current = walker.currentNode

    if (current.nodeType === Node.TEXT_NODE) {
      current.nodeValue = replaceTemplateTokens(current.nodeValue, values)
      continue
    }

    if (current.nodeType === Node.ELEMENT_NODE) {
      const attributes = Array.from(current.attributes)
      for (let i = 0; i < attributes.length; i++) {
        current.setAttribute(attributes[i].name, replaceTemplateTokens(attributes[i].value, values))
      }
      applyTemplateProps(current, props)
    }
  }
}

function applyTemplateProps(element, props) {
  const keys = Object.keys(props)
  for (let i = 0; i < keys.length; i++) {
    element[keys[i]] = props[keys[i]]
  }
}

function getDayTemplateValues(context) {
  return {
    date: context.day.date,
    label: context.day.dayOfMonth,
    day: context.day,
    dayData: context.day,
    features: context.features,
    classes: context.customClasses.join(' '),
    dayClasses: context.customClasses.join(' '),
    cellClasses: context.cellClasses.join(' '),
    cellParts: context.cellParts.join(' '),
    contentClasses: context.contentClasses.join(' '),
    contentParts: context.contentParts.join(' '),
  }
}

function getMonthTemplateValues(context) {
  return {
    date: context.month.date,
    label: context.month.label,
    yearLabel: context.month.yearLabel,
    month: context.month,
    monthData: context.month,
    features: context.features,
    classes: context.customClasses.join(' '),
    monthClasses: context.customClasses.join(' '),
    cellClasses: context.cellClasses.join(' '),
    cellParts: context.cellParts.join(' '),
  }
}

function replaceTemplateTokens(value, values) {
  return String(value).replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (match, key) => {
    const result = getPath(values, key)
    if (result === undefined) {
      return match
    }

    if (Array.isArray(result)) {
      return result.join(' ')
    }

    return result === null ? '' : String(result)
  })
}

function getPath(value, path) {
  const parts = String(path || '').split('.')
  let current = value

  for (let i = 0; i < parts.length; i++) {
    if (current === null || current === undefined || !Object.prototype.hasOwnProperty.call(Object(current), parts[i])) {
      return undefined
    }
    current = current[parts[i]]
  }

  return current
}

function mergeClassNames(defaultClasses, className) {
  const result = defaultClasses.slice()
  appendClasses(result, className)
  return result.join(' ')
}

function mergePartNames(defaultParts, partName) {
  const result = defaultParts.slice()
  appendClasses(result, partName)
  return result.join(' ')
}

function parseDate(value) {
  const normalizedValue = String(value || '').trim()
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(normalizedValue)
  if (!match) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))

  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return null
  }

  return Math.floor(date.getTime() / msPerDay)
}

function normalizeDateValue(value) {
  if (value === null || value === undefined || value === '') {
    return null
  }

  return String(value)
}

function formatDay(day) {
  const date = new Date(day * msPerDay)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const dayOfMonth = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${dayOfMonth}`
}

function formatReadableDate(day) {
  const parts = getDateParts(day)
  return `${monthNames[parts.month]} ${parts.day}, ${parts.year}`
}

function formatYearLabel(year) {
  if (year >= 0 && year <= 9999) {
    return String(year).padStart(4, '0')
  }

  return String(year)
}

function getDateParts(day) {
  const date = new Date(day * msPerDay)
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate(),
  }
}

function getTodayDay() {
  return Math.floor(getCurrentDayMoment())
}

function getCurrentDayMoment() {
  const now = new Date()
  const startOfLocalDay = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / msPerDay
  const elapsed = now.getHours() * 60 * 60 * 1000
    + now.getMinutes() * 60 * 1000
    + now.getSeconds() * 1000
    + now.getMilliseconds()
  return startOfLocalDay + elapsed / msPerDay
}

function getDayOfWeek(day) {
  return new Date(day * msPerDay).getUTCDay()
}

function getWeekStartDay(day, weekStart) {
  const dayOfWeek = getDayOfWeek(day)
  const offset = (dayOfWeek - weekStart + 7) % 7
  return day - offset
}

function isFirstDayOfMonth(day) {
  return getDateParts(day).day === 1
}

function isSameMonth(day, dateParts) {
  const otherParts = getDateParts(day)
  return otherParts.year === dateParts.year && otherParts.month === dateParts.month
}

function normalizeWeekStart(value) {
  const normalizedValue = String(value || 'monday').trim().toLowerCase()
  const names = {
    sunday: 0,
    sun: 0,
    monday: 1,
    mon: 1,
    tuesday: 2,
    tue: 2,
    tues: 2,
    wednesday: 3,
    wed: 3,
    thursday: 4,
    thu: 4,
    thur: 4,
    thurs: 4,
    friday: 5,
    fri: 5,
    saturday: 6,
    sat: 6,
  }

  if (Object.prototype.hasOwnProperty.call(names, normalizedValue)) {
    return names[normalizedValue]
  }

  const numericValue = Number(normalizedValue)
  if (Number.isInteger(numericValue) && numericValue >= 0 && numericValue <= 6) {
    return numericValue
  }

  return 1
}

function formatWeekStart(value) {
  const normalizedValue = normalizeWeekStart(value)
  return weekdayNames[normalizedValue].toLowerCase()
}

function normalizeAlign(options) {
  const value = typeof options === 'string' ? options : options?.align
  const supportedValues = ['start', 'center', 'end', 'nearest']

  for (let i = 0; i < supportedValues.length; i++) {
    if (supportedValues[i] === value) {
      return value
    }
  }

  return 'start'
}

function normalizeClassList(value) {
  const result = []
  appendClasses(result, value)
  return result
}

function appendClasses(result, value) {
  if (!value) {
    return
  }

  if (typeof value === 'string') {
    const parts = value.split(/\s+/)
    for (let i = 0; i < parts.length; i++) {
      appendClass(result, parts[i])
    }
    return
  }

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      appendClasses(result, value[i])
    }
    return
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value)
    for (let i = 0; i < keys.length; i++) {
      if (value[keys[i]]) {
        appendClass(result, keys[i])
      }
    }
  }
}

function appendClass(result, value) {
  const className = String(value || '').trim()
  if (!/^[-_a-zA-Z][-_a-zA-Z0-9]*$/.test(className)) {
    return
  }

  for (let i = 0; i < result.length; i++) {
    if (result[i] === className) {
      return
    }
  }

  result.push(className)
}

function setBooleanAttribute(element, name, value) {
  if (value === true || value === '' || value === name) {
    element.setAttribute(name, '')
  } else {
    element.removeAttribute(name)
  }
}

function setNullableAttribute(element, name, value) {
  if (value === null || value === undefined) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, String(value))
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function emit(element, name, detail) {
  element.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    composed: true,
    detail: detail || {},
  }))
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (match) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return replacements[match]
  })
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;')
}
