<script setup lang="ts">
  const { locale, setLocale } = useI18n()
  const user = useSupabaseUser()
  const { savePreferences } = useUserPreferences()

  async function switchTo(lang: 'pt-BR' | 'en') {
    if (locale.value === lang) return
    await setLocale(lang)

    if (user.value) {
      savePreferences({ language: lang })
    }
  }
</script>

<template>
  <div class="flex items-center gap-1">
    <button
      class="overflow-hidden rounded-sm transition-all"
      :class="locale === 'pt-BR' ? 'ring-2 ring-neon opacity-100' : 'opacity-40 hover:opacity-70'"
      title="Português"
      @click="switchTo('pt-BR')"
    >
      <svg class="h-4 w-6" viewBox="0 0 60 42">
        <rect width="60" height="42" fill="#009739" />
        <polygon points="30,3 57,21 30,39 3,21" fill="#FEDD00" />
        <circle cx="30" cy="21" r="9" fill="#002776" />
        <path d="M21.5,22.5 Q30,17 38.5,22.5" fill="none" stroke="#fff" stroke-width="1.2" />
      </svg>
    </button>
    <button
      class="overflow-hidden rounded-sm transition-all"
      :class="locale === 'en' ? 'ring-2 ring-neon opacity-100' : 'opacity-40 hover:opacity-70'"
      title="English"
      @click="switchTo('en')"
    >
      <svg class="h-4 w-6" viewBox="0 0 60 30">
        <clipPath id="hdr-us"><rect width="60" height="30" /></clipPath>
        <g clip-path="url(#hdr-us)">
          <rect width="60" height="30" fill="#B22234" />
          <path
            d="M0,3.46H60M0,8.08H60M0,12.69H60M0,17.31H60M0,21.92H60M0,26.54H60"
            stroke="#fff"
            stroke-width="2.31"
          />
          <rect width="24" height="16.15" fill="#3C3B6E" />
          <g fill="#fff">
            <circle cx="4" cy="2.5" r="1" />
            <circle cx="8" cy="2.5" r="1" />
            <circle cx="12" cy="2.5" r="1" />
            <circle cx="16" cy="2.5" r="1" />
            <circle cx="20" cy="2.5" r="1" />
            <circle cx="6" cy="5" r="1" />
            <circle cx="10" cy="5" r="1" />
            <circle cx="14" cy="5" r="1" />
            <circle cx="18" cy="5" r="1" />
            <circle cx="4" cy="7.5" r="1" />
            <circle cx="8" cy="7.5" r="1" />
            <circle cx="12" cy="7.5" r="1" />
            <circle cx="16" cy="7.5" r="1" />
            <circle cx="20" cy="7.5" r="1" />
            <circle cx="6" cy="10" r="1" />
            <circle cx="10" cy="10" r="1" />
            <circle cx="14" cy="10" r="1" />
            <circle cx="18" cy="10" r="1" />
            <circle cx="4" cy="12.5" r="1" />
            <circle cx="8" cy="12.5" r="1" />
            <circle cx="12" cy="12.5" r="1" />
            <circle cx="16" cy="12.5" r="1" />
            <circle cx="20" cy="12.5" r="1" />
          </g>
        </g>
      </svg>
    </button>
  </div>
</template>
