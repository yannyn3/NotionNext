import BLOG from '@/blog.config'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { getAuthorImage } from '@/lib/site/presentation'

const DEFAULT_INTRO =
  '我是 YANG 易，一名内容创作者，也是一位 AI 爱好者。这里记录我对工具、写作和生活的观察。\n\n我喜欢从具体的问题出发，边做边学：用 AI 辅助学习，把零散的想法写成文章，把小项目变成可以使用的东西。有用的做法记下来，还没想明白的问题，也留在这里慢慢琢磨。'

export default function About({ siteInfo, latestPosts = [], NOTION_CONFIG }) {
  const author = siteConfig('AUTHOR', 'YANG 易', NOTION_CONFIG)
  const bio = siteConfig('BIO', '把想法写下来，把工具用起来。', NOTION_CONFIG)
  const intro = siteConfig('AUTHOR_INTRO', DEFAULT_INTRO, NOTION_CONFIG)
  const github = siteConfig('CONTACT_GITHUB', '', NOTION_CONFIG)
  const avatar = getAuthorImage(
    siteConfig('AVATAR', siteInfo?.icon, NOTION_CONFIG)
  )
  return (
    <article className='fuwari-card p-6 md:p-10 space-y-9' id='about-yang-yi'>
      <header className='border-b border-[var(--fuwari-border)] pb-7'>
        <img
          src={avatar}
          alt={author}
          width={80}
          height={80}
          className='rounded-full mb-5'
        />
        <p className='text-sm mb-2 text-[var(--fuwari-muted)]'>
          很高兴在这里遇见你
        </p>
        <h1 className='text-3xl font-semibold mb-3'>关于 {author}</h1>
        <p className='leading-7 text-[var(--fuwari-muted)]'>{bio}</p>
      </header>
      <section className='space-y-5 text-base leading-8'>
        {String(intro)
          .split(/\n\s*\n/)
          .filter(Boolean)
          .map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>我在这里写什么</h2>
        <ul className='space-y-3 leading-7'>
          <li>
            <strong>AI 与工具：</strong>
            亲手尝试工具，记录怎样用它们解决实际问题。
          </li>
          <li>
            <strong>写作与阅读：</strong>
            整理学习方法、创作过程，以及读到的有意思的东西。
          </li>
          <li>
            <strong>生活与小项目：</strong>
            保留日常观察，也分享把想法做出来的过程。
          </li>
        </ul>
      </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>找到我</h2>
        <div className='flex flex-wrap gap-4 underline underline-offset-4'>
          {github && (
            <a href={github} rel='me noopener noreferrer' target='_blank'>
              GitHub
            </a>
          )}
          <SmartLink href='/projects'>项目合集</SmartLink>
          <SmartLink href='/archive'>全部文章</SmartLink>
          <a href='/rss/feed.xml'>RSS 订阅</a>
        </div>
      </section>
      {latestPosts.length > 0 && (
        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>最近更新</h2>
          <ul className='space-y-3'>
            {latestPosts.slice(0, 5).map(post => (
              <li key={post.id || post.slug}>
                <SmartLink
                  href={post.href || `/${post.slug}`}
                  className='underline underline-offset-4'
                >
                  {post.title}
                </SmartLink>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

export async function getStaticProps({ locale }) {
  const props = await fetchGlobalAllData({
    from: 'about',
    locale,
    requireAvailableData: true
  })
  delete props.allPages
  props.post = {
    title: `关于 ${siteConfig('AUTHOR', 'YANG 易', props.NOTION_CONFIG)}`,
    slug: 'about',
    type: 'Page',
    status: 'Published',
    summary: siteConfig(
      'DESCRIPTION',
      props.siteInfo?.description,
      props.NOTION_CONFIG
    )
  }
  return {
    props,
    revalidate: siteConfig(
      'NEXT_REVALIDATE_SECOND',
      BLOG.NEXT_REVALIDATE_SECOND,
      props.NOTION_CONFIG
    )
  }
}
