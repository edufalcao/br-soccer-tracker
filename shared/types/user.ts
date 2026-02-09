export interface UserPreferences {
  id: string
  userId: string
  language: 'pt-BR' | 'en'
  favoriteTeamIds: number[]
  createdAt: string
  updatedAt: string
}
