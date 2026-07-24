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
     * Optional class callback for visible days. Returned names are applied
     * verbatim to the native day button and exposed through the day-template
     * class tokens. They are not converted into CSS parts. @default null
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
     * Optional class callback for visible month-label cells. Returned names are
     * applied verbatim to the month cell and exposed through the month-template
     * class tokens. They are not converted into CSS parts. @default null
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
   * `{{contentClasses}}`, and `{{contentParts}}`. `cellParts` is the stable
   * `day-cell` part and `contentParts` is `day`; state and callback output are
   * represented by classes instead. Each cloned element also receives `day`,
   * `dayData`, `features`, `classes`, and `dayClasses` properties.
   *
   * `cell-month` supports `{{date}}`, `{{label}}`, `{{shortLabel}}`,
   * `{{yearLabel}}`, `{{month.*}}`, `{{features.*}}`, `{{classes}}`,
   * `{{cellClasses}}`, and `{{cellParts}}`. `cellParts` is the stable
   * `month-cell` part. Each cloned element also receives `month`, `monthData`,
   * `features`, `classes`, and `monthClasses` properties.
   */
  slots: {
    'cell-day': undefined
    'cell-month': undefined
  }

  /**
   * Parts expose only stable structural elements. Calendar state uses classes
   * inside the shadow tree rather than a separate part for every combination.
   *
   * Built-in structural classes are `.calendar`, `.input-row`, `.input`,
   * `.year-scroller`, `.year-strip`, `.year-cell`, `.scroller`, `.table`,
   * `.head`, `.weekday`, `.body`, `.week-row`, `.month-cell`, `.month-cell__label`,
   * `.day-cell`, and `.day`.
   *
   * State classes are `.is-selected`, `.is-today`, `.is-weekend`,
   * `.is-month-start`, `.is-month-end`, `.is-month-top`, `.is-month-bottom`,
   * `.is-year-start`, `.is-year-end`, `.is-year-top`, and `.is-year-bottom`.
   * Their meaning depends on the structural element carrying them. Callback
   * classes are appended unchanged to `.day` or `.month-cell`. Since these classes
   * are inside the shadow root, use the template class tokens for custom cell
   * markup; use the generic parts below for page-level structural styling.
   *
   * ```text
   * base
   * ├─ input — `<tot-input>`
   * ├─ year-scroller
   * │  └─ year-cell — repeated visible year
   * └─ scroller
   *    └─ table
   *       ├─ header
   *       │  └─ weekday — repeated weekday heading
   *       └─ body
   *          ├─ month-cell — repeated row-group label
   *          └─ day-cell
   *             └─ day — native day button
   * ```
   */
  parts:
    | 'base'
    | 'input'
    | 'year-scroller'
    | 'year-cell'
    | 'scroller'
    | 'table'
    | 'header'
    | 'weekday'
    | 'body'
    | 'month-cell'
    | 'day-cell'
    | 'day'

}
