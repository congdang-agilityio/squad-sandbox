import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../messages/en.json';
import viMessages from '../../../messages/vi.json';
import { ResetPasswordForm } from './reset-password-form';

const TOKEN = 'a'.repeat(43);
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

function renderForm(token = TOKEN, locale: 'en' | 'vi' = 'en') {
  render(
    <NextIntlClientProvider locale={locale} messages={locale === 'en' ? en : viMessages}>
      <ResetPasswordForm token={token} />
    </NextIntlClientProvider>,
  );
}

function setPassword(password = 'NewSecret#456') {
  fireEvent.change(screen.getByLabelText('New password'), { target: { value: password } });
  fireEvent.click(screen.getByRole('button', { name: en.resetPassword.submit }));
}

function expectInvalidLinkMessage(messages: typeof en = en) {
  const alert = screen.getByRole('alert');
  expect(alert).toHaveTextContent(messages.resetPassword.invalidLink);
  expect(
    within(alert).getByRole('link', { name: messages.resetPassword.forgotPasswordLink }),
  ).toHaveAttribute('href', '/forgot-password');
}

describe('ResetPasswordForm', () => {
  it.each([
    ['en', en],
    ['vi', viMessages],
  ] as const)('renders the new-password field with the password rule in %s', (locale, messages) => {
    renderForm(TOKEN, locale);
    const t = messages.resetPassword;

    const password = screen.getByLabelText(t.passwordLabel);
    expect(password).toHaveAttribute('type', 'password');
    expect(password).toHaveAttribute('autocomplete', 'new-password');
    expect(password).toHaveAccessibleDescription(messages.passwordRule.rule);
    expect(screen.getByRole('button', { name: t.submit }).closest('form')).toHaveAttribute(
      'novalidate',
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('posts the token and the new password, then confirms with a log in link on 200', async () => {
    respond(200, { ok: true });
    renderForm();
    setPassword();

    expect(await screen.findByRole('status')).toHaveTextContent(en.resetPassword.success);
    expect(screen.getByRole('link', { name: en.resetPassword.loginLink })).toHaveAttribute(
      'href',
      '/login',
    );
    expect(screen.queryByLabelText('New password')).not.toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/auth/password-reset');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({ token: TOKEN, password: 'NewSecret#456' });
  });

  it('shows the confirmation in Vietnamese', async () => {
    respond(200, { ok: true });
    renderForm(TOKEN, 'vi');
    fireEvent.click(screen.getByRole('button', { name: viMessages.resetPassword.submit }));

    expect(await screen.findByRole('status')).toHaveTextContent(viMessages.resetPassword.success);
  });

  it('on PASSWORD_RULE shows the refusal reasons, keeps the form and clears the password', async () => {
    respond(400, { error: 'PASSWORD_RULE', failures: ['tooShort', 'noSymbol'] });
    renderForm();
    setPassword('short');

    const alert = await screen.findByRole('alert');
    expect(
      within(alert)
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual([en.passwordRule.tooShort, en.passwordRule.missingType]);
    const password = screen.getByLabelText('New password');
    expect(password).toHaveValue('');
    expect(password).toHaveAccessibleDescription(en.passwordRule.rule);
  });

  it('on PASSWORD_RULE without usable failures shows the general rule error', async () => {
    respond(400, { error: 'PASSWORD_RULE', failures: ['boom'] });
    renderForm();
    setPassword('short');

    expect(await screen.findByRole('alert')).toHaveTextContent(en.resetPassword.errorPasswordRule);
    expect(screen.getAllByRole('alert')).toHaveLength(1);
  });

  it('on INVALID_TOKEN shows the invalid link message with a link to request a new one', async () => {
    respond(400, { error: 'INVALID_TOKEN' });
    renderForm();
    setPassword();

    await screen.findByRole('alert');
    expectInvalidLinkMessage();
    expect(screen.queryByLabelText('New password')).not.toBeInTheDocument();
  });

  it.each(['', '   '])(
    'shows the invalid link message without a request when the token is %j',
    (token) => {
      renderForm(token);

      expectInvalidLinkMessage();
      expect(screen.queryByLabelText('New password')).not.toBeInTheDocument();
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it('shows the invalid link message in Vietnamese', () => {
    renderForm('', 'vi');

    expectInvalidLinkMessage(viMessages);
  });

  it.each([
    ['a server error', () => respond(500, { error: 'boom' })],
    ['an unknown refusal', () => respond(400, { error: 'INVALID_INPUT' })],
    ['a network failure', () => fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'))],
  ])('on %s shows the unexpected error and clears the password', async (_, arrange) => {
    arrange();
    renderForm();
    setPassword();

    expect(await screen.findByRole('alert')).toHaveTextContent(en.resetPassword.errorUnexpected);
    expect(screen.getByLabelText('New password')).toHaveValue('');
    await waitFor(() =>
      expect(screen.getByRole('button', { name: en.resetPassword.submit })).toBeEnabled(),
    );
  });

  it('clears the refusal reasons when the form is sent again', async () => {
    respond(400, { error: 'PASSWORD_RULE', failures: ['tooShort'] });
    respond(500, { error: 'boom' });
    renderForm();
    setPassword('short');
    expect(await screen.findByRole('alert')).toHaveTextContent(en.passwordRule.tooShort);

    setPassword();
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(en.resetPassword.errorUnexpected),
    );
    expect(screen.queryByText(en.passwordRule.tooShort)).not.toBeInTheDocument();
  });
});
