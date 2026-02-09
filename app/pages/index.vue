<script setup lang="ts">
  const { t } = useI18n()

  useHead({
    title: t('home.title'),
  })
</script>

<template>
  <div>
    <h1 class="mb-6 text-3xl font-bold text-pitch-900">
      {{ t('home.title') }}
    </h1>
    <p class="text-lg text-slate-600">
      {{ t('home.latestNews') }}
    </p>
  </div>
</template>
