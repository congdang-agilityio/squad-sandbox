// @vitest-environment node
import { NextRequest } from 'next/server';
import { getRedirectUrl, unstable_doesMiddlewareMatch } from 'next/experimental/testing/server';
import { SESSION_COOKIE_NAME, sessionCookieOptions } from '@/lib/auth/session';
import { config, middleware } from './middleware';

const TOKEN = 'a'.repeat(43);

function request(path: string, cookie?: string) {
  const headers = new Headers();
  if (cookie !== undefined) headers.set('cookie', `${SESSION_COOKIE_NAME}=${cookie}`);
  return new NextRequest(new URL(path, 'http://localhost:4101'), { headers });
}

function matches(path: string) {
  return unstable_doesMiddlewareMatch({ config, url: path });
}

describe('middleware', () => {
  it.each(['/', '/tasks'])('redirects %s to /login without a session cookie', (path) => {
    const response = middleware(request(path));

    expect(getRedirectUrl(response)).toBe('http://localhost:4101/login');
  });

  it.each(['', 'not-a-token', `${TOKEN}x`, 'a b'])(
    'redirects to /login with a malformed session cookie %j and does not renew it',
    (cookie) => {
      const response = middleware(request('/tasks', cookie));

      expect(getRedirectUrl(response)).toBe('http://localhost:4101/login');
      expect(response.cookies.get(SESSION_COOKIE_NAME)).toBeUndefined();
    },
  );

  it.each(['/', '/tasks', '/tasks/123'])(
    'lets %s through with a session cookie and renews it with a fresh 400-day maxAge',
    (path) => {
      const response = middleware(request(path, TOKEN));

      expect(getRedirectUrl(response)).toBeNull();
      expect(response.headers.get('x-middleware-next')).toBe('1');
      expect(response.cookies.get(SESSION_COOKIE_NAME)).toMatchObject({
        name: SESSION_COOKIE_NAME,
        value: TOKEN,
        ...sessionCookieOptions(),
      });
    },
  );

  it('renews the cookie with the same options the login sets', () => {
    const cookie = middleware(request('/', TOKEN)).cookies.get(SESSION_COOKIE_NAME);

    expect(cookie?.maxAge).toBe(400 * 24 * 60 * 60);
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.sameSite).toBe('lax');
    expect(cookie?.path).toBe('/');
    expect(new Date(cookie?.expires ?? 0).getTime()).toBeGreaterThan(
      Date.now() + 399 * 24 * 60 * 60 * 1000,
    );
  });

  it.each(['/', '/tasks', '/tasks/123/edit'])('runs on task page %s', (path) => {
    expect(matches(path)).toBe(true);
  });

  it.each([
    '/login',
    '/signup',
    '/privacy',
    '/api/auth/sign-up',
    '/api/auth/login',
    '/api/health',
    '/_next/static/chunks/main.js',
    '/favicon.ico',
    '/tasksfoo',
  ])('does not run on public path %s', (path) => {
    expect(matches(path)).toBe(false);
  });
});
