<script setup lang="ts">
  defineProps<{
    message?: string
  }>()

  const emit = defineEmits<{
    retry: []
  }>()

  const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <svg class="mb-4 h-12 w-12 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
    <p class="text-sm text-red-600">{{ message || t('common.error') }}</p>
    <BaseButton variant="secondary" size="sm" class="mt-4" @click="emit('retry')">
      {{ t('common.retry') }}
    </BaseButton>
  </div>
</template>
