import { render, screen } from '@testing-library/react'
import MyApp from '@/pages/_app'

jest.mock('@/hooks/useAdjustStyle', () => () => {})
jest.mock('next/router', () => ({ useRouter: () => ({ asPath: '/' }) }))
jest.mock('@/lib/utils', () => ({ getQueryParam: () => null }))
jest.mock('@/blog.config', () => ({ THEME: 'test' }))
jest.mock('@/lib/global', () => ({
  GlobalContextProvider: ({ children }) => <>{children}</>
}))
jest.mock('@/themes/theme', () => ({
  getBaseLayoutByTheme:
    () =>
    ({ children }) => <main>{children}</main>
}))
jest.mock('@/components/SEO', () => () => <div>SEO metadata</div>)
jest.mock('@/components/CrawlableFallback', () => () => (
  <div>Crawlable content</div>
))
jest.mock('@/components/ExternalPlugins', () => () => (
  <div>External plugins</div>
))
jest.mock('@/components/PWAInstaller', () => ({ NOTION_CONFIG }) => (
  <div>PWA {NOTION_CONFIG?.PWA_ENABLE ? 'enabled' : 'disabled'}</div>
))

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
  delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
})

it('keeps the page and upstream PWA installer alongside custom crawlable content', () => {
  render(
    <MyApp
      Component={() => <div>Blog page</div>}
      pageProps={{ NOTION_CONFIG: { PWA_ENABLE: true } }}
    />
  )
  expect(screen.getByText('Blog page')).toBeInTheDocument()
  expect(screen.queryByText('Crawlable content')).not.toBeInTheDocument()
  expect(screen.getByText('PWA enabled')).toBeInTheDocument()
})

it('retains SEO, crawlable content and plugins when theme content crashes', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
  const BrokenPage = () => {
    throw new Error('Theme render failed')
  }
  render(<MyApp Component={BrokenPage} pageProps={{}} />)
  expect(screen.getByText('SEO metadata')).toBeInTheDocument()
  expect(screen.queryByText('Crawlable content')).not.toBeInTheDocument()
  expect(screen.getByText('External plugins')).toBeInTheDocument()
  expect(screen.getByText('PWA disabled')).toBeInTheDocument()
  expect(screen.getByText('页面暂时无法显示')).toBeInTheDocument()
  expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
})
