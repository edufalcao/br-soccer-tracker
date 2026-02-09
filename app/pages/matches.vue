<script setup lang="ts">
  const { t } = useI18n()
  useHead({ title: t('matches.title') })
  useSeoMeta({
    description: t('matches.seoDescription'),
    ogTitle: t('matches.title'),
    ogDescription: t('matches.seoDescription'),
  })

  const { teamMap } = useTeams()
  const { selected: selectedCompetition, competitionParam } = useCompetitionFilter()

  const { live, recent, upcoming, pendingLive, pendingRecent, pendingUpcoming, error } = useMatches({
    competition: competitionParam,
  })

  const activeTab = ref('live')

  const tabItems = computed(() => [
    { key: 'live', label: `${t('matches.live')}${live.value.length ? ` (${live.value.length})` : ''}` },
    { key: 'recent', label: t('matches.recent') },
    { key: 'upcoming', label: t('matches.upcoming') },
  ])
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold text-pitch-900 sm:text-3xl">{{ t('matches.title') }}</h1>
    <CompetitionFilterBar v-model="selectedCompetition" />
    <BaseTabs v-model="activeTab" :items="tabItems" />

    <BaseErrorState v-if="error" @retry="() => $router.go(0)" />
    <template v-else>
      <MatchList v-if="activeTab === 'live'" :matches="live" :team-map="teamMap" :pending="pendingLive" />
      <MatchList v-else-if="activeTab === 'recent'" :matches="recent" :team-map="teamMap" :pending="pendingRecent" />
      <MatchList v-else :matches="upcoming" :team-map="teamMap" :pending="pendingUpcoming" />
    </template>
  </div>
</template>
