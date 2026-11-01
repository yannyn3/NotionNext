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

export function getFallbackCover(post = {}) {
  const topic = [post.title, post.category, ...(post.tags || [])].join(' ')
  if (/AI|ChatGPT|代码|编程|工具|技术|知识库|PPT/i.test(topic))
    return '/images/covers/technology.webp'
  if (/写作|阅读|学习|知识|笔记|书|思维/.test(topic))
    return '/images/covers/learning.webp'
  return '/images/covers/life.webp'
}

export function getPostCover(post = {}, automatic = true) {
  const image = [post.pageCoverThumbnail, post.pageCover].find(isUsableImage)
  return image || (automatic ? getFallbackCover(post) : '')
}

export function getAuthorImage(image) {
  return isUsableImage(image) ? image : AUTHOR_MARK
}
