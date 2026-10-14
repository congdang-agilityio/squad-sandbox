import { getTranslations } from 'next-intl/server';
import { requireUser } from '@/lib/auth/require-user';
import { LogoutButton } from './logout-button';

// Placeholder: the real task list comes with stories S-05 and S-06.
export default async function TasksPage() {
  await requireUser();
  const t = await getTranslations('tasks');

  return (
    <main style={{ maxWidth: '40rem', margin: '0 auto', padding: '1rem', lineHeight: 1.5 }}>
      <h1>{t('title')}</h1>
      <p>{t('empty')}</p>
      <LogoutButton />
    </main>
  );
}
