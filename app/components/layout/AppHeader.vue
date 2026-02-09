<script setup lang="ts">
  const { t } = useI18n()
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  const navItems = computed(() => [
    { to: '/', label: t('nav.home') },
    { to: '/news', label: t('nav.news') },
    { to: '/matches', label: t('nav.matches') },
    { to: '/standings', label: t('nav.standings') },
    { to: '/favorites', label: t('nav.favorites') },
  ])

  const loggingOut = ref(false)

  async function handleLogout() {
    loggingOut.value = true
    try {
      await supabase.auth.signOut()
      const { clearPreferences } = useUserPreferences()
      clearPreferences()
      await navigateTo('/')
    } finally {
      loggingOut.value = false
    }
  }
</script>

<template>
  <header class="sticky top-0 z-50 bg-gradient-pitch text-white shadow-lg shadow-pitch-950/30">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-2 text-xl font-bold tracking-tight">
        <svg class="h-7 w-7 text-accent" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" stroke-width="1.5" />
          <path
            d="M12 1a11 11 0 0 1 4.3 1.05L12 6.5 7.7 2.05A11 11 0 0 1 12 1ZM2.07 9.2 6 7.65l2.15 5.35-3.4 3.6A10.96 10.96 0 0 1 2.07 9.2Zm6.43 11.7L9.7 16h4.6l1.2 4.9a11 11 0 0 1-7 0Zm10.25-4.3L15.35 13l2.15-5.35 3.93 1.55a10.96 10.96 0 0 1-2.68 7.4Z"
          />
        </svg>
        <span>
          <span class="text-white">BR</span>
          <span class="text-accent"> Soccer</span>
          <span class="text-pitch-200"> Tracker</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-6 md:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="relative text-sm font-medium text-pitch-200 transition-colors hover:text-white"
          active-class="!text-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-accent after:content-['']"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <LayoutLanguageSwitcher />

        <!-- Authenticated: Settings + Logout -->
        <template v-if="user">
          <NuxtLink
            to="/settings"
            class="text-sm font-medium text-pitch-200 transition-colors hover:text-white"
            active-class="!text-accent"
          >
            {{ t('nav.settings') }}
          </NuxtLink>
          <button
            :disabled="loggingOut"
            class="rounded-md bg-pitch-800 px-3 py-1.5 text-sm font-medium text-pitch-100 transition-colors hover:bg-pitch-700 disabled:opacity-50"
            @click="handleLogout"
          >
            {{ t('nav.logout') }}
          </button>
        </template>

        <!-- Not authenticated: Login button -->
        <NuxtLink
          v-else
          to="/auth/login"
          class="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-pitch-900 transition-colors hover:bg-accent-light"
        >
          {{ t('nav.login') }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
