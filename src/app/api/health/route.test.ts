import { describe, expect, it } from 'vitest';

import { GET, HealthResponseSchema } from './route';

// NOTE: Next.js route handlers are just functions; we can invoke directly.

describe('GET /api/health', () => {
  it('returns a valid HealthResponse', async () => {
    // Construct a dummy Request as expected by the handler
    const res = await GET(new Request('http://localhost/api/health'));
    const json = await res.json();

    expect(() => HealthResponseSchema.parse(json)).not.toThrow();
  });
});
