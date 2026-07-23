/**
 * `<tot-divider>` - a horizontal or vertical visual separator.
 */
export type TotDivider = {
  props: {
    /** Uses vertical orientation instead of the default horizontal line. @default false */
    vertical: boolean
  }

  methods: {
    /** Returns the element carrying the separator role and visible border. */
    getSeparator(): HTMLElement | null
  }

  events: {}
  slots: {}

  /** `base` is the complete line and native separator-role element. */
  parts: 'base'
}
