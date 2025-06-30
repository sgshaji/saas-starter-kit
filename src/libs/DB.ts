import path from 'node:path';

import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import { drizzle as drizzlePglite, type PgliteDatabase } from 'drizzle-orm/pglite';
import { migrate as migratePglite } from 'drizzle-orm/pglite/migrator';
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';
import { Pool } from 'pg';

import * as schema from '@/models/Schema';

import { Env } from './Env';

// pool stored in globalAny when needed
let drizzle;

if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD && Env.DATABASE_URL) {
  // Re-use the Pool across hot-reloads in dev
  const globalAny = globalThis as unknown as { pool?: Pool; drizzle?: ReturnType<typeof drizzlePg> };

  if (!globalAny.pool) {
    globalAny.pool = new Pool({ connectionString: Env.DATABASE_URL });
    globalAny.drizzle = drizzlePg(globalAny.pool, { schema });

    if (process.env.DRIZZLE_RUN_MIGRATIONS === 'true') {
      await migratePg(globalAny.drizzle, {
        migrationsFolder: path.join(process.cwd(), 'migrations'),
      });
    }
  }

  drizzle = globalAny.drizzle;
} else {
  // Stores the db connection in the global scope to prevent multiple instances due to hot reloading with Next.js
  const global = globalThis as unknown as { client: PGlite; drizzle: PgliteDatabase<typeof schema> };

  if (!global.client) {
    global.client = new PGlite();
    await global.client.waitReady;

    global.drizzle = drizzlePglite(global.client, { schema });
  }

  drizzle = global.drizzle;
  if (process.env.DRIZZLE_RUN_MIGRATIONS === 'true') {
    await migratePglite(global.drizzle, {
      migrationsFolder: path.join(process.cwd(), 'migrations'),
    });
  }
}

export const db = drizzle;
