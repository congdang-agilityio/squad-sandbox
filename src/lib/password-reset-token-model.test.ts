// @vitest-environment node
import { Prisma } from '@prisma/client';
import { db, resetDatabase } from '@/__tests__/helpers/db';

const newUser = {
  email: 'ana@example.com',
  passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$c2FsdA$aGFzaA',
  displayName: 'Ana',
  privacyNoticeAgreedAt: new Date('2026-10-13T08:00:00.000Z'),
};

const expiresAt = new Date('2026-10-14T09:00:00.000Z');

describe('db (PasswordResetToken table)', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('stores a token row with every column', async () => {
    const user = await db.user.create({ data: newUser });

    await db.passwordResetToken.create({
      data: { userId: user.id, tokenHash: 'hash-1', expiresAt },
    });

    expect(await db.passwordResetToken.findMany({ where: { userId: user.id } })).toEqual([
      {
        id: expect.stringMatching(/^c[a-z0-9]{24}$/),
        userId: user.id,
        tokenHash: 'hash-1',
        expiresAt,
        usedAt: null,
        createdAt: expect.any(Date),
      },
    ]);
  });

  it('records when a token was used', async () => {
    const user = await db.user.create({ data: newUser });
    const token = await db.passwordResetToken.create({
      data: { userId: user.id, tokenHash: 'hash-1', expiresAt },
    });
    const usedAt = new Date('2026-10-14T08:30:00.000Z');

    const updated = await db.passwordResetToken.update({
      where: { id: token.id },
      data: { usedAt },
    });

    expect(updated.usedAt).toEqual(usedAt);
  });

  it('reaches the tokens through the user relation', async () => {
    const user = await db.user.create({
      data: {
        ...newUser,
        passwordResetTokens: {
          create: [
            { tokenHash: 'h1', expiresAt },
            { tokenHash: 'h2', expiresAt },
          ],
        },
      },
      include: { passwordResetTokens: true },
    });

    expect(user.passwordResetTokens).toHaveLength(2);
  });

  it('rejects a duplicate tokenHash', async () => {
    const user = await db.user.create({ data: newUser });
    await db.passwordResetToken.create({
      data: { userId: user.id, tokenHash: 'same-hash', expiresAt },
    });

    const duplicate = db.passwordResetToken.create({
      data: { userId: user.id, tokenHash: 'same-hash', expiresAt },
    });

    await expect(duplicate).rejects.toBeInstanceOf(Prisma.PrismaClientKnownRequestError);
    await expect(
      db.passwordResetToken.create({
        data: { userId: user.id, tokenHash: 'same-hash', expiresAt },
      }),
    ).rejects.toMatchObject({ code: 'P2002' });
    expect(await db.passwordResetToken.count()).toBe(1);
  });

  it('rejects a token for a user that does not exist', async () => {
    await expect(
      db.passwordResetToken.create({
        data: { userId: 'cnotarealuser0000000000000', tokenHash: 'h', expiresAt },
      }),
    ).rejects.toMatchObject({ code: 'P2003' });
  });

  it('deletes the tokens when the user is deleted', async () => {
    const user = await db.user.create({ data: newUser });
    await db.passwordResetToken.createMany({
      data: [
        { userId: user.id, tokenHash: 'hash-1', expiresAt },
        { userId: user.id, tokenHash: 'hash-2', expiresAt },
      ],
    });

    await db.user.delete({ where: { id: user.id } });

    expect(await db.passwordResetToken.count()).toBe(0);
  });

  it('has exactly the expected columns (no raw token column)', async () => {
    const columns = await db.$queryRaw<{ column_name: string }[]>`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'PasswordResetToken'
      ORDER BY column_name`;

    expect(columns.map((c) => c.column_name)).toEqual([
      'createdAt',
      'expiresAt',
      'id',
      'tokenHash',
      'usedAt',
      'userId',
    ]);
  });

  it('indexes userId', async () => {
    const indexes = await db.$queryRaw<{ indexdef: string }[]>`
      SELECT indexdef FROM pg_indexes
      WHERE schemaname = 'public' AND tablename = 'PasswordResetToken'`;

    expect(indexes.map((i) => i.indexdef)).toContainEqual(
      expect.stringMatching(/ON public\."PasswordResetToken" USING btree \("userId"\)$/),
    );
  });
});
