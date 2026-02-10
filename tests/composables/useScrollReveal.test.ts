import { describe, it, expect, vi } from 'vitest'

// Mock IntersectionObserver
const mockObserve = vi.fn()
const mockDisconnect = vi.fn()
const mockUnobserve = vi.fn()

vi.stubGlobal(
  'IntersectionObserver',
  vi.fn(() => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: mockUnobserve,
  })),
)

describe('useScrollReveal', () => {
  it('is a function', () => {
    expect(typeof useScrollReveal).toBe('function')
  })

  // Note: Full testing requires mounted lifecycle which needs component mounting
  // The composable sets up IntersectionObserver on mount
})
