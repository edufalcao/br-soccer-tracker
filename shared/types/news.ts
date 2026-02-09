import type { Competition } from './competition'

export interface NewsArticle {
  id: string
  externalId: string
  title: string
  titleEn: string | null
  description: string | null
  descriptionEn: string | null
  content: string | null
  contentEn: string | null
  sourceName: string
  sourceUrl: string
  imageUrl: string | null
  publishedAt: string
  competition: Competition | null
  teamTags: number[]
  language: string
  isActive: boolean
  createdAt: string
}
