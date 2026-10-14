import { expect, test, type APIRequestContext, type Page } from '@playwright/test';
import { waitForResetLink } from './helpers/outbox';

// Story #62 on the new-password screen after "forgot password", reached through a real reset
// email. Mirrors e2e/password-rule.test.ts (sign-up).

const OLD_PASSWORD = 'Secret#123';

// Unique per run and per browser project so reruns on the same test database pass.
function uniqueEmail(projectName: string): string {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `e2e-pw-reset-${projectName.replace(/\W/g, '').toLowerCase()}-${id}@example.com`;
}

/** Creates an account with OLD_PASSWORD, asks for a reset email and returns its link. */
async function resetLinkForNewUser(request: APIRequestContext, email: string): Promise<string> {
  const signUp = await request.post('/api/auth/sign-up', {
    data: { email, password: OLD_PASSWORD, displayName: 'E2E Rule', agreedToPrivacyNotice: true },
  });
  expect(signUp.status()).toBe(201);
  const reset = await request.post('/api/auth/password-reset/request', { data: { email } });
  expect(reset.status()).toBe(202);
  return waitForResetLink(email);
}

async function loginStatus(request: APIRequestContext, email: string, password: string) {
  const response = await request.post('/api/auth/login', { data: { email, password } });
  return response.status();
}

// Scoped to <main>: Next.js adds its own empty role="alert" route announcer to the page.
const formMessage = (page: Page, role: 'alert' | 'status') =>
  page.getByRole('main').getByRole(role);

test.describe('in English', () => {
  test.use({ locale: 'en-US' });

  const newPassword = (page: Page) => page.getByLabel('New password');

  async function setNewPassword(page: Page, password: string) {
    await newPassword(page).fill(password);
    await page.getByRole('button', { name: 'Save new password' }).click();
  }

  test('AC1: shows the rule and the allowed characters at the new password field', async ({
    page,
    request,
  }, testInfo) => {
    await page.goto(await resetLinkForNewUser(request, uniqueEmail(testInfo.project.name)));
    const field = newPassword(page);
    await expect(field).toHaveAccessibleDescription(/At least 8 characters/);
    await expect(field).toHaveAccessibleDescription(/\(a-z\).*\(A-Z\).*\(0-9\).*keyboard symbol/);
    await expect(field).toHaveAccessibleDescription(/Vietnamese marks.*spaces cannot be used/);
  });

  const TOO_SHORT = 'The password needs at least 8 characters.';
  const MISSING_TYPE = 'needs at least one lowercase letter (a-z)';
  const INVALID_CHARACTER = 'Only a-z, A-Z, 0-9 and keyboard symbols may be used';

  const refused: [string, string, string][] = [
    ['AC2', 'Ab1!xyz', TOO_SHORT],
    ['AC3', 'ABCDEFG1!', MISSING_TYPE],
    ['AC3', 'abcdefg1!', MISSING_TYPE],
    ['AC3', 'Abcdefgh!', MISSING_TYPE],
    ['AC3', 'Abcdefg12', MISSING_TYPE],
    ['AC4', 'Mậtkhẩu1!', INVALID_CHARACTER],
    ['AC4', 'Abc 123!x', INVALID_CHARACTER],
  ];

  test('AC2-AC4: refuses each password that breaks the rule, says why and saves nothing', async ({
    page,
    request,
  }, testInfo) => {
    const email = uniqueEmail(testInfo.project.name);
    // A refused password keeps the token usable (#162), so one email covers every case.
    await page.goto(await resetLinkForNewUser(request, email));

    for (const [ac, password, message] of refused) {
      await test.step(`${ac}: "${password}"`, async () => {
        await setNewPassword(page, password);
        await expect(formMessage(page, 'alert')).toContainText(message);
        await expect(newPassword(page)).toHaveValue('');
        // Not saved: the old password still logs in, the refused one does not.
        expect(await loginStatus(request, email, OLD_PASSWORD)).toBe(200);
        expect(await loginStatus(request, email, password)).toBe(401);
      });
    }
  });

  test('AC5: accepts "Abcdef1!", which then logs in', async ({ page, request }, testInfo) => {
    const email = uniqueEmail(testInfo.project.name);
    await page.goto(await resetLinkForNewUser(request, email));

    await setNewPassword(page, 'Abcdef1!');
    await expect(formMessage(page, 'status')).toContainText('Your new password is saved.');

    await page.goto('/login');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill('Abcdef1!');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL(/\/tasks$/);
    expect(await loginStatus(request, email, OLD_PASSWORD)).toBe(401);
  });
});

test.describe('in Vietnamese', () => {
  test.use({ locale: 'vi-VN' });

  test('AC1: shows the rule and the allowed characters at the new password field', async ({
    page,
    request,
  }, testInfo) => {
    await page.goto(await resetLinkForNewUser(request, uniqueEmail(testInfo.project.name)));
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
    const field = page.getByLabel('Mật khẩu mới');
    await expect(field).toHaveAccessibleDescription(/Ít nhất 8 ký tự/);
    await expect(field).toHaveAccessibleDescription(
      /\(a-z\).*\(A-Z\).*\(0-9\).*ký hiệu trên bàn phím/,
    );
    await expect(field).toHaveAccessibleDescription(/chữ có dấu tiếng Việt.*dấu cách/);
  });
});
