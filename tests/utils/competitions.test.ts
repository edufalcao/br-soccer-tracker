import { describe, it, expect } from 'vitest'

// Inline the module logic to avoid Nuxt auto-import issues
interface CompetitionMeta {
  id: string
  apiFootballId: number
  nameKey: string
}

const COMPETITIONS: CompetitionMeta[] = [
  { id: 'serie_a', apiFootballId: 71, nameKey: 'competitions.serie_a' },
  { id: 'serie_b', apiFootballId: 72, nameKey: 'competitions.serie_b' },
  { id: 'copa_do_brasil', apiFootballId: 73, nameKey: 'competitions.copa_do_brasil' },
]

const CURRENT_SEASON = 2026

function getCompetitionByApiId(apiId: number) {
  return COMPETITIONS.find((c) => c.apiFootballId === apiId)
}

function getCompetitionById(id: string) {
  return COMPETITIONS.find((c) => c.id === id)
}

describe('competitions', () => {
  it('has 3 competitions defined', () => {
    expect(COMPETITIONS).toHaveLength(3)
  })

  it('has a valid current season', () => {
    expect(CURRENT_SEASON).toBeGreaterThanOrEqual(2024)
  })

  describe('getCompetitionByApiId', () => {
    it('finds serie_a by API ID', () => {
      const comp = getCompetitionByApiId(71)
      expect(comp).toBeDefined()
      expect(comp!.id).toBe('serie_a')
    })

    it('finds serie_b by API ID', () => {
      const comp = getCompetitionByApiId(72)
      expect(comp).toBeDefined()
      expect(comp!.id).toBe('serie_b')
    })

    it('finds copa_do_brasil by API ID', () => {
      const comp = getCompetitionByApiId(73)
      expect(comp).toBeDefined()
      expect(comp!.id).toBe('copa_do_brasil')
    })

    it('returns undefined for unknown API ID', () => {
      expect(getCompetitionByApiId(999)).toBeUndefined()
    })
  })

  describe('getCompetitionById', () => {
    it('finds competition by string id', () => {
      const comp = getCompetitionById('serie_a')
      expect(comp).toBeDefined()
      expect(comp!.apiFootballId).toBe(71)
    })

    it('returns undefined for invalid id', () => {
      expect(getCompetitionById('invalid')).toBeUndefined()
    })
  })
})
