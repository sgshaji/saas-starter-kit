# 🛫 Onboarding Guide

Welcome to the **My-SaaS** codebase! Follow the steps below to run the app locally.

## 1. Clone & Install
```bash
git clone <repo-url>
cd my-saas
pnpm install # uses workspace-level lockfile
```

## 2. Prepare Environment
1. Copy the template:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in the required secrets (see [Environment variables](./ENV_VARS.md)).
   The bare minimum to start the app is Clerk keys:
   ```dotenv
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   ```

## 3. Database
**Option A – PGlite (default)**
Nothing to do — the in-memory DB is bootstrapped automatically.

**Option B – Postgres via Docker**
```bash
docker compose up -d postgres
pnpm db:migrate
```

## 4. Seed & Migrate
```bash
pnpm db:generate   # generates SQL from Drizzle schema
pnpm db:migrate    # runs migrations against the chosen DB
```

## 5. Run the App
```bash
pnpm dev            # starts Next.js + PGlite
```
Navigate to http://localhost:3000 and sign up. If `NEXT_PUBLIC_ENABLE_TEAMS=true`, you'll be redirected to the organisation selector.

## 6. Useful Extras
| Command | Purpose |
|---------|---------|
| `pnpm storybook` | Component explorer |
| `pnpm db:studio` | Visualise DB schema |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Playwright suites |
| `pnpm ci:lighthouse` | Accessibility & perf audit |

---

> 🎥  **Show me!** A 2-minute asciinema showcasing these steps lives in `docs/assets/onboarding.cast`. Feel free to record an updated version if the flow changes.
