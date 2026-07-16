import fs from 'fs'

/**
 * 生成 robots.txt
 * 显式放行主流 AI 检索/引用爬虫，便于 GEO（生成式引擎优化）
 */
export function generateRobotsTxt(props) {
  const { siteInfo } = props
  const LINK = siteInfo?.link
  const content = `# yannyi.com / NotionNext robots
# Allow all crawlers by default
User-agent: *
Allow: /

# OpenAI — search & citations (prefer allowing these for ChatGPT visibility)
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

# Anthropic Claude
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

# Google Gemini / AI features
User-agent: Google-Extended
Allow: /

# Apple
User-agent: Applebot-Extended
Allow: /

# Bytespider (ByteDance)
User-agent: Bytespider
Allow: /

# Host
Host: ${LINK}

# Sitemaps
Sitemap: ${LINK}/sitemap.xml
`
  try {
    fs.mkdirSync('./public', { recursive: true })
    fs.writeFileSync('./public/robots.txt', content)
  } catch (error) {
    // 在vercel运行环境是只读的，这里会报错；
    // 但在vercel编译阶段、或VPS等其他平台这行代码会成功执行
  }
}
