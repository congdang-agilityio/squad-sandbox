// Server-only: reads the request cookies. Never import from client components.
import { cookies } from 'next/headers';
import { getSessionUser, SESSION_COOKIE_NAME, type SessionUser } from '@/lib/auth/session';

/** Returns the logged-in user of the current request, or null when not logged in. */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return getSessionUser(token);
}
