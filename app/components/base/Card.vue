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
    class="overflow-hidden rounded-xl bg-white shadow-md shadow-slate-200/60 ring-1 ring-slate-100"
    :class="[
      hoverable && 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/80',
      padded && 'p-4 sm:p-6',
    ]"
  >
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>
