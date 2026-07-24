/**
 * Decompresses gzip-compressed data with the Compression Streams API.
 *
 * Throws when the host does not support `DecompressionStream`.
 */
export function decompressGzip(compressed: ArrayBuffer): Promise<ArrayBuffer>
