// @vitest-environment node
import { db, resetDatabase } from '@/__tests__/helpers/db';
import { authenticate } from '@/lib/auth/login';
import * as passwordHash from '@/lib/auth/password-hash';
import { signUp } from '@/lib/auth/sign-up';

vi.mock('@/lib/auth/password-hash', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/auth/password-hash')>();
  return { ...original, verifyPassword: vi.fn(original.verifyPassword) };
});

const PASSWORD = 'Str0ng!Pass';

async function createUser(email = 'ana@example.com'): Promise<string> {
  const result = await signUp({
    email,
    password: PASSWORD,
    displayName: 'Ana',
    agreedToPrivacyNotice: true,
  });
  if (!result.ok) throw new Error('sign-up failed in test setup');
  return result.userId;
}

describe('authenticate', () => {
  beforeEach(async () => {
    await resetDatabase();
    vi.mocked(passwordHash.verifyPassword).mockClear();
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('returns the user id for the correct email and password', async () => {
    const userId = await createUser();

    expect(await authenticate('ana@example.com', PASSWORD)).toBe(userId);
  });

  it('trims and lowercases the email', async () => {
    const userId = await createUser();

    expect(await authenticate('  ANA@Example.com ', PASSWORD)).toBe(userId);
  });

  it('returns null for a wrong password', async () => {
    await createUser();

    expect(await authenticate('ana@example.com', 'Wr0ng!Pass')).toBeNull();
    expect(passwordHash.verifyPassword).toHaveBeenCalledTimes(1);
  });

  it('returns null for an unknown email and still verifies against a dummy argon2id hash', async () => {
    await createUser();

    expect(await authenticate('nobody@example.com', PASSWORD)).toBeNull();
    expect(passwordHash.verifyPassword).toHaveBeenCalledTimes(1);
    expect(passwordHash.verifyPassword).toHaveBeenCalledWith(
      expect.stringMatching(/^\$argon2id\$/),
      PASSWORD,
    );
  });

  it('does not log in with the dummy hash password itself', async () => {
    expect(
      await authenticate('nobody@example.com', 'todonow-dummy-password-not-a-real-account'),
    ).toBeNull();
  });

  it.each([
    ['non-string email', 42, PASSWORD],
    ['non-string password', 'ana@example.com', undefined],
    ['empty email', '   ', PASSWORD],
    ['empty password', 'ana@example.com', ''],
  ])('returns null for invalid input (%s)', async (_label, email, password) => {
    await createUser();

    expect(await authenticate(email as unknown as string, password as unknown as string)).toBe(
      null,
    );
  });
});
