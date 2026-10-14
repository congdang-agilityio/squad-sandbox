// @vitest-environment node
import { db, resetDatabase } from '@/__tests__/helpers/db';
import { createTask, listTasks, type CreateTaskInput } from '@/lib/tasks/tasks';

let userCount = 0;

async function createUser(name = 'Ana') {
  userCount += 1;
  return db.user.create({
    data: {
      email: `user${userCount}@example.com`,
      passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$c2FsdA$aGFzaA',
      displayName: name,
      privacyNoticeAgreedAt: new Date('2026-10-13T08:00:00.000Z'),
    },
  });
}

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  await resetDatabase();
  await db.$disconnect();
});

describe('createTask', () => {
  it('saves a task with a title and a due date only, priority NORMAL and no time', async () => {
    const owner = await createUser();

    const result = await createTask(owner.id, { title: '  Buy milk  ', dueDate: '2026-10-20' });

    expect(result).toEqual({
      ok: true,
      task: {
        id: expect.any(String),
        title: 'Buy milk',
        dueDate: '2026-10-20',
        dueTime: null,
        priority: 'NORMAL',
      },
    });
    const stored = await db.task.findMany();
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({
      ownerId: owner.id,
      title: 'Buy milk',
      dueDate: new Date('2026-10-20T00:00:00.000Z'),
      dueTime: null,
      priority: 'NORMAL',
    });
  });

  it('saves the due time when given', async () => {
    const owner = await createUser();

    const result = await createTask(owner.id, {
      title: 'Dentist',
      dueDate: '2026-12-31',
      dueTime: '23:59',
    });

    expect(result).toMatchObject({
      ok: true,
      task: { dueDate: '2026-12-31', dueTime: '23:59', priority: 'NORMAL' },
    });
    const stored = await db.task.findFirstOrThrow();
    expect(stored.dueDate).toEqual(new Date('2026-12-31T00:00:00.000Z'));
    expect(stored.dueTime).toBe('23:59');
  });

  it.each([null, ''])('treats the due time %j as not given', async (dueTime) => {
    const owner = await createUser();

    const result = await createTask(owner.id, {
      title: 'Call mum',
      dueDate: '2026-10-20',
      dueTime,
    });

    expect(result).toMatchObject({ ok: true, task: { dueTime: null } });
  });

  it('accepts a title of exactly 200 characters', async () => {
    const owner = await createUser();

    const result = await createTask(owner.id, { title: 'a'.repeat(200), dueDate: '2026-10-20' });

    expect(result.ok).toBe(true);
  });

  it('accepts 29 February in a leap year', async () => {
    const owner = await createUser();

    const result = await createTask(owner.id, { title: 'Leap', dueDate: '2028-02-29' });

    expect(result).toMatchObject({ ok: true, task: { dueDate: '2028-02-29' } });
  });

  it.each<[string, Partial<Record<keyof CreateTaskInput, unknown>>, string[]]>([
    ['empty title', { title: '' }, ['TITLE_REQUIRED']],
    ['blank title', { title: '  \t ' }, ['TITLE_REQUIRED']],
    ['missing title', { title: undefined }, ['TITLE_REQUIRED']],
    ['empty due date', { dueDate: '' }, ['DUE_DATE_REQUIRED']],
    ['blank due date', { dueDate: '   ' }, ['DUE_DATE_REQUIRED']],
    ['missing due date', { dueDate: undefined }, ['DUE_DATE_REQUIRED']],
    ['null due date', { dueDate: null }, ['DUE_DATE_REQUIRED']],
    ['both missing', { title: ' ', dueDate: '' }, ['TITLE_REQUIRED', 'DUE_DATE_REQUIRED']],
  ])('refuses %s and creates nothing', async (_label, override, errors) => {
    const owner = await createUser();

    const result = await createTask(owner.id, {
      title: 'Buy milk',
      dueDate: '2026-10-20',
      ...override,
    } as CreateTaskInput);

    expect(result).toEqual({ ok: false, errors });
    expect(await db.task.count()).toBe(0);
  });

  it.each<[string, Partial<Record<keyof CreateTaskInput, unknown>>]>([
    ['title over 200 characters', { title: 'a'.repeat(201) }],
    ['non-string title', { title: 42 }],
    ['date not YYYY-MM-DD', { dueDate: '20/10/2026' }],
    ['date with a time', { dueDate: '2026-10-20T10:00:00Z' }],
    ['date that does not exist', { dueDate: '2026-02-30' }],
    ['29 February in a common year', { dueDate: '2027-02-29' }],
    ['month 13', { dueDate: '2026-13-01' }],
    ['year 0000', { dueDate: '0000-01-01' }],
    ['non-string date', { dueDate: 20261020 }],
    ['time 24:00', { dueTime: '24:00' }],
    ['time 09:60', { dueTime: '09:60' }],
    ['time without leading zero', { dueTime: '9:00' }],
    ['time with seconds', { dueTime: '09:00:00' }],
    ['non-string time', { dueTime: 900 }],
  ])('refuses a %s as INVALID_INPUT and creates nothing', async (_label, override) => {
    const owner = await createUser();

    const result = await createTask(owner.id, {
      title: 'Buy milk',
      dueDate: '2026-10-20',
      ...override,
    } as CreateTaskInput);

    expect(result).toEqual({ ok: false, errors: ['INVALID_INPUT'] });
    expect(await db.task.count()).toBe(0);
  });

  it('refuses input that is not an object as INVALID_INPUT', async () => {
    const owner = await createUser();

    const result = await createTask(owner.id, null as unknown as CreateTaskInput);

    expect(result).toEqual({ ok: false, errors: ['INVALID_INPUT'] });
    expect(await db.task.count()).toBe(0);
  });
});

describe('listTasks', () => {
  it('returns an empty list for a user without tasks', async () => {
    const owner = await createUser();

    expect(await listTasks(owner.id)).toEqual([]);
  });

  it("returns only the owner's tasks, never another user's", async () => {
    const ana = await createUser('Ana');
    const binh = await createUser('Binh');
    await createTask(ana.id, { title: 'Ana task', dueDate: '2026-10-20' });
    await createTask(binh.id, { title: 'Binh task', dueDate: '2026-10-20', dueTime: '08:00' });

    const anaTasks = await listTasks(ana.id);
    const binhTasks = await listTasks(binh.id);

    expect(anaTasks).toEqual([
      {
        id: expect.any(String),
        title: 'Ana task',
        dueDate: '2026-10-20',
        dueTime: null,
        priority: 'NORMAL',
      },
    ]);
    expect(binhTasks.map((t) => t.title)).toEqual(['Binh task']);
  });

  it('orders by due date, then due time (no time last), then creation time', async () => {
    const owner = await createUser();
    const add = async (title: string, dueDate: string, dueTime?: string) =>
      db.task.create({
        data: {
          ownerId: owner.id,
          title,
          dueDate: new Date(`${dueDate}T00:00:00.000Z`),
          dueTime: dueTime ?? null,
        },
      });
    // Explicit creation times so the tie-break does not depend on insert timing.
    await add('Later day', '2026-10-21', '07:00');
    await add('No time, created first', '2026-10-20');
    await add('Evening', '2026-10-20', '19:30');
    await add('Morning', '2026-10-20', '09:05');
    await add('No time, created second', '2026-10-20');
    await add('Earlier day', '2026-10-19');
    const created = await db.task.findMany({ orderBy: { title: 'asc' } });
    const base = Date.parse('2026-10-14T00:00:00.000Z');
    const order = [
      'Later day',
      'No time, created first',
      'Evening',
      'Morning',
      'No time, created second',
      'Earlier day',
    ];
    for (const task of created) {
      await db.task.update({
        where: { id: task.id },
        data: { createdAt: new Date(base + order.indexOf(task.title) * 1000) },
      });
    }

    const titles = (await listTasks(owner.id)).map((t) => t.title);

    expect(titles).toEqual([
      'Earlier day',
      'Morning',
      'Evening',
      'No time, created first',
      'No time, created second',
      'Later day',
    ]);
  });
});
