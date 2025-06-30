# 🔐 Security Guide

This document describes the foundational security mechanisms that ship with the SaaS-Starter and how you can extend them for a production-grade deployment.

## 1. Audit Logging

The starter already includes an **audit-log scaffold**

* **Database table** — see `src/models/Schema.ts` ➜ `audit_log` table.
* **Helper** — `src/lib/audit.ts` exposes a `logAudit` function which inserts a record.
* **Example usage** — the Stripe webhook (`src/app/api/webhooks/stripe/route.ts`) logs the `invoice.paid` event.

### Extending the audit log

1. Call `logAudit({...})` whenever a _security-relevant_ action occurs (sign-in, permission change, billing update, etc.).
   Place the call as close as possible to the *domain* layer so that every execution path is covered.
2. Prefer **system UUIDs** or **Clerk user IDs** for `actorId`.  Fallback to `anonymous` for unauthenticated contexts.
3. Store structured `metadata` (serialised JSON) rather than opaque strings — it makes querying easier later.

### Shipping audit events externally

If you need long-term retention or centralised analysis you can stream the audit table into:

* A log pipeline (Datadog, Logstash, ClickHouse, etc.)
* A SIEM (Splunk, Panther, Sumo Logic…)
* Your cloud provider's audit service (e.g. AWS CloudTrail Lake)

A simple pattern is a periodic job (cron / Lambda) that queries new rows and forwards them.  For higher throughput you can directly **emit an event** every time `logAudit` is called (e.g. publish to an SNS topic or Kafka) and let downstream consumers persist.

## 2. Secret Management

By default the project relies on **environment variables** loaded from `.env.*` files (local) and **GitHub Actions secrets** (CI).  While this is sufficient for development, production workloads should source secrets from a dedicated manager.

Supported options include:

* **AWS Secrets Manager / Parameter Store**
* **Google Secret Manager**
* **Azure Key Vault**
* **HashiCorp Vault**

### Integration points

1. **`src/libs/Env.ts`**

   This file defines the Zod schema that validates all env vars.  Insert your retrieval logic *before* the schema is parsed, e.g.:

   ```ts
   // pseudo-code
   import { getSecret } from '~/lib/secret-provider';

   if (process.env.NODE_ENV === 'production') {
     process.env.DATABASE_URL = await getSecret('prod/database_url');
     process.env.SLACK_WEBHOOK = await getSecret('prod/slack_webhook');
   }
   ```

2. **Serverless Platforms**

   * **Vercel** — add secrets via the Vercel dashboard/CLI. They become normal env vars at runtime.
   * **AWS Lambda (SAM / SST)** — use IAM permissions so that the function can read from Secrets Manager at startup.
   * **Docker/Kubernetes** — mount secrets as files or inject via the orchestrator's secret facility.

### Rotating secrets

* Keep rotation intervals short (≤ 90 days).
* Automate rotation using the secret manager's built-in rotation or an external controller.
* Design the app (DB pools, Redis clients, etc.) to **reload** credentials without downtime.

## 3. Additional Hardening Checklist

| Area | Recommendation |
|------|----------------|
| HTTP | Enforce HSTS, X-Content-Type-Options, CSP (already handled by `withSecureHeaders`). |
| Transport | TLS 1.2+ only; use certs from Let's Encrypt or ACM. |
| Dependencies | Enable Dependabot & weekly `depcheck` workflow (already configured). |
| Runtime alerts | Slack channel wired to CI failures (`action-slack`) and Sentry/CodeQL integration. |
| Secrets | Zero secrets in Git history; forbid `printenv` in logs; enable branch protection. |

---

**TL;DR**

* Use `logAudit` for every business-critical action and ship the data to a central store if you need compliance.
* Source secrets from a managed service and load them in `src/libs/Env.ts` *before* validation.

With these two hooks in place your application will meet the baseline requirements for most security frameworks (SOC 2, ISO 27001, HIPAA).
