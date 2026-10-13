import { expect, test } from '@playwright/test';

for (const [browserLocale, title, back] of [
  ['vi-VN', 'Thông báo về quyền riêng tư', 'Quay lại trang đăng ký'],
  ['fr-FR', 'Thông báo về quyền riêng tư', 'Quay lại trang đăng ký'],
  ['en-US', 'Privacy notice', 'Back to sign-up'],
] as const) {
  test.describe(`privacy notice with browser language ${browserLocale}`, () => {
    test.use({ locale: browserLocale });

    test('is shown without logging in, with a link back to sign-up', async ({ page }) => {
      const response = await page.goto('/privacy');
      expect(response?.status()).toBe(200);

      await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
      await expect(page.getByRole('link', { name: back })).toHaveAttribute('href', '/signup');
    });
  });
}
