import { describe, it, expect } from 'vitest'

describe('useUserPreferences', () => {
  it('is a function', () => {
    expect(typeof useUserPreferences).toBe('function')
  })

  it('returns expected API shape', () => {
    const result = useUserPreferences()
    expect(result).toHaveProperty('preferences')
    expect(result).toHaveProperty('loading')
    expect(result).toHaveProperty('fetchPreferences')
    expect(result).toHaveProperty('savePreferences')
    expect(result).toHaveProperty('syncOnLogin')
    expect(result).toHaveProperty('syncFavoritesToDb')
    expect(result).toHaveProperty('clearPreferences')
  })

  it('starts with null preferences', () => {
    const { preferences } = useUserPreferences()
    expect(preferences.value).toBeNull()
  })

  it('starts with loading false', () => {
    const { loading } = useUserPreferences()
    expect(loading.value).toBe(false)
  })

  it('clearPreferences resets to null', () => {
    const { clearPreferences, preferences } = useUserPreferences()
    clearPreferences()
    expect(preferences.value).toBeNull()
  })
})
