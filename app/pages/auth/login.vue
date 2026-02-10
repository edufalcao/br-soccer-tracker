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
    <BaseCard class="animate-fade-in p-6">
      <h1 class="mb-2 text-center font-display text-2xl tracking-tight text-pitch-950">
        {{ t('auth.loginTitle') }}
      </h1>
      <div class="mx-auto mb-6 h-[2px] w-16 bg-gradient-accent" />

      <div v-if="errorMessage" class="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
        {{ errorMessage }}
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="mb-1 block text-sm font-semibold text-pitch-700">{{ t('auth.email') }}</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="w-full rounded-lg px-3 py-2 text-sm outline-none ring-1 ring-pitch-200 transition-all focus:ring-2 focus:ring-pitch-500"
          />
        </div>

        <div>
          <label for="password" class="mb-1 block text-sm font-semibold text-pitch-700">{{ t('auth.password') }}</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            class="w-full rounded-lg px-3 py-2 text-sm outline-none ring-1 ring-pitch-200 transition-all focus:ring-2 focus:ring-pitch-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-lg bg-pitch-800 px-4 py-2 text-sm font-semibold tracking-wide text-white shadow-sm shadow-pitch-900/20 transition-colors hover:bg-pitch-900 disabled:opacity-50"
        >
          {{ loading ? t('common.loading') : t('auth.login') }}
        </button>
      </form>

      <div class="mt-4 space-y-2 text-center text-sm">
        <NuxtLink to="/auth/forgot-password" class="block text-pitch-600 hover:text-pitch-800">
          {{ t('auth.forgotPassword') }}
        </NuxtLink>
        <p class="text-pitch-500">
          {{ t('auth.noAccount') }}
          <NuxtLink to="/auth/register" class="font-semibold text-pitch-700 hover:text-pitch-900">
            {{ t('auth.register') }}
          </NuxtLink>
        </p>
      </div>
    </BaseCard>
  </div>
</template>
