export default defineTask({
  meta: {
    name: 'matches:sync-live',
    description: 'Sync live match scores from API-Football (only when matches are potentially in progress)',
  },
  async run() {
    const supabase = useSupabaseAdmin()

    // Only call the API if matches might be live right now
    const now = new Date()
    const windowStart = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString()
    const windowEnd = new Date(now.getTime() + 30 * 60 * 1000).toISOString()

    const { data: potentiallyLive } = await supabase
      .from('matches')
      .select('competition')
      .gte('kickoff_at', windowStart)
      .lte('kickoff_at', windowEnd)
      .neq('status', 'finished')
      .neq('status', 'postponed')
      .neq('status', 'cancelled')

    if (!potentiallyLive?.length) {
      return { result: 'No matches in live window — skipped API calls' }
    }

    const activeCompetitions = [...new Set(potentiallyLive.map((m) => m.competition))]
    const results: Record<string, string> = {}

    for (const compId of activeCompetitions) {
      const comp = getCompetitionById(compId as Competition)
      if (!comp) continue

      try {
        const liveFixtures = await fetchLiveFixtures(comp.apiFootballId)

        if (!liveFixtures.length) {
          results[comp.id] = 'no live matches found'
          continue
        }

        const rows = liveFixtures.map((f) => ({
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

        results[comp.id] = `${rows.length} live matches updated`
      } catch (err) {
        results[comp.id] = `error: ${err instanceof Error ? err.message : String(err)}`
      }
    }

    return { result: JSON.stringify(results) }
  },
})
