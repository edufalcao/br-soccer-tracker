<script setup lang="ts">
  defineProps<{
    competition: Competition
  }>()

  const { t } = useI18n()

  const colorMap: Record<Competition, string> = {
    serie_a: 'bg-green-100 text-green-700',
    serie_b: 'bg-blue-100 text-blue-700',
    copa_do_brasil: 'bg-yellow-100 text-yellow-700',
  }
</script>

<template>
  <span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium" :class="colorMap[competition]">
    {{ t(`competitions.${competition}`) }}
  </span>
</template>
