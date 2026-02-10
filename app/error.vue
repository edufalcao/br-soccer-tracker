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
  <div class="flex min-h-screen items-center justify-center bg-pitch-50 px-4">
    <div class="w-full max-w-md text-center">
      <!-- Status code -->
      <p class="font-display text-8xl font-bold text-pitch-200">
        {{ error.statusCode }}
      </p>

      <!-- Icon -->
      <div class="mt-6 flex justify-center">
        <svg
          v-if="is404"
          class="h-16 w-16 text-pitch-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
        >
          <circle cx="12" cy="12" r="10" />
          <path
            d="M12 2a10 10 0 0 1 4.5 1.1L12 7l-4.5-3.9A10 10 0 0 1 12 2ZM2.5 9.5 7 8l2 5-3.5 3.5A10 10 0 0 1 2.5 9.5ZM8 20.5l1-4.5h6l1 4.5a10 10 0 0 1-8 0ZM18.5 16.5 15 13l2-5 4.5 1.5a10 10 0 0 1-3 7Z"
          />
        </svg>
        <svg
          v-else
          class="h-16 w-16 text-red-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>

      <!-- Title & message -->
      <h1 class="mt-6 font-display text-2xl font-bold text-pitch-900">{{ title }}</h1>
      <p class="mt-2 text-sm text-pitch-600">{{ message }}</p>

      <!-- Actions -->
      <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          class="inline-flex items-center gap-2 rounded-lg bg-pitch-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-pitch-800"
          @click="handleRetry"
        >
          {{ t('errorPage.backHome') }}
        </button>
        <button
          v-if="!is404"
          class="inline-flex items-center gap-2 rounded-lg border border-pitch-200 bg-white px-6 py-2.5 text-sm font-semibold text-pitch-700 shadow-sm transition-colors hover:bg-pitch-50"
          @click="clearError()"
        >
          {{ t('common.retry') }}
        </button>
      </div>
    </div>
  </div>
</template>
