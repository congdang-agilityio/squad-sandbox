// @vitest-environment node
import { db, resetDatabase } from '@/__tests__/helpers/db';
import { createSession, getSessionUser, SESSION_COOKIE_NAME } from '@/lib/auth/session';
import { signUp } from '@/lib/auth/sign-up';
import { POST } from './route';

const UNKNOWN_TOKEN = 'A'.repeat(43);

function request(cookie?: string): Request {
  const headers: Record<string, string> = {};
  if (cookie !== undefined) headers.Cookie = cookie;
  return new Request('http://localhost/api/auth/logout', { method: 'POST', headers });
}

async function createUser(): Promise<string> {
  const result = await signUp({
    email: 'ana@example.com',
    password: 'Str0ng!Pass',
    displayName: 'Ana',
    agreedToPrivacyNotice: true,
  });
  if (!result.ok) throw new Error('sign-up failed in test setup');
  return result.userId;
}

async function expectClearedCookie(res: Response): Promise<void> {
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ ok: true });
  const setCookie = res.headers.get('set-cookie') ?? '';
  expect(setCookie).toMatch(new RegExp(`^${SESSION_COOKIE_NAME}=;`));
  expect(setCookie).toMatch(/Max-Age=0/);
  expect(setCookie).toMatch(/HttpOnly/);
  expect(setCookie).toMatch(/SameSite=Lax/i);
  expect(setCookie).toMatch(/Path=\//);
}

describe('POST /api/auth/logout', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('ends only the calling session and clears the cookie', async () => {
    const userId = await createUser();
    const tokenA = await createSession(userId, 'phone A');
    const tokenB = await createSession(userId, 'phone B');

    const res = await POST(request(`${SESSION_COOKIE_NAME}=${tokenA}`));

    await expectClearedCookie(res);
    expect(await getSessionUser(tokenA)).toBeNull();
    expect(await getSessionUser(tokenB)).toMatchObject({ id: userId });
  });

  it.each([
    ['no cookie', undefined],
    ['an unknown token', `${SESSION_COOKIE_NAME}=${UNKNOWN_TOKEN}`],
    ['a malformed token', `${SESSION_COOKIE_NAME}=not-a-token`],
    ['an empty token', `${SESSION_COOKIE_NAME}=`],
  ])('returns 200 and clears the cookie for %s, keeping other sessions', async (_label, cookie) => {
    const userId = await createUser();
    const token = await createSession(userId, 'phone A');

    const res = await POST(request(cookie));

    await expectClearedCookie(res);
    expect(await getSessionUser(token)).toMatchObject({ id: userId });
  });
});
