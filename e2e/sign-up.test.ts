import { expect, test, type Page } from '@playwright/test';

test.use({ locale: 'en-US' });

// Unique per run and per browser project so reruns on the same test database pass.
function uniqueEmail(projectName: string): string {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `e2e-${projectName.replace(/\W/g, '').toLowerCase()}-${id}@example.com`;
}

async function fillForm(page: Page, email: string, password: string, agree: boolean) {
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByLabel('Display name').fill('E2E User');
  if (agree) await page.getByLabel('I agree to the privacy notice').check();
  await page.getByRole('button', { name: 'Create account' }).click();
}

// Scoped to <main>: Next.js adds its own empty role="alert" route announcer to the page.
const formMessage = (page: Page, role: 'alert' | 'status') =>
  page.getByRole('main').getByRole(role);

test('signs up a new email, then refuses the same email again', async ({ page }, testInfo) => {
  const email = uniqueEmail(testInfo.project.name);
  await page.goto('/signup');

  await fillForm(page, email, 'Secret#123', true);
  await expect(formMessage(page, 'status')).toContainText('Account created');
  await expect(page.getByRole('link', { name: 'Log in' })).toHaveAttribute('href', '/login');

  await page.goto('/signup');
  await fillForm(page, email, 'Secret#123', true);
  await expect(formMessage(page, 'alert')).toContainText('This email is already registered.');
  await expect(page.getByLabel('Email')).toHaveValue(email);
  await expect(page.getByLabel('Password')).toHaveValue('');
});

test('refuses to sign up without agreeing to the privacy notice', async ({ page }, testInfo) => {
  await page.goto('/signup');
  await fillForm(page, uniqueEmail(testInfo.project.name), 'Secret#123', false);
  await expect(formMessage(page, 'alert')).toContainText(
    'Agreement to the privacy notice is required',
  );
});

test('shows the password rule when the password breaks it', async ({ page }, testInfo) => {
  await page.goto('/signup');
  await fillForm(page, uniqueEmail(testInfo.project.name), 'password', true);
  const alert = formMessage(page, 'alert');
  await expect(alert).toContainText('This password does not meet the password rule.');
  await expect(alert).toContainText('spaces cannot be used');
});
