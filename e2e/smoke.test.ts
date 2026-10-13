import { expect, test } from '@playwright/test';

test('home page opens with the TodoNow title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('TodoNow');
  await expect(page.getByRole('heading', { level: 1, name: 'TodoNow' })).toBeVisible();
});
