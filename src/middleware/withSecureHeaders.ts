import type { NextRequest, NextResponse } from 'next/server';

export function withSecureHeaders(_req: NextRequest, res: NextResponse) {
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'no-referrer');

  if (process.env.NODE_ENV !== 'production') {
    res.headers.set('Content-Security-Policy', 'default-src \'self\' \'unsafe-inline\' \'unsafe-eval\' data: blob: https:');
    return res;
  }

  res.headers.set(
    'Content-Security-Policy',
    [
      'default-src \'self\'',
      'script-src \'self\' \'unsafe-eval\' \'unsafe-inline\' https://*.clerk.com https://*.clerk.dev https://*.clerk.accounts.dev',
      'frame-src https://*.clerk.com https://*.clerk.dev https://*.clerk.accounts.dev',
      'connect-src \'self\' https://*.clerk.com https://*.clerk.dev https://*.clerk.accounts.dev',
      'style-src \'self\' \'unsafe-inline\' https://*.clerk.com https://*.clerk.dev https://*.clerk.accounts.dev',
      'worker-src blob:',
    ].join('; '),
  );

  return res;
}
