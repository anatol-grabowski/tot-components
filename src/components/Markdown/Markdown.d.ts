/**
 * `<tot-markdown>` - a sanitized markdown preview rendered inside a native
 * `<article>`, with Pandoc extensions, streaming state, named placeholders,
 * and an optional fullscreen view.
 */
export type TotMarkdown = {
  props: {
    /** Markdown source. Set through the property or `value` attribute. @default '' */
    value: string

    /** @default '' */
    label: string

    /** @default '' */
    helpText: string

    /** Enables supported Pandoc syntax and `{slot=...}` placeholders. @default false */
    pandoc: boolean

    /** Shows streaming indicators and a caret after the rendered output. @default false */
    streaming: boolean

    /** Whether the fullscreen preview is currently open. */
    readonly fullscreen: boolean
  }

  methods: {
    openFullscreen(): void
    closeFullscreen(): void
  }

  /** Carries no detail; read `fullscreen` from the component. */
  events: {
    'fullscreen-change': Event
  }

  /**
   * Named slots replace Pandoc placeholders such as
   * `[fallback]{slot="answer" key="expected"}`. Unslotted light-DOM content is
   * ignored and cannot be used as the markdown source.
   *
   * `fullscreen-footer` is reserved for controls or status content shown at
   * the bottom of the fullscreen view. It is not available as a Pandoc
   * placeholder name.
   *
   * Slotted nodes receive no copied attributes or slot props. A generated
   * placeholder `HTMLSlotElement` has `data-markdown-slot` and, when `key` was
   * provided, `data-markdown-key`; a slotted element can read them through
   * `element.assignedSlot?.dataset`.
   */
  slots: {
    'fullscreen-footer': undefined
    [name: string]: undefined
  }

  /**
   * ```text
   * base — main preview wrapper
   * ├─ label
   * ├─ preview — native article preview
   * │  ├─ content — rendered markdown
   * │  ├─ streaming-indicator
   * │  └─ fullscreen-button
   * └─ help-text
   * fullscreen — fullscreen preview overlay
   * ├─ fullscreen-streaming-indicator
   * ├─ close-fullscreen-button
   * ├─ fullscreen-content — rendered markdown while fullscreen
   * └─ fullscreen-footer — reserved `fullscreen-footer` slot container
   * ```
   *
   * `fullscreen` is a sibling of `base` because it is a fixed overlay rather
   * than part of the normal preview layout.
   */
  parts:
    | 'base'
    | 'label'
    | 'preview'
    | 'content'
    | 'streaming-indicator'
    | 'fullscreen-button'
    | 'help-text'
    | 'fullscreen'
    | 'fullscreen-streaming-indicator'
    | 'close-fullscreen-button'
    | 'fullscreen-content'
    | 'fullscreen-footer'
}
