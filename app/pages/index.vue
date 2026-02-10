<script setup lang="ts">
  const { t } = useI18n()
  useHead({ title: t('home.title') })
  useSeoMeta({
    description: t('home.seoDescription'),
    ogTitle: t('home.title'),
    ogDescription: t('home.seoDescription'),
  })

  useScrollReveal()

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
  <div class="space-y-10">
    <!-- Hero Section -->
    <section
      class="-mx-4 -mt-6 mb-2 bg-gradient-editorial texture-noise pitch-lines px-4 py-12 text-white sm:-mx-6 sm:px-6 sm:py-16 lg:-mx-8 lg:px-8 lg:py-20"
    >
      <div class="relative z-10 mx-auto max-w-3xl text-center">
        <h1 class="font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl">
          <span class="text-accent">{{ t('competitions.serie_a') }}</span>
          <span class="mx-2 text-pitch-400/60">&middot;</span>
          <span>{{ t('competitions.serie_b') }}</span>
          <span class="mx-2 text-pitch-400/60">&middot;</span>
          <span>{{ t('competitions.copa_do_brasil') }}</span>
        </h1>
        <p class="mt-3 text-sm text-pitch-200">{{ t('home.seoDescription') }}</p>
        <div class="mx-auto mt-5 h-[2px] w-24 bg-gradient-accent" />
      </div>
    </section>

    <!-- Live Scores -->
    <section>
      <div class="mb-4">
        <span class="section-label">{{ t('home.liveScores') }}</span>
        <h2 class="section-header mt-1">{{ t('home.liveScores') }}</h2>
        <div class="mt-1 h-[2px] w-12 bg-accent" />
      </div>
      <MatchLiveTicker :matches="liveMatches" :team-map="teamMap" />
    </section>

    <!-- Your Teams (favorites) -->
    <section v-if="hasFavorites" class="reveal">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <span class="section-label">{{ t('home.yourTeams') }}</span>
          <h2 class="section-header mt-1">{{ t('home.yourTeams') }}</h2>
          <div class="mt-1 h-[2px] w-12 bg-accent" />
        </div>
        <NuxtLink to="/favorites" class="text-sm font-semibold text-pitch-700 hover:text-pitch-900">
          {{ t('favorites.selectTeams') }} &rarr;
        </NuxtLink>
      </div>
      <MatchList v-if="favoriteUpcomingMatches.length" :matches="favoriteUpcomingMatches" :team-map="teamMap" />
      <BaseEmptyState v-else :message="t('home.noFavoriteMatches')" />
    </section>

    <!-- Latest News -->
    <section class="reveal">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <span class="section-label">{{ t('home.latestNews') }}</span>
          <h2 class="section-header mt-1">{{ t('home.latestNews') }}</h2>
          <div class="mt-1 h-[2px] w-12 bg-accent" />
        </div>
        <NuxtLink to="/news" class="text-sm font-semibold text-pitch-700 hover:text-pitch-900">
          {{ t('common.seeAll') }} &rarr;
        </NuxtLink>
      </div>
      <NewsList :articles="latestNews" :team-map="teamMap" featured />
      <BaseEmptyState v-if="!latestNews.length" :message="t('news.noNews')" />
    </section>

    <!-- Standings (Serie A top 5) -->
    <section class="reveal">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <span class="section-label">{{ t('standings.title') }}</span>
          <h2 class="section-header mt-1">{{ t('competitions.serie_a') }}</h2>
          <div class="mt-1 h-[2px] w-12 bg-accent" />
        </div>
        <NuxtLink to="/standings" class="text-sm font-semibold text-pitch-700 hover:text-pitch-900">
          {{ t('common.seeAll') }} &rarr;
        </NuxtLink>
      </div>
      <BaseCard editorial>
        <StandingsTable :standings="standings" :team-map="teamMap" compact />
      </BaseCard>
    </section>
  </div>
</template>
