import type { Competition } from './competition'

export interface StandingEntry {
  id: string
  competition: Competition
  season: number
  teamExternalId: number
  position: number
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form: string | null
  updatedAt: string
}
