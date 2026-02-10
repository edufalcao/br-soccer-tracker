<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      variant?: 'primary' | 'secondary' | 'ghost'
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
    primary: 'bg-pitch-800 text-white shadow-sm shadow-pitch-900/20 hover:bg-pitch-900 focus-visible:ring-pitch-500',
    secondary:
      'bg-white text-pitch-900 ring-1 ring-pitch-200 hover:bg-pitch-50 hover:ring-pitch-300 focus-visible:ring-pitch-500',
    ghost: 'text-pitch-700 hover:bg-pitch-50 hover:text-pitch-900 focus-visible:ring-pitch-500',
  }

  const sizeClasses: Record<string, string> = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }

  const classes = computed(() => [
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
