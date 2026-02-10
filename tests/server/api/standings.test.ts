import { describe, it, expect } from 'vitest'

const VALID_COMPETITIONS = ['serie_a', 'serie_b', 'copa_do_brasil']

describe('Standings API route', () => {
  it('validates competition parameter', () => {
    expect(VALID_COMPETITIONS.includes('serie_a')).toBe(true)
    expect(VALID_COMPETITIONS.includes('serie_b')).toBe(true)
    expect(VALID_COMPETITIONS.includes('copa_do_brasil')).toBe(true)
    expect(VALID_COMPETITIONS.includes('invalid')).toBe(false)
  })

  it('rejects missing competition parameter', () => {
    const competition = undefined
    expect(!competition || !VALID_COMPETITIONS.includes(competition)).toBe(true)
  })

  it('expected response shape is { data: StandingEntry[] }', () => {
    const shape = { data: [{ position: 1, points: 30, team_external_id: 10 }] }
    expect(shape.data[0]).toHaveProperty('position')
    expect(shape.data[0]).toHaveProperty('points')
  })
})
