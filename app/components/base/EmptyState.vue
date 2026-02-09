<script setup lang="ts">
  defineProps<{
    message: string
    actionLabel?: string
    actionTo?: string
  }>()

  const emit = defineEmits<{
    action: []
  }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <svg class="mb-4 h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
    <p class="text-sm text-slate-500">{{ message }}</p>
    <BaseButton v-if="actionLabel" :to="actionTo" variant="secondary" size="sm" class="mt-4" @click="emit('action')">
      {{ actionLabel }}
    </BaseButton>
  </div>
</template>
