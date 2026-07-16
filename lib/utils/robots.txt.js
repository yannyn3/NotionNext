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
  // 不再写入 public/robots.txt：由 pages/robots.txt.js 动态输出，
  // 避免静态 public 文件覆盖页面路由，导致 AI 爬虫规则无法更新。
  try {
    const path = './public/robots.txt'
    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }
  } catch (error) {
    // Vercel 运行时只读时可忽略
  }
}
