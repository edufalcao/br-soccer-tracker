export interface CompetitionMeta {
  id: Competition
  apiFootballId: number
  nameKey: string
}

export const COMPETITIONS: CompetitionMeta[] = [
  { id: 'serie_a', apiFootballId: 71, nameKey: 'competitions.serie_a' },
  { id: 'serie_b', apiFootballId: 72, nameKey: 'competitions.serie_b' },
  { id: 'copa_do_brasil', apiFootballId: 73, nameKey: 'competitions.copa_do_brasil' },
]

export const CURRENT_SEASON = 2026

export function getCompetitionByApiId(apiId: number): CompetitionMeta | undefined {
  return COMPETITIONS.find((c) => c.apiFootballId === apiId)
}

export function getCompetitionById(id: Competition): CompetitionMeta | undefined {
  return COMPETITIONS.find((c) => c.id === id)
}
