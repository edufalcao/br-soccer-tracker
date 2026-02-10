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
          classes: 'bg-red-600 text-white',
          pulse: true,
        }
      case 'finished':
        return { text: t('matches.fulltime'), classes: 'bg-pitch-100 text-pitch-700', pulse: false }
      case 'scheduled':
        return {
          text: props.kickoffAt ? formatTime(props.kickoffAt, locale.value) : t('matches.scheduled'),
          classes: 'bg-pitch-50 text-pitch-600',
          pulse: false,
        }
      case 'postponed':
        return { text: t('matches.postponed'), classes: 'bg-orange-50 text-orange-600', pulse: false }
      case 'cancelled':
        return { text: t('matches.cancelled'), classes: 'bg-pitch-100 text-pitch-400', pulse: false }
      default:
        return { text: props.status, classes: 'bg-pitch-100 text-pitch-600', pulse: false }
    }
  })
</script>

<template>
  <span
    class="inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
    :class="display.classes"
  >
    <span v-if="display.pulse" class="relative flex h-1.5 w-1.5">
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
      <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
    </span>
    {{ display.text }}
  </span>
</template>
