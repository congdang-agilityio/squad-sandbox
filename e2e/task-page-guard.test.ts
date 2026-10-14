import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

type TaskMessages = { tasks: { title: string; empty: string } };

const taskTexts = (['vi', 'en'] as const).flatMap((locale) => {
  const messages = JSON.parse(
    readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), 'utf8'),
  ) as TaskMessages;
  return [messages.tasks.title, messages.tasks.empty];
});

// The root layout sends the whole (public) message catalog to the client, so the raw texts
// always appear in the body. What must not appear is the page's rendered output: a node with
// the text as its children in the RSC payload (quotes may be escaped inside a <script>), or
// the text as HTML element content.
function renderedPatterns(text: string): RegExp[] {
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return [new RegExp(`\\\\*"children\\\\*":\\\\*"${escaped}\\\\*"`), new RegExp(`>${escaped}<`)];
}

function expectNoTaskPageOutput(body: string) {
  for (const text of taskTexts) {
    for (const pattern of renderedPatterns(text)) expect(body).not.toMatch(pattern);
  }
}

// Right shape (43 base64url characters), so the middleware lets it through, but no session.
const unknownToken = 'A'.repeat(43);

for (const acceptLanguage of ['vi-VN', 'en-US']) {
  test.describe(`unknown session token, Accept-Language ${acceptLanguage}`, () => {
    const headers = {
      Cookie: `session=${unknownToken}`,
      'Accept-Language': acceptLanguage,
    };

    test('a document request to /tasks redirects to /login with no task content', async ({
      request,
    }) => {
      const response = await request.get('/tasks', { headers, maxRedirects: 0 });

      expect(response.status()).toBeGreaterThanOrEqual(300);
      expect(response.status()).toBeLessThan(400);
      expect(response.headers()['location']).toMatch(/\/login$/);
      expectNoTaskPageOutput(await response.text());
    });

    test('a client navigation (RSC) request to /tasks sends no task content', async ({
      request,
    }) => {
      // The status of an RSC response is not asserted: Next.js may answer 200 with a
      // redirect digest. What matters is that no page output is sent.
      const response = await request.get('/tasks', {
        headers: { ...headers, RSC: '1' },
        maxRedirects: 0,
      });

      expectNoTaskPageOutput(await response.text());
    });
  });
}

test('a valid session still gets the task page', async ({ request }, testInfo) => {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const email = `e2e-guard-${testInfo.project.name.replace(/\W/g, '').toLowerCase()}-${id}@example.com`;
  const password = 'Secret#123';
  const signUp = await request.post('/api/auth/sign-up', {
    data: { email, password, displayName: 'E2E Guard', agreedToPrivacyNotice: true },
  });
  expect(signUp.status()).toBe(201);
  const login = await request.post('/api/auth/login', { data: { email, password } });
  expect(login.status()).toBe(200);
  const token = /(?:^|\s)session=([A-Za-z0-9_-]{43})/.exec(
    login.headers()['set-cookie'] ?? '',
  )?.[1];
  expect(token).toBeDefined();

  const response = await request.get('/tasks', {
    headers: { Cookie: `session=${token}`, 'Accept-Language': 'en-US' },
    maxRedirects: 0,
  });

  expect(response.status()).toBe(200);
  expect(await response.text()).toMatch(/>My tasks</);
});
