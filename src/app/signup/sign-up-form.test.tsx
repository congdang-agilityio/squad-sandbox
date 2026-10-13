import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../messages/en.json';
import viMessages from '../../../messages/vi.json';
import { SignUpForm } from './sign-up-form';

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
      <SignUpForm />
    </NextIntlClientProvider>,
  );
}

function fillIn({ agree = true } = {}) {
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'an@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Secret#123' } });
  fireEvent.change(screen.getByLabelText('Display name'), { target: { value: 'An' } });
  if (agree) fireEvent.click(screen.getByLabelText('I agree to the privacy notice'));
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
}

describe('SignUpForm', () => {
  it.each([
    ['en', en],
    ['vi', viMessages],
  ] as const)(
    'renders every field, the agreement link and the password rule in %s',
    (locale, messages) => {
      renderForm(locale);
      const t = messages.signup;

      const email = screen.getByLabelText(t.emailLabel);
      expect(email).toHaveAttribute('type', 'email');
      expect(email).toHaveAttribute('autocomplete', 'email');
      const password = screen.getByLabelText(t.passwordLabel);
      expect(password).toHaveAttribute('type', 'password');
      expect(password).toHaveAttribute('autocomplete', 'new-password');
      expect(password).toHaveAccessibleDescription(t.passwordRule);
      expect(screen.getByLabelText(t.displayNameLabel)).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: t.agreeLabel })).not.toBeChecked();
      expect(screen.getByRole('link', { name: t.agreePrivacyLink })).toHaveAttribute(
        'href',
        '/privacy',
      );
      expect(screen.getByRole('button', { name: t.submit })).toBeInTheDocument();
    },
  );

  it('states in plain words that marked letters and spaces cannot be used', () => {
    expect(en.signup.passwordRule).toMatch(/Vietnamese marks/);
    expect(en.signup.passwordRule).toMatch(/spaces/);
    expect(viMessages.signup.passwordRule).toMatch(/có dấu/);
    expect(viMessages.signup.passwordRule).toMatch(/dấu cách/);
  });

  it('posts the typed values as JSON and shows the success message with a log in link on 201', async () => {
    respond(201, { ok: true });
    renderForm();
    fillIn();
    submit();

    expect(await screen.findByRole('status')).toHaveTextContent('Account created');
    expect(screen.getByRole('link', { name: 'Log in' })).toHaveAttribute('href', '/login');
    expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/auth/sign-up');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({
      email: 'an@example.com',
      password: 'Secret#123',
      displayName: 'An',
      agreedToPrivacyNotice: true,
    });
  });

  it.each([
    [400, { error: 'AGREEMENT_REQUIRED' }, en.signup.errorAgreementRequired],
    [409, { error: 'EMAIL_TAKEN' }, en.signup.errorEmailTaken],
    [400, { error: 'INVALID_INPUT' }, en.signup.errorInvalidInput],
    [500, { error: 'boom' }, en.signup.errorUnexpected],
    [400, { error: 'toString' }, en.signup.errorUnexpected],
  ])(
    'on %i %j shows the matching error and keeps email and name but not the password',
    async (status, body, message) => {
      respond(status, body);
      renderForm();
      fillIn({ agree: body.error !== 'AGREEMENT_REQUIRED' });
      submit();

      expect(await screen.findByRole('alert')).toHaveTextContent(message);
      expect(screen.getByLabelText('Email')).toHaveValue('an@example.com');
      expect(screen.getByLabelText('Display name')).toHaveValue('An');
      expect(screen.getByLabelText('Password')).toHaveValue('');
    },
  );

  it('shows the password rule when the password breaks it', async () => {
    respond(400, { error: 'PASSWORD_RULE', failures: ['noSymbol'] });
    renderForm();
    fillIn();
    submit();

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(en.signup.errorPasswordRule);
    expect(alert).toHaveTextContent(en.signup.passwordRule);
  });

  it('shows the unexpected error when the network fails', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    renderForm();
    fillIn();
    submit();

    expect(await screen.findByRole('alert')).toHaveTextContent(en.signup.errorUnexpected);
  });

  it('does not block submission with native validation so the server decides', async () => {
    respond(400, { error: 'AGREEMENT_REQUIRED' });
    renderForm();
    fillIn({ agree: false });

    expect(screen.getByRole('button', { name: 'Create account' }).closest('form')).toHaveAttribute(
      'novalidate',
    );
    submit();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).agreedToPrivacyNotice).toBe(false);
  });
});
