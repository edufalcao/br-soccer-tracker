export default defineTask({
  meta: {
    name: 'teams:sync',
    description: 'Sync teams from API-Football for all competitions (with fallback to football-data.org)',
  },
  async run() {
    const supabase = useSupabaseAdmin()
    const results: Record<string, string> = {}

    for (const comp of COMPETITIONS) {
      try {
        let apiTeams: ApiFootballTeamEntry[]

        if (canCallApi('api-football')) {
          try {
            apiTeams = await withRetry(() => fetchTeams(comp.apiFootballId, CURRENT_SEASON))
            recordApiCall('api-football')
            console.info(`[teams:sync] API-Football success for ${comp.id}`)
          } catch (primaryErr) {
            console.warn(`[teams:sync] API-Football failed for ${comp.id}, trying football-data.org`, primaryErr)
            apiTeams = await withRetry(() => fdFetchTeams(comp.apiFootballId, CURRENT_SEASON))
            console.info(`[teams:sync] football-data.org fallback success for ${comp.id}`)
          }
        } else {
          console.warn(`[teams:sync] API-Football rate limit reached, using football-data.org for ${comp.id}`)
          apiTeams = await withRetry(() => fdFetchTeams(comp.apiFootballId, CURRENT_SEASON))
        }

        const rows = apiTeams.map((entry) => ({
          external_id: entry.team.id,
          name: entry.team.name,
          short_name: entry.team.code || entry.team.name.substring(0, 3).toUpperCase(),
          badge_url: entry.team.logo,
          competition: comp.id,
          city: entry.venue?.city ?? null,
          updated_at: new Date().toISOString(),
        }))

        const { error } = await supabase.from('teams').upsert(rows, { onConflict: 'external_id' })
        if (error) throw new Error(error.message)

        results[comp.id] = `${rows.length} teams synced`
      } catch (err) {
        console.error(`[teams:sync] Failed for ${comp.id}:`, err)
        results[comp.id] = `error: ${err instanceof Error ? err.message : String(err)}`
      }
    }

    return { result: JSON.stringify(results) }
  },
})
