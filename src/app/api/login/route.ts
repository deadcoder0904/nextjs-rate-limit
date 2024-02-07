import { NextRequest, NextResponse } from 'next/server'
import { consola } from 'consola'
import { publicIp } from 'public-ip'

import { RateLimiterRedis, RateLimiterRes } from 'rate-limiter-flexible'
import { getRateLimitHeaders, redis } from '@/app/lib/redis/client'

const loginLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 10, // Number of requests
  duration: 30, // Per 30 seconds
})

export async function POST(request: NextRequest, response: NextResponse) {
  consola.info('🏁 POST /api/login/route')

  const { email, fingerprint } = await request.json()
  const ip = await publicIp()
  const userKey = `${fingerprint}:${ip}`

  let loginLimitResponse: RateLimiterRes

  try {
    loginLimitResponse = await loginLimiter.consume(userKey)
  } catch (loginLimiterResponse: any) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      {
        status: 429,
        headers: getRateLimitHeaders(loginLimiterResponse, loginLimiter.points),
      }
    )
  }

  try {
    if (email !== 'admin@admin.com') {
      // getRateLimitHeaders(rateLimitRes, rateLimitRes?.remainingPoints)
      return NextResponse.json({ success: false }, { status: 200 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    consola.error('Error logging in')
    return NextResponse.json(error, { status: 400 })
  }
}
