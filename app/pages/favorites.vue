<script setup lang="ts">
  const { t } = useI18n()
  useHead({ title: t('favorites.title') })
  useSeoMeta({
    description: t('favorites.seoDescription'),
    ogTitle: t('favorites.title'),
    ogDescription: t('favorites.seoDescription'),
    robots: 'noindex, nofollow',
  })

  const { teams, pending } = useTeams()
  const { favoriteTeamIds, toggleFavorite, hasFavorites, clearFavorites } = useFavoriteTeams()
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <div>
      <span class="section-label">{{ t('nav.favorites') }}</span>
      <h1 class="section-header mt-1">{{ t('favorites.title') }}</h1>
      <div class="mt-1 h-px w-12 bg-neon/50" />
      <p class="mt-2 text-sm text-secondary">{{ t('favorites.subtitle') }}</p>
    </div>

    <!-- Selection count + clear -->
    <div v-if="hasFavorites" class="flex items-center justify-between">
      <span class="text-sm font-medium text-secondary">
        {{ t('favorites.teamsSelected', { count: favoriteTeamIds.length }) }}
      </span>
      <button class="text-sm font-semibold text-live hover:text-red-400 transition-colors" @click="clearFavorites">
        {{ t('favorites.clearAll') }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      <div v-for="i in 8" :key="i" class="h-14 animate-pulse rounded-lg bg-card-raised" />
    </div>

    <!-- Team picker -->
    <FavoriteTeamPicker v-else :teams="teams" :favorite-ids="favoriteTeamIds" @toggle="toggleFavorite" />
  </div>
</template>
