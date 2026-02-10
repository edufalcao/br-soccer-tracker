export type ApiProvider = 'api-football' | 'gnews'

interface ProviderConfig {
  dailyLimit: number
}

const PROVIDER_CONFIGS: Record<ApiProvider, ProviderConfig> = {
  'api-football': { dailyLimit: 100 },
  gnews: { dailyLimit: 100 },
}

const WARNING_THRESHOLDS = [0.8, 0.9, 1.0]

// In-memory daily call counts keyed by "provider:YYYY-MM-DD"
const callCounts = new Map<string, number>()
const warnedThresholds = new Set<string>()

function getUtcDateKey(): string {
  return new Date().toISOString().slice(0, 10)
}

function getMapKey(provider: ApiProvider): string {
  return `${provider}:${getUtcDateKey()}`
}

export function getRemainingCalls(provider: ApiProvider): number {
  const config = PROVIDER_CONFIGS[provider]
  const used = callCounts.get(getMapKey(provider)) ?? 0
  return Math.max(0, config.dailyLimit - used)
}

export function canCallApi(provider: ApiProvider): boolean {
  return getRemainingCalls(provider) > 0
}

export function recordApiCall(provider: ApiProvider): void {
  const key = getMapKey(provider)
  const current = callCounts.get(key) ?? 0
  const next = current + 1
  callCounts.set(key, next)

  // Clean stale entries from previous days
  const todayPrefix = getUtcDateKey()
  for (const mapKey of callCounts.keys()) {
    if (!mapKey.endsWith(todayPrefix)) {
      callCounts.delete(mapKey)
    }
  }

  // Check warning thresholds
  const config = PROVIDER_CONFIGS[provider]
  const ratio = next / config.dailyLimit

  for (const threshold of WARNING_THRESHOLDS) {
    const warnKey = `${provider}:${todayPrefix}:${threshold}`
    if (ratio >= threshold && !warnedThresholds.has(warnKey)) {
      warnedThresholds.add(warnKey)
      const pct = Math.round(threshold * 100)
      if (threshold >= 1.0) {
        console.error(`[rate-limiter] ${provider}: daily limit REACHED (${next}/${config.dailyLimit})`)
      } else {
        console.warn(`[rate-limiter] ${provider}: ${pct}% of daily limit used (${next}/${config.dailyLimit})`)
      }
    }
  }
}

export function getDailyUsage(provider: ApiProvider): { used: number; limit: number; remaining: number } {
  const config = PROVIDER_CONFIGS[provider]
  const used = callCounts.get(getMapKey(provider)) ?? 0
  return { used, limit: config.dailyLimit, remaining: Math.max(0, config.dailyLimit - used) }
}

/** Reset counts — mainly for testing */
export function _resetForTesting(): void {
  callCounts.clear()
  warnedThresholds.clear()
}
