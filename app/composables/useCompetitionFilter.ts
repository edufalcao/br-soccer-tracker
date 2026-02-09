export function useCompetitionFilter(defaultValue: Competition | 'all' = 'all') {
  const selected = useState<Competition | 'all'>('competition-filter', () => defaultValue)

  const competitionParam = computed(() => (selected.value === 'all' ? undefined : selected.value))

  return {
    selected,
    competitionParam,
  }
}
