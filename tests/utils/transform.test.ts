import { describe, it, expect } from 'vitest'
import { snakeToCamel, snakeToCamelArray } from '~/utils/transform'

describe('snakeToCamel', () => {
  it('converts simple snake_case keys to camelCase', () => {
    const input = { first_name: 'John', last_name: 'Doe' }
    const result = snakeToCamel<{ firstName: string; lastName: string }>(input)
    expect(result).toEqual({ firstName: 'John', lastName: 'Doe' })
  })

  it('handles nested objects', () => {
    const input = { team_info: { team_name: 'Flamengo', team_id: 1 } }
    const result = snakeToCamel<{ teamInfo: { teamName: string; teamId: number } }>(input)
    expect(result).toEqual({ teamInfo: { teamName: 'Flamengo', teamId: 1 } })
  })

  it('handles arrays of objects', () => {
    const input = { team_list: [{ team_name: 'A' }, { team_name: 'B' }] }
    const result = snakeToCamel<{ teamList: { teamName: string }[] }>(input)
    expect(result.teamList).toHaveLength(2)
    expect(result.teamList[0].teamName).toBe('A')
  })

  it('handles arrays of primitives', () => {
    const input = { team_ids: [1, 2, 3] }
    const result = snakeToCamel<{ teamIds: number[] }>(input)
    expect(result.teamIds).toEqual([1, 2, 3])
  })

  it('passes through non-object values', () => {
    expect(snakeToCamel(null as unknown as Record<string, unknown>)).toBeNull()
  })

  it('handles empty objects', () => {
    expect(snakeToCamel({})).toEqual({})
  })

  it('preserves keys that are already camelCase', () => {
    const input = { alreadyCamel: 'ok', snake_case: 'ok' }
    const result = snakeToCamel<{ alreadyCamel: string; snakeCase: string }>(input)
    expect(result.alreadyCamel).toBe('ok')
    expect(result.snakeCase).toBe('ok')
  })
})

describe('snakeToCamelArray', () => {
  it('converts array of snake_case objects', () => {
    const input = [{ team_name: 'A' }, { team_name: 'B' }]
    const result = snakeToCamelArray<{ teamName: string }>(input)
    expect(result).toEqual([{ teamName: 'A' }, { teamName: 'B' }])
  })

  it('handles empty array', () => {
    expect(snakeToCamelArray([])).toEqual([])
  })
})
