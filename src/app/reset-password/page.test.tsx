import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement } from 'react';
import en from '../../../messages/en.json';
import ResetPasswordPage, { metadata } from './page';

const TOKEN = 'b'.repeat(43);

async function renderPage(searchParams: Record<string, string | string[] | undefined>) {
  const page = (await ResetPasswordPage({
    searchParams: Promise.resolve(searchParams),
  })) as ReactElement;
  render(
    <NextIntlClientProvider locale="en" messages={en}>
      {page}
    </NextIntlClientProvider>,
  );
}

describe('Reset password page', () => {
  it('asks the browser to send no referrer, so the token in the URL does not leak', () => {
    expect(metadata.referrer).toBe('no-referrer');
  });

  it('shows the heading and the form for a link with a token', async () => {
    await renderPage({ token: TOKEN });

    expect(
      screen.getByRole('heading', { level: 1, name: en.resetPassword.title }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(en.resetPassword.passwordLabel)).toBeInTheDocument();
  });

  it.each([{}, { token: [TOKEN, TOKEN] }])(
    'shows the invalid link message when the token is missing or repeated (%j)',
    async (searchParams) => {
      await renderPage(searchParams);

      expect(screen.getByRole('alert')).toHaveTextContent(en.resetPassword.invalidLink);
      expect(screen.queryByLabelText(en.resetPassword.passwordLabel)).not.toBeInTheDocument();
    },
  );
});
