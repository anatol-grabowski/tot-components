/**
 * Decompresses gzip-compressed data with the Compression Streams API.
 *
 * @param {ArrayBuffer} compressed Gzip-compressed bytes.
 * @returns {Promise<ArrayBuffer>} Decompressed bytes.
 */
export async function decompressGzip(compressed) {
  if (typeof globalThis.DecompressionStream !== 'function') {
    throw new Error('Gzip decompression is not supported in this environment')
  }

  const stream = new Blob([compressed])
    .stream()
    .pipeThrough(new DecompressionStream('gzip'))

  return new Response(stream).arrayBuffer()
}
