import { NextResponse, type NextRequest } from 'next/server';

// Edge runtime: must not import Prisma or src/lib/auth/*. The real session check is in the
// (app) layout. These values mirror SESSION_COOKIE_NAME, isSessionCookieSecure() and
// sessionCookieOptions() in src/lib/auth/session.ts; middleware.test.ts fails if they drift apart.
const SESSION_COOKIE_NAME = 'session';
const SESSION_MAX_AGE_SECONDS = 400 * 24 * 60 * 60;
// 32 random bytes in base64url without padding are exactly 43 characters.
const TOKEN_SHAPE = /^[A-Za-z0-9_-]{43}$/;

function isSessionCookieSecure(): boolean {
  const setting = process.env.SESSION_COOKIE_SECURE;
  if (setting === 'true' || setting === 'false') return setting === 'true';
  return process.env.NODE_ENV === 'production';
}

/** Sends visitors without a session cookie to /login and renews the cookie lifetime on use. */
export function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token || !TOKEN_SHAPE.test(token)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = NextResponse.next();
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isSessionCookieSecure(),
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

// Only task pages. Public pages (/login, /signup, /privacy), /api/* and static assets are
// not matched.
export const config = { matcher: ['/', '/tasks/:path*'] };
