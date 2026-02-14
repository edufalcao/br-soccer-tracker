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
  const {
    data: liveData,
    error: liveError,
    refresh: refreshLive,
  } = useFetch('/api/matches/live', {
    transform: (res: { data: Record<string, unknown>[] }) => ({
      data: snakeToCamelArray<Match>(res.data),
    }),
    default: () => ({ data: [] }),
  })
  const liveMatches = computed(() => liveData.value?.data ?? [])

  // Latest news (6 articles)
  const { data: newsData, error: newsError } = useFetch('/api/news', {
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
    <section
      class="-mx-4 -mt-6 mb-2 stadium-gradient grid-lines px-4 py-12 sm:-mx-6 sm:px-6 sm:py-16 lg:-mx-8 lg:px-8 lg:py-20"
    >
      <div class="relative z-10 mx-auto max-w-3xl text-center">
        <h1 class="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          <span class="neon-text">{{ t('competitions.serie_a') }}</span>
          <span class="mx-2 text-secondary/40">&middot;</span>
          <span>{{ t('competitions.serie_b') }}</span>
          <span class="mx-2 text-secondary/40">&middot;</span>
          <span>{{ t('competitions.copa_do_brasil') }}</span>
        </h1>
        <p class="mt-3 text-sm text-secondary">{{ t('home.seoDescription') }}</p>
        <div class="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
      </div>
    </section>

    <!-- Bento Grid Dashboard (desktop) -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
      <!-- Left column -->
      <div class="space-y-6">
        <!-- Live Scores -->
        <section>
          <div class="mb-4">
            <span class="section-label">{{ t('home.liveScores') }}</span>
            <h2 class="section-header mt-1">{{ t('home.liveScores') }}</h2>
            <div class="mt-1 h-px w-12 bg-neon/50" />
          </div>
          <BaseErrorState v-if="liveError" @retry="refreshLive" />
          <MatchLiveTicker v-else :matches="liveMatches" :team-map="teamMap" />
        </section>

        <!-- Latest News -->
        <section class="reveal">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <span class="section-label">{{ t('home.latestNews') }}</span>
              <h2 class="section-header mt-1">{{ t('home.latestNews') }}</h2>
              <div class="mt-1 h-px w-12 bg-neon/50" />
            </div>
            <NuxtLink
              to="/news"
              class="font-display text-sm font-semibold text-neon transition-colors hover:text-neon-dim"
            >
              {{ t('common.seeAll') }} &rarr;
            </NuxtLink>
          </div>
          <BaseErrorState v-if="newsError" @retry="() => $router.go(0)" />
          <template v-else>
            <NewsList :articles="latestNews" :team-map="teamMap" featured />
            <BaseEmptyState v-if="!latestNews.length" :message="t('news.noNews')" />
          </template>
        </section>
      </div>

      <!-- Right column (sidebar) -->
      <div class="space-y-6">
        <!-- Standings (Serie A top 5) -->
        <section class="reveal">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <span class="section-label">{{ t('standings.title') }}</span>
              <h2 class="section-header mt-1">{{ t('competitions.serie_a') }}</h2>
              <div class="mt-1 h-px w-12 bg-neon/50" />
            </div>
            <NuxtLink
              to="/standings"
              class="font-display text-sm font-semibold text-neon transition-colors hover:text-neon-dim"
            >
              {{ t('common.seeAll') }} &rarr;
            </NuxtLink>
          </div>
          <BaseCard glow>
            <StandingsTable :standings="standings" :team-map="teamMap" compact />
          </BaseCard>
        </section>

        <!-- Your Teams (favorites) -->
        <section v-if="hasFavorites" class="reveal">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <span class="section-label">{{ t('home.yourTeams') }}</span>
              <h2 class="section-header mt-1">{{ t('home.yourTeams') }}</h2>
              <div class="mt-1 h-px w-12 bg-gold/50" />
            </div>
            <NuxtLink
              to="/favorites"
              class="font-display text-sm font-semibold text-gold transition-colors hover:text-gold-dim"
            >
              {{ t('favorites.selectTeams') }} &rarr;
            </NuxtLink>
          </div>
          <MatchList v-if="favoriteUpcomingMatches.length" :matches="favoriteUpcomingMatches" :team-map="teamMap" />
          <BaseEmptyState v-else :message="t('home.noFavoriteMatches')" />
        </section>
      </div>
    </div>
  </div>
</template>
