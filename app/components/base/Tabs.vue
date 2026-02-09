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
  <div class="mb-4 flex gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1">
    <button
      v-for="item in items"
      :key="item.key"
      class="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors"
      :class="
        modelValue === item.key
          ? 'bg-white text-pitch-900 shadow-sm'
          : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
      "
      @click="emit('update:modelValue', item.key)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
