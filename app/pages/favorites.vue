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
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-pitch-900 sm:text-3xl">{{ t('favorites.title') }}</h1>
      <p class="mt-1 text-sm text-slate-500">{{ t('favorites.subtitle') }}</p>
    </div>

    <!-- Selection count + clear -->
    <div v-if="hasFavorites" class="flex items-center justify-between">
      <span class="text-sm font-medium text-slate-600">
        {{ t('favorites.teamsSelected', { count: favoriteTeamIds.length }) }}
      </span>
      <button class="text-sm font-medium text-red-600 hover:text-red-700" @click="clearFavorites">
        {{ t('favorites.clearAll') }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      <div v-for="i in 8" :key="i" class="h-14 animate-pulse rounded-lg bg-slate-100" />
    </div>

    <!-- Team picker -->
    <FavoriteTeamPicker v-else :teams="teams" :favorite-ids="favoriteTeamIds" @toggle="toggleFavorite" />
  </div>
</template>
