export function useTeams() {
  const teams = useState<Team[]>('teams', () => [])
  const { locale } = useI18n()

  const { pending, error } = useFetch('/api/teams', {
    transform: (res: { data: Record<string, unknown>[] }) => ({
      data: snakeToCamelArray<Team>(res.data),
    }),
    onResponse({ response }) {
      if (response._data?.data) {
        teams.value = snakeToCamelArray<Team>(response._data.data as unknown as Record<string, unknown>[])
      }
    },
    default: () => ({ data: [] }),
  })

  const teamMap = computed(() => {
    const map = new Map<number, Team>()
    for (const team of teams.value) {
      map.set(team.externalId, team)
    }
    return map
  })

  function getTeam(externalId: number): Team | undefined {
    return teamMap.value.get(externalId)
  }

  function getTeamName(externalId: number): string {
    const team = teamMap.value.get(externalId)
    if (!team) return `#${externalId}`
    return locale.value === 'en' && team.nameEn ? team.nameEn : team.name
  }

  return {
    teams,
    teamMap,
    getTeam,
    getTeamName,
    pending,
    error,
  }
}
