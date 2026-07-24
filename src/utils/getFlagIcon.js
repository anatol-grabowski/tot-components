function getRegion(localeCode) {
  const normalizedCode = localeCode.replaceAll('_', '-')

  if (typeof Intl.Locale === 'function') {
    try {
      return new Intl.Locale(normalizedCode).region || null
    } catch {
      return null
    }
  }

  const parts = normalizedCode.split('-')
  for (let i = 1; i < parts.length; i++) {
    if (/^[a-z]{2}$/i.test(parts[i])) return parts[i]
    if (/^\d{3}$/.test(parts[i])) return parts[i]
  }
  return null
}

/**
 * Returns the regional-indicator flag for a locale containing a country code.
 *
 * Language-only locales and numeric region codes do not have flag emoji and
 * return `null`.
 *
 * @param {string | null | undefined} localeCode BCP 47 locale code.
 * @returns {string | null} Flag emoji, or `null` when no alpha region exists.
 */
export function getFlagIcon(localeCode) {
  if (!localeCode) return null

  const region = getRegion(localeCode)
  if (!region || !/^[a-z]{2}$/i.test(region)) return null

  const upperRegion = region.toUpperCase()
  return String.fromCodePoint(
    127397 + upperRegion.charCodeAt(0),
    127397 + upperRegion.charCodeAt(1),
  )
}
