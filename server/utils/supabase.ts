import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _adminClient: SupabaseClient | null = null

/**
 * Supabase client with service role key — bypasses RLS.
 * Use this in Nitro tasks (which have no H3 event).
 * For API routes, prefer @nuxtjs/supabase's serverSupabaseServiceRole(event).
 */
export function useSupabaseAdmin(): SupabaseClient {
  if (!_adminClient) {
    const url = process.env.SUPABASE_URL
    const serviceKey = useRuntimeConfig().supabaseServiceRoleKey
    if (!url || !serviceKey) {
      throw new Error('Missing SUPABASE_URL or NUXT_SUPABASE_SERVICE_ROLE_KEY environment variables')
    }
    _adminClient = createClient(url, serviceKey)
  }
  return _adminClient
}
