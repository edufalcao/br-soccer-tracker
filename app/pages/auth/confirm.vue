<script setup lang="ts">
  const { t } = useI18n()
  useHead({ title: t('auth.confirmingAccount') })

  const user = useSupabaseUser()
  const confirmed = ref(false)
  const error = ref(false)

  // @nuxtjs/supabase processes hash fragment tokens automatically.
  // We watch for the user to become truthy, then handle accordingly.
  watch(
    user,
    (newUser) => {
      if (newUser) {
        // Check if this is a password recovery flow
        const hash = window.location.hash
        if (hash.includes('type=recovery')) {
          navigateTo('/auth/reset-password')
          return
        }

        confirmed.value = true
        setTimeout(() => navigateTo('/'), 2000)
      }
    },
    { immediate: true },
  )

  // Timeout: if no user after 10s, show error
  onMounted(() => {
    setTimeout(() => {
      if (!user.value && !confirmed.value) {
        error.value = true
      }
    }, 10_000)
  })
</script>

<template>
  <div class="mx-auto max-w-md py-6 sm:py-12">
    <BaseCard class="p-6 text-center">
      <!-- Confirmed -->
      <template v-if="confirmed">
        <div class="mb-4 text-4xl">&#10003;</div>
        <h1 class="mb-2 text-xl font-bold text-pitch-900">{{ t('auth.emailConfirmed') }}</h1>
        <p class="text-sm text-slate-500">{{ t('auth.redirecting') }}</p>
      </template>

      <!-- Error / expired token -->
      <template v-else-if="error">
        <h1 class="mb-4 text-xl font-bold text-pitch-900">{{ t('common.error') }}</h1>
        <p class="mb-4 text-sm text-slate-600">{{ t('auth.invalidToken') }}</p>
        <NuxtLink
          to="/auth/login"
          class="inline-block rounded-md bg-pitch-700 px-4 py-2 text-sm font-medium text-white hover:bg-pitch-800"
        >
          {{ t('auth.login') }}
        </NuxtLink>
      </template>

      <!-- Loading -->
      <template v-else>
        <div class="mb-4 h-8 w-8 mx-auto animate-spin rounded-full border-4 border-pitch-200 border-t-pitch-700" />
        <h1 class="text-xl font-bold text-pitch-900">{{ t('auth.confirmingAccount') }}</h1>
      </template>
    </BaseCard>
  </div>
</template>
