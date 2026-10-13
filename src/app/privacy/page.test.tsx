import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../messages/en.json';
import vi from '../../../messages/vi.json';
import PrivacyPage from './page';

type Messages = Record<string, unknown>;

function keyPaths(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object') return [prefix];
  return Object.entries(value as Messages)
    .flatMap(([key, child]) => keyPaths(child, prefix ? `${prefix}.${key}` : key))
    .sort();
}

function renderWith(locale: 'vi' | 'en', messages: Messages) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <PrivacyPage />
    </NextIntlClientProvider>,
  );
}

describe('Privacy notice page', () => {
  it.each([
    ['vi', vi, 'Thông báo về quyền riêng tư', 'Quay lại trang đăng ký'],
    ['en', en, 'Privacy notice', 'Back to sign-up'],
  ] as const)(
    'renders the %s notice with its title and a link back to sign-up',
    (locale, messages, title, back) => {
      renderWith(locale, messages);

      expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: back })).toHaveAttribute('href', '/signup');
    },
  );

  it('shows every stored data item and every protection statement', () => {
    renderWith('en', en);

    for (const text of [
      ...Object.values(en.privacy.data),
      ...Object.values(en.privacy.protect),
      en.privacy.intro,
    ]) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
  });

  it('has the same privacy keys in Vietnamese and English, none empty', () => {
    expect(keyPaths(vi.privacy)).toEqual(keyPaths(en.privacy));
    expect(keyPaths(en.privacy).length).toBeGreaterThan(0);

    for (const path of keyPaths(en.privacy)) {
      for (const messages of [vi.privacy, en.privacy]) {
        const text = path
          .split('.')
          .reduce<unknown>((node, key) => (node as Messages)[key], messages);
        expect(typeof text === 'string' && text.trim().length > 0, path).toBe(true);
      }
    }
  });
});
