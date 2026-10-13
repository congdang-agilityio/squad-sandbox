import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../messages/en.json';
import vi from '../../../messages/vi.json';
import SignUpPage from './page';

describe('Sign-up page', () => {
  it.each([
    ['vi', vi, 'Đăng ký', 'Đọc thông báo về quyền riêng tư'],
    ['en', en, 'Sign up', 'Read the privacy notice'],
  ] as const)(
    'renders the %s heading and a link to the privacy notice',
    (locale, messages, title, link) => {
      render(
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SignUpPage />
        </NextIntlClientProvider>,
      );

      expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: link })).toHaveAttribute('href', '/privacy');
    },
  );

  it('has the same non-empty signup keys in Vietnamese and English', () => {
    expect(Object.keys(vi.signup).sort()).toEqual(Object.keys(en.signup).sort());
    for (const messages of [vi.signup, en.signup]) {
      for (const text of Object.values(messages)) {
        expect(text.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
