<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      standings: StandingEntry[]
      teamMap: Map<number, Team>
      pending?: boolean
      compact?: boolean
    }>(),
    {
      pending: false,
      compact: false,
    },
  )

  const { t } = useI18n()
  const { getTeamName } = useTeams()
  const { favoriteSet } = useFavoriteTeams()

  const displayStandings = computed(() => (props.compact ? props.standings.slice(0, 5) : props.standings))

  const competition = computed(() => props.standings[0]?.competition)

  function zoneClass(position: number): string {
    if (!competition.value || competition.value === 'copa_do_brasil') return ''
    if (competition.value === 'serie_a') {
      if (position <= 4) return 'border-l-4 border-l-green-500 bg-green-50/30'
      if (position <= 6) return 'border-l-4 border-l-blue-500 bg-blue-50/30'
      if (position >= 17) return 'border-l-4 border-l-red-500 bg-red-50/30'
    }
    if (competition.value === 'serie_b') {
      if (position <= 4) return 'border-l-4 border-l-green-500 bg-green-50/30'
      if (position >= 17) return 'border-l-4 border-l-red-500 bg-red-50/30'
    }
    return ''
  }
</script>

<template>
  <div v-if="pending" class="space-y-3 py-4">
    <div v-for="i in 5" :key="i" class="h-10 animate-pulse rounded bg-pitch-50" />
  </div>
  <BaseEmptyState v-else-if="!standings.length" :message="t('common.noResults')" />
  <div v-else class="overflow-x-auto">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="bg-pitch-900 text-[11px] font-bold uppercase tracking-wider text-pitch-100">
          <th class="px-2 py-2.5 text-center">{{ t('standings.position') }}</th>
          <th class="px-2 py-2.5">{{ t('standings.team') }}</th>
          <th class="px-2 py-2.5 text-center">{{ t('standings.played') }}</th>
          <template v-if="!compact">
            <th class="hidden px-2 py-2.5 text-center md:table-cell">{{ t('standings.won') }}</th>
            <th class="hidden px-2 py-2.5 text-center md:table-cell">{{ t('standings.drawn') }}</th>
            <th class="hidden px-2 py-2.5 text-center md:table-cell">{{ t('standings.lost') }}</th>
            <th class="hidden px-2 py-2.5 text-center md:table-cell">{{ t('standings.goalsFor') }}</th>
            <th class="hidden px-2 py-2.5 text-center md:table-cell">{{ t('standings.goalsAgainst') }}</th>
          </template>
          <th class="px-2 py-2.5 text-center">{{ t('standings.goalDifference') }}</th>
          <th class="px-2 py-2.5 text-center">{{ t('standings.points') }}</th>
          <th v-if="!compact" class="hidden px-2 py-2.5 text-center lg:table-cell">{{ t('standings.form') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in displayStandings"
          :key="entry.teamExternalId"
          class="border-b border-pitch-100 transition-colors hover:bg-pitch-50/50 animate-fade-in"
          :class="[
            zoneClass(entry.position),
            favoriteSet.has(entry.teamExternalId) && 'bg-accent/5',
            `stagger-${(index % 8) + 1}`,
          ]"
        >
          <td class="px-2 py-2 text-center font-display font-bold text-pitch-600">{{ entry.position }}</td>
          <td class="px-2 py-2">
            <div class="flex items-center gap-2">
              <FavoriteStarIcon v-if="favoriteSet.has(entry.teamExternalId)" size="xs" />
              <TeamBadge :team="teamMap.get(entry.teamExternalId)" size="sm" />
              <span
                class="truncate"
                :class="favoriteSet.has(entry.teamExternalId) ? 'font-bold text-pitch-900' : 'font-medium'"
              >
                {{
                  compact
                    ? teamMap.get(entry.teamExternalId)?.shortName || getTeamName(entry.teamExternalId)
                    : getTeamName(entry.teamExternalId)
                }}
              </span>
            </div>
          </td>
          <td class="px-2 py-2 text-center">{{ entry.played }}</td>
          <template v-if="!compact">
            <td class="hidden px-2 py-2 text-center md:table-cell">{{ entry.won }}</td>
            <td class="hidden px-2 py-2 text-center md:table-cell">{{ entry.drawn }}</td>
            <td class="hidden px-2 py-2 text-center md:table-cell">{{ entry.lost }}</td>
            <td class="hidden px-2 py-2 text-center md:table-cell">{{ entry.goalsFor }}</td>
            <td class="hidden px-2 py-2 text-center md:table-cell">{{ entry.goalsAgainst }}</td>
          </template>
          <td class="px-2 py-2 text-center">
            {{ entry.goalDifference > 0 ? `+${entry.goalDifference}` : entry.goalDifference }}
          </td>
          <td class="px-2 py-2 text-center font-display text-lg font-bold text-pitch-900">{{ entry.points }}</td>
          <td v-if="!compact" class="hidden px-2 py-2 text-center lg:table-cell">
            <StandingsFormIndicator :form="entry.form" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
