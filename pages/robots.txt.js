/**
 * 动态输出 robots.txt，避免 public/robots.txt 旧缓存导致 AI 爬虫规则不更新
 */
function buildRobotsTxt(host) {
  const site = host ? `https://${host.replace(/\/$/, '')}` : 'https://yannyi.com'
  return `# yannyi.com robots
User-agent: *
Allow: /

# OpenAI
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

# Anthropic
User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# Google Gemini
User-agent: Google-Extended
Allow: /

# Apple
User-agent: Applebot-Extended
Allow: /

Host: ${site}
Sitemap: ${site}/sitemap.xml
`
}

export async function getServerSideProps({ req, res }) {
  const host = req?.headers?.host || 'yannyi.com'
  const body = buildRobotsTxt(host)

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  )
  res.write(body)
  res.end()

  return { props: {} }
}

export default function RobotsTxt() {
  return null
}
