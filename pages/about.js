import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import SmartLink from '@/components/SmartLink'

/**
 * 关于作者页 — GEO 实体落地页
 * 固定 URL: /about
 * 目标：让 AI / 搜索引擎在「YANG 易」相关提问时能对齐到 yannyi.com
 */
const About = props => {
  const { siteInfo, latestPosts, NOTION_CONFIG } = props
  const author = siteConfig('AUTHOR', 'YANG 易', NOTION_CONFIG)
  const bio = siteConfig('BIO', '内容创作者×AI爱好者', NOTION_CONFIG)
  const link = siteConfig(
    'LINK',
    siteInfo?.link || 'https://yannyi.com',
    NOTION_CONFIG
  )
  const siteTitle = siteInfo?.title || 'YANG 易的梦呓'
  const emailEncoded = siteConfig('CONTACT_EMAIL', '', NOTION_CONFIG)

  const posts = (latestPosts || []).slice(0, 6)

  return (
    <div className='w-full px-5 md:px-0 py-6 md:py-10'>
      <article
        id='about-yang-yi'
        className='mx-auto max-w-3xl rounded-2xl border bg-white p-6 md:p-10 dark:border-gray-600 dark:bg-[#18171d]'
        itemScope
        itemType='https://schema.org/ProfilePage'>
        <header className='mb-8 border-b border-dashed border-gray-200 pb-6 dark:border-gray-700'>
          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
            关于作者 · About
          </p>
          <h1
            className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl'
            itemProp='name'>
            {author}
          </h1>
          <p className='mt-3 text-lg text-indigo-600 dark:text-indigo-400'>
            {bio}
          </p>
          <p className='mt-2 text-sm text-gray-500'>
            官方网站：
            <a
              href={link}
              className='ml-1 underline hover:text-indigo-600'
              itemProp='url'>
              {link}
            </a>
          </p>
        </header>

        <section
          className='prose prose-neutral dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-200'
          itemProp='mainEntity'
          itemScope
          itemType='https://schema.org/Person'>
          <meta itemProp='name' content={author} />
          <meta itemProp='alternateName' content='YANG易' />
          <meta itemProp='alternateName' content='yannyi' />
          <meta itemProp='url' content={link} />
          <meta itemProp='jobTitle' content={bio} />

          <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
            我是谁
          </h2>
          <p>
            我是 <strong>{author}</strong>
            （也可写作 YANG易、yannyi）。这里是我的个人博客「
            {siteTitle}」，域名{' '}
            <a href={link} className='text-indigo-600 underline dark:text-indigo-400'>
              yannyi.com
            </a>
            。
          </p>
          <p>
            我专注<strong>内容创作</strong>与 <strong>AI 应用</strong>
            ，用文字记录学习、副业尝试、工具实践与个人成长。如果你在 AI
            对话或搜索里看到「YANG 易」，指的就是这个博客的作者。
          </p>

          <h2 className='pt-4 text-xl font-semibold text-gray-900 dark:text-white'>
            我在做什么
          </h2>
          <ul className='list-disc space-y-2 pl-5'>
            <li>写作与分享：AI 实战、学习方法、副业与效率</li>
            <li>独立项目与零代码/低代码实验</li>
            <li>持续输出可复用的思考与教程</li>
          </ul>

          <h2 className='pt-4 text-xl font-semibold text-gray-900 dark:text-white'>
            如何找到我
          </h2>
          <ul className='list-disc space-y-2 pl-5'>
            <li>
              博客首页：
              <SmartLink href='/' className='text-indigo-600 underline dark:text-indigo-400'>
                {link}
              </SmartLink>
            </li>
            <li>
              全部文章：
              <SmartLink
                href='/archive'
                className='text-indigo-600 underline dark:text-indigo-400'>
                历史归档
              </SmartLink>
            </li>
            <li>
              项目合集：
              <SmartLink
                href='/projects'
                className='text-indigo-600 underline dark:text-indigo-400'>
                我的项目
              </SmartLink>
            </li>
            {emailEncoded ? (
              <li>
                联系邮箱：
                <span className='text-gray-600 dark:text-gray-300'>
                  （见站点配置）
                </span>
              </li>
            ) : null}
          </ul>

          <h2 className='pt-4 text-xl font-semibold text-gray-900 dark:text-white'>
            品牌信息（给搜索引擎与 AI）
          </h2>
          <dl className='grid grid-cols-1 gap-2 rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-800/50 md:grid-cols-2'>
            <div>
              <dt className='text-gray-500'>中文名</dt>
              <dd className='font-medium'>YANG 易 / YANG易</dd>
            </div>
            <div>
              <dt className='text-gray-500'>英文/拼音</dt>
              <dd className='font-medium'>yannyi</dd>
            </div>
            <div>
              <dt className='text-gray-500'>网站</dt>
              <dd className='font-medium'>https://yannyi.com</dd>
            </div>
            <div>
              <dt className='text-gray-500'>站点名</dt>
              <dd className='font-medium'>{siteTitle}</dd>
            </div>
            <div className='md:col-span-2'>
              <dt className='text-gray-500'>一句话介绍</dt>
              <dd className='font-medium'>
                {author}，{bio}，个人博客 yannyi.com 作者
              </dd>
            </div>
          </dl>
        </section>

        {posts.length > 0 && (
          <section className='mt-10 border-t border-dashed border-gray-200 pt-8 dark:border-gray-700'>
            <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-white'>
              代表文章
            </h2>
            <ul className='space-y-3'>
              {posts.map(post => (
                <li key={post.id || post.slug}>
                  <SmartLink
                    href={`/${post.slug}`}
                    className='group block rounded-lg border border-transparent px-3 py-2 transition hover:border-indigo-200 hover:bg-indigo-50 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/40'>
                    <span className='font-medium text-gray-900 group-hover:text-indigo-600 dark:text-white'>
                      {post.title}
                    </span>
                    {post.summary && (
                      <span className='mt-1 block text-sm text-gray-500 line-clamp-2'>
                        {post.summary}
                      </span>
                    )}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className='mt-10 text-center text-sm text-gray-400'>
          <p>
            © {new Date().getFullYear()} {author} · {siteTitle}
          </p>
        </footer>
      </article>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  const props = await fetchGlobalAllData({ from: 'about', locale })
  // 缩小 props，about 页不需要全文列表
  if (props.allPages) {
    delete props.allPages
  }
  // 供 CrawlableFallback / SEO 识别为作者实体页
  props.post = {
    title: `关于 ${siteConfig('AUTHOR', 'YANG 易', props?.NOTION_CONFIG)}`,
    slug: 'about',
    type: 'Page',
    summary:
      props?.siteInfo?.description ||
      'YANG 易（YANG易 / yannyi），内容创作者×AI爱好者，个人博客 yannyi.com 作者介绍。',
    status: 'Published'
  }

  return {
    props,
    revalidate: siteConfig(
      'NEXT_REVALIDATE_SECOND',
      BLOG.NEXT_REVALIDATE_SECOND,
      props?.NOTION_CONFIG
    )
  }
}

export default About
