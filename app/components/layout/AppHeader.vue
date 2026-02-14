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
        <svg class="h-7 w-7 text-neon" viewBox="0 0 256 256" fill="currentColor">
          <path
            d="M227.8,134.23a3.95,3.95,0,0,0,.04-.65C227.94,131.74,228,129.87,228,128a99.52,99.52,0,0,0-22.3-62.87,3.99,3.99,0,0,0-.93-1.13A100.46,100.46,0,0,0,164.66,34.96a4.06,4.06,0,0,0-.48-.19,99.98,99.98,0,0,0-72.36,0,3.96,3.96,0,0,0-.48.18A100.46,100.46,0,0,0,51.22,64a3.99,3.99,0,0,0-.93,1.13A99.52,99.52,0,0,0,28,128c0,1.88.06,3.74.16,5.59a3.99,3.99,0,0,0,.04.64,99.34,99.34,0,0,0,15.23,47.08,3.99,3.99,0,0,0,.69,1.07,100.37,100.37,0,0,0,58.34,42.32,3.9,3.9,0,0,0,.5.14,100.33,100.33,0,0,0,50.09,0,4.02,4.02,0,0,0,.51-.14,100.37,100.37,0,0,0,58.34-42.32,3.99,3.99,0,0,0,.69-1.07A99.33,99.33,0,0,0,227.8,134.23Zm-60.14,41.54-10.53-14.5,14-43.08,17.04-5.54,31.52,22.93a91.37,91.37,0,0,1-13.08,40.17Zm-79.31,0-38.95-.02a91.37,91.37,0,0,1-13.08-40.17l31.52-22.93,17.05,5.54,14,43.08ZM52.37,75.68l10.06,31.02-26.4,19.21A91.46,91.46,0,0,1,52.37,75.68Zm53.85,82.3L92.76,116.55,128,90.94l35.24,25.6-13.46,41.43Zm113.75-32.08-26.4-19.21,10.06-31.02A91.46,91.46,0,0,1,219.97,125.9ZM197.7,68.02l-12.01,37.03-17.05,5.54L132,83.96V66.04l31.54-22.89A92.44,92.44,0,0,1,197.7,68.02Zm-43.27-28.14L128,59.06l-26.43-19.18a92.07,92.07,0,0,1,52.86,0Zm-61.98,3.27L124,66.04V83.96L87.35,110.59l-17.05-5.54-12.01-37.03A92.44,92.44,0,0,1,92.46,43.15ZM54.88,183.76l32.6.02,10.11,31.05A92.4,92.4,0,0,1,54.88,183.76Zm52.01,33.79L94.82,180.48l10.53-14.5h45.3l10.53,14.5-12.07,37.07a92.25,92.25,0,0,1-42.23,0Zm51.53-2.72,10.11-31.05,32.6-.02A92.4,92.4,0,0,1,158.42,214.83Z"
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
