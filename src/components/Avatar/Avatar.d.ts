/**
 * `<tot-avatar>` - an avatar based on a native `<img>` with initials and icon fallbacks.
 */
export type TotAvatar = {
  props: {
    /** Image URL. A failed image falls back to initials or the icon slot. @default '' */
    image: string

    /** Up to two visible fallback characters. @default '' */
    initials: string

    /** Accessible name. An avatar without one is treated as decorative. @default '' */
    label: string

    /** @default 'medium' */
    size: 'small' | 'medium' | 'large'

    /** @default 'circle' */
    shape: 'circle' | 'square' | 'rounded'

    /** Native image loading behavior. @default 'eager' */
    loading: 'eager' | 'lazy'
  }

  methods: {
    getImage(): HTMLImageElement
  }

  events: {}

  /** Replaces the final icon fallback. */
  slots: {
    icon: undefined
  }

  /**
   * ```text
   * base — avatar container
   * ├─ image — native image when it loads successfully
   * ├─ initials — fallback when initials are provided
   * └─ icon — final fallback and `icon` slot
   * ```
   */
  parts: 'base' | 'image' | 'initials' | 'icon'
}
