import { NextRequest, NextResponse } from 'next/server';
import { deleteSession, SESSION_COOKIE_NAME, sessionCookieOptions } from '@/lib/auth/session';

/**
 * Logout endpoint (S-30): ends the login of the calling device only and clears its cookie.
 * Idempotent: a missing, malformed or unknown token gets the same 200 answer.
 * POST only, so a link or prefetch cannot log anyone out.
 */
export async function POST(request: Request): Promise<Response> {
  const token = new NextRequest(request).cookies.get(SESSION_COOKIE_NAME)?.value;
  if (token) await deleteSession(token);

  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set(SESSION_COOKIE_NAME, '', { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}
