const API_FOOTBALL_BASE = 'https://v3.football.api-sports.io'

// --- API-Football response types ---

interface ApiFootballResponse<T> {
  get: string
  parameters: Record<string, string>
  errors: Record<string, string> | unknown[]
  results: number
  paging: { current: number; total: number }
  response: T[]
}

export interface ApiFootballTeamEntry {
  team: {
    id: number
    name: string
    code: string | null
    logo: string
  }
  venue: {
    id: number | null
    name: string | null
    city: string | null
  } | null
}

export interface ApiFootballFixtureEntry {
  fixture: {
    id: number
    referee: string | null
    date: string
    status: {
      long: string
      short: string
      elapsed: number | null
    }
    venue: {
      name: string | null
      city: string | null
    } | null
  }
  league: {
    id: number
    name: string
    round: string
    season: number
  }
  teams: {
    home: { id: number; name: string; logo: string }
    away: { id: number; name: string; logo: string }
  }
  goals: {
    home: number | null
    away: number | null
  }
  score: {
    halftime: { home: number | null; away: number | null }
    fulltime: { home: number | null; away: number | null }
  }
}

export interface ApiFootballStandingTeam {
  rank: number
  team: { id: number; name: string; logo: string }
  points: number
  goalsDiff: number
  all: {
    played: number
    win: number
    draw: number
    lose: number
    goals: { for: number; against: number }
  }
  form: string | null
}

interface ApiFootballStandingsEntry {
  league: {
    id: number
    season: number
    standings: ApiFootballStandingTeam[][]
  }
}

// --- Status mapping ---

const STATUS_MAP: Record<string, MatchStatus> = {
  TBD: 'scheduled',
  NS: 'scheduled',
  '1H': 'live',
  HT: 'live',
  '2H': 'live',
  ET: 'live',
  P: 'live',
  BT: 'live',
  SUSP: 'live',
  INT: 'live',
  LIVE: 'live',
  FT: 'finished',
  AET: 'finished',
  PEN: 'finished',
  AWD: 'finished',
  WO: 'finished',
  PST: 'postponed',
  CANC: 'cancelled',
  ABD: 'cancelled',
}

export function mapFixtureStatus(shortStatus: string): MatchStatus {
  return STATUS_MAP[shortStatus] || 'scheduled'
}

// --- HTTP helper ---

async function apiFetch<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T[]> {
  const apiKey = useRuntimeConfig().footballApiKey
  if (!apiKey) {
    throw new Error('API-Football key not configured (NUXT_FOOTBALL_API_KEY)')
  }

  const response = await $fetch<ApiFootballResponse<T>>(`${API_FOOTBALL_BASE}${endpoint}`, {
    headers: { 'x-apisports-key': apiKey },
    params,
  })

  // API-Football returns errors as object (not array) when something goes wrong
  if (response.errors && !Array.isArray(response.errors) && Object.keys(response.errors).length > 0) {
    throw new Error(`API-Football error: ${JSON.stringify(response.errors)}`)
  }

  return response.response
}

// --- Public API ---

export async function fetchTeams(leagueId: number, season: number): Promise<ApiFootballTeamEntry[]> {
  return apiFetch<ApiFootballTeamEntry>('/teams', { league: leagueId, season })
}

export async function fetchFixtures(
  leagueId: number,
  season: number,
  options: { from?: string; to?: string; status?: string } = {},
): Promise<ApiFootballFixtureEntry[]> {
  const params: Record<string, string | number> = { league: leagueId, season }
  if (options.from) params.from = options.from
  if (options.to) params.to = options.to
  if (options.status) params.status = options.status
  return apiFetch<ApiFootballFixtureEntry>('/fixtures', params)
}

export async function fetchLiveFixtures(leagueId: number): Promise<ApiFootballFixtureEntry[]> {
  return apiFetch<ApiFootballFixtureEntry>('/fixtures', { league: leagueId, live: 'all' })
}

export async function fetchStandings(leagueId: number, season: number): Promise<ApiFootballStandingTeam[]> {
  const entries = await apiFetch<ApiFootballStandingsEntry>('/standings', { league: leagueId, season })
  // response[0].league.standings is array of arrays (one per group; leagues have a single group)
  return entries[0]?.league.standings[0] ?? []
}
