const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 3600 * 1000 // 1 hour in milliseconds

export function getCachedData(key: string) {
  const item = cache.get(key)
  if (!item) return null
  
  if (Date.now() - item.timestamp > CACHE_TTL) {
    cache.delete(key)
    return null
  }
  
  return item.data
}

export function setCachedData(key: string, data: any) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
} 