<script setup lang="ts">
  const { t } = useI18n()

  const navItems = computed(() => [
    { to: '/', label: t('nav.home') },
    { to: '/news', label: t('nav.news') },
    { to: '/matches', label: t('nav.matches') },
    { to: '/standings', label: t('nav.standings') },
  ])
</script>

<template>
  <footer class="hidden bg-gradient-editorial texture-noise pitch-lines py-10 text-pitch-300 md:block">
    <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
        <!-- Brand column -->
        <div>
          <p class="mb-2 font-display text-lg text-white">BR Soccer Tracker</p>
          <p class="text-xs text-pitch-400">
            {{ t('home.seoDescription') }}
          </p>
        </div>

        <!-- Quick links column -->
        <div>
          <p class="section-label mb-3 !text-pitch-400">
            {{ t('nav.home') }}
          </p>
          <nav class="flex flex-col gap-1.5">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="text-sm text-pitch-300 transition-colors hover:text-accent"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Language + meta column -->
        <div class="flex flex-col items-start gap-3 sm:items-end">
          <LayoutLanguageSwitcher />
          <p class="text-xs text-pitch-500">&copy; {{ new Date().getFullYear() }} BR Soccer Tracker</p>
        </div>
      </div>

      <!-- Accent line at bottom -->
      <div class="mt-8 h-[2px] bg-gradient-accent" />
    </div>
  </footer>
</template>
