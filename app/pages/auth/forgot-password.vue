<script setup lang="ts">
  const { t } = useI18n()
  useHead({ title: t('auth.forgotPasswordTitle') })

  const supabase = useSupabaseClient()

  const email = ref('')
  const loading = ref(false)
  const errorMessage = ref('')
  const success = ref(false)

  async function handleReset() {
    errorMessage.value = ''
    loading.value = true

    try {
      const redirectTo = `${window.location.origin}/auth/confirm`
      const { error } = await supabase.auth.resetPasswordForEmail(email.value, { redirectTo })

      if (error) {
        errorMessage.value = error.message
        return
      }

      success.value = true
    } catch {
      errorMessage.value = t('common.error')
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="mx-auto max-w-md py-6 sm:py-12">
    <BaseCard class="p-6">
      <h1 class="mb-6 text-center text-2xl font-bold text-pitch-900">{{ t('auth.forgotPasswordTitle') }}</h1>

      <!-- Success state -->
      <div v-if="success" class="space-y-4 text-center">
        <div class="rounded-md bg-green-50 px-4 py-6 text-sm text-green-700">
          {{ t('auth.checkEmail') }}
        </div>
        <NuxtLink to="/auth/login" class="text-sm font-medium text-pitch-700 hover:text-pitch-900">
          {{ t('auth.login') }}
        </NuxtLink>
      </div>

      <!-- Reset form -->
      <template v-else>
        <div v-if="errorMessage" class="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {{ errorMessage }}
        </div>

        <form class="space-y-4" @submit.prevent="handleReset">
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

          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-md bg-pitch-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pitch-800 disabled:opacity-50"
          >
            {{ loading ? t('common.loading') : t('auth.sendResetLink') }}
          </button>
        </form>

        <p class="mt-4 text-center text-sm text-slate-500">
          <NuxtLink to="/auth/login" class="font-medium text-pitch-700 hover:text-pitch-900">
            &larr; {{ t('common.back') }}
          </NuxtLink>
        </p>
      </template>
    </BaseCard>
  </div>
</template>
