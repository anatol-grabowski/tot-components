function clampOffset(offset, length) {
  if (offset === -1) return length
  return Math.min(Math.max(offset, 0), length)
}

function findTextPosition(element, targetOffset) {
  const walker = element.ownerDocument.createTreeWalker(element, 4)
  let remaining = targetOffset
  let node = walker.nextNode()

  while (node) {
    const length = node.nodeValue?.length || 0
    if (remaining <= length) {
      return { node, offset: remaining }
    }
    remaining -= length
    node = walker.nextNode()
  }

  return {
    node: element,
    offset: element.childNodes.length,
  }
}

/**
 * Selects a text range inside an element.
 *
 * Offsets are measured across all descendant text nodes. `-1` means the end
 * of the element text.
 *
 * @param {HTMLElement | null} element Element containing the text.
 * @param {number} start Selection start offset.
 * @param {number} [end=start] Selection end offset.
 * @returns {void}
 */
export function setSelection(element, start, end = start) {
  if (!element) return

  const documentValue = element.ownerDocument
  const selection = documentValue.defaultView?.getSelection()
  if (!selection) return

  const textLength = element.textContent?.length || 0
  const startOffset = clampOffset(start, textLength)
  const endOffset = clampOffset(end, textLength)
  const from = Math.min(startOffset, endOffset)
  const to = Math.max(startOffset, endOffset)
  const startPosition = findTextPosition(element, from)
  const endPosition = findTextPosition(element, to)
  const range = documentValue.createRange()

  range.setStart(startPosition.node, startPosition.offset)
  range.setEnd(endPosition.node, endPosition.offset)
  selection.removeAllRanges()
  selection.addRange(range)
}
