import Redis from 'ioredis'
import { RateLimiterRes } from 'rate-limiter-flexible'

import { env } from '@/app/lib/env'

export const redis = new Redis(env.REDIS_URL)

export function getRateLimitHeaders(rateLimit: RateLimiterRes, points: number) {
  return {
    'Retry-After': String(rateLimit.msBeforeNext / 1000),
    'X-RateLimit-Limit': String(points),
    'X-RateLimit-Remaining': String(rateLimit.remainingPoints),
    'X-RateLimit-Reset': String(Date.now() + rateLimit.msBeforeNext),
  }
}
