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
    class="flex items-center justify-center gap-2 rounded-lg border border-pitch-100 bg-pitch-50 px-4 py-3 text-center text-sm text-pitch-700"
  >
    <span class="relative flex h-2 w-2">
      <span class="relative inline-flex h-2 w-2 rounded-full bg-pitch-300" />
    </span>
    {{ t('home.noLiveMatches') }}
  </div>
  <div v-else class="flex gap-3 overflow-x-auto pb-2">
    <NuxtLink
      v-for="match in matches"
      :key="match.id"
      to="/matches"
      class="flex min-w-[10rem] shrink-0 items-center gap-2 rounded-lg bg-red-50 px-3 py-2 transition-colors hover:bg-red-100"
      :class="
        isFavorite(match.homeTeamId) || isFavorite(match.awayTeamId) ? 'ring-2 ring-accent' : 'ring-1 ring-red-100'
      "
    >
      <span class="relative flex h-2 w-2">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      <span class="text-xs font-medium text-slate-700">
        {{ shortName(match.homeTeamId) }}
      </span>
      <span class="text-sm font-bold tabular-nums text-red-700">
        {{ match.homeScore ?? 0 }} - {{ match.awayScore ?? 0 }}
      </span>
      <span class="text-xs font-medium text-slate-700">
        {{ shortName(match.awayTeamId) }}
      </span>
      <span v-if="match.elapsedMinutes" class="text-xs text-red-500">{{ match.elapsedMinutes }}'</span>
    </NuxtLink>
  </div>
</template>
