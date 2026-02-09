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
          classes: 'bg-red-100 text-red-700',
          pulse: true,
        }
      case 'finished':
        return { text: t('matches.fulltime'), classes: 'bg-slate-100 text-slate-600', pulse: false }
      case 'scheduled':
        return {
          text: props.kickoffAt ? formatTime(props.kickoffAt, locale.value) : t('matches.scheduled'),
          classes: 'bg-blue-50 text-blue-600',
          pulse: false,
        }
      case 'postponed':
        return { text: t('matches.postponed'), classes: 'bg-orange-50 text-orange-600', pulse: false }
      case 'cancelled':
        return { text: t('matches.cancelled'), classes: 'bg-slate-100 text-slate-400', pulse: false }
      default:
        return { text: props.status, classes: 'bg-slate-100 text-slate-600', pulse: false }
    }
  })
</script>

<template>
  <span class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium" :class="display.classes">
    <span v-if="display.pulse" class="relative flex h-2 w-2">
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
      <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
    </span>
    {{ display.text }}
  </span>
</template>
