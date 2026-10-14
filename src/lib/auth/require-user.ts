// Server-only: reads the request cookies. Never import from client components.
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/current-user';
import type { SessionUser } from '@/lib/auth/session';

/** Returns the logged-in user of the current request, or redirects to /login. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}
