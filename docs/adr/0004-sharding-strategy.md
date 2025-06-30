# 0004 – Database Sharding & Tenant-to-DB Mapping

*Status*: Proposed 2024-09-15

## Context
As the SaaS grows beyond ≈10 M rows or requires data-residency segregation, we may need to split the multi-tenant Postgres into multiple databases.

## Decision
We will adopt **schema-per-tenant** at small scale and migrate to **database-per-tenant** when:
1. A single tenant exceeds 5 GB of data **or**
2. Regional/legal isolation is requested.

The routing key is `orgId` (already present in Clerk JWT). `DBRouter` helper will map:
```ts
const db = router.getForOrg(orgId); // returns a Drizzle instance bound to a pool
```
Mapping table lives in a control database:
| orgId | db_url | createdAt |

## Consequences
+ Enables online tenant migration (update mapping row + dual-write during cut-over).
+ Dev/local keeps single PGlite database for simplicity.

## Follow-ups
1. Implement `DBRouter` wrapper once first paying tenant crosses the thresholds.
2. Automate new-tenant provisioning via SQL template.
