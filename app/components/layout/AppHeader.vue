<script setup lang="ts">
  const { t } = useI18n()
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const { isDark, toggleTheme } = useTheme()

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
  <header class="sticky top-0 z-50 glass">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-primary">
        <svg class="h-7 w-7 text-neon" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" stroke-width="1.5" />
          <path
            d="M12 1a11 11 0 0 1 4.3 1.05L12 6.5 7.7 2.05A11 11 0 0 1 12 1ZM2.07 9.2 6 7.65l2.15 5.35-3.4 3.6A10.96 10.96 0 0 1 2.07 9.2Zm6.43 11.7L9.7 16h4.6l1.2 4.9a11 11 0 0 1-7 0Zm10.25-4.3L15.35 13l2.15-5.35 3.93 1.55a10.96 10.96 0 0 1-2.68 7.4Z"
          />
        </svg>
        <span>
          <span>BR</span>
          <span class="text-neon"> Soccer</span>
          <span class="text-secondary"> Tracker</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-6 md:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="relative font-display text-xs font-bold uppercase tracking-[0.12em] text-secondary transition-colors hover:text-primary"
          active-class="!text-neon after:absolute after:-bottom-1.5 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-neon after:shadow-[0_0_6px_rgba(0,255,135,0.5)] after:content-['']"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <!-- Theme toggle -->
        <button
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          class="rounded-lg p-1.5 text-secondary transition-colors hover:text-neon"
          @click="toggleTheme"
        >
          <!-- Sun icon (shown in dark mode) -->
          <svg v-if="isDark" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
          <!-- Moon icon (shown in light mode) -->
          <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        </button>

        <LayoutLanguageSwitcher />

        <!-- Authenticated: Settings + Logout -->
        <template v-if="user">
          <NuxtLink
            to="/settings"
            class="font-display text-xs font-bold uppercase tracking-[0.12em] text-secondary transition-colors hover:text-primary"
            active-class="!text-neon"
          >
            {{ t('nav.settings') }}
          </NuxtLink>
          <button
            :disabled="loggingOut"
            class="rounded-lg border border-line bg-transparent px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-secondary transition-colors hover:border-neon/40 hover:text-neon disabled:opacity-50"
            @click="handleLogout"
          >
            {{ t('nav.logout') }}
          </button>
        </template>

        <!-- Not authenticated: Login button -->
        <NuxtLink
          v-else
          to="/auth/login"
          class="rounded-lg bg-neon px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-void transition-colors hover:bg-neon-dim"
        >
          {{ t('nav.login') }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
