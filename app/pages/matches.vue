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
  <div class="animate-fade-in">
    <div class="mb-6">
      <span class="section-label">{{ t('nav.matches') }}</span>
      <h1 class="section-header mt-1">{{ t('matches.title') }}</h1>
      <div class="mt-1 h-[2px] w-12 bg-accent" />
    </div>
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
