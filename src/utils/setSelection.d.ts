/**
 * Selects a text range inside an element.
 *
 * Offsets are measured across all descendant text nodes. `-1` means the end
 * of the element text.
 */
export function setSelection(
  element: HTMLElement | null,
  start: number,
  end?: number,
): void
