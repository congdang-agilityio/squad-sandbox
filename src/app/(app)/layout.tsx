import type { ReactNode } from 'react';
import { requireUser } from '@/lib/auth/require-user';

// Every page under src/app/(app)/ requires a valid login. Reads cookies, so it is always
// rendered per request.
// Next.js renders layouts and pages in parallel, so this check never protects page output:
// every page or data loader under src/app/(app)/ must call `await requireUser()` itself first.
export default async function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
  await requireUser();

  return <>{children}</>;
}
