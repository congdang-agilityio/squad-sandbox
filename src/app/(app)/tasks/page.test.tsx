import { render, screen } from '@testing-library/react';
import { createTranslator } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { requireUser } from '@/lib/auth/require-user';
import en from '../../../../messages/en.json';
import viMessages from '../../../../messages/vi.json';
import TasksPage from './page';

vi.mock('@/lib/auth/require-user', () => ({ requireUser: vi.fn() }));
vi.mock('next-intl/server', () => ({ getTranslations: vi.fn() }));
// The client component has its own tests; here it only has to be on the page.
vi.mock('./logout-button', () => ({ LogoutButton: () => <button type="button">logout</button> }));

const user = { id: 'u1', email: 'ana@example.com', displayName: 'Ana' };

function withLocale(locale: 'vi' | 'en', messages: typeof en) {
  vi.mocked(getTranslations).mockImplementation((async (namespace: 'tasks') =>
    createTranslator({ locale, messages, namespace })) as unknown as typeof getTranslations);
}

describe('Task list page', () => {
  beforeEach(() => {
    vi.mocked(requireUser).mockReset();
    vi.mocked(getTranslations).mockReset();
  });

  it('renders nothing when nobody is logged in', async () => {
    vi.mocked(requireUser).mockRejectedValue(new Error('NEXT_REDIRECT /login'));
    withLocale('en', en);

    await expect(TasksPage()).rejects.toThrow('NEXT_REDIRECT /login');
    expect(getTranslations).not.toHaveBeenCalled();
  });

  it.each([
    ['vi', viMessages],
    ['en', en],
  ] as const)('shows the %s heading and the empty state', async (locale, messages) => {
    vi.mocked(requireUser).mockResolvedValue(user);
    withLocale(locale, messages);

    render(await TasksPage());

    expect(
      screen.getByRole('heading', { level: 1, name: messages.tasks.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(messages.tasks.empty)).toBeInTheDocument();
  });

  it('shows the log out button', async () => {
    vi.mocked(requireUser).mockResolvedValue(user);
    withLocale('en', en);

    render(await TasksPage());

    expect(screen.getByRole('button', { name: 'logout' })).toBeInTheDocument();
  });

  it('shows "My tasks" in English', () => {
    expect(en.tasks.title).toBe('My tasks');
  });

  it('has the same non-empty tasks keys in Vietnamese and English', () => {
    expect(Object.keys(viMessages.tasks).sort()).toEqual(Object.keys(en.tasks).sort());
    for (const messages of [viMessages.tasks, en.tasks]) {
      for (const text of Object.values(messages)) {
        expect(text.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
