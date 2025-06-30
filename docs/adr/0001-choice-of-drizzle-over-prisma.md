# 0001 – Use Drizzle ORM Instead of Prisma

*Status*: Accepted 2024-09-15

## Context
We evaluated **Prisma** and **Drizzle ORM** as the data-mapper for the starter kit.

| Concern | Prisma | Drizzle |
|---------|--------|---------|
| Bundle size (edge) | 13 MB binary | Zero runtime binary |
| Type safety | ✔︎ | ✔︎ (via generated types) |
| SQL migrations | Prisma Migrate (shadow DB) | Pure‐SQL (Drizzle Kit) |
| Edge / Bun / Cloudflare | 🚫 (binary) | ✔︎ ESM |

## Decision
Choose **Drizzle** because:
1. Smaller cold-start + works on edge runtimes.
2. SQL-first approach aligns with production ops (easier to inspect & revert).
3. Migration files double as documentation.

## Consequences
• Developers write SQL via Drizzle's fluent API or raw strings.
• Need to run `pnpm db:generate` after schema change.
• Revisit decision if Prisma ships a binary-less Rust WASM.
