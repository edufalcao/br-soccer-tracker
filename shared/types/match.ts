import type { Competition } from './competition'

export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled'

export interface Match {
  id: string
  externalId: number
  competition: Competition
  season: number
  round: string | null
  status: MatchStatus
  homeTeamId: number
  awayTeamId: number
  homeScore: number | null
  awayScore: number | null
  homeScoreHt: number | null
  awayScoreHt: number | null
  kickoffAt: string
  venue: string | null
  elapsedMinutes: number | null
  createdAt: string
  updatedAt: string
}
