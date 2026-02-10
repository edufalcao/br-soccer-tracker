import { describe, it, expect } from 'vitest'
import { registerEndpoint } from '@nuxt/test-utils/runtime'

describe('useStandings', () => {
  registerEndpoint('/api/standings/serie_a', () => ({
    data: [
      { id: '1', team_external_id: 10, position: 1, points: 30, played: 12 },
      { id: '2', team_external_id: 20, position: 2, points: 27, played: 12 },
    ],
  }))

  it('returns standings array', () => {
    const competition = ref<Competition>('serie_a')
    const { standings } = useStandings(competition)
    expect(standings.value).toBeDefined()
    expect(Array.isArray(standings.value)).toBe(true)
  })

  it('provides refresh function', () => {
    const competition = ref<Competition>('serie_a')
    const { refresh } = useStandings(competition)
    expect(typeof refresh).toBe('function')
  })
})
