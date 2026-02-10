import { describe, it, expect } from 'vitest'
import { registerEndpoint } from '@nuxt/test-utils/runtime'

describe('useMatches', () => {
  registerEndpoint('/api/matches/live', () => ({
    data: [{ id: '1', status: 'live', home_team_id: 10, away_team_id: 20, home_score: 1, away_score: 0 }],
  }))

  registerEndpoint('/api/matches/recent', () => ({
    data: [{ id: '2', status: 'finished', home_team_id: 10, away_team_id: 30, home_score: 2, away_score: 1 }],
  }))

  registerEndpoint('/api/matches/upcoming', () => ({
    data: [{ id: '3', status: 'scheduled', home_team_id: 10, away_team_id: 40, home_score: null, away_score: null }],
  }))

  it('returns live, recent, and upcoming matches', async () => {
    const { live, recent, upcoming } = useMatches()
    // Data should be available after fetch resolves
    // In test environment, useFetch auto-resolves
    expect(live.value).toBeDefined()
    expect(recent.value).toBeDefined()
    expect(upcoming.value).toBeDefined()
  })

  it('returns error computed', () => {
    const { error } = useMatches()
    expect(error.value).toBeFalsy()
  })

  it('provides refreshLive function', () => {
    const { refreshLive } = useMatches()
    expect(typeof refreshLive).toBe('function')
  })
})
