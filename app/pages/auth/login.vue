<script setup lang="ts">
  const { t } = useI18n()
  useHead({ title: t('auth.loginTitle') })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // Redirect if already logged in
  watchEffect(() => {
    if (user.value) {
      navigateTo('/')
    }
  })

  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const errorMessage = ref('')

  async function handleLogin() {
    errorMessage.value = ''
    loading.value = true

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })

      if (error) {
        errorMessage.value = t('auth.loginError')
        return
      }

      const { syncOnLogin } = useUserPreferences()
      await syncOnLogin()
      await navigateTo('/')
    } catch {
      errorMessage.value = t('auth.loginError')
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="mx-auto max-w-md py-6 sm:py-12">
    <div class="stadium-gradient grid-lines -mx-4 -mt-6 mb-6 px-4 py-12 sm:-mx-6 sm:px-6">
      <div class="relative z-10">
        <BaseCard class="animate-fade-in glass p-6">
          <h1 class="mb-2 text-center font-display text-3xl font-bold tracking-tight text-primary">
            {{ t('auth.loginTitle') }}
          </h1>
          <div class="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

          <div v-if="errorMessage" class="mb-4 rounded-lg bg-live/10 px-4 py-3 text-sm text-live border border-live/20">
            {{ errorMessage }}
          </div>

          <form class="space-y-4" @submit.prevent="handleLogin">
            <div>
              <label for="email" class="mb-1 block text-sm font-semibold text-primary">{{ t('auth.email') }}</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                autocomplete="email"
                class="w-full glass !border-line rounded-lg px-3 py-2 text-sm text-primary outline-none transition-all focus:!border-neon focus:shadow-glow"
              />
            </div>

            <div>
              <label for="password" class="mb-1 block text-sm font-semibold text-primary">{{
                t('auth.password')
              }}</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                autocomplete="current-password"
                class="w-full glass !border-line rounded-lg px-3 py-2 text-sm text-primary outline-none transition-all focus:!border-neon focus:shadow-glow"
              />
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full rounded-lg bg-neon px-4 py-2 text-sm font-semibold tracking-wide text-void shadow-sm transition-colors hover:bg-neon-dim disabled:opacity-50"
            >
              {{ loading ? t('common.loading') : t('auth.login') }}
            </button>
          </form>

          <div class="mt-4 space-y-2 text-center text-sm">
            <NuxtLink
              to="/auth/forgot-password"
              class="block text-neon font-semibold hover:text-neon-dim transition-colors"
            >
              {{ t('auth.forgotPassword') }}
            </NuxtLink>
            <p class="text-secondary">
              {{ t('auth.noAccount') }}
              <NuxtLink to="/auth/register" class="font-semibold text-neon hover:text-neon-dim transition-colors">
                {{ t('auth.register') }}
              </NuxtLink>
            </p>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
