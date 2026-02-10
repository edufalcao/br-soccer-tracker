const NEWS_QUERIES: { query: string; competition: Competition | null }[] = [
  { query: 'Brasileirão Série A', competition: 'serie_a' },
  { query: 'Brasileirão Série B', competition: 'serie_b' },
  { query: 'Copa do Brasil futebol', competition: 'copa_do_brasil' },
]

export default defineTask({
  meta: {
    name: 'news:fetch',
    description: 'Fetch news from GNews API (with fallback to Google News RSS)',
  },
  async run() {
    const supabase = useSupabaseAdmin()

    // Load teams for keyword-based tagging
    const { data: teams } = await supabase.from('teams').select('external_id, name')
    const teamList = (teams ?? []) as { external_id: number; name: string }[]

    const allArticles: NewsRow[] = []

    // --- GNews (requires API key, rate-limited) ---
    let gnewsFailed = false

    if (canCallApi('gnews')) {
      for (const { query, competition } of NEWS_QUERIES) {
        try {
          const articles = await withRetry(() => fetchGNews(query, 10))
          recordApiCall('gnews')
          console.info(`[news:fetch] GNews success for "${query}" (${articles.length} articles)`)

          for (const a of articles) {
            allArticles.push({
              external_id: a.url,
              title: a.title,
              description: a.description,
              content: a.content,
              source_name: a.source.name,
              source_url: a.url,
              image_url: a.image,
              published_at: a.publishedAt,
              competition,
              team_tags: tagTeams(`${a.title} ${a.description}`, teamList),
              language: 'pt',
              is_active: true,
            })
          }
        } catch (err) {
          console.warn(`[news:fetch] GNews failed for "${query}":`, err)
          gnewsFailed = true
        }
      }
    } else {
      console.warn('[news:fetch] GNews rate limit reached, skipping to RSS fallback')
      gnewsFailed = true
    }

    // --- Google News RSS (no key needed, fallback) ---
    // Always fetch RSS for supplementary content; prioritize if GNews failed
    for (const { query, competition } of NEWS_QUERIES) {
      try {
        const items = await withRetry(() => fetchGoogleNewsRss(query))
        console.info(`[news:fetch] RSS success for "${query}" (${items.length} items)`)

        for (const item of items) {
          allArticles.push({
            external_id: item.link,
            title: item.title,
            description: item.description || null,
            content: null,
            source_name: item.sourceName || 'Google News',
            source_url: item.link,
            image_url: null,
            published_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
            competition,
            team_tags: tagTeams(`${item.title} ${item.description}`, teamList),
            language: 'pt',
            is_active: true,
          })
        }
      } catch (err) {
        console.error(`[news:fetch] RSS also failed for "${query}":`, err)
      }
    }

    if (!allArticles.length) {
      console.error('[news:fetch] No articles fetched from any source')
      return { result: 'No articles fetched from any source' }
    }

    // Deduplicate by source URL before sending to DB
    const seen = new Set<string>()
    const uniqueArticles = allArticles.filter((a) => {
      if (seen.has(a.external_id)) return false
      seen.add(a.external_id)
      return true
    })

    const { error } = await supabase.from('news_articles').upsert(uniqueArticles, { onConflict: 'external_id' })

    const resultMsg = error ? `Error: ${error.message}` : `${uniqueArticles.length} articles synced`
    if (gnewsFailed) {
      console.warn(`[news:fetch] Completed with GNews fallback. ${resultMsg}`)
    } else {
      console.info(`[news:fetch] ${resultMsg}`)
    }

    return { result: resultMsg }
  },
})

// --- Helpers ---

interface NewsRow {
  external_id: string
  title: string
  description: string | null
  content: string | null
  source_name: string
  source_url: string
  image_url: string | null
  published_at: string
  competition: Competition | null
  team_tags: number[]
  language: string
  is_active: boolean
}

function tagTeams(text: string, teams: { external_id: number; name: string }[]): number[] {
  const lowerText = text.toLowerCase()
  return teams.filter((t) => lowerText.includes(t.name.toLowerCase())).map((t) => t.external_id)
}
