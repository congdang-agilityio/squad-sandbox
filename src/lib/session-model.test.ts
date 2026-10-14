// @vitest-environment node
import { Prisma } from '@prisma/client';
import { db, resetDatabase } from '@/__tests__/helpers/db';

const newUser = {
  email: 'ana@example.com',
  passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$c2FsdA$aGFzaA',
  displayName: 'Ana',
  privacyNoticeAgreedAt: new Date('2026-10-13T08:00:00.000Z'),
};

describe('db (Session table)', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('stores two sessions for one user with every column', async () => {
    const user = await db.user.create({ data: newUser });

    await db.session.create({
      data: { userId: user.id, tokenHash: 'hash-phone-a', userAgent: 'Phone A' },
    });
    await db.session.create({ data: { userId: user.id, tokenHash: 'hash-phone-b' } });

    const sessions = await db.session.findMany({
      where: { userId: user.id },
      orderBy: { tokenHash: 'asc' },
    });
    expect(sessions).toEqual([
      {
        id: expect.stringMatching(/^c[a-z0-9]{24}$/),
        userId: user.id,
        tokenHash: 'hash-phone-a',
        createdAt: expect.any(Date),
        lastUsedAt: expect.any(Date),
        userAgent: 'Phone A',
      },
      {
        id: expect.stringMatching(/^c[a-z0-9]{24}$/),
        userId: user.id,
        tokenHash: 'hash-phone-b',
        createdAt: expect.any(Date),
        lastUsedAt: expect.any(Date),
        userAgent: null,
      },
    ]);
  });

  it('reaches the sessions through the user relation', async () => {
    const user = await db.user.create({
      data: { ...newUser, sessions: { create: [{ tokenHash: 'h1' }, { tokenHash: 'h2' }] } },
      include: { sessions: true },
    });

    expect(user.sessions).toHaveLength(2);
  });

  it('rejects a duplicate tokenHash', async () => {
    const user = await db.user.create({ data: newUser });
    await db.session.create({ data: { userId: user.id, tokenHash: 'same-hash' } });

    const duplicate = db.session.create({ data: { userId: user.id, tokenHash: 'same-hash' } });

    await expect(duplicate).rejects.toBeInstanceOf(Prisma.PrismaClientKnownRequestError);
    await expect(
      db.session.create({ data: { userId: user.id, tokenHash: 'same-hash' } }),
    ).rejects.toMatchObject({ code: 'P2002' });
    expect(await db.session.count()).toBe(1);
  });

  it('rejects a session for a user that does not exist', async () => {
    await expect(
      db.session.create({ data: { userId: 'cnotarealuser0000000000000', tokenHash: 'h' } }),
    ).rejects.toMatchObject({ code: 'P2003' });
  });

  it('deletes the sessions when the user is deleted', async () => {
    const user = await db.user.create({ data: newUser });
    await db.session.createMany({
      data: [
        { userId: user.id, tokenHash: 'hash-1' },
        { userId: user.id, tokenHash: 'hash-2' },
      ],
    });

    await db.user.delete({ where: { id: user.id } });

    expect(await db.session.count()).toBe(0);
  });

  it('has no expiry column (a login lasts until logout or account deletion)', async () => {
    const columns = await db.$queryRaw<{ column_name: string }[]>`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'Session'
      ORDER BY column_name`;

    expect(columns.map((c) => c.column_name)).toEqual([
      'createdAt',
      'id',
      'lastUsedAt',
      'tokenHash',
      'userAgent',
      'userId',
    ]);
  });

  it('indexes userId', async () => {
    const indexes = await db.$queryRaw<{ indexdef: string }[]>`
      SELECT indexdef FROM pg_indexes
      WHERE schemaname = 'public' AND tablename = 'Session'`;

    expect(indexes.map((i) => i.indexdef)).toContainEqual(
      expect.stringMatching(/ON public\."Session" USING btree \("userId"\)$/),
    );
  });
});
