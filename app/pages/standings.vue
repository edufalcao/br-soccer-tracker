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
  <div>
    <h1 class="mb-6 text-2xl font-bold text-pitch-900 sm:text-3xl">{{ t('standings.title') }}</h1>
    <BaseTabs v-model="activeCompetition" :items="competitionTabs" />
    <BaseErrorState v-if="error" @retry="() => $router.go(0)" />
    <StandingsTable v-else :standings="standings" :team-map="teamMap" :pending="pending" />
  </div>
</template>
