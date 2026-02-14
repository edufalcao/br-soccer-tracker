<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      articles: NewsArticle[]
      teamMap: Map<number, Team>
      pending?: boolean
      total?: number | null
      page?: number
      limit?: number
      featured?: boolean
    }>(),
    {
      pending: false,
      total: null,
      page: 1,
      limit: 20,
      featured: false,
    },
  )

  const emit = defineEmits<{
    pageChange: [page: number]
  }>()

  const { t } = useI18n()

  const totalPages = computed(() => {
    if (!props.total) return 1
    return Math.ceil(props.total / props.limit)
  })
</script>

<template>
  <!-- Loading skeleton -->
  <div v-if="pending" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <div v-for="i in 6" :key="i" class="overflow-hidden rounded-xl glass">
      <div class="aspect-video animate-pulse bg-card-raised" />
      <div class="space-y-2 p-4">
        <div class="h-4 w-3/4 animate-pulse rounded bg-card-raised" />
        <div class="h-3 w-full animate-pulse rounded bg-card-raised" />
        <div class="h-3 w-1/2 animate-pulse rounded bg-card-raised" />
      </div>
    </div>
  </div>

  <!-- Empty state -->
  <BaseEmptyState v-else-if="!articles.length" :message="t('news.noNews')" />

  <!-- Article grid -->
  <div v-else>
    <!-- Featured layout: hero card spans 2 cols/rows, side cards determine row height -->
    <template v-if="featured && articles.length >= 3">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        <NewsCard
          :article="articles[0]!"
          :team-map="teamMap"
          hero
          class="animate-fade-in stagger-1 md:col-span-2 lg:row-span-2"
        />
        <NewsCard :article="articles[1]!" :team-map="teamMap" class="animate-fade-in stagger-2" />
        <NewsCard :article="articles[2]!" :team-map="teamMap" class="animate-fade-in stagger-3" />
      </div>
      <div v-if="articles.length > 3" class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NewsCard
          v-for="(article, index) in articles.slice(3)"
          :key="article.id"
          :article="article"
          :team-map="teamMap"
          :class="['animate-fade-in', `stagger-${((index + 3) % 8) + 1}`]"
        />
      </div>
    </template>

    <!-- Regular grid (non-featured or too few articles) -->
    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <NewsCard
        v-for="(article, index) in articles"
        :key="article.id"
        :article="article"
        :team-map="teamMap"
        :class="['animate-fade-in', `stagger-${(index % 8) + 1}`]"
      />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8 flex items-center justify-center gap-4">
      <BaseButton variant="secondary" size="sm" :disabled="page <= 1" @click="emit('pageChange', page - 1)">
        {{ t('common.previous') }}
      </BaseButton>
      <span class="section-label">
        {{ t('common.page', { current: page, total: totalPages }) }}
      </span>
      <BaseButton variant="secondary" size="sm" :disabled="page >= totalPages" @click="emit('pageChange', page + 1)">
        {{ t('common.next') }}
      </BaseButton>
    </div>
  </div>
</template>
