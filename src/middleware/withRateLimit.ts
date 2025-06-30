import { Redis } from '@upstash/redis';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// TODO(plan-limits): When subscription tiers are enforced, derive `limit`
// from the caller's plan instead of hard-coding it. See
// `src/lib/plan-limits.ts#getRateLimitForPlan` for the stub helper.

const redis = Redis.fromEnv();

export async function withRateLimit(request: NextRequest, limit = 20, windowSec = 60): Promise<NextResponse | null> {
  if (process.env.NODE_ENV !== 'production' || !process.env.UPSTASH_REDIS_REST_URL) {
    return null;
  }

  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown';
  const key = `ratelimit:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, windowSec);
  }
  if (count > limit) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  return null;
}
