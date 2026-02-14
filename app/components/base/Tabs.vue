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
  <div class="mb-4 flex gap-4 overflow-x-auto border-b border-theme pb-px">
    <button
      v-for="item in items"
      :key="item.key"
      class="whitespace-nowrap border-b-2 px-1 py-2 font-display text-xs font-bold uppercase tracking-widest transition-all duration-200"
      :class="
        modelValue === item.key ? 'border-neon text-neon' : 'border-transparent text-secondary hover:text-primary'
      "
      @click="emit('update:modelValue', item.key)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
