<script setup lang="ts">
  const { t } = useI18n()
</script>

<template>
  <footer class="border-t border-slate-200 bg-pitch-950 py-6 text-pitch-200">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p class="text-sm">{{ t('home.title') }}</p>
        <div class="flex items-center gap-4">
          <LayoutLanguageSwitcher />
        </div>
      </div>
    </div>
  </footer>
</template>
