// @vitest-environment node
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { db, resetDatabase } from '@/__tests__/helpers/db';
import { authenticate } from '@/lib/auth/login';
import { requestPasswordReset } from '@/lib/auth/password-reset';
import { signUp } from '@/lib/auth/sign-up';
import { POST } from './route';

const EMAIL = 'ana@example.com';
const OLD_PASSWORD = 'Str0ng!Pass';
const NEW_PASSWORD = 'N3w!Secret';

let outbox: string;

function passwordOfLength(length: number): string {
  return NEW_PASSWORD + 'x'.repeat(length - NEW_PASSWORD.length);
}

function request(body: unknown, raw = false): Request {
  return new Request('http://localhost/api/auth/password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

async function createUserAndToken(): Promise<string> {
  const result = await signUp({
    email: EMAIL,
    password: OLD_PASSWORD,
    displayName: 'Ana',
    agreedToPrivacyNotice: true,
  });
  if (!result.ok) throw new Error('sign-up failed in test setup');
  await requestPasswordReset(EMAIL, { locale: 'en', baseUrl: 'https://todonow.test' });
  const [file] = (await readdir(outbox)).filter((name) => name.endsWith('.json'));
  const mail = JSON.parse(await readFile(join(outbox, file), 'utf8')) as { text: string };
  const match = mail.text.match(/\/reset-password\?token=([A-Za-z0-9_-]+)/);
  if (!match) throw new Error('no reset link in the email');
  return match[1];
}

describe('POST /api/auth/password-reset', () => {
  beforeEach(async () => {
    await resetDatabase();
    outbox = await mkdtemp(join(tmpdir(), 'password-reset-route-test-'));
    vi.stubEnv('SMTP_URL', '');
    vi.stubEnv('MAIL_OUTBOX_DIR', outbox);
  });

  afterEach(async () => {
    vi.unstubAllEnvs();
    await rm(outbox, { recursive: true, force: true });
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('sets the new password, returns 200 { ok: true } and sets no cookie', async () => {
    const token = await createUserAndToken();

    const res = await POST(request({ token, password: NEW_PASSWORD }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(res.headers.get('set-cookie')).toBeNull();
    expect(await authenticate(EMAIL, NEW_PASSWORD)).not.toBeNull();
    expect(await authenticate(EMAIL, OLD_PASSWORD)).toBeNull();
  });

  it('returns 400 INVALID_TOKEN for an unknown token and keeps the password', async () => {
    await createUserAndToken();

    const res = await POST(request({ token: 'A'.repeat(43), password: NEW_PASSWORD }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'INVALID_TOKEN' });
    expect(res.headers.get('set-cookie')).toBeNull();
    expect(await authenticate(EMAIL, OLD_PASSWORD)).not.toBeNull();
  });

  it('returns 400 INVALID_TOKEN when the token was already used', async () => {
    const token = await createUserAndToken();
    expect((await POST(request({ token, password: NEW_PASSWORD }))).status).toBe(200);

    const res = await POST(request({ token, password: 'An0ther!Pass' }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'INVALID_TOKEN' });
    expect(await authenticate(EMAIL, NEW_PASSWORD)).not.toBeNull();
  });

  it('returns 400 PASSWORD_RULE with the failures and keeps the password', async () => {
    const token = await createUserAndToken();

    const res = await POST(request({ token, password: 'short' }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: 'PASSWORD_RULE',
      failures: ['tooShort', 'noUppercase', 'noDigit', 'noSymbol'],
    });
    expect(await authenticate(EMAIL, OLD_PASSWORD)).not.toBeNull();
  });

  it.each([
    ['missing token', { password: NEW_PASSWORD }],
    ['missing password', { token: 'A'.repeat(43) }],
    ['token of wrong type', { token: 42, password: NEW_PASSWORD }],
    ['password of wrong type', { token: 'A'.repeat(43), password: ['x'] }],
    ['array body', [{ token: 'A'.repeat(43), password: NEW_PASSWORD }]],
    ['null body', null],
    [
      'password longer than 128 characters',
      { token: 'A'.repeat(43), password: passwordOfLength(129) },
    ],
  ])('returns 400 INVALID_INPUT for %s', async (_label, body) => {
    const res = await POST(request(body));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'INVALID_INPUT' });
  });

  it('returns 400 INVALID_INPUT for a non-JSON body', async () => {
    const res = await POST(request('{not json', true));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'INVALID_INPUT' });
  });

  it('accepts a password of exactly 128 characters', async () => {
    const token = await createUserAndToken();

    const res = await POST(request({ token, password: passwordOfLength(128) }));

    expect(res.status).toBe(200);
    expect(await authenticate(EMAIL, passwordOfLength(128))).not.toBeNull();
  });
});
