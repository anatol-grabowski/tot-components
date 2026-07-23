/**
 * `<tot-textarea>` - a multiline field based on a native `<textarea>` with an
 * optional fullscreen editor.
 */
export type TotTextarea = {
  props: {
    /** @default '' */
    value: string

    /** Fallback used when the `label` slot is empty. @default '' */
    label: string

    /** Fallback used when the `help-text` slot is empty. @default '' */
    helpText: string

    /** @default '' */
    placeholder: string

    /**
     * Textarea sizing behavior: `default` uses regular native sizing, `auto`
     * uses `field-sizing: content`, and `none` hides the resize handle.
     * @default 'default'
     */
    size: 'default' | 'auto' | 'none'

    /** Native textarea row count. @default 3 */
    rows: number

    /** @default false */
    disabled: boolean

    /** Whether the fullscreen editor is currently open. */
    readonly fullscreen: boolean
  }

  /** Focus, blur, and selection methods forward to the current native textarea. */
  methods: {
    focus(options?: FocusOptions): void
    blur(): void
    select(): void
    openFullscreen(): void
    closeFullscreen(): void
    getInlineTextarea(): HTMLTextAreaElement | null
    getFullscreenTextarea(): HTMLTextAreaElement | null
  }

  /**
   * `input` and `change` are native textarea events forwarded across the shadow
   * boundary. `reset` and `fullscreen-change` carry no detail; read `value` or
   * `fullscreen` from the component after the event.
   */
  events: {
    input: Event
    change: Event
    reset: Event
    'fullscreen-change': Event
  }

  /** Slotted nodes receive no added attributes or slot props. */
  slots: {
    label: undefined
    'help-text': undefined
  }

  /**
   * ```text
   * base — main field wrapper
   * ├─ label
   * ├─ control — bordered textarea surface
   * │  ├─ textarea — native inline textarea
   * │  └─ fullscreen-button
   * └─ help-text
   * fullscreen — fullscreen editor overlay
   * ├─ reset-button
   * ├─ close-fullscreen-button
   * └─ fullscreen-textarea — native fullscreen textarea
   * ```
   *
   * `fullscreen` is a sibling of `base` because it is a fixed overlay rather
   * than part of the normal field layout.
   */
  parts:
    | 'base'
    | 'label'
    | 'control'
    | 'textarea'
    | 'fullscreen-button'
    | 'help-text'
    | 'fullscreen'
    | 'reset-button'
    | 'close-fullscreen-button'
    | 'fullscreen-textarea'
}
