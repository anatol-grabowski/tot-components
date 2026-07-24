/**
 * Computes a SHA-256 digest and returns lowercase hexadecimal text.
 *
 * @param {ArrayBuffer} data Binary data to hash.
 * @returns {Promise<string>} A 64-character hexadecimal digest.
 */
export async function computeHash(data) {
  const subtle = globalThis.crypto?.subtle
  if (!subtle) {
    throw new Error('SHA-256 hashing is not supported in this environment')
  }

  const digest = new Uint8Array(await subtle.digest('SHA-256', data))
  let hash = ''
  for (let i = 0; i < digest.length; i++) {
    hash += digest[i].toString(16).padStart(2, '0')
  }
  return hash
}
