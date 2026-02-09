<script setup lang="ts">
  const { t, locale } = useI18n()
  const route = useRoute()
  const { teamMap, getTeamName } = useTeams()

  const { data: raw, error } = await useFetch(`/api/news/${route.params.id}`, {
    transform: (res: { data: Record<string, unknown> }) => ({
      data: snakeToCamel<NewsArticle>(res.data),
    }),
  })

  const article = computed(() => raw.value?.data)

  const title = computed(() => {
    if (!article.value) return ''
    return locale.value === 'en' && article.value.titleEn ? article.value.titleEn : article.value.title
  })

  const description = computed(() => {
    if (!article.value) return ''
    return locale.value === 'en' && article.value.descriptionEn
      ? article.value.descriptionEn
      : (article.value.description ?? '')
  })

  const content = computed(() => {
    if (!article.value) return ''
    return locale.value === 'en' && article.value.contentEn
      ? article.value.contentEn
      : (article.value.content ?? description.value)
  })

  const formattedDate = computed(() => (article.value ? formatDate(article.value.publishedAt, locale.value) : ''))

  const taggedTeams = computed(() => {
    if (!article.value) return []
    return article.value.teamTags.map((id) => ({ id, team: teamMap.value.get(id) })).filter((t) => t.team)
  })

  useHead({ title: title.value || t('news.title') })
  useSeoMeta({
    description: description.value.slice(0, 160),
    ogTitle: title.value,
    ogDescription: description.value.slice(0, 160),
    ogImage: article.value?.imageUrl ?? '',
    ogType: 'article',
  })
</script>

<template>
  <div>
    <NuxtLink to="/news" class="mb-4 inline-flex items-center gap-1 text-sm text-pitch-700 hover:text-pitch-900">
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      {{ t('common.back') }}
    </NuxtLink>

    <BaseErrorState v-if="error" @retry="() => $router.go(0)" />

    <article v-else-if="article" class="mx-auto max-w-3xl">
      <img
        v-if="article.imageUrl"
        :src="article.imageUrl"
        :alt="title"
        class="mb-6 aspect-video w-full rounded-lg object-cover"
        loading="lazy"
      />

      <h1 class="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">{{ title }}</h1>

      <div class="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <NewsCompetitionBadge v-if="article.competition" :competition="article.competition" />
        <span>{{ article.sourceName }}</span>
        <span>&middot;</span>
        <time>{{ formattedDate }}</time>
      </div>

      <!-- Tagged teams -->
      <div v-if="taggedTeams.length" class="mb-6 flex flex-wrap gap-2">
        <div
          v-for="{ id, team } in taggedTeams"
          :key="id"
          class="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1"
        >
          <TeamBadge :team="team" size="sm" />
          <span class="text-xs font-medium text-slate-600">{{ getTeamName(id) }}</span>
        </div>
      </div>

      <div class="prose prose-slate max-w-none whitespace-pre-line text-slate-700">
        {{ content }}
      </div>

      <a
        :href="article.sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-6 inline-flex items-center gap-1 text-sm font-medium text-pitch-700 hover:text-pitch-900"
      >
        {{ t('news.readMore') }}
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </article>
  </div>
</template>
