import { NextResponse } from 'next/server';

import type { HealthResponse } from './schema';

export function GET(_req: Request) {
  return NextResponse.json<HealthResponse>({ ok: true });
}
