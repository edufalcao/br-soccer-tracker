export default defineTask({
  meta: {
    name: 'teams:sync',
    description: 'Sync teams from API-Football for all competitions',
  },
  async run() {
    const supabase = useSupabaseAdmin()
    const results: Record<string, string> = {}

    for (const comp of COMPETITIONS) {
      try {
        const apiTeams = await fetchTeams(comp.apiFootballId, CURRENT_SEASON)

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
        results[comp.id] = `error: ${err instanceof Error ? err.message : String(err)}`
      }
    }

    return { result: results }
  },
})
