/** A response state accepted by the `responses` property. */
export type TotExerciseResponseInput = {
  /**
   * Stable identifier generated from `task`, `problem`, `type`, and `side`.
   * It may be omitted when assigning responses if those four fields are present.
   */
  responseId?: string

  /** Task containing this problem. */
  task: string

  /** Problem identifier inside the task. */
  problem: string

  type: 'input' | 'choice' | 'match'

  /** Problem role or match column. */
  side: string

  /**
   * Text for `input`, the selected option for `choice`, or the paired
   * response's `responseId` for `match`. `null` means unanswered.
   */
  value: string | null
}

/** Complete response state returned by the `responses` property. */
export type TotExerciseResponse = TotExerciseResponseInput & {
  responseId: string
  correct: boolean
}

/**
 * `<tot-exercise>` - an interactive exercise renderer built from Pandoc-style
 * markdown placeholders and native text inputs and buttons.
 *
 * A **task** groups related problems under one instruction or interaction set.
 * Match controls only connect responses from the same task. A **problem** is one
 * answer within that task; matching placeholders with the same task and problem
 * form the correct pair. **Side** distinguishes the roles or columns of a match
 * task, such as `word` and `definition`; only different sides can be paired.
 *
 * Supported problem types:
 * - `input`: a text gap. Use `key` for the correct answer.
 * - `choice`: an inline choice list. Use `options` and `key`.
 * - `match`: a selectable match endpoint. Use equal `task` and `problem` values
 *   for correct counterparts and different `side` values for their roles.
 *
 * Example placeholders:
 * ```text
 * []{task=1 problem=1 slot=input key="writes"}
 * []{task=2 problem=1 slot=choice key="is" options='["is", "are"]'}
 * [harbor]{task=3 problem=1 slot=match side=word}
 * []{task=3 problem=1 slot=match side=definition}
 * ```
 */
export type TotExercise = {
  props: {
    /** Exercise markdown. Set through the property or `value` attribute. @default '' */
    value: string

    /**
     * Current response state. Reading returns one complete response per problem
     * placeholder. Assign a previously saved array to restore answers; assignments
     * do not emit `change`.
     *
     * ```js
     * exercise.addEventListener('change', () => save(exercise.responses))
     * exercise.responses = load()
     * ```
     */
    responses: TotExerciseResponse[] | TotExerciseResponseInput[]

    /** Passed to the nested markdown preview. @default '' */
    label: string

    /** Passed to the nested markdown preview. @default '' */
    helpText: string

    /** Shows the nested markdown streaming state. @default false */
    streaming: boolean
  }

  methods: {
    /** Reveals validation feedback for every problem and emits `validate`. */
    validate(): void

    reset(): void
  }

  /**
   * `change` is emitted after user response changes. `validate` is emitted
   * after all validation feedback is revealed. `reset` is emitted before the
   * reset-triggered `change`. These events carry no detail; read `responses`
   * from the component.
   */
  events: {
    change: Event
    validate: Event
    reset: Event
  }

  /** The component has no public slots; light-DOM exercise source is ignored. */
  slots: {}

  /**
   * ```text
   * base — complete exercise
   * ├─ markdown — nested `<tot-markdown>` with interactive placeholder controls
   * ├─ footer — validate/hide-all and reset controls
   * └─ fullscreen-footer — matching controls slotted into markdown fullscreen
   * ```
   */
  parts: 'base' | 'markdown' | 'footer' | 'fullscreen-footer'
}
