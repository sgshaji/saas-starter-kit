import { redis } from '@/libs/Redis';

export async function GET() {
  try {
    await redis.ping();
    return Response.json({ redis: 'ok' });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ redis: 'error', err: err?.message ?? 'unknown' }),
      { status: 500 },
    );
  }
}
