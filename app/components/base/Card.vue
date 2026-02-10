<script setup lang="ts">
  withDefaults(
    defineProps<{
      padded?: boolean
      hoverable?: boolean
      editorial?: boolean
    }>(),
    {
      padded: true,
      hoverable: false,
      editorial: false,
    },
  )
</script>

<template>
  <div
    class="overflow-hidden rounded-xl bg-gradient-card shadow-card ring-1 ring-pitch-100/50"
    :class="[
      hoverable && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:ring-pitch-200/50',
      padded && 'p-4 sm:p-6',
      editorial && 'pitch-corner',
    ]"
  >
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>
