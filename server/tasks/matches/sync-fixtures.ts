export default defineTask({
  meta: {
    name: 'matches:sync-fixtures',
    description: 'Sync match fixtures from API-Football for all competitions (with fallback to football-data.org)',
  },
  async run() {
    const supabase = useSupabaseAdmin()
    const results: Record<string, string> = {}

    for (const comp of COMPETITIONS) {
      try {
        let fixtures: ApiFootballFixtureEntry[]

        if (canCallApi('api-football')) {
          try {
            fixtures = await withRetry(() => fetchFixtures(comp.apiFootballId, CURRENT_SEASON))
            recordApiCall('api-football')
            console.info(`[sync-fixtures] API-Football success for ${comp.id}`)
          } catch (primaryErr) {
            console.warn(`[sync-fixtures] API-Football failed for ${comp.id}, trying football-data.org`, primaryErr)
            fixtures = await withRetry(() => fdFetchFixtures(comp.apiFootballId, CURRENT_SEASON))
            console.info(`[sync-fixtures] football-data.org fallback success for ${comp.id}`)
          }
        } else {
          console.warn(`[sync-fixtures] API-Football rate limit reached, using football-data.org for ${comp.id}`)
          fixtures = await withRetry(() => fdFetchFixtures(comp.apiFootballId, CURRENT_SEASON))
        }

        const rows = fixtures.map((f) => ({
          external_id: f.fixture.id,
          competition: comp.id,
          season: f.league.season,
          round: f.league.round,
          status: mapFixtureStatus(f.fixture.status.short),
          home_team_id: f.teams.home.id,
          away_team_id: f.teams.away.id,
          home_score: f.goals.home,
          away_score: f.goals.away,
          home_score_ht: f.score.halftime.home,
          away_score_ht: f.score.halftime.away,
          kickoff_at: f.fixture.date,
          venue: f.fixture.venue?.name ?? null,
          referee: f.fixture.referee,
          elapsed_minutes: f.fixture.status.elapsed,
          raw_data: f,
          updated_at: new Date().toISOString(),
        }))

        const { error } = await supabase.from('matches').upsert(rows, { onConflict: 'external_id' })
        if (error) throw new Error(error.message)

        results[comp.id] = `${rows.length} fixtures synced`
      } catch (err) {
        console.error(`[sync-fixtures] Failed for ${comp.id}:`, err)
        results[comp.id] = `error: ${err instanceof Error ? err.message : String(err)}`
      }
    }

    return { result: JSON.stringify(results) }
  },
})
