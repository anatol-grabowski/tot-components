const combiningMarksPattern = /\p{M}+/gu
const punctuationPattern = /[\s\p{P}]+/gu

/**
 * Converts text to a lowercase, diacritic-insensitive representation.
 *
 * @param {string} value Text to normalize.
 * @returns {string} Normalized text.
 */
export function normalizeString(value) {
  return value
    .normalize('NFD')
    .replace(combiningMarksPattern, '')
    .toLowerCase()
    .replace(/ł/g, 'l')
    .replace(/ß/g, 'ss')
    .replace(/æ/g, 'ae')
    .replace(/ґ/g, 'г')
}

/**
 * Removes punctuation and whitespace from text.
 *
 * @param {string} value Text to clean.
 * @returns {string} Text containing only non-punctuation characters.
 */
export function dropPunctuation(value) {
  return value.replace(punctuationPattern, '')
}
