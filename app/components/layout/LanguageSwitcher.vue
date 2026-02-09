<script setup lang="ts">
  const { locale, setLocale } = useI18n()

  function toggleLanguage() {
    const newLocale = locale.value === 'pt-BR' ? 'en' : 'pt-BR'
    setLocale(newLocale)
  }

  const label = computed(() => (locale.value === 'pt-BR' ? 'EN' : 'PT'))
</script>

<template>
  <button
    class="rounded-md border border-current px-2 py-1 text-xs font-semibold transition-colors hover:bg-white/10"
    @click="toggleLanguage"
  >
    {{ label }}
  </button>
</template>
