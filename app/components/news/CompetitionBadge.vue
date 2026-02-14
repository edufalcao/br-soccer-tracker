<script setup lang="ts">
  defineProps<{
    competition: Competition
  }>()

  const { t } = useI18n()

  const colorMap: Record<Competition, string> = {
    serie_a: 'bg-neon/15 text-neon border border-neon/20',
    serie_b: 'bg-gold/15 text-gold border border-gold/20',
    copa_do_brasil: 'bg-live/15 text-live border border-live/20',
  }
</script>

<template>
  <span
    class="inline-block rounded-md px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-widest"
    :class="colorMap[competition]"
  >
    {{ t(`competitions.${competition}`) }}
  </span>
</template>
