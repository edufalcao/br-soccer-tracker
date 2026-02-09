<script setup lang="ts">
  const { t } = useI18n()
  useHead({ title: t('home.title') })
  useSeoMeta({
    description: t('home.seoDescription'),
    ogTitle: t('home.title'),
    ogDescription: t('home.seoDescription'),
  })

  const { teamMap } = useTeams()
  const { hasFavorites, isFavorite } = useFavoriteTeams()

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

  // Upcoming matches (for "Your Teams" section)
  const { data: upcomingData } = useFetch('/api/matches/upcoming', {
    query: { limit: 20 },
    transform: (res: { data: Record<string, unknown>[] }) => ({
      data: snakeToCamelArray<Match>(res.data),
    }),
    default: () => ({ data: [] }),
  })
  const favoriteUpcomingMatches = computed(() => {
    if (!hasFavorites.value) return []
    return (upcomingData.value?.data ?? [])
      .filter((m) => isFavorite(m.homeTeamId) || isFavorite(m.awayTeamId))
      .slice(0, 5)
  })

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
    <!-- Hero Section -->
    <section class="-mx-4 -mt-6 mb-2 bg-gradient-pitch px-4 py-8 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
          <span class="text-accent">{{ t('competitions.serie_a') }}</span>
          <span class="mx-2 text-pitch-400">&middot;</span>
          <span>{{ t('competitions.serie_b') }}</span>
          <span class="mx-2 text-pitch-400">&middot;</span>
          <span>{{ t('competitions.copa_do_brasil') }}</span>
        </h1>
        <p class="mt-2 text-sm text-pitch-200">{{ t('home.seoDescription') }}</p>
        <div class="mx-auto mt-4 h-0.5 w-24 bg-gradient-accent" />
      </div>
    </section>

    <!-- Live Scores -->
    <section>
      <h2 class="mb-3 border-l-4 border-pitch-600 pl-3 text-lg font-semibold text-slate-800">
        {{ t('home.liveScores') }}
      </h2>
      <MatchLiveTicker :matches="liveMatches" :team-map="teamMap" />
    </section>

    <!-- Your Teams (favorites) -->
    <section v-if="hasFavorites">
      <div class="mb-3 flex items-center justify-between">
        <h2 class="border-l-4 border-pitch-600 pl-3 text-lg font-semibold text-slate-800">
          {{ t('home.yourTeams') }}
        </h2>
        <NuxtLink to="/favorites" class="text-sm font-medium text-pitch-700 hover:text-pitch-900">
          {{ t('favorites.selectTeams') }} &rarr;
        </NuxtLink>
      </div>
      <MatchList v-if="favoriteUpcomingMatches.length" :matches="favoriteUpcomingMatches" :team-map="teamMap" />
      <BaseEmptyState v-else :message="t('home.noFavoriteMatches')" />
    </section>

    <!-- Latest News -->
    <section>
      <div class="mb-3 flex items-center justify-between">
        <h2 class="border-l-4 border-pitch-600 pl-3 text-lg font-semibold text-slate-800">
          {{ t('home.latestNews') }}
        </h2>
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
        <h2 class="border-l-4 border-pitch-600 pl-3 text-lg font-semibold text-slate-800">
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
