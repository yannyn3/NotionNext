/** Stable, self-hosted fallbacks for missing or retired image services. */
export const AUTHOR_MARK = '/images/yang-yi-mark.svg'
export const SHARE_IMAGE = '/images/yang-yi-share.png'

export function isUsableImage(value) {
  if (typeof value !== 'string' || !value.trim()) return false
  const image = value.trim()
  if (image.startsWith('/') && !image.startsWith('//')) return true
  try {
    const url = new URL(image)
    return (
      ['http:', 'https:'].includes(url.protocol) &&
      url.hostname !== 'source.unsplash.com'
    )
  } catch {
    return false
  }
}

export const PHOTO_IDS = [
  59, 66, 75, 76, 83, 104, 127, 131, 134, 137, 140, 141, 145, 146
]

// The initial render is deterministic for SSR; a visit seed rotates it after hydration.
export function getRandomCover(post = {}, seed = 0) {
  const key = String(post.id || post.slug || post.title || 'yang-yi')
  let hash = 0
  for (const char of key)
    hash = (Math.imul(hash, 31) + char.charCodeAt(0)) >>> 0
  hash = Math.imul(hash ^ (hash >>> 16) ^ Math.trunc(seed), 0x45d9f3b)
  hash ^= hash >>> 16
  const index = (hash >>> 0) % PHOTO_IDS.length
  return `/images/photography/${PHOTO_IDS[index]}.webp`
}

export function getFallbackCover(post = {}) {
  return getRandomCover(post)
}

export const EMERGENCY_COVER = '/images/photography/59.webp'

export function getPostCover(post = {}, automatic = true) {
  const image = [post.pageCoverThumbnail, post.pageCover].find(isUsableImage)
  return image || (automatic ? getFallbackCover(post) : '')
}

export function getAuthorImage(image) {
  return isUsableImage(image) ? image : AUTHOR_MARK
}
