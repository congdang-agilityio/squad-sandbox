import { expect, test } from '@playwright/test';

for (const [browserLocale, signUpTitle, privacyLink, privacyTitle, back] of [
  [
    'vi-VN',
    'Đăng ký',
    'Đọc thông báo về quyền riêng tư',
    'Thông báo về quyền riêng tư',
    'Quay lại trang đăng ký',
  ],
  ['en-US', 'Sign up', 'Read the privacy notice', 'Privacy notice', 'Back to sign-up'],
] as const) {
  test.describe(`privacy notice from sign-up with browser language ${browserLocale}`, () => {
    test.use({ locale: browserLocale });

    test('opens the notice from sign-up and returns to sign-up', async ({ page }) => {
      const response = await page.goto('/signup');
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1, name: signUpTitle })).toBeVisible();

      await page.getByRole('link', { name: privacyLink }).click();
      await expect(page).toHaveURL(/\/privacy$/);
      await expect(page.getByRole('heading', { level: 1, name: privacyTitle })).toBeVisible();

      await page.getByRole('link', { name: back }).click();
      await expect(page).toHaveURL(/\/signup$/);
      await expect(page.getByRole('heading', { level: 1, name: signUpTitle })).toBeVisible();
    });
  });
}
