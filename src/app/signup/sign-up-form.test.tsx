import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
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
      expect(password).toHaveAccessibleDescription(messages.passwordRule.rule);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByLabelText(t.displayNameLabel)).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: t.agreeLabel })).not.toBeChecked();
      expect(screen.getByRole('link', { name: t.agreePrivacyLink })).toHaveAttribute(
        'href',
        '/privacy',
      );
      expect(screen.getByRole('button', { name: t.submit })).toBeInTheDocument();
    },
  );

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

  it.each([
    [['tooShort'], [en.passwordRule.tooShort]],
    [['noSymbol'], [en.passwordRule.missingType]],
    [['invalidCharacter'], [en.passwordRule.invalidCharacter]],
    [
      ['tooShort', 'noUppercase', 'noDigit', 'invalidCharacter'],
      [en.passwordRule.tooShort, en.passwordRule.missingType, en.passwordRule.invalidCharacter],
    ],
  ])(
    'on PASSWORD_RULE %j shows the matching refusal messages and keeps the rule linked',
    async (failures, messages) => {
      respond(400, { error: 'PASSWORD_RULE', failures });
      renderForm();
      fillIn();
      submit();

      const alert = await screen.findByRole('alert');
      expect(
        within(alert)
          .getAllByRole('listitem')
          .map((item) => item.textContent),
      ).toEqual(messages);
      expect(screen.getAllByRole('alert')).toHaveLength(1);
      const password = screen.getByLabelText('Password');
      expect(password).toHaveValue('');
      expect(password).toHaveAccessibleDescription(en.passwordRule.rule);
      expect(screen.getByLabelText('Email')).toHaveValue('an@example.com');
    },
  );

  it('shows the refusal message in Vietnamese', async () => {
    respond(400, { error: 'PASSWORD_RULE', failures: ['invalidCharacter'] });
    renderForm('vi');
    fireEvent.click(screen.getByRole('button', { name: viMessages.signup.submit }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      viMessages.passwordRule.invalidCharacter,
    );
  });

  it.each([{}, { failures: [] }, { failures: ['boom'] }, { failures: 'tooShort' }])(
    'on PASSWORD_RULE with unusable failures %j falls back to the general rule error',
    async (extra) => {
      respond(400, { error: 'PASSWORD_RULE', ...extra });
      renderForm();
      fillIn();
      submit();

      const alert = await screen.findByRole('alert');
      expect(alert).toHaveTextContent(en.signup.errorPasswordRule);
      expect(screen.getAllByRole('alert')).toHaveLength(1);
    },
  );

  it('clears the refusal messages when the form is sent again', async () => {
    respond(400, { error: 'PASSWORD_RULE', failures: ['tooShort'] });
    respond(409, { error: 'EMAIL_TAKEN' });
    renderForm();
    fillIn();
    submit();
    expect(await screen.findByRole('alert')).toHaveTextContent(en.passwordRule.tooShort);

    submit();
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(en.signup.errorEmailTaken),
    );
    expect(screen.queryByText(en.passwordRule.tooShort)).not.toBeInTheDocument();
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
