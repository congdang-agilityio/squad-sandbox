// @vitest-environment node
import { db, resetDatabase } from '@/__tests__/helpers/db';

const newUser = {
  email: 'ana@example.com',
  passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$c2FsdA$aGFzaA',
  displayName: 'Ana',
  privacyNoticeAgreedAt: new Date('2026-10-13T08:00:00.000Z'),
};

async function createOwner() {
  return db.user.create({ data: newUser });
}

describe('db (Task table)', () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('stores a task without priority or time as NORMAL with a null time', async () => {
    const owner = await createOwner();

    const task = await db.task.create({
      data: { ownerId: owner.id, title: 'Buy milk', dueDate: new Date('2026-10-20') },
    });

    expect(task).toEqual({
      id: expect.stringMatching(/^c[a-z0-9]{24}$/),
      ownerId: owner.id,
      title: 'Buy milk',
      dueDate: new Date('2026-10-20T00:00:00.000Z'),
      dueTime: null,
      priority: 'NORMAL',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('stores a due time and an explicit priority', async () => {
    const owner = await createOwner();

    const task = await db.task.create({
      data: {
        ownerId: owner.id,
        title: 'Dentist',
        dueDate: new Date('2026-10-21'),
        dueTime: '23:59',
        priority: 'HIGH',
      },
    });

    expect(task).toMatchObject({ dueTime: '23:59', priority: 'HIGH' });
  });

  it('keeps only the date part of dueDate', async () => {
    const owner = await createOwner();

    const task = await db.task.create({
      data: { ownerId: owner.id, title: 'Pay rent', dueDate: new Date('2026-10-22T15:30:00Z') },
    });

    expect(task.dueDate).toEqual(new Date('2026-10-22T00:00:00.000Z'));
  });

  it.each(['', '   ', '\t \n'])('refuses the blank title %j', async (title) => {
    const owner = await createOwner();

    await expect(
      db.task.create({ data: { ownerId: owner.id, title, dueDate: new Date('2026-10-20') } }),
    ).rejects.toThrow(/Task_title_not_blank_check/);
    expect(await db.task.count()).toBe(0);
  });

  it.each(['24:00', '9:00', '09:60', '0900', '09:00:00', 'ab:cd', ''])(
    'refuses the malformed dueTime %j',
    async (dueTime) => {
      const owner = await createOwner();

      await expect(
        db.task.create({
          data: { ownerId: owner.id, title: 'Call mum', dueDate: new Date('2026-10-20'), dueTime },
        }),
      ).rejects.toThrow(/Task_dueTime_format_check/);
      expect(await db.task.count()).toBe(0);
    },
  );

  it.each(['00:00', '09:05', '19:30', '23:59'])('accepts the dueTime %j', async (dueTime) => {
    const owner = await createOwner();

    const task = await db.task.create({
      data: { ownerId: owner.id, title: 'Call mum', dueDate: new Date('2026-10-20'), dueTime },
    });

    expect(task.dueTime).toBe(dueTime);
  });

  it('rejects a task for a user that does not exist', async () => {
    await expect(
      db.task.create({
        data: {
          ownerId: 'cnotarealuser0000000000000',
          title: 'Ghost',
          dueDate: new Date('2026-10-20'),
        },
      }),
    ).rejects.toMatchObject({ code: 'P2003' });
  });

  it('reaches the tasks through the user relation', async () => {
    const owner = await db.user.create({
      data: {
        ...newUser,
        tasks: {
          create: [
            { title: 'One', dueDate: new Date('2026-10-20') },
            { title: 'Two', dueDate: new Date('2026-10-21') },
          ],
        },
      },
      include: { tasks: true },
    });

    expect(owner.tasks).toHaveLength(2);
  });

  it('deletes the tasks when the user is deleted', async () => {
    const owner = await createOwner();
    await db.task.createMany({
      data: [
        { ownerId: owner.id, title: 'One', dueDate: new Date('2026-10-20') },
        { ownerId: owner.id, title: 'Two', dueDate: new Date('2026-10-21') },
      ],
    });

    await db.user.delete({ where: { id: owner.id } });

    expect(await db.task.count()).toBe(0);
  });

  it('stores dueDate as a date column and indexes ownerId', async () => {
    const columns = await db.$queryRaw<{ column_name: string; data_type: string }[]>`
      SELECT column_name, data_type FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'Task' AND column_name = 'dueDate'`;
    const indexes = await db.$queryRaw<{ indexdef: string }[]>`
      SELECT indexdef FROM pg_indexes
      WHERE schemaname = 'public' AND tablename = 'Task'`;

    expect(columns).toEqual([{ column_name: 'dueDate', data_type: 'date' }]);
    expect(indexes.map((i) => i.indexdef)).toContainEqual(
      expect.stringMatching(/ON public\."Task" USING btree \("ownerId"\)$/),
    );
  });
});
