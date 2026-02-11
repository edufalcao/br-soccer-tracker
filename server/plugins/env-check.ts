export default defineNitroPlugin(() => {
  const required: Array<{ key: string; env: string }> = [
    { key: 'SUPABASE_URL', env: 'SUPABASE_URL' },
    { key: 'SUPABASE_KEY', env: 'SUPABASE_KEY' },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', env: 'NUXT_SUPABASE_SERVICE_ROLE_KEY' },
  ]

  const optional: Array<{ key: string; env: string }> = [
    { key: 'FOOTBALL_API_KEY', env: 'NUXT_FOOTBALL_API_KEY' },
    { key: 'GNEWS_API_KEY', env: 'NUXT_GNEWS_API_KEY' },
  ]

  const missing = required.filter((v) => !process.env[v.env])

  if (missing.length > 0) {
    console.error(`[env-check] ❌ Missing required environment variables: ${missing.map((v) => v.env).join(', ')}`)
    console.error('[env-check] The application may not function correctly.')
  }

  const missingOptional = optional.filter((v) => !process.env[v.env])
  if (missingOptional.length > 0) {
    console.warn(
      `[env-check] ⚠️ Missing optional environment variables: ${missingOptional.map((v) => v.env).join(', ')}`,
    )
    console.warn('[env-check] Some features (API sync, news fetch) will be unavailable.')
  }

  if (missing.length === 0 && missingOptional.length === 0) {
    console.log('[env-check] ✅ All environment variables are configured.')
  }
})
