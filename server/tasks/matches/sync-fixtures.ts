export default defineTask({
  meta: {
    name: 'matches:sync-fixtures',
    description: 'Sync match fixtures from API-Football for all competitions',
  },
  async run() {
    const supabase = useSupabaseAdmin()
    const results: Record<string, string> = {}

    for (const comp of COMPETITIONS) {
      try {
        const fixtures = await fetchFixtures(comp.apiFootballId, CURRENT_SEASON)

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
        results[comp.id] = `error: ${err instanceof Error ? err.message : String(err)}`
      }
    }

    return { result: JSON.stringify(results) }
  },
})
