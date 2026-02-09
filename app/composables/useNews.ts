interface NewsMeta {
  page: number
  limit: number
  total: number | null
}

export function useNews(options?: {
  competition?: Ref<Competition | undefined>
  teamId?: Ref<number | undefined>
  page?: Ref<number>
  limit?: number
}) {
  const page = options?.page ?? ref(1)
  const limit = options?.limit ?? 20

  const query = computed(() => ({
    competition: options?.competition?.value ?? undefined,
    team_id: options?.teamId?.value ?? undefined,
    page: page.value,
    limit,
  }))

  const {
    data: raw,
    pending,
    error,
    refresh,
  } = useFetch('/api/news', {
    query,
    transform: (res: { data: Record<string, unknown>[]; meta: Record<string, unknown> }) => ({
      data: snakeToCamelArray<NewsArticle>(res.data),
      meta: res.meta as NewsMeta,
    }),
    default: () => ({ data: [], meta: { page: 1, limit: 20, total: null } }),
  })

  const articles = computed(() => raw.value?.data ?? [])
  const meta = computed(() => raw.value?.meta ?? { page: 1, limit: 20, total: null })

  return { articles, meta, pending, error, refresh }
}
