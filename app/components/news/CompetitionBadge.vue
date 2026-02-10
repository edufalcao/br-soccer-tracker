<script setup lang="ts">
  defineProps<{
    competition: Competition
  }>()

  const { t } = useI18n()

  const colorMap: Record<Competition, string> = {
    serie_a: 'bg-pitch-100 text-pitch-800',
    serie_b: 'bg-blue-100 text-blue-800',
    copa_do_brasil: 'bg-accent/20 text-accent-dark',
  }
</script>

<template>
  <span
    class="inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
    :class="colorMap[competition]"
  >
    {{ t(`competitions.${competition}`) }}
  </span>
</template>
