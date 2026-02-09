<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      matches: Match[]
      teamMap: Map<number, Team>
      pending?: boolean
      emptyMessage?: string
    }>(),
    {
      pending: false,
      emptyMessage: undefined,
    },
  )

  const { t, locale } = useI18n()

  const groupedByDate = computed(() => {
    const groups: { label: string; matches: Match[] }[] = []
    const map = new Map<string, Match[]>()

    for (const match of props.matches) {
      const dateKey = new Date(match.kickoffAt).toLocaleDateString(locale.value)
      if (!map.has(dateKey)) map.set(dateKey, [])
      map.get(dateKey)!.push(match)
    }

    for (const [dateKey, matches] of map) {
      const label = formatRelativeDate(matches[0].kickoffAt, locale.value, {
        today: t('common.today'),
        yesterday: t('common.yesterday'),
        tomorrow: t('common.tomorrow'),
      })
      groups.push({ label: label === dateKey ? dateKey : label, matches })
    }

    return groups
  })
</script>

<template>
  <div v-if="pending" class="space-y-3">
    <div v-for="i in 4" :key="i" class="h-20 animate-pulse rounded-lg bg-slate-100" />
  </div>
  <BaseEmptyState v-else-if="!matches.length" :message="emptyMessage || t('matches.noMatches')" />
  <div v-else class="space-y-6">
    <div v-for="group in groupedByDate" :key="group.label">
      <h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{{ group.label }}</h3>
      <div class="space-y-2">
        <MatchCard v-for="match in group.matches" :key="match.id" :match="match" :team-map="teamMap" />
      </div>
    </div>
  </div>
</template>
