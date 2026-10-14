import { NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth/login';
import { createSession, SESSION_COOKIE_NAME, sessionCookieOptions } from '@/lib/auth/session';

// Same length caps as the sign-up endpoint: no account can have a longer email or password.
const MAX_EMAIL = 254;
const MAX_PASSWORD = 128;

type LoginInput = { email: string; password: string };

function isLoginInput(body: unknown): body is LoginInput {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return false;
  const { email, password } = body as Record<string, unknown>;
  return (
    typeof email === 'string' &&
    email.length <= MAX_EMAIL &&
    typeof password === 'string' &&
    password.length <= MAX_PASSWORD
  );
}

/** Login endpoint (S-03): one session per device, kept in a persistent httpOnly cookie. */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = undefined;
  }
  if (!isLoginInput(body)) return Response.json({ error: 'INVALID_INPUT' }, { status: 400 });

  const userId = await authenticate(body.email, body.password);
  if (!userId) return Response.json({ error: 'INVALID_CREDENTIALS' }, { status: 401 });

  const token = await createSession(userId, request.headers.get('user-agent'));
  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
  return response;
}
