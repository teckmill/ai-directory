import { NextApiRequest, NextApiResponse } from 'next'

const REQUESTS = new Map<string, { count: number; timestamp: number }>()
const WINDOW = 60 * 1000 // 1 minute in milliseconds
const LIMIT = 10 // requests per minute

export async function rateLimit(req: NextApiRequest) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const key = `${ip}`
  const now = Date.now()
  
  const current = REQUESTS.get(key)
  if (!current || now - current.timestamp > WINDOW) {
    REQUESTS.set(key, { count: 1, timestamp: now })
    return true
  }
  
  if (current.count >= LIMIT) {
    throw new Error('Rate limit exceeded')
  }
  
  REQUESTS.set(key, {
    count: current.count + 1,
    timestamp: current.timestamp
  })
  
  return true
} 