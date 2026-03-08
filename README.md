# 🚀 Starter Kit for SaaS Projects

A production-ready SaaS boilerplate built with modern tools like **Next.js**, **Tailwind CSS**, **Drizzle ORM**, and **Clerk authentication** — designed to help us launch SaaS applications faster and with confidence.

---

## ✨ Features

- 🔐 **Authentication** – Passwordless login, MFA, social login via Clerk
- 🧑‍🤝‍🧑 **Multi-tenancy** – Team and organization support with role-based access
- 💸 **Stripe Integration** – Subscription-ready billing setup
- 🧱 **Drizzle ORM** – Type-safe database access for Postgres
- 🎨 **Shadcn UI** – Beautiful, accessible components out of the box
- 🌐 **i18n-ready** – Internationalization via `next-intl` and Crowdin
- 🧪 **Testing Tools** – Vitest + Playwright for unit and E2E coverage
- 🛠 **DX Toolkit** – ESLint, Prettier, GitHub Actions, Commitlint
- 📊 **Monitoring & Logging** – Sentry, Better Stack, and Pino

---

## 🧠 Tech Stack

| Layer       | Tools |
|-------------|-------|
| **Frontend** | Next.js 14 (App Router), Tailwind CSS, Shadcn UI |
| **Backend**  | TypeScript, Drizzle ORM |
| **Auth**     | Clerk (Passwordless, MFA, Social OAuth) |
| **Database** | PostgreSQL (or Supabase / Neon compatible) |
| **Payments** | Stripe (with webhook handling) |
| **Testing**  | Vitest, React Testing Library, Playwright |
| **Monitoring** | Sentry, Better Stack Logs |
| **Localization** | Crowdin, next-intl |

---

## 🛠️ Prerequisites

| Tool | Version |
|------|---------|
| Node | >= 18.17 |
| PNPM | >= 8.0 |
| Docker (optional for Postgres) | >= 24 |

> ⚠️  Your local versions are validated by [volta](https://volta.sh) & `engines` field – installation will fail early when they don't match.

## 🔑 Environment Variables

Environment variables are declared & validated in [`src/libs/Env.ts`](./src/libs/Env.ts). Run:

```bash
pnpm docs:env
```

to generate/update the markdown table at `docs/ENV_VARS.md`.

> 🔒 **Security:** Never commit real secrets to the repository.
> Use `.env.production.local` or `.env.local` for secrets on your local machine — these files are git-ignored.
> For deployments, set secret environment variables through your hosting platform's environment variable settings (e.g., Vercel, Railway, Fly.io).
> Use `.env.production.example` as a reference template for required variables.

## 🔄 Useful Commands

| Command | Description |
|---------|-------------|
| `pnpm db:studio` | Open Drizzle Studio UI connected to your local DB |
| `pnpm storybook` | Run Storybook on <http://localhost:6006> |
| `pnpm ci:lighthouse` | Run Lighthouse CI against a local production build |

---

## ⚡️ Quick Start

```bash
git clone https://github.com/sgshaji/starter-kit-saas.git
cd starter-kit-saas
cp .env .env.local
npm install
npm run dev

---
