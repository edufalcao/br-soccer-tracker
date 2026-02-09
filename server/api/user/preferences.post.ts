import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody(event)

  const updates: Record<string, unknown> = {
    user_id: user.id,
    updated_at: new Date().toISOString(),
  }

  if (body.language !== undefined) {
    if (!['pt-BR', 'en'].includes(body.language)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid language' })
    }
    updates.language = body.language
  }

  if (body.favoriteTeamIds !== undefined) {
    if (!Array.isArray(body.favoriteTeamIds) || !body.favoriteTeamIds.every((id: unknown) => typeof id === 'number')) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid favoriteTeamIds' })
    }
    updates.favorite_team_ids = body.favoriteTeamIds
  }

  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('user_preferences')
    .upsert(updates as never, { onConflict: 'user_id' })
    .select()
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { data }
})
