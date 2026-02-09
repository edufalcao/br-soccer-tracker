import type { Competition } from './competition'

export interface Team {
  id: string
  externalId: number
  name: string
  nameEn: string | null
  shortName: string
  badgeUrl: string | null
  competition: Competition
  city: string | null
  createdAt: string
  updatedAt: string
}
