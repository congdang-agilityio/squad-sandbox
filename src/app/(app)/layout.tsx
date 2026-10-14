import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { getCurrentUser } from '@/lib/auth/current-user';

// Every page under src/app/(app)/ requires a valid login. Reads cookies, so it is always
// rendered per request.
export default async function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return <>{children}</>;
}
