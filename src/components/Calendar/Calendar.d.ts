/**
 * `<tot-calendar>` - an infinitely scrolling, windowed calendar with a linked
 * year timeline, typed date entry, and touch or Ctrl+wheel zooming.
 */
export type TotCalendar = {
  props: {
    /** Selected date in `YYYY-MM-DD` format. An empty string means no selection. @default '' */
    date: string

    /**
     * First day of the week, where `0` is Sunday and `6` is Saturday. The
     * `weekstart` attribute also accepts full or abbreviated English weekday
     * names. @default 1
     */
    weekStart: 0 | 1 | 2 | 3 | 4 | 5 | 6

    /** Hides the compact date input above the calendar. @default false */
    noInput: boolean

    /**
     * Optional class callback for visible day cells. Returned class names are
     * applied to the inner day button and are also exposed as CSS parts so they
     * can be styled outside the shadow root. @default null
     */
    getDayClasses: ((
      day: {
        /** ISO date. */
        date: string
        /** Integer day number used internally by the timeline. */
        day: number
        year: number
        /** One-based month. */
        month: number
        /** Zero-based month. */
        monthIndex: number
        monthName: string
        shortMonthName: string
        dayOfMonth: number
        /** `0` is Sunday and `6` is Saturday. */
        dayOfWeek: number
        weekdayName: string
      },
      features: {
        weekStart: number
        column: number
        columnCount: number
        weeksPerRow: number
        isCompact: boolean
        isWeekend: boolean
        isSelected: boolean
        isToday: boolean
        isMonthStart: boolean
        isMonthEnd: boolean
        isYearStart: boolean
        isYearEnd: boolean
      } & Partial<Record<
        `borders${'Month' | 'Year' | 'PreviousMonth' | 'NextMonth' | 'PreviousYear' | 'NextYear'}${'Top' | 'Bottom' | 'Left' | 'Right'}`,
        boolean
      >>,
    ) => string | string[] | Record<string, boolean> | null | undefined) | null

    /**
     * Optional class callback for visible month-label cells. Returned class
     * names are applied to the month cell and exposed as CSS parts. @default null
     */
    getMonthClasses: ((
      month: {
        /** Month in `YYYY-MM` format. */
        date: string
        label: string
        shortLabel: string
        yearLabel: string
        year: number
        /** One-based month. */
        month: number
        /** Zero-based month. */
        monthIndex: number
        monthName: string
        shortMonthName: string
        startDay: number
        startDate: string
        endDay: number
        endDate: string
        weekStart: number
        weekStartDay: number
        weekEndStartDay: number
        weekRowCount: number
      },
      features: {
        year: number
        month: number
        monthIndex: number
        rows: number
        firstRow: number
        lastRow: number
        weeksPerRow: number
        isCompact: boolean
        startsVisibleRange: boolean
        endsVisibleRange: boolean
        isYearStart: boolean
        isYearEnd: boolean
      } & Partial<Record<
        `borders${'Month' | 'Year' | 'PreviousMonth' | 'NextMonth' | 'PreviousYear' | 'NextYear'}${'Top' | 'Bottom' | 'Left' | 'Right'}`,
        boolean
      >>,
    ) => string | string[] | Record<string, boolean> | null | undefined) | null
  }

  methods: {
    /** Focuses the date input, or the calendar scroller when `noInput` is set. */
    focus(options?: FocusOptions): void

    /** Scrolls an ISO date into view. Invalid dates are ignored. */
    scrollToDate(
      date: string,
      options?: ScrollLogicalPosition | { align?: ScrollLogicalPosition },
    ): void

    /** Scrolls the selected date, or today when there is no selection, into view. */
    scrollToSelected(
      options?: ScrollLogicalPosition | { align?: ScrollLogicalPosition },
    ): void

    getInput(): HTMLElement | null
    getYearScroller(): HTMLElement | null
    getYearStrip(): HTMLElement | null
    getScroller(): HTMLElement | null
    getBody(): HTMLTableSectionElement | null
  }

  /**
   * `input` and `change` are emitted after the selected date changes or is
   * cleared. Events from the internal text field do not leak through while the
   * user is typing an incomplete date.
   */
  events: {
    input: CustomEvent<{
      date: string
      /** Compatibility alias of `date`. */
      value: string
      weekStart: number
    }>
    change: CustomEvent<{
      date: string
      /** Compatibility alias of `date`. */
      value: string
      weekStart: number
    }>
  }

  /**
   * Both slots accept a `<template>` and are cloned only for visible windowed
   * cells. If the day template starts with `<td>`, or the month template with
   * `<th>`, that cell is used directly; otherwise the component supplies the
   * table cell wrapper.
   *
   * `cell-day` supports `{{date}}`, `{{label}}`, `{{day.*}}`,
   * `{{features.*}}`, `{{classes}}`, `{{cellClasses}}`, `{{cellParts}}`,
   * `{{contentClasses}}`, and `{{contentParts}}`. Each cloned element also
   * receives `day`, `dayData`, `features`, `classes`, and `dayClasses`
   * properties.
   *
   * `cell-month` supports `{{date}}`, `{{label}}`, `{{shortLabel}}`,
   * `{{yearLabel}}`, `{{month.*}}`, `{{features.*}}`, `{{classes}}`,
   * `{{cellClasses}}`, and `{{cellParts}}`. Each cloned element also receives
   * `month`, `monthData`, `features`, `classes`, and `monthClasses` properties.
   */
  slots: {
    'cell-day': undefined
    'cell-month': undefined
  }

  /**
   * Class names returned by `getDayClasses` and `getMonthClasses` are also
   * exposed as dynamic parts with the exact same names.
   *
   * ```text
   * base
   * ├─ input-row
   * │  └─ input — `<tot-input>`
   * ├─ year-scroller
   * │  └─ year-strip
   * │     └─ year-cell — repeated visible year
   * │        ├─ year-highlight
   * │        ├─ year-today
   * │        └─ year-label
   * └─ scroller
   *    └─ table
   *       ├─ header
   *       │  ├─ month-header
   *       │  └─ weekday — repeated weekday heading
   *       └─ body
   *          ├─ month — repeated row-group label
   *          └─ date-cell
   *             └─ date — native day button
   * ```
   */
  parts:
    | 'base'
    | 'input-row'
    | 'input'
    | 'year-scroller'
    | 'year-strip'
    | 'year-cell'
    | 'selected-year-cell'
    | 'year-highlight'
    | 'year-today'
    | 'year-label'
    | 'scroller'
    | 'table'
    | 'header'
    | 'month-header'
    | 'weekday'
    | 'body'
    | 'month'
    | 'month-top'
    | 'month-bottom'
    | 'year-top'
    | 'year-bottom'
    | 'date-cell'
    | 'month-top-date-cell'
    | 'month-bottom-date-cell'
    | 'month-start-date-cell'
    | 'month-end-date-cell'
    | 'year-top-date-cell'
    | 'year-bottom-date-cell'
    | 'year-start-date-cell'
    | 'year-end-date-cell'
    | 'weekend-date-cell'
    | 'selected-date-cell'
    | 'date'
    | 'month-start-date'
    | 'weekend-date'
    | 'today-date'
    | 'selected-date'
    | (string & {})
}
