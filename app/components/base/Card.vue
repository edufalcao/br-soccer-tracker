<script setup lang="ts">
  withDefaults(
    defineProps<{
      padded?: boolean
      hoverable?: boolean
      glow?: boolean
    }>(),
    {
      padded: true,
      hoverable: false,
      glow: false,
    },
  )
</script>

<template>
  <div
    class="overflow-hidden rounded-xl glass"
    :class="[
      hoverable && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-glow',
      padded && 'p-4 sm:p-6',
      glow && 'neon-border',
    ]"
  >
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>
