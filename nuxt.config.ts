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
      { code: 'pt-BR', language: 'pt-BR', file: 'pt-BR.json', name: 'Portugues' },
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
