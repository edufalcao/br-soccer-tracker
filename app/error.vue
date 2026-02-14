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
        <svg v-if="is404" class="h-16 w-16 text-secondary" viewBox="0 0 512 512" fill="currentColor">
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
