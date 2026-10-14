import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../messages/en.json';
import viMessages from '../../../messages/vi.json';
import { ForgotPasswordForm } from './forgot-password-form';

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function respond(status: number, body: unknown) {
  fetchMock.mockResolvedValueOnce(
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
  );
}

function renderForm(locale: 'en' | 'vi' = 'en') {
  render(
    <NextIntlClientProvider locale={locale} messages={locale === 'en' ? en : viMessages}>
      <ForgotPasswordForm />
    </NextIntlClientProvider>,
  );
}

function requestReset(email = 'an@example.com') {
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: email } });
  fireEvent.click(screen.getByRole('button', { name: en.forgotPassword.submit }));
}

describe('ForgotPasswordForm', () => {
  it.each([
    ['en', en],
    ['vi', viMessages],
  ] as const)('renders the email field and the submit button in %s', (locale, messages) => {
    renderForm(locale);
    const t = messages.forgotPassword;

    const email = screen.getByLabelText(t.emailLabel);
    expect(email).toHaveAttribute('type', 'email');
    expect(email).toHaveAttribute('autocomplete', 'email');
    expect(screen.getByRole('button', { name: t.submit })).toBeInTheDocument();
    expect(screen.getByRole('button').closest('form')).toHaveAttribute('novalidate');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('posts the email as JSON and shows the sent message on 202', async () => {
    respond(202, { ok: true });
    renderForm();
    requestReset();

    expect(await screen.findByRole('status')).toHaveTextContent(en.forgotPassword.sent);
    expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/auth/password-reset/request');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({ email: 'an@example.com' });
  });

  it('shows the same sent message when the input is refused, so no account is revealed', async () => {
    respond(400, { error: 'INVALID_INPUT' });
    renderForm();
    requestReset('not-an-email');

    expect(await screen.findByRole('status')).toHaveTextContent(en.forgotPassword.sent);
  });

  it('shows the sent message in Vietnamese', async () => {
    respond(202, { ok: true });
    renderForm('vi');
    fireEvent.click(screen.getByRole('button', { name: viMessages.forgotPassword.submit }));

    expect(await screen.findByRole('status')).toHaveTextContent(viMessages.forgotPassword.sent);
  });

  it.each([
    ['a server error', () => respond(500, { error: 'boom' })],
    ['a network failure', () => fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'))],
  ])('on %s shows the unexpected error and keeps the email', async (_, arrange) => {
    arrange();
    renderForm();
    requestReset();

    expect(await screen.findByRole('alert')).toHaveTextContent(en.forgotPassword.errorUnexpected);
    expect(screen.getByLabelText('Email')).toHaveValue('an@example.com');
    await waitFor(() =>
      expect(screen.getByRole('button', { name: en.forgotPassword.submit })).toBeEnabled(),
    );
  });
});
