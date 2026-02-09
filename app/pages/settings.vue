<script setup lang="ts">
  definePageMeta({ middleware: 'auth' })

  const { t, locale, setLocale } = useI18n()
  useHead({ title: t('settings.title') })
  useSeoMeta({
    robots: 'noindex, nofollow',
  })

  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const { fetchPreferences, savePreferences, clearPreferences } = useUserPreferences()
  const { hasFavorites, favoriteTeamIds } = useFavoriteTeams()

  // Fetch preferences on mount
  onMounted(() => {
    fetchPreferences()
  })

  // Language
  const selectedLanguage = ref<'pt-BR' | 'en'>(locale.value as 'pt-BR' | 'en')
  const savingLanguage = ref(false)

  async function changeLanguage(lang: 'pt-BR' | 'en') {
    selectedLanguage.value = lang
    savingLanguage.value = true

    try {
      await setLocale(lang)
      await savePreferences({ language: lang })
    } finally {
      savingLanguage.value = false
    }
  }

  // Logout
  const loggingOut = ref(false)

  async function handleLogout() {
    loggingOut.value = true
    try {
      await supabase.auth.signOut()
      clearPreferences()
      await navigateTo('/')
    } finally {
      loggingOut.value = false
    }
  }
</script>

<template>
  <div class="mx-auto max-w-2xl space-y-6 py-6">
    <h1 class="text-2xl font-bold text-pitch-900">{{ t('settings.title') }}</h1>

    <!-- Account -->
    <BaseCard class="p-5">
      <h2 class="mb-3 text-lg font-semibold text-slate-800">{{ t('settings.account') }}</h2>
      <div class="space-y-3">
        <div>
          <span class="block text-sm font-medium text-slate-500">{{ t('settings.accountEmail') }}</span>
          <span class="text-sm text-slate-900">{{ user?.email }}</span>
        </div>
        <NuxtLink
          to="/auth/reset-password"
          class="inline-block text-sm font-medium text-pitch-700 hover:text-pitch-900"
        >
          {{ t('settings.changePassword') }} &rarr;
        </NuxtLink>
      </div>
    </BaseCard>

    <!-- Language -->
    <BaseCard class="p-5">
      <h2 class="mb-1 text-lg font-semibold text-slate-800">{{ t('settings.language') }}</h2>
      <p class="mb-3 text-sm text-slate-500">{{ t('settings.languageDescription') }}</p>
      <div class="flex gap-3">
        <button
          :disabled="savingLanguage"
          class="rounded-md px-4 py-2 text-sm font-medium transition-colors"
          :class="
            selectedLanguage === 'pt-BR' ? 'bg-pitch-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          "
          @click="changeLanguage('pt-BR')"
        >
          {{ t('settings.languagePtBr') }}
        </button>
        <button
          :disabled="savingLanguage"
          class="rounded-md px-4 py-2 text-sm font-medium transition-colors"
          :class="
            selectedLanguage === 'en' ? 'bg-pitch-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          "
          @click="changeLanguage('en')"
        >
          {{ t('settings.languageEn') }}
        </button>
      </div>
    </BaseCard>

    <!-- Favorite Teams -->
    <BaseCard class="p-5">
      <h2 class="mb-3 text-lg font-semibold text-slate-800">{{ t('settings.favoriteTeams') }}</h2>
      <p v-if="hasFavorites" class="mb-3 text-sm text-slate-500">
        {{ t('favorites.teamsSelected', { count: favoriteTeamIds.length }) }}
      </p>
      <p v-else class="mb-3 text-sm text-slate-500">{{ t('favorites.noFavorites') }}</p>
      <NuxtLink
        to="/favorites"
        class="inline-block rounded-md bg-pitch-700 px-4 py-2 text-sm font-medium text-white hover:bg-pitch-800"
      >
        {{ t('settings.manageFavorites') }} &rarr;
      </NuxtLink>
    </BaseCard>

    <!-- Logout -->
    <div class="pt-4">
      <button
        :disabled="loggingOut"
        class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
        @click="handleLogout"
      >
        {{ loggingOut ? t('common.loading') : t('nav.logout') }}
      </button>
    </div>
  </div>
</template>
