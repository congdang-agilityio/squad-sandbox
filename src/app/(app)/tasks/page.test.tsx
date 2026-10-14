import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { createTranslator, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { requireUser } from '@/lib/auth/require-user';
import { listTasks, type TaskView } from '@/lib/tasks/tasks';
import en from '../../../../messages/en.json';
import viMessages from '../../../../messages/vi.json';
import TasksPage from './page';

vi.mock('@/lib/auth/require-user', () => ({ requireUser: vi.fn() }));
vi.mock('@/lib/tasks/tasks', () => ({ listTasks: vi.fn() }));
vi.mock('next-intl/server', () => ({ getTranslations: vi.fn() }));
// The client component has its own tests; here it only has to be on the page.
vi.mock('./logout-button', () => ({ LogoutButton: () => <button type="button">logout</button> }));

const user = { id: 'u1', email: 'ana@example.com', displayName: 'Ana' };
const anasTask: TaskView = {
  id: 't1',
  title: 'Pay the electricity bill',
  dueDate: '2026-11-05',
  dueTime: null,
  priority: 'NORMAL',
};

let currentLocale: 'vi' | 'en' = 'en';
let currentMessages: typeof en = en;

function withLocale(locale: 'vi' | 'en', messages: typeof en) {
  currentLocale = locale;
  currentMessages = messages;
  vi.mocked(getTranslations).mockImplementation((async (namespace: 'tasks') =>
    createTranslator({ locale, messages, namespace })) as unknown as typeof getTranslations);
}

// TaskList reads its texts through the next-intl provider, as it does inside the app.
function renderPage(page: ReactElement) {
  render(
    <NextIntlClientProvider locale={currentLocale} messages={currentMessages} timeZone="UTC">
      {page}
    </NextIntlClientProvider>,
  );
}

describe('Task list page', () => {
  beforeEach(() => {
    vi.mocked(requireUser).mockReset();
    vi.mocked(getTranslations).mockReset();
    vi.mocked(listTasks).mockReset();
    vi.mocked(listTasks).mockResolvedValue([]);
  });

  it('renders nothing when nobody is logged in', async () => {
    vi.mocked(requireUser).mockRejectedValue(new Error('NEXT_REDIRECT /login'));
    withLocale('en', en);

    await expect(TasksPage()).rejects.toThrow('NEXT_REDIRECT /login');
    expect(getTranslations).not.toHaveBeenCalled();
    expect(listTasks).not.toHaveBeenCalled();
  });

  it.each([
    ['vi', viMessages],
    ['en', en],
  ] as const)('shows the %s heading and the empty state', async (locale, messages) => {
    vi.mocked(requireUser).mockResolvedValue(user);
    withLocale(locale, messages);

    renderPage(await TasksPage());

    expect(
      screen.getByRole('heading', { level: 1, name: messages.tasks.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(messages.tasks.empty)).toBeInTheDocument();
  });

  it("loads only the logged-in user's tasks and shows them", async () => {
    vi.mocked(requireUser).mockResolvedValue(user);
    vi.mocked(listTasks).mockResolvedValue([anasTask]);
    withLocale('en', en);

    renderPage(await TasksPage());

    expect(listTasks).toHaveBeenCalledTimes(1);
    expect(listTasks).toHaveBeenCalledWith('u1');
    expect(screen.getByRole('listitem')).toHaveTextContent(anasTask.title);
    expect(screen.queryByText(en.tasks.empty)).not.toBeInTheDocument();
  });

  it('shows the log out button', async () => {
    vi.mocked(requireUser).mockResolvedValue(user);
    withLocale('en', en);

    renderPage(await TasksPage());

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
