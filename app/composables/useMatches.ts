export function useMatches(options?: { competition?: Ref<Competition | undefined> }) {
  const competitionQuery = computed(() => options?.competition?.value ?? undefined)

  const {
    data: liveData,
    pending: pendingLive,
    error: errorLive,
    refresh: refreshLive,
  } = useFetch('/api/matches/live', {
    query: { competition: competitionQuery },
    transform: (res: { data: Record<string, unknown>[] }) => ({
      data: snakeToCamelArray<Match>(res.data),
    }),
    default: () => ({ data: [] }),
  })

  const {
    data: recentData,
    pending: pendingRecent,
    error: errorRecent,
  } = useFetch('/api/matches/recent', {
    query: { competition: competitionQuery, limit: 20 },
    transform: (res: { data: Record<string, unknown>[] }) => ({
      data: snakeToCamelArray<Match>(res.data),
    }),
    default: () => ({ data: [] }),
  })

  const {
    data: upcomingData,
    pending: pendingUpcoming,
    error: errorUpcoming,
  } = useFetch('/api/matches/upcoming', {
    query: { competition: competitionQuery, limit: 20 },
    transform: (res: { data: Record<string, unknown>[] }) => ({
      data: snakeToCamelArray<Match>(res.data),
    }),
    default: () => ({ data: [] }),
  })

  const live = computed(() => liveData.value?.data ?? [])
  const recent = computed(() => recentData.value?.data ?? [])
  const upcoming = computed(() => upcomingData.value?.data ?? [])
  const error = computed(() => errorLive.value || errorRecent.value || errorUpcoming.value)

  return {
    live,
    recent,
    upcoming,
    pendingLive,
    pendingRecent,
    pendingUpcoming,
    error,
    refreshLive,
  }
}
