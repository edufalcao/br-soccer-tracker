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
  <div class="animate-fade-in">
    <div class="mb-6">
      <span class="section-label">{{ t('nav.news') }}</span>
      <h1 class="section-header mt-1">{{ t('news.title') }}</h1>
      <div class="mt-1 h-px w-12 bg-neon/50" />
    </div>
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
      featured
      @page-change="(p) => (page = p)"
    />
  </div>
</template>
