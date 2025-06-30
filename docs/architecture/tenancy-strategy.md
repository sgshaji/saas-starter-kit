# Tenancy Strategy

We support both B2C and B2B flows using Clerk:
- If `NEXT_PUBLIC_ENABLE_TEAMS=false`, users default to their personal org
- If true, onboarding redirects to `/onboarding/organization-selection`
- Tenancy is implemented via `orgId` in DB; switching to `userId` is possible for pure B2C
- Stripe customer IDs are linked to `orgId` or `userId` depending on mode
