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
    <div
      v-for="i in 6"
      :key="i"
      class="overflow-hidden rounded-xl bg-gradient-card shadow-card ring-1 ring-pitch-100/50"
    >
      <div class="aspect-video animate-pulse bg-pitch-50" />
      <div class="space-y-2 p-4">
        <div class="h-4 w-3/4 animate-pulse rounded bg-pitch-50" />
        <div class="h-3 w-full animate-pulse rounded bg-pitch-50" />
        <div class="h-3 w-1/2 animate-pulse rounded bg-pitch-50" />
      </div>
    </div>
  </div>

  <!-- Empty state -->
  <BaseEmptyState v-else-if="!articles.length" :message="t('news.noNews')" />

  <!-- Article grid -->
  <div v-else>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <NewsCard
        v-for="(article, index) in articles"
        :key="article.id"
        :article="article"
        :team-map="teamMap"
        :class="[
          'animate-fade-in',
          `stagger-${(index % 8) + 1}`,
          featured && index === 0 && 'lg:col-span-2 lg:row-span-2',
        ]"
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
