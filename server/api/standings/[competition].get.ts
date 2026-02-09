import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const competition = getRouterParam(event, 'competition')

  if (!competition || !getCompetitionById(competition as Competition)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid competition' })
  }

  const { data, error } = await client
    .from('standings')
    .select('*')
    .eq('competition', competition)
    .eq('season', CURRENT_SEASON)
    .order('position', { ascending: true })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { data }
})
