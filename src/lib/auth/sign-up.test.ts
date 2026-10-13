// @vitest-environment node
import { Prisma } from '@prisma/client';
import { db, resetDatabase } from '@/__tests__/helpers/db';
import { verifyPassword } from '@/lib/auth/password-hash';
import { signUp, type SignUpInput } from '@/lib/auth/sign-up';

const PASSWORD = 'Str0ng!Pass';

const valid: SignUpInput = {
  email: 'ana@example.com',
  password: PASSWORD,
  displayName: 'Ana',
  agreedToPrivacyNotice: true,
};

describe('signUp', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('creates a user whose stored hash verifies the password', async () => {
    const before = Date.now();

    const result = await signUp({ ...valid, email: '  Ana@Example.COM ', displayName: '  Ana  ' });

    expect(result).toEqual({ ok: true, userId: expect.any(String) });
    const user = await db.user.findUniqueOrThrow({
      where: { id: (result as { userId: string }).userId },
    });
    expect(user.email).toBe('ana@example.com');
    expect(user.displayName).toBe('Ana');
    expect(user.passwordHash).toMatch(/^\$argon2id\$/);
    expect(await verifyPassword(user.passwordHash, PASSWORD)).toBe(true);
    expect(user.privacyNoticeAgreedAt.getTime()).toBeGreaterThanOrEqual(before - 1000);
    expect(user.privacyNoticeAgreedAt.getTime()).toBeLessThanOrEqual(Date.now() + 1000);
  });

  it('stores no field equal to or containing the plain password', async () => {
    const result = await signUp(valid);
    expect(result.ok).toBe(true);

    const rows = await db.$queryRaw<Record<string, unknown>[]>`SELECT * FROM "User"`;
    expect(rows).toHaveLength(1);
    for (const value of Object.values(rows[0])) {
      expect(String(value)).not.toContain(PASSWORD);
    }
  });

  it('refuses without agreement and creates no user', async () => {
    const result = await signUp({ ...valid, agreedToPrivacyNotice: false });

    expect(result).toEqual({ ok: false, error: 'AGREEMENT_REQUIRED' });
    expect(await db.user.count()).toBe(0);
  });

  it.each(['ana@example.com', 'ANA@Example.com', '  ana@example.com  '])(
    'refuses an email already registered (%j) and keeps the user count',
    async (email) => {
      expect((await signUp(valid)).ok).toBe(true);

      const result = await signUp({ ...valid, email, displayName: 'Other' });

      expect(result).toEqual({ ok: false, error: 'EMAIL_TAKEN' });
      expect(await db.user.count()).toBe(1);
    },
  );

  it('maps a concurrent duplicate (unique violation P2002) to EMAIL_TAKEN', async () => {
    const violation = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: Prisma.prismaVersion.client,
    });
    vi.spyOn(db.user, 'create').mockRejectedValueOnce(violation);

    const result = await signUp(valid);

    expect(result).toEqual({ ok: false, error: 'EMAIL_TAKEN' });
  });

  it('rethrows unexpected database errors', async () => {
    vi.spyOn(db.user, 'create').mockRejectedValueOnce(new Error('connection lost'));

    await expect(signUp(valid)).rejects.toThrow('connection lost');
  });

  it('refuses a password that breaks the rule with the failures and creates no user', async () => {
    const result = await signUp({ ...valid, password: 'short' });

    expect(result).toEqual({
      ok: false,
      error: 'PASSWORD_RULE',
      failures: ['tooShort', 'noUppercase', 'noDigit', 'noSymbol'],
    });
    expect(await db.user.count()).toBe(0);
  });

  it.each([
    ['empty email', { email: '   ' }],
    ['email without @', { email: 'ana.example.com' }],
    ['email without domain', { email: 'ana@' }],
    ['email without local part', { email: '@example.com' }],
    ['email with inner space', { email: 'an a@example.com' }],
    ['email with two @', { email: 'a@b@example.com' }],
    ['empty display name', { displayName: '   ' }],
    ['non-string email', { email: 42 }],
    ['non-string display name', { displayName: null }],
    ['non-string password', { password: undefined }],
  ])('refuses invalid input (%s) and creates no user', async (_label, override) => {
    const result = await signUp({ ...valid, ...override } as unknown as SignUpInput);

    expect(result).toEqual({ ok: false, error: 'INVALID_INPUT' });
    expect(await db.user.count()).toBe(0);
  });

  it('checks input, then agreement, then password rule, then email taken', async () => {
    expect((await signUp(valid)).ok).toBe(true);

    expect(
      await signUp({ email: 'bad', password: 'x', displayName: 'A', agreedToPrivacyNotice: false }),
    ).toEqual({ ok: false, error: 'INVALID_INPUT' });
    expect(await signUp({ ...valid, password: 'x', agreedToPrivacyNotice: false })).toEqual({
      ok: false,
      error: 'AGREEMENT_REQUIRED',
    });
    expect(await signUp({ ...valid, password: 'x' })).toMatchObject({
      ok: false,
      error: 'PASSWORD_RULE',
    });
    expect(await db.user.count()).toBe(1);
  });

  it('treats a non-boolean agreement as not agreed', async () => {
    const result = await signUp({
      ...valid,
      agreedToPrivacyNotice: 'yes',
    } as unknown as SignUpInput);

    expect(result).toEqual({ ok: false, error: 'AGREEMENT_REQUIRED' });
    expect(await db.user.count()).toBe(0);
  });
});
