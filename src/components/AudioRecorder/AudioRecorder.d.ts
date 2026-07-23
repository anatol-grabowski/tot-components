/**
 * `<tot-audio-recorder>` - a microphone recorder based on `MediaRecorder`,
 * with pause/resume controls, a live waveform, and playback through
 * `<tot-audio-player>`. While a recording session is active, it holds a
 * screen wake lock when supported to help prevent the device from locking or
 * sleeping. Recording continues if the browser denies or releases the lock.
 */
export type TotAudioRecorder = {
  props: {
    /**
     * Preferred `MediaRecorder` MIME type. The browser default is used when it
     * is empty or unsupported. @default ''
     */
    mimeType: string

    /** Current recorder lifecycle state. */
    readonly state: 'inactive' | 'starting' | 'recording' | 'paused'

    /** Most recently completed recording, or `null`. */
    readonly blob: Blob | null

    /**
     * Current object URL for the completed recording, or an empty string. The
     * URL can change after the component is disconnected and reconnected.
     */
    readonly url: string

    /** Duration of the most recently completed recording in seconds. @default 0 */
    readonly duration: number
  }

  methods: {
    startRecording(): Promise<void>
    togglePause(): void
    stopRecording(): void
    abortRecording(): void
    clearRecording(): void
    isRecordingInProgress(): boolean
    getElapsedSeconds(): number
    getMediaRecorder(): MediaRecorder | null
    getMediaStream(): MediaStream | null
    getPlayer(): HTMLElement | null
  }

  /**
   * Start, pause, resume, abort, and clear events carry no detail.
   * `recording-abort` is emitted after an aborted session has been cleaned up.
   * `recording-stop` provides the completed blob, its current object URL, and
   * duration. Aborting restores the previous completed recording and emits no
   * stop or clear event.
   */
  events: {
    'recording-start': Event
    'recording-pause': Event
    'recording-resume': Event
    'recording-abort': Event
    'recording-clear': Event
    'recording-stop': CustomEvent<{
      blob: Blob
      url: string
      duration: number
    }>
    'recording-error': CustomEvent<{
      message: string
    }>
  }

  slots: {}

  /**
   * ```text
   * base — complete recorder
   * ├─ controls
   * │  ├─ record-button
   * │  ├─ pause-button — changes to resume while paused
   * │  ├─ stop-button
   * │  └─ clear-button — changes to abort while starting or recording
   * └─ display
   *    ├─ waveform-container
   *    │  ├─ waveform — live or idle canvas
   *    │  └─ overlay
   *    │     ├─ status
   *    │     └─ time
   *    └─ playback — contains a `<tot-audio-player>` after recording
   * ```
   */
  parts:
    | 'base'
    | 'controls'
    | 'record-button'
    | 'pause-button'
    | 'stop-button'
    | 'clear-button'
    | 'display'
    | 'waveform-container'
    | 'waveform'
    | 'overlay'
    | 'status'
    | 'time'
    | 'playback'
}
