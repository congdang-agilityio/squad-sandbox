// @vitest-environment node
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { db, resetDatabase } from '@/__tests__/helpers/db';
import { signUp } from '@/lib/auth/sign-up';
import { POST } from './route';

type OutboxMail = { to: string; subject: string; text: string };

const EMAIL = 'ana@example.com';
const DOMAIN = '@example.com';

let outbox: string;

function emailOfLength(length: number): string {
  return 'a'.repeat(length - DOMAIN.length) + DOMAIN;
}

function request(
  body: unknown,
  { raw = false, headers = {} }: { raw?: boolean; headers?: Record<string, string> } = {},
): Request {
  return new Request('http://localhost:4101/api/auth/password-reset/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

async function readOutbox(): Promise<OutboxMail[]> {
  const files = (await readdir(outbox)).filter((name) => name.endsWith('.json')).sort();
  return Promise.all(
    files.map(async (name) => JSON.parse(await readFile(join(outbox, name), 'utf8'))),
  );
}

async function createUser(email = EMAIL): Promise<void> {
  const result = await signUp({
    email,
    password: 'Str0ng!Pass',
    displayName: 'Ana',
    agreedToPrivacyNotice: true,
  });
  if (!result.ok) throw new Error('sign-up failed in test setup');
}

describe('POST /api/auth/password-reset/request', () => {
  beforeEach(async () => {
    await resetDatabase();
    outbox = await mkdtemp(join(tmpdir(), 'password-reset-route-test-'));
    vi.stubEnv('SMTP_URL', '');
    vi.stubEnv('MAIL_OUTBOX_DIR', outbox);
    vi.stubEnv('APP_BASE_URL', 'https://todonow.test');
  });

  afterEach(async () => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    await rm(outbox, { recursive: true, force: true });
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('returns 202 { ok: true } and emails a reset link based on APP_BASE_URL', async () => {
    await createUser();

    const res = await POST(request({ email: EMAIL }, { headers: { 'Accept-Language': 'en' } }));

    expect(res.status).toBe(202);
    expect(await res.json()).toEqual({ ok: true });
    const mails = await readOutbox();
    expect(mails).toHaveLength(1);
    expect(mails[0].to).toBe(EMAIL);
    expect(mails[0].text).toMatch(/https:\/\/todonow\.test\/reset-password\?token=/);
    expect(await db.passwordResetToken.count()).toBe(1);
  });

  it('returns the same 202 { ok: true } for an unknown email and sends nothing', async () => {
    const res = await POST(request({ email: 'nobody@example.com' }));

    expect(res.status).toBe(202);
    expect(await res.json()).toEqual({ ok: true });
    expect(await readOutbox()).toHaveLength(0);
    expect(await db.passwordResetToken.count()).toBe(0);
  });

  it.each([
    ['en-US,vi;q=0.9', 'Reset your TodoNow password'],
    ['vi-VN,en;q=0.8', 'Đặt lại mật khẩu TodoNow'],
  ])('sends the email in the locale of Accept-Language %s', async (header, subject) => {
    await createUser();

    const res = await POST(request({ email: EMAIL }, { headers: { 'Accept-Language': header } }));

    expect(res.status).toBe(202);
    const mails = await readOutbox();
    expect(mails).toHaveLength(1);
    expect(mails[0].subject).toBe(subject);
  });

  it('falls back to the request origin when APP_BASE_URL is not set', async () => {
    vi.stubEnv('APP_BASE_URL', '');
    await createUser();

    const res = await POST(request({ email: EMAIL }));

    expect(res.status).toBe(202);
    const mails = await readOutbox();
    expect(mails).toHaveLength(1);
    expect(mails[0].text).toMatch(/http:\/\/localhost:4101\/reset-password\?token=/);
  });

  it('still returns 202 { ok: true } when sending the email fails, so accounts cannot be enumerated', async () => {
    await createUser();
    // Neither SMTP_URL nor MAIL_OUTBOX_DIR: sendMail throws.
    vi.stubEnv('MAIL_OUTBOX_DIR', '');
    const logged = vi.spyOn(console, 'error').mockImplementation(() => {});

    const res = await POST(request({ email: EMAIL }));

    expect(res.status).toBe(202);
    expect(await res.json()).toEqual({ ok: true });
    expect(logged).toHaveBeenCalled();
  });

  it.each([
    ['missing email', {}],
    ['email of wrong type', { email: 42 }],
    ['null email', { email: null }],
    ['array body', [{ email: EMAIL }]],
    ['null body', null],
    ['string body', 'ana@example.com'],
    ['email longer than 254 characters', { email: emailOfLength(255) }],
  ])('returns 400 INVALID_INPUT for %s and sends nothing', async (_label, body) => {
    await createUser();

    const res = await POST(request(body));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'INVALID_INPUT' });
    expect(await readOutbox()).toHaveLength(0);
  });

  it('returns 400 INVALID_INPUT for a non-JSON body', async () => {
    const res = await POST(request('{not json', { raw: true }));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'INVALID_INPUT' });
  });

  it('accepts an email of exactly 254 characters', async () => {
    const res = await POST(request({ email: emailOfLength(254) }));

    expect(res.status).toBe(202);
  });
});
