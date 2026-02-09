<script setup lang="ts">
  withDefaults(
    defineProps<{
      padded?: boolean
      hoverable?: boolean
    }>(),
    {
      padded: true,
      hoverable: false,
    },
  )
</script>

<template>
  <div
    class="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200"
    :class="[hoverable && 'transition-shadow hover:shadow-md', padded && 'p-4 sm:p-6']"
  >
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>
