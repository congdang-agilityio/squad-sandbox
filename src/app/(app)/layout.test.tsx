import type { ReactElement } from 'react';
import { getCurrentUser } from '@/lib/auth/current-user';
import AppLayout from './layout';

vi.mock('@/lib/auth/current-user', () => ({ getCurrentUser: vi.fn() }));
vi.mock('next/navigation', () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT ${url}`);
  }),
}));

const { redirect } = await import('next/navigation');

describe('(app) layout', () => {
  beforeEach(() => {
    vi.mocked(getCurrentUser).mockReset();
    vi.mocked(redirect).mockClear();
  });

  it('redirects to /login and renders no task content when nobody is logged in', async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(null);

    await expect(AppLayout({ children: <p>task content</p> })).rejects.toThrow(
      'NEXT_REDIRECT /login',
    );
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('renders the page for a logged-in user', async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 'u1',
      email: 'ana@example.com',
      displayName: 'Ana',
    });
    const children = <p>task content</p>;

    const result = (await AppLayout({ children })) as ReactElement<{ children: unknown }>;

    expect(redirect).not.toHaveBeenCalled();
    expect(result.props.children).toBe(children);
  });
});
