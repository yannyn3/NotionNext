import { getAuthorImage, getFallbackCover, getPostCover, isUsableImage } from '@/lib/site/presentation'

it('falls back from Notion custom emoji to a visible author mark', () => {
  expect(getAuthorImage('notion://custom_emoji/workspace/id')).toBe('/images/yang-yi-mark.svg')
  expect(getAuthorImage('/images/me.jpg')).toBe('/images/me.jpg')
})
it('selects reading and everyday-life imagery by topic', () => {
  expect(getFallbackCover({title:'关于写作'})).toBe('/images/covers/learning.webp')
  expect(getFallbackCover({title:'日常随笔'})).toBe('/images/covers/life.webp')
})
it('respects opting out of automatic covers and rejects unsupported image protocols', () => {
  expect(getPostCover({},false)).toBe('')
  expect(isUsableImage('javascript:alert(1)')).toBe(false)
  expect(isUsableImage('//untrusted.example/image')).toBe(false)
})
