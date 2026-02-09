<script setup lang="ts">
  const { t } = useI18n()
  useHead({ title: t('auth.registerTitle') })

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
  const confirmPassword = ref('')
  const loading = ref(false)
  const errorMessage = ref('')
  const success = ref(false)

  const validationError = computed(() => {
    if (password.value && password.value.length < 6) {
      return t('auth.passwordMinLength')
    }
    if (confirmPassword.value && password.value !== confirmPassword.value) {
      return t('auth.passwordsNoMatch')
    }
    return ''
  })

  async function handleRegister() {
    if (validationError.value) return

    errorMessage.value = ''
    loading.value = true

    try {
      const redirectTo = `${window.location.origin}/auth/confirm`
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: { emailRedirectTo: redirectTo },
      })

      if (error) {
        errorMessage.value = t('auth.registerError')
        return
      }

      success.value = true
    } catch {
      errorMessage.value = t('auth.registerError')
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="mx-auto max-w-md py-12">
    <BaseCard class="p-6">
      <h1 class="mb-6 text-center text-2xl font-bold text-pitch-900">{{ t('auth.registerTitle') }}</h1>

      <!-- Success state -->
      <div v-if="success" class="space-y-4 text-center">
        <div class="rounded-md bg-green-50 px-4 py-6 text-sm text-green-700">
          {{ t('auth.checkEmail') }}
        </div>
        <NuxtLink to="/auth/login" class="text-sm font-medium text-pitch-700 hover:text-pitch-900">
          {{ t('auth.login') }}
        </NuxtLink>
      </div>

      <!-- Registration form -->
      <template v-else>
        <div v-if="errorMessage" class="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {{ errorMessage }}
        </div>

        <form class="space-y-4" @submit.prevent="handleRegister">
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
            <label for="password" class="mb-1 block text-sm font-medium text-slate-700">
              {{ t('auth.password') }}
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              minlength="6"
              autocomplete="new-password"
              class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-pitch-500 focus:outline-none focus:ring-1 focus:ring-pitch-500"
            />
          </div>

          <div>
            <label for="confirmPassword" class="mb-1 block text-sm font-medium text-slate-700">
              {{ t('auth.confirmPassword') }}
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              minlength="6"
              autocomplete="new-password"
              class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-pitch-500 focus:outline-none focus:ring-1 focus:ring-pitch-500"
            />
          </div>

          <p v-if="validationError" class="text-sm text-red-600">{{ validationError }}</p>

          <button
            type="submit"
            :disabled="loading || !!validationError"
            class="w-full rounded-md bg-pitch-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pitch-800 disabled:opacity-50"
          >
            {{ loading ? t('common.loading') : t('auth.register') }}
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-slate-500">
          {{ t('auth.hasAccount') }}
          <NuxtLink to="/auth/login" class="font-medium text-pitch-700 hover:text-pitch-900">
            {{ t('auth.login') }}
          </NuxtLink>
        </p>
      </template>
    </BaseCard>
  </div>
</template>
