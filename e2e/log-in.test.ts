import { expect, test, type APIRequestContext, type Page } from '@playwright/test';

test.use({ locale: 'en-US' });

const PASSWORD = 'Secret#123';
const WRONG_CREDENTIALS = 'The email or password is incorrect.';

// Unique per run and per browser project so reruns on the same test database pass.
function uniqueEmail(projectName: string): string {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `e2e-login-${projectName.replace(/\W/g, '').toLowerCase()}-${id}@example.com`;
}

async function signUp(request: APIRequestContext, email: string) {
  const response = await request.post('/api/auth/sign-up', {
    data: { email, password: PASSWORD, displayName: 'E2E Login', agreedToPrivacyNotice: true },
  });
  expect(response.status()).toBe(201);
}

async function logIn(page: Page, email: string, password: string) {
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
}

// Scoped to <main>: Next.js adds its own empty role="alert" route announcer to the page.
const formAlert = (page: Page) => page.getByRole('main').getByRole('alert');

test('opening /tasks while logged out shows the login screen and no task page', async ({
  page,
}) => {
  await page.goto('/tasks');

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Log in' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'My tasks' })).toHaveCount(0);
  await expect(page.getByText('You have no tasks yet.')).toHaveCount(0);
});

test('offers only email and password login, plus a link to sign up', async ({ page }) => {
  await page.goto('/login');
  const main = page.getByRole('main');

  await expect(main.getByRole('button')).toHaveCount(1);
  await expect(main.getByRole('button', { name: 'Log in' })).toBeVisible();
  await expect(main.getByRole('link')).toHaveCount(1);
  await expect(main.getByRole('link', { name: 'Sign up' })).toHaveAttribute('href', '/signup');
  await expect(page.getByText(/google|facebook|apple|microsoft/i)).toHaveCount(0);
});

test('wrong password and unknown email show the same message and stay on /login', async ({
  page,
  request,
}, testInfo) => {
  const email = uniqueEmail(testInfo.project.name);
  await signUp(request, email);
  await page.goto('/login');

  await logIn(page, email, 'Wrong#1234');
  await expect(formAlert(page)).toHaveText(WRONG_CREDENTIALS);
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByLabel('Password')).toHaveValue('');

  await logIn(page, uniqueEmail(testInfo.project.name), PASSWORD);
  await expect(formAlert(page)).toHaveText(WRONG_CREDENTIALS);
  await expect(page).toHaveURL(/\/login$/);
  expect((await page.context().cookies()).some((c) => c.name === 'session')).toBe(false);
});

test('correct login lands on My tasks and stays logged in after reopening the app', async ({
  page,
  request,
}, testInfo) => {
  const email = uniqueEmail(testInfo.project.name);
  await signUp(request, email);
  await page.goto('/login');

  await logIn(page, email, PASSWORD);
  await expect(page).toHaveURL(/\/tasks$/);
  await expect(page.getByRole('heading', { level: 1, name: 'My tasks' })).toBeVisible();

  // Persistent cookie: it has an expiry instead of ending with the browser session (-1).
  const session = (await page.context().cookies()).find((c) => c.name === 'session');
  expect(session).toBeDefined();
  expect(session!.expires).toBeGreaterThan(Date.now() / 1000 + 24 * 60 * 60);

  const context = page.context();
  await page.close();
  const reopened = await context.newPage();
  await reopened.goto('/');
  await expect(reopened).toHaveURL(/\/tasks$/);
  await expect(reopened.getByRole('heading', { level: 1, name: 'My tasks' })).toBeVisible();
});

test('an already logged-in user opening /login goes to the task list', async ({
  page,
  request,
}, testInfo) => {
  const email = uniqueEmail(testInfo.project.name);
  await signUp(request, email);
  await page.goto('/login');
  await logIn(page, email, PASSWORD);
  await expect(page).toHaveURL(/\/tasks$/);

  await page.goto('/login');
  await expect(page).toHaveURL(/\/tasks$/);
});
