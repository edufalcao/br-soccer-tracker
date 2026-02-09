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
  <div class="mx-auto max-w-md py-12">
    <BaseCard class="p-6">
      <h1 class="mb-6 text-center text-2xl font-bold text-pitch-900">{{ t('auth.loginTitle') }}</h1>

      <div v-if="errorMessage" class="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
        {{ errorMessage }}
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="mb-1 block text-sm font-medium text-slate-700">{{ t('auth.email') }}</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-pitch-500 focus:outline-none focus:ring-1 focus:ring-pitch-500"
          />
        </div>

        <div>
          <label for="password" class="mb-1 block text-sm font-medium text-slate-700">{{ t('auth.password') }}</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-pitch-500 focus:outline-none focus:ring-1 focus:ring-pitch-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-md bg-pitch-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pitch-800 disabled:opacity-50"
        >
          {{ loading ? t('common.loading') : t('auth.login') }}
        </button>
      </form>

      <div class="mt-4 space-y-2 text-center text-sm">
        <NuxtLink to="/auth/forgot-password" class="block text-pitch-600 hover:text-pitch-800">
          {{ t('auth.forgotPassword') }}
        </NuxtLink>
        <p class="text-slate-500">
          {{ t('auth.noAccount') }}
          <NuxtLink to="/auth/register" class="font-medium text-pitch-700 hover:text-pitch-900">
            {{ t('auth.register') }}
          </NuxtLink>
        </p>
      </div>
    </BaseCard>
  </div>
</template>
