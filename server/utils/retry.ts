export interface RetryOptions {
  maxRetries?: number
  baseDelayMs?: number
  maxDelayMs?: number
  /** Custom predicate; defaults to retrying on network errors, 429, and 5xx */
  shouldRetry?: (error: unknown) => boolean
}

function isTransientError(error: unknown): boolean {
  if (!(error instanceof Error)) return true

  // ofetch / $fetch attaches statusCode or status
  const statusCode =
    (error as unknown as Record<string, unknown>).statusCode ?? (error as unknown as Record<string, unknown>).status

  if (typeof statusCode === 'number') {
    // Retry on 429 (rate limit) and 5xx (server errors)
    if (statusCode === 429 || statusCode >= 500) return true
    // Don't retry on other 4xx client errors
    if (statusCode >= 400 && statusCode < 500) return false
  }

  // Network errors (no status code) — retry
  return true
}

export async function withRetry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { maxRetries = 3, baseDelayMs = 1000, maxDelayMs = 10000, shouldRetry = isTransientError } = options

  let lastError: unknown

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      if (attempt >= maxRetries || !shouldRetry(error)) {
        throw error
      }

      // Exponential backoff with jitter
      const exponentialDelay = baseDelayMs * Math.pow(2, attempt)
      const jitter = Math.random() * baseDelayMs
      const delay = Math.min(exponentialDelay + jitter, maxDelayMs)

      console.warn(
        `[retry] Attempt ${attempt + 1}/${maxRetries} failed, retrying in ${Math.round(delay)}ms`,
        error instanceof Error ? error.message : String(error),
      )

      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError
}
