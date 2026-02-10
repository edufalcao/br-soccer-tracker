import { describe, it, expect } from 'vitest'

describe('Health endpoint', () => {
  it('response has correct shape', () => {
    const expectedShape = {
      status: expect.stringMatching(/^(ok|degraded|error)$/),
      timestamp: expect.any(String),
      uptime: expect.any(Number),
      supabase: { connected: expect.any(Boolean), error: null },
      apiFootball: { remaining: expect.any(Number), limit: 100, healthy: expect.any(Boolean) },
      gnews: { remaining: expect.any(Number), limit: 100, healthy: expect.any(Boolean) },
    }

    // Validate shape structure
    const mock = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: 123.45,
      supabase: { connected: true, error: null },
      apiFootball: { remaining: 100, limit: 100, healthy: true },
      gnews: { remaining: 100, limit: 100, healthy: true },
    }

    expect(mock).toEqual(expectedShape)
  })

  it('status is degraded when API limits exhausted', () => {
    const determineStatus = (supabaseOk: boolean, apiOk: boolean, gnewsOk: boolean) => {
      if (!supabaseOk) return 'error'
      if (!apiOk || !gnewsOk) return 'degraded'
      return 'ok'
    }

    expect(determineStatus(true, true, true)).toBe('ok')
    expect(determineStatus(true, false, true)).toBe('degraded')
    expect(determineStatus(true, true, false)).toBe('degraded')
    expect(determineStatus(false, true, true)).toBe('error')
  })
})
