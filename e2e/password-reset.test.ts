import { expect, test, type APIRequestContext, type Page } from '@playwright/test';
import { waitForResetLink } from './helpers/outbox';

test.use({ locale: 'en-US' });

const OLD_PASSWORD = 'Secret#123';
const NEW_PASSWORD = 'NewSecret#456';
const WRONG_CREDENTIALS = 'The email or password is incorrect.';
const SENT = 'If an account exists for this email, we sent an email';

// Unique per run and per browser project so reruns on the same test database pass.
function uniqueEmail(projectName: string): string {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `e2e-reset-${projectName.replace(/\W/g, '').toLowerCase()}-${id}@example.com`;
}

async function signUp(request: APIRequestContext, email: string) {
  const response = await request.post('/api/auth/sign-up', {
    data: { email, password: OLD_PASSWORD, displayName: 'E2E Reset', agreedToPrivacyNotice: true },
  });
  expect(response.status()).toBe(201);
}

async function logIn(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
}

async function setNewPassword(page: Page, password: string) {
  await page.getByLabel('New password').fill(password);
  await page.getByRole('button', { name: 'Save new password' }).click();
}

// Scoped to <main>: Next.js adds its own empty role="alert" route announcer to the page.
const formMessage = (page: Page, role: 'alert' | 'status') =>
  page.getByRole('main').getByRole(role);

test('AC1, AC2, AC4: reset from the login screen, log in with the new password only, other phone stays logged in', async ({
  browser,
  page,
  request,
}, testInfo) => {
  const email = uniqueEmail(testInfo.project.name);
  await signUp(request, email);
  const otherPhone = await (
    await browser.newContext({ ...testInfo.project.use, locale: 'en-US' })
  ).newPage();
  await logIn(otherPhone, email, OLD_PASSWORD);
  await expect(otherPhone).toHaveURL(/\/tasks$/);

  await page.goto('/login');
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  await expect(page).toHaveURL(/\/forgot-password$/);
  await page.getByLabel('Email').fill(email);
  await page.getByRole('button', { name: 'Send reset link' }).click();
  await expect(formMessage(page, 'status')).toContainText(SENT);

  const link = await waitForResetLink(email);
  expect(new URL(link).origin).toBe(new URL(page.url()).origin);
  await page.goto(link);
  await expect(page.locator('meta[name="referrer"]')).toHaveAttribute('content', 'no-referrer');
  await setNewPassword(page, NEW_PASSWORD);
  await expect(formMessage(page, 'status')).toContainText('Your new password is saved.');
  await page.getByRole('main').getByRole('link', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/\/login$/);

  await logIn(page, email, OLD_PASSWORD);
  await expect(formMessage(page, 'alert')).toHaveText(WRONG_CREDENTIALS);
  await logIn(page, email, NEW_PASSWORD);
  await expect(page).toHaveURL(/\/tasks$/);

  await otherPhone.goto('/tasks');
  await expect(otherPhone).toHaveURL(/\/tasks$/);
  await expect(otherPhone.getByRole('heading', { level: 1, name: 'My tasks' })).toBeVisible();
  await otherPhone.context().close();

  // The link works once.
  await page.goto(link);
  await setNewPassword(page, 'Another#789');
  await expect(formMessage(page, 'alert')).toContainText('This link is invalid or has expired.');
  await expect(page.getByRole('link', { name: 'Request a new link' })).toHaveAttribute(
    'href',
    '/forgot-password',
  );
});

test('AC3: a new password that breaks the rule is refused and the old password still works', async ({
  page,
  request,
}, testInfo) => {
  const email = uniqueEmail(testInfo.project.name);
  await signUp(request, email);
  const response = await request.post('/api/auth/password-reset/request', { data: { email } });
  expect(response.status()).toBe(202);

  await page.goto(await waitForResetLink(email));
  await setNewPassword(page, 'password');
  const alert = formMessage(page, 'alert');
  await expect(alert).toContainText('This password does not meet the password rule');
  await expect(page.getByLabel('New password')).toHaveValue('');
  await expect(page.getByLabel('New password')).toBeVisible();

  await logIn(page, email, OLD_PASSWORD);
  await expect(page).toHaveURL(/\/tasks$/);
});

test('a link without a token shows the invalid link message', async ({ page }) => {
  await page.goto('/reset-password');
  await expect(formMessage(page, 'alert')).toContainText('This link is invalid or has expired.');
  await expect(page.getByLabel('New password')).toHaveCount(0);
});
