<script setup lang="ts">
  const { t } = useI18n()
  useHead({ title: t('news.title') })
  useSeoMeta({
    description: t('news.seoDescription'),
    ogTitle: t('news.title'),
    ogDescription: t('news.seoDescription'),
  })

  const { teamMap } = useTeams()
  const { selected: selectedCompetition, competitionParam } = useCompetitionFilter()

  const page = ref(1)

  const { articles, meta, pending, error } = useNews({
    competition: competitionParam,
    page,
  })

  // Reset page when competition changes
  watch(competitionParam, () => {
    page.value = 1
  })
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold text-pitch-900 sm:text-3xl">{{ t('news.title') }}</h1>
    <CompetitionFilterBar v-model="selectedCompetition" />
    <BaseErrorState v-if="error" @retry="() => $router.go(0)" />
    <NewsList
      v-else
      :articles="articles"
      :team-map="teamMap"
      :pending="pending"
      :total="meta.total"
      :page="meta.page"
      :limit="meta.limit"
      @page-change="(p) => (page = p)"
    />
  </div>
</template>
