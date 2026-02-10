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
    <h1 class="section-header">{{ t('settings.title') }}</h1>

    <!-- Account -->
    <BaseCard editorial class="animate-slide-up stagger-1 p-5">
      <h2 class="mb-3 font-display text-lg text-pitch-900">{{ t('settings.account') }}</h2>
      <div class="space-y-3">
        <div>
          <span class="block text-sm font-semibold text-pitch-500">{{ t('settings.accountEmail') }}</span>
          <span class="text-sm text-pitch-900">{{ user?.email }}</span>
        </div>
        <NuxtLink
          to="/auth/reset-password"
          class="inline-block text-sm font-semibold text-pitch-700 hover:text-pitch-900"
        >
          {{ t('settings.changePassword') }} &rarr;
        </NuxtLink>
      </div>
    </BaseCard>

    <!-- Language -->
    <BaseCard editorial class="animate-slide-up stagger-2 p-5">
      <h2 class="mb-1 font-display text-lg text-pitch-900">{{ t('settings.language') }}</h2>
      <p class="mb-3 text-sm text-pitch-500">{{ t('settings.languageDescription') }}</p>
      <div class="flex gap-3">
        <button
          :disabled="savingLanguage"
          class="flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-semibold tracking-wide transition-all"
          :class="
            selectedLanguage === 'pt-BR'
              ? 'bg-pitch-800 text-white shadow-sm shadow-pitch-900/20 ring-2 ring-accent'
              : 'bg-pitch-50 text-pitch-400 ring-1 ring-pitch-100 hover:text-pitch-700 hover:bg-pitch-100'
          "
          @click="changeLanguage('pt-BR')"
        >
          <svg
            class="h-5 w-7 shrink-0 overflow-hidden rounded-sm transition-opacity"
            :class="selectedLanguage === 'pt-BR' ? 'opacity-100' : 'opacity-50'"
            viewBox="0 0 60 42"
          >
            <rect width="60" height="42" fill="#009739" />
            <polygon points="30,3 57,21 30,39 3,21" fill="#FEDD00" />
            <circle cx="30" cy="21" r="9" fill="#002776" />
            <path d="M21.5,22.5 Q30,17 38.5,22.5" fill="none" stroke="#fff" stroke-width="1.2" />
          </svg>
          {{ t('settings.languagePtBr') }}
        </button>
        <button
          :disabled="savingLanguage"
          class="flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-semibold tracking-wide transition-all"
          :class="
            selectedLanguage === 'en'
              ? 'bg-pitch-800 text-white shadow-sm shadow-pitch-900/20 ring-2 ring-accent'
              : 'bg-pitch-50 text-pitch-400 ring-1 ring-pitch-100 hover:text-pitch-700 hover:bg-pitch-100'
          "
          @click="changeLanguage('en')"
        >
          <svg
            class="h-5 w-7 shrink-0 overflow-hidden rounded-sm transition-opacity"
            :class="selectedLanguage === 'en' ? 'opacity-100' : 'opacity-50'"
            viewBox="0 0 60 30"
          >
            <clipPath id="settings-us"><rect width="60" height="30" /></clipPath>
            <g clip-path="url(#settings-us)">
              <rect width="60" height="30" fill="#B22234" />
              <path
                d="M0,3.46H60M0,8.08H60M0,12.69H60M0,17.31H60M0,21.92H60M0,26.54H60"
                stroke="#fff"
                stroke-width="2.31"
              />
              <rect width="24" height="16.15" fill="#3C3B6E" />
              <g fill="#fff">
                <circle cx="4" cy="2.5" r="1" />
                <circle cx="8" cy="2.5" r="1" />
                <circle cx="12" cy="2.5" r="1" />
                <circle cx="16" cy="2.5" r="1" />
                <circle cx="20" cy="2.5" r="1" />
                <circle cx="6" cy="5" r="1" />
                <circle cx="10" cy="5" r="1" />
                <circle cx="14" cy="5" r="1" />
                <circle cx="18" cy="5" r="1" />
                <circle cx="4" cy="7.5" r="1" />
                <circle cx="8" cy="7.5" r="1" />
                <circle cx="12" cy="7.5" r="1" />
                <circle cx="16" cy="7.5" r="1" />
                <circle cx="20" cy="7.5" r="1" />
                <circle cx="6" cy="10" r="1" />
                <circle cx="10" cy="10" r="1" />
                <circle cx="14" cy="10" r="1" />
                <circle cx="18" cy="10" r="1" />
                <circle cx="4" cy="12.5" r="1" />
                <circle cx="8" cy="12.5" r="1" />
                <circle cx="12" cy="12.5" r="1" />
                <circle cx="16" cy="12.5" r="1" />
                <circle cx="20" cy="12.5" r="1" />
              </g>
            </g>
          </svg>
          {{ t('settings.languageEn') }}
        </button>
      </div>
    </BaseCard>

    <!-- Favorite Teams -->
    <BaseCard editorial class="animate-slide-up stagger-3 p-5">
      <h2 class="mb-3 font-display text-lg text-pitch-900">{{ t('settings.favoriteTeams') }}</h2>
      <p v-if="hasFavorites" class="mb-3 text-sm text-pitch-500">
        {{ t('favorites.teamsSelected', { count: favoriteTeamIds.length }) }}
      </p>
      <p v-else class="mb-3 text-sm text-pitch-500">{{ t('favorites.noFavorites') }}</p>
      <NuxtLink
        to="/favorites"
        class="inline-block rounded-lg bg-pitch-800 px-4 py-2 text-sm font-semibold tracking-wide text-white shadow-sm shadow-pitch-900/20 hover:bg-pitch-900"
      >
        {{ t('settings.manageFavorites') }} &rarr;
      </NuxtLink>
    </BaseCard>

    <!-- Logout -->
    <div class="pt-4 animate-slide-up stagger-4">
      <button
        :disabled="loggingOut"
        class="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold tracking-wide text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-50"
        @click="handleLogout"
      >
        {{ loggingOut ? t('common.loading') : t('nav.logout') }}
      </button>
    </div>
  </div>
</template>
