import { expect, test, type APIRequestContext, type Page } from '@playwright/test';

test.use({ locale: 'en-US' });

const PASSWORD = 'Secret#123';

// Unique per run and per browser project so reruns on the same test database pass.
function uniqueEmail(projectName: string): string {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `e2e-logout-${projectName.replace(/\W/g, '').toLowerCase()}-${id}@example.com`;
}

async function signUp(request: APIRequestContext, email: string) {
  const response = await request.post('/api/auth/sign-up', {
    data: { email, password: PASSWORD, displayName: 'E2E Logout', agreedToPrivacyNotice: true },
  });
  expect(response.status()).toBe(201);
}

async function logIn(page: Page, email: string) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/\/tasks$/);
  await expect(myTasks(page)).toBeVisible();
}

async function logOut(page: Page) {
  await page.getByRole('button', { name: 'Log out' }).click();
  await expectLoginScreen(page);
}

const myTasks = (page: Page) => page.getByRole('heading', { level: 1, name: 'My tasks' });

async function expectLoginScreen(page: Page) {
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Log in' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'My tasks' })).toHaveCount(0);
  await expect(page.getByText('You have no tasks yet.')).toHaveCount(0);
}

async function sessionToken(page: Page): Promise<string | undefined> {
  return (await page.context().cookies()).find((c) => c.name === 'session')?.value;
}

test('AC1: logging out shows the login screen and no task page', async ({
  page,
  request,
}, testInfo) => {
  const email = uniqueEmail(testInfo.project.name);
  await signUp(request, email);
  await logIn(page, email);

  await logOut(page);
  expect(await sessionToken(page)).toBeUndefined();
});

test('AC2: going back, opening / or /tasks after logging out shows the login screen', async ({
  page,
  request,
}, testInfo) => {
  const email = uniqueEmail(testInfo.project.name);
  await signUp(request, email);
  await logIn(page, email);
  // Login replaces /login with /tasks; reopen the app (/ redirects to /tasks) so the history
  // has an earlier task-page entry that "back" returns to. (Going to the same URL would only
  // replace the current entry.)
  await page.goto('/');
  await expect(page).toHaveURL(/\/tasks$/);
  await expect(myTasks(page)).toBeVisible();
  expect(await page.evaluate(() => history.length)).toBeGreaterThanOrEqual(3);
  await logOut(page);

  await page.goBack();
  await expectLoginScreen(page);

  await page.goto('/');
  await expectLoginScreen(page);

  const another = await page.context().newPage();
  await another.goto('/tasks');
  await expectLoginScreen(another);
});

test('AC3: logging out on phone A keeps phone B logged in', async ({
  browser,
  request,
}, testInfo) => {
  const email = uniqueEmail(testInfo.project.name);
  await signUp(request, email);
  // Two separate browser contexts with this project's device settings: two phones.
  const options = { ...testInfo.project.use, locale: 'en-US' };
  const phoneA = await (await browser.newContext(options)).newPage();
  const phoneB = await (await browser.newContext(options)).newPage();
  await logIn(phoneA, email);
  await logIn(phoneB, email);

  await logOut(phoneA);

  await phoneB.goto('/tasks');
  await expect(phoneB).toHaveURL(/\/tasks$/);
  await expect(myTasks(phoneB)).toBeVisible();

  await phoneA.context().close();
  await phoneB.context().close();
});

test('AC4: after logging out, another user logs in on the same phone and the old session is gone', async ({
  page,
  request,
}, testInfo) => {
  const first = uniqueEmail(testInfo.project.name);
  const second = uniqueEmail(testInfo.project.name);
  await signUp(request, first);
  await signUp(request, second);
  await logIn(page, first);
  const oldToken = await sessionToken(page);
  expect(oldToken).toBeDefined();

  await logOut(page);
  await logIn(page, second);
  expect(await sessionToken(page)).not.toBe(oldToken);

  const response = await request.get('/tasks', {
    headers: { Cookie: `session=${oldToken}`, 'Accept-Language': 'en-US' },
    maxRedirects: 0,
  });
  expect(response.status()).toBeGreaterThanOrEqual(300);
  expect(response.status()).toBeLessThan(400);
  expect(response.headers()['location']).toMatch(/\/login$/);
});
