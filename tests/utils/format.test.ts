import { describe, it, expect } from 'vitest'
import { formatDate, formatTime, formatRelativeDate } from '~/utils/format'

describe('formatDate', () => {
  it('formats date for pt-BR locale', () => {
    const result = formatDate('2026-06-15T20:00:00Z', 'pt-BR')
    expect(result).toContain('jun')
    expect(result).toContain('2026')
  })

  it('formats date for en locale', () => {
    const result = formatDate('2026-06-15T20:00:00Z', 'en')
    expect(result).toContain('Jun')
    expect(result).toContain('2026')
  })
})

describe('formatTime', () => {
  it('returns a time string with hours and minutes', () => {
    const result = formatTime('2026-06-15T20:30:00Z', 'pt-BR')
    expect(result).toMatch(/\d{2}:\d{2}/)
  })
})

describe('formatRelativeDate', () => {
  const translations = { today: 'Hoje', yesterday: 'Ontem', tomorrow: 'Amanhã' }

  it('returns "today" for current date', () => {
    const now = new Date().toISOString()
    expect(formatRelativeDate(now, 'pt-BR', translations)).toBe('Hoje')
  })

  it('returns "yesterday" for previous day', () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString()
    expect(formatRelativeDate(yesterday, 'pt-BR', translations)).toBe('Ontem')
  })

  it('returns "tomorrow" for next day', () => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString()
    expect(formatRelativeDate(tomorrow, 'pt-BR', translations)).toBe('Amanhã')
  })

  it('returns formatted date for other days', () => {
    const farDate = '2025-01-01T12:00:00Z'
    const result = formatRelativeDate(farDate, 'pt-BR', translations)
    expect(result).not.toBe('Hoje')
    expect(result).not.toBe('Ontem')
    expect(result).not.toBe('Amanhã')
  })
})
