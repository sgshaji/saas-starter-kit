import type { NextRequest } from 'next/server';
import { describe, expect, it, vi } from 'vitest';

import { withRateLimit } from './withRateLimit';

// Mock @upstash/redis client
vi.mock('@upstash/redis', () => {
  const counts = new Map<string, number>();
  return {
    Redis: {
      fromEnv: () => ({
        incr: vi.fn(async (key: string) => {
          const newVal = (counts.get(key) ?? 0) + 1;
          counts.set(key, newVal);
          return newVal;
        }),
        expire: vi.fn(),
      }),
    },
  };
});

// Helper to fabricate a NextRequest-like object
function createReq(ip: string): NextRequest {
  const headers = new Headers();
  return {
    ip,
    headers,
    nextUrl: { pathname: '/api/test' } as any,
  } as unknown as NextRequest;
}

describe('withRateLimit', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    vi.resetModules();

    process.env = {
      ...ORIGINAL_ENV,
      NODE_ENV: 'production',
      UPSTASH_REDIS_REST_URL: 'https://fake',
    };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('allows requests under the limit', async () => {
    const req = createReq('1.1.1.1');
    for (let i = 0; i < 5; i++) {
      const res = await withRateLimit(req, 10, 60);

      expect(res).toBeNull();
    }
  });

  it('blocks requests over the limit', async () => {
    const req = createReq('2.2.2.2');
    let res: any = null;
    for (let i = 0; i < 11; i++) {
      res = await withRateLimit(req, 10, 60);
    }

    expect(res?.status).toBe(429);
  });
});
