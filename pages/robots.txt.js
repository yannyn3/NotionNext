const SITE_URL = 'https://yannyi.com'
export function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  )
  res.end(
    `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  )
  return { props: {} }
}
export default function RobotsTxt() {
  return null
}
