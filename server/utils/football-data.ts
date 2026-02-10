/**
 * Fallback data source: football-data.org (free tier: 10 req/min)
 * Maps responses to match the same types used by api-football.ts
 */

import type { ApiFootballTeamEntry, ApiFootballFixtureEntry, ApiFootballStandingTeam } from './api-football'

const FOOTBALL_DATA_BASE = 'https://api.football-data.org/v4'

// --- football-data.org competition ID mapping ---
// API-Football IDs → football-data.org IDs
const COMPETITION_MAP: Record<number, string> = {
  71: 'BSA', // Série A
  72: 'BSB', // Série B
  73: 'CDB', // Copa do Brasil — may not be available on free tier
}

// --- Response types from football-data.org ---

interface FdTeam {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
  venue: string | null
  address: string | null
}

interface FdTeamsResponse {
  teams: FdTeam[]
}

interface FdScore {
  home: number | null
  away: number | null
}

interface FdMatch {
  id: number
  utcDate: string
  status: string
  matchday: number
  stage: string
  homeTeam: { id: number; name: string; shortName: string; crest: string }
  awayTeam: { id: number; name: string; shortName: string; crest: string }
  score: {
    fullTime: FdScore
    halfTime: FdScore
  }
  referees: { name: string }[]
  venue: string | null
}

interface FdMatchesResponse {
  matches: FdMatch[]
}

interface FdTableEntry {
  position: number
  team: { id: number; name: string; shortName: string; crest: string }
  playedGames: number
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  form: string | null
}

interface FdStandingsResponse {
  standings: { type: string; table: FdTableEntry[] }[]
}

// --- Status mapping ---

const FD_STATUS_MAP: Record<string, string> = {
  SCHEDULED: 'NS',
  TIMED: 'NS',
  IN_PLAY: '2H',
  PAUSED: 'HT',
  FINISHED: 'FT',
  POSTPONED: 'PST',
  CANCELLED: 'CANC',
  SUSPENDED: 'SUSP',
  AWARDED: 'AWD',
}

// --- HTTP helper ---

async function fdFetch<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
  const apiKey = process.env.NUXT_FOOTBALL_DATA_KEY
  if (!apiKey) {
    throw new Error('football-data.org key not configured (NUXT_FOOTBALL_DATA_KEY)')
  }

  return $fetch<T>(`${FOOTBALL_DATA_BASE}${endpoint}`, {
    headers: { 'X-Auth-Token': apiKey },
    params,
  })
}

function getCompetitionCode(apiFootballId: number): string {
  const code = COMPETITION_MAP[apiFootballId]
  if (!code) throw new Error(`No football-data.org mapping for API-Football league ID ${apiFootballId}`)
  return code
}

// --- Public API (same signatures as api-football.ts) ---

export async function fdFetchTeams(leagueId: number, _season: number): Promise<ApiFootballTeamEntry[]> {
  const code = getCompetitionCode(leagueId)
  const response = await fdFetch<FdTeamsResponse>(`/competitions/${code}/teams`)

  return response.teams.map((t) => ({
    team: {
      id: t.id,
      name: t.name,
      code: t.tla,
      logo: t.crest,
    },
    venue: {
      id: null,
      name: t.venue ?? null,
      city: null,
    },
  }))
}

export async function fdFetchFixtures(
  leagueId: number,
  _season: number,
  options: { from?: string; to?: string; status?: string } = {},
): Promise<ApiFootballFixtureEntry[]> {
  const code = getCompetitionCode(leagueId)
  const params: Record<string, string | number> = {}
  if (options.from) params.dateFrom = options.from
  if (options.to) params.dateTo = options.to
  if (options.status) params.status = options.status

  const response = await fdFetch<FdMatchesResponse>(`/competitions/${code}/matches`, params)
  return response.matches.map(mapFdMatch).filter((m): m is ApiFootballFixtureEntry => m !== null)
}

export async function fdFetchLiveFixtures(leagueId: number): Promise<ApiFootballFixtureEntry[]> {
  const code = getCompetitionCode(leagueId)
  const response = await fdFetch<FdMatchesResponse>(`/competitions/${code}/matches`, { status: 'IN_PLAY,PAUSED' })
  return response.matches.map(mapFdMatch).filter((m): m is ApiFootballFixtureEntry => m !== null)
}

export async function fdFetchStandings(leagueId: number, _season: number): Promise<ApiFootballStandingTeam[]> {
  const code = getCompetitionCode(leagueId)
  const response = await fdFetch<FdStandingsResponse>(`/competitions/${code}/standings`)

  const total = response.standings.find((s) => s.type === 'TOTAL')
  if (!total) return []

  return total.table.map((entry) => ({
    rank: entry.position,
    team: { id: entry.team.id, name: entry.team.name, logo: entry.team.crest },
    points: entry.points,
    goalsDiff: entry.goalDifference,
    all: {
      played: entry.playedGames,
      win: entry.won,
      draw: entry.draw,
      lose: entry.lost,
      goals: { for: entry.goalsFor, against: entry.goalsAgainst },
    },
    form: entry.form,
  }))
}

// --- Helpers ---

function mapFdMatch(m: FdMatch): ApiFootballFixtureEntry | null {
  const shortStatus = FD_STATUS_MAP[m.status] ?? 'NS'

  return {
    fixture: {
      id: m.id,
      referee: m.referees[0]?.name ?? null,
      date: m.utcDate,
      status: {
        long: m.status,
        short: shortStatus,
        elapsed: null,
      },
      venue: m.venue ? { name: m.venue, city: null } : null,
    },
    league: {
      id: 0, // Not used downstream
      name: '',
      round: `Regular Season - ${m.matchday}`,
      season: new Date(m.utcDate).getFullYear(),
    },
    teams: {
      home: { id: m.homeTeam.id, name: m.homeTeam.name, logo: m.homeTeam.crest },
      away: { id: m.awayTeam.id, name: m.awayTeam.name, logo: m.awayTeam.crest },
    },
    goals: {
      home: m.score.fullTime.home,
      away: m.score.fullTime.away,
    },
    score: {
      halftime: { home: m.score.halfTime.home, away: m.score.halfTime.away },
      fulltime: { home: m.score.fullTime.home, away: m.score.fullTime.away },
    },
  }
}
