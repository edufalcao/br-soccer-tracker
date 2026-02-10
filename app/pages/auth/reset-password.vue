<script setup lang="ts">
  const { t } = useI18n()
  useHead({ title: t('auth.resetPasswordTitle') })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // Must have a session (from the recovery token) to reset password
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/auth/login')
    }
  })

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

  async function handleResetPassword() {
    if (validationError.value) return

    errorMessage.value = ''
    loading.value = true

    try {
      const { error } = await supabase.auth.updateUser({
        password: password.value,
      })

      if (error) {
        errorMessage.value = error.message
        return
      }

      success.value = true
      setTimeout(() => navigateTo('/'), 2000)
    } catch {
      errorMessage.value = t('common.error')
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="mx-auto max-w-md py-6 sm:py-12">
    <BaseCard class="animate-fade-in p-6">
      <h1 class="mb-2 text-center font-display text-2xl tracking-tight text-pitch-950">
        {{ t('auth.resetPasswordTitle') }}
      </h1>
      <div class="mx-auto mb-6 h-[2px] w-16 bg-gradient-accent" />

      <!-- Success state -->
      <div v-if="success" class="space-y-4 text-center">
        <div class="rounded-lg bg-pitch-50 px-4 py-6 text-sm text-pitch-700 ring-1 ring-pitch-200">
          {{ t('auth.passwordUpdated') }}
        </div>
        <p class="text-sm text-pitch-500">{{ t('auth.redirecting') }}</p>
      </div>

      <!-- Reset form -->
      <template v-else>
        <div v-if="errorMessage" class="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {{ errorMessage }}
        </div>

        <form class="space-y-4" @submit.prevent="handleResetPassword">
          <div>
            <label for="password" class="mb-1 block text-sm font-semibold text-pitch-700">
              {{ t('auth.newPassword') }}
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              minlength="6"
              autocomplete="new-password"
              class="w-full rounded-lg px-3 py-2 text-sm outline-none ring-1 ring-pitch-200 transition-all focus:ring-2 focus:ring-pitch-500"
            />
          </div>

          <div>
            <label for="confirmPassword" class="mb-1 block text-sm font-semibold text-pitch-700">
              {{ t('auth.confirmPassword') }}
            </label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              minlength="6"
              autocomplete="new-password"
              class="w-full rounded-lg px-3 py-2 text-sm outline-none ring-1 ring-pitch-200 transition-all focus:ring-2 focus:ring-pitch-500"
            />
          </div>

          <p v-if="validationError" class="text-sm text-red-600">{{ validationError }}</p>

          <button
            type="submit"
            :disabled="loading || !!validationError"
            class="w-full rounded-lg bg-pitch-800 px-4 py-2 text-sm font-semibold tracking-wide text-white shadow-sm shadow-pitch-900/20 transition-colors hover:bg-pitch-900 disabled:opacity-50"
          >
            {{ loading ? t('common.loading') : t('auth.resetPassword') }}
          </button>
        </form>
      </template>
    </BaseCard>
  </div>
</template>
