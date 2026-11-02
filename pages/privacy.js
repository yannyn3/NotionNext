import { getStaticProps as getAboutProps } from './about'

export default function Privacy() {
  return (
    <article className='fuwari-card p-6 md:p-10 space-y-6 leading-8'>
      <h1 className='text-3xl font-semibold'>隐私与广告说明</h1>
      <p>
        更新于 2026 年 11 月 2 日。本说明适用于 YANG 易个人博客 yannyi.com。
      </p>
      <section className='space-y-3'>
        <h2 className='text-xl font-semibold'>访问与统计</h2>
        <p>
          网站由 Vercel 托管，文章通过 Notion 提供。访问时，相关服务可能处理 IP
          地址、浏览器信息、请求时间和访问路径，以提供页面、排查故障和防止滥用。网站使用访问统计和
          Microsoft Clarity 等已配置的分析工具，了解页面使用情况并改善阅读体验。
        </p>
        <p>
          主题偏好等设置可能保存在浏览器本地存储中。你可以通过浏览器设置清除或限制
          Cookie 与本地存储；部分功能可能因此受到影响。
        </p>
      </section>
      <section className='space-y-3'>
        <h2 className='text-xl font-semibold'>Google 广告</h2>
        <p>
          网站接入 Google AdSense。Google 及其他广告供应商可能使用
          Cookie、网络信标、IP
          地址或设备标识，依据你对本站及其他网站的访问情况投放、衡量广告，并进行反作弊处理。实际投放受
          Google 审核、你的设置及所在地适用规则影响。
        </p>
        <p>
          你可以通过{' '}
          <a className='underline' href='https://myadcenter.google.com/'>
            Google 我的广告中心
          </a>
          管理个性化广告，也可以了解{' '}
          <a
            className='underline'
            href='https://policies.google.com/technologies/partner-sites'
          >
            Google 如何使用合作伙伴网站中的信息
          </a>
          。其他广告供应商的选择可参考{' '}
          <a className='underline' href='https://www.aboutads.info/choices/'>
            广告偏好退出工具
          </a>
          。关闭个性化广告不代表完全不显示广告。
        </p>
      </section>
      <section className='space-y-3'>
        <h2 className='text-xl font-semibold'>外部链接与联系</h2>
        <p>
          文章中的第三方链接由各服务独立运营，其数据处理遵循各自的隐私说明。请不要在公开留言中提交密码、身份证件或支付资料。
        </p>
        <p>
          如对本站的数据处理有疑问，可通过
          <a className='underline' href='https://github.com/yannyn3'>
            作者 GitHub 公开主页
          </a>
          提供的联系入口联系我。
        </p>
      </section>
    </article>
  )
}

export async function getStaticProps(context) {
  const result = await getAboutProps(context)
  result.props.post = {
    title: '隐私与广告说明',
    slug: 'privacy',
    type: 'Page',
    status: 'Published',
    summary: 'YANG 易博客的访问统计、Cookie、Google 广告和外部服务使用说明。'
  }
  return result
}
