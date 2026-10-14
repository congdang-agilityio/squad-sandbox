import { expect, test, type Page, type TestInfo } from '@playwright/test';

test.use({ locale: 'en-US' });

const PASSWORD = 'Secret#123';
const DUE_DATE = '2030-01-15';
const DUE_DATE_TEXT = 'Due Jan 15, 2030';

// Unique per run and per browser project so reruns on the same test database pass.
function uniqueId(testInfo: TestInfo): string {
  const project = testInfo.project.name.replace(/\W/g, '').toLowerCase();
  return `${project}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// A fresh user per test, so the list holds only the tasks this test creates.
async function logInAsNewUser(page: Page, testInfo: TestInfo) {
  const email = `e2e-create-task-${uniqueId(testInfo)}@example.com`;
  const signUp = await page.request.post('/api/auth/sign-up', {
    data: { email, password: PASSWORD, displayName: 'E2E Tasks', agreedToPrivacyNotice: true },
  });
  expect(signUp.status()).toBe(201);
  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/\/tasks$/);
}

async function fillTask(page: Page, { title = '', dueDate = '', dueTime = '' }) {
  if (title) await page.getByLabel('Title', { exact: true }).fill(title);
  if (dueDate) await page.getByLabel('Due date', { exact: true }).fill(dueDate);
  if (dueTime) await page.getByLabel('Due time (optional)', { exact: true }).fill(dueTime);
  await page.getByRole('button', { name: 'Add task' }).click();
}

// Scoped to <main>: Next.js adds its own empty role="alert" route announcer to the page.
const formAlert = (page: Page) => page.getByRole('main').getByRole('alert');
const taskItems = (page: Page) => page.getByRole('main').getByRole('listitem');

test('a task with a title and a due date is listed with priority Normal and no time', async ({
  page,
}, testInfo) => {
  await logInAsNewUser(page, testInfo);
  const title = `Pay the bill ${uniqueId(testInfo)}`;

  await fillTask(page, { title, dueDate: DUE_DATE });

  await expect(taskItems(page)).toHaveCount(1);
  const item = taskItems(page).filter({ hasText: title });
  await expect(item).toContainText(`${DUE_DATE_TEXT} · Priority: Normal`);
  await expect(item).not.toContainText(/\d{2}:\d{2}/);
  await expect(page.getByLabel('Title', { exact: true })).toHaveValue('');
  await expect(formAlert(page)).toHaveCount(0);
});

test('a task with a due time is listed with that time', async ({ page }, testInfo) => {
  await logInAsNewUser(page, testInfo);
  const title = `Call grandma ${uniqueId(testInfo)}`;

  await fillTask(page, { title, dueDate: DUE_DATE, dueTime: '18:30' });

  const item = taskItems(page).filter({ hasText: title });
  await expect(item).toContainText(`${DUE_DATE_TEXT} 18:30 · Priority: Normal`);
});

test('without a title the title message is shown and nothing is added', async ({
  page,
}, testInfo) => {
  await logInAsNewUser(page, testInfo);

  await fillTask(page, { dueDate: DUE_DATE });

  await expect(formAlert(page)).toHaveText('A title is required');
  await expect(page.getByLabel('Due date', { exact: true })).toHaveValue(DUE_DATE);
  await expect(page.getByText('You have no tasks yet.')).toBeVisible();
  await expect(taskItems(page)).toHaveCount(0);
});

test('without a due date the date message is shown and nothing is added', async ({
  page,
}, testInfo) => {
  await logInAsNewUser(page, testInfo);
  const title = `No date ${uniqueId(testInfo)}`;

  await fillTask(page, { title });

  await expect(formAlert(page)).toHaveText('A due date is required');
  await expect(page.getByLabel('Title', { exact: true })).toHaveValue(title);
  await expect(page.getByText('You have no tasks yet.')).toBeVisible();
  await expect(taskItems(page)).toHaveCount(0);
});
