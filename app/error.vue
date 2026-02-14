<script setup lang="ts">
  import type { NuxtError } from '#app'

  const props = defineProps<{
    error: NuxtError
  }>()

  const { t } = useI18n()

  const is404 = computed(() => props.error.statusCode === 404)

  const title = computed(() => (is404.value ? t('errorPage.title404') : t('errorPage.title500')))

  const message = computed(() => (is404.value ? t('errorPage.message404') : t('errorPage.message500')))

  function handleRetry() {
    clearError({ redirect: '/' })
  }
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-page px-4">
    <div class="w-full max-w-md text-center">
      <!-- Status code -->
      <p class="font-display text-8xl font-bold text-secondary/30">
        {{ error.statusCode }}
      </p>

      <!-- Icon -->
      <div class="mt-6 flex justify-center">
        <svg v-if="is404" class="h-16 w-16 text-secondary" viewBox="0 0 256 256" fill="currentColor">
          <path
            d="M227.8,134.23a3.95,3.95,0,0,0,.04-.65C227.94,131.74,228,129.87,228,128a99.52,99.52,0,0,0-22.3-62.87,3.99,3.99,0,0,0-.93-1.13A100.46,100.46,0,0,0,164.66,34.96a4.06,4.06,0,0,0-.48-.19,99.98,99.98,0,0,0-72.36,0,3.96,3.96,0,0,0-.48.18A100.46,100.46,0,0,0,51.22,64a3.99,3.99,0,0,0-.93,1.13A99.52,99.52,0,0,0,28,128c0,1.88.06,3.74.16,5.59a3.99,3.99,0,0,0,.04.64,99.34,99.34,0,0,0,15.23,47.08,3.99,3.99,0,0,0,.69,1.07,100.37,100.37,0,0,0,58.34,42.32,3.9,3.9,0,0,0,.5.14,100.33,100.33,0,0,0,50.09,0,4.02,4.02,0,0,0,.51-.14,100.37,100.37,0,0,0,58.34-42.32,3.99,3.99,0,0,0,.69-1.07A99.33,99.33,0,0,0,227.8,134.23Zm-60.14,41.54-10.53-14.5,14-43.08,17.04-5.54,31.52,22.93a91.37,91.37,0,0,1-13.08,40.17Zm-79.31,0-38.95-.02a91.37,91.37,0,0,1-13.08-40.17l31.52-22.93,17.05,5.54,14,43.08ZM52.37,75.68l10.06,31.02-26.4,19.21A91.46,91.46,0,0,1,52.37,75.68Zm53.85,82.3L92.76,116.55,128,90.94l35.24,25.6-13.46,41.43Zm113.75-32.08-26.4-19.21,10.06-31.02A91.46,91.46,0,0,1,219.97,125.9ZM197.7,68.02l-12.01,37.03-17.05,5.54L132,83.96V66.04l31.54-22.89A92.44,92.44,0,0,1,197.7,68.02Zm-43.27-28.14L128,59.06l-26.43-19.18a92.07,92.07,0,0,1,52.86,0Zm-61.98,3.27L124,66.04V83.96L87.35,110.59l-17.05-5.54-12.01-37.03A92.44,92.44,0,0,1,92.46,43.15ZM54.88,183.76l32.6.02,10.11,31.05A92.4,92.4,0,0,1,54.88,183.76Zm52.01,33.79L94.82,180.48l10.53-14.5h45.3l10.53,14.5-12.07,37.07a92.25,92.25,0,0,1-42.23,0Zm51.53-2.72,10.11-31.05,32.6-.02A92.4,92.4,0,0,1,158.42,214.83Z"
          />
        </svg>
        <svg v-else class="h-16 w-16 text-live" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>

      <!-- Title & message -->
      <h1 class="mt-6 font-display text-2xl font-bold text-primary">{{ title }}</h1>
      <p class="mt-2 text-sm text-secondary">{{ message }}</p>

      <!-- Actions -->
      <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          class="inline-flex items-center gap-2 rounded-lg bg-neon px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-void shadow-sm transition-colors hover:bg-neon-dim"
          @click="handleRetry"
        >
          {{ t('errorPage.backHome') }}
        </button>
        <button
          v-if="!is404"
          class="inline-flex items-center gap-2 rounded-lg border border-neon/40 bg-transparent px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-neon shadow-sm transition-colors hover:bg-neon/10"
          @click="clearError()"
        >
          {{ t('common.retry') }}
        </button>
      </div>
    </div>
  </div>
</template>
