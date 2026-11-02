import { useState } from 'react'
import { EMERGENCY_COVER } from '@/lib/site/presentation'
import useCover from '@/lib/site/useCover'

/**
 * 文章卡片内顶部封面（直角矩形 + object-cover）
 */
const ArticleHeroCover = ({ coverSrc, title }) => {
  const randomCover = useCover({ title }, true)
  const [failed, setFailed] = useState(false)
  if (!coverSrc) return null

  return (
    <div className='fuwari-article-card-cover mb-6 min-w-0 w-full'>
      <div className='relative h-[200px] w-full overflow-hidden sm:h-[240px] md:h-[260px]'>
        <img
          src={
            failed
              ? EMERGENCY_COVER
              : coverSrc.startsWith('/images/photography/')
                ? randomCover
                : coverSrc
          }
          onError={() => setFailed(true)}
          alt={title ? `封面：${title}` : ''}
          className='absolute inset-0 h-full w-full object-cover object-center'
          loading='eager'
          decoding='async'
        />
      </div>
    </div>
  )
}

export default ArticleHeroCover
