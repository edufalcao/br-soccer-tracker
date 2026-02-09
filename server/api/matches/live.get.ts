import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { competition } = getQuery(event)

  let query = client.from('matches').select('*').eq('status', 'live').order('kickoff_at', { ascending: true })

  if (competition) {
    query = query.eq('competition', String(competition))
  }

  const { data, error } = await query

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { data }
})
