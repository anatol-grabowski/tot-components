/**
 * `<tot-audio-player>` - a compact waveform player backed by a native
 * `<audio>` element.
 */
export type TotAudioPlayer = {
  props: {
    /** Audio URL. @default '' */
    src: string

    /**
     * Blob source. Setting this creates an internal object URL; setting `null`
     * clears the source. A later `src` assignment clears the blob reference.
     * @default null
     */
    blob: Blob | null
  }

  /** Playback methods forward to the native audio element. */
  methods: {
    play(): Promise<void>
    pause(): void

    /** Seeks to a time in seconds, clamped to the loaded duration. */
    seek(time: number): void
    getAudio(): HTMLAudioElement | null
    getWaveform(): HTMLCanvasElement | null
  }

  /**
   * `play`, `pause`, and `ended` mirror state events from the native audio
   * element. `loaded` reports its metadata duration. `seek` is emitted after a
   * pointer or keyboard seek. `error` reports loading or playback failures.
   */
  events: {
    play: Event
    pause: Event
    ended: Event
    loaded: CustomEvent<{
      duration: number
    }>
    seek: CustomEvent<{
      time: number
    }>
    error: CustomEvent<{
      message: string
    }>
  }

  slots: {}

  /**
   * ```text
   * base — complete audio player
   * ├─ play-button — play/pause button
   * ├─ waveform — seekable canvas with slider semantics
   * ├─ time — current time and duration
   * └─ audio — hidden native audio element
   * ```
   */
  parts: 'base' | 'play-button' | 'waveform' | 'time' | 'audio'
}
