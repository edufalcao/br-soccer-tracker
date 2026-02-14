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
  const { isDark, toggleTheme } = useTheme()

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
    <BaseCard glow class="animate-slide-up stagger-1 p-5">
      <h2 class="mb-3 font-display text-lg font-bold text-primary">{{ t('settings.account') }}</h2>
      <div class="space-y-3">
        <div>
          <span class="block text-sm font-semibold text-secondary">{{ t('settings.accountEmail') }}</span>
          <span class="text-sm text-primary">{{ user?.email }}</span>
        </div>
        <NuxtLink
          to="/auth/reset-password"
          class="inline-block text-sm font-semibold text-neon transition-colors hover:text-neon-dim"
        >
          {{ t('settings.changePassword') }} &rarr;
        </NuxtLink>
      </div>
    </BaseCard>

    <!-- Theme -->
    <BaseCard glow class="animate-slide-up stagger-2 p-5">
      <h2 class="mb-1 font-display text-lg font-bold text-primary">{{ t('settings.theme') || 'Theme' }}</h2>
      <p class="mb-3 text-sm text-secondary">
        {{ t('settings.themeDescription') || 'Choose your preferred appearance' }}
      </p>
      <button
        class="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold tracking-wide transition-all glass !border-line hover:!border-neon/40"
        @click="toggleTheme"
      >
        <!-- Sun icon -->
        <svg
          v-if="isDark"
          class="h-5 w-5 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <!-- Moon icon -->
        <svg v-else class="h-5 w-5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <span class="text-primary">{{
          isDark ? t('settings.lightMode') || 'Switch to Light' : t('settings.darkMode') || 'Switch to Dark'
        }}</span>
      </button>
    </BaseCard>

    <!-- Language -->
    <BaseCard glow class="animate-slide-up stagger-3 p-5">
      <h2 class="mb-1 font-display text-lg font-bold text-primary">{{ t('settings.language') }}</h2>
      <p class="mb-3 text-sm text-secondary">{{ t('settings.languageDescription') }}</p>
      <div class="flex gap-3">
        <button
          :disabled="savingLanguage"
          class="flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-semibold tracking-wide transition-all"
          :class="
            selectedLanguage === 'pt-BR'
              ? 'bg-neon/10 text-neon ring-2 ring-neon/40 shadow-glow'
              : 'glass !border-line text-secondary hover:text-primary hover:!border-neon/20'
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
              ? 'bg-neon/10 text-neon ring-2 ring-neon/40 shadow-glow'
              : 'glass !border-line text-secondary hover:text-primary hover:!border-neon/20'
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
    <BaseCard glow class="animate-slide-up stagger-4 p-5">
      <h2 class="mb-3 font-display text-lg font-bold text-primary">{{ t('settings.favoriteTeams') }}</h2>
      <p v-if="hasFavorites" class="mb-3 text-sm text-secondary">
        {{ t('favorites.teamsSelected', { count: favoriteTeamIds.length }) }}
      </p>
      <p v-else class="mb-3 text-sm text-secondary">{{ t('favorites.noFavorites') }}</p>
      <NuxtLink
        to="/favorites"
        class="inline-block rounded-lg bg-neon px-4 py-2 text-sm font-semibold tracking-wide text-void shadow-sm transition-colors hover:bg-neon-dim"
      >
        {{ t('settings.manageFavorites') }} &rarr;
      </NuxtLink>
    </BaseCard>

    <!-- Logout -->
    <div class="pt-4 animate-slide-up stagger-5">
      <button
        :disabled="loggingOut"
        class="rounded-lg bg-live px-4 py-2 text-sm font-semibold tracking-wide text-white shadow-sm transition-colors hover:bg-red-600 disabled:opacity-50"
        @click="handleLogout"
      >
        {{ loggingOut ? t('common.loading') : t('nav.logout') }}
      </button>
    </div>
  </div>
</template>
