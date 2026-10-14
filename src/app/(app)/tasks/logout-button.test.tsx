import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '../../../../messages/en.json';
import viMessages from '../../../../messages/vi.json';
import { LogoutButton } from './logout-button';

const fetchMock = vi.fn();
const replace = vi.fn();
const reload = vi.fn();
const originalLocation = window.location;

beforeEach(() => {
  fetchMock.mockReset();
  replace.mockReset();
  reload.mockReset();
  vi.stubGlobal('fetch', fetchMock);
  // jsdom does not allow spying on location.replace, so the whole object is swapped.
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...originalLocation, replace, reload },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  Object.defineProperty(window, 'location', { configurable: true, value: originalLocation });
});

function renderButton(locale: 'en' | 'vi' = 'en') {
  render(
    <NextIntlClientProvider locale={locale} messages={locale === 'en' ? en : viMessages}>
      <LogoutButton />
    </NextIntlClientProvider>,
  );
}

describe('LogoutButton', () => {
  it.each([
    ['en', en],
    ['vi', viMessages],
  ] as const)('shows the %s "Log out" text', (locale, messages) => {
    renderButton(locale);

    expect(screen.getByRole('button', { name: messages.logout.button })).toBeEnabled();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('posts to /api/auth/logout and replaces the page with /login on 200', async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    renderButton();

    fireEvent.click(screen.getByRole('button', { name: 'Log out' }));

    await waitFor(() => expect(replace).toHaveBeenCalledWith('/login'));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/auth/logout');
    expect(init.method).toBe('POST');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('disables the button while the request runs and keeps it disabled after success', async () => {
    let resolve!: (response: Response) => void;
    fetchMock.mockReturnValueOnce(new Promise<Response>((r) => (resolve = r)));
    renderButton();

    fireEvent.click(screen.getByRole('button', { name: 'Log out' }));
    expect(screen.getByRole('button', { name: 'Log out' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Log out' }));
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => resolve(new Response('{}', { status: 200 })));
    expect(replace).toHaveBeenCalledWith('/login');
    expect(screen.getByRole('button', { name: 'Log out' })).toBeDisabled();
  });

  it.each([
    ['a server error', () => fetchMock.mockResolvedValueOnce(new Response('{}', { status: 500 }))],
    ['a network failure', () => fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'))],
  ])('on %s shows the failure message and stays on the page', async (_name, arrange) => {
    arrange();
    renderButton();

    fireEvent.click(screen.getByRole('button', { name: 'Log out' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(en.logout.error);
    expect(en.logout.error).toBe('Could not log out. Please try again.');
    expect(replace).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Log out' })).toBeEnabled();
  });

  it('shows the failure message in Vietnamese', async () => {
    fetchMock.mockResolvedValueOnce(new Response('{}', { status: 503 }));
    renderButton('vi');

    fireEvent.click(screen.getByRole('button', { name: viMessages.logout.button }));

    expect(await screen.findByRole('alert')).toHaveTextContent(viMessages.logout.error);
  });

  it('reloads a task page restored from the back/forward cache', () => {
    renderButton();

    const restored = new Event('pageshow') as PageTransitionEvent;
    Object.defineProperty(restored, 'persisted', { value: true });
    window.dispatchEvent(restored);
    expect(reload).toHaveBeenCalledTimes(1);

    const fresh = new Event('pageshow') as PageTransitionEvent;
    Object.defineProperty(fresh, 'persisted', { value: false });
    window.dispatchEvent(fresh);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it('has the same non-empty logout keys in Vietnamese and English', () => {
    expect(Object.keys(viMessages.logout).sort()).toEqual(Object.keys(en.logout).sort());
    for (const messages of [viMessages.logout, en.logout]) {
      for (const text of Object.values(messages)) expect(text.trim().length).toBeGreaterThan(0);
    }
  });
});
