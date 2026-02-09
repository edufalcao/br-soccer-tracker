// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@nuxtjs/i18n', '@nuxt/eslint'],

  runtimeConfig: {
    apiFootballKey: '',
    gnewsApiKey: '',
    supabaseServiceRoleKey: '',
    public: {
      supabaseUrl: '',
      supabaseKey: '',
    },
  },

  supabase: {
    redirect: false,
  },

  i18n: {
    locales: [
      { code: 'pt-BR', language: 'pt-BR', file: 'pt-BR.json', name: 'Português' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
    ],
    defaultLocale: 'pt-BR',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_lang',
      fallbackLocale: 'pt-BR',
    },
    langDir: '../i18n/locales',
  },

  nitro: {
    experimental: { tasks: true },
    scheduledTasks: {
      // Teams: once daily at 4 AM UTC
      '0 4 * * *': ['teams:sync'],
      // Fixtures: every 6 hours
      '0 */6 * * *': ['matches:sync-fixtures'],
      // Standings: every 4 hours
      '0 */4 * * *': ['matches:sync-standings'],
      // Live scores: every 5 minutes (smart — skips API calls when no matches are in progress)
      '*/5 * * * *': ['matches:sync-live'],
      // News: every 2 hours
      '30 */2 * * *': ['news:fetch'],
    },
    preset: 'node-server',
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },
})
