<script setup lang="ts">
  const { t } = useI18n()
  useHead({ title: t('home.title') })

  const { teamMap } = useTeams()

  // Live matches
  const { data: liveData, refresh: refreshLive } = useFetch('/api/matches/live', {
    transform: (res: { data: Record<string, unknown>[] }) => ({
      data: snakeToCamelArray<Match>(res.data),
    }),
    default: () => ({ data: [] }),
  })
  const liveMatches = computed(() => liveData.value?.data ?? [])

  // Latest news (6 articles)
  const { data: newsData } = useFetch('/api/news', {
    query: { limit: 6 },
    transform: (res: { data: Record<string, unknown>[] }) => ({
      data: snakeToCamelArray<NewsArticle>(res.data),
    }),
    default: () => ({ data: [] }),
  })
  const latestNews = computed(() => newsData.value?.data ?? [])

  // Serie A standings
  const serieAComp = ref<Competition>('serie_a')
  const { standings } = useStandings(serieAComp)

  // Poll live matches every 60s
  let pollInterval: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    pollInterval = setInterval(() => {
      refreshLive()
    }, 60_000)
  })

  onUnmounted(() => {
    if (pollInterval) clearInterval(pollInterval)
  })
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-2xl font-bold text-pitch-900 sm:text-3xl">{{ t('home.title') }}</h1>

    <!-- Live Scores -->
    <section>
      <h2 class="mb-3 text-lg font-semibold text-slate-800">{{ t('home.liveScores') }}</h2>
      <MatchLiveTicker :matches="liveMatches" :team-map="teamMap" />
    </section>

    <!-- Latest News -->
    <section>
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-slate-800">{{ t('home.latestNews') }}</h2>
        <NuxtLink to="/news" class="text-sm font-medium text-pitch-700 hover:text-pitch-900">
          {{ t('common.seeAll') }} &rarr;
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NewsCard v-for="article in latestNews" :key="article.id" :article="article" :team-map="teamMap" />
      </div>
      <BaseEmptyState v-if="!latestNews.length" :message="t('news.noNews')" />
    </section>

    <!-- Standings (Serie A top 5) -->
    <section>
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-slate-800">
          {{ t('standings.title') }} &mdash; {{ t('competitions.serie_a') }}
        </h2>
        <NuxtLink to="/standings" class="text-sm font-medium text-pitch-700 hover:text-pitch-900">
          {{ t('common.seeAll') }} &rarr;
        </NuxtLink>
      </div>
      <BaseCard>
        <StandingsTable :standings="standings" :team-map="teamMap" compact />
      </BaseCard>
    </section>
  </div>
</template>
