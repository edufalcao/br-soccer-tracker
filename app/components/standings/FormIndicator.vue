<script setup lang="ts">
  const props = defineProps<{
    form: string | null
  }>()

  const results = computed(() => {
    if (!props.form) return []
    return props.form
      .slice(-5)
      .split('')
      .map((c) => {
        if (c === 'W') return { char: c, color: 'bg-neon' }
        if (c === 'D') return { char: c, color: 'bg-gold' }
        if (c === 'L') return { char: c, color: 'bg-live' }
        return { char: c, color: 'bg-ink-muted' }
      })
  })
</script>

<template>
  <div v-if="results.length" class="flex gap-1">
    <span v-for="(r, i) in results" :key="i" :class="r.color" class="inline-block h-2 w-3 rounded-sm" :title="r.char" />
  </div>
</template>
