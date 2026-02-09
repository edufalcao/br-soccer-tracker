export function useStandings(competition: Ref<Competition>) {
  const {
    data: raw,
    pending,
    error,
    refresh,
  } = useFetch(() => `/api/standings/${competition.value}`, {
    transform: (res: { data: Record<string, unknown>[] }) => ({
      data: snakeToCamelArray<StandingEntry>(res.data),
    }),
    watch: [competition],
    default: () => ({ data: [] }),
  })

  const standings = computed(() => raw.value?.data ?? [])

  return { standings, pending, error, refresh }
}
