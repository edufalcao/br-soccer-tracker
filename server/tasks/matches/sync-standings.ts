export default defineTask({
  meta: {
    name: 'matches:sync-standings',
    description: 'Sync league standings (with fallback to football-data.org)',
  },
  async run() {
    const supabase = useSupabaseAdmin()
    const results: Record<string, string> = {}

    for (const comp of COMPETITIONS) {
      try {
        let standings: ApiFootballStandingTeam[]

        if (canCallApi('api-football')) {
          try {
            standings = await withRetry(() => fetchStandings(comp.apiFootballId, CURRENT_SEASON))
            recordApiCall('api-football')
            console.info(`[sync-standings] API-Football success for ${comp.id}`)
          } catch (primaryErr) {
            console.warn(`[sync-standings] API-Football failed for ${comp.id}, trying football-data.org`, primaryErr)
            standings = await withRetry(() => fdFetchStandings(comp.apiFootballId, CURRENT_SEASON))
            console.info(`[sync-standings] football-data.org fallback success for ${comp.id}`)
          }
        } else {
          console.warn(`[sync-standings] API-Football rate limit reached, using football-data.org for ${comp.id}`)
          standings = await withRetry(() => fdFetchStandings(comp.apiFootballId, CURRENT_SEASON))
        }

        const rows = standings.map((entry) => ({
          competition: comp.id,
          season: CURRENT_SEASON,
          team_external_id: entry.team.id,
          position: entry.rank,
          played: entry.all.played,
          won: entry.all.win,
          drawn: entry.all.draw,
          lost: entry.all.lose,
          goals_for: entry.all.goals.for,
          goals_against: entry.all.goals.against,
          goal_difference: entry.goalsDiff,
          points: entry.points,
          form: entry.form,
          updated_at: new Date().toISOString(),
        }))

        const { error } = await supabase
          .from('standings')
          .upsert(rows, { onConflict: 'competition,season,team_external_id' })
        if (error) throw new Error(error.message)

        results[comp.id] = `${rows.length} entries synced`
      } catch (err) {
        console.error(`[sync-standings] Failed for ${comp.id}:`, err)
        results[comp.id] = `error: ${err instanceof Error ? err.message : String(err)}`
      }
    }

    return { result: JSON.stringify(results) }
  },
})
