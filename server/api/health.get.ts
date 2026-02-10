import { getDailyUsage, type ApiProvider } from '../utils/rate-limiter'

interface ProviderHealth {
  remaining: number
  limit: number
  healthy: boolean
}

interface HealthResponse {
  status: 'ok' | 'degraded' | 'error'
  timestamp: string
  uptime: number
  supabase: { connected: boolean; error: string | null }
  apiFootball: ProviderHealth
  gnews: ProviderHealth
}

function getProviderHealth(provider: ApiProvider): ProviderHealth {
  const usage = getDailyUsage(provider)
  return {
    remaining: usage.remaining,
    limit: usage.limit,
    healthy: usage.remaining > 0,
  }
}

export default defineEventHandler(async (): Promise<HealthResponse> => {
  // Check Supabase connectivity
  let supabaseConnected = false
  let supabaseError: string | null = null

  try {
    const supabase = useSupabaseAdmin()
    const { error } = await supabase.from('teams').select('external_id').limit(1)
    if (error) {
      supabaseError = error.message
    } else {
      supabaseConnected = true
    }
  } catch (err) {
    supabaseError = err instanceof Error ? err.message : String(err)
  }

  const apiFootball = getProviderHealth('api-football')
  const gnews = getProviderHealth('gnews')

  // Determine overall status
  let status: 'ok' | 'degraded' | 'error' = 'ok'
  if (!supabaseConnected) {
    status = 'error'
  } else if (!apiFootball.healthy || !gnews.healthy) {
    status = 'degraded'
  }

  return {
    status,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    supabase: { connected: supabaseConnected, error: supabaseError },
    apiFootball,
    gnews,
  }
})
