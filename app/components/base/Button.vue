<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
      size?: 'sm' | 'md' | 'lg'
      loading?: boolean
      disabled?: boolean
      to?: string
    }>(),
    {
      variant: 'primary',
      size: 'md',
      loading: false,
      disabled: false,
      to: undefined,
    },
  )

  const variantClasses: Record<string, string> = {
    primary: 'bg-neon text-void hover:bg-neon-dim shadow-sm focus-visible:ring-neon',
    secondary: 'bg-transparent text-neon border border-neon/40 hover:bg-neon/10 focus-visible:ring-neon',
    ghost: 'text-secondary hover:text-neon focus-visible:ring-neon',
    danger: 'bg-live text-white hover:bg-red-600 focus-visible:ring-live',
  }

  const sizeClasses: Record<string, string> = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }

  const classes = computed(() => [
    'inline-flex items-center justify-center gap-2 rounded-lg font-display font-semibold uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)] disabled:pointer-events-none disabled:opacity-50',
    variantClasses[props.variant],
    sizeClasses[props.size],
  ])
</script>

<template>
  <NuxtLink v-if="to && !disabled" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :class="classes" :disabled="disabled || loading" type="button">
    <svg v-if="loading" class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <slot />
  </button>
</template>
