<script setup lang="ts">
  const props = defineProps<{
    article: NewsArticle
    teamMap: Map<number, Team>
  }>()

  const { locale } = useI18n()

  const title = computed(() => {
    if (locale.value === 'en' && props.article.titleEn) return props.article.titleEn
    return props.article.title
  })

  const description = computed(() => {
    const desc =
      locale.value === 'en' && props.article.descriptionEn ? props.article.descriptionEn : props.article.description
    if (!desc) return ''
    return desc.length > 120 ? `${desc.slice(0, 120)}...` : desc
  })

  const formattedDate = computed(() => formatDate(props.article.publishedAt, locale.value))
</script>

<template>
  <NuxtLink :to="`/news/${article.id}`" class="group block">
    <BaseCard hoverable :padded="false" editorial>
      <div class="relative aspect-video w-full overflow-hidden bg-pitch-50">
        <img
          v-if="article.imageUrl"
          :src="article.imageUrl"
          :alt="title"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div v-else class="flex h-full items-center justify-center text-pitch-300">
          <svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
            />
          </svg>
        </div>
        <div
          v-if="article.imageUrl"
          class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
        />
        <div v-if="article.competition" class="absolute left-2 top-2 z-10">
          <NewsCompetitionBadge :competition="article.competition" />
        </div>
      </div>
      <div class="p-4">
        <h3
          class="mb-1 line-clamp-2 font-display text-base text-pitch-950 transition-colors group-hover:text-pitch-800"
        >
          {{ title }}
        </h3>
        <p v-if="description" class="mb-2 line-clamp-2 text-xs text-pitch-500">{{ description }}</p>
        <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-pitch-400">
          <span>{{ article.sourceName }}</span>
          <span>&middot;</span>
          <time>{{ formattedDate }}</time>
        </div>
      </div>
    </BaseCard>
  </NuxtLink>
</template>
