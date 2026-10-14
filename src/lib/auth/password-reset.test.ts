// @vitest-environment node
import { createHash } from 'node:crypto';
import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { db, resetDatabase } from '@/__tests__/helpers/db';
import { authenticate } from '@/lib/auth/login';
import { requestPasswordReset, resetPassword } from '@/lib/auth/password-reset';
import { passwordResetEmail } from '@/lib/auth/password-reset-email';
import { createSession, getSessionUser } from '@/lib/auth/session';
import { signUp } from '@/lib/auth/sign-up';

const OLD_PASSWORD = 'Str0ng!Pass';
const NEW_PASSWORD = 'N3w!Secret';
const BASE_URL = 'https://todonow.test';
const HOUR_MS = 60 * 60 * 1000;

type OutboxMail = { to: string; subject: string; text: string };

let outbox: string;

async function createUser(email = 'ana@example.com'): Promise<string> {
  const result = await signUp({
    email,
    password: OLD_PASSWORD,
    displayName: 'Ana',
    agreedToPrivacyNotice: true,
  });
  if (!result.ok) throw new Error('sign-up failed in test setup');
  return result.userId;
}

async function readOutbox(): Promise<OutboxMail[]> {
  const files = (await readdir(outbox)).filter((name) => name.endsWith('.json')).sort();
  return Promise.all(
    files.map(async (name) => JSON.parse(await readFile(join(outbox, name), 'utf8'))),
  );
}

function tokenFrom(mail: OutboxMail): string {
  const match = mail.text.match(/\/reset-password\?token=([A-Za-z0-9_-]+)/);
  if (!match) throw new Error('no reset link in the email');
  return match[1];
}

async function requestToken(email = 'ana@example.com'): Promise<string> {
  await requestPasswordReset(email, { locale: 'en', baseUrl: BASE_URL });
  const mails = await readOutbox();
  return tokenFrom(mails[mails.length - 1]);
}

describe('password reset', () => {
  beforeEach(async () => {
    await resetDatabase();
    outbox = await mkdtemp(join(tmpdir(), 'password-reset-test-'));
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

  describe('requestPasswordReset', () => {
    it('sends one English email with a working reset link and stores only the token hash', async () => {
      const userId = await createUser();

      await requestPasswordReset('  ANA@Example.com ', { locale: 'en', baseUrl: BASE_URL });

      const mails = await readOutbox();
      expect(mails).toHaveLength(1);
      const [mail] = mails;
      expect(mail.to).toBe('ana@example.com');
      const token = tokenFrom(mail);
      expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/);
      expect(mail).toMatchObject(
        passwordResetEmail('en', `${BASE_URL}/reset-password?token=${token}`),
      );

      const rows = await db.passwordResetToken.findMany();
      expect(rows).toHaveLength(1);
      expect(rows[0].userId).toBe(userId);
      expect(rows[0].tokenHash).toBe(createHash('sha256').update(token).digest('hex'));
      expect(rows[0].tokenHash).not.toContain(token);
      expect(rows[0].usedAt).toBeNull();
      const lifetime = rows[0].expiresAt.getTime() - rows[0].createdAt.getTime();
      expect(Math.abs(lifetime - HOUR_MS)).toBeLessThan(5000);
    });

    it('sends the email in Vietnamese for locale vi', async () => {
      await createUser();

      await requestPasswordReset('ana@example.com', { locale: 'vi', baseUrl: `${BASE_URL}/` });

      const [mail] = await readOutbox();
      const token = tokenFrom(mail);
      const vi = passwordResetEmail('vi', `${BASE_URL}/reset-password?token=${token}`);
      expect(mail).toMatchObject(vi);
      expect(vi.subject).not.toBe(passwordResetEmail('en', 'x').subject);
    });

    it.each([
      ['an unknown email', 'nobody@example.com'],
      ['a malformed email', 'not-an-email'],
      ['an empty email', '   '],
      ['a non-string email', 42],
    ])('sends nothing and returns the same result for %s', async (_label, email) => {
      await createUser();
      const known = await requestPasswordReset('ana@example.com', {
        locale: 'en',
        baseUrl: BASE_URL,
      });
      expect(await readOutbox()).toHaveLength(1);

      const result = await requestPasswordReset(email as unknown as string, {
        locale: 'en',
        baseUrl: BASE_URL,
      });

      expect(result).toEqual(known);
      expect(await readOutbox()).toHaveLength(1);
      expect(await db.passwordResetToken.count()).toBe(1);
    });

    it('falls back to English for an unsupported locale', async () => {
      await createUser();

      await requestPasswordReset('ana@example.com', {
        locale: 'fr' as unknown as 'en',
        baseUrl: BASE_URL,
      });

      const [mail] = await readOutbox();
      expect(mail.subject).toBe(passwordResetEmail('en', 'x').subject);
    });

    it.each([['not a url'], ['javascript:alert(1)'], ['ftp://todonow.test']])(
      'refuses a base URL that is not http(s): %s',
      async (baseUrl) => {
        await createUser();

        await expect(
          requestPasswordReset('ana@example.com', { locale: 'en', baseUrl }),
        ).rejects.toThrow(/baseUrl/);
        expect(await db.passwordResetToken.count()).toBe(0);
      },
    );
  });

  describe('resetPassword', () => {
    it('sets the new password: the new one logs in, the old one no longer does', async () => {
      const userId = await createUser();
      const token = await requestToken();

      expect(await resetPassword(token, NEW_PASSWORD)).toEqual({ ok: true });

      expect(await authenticate('ana@example.com', NEW_PASSWORD)).toBe(userId);
      expect(await authenticate('ana@example.com', OLD_PASSWORD)).toBeNull();
      const user = await db.user.findUniqueOrThrow({ where: { id: userId } });
      expect(user.passwordHash).toMatch(/^\$argon2id\$/);
      const row = await db.passwordResetToken.findFirstOrThrow();
      expect(row.usedAt).not.toBeNull();
    });

    it('keeps existing sessions of the user logged in', async () => {
      const userId = await createUser();
      const sessionToken = await createSession(userId, 'Other phone');
      const token = await requestToken();

      expect(await resetPassword(token, NEW_PASSWORD)).toEqual({ ok: true });

      expect(await getSessionUser(sessionToken)).toMatchObject({ id: userId });
      expect(await db.session.count()).toBe(1);
    });

    it('refuses a password that breaks the rule, keeps the old password and the token usable', async () => {
      const userId = await createUser();
      const token = await requestToken();

      expect(await resetPassword(token, 'short')).toEqual({
        ok: false,
        error: 'PASSWORD_RULE',
        failures: expect.arrayContaining(['tooShort']),
      });

      expect(await authenticate('ana@example.com', OLD_PASSWORD)).toBe(userId);
      expect((await db.passwordResetToken.findFirstOrThrow()).usedAt).toBeNull();
      expect(await resetPassword(token, NEW_PASSWORD)).toEqual({ ok: true });
    });

    it('refuses a token that was already used', async () => {
      const userId = await createUser();
      const token = await requestToken();
      await resetPassword(token, NEW_PASSWORD);

      expect(await resetPassword(token, 'An0ther!Pass')).toEqual({
        ok: false,
        error: 'INVALID_TOKEN',
      });
      expect(await authenticate('ana@example.com', NEW_PASSWORD)).toBe(userId);
    });

    it('lets only one of two concurrent resets with the same token succeed', async () => {
      const userId = await createUser();
      const token = await requestToken();
      const passwords = [NEW_PASSWORD, 'An0ther!Pass'];

      // Both calls pass the token pre-check while argon2 hashes, so only the atomic claim in the
      // transaction can stop the second one.
      const results = await Promise.all(
        passwords.map((password) => resetPassword(token, password)),
      );

      expect(results.filter((result) => result.ok)).toHaveLength(1);
      expect(results).toContainEqual({ ok: false, error: 'INVALID_TOKEN' });
      const winner = passwords[results.findIndex((result) => result.ok)];
      const loser = passwords.find((password) => password !== winner) as string;
      expect(await authenticate('ana@example.com', winner)).toBe(userId);
      expect(await authenticate('ana@example.com', loser)).toBeNull();
      expect(await authenticate('ana@example.com', OLD_PASSWORD)).toBeNull();
    });

    it('refuses an expired token and keeps the old password', async () => {
      const userId = await createUser();
      const token = await requestToken();
      await db.passwordResetToken.updateMany({
        data: { expiresAt: new Date(Date.now() - 1000) },
      });

      expect(await resetPassword(token, NEW_PASSWORD)).toEqual({
        ok: false,
        error: 'INVALID_TOKEN',
      });
      expect(await authenticate('ana@example.com', OLD_PASSWORD)).toBe(userId);
    });

    it.each([
      ['an unknown token', 'A'.repeat(43)],
      ['a malformed token', 'not a token'],
      ['an empty token', ''],
      ['a non-string token', 42],
    ])('refuses %s', async (_label, token) => {
      await createUser();
      await requestToken();

      expect(await resetPassword(token as unknown as string, NEW_PASSWORD)).toEqual({
        ok: false,
        error: 'INVALID_TOKEN',
      });
    });
  });
});
