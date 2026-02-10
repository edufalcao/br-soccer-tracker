import { describe, it, expect, beforeEach } from 'vitest'

describe('useCompetitionFilter', () => {
  beforeEach(() => {
    // Clear the shared useState by resetting it
    useState('competition-filter').value = undefined
  })

  it('defaults to all', () => {
    const { selected, competitionParam } = useCompetitionFilter()
    expect(selected.value).toBe('all')
    expect(competitionParam.value).toBeUndefined()
  })

  it('updates competitionParam when selected changes', () => {
    const { selected, competitionParam } = useCompetitionFilter()
    selected.value = 'serie_b'
    expect(competitionParam.value).toBe('serie_b')
    selected.value = 'all'
    expect(competitionParam.value).toBeUndefined()
  })

  it('accepts a default competition on fresh state', () => {
    // Since useState is cleared in beforeEach, the default now takes effect
    const { selected, competitionParam } = useCompetitionFilter('serie_a')
    expect(selected.value).toBe('serie_a')
    expect(competitionParam.value).toBe('serie_a')
  })
})
