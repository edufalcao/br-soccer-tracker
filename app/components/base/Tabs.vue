<script setup lang="ts">
  defineProps<{
    modelValue: string
    items: { key: string; label: string }[]
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()
</script>

<template>
  <div class="mb-4 flex gap-1 overflow-x-auto rounded-lg bg-pitch-50/50 p-1 ring-1 ring-pitch-100">
    <button
      v-for="item in items"
      :key="item.key"
      class="whitespace-nowrap rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-200"
      :class="
        modelValue === item.key
          ? 'bg-white text-pitch-900 shadow-card ring-1 ring-pitch-100/50'
          : 'text-pitch-600 hover:bg-pitch-100/50 hover:text-pitch-800'
      "
      @click="emit('update:modelValue', item.key)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
