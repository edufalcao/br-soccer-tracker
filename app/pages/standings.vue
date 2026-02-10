<script setup lang="ts">
  const { t } = useI18n()
  useHead({ title: t('standings.title') })
  useSeoMeta({
    description: t('standings.seoDescription'),
    ogTitle: t('standings.title'),
    ogDescription: t('standings.seoDescription'),
  })

  const { teamMap } = useTeams()

  const activeCompetition = ref<Competition>('serie_a')

  const competitionTabs = computed(() => [
    { key: 'serie_a', label: t('competitions.serie_a') },
    { key: 'serie_b', label: t('competitions.serie_b') },
    { key: 'copa_do_brasil', label: t('competitions.copa_do_brasil') },
  ])

  const { standings, pending, error } = useStandings(activeCompetition)
</script>

<template>
  <div class="animate-fade-in">
    <div class="mb-6">
      <span class="section-label">{{ t('nav.standings') }}</span>
      <h1 class="section-header mt-1">{{ t('standings.title') }}</h1>
      <div class="mt-1 h-[2px] w-12 bg-accent" />
    </div>
    <BaseTabs v-model="activeCompetition" :items="competitionTabs" />
    <div class="pitch-sideline">
      <BaseErrorState v-if="error" @retry="() => $router.go(0)" />
      <BaseCard v-else editorial>
        <StandingsTable :standings="standings" :team-map="teamMap" :pending="pending" />
      </BaseCard>
    </div>
  </div>
</template>
