export function useUserPreferences() {
  const user = useSupabaseUser()
  const preferences = useState<UserPreferences | null>('user-preferences', () => null)
  const loading = useState<boolean>('user-preferences-loading', () => false)

  async function fetchPreferences(): Promise<void> {
    if (!user.value) return
    loading.value = true

    try {
      const res = await $fetch<{ data: Record<string, unknown> | null }>('/api/user/preferences')
      preferences.value = res.data ? snakeToCamel<UserPreferences>(res.data) : null
    } catch {
      // Silently fail — preferences are optional
    } finally {
      loading.value = false
    }
  }

  async function savePreferences(
    updates: Partial<Pick<UserPreferences, 'language' | 'favoriteTeamIds'>>,
  ): Promise<void> {
    if (!user.value) return

    try {
      await $fetch('/api/user/preferences', {
        method: 'POST',
        body: updates,
      })
    } catch {
      // Silently fail — will retry on next sync
    }
  }

  async function syncOnLogin(): Promise<void> {
    const { favoriteTeamIds: localFavorites, setFavorites } = useFavoriteTeams()

    // Fetch DB preferences
    await fetchPreferences()

    // Union of localStorage + DB favorites
    const dbFavorites = preferences.value?.favoriteTeamIds ?? []
    const merged = [...new Set([...localFavorites.value, ...dbFavorites])]

    // Update localStorage with merged set
    setFavorites(merged)

    // Save merged set back to DB
    await savePreferences({ favoriteTeamIds: merged })
  }

  async function syncFavoritesToDb(): Promise<void> {
    if (!user.value) return
    const { favoriteTeamIds } = useFavoriteTeams()
    await savePreferences({ favoriteTeamIds: [...favoriteTeamIds.value] })
  }

  // Debounced watch: sync favorites to DB when they change while authenticated
  if (import.meta.client) {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    const { favoriteTeamIds } = useFavoriteTeams()

    watch(favoriteTeamIds, () => {
      if (!user.value) return
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        syncFavoritesToDb()
      }, 1000)
    })
  }

  function clearPreferences(): void {
    preferences.value = null
  }

  return {
    preferences: readonly(preferences),
    loading: readonly(loading),
    fetchPreferences,
    savePreferences,
    syncOnLogin,
    syncFavoritesToDb,
    clearPreferences,
  }
}
