import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  canCallApi,
  recordApiCall,
  getRemainingCalls,
  getDailyUsage,
  _resetForTesting,
} from '../../server/utils/rate-limiter'

describe('rate-limiter', () => {
  beforeEach(() => {
    _resetForTesting()
    vi.restoreAllMocks()
  })

  it('starts with full remaining calls', () => {
    expect(getRemainingCalls('api-football')).toBe(100)
    expect(getRemainingCalls('gnews')).toBe(100)
  })

  it('canCallApi returns true when calls remain', () => {
    expect(canCallApi('api-football')).toBe(true)
  })

  it('decrements remaining after recordApiCall', () => {
    recordApiCall('api-football')
    expect(getRemainingCalls('api-football')).toBe(99)
  })

  it('tracks providers independently', () => {
    recordApiCall('api-football')
    recordApiCall('api-football')
    recordApiCall('gnews')
    expect(getRemainingCalls('api-football')).toBe(98)
    expect(getRemainingCalls('gnews')).toBe(99)
  })

  it('canCallApi returns false when limit reached', () => {
    // Suppress console warnings during test
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})

    for (let i = 0; i < 100; i++) {
      recordApiCall('api-football')
    }
    expect(canCallApi('api-football')).toBe(false)
    expect(getRemainingCalls('api-football')).toBe(0)
  })

  it('getDailyUsage returns correct shape', () => {
    recordApiCall('gnews')
    const usage = getDailyUsage('gnews')
    expect(usage).toEqual({ used: 1, limit: 100, remaining: 99 })
  })

  it('logs warnings at threshold levels', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Record 80 calls to trigger 80% warning
    for (let i = 0; i < 80; i++) {
      recordApiCall('api-football')
    }
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('80%'))

    // Record to 90
    for (let i = 0; i < 10; i++) {
      recordApiCall('api-football')
    }
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('90%'))

    // Record to 100
    for (let i = 0; i < 10; i++) {
      recordApiCall('api-football')
    }
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('REACHED'))
  })
})
