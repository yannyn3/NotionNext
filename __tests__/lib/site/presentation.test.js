import {
  getAuthorImage,
  getFallbackCover,
  getPostCover,
  getRandomCover,
  isUsableImage
} from '@/lib/site/presentation'

it('preserves real covers and rejects retired random services', () => {
  expect(getPostCover({ pageCover: '/my-cover.jpg' })).toBe('/my-cover.jpg')
  expect(isUsableImage('https://source.unsplash.com/random')).toBe(false)
  expect(getPostCover({}, false)).toBe('')
})
it('selects varied self-hosted photographs, stable for a visit', () => {
  const post = { id: 'post-1', title: '日常随笔' }
  const covers = new Set(
    Array.from({ length: 30 }, (_, seed) => getRandomCover(post, seed))
  )
  expect(covers.size).toBeGreaterThan(6)
  expect(getRandomCover(post, 123)).toBe(getRandomCover(post, 123))
  for (const cover of covers)
    expect(cover).toMatch(/^\/images\/photography\/\d+\.webp$/)
  expect(getFallbackCover({ title: '写作' })).toMatch(
    /^\/images\/photography\//
  )
})
it('keeps a safe author mark', () => {
  expect(getAuthorImage('notion://custom_emoji/x')).toBe(
    '/images/yang-yi-mark.svg'
  )
})
