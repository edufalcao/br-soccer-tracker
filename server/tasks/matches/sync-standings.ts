export default defineTask({
  meta: {
    name: 'matches:sync-standings',
    description: 'Sync league standings from API-Football for all competitions',
  },
  async run() {
    const supabase = useSupabaseAdmin()
    const results: Record<string, string> = {}

    for (const comp of COMPETITIONS) {
      try {
        const standings = await fetchStandings(comp.apiFootballId, CURRENT_SEASON)

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
        results[comp.id] = `error: ${err instanceof Error ? err.message : String(err)}`
      }
    }

    return { result: results }
  },
})
