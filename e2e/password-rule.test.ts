import { expect, test, type Page } from '@playwright/test';

test.use({ locale: 'en-US' });

// Story #62 on the sign-up screen (en). Unique emails per run and per browser project.
function uniqueEmail(projectName: string): string {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `e2e-pw-${projectName.replace(/\W/g, '').toLowerCase()}-${id}@example.com`;
}

async function signUp(page: Page, email: string, password: string) {
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByLabel('Display name').fill('E2E User');
  await page.getByLabel('I agree to the privacy notice').check();
  await page.getByRole('button', { name: 'Create account' }).click();
}

// Scoped to <main>: Next.js adds its own empty role="alert" route announcer to the page.
const formMessage = (page: Page, role: 'alert' | 'status') =>
  page.getByRole('main').getByRole(role);

const TOO_SHORT = 'The password needs at least 8 characters.';
const MISSING_TYPE = 'needs at least one lowercase letter (a-z)';
const INVALID_CHARACTER = 'Only a-z, A-Z, 0-9 and keyboard symbols may be used';

test('AC1: shows the rule and the allowed characters at the password field', async ({ page }) => {
  await page.goto('/signup');
  const password = page.getByLabel('Password');
  await expect(password).toHaveAccessibleDescription(/At least 8 characters/);
  await expect(password).toHaveAccessibleDescription(/\(a-z\).*\(A-Z\).*\(0-9\).*keyboard symbol/);
  await expect(password).toHaveAccessibleDescription(/Vietnamese marks.*spaces cannot be used/);
});

const refused: [string, string, string][] = [
  ['AC2', 'Ab1!xyz', TOO_SHORT],
  ['AC3', 'ABCDEFG1!', MISSING_TYPE],
  ['AC3', 'abcdefg1!', MISSING_TYPE],
  ['AC3', 'Abcdefgh!', MISSING_TYPE],
  ['AC3', 'Abcdefg12', MISSING_TYPE],
  ['AC4', 'Mậtkhẩu1!', INVALID_CHARACTER],
  ['AC4', 'Abc 123!x', INVALID_CHARACTER],
];

for (const [ac, password, message] of refused) {
  test(`${ac}: refuses "${password}", says why and creates no account`, async ({
    page,
  }, testInfo) => {
    const email = uniqueEmail(testInfo.project.name);
    await page.goto('/signup');

    await signUp(page, email, password);
    await expect(formMessage(page, 'alert')).toContainText(message);
    await expect(page.getByLabel('Password')).toHaveValue('');

    // No account was saved: the same email can still sign up with a valid password.
    await signUp(page, email, 'Abcdef1!');
    await expect(formMessage(page, 'status')).toContainText('Account created');
  });
}

for (const password of ['Abcdef1!', 'Todo~2027x']) {
  test(`AC5: accepts "${password}"`, async ({ page }, testInfo) => {
    await page.goto('/signup');
    await signUp(page, uniqueEmail(testInfo.project.name), password);
    await expect(formMessage(page, 'status')).toContainText('Account created');
  });
}
