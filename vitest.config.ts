import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        domEnvironment: 'happy-dom',
      },
    },
    globals: true,
    include: ['tests/**/*.test.ts'],
    environmentMatchGlobs: [
      // Server util tests don't need Nuxt environment
      ['tests/utils/api-football.test.ts', 'node'],
      ['tests/utils/competitions.test.ts', 'node'],
      ['tests/utils/news-sources.test.ts', 'node'],
      ['tests/server/**', 'node'],
    ],
    coverage: {
      provider: 'v8',
      include: ['app/utils/**', 'app/composables/**', 'server/utils/**', 'server/api/**'],
    },
  },
})
