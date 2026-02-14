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
  <div class="animate-fade-in flex flex-col items-center justify-center rounded-xl glass py-12 text-center">
    <!-- Soccer ball icon -->
    <svg class="mb-4 h-12 w-12 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
      <circle cx="12" cy="12" r="10" />
      <path
        d="M12 2a10 10 0 0 1 4.5 1.1L12 7l-4.5-3.9A10 10 0 0 1 12 2ZM2.5 9.5 7 8l2 5-3.5 3.5A10 10 0 0 1 2.5 9.5ZM8 20.5l1-4.5h6l1 4.5a10 10 0 0 1-8 0ZM18.5 16.5 15 13l2-5 4.5 1.5a10 10 0 0 1-3 7Z"
      />
    </svg>
    <p class="text-sm text-secondary">{{ message }}</p>
    <BaseButton v-if="actionLabel" :to="actionTo" variant="primary" size="sm" class="mt-4" @click="emit('action')">
      {{ actionLabel }}
    </BaseButton>
  </div>
</template>
