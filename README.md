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

## ⚡️ Quick Start

```bash
git clone https://github.com/sgshaji/starter-kit-saas.git
cd starter-kit-saas
cp .env .env.local
npm install
npm run dev
