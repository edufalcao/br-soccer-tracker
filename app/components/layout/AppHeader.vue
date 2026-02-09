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
  <header class="sticky top-0 z-50 border-b border-pitch-200 bg-pitch-900 text-white shadow-sm">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="text-xl font-bold tracking-tight">
        {{ t('home.title') }}
      </NuxtLink>

      <nav class="hidden items-center gap-6 md:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-sm font-medium text-pitch-100 transition-colors hover:text-white"
          active-class="text-accent"
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
            class="text-sm font-medium text-pitch-100 transition-colors hover:text-white"
            active-class="text-accent"
          >
            {{ t('nav.settings') }}
          </NuxtLink>
          <button
            :disabled="loggingOut"
            class="rounded-md bg-slate-700 px-3 py-1.5 text-sm font-medium text-pitch-100 transition-colors hover:bg-slate-600 disabled:opacity-50"
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
