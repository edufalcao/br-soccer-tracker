<script setup lang="ts">
  const props = defineProps<{
    status: MatchStatus
    elapsedMinutes?: number | null
    kickoffAt?: string
  }>()

  const { t, locale } = useI18n()

  const display = computed(() => {
    switch (props.status) {
      case 'live':
        return {
          text: props.elapsedMinutes ? `${props.elapsedMinutes}'` : t('matches.live'),
          classes: 'bg-live/20 text-live border border-live/30 font-display font-bold',
          pulse: true,
        }
      case 'finished':
        return {
          text: t('matches.fulltime'),
          classes: 'bg-card-raised text-secondary border border-theme',
          pulse: false,
        }
      case 'scheduled':
        return {
          text: props.kickoffAt ? formatTime(props.kickoffAt, locale.value) : t('matches.scheduled'),
          classes: 'bg-card-raised text-secondary border border-theme font-mono',
          pulse: false,
        }
      case 'postponed':
        return { text: t('matches.postponed'), classes: 'bg-gold/15 text-gold border border-gold/20', pulse: false }
      case 'cancelled':
        return {
          text: t('matches.cancelled'),
          classes: 'bg-card-raised text-secondary border border-theme',
          pulse: false,
        }
      default:
        return { text: props.status, classes: 'bg-card-raised text-secondary border border-theme', pulse: false }
    }
  })
</script>

<template>
  <span
    class="inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
    :class="display.classes"
  >
    <span v-if="display.pulse" class="relative flex h-1.5 w-1.5">
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
      <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
    </span>
    {{ display.text }}
  </span>
</template>
