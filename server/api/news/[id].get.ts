import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing article ID' })
  }

  const { data, error } = await client.from('news_articles').select('*').eq('id', id).eq('is_active', true).single()

  if (error) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }

  return { data }
})
