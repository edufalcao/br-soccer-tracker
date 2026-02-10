import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      store = Object.fromEntries(Object.entries(store).filter(([k]) => k !== key))
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })

describe('useFavoriteTeams', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('starts with empty favorites', () => {
    const { favoriteTeamIds, hasFavorites } = useFavoriteTeams()
    expect(favoriteTeamIds.value).toEqual([])
    expect(hasFavorites.value).toBe(false)
  })

  it('adds a favorite team', () => {
    const { addFavorite, favoriteTeamIds, isFavorite } = useFavoriteTeams()
    addFavorite(71)
    expect(favoriteTeamIds.value).toContain(71)
    expect(isFavorite(71)).toBe(true)
  })

  it('does not add duplicate favorites', () => {
    const { addFavorite, favoriteTeamIds } = useFavoriteTeams()
    addFavorite(71)
    addFavorite(71)
    expect(favoriteTeamIds.value.filter((id) => id === 71)).toHaveLength(1)
  })

  it('removes a favorite team', () => {
    const { addFavorite, removeFavorite, isFavorite } = useFavoriteTeams()
    addFavorite(71)
    removeFavorite(71)
    expect(isFavorite(71)).toBe(false)
  })

  it('toggles favorite', () => {
    const { toggleFavorite, isFavorite } = useFavoriteTeams()
    toggleFavorite(71)
    expect(isFavorite(71)).toBe(true)
    toggleFavorite(71)
    expect(isFavorite(71)).toBe(false)
  })

  it('sets favorites replacing existing ones', () => {
    const { addFavorite, setFavorites, favoriteTeamIds } = useFavoriteTeams()
    addFavorite(71)
    setFavorites([100, 200])
    expect(favoriteTeamIds.value).toEqual([100, 200])
  })

  it('clears all favorites', () => {
    const { addFavorite, clearFavorites, hasFavorites } = useFavoriteTeams()
    addFavorite(71)
    addFavorite(72)
    clearFavorites()
    expect(hasFavorites.value).toBe(false)
  })

  it('provides a favoriteSet computed', () => {
    const { addFavorite, favoriteSet } = useFavoriteTeams()
    addFavorite(10)
    addFavorite(20)
    expect(favoriteSet.value.has(10)).toBe(true)
    expect(favoriteSet.value.has(20)).toBe(true)
    expect(favoriteSet.value.has(30)).toBe(false)
  })
})
