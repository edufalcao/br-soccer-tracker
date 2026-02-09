function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase())
}

export function snakeToCamel<T>(obj: Record<string, unknown>): T {
  if (obj === null || typeof obj !== 'object') return obj as T
  if (Array.isArray(obj)) return obj.map((item) => snakeToCamel<unknown>(item as Record<string, unknown>)) as T

  const result: Record<string, unknown> = {}
  for (const key in obj) {
    const value = obj[key]
    const camelKey = toCamelCase(key)
    if (Array.isArray(value)) {
      result[camelKey] = value.map((item) =>
        typeof item === 'object' && item !== null ? snakeToCamel<unknown>(item as Record<string, unknown>) : item,
      )
    } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
      result[camelKey] = snakeToCamel<unknown>(value as Record<string, unknown>)
    } else {
      result[camelKey] = value
    }
  }
  return result as T
}

export function snakeToCamelArray<T>(arr: Record<string, unknown>[]): T[] {
  return arr.map((item) => snakeToCamel<T>(item))
}
