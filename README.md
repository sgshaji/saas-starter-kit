# Starter Kit for SaaS Projects

Production-ready SaaS boilerplate built with Next.js, Tailwind CSS, Drizzle ORM, and Clerk authentication.

This starter kit is built to help us launch new SaaS apps quickly with features like:

- Authentication (passwordless, MFA, social login via Clerk)
- Team and multi-tenant support
- Stripe integration for billing
- Drizzle ORM (Postgres)
- Shadcn UI components
- Role-based access control
- i18n-ready with next-intl
- Developer-first DX (Vitest, Playwright, Prettier, ESLint)
- CI/CD ready (GitHub Actions)

## Tech Stack

- **Frontend**: Next.js 14 App Router, Tailwind, Shadcn UI
- **Backend**: TypeScript, Drizzle ORM
- **Auth**: Clerk
- **Database**: Postgres (or Supabase/Neon)
- **Payments**: Stripe
- **Testing**: Vitest + Playwright
- **Monitoring**: Sentry + Better Stack
- **Localization**: Crowdin + next-intl

## Quick Start

```bash
git clone https://github.com/sgshaji/starter-kit-saas.git
cd starter-kit-saas
cp .env .env.local
npm install
npm run dev
```

## License

MIT License © 2025 Shaji Sivaraman
