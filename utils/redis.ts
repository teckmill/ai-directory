import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
})

export async function getCachedData(key: string) {
  return redis.get(key)
}

export async function setCachedData(key: string, data: any, expireInSeconds = 3600) {
  await redis.set(key, data, { ex: expireInSeconds })
} 