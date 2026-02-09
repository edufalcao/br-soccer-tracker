import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const client = await serverSupabaseClient(event)
  const { data, error } = await client.from('user_preferences').select('*').eq('user_id', user.id).single()

  if (error && error.code !== 'PGRST116') {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { data }
})
