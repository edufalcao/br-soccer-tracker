<script setup lang="ts">
  const props = defineProps<{
    match: Match
    teamMap: Map<number, Team>
  }>()

  const { getTeamName } = useTeams()
  const { isFavorite } = useFavoriteTeams()

  const homeTeam = computed(() => props.teamMap.get(props.match.homeTeamId))
  const awayTeam = computed(() => props.teamMap.get(props.match.awayTeamId))
  const isFavoriteMatch = computed(() => isFavorite(props.match.homeTeamId) || isFavorite(props.match.awayTeamId))

  const isLive = computed(() => props.match.status === 'live')
  const isFinished = computed(() => props.match.status === 'finished')

  const scoreDisplay = computed(() => {
    if (props.match.status === 'scheduled') return '—'
    return `${props.match.homeScore ?? 0} - ${props.match.awayScore ?? 0}`
  })
</script>

<template>
  <BaseCard
    class="!p-3"
    :class="[
      isFavoriteMatch && 'ring-2 ring-gold/40 shadow-glow-gold',
      isLive && 'animate-glow-pulse neon-border',
      isFinished && 'opacity-75',
    ]"
  >
    <div class="flex items-center gap-3">
      <!-- Home team -->
      <div class="flex flex-1 items-center justify-end gap-2 text-right">
        <FavoriteStarIcon v-if="isFavorite(match.homeTeamId)" size="xs" />
        <span class="truncate text-sm font-semibold text-primary">{{ getTeamName(match.homeTeamId) }}</span>
        <TeamBadge :team="homeTeam" size="sm" />
      </div>

      <!-- Score -->
      <div class="flex flex-col items-center gap-1">
        <span
          class="min-w-[3.5rem] text-center font-display font-bold tabular-nums"
          :class="isLive ? 'text-3xl text-live' : 'text-lg text-primary'"
        >
          {{ scoreDisplay }}
        </span>
        <MatchStatusBadge
          :status="match.status"
          :elapsed-minutes="match.elapsedMinutes"
          :kickoff-at="match.kickoffAt"
        />
      </div>

      <!-- Away team -->
      <div class="flex flex-1 items-center gap-2">
        <TeamBadge :team="awayTeam" size="sm" />
        <span class="truncate text-sm font-semibold text-primary">{{ getTeamName(match.awayTeamId) }}</span>
        <FavoriteStarIcon v-if="isFavorite(match.awayTeamId)" size="xs" />
      </div>
    </div>

    <!-- Venue -->
    <p v-if="match.venue" class="mt-1 text-center text-xs text-secondary">{{ match.venue }}</p>
  </BaseCard>
</template>
