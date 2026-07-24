/**
 * Starts a browser download for in-memory data.
 *
 * @param {BlobPart} data Download contents.
 * @param {string} filename Suggested file name.
 * @param {string} [mimeType='application/octet-stream'] MIME type for the generated blob.
 * @returns {void}
 */
export function downloadFile(data, filename, mimeType = 'application/octet-stream') {
  if (typeof globalThis.document === 'undefined') {
    throw new Error('File downloads require a browser document')
  }

  const url = URL.createObjectURL(new Blob([data], { type: mimeType }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.hidden = true
  ;(document.body || document.documentElement).append(link)
  link.click()
  link.remove()

  setTimeout(() => URL.revokeObjectURL(url), 0)
}
