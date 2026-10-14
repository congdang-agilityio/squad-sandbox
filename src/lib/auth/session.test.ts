// @vitest-environment node
import { createHash } from 'node:crypto';
import { db, resetDatabase } from '@/__tests__/helpers/db';
import {
  createSession,
  getSessionUser,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
} from '@/lib/auth/session';

const HOUR_MS = 60 * 60 * 1000;

async function createUser(): Promise<string> {
  const user = await db.user.create({
    data: {
      email: 'ana@example.com',
      passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$c2FsdA$aGFzaA',
      displayName: 'Ana',
      privacyNoticeAgreedAt: new Date(),
    },
  });
  return user.id;
}

describe('session', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('creates a 32-byte base64url token and stores only its SHA-256 hash', async () => {
    const userId = await createUser();

    const token = await createSession(userId, 'Phone A');

    expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(Buffer.from(token, 'base64url')).toHaveLength(32);
    const sessions = await db.session.findMany();
    expect(sessions).toHaveLength(1);
    expect(sessions[0].tokenHash).not.toBe(token);
    expect(sessions[0].tokenHash).not.toContain(token);
    expect(sessions[0].tokenHash).toBe(createHash('sha256').update(token).digest('hex'));
    expect(sessions[0].userId).toBe(userId);
    expect(sessions[0].userAgent).toBe('Phone A');
  });

  it('creates a different token each time', async () => {
    const userId = await createUser();

    expect(await createSession(userId, null)).not.toBe(await createSession(userId, null));
  });

  it('two logins for one user create two sessions that both resolve to the user', async () => {
    const userId = await createUser();

    const phoneA = await createSession(userId, 'Phone A');
    const phoneB = await createSession(userId, 'Phone B');

    expect(await db.session.count({ where: { userId } })).toBe(2);
    expect(await getSessionUser(phoneA)).toMatchObject({ id: userId, email: 'ana@example.com' });
    expect(await getSessionUser(phoneB)).toMatchObject({ id: userId, displayName: 'Ana' });
  });

  it('does not return the password hash with the user', async () => {
    const token = await createSession(await createUser(), null);

    expect(await getSessionUser(token)).not.toHaveProperty('passwordHash');
  });

  it('caps a long user agent', async () => {
    const userId = await createUser();

    await createSession(userId, 'x'.repeat(2000));

    expect((await db.session.findFirstOrThrow()).userAgent).toHaveLength(512);
  });

  it('resolves an unknown token to null', async () => {
    await createSession(await createUser(), null);

    const unknown = Buffer.alloc(32, 7).toString('base64url');
    expect(await getSessionUser(unknown)).toBeNull();
  });

  it.each([
    ['empty', ''],
    ['too short', 'abc'],
    ['bad characters', '!'.repeat(43)],
    ['too long', 'a'.repeat(44)],
    ['non-string', 42],
    ['undefined', undefined],
  ])('resolves a malformed token (%s) to null', async (_label, token) => {
    await createSession(await createUser(), null);

    expect(await getSessionUser(token as unknown as string)).toBeNull();
  });

  it('updates lastUsedAt when it is older than one hour', async () => {
    const token = await createSession(await createUser(), null);
    const old = new Date(Date.now() - 2 * HOUR_MS);
    await db.session.updateMany({ data: { lastUsedAt: old } });

    await getSessionUser(token);

    const { lastUsedAt } = await db.session.findFirstOrThrow();
    expect(lastUsedAt.getTime()).toBeGreaterThan(Date.now() - 60 * 1000);
  });

  it('does not update lastUsedAt more than once per hour', async () => {
    const token = await createSession(await createUser(), null);
    const recent = new Date(Date.now() - 30 * 60 * 1000);
    await db.session.updateMany({ data: { lastUsedAt: recent } });

    await getSessionUser(token);

    const { lastUsedAt } = await db.session.findFirstOrThrow();
    expect(lastUsedAt.getTime()).toBe(recent.getTime());
  });

  it('has cookie options for a long-lived httpOnly lax cookie', () => {
    expect(SESSION_COOKIE_NAME).toBe('session');
    expect(sessionCookieOptions()).toEqual({
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 400 * 24 * 60 * 60,
    });
  });

  it('marks the cookie secure in production', () => {
    vi.stubEnv('NODE_ENV', 'production');

    expect(sessionCookieOptions().secure).toBe(true);
  });
});
