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
  <div class="mb-4 flex flex-wrap gap-2">
    <template v-for="option in options" :key="option.key">
      <BaseButton
        v-if="option.key !== 'all' || showAll"
        :variant="modelValue === option.key ? 'primary' : 'ghost'"
        size="sm"
        @click="emit('update:modelValue', option.key)"
      >
        {{ t(option.labelKey) }}
      </BaseButton>
    </template>
  </div>
</template>
