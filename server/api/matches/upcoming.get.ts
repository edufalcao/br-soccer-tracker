import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { competition, limit = '20' } = getQuery(event)
  const limitNum = Math.min(50, Math.max(1, Number(limit)))

  let query = client
    .from('matches')
    .select('*')
    .eq('status', 'scheduled')
    .gte('kickoff_at', new Date().toISOString())
    .order('kickoff_at', { ascending: true })
    .limit(limitNum)

  if (competition) {
    query = query.eq('competition', String(competition))
  }

  const { data, error } = await query

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { data }
})
