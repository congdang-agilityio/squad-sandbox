import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../messages/en.json';
import viMessages from '../../../messages/vi.json';
import { LoginForm } from './login-form';

const replace = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace }) }));

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  replace.mockReset();
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
      <LoginForm />
    </NextIntlClientProvider>,
  );
}

function fillInAndSubmit() {
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'an@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Secret#123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
}

describe('LoginForm', () => {
  it.each([
    ['en', en],
    ['vi', viMessages],
  ] as const)('renders only email, password and the log in button in %s', (locale, messages) => {
    renderForm(locale);
    const t = messages.login;

    const email = screen.getByLabelText(t.emailLabel);
    expect(email).toHaveAttribute('type', 'email');
    expect(email).toHaveAttribute('autocomplete', 'email');
    const password = screen.getByLabelText(t.passwordLabel);
    expect(password).toHaveAttribute('type', 'password');
    expect(password).toHaveAttribute('autocomplete', 'current-password');
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getByRole('button', { name: t.submit })).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByText(messages.passwordRule.rule)).not.toBeInTheDocument();
  });

  it('posts the email and password as JSON and opens /tasks on 200', async () => {
    respond(200, { ok: true });
    renderForm();
    fillInAndSubmit();

    await waitFor(() => expect(replace).toHaveBeenCalledWith('/tasks'));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/auth/login');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({ email: 'an@example.com', password: 'Secret#123' });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('keeps the button disabled after 200 while /tasks opens, so a second tap cannot log in twice', async () => {
    respond(200, { ok: true });
    renderForm();
    fillInAndSubmit();

    await waitFor(() => expect(replace).toHaveBeenCalledWith('/tasks'));
    // Let the submit handler finish (its finally block) before checking the button.
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.getByRole('button', { name: 'Log in' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('on 401 shows the incorrect credentials message, keeps the email and clears the password', async () => {
    respond(401, { error: 'INVALID_CREDENTIALS' });
    renderForm();
    fillInAndSubmit();

    expect(await screen.findByRole('alert')).toHaveTextContent(en.login.errorInvalidCredentials);
    expect(en.login.errorInvalidCredentials).toBe('The email or password is incorrect.');
    expect(screen.getByLabelText('Email')).toHaveValue('an@example.com');
    expect(screen.getByLabelText('Password')).toHaveValue('');
    expect(replace).not.toHaveBeenCalled();
  });

  it('on 400 shows the same incorrect credentials message', async () => {
    respond(400, { error: 'INVALID_INPUT' });
    renderForm();
    fillInAndSubmit();

    expect(await screen.findByRole('alert')).toHaveTextContent(en.login.errorInvalidCredentials);
    expect(replace).not.toHaveBeenCalled();
  });

  it.each([
    ['a server error', () => respond(500, { error: 'boom' })],
    ['a network failure', () => fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'))],
  ])('on %s shows the unexpected error and clears the password', async (_name, arrange) => {
    arrange();
    renderForm();
    fillInAndSubmit();

    expect(await screen.findByRole('alert')).toHaveTextContent(en.login.errorUnexpected);
    expect(screen.getByLabelText('Password')).toHaveValue('');
    expect(replace).not.toHaveBeenCalled();
  });

  it('has the same non-empty login keys in Vietnamese and English', () => {
    expect(Object.keys(viMessages.login).sort()).toEqual(Object.keys(en.login).sort());
    for (const messages of [viMessages.login, en.login]) {
      for (const text of Object.values(messages)) expect(text.trim().length).toBeGreaterThan(0);
    }
  });
});
