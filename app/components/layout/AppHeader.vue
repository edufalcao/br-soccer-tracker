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
        <svg class="h-7 w-7 text-neon" viewBox="0 0 512 512" fill="currentColor">
          <rect x="452.035" y="200.935" width="59.965" height="129.779" />
          <path
            d="M473.104,80.845H268.248l0.008,79.249c47.648,6.039,84.513,46.622,84.513,95.899c0,49.293-36.866,89.876-84.513,95.914v79.249h204.848c21.483,0,38.896-17.413,38.896-38.896v-37.048h-84.463V176.438H512v-56.706C512,98.251,494.587,80.845,473.104,80.845z"
          />
          <path
            d="M307.11,204.905c-10.37-10.358-23.81-17.489-38.853-20.062v142.306c15.043-2.565,28.483-9.703,38.853-20.054c13.092-13.115,21.162-31.109,21.162-51.102C328.272,236.007,320.202,218.021,307.11,204.905z"
          />
          <path
            d="M204.898,307.095c10.371,10.36,23.81,17.49,38.854,20.054V184.843c-15.044,2.573-28.483,9.704-38.854,20.062c-13.1,13.116-21.158,31.102-21.165,51.088C183.74,275.986,191.798,293.98,204.898,307.095z"
          />
          <rect y="200.935" width="59.962" height="129.779" />
          <path
            d="M159.234,255.993c0.008-49.278,36.869-89.86,84.517-95.899V80.845H38.896C17.413,80.845,0,98.251,0,119.732v56.706h84.459v178.774H0v37.048c0,21.483,17.413,38.896,38.896,38.896h204.863l-0.007-79.249C196.103,345.868,159.242,305.286,159.234,255.993z"
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
