<script setup lang="ts">
  const props = defineProps<{
    matches: Match[]
    teamMap: Map<number, Team>
  }>()

  const { t } = useI18n()
  const { getTeamName } = useTeams()
  const { isFavorite } = useFavoriteTeams()

  function shortName(externalId: number): string {
    return props.teamMap.get(externalId)?.shortName || getTeamName(externalId)
  }
</script>

<template>
  <div
    v-if="!matches.length"
    class="flex items-center justify-center gap-2 rounded-lg border border-pitch-100 bg-pitch-50/50 px-4 py-3 text-center text-sm text-pitch-700 pitch-sideline"
  >
    <span class="relative flex h-2 w-2">
      <span class="relative inline-flex h-2 w-2 rounded-full bg-pitch-300" />
    </span>
    {{ t('home.noLiveMatches') }}
  </div>
  <div v-else class="flex gap-3 overflow-x-auto pb-2">
    <NuxtLink
      v-for="(match, index) in matches"
      :key="match.id"
      to="/matches"
      class="flex min-w-[10rem] shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-red-50 to-white px-3 py-2 shadow-sm transition-colors hover:from-red-100 hover:to-red-50/50 animate-slide-in-left"
      :class="[
        isFavorite(match.homeTeamId) || isFavorite(match.awayTeamId) ? 'ring-2 ring-accent' : 'ring-1 ring-red-200/60',
        `stagger-${(index % 8) + 1}`,
      ]"
    >
      <span class="relative flex h-2 w-2">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      <span class="text-xs font-semibold text-pitch-800">
        {{ shortName(match.homeTeamId) }}
      </span>
      <span class="font-display text-sm font-bold tabular-nums text-red-700">
        {{ match.homeScore ?? 0 }} - {{ match.awayScore ?? 0 }}
      </span>
      <span class="text-xs font-semibold text-pitch-800">
        {{ shortName(match.awayTeamId) }}
      </span>
      <span v-if="match.elapsedMinutes" class="text-xs text-red-500">{{ match.elapsedMinutes }}'</span>
    </NuxtLink>
  </div>
</template>
