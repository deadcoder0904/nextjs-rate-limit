import { NextResponse } from 'next/server'
import { consola } from 'consola'
import { publicIp } from 'public-ip'
import { RateLimiterRedis, RateLimiterRes } from 'rate-limiter-flexible'

import { getRateLimitHeaders, redis } from '@/app/lib/redis/client'

const downloadLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 5, // Number of requests
  duration: 30, // Per 30 seconds
})

export async function POST(request: Request) {
  consola.info('🏁 POST /api/download/route')

  const { fingerprint } = await request.json()
  const ip = await publicIp()
  const userKey = `${fingerprint}:${ip}`

  let downloadLimitResponse: RateLimiterRes

  try {
    downloadLimitResponse = await downloadLimiter.consume(userKey)
  } catch (downloadLimiterResponse: any) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      {
        status: 429,
        headers: getRateLimitHeaders(
          downloadLimiterResponse,
          downloadLimiter.points
        ),
      }
    )
  }
  try {
    const data = 'abba dabba jabba'

    return new Response(data, {
      headers: { 'content-type': 'application/text' },
    })
  } catch (error) {
    consola.error('Error downloading file')
    return NextResponse.json(error, { status: 400 })
  }
}
