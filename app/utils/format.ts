export function formatDate(dateStr: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export function formatTime(dateStr: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr))
}

export function formatRelativeDate(
  dateStr: string,
  locale: string,
  translations: { today: string; yesterday: string; tomorrow: string },
): string {
  const date = new Date(dateStr)
  const now = new Date()

  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffDays = Math.round((dateOnly.getTime() - nowOnly.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return translations.today
  if (diffDays === -1) return translations.yesterday
  if (diffDays === 1) return translations.tomorrow

  return formatDate(dateStr, locale)
}
