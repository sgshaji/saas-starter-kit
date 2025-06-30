import type { NextRequest, NextResponse } from 'next/server';

export function withSecureHeaders(_req: NextRequest, res: NextResponse) {
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'no-referrer');
  res.headers.set('Content-Security-Policy', 'default-src \'self\'');
  return res;
}
