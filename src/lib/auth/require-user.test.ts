// @vitest-environment node
import { getCurrentUser } from '@/lib/auth/current-user';
import { requireUser } from '@/lib/auth/require-user';

vi.mock('@/lib/auth/current-user', () => ({ getCurrentUser: vi.fn() }));
vi.mock('next/navigation', () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT ${url}`);
  }),
}));

const { redirect } = await import('next/navigation');

describe('requireUser', () => {
  beforeEach(() => {
    vi.mocked(getCurrentUser).mockReset();
    vi.mocked(redirect).mockClear();
  });

  it('redirects to /login when nobody is logged in', async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(null);

    await expect(requireUser()).rejects.toThrow('NEXT_REDIRECT /login');
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('returns the logged-in user', async () => {
    const user = { id: 'u1', email: 'ana@example.com', displayName: 'Ana' };
    vi.mocked(getCurrentUser).mockResolvedValue(user);

    expect(await requireUser()).toEqual(user);
    expect(redirect).not.toHaveBeenCalled();
  });
});
