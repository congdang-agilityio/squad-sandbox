import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement } from 'react';
import { getCurrentUser } from '@/lib/auth/current-user';
import en from '../../../messages/en.json';
import viMessages from '../../../messages/vi.json';
import LoginPage from './page';

vi.mock('@/lib/auth/current-user', () => ({ getCurrentUser: vi.fn() }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT ${url}`);
  }),
}));
const intl = vi.hoisted(() => ({ locale: 'en', messages: {} as Record<string, unknown> }));
vi.mock('next-intl/server', async () => {
  const { createTranslator } = await import('next-intl');
  return {
    getTranslations: async (namespace: string) =>
      createTranslator({ locale: intl.locale, messages: intl.messages, namespace }),
  };
});

const { redirect } = await import('next/navigation');

describe('Login page', () => {
  beforeEach(() => {
    vi.mocked(getCurrentUser).mockReset();
    vi.mocked(redirect).mockClear();
  });

  it('sends a logged-in user to the task list', async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 'u1',
      email: 'an@example.com',
      displayName: 'An',
    });

    await expect(LoginPage()).rejects.toThrow('NEXT_REDIRECT /tasks');
    expect(redirect).toHaveBeenCalledWith('/tasks');
  });

  it.each([
    ['en', en],
    ['vi', viMessages],
  ] as const)(
    'shows the %s heading, the form and a link to sign up when logged out',
    async (locale, messages) => {
      vi.mocked(getCurrentUser).mockResolvedValue(null);
      intl.locale = locale;
      intl.messages = messages;

      const page = (await LoginPage()) as ReactElement;
      render(
        <NextIntlClientProvider locale={locale} messages={messages}>
          {page}
        </NextIntlClientProvider>,
      );

      expect(redirect).not.toHaveBeenCalled();
      expect(
        screen.getByRole('heading', { level: 1, name: messages.login.title }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText(messages.login.emailLabel)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: messages.login.signUpLink })).toHaveAttribute(
        'href',
        '/signup',
      );
      expect(screen.getAllByRole('link')).toHaveLength(1);
    },
  );
});
