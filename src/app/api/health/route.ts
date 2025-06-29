import { NextResponse } from 'next/server';
import { z } from 'zod';

export const HealthResponseSchema = z.object({
  ok: z.literal(true),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

export function GET(_req: Request) {
  return NextResponse.json<HealthResponse>({ ok: true });
}
