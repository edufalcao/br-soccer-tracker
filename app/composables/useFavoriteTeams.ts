const STORAGE_KEY = 'br-soccer-tracker:favorite-teams'

export function useFavoriteTeams() {
  const favoriteTeamIds = useState<number[]>('favorite-team-ids', () => [])

  // Hydrate from localStorage on client (after SSR to avoid mismatch)
  if (import.meta.client) {
    onNuxtReady(() => {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const parsed: unknown = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            favoriteTeamIds.value = parsed.filter((id): id is number => typeof id === 'number')
          }
        } catch {
          // Corrupted data — ignore
        }
      }
    })
  }

  function persist() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteTeamIds.value))
    }
  }

  function addFavorite(externalId: number) {
    if (!favoriteTeamIds.value.includes(externalId)) {
      favoriteTeamIds.value = [...favoriteTeamIds.value, externalId]
      persist()
    }
  }

  function removeFavorite(externalId: number) {
    favoriteTeamIds.value = favoriteTeamIds.value.filter((id) => id !== externalId)
    persist()
  }

  function toggleFavorite(externalId: number) {
    if (favoriteTeamIds.value.includes(externalId)) {
      removeFavorite(externalId)
    } else {
      addFavorite(externalId)
    }
  }

  function isFavorite(externalId: number): boolean {
    return favoriteTeamIds.value.includes(externalId)
  }

  function setFavorites(ids: number[]) {
    favoriteTeamIds.value = [...ids]
    persist()
  }

  function clearFavorites() {
    favoriteTeamIds.value = []
    persist()
  }

  const hasFavorites = computed(() => favoriteTeamIds.value.length > 0)
  const favoriteSet = computed(() => new Set(favoriteTeamIds.value))

  return {
    favoriteTeamIds: readonly(favoriteTeamIds),
    favoriteSet,
    hasFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    setFavorites,
    clearFavorites,
  }
}
