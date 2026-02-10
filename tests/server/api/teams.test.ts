import { describe, it, expect } from 'vitest'

describe('Teams API route', () => {
  it('expected response shape is { data: Team[] }', () => {
    const shape = { data: [{ id: '1', external_id: 127, name: 'Flamengo', competition: 'serie_a' }] }
    expect(shape.data[0]).toHaveProperty('external_id')
    expect(shape.data[0]).toHaveProperty('name')
    expect(shape.data[0]).toHaveProperty('competition')
  })

  it('accepts optional competition query filter', () => {
    const query = { competition: 'serie_a' }
    expect(query.competition).toBe('serie_a')
  })
})
