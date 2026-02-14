<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      team: Team | undefined
      size?: 'sm' | 'md' | 'lg'
    }>(),
    {
      size: 'sm',
    },
  )

  const sizeClasses: Record<string, string> = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const textSizeClasses: Record<string, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
  }

  const displayName = computed(() => props.team?.shortName || props.team?.name || '?')
</script>

<template>
  <img
    v-if="team?.badgeUrl"
    :src="team.badgeUrl"
    :alt="displayName"
    :class="sizeClasses[size]"
    class="object-contain ring-1 ring-line rounded-full"
    loading="lazy"
  />
  <div
    v-else
    :class="[sizeClasses[size], textSizeClasses[size]]"
    class="flex items-center justify-center rounded-full bg-card-raised font-display font-bold text-primary ring-1 ring-line"
  >
    {{ displayName.charAt(0) }}
  </div>
</template>
