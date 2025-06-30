# 0003 – Multi-Tenancy via Clerk Organisation ID

*Status*: Accepted 2024-09-15

## Context
We need to support both single-user (B2C) and team-based (B2B) use-cases. Clerk offers **Organisations API** – each user may belong to one or more orgs with role metadata.

## Decision
1. Store the active organisation in the JWT → surface as `auth.orgId` (see `src/middleware.ts`).
2. Toggle the feature using `NEXT_PUBLIC_ENABLE_TEAMS` so solo-founder projects can disable it.
3. Database tables reference `org_id` for tenant isolation; default org equals user's UID when teams are off.

## Consequences
+ Cleaner permission model (`role` + `orgId`).
+ Tenant data easily scoped in queries: `where eq(org_id, $auth.orgId)`.
+ Requires **Enterprise plan** on Clerk for >5K organisations.
