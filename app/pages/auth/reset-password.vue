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
    <div class="stadium-gradient grid-lines -mx-4 -mt-6 mb-6 px-4 py-12 sm:-mx-6 sm:px-6">
      <div class="relative z-10">
        <BaseCard class="animate-fade-in glass p-6">
          <h1 class="mb-2 text-center font-display text-3xl font-bold tracking-tight text-primary">
            {{ t('auth.resetPasswordTitle') }}
          </h1>
          <div class="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

          <!-- Success state -->
          <div v-if="success" class="space-y-4 text-center">
            <div class="rounded-lg bg-neon/10 px-4 py-6 text-sm text-neon border border-neon/20">
              {{ t('auth.passwordUpdated') }}
            </div>
            <p class="text-sm text-secondary">{{ t('auth.redirecting') }}</p>
          </div>

          <!-- Reset form -->
          <template v-else>
            <div
              v-if="errorMessage"
              class="mb-4 rounded-lg bg-live/10 px-4 py-3 text-sm text-live border border-live/20"
            >
              {{ errorMessage }}
            </div>

            <form class="space-y-4" @submit.prevent="handleResetPassword">
              <div>
                <label for="password" class="mb-1 block text-sm font-semibold text-primary">
                  {{ t('auth.newPassword') }}
                </label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  minlength="6"
                  autocomplete="new-password"
                  class="w-full glass !border-line rounded-lg px-3 py-2 text-sm text-primary outline-none transition-all focus:!border-neon focus:shadow-glow"
                />
              </div>

              <div>
                <label for="confirmPassword" class="mb-1 block text-sm font-semibold text-primary">
                  {{ t('auth.confirmPassword') }}
                </label>
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  required
                  minlength="6"
                  autocomplete="new-password"
                  class="w-full glass !border-line rounded-lg px-3 py-2 text-sm text-primary outline-none transition-all focus:!border-neon focus:shadow-glow"
                />
              </div>

              <p v-if="validationError" class="text-sm text-live">{{ validationError }}</p>

              <button
                type="submit"
                :disabled="loading || !!validationError"
                class="w-full rounded-lg bg-neon px-4 py-2 text-sm font-semibold tracking-wide text-void shadow-sm transition-colors hover:bg-neon-dim disabled:opacity-50"
              >
                {{ loading ? t('common.loading') : t('auth.resetPassword') }}
              </button>
            </form>
          </template>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
