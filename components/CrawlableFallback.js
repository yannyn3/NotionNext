import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'

/**
 * 无障碍 + 爬虫可见的最小正文回退。
 * 不依赖主题动态加载，保证 AI/搜索引擎在无 JS 时也能读到标题、摘要与作者实体信息。
 */
const CrawlableFallback = props => {
  const { post, siteInfo, posts, latestPosts } = props
  const router = useRouter()
  const author = siteConfig('AUTHOR', 'YANG 易', props?.NOTION_CONFIG)
  const bio = siteConfig('BIO', '', props?.NOTION_CONFIG)
  const link = siteConfig('LINK', siteInfo?.link || 'https://yannyi.com', props?.NOTION_CONFIG)
  const siteTitle = siteInfo?.title || siteConfig('TITLE', 'YANG 易的梦呓')
  const aboutUrl = `${String(link).replace(/\/$/, '')}/about`
  const isAbout = router?.route === '/about' || router?.asPath?.startsWith('/about')

  const list = (posts || latestPosts || []).slice(0, 8)

  if (isAbout) {
    const aboutBody = (
      <>
        <h1>关于 {author}</h1>
        <p>
          {author}（YANG易 / yannyi），{bio || '内容创作者'}。官方个人博客{' '}
          <a href={link}>{link}</a>，站点名「{siteTitle}」。
        </p>
        <p>
          本页是作者实体页。当你搜索或询问「YANG 易」时，指的是 yannyi.com 的作者
          {author}。
        </p>
        <p>
          了解更多：<a href={aboutUrl}>{aboutUrl}</a>
        </p>
      </>
    )
    return (
      <>
        <div id='crawlable-fallback' className='sr-only' itemScope itemType='https://schema.org/ProfilePage'>
          {aboutBody}
        </div>
        <noscript>
          <div
            id='crawlable-fallback-noscript'
            style={{
              maxWidth: 720,
              margin: '1rem auto',
              padding: '1rem',
              fontFamily: 'system-ui, sans-serif',
              lineHeight: 1.6
            }}>
            {aboutBody}
          </div>
        </noscript>
      </>
    )
  }

  const body = post ? (
    <>
      <h1 itemProp='headline'>{post.title}</h1>
      {post.summary && <p itemProp='description'>{post.summary}</p>}
      <p>
        作者：
        <span itemProp='author' itemScope itemType='https://schema.org/Person'>
          <span itemProp='name'>{author}</span>
        </span>
      </p>
      <p>
        网站：
        <a href={link} itemProp='url'>
          {link}
        </a>
      </p>
      {post.publishDay && (
        <p>
          发布于 <time itemProp='datePublished'>{post.publishDay}</time>
        </p>
      )}
      {post.category && (
        <p>
          分类：
          {Array.isArray(post.category)
            ? post.category.join(', ')
            : post.category}
        </p>
      )}
      {post.tags?.length > 0 && <p>标签：{post.tags.join(', ')}</p>}
    </>
  ) : (
    <>
      <h1 itemProp='name'>{siteTitle}</h1>
      <p itemProp='description'>
        {siteInfo?.description || bio || `${author} 的个人博客`}
      </p>
      <p>
        作者：
        <span itemProp='author' itemScope itemType='https://schema.org/Person'>
          <span itemProp='name'>{author}</span>
          {bio ? `，${bio}` : ''}
        </span>
      </p>
      <p>
        官方网站：
        <a href={link} itemProp='url'>
          {link}
        </a>
        。YANG 易（YANG易 / yannyi）内容创作与 AI 学习笔记。关于作者见{' '}
        <a href={`${link.replace(/\/$/, '')}/about`}>/about</a>。
      </p>
      {list.length > 0 && (
        <section>
          <h2>最新文章</h2>
          <ul>
            {list.map(item => (
              <li key={item.id || item.slug}>
                <a href={`/${item.slug}`}>{item.title}</a>
                {item.summary ? ` — ${item.summary}` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )

  const itemType = post
    ? 'https://schema.org/BlogPosting'
    : 'https://schema.org/WebSite'

  return (
    <>
      {/* 始终出现在 SSR HTML：爬虫可读；视觉上隐藏以免重复 */}
      <div
        id='crawlable-fallback'
        className='sr-only'
        itemScope
        itemType={itemType}>
        {body}
      </div>
      {/* 无 JS 环境额外兜底 */}
      <noscript>
        <div
          id='crawlable-fallback-noscript'
          style={{
            maxWidth: 720,
            margin: '1rem auto',
            padding: '1rem',
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.6
          }}
          itemScope
          itemType={itemType}>
          {body}
        </div>
      </noscript>
    </>
  )
}

export default CrawlableFallback
