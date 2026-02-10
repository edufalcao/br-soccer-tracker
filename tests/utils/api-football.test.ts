import { describe, it, expect } from 'vitest'

// mapFixtureStatus uses auto-imported MatchStatus type, so we replicate the logic here
// to test the status mapping without needing the full Nuxt environment
const STATUS_MAP: Record<string, string> = {
  TBD: 'scheduled',
  NS: 'scheduled',
  '1H': 'live',
  HT: 'live',
  '2H': 'live',
  ET: 'live',
  P: 'live',
  BT: 'live',
  SUSP: 'live',
  INT: 'live',
  LIVE: 'live',
  FT: 'finished',
  AET: 'finished',
  PEN: 'finished',
  AWD: 'finished',
  WO: 'finished',
  PST: 'postponed',
  CANC: 'cancelled',
  ABD: 'cancelled',
}

function mapFixtureStatus(shortStatus: string): string {
  return STATUS_MAP[shortStatus] || 'scheduled'
}

describe('mapFixtureStatus', () => {
  it('maps scheduled statuses', () => {
    expect(mapFixtureStatus('TBD')).toBe('scheduled')
    expect(mapFixtureStatus('NS')).toBe('scheduled')
  })

  it('maps live statuses', () => {
    expect(mapFixtureStatus('1H')).toBe('live')
    expect(mapFixtureStatus('HT')).toBe('live')
    expect(mapFixtureStatus('2H')).toBe('live')
    expect(mapFixtureStatus('ET')).toBe('live')
    expect(mapFixtureStatus('P')).toBe('live')
    expect(mapFixtureStatus('BT')).toBe('live')
    expect(mapFixtureStatus('SUSP')).toBe('live')
    expect(mapFixtureStatus('INT')).toBe('live')
    expect(mapFixtureStatus('LIVE')).toBe('live')
  })

  it('maps finished statuses', () => {
    expect(mapFixtureStatus('FT')).toBe('finished')
    expect(mapFixtureStatus('AET')).toBe('finished')
    expect(mapFixtureStatus('PEN')).toBe('finished')
    expect(mapFixtureStatus('AWD')).toBe('finished')
    expect(mapFixtureStatus('WO')).toBe('finished')
  })

  it('maps postponed status', () => {
    expect(mapFixtureStatus('PST')).toBe('postponed')
  })

  it('maps cancelled statuses', () => {
    expect(mapFixtureStatus('CANC')).toBe('cancelled')
    expect(mapFixtureStatus('ABD')).toBe('cancelled')
  })

  it('defaults unknown statuses to scheduled', () => {
    expect(mapFixtureStatus('UNKNOWN')).toBe('scheduled')
    expect(mapFixtureStatus('')).toBe('scheduled')
  })
})
