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
    class="flex flex-col items-center justify-center gap-3 rounded-xl border border-theme bg-card-raised py-10 text-center"
  >
    <!-- Inactive live dot -->
    <span class="inline-flex h-3 w-3 rounded-full bg-secondary/40" />
    <p class="font-display text-sm font-semibold text-secondary">{{ t('home.noLiveMatches') }}</p>
    <NuxtLink
      to="/matches"
      class="font-display text-xs font-semibold uppercase tracking-widest text-neon transition-colors hover:text-neon-dim"
    >
      {{ t('matches.upcoming') }} &rarr;
    </NuxtLink>
  </div>
  <div v-else class="flex gap-3 overflow-x-auto pb-2">
    <NuxtLink
      v-for="(match, index) in matches"
      :key="match.id"
      to="/matches"
      class="flex min-w-[10rem] shrink-0 items-center gap-2 rounded-lg border border-live/20 bg-card-raised animate-glow-pulse px-3 py-2 transition-colors hover:shadow-glow-live"
      :class="[
        isFavorite(match.homeTeamId) || isFavorite(match.awayTeamId) ? 'ring-2 ring-gold shadow-glow-gold' : '',
        `stagger-${(index % 8) + 1}`,
      ]"
    >
      <span class="relative flex h-2 w-2">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
        <span class="relative inline-flex h-2 w-2 rounded-full bg-live" />
      </span>
      <span class="font-sans text-sm font-semibold text-primary">
        {{ shortName(match.homeTeamId) }}
      </span>
      <span class="font-display text-xl font-bold tabular-nums text-live">
        {{ match.homeScore ?? 0 }} - {{ match.awayScore ?? 0 }}
      </span>
      <span class="font-sans text-sm font-semibold text-primary">
        {{ shortName(match.awayTeamId) }}
      </span>
      <span
        v-if="match.elapsedMinutes"
        class="rounded-md bg-live/20 px-1.5 py-0.5 text-xs font-bold text-live border border-live/30"
      >
        {{ match.elapsedMinutes }}'
      </span>
    </NuxtLink>
  </div>
</template>
