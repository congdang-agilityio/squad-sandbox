import { expect, test } from '@playwright/test';

for (const [browserLocale, expected] of [
  ['vi-VN', 'vi'],
  ['en-US', 'en'],
  ['fr-FR', 'vi'],
] as const) {
  test.describe(`browser language ${browserLocale}`, () => {
    test.use({ locale: browserLocale });

    test(`renders the page with <html lang="${expected}">`, async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('lang', expected);
    });
  });
}
