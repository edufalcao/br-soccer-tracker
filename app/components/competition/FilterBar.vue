<script setup lang="ts">
  withDefaults(
    defineProps<{
      modelValue: Competition | 'all'
      showAll?: boolean
    }>(),
    {
      showAll: true,
    },
  )

  const emit = defineEmits<{
    'update:modelValue': [value: Competition | 'all']
  }>()

  const { t } = useI18n()

  const options: { key: Competition | 'all'; labelKey: string }[] = [
    { key: 'all', labelKey: 'competitions.all' },
    { key: 'serie_a', labelKey: 'competitions.serie_a' },
    { key: 'serie_b', labelKey: 'competitions.serie_b' },
    { key: 'copa_do_brasil', labelKey: 'competitions.copa_do_brasil' },
  ]
</script>

<template>
  <nav class="mb-4 flex flex-wrap gap-4 border-b border-theme">
    <template v-for="option in options" :key="option.key">
      <button
        v-if="option.key !== 'all' || showAll"
        class="relative pb-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-colors"
        :class="modelValue === option.key ? 'text-neon border-b-2 border-neon' : 'text-secondary hover:text-primary'"
        @click="emit('update:modelValue', option.key)"
      >
        {{ t(option.labelKey) }}
      </button>
    </template>
  </nav>
</template>
