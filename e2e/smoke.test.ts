import { expect, test } from '@playwright/test';

test('public pages open with the TodoNow title', async ({ page }) => {
  await page.goto('/signup');
  await expect(page).toHaveTitle('TodoNow');
});

for (const path of ['/', '/tasks']) {
  test(`${path} sends a visitor without a login to /login`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { name: /my tasks|việc của tôi/i })).toHaveCount(0);
  });
}
