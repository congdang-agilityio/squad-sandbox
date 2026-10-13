// @vitest-environment node
import { db, resetDatabase } from '@/__tests__/helpers/db';
import { POST } from './route';

const PASSWORD = 'Str0ng!Pass';
const DOMAIN = '@example.com';

function emailOfLength(length: number): string {
  return 'a'.repeat(length - DOMAIN.length) + DOMAIN;
}

function passwordOfLength(length: number): string {
  return PASSWORD + 'x'.repeat(length - PASSWORD.length);
}

const valid = {
  email: 'ana@example.com',
  password: PASSWORD,
  displayName: 'Ana',
  agreedToPrivacyNotice: true,
};

function request(body: unknown, raw = false): Request {
  return new Request('http://localhost/api/auth/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

describe('POST /api/auth/sign-up', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('creates the user and returns 201 { ok: true } without the password or hash', async () => {
    const res = await POST(request(valid));

    expect(res.status).toBe(201);
    const text = await res.text();
    expect(JSON.parse(text)).toEqual({ ok: true });
    expect(text).not.toContain(PASSWORD);
    expect(text).not.toContain('argon2');
    expect(await db.user.count()).toBe(1);
  });

  it.each([
    ['missing email', { ...valid, email: undefined }],
    ['missing password', { ...valid, password: undefined }],
    ['missing displayName', { ...valid, displayName: undefined }],
    ['missing agreedToPrivacyNotice', { ...valid, agreedToPrivacyNotice: undefined }],
    ['email of wrong type', { ...valid, email: 42 }],
    ['password of wrong type', { ...valid, password: ['x'] }],
    ['displayName of wrong type', { ...valid, displayName: null }],
    ['agreement of wrong type', { ...valid, agreedToPrivacyNotice: 'yes' }],
    ['array body', [valid]],
    ['null body', null],
    ['invalid email shape', { ...valid, email: 'not-an-email' }],
    ['blank displayName', { ...valid, displayName: '   ' }],
    ['email longer than 254 characters', { ...valid, email: emailOfLength(255) }],
    ['very long email', { ...valid, email: emailOfLength(5000) }],
    ['password longer than 128 characters', { ...valid, password: passwordOfLength(129) }],
    ['displayName longer than 100 characters', { ...valid, displayName: 'A'.repeat(101) }],
  ])('returns 400 INVALID_INPUT for %s and creates no user', async (_label, body) => {
    const res = await POST(request(body));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'INVALID_INPUT' });
    expect(await db.user.count()).toBe(0);
  });

  it.each([
    ['an email of exactly 254 characters', { ...valid, email: emailOfLength(254) }],
    ['a password of exactly 128 characters', { ...valid, password: passwordOfLength(128) }],
    ['a displayName of exactly 100 characters', { ...valid, displayName: 'A'.repeat(100) }],
  ])('accepts %s and returns 201', async (_label, body) => {
    const res = await POST(request(body));

    expect(res.status).toBe(201);
    expect(await db.user.count()).toBe(1);
  });

  it('returns 400 INVALID_INPUT for a non-JSON body and creates no user', async () => {
    const res = await POST(request('{not json', true));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'INVALID_INPUT' });
    expect(await db.user.count()).toBe(0);
  });

  it('returns 400 AGREEMENT_REQUIRED without agreement and creates no user', async () => {
    const res = await POST(request({ ...valid, agreedToPrivacyNotice: false }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'AGREEMENT_REQUIRED' });
    expect(await db.user.count()).toBe(0);
  });

  it('returns 400 PASSWORD_RULE with the failures and creates no user', async () => {
    const res = await POST(request({ ...valid, password: 'short' }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: 'PASSWORD_RULE',
      failures: ['tooShort', 'noUppercase', 'noDigit', 'noSymbol'],
    });
    expect(await db.user.count()).toBe(0);
  });

  it('returns 409 EMAIL_TAKEN for a registered email and keeps the user count', async () => {
    expect((await POST(request(valid))).status).toBe(201);

    const res = await POST(request({ ...valid, email: 'ANA@example.com', displayName: 'Other' }));

    expect(res.status).toBe(409);
    expect(await res.json()).toEqual({ error: 'EMAIL_TAKEN' });
    expect(await db.user.count()).toBe(1);
  });
});
