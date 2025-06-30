// Placeholder utilities for plan-based feature & rate limits.
// ----------------------------------------------------------
// These helpers are intentionally **NOT** fully implemented.
// They provide a central place to plug business logic later on
// without polluting middleware or domain code with ad-hoc checks.

import type { PLAN_ID } from '@/core/AppConfig';

/**
 * Return the requests-per-window limit for the given plan.
 *
 * TODO(plan-limits): Replace the hard-coded fallback with real values
 * once pricing tiers & limits are finalised.
 */
export function getRateLimitForPlan(_planId: string): number {
  // ── Example mapping ──────────────────────────────────────
  // if (planId === PLAN_ID.FREE) return 60;
  // if (planId === PLAN_ID.PREMIUM) return 300;
  // if (planId === PLAN_ID.ENTERPRISE) return Number.POSITIVE_INFINITY;
  // ─────────────────────────────────────────────────────────

  // Fallback to zero which signals "use default".
  return 0;
}

/**
 * Verify that a usage counter is within the plan's allowance.
 *
 * E.g. number of team members, websites, storage GB, etc.
 *
 * TODO(plan-limits): Implement real checks & throw / log when exceeded.
 */
export function assertFeatureLimit(
  _planId: string,
  _feature: keyof (typeof PLAN_ID) | string,
  _currentValue: number,
): void {
  // Not implemented on purpose.
}
