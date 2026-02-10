import { describe, it, expect } from 'vitest'
import { registerEndpoint } from '@nuxt/test-utils/runtime'

describe('useNews', () => {
  registerEndpoint('/api/news', () => ({
    data: [{ id: '1', title: 'Flamengo wins', published_at: '2026-06-01T12:00:00Z', source_name: 'ge' }],
    meta: { page: 1, limit: 20, total: 1 },
  }))

  it('returns articles and meta', () => {
    const { articles, meta } = useNews()
    expect(articles.value).toBeDefined()
    expect(meta.value).toBeDefined()
    expect(meta.value.page).toBe(1)
  })

  it('accepts competition filter', () => {
    const competition = ref<Competition | undefined>('serie_a')
    const { articles } = useNews({ competition })
    expect(articles.value).toBeDefined()
  })

  it('accepts page option', () => {
    const page = ref(2)
    const { meta } = useNews({ page })
    expect(meta.value).toBeDefined()
  })
})
