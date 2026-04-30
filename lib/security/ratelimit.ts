import { NextRequest } from 'next/server'

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

type RateLimitResult =
  | { limited: false }
  | { limited: true; retryAfter: number | null }

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[ratelimit] UPSTASH_REDIS_REST_URL / TOKEN not set — skipping rate limit')
    }
    return { limited: false }
  }

  const { Ratelimit } = await import('@upstash/ratelimit')
  const { Redis } = await import('@upstash/redis')

  const redis = new Redis({ url, token })
  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    prefix: 'ratelimit:contact',
  })

  const { success, reset } = await limiter.limit(ip)

  if (success) return { limited: false }

  const retryAfter = reset ? Math.ceil((reset - Date.now()) / 1000) : null
  return { limited: true, retryAfter }
}
