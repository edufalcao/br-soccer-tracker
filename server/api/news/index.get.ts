import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { competition, team_id, page = '1', limit = '20' } = getQuery(event)

  const pageNum = Math.max(1, Number(page))
  const limitNum = Math.min(50, Math.max(1, Number(limit)))
  const offset = (pageNum - 1) * limitNum

  let query = client
    .from('news_articles')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .order('published_at', { ascending: false })
    .range(offset, offset + limitNum - 1)

  if (competition) {
    query = query.eq('competition', String(competition))
  }
  if (team_id) {
    query = query.contains('team_tags', [Number(team_id)])
  }

  const { data, error, count } = await query

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { data, meta: { page: pageNum, limit: limitNum, total: count } }
})
