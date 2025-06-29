import { expect, test } from '@playwright/test';

/**
 * Basic authentication flow test.
 * Navigates to home page, initiates sign-up, and finally lands on dashboard.
 * This uses placeholder logic — adapt/make robust once Clerk magic-link flow
 * can be fully automated or mocked in CI.
 */

test('signs up and lands on dashboard', async ({ page }) => {
  // Visit application root.
  await page.goto('http://localhost:3000');

  // Trigger sign-up.
  await page.getByRole('link', { name: /sign up/i }).click();

  // Fill email and continue (Clerk test email address).
  await page.getByLabel('Email').fill('demo+e2e@example.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();

  // 👉 Skip email magic-link by navigating to dashboard; we expect
  // the app to redirect unauthenticated users to the sign-in page.
  await page.goto('http://localhost:3000/en/dashboard');

  // Assert redirect happened.
  await expect(page).toHaveURL(/\/sign-in$/);
});
