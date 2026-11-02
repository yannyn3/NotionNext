import { fireEvent, render, screen } from '@testing-library/react'
import PostList from '@/themes/fuwari/components/PostList'

jest.mock('@/lib/config', () => ({ siteConfig: (key, fallback) => fallback }))
jest.mock('next/router', () => ({ useRouter: () => ({ asPath: '/' }) }))
jest.mock('@/components/SmartLink', () => ({ href, children, ...props }) => (
  <a href={typeof href === 'string' ? href : href.pathname} {...props}>
    {children}
  </a>
))

const post = {
  id: 'post-1',
  title: '利用 AI 学习',
  slug: 'ai-learn',
  category: '技术分享'
}

it('automatically gives an article without a cover an appropriate local image', () => {
  render(<PostList posts={[post]} />)
  expect(screen.getByRole('img', { name: post.title })).toHaveAttribute(
    'src',
    expect.stringMatching(/^\/images\/photography\/\d+\.webp$/)
  )
})

it('replaces retired random-image URLs with a local cover', () => {
  render(
    <PostList
      posts={[
        {
          ...post,
          pageCoverThumbnail: 'https://source.unsplash.com/random/720x480'
        }
      ]}
    />
  )
  expect(screen.getByRole('img', { name: post.title })).toHaveAttribute(
    'src',
    expect.stringMatching(/^\/images\/photography\/\d+\.webp$/)
  )
})

it('keeps a provided cover, then falls back locally if it fails', () => {
  render(
    <PostList
      posts={[{ ...post, pageCoverThumbnail: 'https://example.com/cover.jpg' }]}
    />
  )
  const img = screen.getByRole('img', { name: post.title })
  expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg')
  fireEvent.error(img)
  expect(img).toHaveAttribute('src', '/images/covers/life.webp')
})
