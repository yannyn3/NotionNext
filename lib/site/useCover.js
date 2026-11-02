import { useEffect, useState } from 'react'
import { getPostCover, getRandomCover, isUsableImage } from './presentation'

let visitSeed
export default function useCover(post, automatic = true) {
  const [seed, setSeed] = useState(0)
  useEffect(() => {
    visitSeed ??= Math.floor(Math.random() * 1000000) + 1
    setSeed(visitSeed)
  }, [])
  const original = [post?.pageCoverThumbnail, post?.pageCover].find(
    isUsableImage
  )
  return (
    original ||
    (automatic ? getRandomCover(post, seed) : getPostCover(post, false))
  )
}
