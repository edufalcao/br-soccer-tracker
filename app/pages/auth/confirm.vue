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
    <div class="stadium-gradient grid-lines -mx-4 -mt-6 mb-6 px-4 py-12 sm:-mx-6 sm:px-6">
      <div class="relative z-10">
        <BaseCard class="animate-fade-in glass p-6 text-center">
          <!-- Confirmed -->
          <template v-if="confirmed">
            <div class="mb-4 text-4xl text-neon">&#10003;</div>
            <h1 class="mb-2 font-display text-xl font-bold tracking-tight text-primary">
              {{ t('auth.emailConfirmed') }}
            </h1>
            <p class="text-sm text-secondary">{{ t('auth.redirecting') }}</p>
          </template>

          <!-- Error / expired token -->
          <template v-else-if="error">
            <h1 class="mb-4 font-display text-xl font-bold tracking-tight text-primary">{{ t('common.error') }}</h1>
            <p class="mb-4 text-sm text-secondary">{{ t('auth.invalidToken') }}</p>
            <NuxtLink
              to="/auth/login"
              class="inline-block rounded-lg bg-neon px-4 py-2 text-sm font-semibold tracking-wide text-void shadow-sm transition-colors hover:bg-neon-dim"
            >
              {{ t('auth.login') }}
            </NuxtLink>
          </template>

          <!-- Loading -->
          <template v-else>
            <div class="mb-4 mx-auto h-8 w-8 animate-spin rounded-full border-4 border-line border-t-neon" />
            <h1 class="font-display text-xl font-bold tracking-tight text-primary">
              {{ t('auth.confirmingAccount') }}
            </h1>
          </template>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
