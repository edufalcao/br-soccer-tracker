<script setup lang="ts">
  const props = defineProps<{
    match: Match
    teamMap: Map<number, Team>
  }>()

  const { getTeamName } = useTeams()

  const homeTeam = computed(() => props.teamMap.get(props.match.homeTeamId))
  const awayTeam = computed(() => props.teamMap.get(props.match.awayTeamId))

  const scoreDisplay = computed(() => {
    if (props.match.status === 'scheduled') return '—'
    return `${props.match.homeScore ?? 0} - ${props.match.awayScore ?? 0}`
  })
</script>

<template>
  <BaseCard class="!p-3">
    <div class="flex items-center gap-3">
      <!-- Home team -->
      <div class="flex flex-1 items-center justify-end gap-2 text-right">
        <span class="truncate text-sm font-medium">{{ getTeamName(match.homeTeamId) }}</span>
        <TeamBadge :team="homeTeam" size="sm" />
      </div>

      <!-- Score -->
      <div class="flex flex-col items-center gap-1">
        <span class="min-w-[3.5rem] text-center text-lg font-bold tabular-nums">
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
        <span class="truncate text-sm font-medium">{{ getTeamName(match.awayTeamId) }}</span>
      </div>
    </div>

    <!-- Venue -->
    <p v-if="match.venue" class="mt-1 text-center text-xs text-slate-400">{{ match.venue }}</p>
  </BaseCard>
</template>
