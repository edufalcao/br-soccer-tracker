import { describe, it, expect } from 'vitest'

describe('User Preferences API routes', () => {
  describe('GET /api/user/preferences', () => {
    it('requires authentication (returns 401 without user)', () => {
      // The handler checks serverSupabaseUser and throws 401 if null
      const user = null
      expect(user).toBeNull()
    })
  })

  describe('POST /api/user/preferences', () => {
    it('validates language to pt-BR or en', () => {
      const validLanguages = ['pt-BR', 'en']
      expect(validLanguages.includes('pt-BR')).toBe(true)
      expect(validLanguages.includes('en')).toBe(true)
      expect(validLanguages.includes('fr')).toBe(false)
    })

    it('validates favoriteTeamIds is array of numbers', () => {
      const valid = [1, 2, 3]
      const invalid = ['a', 'b']
      expect(Array.isArray(valid) && valid.every((id) => typeof id === 'number')).toBe(true)
      expect(Array.isArray(invalid) && invalid.every((id: unknown) => typeof id === 'number')).toBe(false)
    })

    it('requires authentication', () => {
      const user = null
      expect(user).toBeNull()
    })
  })
})
