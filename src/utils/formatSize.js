const kibibyte = 1024
const mebibyte = kibibyte * 1024
const gibibyte = mebibyte * 1024

/**
 * Formats a byte count with a compact binary unit label.
 *
 * @param {number} bytes Size in bytes.
 * @returns {string} Formatted size using B, KB, MB, or GB.
 */
export function formatSize(bytes) {
  const absoluteBytes = Math.abs(bytes)
  if (absoluteBytes < kibibyte) return `${bytes} B`
  if (absoluteBytes < mebibyte) return `${(bytes / kibibyte).toFixed(1)} KB`
  if (absoluteBytes < gibibyte) return `${(bytes / mebibyte).toFixed(1)} MB`
  return `${(bytes / gibibyte).toFixed(2)} GB`
}
