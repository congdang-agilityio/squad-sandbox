// @vitest-environment node
import { db, resetDatabase } from '@/__tests__/helpers/db';
import { getSessionUser, SESSION_COOKIE_NAME } from '@/lib/auth/session';
import { signUp } from '@/lib/auth/sign-up';
import { POST } from './route';

const PASSWORD = 'Str0ng!Pass';
const USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)';
const valid = { email: 'ana@example.com', password: PASSWORD };

function request(body: unknown, raw = false): Request {
  return new Request('http://localhost/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': USER_AGENT },
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

async function createUser(): Promise<string> {
  const result = await signUp({ ...valid, displayName: 'Ana', agreedToPrivacyNotice: true });
  if (!result.ok) throw new Error('sign-up failed in test setup');
  return result.userId;
}

function sessionToken(setCookie: string): string {
  const match = new RegExp(`^${SESSION_COOKIE_NAME}=([^;]+)`).exec(setCookie);
  if (!match) throw new Error(`no session cookie in: ${setCookie}`);
  return match[1];
}

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('returns 200 { ok: true }, sets a persistent session cookie and creates one session', async () => {
    const userId = await createUser();

    const res = await POST(request({ email: '  ANA@example.com ', password: PASSWORD }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const setCookie = res.headers.get('set-cookie') ?? '';
    expect(setCookie).toMatch(/Max-Age=34560000/);
    expect(setCookie).toMatch(/HttpOnly/);
    expect(setCookie).toMatch(/SameSite=Lax/i);
    expect(setCookie).toMatch(/Path=\//);

    const sessions = await db.session.findMany();
    expect(sessions).toHaveLength(1);
    expect(sessions[0]).toMatchObject({ userId, userAgent: USER_AGENT });
    expect(await getSessionUser(sessionToken(setCookie))).toMatchObject({ id: userId });
  });

  it('creates a separate session for each login', async () => {
    await createUser();

    await POST(request(valid));
    await POST(request(valid));

    expect(await db.session.count()).toBe(2);
  });

  it('gives identical 401 INVALID_CREDENTIALS responses for a wrong password and an unknown email', async () => {
    await createUser();

    const wrongPassword = await POST(request({ ...valid, password: 'Wr0ng!Pass' }));
    const unknownEmail = await POST(request({ ...valid, email: 'nobody@example.com' }));

    for (const res of [wrongPassword, unknownEmail]) {
      expect(res.status).toBe(401);
      expect(res.headers.get('set-cookie')).toBeNull();
    }
    const bodies = [await wrongPassword.text(), await unknownEmail.text()];
    expect(JSON.parse(bodies[0])).toEqual({ error: 'INVALID_CREDENTIALS' });
    expect(bodies[1]).toBe(bodies[0]);
    expect(await db.session.count()).toBe(0);
  });

  it.each([
    ['missing email', { password: PASSWORD }],
    ['missing password', { email: valid.email }],
    ['email of wrong type', { ...valid, email: 42 }],
    ['password of wrong type', { ...valid, password: ['x'] }],
    ['array body', [valid]],
    ['null body', null],
    ['email longer than 254 characters', { ...valid, email: 'a'.repeat(243) + '@example.com' }],
    ['password longer than 128 characters', { ...valid, password: 'x'.repeat(129) }],
  ])('returns 400 INVALID_INPUT for %s with no cookie and no session', async (_label, body) => {
    await createUser();

    const res = await POST(request(body));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'INVALID_INPUT' });
    expect(res.headers.get('set-cookie')).toBeNull();
    expect(await db.session.count()).toBe(0);
  });

  it('returns 400 INVALID_INPUT for a non-JSON body', async () => {
    const res = await POST(request('{not json', true));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'INVALID_INPUT' });
    expect(res.headers.get('set-cookie')).toBeNull();
  });
});
