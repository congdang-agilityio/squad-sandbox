// @vitest-environment node
import { db, resetDatabase } from '@/__tests__/helpers/db';
import { getCurrentUser } from '@/lib/auth/current-user';
import { POST } from './route';

vi.mock('@/lib/auth/current-user', () => ({ getCurrentUser: vi.fn() }));

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

async function logIn(name = 'Ana') {
  const user = await createUser(name);
  vi.mocked(getCurrentUser).mockResolvedValue({
    id: user.id,
    email: user.email,
    displayName: user.displayName,
  });
  return user;
}

function request(body: unknown, raw = false): Request {
  return new Request('http://localhost/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

const valid = { title: 'Buy milk', dueDate: '2026-10-20' };

describe('POST /api/tasks', () => {
  beforeEach(async () => {
    vi.mocked(getCurrentUser).mockReset();
    await resetDatabase();
  });

  afterAll(async () => {
    await resetDatabase();
    await db.$disconnect();
  });

  it('returns 401 UNAUTHORIZED without a valid session and creates nothing', async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(null);

    const res = await POST(request(valid));

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: 'UNAUTHORIZED' });
    expect(await db.task.count()).toBe(0);
  });

  it('returns 401 before reading the body', async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(null);

    const res = await POST(request('{not json', true));

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: 'UNAUTHORIZED' });
  });

  it('creates the task with default priority NORMAL and no time, returning 201', async () => {
    const user = await logIn();

    const res = await POST(request(valid));

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({
      id: expect.any(String),
      title: 'Buy milk',
      dueDate: '2026-10-20',
      dueTime: null,
      priority: 'NORMAL',
    });
    const stored = await db.task.findFirstOrThrow();
    expect(stored).toMatchObject({ ownerId: user.id, title: 'Buy milk', priority: 'NORMAL' });
  });

  it('saves the optional due time', async () => {
    await logIn();

    const res = await POST(request({ ...valid, dueTime: '18:30' }));

    expect(res.status).toBe(201);
    expect(await res.json()).toMatchObject({ dueDate: '2026-10-20', dueTime: '18:30' });
  });

  it('accepts a null due time as no time', async () => {
    await logIn();

    const res = await POST(request({ ...valid, dueTime: null }));

    expect(res.status).toBe(201);
    expect(await res.json()).toMatchObject({ dueTime: null });
  });

  it('ignores ownerId and priority in the body: the owner is the logged-in user', async () => {
    const ana = await logIn('Ana');
    const binh = await createUser('Binh');

    const res = await POST(request({ ...valid, ownerId: binh.id, priority: 'HIGH' }));

    expect(res.status).toBe(201);
    expect(await res.json()).toMatchObject({ priority: 'NORMAL' });
    const stored = await db.task.findFirstOrThrow();
    expect(stored.ownerId).toBe(ana.id);
    expect(stored.priority).toBe('NORMAL');
    expect(await db.task.count({ where: { ownerId: binh.id } })).toBe(0);
  });

  it('returns 400 INVALID_INPUT for a non-JSON body and creates nothing', async () => {
    await logIn();

    const res = await POST(request('{not json', true));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'INVALID_INPUT' });
    expect(await db.task.count()).toBe(0);
  });

  it.each<[string, unknown]>([
    ['null body', null],
    ['array body', [valid]],
    ['string body', 'Buy milk'],
    ['non-string title', { ...valid, title: 42 }],
    ['array title', { ...valid, title: ['Buy milk'] }],
    ['non-string due date', { ...valid, dueDate: 20261020 }],
    ['non-string due time', { ...valid, dueTime: 900 }],
    ['title over 200 characters', { ...valid, title: 'a'.repeat(201) }],
    ['very long title', { ...valid, title: 'a'.repeat(100_000) }],
    ['due date in the wrong format', { ...valid, dueDate: '20/10/2026' }],
    ['due date that does not exist', { ...valid, dueDate: '2026-02-30' }],
    ['due time in the wrong format', { ...valid, dueTime: '9:00' }],
  ])('returns 400 INVALID_INPUT for a %s and creates nothing', async (_label, body) => {
    await logIn();

    const res = await POST(request(body));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'INVALID_INPUT' });
    expect(await db.task.count()).toBe(0);
  });

  it.each<[string, Record<string, unknown>, string[]]>([
    ['missing title', { dueDate: '2026-10-20' }, ['TITLE_REQUIRED']],
    ['blank title', { ...valid, title: '   ' }, ['TITLE_REQUIRED']],
    ['missing due date', { title: 'Buy milk' }, ['DUE_DATE_REQUIRED']],
    ['empty due date', { ...valid, dueDate: '' }, ['DUE_DATE_REQUIRED']],
    ['both missing', {}, ['TITLE_REQUIRED', 'DUE_DATE_REQUIRED']],
  ])('returns 400 VALIDATION for a %s and creates nothing', async (_label, body, errors) => {
    await logIn();

    const res = await POST(request(body));

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'VALIDATION', errors });
    expect(await db.task.count()).toBe(0);
  });
});
