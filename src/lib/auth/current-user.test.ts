// @vitest-environment node
import { getCurrentUser } from '@/lib/auth/current-user';
import { getSessionUser, SESSION_COOKIE_NAME } from '@/lib/auth/session';

const cookieStore = { get: vi.fn() };

vi.mock('next/headers', () => ({ cookies: vi.fn(async () => cookieStore) }));
vi.mock('@/lib/auth/session', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/auth/session')>()),
  getSessionUser: vi.fn(),
}));

const user = { id: 'u1', email: 'ana@example.com', displayName: 'Ana' };

describe('getCurrentUser', () => {
  beforeEach(() => {
    cookieStore.get.mockReset();
    vi.mocked(getSessionUser).mockReset();
  });

  it('returns the user of the session cookie', async () => {
    cookieStore.get.mockReturnValue({ name: SESSION_COOKIE_NAME, value: 'token-1' });
    vi.mocked(getSessionUser).mockResolvedValue(user);

    expect(await getCurrentUser()).toEqual(user);
    expect(cookieStore.get).toHaveBeenCalledWith(SESSION_COOKIE_NAME);
    expect(getSessionUser).toHaveBeenCalledWith('token-1');
  });

  it('returns null without a session cookie', async () => {
    cookieStore.get.mockReturnValue(undefined);

    expect(await getCurrentUser()).toBeNull();
    expect(getSessionUser).not.toHaveBeenCalled();
  });

  it('returns null when the session is unknown', async () => {
    cookieStore.get.mockReturnValue({ name: SESSION_COOKIE_NAME, value: 'gone' });
    vi.mocked(getSessionUser).mockResolvedValue(null);

    expect(await getCurrentUser()).toBeNull();
  });
});
