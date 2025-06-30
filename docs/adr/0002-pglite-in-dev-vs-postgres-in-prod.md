# 0002 – PGlite in Development, Postgres in Production

*Status*: Accepted 2024-09-15

## Context
Running Postgres locally requires Docker & increases onboarding friction. The edge-native [`@electric-sql/pglite`](https://github.com/electric-sql/pglite) offers an in-memory Postgres wire-compatible database.

## Decision
• Use **PGlite** when `process.env.DATABASE_URL` is undefined.
• Use **Postgres** (`pg` driver) everywhere else.

This conditional lives in `src/libs/DB.ts` lines 15-35.

## Consequences
+ **Pros**
  1. `pnpm dev` works out-of-the-box – no Docker.
  2. CI jobs run faster; no service containers.
+ **Cons**
  1. Behavioural drift (SQL extensions, performance) between dev & prod.
  2. Cannot test connection-pool issues locally.

Mitigation: e2e & staging pipelines always test against real Postgres.
