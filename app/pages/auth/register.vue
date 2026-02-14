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
  <div class="mx-auto max-w-md py-6 sm:py-12">
    <div class="stadium-gradient grid-lines -mx-4 -mt-6 mb-6 px-4 py-12 sm:-mx-6 sm:px-6">
      <div class="relative z-10">
        <BaseCard class="animate-fade-in glass p-6">
          <h1 class="mb-2 text-center font-display text-3xl font-bold tracking-tight text-primary">
            {{ t('auth.registerTitle') }}
          </h1>
          <div class="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

          <!-- Success state -->
          <div v-if="success" class="space-y-4 text-center">
            <div class="rounded-lg bg-neon/10 px-4 py-6 text-sm text-neon border border-neon/20">
              {{ t('auth.checkEmail') }}
            </div>
            <NuxtLink to="/auth/login" class="text-sm font-semibold text-neon hover:text-neon-dim transition-colors">
              {{ t('auth.login') }}
            </NuxtLink>
          </div>

          <!-- Registration form -->
          <template v-else>
            <div
              v-if="errorMessage"
              class="mb-4 rounded-lg bg-live/10 px-4 py-3 text-sm text-live border border-live/20"
            >
              {{ errorMessage }}
            </div>

            <form class="space-y-4" @submit.prevent="handleRegister">
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
                <label for="password" class="mb-1 block text-sm font-semibold text-primary">
                  {{ t('auth.password') }}
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
                {{ loading ? t('common.loading') : t('auth.register') }}
              </button>
            </form>

            <p class="mt-4 text-center text-sm text-secondary">
              {{ t('auth.hasAccount') }}
              <NuxtLink to="/auth/login" class="font-semibold text-neon hover:text-neon-dim transition-colors">
                {{ t('auth.login') }}
              </NuxtLink>
            </p>
          </template>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
