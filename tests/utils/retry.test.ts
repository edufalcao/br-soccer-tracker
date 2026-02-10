import { describe, it, expect, vi } from 'vitest'
import { withRetry } from '../../server/utils/retry'

describe('withRetry', () => {
  it('returns result on first success', async () => {
    const fn = vi.fn().mockResolvedValue('ok')
    const result = await withRetry(fn, { maxRetries: 3, baseDelayMs: 1 })
    expect(result).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('retries on transient errors and succeeds', async () => {
    const fn = vi.fn().mockRejectedValueOnce(new Error('network timeout')).mockResolvedValue('ok')

    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const result = await withRetry(fn, { maxRetries: 3, baseDelayMs: 1 })
    expect(result).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('does not retry on 4xx client errors', async () => {
    const err = new Error('Not found') as Error & { statusCode: number }
    err.statusCode = 404
    const fn = vi.fn().mockRejectedValue(err)

    await expect(withRetry(fn, { maxRetries: 3, baseDelayMs: 1 })).rejects.toThrow('Not found')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('retries on 429 rate limit errors', async () => {
    const err = new Error('Too Many Requests') as Error & { statusCode: number }
    err.statusCode = 429
    const fn = vi.fn().mockRejectedValueOnce(err).mockResolvedValue('ok')

    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const result = await withRetry(fn, { maxRetries: 3, baseDelayMs: 1 })
    expect(result).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('retries on 5xx server errors', async () => {
    const err = new Error('Internal Server Error') as Error & { statusCode: number }
    err.statusCode = 500
    const fn = vi.fn().mockRejectedValueOnce(err).mockResolvedValue('ok')

    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const result = await withRetry(fn, { maxRetries: 3, baseDelayMs: 1 })
    expect(result).toBe('ok')
  })

  it('throws after exhausting retries', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('persistent failure'))

    vi.spyOn(console, 'warn').mockImplementation(() => {})
    await expect(withRetry(fn, { maxRetries: 2, baseDelayMs: 1 })).rejects.toThrow('persistent failure')
    expect(fn).toHaveBeenCalledTimes(3) // initial + 2 retries
  })

  it('respects custom shouldRetry predicate', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('custom'))

    await expect(withRetry(fn, { maxRetries: 3, baseDelayMs: 1, shouldRetry: () => false })).rejects.toThrow('custom')
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
