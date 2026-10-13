// @vitest-environment node
import { Prisma } from '@prisma/client';
import { db, resetDatabase } from '@/__tests__/helpers/db';

const newUser = {
  email: 'ana@example.com',
  passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$c2FsdA$aGFzaA',
  displayName: 'Ana',
  privacyNoticeAgreedAt: new Date('2026-10-13T08:00:00.000Z'),
};

describe('db (User table)', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('creates a user and reads it back with every column', async () => {
    const created = await db.user.create({ data: newUser });

    const found = await db.user.findUnique({ where: { email: 'ana@example.com' } });

    expect(found).toEqual({
      id: created.id,
      ...newUser,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(found?.id).toMatch(/^c[a-z0-9]{24}$/);
  });

  it('rejects a second user with the same email', async () => {
    await db.user.create({ data: newUser });

    const duplicate = db.user.create({ data: { ...newUser, displayName: 'Other' } });

    await expect(duplicate).rejects.toBeInstanceOf(Prisma.PrismaClientKnownRequestError);
    await expect(db.user.create({ data: newUser })).rejects.toMatchObject({ code: 'P2002' });
    expect(await db.user.count()).toBe(1);
  });

  it('rejects an email that is not stored lowercased', async () => {
    await expect(
      db.user.create({ data: { ...newUser, email: 'Ana@Example.com' } }),
    ).rejects.toThrow(/User_email_lowercase_check/);
    expect(await db.user.count()).toBe(0);
  });

  it('requires the privacy notice agreement time', async () => {
    const withoutAgreement: Partial<typeof newUser> = { ...newUser };
    delete withoutAgreement.privacyNoticeAgreedAt;

    await expect(
      db.user.create({ data: withoutAgreement as typeof newUser }),
    ).rejects.toBeInstanceOf(Prisma.PrismaClientValidationError);
  });
});
